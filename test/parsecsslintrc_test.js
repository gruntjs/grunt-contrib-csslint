'use strict';

var
    grunt = require('grunt'),
    _ = require('lodash'),
    parsecsslintrc = require('../tasks/utils/parsecsslintrc'),
    expecting = grunt.file.readJSON('./test/parsecsslintrc/expecting'),
    expectingSize = _.size(expecting),

    testobj = {};

function sameAsExpecting(hash) {
    var
        isSameSize = expectingSize === _.size(hash),
        hasSameAttrs,
        ix;

    if ( isSameSize ) {

        for (ix in expecting) {
            if ( expecting.hasOwnProperty(ix) ) {

                hasSameAttrs = (expecting[ix] === hash[ix]);

                if ( !hasSameAttrs ) {
                    break;
                }
            }
        }
    }

    return isSameSize && hasSameAttrs;

}

module.exports = (function() {
    grunt.file.recurse('./test/parsecsslintrc/', function(abspath) {
        if ( abspath.indexOf('expecting') === -1 ) {

            testobj[abspath] = function(test) {
                var
                    file = grunt.file.read(abspath),
                    result = parsecsslintrc(file);

                test.ok(sameAsExpecting(result), 'Resulted json has to match expected.');
                test.done();
            };
        }
    });
    return testobj;
}());
