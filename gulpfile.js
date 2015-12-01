var gulp = require('gulp')
var concat = require('gulp-concat')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var sass = require('gulp-sass')

gulp.task('html', function(){
  return gulp.src('src/index.html')
    .pipe(gulp.dest('.'))
});

gulp.task('styles', function(){
  return gulp.src('src/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
});

gulp.task('scripts', function(){
  return browserify('src/scripts/app.js')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./js'))
});

gulp.task('watchman', function(){
  gulp.watch('src/scripts/*js', ['scripts'])
  gulp.watch('src/sass/*scss', ['styles'])
  gulp.watch('src/index.html' ['html'])
});

gulp.task('default',['html', 'scripts', 'styles', 'watchman']);
