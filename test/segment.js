"use strict";

var test = require("tape");

var segment = require("../lib/segment");

function happySegment() {
  return "☺"; 
}

test("segment.render returns a string", function (t) {
  var rendered = segment.render({}, happySegment);

  t.plan(1);
  t.deepEqual(typeof rendered, "string");
});
