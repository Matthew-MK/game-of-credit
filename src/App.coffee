###
Copyright 2014 Jan Svager & Michael Muller

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
  constructor: (opts)->
    @width = opts.width
    @height = opts.height
    @aspectRatio = @width / @height
    @container = opts.container

    @stats = new Stats
    @scene = new THREE.Scene
    @camera = new THREE.PerspectiveCamera(75, @aspectRatio, 1, 1000)
    @renderer = new THREE.WebGLRenderer
      devicePixelRatio: opts.devicePixelRatio
      antialias: opts.antialias

  ### Init all stuff here before rendering ###
  init: =>

    # Init renderer
    @renderer.setSize(@width, @height)
    @renderer.setClearColor(0xCCCCCC)
    @renderer.shadowMapEnabled = true
    @container.appendChild(@renderer.domElement)

    # Init stats
    @stats.domElement.style.position = 'absolute'
    @stats.domElement.style.top = '0px'
    @container.appendChild(@stats.domElement)


    @scene.add(@camera)

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
      new THREE.PlaneBufferGeometry(2000, 2000, 100, 100),
      new THREE.MeshBasicMaterial(color: "green")
    )
    plane.rotation.x -= Math.PI / 2
    @scene.add(plane)

    @controls = new Controls(@camera)
    @scene.add(@controls.getObject())

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