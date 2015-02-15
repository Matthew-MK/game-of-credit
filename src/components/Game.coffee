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

Blocker = require("./Blocker")
Controls = require("../modules/Controls")
Objects = require("../modules/Objects")
Player = require("../modules/Player")
StatsComponent = require("./Stats")
helpers = require("../modules/helpers")

mapping = require("../mapping.json")
require("../modules/MD2Character") # three.js extension
{canvas, div} = React.DOM

Game = React.createClass
  stats: new Stats
  textures: {}
  prevTime: 0
  players: {}

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

  onPlayersPosition: (players) ->
    if @socket.id of players
      delete players[@socket.id]

    for id, data of players
      if id of @players
        {x, y, z} = data.position
        {_x, _y, _z} = data.rotation
        console.log data.rotation
        @players[id].root.position.set(x, y, z)
        @players[id].root.rotation.set(_x, _y, _z)
        @players[id].root.rotation.y += Math.PI
      else
        player = new Player(data.position)
        player.scale = 0.5
        @players[id] = player
        @scene.add(player.root)
        console.log "CREATE player", @players[id]

  onPlayerDisconnect: (id) ->
    if id of @players
      @scene.remove(@players[id].root)
      console.log "DELETE player", @players[id]
      delete @players[id]

  initSockets: ->
    @socket = io.connect()
    @socket.on("players-position", @onPlayersPosition)
    @socket.on("player-disconnect", @onPlayerDisconnect)

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

    # Init controls & camera
    @controls = new Controls(@camera)
    @controlsCamera = @controls.getCamera()
    @controlsCamera.position.x = @props.position.x
    @controlsCamera.position.y = @props.position.y
    @controlsCamera.position.z = @props.position.z

    # Init scene objects
    @ambientLight = new THREE.AmbientLight(0x404040)
    @directionalLight = new THREE.DirectionalLight(0xffffff, 0.7)
    @directionalLight.position.set(200, 250, 500)

    @skyBox = new Objects.SkyBox(8000, 8000, 8000, @props.textures.skyBox)
    @heightMap = new Objects.HeightMap(
      @props.heightMap.width,
      @props.heightMap.height,
      @props.textures
    )
    @heightMap.rotation.x -= Math.PI / 2

    @scene.add(@ambientLight)
    @scene.add(@directionalLight)
    @scene.add(@controlsCamera)
    @scene.add(@skyBox)
    @scene.add(@heightMap)

  ###
  Render single frame.
  ###
  renderFrame: ->
    time = performance.now()
    delta = (time - @prevTime) / 1000
    mapX = Math.floor(@controlsCamera.position.x) + (@props.heightMap.width / 2)
    mapZ = Math.floor(@controlsCamera.position.z) + (@props.heightMap.height / 2)
    height = helpers.getPixel(@props.heightMap, mapX, mapZ).r

    @socket.emit "position",
      position: @controlsCamera.position
      rotation: @controlsCamera.rotation

    @controls.render(delta, height) if @state.pointerLocked
    @renderer.render(@scene, @camera)
    @prevTime = time

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
    @initSockets()
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
      Blocker(sendState: @handleBlockerState)
      StatsComponent(stats: @stats)
      canvas
        id: "render"
        ref: "render"
        style:
          width: @state.windowWidth
          height: @state.windowHeight

module.exports = (props = null) -> React.createElement(Game, props)