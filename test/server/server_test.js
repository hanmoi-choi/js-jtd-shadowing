"use strict";

var server = require("../../src/server/server.js");
var assert = require("assert");

exports.testNothing = function(test){
  assert.equal(3, server.num(), "Number");
//  test.equals(3, server.num(), "Number");
  test.done();
};
