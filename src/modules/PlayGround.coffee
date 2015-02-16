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

Objects = require("./Objects")

class PlayGround

  meshes: {}

  constructor: (textures) ->
    @meshes.plane = new Objects.Plane(1024, 1024, textures.grass)
    @meshes.redBox = new Objects.ColorCube(20, 20, 20, "red");
    @meshes.skyBox = new Objects.SkyBox(8000, 8000, 8000, textures.skyBox)
    @meshes.blubox = new Objects.ColorCube(80, 20, 10, "blue");

    # Rotations
    @meshes.plane.rotation.x -= Math.PI / 2

    # Positions
    @meshes.redBox.position.set(0, 10, 20)

    # Shadows
    @meshes.plane.receiveShadow = true
    @meshes.redBox.castShadow = true

module.exports = PlayGround