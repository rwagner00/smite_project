var gulp = require('gulp');
var browsersync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

gulp.task('sass-build', function () {
    browsersync.notify('<span style="color: grey">Running:</span> Sass compiling');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./assets/css'))
    .pipe(browsersync.stream());
});

gulp.task('sass:watch', function () {
    gulp.watch('./assets/sass/**/*.scss', ['sass-build']);
});

gulp.task('reload', function() {
    browsersync.reload();
});

gulp.task('html:watch', function() {
    gulp.watch('../**/*.html', ['reload']);
});

gulp.task('js:watch', function() {
    gulp.watch('./assets/js/**/*.js', ['reload']);
});

// Static server
gulp.task('browser-sync', function() {
    browsersync.init({
        server: {
            baseDir: "../"
        }
    });
});

gulp.task('develop', ['sass:watch', 'html:watch', 'js:watch', 'browser-sync']);

gulp.task('default', ['develop']);
