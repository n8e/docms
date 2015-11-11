mongomo// get the required models
var config = require('../../server/config/config');
var mongoose = require('mongoose');
var User = require('../../server/models/users');
var Document = require('../../server/models/documents');

// connect to the database
mongoose.connect(config.database);
// mongoose.connection.db.dropDatabase(function(err) {
//   console.log('dropped collection %s, %s ', users, err);
//   users = '';
//   mongoose.connection.close();
//   initialized = false;
//   cb();
// });

module.exports = function() {
  // to add a user to the db
  this.createUser = function(cb) {
    var user1 = new User({
      name: {
        first: 'Nate',
        last: 'Martin'
      },
      username: 'natemmartin',
      email: 'nate.martin@andela.com',
      password: '12345',
      role: 'administrator'
    });

    user1.save(function(err, userObj) {
      if (err) {
        console.log(err);
      } else {
        console.log('saved successfully:', userObj);
      }
    });
  };


  // to get the mongo cluster of all the users stored on the db
  this.getAllUsers = function() {
    return User.find({}, function(err, users) {
      if (err) return console.error(err);
      console.log(users + " Total: " + users.length + " users.");
    });
  };

  // to get the mongo cluster of all the user roles
  this.getAllRoles = function() {};

  // to get the mongo cluster of all the documents stored
  this.getAllDocuments = function() {
    mongoose.connect('mongodb://localhost/docms');
    Document.find(function(err, documents) {
      if (err) return console.error(err);
      console.log(documents);
    });
    mongoose.connection.close();
  };

  // to get the mongo cluster of all the documents filtered by role
  this.getAllDocumentsByRole = function() {};

  // to get the mongo cluster of all the documents filtered by date
  this.getAllDocumentsByDate = function() {};
};
