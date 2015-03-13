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
dispatcher = require("./dispatcher")
actions = require("./actions")
state = require("./state")

###
  Store responds to actions here.
  This is the only place in whole app that has privilege to mutate the data.
###
dispatchToken = dispatcher.register (payload) ->
  {action, data} = payload

  oldState = state.get()
  state.set switch action
    when "windowDidResize"
      oldState
        .updateIn ["window"], (map) -> map.set("width", window.innerWidth)
        .updateIn ["window"], (map) -> map.set("height", window.innerHeight)

    when "playerInit"
      oldState.set("player", data)

    when "playerDidFire"
      oldState
        .updateIn(["player", "ammo"], (ammo) -> --ammo)
        .updateIn(["player"], (map) -> map.set("fired", true))
        .updateIn(["player"], (map) -> map.set("canFire", false))

    when "playerEndFire"
      oldState.updateIn(["player"], (map) -> map.set("fired", false))

    when "playerCanFire"
      oldState.updateIn(["player"], (map) -> map.set("canFire", true))

    when "gameStateDidChange"
      oldState.set("gameState", data)

    when "pointerLockDidChange"
      oldState.set("pointerLocked", data)

exports.init = -> dispatchToken