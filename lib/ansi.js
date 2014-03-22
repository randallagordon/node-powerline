"use strict";

var ansi = {};

var CODES = {
  "reset":         "0",
  "bold":          "1",
  "faint":         "2",
  "normal":        "22",
  "fg-256":        "38;5",
  "bg-256":        "48;5",
  "bg-default":    "49",
};

ansi.compose = function (codes) {
  return "%{[" + codes.map(function (code) {
    return CODES[code] || code;
  }).join(";") + "m%}";
};

ansi.reset = function () {
  return "%{[0m%}";
};

ansi.setForeground = function (color) {
  return "%{[38;5;" + color + "m%}";
};

ansi.setBackground = function (color) {
  return "%{[48;5;" + color + "m%}";
};

module.exports = ansi;
