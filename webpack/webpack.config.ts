/* eslint-disable @typescript-eslint/no-unused-vars */
import * as webpack from "webpack";
import * as webpackDevServer from "webpack-dev-server";

import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import htmlExtractPlugin from "html-webpack-plugin";
import miniCssExtractor from "mini-css-extract-plugin";

import path from "path";
import { Configuration } from "webpack";

const config: Configuration = {
  entry: "./src/main.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [miniCssExtractor.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new miniCssExtractor(),
    new htmlExtractPlugin({
      title: "Movies Review",
      template: path.resolve(__dirname, "..", "index.html"),
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
  ],
};

export default config;
