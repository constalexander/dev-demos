const colors = {
  BL: " Blue",
  OR: " Orange",
  YE: "Yellow",
  PI: "Pink",
};

restParam(1, 2, 3, 4, 5);

function restParam(p1, p2, ...p3) {
  console.log(p1);
  console.log(p2);
  console.log(p3);
}
