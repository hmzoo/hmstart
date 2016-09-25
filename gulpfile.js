var gulp = require('gulp');

var less = require('gulp-less');
var pug = require('gulp-pug');

var concat = require('gulp-concat');

var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');


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

gulp.task('client_lib', function() {
  return gulp.src(['node_modules/socket.io-client/socket.io.js','node_modules/react/dist/react.js','node_modules/react/dist/react-dom.js'])
    .pipe(gulp.dest('./dist/public'));
});

gulp.task('client_app', function() {
  return gulp.src(['./app/client/*.jsx'])
    .pipe(react())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/public'));
});
gulp.task('browserify', function() {
    return browserify({
      entries:['./app/client/main.js'],
      transform:[reactify],
      debug:true
    }).bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/public'));
  });


gulp.task('watch',function(){
  gulp.watch(['app/server/*.js'],['server']);
  gulp.watch(['app/client/*.js','app/client/views/*.jsx'],['browserify']);
  gulp.watch(['app/style.less'],['less']);
  gulp.watch(['app/views/*.jade'],['pug']);
})

gulp.task('build', [ 'server','client_lib','browserify','less','pug']);
