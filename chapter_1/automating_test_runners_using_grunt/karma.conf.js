module.exports = function (config) {
	config.set({
		frameworks: ['jasmine'],
		files: [
			"lib/angular/angular.js",
			"lib/angular/angular-mocks.js",
			"src/cookbook.js",
			"test/unit/cookbookSpec.js"
		],
		autoWatch: true,
		browsers: ['Chrome']
	});
};
