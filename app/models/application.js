/** Sample Entry: 
{
    '_id' : '1A3D',
    'name': 'Microsoft Visual Studio',
    'description' : 'Freakin awesome',
    'default_icon': '...',
    'versions':
    [
        {
            'version': '2012'
            'path': '...',
            'icon': 'C:\root',
            'checksum' : 'CCCCCCCCCCCC',
            'description': 'Now with coffee maker and ninja turtle'
        }
    ],
    'tags' : ['Development', '.NET', 'Microsoft']
}
*/

var mongoose = require('mongoose'),
    capitalize = require('../utils').capitalize;

var schema = new mongoose.Schema({
    name : String,
    description: String,
    default_icon: String,
    versions: [{ version: String, path : String, icon : String, checksum : String, description : String}],
    tags: [ {type: String} ]
});

schema.pre('save', function(next) {
    this.tags = this.tags.map(function(tag) { return capitalize(tag); });
    next();
});

var Application = mongoose.model('Application', schema);

module.exports = Application;