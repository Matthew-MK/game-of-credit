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
  constructor: (dataServer, @scene, @players) ->
    @socket = io.connect(dataServer)
    @socket.on("players-position", @onPlayersPosition)
    @socket.on("player-disconnect", @onPlayerDisconnect)

  update: (camera) ->
    @socket.emit "position",
      position: camera.position
      rotation: camera.rotation

  onPlayersPosition: (players) =>
    if @socket.id of players
      delete players[@socket.id]

    for id, data of players
      if id of @players
        {x, y, z} = data.position
        {_x, _y, _z} = data.rotation
        @players[id].root.position.set(x, y, z)
        @players[id].root.rotation.set(_x, _y, _z)
        @players[id].root.rotation.y += Math.PI
      else
        player = new Player(data.position)
        player.scale = 0.5
        @players[id] = player
        @scene.add(player.root)

  onPlayerDisconnect: (id) =>
    if id of @players
      @scene.remove(@players[id].root)
      delete @players[id]

module.exports = Sockets