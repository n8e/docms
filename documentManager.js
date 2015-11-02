// get the required models
var mongoose = require('mongoose');
var User = require('./model/users');
var Document = require('./model/documents');
mongoose.connect('mongodb://localhost/docms');
// var Methods = require('methods');
module.exports = function() {
  // to get the mongo cluster of all the users stored on the db
  this.getAllUsers = function() {
    return User.find(function (err, users) {
      if (err) return console.error(err);
      return users;
    });
    // mongoose.connection.close();

  };

  // // to get the mongo cluster of all the user roles
  // this.getAllRoles = function() {};

  // // to get the mongo cluster of all the documents stored
  // this.getAllDocuments = function() {
  //   mongoose.connect('mongodb://localhost/docms');
  //   Document.find(function (err, documents) {
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