"use strict";

var test = require("tape");

var resolveColor = require("../lib/color")({
  "pinkred": 161,
  "green": [2, "719e07"],
});

test("resolveColor", function (t) {
  t.plan(2);
  t.equal(resolveColor("pinkred"), 161);
  t.equal(resolveColor("green"), 2);
});
