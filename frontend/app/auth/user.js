'use strict';

angular.module('myApp.user', [])

.service('User', function(Restangular, $q, $location) {
    var user = {};

    user.info = {
        id: '',
        first_name: '',
        last_name: '',
        usersname: '',
        email: '',
        recipes: ''

    };

    user.getInfo = function() {
        var deferred = $q.defer();

     Restangular.one('get-user-info/').customGET().then(function (data) {
         user.info = data.data;
         deferred.resolve();
     }, function(error){
         deferred.reject(error)
     });

     return deferred.promise;
 };

    user.login = function(credentials) {
        var deferred = $q.defer();

        Restangular.one(user.urls.login).customPOST(credentials).then(function (data) {
            sessionStorage.setItem('DjangoAuthToken', data.data.token);
            Restangular.setDefaultHeaders({Authorization: 'Token ' + response.data.token})
            user.getInfo().then(function() {
                deferred.resolve();
            })
        }, function (error) {
            deferred.reject(error)
        });
        return deferred.promise
    };

    user.logout = function() {
        User.info = {
            id: '',
            name: ''
        };
        sessionStorage.clear();
        Restangular.setDefaultHeaders({Authorization: ''})
        $location.path('/login');
        };

    user.urls = {
        get_token: 'api-auth-token/',
        get_user_info: 'get-user-info/'
    };

    return user
}})

