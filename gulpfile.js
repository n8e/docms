var gulp = require('gulp'),
    nodemon = require('gulp-nodemon')
    jasmineNode = require('gulp-jasmine-node');

gulp.task('develop', function () {
  nodemon({ script: 'documentManager.js' })
    .on('restart', function () {
      console.log('restarted!')
    })
})

gulp.task('test', function () {
    return gulp.src(['documentManagerSpec.js']).pipe(jasmineNode({
        timeout: 10000
    }));
});

gulp.task('default', ['develop', 'test'], function(){
  gulp.watch("documentManager.js", ['develop']);
  gulp.watch("documentManagerSpec.js", ['test']);
});