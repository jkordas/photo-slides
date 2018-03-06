const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  watch: true,
  target: 'electron',
  entry: './app/src/entry.js',
  output: {
    path: __dirname + '/app/build',
    publicPath: 'build/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'env'],
          plugins: ['transform-class-properties']
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpg|gif|svg|JPG)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
        filename: 'bundle.css',
        disable: false,
        allChunks: true
      }
    )
  ]
};
