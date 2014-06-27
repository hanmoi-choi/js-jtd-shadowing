(function(){

  "use strict";

  var server = require("./server.js");
  var http = require("http");
  var fs = require("fs");
  var assert = require("assert");

  var testFile = "generated/test/test.html";

  exports.tearDown = function (done) {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
      assert.ok(!fs.existsSync(testFile), "Tmp test file shall be deleted!");
    }

    done();
  };

  function httpGet(url, callback) {
    var request = http.get(url);

    request.on("response", function (response) {
      var receivedData = "";
      response.setEncoding("utf8");

      response.on("data", function (chunk) {
        receivedData += chunk;
      });

      response.on("end", function () {
        server.stop(function () {
          callback(response, receivedData);

        });

      });
    });
  }


// Integration Test
  exports.test_serverServersFile = function (test) {
    var testData = "This is a test data";

    fs.writeFileSync(testFile, testData);
    server.start(testFile, 8080);

    httpGet("http://localhost:8080", function (response, receivedData) {
      test.equals(200, response.statusCode, "status code");
      test.equals(testData, receivedData, "response text");
      test.done();
    });
  };

  exports.test_serverReturn404ExceptForHomepage = function (test) {
    var testData = "This is a test data";

    fs.writeFileSync(testFile, testData);
    server.start(testFile, 8080);

    httpGet("http://localhost:8080/dummy", function (response, receivedData) {
      test.equals(404, response.statusCode, "status code");
      test.done();
    });
  };

  exports.test_serverReturnHomepageWhenRequestedIndex = function (test) {
    var testData = "This is a test data";

    fs.writeFileSync(testFile, testData);
    server.start(testFile, 8080);

    httpGet("http://localhost:8080/index.html", function (response, receivedData) {
      test.equals(200, response.statusCode, "status code");
      test.equals(testData, receivedData, "response text");
      test.done();
    });
  };

  exports.test_serverRequiresPortNumber = function (test) {
    test.throws(function () {
      server.start();
    });

    test.done();
  };

  exports.test_serverRunCallbackWhenServerStopCompletes = function (test) {
    server.start(testFile, 8080); //TODO: weird

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
})();

