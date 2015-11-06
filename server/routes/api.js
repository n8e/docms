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

  api.get('/all_stories', function(req, res) {
    Story.find({}, function(err, stories) {
      if (err) {
        res.send(err);
        return;
      }
      res.json(stories);
    });
  });

  api.post('/signup', function(req, res) {
    var user = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
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

  api.post('/login', function(req, res) {
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
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];

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


// // more routes for our API will happen here
// router.route('/users')

// // create a user (accessed at POST http://localhost:8080/api/user)
// .post(function(req, res) {

//   var user = new User(); // create a new instance of the Bear model
//   user.name = req.body.name; // set the bears name (comes from the request)

//   // save the bear and check for errors
//   user.save(function(err) {
//     if (err)
//       res.send(err);

//     res.json({
//       message: 'User created!'
//     });
//   });

// });

// // REGISTER OUR ROUTES -------------------------------
// // all of our routes will be prefixed with /api
// app.use('/api', router);

// /////////////////// end routers

// app.route('/users/login')
//   .post(function(req, res) {
//     res.send('Add a book');
//   });

// app.route('/users/logout')
//   .post(function(req, res) {
//     res.send('Add a book');
//   });

// app.route('/users/')
//   .get(function(req, res) {
//     res.send('Get a random book');
//   })
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



// module.exports = app;
