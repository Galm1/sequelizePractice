const express = require('express'),
  mustacheExpress = require('mustache-express'),
  bodyParser = require('body-parser'),
  sequelize = require('sequelize')
  models = require("./models");

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache')

app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', function(req, res) {
  res.render("index");
})

app.get('/users', function(req, res) {
  models.User.findAll().then(function(users){
    res.render('users', {users: users})
  })
})

app.get('/addUser', function(req, res) {
  res.render('addUser');
})

app.get('/update/:id', function(req, res) {
  models.User.findById(req.params.id).then(function(users){
    res.render('update', {users: users})
  })
})

app.post('/create_user', function(req, res) {
  let nameV = req.body.name;
  let emailV = req.body.email;
  let bioV = req.body.bio;
  console.log(nameV, emailV, bioV);
  const user = models.User.build({
    name: nameV,
    email: emailV,
    bio: bioV
  })
  user.save().then(function () {
    res.redirect('/users')
  })
})

app.post('/delete_user/:id', function(req, res) {
  models.User.destroy({where: {id: req.params.id}})
    .then(function (){
      res.redirect('/users');
    });
})

app.post('/update_user/:id', function(req, res) {
  let nameV = req.body.name;
  let emailV = req.body.email;
  let bioV = req.body.bio;
  models.User.update({
    name: nameV,
    email: emailV,
    bio: bioV
  },{where: {id: req.params.id}})
  .then(function (){
    res.redirect('/users');
  })
})













app.listen(3000, function() {
  console.log('WE ARE RUNNING ON http://localhost:3000/.')
});

process.on('SIGINT', function() {
  console.log("\nshutting down");
  const index = require('./models/index')
  index.sequelize.close()

  setTimeout(function() {
    console.log('we are down Captain');
    process.exit(0);
  }, 500)
});


// const models = require("./models");
//
// function createUser() {
//   const user = models.User.build({
//     name: 'Eli Garcia',
//     email: 'email@email.com',
//     bio: 'my bio'
//   });
//
// user.save().then(function (newTodo) {
//   console.log(newTodo.id);
// })
// }
// createUser();
//
// function listUsers() {
// models.User.findAll().then(function (users) {
//   users.forEach(function(user) {
//     console.log(user.dataValues)
//   })
// })
// }
// listUsers();
