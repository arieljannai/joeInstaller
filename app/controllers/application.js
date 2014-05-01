var Application = require('../models/application');

exports.getApplications = function (req, res) {
    Application.find(function(err, found_apps) {
        if (err)
            return console.error(err);
        
        res.json(found_apps.map(function(app) {
            return {
                name: app.name,
                icon: app.default_icon,
                description: app.description,
                app_oid: app._id
            };
        }));
    });
};

exports.getApplicationById = function (req, res) {
    var app_oid = req.params.id;
    
    Application.findById(app_oid, function(err, found_app) {
        if (err)
            return console.error(err);
        
        // Getting by id, so there's no way there is more than one
        res.json(found_app);
    });
};

exports.addApplication = function (req, res) {
    var newApp = new Application(req.body);
    newApp.save(function (err, savedApp) {
        if (err) {
            res.json(500, {success : false, error: "Failed saving application to DB"});
        } else {
            res.json({success : true});
        }
    });
};
