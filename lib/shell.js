"use strict";

var segment = require("./segment"),
  segments = require("./segments");

var resolveColor;

var shell = {};

shell.left = function () {
  var segs = [];

  segs.push(segment.render({
    "first": true,
    "side": "left",
    "before": " ",
    "divider": " ",
    "color": {
      "fg": resolveColor("brightyellow"),
      "bg": resolveColor("mediumorange"),
      "nbg": resolveColor("darkblue")
    },
    "only_if_ssh": false,
  }, segments.env.hostname));


  segs.push(segment.render({
    "first": segs[0] === "",
    "side": "left",
    "divider": " ",
    "color": {
      "fg": resolveColor("brightcyan"),
      "bg": resolveColor("darkblue"),
      "pbg": resolveColor("mediumorange"),
      "nbg": resolveColor("gray2"),
    },
  }, segments.env.user));

  segs.push(segment.render({
    "side": "left",
    "bare": true,
    "divider": " ",
    "color": {
      "fg": resolveColor("gray9"),
      "bg": resolveColor("gray2"),
      "pbg": resolveColor("darkblue"),
      "nbg": resolveColor("gray4"),
    },
    "dir_limit_depth": 3,
    "dividersoftleft": "",
    "dividersoftright": "",
    "dividerhardleft": "",
    "dividerhardright": "",
    "dividerfg": resolveColor("gray7"),
    "dividerbg": resolveColor("gray2"),
    "currentfg": resolveColor("white"),
    "currentbg": resolveColor("gray4"),
  }, segments.env.cwd));

  segs.push(segment.render({
    "side": "left",
    "last": true,
    "bare": true,
    "before": "$",
    "divider": " ",
    "color": {
      "fgcommand": resolveColor("darkestgreen"),
      "bgcommand": resolveColor("mediumgreen"),
      "fginsert": resolveColor("brightcyan"),
      "bginsert": resolveColor("darkblue"),
      "pbg": resolveColor("gray4"),
    },
  }, segments.env.mode));

  console.log(segs.join(""));
};

shell.right = function () {
  var segs = [];

  segs.push(segment.renderRight({
    "first": true,
    "side": "right",
    "before": "⬡  ",
    "divider": " ",
    "color": {
      "fg": resolveColor("gray1"),
      "bg": resolveColor("green")
    },
  }, segments.versions.node));

  segs.push(segment.renderRight({
    "side": "right",
    "divider": " ",
    "color": {
      "fg": resolveColor("white"),
      "bg": resolveColor("gray2"),
      "pbg": resolveColor("green")
    },
  }, segments.date));

  segs.push(segment.renderRight({
    "side": "right",
    "last": true,
    "divider": " ",
    "color": {
      "fg": resolveColor("white"),
      "bg": resolveColor("gray4"),
      "pbg": resolveColor("gray2")
    },
    "format": "%H:%M:%S"
  }, segments.date));

  console.log(segs.join(""));
};

module.exports = function (config, colorConfig) {
  resolveColor = require("./color")(colorConfig.colors);
  return shell;
};
