//Lets load the mongoose module in our program
var mongoose = require('mongoose');

//Lets connect to our database using the DB server URL.
mongoose.connect('mongodb://localhost/docms');

/**
 * Lets define our Model for User entity. This model represents a collection in the database.
 * We define the possible schema of User document and data types of each field.
 * */
var User = mongoose.model('User', {
  id: Number,
  username: String,
  name: {
    first: String,
    last: String
  },
  email: String,
  password: String
});
var Document = mongoose.model('Document', {
  id: Number,
  ownerId: Number,
  title: String,
  content: String,
  dateCreated: Date,
  lastModified: Date
});
/**
 * Lets Use our Models
 * */

//Lets create a new user
var user1 = new User({name:{first: 'Jason', last: 'Bourne'}, username: 'identity', email: 'bourne@ultimatum.com', password: 'jb'});
var doc1 = new Document({id: 1, ownerId: 2, title: 'Some title', content: 'Some content: Lame content version 2.', dateCreated: '2014-10-4 11:57:23', lastModified: '2014-12-3 11:57:23'});
//Some modifications in user object
// user1.email = user1.email.toUpperCase();

//Lets try to print and see it. You will see _id is assigned.
// console.log(user1);

//Lets save it
user1.save(function (err, userObj) {
  if (err) {
    console.log(err);
  } else {
    console.log('saved successfully:', userObj);
  }
});

User.find(function (err, users) {
  if (err) return console.error(err);
  console.log(users);
});