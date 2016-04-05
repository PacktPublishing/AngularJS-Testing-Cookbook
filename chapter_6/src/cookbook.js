'use strict';

angular.module('cookbook', [])
    .directive('wuTang', function($window) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                scope.canPlay = false;

                angular.element($window).on('oncanplay', function() {
                    scope.canPlay = true;
                });
            }
        };
    })
    .factory('jwplayer', function() {
        return function() {
            return {
                onReady: function(callback) {
                    return callback;
                }
            }
        };
    })
    .directive('jwplayer', function(jwplayer) {
        return {
            restrict: 'EA',
            link: function(scope, element) {
                scope.ready = false;

                jwplayer()
                    .onReady(scope.readyHandler);

                scope.readyHandler = function() {
                    scope.ready = true;
                }
            }
        };
    })
    .directive('bgColourSelector', function() {
        return {
            restrict: 'A',
            templateUrl: 'template.html'
        };
    });

var HomeCtrl = function($scope) {
    $scope.UNKNOWN_NAME = 'Unknown emcee';

    $scope.showWuEmcee = function(emceeName) {
        $scope.$broadcast('showWuEmcee', emceeName);
    };

    $scope.onShowWuEmcee = function(e, emceeName) {
        if (!emceeName) {
            $scope.wuWho = $scope.UNKNOWN_NAME;
            return;
        }
        $scope.wuWho = emceeName;
    }

    $scope.$on('showWuEmcee', $scope.onShowWuEmcee);
};
