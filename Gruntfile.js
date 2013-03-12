  /*
 * grunt-contrib-csslint
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Jörn Zaefferer, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Configuration to be run
    csslint: {
      valid: 'test/fixtures/valid.css',
      empty: 'test/fixtures/empty.css',
      all: 'test/fixtures/*.css',
      custom: {
        options: {
          'import': 0,
          'ids': 0
        },
        files: ['test/fixtures/invalid.css']
      },
      withReports: {
        src: 'test/fixtures/*.css',
        junit: 'reports/csslint.xml',
        checkstyle: 'reports/csslint_checkstyle.xml'
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-internal');

  // plugin's task(s), manually check the output, then run `grunt csslint:all` and `grunt csslint:custom` to look at lint errors
  grunt.registerTask('test', ['csslint:valid', 'csslint:empty']);

  // task which generates report files
  grunt.registerTask('xml', ['csslint:withReports']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test', 'build-contrib']);

};
