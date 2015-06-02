'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.recipes',
    'myApp.my-recipes',
    'myApp.recipeDetail',
    'myApp.addRecipe',
    'myApp.version',
    'restangular',
    'myApp.auth',
    'myApp.user'
]).
    config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
        $routeProvider.otherwise({redirectTo: '/recipes'});
        RestangularProvider.setBaseUrl('http://localhost:8001');
        RestangularProvider.setRequestSuffix('/');
    }])
    .controller('AppCtrl', function (User, $scope, Restangular, $location) {
        $scope.$on("user_updated", function () {
            $scope.user = User.info
        });


        if (sessionStorage.getItem('DjangoAuthToken')) {
            var token = sessionStorage.getItem('DjangoAuthToken');
            Restangular.setDefaultHeaders({Authorization: 'Token ' + token});
            User.getInfo().then(function () {
                $location.path('/my-recipes');
            });
        }

        $scope.logout = function () {
            User.logout();
            $scope.user = null;
            $location.path('/login');
        };

        $scope.$on('$routeChangeStart', function (event, next) {
            if (User.info.id == undefined && next.$$route.originalPath != ('/register' || '/login')) {
                $location.path('/login');
            }
        })
    });
