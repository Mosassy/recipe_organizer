'use strict';

angular.module('myApp.my-recipes', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/my-recipes', {
            templateUrl: 'my-recipes/my-recipes.html',
            controller: 'MyRecipesCtrl'
        });
    }])

    .controller('MyRecipesCtrl', ['$scope', 'Restangular', function($scope, Restangular) {
        Restangular.all('my-recipes').getList().then(function (recipes) {
            $scope.recipes = recipes;
        });
    }]);