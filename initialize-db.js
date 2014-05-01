/** Sample Entry: 
{
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

require('./config/config');
var Application = require('./app/models/application'),
    Tag = require('./app/models/tag'),
    mongoose = require('mongoose');

var apps = [new Application({name: 'Brackets',
                             description: 'A wonderful application for... things',
                             default_icon: 'http://clintberry.com/images/branding_256.png',
                             versions: [
                                 {
                                     version: 'Sprint 38',
                                     path: '/usr/bin/brackets',
                                     checksum: 'R2D2R2D2',
                                     description: 'Moar new features!'
                                 },
                                 {
                                     version: 'Sprint 36',
                                     path: '/usr/bin/brackets36',
                                     checksum: 'C3P0',
                                     description: 'We still suck'
                                 }
                             ],
                             tags : ['development', 'web']}),
           new Application({name: 'Git',
                             description: 'This will ruin your life',
                             default_icon: 'http://thril.uws.edu.au/wp-content/uploads/2013/10/git-icon.png',
                             versions: [
                                 {
                                     version: '1.9.2',
                                     path: '/usr/bin/git',
                                     checksum: 'RAWR',
                                     description: 'Now with simple mode, for the most complicated app in the world!'
                                 }
                             ],
                            tags : ['development', 'source control', 'open source']}),
           new Application({name: 'Coca-Cola',
                             description: 'Life',
                             default_icon: 'http://worldofpopculture.com/wp-content/uploads/2014/02/Coca-Cola.jpg',
                             versions: [
                                 {
                                     version: 'New Coke',
                                     path: '/usr/bin/coca',
                                     checksum: 'COLaaAaaAA',
                                     description: 'Now with actual drugs!'
                                 }
                             ],
                             tags : ['development', 'enjoy life', 'drink responsibly']
                           })];

var tags = [new Tag({name: 'development',
                    applications: [],
                    applications_count: 0}),
            new Tag({name: 'web',
                    applications: [],
                    applications_count: 0}),
            new Tag({name: 'source control',
                    applications: [],
                    applications_count: 0}),
            new Tag({name: 'open source',
                    applications: [],
                    applications_count: 0}),
            new Tag({name: 'enjoy life',
                    applications: [],
                    applications_count: 0}),
            new Tag({name: 'drink responsibly',
                    applications: [],
                    applications_count: 0}),
            new Tag({name: '.net',
                     applications: [],
                     applications_count: 0})];

Application.find(function(err, apps) {
    apps.forEach(function (app) {
        app.remove();
    });
});

Tag.find(function(err, tags) {
    tags.forEach(function (tag) {
        tag.remove();
    });
});

apps.forEach(function (app) {
    app.save(function (err, saved_app) {
        if (err)
            return console.error(err);
        
        console.log("Created application " + saved_app.name + " in the DB!");
    });
});

tags.forEach(function (tag) {
    apps.filter(function (app) {
            return app.tags.indexOf(tag.name) != -1})
        .forEach(function (app) {
            tag.applications.push({
                name : app.name,
                icon : app.default_icon,
                description : app.description,
                app_oid : app._id});
            tag.applications_count++;
        });
    
    tag.save(function (err, saved_tag) {
        if (err)
            return console.error(err);
        
        console.log("Created tag " + saved_tag.name + " in the DB!");
    });
});