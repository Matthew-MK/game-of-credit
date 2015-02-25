###
Copyright 2015 Jan Svager & Michael Muller

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
express = require("express")
{config} = require('./package.json')

### Setup ###
app = express()
env = app.get('env')
app.set('port', parseInt(process.env.PORT, 100) or config.port or 3000)

# View engine setup
app.set("views", __dirname + "/views")
app.set("view engine", "jade")

# Serve all static files from static folder
app.use(express.static(__dirname + "/static"))

# Load all resources only from current origin (but not its sub-domains)
app.use (req, res, next) ->
  # TODO Content-Security-Policy
  res.setHeader("X-Frame-Options", "sameorigin")
  next()

app.get "/", (req, res) ->
  res.render "play",
    title: "Play"
    env: env

# catch 404 and forward to error handler
app.use (req, res, next) ->
  err = new Error("Not Found")
  err.status = 404
  next(err)

# error handler
app.use (err, req, res, next) ->
  res.status err.status or 500
  res.render 'error',
    message: err.message
    error: if env is "development" then err else {}

module.exports = app