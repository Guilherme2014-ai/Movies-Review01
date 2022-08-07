/* eslint-disable @typescript-eslint/no-unused-vars */
import * as webpack from "webpack";
import { resolve } from "path";

import { Configuration } from "webpack";
import webpackConfig from "./webpack.config";
import { merge } from "webpack-merge";

const config: Configuration = merge(webpackConfig, {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    static: resolve(__dirname, "..", "dist"),
    historyApiFallback: true,
    compress: true,
    port: 4000,
  },
});

export default config;
