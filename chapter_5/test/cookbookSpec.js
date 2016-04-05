'use strict';

describe('Testing User Interaction and Directives', function() {

    var rootScope;
    var scope;
    var element;
    var deejay;
    var breakers;
    var $window;

    beforeEach(module('cookbook'));

    beforeEach(function() {
        breakers = [{
            name: 'China Doll'
        }, {
            name: 'Crazy Legs'
        }, {
            name: 'Frosty Freeze'
        }];
        deejay = {
            name: 'Shortee',
            style: 'turntablism'
        };
    });

    beforeEach(inject(function($rootScope, _$window_) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        $window = _$window_;
    }));

    describe('Getting started testing a directive', function() {

        var artist;

        beforeEach(function() {
            artist = 'Amara Por Dios';
        });

        beforeEach(inject(function($compile) {
            element = angular.element('<writers></writers>');
            scope.artist = artist;
            $compile(element)(scope);
            scope.$digest();
        }));

        it('should display correct text in the DOM', function() {
            expect(element.text()).toBe('Graffiti artist: ' + artist);
        });

    });

    describe('Accessing basic html content', function() {

        beforeEach(inject(function($compile) {
            element = angular.element('<deejay></deejay>');
            scope.deejay = deejay;
            $compile(element)(scope);
            scope.$digest();
        }));

        it('should return an element using find()', function() {
            var h2 = element.find('h2');
            expect(h2[0]).toBeDefined();
        });

        // https://developer.mozilla.org/en-US/docs/Web/API/document.querySelector
        it('should return an element using querySelector and css selector', function() {
            var elementByClass = element[0].querySelector('.deejay-style');
            expect(elementByClass).toBeDefined();
        });

        it('should return an element using querySelector and id selector', function() {
            var elementById = element[0].querySelector('#deejay_name');
            expect(elementById).toBeDefined();
        });

        // HTML contents - http://api.jquery.com/html/
        it('should display correct deejay data in the DOM', function() {
            var h2 = element.find('h2');
            expect(h2.html()).toBe(deejay.name);
        });

        // Combined text content - http://api.jquery.com/text/
        it('should retrieve text from <h2>', function() {
            var h2 = element.find('h2');
            expect(h2.text()).toBe(deejay.name);
        });

    });

    describe('Accessing repeater content', function() {

        beforeEach(inject(function($compile) {
            element = angular.element('<breakers></breakers>');
            scope.breakers = breakers;
            $compile(element)(scope);
            scope.$digest();
        }));

        beforeEach(inject(function($controller) {
            $controller('HomeCtrl', {
                $scope: scope
            });
        }));

        // http://api.jquery.com/eq/
        it('should display the correct breaker name', function() {
            var list = element.find('li');
            expect(list.eq(0).text()).toBe('China Doll');
        });

    });

    describe('Scope changes based on user input', function() {

        function $input() {
            return element.children().eq(0);
        }

        beforeEach(inject(function($compile) {
            element = angular.element('<breakers></breakers>');
            scope.breakers = [];
            $compile(element)(scope);
            scope.$digest();
        }));

        beforeEach(inject(function($controller) {
            $controller('HomeCtrl', {
                $scope: scope
            });
        }));

        it('should update breakers list with defined input value', function() {
            $input().val('China Doll');
            // Trigger submit using Enter key
            scope.onSubmit({
                which: 13,
                preventDefault: function() {},
                target: $input()[0]
            });
            expect(scope.breakers[0].name).toBe('China Doll');
        });

    });

    describe('Scope changes based on window events', function() {

        var width = 100;
        var height = 100;

        function dispatchEvent(type) {
            var evt = document.createEvent('Event');
            evt.initEvent(type, true, true);
            $window.dispatchEvent(evt);
        }

        beforeEach(inject(function($compile) {
            element = angular.element('<writers></writers>');
            $compile(element)(scope);
            scope.$digest();
        }));

        it('should update scope with current window width on window resize', function() {
            $window.resizeTo(width, height);
            dispatchEvent('resize');
            expect(scope.windowWidth).toBe(width);
        });

    });

    describe('Class changes based on window properties', function() {

        beforeEach(inject(function($compile) {
            element = angular.element('<deejay></deejay>');
            scope.deejay = deejay;
            $compile(element)(scope);
            scope.$digest();
        }));

        it('should have specific popup class if window name contains popup', function() {
            var divClasses = element.find('div').attr('class');
            $window.name = 'popup';
            expect(divClasses).toContain('popup');
        });

        it('should have specific popup class if window name contains popup (using string split)', function() {
            var divClasses = element.find('div').attr('class');
            $window.name = 'popup';
            expect(divClasses.split(/\s+/g)).toContain('popup');
        });

    });

});
