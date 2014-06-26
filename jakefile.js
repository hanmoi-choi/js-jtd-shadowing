/*global desc, task, jake*/

"use strict";

desc("default");
task("default", ["lint"]);

desc("Lint everything");
task("lint", [], function(){
  var lint = require("./build/lint/lint_runner");

  var files = new jake.FileList();
  files.include("**/*.js");
  files.exclude("node_modules");

  var options = {node: true};
  var globals = {};
  lint.validateFileList(files.toArray(), options, globals);

});
