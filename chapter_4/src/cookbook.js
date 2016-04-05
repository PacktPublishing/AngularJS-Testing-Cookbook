'use strict';

var UIRouterConfig = function($urlRouterProvider, $stateProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      controller: 'HomeCtrl'
    })
    .state('emcees', {
      url: '/emcees/:id',
      controller: 'EmceeCtrl'
    });
  $urlRouterProvider
    .otherwise('/home');
};

angular.module('chapter4', ['ui.router'])
  .config(UIRouterConfig);

var HomeCtrl = function($scope, $state) {
  $scope.id = 'foo';
  $scope.loadEmcee = function(id) {
    $state.go('emcees', {
      id: id
    });
  }
};

var EmceeCtrl = function($scope, $stateParams) {
  $scope.id = $stateParams.id;
};
