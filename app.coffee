###
Copyright 2014 Jan Svager & Michael Muller

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
coffee = require('coffee-script')
through = require("through")
browserify = require("browserify")


###
Browserify transform
- convert all coffee files to single js bundle
###
b = browserify(__dirname + "/src/main.coffee")
b.transform ->
  data = ""
  write = (buf) -> data += buf
  end = ->
    @queue(coffee.compile(data))
    @queue(null)
  return through(write, end)
b.transform {global: true}, 'uglifyify' if env is "development"
b.bundle().pipe(fs.createWriteStream(__dirname + "/static/build/bundle.js"))


### Setup ###
app = express()
env = app.get('env')

# View engine setup
app.set("views", __dirname + "/views")
app.set("view engine", "jade")
app.use(express.static(__dirname + "/static")) if env is "development"

app.use "/", (req, res) ->
  res.render "play",
    title: "Play"

### Middleware ###
# catch 404 and forward to error handler
app.use (req, res, next) ->
  err = new Error("Not Found")
  err.status = 404
  next(err)

# error handler
app.use (err, req, res) ->
  res.status err.status or 500
  res.render 'error',
    message: err.message
    error: if env is "development" then err else {}

module.exports = app