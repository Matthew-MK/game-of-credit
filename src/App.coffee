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
    @camera = new THREE.PerspectiveCamera 75, @aspect(), 1, 1000
    @renderer = new THREE.WebGLRenderer
      devicePixelRatio: opts.pixelRatio
      antialias: opts.antialias

    # events
    window.addEventListener('resize', @handleWindowResize)

  ### Handle window resizing ###
  handleWindowResize: ->
    @camera.aspect = @aspect()
    @camera.updateProjectionMatrix()
    @renderer.setSize(@width(), @height())

  ### Init all stuff here before rendering ###
  init: =>

    # Init renderer
    @renderer.setSize(@width(), @height())
    @renderer.setClearColor(0xCCCCCC)
    @renderer.shadowMapEnabled = true
    @container.appendChild(@renderer.domElement)

    # Init stats
    @stats.domElement.style.position = 'absolute'
    @stats.domElement.style.top = '0px'
    @container.appendChild(@stats.domElement)

    #skybox test
    path = '(textures/'
    sides = [path + 'back.jpg', path + 'down.jpg', path + 'left.jpg', path + 'right.jpg', path + 'up.jpg', path + 'front.jpg']
    scCube = THREE.ImageUtils.loadTextureCube(sides)
    scCube.format = THREE.RGBFormat
    skyShader = THREE.ShaderLib["cube"]
    skyShader.uniforms["tCube"].value = scCube
    skyMaterial = new THREE.ShaderMaterial(
      fragmentShader: skyShader.fragmentShader, vertexShader: skyShader.vertexShader,
      uniforms: skyShader.uniforms, depthWrite: false, side: THREE.BackSide
    )

    skybox = new THREE.Mesh(
      new THREE.CubeGeometry(1000, 1000, 1000),
      skyMaterial
    )
    skybox.position.set(0, 10, 0)
    @scene.add(skybox)

    cube = new THREE.Mesh(
      new THREE.BoxGeometry(10,10,10),
      new THREE.MeshBasicMaterial(color: "red")
    )
    cube.position.set(10, 10, -30)
    @scene.add(cube)

    cube = new THREE.Mesh(
      new THREE.BoxGeometry(10,10,10),
      new THREE.MeshBasicMaterial(color: "yellow")
    )
    cube.position.set(-10, 10, -30)
    @scene.add(cube)

    plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(1000, 1000, 100, 100),
      new THREE.MeshBasicMaterial(color: "green")
    )
    plane.rotation.x -= Math.PI / 2
    @scene.add(plane)

    @controls = new Controls(@camera)
    @scene.add(@controls.getCamera())

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