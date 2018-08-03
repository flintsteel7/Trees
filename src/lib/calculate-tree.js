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
  console.log(branching_tree);
  return branching_tree;
}

function genParams({fork, base_width, end_width, length, angle}, length_var, angle_var) {
  return [
    {
      start: fork,
      base_width: end_width,
      end_width: (end_width * end_width) / base_width,
      length: length * 0.6 + calcRandomness(length_var, 3),
      angle: angle + (Math.PI / 4 + calcRandomness(angle_var, 0.05))
    },
    {
      start: fork,
      base_width: end_width,
      end_width: (end_width * end_width) / base_width,
      length: length * 0.6 + calcRandomness(length_var, 3),
      angle: angle - (Math.PI / 4 + calcRandomness(angle_var, 0.05))
    }
  ]
}

function calcBranches({start, width, taper, length, parent_angle, length_var, angle_var, branch_lev}) {
  const branches = [];

  let set_params = genParams({
      fork: start,
      base_width: width,
      end_width: width - taper,
      length,
      angle: parent_angle
    },
    length_var,
    angle_var
    );

  for (let i = 0; i < branch_lev; i++) {
    let current_params = [];
    for (const params of set_params) {
      const result = calcBranch({...params});
      current_params.push(result.params);
      branches.push(result.coords);
    }
    set_params = current_params.reduce((acc, params) => acc.concat(genParams({...params}, length_var, angle_var)), []);
  }
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
    params: {
      fork: end,
      base_width,
      end_width,
      length,
      angle
    },
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