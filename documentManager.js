// get the required models
var User = require('./model/users');
var Document = require('./model/documents');

function documentManager() {
  // to get the mongo cluster of all the users stored on the db
  this.getAllUsers = function() {
    User.find(function (err, users) {
      if (err) return console.error(err);
      console.log(users);
    });
  };

  // to get the mongo cluster of all the user roles
  this.getAllRoles = function() {};

  // to get the mongo cluster of all the documents stored
  this.getAllDocuments = function() {
    Document.find(function (err, documents) {
      if (err) return console.error(err);
      console.log(documents);
    });
  };

  // to get the mongo cluster of all the documents filtered by role
  this.getAllDocumentsByRole = function() {};

  // to get the mongo cluster of all the documents filtered by date
  this.getAllDocumentsByDate = function() {};
}