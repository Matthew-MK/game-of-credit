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

# Libraries
React = require("react")

# Components
Blocker = require("./Blocker")
Core = require("./Core")
UI = require("./UI")

# Others
mapping = require("../mapping.json")
helpers = require("../modules/helpers")

# Others
{PureRenderMixin} = React["addons"]
{div} = React.DOM

App = React.createClass

  mixins: [PureRenderMixin]

  # Game states
  LOADING: 0
  INITIATING: 1
  MENU: 2
  PLAYING: 3

  textures: {}
  player: {}

  getInitialState: ->
    next: @LOADING
    windowWidth: window.innerWidth
    windowHeight: window.innerHeight

  handleResize: ->
    @setState
      windowWidth: window.innerWidth
      windowHeight: window.innerHeight

  handleLoading: (item, loaded, total) ->
    if loaded == total and @state.next is @LOADING
      @setState(next: @INITIATING, @init)

  handleClick: ->
    @player.onClick() if @state.next is @PLAYING

  handleBlockerState: (pointerLocked) ->
    @setState(next: if pointerLocked then @PLAYING else @MENU)

  init: ->
    respawns = mapping["respawns"]
    randomRespawn = respawns[Math.floor((Math.random() * respawns.length))]
    @player.position = new THREE.Vector3(randomRespawn.position...)
    @player.rotation = new THREE.Vector3(0, randomRespawn.rotation)
    @setState(next: @MENU)

  ###
  Invoked once, both on the client and server, immediately before the initial
  rendering occurs.
  ###
  componentWillMount: ->
    # Loading textures
    THREE.DefaultLoadingManager.onProgress = @handleLoading

    baseUrl = mapping["textures"]["baseUrl"]
    textures = mapping["textures"]["items"]

    for key, file of textures
      if typeof file is 'string'
        @textures[key] = new THREE.ImageUtils.loadTexture(baseUrl + file)
      else
        files = (baseUrl + path for path in file)
        @textures[key] = new THREE.ImageUtils.loadTextureCube(files)


  ###
  Invoked once, only on the client (not on the server), immediately after
  the initial rendering occurs.
  At this point in the lifecycle, the component has a DOM representation.
  ###
  componentDidMount: ->
    window.addEventListener('resize', @handleResize)

  ###
  Invoked immediately before a component is unmounted from the DOM.
  Perform any necessary cleanup in this method, such as invalidating timers
  or cleaning up any DOM elements that were created in componentDidMount.
  ###
  componentWillUnmount: ->
    window.removeEventListener('resize', @handleResize)

  render: ->
    if @state.next is @LOADING or @state.next is @INITIATING
      div {id: "loading"}, "Loading..."
    else
      div {
          id: "wrapper",
          onClick: @handleClick
        },
        UI
          width: @state.windowWidth
          height: @state.windowHeight
          playing: @state.next is @PLAYING
        Blocker
          sendState: @handleBlockerState
        Core
          width: @state.windowWidth
          height: @state.windowHeight
          playing: @state.next is @PLAYING
          dataServer: @props.server
          player: @player
          textures: @textures


module.exports = React.createFactory(App)