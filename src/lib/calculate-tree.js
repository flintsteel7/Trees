import {calcRandomness, getRandInt, toHundredths} from './utilities';

function calcTree(tree_params) {
  const trunk = calcTrunk({...tree_params});
  const branch_results = calcBranches({
    start: trunk.fork,
    parent_angle: Math.PI / 2,
    ...tree_params,
  });
  return {
    trunk: trunk.coords,
    branches: branch_results.branches,
    leaves: branch_results.leaves,
  };
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

function calcBranches({start, width, taper, length, parent_angle, length_var, angle_var, branch_lev, leaf_colors}) {
  const branches = [];
  let leaves;

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
    if (i < branch_lev - 1) {
      set_params = current_params.reduce((acc, params) => acc.concat(genParams({...params}, length_var, angle_var)), []);
    } else {
      leaves = current_params.map(params => { return {...params.fork, color: leaf_colors[getRandInt(0, leaf_colors.length - 1)]}});
    }
  }
  return {
    branches,
    leaves,
  };
}

function calcBranch({start, base_width, end_width, length, angle}) {
  const end = {
    x: toHundredths(start.x + (length * Math.cos(angle))),
    y: toHundredths(start.y - (length * Math.sin(angle)))
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
        x: toHundredths(start.x + (half_base * Math.cos(angle + angle90))),
        y: toHundredths(start.y - (half_base * Math.sin(angle + angle90)))
      },
      {
        x: toHundredths(end.x + (half_end * Math.cos(angle + angle90))),
        y: toHundredths(end.y - (half_end * Math.sin(angle + angle90)))
      },
      {
        x: toHundredths(end.x + (half_end * Math.cos(angle - angle90))),
        y: toHundredths(end.y - (half_end * Math.sin(angle - angle90)))
      },
      {
        x: toHundredths(start.x + (half_base * Math.cos(angle - angle90))),
        y: toHundredths(start.y - (half_base * Math.sin(angle - angle90)))
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