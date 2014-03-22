"use strict";

var strftime = require("strftime");

var date = {};

date = function (args) {
  // Default format
  var format = (args && args.format) || "%Y-%m-%d";

  return strftime(format);
};

module.exports = date;
