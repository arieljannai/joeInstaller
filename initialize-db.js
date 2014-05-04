require('./config/config');
var Application = require('./app/models/application'),
    Tag = require('./app/models/tag'),
    User = require('./app/models/user'),
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
                           }),
           new Application({name: 'Microsoft Visual Studio',
                            description : 'Freakin awesome',
                            default_icon: 'http://upload.wikimedia.org/wikipedia/commons/e/e4/Visual_Studio_2013_Logo.svg',
                            versions: [
                                {
                                    version: '2010',
                                    path: 'http://install.joe/installs/visualstudio/2010',
                                    icon: 'http://www.haithem-araissia.com/css/images/Skills/visual-studio--logo.gif',
                                    checksum : 'CCCCCCCCCCCC',
                                    description: 'Now with coffee maker and ninja turtle'
                                },
                                {
                                    version: '2013',
                                    path: 'http://install.joe/installs/visualstudio/2013',
                                    icon: 'http://computertrainingcenters.com/wp-content/uploads/2013/01/AXFMSTOW2MBFAJZDG4UZTWP6R6NLYV7K.preview-390x250.png',
                                    checksum : 'CCCCCCCCCCCC',
                                    description: 'Now with coffee maker and ninja turtle. But now its x2'
                                }
                            ],
                            tags : ['Development', '.NET', 'Microsoft']
                            }),
           new Application({name: 'Notepad++',
                            description : 'awesome text editor',
                            default_icon: 'http://upload.wikimedia.org/wikipedia/commons/0/0f/Notepad%2B%2B_Logo.png',
                            versions: [
                                {
                                    version: '6.5.5',
                                    path: 'http://install.joe/installs/visualstudio/2010',
                                    icon: 'http://upload.wikimedia.org/wikipedia/commons/0/0f/Notepad%2B%2B_Logo.png',
                                    checksum : 'CCCCCCCCCCCC',
                                    description: 'Now with coffee maker and ninja turtle'
                                }
                            ],
                            tags : ['Development', 'text editor', 'Don Ho']
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
                     applications_count: 0}),
           new Tag({name: 'java',
                     applications: [],
                     applications_count: 0}),
           new Tag({name: 'scala',
                     applications: [],
                     applications_count: 0}),
           new Tag({name: 'microsoft',
                     applications: [],
                     applications_count: 0}),
           new Tag({name: 'php',
                     applications: [],
                     applications_count: 0}),
           new Tag({name: 'text editor',
                     applications: [],
                     applications_count: 0}),
           new Tag({name: 'application server',
                     applications: [],
                     applications_count: 0}),
           new Tag({name: 'oracle',
                     applications: [],
                     applications_count: 0}),
           new Tag({name: 'ibm',
                     applications: [],
                     applications_count: 0}),
           new Tag({name: 'cto lead',
                     applications: [],
                     applications_count: 0}),
           new Tag({name: 'joe',
                     applications: [],
                     applications_count: 0}),
           new Tag({name: 'wiki',
                     applications: [],
                     applications_count: 0}),
           new Tag({name: 'node.js',
                     applications: [],
                     applications_count: 0}),
           new Tag({name: 'javascript',
                     applications: [],
                     applications_count: 0}),
           new Tag({name: 'ruby',
                     applications: [],
                     applications_count: 0}),
           new Tag({name: 'ruby on rails',
                     applications: [],
                     applications_count: 0}),
           new Tag({name: 'python',
                     applications: [],
                     applications_count: 0}),
           new Tag({name: 'code',
                     applications: [],
                     applications_count: 0}),
           new Tag({name: 'programming',
                     applications: [],
                     applications_count: 0})];

console.log("Removing all applications and tags");

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

setTimeout(function() {
    apps.forEach(function (app) {
        app.save(function (err) {
            if (err)
                return console.error(err);

            console.log("Created application " + app.name + " in the DB!");
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
    
    console.log("Updating users in DB");
    var user_apps = apps.map(function (app) { return {aid: app._id, name: app.name}; });
    User.update({}, {applications: user_apps}, {multi: true}, function (err, affected) {
        if (err)
            console.log(err);
    });
    
    setTimeout(process.exit, 4000);
}, 4000);