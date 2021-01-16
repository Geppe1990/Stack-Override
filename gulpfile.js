const gulp = require('gulp');
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;
const rename = require('gulp-rename');
const eslint = require("gulp-eslint");

gulp.task('uglifyJS', function () {
	return pipeline(
		gulp.src('./src/js/*.js'),
		uglify(),
		rename({
			suffix: '.min'
		}),
		gulp.dest('./dist/js/'),
	);
});

gulp.task('lintJS', function () {
	return pipeline(
		gulp.src(["./src/js/*/*.js", "./gulpfile.js"]),
		eslint(),
		eslint.format(),
		eslint.failAfterError()
	)
});

gulp.task('watch', function () {
	gulp.watch('./src/js/*.js', gulp.series('lintJS', 'uglifyJS'));
});

gulp.task('default', gulp.series('uglifyJS', 'watch'));