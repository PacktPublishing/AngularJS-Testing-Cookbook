'use strict';
/*
 * WU Tang examples - chess moves
 */
describe('Using Spies To Test Events - ', function() {
    var scope;
    var element;
    var wuTangClan = ['RZA', 'GZA', 'Method Man', 'Raekwon', 'Ghostface Killah', 'Inspectah Deck', 'U-God', 'Masta Killa', 'Cappadonna', 'ODB'];

    beforeEach(module('cookbook'));

    beforeEach(inject(function($rootScope) {
        scope = $rootScope.$new();
    }));

    describe('Test dispatching events', function() {

        beforeEach(inject(function($controller) {
            $controller('HomeCtrl', {
                $scope: scope
            });
            spyOn(scope, '$broadcast');
        }));

        it('should call $broadcast', function() {
            scope.showWuEmcee();
            expect(scope.$broadcast).toHaveBeenCalled();
        });

        it('should not call $broadcast', function() {
            expect(scope.$broadcast).not.toHaveBeenCalled();
        });

        it('should call $broadcast with correct event name and emcee', function() {
            scope.showWuEmcee(wuTangClan[0]);
            expect(scope.$broadcast).toHaveBeenCalledWith('showWuEmcee', wuTangClan[0]);
        });

        it('should call $broadcast with specific argument', function() {
            scope.showWuEmcee(wuTangClan[0]);
            expect(scope.$broadcast.calls.argsFor(0)).toContain(wuTangClan[0]);
        });

    });

    describe('Test handling dispatched events', function() {

        beforeEach(inject(function($controller) {
            $controller('HomeCtrl', {
                $scope: scope
            });
        }));

        it('should assign default emcee to scope if emceeName undefined', function() {
            scope.$broadcast('showWuEmcee');
            expect(scope.wuWho).toEqual(scope.UNKNOWN_NAME);
        });

        it('should assign correct emcee to scope', function() {
            scope.$broadcast('showWuEmcee', wuTangClan[1]);
            expect(scope.wuWho).toEqual(wuTangClan[1]);
        });

    });

    describe('Test handling DOM events', function() {

        function dispatchEvent(type) {
            var evt = document.createEvent('Event');
            evt.initEvent(type, true, true);
            window.dispatchEvent(evt);
        }

        beforeEach(inject(function($compile) {
            element = angular.element('<div wu-tang></div>');
            $compile(element)(scope);
            scope.$digest();
        }));

        it('should respond to an event and update scope', function() {
            dispatchEvent('oncanplay');
            expect(scope.canPlay).toBeTruthy();
        });

    });

    describe('Test handling callbacks', function() {

        beforeEach(inject(function($compile) {
            element = angular.element('<jwplayer></jwplayer>');
            $compile(element)(scope);
            scope.$digest();
        }));

        it('should update scope within callback', function() {
            scope.readyHandler();
            expect(scope.ready).toBeTruthy();
        });

    });

});
