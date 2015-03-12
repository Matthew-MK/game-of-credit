###
Copyright 2015 Jan Svager

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
###
fs = require("fs")
path = require("path")
express = require("express")
webpack = require("webpack")
webpackDevMiddleware = require("webpack-dev-middleware")

{config} = require('./../package.json')
render = require("./render")
io = require("./sockets")
webpackConfig = require("../webpack.config")

### Setup ###
app = express()
env = app.get('env')
app.set('port', parseInt(process.env["PORT"], 100) or config.port or 3000)

# Live bundle reloading in development
if env is "development"
  compiler = webpack(webpackConfig)
  webpackDevMiddleware = webpackDevMiddleware(compiler,
    stats:
      assets: false
      colors: true
      chunks: false
      version: false
  )
  compiler.plugin("done", io.onInvalided)
  app.use(webpackDevMiddleware)

# Serve all static files from static folder
app.use("/static", express.static(path.join(__dirname, "..", "static")))

# Redirect all requests to react or respond with 500 if failed
app.get "*", (req, res) ->
  render {
    env: env
    path: req.path
    socketServer: (req.headers['uri'] or '/') + "socket.io"
  }
  .then (result) ->
    res.type("html").status(result.status).send(result.html)
  .catch (error) ->
    msg = error.stack or error
    console.error(msg)
    res.status(500).send("500: #{msg}")

module.exports = app