var Application = require('../models/application.js'),
    InstallRequest = require('../models/install_request.js'),
    path = require('path');


exports.getAutoInstallAppData = function(req, res) {
  InstallRequest.findById(req.params.requestId, function(err, request) {
    if (err) {
      res.send(500, {error: err});
    }

    for (var i in request.applications) {
      if (request.applications[i].checksum === req.params.appChecksum) {
        res.sendfile(path.join(__dirname, '../../app_store', request.applications[i].location));
      }
    }
  });
}

exports.getAutoInstallData = function(req, res) {
  InstallRequest.findById(req.params.requestId, function(err, request) {
    if (err) {
      res.send(500, {error: err});
    }

    var retRequest = {
      userName: request.userName,
      token: request.token,
      applications: []
    };

    retRequest.applications.push.apply(retRequest.applications, request.applications.toObject().map(function(obj) {
      return {
        name: obj.name,
        version: obj.version,
        checksum: obj.checksum,
        location: 'http://localhost:3000' + req.path + '/' + obj.checksum,
        installerName: obj.installerName
      };
    }));

    res.json(retRequest);
  });
};

exports.getAutoinstallInfo = function(req, res) {
  var appRequest = {};
  appRequest.userName = req.user.displayName;
  appRequest.token = req.user.token;
  appRequest.applications = [];

  Application.findById(req.query.appId, function(err, app) {
    if (err) {
      res.send(500, {error: err});
    }

    var version = req.query.version;

    for (var i in app.versions) {
      if (app.versions[i].version === version) {
        var appVer = {
          name: app.name,
          version: version,
          checksum: app.versions[i].checksum,
          location: app.versions[i].path,
          installerName: 'installer.bat'
        };

        appRequest.applications.push(appVer);

        var installRequest = new InstallRequest(appRequest);
        installRequest.save(function(err, savedRequest) {
          if (err) {
            res.send(500, {error: err});
          }

          res.send('http://localhost:3000/auto_install/' + savedRequest._id.toString());
        });
      }
    }
  });
};
