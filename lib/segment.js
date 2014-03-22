"use strict";

var ansi = require("./ansi");

var segment = {};

segment.render = function (opts, contentFn, args) {
  opts = opts || {};

  if (opts.side === "right") {
    return segment.renderRight(opts, contentFn, args);
  } else {
    return segment.renderLeft(opts, contentFn, args);
  }
};

segment.renderLeft = function (opts, contentFn) {
  opts = opts || {};
  var color = opts.color || {},
    content = contentFn(opts);

  if (content === "" || opts.bare) { return content; }

  var pieces = [];

  if (!opts.first) {
    pieces.push(ansi.compose([ "reset", "fg-256", color.pbg, "bg-256", color.bg, "normal" ]));
    pieces.push(opts.divider);
  }

  pieces.push(ansi.compose([ "reset", "fg-256", color.fg, "bg-256", color.bg ]));

  if (opts.first) {
    pieces.push(" ");
  }

  pieces.push(opts.before);
  pieces.push(content);
  pieces.push(" ");

  if (opts.last) {
    pieces.push(ansi.compose([ "reset", "fg-256", color.nbg, "bg-default", "normal" ]));
    pieces.push(opts.divider);
    pieces.push(ansi.reset());
  }

  return pieces.join("");
};

segment.renderRight = function (opts, contentFn, args) {
  opts = opts || {};
  var color = opts.color || {},
    content = contentFn(opts);

  if (content === "" || opts.bare) { return content; }

  var pieces = [];

  if (opts.first) {
    pieces.push(ansi.compose([ "reset", "fg-256", color.bg, "bg-default", "normal" ]));
  } else {
    pieces.push(ansi.compose([ "reset", "fg-256", color.bg, "bg-256", color.pbg, "normal" ]));
  }

  pieces.push(opts.divider);
  pieces.push(ansi.compose([ "reset", "fg-256", color.fg, "bg-256", color.bg ]));
  pieces.push(" ");
  pieces.push(opts.before);
  pieces.push(content);

  if (opts.last) {
    pieces.push(" ");
    pieces.push(ansi.reset());
  }

  return pieces.join("");
};

module.exports = segment;
