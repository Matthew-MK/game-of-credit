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
React = require("react")
{div, span} = React.DOM

Blocker = React.createClass
  getInitialState: ->
    havePointerLock: false
    pointerLocked: false

  handleClick: ->
    blocker = @refs.blocker.getDOMNode()
    blocker.requestPointerLock =
      blocker["requestPointerLock"] or
      blocker["mozRequestPointerLock"] or
      blocker["webkitRequestPointerLock"]
    blocker.requestPointerLock()

  handleLockChange: ->
    blocker = @refs.blocker.getDOMNode()
    pointerLocked =
      document["pointerLockElement"] is blocker or
      document["mozPointerLockElement"] is blocker or
      document["webkitPointerLockElement"] is blocker
    @setState
      pointerLocked: pointerLocked
    @props.sendState(@state)

  componentDidMount: ->
    havePointerLock =
      "pointerLockElement" of document or
      "mozPointerLockElement" of document or
      "webkitPointerLockElement" of document
    @setState(havePointerLock: havePointerLock)

    if havePointerLock
      document.addEventListener('pointerlockchange', @handleLockChange)
      document.addEventListener('mozpointerlockchange', @handleLockChange)
      document.addEventListener('webkitpointerlockchange', @handleLockChange)

  componentWillUnmount: ->
    document.removeEventListener('pointerlockchange', @handleLockChange)
    document.removeEventListener('mozpointerlockchange', @handleLockChange)
    document.removeEventListener('webkitpointerlockchange', @handleLockChange)

  render: ->
    if @state.havePointerLock
      title = "Click to play"
      message = "(W, A, S, D = Move, SPACE = Jump, MOUSE = Look around)"
    else
      title = "Sorry"
      message = "Your browser doesn't seem to support Pointer Lock API"

    div {
      id: "blocker"
      ref: "blocker"
      onClick: @handleClick
      style:
        opacity: if @state.pointerLocked then 0 else 1
      },
      div {id: "instructions"},
        span {}, title
        span {}, message

module.exports = (props = null) -> React.createElement(Blocker, props)