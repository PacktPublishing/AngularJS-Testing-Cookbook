var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('webdriver_update', $.protractor.webdriver_update);

gulp.task('connect', function () {
	var connect = require('connect');
	var app = connect()
		.use(connect.static('src'));

	$.server = require('http').createServer(app)
		.listen(8000);
});

gulp.task('test', function (done) {
	var karma = require('karma').server;
	var karmaConf = require('./karma.conf.js')();
	karma.start(karmaConf, done);
});

gulp.task('e2e', ['connect', 'webdriver_update'], function (done) {
	gulp.src(['test/e2e/cookbookSpec.js'])
		.pipe($.protractor.protractor({
			configFile: './protractor.conf.js',
		}))
		.on('end', function () {
			$.server.close();
			done();
		});
});
