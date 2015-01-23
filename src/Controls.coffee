THREE = require("three")

class Controls
  pointerLocked: false
  havePointerLock:
    "pointerLockElement" of document or
    "mozPointerLockElement" of document or
    "webkitPointerLockElement" of document
  blocker: document.getElementById("blocker")
  instructions: document.getElementById("instructions")
  keys:
    SPACE: false
    A: false
    D: false
    S: false
    W: false
  velocity: new THREE.Vector3
  prevTime: performance.now()

  constructor: (camera, @enabled=true) ->

    camera.rotation.set(0, 0, 0)

    @cameraPitch = camera

    @camera = new THREE.Object3D
    @camera.position.y = 10
    @camera.add(camera)

    if @havePointerLock
      @blocker.addEventListener('click', @handleClick)
      document.addEventListener('pointerlockchange', @handleLockChange)
      document.addEventListener('mozpointerlockchange', @handleLockChange)
      document.addEventListener('webkitpointerlockchange', @handleLockChange)
      document.addEventListener('mousemove', @handleMouseMove)
      document.addEventListener("keydown", @handleKeyDown)
      document.addEventListener("keyup", @handleKeyUp)
    else
      @enabled = false
      @instructions.innerHTML = "Your browser doesn't seem to support Pointer Lock API"

  getObject: ->
    @camera

  render: =>
    if @enabled and @pointerLocked

      time = performance.now()

      delta = (time - @prevTime) / 1000

      @velocity.x -= @velocity.x * 10.0 * delta
      @velocity.z -= @velocity.z * 10.0 * delta

      @velocity.z -= 10.0 * delta if @keys.W
      @velocity.z += 10.0 * delta if @keys.S
      @velocity.x -= 10.0 * delta if @keys.A
      @velocity.x += 10.0 * delta if @keys.D

      @camera.translateX(@velocity.x)
      @camera.translateX(@velocity.y)
      @camera.translateZ(@velocity.z)

      @prevTime = time


  handleLockChange: =>
    @pointerLocked =
      document["pointerLockElement"] is @blocker or
      document["mozPointerLockElement"] is @blocker or
      document["webkitPointerLockElement"] is @blocker
    @blocker.style.opacity = if @pointerLocked then 0 else 1

  handleClick: =>
    @blocker.requestPointerLock =
      @blocker["requestPointerLock"] or
      @blocker["mozRequestPointerLock"] or
      @blocker["webkitRequestPointerLock"]
    @blocker.requestPointerLock()

  handleMouseMove: (event) =>
    return if not @pointerLocked
    movementX = event["movementX"] or event["mozMovementX"] or event["webkitMovementX"] or 0
    movementY = event["movementY"] or event["mozMovementY"] or event["webkitMovementY"] or 0
    @camera.rotation.y -= movementX * 0.002
    @cameraPitch.rotation.x -= movementY * 0.002
    @cameraPitch.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, @cameraPitch.rotation.x))

  handleKeyDown: (e) =>
    switch e.keyCode
      when 32 then @keys.SPACE = true
      when 65 then @keys.A = true
      when 68 then @keys.D = true
      when 83 then @keys.S = true
      when 87 then @keys.W = true

  handleKeyUp: (e) =>
    switch e.keyCode
      when 32 then @keys.SPACE = false
      when 65 then @keys.A = false
      when 68 then @keys.D = false
      when 83 then @keys.S = false
      when 87 then @keys.W = false


module.exports = Controls