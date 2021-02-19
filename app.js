'use strict';

const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2.5;

let painting = false;

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    console.log('creating path in', x, y);
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    console.log('creating line in', x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown() {
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

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
}

function init() {}

init();
