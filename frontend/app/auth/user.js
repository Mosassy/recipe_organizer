'use strict';

angular.module('myApp.user', [])

    .service('User', function (Restangular, $q, $location, $rootScope) {
        var user = {};

        user.info = {};

        user.registration = function(user_info) {
           var deferred = $q.defer();

            Restangular.one(user.urls.register_user).customPOST(user_info).then(function () {
                user.login(user_info).then(function(){
                    deferred.resolve();
                });
            }, function (error) {
                deferred.reject(error)
            });

            return deferred.promise;
        };

        user.getInfo = function () {
            var deferred = $q.defer();

            Restangular.one(user.urls.get_user_info).customGET().then(function (data) {
                user.info = data;
                $rootScope.$broadcast("user_updated");
                deferred.resolve();
            }, function (error) {
                deferred.reject(error)
            });

            return deferred.promise;
        };

        user.login = function (credentials) {
            var deferred = $q.defer();

            Restangular.one(user.urls.get_token).customPOST(credentials).then(function (data) {
                sessionStorage.setItem('DjangoAuthToken', data.token);
                Restangular.setDefaultHeaders({Authorization: 'Token ' + data.token});
                user.getInfo().then(function () {
                    deferred.resolve();
                })
            }, function (error) {
                deferred.reject(error)
            });
            return deferred.promise
        };

        user.logout = function () {
            user.info = {
                id: '',
                name: ''
            };
            sessionStorage.removeItem('DjangoAuthToken');
            Restangular.setDefaultHeaders({Authorization: ''});
            $location.path('/login');
        };

        user.urls = {
            get_token: 'obtain-token-auth/',
            get_user_info: 'get-user-info/',
            register_user: 'register-user/'
        };

        return user
    });

