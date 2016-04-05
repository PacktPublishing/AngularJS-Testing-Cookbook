'use strict';

describe('How To Test Navigation And Routing', function() {

    describe('ngRoute', function() {

        var rootScope;
        var scope;
        var location;

        beforeEach(module('chapter3.ngRoute'));

        beforeEach(inject(function($templateCache) {
            $templateCache.put('home.html', '');
        }));

        describe('Basic route testing', function() {

            // controller
            it('route controller should be mapped to HomeCtrl', inject(function($rootScope, $location, $route) {
                $location.path('/home');
                $rootScope.$apply();
                expect($route.current.controller).toEqual('HomeCtrl');
            }));

            // view
            it('route templateUrl should be mapped to home.html', inject(function($rootScope, $location, $route) {
                $location.path('/home');
                $rootScope.$apply();
                expect($route.current.templateUrl).toEqual('home.html');
            }));

            // route params
            it('should assign routeParams to scope', inject(function($rootScope, $controller) {
                var scope = $rootScope.$new();
                $controller('EmceesCtrl', {
                    $scope: scope,
                    $routeParams: {
                        id: '1'
                    }
                });
                expect(scope.id).toEqual('1');
            }));
        });

    });

    describe('ui-router', function() {


        beforeEach(module('chapter3.ui.router'));

        beforeEach(inject(function($templateCache) {
            $templateCache.put('home.html', '');
        }));


        describe('Basic route and state testing with ui-router', function() {

            // state
            it('default state should be home', inject(function($rootScope, $state) {
                $rootScope.$apply();
                expect($state.current.name).toEqual('home');
            }));

            // view
            it('state templateUrl should be home.html', inject(function($rootScope, $state) {
                $rootScope.$apply();
                expect($state.current.templateUrl).toEqual('home.html');
            }));

            // controller
            it('state controller should be HomeCtrl', inject(function($rootScope, $state) {
                $rootScope.$apply();
                expect($state.current.controller).toEqual('HomeCtrl');
            }));

        });

        describe('Test transitioning state with ui-router', function() {

            var scope;
            var state;

            beforeEach(inject(function($rootScope, $state) {
                scope = $rootScope.$new();
                state = $state;
            }));

            // default state
            it('default state should be home', function() {
                scope.$apply();
                expect(state.current.name).toEqual('home');
            });

            // transition state
            it('should transition to emcees state', function() {
                state.go('emcees');
                scope.$apply();
                expect(state.current.name).toEqual('emcees');
            });

            // state params
            it('should transition to emcees state passing the correct id param', function() {
                var id = '1';
                state.go('emcees', {id: id});
                scope.$apply();
                expect(state.params.id).toEqual(id);
            });

            // path params
            it('emcees path should include correct id', inject(function($location) {
                var id = '1';
                state.go('emcees', {id: id});
                scope.$apply();
                expect($location.path()).toEqual('/emcees/' + id);
            }));
        });

    });

});
