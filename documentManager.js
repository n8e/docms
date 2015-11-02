// get the required models
var mongoose = require('mongoose');
var User = require('./model/users');
var Document = require('./model/documents');

// connect to the database
mongoose.connect('mongodb://localhost/docms');
// mongoose.connection.db.dropDatabase(function(err) {
//   console.log('dropped collection %s, %s ', users, err);
//   users = '';
//   mongoose.connection.close();
//   initialized = false;
//   cb();
// });

module.exports = function() {
  // to add a user to the db
  this.createUser = function() {
    var user1 = new User({
      name: {
        first: 'Martin',
        last: 'Mwangi'
      },
      username: 'andela-nmartin',
      email: 'godmetweenciati@gmail.com',
      password: '12345'
    });

    User.find({
      email: user1.email
    }, function(err, docs, cb) {
      if (docs.length) {
        cb('Email exists already', null);
      } else {
        user1.save(function(err, userObj) {
          cb(err, user);
          if (err) {
            console.log(err);
          } else {
            return ('saved successfully:' + userObj);
          }
        });
      }
    });

  };

  // to get the mongo cluster of all the users stored on the db
  this.getAllUsers = function() {
    return User.find(function (err, users) {
      if (err) return console.error(err);
      return users;
    });
  };

  // // to get the mongo cluster of all the user roles
  // this.getAllRoles = function() {};

  // // to get the mongo cluster of all the documents stored
  // this.getAllDocuments = function() {
  //   mongoose.connect('mongodb://localhost/docms');
  //   Document.find(function(err, documents) {
  //     if (err) return console.error(err);
  //     console.log(documents);
  //   });
  //   mongoose.connection.close();
  // };

  // // to get the mongo cluster of all the documents filtered by role
  // this.getAllDocumentsByRole = function() {};

  // // to get the mongo cluster of all the documents filtered by date
  // this.getAllDocumentsByDate = function() {};
};
