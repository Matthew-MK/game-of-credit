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
Stats = require("stats-js")
Key = require("keymaster")
Blocker = require("./Blocker")
Controls = require("../modules/Controls")
Objects = require("../modules/Objects")
PlayGround = require("../modules/PlayGround")
Sockets = require("../modules/Sockets")
StatsComponent = require("./Stats")
helpers = require("../modules/helpers")

mapping = require("../mapping.json")
require("../modules/MD2Character") # three.js extension
{canvas, div} = React.DOM

Game = React.createClass
  players: {}
  textures: {}
  clock: new THREE.Clock
  stats: new Stats

  getInitialState: ->
    frameCount: 0
    fps: 0
    windowWidth: window.innerWidth
    windowHeight: window.innerHeight
    pointerLocked: false

  handleResize: ->
    @setState
      windowWidth: window.innerWidth
      windowHeight: window.innerHeight

  handleBlockerState: (state) ->
    @setState(pointerLocked: state.pointerLocked)

  handleMouseMove: (e) ->
    @controls.handleMouseMove(e) if @state.pointerLocked

  ###
  Reset frame counter every second and save it as fps
  ###
  resetFrameCount: ->
    setTimeout(@resetFrameCount, 1000)
    @setState
      frameCount: 0
      fps: @state.frameCount

  ###
  Init all three.js stuff here before rendering frames.
  ###
  initScene: ->
    @scene = new THREE.Scene
    @camera = new THREE.PerspectiveCamera 45, @state.windowWidth / @state.windowHeight, 1, 10000
    @renderer = new THREE.WebGLRenderer
      canvas: @refs.render.getDOMNode()
    @renderer.setClearColor(0xFFFFFF)
    @renderer.setSize(@state.windowWidth, @state.windowHeight)
    @renderer.shadowMapEnabled = true

    # Init controls & camera
    @controls = new Controls(@camera)
    @controlsCamera = @controls.getCamera()
    @controlsCamera.position.x = @props.position.x
    @controlsCamera.position.y = @props.position.y
    @controlsCamera.position.z = @props.position.z

    # Init sockets
    @sockets = new Sockets(@props.dataServer, @scene, @players)

    # Init scene objects
    @ambientLight = new THREE.AmbientLight(0x404040)
    @directionalLight = new THREE.DirectionalLight(0xffffff, 0.7)
    @directionalLight.position.set(-280, 260, 500)
    @directionalLight.castShadow = true
    @directionalLight.shadowCameraVisible = true;

    # Init playground
    @playGround = new PlayGround(@props.textures)

    @scene.add(@ambientLight)
    @scene.add(@directionalLight)
    @scene.add(@controlsCamera)
    @scene.add(mesh) for key, mesh of @playGround.meshes
    @shoot = new Objects.Shoot(true)

  ###
  Render single frame.
  ###
  renderFrame: ->
    delta = @clock.getDelta()
    @sockets.update(@controlsCamera)
    @controls.update(delta, @props.position.y) if @state.pointerLocked
    @renderer.render(@scene, @camera)

    if @shoot.shootingDelay
      if Key.isPressed("F")
        @bullet = new Objects.Bullet(@controlsCamera.position, @controlsCamera.rotation._y, @controls.cameraPitch.rotation.x, @scene, 0.5, "yellow", @shoot)
        @scene.add(@bullet)

  ###
  Animate all frames.
  ###
  animate: ->
    @setState frameCount: ++@state.frameCount
    @stats.begin()
    @renderFrame()
    @stats.end()
    requestAnimationFrame @animate

  ###
  Invoked once, only on the client (not on the server), immediately after
  the initial rendering occurs.
  At this point in the lifecycle, the component has a DOM representation.
  ###
  componentDidMount: ->
    @resetFrameCount()
    @initScene()
    window.addEventListener('resize', @handleResize)
    window.addEventListener('mousemove', @handleMouseMove)
    @animate()

  ###
  Invoked before rendering when new props or state are being received.
  This method is not called for the initial render or when forceUpdate is used.
  ###
  shouldComponentUpdate: ->
    return true

  ###
  Invoked immediately before rendering when new props or state are being
  received. This method is not called for the initial render.
  ###
  componentWillUpdate: ->
    @camera.aspect = window.innerWidth / window.innerHeight
    @camera.updateProjectionMatrix()
    @renderer.setSize(window.innerWidth, window.innerHeight)

  ###
  Invoked immediately before a component is unmounted from the DOM.
  Perform any necessary cleanup in this method, such as invalidating timers
  or cleaning up any DOM elements that were created in componentDidMount.
  ###
  componentWillUnmount: ->
    window.removeEventListener('resize', @handleResize)
    window.addEventListener('mousemove', @handleMouseMove)

  render: ->
    div id: "wrapper",
      StatsComponent(stats: @stats)
      Blocker(sendState: @handleBlockerState)
      canvas
        id: "render"
        ref: "render"
        style:
          width: @state.windowWidth
          height: @state.windowHeight

module.exports = (props = null) -> React.createElement(Game, props)