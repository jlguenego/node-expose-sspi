const path = require('path');
const nodeExternals = require("webpack-node-externals");


module.exports = {
  entry: './src/server.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],
};
