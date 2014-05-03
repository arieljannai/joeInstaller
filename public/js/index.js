var joeApp = angular.module('joeInstaller', ['ngResource']);

/*joeApp.value('me', ['$scope', 'Me', function($scope, Me){
    joeApp.me = Me.get();
}]);

console.log('me: ' + me);*/

joeApp.controller('AppsCtrl', ['$scope', 'Application', function ($scope, Application) {
    $scope.applications = Application.query();
    $scope.showSelectedAppDivider = false;
    
    $scope.changeSelecetedApp = function (app) {
        $scope.selectedApp = Application.app({app_oid: app.app_oid});
        //$scope.appFirstVersion = $scope.selectedApp.versions[0];
        $scope.showSelectedAppDivider = true;
    }
}]);

joeApp.controller('TagsCtrl', ['$scope', 'Tag', function ($scope, Tag) {
    $scope.tags = Tag.query();
    $scope.popularTags = Tag.popular();
}]);

joeApp.controller('UsersCtrl', ['$scope', 'User', function ($scope, User) {
    $scope.users = User.query();
    $scope.me = User.authenticated();
}]);

joeApp.factory('Application', ['$resource', function ($resource) {
    return $resource('/applications', null, { app: {method: 'GET', url: '/applications/:app_oid'} });
}]);

joeApp.factory('Tag', ['$resource', function ($resource) {
    return $resource('/tags', null, { popular: {method: 'GET', url: '/popular/tags'} });
}]);

joeApp.factory('User', ['$resource', function ($resource) {
    return $resource('/users', null, { authenticated: {method: 'GET', url: '/user'} });
}]);