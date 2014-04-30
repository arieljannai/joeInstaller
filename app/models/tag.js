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

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : String,
    applications: [{ name : String, icon : String, description : String, app_oid : ObjectId}]
});

var Tag = mongoose.model('Tag', schema);

module.exports = Tag;