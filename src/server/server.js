"use strict";

var http = require("http");
var fs = require("fs");
var server;

exports.start = function(portNumber) {
  if(!portNumber) throw new Error("Port number is required");

  server = http.createServer();
  server.on("request", function(request, response) {
    fs.readFile("generated/test/test.html", function (err, data) {
      if (err) throw err;
      response.end(data);
    });
  });

  server.listen(portNumber);    //TODO: Remove duplication
};

exports.stop = function(callback) {
  server.close(callback);
};
