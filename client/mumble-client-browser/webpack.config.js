var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    postLoaders: [
      {
        include: /mumble-streams\/lib\/data.js/,
        loader: 'transform-loader?brfs'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env'],
          plugins: ['transform-runtime']
        }
      }
    ]
  }
}
