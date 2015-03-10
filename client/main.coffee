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
"use strict"

console.time("App starting")

# Normalize & common css
require("../static/css/normalize.css")
require("../static/css/common.css")

# Libraries
React = require("react")
{Map} = require("immutable")

# Main application component
App = require("./App")

# Store
store = require("./store")

# Get elements with environment based data from server
AppElement = document.getElementById("app")

# Default store state
defaultState = Map
  env: AppElement.dataset.env
  socketServer: AppElement.dataset.server
  window: Map
    width: window.innerWidth
    height: window.innerHeight

# Set default state
store.set(defaultState)

console.timeEnd("App starting")
# Render main component
React.render(App(), AppElement)