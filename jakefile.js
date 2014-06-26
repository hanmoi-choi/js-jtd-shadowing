desc("default");
task("default", ["lint"]);

desc("Lint everything");
task("lint", [], function(){
  console.log("Lint Here!");
  var lint = require("./build/lint/lint_runner");
  lint.validateFile("jakefile.js", {}, {});
});
