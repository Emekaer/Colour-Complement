//Converts hex string to RGB Object
const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

//converts RGB to hex components
const componentToHex = (c) => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

//Converts RGB to hex String
export const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

//Converts RGB Object to RGB string
export const rgbString = (value) => {
  return `(${hexToRgb(value).r},${hexToRgb(value).g},${hexToRgb(value).b})`;
};

//Returns complementary hex color string
export const complementaryColor = (value) => {
  const hex = parseInt(value.replace(/^#/, ""), 16);
  console.log(hex);
  const full = 0xffffff;
  console.log(full);
  const result = (full - hex).toString(16);
  console.log(result);

  if (result.length == 1) {
    console.log("try1");
    return `#00000${result}`;
  } 
  if (result.length == 2 ) {
    console.log("try2");
    return `#0000${result}`;
  }  if (result.length == 3) {
    console.log("try3");
    return `#000${result}`;
  }  if (result.length == 4) {
    console.log("try4");
    return `#00${result}`;
  }  if (result.length == 5) {
    console.log("try5");
    return `#0${result}`;
  } else {
    return `#${result}`;
  }
};

//returns complementary color rgb value
export const compString = (value) => {
  return `(${complementaryColor(value).R},${complementaryColor(value).G},${
    complementaryColor(value).B
  })`;
};
