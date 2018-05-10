"use strict";

// TODO
// add ability to save any particular tree
   // (draw functions would have to create an object or array of numbers generated)
   // (saved array of numbers would have to be drawn with different function that didn't introduce randomness)

const canvas = document.getElementById('mainCanvas');
const c = canvas.getContext('2d');

let tree = {
  "height": 300,
  "width": 80,
  "taper": 28,
  "branch_lev": 13,
  "branch_angle_var": 10,
  "branch_length_var": 5,
};

let grass = {
  "max_height": 40,
  "height_var": 33,
  "angle": 5,
  "colors": ['#1f7a1f', '#29a329', '#33cc33', '#5cd65c', '#85e085'],
};

// Calculate canvas size
canvas.width = window.innerWidth * 0.79;
canvas.height = window.innerHeight;

// Tree controls
const treeTrunkHeightSlider = document.getElementById('treeTrunkHeight');
const treeTrunkHeightDisp = document.getElementById('treeTrunkHeightValue');
treeTrunkHeightSlider.min = 1;
treeTrunkHeightSlider.max = canvas.height;
treeTrunkHeightSlider.defaultValue = tree.height;
treeTrunkHeightDisp.innerHTML = treeTrunkHeightSlider.value;
const treeTrunkWidthSlider = document.getElementById('treeTrunkWidth');
const treeTrunkWidthDisp = document.getElementById('treeTrunkWidthValue');
treeTrunkWidthSlider.min = 2;
treeTrunkWidthSlider.max = 150;
treeTrunkWidthSlider.defaultValue = tree.width;
treeTrunkWidthDisp.innerHTML = treeTrunkWidthSlider.value;
const treeTaperSlider = document.getElementById('treeTaper');
const treeTaperDisp = document.getElementById('treeTaperValue');
treeTaperSlider.min = 1;
treeTaperSlider.max = tree.width - 1;
treeTaperSlider.defaultValue = tree.taper;
treeTaperDisp.innerHTML = treeTaperSlider.value;
const treeNumBranchSlider = document.getElementById('treeNumBranch');
const treeNumBranchDisp = document.getElementById('treeNumBranchValue');
treeNumBranchSlider.min = 0;
treeNumBranchSlider.max = 16;
treeNumBranchSlider.defaultValue = tree.branch_lev;
treeNumBranchDisp.innerHTML = treeNumBranchSlider.value;
const treeBranchAngleVarSlider = document.getElementById('treeBranchAngleVariation');
const treeBranchAngleVarDisp = document.getElementById('treeBranchAngleVariationValue');
treeBranchAngleVarSlider.min = 0;
treeBranchAngleVarSlider.max = 35;
treeBranchAngleVarSlider.defaultValue = tree.branch_angle_var;
treeBranchAngleVarDisp.innerHTML = treeBranchAngleVarSlider.value;
const treeBranchLengthVarSlider = document.getElementById('treeBranchLengthVariation');
const treeBranchLengthVarDisp = document.getElementById('treeBranchLengthVariationValue');
treeBranchLengthVarSlider.min = 0;
treeBranchLengthVarSlider.max = 25;
treeBranchLengthVarSlider.defaultValue = tree.branch_length_var;
treeBranchLengthVarDisp.innerHTML = treeBranchLengthVarSlider.value;

// Tree listeners
treeTrunkHeightSlider.addEventListener('change', setTreeTrunkHeight);
treeTrunkWidthSlider.addEventListener('change', setTreeTrunkWidth);
treeNumBranchSlider.addEventListener('change', setTreeNumBranch);
treeTaperSlider.addEventListener('change', setTreeTaper);
treeBranchAngleVarSlider.addEventListener('change', setTreeBranchAngleVariation);
treeBranchLengthVarSlider.addEventListener('change', setTreeBranchLengthVariation);

// Grass controls
const grassMaxHeightSlider = document.getElementById('grassMaxHeight');
const grassMaxHeightDisp = document.getElementById('grassMaxHeightValue');
grassMaxHeightSlider.min = 1;
grassMaxHeightSlider.max = canvas.height;
grassMaxHeightSlider.defaultValue = grass.max_height;
grassMaxHeightDisp.innerHTML = grassMaxHeightSlider.value;
const grassHeightVarSlider = document.getElementById('grassHeightVar');
const grassHeightVarDisp = document.getElementById('grassHeightVarValue');
grassHeightVarSlider.min = 0;
grassHeightVarSlider.max = 40;
grassHeightVarSlider.defaultValue = grass.height_var;
grassHeightVarDisp.innerHTML = grassHeightVarSlider.value;
const grassAngleSlider = document.getElementById('grassAngle');
const grassAngleDisp = document.getElementById('grassAngleValue');
grassAngleSlider.min = 0;
grassAngleSlider.max = 45;
grassAngleSlider.defaultValue = grass.angle;
grassAngleDisp.innerHTML = grassAngleSlider.value;

