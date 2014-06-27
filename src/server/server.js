"use strict";

var http = require("http");
var fs = require("fs");
var server;

exports.start = function(fileToRead, portNumber) {
  if(!portNumber) throw new Error("Port number is required");

  server = http.createServer();
  server.on("request", function(request, response) {
    if(request.url !== "/") {
      response.statusCode = 404;
      response.end();
    } else {
      fs.readFile(fileToRead, function (err, data) {
        if (err) throw err;
        response.end(data);
      });
    }

  });

  server.listen(portNumber);    //TODO: Remove duplication
};

exports.stop = function(callback) {
  server.close(callback);
};
