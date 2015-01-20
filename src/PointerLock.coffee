
module.exports = (blocker, instructions) ->
  locked = false
  haveLock =
    "pointerLockElement" of document or
    "mozPointerLockElement" of document or
    "webkitPointerLockElement" of document

  handleLockChange = ->
    locked =
      document.pointerLockElement is blocker or
      document.mozPointerLockElement is blocker or
      document.webkitPointerLockElement is blocker
    blocker.style.opacity = if locked then 0 else 1

  handleClick = ->
    blocker.requestPointerLock =
      blocker.requestPointerLock or
      blocker.mozRequestPointerLock or
      blocker.webkitRequestPointerLock
    blocker.requestPointerLock()

  if haveLock
    document.addEventListener('pointerlockchange', handleLockChange)
    document.addEventListener('mozpointerlockchange', handleLockChange)
    document.addEventListener('webkitpointerlockchange', handleLockChange)
    blocker.addEventListener('click', handleClick)
  else
    instructions.innerHTML = "Your browser doesn't seem to support Pointer Lock API"

  return haveLock