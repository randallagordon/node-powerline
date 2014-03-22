"use strict";

var os = require("os");

var ansi = require("../ansi");

var env = {};

env.hostname = function (args) {
  if (args && args.only_if_ssh) {
    return "";
  } else {
    return os.hostname();
  }
};

env.user = function () { return process.env.USER; };

env.cwd = function (args) {
  args = args || {};

  var cwd = args.cwd || process.cwd(),
    home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

  cwd = cwd.replace(new RegExp(home), "~").split("/");

  if (cwd[0] !== "~") {
    cwd[0] = "/";
  }

  if (cwd[1] === "") {
    cwd.pop();
  }

  if (cwd.length > args.dir_limit_depth) {
    cwd = cwd.slice(cwd.length - args.dir_limit_depth);
    cwd.unshift("⋯");
  }

  var pieces = [];

  if (cwd.length === 1) {
    pieces.push(ansi.compose([ "reset", "fg-256", args.color.pbg, "bg-256", args.currentbg, "normal" ]));
    pieces.push(args.divider);
    pieces.push(ansi.compose([ "reset", "fg-256", args.currentfg, "bg-256", args.currentbg ]));
  } else {
    pieces.push(ansi.compose([ "reset", "fg-256", args.color.pbg, "bg-256", args.color.bg, "normal" ]));
    pieces.push(args.divider);
    pieces.push(ansi.compose([ "reset", "fg-256", args.color.fg, "bg-256", args.color.bg ]));
  }

  if (args.first) {
    pieces.push(" ");
  }

  pieces.push(args.before);

  cwd.forEach(function (dir, i) {
    if (i === cwd.length - 1) {
      pieces.push(dir);
      pieces.push(ansi.compose([ "reset", "fg-256", args.currentbg, "bg-256", args.currentbg ]));
    } else if (i === cwd.length - 2) {
      pieces.push(dir + " ");
      pieces.push(ansi.compose([ "reset", "fg-256", args.color.bg, "bg-256", args.currentbg, "normal" ]));
      pieces.push(args["dividerhard" + args.side] + " ");
      pieces.push(ansi.compose([ "reset", "fg-256", args.currentfg, "bg-256", args.currentbg, "bold" ]));
    } else {
      pieces.push(dir + " ");
      pieces.push(ansi.compose([ "reset", "fg-256", args.dividerfg, "bg-256", args.dividerbg, "normal" ]));
      pieces.push(args["dividersoft" + args.side] + " ");
      pieces.push(ansi.compose([ "reset", "fg-256", args.color.fg, "bg-256", args.color.bg ]));
    }
  });

  if (args.last) {
    pieces.push(" ");
    pieces.push(ansi.compose([ "reset", "fg-256", args.color.nbg, "bg-default", "normal" ]));
  } else {
    pieces.push(ansi.compose([ "reset", "fg-256", args.color.bg, "bg-256", args.color.nbg, "normal" ]));
  }

  pieces.push(" ");

  if (args.last) {
    pieces.push(args.divider);
    pieces.push(ansi.reset());
  }

  return pieces.join("");
};

env.mode = function (args) {
  args = args || {};

  var mode = process.env.VIMODE;

  var pieces = [];

  if (!args.first) {
    pieces.push(ansi.compose([ "reset", "fg-256", args.color.pbg, "bg-256", args.color["bg" + mode], "normal" ]));
    pieces.push(args.divider);
  }
  
  if (args.first) {
    pieces.push(" ");
  }

  pieces.push(ansi.compose([ "reset", "fg-256", args.color["fg" + mode], "bg-256", args.color["bg" + mode], "normal" ]));
  pieces.push(args.before);
  pieces.push(args.after);

  if (args.last) {
    pieces.push(" ");
    pieces.push(ansi.compose([ "reset", "fg-256", args.color["bg" + mode], "bg-default", "normal" ]));
  } else {
    pieces.push(ansi.compose([ "reset", "fg-256", args.color["bg" + mode], "bg-256", args.color.nbg, "normal" ]));
  }

  pieces.push(args.divider);

  if (args.last) {
    pieces.push(ansi.reset());
  }

  return pieces.join("");
};

module.exports = env;
