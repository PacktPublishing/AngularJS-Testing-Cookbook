'use strict';

describe('Testing Controllers', function () {
  var rootScope;
  var scope;

  beforeEach(module('chapter4'));

  beforeEach(inject(function ($rootScope) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
  }));

  describe('Getting started testing a controller', function () {

    beforeEach(inject(function ($controller) {
      $controller('HomeCtrl', {
        $scope: scope
      });
    }));

    it('should do something', function () {
      expect(scope.id).toBe('foo');
    });

  });

  describe('Testing initial state of a scope object', function () {

    beforeEach(inject(function ($controller) {
      $controller('HomeCtrl', {
        $scope: scope
      });
    }));

    it('should set the scope property id to the correct initial value', function () {
      expect(scope.id).toBe('foo');
    });

  });

  describe('Testing interactive scope changes using Protractor', function () {

    beforeEach(inject(function ($controller) {
      $controller('HomeCtrl', {
        $scope: scope
      });
    }));

    it('should do something', function () {
      expect(scope.id).toBe('foo');
    });

  });

  describe('Testing navigation scope changes using Protractor', function () {

    beforeEach(inject(function ($controller) {
      $controller('HomeCtrl', {
        $scope: scope
      });
    }));

    it('should do something', function () {
      expect(scope.id).toBe('foo');
    });

  });

});
