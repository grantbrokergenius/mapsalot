const path = require('path');

module.exports = {
  entry: './dist/App.js',
  output: {
    path: path.resolve(__dirname, 'static/app'),
    filename: 'client.js',
  },
  mode: 'development',
};
