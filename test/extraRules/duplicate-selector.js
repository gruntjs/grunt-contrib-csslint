module.exports = {

    //rule information
    id: "duplicate-selector",
    name: "Disallow duplicate selectors",
    desc: "",
    browsers: "All",

    //initialization
    init: function(parser, reporter) {
        "use strict";
        var rule = this;
        var localSelectorMap = {}; // local styles

        parser.addListener("startrule", function(event) {
            var selectors = event.selectors,
                selector,
                text,
                i;

            for (i=0; i < selectors.length; i++) {
                selector = selectors[i];
                text = selector.text.replace(/[ ]+/g, ' ').trim();
                if (localSelectorMap[text]) {
                    reporter.report("Duplicate Selector Found: " + selector.text, selector.line, 1, rule);
                }
                localSelectorMap[text] = true;
            }
        });
    }
};
