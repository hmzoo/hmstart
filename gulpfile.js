var gulp = require('gulp');
var less = require('gulp-less');
var pug = require('gulp-pug');
var concat = require('gulp-concat');


gulp.task('less',function(){
  return gulp.src('app/style.less')
    .pipe(less())
    .pipe(gulp.dest('dist/public'))
});

gulp.task('pug',function(){
  return gulp.src('app/views/*.jade')
    .pipe(pug({pretty:true}))
    .pipe(gulp.dest('dist/'))
});

gulp.task('server', function() {
  return gulp.src(['app/server/server.js'])
    .pipe(concat('server.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('client', function() {
  return gulp.src(['node_modules/socket.io-client/socket.io.js','app/client/app.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/public'));
});

gulp.task('build', [ 'server','client','less','pug']);
