"use strict";

var test = require("tape");

var strftime = require("strftime");

var date = require("../lib/segments/date");

test("return date with default format", function (t) {
  var content = date();

  t.plan(1);
  t.equal(content, strftime("%Y-%m-%d"));
});

test("return date with custom format", function (t) {
  var content = date({ "format": "%H:%M" });

  t.plan(1);
  t.equal(content, strftime("%H:%M"));
});
