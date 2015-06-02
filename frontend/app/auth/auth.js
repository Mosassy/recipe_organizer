'use strict';

angular.module('myApp.auth', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'auth/auth.html',
                controller: 'AuthCtrl'

            })
            .when('/register', {
                templateUrl: 'auth/registration.html',
                controller: 'RegistrationCtrl'

            });

    }])

    .controller('AuthCtrl', ['$scope', 'Restangular','User', '$location', function ($scope, Restangular, User, $location) {
        $scope.credentials = {
            username: "",
            password: ""
        };

        $scope.login = function () {
            User.login($scope.credentials).then(function () {
                $location.path('/recipes')
            }, function () {
                alert("There was a problem. Please try again")
            })
        };
    }])

    .controller('RegistrationCtrl', ['$scope', 'Restangular','User', '$location', function ($scope, Restangular, User, $location) {
        $scope.user_info = {};

        $scope.register = function () {
            User.registration($scope.user_info).then(function () {
                $location.path('/recipes')
            }, function () {
                alert("There was a problem. Please try again")
            })
        };
    }]);