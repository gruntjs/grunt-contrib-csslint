'use strict';

var
    grunt = require('grunt'),
    parsecsslintrc = require('../tasks/utils/parsecsslintrc'),
    expecting = JSON.stringify(grunt.file.readJSON('./test/parsecsslintrc/expecting')),
    testobj = {};

module.exports = (function() {
    grunt.file.recurse('./test/parsecsslintrc/', function(abspath) {
        if ( abspath.indexOf('expecting') === -1 ) {

            testobj[abspath] = function(test) {
                var
                    file = grunt.file.read(abspath),
                    result = JSON.stringify(parsecsslintrc(file));

                test.equal(result, expecting);
                test.done();
            };
        }
    });
    return testobj;
}());
