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

THREE = require("three")
Stats = require("stats-js")
Controls = require("./Controls")
Objects = require("./Objects")

class App

  # Main DOM container for canvas
  container: document.getElementById("app")

  # Window width & height
  width: -> window.innerWidth
  height: -> window.innerHeight

  # Window aspect ratio
  aspect: -> @width() / @height()

  # FPS debugging
  stats: new Stats

  constructor: (opts)->
    @scene = new THREE.Scene
    @camera = new THREE.PerspectiveCamera 75, @aspect(), 1, 10000
    @renderer = new THREE.WebGLRenderer
      devicePixelRatio: opts.pixelRatio
      antialias: opts.antialias

  ### Handle window resizing ###
  handleWindowResize: =>
    @camera.aspect = @aspect()
    @camera.updateProjectionMatrix()
    @renderer.setSize(@width(), @height())

  ### Init all stuff here before rendering ###
  init: =>
    # Init events
    window.addEventListener('resize', @handleWindowResize)

    # Init renderer
    @renderer.setSize(@width(), @height())
    @renderer.setClearColor(0xFFFFFF)
    @renderer.shadowMapEnabled = true
    @container.appendChild(@renderer.domElement)

    # Init stats
    @stats.domElement.style.position = 'absolute'
    @stats.domElement.style.top = '0px'
    @container.appendChild(@stats.domElement)

    # Init controls & camera
    @controls = new Controls(@camera)
    @controlsCamera = @controls.getCamera()

    # Init scene objects
    @redCube = new Objects.ColorCube(10, 10, 10, "red")
    @greenCube = new Objects.ColorCube(10, 10, 10, "green")

    @skyBox = new Objects.SkyBox 8000, 8000, 8000, [
      'front.jpg', 'back.jpg', 'up.jpg', 'down.jpg', 'right.jpg', 'left.jpg'
    ]
    @heightMap = new Objects.HeightMap("textures/height_map.png")

    # Init objects position
    @redCube.position.set(10, 5, -30)
    @greenCube.position.set(-10, 5, -30)
    @heightMap.rotation.x -= Math.PI / 2
    @heightMap.position.y = -50

    # Add objects to scene
    @scene.add(@controlsCamera)
    @scene.add(@redCube)
    @scene.add(@greenCube)
    @scene.add(@skyBox)
    @scene.add(@heightMap)

  ### Render single frame ###
  render: =>
    @controls.render()
    @renderer.render(@scene, @camera)

  ### Animate all frames ###
  animate: =>
    @stats.begin()
    @render()
    @stats.end()
    requestAnimationFrame @animate

  ### Run application ###
  run: =>
    @init()
    @animate()

module.exports = App