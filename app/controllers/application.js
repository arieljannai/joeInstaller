var Application = require('../models/application'),
    multiparty = require('multiparty'),
    path = require('path');

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

exports.uploadApplication = function(req, res) {
  var app_oid = req.params.id;
  var app;
  

  var form = new multiparty.Form({
    uploadDir: path.join(__dirname, '../../app_store'),
    hash: 'sha1'
  });

  form.parse(req, function(err, fields, files) {
    if (err) {
      res.send(500, {error: err});
    }

    Application.findById(app_oid, function(err, found_app) {
      if (err)
        res.send(500, {error: err});
       debugger; 
      for (var i in found_app.versions) {
        if (found_app.versions[i].version === fields.version[0]) {
          var versionElement = found_app.versions[i];
          versionElement.set('path', path.basename(files.installer[0].path));
          versionElement.set('checksum', files.installer[0].hash);
          found_app.versions.set(i, versionElement);
        }
      }

      found_app.save(function(err) {
        if (err) {
          res.send(500, {error: err});
        }

        res.send('Installer uploaded successfully');
      });
    });
  });
};
