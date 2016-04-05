exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['cookbookSpec.js'],
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000
	}
};
