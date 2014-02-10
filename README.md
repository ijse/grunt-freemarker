# grunt-freemarker

> Freemarker renderer plugin for grunt.

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
      views: "views", // Views folder
      encoding: "utf-8" // Default encoding for views
    },
    your_target: {
      files: {
          "public/simple.html": "mocks/simple.js"
      }
    },
  },
});
```

### Options

#### options.views
Type: `String`
Default value: `views`

The folder where all views in.

#### options.encoding
Type: `String`
Default value: `utf-8`

View's encode.

### Usage Examples

In `mocks/simple.js`:
```js
module.exports = {
  view: "/simple.ftl",
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

Then, the result will be `public/simple.html`:
```
view sample

ijse
```

#### Default Options

```js
grunt.initConfig({
  freemarker: {
    options: {},
    files: {
      "public/simple.html": "mocks/simple.js"
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
