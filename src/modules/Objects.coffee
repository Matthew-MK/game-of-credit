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

class ColorCube extends THREE.Mesh
  constructor: (@width, @height, @depth, @color) ->
    super(
      new THREE.BoxGeometry(@width, @height, @depth),
      new THREE.MeshBasicMaterial(color: @color)
    )

class SkyBox extends THREE.Mesh
  constructor: (@width, @height, @depth, textures, path = "textures/") ->
    sides = []
    sides.push(path + texture) for texture in textures
    shader = THREE.ShaderLib["cube"]
    shader.uniforms["tCube"].value = THREE.ImageUtils.loadTextureCube(sides)
    super(
      new THREE.BoxGeometry(@width, @height, @depth),
      new THREE.ShaderMaterial
        fragmentShader: shader.fragmentShader
        vertexShader: shader.vertexShader
        uniforms: shader.uniforms
        depthWrite: false
        side: THREE.BackSide
    )

exports.ColorCube = ColorCube
exports.SkyBox = SkyBox