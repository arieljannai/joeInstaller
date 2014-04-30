var app = angular.module('joeInstaller', []);

/*app.controller('ShowProgramsController', ['$scope', function ShowProgramsController($scope) {
    $scope.programs = [
        {'name': 'Visual Studio', 'version': '2013' },
        {'name': 'Notepad++', 'version': '6.5.3' },
        {'name': 'Sublime', 'version': '2.9' },
        {'name': 'Eclipse', 'version': 'Helios' },
        {'name': 'Office', 'version': '2010' },
        {'name': 'Chrome', 'version': '32.2.15322.15232665' }
    ];
}]);*/

app.controller('ShowProgramsController', ['$scope', function($scope) {
    $scope.applications = [
        {
            '_id' : '1A3D',
            'name': 'Microsoft Visual Studio',
            'description' : 'Freakin awesome',
            'default_icon': 'http://upload.wikimedia.org/wikipedia/commons/e/e4/Visual_Studio_2013_Logo.svg',
            'versions': [
                {
                    'version': '2010',
                    'path': 'http://install.joe/installs/visualstudio/2010',
                    'icon': 'http://www.haithem-araissia.com/css/images/Skills/visual-studio--logo.gif',
                    'checksum' : 'CCCCCCCCCCCC',
                    'description': 'Now with coffee maker and ninja turtle'
                },
                {
                    'version': '2013',
                    'path': 'http://install.joe/installs/visualstudio/2013',
                    'icon': 'http://computertrainingcenters.com/wp-content/uploads/2013/01/AXFMSTOW2MBFAJZDG4UZTWP6R6NLYV7K.preview-390x250.png',
                    'checksum' : 'CCCCCCCCCCCC',
                    'description': 'Now with coffee maker and ninja turtle. But now its x2'
                }
            ],
            'tags' : ['Development', '.NET', 'Microsoft']
        },
        {
            '_id' : '2B7A',
            'name': 'Notepad++',
            'description' : 'awesome text editor',
            'default_icon': 'http://upload.wikimedia.org/wikipedia/commons/0/0f/Notepad%2B%2B_Logo.png',
            'versions': [
                {
                    'version': '6.5.5',
                    'path': 'http://install.joe/installs/visualstudio/2010',
                    'icon': 'http://upload.wikimedia.org/wikipedia/commons/0/0f/Notepad%2B%2B_Logo.png',
                    'checksum' : 'CCCCCCCCCCCC',
                    'description': 'Now with coffee maker and ninja turtle'
                }
            ],
            'tags' : ['Development', 'text editor', 'Don Ho']
        }
    ];
    
    $scope.tags = [
        'Development', '.NET', 'Microsoft', 'Text Editor',
        'Design', 'Oracle', 'IBM', 'Twitter',
        'Visual Studio', 'Photoshop', 'Adobe', 'DB'
    ];
}]);
