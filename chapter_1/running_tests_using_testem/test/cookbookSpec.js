'use strict';

describe('MainCtrl', function () {
	beforeEach(module('cookbook'));
	it('should assign the correct rapper to scope', inject(function ($controller) {
		var $scope = {};
		$controller('MainCtrl', {
			$scope: $scope
		});
		expect($scope.emcee).toEqual('Kool G Rap');
	}));
});
