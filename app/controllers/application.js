var application = require('../models/application');

module.exports.getApplications = function (req, res) {
    application.find(function(err, applications) {
        if (err)
            return console.error(err);
        
        res.json(applications.map(function(application) {
            return {
                name: application.name,
                icon: application.icon,
                description: application.description,
                app_oid: application._id
            };
        }));
    });
};