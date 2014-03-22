"use strict";

var test = require("tape");

var versions = require("../lib/segments/versions");

test("node should return correct version of node", function (t) {
  var content = versions.node();

  t.plan(1);
  t.equal(content, process.version);
});
