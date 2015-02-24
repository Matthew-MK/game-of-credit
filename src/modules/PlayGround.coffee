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

{Plane, TexturedCube, SkyBox, AmmoBox} = require("./Objects")

class PlayGround

  meshes: []

  constructor: (textures) ->

    vec = (x, y, z) -> new THREE.Vector3(x, y, z)

    # SkyBox
    skyBox = new SkyBox(8000, 8000, 8000, textures.skyBox)
    @meshes.push(skyBox)

    # Prison
    prison = new THREE.Object3D

    planeGround = new Plane(1024, 1024, textures.grass, 16, 16)
    planeGround.rotation.x -= Math.PI / 2
    prison.add(planeGround)
    @meshes.push(planeGround)

    planeFront = new Plane(1024, 128, textures.wall, 16, 2)
    planeFront.rotation.y = Math.PI
    planeFront.position.set(0, 64, 512)
    prison.add(planeFront)
    @meshes.push(planeFront)

    planeLeft = new Plane(1024, 128, textures.wall, 16, 2)
    planeLeft.rotation.y -= Math.PI / 2
    planeLeft.position.set(512, 64, 0)
    prison.add(planeLeft)
    @meshes.push(planeLeft)

    planeRight = new Plane(1024, 128, textures.wall, 16, 2)
    planeRight.rotation.y = Math.PI / 2
    planeRight.position.set(-512, 64, 0)
    prison.add(planeRight)
    @meshes.push(planeRight)

    planeBack = new Plane(1024, 128, textures.wall, 16, 2)
    planeBack.position.set(0, 64, -512)
    prison.add(planeBack)
    @meshes.push(planeBack)

    # Pyramid
    @pyramid = new THREE.Object3D

    positions = [
      vec(15, 22.5, 0)
      vec(0, 22.5, 15)
      vec(15, 22.5, 15)
      vec(0, 22.5, -15)
      vec(-15, 22.5, 0)
      vec(-15, 22.5, -15)
      vec(-15, 22.5, 15)
      vec(15, 22.5, -15)
      vec(-30, 7.5, 30)
      vec(-30, 7.5, -30)
      vec(30, 7.5, -30)
      vec(30, 7.5, 30)
      vec(15, 7.5, 30)
      vec(0, 7.5, 30)
      vec(-15, 7.5, 30)
      vec(30, 7.5, 15)
      vec(30, 7.5, 0)
      vec(30, 7.5, -15)
      vec(-30, 7.5, -15)
      vec(-30, 7.5, 0)
      vec(-30, 7.5, 15)
      vec(-15, 7.5, -30)
      vec(0, 7.5, -30)
      vec(15, 7.5, -30)
      vec(0, 37.5, 0)
    ]
    for position in positions
      create = new TexturedCube(15, 15, 15, textures.woodCrate, false)
      position.z += 100
      create.position.copy(position)
      @pyramid.add(create)
      @meshes.push(create)

    # Ramp
    ramp = new Plane(64, 132, textures.mud, 1, 4)
    ramp.rotation.x -= 2*Math.PI/3
    ramp.position.set(-390, 27, 305)
    @meshes.push(ramp)

    rock = new TexturedCube(250, 60, 150, textures.rock, true, 12, 5)
    rock.position.set(387, 30, -437)
    @meshes.push(rock)

    rock = new TexturedCube(300, 60, 150, textures.rock, true, 12, 5)
    rock.position.set(-362, 30, 437)
    @meshes.push(rock)

    # Steps
    positions = [
      vec(467, 7.5, -357)
      vec(467, 22.5, -357)
      vec(467, 37.5, -357)
      vec(467, 7.5, -347)
      vec(467, 22.5, -347)
      vec(467, 7.5, -337)
      vec(-342, 67.5, 367)
      vec(-282, 67.5, 367)
      vec(-232, 67.5, 367)
    ]
    for position in positions
      step = new TexturedCube(30, 15, 10, textures.step, true, 1, 1)
      step.position.copy(position)
      @meshes.push(step)

    # Containers
    positions = [
      vec(350, 30, 350)
      vec(-250, 30, -352)
      vec(-352, 30, 0)
      vec(-352, 90, 0)
      vec(-292, 30, 0)
      vec(-412, 30, 0)
      vec(-292, 30, 120)
      vec(-352, 90, 120)
      vec(-412, 30, 120)
      vec(-292, 30, 180)
      vec(-337, 30, -90)
      vec(337, 30, 165)
      vec(337, 90, 165)
      vec(397, 30, 165)
      vec(455, 30, -50)
      vec(200, 30, 228)
      vec(-50, 30, -182)
    ]
    for position, i in positions
      container = new TexturedCube(60, 60, 120, textures.metal, true, 2, 1)
      container.position.copy(position)
      container.rotation.y = Math.PI/2 if i == 10 or i == 16
      @meshes.push(container)

    # Creates
    positions = [
      vec(497, 15, 497)
      vec(497, 45, 497)
      vec(467, 15, 497)
      vec(497, 75, -378)
      vec(437, 75, -378)
      vec(377, 75, -378)
      vec(317, 75, -378)
      vec(276, 75, -378)
      vec(276, 75, -438)
      vec(276, 75, -497)
      vec(467, 15, 437)
      vec(327, 15, 437)
      vec(227, 15, 437)
      vec(127, 15, 437)
      vec(27, 15, 437)
      vec(-27, 15, 437)
      vec(-127, 15, 437)
      vec(-127, 15, 200)
      vec(-127, 15, -350)
      vec(-307, 75, -0)
      vec(395, 15, 262)
    ]
    for position in positions
      crate = new TexturedCube(30, 30, 30, textures.woodCrate, false)
      crate.position.copy(position)
      @meshes.push(crate)

    # Small creates
    positions = [
      vec(-254.5, 7.5, 0)
      vec(-254.5, 22.5, 0)
      vec(-254.5, 37.5, 0)
      vec(-239.5, 7.5, 0)
      vec(-239.5, 22.5, 0)
      vec(-224.5, 7.5, 0)
      vec(238, 7.5, 278)
      vec(238, 22.5, 278)
      vec(238, 37.5, 278)
      vec(253, 7.5, 278)
      vec(253, 22.5, 278)
      vec(268, 7.5, 278)
    ]
    for position in positions
      smallCreate = new TexturedCube(15, 15, 15, textures.woodCrate, false)
      smallCreate.position.copy(position)
      @meshes.push(smallCreate)

    # Shadows
    for mesh in @meshes
      mesh.castShadow = true
      mesh.receiveShadow = true

    # Only planeGround not casting shadows
    @meshes[1].castShadow = false

module.exports = PlayGround