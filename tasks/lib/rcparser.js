'use strict';

var path = require('path');

exports.init = function(grunt) {

  var exports = {},
    statements = {},
    basePath = '',
    excludeList = [];

  // parses a .csslintrc file into an object
  exports.parse = function(filePath) {
    var data = grunt.file.read(filePath);
    basePath = path.dirname(filePath);

    grunt.verbose.write('Parsing CSSLint config ' + filePath + '...');

    // walk through the individual statements
    data.split(/[\s\n\r]+/m).forEach(function(statement) {

      // ignore empty lines
      if (!statement) {
        return;
      }

      // if a statement begins with '--' then it is an option
      if (statement.indexOf('--') === 0) {
        // the options are key/value pairs
        // and the value is optional with a default of true
        var pair = statement.substring(2).split('=');
        if (pair.length === 1) {
          statements[pair[0]] = true;
        } else {
          statements[pair[0]] = pair[1].split(',');
        }
      }

    });

    // build the path-based file exclude list for easy lookups
    excludeList = exports.getExcludeList().map(function(file) {
      return path.join(basePath, file);
    });

    grunt.verbose.ok();
    return statements;
  };

  // returns a options object, ready to be merged into the task options
  exports.getOptionsObject = function() {
    var options = {};

    // 2 = error, 1 = warning, 0 = ignore
    exports.getErrorsList().forEach(function(rule) {
      options[rule] = 2;
    });
    exports.getWarningsList().forEach(function(rule) {
      options[rule] = 1;
    });
    exports.getIgnoreList().forEach(function(rule) {
      options[rule] = 0;
    });

    return options;
  };

  // checks if a file is in the exclude list
  exports.isFileExcluded = function(filePath) {
    if (grunt.util._.indexOf(excludeList, path.normalize(filePath)) !== -1) {
      return true;
    }
    return false;
  };

  // gets the list of error level rules
  exports.getErrorsList = function() {
    return statements['errors'] || [];
  };

  // gets the list of warning level rules
  exports.getWarningsList = function() {
    return statements['warnings'] || [];
  };

  // gets the list of ignored rules
  exports.getIgnoreList = function() {
    return statements['ignore'] || [];
  };

  // gets the list of excluded files
  exports.getExcludeList = function() {
    return statements['exclude-list'] || [];
  };

  return exports;

};
