/**
{
    '_id' : '123123123',
    'name': ' Development',
    'applications' : [
        {
            'name' : 'Microsoft Visual Studio',
            'icon' : 'C:\path',
            'description' : 'A wonderful amazing doesn't ever work tool',
            'app_oid' : '1A3D'
        }]
}
*/

var mongoose = require('mongoose'),
    capitalize = require('../utils').capitalize;

var schema = new mongoose.Schema({
    name: { type: String, index: {unique: true}},
    applications: [{ name : String, icon : String, description : String, app_oid : mongoose.Schema.ObjectId}],
    applications_count : Number
});

schema.pre('save', function(next) {
    this.name = capitalize(this.name);
    next();
});

var Tag = mongoose.model('Tag', schema);

module.exports = Tag;