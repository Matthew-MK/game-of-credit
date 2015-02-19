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
Player = require("../modules/Player")

class Sockets
  lastEvent: null

  constructor: (dataServer, @scene, @players, @playground) ->
    @socket = io.connect(path: dataServer)
    @socket.on("data", @onPlayersPosition)
    @socket.on("player-disconnect", @onPlayerDisconnect)
    @socket.on("kill", @onKill)
    setInterval(@sendUpdate, 16)

  kill: (id) ->
    @socket.emit("kill", id)

  update: (controls) ->
    @controls = controls

  pack: (data) ->
    return [
      data.position.x
      data.position.y
      data.position.z
      data.rotation.x
      data.rotation.y
      data.animation
    ]

  unpack: (data) ->
    return {
      position: new THREE.Vector3(data[0], data[1], data[2])
      rotation: new THREE.Vector3(data[3], data[4], 0)
      animation: data[5]
    }

  sendUpdate: =>
    return if not @controls

    data = @pack
      position: @controls.position
      rotation: @controls.rotation
      animation: @controls.animation

    @socket.emit("data", data)

  onKill: (id) =>
    return if id is @socket.id
    @players[id]?.onKill()

  onPlayersPosition: (players) =>
    if @socket.id of players
      delete players[@socket.id]

    for id, data of players
      data = @unpack(data)
      if id of @players
        @players[id].onUpdate(data, @scene, @playground)
      else
        player = new Player(data.position, @playground)
        player.scale = 0.5
        @scene.add(player.root)
        @players[id] = player

  onPlayerDisconnect: (id) =>
    if id of @players
      @scene.remove(@players[id].root)
      delete @players[id]

module.exports = Sockets