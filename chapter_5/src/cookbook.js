'use strict';

angular.module('cookbook', [])
    .directive('writers', function($window) {
        return {
            restrict: 'E',
            link: function(scope, element) {

                function onResize(e) {
                    scope.windowWidth = $window.outerWidth;
                    scope.$digest();
                }

                angular.element($window).bind('resize', onResize);

                element.text('Graffiti artist: ' + scope.artist);
            }
        };
    })
    .directive('emcees', function() {
        return {
            restrict: 'E',
            templateUrl: 'template.html',
            link: function(scope, element) {
                scope.emcee = scope.emcees[0];
            }
        };
    })
    .directive('deejay', function($window) {
        return {
            restrict: 'E',
            template: '<div ng-show="showBooth" class="deejay-booth" ng-class="{popup: isPopup === true}"><h2 id="deejay_name">{{deejay.name}}</h2><p class="deejay-style">{{deejay.style}}</p><button class="hide-btn" ng-click="hideBooth()">Hide Booth</button></div>',
            link: function(scope) {
                scope.showBooth = true;
                scope.isPopup = $window.name.search(/popup/) >= 0;
                scope.hideBooth = function() {
                    scope.showBooth = false;
                };
            }
        };
    })
    .directive('breakers', function() {
        return {
            restrict: 'E',
            template: '<input type="text" name="input" value="" ng-keypress="onSubmit($event)"><ul><li ng-repeat="breaker in breakers">{{breaker.name}}</li></ul>',
            link: function(scope, element) {
                scope.onSubmit = function(event) {
                    if (event.which === 13) {
                        event.preventDefault();
                        var input = event.target;
                        scope.breakers.push({
                            name: input.value
                        });
                    }
                }
            }
        };
    });

var HomeCtrl = function($scope, $window) {
    $scope.id = 'foo';
};
