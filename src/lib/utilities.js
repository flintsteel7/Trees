function calcRandomness(variable, factor) {
  const posOrNeg = Math.round(Math.random()) * 2 - 1; // produces 1 or -1
  return (variable * Math.random() * factor) * posOrNeg;
}

function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toHundredths(num) {
  return Math.round(num * 100) / 100
}

export {calcRandomness, getRandInt, toHundredths};
