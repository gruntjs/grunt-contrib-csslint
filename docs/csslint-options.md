# Options

Any specified option will be passed through directly to [csslint](http://csslint.net/), thus you can specify any option that csslint supports. The csslint API is a bit awkward: For each rule, a value of `false` ignores the rule, a value of `2` will set it to become an error. Otherwise all rules are considered warnings.

For the current csslint version, these rules are available:

- [important](https://github.com/CSSLint/csslint/wiki/Disallow-%21important)
- [adjoining-classes](https://github.com/CSSLint/csslint/wiki/Disallow-adjoining-classes)
- [known-properties](https://github.com/CSSLint/csslint/wiki/Require-use-of-known-properties)
- [box-sizing](https://github.com/CSSLint/csslint/wiki/Disallow-box-sizing)
- [box-model](https://github.com/CSSLint/csslint/wiki/Beware-of-box-model-size)
- [overqualified-elements](https://github.com/CSSLint/csslint/wiki/Disallow-overqualified-elements)
- [display-property-grouping](https://github.com/CSSLint/csslint/wiki/Require-properties-appropriate-for-display)
- [bulletproof-font-face](https://github.com/CSSLint/csslint/wiki/Bulletproof-font-face)
- [compatible-vendor-prefixes](https://github.com/CSSLint/csslint/wiki/Require-compatible-vendor-prefixes)
- [regex-selectors](https://github.com/CSSLint/csslint/wiki/Disallow-selectors-that-look-like-regular-expressions)
- errors
- [duplicate-background-images](https://github.com/CSSLint/csslint/wiki/Disallow-duplicate-background-images)
- [duplicate-properties](https://github.com/CSSLint/csslint/wiki/Disallow-duplicate-properties)
- [empty-rules](https://github.com/CSSLint/csslint/wiki/Disallow-empty-rules)
- selector-max-approaching
- [gradients](https://github.com/CSSLint/csslint/wiki/Require-all-gradient-definitions)
- [fallback-colors](https://github.com/CSSLint/csslint/wiki/Require-fallback-colors)
- [font-sizes](https://github.com/CSSLint/csslint/wiki/Don%27t-use-too-many-font-size-declarations)
- [font-faces](https://github.com/CSSLint/csslint/wiki/Don%27t-use-too-many-web-fonts)
- [floats](https://github.com/CSSLint/csslint/wiki/Disallow-too-many-floats)
- [star-property-hack](https://github.com/CSSLint/csslint/wiki/Disallow-star-hack)
- [outline-none](https://github.com/CSSLint/csslint/wiki/Disallow-outline%3Anone)
- [import](https://github.com/CSSLint/csslint/wiki/Disallow-%40import)
- [ids](https://github.com/CSSLint/csslint/wiki/Disallow-IDs-in-selectors)
- [underscore-property-hack](https://github.com/CSSLint/csslint/wiki/Disallow-underscore-hack)
- rules-count
- [qualified-headings](https://github.com/CSSLint/csslint/wiki/Disallow-qualified-headings)
- selector-max
- [shorthand](https://github.com/CSSLint/csslint/wiki/Require-shorthand-properties)
- [text-indent](https://github.com/CSSLint/csslint/wiki/Disallow-negative-text-indent)
- [unique-headings](https://github.com/CSSLint/csslint/wiki/Headings-should-only-be-defined-once)
- [universal-selector](https://github.com/CSSLint/csslint/wiki/Disallow-universal-selector)
- [unqualified-attributes](https://github.com/CSSLint/csslint/wiki/Disallow-unqualified-attribute-selectors)
- [vendor-prefix](https://github.com/CSSLint/csslint/wiki/Require-standard-property-with-vendor-prefix)
- [zero-units](https://github.com/CSSLint/csslint/wiki/Disallow-units-for-zero-values)

For an explanation of those rules, [check the csslint wiki](https://github.com/stubbornella/csslint/wiki/Rules).

*Side note: To update this list, run this:*

```bash
node -e "require('csslint').CSSLint.getRules().forEach(function(x) { console.log(x.id) })"
```

A few additional options are supported:


## csslintrc

Type: `string`  
Default: `null`

If this filename is specified, options and globals defined therein will be used. Task and target options override the options within the `.csslintrc` file. It should be a JSON file, but it supports comments:

```json
{
  // unicorns
  "qualified-headings": true,
  "unique-headings": true,
  "known-properties": false
}
```

## formatters

Type: `array`  
Default: `null`

If the formatters options is specified, the grunt csslint task is able to use the
all formatters provided by csslint.

For the current csslint version, the following formatters are supported:

- `text`
- `compact`
- `lint-xml`
- `csslint-xml`
- `checkstyle-xml`
- `junit-xml`

For an explanation of those formatters, [check the csslint wiki](https://github.com/stubbornella/csslint/wiki/Command-line-interface), section Options/--format.

## absoluteFilePathsForFormatters

Type: `boolean`  
Default: `false`

If the `absoluteFilePathsForFormatters` option is specified and set to `true`, the file names in the generated reports are absolute.

## quiet

Type: `boolean`  
Default: `false`

Only output errors.

###### extraRules
Type: `array|String`
Default value: `null`

Specifies the file paths/patterns containing extra csslint rules. The files need to be commonjs modules that export the csslint rule object which will be given to csslint.addRule(...)
