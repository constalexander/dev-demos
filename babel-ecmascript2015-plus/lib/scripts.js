"use strict";

var colors = {
  BL: " Blue",
  OR: " Orange",
  YE: "Yellow",
  PI: "Pink"
};
restParam(1, 2, 3, 4, 5);

function restParam(p1, p2) {
  console.log(p1);
  console.log(p2);

  for (var _len = arguments.length, p3 = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    p3[_key - 2] = arguments[_key];
  }

  console.log(p3);
}