'use strict';

var eslint = require('gulp-eslint');

/*eslint-disable no-unused-vars*/
module.exports = function(gulp, config) {
  var tasks = {
    eslint: {
      fn: eslintTask,
      help: 'Copy help'
    }
  };

  return tasks;

  function eslintTask() {
    return gulp.src(['src/**/*.js', 'tasks/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
  }
};
