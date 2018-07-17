const path = require('path');

module.exports = {
  entry: './src/trees.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'trees.js'
  }
};