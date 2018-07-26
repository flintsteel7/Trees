import {calcRandomness} from './utilities';

function calcTree(tree_params) {
  const this_tree = [];
  const trunk = calcTrunk({...tree_params});
  this_tree.push(trunk.coords);
  const branches = calcBranches({
    start: trunk.fork,
    parent_angle: Math.PI / 2,
    ...tree_params,
  });
  console.log(branches);
  return this_tree;
}

function calcBranches({start, width, taper, length, parent_angle, length_var, angle_var, branch_lev}) {
  const branches = [];
  const params = {
    start,
    base_width: width,
    end_width: width - taper,
  };
  branches.push(calcBranch({
    ...params,
    length: length * 0.6 + calcRandomness(length_var, 3),
    angle: parent_angle + (Math.PI / 4 + calcRandomness(angle_var, 0.05)),
  }));
  branches.push(calcBranch({
    ...params,
    length: length * 0.6 + calcRandomness(length_var, 3),
    angle: parent_angle - (Math.PI / 4 + calcRandomness(angle_var, 0.05)),
  }));
}

function calcBranch({start, base_width, end_width, length, angle}) {
  const half_base = base_width / 2;
  const half_end = end_width / 2;
  const fork = {
    x: start.x + (length * Math.cos(angle)),
    y: start.y - (length * Math.sin(angle)),
  };
  // TODO calculate coordinates
  const coords = [];
  return {fork, coords}
}

function calcTrunk({position, width, length, taper}) {
  const half_base = width / 2;
  const half_end = (width - taper) / 2;
  return {
    fork: {x: position.x, y: position.y - length},
    coords: [
      {
        x: position.x - half_base,
        y: position.y,
      },
      {
        x: position.x - half_end,
        y: position.y - length,
      },
      {
        x: position.x + half_end,
        y: position.y - length,
      },
      {
        x: position.x + half_base,
        y: position.y,
      },
    ],
  }
}

export default calcTree;