var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  target: "web",
  cache: false,
  context: path.join(__dirname, '..'),
  debug: false,
  devtool: false,
  entry: {
    main: ["babel-polyfill", "./src/client"],
    resetpwd: ["babel-polyfill", "./src/client/resetPasswordPage"],
  },
  output: {
    path: path.join(__dirname, "../static/dist"),
    publicPath: "/static/dist/",
    filename: "[name].[hash].js",
    chunkFilename: "[id].[chunkhash].js"
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __DEVELOPMENT__: false,
      __DOCKER__: false
    }),
    new webpack.DefinePlugin({"process.env": {NODE_ENV: '"production"'}}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new ExtractTextPlugin('style.[chunkhash].css', {
      allChunks: true,
    }),
    new AssetsPlugin({path: path.join(__dirname, '..', 'dist')})
  ],
  module: {
    loaders: [
      {test: /\.json$/, loaders: ["json"]},
      {test: /\.js$/, loaders: ["babel?presets[]=es2015&presets[]=stage-0&presets[]=react"], exclude: /node_modules/},
      {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&localIdentName=[name]-[local]-[hash:base64:5]!postcss-loader")}
    ],
    noParse: /\.min\.js/
  },
  postcss: function () {
    return [require('postcss-import'), require('postcss-cssnext')];
  },
  externals: {
    "lodash/fp": "_",
    "moment": "moment",
    "react": "React",
    "react-dom": "ReactDOM",
    "react-addons-css-transition-group": "React.addons.CSSTransitionGroup",
  },
  resolve: {
    modulesDirectories: [
      "src",
      "node_modules",
      "web_modules"
    ],
    extensions: ["", ".json", ".js"]
  },
  node: {
    __dirname: true,
    fs: "empty"
  }
};
