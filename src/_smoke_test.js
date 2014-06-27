// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.

// launch the server in the same way it happens in production
// get a page
// confirm we got something

(function() {
	"use strict";

	var jake = require("jake");
	var child_process = require("child_process");
	var http = require("http");
  var fs = require("fs");
	var child;

	exports.setUp = function(done) {
		runServer(done);
	};

	exports.tearDown = function(done) {
		child.on("exit", function(code, signal) {
			done();
		});
		child.kill();
	};

	exports.test_canGetHomePage = function(test) {
		httpGet("http://localhost:5000", function(response, receivedData) {
			var foundHomePage = receivedData.indexOf("WeeWikiPaint home page") !== -1;
			test.ok(foundHomePage, "home page should have contained test marker");
			test.done();
		});
	};

	exports.test_canGet404Page = function(test) {
		httpGet("http://localhost:5000/nonexistant.html", function(response, receivedData) {
			var foundHomePage = receivedData.indexOf("WeeWikiPaint 404 page") !== -1;
			test.ok(foundHomePage, "404 page should have contained test marker");
			test.done();
		});
  };

	function runServer(callback) {
    var web = parseProcfile();

		child = child_process.spawn(web.command, web.options);
		child.stdout.setEncoding("utf8");
		child.stdout.on("data", function(chunk) {
			if (chunk.trim() === "Server started") callback();
		});
	}

  function parseProcfile() {
    var procfile = require("procfile");
    var file = fs.readFileSync("Procfile", "utf8");
    var parsed = procfile.parse(file);
    var web = parsed.web;
    web.options = web.options.map(function(e){
      if(e === "$PORT") return "5000";
      else return e;
    });

    return web;
  }

	function httpGet(url, callback) {
		var request = http.get(url);
		request.on("response", function(response) {
			var receivedData = "";
			response.setEncoding("utf8");

			response.on("data", function(chunk) {
				receivedData += chunk;
			});
			response.on("end", function() {
				callback(response, receivedData);
			});
		});
	}

}());
