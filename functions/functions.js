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
  const R = hexToRgb(value).r;
  const G = hexToRgb(value).g;
  const B = hexToRgb(value).b;

  const hsvType = rgbToHsv(R, G, B);
  const hsvAnalog1 = [(hsvType.h + 30 / 360) % 1, hsvType.s, hsvType.v];
  const hsvAnalog2 = [(hsvType.h + 330 / 360) % 1, hsvType.s, hsvType.v];

  const rgbAnalog1 = hsvToRgb(hsvAnalog1[0], hsvAnalog1[1], hsvAnalog1[2]);
  const rgbAnalog2 = hsvToRgb(hsvAnalog2[0], hsvAnalog2[1], hsvAnalog2[2]);

  const analog1 = rgbToHex(rgbAnalog1.r, rgbAnalog1.g, rgbAnalog1.b);

  const analog2 = rgbToHex(rgbAnalog2.r, rgbAnalog2.g, rgbAnalog2.b);

  return {
    analog1,
    analog2,
  };
};

export const tetradic = (value) => {
  const R = hexToRgb(value).r;
  const G = hexToRgb(value).g;
  const B = hexToRgb(value).b;

  const hsvType = rgbToHsv(R, G, B);

  const hsvtetradic1 = [(hsvType.h + 90 / 360) % 1, hsvType.s, hsvType.v];
  const hsvtetradic2 = [(hsvType.h + 180 / 360) % 1, hsvType.s, hsvType.v];
  const hsvtetradic3 = [(hsvType.h + 270 / 360) % 1, hsvType.s, hsvType.v];

  const rgbtetradic1 = hsvToRgb(
    hsvtetradic1[0],
    hsvtetradic1[1],
    hsvtetradic1[2]
  );
  const rgbtetradic2 = hsvToRgb(
    hsvtetradic2[0],
    hsvtetradic2[1],
    hsvtetradic2[2]
  );
  const rgbtetradic3 = hsvToRgb(
    hsvtetradic3[0],
    hsvtetradic3[1],
    hsvtetradic3[2]
  );

  const tetradic1 = rgbToHex(rgbtetradic1.r, rgbtetradic1.g, rgbtetradic1.b);
  const tetradic2 = rgbToHex(rgbtetradic2.r, rgbtetradic2.g, rgbtetradic2.b);
  const tetradic3 = rgbToHex(rgbtetradic3.r, rgbtetradic3.g, rgbtetradic3.b);

  return {
    tetradic1,
    tetradic2,
    tetradic3,
  };
};

const hslToRgb = (h, s, l) => {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

const rgbToHsl = (r, g, b) => {
  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
};

export const monoch = (value) => {
  const R = hexToRgb(value).r;
  const G = hexToRgb(value).g;
  const B = hexToRgb(value).b;

  const hslType = rgbToHsl(R, G, B);

  const hslmonoch1 = [hslType[0], hslType[1], (hslType[2] + 0.1) % 1];
  const hslmonoch2 = [hslType[0], hslType[1], (hslType[2] + 0.2) % 1];

  const rgbmonoch1 = hslToRgb(hslmonoch1[0], hslmonoch1[1], hslmonoch1[2]);
  const rgbmonoch2 = hslToRgb(hslmonoch2[0], hslmonoch2[1], hslmonoch2[2]);

  const monoch1 = rgbToHex(rgbmonoch1[0], rgbmonoch1[1], rgbmonoch1[2]);
  const monoch2 = rgbToHex(rgbmonoch2[0], rgbmonoch2[1], rgbmonoch2[2]);

  return {
    monoch1,
    monoch2,
  };
};
