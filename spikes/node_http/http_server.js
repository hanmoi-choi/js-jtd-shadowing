"use strict";

var http = require("http");
var server = http.createServer();

server.on("request", function(request, response){
  console.log("Received Request");

  var body = "<html><head><title>Node HTTP Spike</title></head>" +
      "<body><p>This is HTTP Server Spike</p></body></html>";

  response.end(body);
});

server.listen(8080);
console.log("Server Started");

