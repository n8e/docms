// grab the things we need
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// create a schema
var DocumentSchema = new Schema({
  id: String,
  ownerId: String,
  title: String,
  content: String,
  dateCreated: {type: Date, default:Date.now()},
  lastModified: {type: Date, default:Date.now()}
});


// make the model available to our users in our Node applications
module.exports = mongoose.model('Document', DocumentSchema);