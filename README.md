# grunt-freemarker

> Freemarker renderer plugin for grunt.

[![NPM version](https://badge.fury.io/js/grunt-freemarker.png)](http://badge.fury.io/js/grunt-freemarker)

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

The folder where all views are placed.

#### options.out
Type: `String`
Default value: `public`

The folder where to the resulting .html files are exported to.

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
```ftl
view sample

${name}
```

Then, the result would be `public/simple.html`:
```html
view sample

ijse
```

#### Using JavaScript Objects as data
The `data` attribute can accept an array of JavaScript files instead of json data. This allows you to mock Java methods used in your freemarker.

The javascript file defined in `mocks/simple.js`:
```js
module.exports = {
  view: "/simple.ftl",
  out: "/simple.html",
  data: ["data.js"]
};
```
`data.js` in the same folder as `mocks/simple.js`:
```js
({
    name: "ijse",
    greet: function(name) {
      return "Hello " + name;
    }
})
```
and `views/simple.ftl`:
```ftl
view sample

${name}

${greet("istenes")}
```

Then, the result would be `public/simple.html`:
```html
view sample

ijse

Hello istenes
```

More advanced JavaScript objects can be made. All the JavaScript code is executed under Rhinos context so we can\'t use node features like `path`, `http` or `require`. However, as the Script runs in Rhinos context you get all Rhinos extra methods and properties, see [Rhino on MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino/Shell#Predefined_Properties)

#### Importing other templates as dependencies
Another attribute, `deps`, accepts a array of paths to `.ftl` files that the main `.ftl` file is dependent upon. These paths are all relative to the options.views path and must be specified as such. These files are then *imported* into the Freemarker Template processing environment, emulating the behavior of the Freemarker import statement.

The javascript file defined in `mocks/simple.js`:
```js
module.exports = {
  deps: ["deps/another/functions.ftl", "deps/macros.ftl"],
  view: "/simple.ftl",
  out: "/simple.html",
  data: ["data.js"]
};
```
`data.js` in the same folder as `mocks/simple.js`:
```js
({
    name: "Alof"
})
```

where `views/deps/another/functions.ftl`:
```ftl
[#function aFunction name]
	[#return name?replace("A", "O") /]
[/#function]
```

and `views/deps/macros.ftl`:
```ftl
[#macro aMacro name]
<strong>Hi there, ${name}</strong>
[/#macro]
```

and `views/simple.ftl`:
```ftl
macros.aMacro(functions.aFunction(name))
```

Then, the result would be `public/simple.html`:
```html
<strong>Hi there, Olof</strong>
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

