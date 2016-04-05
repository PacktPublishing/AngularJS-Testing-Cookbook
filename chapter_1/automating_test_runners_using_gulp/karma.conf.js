module.exports = function () {
	return {
		frameworks: ['jasmine'],
		files: [
			"../../lib/angular/angular.js",
			"../../lib/angular/angular-mocks.js",
			"src/cookbook.js",
			"test/unit/cookbookSpec.js"
		],
		autoWatch: true,
		browsers: ['Chrome']
	};
};
