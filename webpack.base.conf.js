/* eslint-disable @typescript-eslint/no-unused-vars */
const PATHS = require("./webpack.path.conf");

const config = {
  entry: [`${PATHS.src}/index.js`, `${PATHS.src}/style.scss`],
  output: {
    path: PATHS.example,
    filename: "index.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      // {
      //   test: /\.ts$/,
      //   exclude: "/node_modules/",
      //   use: {
      //     loader: "ts-loader",
      //   },
      // },
      // {
      //   test: /\.js$/,
      //   exclude: "/node_modules/",
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: ["@babel/preset-env"],
      //     },
      //   },
      // },
      {
        test: /\.pug$/,
        loader: "pug-loader",
        options: {
          pretty: true,
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: `${PATHS.src}/fonts`,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./img/",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 70,
              },
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)$/,
        exclude: `${PATHS.src}/components`,
        use: [
          {
            loader: "file-loader",
            options: {
              url: false,
              inject: false,
              name: "[name].[ext]",
              outputPath: "./fonts/",
            },
          },
        ],
      },
    ],
  },
};
module.exports = config;
