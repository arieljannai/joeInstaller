var application = require('../models/application');

module.exports.getApplications = function (req, res) {
    application.find(function(err, found_apps) {
        if (err)
            return console.error(err);
        
        res.json(found_apps.map(function(app) {
            return {
                name: app.name,
                icon: app.icon,
                description: app.description,
                app_oid: app._id
            };
        }));
    });
};

module.exports.getApplicationById = function (req, res) {
    var app_oid = req.params.id;
    
    application.find({_id: app_oid}, function(err, found_app) {
        if (err)
            return console.error(err);
        
        // Getting by id, so there's no way there is more than one
        res.json(found_app[0]);
    });
};