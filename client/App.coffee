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

# Libraries
React = require("react")

# Components
PlayComponent = require("./Play/component")

# Store
store = require("./store")

App = React.createClass

  propTypes:
    element: React.PropTypes.object

  defaultStore:
    player:
      ammo: 10

  componentDidMount: ->
    store.set(@defaultStore)
    store.on 'change', =>
      console.time('App re-rendered')
      @forceUpdate =>
        console.timeEnd('App re-rendered')

  render: ->
    # TODO Router instead
    {env, server} = @props.element.dataset
    PlayComponent {env, server}

module.exports = React.createFactory(App)
