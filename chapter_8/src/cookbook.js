'use strict';

angular.module('cookbook', [])
    .service('emcees', function($http) {
        return {
            emcee: {},
            getUKEmcee: function(id) {
                var that = this;
                return $http.get('/emcees/uk/' + id)
                    .then(function(response) {
                        that.emcee = response;
                    })
                    .catch(function(error) {
                        throw Error(error);
                    });
            },
            getUKEmcees: function() {
                return $http.get('/emcees/uk');
            },
            addUKEmcee: function(emcee) {
                return $http.post('/emcees/uk', emcee);
            }
        };
    })
    .service('users', function($http) {
        return {
            getUsers: function() {
                return $http.get('http://jsonplaceholder.typicode.com/users');
            }
        };
    })
    .constant('MESSAGES', {
        'errors': {
            'ukemcees': 'There was an error loading emcees based in good old blighty.'
        }
    });

var HomeCtrl = function($scope, users) {
    $scope.onLoadUsers = function() {
        users.getUsers().then(function(response) {
            $scope.users = response.data;
        });
    };
};
