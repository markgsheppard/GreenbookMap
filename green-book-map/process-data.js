import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import * as topojson from "https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/+esm";
import us from "./counties-albers-10m.js";
import data from "./data.js";
import { years } from "./constants.js";

export default function processData() {
  const stateFeatureCollection = topojson.feature(us, us.objects.states);
  const countyFeatureCollection = topojson.feature(us, us.objects.counties);

  const dataById = d3.index(data, (d) => d.fips.toString());
  const stateNameById = new Map(
    stateFeatureCollection.features.map((d) => [d.id, d.properties.name])
  );

  countyFeatureCollection.features.forEach((feature) => {
    const values = years.map((year) => [year, 0]);
    const countyData = dataById.get(feature.id);
    if (countyData) {
      values.forEach((d) => (d[1] = countyData[`Y${d[0]}`]));
    }
    feature.properties.values = new Map(values);
    feature.properties.countyCode = feature.id;
    feature.properties.stateCode = feature.id.slice(0, 2);
    feature.properties.name = `${
      feature.properties.name
    } County, ${stateNameById.get(feature.properties.stateCode)}`;
  });

  return {
    stateFeatureCollection,
    countyFeatureCollection,
  };
}
