"use strict";

var test = require("tape");

var os = require("os");

var env = require("../lib/segments/env"),
  resolveColor = require("../lib/color")({
    "gray2": 236,
    "gray4": 240,
    "gray7": 245,
    "gray9": 250,
    "white": 231,
    "darkblue": 31,
    "brightcyan": 159,
    "darkestgreen": 22,
    "mediumgreen": 70,
  });

test("env segments", function (t) {
  var home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
    cwd = process.cwd().replace(new RegExp(home), "~"),
    opts = {
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
    };

  t.plan(8);
  t.equal(env.hostname(), os.hostname());
  t.equal(env.hostname({ "only_if_ssh": true }), "");
  t.equal(env.user(), process.env.USER);

  opts.cwd = "/";
  t.equal(env.cwd(opts), "%{[0;38;5;31;48;5;240;22m%} %{[0;38;5;231;48;5;240m%}/%{[0;38;5;240;48;5;240m%}%{[0;38;5;236;48;5;240;22m%} ");

  opts.cwd = "/var/tmp";
  t.equal(env.cwd(opts), "%{[0;38;5;31;48;5;236;22m%} %{[0;38;5;250;48;5;236m%}/ %{[0;38;5;245;48;5;236;22m%} %{[0;38;5;250;48;5;236m%}var %{[0;38;5;236;48;5;240;22m%} %{[0;38;5;231;48;5;240;1m%}tmp%{[0;38;5;240;48;5;240m%}%{[0;38;5;236;48;5;240;22m%} ");

  opts.cwd = "/home/randall/Projects/powerline-node";
  t.equal(env.cwd(opts), "%{[0;38;5;31;48;5;236;22m%} %{[0;38;5;250;48;5;236m%}~ %{[0;38;5;245;48;5;236;22m%} %{[0;38;5;250;48;5;236m%}Projects %{[0;38;5;236;48;5;240;22m%} %{[0;38;5;231;48;5;240;1m%}powerline-node%{[0;38;5;240;48;5;240m%}%{[0;38;5;236;48;5;240;22m%} ");

  opts.cwd = "/home/randall/Projects/powerline-node/node_modules";
  t.equal(env.cwd(opts), "%{[0;38;5;31;48;5;236;22m%} %{[0;38;5;250;48;5;236m%}⋯ %{[0;38;5;245;48;5;236;22m%} %{[0;38;5;250;48;5;236m%}Projects %{[0;38;5;245;48;5;236;22m%} %{[0;38;5;250;48;5;236m%}powerline-node %{[0;38;5;236;48;5;240;22m%} %{[0;38;5;231;48;5;240;1m%}node_modules%{[0;38;5;240;48;5;240m%}%{[0;38;5;236;48;5;240;22m%} ");

  t.equal(env.mode({
    "last": true,
    "before": "$",
    "divider": " ",
    "color": {
      "fgcommand": resolveColor("darkestgreen"),
      "bgcommand": resolveColor("mediumgreen"),
      "fginsert": resolveColor("brightcyan"),
      "bginsert": resolveColor("darkblue"),
      "pbg": resolveColor("gray4"),
    },
  }), "%{[0;38;5;240;48;5;70;22m%} %{[0;38;5;22;48;5;70;22m%}$ %{[0;38;5;70;49;22m%} %{[0m%}");
});
