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
Blocker = require("./components/Blocker")
Core = require("./components/Core")
UI = require("./components/UI")

# Others
mapping = require("./mapping")
actions = require("../actions")
store = require("../store")

{PureRenderMixin} = React["addons"]
{Map} = Immutable
{div} = React.DOM

# Component css
require("./component.css")

App = React.createClass

#  mixins: [PureRenderMixin]

  textures: {}

  handleLoading: (item, loaded, total) ->
    gameState = store.state.get("gameState")
    if loaded == total and gameState is "loading"
      actions.gameStateDidChange("initiating")
      @initiation()

  handleClick: (e) ->
    canFire = store.state.get("player").get("canFire")
    return if e.target.id != "blocker" or not canFire

    actions.playerDidFire()
    setTimeout(actions.playerCanFire, 16 * 60)

  initiation: ->
    respawns = mapping["respawns"]
    randomRespawn = respawns[Math.floor((Math.random() * respawns.length))]

    player = Map
      canFire: true
      fired: false
      ammo: 10
      position: new THREE.Vector3(randomRespawn.position...)
      rotation: new THREE.Vector3(0, randomRespawn.rotation)

    actions.playerInit(player)
    actions.gameStateDidChange("menu")

  ###
  Invoked once, both on the client and server, immediately before the initial
  rendering occurs.
  ###
  componentWillMount: ->
    actions.gameStateDidChange("loading")

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

  render: ->
    # Get state from store
    {state} = store
    gameState = state.get("gameState")

    switch gameState
      when "loading"
        return div {id: "loading"}, "Loading..."
      when "initiating"
        return div {id: "initiating"}, "Initiating..."
      else

        # Load data from state
        {width, height} = state.get("window").toJS()
        player = state.get("player")

        return div {
            id: "wrapper",
            onClick: @handleClick
          },
          UI
            ammo: player.get("ammo")
            width: width
            height: height
            playing: gameState is "playing"
          Blocker
            enabled: state.get("pointerLocked")
          Core
            width: width
            height: height
            playing: gameState is "playing"
            socketServer: state.get("socketServer")
            player: player
            textures: @textures


module.exports = React.createFactory(App)