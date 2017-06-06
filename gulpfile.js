var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');


gulp.task('css', function () {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sass({
          errLogToConsole: true,
          outputStyle: 'expanded'
        }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function () {
  return gulp.src([
            './src/scripts/**/*.js',
            '!./src/scripts/vendor/**'
        ])
        .pipe(concat('panelz.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('images', function () {
  return gulp
    .src('./src/images/**')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'))
});

gulp.task('watch', function () {
    gulp.watch('./src/scss/**/*.scss', ['css']);
    gulp.watch('./src/scripts/**/*.js', ['scripts']);
    gulp.watch('./src/images/**/**', ['images']);
});

gulp.task('default', ['css','scripts','images']);
