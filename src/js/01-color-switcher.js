const refs = {
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-stop]'),
    body: document.body,
};

let timerId = null;

refs.start.addEventListener('click', bodyChangeColor);

refs.stop.addEventListener('click', bodyStopChangeColor);

function bodyChangeColor (e) {
    e.currentTarget.disabled = true;
    refs.stop.disabled = false;
    timerId = setInterval(colors, 1000);
};

function bodyStopChangeColor(e) {
    e.currentTarget.disabled = true;
    refs.start.disabled = false;
    clearInterval(timerId);
};

function colors() {
   refs.body.style.backgroundColor = getRandomHexColor();
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
