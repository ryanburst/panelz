var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

// Variables
var input = './src/scss/**/*.scss';
var output = './read/css';
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};
var autoprefixerOptions = {
  browsers: ['last 2 versions']
};

gulp.task('default', function () {
  return gulp
    .src(input)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(output));
});

gulp.task('scripts', function () {
  return gulp.src('./src/scripts/**/*.js')
        .pipe(concat('panelz.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./read/js'));
});

gulp.task('watch', function () {
    gulp.watch(input, ['default']);
});
