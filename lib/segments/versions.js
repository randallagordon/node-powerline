"use strict";

var versions = {};

versions.node = function () { return process.version; };

module.exports = versions;