// Grass listeners
grassMaxHeightSlider.addEventListener('change', setGrassMaxHeight);
grassHeightVarSlider.addEventListener('change', setGrassHeightVar);
grassAngleSlider.addEventListener('change', setGrassAngle);

drawScene(tree, grass);

// Functions
function drawScene(tree, grass) {
  c.clearRect(0, 0, canvas.width, canvas.height);
  drawTree(tree);
  drawGrass(calcGrass(grass, canvas.height, canvas.width));
}

function drawButtonPressed() {
  console.log("draw");
  drawScene(tree, grass);
}

function setTreeTrunkHeight() {
  tree.height = parseInt(treeTrunkHeightSlider.value);
  treeTrunkHeightDisp.innerHTML = treeTrunkHeightSlider.value;
  drawScene(tree, grass);
}

function setTreeTrunkWidth() {
  tree.width = parseInt(treeTrunkWidthSlider.value);
  treeTrunkWidthDisp.innerHTML = treeTrunkWidthSlider.value;
  treeTaperSlider.max = treeTrunkWidthSlider.value - 1;
  if (tree.taper >= tree.width - 1) {
    treeTaperSlider.value = treeTaperSlider.max;
    treeTaperDisp.innerText = treeTaperSlider.value;
    tree.taper = treeTaperSlider.max;
  }
  drawScene(tree, grass);
}

function setTreeNumBranch() {
  tree.branch_lev = parseInt(treeNumBranchSlider.value);
  treeNumBranchDisp.innerHTML = treeNumBranchSlider.value;
  drawScene(tree, grass);
}

function setTreeTaper() {
  tree.taper = parseInt(treeTaperSlider.value);
  if (tree.taper > tree.width - 1) {
    tree.taper = tree.width - 1;
    treeTaperSlider.max = tree.taper;
    treeTaperSlider.value = tree.taper;
  }
  treeTaperDisp.innerHTML = treeTaperSlider.value;
  drawScene(tree, grass);
}

function setTreeBranchAngleVariation() {
  tree.branch_angle_var = parseInt(treeBranchAngleVarSlider.value);
  treeBranchAngleVarDisp.innerHTML = treeBranchAngleVarSlider.value;
  drawScene(tree, grass);
}

function setTreeBranchLengthVariation() {
  tree.branch_length_var = parseInt(treeBranchLengthVarSlider.value);
  treeBranchLengthVarDisp.innerHTML = treeBranchLengthVarSlider.value;
  drawScene(tree, grass);
}

function setGrassMaxHeight() {
  grass.max_height = parseInt(grassMaxHeightSlider.value);
  grassMaxHeightDisp.innerHTML = grassMaxHeightSlider.value;
  if (parseInt(grassHeightVarSlider.value) > parseInt(grassMaxHeightSlider.value)) {
    grassHeightVarSlider.value = grassMaxHeightSlider.value;
    setGrassHeightVar();
  }
  grassHeightVarSlider.max = grassMaxHeightSlider.value;
  drawScene(tree, grass);
}

function setGrassHeightVar() {
  grass.height_var = parseInt(grassHeightVarSlider.value);
  grassHeightVarDisp.innerHTML = grassHeightVarSlider.value;
  drawScene(tree, grass);
}

function setGrassAngle() {
  grass.angle = parseInt(grassAngleSlider.value);
  grassAngleDisp.innerHTML = grassAngleSlider.value;
  drawScene(tree, grass)
}

function drawGrass(lawn) {
  for (const blade of lawn) {
    c.beginPath();
    c.moveTo(blade.root.x, blade.root.y);
    c.lineTo(
      blade.tip.x,
      blade.tip.y
    );
    c.strokeStyle = blade.color;
    c.stroke();
    c.closePath();
  }
}

