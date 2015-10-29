// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var documentSchema = new Schema({
  id: Number,
  ownerId: Number,
  title: String,
  content: String,
  dateCreated: Date,
  lastModified: Date
});

// the schema is useless so far
// we need to create a model using it
var Document = mongoose.model('Document', documentSchema);

// make this available to our users in our Node applications
module.exports = Document;