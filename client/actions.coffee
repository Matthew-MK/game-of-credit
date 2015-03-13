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
state = require("./state")

actions =
  windowDidResize: ->
    dispatcher.dispatch("windowDidResize")

  playerInit: (player) ->
    dispatcher.dispatch("playerInit", player)

  playerDidFire: ->
    {canFire, fired} = state.get().get("player").toJS()
    dispatcher.dispatch("playerDidFire") if canFire and not fired

  playerEndFire: ->
    dispatcher.dispatch("playerEndFire")

  playerCanFire: ->
    ammo = state.get().get("player").get("ammo")
    dispatcher.dispatch("playerCanFire") if ammo > 0

  gameStateDidChange: (newState) ->
    dispatcher.dispatch("gameStateDidChange", newState)

  pointerLockDidChange: (enabled) ->
    actions.gameStateDidChange(if enabled then "playing" else "menu")
    dispatcher.dispatch("pointerLockDidChange", enabled)

module.exports = actions