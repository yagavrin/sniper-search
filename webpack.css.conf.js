const ExtractTextPlugin = require("extract-text-webpack-plugin");

const minimizedCssConfig = {
  test: /\.css|scss$/,
  use: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [
      {
        loader: "css-loader",
        options: { sourceMap: true },
      },
      {
        loader: "postcss-loader",
        options: {
          sourceMap: true,
          config: {
            path: "postcss.config.js",
          },
        },
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
          sassOptions: {
            outputStyle: "compressed",
          },
        },
      },
    ],
  }),
};

const expandedCssConfig = {
  test: /\.css|scss$/,
  use: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [
      {
        loader: "css-loader",
        options: { sourceMap: true },
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
          sassOptions: {
            outputStyle: "expanded",
          },
        },
      },
    ],
  }),
};

module.exports = {
  expandedCssConfig,
  minimizedCssConfig,
};
