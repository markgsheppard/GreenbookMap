import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export default function renderScaffold({ el }) {
  d3.select(el).html(/*html*/ `
    <figure class="gbm">
      <figcaption class="gbm__title"> The Green Book Map </figcaption>
      <p class="gbm__subtitle">
        Spatial data to document racial disparities across the United States
        from the Jim Crow Era
      </p>
      <div class="gbm__control"></div>
      <div class="gbm__legend"></div>
      <div class="gbm__choropleth"></div>
      <p class="gbm__footer"> Map: Bryson Berry & Mark G. Sheppard </p>
      <p class="gbm__footer">
        Source: The Green Book Project at The Ohio State University
      </p>
    </figure>`);
}
