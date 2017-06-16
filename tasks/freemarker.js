/*
 * grunt-freemarker
 * https://github.com/liyi_nad/grunt-freemarker
 *
 * Copyright (c) 2014 ijse
 * Licensed under the MIT license.
 */

'use strict';

var spawn = require('child_process').spawn;
var iconv = require("iconv-lite");
var path = require("path");

var jarFile = path.join(__dirname, "../jar/FMtoll-0.6.jar");

//
// args:
//  data - data model
//  settings - include `encoding` and `viewFolder`
//  ftlFile - template file name
var processTemplate = function(args) {
  var dataModel = JSON.stringify(args.data);
  var deps = JSON.stringify(args.deps);
  var settings = JSON.stringify(args.settings);
  var resultData = "";

  var cmd = spawn('java', ["-jar", jarFile,
      settings,
      args.ftlFile,
      dataModel,
      deps ]);

  if(args.callback) {
    cmd.stdout.on("data", function(data) {
      // args.callback(null, iconv.decode(data, settings.encoding));
      resultData += iconv.decode(data, settings.encoding);
    });
    cmd.stderr.on("data", function(data) {
      // Print error message
      console.log(iconv.decode(data, settings.encoding));
    });
    cmd.stdout.on("end", function() {
      args.callback(null, resultData);
    });
  }
};

module.exports = function(grunt) {

  grunt.registerMultiTask('freemarker', 'Freemarker renderer plugin for grunt.', function() {

    var count = 0;
    var done = this.async();

    // Defaults options.
    var options = this.options({
      views: "views",
      out: this.data.out || "public",
      encoding: this.data.encoding || "utf-8"
    });

    var publicFolder = path.resolve(options.out);

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

        f.src.filter(function(filepath) {
          // Warn on and remove invalid source files (if nonull was set).
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Mock file "' + filepath + '" not found.');
            return false;
          } else {
            return true;
          }
        }).map(function(filepath) {
          // Load the mock
          var file = path.resolve(filepath);
          // kill require cache, reload file newest content
          delete require.cache[require.resolve(file)];
          var mockData = require(file);

          var mockList = [];
          // if(!mockData instanceof Array) {
          //   tMock = [ mockData ]
          // }

          mockList = mockList.concat(mockData);

          mockList.forEach(function(tMock) {
            count++;
            var destFile = path.join(publicFolder, tMock.out || tMock.view.replace(path.extname(tMock.view),".html") );

              if(tMock.data instanceof Array) {
                //if the data is an array, then we need to add the relative path to the root.
                for(var i = 0; i < tMock.data.length; i++) {
                  tMock.data[i] = path.join(path.dirname(file), tMock.data[i]);
                }
              }

            // Get results
            processTemplate({
              deps: tMock.deps,
              data: tMock.data,
              settings: {
                encoding: options.encoding,
                viewFolder: path.resolve(options.views)
              },
              ftlFile: tMock.view,
              callback: function(err, result) {
                count--;
                if(err) {
                  grunt.log.warn('Process Mock file' + filepath + '" error!');
                  done(false);
                  return false;
                }

                // Write to file
                grunt.file.write(destFile, result);
                grunt.log.writeln('File "' + destFile + '" created.');
                if (count < 1){
                  done(true);
                }
              }
            });


          });

        });

      });
  });

};
