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
Key = require("keymaster")

Base = require("./Base")
{Bullet} = require("./Objects")

actions = require("../../actions")
store = require("../../store")

class Controls extends Base

  defaultHeight: 12
  defaultSpeed: 10

  rayCaster: new THREE.Raycaster
  velocity: new THREE.Vector3

  # Events
  animation: "stand"
  fired: false
  jumped: false
  moved: false
  sprinted: false

  intersects: []

  directions: {
    axe: new THREE.Vector3(0, 1, 0)
    default: new THREE.Vector3(0, 0, 1)
    down: new THREE.Vector3(0, -1, 0)
  }

  init: (@player) ->
    @cameraPitch = @camera
    @cameraYaw = new THREE.Object3D
    @cameraYaw.add(@cameraPitch)

    # Add default height to default player position
    position = @player.get("position")
    rotation = @player.get("rotation")

    position.y += @defaultHeight
#    player.onFire = @handleFire
#    player.onStopFire = => @fired = false

    # Set camera default position & rotation
    @cameraYaw.position.copy(position)
    @cameraYaw.rotation.y = rotation.y

    @updateProps()
    @scene.add(@cameraYaw)

  ###
  Update class properties based on class states
  ###
  updateProps: ->
    @position = @cameraYaw.position
    x = @cameraPitch.rotation._x
    y = @cameraYaw.rotation._y
    @rotation = new THREE.Vector3(x, y)
    @animation = "stand"
    @animation = "crwalk" if @moved
    @animation = "jump" if @jumped
    @animation = "run" if @moved and @sprinted
    @animation = "attack" if @fired

  getCamera: ->
    @cameraYaw

  getIntersect: (direction, far = Infinity) ->
    @rayCaster.set(@cameraYaw.position, direction)
    @rayCaster.far = far
    intersections = @rayCaster.intersectObjects(@playGround.meshes)
    return if intersections.length > 0 then intersections[0] else false

  update: (delta, playing) ->
    return if not playing

    @updateProps()

    # Gravity
    @velocity.y -= 9.823 * delta

    # Controls
    keyW = Key.isPressed("W")
    keyS = Key.isPressed("S")
    keyA = Key.isPressed("A")
    keyD = Key.isPressed("D")

    # Check if moving with sprint
    @moved = keyW or keyS or keyA or keyD
    @sprinted = Key.shift
    speed = if @sprinted then @defaultSpeed * 2 else @defaultSpeed

    # Intersects
    distance = @getIntersect(@directions.down, 1000).distance
    @height = Math.abs(Math.round(@position.y - distance)) + @defaultHeight

    angle = Math.PI / 4
    direction = @directions.default.clone().applyAxisAngle(@directions.axe, @rotation.y)
    @intersects[0] = !!@getIntersect(direction, speed)

    for idx in [1..7]
      direction = direction.applyAxisAngle(@directions.axe, angle)
      @intersects[idx] = !!@getIntersect(direction, speed)

    intersectBack = @intersects[7] or @intersects[0] or @intersects[1]
    intersectRight = @intersects[1] or @intersects[2] or @intersects[3]
    intersectFront = @intersects[3] or @intersects[4] or @intersects[5]
    intersectLeft =  @intersects[5] or @intersects[6] or @intersects[7]

    if @moved
      @velocity.z -= speed * delta if keyW and not intersectFront
      @velocity.z += speed * delta if keyS and not intersectBack
      @velocity.x -= speed * delta if keyA and not intersectLeft
      @velocity.x += speed * delta if keyD and not intersectRight

    # Jumping
    if Key.isPressed("space")
      @velocity.y += 3.0 if not @jumped
      @jumped = true

    # Actual moving of player
    @cameraYaw.translateX(@velocity.x)
    @cameraYaw.translateY(@velocity.y)
    @cameraYaw.translateZ(@velocity.z)

    # Ground check
    if @cameraYaw.position.y < @height
      @jumped = false
      @velocity.y = 0
      @cameraYaw.position.y = @height

    @velocity.x -= @velocity.x * @defaultSpeed * delta
    @velocity.z -= @velocity.z * @defaultSpeed * delta

    state = store.get()
    {fired} = state.get("player").toJS()
    if fired
      @fireBullet()
      actions.playerEndFire()

  fireBullet: =>
    @fired = true
    bullet = new Bullet(@scene, @position, @rotation, @playGround.meshes)
    bullet.fire (killedMesh) =>
      {uuid} = killedMesh
      for id, player of @players
        {meshBody, meshWeapon} = player
        if uuid is meshBody.uuid or uuid is meshWeapon.uuid
          @sockets.sendKill(id)
          break

  handleMouseMove: (event) ->
    movementX = event["movementX"] or event["mozMovementX"] or event["webkitMovementX"] or 0
    movementY = event["movementY"] or event["mozMovementY"] or event["webkitMovementY"] or 0
    @cameraYaw.rotation.y -= movementX * 0.002
    @cameraPitch.rotation.x -= movementY * 0.002
    @cameraPitch.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, @cameraPitch.rotation.x))

module.exports = Controls