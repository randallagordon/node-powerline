"use strict";

module.exports = function (colors) {
  return function (color) {
    if(colors[color].length) {
      return colors[color][0];
    } else {
      return colors[color];
    }
  };
};

