var User = require('../models/users');
var Document = require('../models/documents');
var config = require('../config/config');

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


module.exports = function(app, express) {
  var api = express.Router();

  api.post('/users', function(req, res) {
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
  });


  api.get('/users', function(req, res) {
    User.find({}, function(err, users) {
      if (err) {
        res.send(err);
        return;
      }
      res.json(users);
    });
  });

  api.post('/users/login', function(req, res) {
    User.findOne({
      username: req.body.username
    }).select('name username password').exec(function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(500).send({
          message: "User doesnt exist"
        });
      } else if (user) {
        var validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.status(500).send({
            message: "Invalid Password"
          });
        } else {
          ///// token
          var token = createToken(user);

          res.json({
            success: true,
            message: "Successfully logged in!",
            token: token
          });
        }
      }
    });
  });

  // ______________________________________________________
  // middleware
  api.use(function(req, res, next) {
    console.log("Somebody just came to our app!");
    var token = req.body.token || req.params.token || req.headers['x-access-token'];
    // check if token exists
    if (token) {
      jsonwebtoken.verify(token, secretKey, function(err, decoded) {
        if (err) {
          res.status(403).send({
            success: false,
            message: "Failed to authenticate user"
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(403).send({
        success: false,
        message: "No token provided!"
      });
    }
  });

  // ______________________________________________________
  // Destination B, checking for a legitimate token


  api.get('/documents', function(req, res) {
    Document.find({}, function(err, documents) {
      if (err) {
        res.send(err);
        return;
      }
      res.json(documents);
    });
  });

  api.post('/documents', function(req, res) {
    var document = new Document({
      ownerId: req.decoded.id,
      title: req.body.title,
      content: req.body.content,
      dateCreated: req.body.dateCreated,
      lastModified: req.body.lastModified
    });
    document.save(function(err) {
      if (err) {
        res.send(err);
        return;
      }

      res.json({
        success: true,
        message: 'Document has been created!'
      });
    });
  });

  api.get('/users/logout', function(req, res) {
    delete req.headers['x-access-token'];

    return res.status(200).json({
      "message": "User has been successfully logged out"
    });
  });

  api.get('/users/:id/documents', function(req, res) {
    var id = req.param('id');
    User.find({
      ownerId: id
    }, function(err, documents) {
      if (err) {
        res.send(err);
        return;
      }
      console.log(documents);
      res.json(documents);
    });
  });

  api.get('/users/:id', function(req, res) {
    var id = req.param('id');
    User.find({
      _id: id
    }, function(err, users) {
      if (err) {
        res.send(err);
        return;
      }
      res.send(users);
    });
  });

  api.put('/users/:id', function(req, res) {
    var id = req.param('id');
    User.findOneAndUpdate({
        _id: id
      }, {
        name: {
          first: req.body.firstname,
          last: req.body.lastname
        },
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
      }, {
        name: {
          first: req.body.firstname,
          last: req.body.lastname
        },
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
      },

      function(err, users) {
        if (err) {
          res.send(err);
          return;
        } else {
          // res.send(users);
          res.json({
            success: true,
            message: "Successfully updated User!"
          });
        }
      });
  });

  api.delete('/users/:id', function(req, res) {
    var id = req.param('id');
    User.findOneAndRemove({
      _id: id
    }, function(err, users) {
      if (err) {
        res.json(401, {
          message: err
        });
        return;
      } else {
        res.json(200, {
          message: users
        });
      }
    });
  });

  api.get('/documents/:id', function(req, res) {
    var id = req.param('id');
    Document.find({
      _id: id
    }, function(err, documents) {
      if (err) {
        res.send(err);
        return;
      }
      res.send(documents);
    });
  });

  api.put('/documents/:id', function(req, res) {
    var id = req.param('id');
    Document.findOneAndUpdate({
        _id: id
      }, {
        ownerId: req.user.id,
        title: req.body.title,
        content: req.body.content,
        dateCreated: req.body.dateCreated,
        lastModified: req.body.lastModified
      }, {
        ownerId: req.body.user.id,
        title: req.body.title,
        content: req.body.content,
        dateCreated: req.body.dateCreated,
        lastModified: req.body.lastModified
      },

      function(err, documents) {
        if (err) {
          res.send(err);
          return;
        } else {
          // res.send(users);
          res.json({
            success: true,
            message: "Successfully updated Document!"
          });
        }
      });
  });

  api.delete('/documents/:id', function(req, res) {
    var id = req.param('id');
    Document.findOneAndRemove({
      _id: id
    }, function(err, documents) {
      if (err) {
        res.json(401, {
          message: err
        });
        return;
      } else {
        res.json(200, {
          message: documents
        });
      }
    });
  });

  api.get('/me', function(req, res) {
    res.send(req.decoded);
  });

  return api;
};
