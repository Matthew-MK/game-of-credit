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
Base = require("./Base")
Player = require("./Player")
{eventType} = require("../mapping.json")

class Sockets extends Base

  init: (dataServer) ->
    @socket = io.connect(path: dataServer)
    @socket.on("data", @onDataUpdate)
    @socket.on("leave", @onLeave)
    @socket.on("death", @onDeath)
    setInterval(@sendUpdate, 16)

  ###
  Pack data object to binary buffer
  ###
  pack: (data) ->
    buffer = new ArrayBuffer(41)
    idView = new Uint8Array(buffer, 0, 20)
    posView = new Float32Array(buffer, 20, 3)
    rotView = new Float32Array(buffer, 32, 2)
    eventView = new Uint8Array(buffer, 40, 1)

    idView[idx] = @socket.id.charCodeAt(idx) for idx in [0..20]
    posView[0] = data.position.x
    posView[1] = data.position.y
    posView[2] = data.position.z
    rotView[0] = data.rotation.x
    rotView[1] = data.rotation.y
    eventView[0] = eventType[data.event]
    return buffer

  ###
  Unpack binary buffer to data object
  ###
  unpack: (buffer) ->
    eventTypeLookup = Object.keys(eventType)

    idArray = new Uint8Array(buffer.slice(0, 20))
    posArray = new Float32Array(buffer.slice(20, 32))
    rotArray = new Float32Array(buffer.slice(32, 40))
    eventArray = new Uint8Array(buffer.slice(40, 41))

    return {
      id: String.fromCharCode.apply(null, idArray)
      position: new THREE.Vector3(posArray...)
      rotation: new THREE.Vector3(rotArray...)
      animation: eventTypeLookup[eventArray[0]]
    }

  sendKill: (id) ->
    @socket.emit("kill", id)

  sendUpdate: =>
    return if not @controls or not @socket.id

    data = @pack
      position: @controls.position
      rotation: @controls.rotation
      event: @controls.animation

    @socket.emit("data", data)

  onDeath: (id) =>
    if id is @socket.id
      console.log """ I died """
    else
      @players[id]?.onDeath()

  onDataUpdate: (buffer) =>
    data = @unpack(buffer)
    {id} = data

    if id of @players
      @players[id].onUpdate(data)
    else
      player = new Player(@scene, @playGround)
      player.init(data)
      @players[id] = player

  onLeave: (id) =>
    if id of @players
      player = @players[id]

      idxBody = @playGround.meshes.indexOf(player.meshBody)
      @playGround.meshes.splice(idxBody, 1) if idxBody

      idxWeapon = @playGround.meshes.indexOf(player.meshWeapon)
      @playGround.meshes.splice(idxWeapon, 1) if idxWeapon

      @scene.remove(player.root)
      delete @players[id]

module.exports = Sockets