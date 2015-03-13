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
Immutable = require("immutable")

# Components
PlayComponent = require("./Play/component")

# Others
state = require("./state")
store = require("./store")
actions = require("./actions")
{Map} = Immutable
{PureRenderMixin} = React["addons"]

App = React.createClass

  mixins: [PureRenderMixin]

  ###
  Invoked once, only on the client (not on the server), immediately after
  the initial rendering occurs.
  At this point in the lifecycle, the component has a DOM representation.
  ###
  componentDidMount: ->
    store.init()
    state.on 'change', =>
      console.time('App re-rendered')
      @forceUpdate -> console.timeEnd('App re-rendered')
    window.addEventListener('resize', actions.windowDidResize)

  ###
  Invoked immediately before a component is unmounted from the DOM.
  Perform any necessary cleanup in this method, such as invalidating timers
  or cleaning up any DOM elements that were created in componentDidMount.
  ###
  componentWillUnmount: ->
    window.removeEventListener('resize', actions.windowDidResize)

  render: ->
    # TODO Router instead
    PlayComponent(state: state.get())

module.exports = React.createFactory(App)