//---------------Dependencies-----------------
let express = require('express')
let bodyParser = require('body-parser')
let livereload = require('livereload')
let connectLivereload = require('connect-livereload')
let mysqlConnection= require('./config/config')
const port = process.env.PORT || 8080;
//--------------------------------------------

let app = express()
var liveReloadServer = livereload.createServer()
liveReloadServer.watch([__dirname +'./assets',__dirname +'./views/Home page'])

const redirectLogin =(req,res,next)=>{
  if (!req.session.userId){
    res.render('Home page/signup')
  }else {
    console.log(req.session.variabales);
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
app.get('/use',redirectLogin,(request, response)=>{
  response.render('UserPages/index')
})
app.get('/user',redirectLogin,(request, response)=>{
  response.render('UserPages/user',request.session.variabales)
})
app.get('/user/transport',redirectLogin,(request, response)=>{
  response.render('UserPages/transport',request.session.variabales)
})
app.get('/user/fi9h_hadj',redirectLogin,(request, response)=>{
  response.render('UserPages/fi9h_hadj',request.session.variabales)
})
app.get('/user/avant_voyage',redirectLogin, (request, response) => {
  response.render('UserPages/avant_voyage',request.session.variabales)
})
app.get('/user/manasik_omra',redirectLogin, (request, response) => {
  response.render('UserPages/manasik_omra',request.session.variabales)
})
app.get('/user/manasik-hadj',redirectLogin, (request, response) => {
  response.render('UserPages/manasik-hadj',request.session.variabales)
})
app.get('/user/ad3iya',redirectLogin, (request, response) => {
  response.render('UserPages/ad3iya',request.session.variabales)
})
app.get('/user/salat',redirectLogin, (request, response) => {
  response.render('UserPages/salat',request.session.variabales)
})
app.get('/user/loisir',redirectLogin, (request, response) => {
  response.render('UserPages/loisir',request.session.variabales)
})
app.get('/user/loisir2',redirectLogin, (request, response) => {
  response.render('UserPages/loisir2',request.session.variabales)
})
app.get('/user/hadj-ifrad',redirectLogin, (request, response) => {
  response.render('UserPages/hadj-ifrad',request.session.variabales)
})
app.get('/user/hadj-kiran',redirectLogin, (request, response) => {
  response.render('UserPages/hadj-kiran',request.session.variabales)
})
app.get('/user/hadj-tamato3',redirectLogin, (request, response) => {
  response.render('UserPages/hadj-tamato3',request.session.variabales)
})
app.get('/form',redirectLogin,(request, response) => {
  response.render('UserPages/form',request.session.variabales)
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
app.listen(port, ()=>{
  console.log('Server is running on port 8080...');
})
