'use strict';

describe('A Brief Look At Testing Animations - ', function() {
    var scope;
    var element;
    var $animate;
    var $rootElement;

    beforeEach(module('cookbook', 'ngAnimateMock'));

    describe('Synchronous testing of animations', function() {

        var animatedShow = false;
        var animatedHide = false;

        beforeEach(module(function($animateProvider) {
            $animateProvider.register('.js-fade', function() {
                return {
                    beforeAddClass: function(element, className, done) {
                        animatedHide = true;
                        done();
                    },
                    removeClass: function(element, className, done) {
                        animatedShow = true;
                        done();
                    }
                };
            });
        }));

        beforeEach(inject(function($injector) {
            scope = $injector.get('$rootScope').$new();
            $rootElement = $injector.get('$rootElement');
        }));

        beforeEach(inject(function($compile) {
            element = angular.element('<div class="js-fade" ng-show="hint"></div>');
            $compile(element)(scope);
            scope.$digest();
            $rootElement.append(element);
        }));

        it('should animate to show', function() {
            scope.hint = true;
            scope.$digest();
            expect(animatedShow).toBeTruthy();
        });

        it('should animate to hide', function() {
            scope.hint = true;
            scope.$digest();
            scope.hint = false;
            scope.$digest();
            expect(animatedHide).toBeTruthy();
        });

    });

    describe('Testing animations with ngAnimateMock', function() {

        beforeEach(inject(function($injector) {
            scope = $injector.get('$rootScope').$new();
            $animate = $injector.get('$animate');
            $rootElement = $injector.get('$rootElement');
        }));

        beforeEach(inject(function($compile) {
            element = angular.element('<div class="js-enter"></div>');
            $compile(element)(scope);
            scope.$digest();
        }));

        it('should append the element to parent element', function() {
            var queuedObject;
            $animate.enter(element, $rootElement);
            queuedObject = $animate.queue.shift();
            expect(queuedObject.element[0]).toEqual($rootElement.children()[0]);
        });

    });

    // http://jasmine.github.io/2.1/introduction.html#section-Asynchronous_Support
    describe('Asynchronous testing of animations', function() {

        beforeEach(inject(function($injector) {
            scope = $injector.get('$rootScope').$new();
            $rootElement = $injector.get('$rootElement');
        }));

        beforeEach(inject(function($compile) {
            element = angular.element('<div class="js-fade" ng-show="hint"></div>');
            $compile(element)(scope);
            scope.$digest();
            $rootElement.append(element);
        }));

        it('should animate to an opacity of 1', function() {
            scope.hint = true;
            scope.$digest();
            expect(element.css('opacity')).toEqual('1');
        });

        it('should animate to an opacity of 0', function(done) {
            scope.hint = true;
            scope.$digest();
            scope.hint = false;
            scope.$digest();
            setTimeout(function() {
                expect(element.css('opacity') < 1).toBeTruthy();
                done();
            }, 1000);
        });

    });

});
