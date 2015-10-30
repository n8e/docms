// get the required models
var mongoose = require('mongoose');
var User = require('./model/users');
var Document = require('./model/documents');
// var Methods = require('methods');
module.exports = function() {
  // to get the mongo cluster of all the users stored on the db
  getAllUsers = function() {
    mongoose.connect('mongodb://localhost/docms');
    User.find(function (err, users) {
      if (err) console.error(err);
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