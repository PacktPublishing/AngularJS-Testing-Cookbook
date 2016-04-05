module.exports = function(config) {
    config.set({
        basePath: 'src',
        frameworks: ['jasmine'],
        preprocessors: {
            '*.html': ['ng-html2js']
        },
        files: [
            "../lib/angular/angular.js",
            "../lib/angular/angular-mocks.js",
            "*.js",
            "*.html",
            "../test/cookbookSpecTwo.js"
        ],
        autoWatch: true,
        browsers: ['Chrome']
    });
};
