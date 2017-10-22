"use strict";

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

let grass = {
  "max_height": 40,
  "height_var": 33,
  "angle": -5,
  "colors": ['#1f7a1f', '#29a329', '#33cc33', '#5cd65c', '#85e085']
};

// Calculate canvas size
canvas.width = document.documentElement.clientWidth * 0.79;
canvas.height = document.documentElement.clientHeight;

const grassMaxHeightSlider = document.getElementById('grassMaxHeight');
const grassMaxHeightDisp = document.getElementById('grassMaxHeightValue');
grassMaxHeightSlider.min = 1;
grassMaxHeightSlider.max = canvas.height;
grassMaxHeightSlider.defaultValue = 40;
grassMaxHeightDisp.innerHTML = grassMaxHeightSlider.value;
const grassHeightVarSlider = document.getElementById('grassHeightVar');
const grassHeightVarDisp = document.getElementById('grassHeightVarValue');
grassHeightVarSlider.min = 0;
grassHeightVarSlider.max = 40;
grassHeightVarSlider.defaultValue = 33;
grassHeightVarDisp.innerHTML = grassHeightVarSlider.value;
const grassAngleSlider = document.getElementById('grassAngle');
const grassAngleDisp = document.getElementById('grassAngleValue');
grassAngleSlider.min = 0;
grassAngleSlider.max = 45;
grassAngleSlider.defaultValue = 5;
grassAngleDisp.innerHTML = grassAngleSlider.value;
const resetButton = document.getElementById('formReset');

grassMaxHeightSlider.addEventListener('mouseup', setGrassMaxHeight);
grassHeightVarSlider.addEventListener('mouseup', setGrassHeightVar);
grassAngleSlider.addEventListener('mouseup', setGrassAngle);
resetButton.addEventListener('onclick', drawGrass);

// Draw Grass
drawGrass();

// Functions
function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setGrassMaxHeight() {
  grass.max_height = parseInt(grassMaxHeightSlider.value);
  grassMaxHeightDisp.innerHTML = grassMaxHeightSlider.value;
  if (parseInt(grassHeightVarSlider.value) > parseInt(grassMaxHeightSlider.value)) {
    grassHeightVarSlider.value = grassMaxHeightSlider.value;
    setGrassHeightVar();
  }
  grassHeightVarSlider.max = grassMaxHeightSlider.value;
  drawGrass();
}

function setGrassHeightVar() {
  grass.height_var = parseInt(grassHeightVarSlider.value);
  grassHeightVarDisp.innerHTML = grassHeightVarSlider.value;
  drawGrass();
}

function setGrassAngle() {
  grass.angle = parseInt(grassAngleSlider.value);
  grassAngleDisp.innerHTML = grassAngleSlider.value;
  drawGrass()
}

function drawGrass() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < canvas.width; i++) {
    ctx.beginPath();
    ctx.moveTo(i, canvas.height);
    ctx.lineTo(getRandInt(i - grass.angle, i + grass.angle), getRandInt(canvas.height - grass.max_height, canvas.height - (grass.max_height - grass.height_var)));
    ctx.strokeStyle = grass.colors[getRandInt(0, grass.colors.length - 1)];
    ctx.stroke();
    ctx.closePath();
  }
}

function drawTrunk(height, base_width, end_width, branch_lev, position = (canvas.width / 2)) {
  ctx.beginPath();
  ctx.moveTo(position - (base_width / 2), canvas.height);
  ctx.lineTo(position - (end_width / 2), canvas.height - height);
  ctx.lineTo(position + (end_width / 2), canvas.height - height);
  ctx.lineTo(position + (base_width / 2), canvas.height);
  ctx.fillStyle = '#3B2112';
  ctx.fill();
  ctx.closePath();
  drawBranch({
    x: position,
    y: canvas.height - height
  }, height / 2, end_width, ((end_width * end_width) / base_width), 45, branch_lev);
}

function drawBranch(start, length, base_width, end_width, angle, branch_lev) {
  if (branch_lev > 0) {
    const x_dif = length * Math.cos(angle / 180 * Math.PI);
    const y_dif = length * Math.sin(angle / 180 * Math.PI);
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(start.x + x_dif, start.y - y_dif);
    ctx.strokeStyle = '#3B2112';
    ctx.stroke();
    ctx.closePath();
    if ((branch_lev - 1) > 0) {
      drawBranch({
        x: start.x + x_dif,
        y: start.y - y_dif
      }, length / 2, end_width, ((end_width * end_width) / base_width), angle, branch_lev - 1);
    }
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(start.x - x_dif, start.y - y_dif);
    ctx.strokeStyle = '#3B2112';
    ctx.stroke();
    if ((branch_lev - 1) > 0) {
      drawBranch({
        x: start.x - x_dif,
        y: start.y - y_dif
      }, length / 2, end_width, ((end_width * end_width) / base_width), angle, branch_lev - 1);
    }

  }
}

drawTrunk(350, 40, 25, 7);