var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var minify = require('gulp-minify');
var concat = require('gulp-concat');

gulp.task('scripts', function() {
  return gulp.src(['./src/js/modules/*.js', './src/js/index.js'])
    .pipe(concat('sona.js'))
    .pipe(uglify())
    .pipe(minify())
    .pipe(gulp.dest('./public/'));
});

gulp.task('css', function() {
  return gulp.src('./src/css/*.css')
    .pipe(concat('sona.css'))
    .pipe(minify())
    .pipe(gulp.dest('./public/'));
});

gulp.task('watch', function() {
  gulp.watch('./src/js/*.js', ['scripts']);
});

gulp.task('default', ['css', 'scripts']);
