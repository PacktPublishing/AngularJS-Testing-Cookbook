'use strict';

describe('Testing User Interaction and Directives', function() {
  var scope;
  var element;
  var emcees;

  beforeEach(module('cookbook', 'template.html'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
    emcees = ['Roxanne Shante', 'Mc Lyte'];
  }));

  describe('Setup for templateUrl', function() {

    beforeEach(inject(function($compile) {
      element = angular.element('<emcees></emcees>');
      scope.emcees = emcees;
      $compile(element)(scope);
      scope.$digest();
    }));

    it('should display the first emcee in the DOM', function() {
      var h1 = element.find('h1');
      expect(h1.text()).toBe(emcees[0]);
    });

  });

});
