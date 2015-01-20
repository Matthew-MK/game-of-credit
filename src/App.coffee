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

class App
  constructor: (opts)->
    @width = opts.width
    @height = opts.height
    @aspectRatio = @width / @height
    @container = opts.container

    @stats = new Stats
    @scene = new THREE.Scene
    @camera = new THREE.PerspectiveCamera(45, @aspectRatio, 1, 1000)
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

    @camera.position.set(0, 0, 100)
    @scene.add(@camera)

    cube = new THREE.Mesh(
      new THREE.BoxGeometry(10,10,10),
      new THREE.MeshBasicMaterial(color: "red")
    )
    @scene.add(cube)

  ### Render single frame ###
  render: =>
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