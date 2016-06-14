var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var handlebars = require('gulp-compile-handlebars');
var express = require('express');


gulp.task('server',function(){
var server=express();
server.use(express.static('dist'));
server.listen(3000)
});

gulp.task('less', function () {
  return gulp.src('./src/styles/*.less')
    .pipe(less())
    .pipe(gulp.dest('./dist'));
});

gulp.task('templates', function () {
    var templateData = {
        title: 'HM start'
    };
  
    var options = {
        ignorePartials: true,
        partials : {},
        batch : ['./src/templates/'],
        helpers : {}
    };

    return gulp.src('./src/templates/index.handlebars')
        .pipe(handlebars(templateData, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./dist'));
});