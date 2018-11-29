const path = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      { test: /\.tsx?$/,
        include: [ path.resolve(__dirname, 'src'), ],
        exclude: /node_modules/,
        use: 'awesome-typescript-loader' },
      { test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.css'],
    modules: [ 'node_modules', path.resolve(__dirname, 'src') ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CheckerPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    port: 9000
  }
}