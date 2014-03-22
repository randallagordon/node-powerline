"use strict";

var path = require("path"),
  argv = require("minimist")(process.argv.slice(2));

var baseConfigPath = path.resolve((process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) +
                              "/.config/powerline/");

var config = require(baseConfigPath + "/config.json"),
  shellConfig = require(baseConfigPath + "/themes/shell/" + config.ext.shell.theme),
  colorConfig = require(baseConfigPath + "/colors.json");

var shell = require("./lib/shell")(shellConfig, colorConfig);

if (argv._[0] === "shell") {
  shell[argv._[1]]();
} else {
  console.dir(argv);
}
