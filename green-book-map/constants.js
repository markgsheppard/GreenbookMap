import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export const years = [
  1938, 1939, 1940, 1941, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955,
  1956, 1957, 1959, 1960, 1961, 1962, 1963,
];

export const valueThresholds = [1, 2, 5, 10, 15, 20, 25, 50];

export const colorInterpolator = d3.interpolateGnBu;

export const valueFormat = new Intl.NumberFormat("en-US").format;
