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
StatsComponent = require("./Stats")
helpers = require("../modules/helpers")

TextureMapping = require("../texture.mapping.json")
{canvas, div} = React.DOM

Game = React.createClass
  stats: new Stats
  textures: {}

  getInitialState: ->
    frameCount: 0
    fps: 0
    windowWidth: window.innerWidth
    windowHeight: window.innerHeight
    pointerLocked: false
    loading: true

  handleResize: ->
    @setState
      windowWidth: window.innerWidth
      windowHeight: window.innerHeight

  handleBlockerState: (state) ->
    @setState(pointerLocked: state.pointerLocked)

  handleLoading: (item, loaded, total) ->
    console.log "#{Math.round(100 * loaded / total)} %\t #{item}"
    if loaded == total
      @setState(loading: false)
      @heightMapImage = helpers.getImageData(@textures.heightMap.image)

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
  init: ->
    # Loading textures
    THREE.DefaultLoadingManager.onProgress = @handleLoading
    for key, path of TextureMapping
      if typeof path is 'string'
        @textures[key] = new THREE.ImageUtils.loadTexture(path)
      else
        @textures[key] = new THREE.ImageUtils.loadTextureCube(path)

    @scene = new THREE.Scene
    @camera = new THREE.PerspectiveCamera 45, @state.windowWidth / @state.windowHeight, 1, 10000
    @renderer = new THREE.WebGLRenderer
      canvas: @refs.render.getDOMNode()
    @renderer.setClearColor(0xFFFFFF)
    @renderer.setSize(@state.windowWidth, @state.windowHeight)

    # Init controls & camera
    @controls = new Controls(@camera)

    @controlsCamera = @controls.getCamera()

    # Init scene objects
    @redCube = new Objects.ColorCube(10, 10, 10, "red")
    @greenCube = new Objects.ColorCube(10, 10, 10, "green")
    @skyBox = new Objects.SkyBox(8000, 8000, 8000, @textures.skyBox)
    @heightMap = new Objects.HeightMap(512, 512, @textures)

    @redCube.position.set(10, 50, -30)
    @greenCube.position.set(-10, 50, -30)
    @camera.position.set(0,0,0)
    @heightMap.rotation.x -= Math.PI / 2

    @scene.add(@controlsCamera)
    @scene.add(@redCube)
    @scene.add(@skyBox)
    @scene.add(@heightMap)

  ###
  Render single frame.
  ###
  renderFrame: ->
    mapX = Math.round(@controlsCamera.position.x) + @heightMapImage.width / 2
    mapY = Math.round(@controlsCamera.position.z) + @heightMapImage.height / 2
    height = helpers.getPixel(@heightMapImage, mapX, mapY).r
    @controls.render(height)
    @renderer.render(@scene, @camera)

  ###
  Animate all frames.
  ###
  animate: ->
    if @state.pointerLocked and not @loading
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
    @init()
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