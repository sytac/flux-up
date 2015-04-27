'use strict';

module.exports = function(gulp) {
  var helpUtils = require('gulp-cjs-tasks/help')(gulp);

  var tasks = {
    help: {
      fn: help,
      help: 'Show help'
    }
  };

  return tasks;

  function help() {
    helpUtils.show();
  }
};
