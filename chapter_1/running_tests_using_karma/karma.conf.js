module.exports = function (config) {
	config.set({
		frameworks: ['jasmine'],
		files: [
			"../../lib/angular-1.2.28/angular.js",
			"../../lib/angular-1.2.28/angular-mocks.js",
			"src/cookbook.js",
			"test/cookbookSpec.js"
		],
		autoWatch: true,
		browsers: ['Chrome']
	});
};
