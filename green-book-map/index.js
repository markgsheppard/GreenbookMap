import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { getColorScale } from "./helpers.js";
import processData from "./process-data.js";
import renderScaffold from "./render-scaffold.js";
import renderScrubber from "./render-scrubber.js";
import { valueFormat, years } from "./constants.js";
import renderColorLegend from "./render-color-legend.js";
import Choropleth from "./choropleth.js";

export default function renderGreenBookMap(el) {
  let yearIndex = years.length - 1;

  const { stateFeatureCollection, countyFeatureCollection } = processData();

  const color = getColorScale();

  const container = d3.select(el);

  renderScaffold({ el });

  renderColorLegend({
    el: container.select(".gbm__legend").node(),
    color,
    title: "Number of Green Book Locations",
    tickFormat: valueFormat,
  });

  const choropleth = new Choropleth({
    el: container.select(".gbm__choropleth").node(),
    stateFeatureCollection,
    countyFeatureCollection,
    color,
    years,
    year: years[yearIndex],
  });

  const scrubberContainer = container
    .select(".gbm__control")
    .on("input", (event) => {
      yearIndex = event.target.valueAsNumber;
      choropleth.updateYear(years[yearIndex]);
    });

  renderScrubber({
    el: scrubberContainer.node(),
    values: years,
    initial: yearIndex,
    delay: 1000,
    autoplay: false,
  });
}
