const gulp = require('gulp');
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;
const rename = require('gulp-rename');
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

gulp.task('sass', function() {
	return pipeline(
		gulp.src('./src/scss/*.scss'),
		sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError),
		rename({
			suffix: '.min'
		}),
		gulp.dest('./dist/css')
	)
})

gulp.task('uglifyJS', function () {
	return pipeline(
		gulp.src('./src/js/*.js'),
		sourcemaps.init(),
		uglify(),
		rename({
			suffix: '.min'
		}),
		sourcemaps.write(),
		gulp.dest('./dist/js/'),
	);
});

gulp.task('lintJS', function () {
	return pipeline(
		gulp.src(["./src/js/*.js"]),
		eslint(),
		eslint.format(),
		eslint.failAfterError()
	)
});

gulp.task('watch', function () {
	gulp.watch('./src/js/*.js', gulp.series('lintJS', 'uglifyJS'));
	gulp.watch('./src/scss/*.scss', gulp.series('sass'));	
});

gulp.task('default', gulp.series('lintJS', 'uglifyJS', 'sass', 'watch'));