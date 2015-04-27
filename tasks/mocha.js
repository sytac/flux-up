'use strict';

var mocha = require('gulp-mocha');

/*eslint-disable no-unused-vars*/
module.exports = function(gulp, config) {
  var tasks = {
    mocha: {
      fn: mochaTask,
      help: 'Run tests on lib'
    }
  };

  return tasks;

  function mochaTask() {
    return gulp.src('./tests/**/*.spec.js')
      // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha());
  }
};

