const webpack = require("webpack");
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PATHS = require("./webpack.path.conf");
const baseWebpackConfig = require("./webpack.base.conf");
const css = require("./webpack.css.conf");


const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    port: 8081,
    overlay: true,
    hot: true,
  },
  module: {
    rules: [css.minimizedCssConfig],
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
    new HtmlWebpackPlugin({
      // template: `${PATHS.src}/change-pass.html`,
      // template: `${PATHS.src}/new-pass.html`,
      // template: `${PATHS.src}/login.html`,
      // template: `${PATHS.src}/user_profile.html`,
      // template: `${PATHS.src}/registration.html`,
      // template: `${PATHS.src}/add-user.html`,
      template: `${PATHS.src}/main.html`,
      // template: `${PATHS.src}/subscription.html`,
      filename: "index.html",
      inject: true,
    }),
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    // }),
    new ExtractTextPlugin({
      filename: "[name].css",
    }),
  ],
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});
