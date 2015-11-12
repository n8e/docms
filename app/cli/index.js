var vorpal = require('vorpal')();
var prompt = require('prompt');
var request = require('superagent');

prompt.start();

vorpal
  .command('login', "logs in user")
  .action(function(args, callback) {
    prompt.get(['username', 'password'], function(err, result) {
      if (err) {
        return onErr(err);
      }
      console.log(result);
      request
        .post('http://localhost:3000/api/users/login')
        .send(result)
        .end(function(err, res) {
          if (!err) {
            console.log("You have successfully logged in.");
            callback();
          } else {
            console.log("There was a problem logging you in.\n"+err+'\n'+res.body.message);
            callback();
          }
        });
      // console.log('Login input received:');
      // console.log('  Username: ' + result.username);
      // console.log('  Email: ' + result.email);
    });
  });

vorpal
  .command('signup', "logs in user")
  .action(function(args, callback) {
    prompt.get(['firstname', 'lastname', 'email', 'password', 'role'], function(err, result) {
      if (err) {
        return onErr(err);
      }
      console.log('Login input received:');
      console.log('  Username: ' + result.username);
      console.log('  Email: ' + result.email);
      callback();
    });
  });

vorpal
  .delimiter('docms$')
  .show();
