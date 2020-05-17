let express=require('express');
var mysqlConnection=require('./config/db');
var  flash= require('connect-flash');
const bodyparser=require('body-parser')
const session = require('express-session');

let router = express.Router();

//middleware
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());
router.use(session({
    secret:'nnnnnnn ',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}));
const redirectLogin =(req,res,next)=>{
  if (!req.session.userId){
    res.render('Home page/signup')
  }else {
    console.log(req.session.variabales);
    next()
  }
}
//

//ADD QUESTION (create table message(id INT PRIMARY KEY AUTO_INCREMENT,content VARCHAR(255),createdat datetime);)
router.post('/question',redirectLogin,(request,response)=>{
  let content = 'INSERT INTO message SET content=?,createdat=?,idUserqst =?';
    
         let todo = request.body.message;

         mysqlConnection.query(content, [todo,new Date(),request.session.userId], (err, results, fields) => {
          if (err) {
            return console.error(err.message);
          }

          console.log('Todo Id:' + results.insertId);
         response.redirect('question')
      });

})
//AFICHER QUESTION
router.get('/question',(request,response)=>{
  var sql = "SELECT * FROM message ORDER BY id DESC";
  var message=request.body.message;
  mysqlConnection.query(sql, function(error, results) {
      if (error) {
          throw error;
      }
      response.end(json.stringify(results)
    //  sql = 'SELECT * FROM (SELECT * FROM message right join users ON message.idUserqst=users.idUsers UNION SELECT * FROM message left join users ON message.idUserqst=users.idUsers) as a where a.id=?',
    //  mysqlConnection.query(sql,[request.session.userId], function(error, results2) {
    //      if (error) {
    //          throw error;
    //      }
    //      console.log(results2);
    //
    // })
    response.render('pages/question',{question:results})

  });})



        //Delete QUESTION
        router.get('/delete/:id', (req, res) => {
          mysqlConnection.query('DELETE  FROM message WHERE id= ?', [req.params.id], (err, rows, fields) => {
            if (err) {
              return console.error(err.message);
            }
        res.redirect('back')

});
});
//ADD REPLY (create table reply(idr INT PRIMARY KEY AUTO_INCREMENT,cont VARCHAR(255),qid INT);)
router.post('/answer/:id',(request,response)=>{
  let id=request.params.id;
  let cont = request.body.reply;
mysqlConnection.query('INSERT INTO reply SET cont=?, qid=?', [cont,id], (err, results) => {
   if (err) {
     return console.error(err.message);
   }
   response.redirect('back');

 });
})


 //AFICHER ANSWERS
router.get('/answer/:id',(request,response)=>{

         let id=request.params.id;
      var sql = 'SELECT * FROM (SELECT * FROM message right join reply ON message.id=reply.qid UNION SELECT * FROM message left join reply ON message.id=reply.qid) as a where a.id=?';

              mysqlConnection.query(sql, [id], function(error, results, fields) {
  if (error) {
      throw error;}

      console.log(results[0]);
  console.log(results[1]);
  var i=results.length;

  var v=[];
  for(var i=0;i<results.length;i++){v[i]=results[i]}
  if(results.length!==0)
   response.render('answer/answer',{question:results[0],answer:v})


                                                           })


                              })

module.exports = router;
