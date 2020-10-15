var state = {
  contents: [],
  index: 0,
  playing: false,
}
var controls = {
  index: null,
  buttons: {
    next: null,
    prev: null,
    toggle: null,
  },
  slider: null,
}

/////////////
// Helpers //
/////////////
// From https://stackoverflow.com/a/37623959/1931274
function onRangeChange(r, f) {
  var n, c, m;
  r.addEventListener("input", function (e) {
    n = 1; c = e.target.value; if (c != m) { f(e); }; m = c;
  });
  r.addEventListener("change", function (e) { if (!n) { f(e); }});
}

//////////////
// UI Logic //
//////////////
function setupControls() {
  controls.index = document.getElementById("index");

  controls.buttons.next = document.getElementById("next");
  controls.buttons.next.onclick = showNext;

  controls.buttons.prev = document.getElementById("prev");
  controls.buttons.prev.onclick = showPrevious;

  controls.buttons.toggle = document.getElementById("toggle");
  controls.buttons.toggle.onclick = toggle;

  controls.slider = document.getElementById("slider");
  controls.slider.setAttribute("max", state.contents.length - 1);
  onRangeChange(controls.slider, showSliderState);

}

function updateControls() {
  controls.slider.value = state.index;
  controls.index.innerHTML = state.index;

  if (state.playing) {
    controls.buttons.toggle.innerHTML = "Pause";
  } else {
    controls.buttons.toggle.innerHTML = "Play";
  }
}

//////////////////
// UI callbacks //
//////////////////
function toggle() {
  console.log("toggle");
  state.playing = !state.playing;
  showThisState();
}

function showNext() {
  console.log("next");
  state.playing = false;
  if (state.index < state.contents.length - 1) {
    state.index = state.index + 1;
  }
  showThisState();
}

function showPrevious() {
  console.log("previous");
  state.playing = false;
  if (state.index != 0) {
    state.index = state.index - 1;
  }
  showThisState();
}

function showSliderState() {
  console.log("slider");
  var value = Number(controls.slider.value);
  state.index = value;
  state.playing = false;

  showThisState();
}


function continueIfPlaying() {
  if (!state.playing) {
    return
  }
  state.index = (state.index + 1) % state.contents.length;
  if (state.index == state.contents.length - 1) {
    state.playing = false;
  }
  showThisState();
}

/////////////////
// Entry Point //
/////////////////
function main() {
  console.log("main");
  prepare();
  setupControls();

  state.index = 0;
  state.playing = false;
  showThisState();
}

document.addEventListener("DOMContentLoaded", main);
