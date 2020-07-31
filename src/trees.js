import calcTree from './lib/calculate-tree'
import calcGrass from './lib/calculate-grass';

/* TODO (possibly)
    add ability to save any particular tree
      as a image file
      as a JSON file
      download and upload tree files?
    improve user experience/performance
      async calc and drawing
      wait symbol while calculating?
    bark texture?
    leaf shape/size variations?
    different growth patterns
    use CSS grid for layout?
    add zoom functionality?
*/

// Set up canvas context
const canvas = document.getElementById('mainCanvas');
const c = canvas.getContext('2d');
// calculate canvas size
canvas.width = window.innerWidth * 0.79;
canvas.height = window.innerHeight;

(function () {

  let defaults = {
    trunk_height_min: 1,
    trunk_height: 300,
    trunk_height_max: canvas.height / 1.5,
    trunk_width_min: 2,
    trunk_width: 80,
    trunk_width_max: 150,
    branchings_min: 0,
    branch_lev: 13,
    branchings_max: 13,
    taper_min: 1,
    taper: 28,
    taper_max: 79,
    branch_angle_var_min: 0,
    branch_angle_var: 10,
    branch_angle_var_max: 33,
    branch_len_var_min: 0,
    branch_len_var: 5,
    branch_len_var_max: 25,
    grass_height_min: 1,
    grass_height: 40,
    grass_height_max: canvas.height / 4,
    grass_height_var_min: 0,
    grass_height_var: 33,
    grass_height_var_max: 40,
    grass_angle_var_min: 0,
    grass_angle_var: 5,
    grass_angle_var_max: 45,
    greens: ['#1f7a1f', '#29a329', '#33cc33', '#5cd65c', '#85e085'],
  };


  /***********
  * Controls *
  ***********/

  // General Controls
  const drawButton = document.getElementById('drawButton');
  const resetButton = document.getElementById('resetButton');

  // Tree controls
  const treeControlForm = document.getElementById('treeControlForm');
  // trunk height (also affects base branch length)
  const treeTrunkHeightSlider = document.getElementById('treeTrunkHeight');
  const treeTrunkHeightDisp = document.getElementById('treeTrunkHeightValue');
  treeTrunkHeightSlider.min = defaults.trunk_height_min;
  treeTrunkHeightSlider.max = defaults.trunk_height_max;
  treeTrunkHeightSlider.defaultValue = defaults.trunk_height;
  // trunk width (also affects branch width)
  const treeTrunkWidthSlider = document.getElementById('treeTrunkWidth');
  const treeTrunkWidthDisp = document.getElementById('treeTrunkWidthValue');
  treeTrunkWidthSlider.min = defaults.trunk_width_min;
  treeTrunkWidthSlider.max = defaults.trunk_width_max;
  treeTrunkWidthSlider.defaultValue = defaults.trunk_width;
  // number of branchings (13 is about all the weak VM this will run on can handle)
  // TODO improve performance so there can be more branchings
  //   at least make `drawScene()` async so we don't block
  const treeNumBranchSlider = document.getElementById('treeNumBranch');
  const treeNumBranchDisp = document.getElementById('treeNumBranchValue');
  treeNumBranchSlider.min = defaults.branchings_min;
  treeNumBranchSlider.max = defaults.branchings_max;
  treeNumBranchSlider.defaultValue = defaults.branch_lev;
  // how much the trunk and branches taper
  const treeTaperSlider = document.getElementById('treeTaper');
  const treeTaperDisp = document.getElementById('treeTaperValue');
  treeTaperSlider.min = defaults.taper_min;
  treeTaperSlider.max = defaults.taper_max;
  treeTaperSlider.defaultValue = defaults.taper;
  // how much the angle of the branches can vary
  const treeBranchAngleVarSlider = document.getElementById('treeBranchAngleVariation');
  const treeBranchAngleVarDisp = document.getElementById('treeBranchAngleVariationValue');
  treeBranchAngleVarSlider.min = defaults.branch_angle_var_min;
  treeBranchAngleVarSlider.max = defaults.branch_angle_var_max;
  treeBranchAngleVarSlider.defaultValue = defaults.branch_angle_var;
  // how much the branch length can vary
  const treeBranchLengthVarSlider = document.getElementById('treeBranchLengthVariation');
  const treeBranchLengthVarDisp = document.getElementById('treeBranchLengthVariationValue');
  treeBranchLengthVarSlider.min = defaults.branch_len_var_min;
  treeBranchLengthVarSlider.max = defaults.branch_angle_var_max;
  treeBranchLengthVarSlider.defaultValue = defaults.branch_len_var;

  // Grass controls
  const grassControlForm = document.getElementById('grassControlForm');
  // maximum height
  const grassMaxHeightSlider = document.getElementById('grassMaxHeight');
  const grassMaxHeightDisp = document.getElementById('grassMaxHeightValue');
  grassMaxHeightSlider.min = defaults.grass_height_min;
  grassMaxHeightSlider.max = defaults.grass_height_max;
  grassMaxHeightSlider.defaultValue = defaults.grass_height;
  // height variation
  const grassHeightVarSlider = document.getElementById('grassHeightVar');
  const grassHeightVarDisp = document.getElementById('grassHeightVarValue');
  grassHeightVarSlider.min = defaults.grass_height_var_min;
  grassHeightVarSlider.max = defaults.grass_height_var_max;
  grassHeightVarSlider.defaultValue = defaults.grass_height_var;
  // angle variation
  const grassAngleSlider = document.getElementById('grassAngle');
  const grassAngleDisp = document.getElementById('grassAngleValue');
  grassAngleSlider.min = defaults.grass_angle_var_min;
  grassAngleSlider.max = defaults.grass_angle_var_max;
  grassAngleSlider.defaultValue = defaults.grass_angle_var;


  /******************
  * Event Listeners *
  ******************/

  // Tree listeners
  treeTrunkHeightSlider.addEventListener('input', displayTrunkHeight);
  treeTrunkHeightSlider.addEventListener('change', setTreeTrunkHeight);
  treeTrunkWidthSlider.addEventListener('input', displayTrunkWidth);
  treeTrunkWidthSlider.addEventListener('change', setTreeTrunkWidth);
  treeNumBranchSlider.addEventListener('input', displayNumBranchings);
  treeNumBranchSlider.addEventListener('change', setNumBranchings);
  treeTaperSlider.addEventListener('input', displayTaper);
  treeTaperSlider.addEventListener('change', setTreeTaper);
  treeBranchAngleVarSlider.addEventListener('input', displayBranchAngleVar);
  treeBranchAngleVarSlider.addEventListener('change', setBranchAngleVar);
  treeBranchLengthVarSlider.addEventListener('input', displayBranchLengthVar);
  treeBranchLengthVarSlider.addEventListener('change', setBranchLengthVar);
  drawButton.addEventListener('click', drawButtonPressed);
  resetButton.addEventListener('click', resetControls);

  // Grass listeners
  grassMaxHeightSlider.addEventListener('input', displayGrassMaxHeight);
  grassMaxHeightSlider.addEventListener('change', setGrassMaxHeight);
  grassHeightVarSlider.addEventListener('input', displayGrassHeightVar);
  grassHeightVarSlider.addEventListener('change', setGrassHeightVar);
  grassAngleSlider.addEventListener('input', displayGrassAngleVar);
  grassAngleSlider.addEventListener('change', setGrassAngleVar);


  /*****************
  * Initialization *
  *****************/

  let tree = {
    position: {
      x: canvas.width / 2,
      y: canvas.height,
    },
    length: defaults.trunk_height,
    width: defaults.trunk_width,
    taper: defaults.taper,
    branch_lev: defaults.branch_lev,
    angle_var: defaults.branch_angle_var,
    length_var: defaults.branch_len_var,
    leaf_colors: defaults.greens,
  };

  let grass = {
    max_height: defaults.grass_height,
    height_var: defaults.grass_height_var,
    angle: defaults.grass_angle_var,
    colors: defaults.greens,
  };

  resetControls();
  drawScene();


  /************
  * Functions *
  ************/

  function resetControls() {
    applyDefaults();
    treeControlForm.reset();
    grassControlForm.reset();
    displayTrunkHeight();
    displayTrunkWidth();
    displayNumBranchings();
    displayTaper();
    displayBranchAngleVar();
    displayBranchLengthVar();
    displayGrassMaxHeight();
    displayGrassHeightVar();
    displayGrassAngleVar()
    drawButtonPressed();
  }

  function applyDefaults() {
    tree.length = defaults.trunk_height;
    tree.width = defaults.trunk_width;
    tree.taper = defaults.taper;
    tree.branch_lev = defaults.branch_lev;
    tree.angle_var = defaults.branch_angle_var;
    tree.length_var = defaults.branch_len_var;
    grass.max_height = defaults.grass_height;
    grass.height_var = defaults.grass_height_var;
    grass.angle = defaults.grass_angle_var;
  }

  function displayTrunkHeight() {
    treeTrunkHeightDisp.innerHTML = treeTrunkHeightSlider.value;
  }

  function displayTrunkWidth() {
    treeTrunkWidthDisp.innerHTML = treeTrunkWidthSlider.value;
  }

  function displayNumBranchings() {
    treeNumBranchDisp.innerHTML = treeNumBranchSlider.value;
  }

  function displayTaper() {
    treeTaperDisp.innerHTML = treeTaperSlider.value;
  }

  function displayBranchAngleVar() {
    treeBranchAngleVarDisp.innerHTML = treeBranchAngleVarSlider.value;
  }

  function displayBranchLengthVar() {
    treeBranchLengthVarDisp.innerHTML = treeBranchLengthVarSlider.value;
  }

  function displayGrassMaxHeight() {
    grassMaxHeightDisp.innerHTML = grassMaxHeightSlider.value;
  }

  function displayGrassHeightVar() {
    grassHeightVarDisp.innerHTML = grassHeightVarSlider.value;
  }

  function displayGrassAngleVar() {
    grassAngleDisp.innerHTML = grassAngleSlider.value;
  }

  function drawScene() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawTree(calcTree(tree));
    drawGrass(calcGrass(grass, canvas.height, canvas.width));
  }

  function drawButtonPressed() {
    drawScene(tree, grass);
  }

  function setTreeTrunkHeight() {
    tree.length = parseInt(treeTrunkHeightSlider.value);
    drawScene();
  }

  function setTreeTrunkWidth() {
    tree.width = parseInt(treeTrunkWidthSlider.value);
    treeTaperSlider.max = treeTrunkWidthSlider.value - 1;
    if (tree.taper >= tree.width - 1) {
      treeTaperSlider.value = treeTaperSlider.max;
      treeTaperDisp.innerText = treeTaperSlider.value;
      tree.taper = treeTaperSlider.max;
    }
    drawScene();
  }

  function setNumBranchings() {
    tree.branch_lev = parseInt(treeNumBranchSlider.value);
    drawScene();
  }

  function setTreeTaper() {
    tree.taper = parseInt(treeTaperSlider.value);
    if (tree.taper > tree.width - 1) {
      tree.taper = tree.width - 1;
      treeTaperSlider.max = tree.taper;
      treeTaperSlider.value = tree.taper;
    }
    drawScene();
  }

  function setBranchAngleVar() {
    tree.angle_var = parseInt(treeBranchAngleVarSlider.value);
    drawScene(tree, grass);
  }
  function setBranchLengthVar() {
    tree.length_var = parseInt(treeBranchLengthVarSlider.value);
    drawScene();
  }

  function setGrassMaxHeight() {
    grass.max_height = parseInt(grassMaxHeightSlider.value);
    if (parseInt(grassHeightVarSlider.value) > parseInt(grassMaxHeightSlider.value)) {
      grassHeightVarSlider.value = grassMaxHeightSlider.value;
      setGrassHeightVar();
    }
    grassHeightVarSlider.max = grassMaxHeightSlider.value;
    drawScene();
  }

  function setGrassHeightVar() {
    grass.height_var = parseInt(grassHeightVarSlider.value);
    drawScene();
  }

  function setGrassAngleVar() {
    grass.angle = parseInt(grassAngleSlider.value);
    drawScene()
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

  function drawTree(tree_data) {
    const coords = [tree_data.trunk].concat(tree_data.branches);
    coords.forEach(set_of_coords => {
      drawTrunkOrBranch(set_of_coords);
    });
    tree_data.leaves.forEach(leaf => {
      drawLeaf(leaf);
    })
  }

  function drawTrunkOrBranch(coord_arr) {
    const t_or_b = coord_arr;
    c.beginPath();
    c.moveTo(t_or_b[0].x, t_or_b[0].y);
    for (let i = 1; i < t_or_b.length; i++) {
      c.lineTo(t_or_b[i].x, t_or_b[i].y);
    }
    c.fillStyle = '#3B2112';
    c.fill();
    c.closePath();
  }

  function drawLeaf(petiole) {
    c.beginPath();
    c.moveTo(petiole.x, petiole.y);
    c.arc(petiole.x, petiole.y, 5, 0, 2 * Math.PI, false);
    c.fillStyle = petiole.color;
    c.fill();
    c.closePath();
  }
})();