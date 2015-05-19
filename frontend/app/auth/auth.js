'use strict';

angular.module('myApp.auth', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/auth', {
            templateUrl: 'auth/auth.html',
            controller: 'AuthCtrl'
        });
    }])

    .controller('AuthCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
        $scope.credentials = {
            username: "",
            password: ""
        }
    }]);