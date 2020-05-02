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

const componentToHex = (c) => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

export const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

export const rgbString = (value) => {
  return `(${hexToRgb(value).r},${hexToRgb(value).g},${hexToRgb(value).b})`;
};

export const complementaryColor = (value) => {
  const hex = hexToRgb(value);
  const R = 255 - hex.r;
  const G = 255 - hex.g;
  const B = 255 - hex.b;
  return "#" + componentToHex(R) + componentToHex(B) + componentToHex(G);
};

export const compString = (value) => {
  return `(${complementaryColor(value).R},${complementaryColor(value).G},${
    complementaryColor(value).B
  })`;
};
