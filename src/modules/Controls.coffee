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
Key = require("keymaster")

class Controls
  velocity: new THREE.Vector3
  canJump: true

  constructor: (camera) ->
    camera.rotation.set(0, 0, 0)
    @cameraPitch = camera
    @camera = new THREE.Object3D
    @camera.position.y = 50
    @camera.add(camera)

  getCamera: ->
    @camera

  render: (delta, height) ->
    @velocity.x -= @velocity.x * 10.0 * delta
    @velocity.z -= @velocity.z * 10.0 * delta

    @velocity.y -= 9.823 * 3.0 * delta

    @velocity.z -= 10.0 * delta if Key.isPressed("W")
    @velocity.z += 10.0 * delta if Key.isPressed("S")
    @velocity.x -= 10.0 * delta if Key.isPressed("A")
    @velocity.x += 10.0 * delta if Key.isPressed("D")

    if Key.isPressed("space")
      @velocity.y += 7.0 if @canJump
      @canJump = false

    @camera.translateX(@velocity.x)
    @camera.translateY(@velocity.y)
    @camera.translateZ(@velocity.z)

    if @camera.position.y < height
      @canJump = true
      @velocity.y = 0
      @camera.position.y = height

  handleMouseMove: (event) ->
    movementX = event["movementX"] or event["mozMovementX"] or event["webkitMovementX"] or 0
    movementY = event["movementY"] or event["mozMovementY"] or event["webkitMovementY"] or 0
    @camera.rotation.y -= movementX * 0.002
    @cameraPitch.rotation.x -= movementY * 0.002
    @cameraPitch.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, @cameraPitch.rotation.x))

module.exports = Controls