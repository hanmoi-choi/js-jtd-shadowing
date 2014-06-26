/*global desc, task, jake, lintOptions*/
(function(){
  "use strict";

  desc("default");
  task("default", ["lint"]);

  desc("Lint everything");

  task("lint", [], function () {
    var lint = require("./build/lint/lint_runner");

    var files = new jake.FileList();
    files.include("**/*.js");
    files.exclude("node_modules");

    var options = lintOptions();

    lint.validateFileList(files.toArray(), options, {});

  });

  function lintOptions() {
    return {
      bitwise: true,
      curly: false,
      eqeqeq: true,
      forin: true,
      immed: true,
      latedef: true,
      newcap: true,
      noarg: true,
      noempty: true,
      nonew: true,
      regexp: true,
      undef: true,
      strict: true,
      trailing: true,
      node: true
    };
  }
})();

