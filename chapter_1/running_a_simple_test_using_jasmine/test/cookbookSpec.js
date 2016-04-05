'use strict';

describe('MainCtrl', function () {
	beforeEach(module('cookbook'));
	it('should assign the correct rapper to scope', inject(function ($controller, $rootScope) {
		var $scope = $rootScope.$new();
		$controller('MainCtrl', {
			$scope: $scope
		});
		expect($scope.emcee).toEqual('Kool G Rap');
	}));
});
