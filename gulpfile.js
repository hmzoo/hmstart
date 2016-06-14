var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var handlebars = require('gulp-compile-handlebars');
var express = require('express');
var browserSync = require('browser-sync');
var gutil = require('gulp-util');

var server;

var reload = function() {
    if (server) {
        return browserSync.reload({
            stream: true
        });
    }
    return gutil.noop();

}

gulp.task('server', function() {
    server = express();
    server.use(express.static('dist'));
    server.listen(3000);
    browserSync({
        proxy: 'localhost:3000'
    });
});

gulp.task('less', function() {
    return gulp.src('./src/styles/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist'))
        .pipe(reload());

});

gulp.task('templates', function() {
    var templateData = {
        title: 'HM start'
    };

    var options = {
        ignorePartials: true,
        partials: {},
        batch: ['./src/templates/'],
        helpers: {}
    };

    return gulp.src('./src/templates/index.handlebars')
        .pipe(handlebars(templateData, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./dist'))
        .pipe(reload());
});
gulp.task('watch', function() {
    gulp.watch('./src/styles/*.less', ['less']);
    gulp.watch('./src/templates/*.handlebars', ['templates']);
    //gulp.watch('./src/templates/*.handlebars',['templates']);

});
gulp.task('build', ['templates', 'less']);
gulp.task('default', ['build', 'watch', 'server'])
