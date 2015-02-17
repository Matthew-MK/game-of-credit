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

  objects: []
  offset: 10
  velocity: new THREE.Vector3
  speed: 10

  # Events
  fired: false
  jumped: false
  moved: false
  sprinted: false

  constructor: (camera, @defaultPosition) ->
    @cameraPitch = camera
    @camera = new THREE.Object3D
    @camera.add(camera)
    @camera.position.copy(@defaultPosition)
    @rayCaster = new THREE.Raycaster()
    @height = @defaultPosition.y

  setIntersects: (meshes) ->
    @objects.push(mesh) for key, mesh of meshes

  getIntersect: (direction) ->
    @rayCaster.set(@camera.position, direction)
    intersections = @rayCaster.intersectObjects(@objects)
    return intersections[0] if intersections.length > 0

  update: (delta) ->

    @velocity.x -= @velocity.x * 10.0 * delta
    @velocity.z -= @velocity.z * 10.0 * delta

    # Gravity
    @velocity.y -= 9.823 * 3.0 * delta

    # Controls
    keyW = Key.isPressed("W")
    keyS = Key.isPressed("S")
    keyA = Key.isPressed("A")
    keyD = Key.isPressed("D")

    @moved = keyW or keyS or keyA or keyD
    @sprinted = Key.shift
    speed = if @sprinted then @speed * 2 else @speed

    # Intersects
    intersect = @getIntersect(new THREE.Vector3(0, -1, 0))
    distance = Math.round(intersect.distance)
    @height = Math.abs(Math.round(@camera.position.y - distance)) + @defaultPosition.y

    x = -Math.sin(@camera.rotation._y)
    z = -Math.cos(@camera.rotation._y)
    distance = @getIntersect(new THREE.Vector3(x, 0, z)).distance
    intersectFront = distance > speed

    x = Math.sin(@camera.rotation._y)
    z = Math.cos(@camera.rotation._y)
    distance = @getIntersect(new THREE.Vector3(x, 0, z)).distance
    intersectBack = distance > speed

    x = -Math.sin(@camera.rotation._y + Math.PI/2)
    z = -Math.cos(@camera.rotation._y + Math.PI/2)
    distance = @getIntersect(new THREE.Vector3(x, 0, z)).distance
    intersectLeft = distance > speed

    x = Math.sin(@camera.rotation._y + Math.PI/2)
    z = Math.cos(@camera.rotation._y + Math.PI/2)
    distance = @getIntersect(new THREE.Vector3(x, 0, z)).distance
    intersectRight = distance > speed

    if @moved
      @velocity.z -= speed * delta if keyW and intersectFront
      @velocity.z += speed * delta if keyS and intersectBack
      @velocity.x -= speed * delta if keyA and intersectLeft
      @velocity.x += speed * delta if keyD and intersectRight

    if Key.isPressed("space")
      @velocity.y += 7.0 if not @jumped
      @jumped = true

    @camera.translateX(@velocity.x)
    @camera.translateY(@velocity.y)
    @camera.translateZ(@velocity.z)

    if @camera.position.y < @height
      @jumped = false
      @velocity.y = 0
      @camera.position.y = @height

  handleMouseMove: (event) ->
    movementX = event["movementX"] or event["mozMovementX"] or event["webkitMovementX"] or 0
    movementY = event["movementY"] or event["mozMovementY"] or event["webkitMovementY"] or 0
    @camera.rotation.y -= movementX * 0.002
    @cameraPitch.rotation.x -= movementY * 0.002
    @cameraPitch.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, @cameraPitch.rotation.x))

module.exports = Controls