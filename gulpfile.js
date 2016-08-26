var gulp = require('gulp');
var less = require('gulp-less')
var pug = require('gulp-pug')


gulp.task('less',function(){
  return gulp.src('app/style.less')
    .pipe(less())
    .pipe(gulp.dest('dist/'))
});

gulp.task('pug',function(){
  return gulp.src('app/views/*.jade')
    .pipe(pug({pretty:true}))
    .pipe(gulp.dest('dist/'))
});

gulp.task('build', [ 'less','pug']);
