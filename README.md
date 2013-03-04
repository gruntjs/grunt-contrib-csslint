# grunt-contrib-csslint [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-csslint.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-csslint)

> Lint CSS files.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-csslint --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-csslint');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4).*



## Csslint task
_Run this task with the `grunt csslint` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

Files are linted with [csslint](https://github.com/stubbornella/csslint).

### Usage Examples

```js
csslint: {
  files: 'app.css',
}
```


## Release History

 * 2013-02-28   v0.1.0   Initial release.

---

Task submitted by [Jörn Zaefferer](http://bassistance.de)

*This file was generated on Mon Mar 04 2013 08:48:16.*
