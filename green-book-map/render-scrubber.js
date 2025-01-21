import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export default function renderScrubber({
  el,
  values,
  format = (value) => value,
  initial = 0,
  delay = null,
  autoplay = true,
  loop = true,
}) {
  let frame, timer, interval;

  const iconPath = {
    play: "M8 19V5l11 7z",
    pause: "M14 19V5h4v14zm-8 0V5h4v14z",
  };

  const form = d3
    .select(el)
    .append("form")
    .attr("class", "scrubber")
    .on("submit", (event) => {
      event.preventDefault();
      if (running()) return stop();
      start();
    });

  const thumbSize = parseFloat(
    getComputedStyle(form.node()).getPropertyValue("--slider-thumb-size")
  );

  const slider = form.append("div").attr("class", "scrubber__slider");

  slider
    .append("span")
    .attr("class", "scrubber__slider__label")
    .text(values[0]);

  const container = slider
    .append("div")
    .attr("class", "scrubber__slider__container");

  const input = container
    .append("input")
    .attr("class", "scrubber__slider__input")
    .attr("type", "range")
    .attr("min", 0)
    .attr("max", values.length - 1)
    .attr("value", initial)
    .on("input", (event) => {
      if (event && event.isTrusted && running()) stop();
      const index = input.node().valueAsNumber;
      updateOutput(index);
    });

  const output = container
    .append("output")
    .attr("class", "scrubber__slider__output");
  updateOutput(initial);

  slider
    .append("span")
    .attr("class", "scrubber__slider__label")
    .text(values[values.length - 1]);

  const button = form.append("button").attr("class", "scrubber__button");

  const buttonIconPath = button
    .append("svg")
    .attr("class", "scrubber__button__icon")
    .attr("viewBox", [0, 0, 24, 24])
    .append("path")
    .attr("fill", "currentColor");

  const buttonLabel = button
    .append("span")
    .attr("class", "scrubber__button__label");

  if (autoplay) start();
  else stop();

  function start() {
    buttonIconPath.attr("d", iconPath.pause);
    buttonLabel.text("Pause");
    if (delay === null) frame = requestAnimationFrame(tick);
    else interval = setInterval(tick, delay);
  }

  function stop() {
    buttonIconPath.attr("d", iconPath.play);
    buttonLabel.text("Play");
    if (frame !== null) {
      cancelAnimationFrame(frame);
      frame = null;
    }
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    if (interval !== null) {
      clearInterval(interval);
      interval = null;
    }
  }

  function running() {
    return frame !== null || timer !== null || interval !== null;
  }

  function tick() {
    const index = input.node().valueAsNumber;
    if (index === values.length - 1) {
      if (!loop) return stop();
    }
    if (delay === null) frame = requestAnimationFrame(tick);
    step();
  }

  function step() {
    input.node().valueAsNumber =
      (input.node().valueAsNumber + 1) % values.length;
    input.dispatch("input", { bubbles: true });
  }

  function updateOutput() {
    const percentage = input.node().valueAsNumber / (values.length - 1);
    const adjustment = (0.5 - percentage) * thumbSize;
    output.node().value = format(values[input.node().valueAsNumber]);
    output.style("left", `calc(${percentage * 100}% + ${adjustment}px)`);
  }
}
