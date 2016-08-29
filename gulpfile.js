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
  return gulp.src('app/server/*.js')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('client', function() {
  return gulp.src(['node_modules/socket.io-client/socket.io.js','app/client/app.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/public'));
});



gulp.task('watch',function(){
  gulp.watch(['app/server/*.js'],['server']);
  gulp.watch(['app/client/app.js'],['client']);
  gulp.watch(['app/style.less'],['less']);
  gulp.watch(['app/views/*.jade'],['pug']);
})

gulp.task('build', [ 'server','client','less','pug']);
