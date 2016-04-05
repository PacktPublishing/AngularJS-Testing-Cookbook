'use strict';

describe('Getting Started with Testing and AngularJS', function() {

    var element;
    var scope;
    var rootScope;

    describe(' - Writing a test spec', function() {

        beforeEach(module('cookbook'));

        beforeEach(inject(function($rootScope, $compile) {
            element = angular.element('<emcee></emcee>');
            scope = $rootScope.$new();
            scope.emcee = 'Izzy Ice';
            $compile(element)(scope);
            scope.$digest();
        }));

        it('should assign scope emcee to element text on click', function() {
            scope.onClick();
            expect(element.text()).toBe('Step up Izzy Ice!');
        });

    });

    describe(' - Mocking injected instances using an object', function() {

        var url;
        var Artists;

        beforeEach(module('artists'));

        beforeEach(module(function($provide) {
            $provide.value('imageStore', {
                thumbnailUrl: function(id) {
                    url = '/thumbs/' + id;
                }
            });
        }));

        beforeEach(inject(function($injector) {
            Artists = $injector.get('Artists');
        }));

        it('return the correct artist thumbnailUrl', function() {
            Artists.thumb('1');
            expect(url).toBe('/thumbs/1');
        });

    });


    describe(' - Mocking injected instances using spies', function() {

        beforeEach(module('hiphop'));

        var deejays;

        beforeEach(module(function($provide) {
            $provide.value('scratch', jasmine.createSpyObj('scratch', ['technique']));
        }));

        beforeEach(inject(function($injector) {
            deejays = $injector.get('deejays');
        }));

        it('should return the correct originator', function() {
            expect(deejays.originator).toBe('DJ Kool Herc');
        });

    });

});
