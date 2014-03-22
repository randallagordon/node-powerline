"use strict";

var test = require("tape");

var ansi = require("../lib/ansi");

test("compose", function (t) {
  t.plan(2);
  t.equal(ansi.compose([ "reset" ]), "%{[0m%}");
  t.equal(ansi.compose([ "reset", "fg-256", 2, "bg-default", "normal" ]), "%{[0;38;5;2;49;22m%}");
});

test("reset", function (t) {
  var rendered = ansi.reset();

  t.plan(1);
  t.equal(rendered, "%{[0m%}");
});

test("setForeground", function (t) {
  var rendered = ansi.setForeground(42);

  t.plan(1);
  t.equal(rendered, "%{[38;5;42m%}");
});

test("setBackground", function (t) {
  var rendered = ansi.setBackground(42);

  t.plan(1);
  t.equal(rendered, "%{[48;5;42m%}");
});
