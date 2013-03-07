/*
 * grunt-contrib-cssmin
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tim Branyen, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.registerMultiTask( "csslint", "Lint CSS files with csslint", function() {
    var csslint = require( "csslint" ).CSSLint;
    var ruleset = {};
    var verbose = grunt.verbose;
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
    this.filesSrc.forEach(function( filepath ) {
      var file = grunt.file.read( filepath ),
        message = "Linting " + filepath + "...",
        result;

      // skip empty files
      if (file.length) {
        result = csslint.verify( file, ruleset );
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
    if ( hadErrors ) {
      return false;
    }
    grunt.log.ok( this.filesSrc.length + " files lint free." );
  });
};
