var canvas = document.getElementById('mainCanvas');
var ctx = canvas.getContext('2d');

var grass = {
  "max_height": 40,
  "height_var": 33,
  "angle": -5,
  "colors": ['#1f7a1f', '#29a329', '#33cc33', '#5cd65c', '#85e085']
};

// Calculate canvas size
canvas.width = document.documentElement.clientWidth * 0.79;
canvas.height = document.documentElement.clientHeight;

var grassMaxHeightSlider = document.getElementById('grassMaxHeight');
var grassMaxHeightDisp = document.getElementById('grassMaxHeightValue');
  grassMaxHeightSlider.min = 1;
  grassMaxHeightSlider.max = canvas.height;
  grassMaxHeightSlider.defaultValue = 40;
  grassMaxHeightDisp.innerHTML = grassMaxHeightSlider.value;
var grassHeightVarSlider = document.getElementById('grassHeightVar');
var grassHeightVarDisp = document.getElementById('grassHeightVarValue');
  grassHeightVarSlider.min = 0;
  grassHeightVarSlider.max = 40;
  grassHeightVarSlider.defaultValue = 33;
  grassHeightVarDisp.innerHTML = grassHeightVarSlider.value;
var grassAngleSlider = document.getElementById('grassAngle');
var grassAngleDisp = document.getElementById('grassAngleValue');
  grassAngleSlider.min = 0;
  grassAngleSlider.max = 45;
  grassAngleSlider.defaultValue = 5;
  grassAngleDisp.innerHTML = grassAngleSlider.value;
var resetButton = document.getElementById('formReset');

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
  for (var i = 0; i < canvas.width; i++) {
    ctx.beginPath();
    ctx.moveTo(i,canvas.height);
    ctx.lineTo(getRandInt(i - grass.angle, i + grass.angle), getRandInt(canvas.height - grass.max_height, canvas.height - (grass.max_height - grass.height_var)));
    ctx.strokeStyle = grass.colors[getRandInt(0, grass.colors.length - 1)];
    ctx.stroke();
    ctx.closePath();
  }
}

DrawTree(n, direction, length)

if n > 0 do

  DrawTrunk(direction, length)

  DrawTree(n-1, 3DRandomAngle(direction), length*Factor(n))

DrawTree(n-1, direction + random % 10, length*Factor(n))

DrawTree(n-1, 3DRandomAngle(direction), length*Factor(n))

else

DrawLeaf()

end if

  end DrawTree