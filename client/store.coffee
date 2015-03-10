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
events = require('events')

Immutable = require("immutable")
{Map} = Immutable

###
 Helper class for emitting & storing state changes
###
store = new class Store extends events.EventEmitter

  constructor: ->
    super
    @_state = null

  get: ->
    return @_state

  set: (state) ->
    return if state is @_state
    @_state = state
    @emit('change', @_state)

  # Getters & setters
  Object.defineProperties @prototype,
    state:
      get: -> @get()
      set: (state) -> @set(state)

###
  Store responds to actions here.
  This is the only place in whole app that has privilege to mutate the data.
###
dispatcher.register (payload) ->
  {action, data} = payload

  state = store.state
  store.state = switch action
    when "windowDidResize"
      state
        .updateIn ["window"], (map) -> map.set("width", window.innerWidth)
        .updateIn ["window"], (map) -> map.set("height", window.innerHeight)

    when "playerInit"
      state.set("player", data)

    when "playerDidFire"
      state
        .updateIn(["player", "ammo"], (ammo) -> --ammo)
        .updateIn(["player"], (map) -> map.set("fired", true))
        .updateIn(["player"], (map) -> map.set("canFire", false))

    when "playerEndFire"
      state.updateIn(["player"], (map) -> map.set("fired", false))

    when "playerCanFire"
      state.updateIn(["player"], (map) -> map.set("canFire", true))

    when "gameStateDidChange"
      state.set("gameState", data)

    when "pointerLockDidChange"
      state.set("pointerLocked", data)

module.exports = store