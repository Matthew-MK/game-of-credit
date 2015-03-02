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

# Components
StatsComponent = require("./Stats")

# Modules
Controls = require("../modules/Controls")
{Bullet} = require("../modules/Objects")
PlayGround = require("../modules/PlayGround")
Sockets = require("../modules/Sockets")

# Others
{PureRenderMixin} = React["addons"]
{canvas} = React.DOM

Core = React.createClass

  mixins: [PureRenderMixin]

  players: {}
  textures: {}
  clock: new THREE.Clock

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
    @scene = new THREE.Scene
    @camera = new THREE.PerspectiveCamera 45, @props.width / @props.height, 1, 10000
    @renderer = new THREE.WebGLRenderer
      canvas: @refs.render.getDOMNode()
      antialias: off
    @renderer.setSize(@props.width, @props.height)
    @renderer.shadowMapEnabled = on

    # Init lights
    @ambientLight = new THREE.AmbientLight(0x404040)
    @directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    @directionalLight.position.set(-520, 520, 1000)
    @directionalLight.castShadow = true

    @directionalLight.shadowCameraLeft = -720
    @directionalLight.shadowCameraRight = 700
    @directionalLight.shadowCameraBottom = -300
    @directionalLight.shadowCameraNear = 550
    @directionalLight.shadowCameraFar = 1850

    # Init playground
    @playGround = new PlayGround(@props.textures)

    # Init sockets
    @sockets = new Sockets(@props.dataServer, @scene, @players, @playGround)

    # Init controls & camera
    @controls = new Controls(@scene, @camera, @sockets, @props.player, @players, @playGround.meshes)

    # Add meshes to scene
    @scene.add(@ambientLight)
    @scene.add(@directionalLight)
    @scene.add(@controls.getCamera())
    @scene.add(mesh) for mesh in @playGround.meshes

  ###
  Render single frame.
  ###
  renderFrame: ->
    delta = @clock.getDelta()
    @controls.update(delta, @props.playing)
    @sockets.update(@controls)
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