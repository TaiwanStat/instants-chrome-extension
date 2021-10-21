var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    config = require('./config'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer');

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


gulp.task('scss-inner', function() {
    return gulp.src(config.scss.files)
      //.pipe(sourcemaps.init())
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(autoprefixer({
        browsers:  AUTOPREFIXER_BROWSERS,
        cascade: false
      }))
      .pipe(minifyCSS())
      //.pipe(sourcemaps.write("."))
      .pipe(gulp.dest('./stylesheets'));
});

gulp.task('scss', ['scss-inner'])
