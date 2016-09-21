# grunt-contrib-csslint v2.0.0 [![Build Status: Linux](https://travis-ci.org/gruntjs/grunt-contrib-csslint.svg?branch=master)](https://travis-ci.org/gruntjs/grunt-contrib-csslint) [![Build Status: Windows](https://ci.appveyor.com/api/projects/status/ls0y0jy0qni18gby/branch/master?svg=true)](https://ci.appveyor.com/project/gruntjs/grunt-contrib-csslint/branch/master)

> Lint CSS files



## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-csslint --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-csslint');
```




## Csslint task
_Run this task with the `grunt csslint` command._


### Options

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


#### csslintrc

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

#### formatters

Type: `array`  
Default: `null`

If the formatters options is specified, the grunt csslint task is able to use the
all formatters provided by csslint.

For the current csslint version, the following formatters are included out of the box:

- `text`
- `compact`
- `lint-xml`
- `csslint-xml`
- `checkstyle-xml`
- `junit-xml`

For an explanation of those formatters, [check the csslint wiki](https://github.com/stubbornella/csslint/wiki/Command-line-interface), section Options/--format.

You are also able to supply your own custom formatter, such as [csslint-stylish](https://www.npmjs.com/package/csslint-stylish). Note that you have to provide the complete module, not just the id. See [example](#providing-a-custom-formatter).

#### absoluteFilePathsForFormatters

Type: `boolean`  
Default: `false`

If the `absoluteFilePathsForFormatters` option is specified and set to `true`, the file names in the generated reports are absolute.

#### quiet

Type: `boolean`  
Default: `false`

Only output errors.

#### quiet_all

Type: `boolean`  
Default: `false`

Outputs without errors and warnings.

### Usage Examples

```js
csslint: {
  strict: {
    options: {
      import: 2
    },
    src: ['path/to/**/*.css']
  },
  lax: {
    options: {
      import: false
    },
    src: ['path/to/**/*.css']
  }
}
```

#### Loading rules from an external file

```js
csslint: {
  options: {
    csslintrc: '.csslintrc'
  },
  strict: {
    options: {
      import: 2
    },
    src: ['path/to/**/*.css']
  },
  lax: {
    options: {
      import: false
    },
    src: ['path/to/**/*.css']
  }
}
```

#### Specifiying output formatters

```js
csslint: {
  options: {
    csslintrc: '.csslintrc',
    formatters: [
      {id: 'junit-xml', dest: 'report/csslint_junit.xml'},
      {id: 'csslint-xml', dest: 'report/csslint.xml'}
    ]
  },
  strict: {
    options: {
      import: 2
    },
    src: ['path/to/**/*.css']
  }
}
```

#### Providing a custom formatter

```js
csslint: {
  options: {
    csslintrc: '.csslintrc',
    formatters: [
      {id: require('csslint-stylish'), dest: 'report/csslint_stylish.xml'}
    ]
  },
  strict: {
    options: {
      import: 2
    },
    src: ['path/to/**/*.css']
  }
}
```

#### Using absolute file paths in the output formatters

```js
csslint: {
  options: {
    absoluteFilePathsForFormatters: true,
    formatters: [
      {id: 'junit-xml', dest: 'report/csslint_junit.xml'},
      {id: 'csslint-xml', dest: 'report/csslint.xml'}
    ]
  }
}
```


## Release History

 * 2016-09-22   v2.0.0   Update (dev)dependecies including to csslint to v1.0.3.
 * 2016-03-04   v1.0.0   Point main to task and remove peerDeps. Updates to docs.
 * 2015-07-18   v0.5.0   Add ability to register custom formatters.
 * 2015-01-18   v0.4.0   The `.csslintrc` file can now contain comments.
 * 2014-09-07   v0.3.1   Show affected browsers in errors and warnings.
 * 2014-09-07   v0.3.0   CSSLint "warnings" no longer fail build. Updated dependencies.
 * 2013-12-02   v0.2.0   Bump to csslint 0.10.0
 * 2013-04-02   v0.1.2   Allow absolute filepaths in reports.
 * 2013-03-14   v0.1.1   Support formatters. Support .csslintrc.
 * 2013-03-07   v0.1.0   Initial release.

---

Task submitted by [Jörn Zaefferer](http://bassistance.de)

*This file was generated on Thu Sep 22 2016 02:55:13.*
