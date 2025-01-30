import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export default function renderScaffold({ el }) {
  d3.select(el).html(/*html*/ `
    <figure class="gbm">
      <figcaption class="gbm__title"></figcaption>
      <p class="gbm__subtitle">
      
      </p>
      <div class="gbm__control"></div>
      <div class="gbm__legend"></div>
      <div class="gbm__choropleth"></div>
      <p class="gbm__footer"> </p>
      <p class="gbm__footer">
      </p>
    </figure>`);
}
