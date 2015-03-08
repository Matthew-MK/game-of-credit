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

# Normalize & common css
require("../static/css/normalize.css")
require("./common.css")

# Libraries
React = require("react")

# Components
Play = require("./Play/App")

# Get elements with environment based data from server
AppElement = document.getElementById("app")

# Render main component
React.render(Play(AppElement.dataset), AppElement)