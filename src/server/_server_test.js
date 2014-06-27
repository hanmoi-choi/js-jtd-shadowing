"use strict";

var server = require("./server.js");
var http = require("http");
var fs = require("fs");

// Integration Test
exports.test_serverServersFile = function (test) {
  var testDir = "generated/test/";
  var testFile = testDir + "test.html";

  var testData = "This is a test data";

  fs.writeFileSync(testFile, testData);
  server.start(8080);
  var request = http.get("http://localhost:8080");

  request.on("response", function (response) {
    var receivedData = false;
    response.setEncoding("utf8");

    test.equals(200, response.statusCode, "status code");
    response.on("data", function (chunk) {
      receivedData = true;
      test.equals(testData, chunk, "response text");
    });

    response.on("end", function () {
      test.ok(receivedData, "should have received response data");
      server.stop(function () {
        fs.unlinkSync(testFile);
        test.ok(!fs.existsSync(testFile), "Tmp test file shall be deleted!");
        test.done();
      });
    });
  });

};

exports.test_serverRequiresPortNumber = function (test) {
  test.throws(function () {
    server.start();
  });

  test.done();
};

exports.test_serverRunCallbackWhenServerStopCompletes = function (test) {
  server.start(8080); //TODO: weird

  server.stop(function () {
    test.done();
  });
};

exports.test_stopCalledWhenServerIsNotRunningThrowException = function (test) {
  test.throws(function () {
    server.stop();
  });
  test.done();
};
