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
  const full = 0xffffff;
  const result = (full - hex).toString(16);

  if (result.length == 1) {
    return `#00000${result}`;
  }
  if (result.length == 2) {
    return `#0000${result}`;
  }
  if (result.length == 3) {
    return `#000${result}`;
  }
  if (result.length == 4) {
    return `#00${result}`;
  }
  if (result.length == 5) {
    return `#0${result}`;
  } else {
    return `#${result}`;
  }
};

export const triad = (value) => {
  const rgb = hexToRgb(value);

  const triad1 = rgbToHex(rgb.b, rgb.r, rgb.g);
  const triad2 = rgbToHex(rgb.g, rgb.b, rgb.r);
  return {
    triad1,
    triad2,
  };
};

//returns complementary color rgb value
export const compString = (value) => {
  return `(${complementaryColor(value).R},${complementaryColor(value).G},${
    complementaryColor(value).B
  })`;
};

const rgbToHsv = (r, g, b) => {
  if (arguments.length === 1) {
    (g = r.g), (b = r.b), (r = r.r);
  }
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    d = max - min,
    h,
    s = max === 0 ? 0 : d / max,
    v = max / 255;

  switch (max) {
    case min:
      h = 0;
      break;
    case r:
      h = g - b + d * (g < b ? 6 : 0);
      h /= 6 * d;
      break;
    case g:
      h = b - r + d * 2;
      h /= 6 * d;
      break;
    case b:
      h = r - g + d * 4;
      h /= 6 * d;
      break;
  }

  return {
    h: h,
    s: s,
    v: v,
  };
};

const hsvToRgb = (h, s, v) => {
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
    (s = h.s), (v = h.v), (h = h.h);
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};

export const analogous = (value) => {
  console.log(hexToRgb(value).r + " overflow");
  const R = hexToRgb(value).r;
  const G = hexToRgb(value).g;
  const B = hexToRgb(value).b;

  const hsvType = rgbToHsv(R, G, B);
  console.log(hsvType.h, hsvType.s, hsvType.v + " hsvTyle");
  const hsvAnalog1 = [hsvType.h + 30 / 360, hsvType.s, hsvType.v];
  const hsvAnalog2 = [
    hsvType.h >= 0.0835 ? hsvType.h - 30 / 360 : 1 + (hsvType.h - 30 / 360),
    hsvType.s,
    hsvType.v,
  ];
  console.log(hsvAnalog2[0] + " hsvAno 1");
  const rgbAnalog1 = hsvToRgb(hsvAnalog1[0], hsvAnalog1[1], hsvAnalog1[2]);
  const rgbAnalog2 = hsvToRgb(hsvAnalog2[0], hsvAnalog2[1], hsvAnalog2[2]);
  console.log(rgbAnalog2.r + " rgbAno 1");

  const analog1 = rgbToHex(rgbAnalog1.r, rgbAnalog1.g, rgbAnalog1.b);

  const analog2 = rgbToHex(rgbAnalog2.r, rgbAnalog2.g, rgbAnalog2.b);
  console.log(analog2 + " analog1");
  return {
    analog1,
    analog2,
  };
};
