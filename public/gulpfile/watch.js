var gulp = require('gulp');
var config = require('./config'),
    watch = require('gulp-watch');

gulp.task('watch', function() {
    gulp.watch(config.scss.files, ['scss-inner']);
});

gulp.task('watch-index', function() {
    gulp.watch(config.scss.files, ['scss-index']);
});
