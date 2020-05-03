//---------------Dependencies-----------------
let express = require('express')
let bodyParser = require('body-parser')
let livereload = require('livereload')
let connectLivereload = require('connect-livereload')
//--------------------------------------------

let app = express()
var liveReloadServer = livereload.createServer()
liveReloadServer.watch([__dirname +'./assets',__dirname +'./views/Home page'])
const redirectLogin =(req,res,next)=>{
  if (!req.session.userId){
    console.log(req.session.userId);
    res.render('Home page/signup')
  }else {
    next()
  }
}
// const redirectHome =(req,res,next)=>{
//   if (req.session.userId){
//     console.log(req.session.userId);
//     // res.render('UserPages/index')
//     res.render('UserPages/index')
//   }else {
//     next()
//   }
// }

//--------------------(middelware)-----------------------
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//this calling api.js which is contain sql commandes
app.use('/',require('./config/api'))
app.use('/',require('./question'))
//this calling question.js which is contain sql comma
app.use('/question',require('./question'))
//this for calling the static files .js .css images
app.use( express.static("./assets"))
//Reload the pages
app.use(connectLivereload())
//--------------------------------------------------------

//moteur de view
app.set('view engine', 'ejs')

//-------------(Routes for pages)------------------------
app.get('/', (request, response) => {
  response.render('Home page/index')
})
app.get('/avant_voyage', (request, response) => {
  response.render('Home page/avant_voyage')
})
app.get('/signup', (request, response) => {
  response.render('Home page/signup')
})
app.get('/manasik_omra', (request, response) => {
  response.render('Home page/manasik_omra')
})
app.get('/manasik_hadj', (request, response) => {
  response.render('Home page/manasik-hadj')
})
app.get('/ad3iya', (request, response) => {
  response.render('Home page/ad3iya')
})
app.get('/salat', (request, response) => {
  response.render('Home page/salat')
})
app.get('/forgot', (request, response) => {
  response.render('Home page/forgot-pass')
})
app.get('/loisir', (request, response) => {
  response.render('Home page/loisir')
})
app.get('/loisir2', (request, response) => {
  response.render('Home page/loisir2')
})
//------------------------------------------------------------------------------

//-------------------(Routes For Users)-----------------------------------------
app.get('/user',redirectLogin,(request, response)=>{
  response.render('UserPages/index')
})
app.get('/user/avant_voyage',redirectLogin, (request, response) => {
  response.render('UserPages/avant_voyage')
})
app.get('/user/manasik_omra',redirectLogin, (request, response) => {
  response.render('UserPages/manasik_omra')
})
app.get('/user/manasik_hadj',redirectLogin, (request, response) => {
  response.render('UserPages/manasik-hadj')
})
app.get('/user/ad3iya',redirectLogin, (request, response) => {
  response.render('UserPages/ad3iya')
})
app.get('/user/salat',redirectLogin, (request, response) => {
  response.render('UserPages/salat')
})
app.get('/user/loisir',redirectLogin, (request, response) => {
  response.render('UserPages/loisir')
})
app.get('/user/loisir2',redirectLogin, (request, response) => {
  response.render('UserPages/loisir2')
})
app.get('/user/hadj-ifrad',redirectLogin, (request, response) => {
  response.render('UserPages/hadj-ifrad')
})
app.get('/user/hadj-kiran',redirectLogin, (request, response) => {
  response.render('UserPages/hadj-kiran')
})
app.get('/user/hadj-tamato3',redirectLogin, (request, response) => {
  response.render('UserPages/hadj-tamato3')
})
//------------------------------------------------------------------------------

app.post('/', (request, response) => {
  console.log(request.body);
  if (request.body.message === undefined || request.body.message === '') {
    response.redirect('/')
  }
})
//----------------------------------------------------------------------

//Listing to the server
app.listen(8080, ()=>{
  console.log('Server is running on port 8080...');
})
