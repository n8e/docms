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
        first: req.body.name.first,
        last: req.body.name.last
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
        res.send({
          message: "User doesnt exist"
        });
      } else if (user) {
        var validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.send({
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
  // middleware
  api.use(function(req, res, next) {
    console.log("Somebody just came to our app!");
    var token = req.body.token || req.params || req.headers['x-access-token'];

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
      ownerId: req.body.ownerId,
      title: req.body.title,
      content: req.body.content,
      dateCreated: req.body.dateCreated,
      lastModified: req.body.lastModified
    });
    var token = createToken(user);
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


  api.route('/')
    .post(function(req, res) {
      var story = new Story({
        creator: req.decoded.id,
        content: req.body.content
      });
      story.save(function(err) {
        if (err) {
          res.send(err);
          return;
        }
        io.emit('story', newStory);
        res.json({
          message: "New Story Created!"
        });
      });
    })
    .get(function(req, res) {
      Story.find({
        creator: req.decoded.id
      }, function(err, stories) {
        if (err) {
          res.send(err);
          return;
        }
        res.send(stories);
      });
    });

  api.get('/me', function(req, res) {
    res.send(req.decoded);
  });

  return api;
};

//.............................................


// app.route('/users/logout')
//   .post(function(req, res) {
//     res.send('Add a book');
//   });

// app.route('/users/<id>')
//   .get(function(req, res) {
//     res.send('Get a random book');
//   })
//   .put(function(req, res) {
//     res.send('Update the book');
//   })
//   .delete(function(req, res) {
//     res.send('Add a book');
//   });

// app.route('/users/<id>/documents')
//   .get(function(req, res) {
//     res.send('Get a random book');
//   });

// app.route('/documents/')
//   .get(function(req, res) {
//     res.send('Get a random book');
//   })
//   .post(function(req, res) {
//     res.send('Add a book');
//   });

// app.route('/documents/<id>')
//   .get(function(req, res) {
//     res.send('Get a random book');
//   })
//   .put(function(req, res) {
//     res.send('Update the book');
//   })
//   .delete(function(req, res) {
//     res.send('Add a book');
//   });