import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { colorInterpolator, valueThresholds } from "./constants.js";

export function getColorScale() {
  const colors = d3
    .quantize(colorInterpolator, valueThresholds.length + 1 + 1)
    .slice(1);
  const color = d3.scaleThreshold().domain(valueThresholds).range(colors);
  return color;
}
