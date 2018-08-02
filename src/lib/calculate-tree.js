import {calcRandomness} from './utilities';

function calcTree(tree_params) {
  const this_tree = [];
  const trunk = calcTrunk({...tree_params});
  this_tree.push(trunk.coords);
  const branching_tree = this_tree.concat(calcBranches({
    start: trunk.fork,
    parent_angle: Math.PI / 2,
    ...tree_params,
  }));
  console.log(branching_tree)
  return branching_tree;
}

function calcBranches({start, width, taper, length, parent_angle, length_var, angle_var, branch_lev}) {
  const branches = [];
  // TODO
  // loop until branch_lev is reached
  // new params for each branch level based on the last

  const params = {
    start,
    base_width: width - taper,
    end_width: width - (2 * taper),
  };
  branches.push(calcBranch({
    ...params,
    length: length * 0.6 + calcRandomness(length_var, 3),
    angle: parent_angle + (Math.PI / 4 + calcRandomness(angle_var, 0.05)),
  }).coords);
  branches.push(calcBranch({
    ...params,
    length: length * 0.6 + calcRandomness(length_var, 3),
    angle: parent_angle - (Math.PI / 4 + calcRandomness(angle_var, 0.05)),
  }).coords);
  return branches;
}

function calcBranch({start, base_width, end_width, length, angle}) {
  const end = {
    x: start.x + (length * Math.cos(angle)),
    y: start.y - (length * Math.sin(angle))
  };
  const half_base = base_width / 2;
  const half_end = end_width / 2;
  const angle90 = (Math.PI / 2);
  return {
    fork: end,
    coords: [
      {
        x: start.x + (half_base * Math.cos(angle + angle90)),
        y: start.y - (half_base * Math.sin(angle + angle90))
      },
      {
        x: end.x + (half_end * Math.cos(angle + angle90)),
        y: end.y - (half_end * Math.sin(angle + angle90))
      },
      {
        x: end.x + (half_end * Math.cos(angle - angle90)),
        y: end.y - (half_end * Math.sin(angle - angle90))
      },
      {
        x: start.x + (half_base * Math.cos(angle - angle90)),
        y: start.y - (half_base * Math.sin(angle - angle90))
      }
    ]
  };
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