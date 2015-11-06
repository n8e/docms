// grab the things we need
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// create a schema
var DocumentSchema = new Schema({
  id: Number,
  ownerId: Number,
  title: String,
  content: String,
  dateCreated: Date,
  lastModified: Date
});


// make the model available to our users in our Node applications
module.exports = mongoose.model('Document', DocumentSchema);