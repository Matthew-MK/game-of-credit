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

# Libraries
React = require("react")

# Modules
Controls = require("../modules/Controls")
{Bullet} = require("../modules/Objects")
PlayGround = require("../modules/PlayGround")
Lights = require("../modules/Lights")
Sockets = require("../modules/Sockets")

# Others
{PureRenderMixin} = React["addons"]
{canvas} = React.DOM

Core = React.createClass

  mixins: [PureRenderMixin]

  getInitialState: ->
    frameCount: 0

  handleMouseMove: (e) ->
    @controls.handleMouseMove(e) if @props.playing

  ###
  Reset frame counter every second and save it as fps
  ###
  resetFrameCount: ->
    setTimeout(@resetFrameCount, 1000)
    @fps = @state.frameCount
    @setState(frameCount: 0)

  ###
  Init all three.js stuff here before rendering frames.
  ###
  initScene: ->
    @players = {}
    @clock = new THREE.Clock

    @controls = new Controls
    @playGround = new PlayGround
    @lights = new Lights
    @sockets = new Sockets

    @scene = new THREE.Scene
    @camera = new THREE.PerspectiveCamera 45, @props.width / @props.height, 1, 10000
    @renderer = new THREE.WebGLRenderer
      canvas: @refs.render.getDOMNode()
      antialias: off
      precision: "mediump"
    @renderer.setSize(@props.width, @props.height)
    @renderer.shadowMapEnabled = on

    # Register dependencies
    @playGround.register
      scene: @scene

    @lights.register
      scene: @scene

    @sockets.register
      controls: @controls
      playGround: @playGround
      players: @players
      scene: @scene

    @controls.register
      camera: @camera
      playGround: @playGround
      players: @players
      scene: @scene
      sockets: @sockets

    # Init modules
    @playGround.init(@props.textures)
    @lights.init()
    @sockets.init(@props.socketServer)
    @controls.init(@props.player)

  ###
  Render single frame.
  ###
  renderFrame: ->
    delta = @clock.getDelta()
    @controls.update(delta, @props.playing)
    player.update(delta) for id, player of @players
    @renderer.render(@scene, @camera)

  ###
  Animate all frames.
  ###
  animate: ->
    @setState(frameCount: ++@state.frameCount)
    @renderFrame()
    requestAnimationFrame @animate

  ###
  Invoked once, only on the client (not on the server), immediately after
  the initial rendering occurs.
  At this point in the lifecycle, the component has a DOM representation.
  ###
  componentDidMount: ->
    @resetFrameCount()
    @initScene()
    window.addEventListener('mousemove', @handleMouseMove)
    @animate()

  ###
  Invoked immediately before rendering when new props or state are being
  received. This method is not called for the initial render.
  ###
  componentWillUpdate: ->
    # Update only if width or height changed
    if @width != @props.width or @height != @props.height
      @width = @props.width
      @height = @props.height
      @camera.aspect = @width / @height
      @camera.updateProjectionMatrix()
      @renderer.setSize(@width, @height)

  ###
  Invoked immediately before a component is unmounted from the DOM.
  Perform any necessary cleanup in this method, such as invalidating timers
  or cleaning up any DOM elements that were created in componentDidMount.
  ###
  componentWillUnmount: ->
    window.removeEventListener('mousemove', @handleMouseMove)

  render: ->
    canvas
      id: "render"
      ref: "render"

module.exports = React.createFactory(Core)