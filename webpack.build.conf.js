const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const PATHS = require("./webpack.path.conf");
const baseWebpackConfig = require("./webpack.base.conf");
const css = require("./webpack.css.conf");

const exampleWebpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  optimization: {
    minimize: false,
    splitChunks: false,
  },
  module: {
    rules: [css.expandedCssConfig],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // template: `${PATHS.src}/registration.html`,
      // filename: "registration.html",
      // template: `${PATHS.src}/change-pass.html`,
      // filename: "change-pass.html",
      // template: `${PATHS.src}/user_profile.html`,
      // filename: "user_profile.html",
      // template: `${PATHS.src}/user_profile.html`,
      // filename: "login.html",
      //       template: `${PATHS.src}/add-user.html`,
      // filename: "add-user.html",
      template: `${PATHS.src}/subscription.html`,
      filename: "subscription.html",
      inject: true,
      minify: false,
    }),
    new ExtractTextPlugin({
      filename: "style.css",
    }),
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    // }),
  ],
});
const libraryWebpackConfig = merge(baseWebpackConfig, {
  externals: {
    path: PATHS,
    jquery: "jQuery",
  },
  entry: {
    main: [`${PATHS.src}/slider.ts`, `${PATHS.src}/main.scss`],
  },
  output: {
    path: PATHS.dist,
    filename: "[name].js",
    library: "RangeSlider",
  },
  module: {
    rules: [css.expandedCssConfig],
  },
  mode: "production",
  optimization: {
    minimize: false,
    splitChunks: false,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ExtractTextPlugin({
      filename: "[name].css",
    }),
  ],
});
const minLibraryWebpackConfig = merge(baseWebpackConfig, {
  externals: {
    path: PATHS,
    jquery: "jQuery",
  },
  entry: {
    main: [`${PATHS.src}/slider.ts`, `${PATHS.src}/main.scss`],
  },
  output: {
    path: PATHS.dist,
    filename: "[name].min.js",
    library: "RangeSlider",
  },
  module: {
    rules: [css.minimizedCssConfig],
  },
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: false,
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new ExtractTextPlugin({
      filename: "[name].min.css",
    }),
  ],
});

module.exports = new Promise((resolve, reject) => {
  resolve([
    exampleWebpackConfig,
    // minLibraryWebpackConfig,
    // libraryWebpackConfig,
  ]);
});
