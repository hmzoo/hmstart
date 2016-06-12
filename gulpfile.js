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

var browserify = require('browserify');
var coffeeify = require('coffeeify');
var source = require('vinyl-source-stream');


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



//BUILD
gulp.task('images', function(){
  gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images/'));
});

gulp.task('template', function() {
    return gulp.src('src/templates/**/*.jade')
        .pipe(jade({pretty:true})) // pip to jade plugin
        .pipe(gulp.dest('dist/')); // tell gulp our output folder
});

gulp.task('styles', function(){
  gulp.src(['src/styles/**/*.less'])
    .pipe(less()).on('error',errorHandler)
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dist/'))
});



var bundle=browserify({
  entries:['./src/scripts/main.coffee']
});
bundle.transform(coffeeify);

gulp.task('scripts', function(){
  return bundle
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist/'))
});

gulp.task('coffee', function(){
  return gulp.src('src/scripts/**/*.coffee')
    .pipe(coffee({bare: true})).on('error',errorHandler)
    .pipe(gulp.dest('dist/scripts/'))
});

//BUNDLE
gulp.task('bundle',function(){
  return browserify('./dist/scripts')
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('dist/'))

})


//WATCH
gulp.task('watch',  function(){
  gulp.watch("src/styles/**/*.less", ['styles']);
  gulp.watch("src/scripts/**/*.coffee", ['scripts']);
  gulp.watch('src/templates/**/*.jade', ['template']);
});
//TASKS
gulp.task('default', ['semantic','scripts','template']);
