import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export default function renderColorLegend({
  el,
  color,
  title,
  tickSize = 0,
  marginTop = 24,
  marginRight = 0,
  marginBottom = 24 + tickSize,
  marginLeft = 0,
  height = marginTop + marginBottom + 16,
  tickFormat,
  tickValues,
}) {
  let width;

  const thresholds = color.thresholds
    ? color.thresholds() // scaleQuantize
    : color.quantiles
    ? color.quantiles() // scaleQuantile
    : color.domain(); // scaleThreshold
  tickValues = d3.range(thresholds.length);
  const thresholdFormat = tickFormat ? tickFormat : (d) => d;
  tickFormat = (i) => thresholdFormat(thresholds[i], i);

  const x = d3.scaleLinear().domain([-1, color.range().length - 1]);

  const container = d3.select(el).append("div").attr("class", "color-legend");

  const svg = container.append("svg").attr("height", height);

  svg
    .append("text")
    .attr("class", "color-legend__title")
    .attr("y", marginTop - 8)
    .text(title);

  const rect = svg
    .append("g")
    .selectChildren("rect")
    .data(color.range())
    .join("rect")
    .attr("class", "color-legend__swatch")
    .attr("y", marginTop)
    .attr("height", height - marginTop - marginBottom)
    .attr("fill", (d) => d);

  const axisG = svg
    .append("g")
    .attr("class", "color-legend__axis")
    .attr("transform", `translate(0,${height - marginBottom})`);

  new ResizeObserver(resize).observe(container.node());

  function resize() {
    width = container.node().clientWidth;

    x.rangeRound([marginLeft, width - marginRight]);

    svg.attr("width", width).attr("viewBox", [0, 0, width, height]);

    rect.attr("x", (d, i) => x(i - 1)).attr("width", (d, i) => x(i) - x(i - 1));

    let xAcc = -9999;
    const minTickLabelGap = 48;

    axisG
      .call(
        d3
          .axisBottom(x)
          .tickFormat(tickFormat)
          .tickSize(tickSize)
          .tickValues(tickValues)
          .tickPadding(8)
      )
      .attr("font-family", undefined)
      .call((g) =>
        g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height)
      )
      .call((g) =>
        g.selectAll(".tick text").attr("display", (d) => {
          const xCurr = x(d);
          const hidden = xCurr - xAcc < minTickLabelGap;
          xAcc = hidden ? xAcc : xCurr;
          return hidden ? "none" : null;
        })
      )
      .call((g) => g.select(".domain").remove());
  }
}
