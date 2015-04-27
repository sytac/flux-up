'use strict';

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglifyify = require('uglifyify');

/*eslint-disable no-unused-vars*/
module.exports = function(gulp, config) {
  var tasks = {
    'build-src': {
      fn: buildSrc,
      help: 'Build source help'
    }
  };

  return tasks;

  function buildSrc(done) {
    var src = './src/';
    var doUglyfy = false;
    var result = browserify();
    if (doUglyfy) {
      result.transform({
        global: true,
        sourcemap: true,
        mangle: true,
        compress: true
      }, uglifyify);
    }
    result.add(src + 'index.js');

    config.dependencies.map(function(dep) {
      result.external(dep);
    });

    result.bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest(config.folders.dist + '/'))
        .on('end', function(err) {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
  }
};
