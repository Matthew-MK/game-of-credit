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
 * @providesModule generateBundle
 **/

import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import webpackConfig from "../webpack.config.js";

export function generateBundle(env) {
  const config = webpackConfig(env);
  const compiler = webpack(config);

  if (env === "production") {
    compiler.run((err, stats) => {
      if (err) throw err;
      const jsonStats = stats.toJson();
      if (jsonStats.errors.length > 0) {
        console.error(jsonStats.errors);
      }
      if (jsonStats.warnings.length > 0) {
        console.warn(jsonStats.warnings);
      }
      console.log("Production bundle created.");
    });
  } else {
    const devConfig = config.devServer;
    new WebpackDevServer(compiler, devConfig)
      .listen(devConfig.port, devConfig.host, err => {
        if (err) console.error(err);
        console.log("Dev server listening on 8888");
      });
  }
}
