(function(){

  "use strict";

  var server = require("./server.js");
  var http = require("http");
  var fs = require("fs");
  var assert = require("assert");

  var TEST_PAGE = "generated/test/test.html";
  var TEST_404_PAGE = "generated/test/404test.html";

  exports.tearDown = function (done) {
    function cleanUp(file) {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        assert.ok(!fs.existsSync(file), "Tmp test page shall be deleted!");
      }
    }

    [TEST_PAGE, TEST_404_PAGE].map(cleanUp);

    done();
  };

  function httpGet(url, callback) {
    server.start(TEST_PAGE, TEST_404_PAGE, 8080);

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
  exports.test_returnHomepage = function (test) {
    var testData = "This is a test data";
    fs.writeFileSync(TEST_PAGE, testData);

    httpGet("http://localhost:8080", function (response, receivedData) {
      test.equals(200, response.statusCode, "status code");
      test.equals(testData, receivedData, "response text");
      test.done();
    });
  };

  exports.test_return404ExceptForHomepage = function (test) {
    var expected404Data = "404 Error";
    fs.writeFileSync(TEST_404_PAGE, expected404Data);

    httpGet("http://localhost:8080/dummy", function (response, receivedData) {
      test.equals(404, response.statusCode, "status code");
      test.equals(expected404Data, receivedData, "404 response text");

      test.done();
    });
  };

  exports.test_returnHomepageWhenRequestedIndex = function (test) {
    var testData = "This is a test data";

    fs.writeFileSync(TEST_PAGE, testData);

    httpGet("http://localhost:8080/index.html", function (response, receivedData) {
      test.equals(200, response.statusCode, "status code");
      test.equals(testData, receivedData, "response text");
      test.done();
    });
  };

  exports.test_requiresPortNumber = function (test) {
    test.throws(function () {
      server.start();
    });

    test.done();
  };

  exports.test_runCallbackWhenServerStopCompletes = function (test) {
    server.start(TEST_PAGE, TEST_404_PAGE, 8080); //TODO: weird

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

