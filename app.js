'use strict';

const INITIAL_COLOR = '#2c2c2c';
const INITIAL_CANVAS_BACKGROUND = 'white';

const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const CANVAS_SIZE_X = 500;
const CANVAS_SIZE_Y = 500;
canvas.width = CANVAS_SIZE_X;
canvas.height = CANVAS_SIZE_Y;
ctx.fillStyle = INITIAL_CANVAS_BACKGROUND;
ctx.fillRect(0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = INITIAL_COLOR;

const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

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
    console.log(x, y);
  }
}

function onMouseDown(event) {
  startPainting();
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
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'paintJS[EXPORT]';
  link.click();
}

function handleCanvasClick(event) {
  if (filling === true) {
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

if (saveBtn) {
  saveBtn.addEventListener('click', handleSaveClick);
}
