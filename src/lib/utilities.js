function calcRandomness(variable, factor) {
  const posOrNeg = Math.round(Math.random()) * 2 - 1; // produces 1 or -1
  return (variable * Math.random() * factor) * posOrNeg;
}

module.exports = calcRandomness;
