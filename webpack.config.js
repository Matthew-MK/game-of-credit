/**
 * Copyright 2015 Jan Svager
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getWebpackConfig
 **/
import webpack from "webpack";
import path from "path";
import ExtractTextPlugin from "extract-text-webpack-plugin";

import { DEV_SERVER_URL, PORT, HOST } from "./src/config";

const common = {
  resolve: {
    extensions: ["", ".js", ".jsx", ".json"]
  },
  externals: {
    three: "THREE"
  }
};

const development = {
  ...common,

  devtool: "cheap-eval-source-map",
  devServer: {
    port: PORT,
    host: HOST,
    hot: true,
    inline: true,
    quiet: false,
    noInfo: false,
    publicPath: DEV_SERVER_URL + "/static/",
    stats: {
      assets: true,
      colors: true,
      version: false,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false
    }
  },
  entry: [
    "webpack-dev-server/client?" + DEV_SERVER_URL,
    "webpack/hot/only-dev-server",
    path.join(__dirname, "src/client.jsx")
  ],
  output: {
    path: path.join(__dirname, "/static/"),
    filename: "bundle.js",
    publicPath: DEV_SERVER_URL + "/static/"
  },
  module: {
    loaders: [
      {
        test: /\.js|.jsx$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel"]
      },
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.css$/,
        loaders: ["style", "css"]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

const production = {
  ...common,

  entry: path.join(__dirname, "src/client.jsx"),
  output: {
    path: path.join(__dirname, "static"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js|.jsx$/,
        include: path.join(__dirname, "src"),
        exclude: /node_modules/,
        loader: "babel"
      },
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css")
      }
    ]
  },
  plugins: [
    // set environment based on process.env[key]
    new webpack.EnvironmentPlugin("NODE_ENV"),
    new webpack.EnvironmentPlugin("APP_PREFIX"),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      sourceMap: false
    }),
    new ExtractTextPlugin("bundle.css", {allChunks: true})
  ]
};

export default function (env) {
  return env === "production" ? production : development;
}
