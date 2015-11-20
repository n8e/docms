(function() {
  'use strict';
  // get the required models and db connection
  var config = require('../config/config');
  var mongoose = require('mongoose');
  var User = require('../models/users');
  var Document = require('../models/documents');

  var secretKey = config.secretKey;
  var jsonwebtoken = require('jsonwebtoken');


  function createToken(user) {
    var token = jsonwebtoken.sign({
      id: user._id,
      name: user.name,
      username: user.username
    }, secretKey, {
      expiresInMinute: 1440
    });
    return token;
  }

  module.exports = {
    // to add a user to the db
    createUser: function(req, res, next) {
      var user = new User({
        name: {
          first: req.body.firstname,
          last: req.body.lastname
        },
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
      });
      var token = createToken(user);
      user.save(function(err) {
        if (err) {
          res.send(err);
          return;
        }

        res.json({
          success: true,
          message: 'User has been created!',
          token: token
        });
      });
    },


    // to get the mongo cluster of all the users stored on the db
    getAllUsers: function() {
      return User.find({}, function(err, users) {
        if (err) return console.error(err);
        return (users + " Total: " + users.length + " users.");
      });
    },

    // to get the mongo cluster of all the user roles
    getAllRoles: function() {},

    // to get the mongo cluster of all the documents stored
    getAllDocuments: function() {
      mongoose.connect('mongodb://localhost/docms');
      Document.find(function(err, documents) {
        if (err) return console.error(err);
        console.log(documents);
      });
      mongoose.connection.close();
    },

    // to get the mongo cluster of all the documents filtered by role
    getAllDocumentsByRole: function() {},

    // to get the mongo cluster of all the documents filtered by date
    getAllDocumentsByDate: function() {}
  };
})();
