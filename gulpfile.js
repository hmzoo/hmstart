var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var less = require('gulp-less');
var jade = require('gulp-jade');
var express = require('express');
var browserSync = require('browser-sync');


var server;
var errorHandler=function (error) {
  console.log(error.message);
  this.emit('end');
}

//SERVER
gulp.task('server',function(){
server=express();
server.use(express.static('dist'));
server.listen(8000)
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

//BUILD
gulp.task('images', function(){
  gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images/'));
});

gulp.task('jade', function() {
    return gulp.src('src/templates/**/*.jade')
        .pipe(jade()) // pip to jade plugin
        .pipe(gulp.dest('dist/')); // tell gulp our output folder
});

gulp.task('styles', function(){
  gulp.src(['src/styles/**/*.less'])
    .pipe(less()).on('error',errorHandler)
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dist/styles/'))
});

gulp.task('coffee', function(){
  return gulp.src('src/scripts/**/*.coffee')
    .pipe(coffee({bare: true})).on('error',errorHandler)
    .pipe(gulp.dest('dist/scripts/'))
});

//BUNDLE
gulp.task('bundle',function(){
  return browserify('./src/scripts')
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('dist/scripts/'))

})


//WATCH
gulp.task('watch',  function(){
  gulp.watch("src/styles/**/*.less", ['styles']);
  gulp.watch("src/scripts/**/*.coffee", ['scripts']);
  gulp.watch('src/templates/**/*.jade', ['jade']);
});
//TASKS
gulp.task('default', ['styles','coffee','jade']);
