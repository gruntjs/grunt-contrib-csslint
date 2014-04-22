/*
    as an input str there is three options for now:

        1. text
             Original csslintrc format:
                https://github.com/CSSLint/csslint/wiki/Command-line-interface#configuration-files

            --errors=important
            --warnings=import

        2. json
            a. Json representation of original format, which is already in main branch, so
                expecting to see it in new version.
                https://github.com/CSSLint/csslint/issues/359

                {
                    "errors": ["important"],
                    "warnings": ["import"]
                }

            b. Json format which is main csslint task expected, so that's should be retured as well:

             {
                "rule-id": true|false
             }

    Bonus, unstrict json format for .csslitrc to enable comments and loose syntax.
*/

var
    rc;

function guessType(str) {
    var type,
        evalStr,
        nativeErrors = [
            'ReferenceError: Invalid left-hand side in assignment',//--a=b
            'SyntaxError: Unexpected token }',//--a=b,c
            'SyntaxError: Unexpected token ,',//--a=b,c,d
            'SyntaxError: Unexpected identifier',//--a=b --c=d
            'SyntaxError: Unexpected token --'//--a=b,c --d=e
        ];

    try {
        evalStr = ([].map.constructor('return {a:' + str + '\r\n}.a')());
    } catch (e) {
        if ( nativeErrors.indexOf(e.toString()) !== -1 ) {
            rc = str;
            type = 'text';
        }
    }

    if (typeof evalStr === 'object') {
        try {
            rc = JSON.stringify(evalStr);
            type = 'json';
        } catch (e) {
        }
    }

    return type;

}

function readOptionsAsText() {
    var
        splitrcs = rc.split(/[\s\r\n]/),
        splitrcsLen = splitrcs.length,
        splitrc,
        optionName,
        optionValues,
        optionValuesLen,
        optionsOut,
        i,
        j,
        out = {};

    for (i=0; i<splitrcsLen; i+=1) {
        splitrc = splitrcs[i].split('=');
        if (splitrc.length < 2) {
            continue;
        }
        optionName = splitrc[0].substring(2);
        optionValues = splitrc[1].split(',');
        optionValuesLen = optionValues.length;
        optionsOut = [];

        for(j=0; j<optionValuesLen; j += 1) {
            optionsOut.push(optionValues[j]);
        }

        out[optionName] = optionsOut;

    }

    return out;
}

function readOptionsAsJson() {
    return JSON.parse(rc);
}

function normalizeForGrunt(obj) {
    var
        out = {},
        objix,
        objits,
        objitsLen,
        option,
        i;

    for (objix in obj) {
        if ( obj.hasOwnProperty(objix) ) {
            objits = obj[objix];

            if ( typeof objits === 'boolean' ) {
                // sounds like grunt task friendly
                out = obj;
                break;
            } else if ( Array.isArray(objits) ) {
                objitsLen = objits.length;

                for(i=0; i<objitsLen; i+=1) {
                    option = objits[i];
                    out[option] = (objix === 'ignore'? false: true);
                }

            } else {
                throw new Error('Could not normalize .csslintrc.');
            }
        }

    }

    return out;
}

module.exports = function (str) {
    var
        out = {};

    switch( guessType(str) ){
    case 'text':
        out = readOptionsAsText();
        break;
    case 'json':
        out = readOptionsAsJson();
        break;
    default:
        throw new Error('Unknown .csslintrc format.');
    }

    return normalizeForGrunt(out);
};
