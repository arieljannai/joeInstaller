var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  userName: String,
  token: String,
  applications: [{name: String, version: String, checksum: String, location: String, installerName: String}]
});

var InstallRequest = mongoose.model('InstallRequest', schema);
module.exports = InstallRequest;
