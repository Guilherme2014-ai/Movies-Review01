/* eslint-disable @typescript-eslint/no-unused-vars */
import * as webpack from "webpack";
import { Configuration } from "webpack";
import webpackConfig from "./webpack.config";
import { merge } from "webpack-merge";

const config: Configuration = merge(webpackConfig, {
  mode: "production",
  devtool: "source-map",
});

export default config;
