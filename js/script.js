var canvas = document.getElementById('mainCanvas');
var ctx = canvas.getContext('2d');

var grass = {
  "max_height": 40,
  "min_height": 7,
  "angle": -5,
  "colors": ['#1f7a1f', '#29a329', '#33cc33', '#5cd65c', '#85e085']
};

var grassMinHeightSlider = document.getElementById('grassMinHeight');
  grassMinHeightSlider.min = 1;
  grassMinHeightSlider.max = 250;
  grassMinHeightSlider.defaultValue = 7;
var grassMaxHeightSlider = document.getElementById('grassMaxHeight');
  grassMaxHeightSlider.min = 1;
  grassMaxHeightSlider.max = 250;
  grassMaxHeightSlider.defaultValue = 40;
var grassAngleSlider = document.getElementById('grassAngle');
  grassAngleSlider.min = 0;
  grassAngleSlider.max = 25;
  grassAngleSlider.defaultValue = 5;
var resetButton = document.getElementById('formReset');

grassMinHeightSlider.addEventListener('mouseup', setGrassMinHeight);
grassMaxHeightSlider.addEventListener('mouseup', setGrassMaxHeight);
grassAngleSlider.addEventListener('mouseup', setGrassAngle);
resetButton.addEventListener('onclick', drawGrass);

// Calculate canvas size
canvas.width = document.documentElement.clientWidth * 0.79;
canvas.height = document.documentElement.clientHeight;

// Draw Grass
drawGrass();

// Functions
function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setGrassMinHeight() {
  grass.min_height = parseInt(grassMinHeightSlider.value);
  // console.log("Min Height = " + grassMinHeightSlider.value);
  drawGrass();
}

function setGrassMaxHeight() {
  grass.max_height = parseInt(grassMaxHeightSlider.value);
  // console.log("Max Height = " + grassMaxHeightSlider.value);
  drawGrass();
}

function setGrassAngle() {
  grass.angle = parseInt(grassAngleSlider.value);
  // console.log("Angle = " + grassAngleSlider.value);
  drawGrass()
}

function drawGrass() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < canvas.width; i++) {
    ctx.beginPath();
    ctx.moveTo(i,canvas.height);
    ctx.lineTo(getRandInt(i - grass.angle, i + grass.angle), getRandInt(canvas.height - grass.max_height, canvas.height - grass.min_height));
    ctx.strokeStyle = grass.colors[getRandInt(0, grass.colors.length - 1)];
    ctx.stroke();
    ctx.closePath();
  }
}
