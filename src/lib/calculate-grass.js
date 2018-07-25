import {getRandInt} from './utilities';

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

export default calcGrass;