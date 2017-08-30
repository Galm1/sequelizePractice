const models = require("./models");

function createUser() {
  const user = models.User.build({
    name: 'Eli Garcia',
    email: 'email@email.com',
    bio: 'my bio'
  });

user.save().then(function (newTodo) {
  console.log(newTodo.id);
})
}
createUser();

function listUsers() {
models.User.findAll().then(function (users) {
  users.forEach(function(user) {
    console.log(user.dataValues)
  })
})
}
listUsers();
