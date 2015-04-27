'use strict';

var del = require('del');

/*eslint-disable no-unused-vars*/
module.exports = function(gulp, config) {
  var tasks = {
    clean: {
      fn: clean,
      help: 'Clean help'
    }
  };

  return tasks;

  function clean(done) {
    // WARNING!! Don't parametrize this!! Let it clear which folder you have to clean
    del(['./dist/**'], done);
  }
};
