'use strict';

angular.module('cookbook', ['ngAnimate'])
    .animation('.js-fade', function() {
        return {
            beforeAddClass: function(element, className, done) {
                if (className === 'ng-hide') {
                    element.animate({
                        opacity: 0
                    }, 1000, done);
                } else {
                    done();
                }
            },
            removeClass: function(element, className, done) {
                if (className === 'ng-hide') {
                    element.animate({
                        opacity: 1
                    }, 500, done);
                } else {
                    done();
                }
            }
        };
    })
    .animation('.js-enter', function() {
        return {
            enter: function(element, className, done) {
                element.animate({
                        opacity: 1
                    }, done);
            }
        };
    })
    .directive('hint', function() {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="hint-container transition-in transition-out" ng-show="hint">'
                    + '<span class="hint-text">He was originally a member of Company Flow...</span>'
                    + '</div>'
        };
    });

var HomeCtrl = function($scope) {
    $scope.emcees = ['Killer Mike', 'El-P'];
    $scope.answer = {
        one: ''
    };
};
