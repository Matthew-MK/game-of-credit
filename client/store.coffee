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

class Store extends events.EventEmitter

  constructor: ->
    @_state = null
    super

  get: ->
    return @_state

  set: (state) ->
    return if state is @_state
    @_state = state
    @emit('change', @_state)

store = new Store

dispatcher.register (payload) ->
  {action, data} = payload

  switch action
    when "playerFired"
      {ammo} = store.get().player
      store.set {player: ammo: --ammo} if ammo > 0
      break

module.exports = store