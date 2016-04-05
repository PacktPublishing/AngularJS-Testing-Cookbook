'use strict';

angular.module('services.emcees', []);
angular.module('services.deejays', []);
angular.module('services.breakers', []);

angular.module('cookbook', [])
    .directive('emcee', function() {
        return {
            restrict: 'E',
            link: function(scope, element) {
                scope.onClick = function() {
                    element.text('Step up ' + scope.emcee + '!');
                };
            }
        };
    });

angular.module('artists', [])
    .factory('Artists', ['imageStore',
        function(imageStore) {
            // API
            return {
                thumb: function(id) {
                    return imageStore.thumbnailUrl(id);
                }
            };
        }
    ]);

angular.module('hiphop', [])
    .factory('deejays', function($rootScope, scratch) {
        return {
            originator: 'DJ Kool Herc',
            technique: scratch.technique()
        };
    })
    .factory('scratch', function($rootScope) {
        console.log('Called scratch!');
        return {
            technique: function() {
                return 'breakbeat';
            }
        };
    });