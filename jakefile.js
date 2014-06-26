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

    var result = lint.validateFileList(files.toArray(), options, {});
    if(!result) jake.fail("Lint Failed");

  });

  desc("Integration");
  task("Integration", ["default"], function(){
    console.log("Integration logic here");

    console.log("1. Make sure 'git status' is clean");
    console.log("2. Build on Integration box");
    console.log("   a. Walk over to integration box");
    console.log("   b. 'git pull'");
    console.log("   c. 'jake'");
    console.log("   d. If jake fails, start over");
    console.log("3. 'git checkout integrate'");
    console.log("4. 'git merge master --no-ff --log'");
    console.log("5. 'git checkout master'");
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

