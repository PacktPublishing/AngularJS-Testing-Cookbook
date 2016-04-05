'use strict';

angular.module('cookbook', [])
    .filter('decimalAdjust', function() {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
        return function(type, value, exp) {
            // If the exp is undefined or zero...
            if (typeof exp === 'undefined' || +exp === 0) {
                return Math[type](value);
            }
            value = +value;
            exp = +exp;
            // If the value is not a number or the exp is not an integer...
            if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
                return NaN;
            }
            // Shift
            value = value.toString().split('e');
            value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
            // Shift back
            value = value.toString().split('e');
            return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
        };
    })
    .filter('secondsToTime', function() {
        return function(value) {
            var seconds = Math.floor(value % 60).toString();
            var minutes = Math.floor(value / 60 % 60).toString();
            var hours = Math.floor(value / 60 / 60 % 24).toString();

            function pad(t) {
                if (t && t.length < 2) {
                    return '0' + t;
                }
                return t;
            }
            return pad(hours > 0 ? hours.concat(':') : '').concat(pad(minutes), ':', pad(seconds));
        };
    })
    .directive('stopWatch', function(secondsToTimeFilter) {
        return {
            require: 'ngModel',
            link: function(scope) {

                var timerInterval;
                var timerOffset;

                scope.timer = {
                    current: 0,
                    running: false
                };

                scope.start = function() {
                    timerOffset = Date.now();
                    timerInterval = setInterval(scope.update, 10);
                };

                scope.update = function() {
                    scope.timer.current += scope.delta();
                    scope.$digest();
                };

                scope.stop = function() {
                    clearInterval(timerInterval);
                };

                scope.delta = function() {
                    var now = Date.now();
                    var delta = now - timerOffset;
                    timerOffset = now;
                    return delta;
                };

                // Listeners
                scope.onStartTimer = function() {
                    scope.timer.running = !scope.timer.running;
                    if (scope.timer.running) {
                        scope.start();
                    } else {
                        scope.stop();
                    }
                };

                scope.onResetTimer = function() {
                    scope.timer.current = 0;
                };
            }
        };
    });

var HomeCtrl = function($scope, decimalAdjustFilter) {
    $scope.onClick = function() {
        $scope.decimal = decimalAdjustFilter('round', $scope.decimal, -1);
    };
};
