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

# Libraries
React = require("react")

# Components
App = require("./Play/App")

# Selector
$ = (id) -> document.getElementById(id)

# Get elements with environment based data from server
AppElement = $("app")
BundleElement = $("bundle")
{env} = AppElement.dataset
{server} = BundleElement.dataset

# Init css module to head of page
require("./Play/css/style.css")

# Render main component
React.render(App({env, server}), AppElement)