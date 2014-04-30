var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var schema = new Schema({
  token: String,
  displayName: String,
  name: {givenName: String, familyName: String},
  applications: [{ aid: ObjectId, name: String }]
});

var User = mongoose.model('User', schema);

module.exports = User;