function calcGrass({angle, max_height, height_var, colors}, ground_level, lawn_width) {
  const lawn = [];
  for (let i = 0; i < lawn_width; i++) {
    const blade = {
      root: {
        x: i,
        y: ground_level,
      },
      tip: {
        x: getRandInt(i - angle, i + angle),
        y: getRandInt(ground_level - max_height, ground_level - (max_height - height_var)),
      },
      color: colors[getRandInt(0, colors.length - 1)],
    };
    lawn.push(blade);
  }
  return lawn
}

function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calcAngleRandomness(variable) {
  const posOrNeg = Math.round(Math.random()) * 2 - 1; // produces 1 or -1
  return (variable * Math.random() * 0.05) * posOrNeg;
}

function calcLengthRandomness(variable) {
  const posOrNeg = Math.round(Math.random()) * 2 - 1; // produces 1 or -1
  return (variable * Math.random() * 3) * posOrNeg;
}

function drawTree(tree_params) {
  drawTrunk(
    {
      ...tree_params,
      base_width: tree_params.width,
      end_width: tree_params.width - tree_params.taper,
    },
    (canvas.width / 2)
  );
}

function drawTrunk({height, base_width, end_width, branch_lev, branch_angle_var, branch_length_var}, position) {
  c.beginPath();
  c.moveTo(position - (base_width / 2), canvas.height);
  c.lineTo(position - (end_width / 2), canvas.height - height);
  c.lineTo(position + (end_width / 2), canvas.height - height);
  c.lineTo(position + (base_width / 2), canvas.height);
  c.fillStyle = '#3B2112';
  c.fill();
  c.closePath();
  drawBranch({
    x: position,
    y: canvas.height - height
    },
    height * 0.6 + calcLengthRandomness(branch_length_var),
    end_width,
    ((end_width * end_width) / base_width),
    (Math.PI / 4 + calcAngleRandomness(branch_angle_var)),
    branch_lev,
    branch_angle_var,
    branch_length_var
  );
  drawBranch({
    x: position,
    y: canvas.height - height
    },
    height * 0.6 + calcLengthRandomness(branch_length_var),
    end_width,
    ((end_width * end_width) / base_width),
    ((3 * Math.PI) / 4 + calcAngleRandomness(branch_angle_var)),
    branch_lev,
    branch_angle_var,
    branch_length_var
  );
}

function calcTrunk({width, height, taper}, tree_position, ground_level) {
  const half_base = width / 2;
  const half_end = (width - taper) / 2;
  return [
    {
      x: tree_position - half_base,
      y: ground_level,
    },
    {
      x: tree_position - half_end,
      y: ground_level - height,
    },
    {
      x: tree_position + half_end,
      y: ground_level - height,
    },
    {
      x: tree_position + half_base,
      y: ground_level,
    },
  ]
}

function drawBranch(start, length, base_width, end_width, angle, branch_lev, branch_angle_var, branch_length_var) {
  if (branch_lev > 0) {
    const end = {
      x: start.x + (length * Math.cos(angle)),
      y: start.y - (length * Math.sin(angle))
    };
    const half_base = (base_width / 2);
    const half_end = (end_width / 2);
    const angle90 = (Math.PI / 2);
    c.beginPath();
    c.moveTo(start.x + (half_base * Math.cos(angle + angle90)),
      start.y - (half_base * Math.sin(angle + angle90)));
    c.lineTo(end.x + (half_end * Math.cos(angle + angle90)),
      end.y - (half_end * Math.sin(angle + angle90)));
    c.lineTo(end.x + (half_end * Math.cos(angle - angle90)),
      end.y - (half_end * Math.sin(angle - angle90)));
    c.lineTo(start.x + (half_base * Math.cos(angle - angle90)),
      start.y - (half_base * Math.sin(angle - angle90)));
    c.fillStyle = '#3B2112';
    c.fill();
    c.closePath();
    if ((branch_lev - 1) > 0) {
      drawBranch(
        end,
        length * 0.6 + calcLengthRandomness(branch_length_var),
        end_width,
        ((end_width * end_width) / base_width),
        angle - (Math.PI / 4 + calcAngleRandomness(branch_angle_var)),
        branch_lev - 1,
        branch_angle_var,
        branch_length_var
      );
      drawBranch(
        end,
        length * 0.6 + calcLengthRandomness(branch_length_var),
        end_width,
        ((end_width * end_width) / base_width),
        angle + (Math.PI / 4 + calcAngleRandomness(branch_angle_var)),
        branch_lev - 1,
        branch_angle_var,
        branch_length_var
      );
    }
  }
}