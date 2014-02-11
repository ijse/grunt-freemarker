# grunt-freemarker

> Freemarker renderer plugin for grunt.

[![NPM](https://nodei.co/npm/grunt-freemarker.png?downloads=true&stars=true)](https://nodei.co/npm/grunt-freemarker/)


## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-freemarker --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-freemarker');
```

## The "freemarker" task

### Overview
In your project's Gruntfile, add a section named `freemarker` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  freemarker: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.views
Type: `String`
Default value: `views`

The folder where all views in.

#### options.out
Type: `String`
Default value: `public`

The folder where export to.

#### options.encoding
Type: `String`
Default value: `utf-8`

View's encode.

### Usage Examples

The view and dest file defined in `mocks/simple.js`:
```js
module.exports = {
  view: "/simple.ftl",
  out: "/simple.html",
  data: {
    name: "ijse"
  }
};
```
and `views/simple.ftl`:
```text
view sample

${name}
```

Then, the result would be `public/simple.html`:
```
view sample

ijse
```

#### Default Options

```js
grunt.initConfig({
  freemarker: {
    options: {},
    src: "mocks/*.js"
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/ijse/grunt-freemarker/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

