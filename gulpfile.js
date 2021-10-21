var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var minifyHTML = require('gulp-minify-html');


var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

 
gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
  return gulp.src('./edit_index.html')
    .pipe(minifyHTML(opts))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'));
});

gulp.task('scripts', function() {
  gulp.src(['./utils.js', './js/**/*.js', './updateManager.js', './index.js'])
  .pipe(sourcemaps.init())
  .pipe(concat('bundle.js'))
  .pipe(sourcemaps.write())
  .pipe(uglify())
  .pipe(gulp.dest('./dist'));
});

gulp.task('scss', function() {
  return gulp.src(['./scss/index.scss', './scss/vender/*'])
  .pipe(sourcemaps.init())
  .pipe(sass(sassOptions).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers:  AUTOPREFIXER_BROWSERS,
    cascade: false
  }))
  .pipe(minifyCSS())
  .pipe(sourcemaps.write("."))
  .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
  gulp.watch(['./utils.js', './index.js', './js/**/*.js'], ['scripts']);
  gulp.watch('./scss/**/*.scss', ['scss']);
  gulp.watch('./edit_index.html', ['minify-html']);
});

gulp.task('bg-js', function() {
  gulp.src(['./bg_scripts/**/*.js'])
  .pipe(sourcemaps.init())
  .pipe(concat('background.js'))
  .pipe(sourcemaps.write())
  .pipe(uglify())
  .pipe(gulp.dest('./dist'));
});

gulp.task('bg', function() {
  gulp.watch('./bg_scripts/**/*.js', ['bg-js']);
});

gulp.task('default', ['scripts',  'scss', 'minify-html', 'watch']);
