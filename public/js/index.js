var joeApp = angular.module('joeInstaller', ['ngResource']);

joeApp.controller('AppsCtrl', ['$scope', 'Application', function ($scope, Application) {
    $scope.applications = Application.query();
}]);

joeApp.controller('TagsCtrl', ['$scope', 'Tag', function ($scope, Tag) {
    $scope.tags = Tag.query();
}]);

joeApp.controller('UsersCtrl', ['$scope', 'User', function ($scope, User) {
    $scope.users = User.query();
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