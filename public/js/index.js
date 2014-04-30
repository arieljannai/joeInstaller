var joeApp = angular.module('joeInstaller', ['ngResource']);

joeApp.controller('AppsCtrl', ['$scope', 'Application', function ($scope, Application) {
    $scope.applications = Application.query();
}]);


joeApp.factory('Application', ['$resource', function ($resource) {
    return $resource('/applications');
}]);