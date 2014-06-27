(function(){
  "use strict";

  var http = require("http");
  var fs = require("fs");
  var server;

  exports.start = function(pageToServer, NotFoundPageToServer, portNumber) {
    if(!portNumber) throw new Error("Port number is required");

    server = http.createServer();
    server.on("request", function(request, response) {
      function responseWithFile(file) {
        fs.readFile(file, function (err, data) {
          if (err) throw err;
          response.end(data);
        });
      }

      if(request.url === "/" || request.url === "/index.html") {
        responseWithFile(pageToServer);
      } else {
        response.statusCode = 404;
        responseWithFile(NotFoundPageToServer);
      }
    });

    server.listen(portNumber);    //TODO: Remove duplication
  };

  exports.stop = function(callback) {
    server.close(callback);
  };
})();

