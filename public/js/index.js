var joeApp = angular.module('joeInstaller', ['ngResource']);

joeApp.controller('AppsCtrl', ['$scope', 'Application', function ($scope, Application) {
    $scope.applications = Application.query();
}]);

joeApp.controller('TagsCtrl', ['$scope', 'Tags', function ($scope, Tags) {
    $scope.tags = Tags.query();
}]);

joeApp.controller('UsersCtrl', ['$scope', 'Users', function ($scope, Users) {
    $scope.users = Users.query();
}]);

joeApp.factory('Application', ['$resource', function ($resource) {
    return $resource('/applications');
}]);

joeApp.factory('Tag', ['$resource', function ($resource) {
    return $resource('/tags');
}]);

joeApp.factory('User', ['$resource', function ($resource) {
    return $resource('/users');
}]);