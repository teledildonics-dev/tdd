import React from "../../_snowpack/pkg/react";
import {assert, unwrap} from "../common/safety.js";
const outerHeight = 300;
const innerHeight = 2;
const outerWidth = 900;
const innerWidth = 90;
const xScale = outerWidth / innerWidth;
const yOffset = 0.5 + outerHeight / 2;
const yScale = outerHeight / innerHeight;
export const PatternDisplay = ({pattern, x, height = 100}) => {
  const y = pattern(x);
  const xOffset = 0.5 - Math.max(0, x * xScale - 25 * Math.log(x) - outerWidth / 4 + 100);
  const canvas = document.createElement("canvas");
  canvas.width = outerWidth;
  canvas.height = outerHeight;
  const g2d = unwrap(canvas.getContext("2d") || void 0);
  g2d.lineJoin = "round";
  g2d.beginPath();
  g2d.strokeStyle = "#EEE";
  g2d.lineWidth = 3;
  for (let dy = -yOffset; dy <= outerHeight; dy += 0.25 * yScale) {
    g2d.moveTo(0, outerHeight - (yOffset + dy));
    g2d.lineTo(outerWidth, outerHeight - (yOffset + dy));
  }
  g2d.stroke();
  g2d.beginPath();
  g2d.strokeStyle = "#EEE";
  g2d.lineWidth = 3;
  for (let dx = 0; dx <= outerWidth * 8; dx += 1 * xScale) {
    g2d.moveTo(xOffset + dx, outerHeight);
    g2d.lineTo(xOffset + dx, outerHeight - outerHeight);
  }
  g2d.stroke();
  g2d.beginPath();
  g2d.strokeStyle = "#AAA";
  g2d.lineWidth = 7;
  for (let dy = -yOffset; dy <= outerHeight; dy += 1 * yScale) {
    g2d.moveTo(0, outerHeight - (yOffset + dy));
    g2d.lineTo(outerWidth, outerHeight - (yOffset + dy));
  }
  g2d.stroke();
  g2d.beginPath();
  g2d.strokeStyle = "#AAA";
  g2d.lineWidth = 7;
  for (let dx = 0; dx <= outerWidth * 8; dx += 10 * xScale) {
    g2d.moveTo(xOffset + dx, 0);
    g2d.lineTo(xOffset + dx, outerHeight);
  }
  g2d.stroke();
  g2d.beginPath();
  g2d.strokeStyle = "#F88";
  g2d.lineWidth = 5;
  g2d.moveTo(xOffset + x * xScale, outerHeight);
  g2d.lineTo(xOffset + x * xScale, 0);
  g2d.moveTo(0 * xScale, outerHeight - (yOffset + y * yScale));
  g2d.lineTo(outerWidth, outerHeight - (yOffset + y * yScale));
  g2d.stroke();
  g2d.beginPath();
  g2d.strokeStyle = "#000";
  g2d.lineWidth = 3;
  g2d.moveTo(xOffset, yOffset);
  for (let x2 = 0; x2 <= outerWidth * 8; x2++) {
    const y2 = pattern(x2 / xScale) * yScale;
    g2d.lineTo(xOffset + x2, outerHeight - (yOffset + y2));
  }
  g2d.stroke();
  g2d.beginPath();
  g2d.strokeStyle = "#B00";
  g2d.lineWidth = 9;
  g2d.arc(xOffset + x * xScale, outerHeight - (yOffset + y * yScale), 20, 0, 2 * Math.PI);
  g2d.stroke();
  const url = canvas.toDataURL();
  return /* @__PURE__ */ React.createElement("img", {
    alt: "pattern graph",
    src: url,
    height
  });
};
export const clamp = (x, min = 0, max = 1) => {
  assert(min < max);
  return Math.min(max, Math.max(min, x));
};
export const sinny = (x, period = 1, magnitude = 1) => {
  return magnitude * (0.5 + 0.5 * Math.sin(x / period * 2 * Math.PI - Math.PI / 2));
};
export const compound = (a, b) => {
  return 1 - (1 - clamp(a)) * (1 - clamp(b));
};
export const compress = (a, b) => {
  return clamp(a) * clamp(b);
};
export const blend = (...numbers) => {
  let sum = 0;
  for (const n of numbers) {
    sum += n;
  }
  return sum / numbers.length;
};
export const thor = (x) => {
  x = x / 3;
  const xAccelerating = Math.pow(x - sinny(x, 10), 1.5);
  const baseline = blend(sinny(x, 10), sinny(x, 3));
  const longStrongRamp = Math.pow(clamp(x / 120), 2);
  const initialClamp = clamp(x / 15);
  return compound(longStrongRamp, compress(Math.pow(0.25 + 0.75 * sinny(x, 4), 0.5), compress(initialClamp, blend(baseline, sinny(xAccelerating, 10)))));
};
