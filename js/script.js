var canvas = document.getElementById('mainCanvas');
var ctx = canvas.getContext('2d');

var grass = {
  "max_height": 40,
  "min_height": 7,
  "angle": 5,
  "colors": ['#1f7a1f', '#29a329', '#33cc33', '#5cd65c', '#85e085']
};

function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

canvas.width = document.documentElement.clientWidth * 0.79;
canvas.height = document.documentElement.clientHeight;

// Draw Grass
for (var i = 0; i < canvas.width; i++) {
  ctx.beginPath();
  ctx.moveTo(i,canvas.height);
  ctx.lineTo(getRandInt(i - grass.angle, i + grass.angle), getRandInt(canvas.height - grass.max_height, canvas.height - grass.min_height));
  ctx.strokeStyle = grass.colors[getRandInt(0, grass.colors.length - 1)];
  ctx.stroke();
  ctx.closePath();
}
