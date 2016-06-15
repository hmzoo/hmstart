var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var handlebars = require('gulp-compile-handlebars');
var express = require('express');
var browserSync = require('browser-sync');
var gutil = require('gulp-util');
var browserify = require('browserify');
var source= require('vinyl-source-stream');

var server;
var handleError=function(err) {
  console.log(err.toString());
  this.emit('end');
}

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
        .pipe(less()).on('error',handleError)
        .pipe(gulp.dest('./dist'))
        .pipe(reload());

});

gulp.task('jquery', function() {
    return gulp.src('./src/bower_components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('uikit_fonts', function() {
    return gulp.src('./src/bower_components/uikit/fonts/*')
        .pipe(gulp.dest('./dist/fonts'))

});



gulp.task('uikit_js', function() {
    return gulp.src('./src/bower_components/uikit/js/**')
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('vendors',['jquery','uikit_js','uikit_fonts']);

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
        .pipe(handlebars(templateData, options)).on('error',handleError)
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./dist'))
        .pipe(reload());
});


gulp.task('scripts',function(){
  return browserify('./src/scripts/main.js')
  .bundle().on('error',handleError)
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'))
  .pipe(reload());
})


gulp.task('watch', function() {
    gulp.watch('./src/styles/*.less', ['less']);
    gulp.watch('./src/templates/*.handlebars', ['templates']);
    gulp.watch('./src/scripts/**', ['scripts']);
    //gulp.watch('./src/templates/*.handlebars',['templates']);

});
gulp.task('build', ['templates', 'less','vendors','scripts']);
gulp.task('default', ['build', 'watch', 'server'])
