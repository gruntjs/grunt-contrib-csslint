/*
 * grunt-contrib-cssmin
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tim Branyen, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  /**
     * Returns a string with encoded HTML characters.
     *
     * @param {string} text The text to encode.
     * @return {string}
     */
  function encodeHTML(text) {
    if (!text) {
      return '';
    }

    return text
      .replace(/"/g, '&quot;')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&apos;');
  }

  grunt.registerMultiTask( "csslint", "Lint CSS files with csslint", function() {
    var csslint = require( "csslint" ).CSSLint;
    var ruleset = {};
    var verbose = grunt.verbose;
    var template;
    var report = {
      files: []
    };
    // get underscore
    var underscore = grunt.util._;
    // load templates
    var templates = {
      junit: grunt.file.read(__dirname + '/templates/junit.tmpl'),
      checkstyle: grunt.file.read(__dirname + '/templates/checkstyle.tmpl')
    };
    csslint.getRules().forEach(function( rule ) {
      ruleset[ rule.id ] = 1;
    });
    var options = this.options();
    for ( var rule in options ) {
      if ( !options[ rule ] ) {
        delete ruleset[rule];
      } else {
        ruleset[ rule ] = options[ rule ];
      }
    }
    var hadErrors = 0;
    this.filesSrc.forEach(function( filepath, index ) {
      var file = grunt.file.read( filepath ),
        message = "Linting " + filepath + "...",
        result;

      // skip empty files
      if (file.length) {
        result = csslint.verify( file, ruleset );
        // add result to report
        report.files[index] = {
          filepath: filepath,
          passed: !result.messages.length,
          errors: result.messages
        };
        verbose.write( message );
        if (result.messages.length) {
          verbose.or.write( message );
          grunt.log.error();
        } else {
          verbose.ok();
        }

        result.messages.forEach(function( message ) {
          grunt.log.writeln( "[".red + (typeof message.line !== "undefined" ? ( "L" + message.line ).yellow + ":".red + ( "C" + message.col ).yellow : "GENERAL".yellow) + "]".red );
          grunt.log[ message.type === "error" ? "error" : "writeln" ]( message.message + " " + message.rule.desc + " (" + message.rule.id + ")" );
        });
        if ( result.messages.length ) {
          hadErrors += 1;
        }
      } else {
        grunt.log.writeln( "Skipping empty file " + filepath);
      }

    });

    // set encoding function
    report.encode = encodeHTML;
    // get workspace option if set
    report.workspace = grunt.option('workspace') || '';

    // generate junit xml
    if (this.data.junit) {
      template = grunt.util._.template(templates.junit, {
        'obj': report
      });
      grunt.file.write(this.data.junit, template);
    }

    // checkstyle junit xml
    if (this.data.checkstyle) {
      template = grunt.util._.template(templates.checkstyle, {
        'obj': report
      });
      grunt.file.write(this.data.checkstyle, template);
    }

    if ( hadErrors ) {
      return false;
    }
    grunt.log.ok( this.filesSrc.length + " files lint free." );
  });
};
