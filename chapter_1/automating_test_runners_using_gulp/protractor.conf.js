exports.config = {
	seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.41.0.jar',
	specs: ['test/e2e/cookbookSpec.js'],
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000
	}
};
