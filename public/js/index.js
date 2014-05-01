var joeApp = angular.module('joeInstaller', ['ngResource']);

/*joeApp.value('me', ['$scope', 'Me', function($scope, Me){
    joeApp.me = Me.get();
}]);

console.log('me: ' + me);*/

joeApp.controller('AppsCtrl', ['$scope', 'Application', function ($scope, Application) {
    $scope.applications = Application.query();
    $scope.showSelectedAppDivider = false;
    
    $scope.changeSelecetedApp = function (app) {
        $scope.selectedApp = app;
        $scope.showSelectedAppDivider = true;
    }
}]);

joeApp.controller('TagsCtrl', ['$scope', 'Tag', function ($scope, Tag) {
    $scope.tags = Tag.query();
}]);

joeApp.controller('UsersCtrl', ['$scope', 'User', function ($scope, User) {
    $scope.users = User.query();
    $scope.me = User.authenticated();
}]);

joeApp.factory('Application', ['$resource', function ($resource) {
    return $resource('/applications');
}]);

joeApp.factory('Tag', ['$resource', function ($resource) {
    return $resource('/tags');
}]);

joeApp.factory('User', ['$resource', function ($resource) {
    return $resource('/users', {}, { authenticated: {method: 'GET', url: '/user/authenticated'} });
}]);