'use strict';

const INITIAL_COLOR = '#2c2c2c';
const INITIAL_CANVAS_BACKGROUND = 'white';

const canvas = document.getElementById('jsCanvas');
const CANVAS_SIZE_X = canvas.offsetWidth;
const CANVAS_SIZE_Y = canvas.offsetHeight;
canvas.width = CANVAS_SIZE_X;
canvas.height = CANVAS_SIZE_Y;
const ctx = canvas.getContext('2d');
ctx.fillStyle = INITIAL_CANVAS_BACKGROUND;
ctx.fillRect(0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');

let painting = false;
let filling = false;

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(event) {
  painting = true;
}

function onMouseUp(event) {
  stopPainting();
}

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const lineWidth = event.target.valueAsNumber;
  ctx.lineWidth = lineWidth;
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = 'FILL';
  } else {
    filling = true;
    mode.innerText = 'DRAW';
  }
}

function handleSaveClick(event) {
  const image = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.download = image;
  console.log(link);
}

function handleCanvasClick(event) {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);
  }
}

function handleCM(event) {
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener('click', handleColorClick)
);

if (range) {
  range.addEventListener('input', handleRangeChange);
}

if (mode) {
  mode.addEventListener('click', handleModeClick);
}

if (save) {
  save.addEventListener('click', handleSaveClick);
}
