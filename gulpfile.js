var gulp = require('gulp');
var path = require('path');
var minimist = require('minimist');

var taskLoader = require('gulp-cjs-tasks/task-loader');
var package = require('./package.json');

var knownOptions = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'dev'
  }
};
var options = minimist(process.argv.slice(2), knownOptions);

var taskNames = taskLoader(__dirname + '/tasks',
    gulp,
    {
      options: options,
      folders: {
        root: __dirname,
        dist: path.join(__dirname, 'dist')
      },
      package: package,
      dependencies: Object.keys(package && package.dependencies || {}),
      dependenciesInSource: []
    }
);

//console.log('Added tasks', taskNames);
