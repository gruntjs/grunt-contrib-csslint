# Options

Any specified option will be passed through directly to [csslint](http://csslint.net/), thus you can specify any option that csslint supports. The csslint API is a bit awkward: For each rule, a value of `false` ignores the rule, a value of `2` will set it to become an error. Otherwise all rules are considered warnings.

For the current csslint version, these rules are available:

* important
* adjoining-classes
* known-properties
* box-sizing
* box-model
* overqualified-elements
* display-property-grouping
* bulletproof-font-face
* compatible-vendor-prefixes
* regex-selectors
* errors
* duplicate-background-images
* duplicate-properties
* empty-rules
* selector-max-approaching
* gradients
* fallback-colors
* font-sizes
* font-faces
* floats
* star-property-hack
* outline-none
* import
* ids
* underscore-property-hack
* rules-count
* qualified-headings
* selector-max
* shorthand
* text-indent
* unique-headings
* universal-selector
* unqualified-attributes
* vendor-prefix
* zero-units

For an explanation of those rules, [check the csslint wiki](https://github.com/stubbornella/csslint/wiki/Rules).

*Side note: To update this list, run this:*

```bash
node -e "require('csslint').CSSLint.getRules().forEach(function(x) { console.log(x.id) })"
```
