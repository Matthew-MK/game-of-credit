THREE = require("three")
STATS = require("stats-js")

class App
  constructor: (opts)->
    @width = opts.width
    @height = opts.height
    @aspectRatio = @width / @height
    @container = opts.container

    @stats = new STATS
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