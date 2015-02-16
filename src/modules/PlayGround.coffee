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
    @meshes.plane = new Objects.Plane(1024, 1024, textures.grass, 16, 16)
    @meshes.redBox = new Objects.ColorCube(20, 20, 20, "red");
    @meshes.skyBox = new Objects.SkyBox(8000, 8000, 8000, textures.skyBox)
    @meshes.blueBox = new Objects.ColorCube(80, 20, 10, "blue");

    @meshes.planeFront = new Objects.Plane(1024, 128, textures.wall, 16, 2)
    @meshes.planeLeft = new Objects.Plane(1024, 128, textures.wall, 16, 2)
    @meshes.planeRight = new Objects.Plane(1024, 128, textures.wall, 16, 2)
    @meshes.planeBack = new Objects.Plane(1024, 128, textures.wall, 16, 2)

    @meshes.ramp = new Objects.Plane(64, 132, textures.mud, 1, 4)

    @meshes.crate = new Objects.TexturedCube(30, 30, 30, textures.woodCrate, false)
    @meshes.crate_2 = new Objects.TexturedCube(30, 30, 30, textures.woodCrate, false)
    @meshes.crate_3 = new Objects.TexturedCube(30, 30, 30, textures.woodCrate, false)
    @meshes.crate_4 = new Objects.TexturedCube(30, 30, 30, textures.woodCrate, false)
    @meshes.crate_5 = new Objects.TexturedCube(30, 30, 30, textures.woodCrate, false)
    @meshes.crate_6 = new Objects.TexturedCube(30, 30, 30, textures.woodCrate, false)
    @meshes.crate_7 = new Objects.TexturedCube(30, 30, 30, textures.woodCrate, false)
    @meshes.crate_8 = new Objects.TexturedCube(30, 30, 30, textures.woodCrate, false)
    @meshes.crate_9 = new Objects.TexturedCube(30, 30, 30, textures.woodCrate, false)
    @meshes.crate_10 = new Objects.TexturedCube(30, 30, 30, textures.woodCrate, false)
    @meshes.crate_11 = new Objects.TexturedCube(30, 30, 30, textures.woodCrate, false)
    @meshes.crate_12 = new Objects.TexturedCube(30, 30, 30, textures.woodCrate, false)
    @meshes.crate_13 = new Objects.TexturedCube(30, 30, 30, textures.woodCrate, false)
    @meshes.crate_14 = new Objects.TexturedCube(30, 30, 30, textures.woodCrate, false)
    @meshes.crate_15 = new Objects.TexturedCube(30, 30, 30, textures.woodCrate, false)
    @meshes.crate_16 = new Objects.TexturedCube(30, 30, 30, textures.woodCrate, false)
    @meshes.crate_17 = new Objects.TexturedCube(30, 30, 30, textures.woodCrate, false)
    @meshes.crate_18 = new Objects.TexturedCube(30, 30, 30, textures.woodCrate, false)
    @meshes.crate_19 = new Objects.TexturedCube(30, 30, 30, textures.woodCrate, false)


    @meshes.container = new Objects.TexturedCube(30, 30, 60, textures.metal, true, 2, 1)
    @meshes.container_2 = new Objects.TexturedCube(30, 30, 60, textures.metal, true, 2, 1)
    @meshes.container_3 = new Objects.TexturedCube(30, 30, 60, textures.metal, true, 2, 1)
    @meshes.container_4 = new Objects.TexturedCube(30, 30, 60, textures.metal, true, 2, 1)
    @meshes.container_5 = new Objects.TexturedCube(30, 30, 60, textures.metal, true, 2, 1)
    @meshes.container_6 = new Objects.TexturedCube(30, 30, 60, textures.metal, true, 2, 1)
    @meshes.container_7 = new Objects.TexturedCube(30, 30, 60, textures.metal, true, 2, 1)
    @meshes.container_8 = new Objects.TexturedCube(30, 30, 60, textures.metal, true, 2, 1)
    @meshes.container_9 = new Objects.TexturedCube(30, 30, 60, textures.metal, true, 2, 1)
    @meshes.container_10 = new Objects.TexturedCube(30, 30, 60, textures.metal, true, 2, 1)
    @meshes.container_11 = new Objects.TexturedCube(30, 30, 60, textures.metal, true, 2, 1)
    @meshes.container_12 = new Objects.TexturedCube(30, 30, 60, textures.metal, true, 2, 1)
    @meshes.container_13 = new Objects.TexturedCube(30, 30, 60, textures.metal, true, 2, 1)
    @meshes.container_14 = new Objects.TexturedCube(30, 30, 60, textures.metal, true, 2, 1)
    @meshes.container_15 = new Objects.TexturedCube(30, 30, 60, textures.metal, true, 2, 1)
    @meshes.container_16 = new Objects.TexturedCube(30, 30, 60, textures.metal, true, 2, 1)
    @meshes.container_17 = new Objects.TexturedCube(30, 30, 60, textures.metal, true, 2, 1)


    @meshes.rock = new Objects.TexturedCube(250, 60, 150, textures.rock, true, 12, 5)
    @meshes.rock_2 = new Objects.TexturedCube(300, 60, 150, textures.rock, true, 12, 5)

    @meshes.step = new Objects.TexturedCube(30, 15, 10, textures.step, true, 1, 1)
    @meshes.step_2 = new Objects.TexturedCube(30, 15, 10, textures.step, true, 1, 1)
    @meshes.step_3 = new Objects.TexturedCube(30, 15, 10, textures.step, true, 1, 1)
    @meshes.step_4 = new Objects.TexturedCube(30, 15, 10, textures.step, true, 1, 1)
    @meshes.step_5 = new Objects.TexturedCube(30, 15, 10, textures.step, true, 1, 1)
    @meshes.step_6 = new Objects.TexturedCube(30, 15, 10, textures.step, true, 1, 1)
    @meshes.step_7 = new Objects.TexturedCube(30, 15, 10, textures.step, true, 1, 1)
    @meshes.step_8 = new Objects.TexturedCube(30, 15, 10, textures.step, true, 1, 1)
    @meshes.step_9 = new Objects.TexturedCube(30, 15, 10, textures.step, true, 1, 1)





    # Rotations
    @meshes.plane.rotation.x -= Math.PI / 2
    @meshes.planeFront.rotation.y = Math.PI
    @meshes.planeLeft.rotation.y -= Math.PI / 2
    @meshes.planeRight.rotation.y = Math.PI / 2

    @meshes.container_11.rotation.y = Math.PI/2
    @meshes.container_17.rotation.y = Math.PI/2
    @meshes.ramp.rotation.x -= 2*Math.PI/3

    # Positions
    @meshes.step.position.set(467, 7.5, -357)
    @meshes.step_2.position.set(467, 22.5, -357)
    @meshes.step_3.position.set(467, 37.5, -357)
    @meshes.step_4.position.set(467, 7.5, -347)
    @meshes.step_5.position.set(467, 22.5, -347)
    @meshes.step_6.position.set(467, 7.5, -337)

    @meshes.step_7.position.set(-342, 67.5, 367)
    @meshes.step_8.position.set(-282, 67.5, 367)
    @meshes.step_9.position.set(-232, 67.5, 367)

    @meshes.planeFront.position.set(0, 64, 512)
    @meshes.planeBack.position.set(0, 64, -512)
    @meshes.planeLeft.position.set(512, 64, 0)
    @meshes.planeRight.position.set(-512, 64, 0)

    @meshes.ramp.position.set(-390, 27, 310)

    @meshes.redBox.position.set(0, 10, 20)
    @meshes.blueBox.position.set(0, 10, 50)

    @meshes.crate.position.set(497, 15, 497)
    @meshes.crate_2.position.set(497, 45, 497)
    @meshes.crate_3.position.set(467, 15, 497)
    @meshes.crate_4.position.set(497, 75, -378)
    @meshes.crate_5.position.set(437, 75, -378)
    @meshes.crate_6.position.set(377, 75, -378)
    @meshes.crate_7.position.set(317, 75, -378)
    @meshes.crate_8.position.set(276, 75, -378)
    @meshes.crate_9.position.set(276, 75, -438)
    @meshes.crate_10.position.set(276, 75, -497)

    @meshes.crate_11.position.set(467, 15, 437)
    @meshes.crate_12.position.set(327, 15, 437)
    @meshes.crate_13.position.set(227, 15, 437)
    @meshes.crate_14.position.set(127, 15, 437)
    @meshes.crate_15.position.set(27, 15, 437)
    @meshes.crate_16.position.set(-27, 15, 437)
    @meshes.crate_17.position.set(-127, 15, 437)

    @meshes.crate_18.position.set(-127, 15, 200)
    @meshes.crate_19.position.set(-127, 15, -350)



    @meshes.container.position.set(400, 15, 400)
    @meshes.container_2.position.set(-250, 15, -352)
    @meshes.container_3.position.set(-352, 15, 0)
    @meshes.container_4.position.set(-322, 15, 0)
    @meshes.container_5.position.set(-352, 45, 0)
    @meshes.container_6.position.set(-382, 15, 0)

    @meshes.container_7.position.set(-322, 15, 60)
    @meshes.container_8.position.set(-352, 45, 60)
    @meshes.container_9.position.set(-382, 15, 60)
    @meshes.container_10.position.set(-322, 15, 120)
    @meshes.container_11.position.set(-337, 15, 165)

    @meshes.container_12.position.set(337, 15, 165)
    @meshes.container_13.position.set(337, 45, 165)
    @meshes.container_14.position.set(397, 15, 165)
    @meshes.container_15.position.set(455, 15, -50)
    @meshes.container_16.position.set(285, 15, 228)
    @meshes.container_17.position.set(-50, 15, -182)



    @meshes.rock.position.set(387, 30, -437)
    @meshes.rock_2.position.set(-362, 30, 437)


    # Shadows
    @meshes.plane.receiveShadow = true
    @meshes.redBox.castShadow = true
    @meshes.redBox.receiveShadow = true

    @meshes.planeFront.castShadow = true
    @meshes.planeFront.receiveShadow = true
    @meshes.planeBack.castShadow = true
    @meshes.planeBack.receiveShadow = true
    @meshes.planeLeft.castShadow = true
    @meshes.planeLeft.receiveShadow = true
    @meshes.planeRight.castShadow = true
    @meshes.planeRight.receiveShadow = true


    @meshes.container.castShadow = true
    @meshes.container.receiveShadow = true
    @meshes.container_2.castShadow = true
    @meshes.container_2.receiveShadow = true
    @meshes.container_3.castShadow = true
    @meshes.container_3.receiveShadow = true
    @meshes.container_4.castShadow = true
    @meshes.container_4.receiveShadow = true
    @meshes.container_5.castShadow = true
    @meshes.container_5.receiveShadow = true
    @meshes.container_6.castShadow = true
    @meshes.container_6.receiveShadow = true
    @meshes.container_7.castShadow = true
    @meshes.container_7.receiveShadow = true
    @meshes.container_8.castShadow = true
    @meshes.container_8.receiveShadow = true
    @meshes.container_9.castShadow = true
    @meshes.container_9.receiveShadow = true
    @meshes.container_10.castShadow = true
    @meshes.container_10.receiveShadow = true
    @meshes.container_11.castShadow = true
    @meshes.container_11.receiveShadow = true
    @meshes.container_12.castShadow = true
    @meshes.container_12.receiveShadow = true
    @meshes.container_13.castShadow = true
    @meshes.container_13.receiveShadow = true
    @meshes.container_14.castShadow = true
    @meshes.container_14.receiveShadow = true
    @meshes.container_15.castShadow = true
    @meshes.container_15.receiveShadow = true
    @meshes.container_16.castShadow = true
    @meshes.container_16.receiveShadow = true
    @meshes.container_17.castShadow = true
    @meshes.container_17.receiveShadow = true

    @meshes.rock.receiveShadow = true
    @meshes.rock_2.receiveShadow = true
    @meshes.rock_2.castShadow = true

    @meshes.crate_2.castShadow = true
    @meshes.crate_3.castShadow = true
    @meshes.crate_4.castShadow = true
    @meshes.crate_5.castShadow = true
    @meshes.crate_6.castShadow = true
    @meshes.crate_7.castShadow = true
    @meshes.crate_8.castShadow = true
    @meshes.crate_10.castShadow = true
    @meshes.crate_11.castShadow = true
    @meshes.crate_12.castShadow = true
    @meshes.crate_13.castShadow = true
    @meshes.crate_14.castShadow = true
    @meshes.crate_15.castShadow = true
    @meshes.crate_16.castShadow = true
    @meshes.crate_17.castShadow = true
    @meshes.crate_18.castShadow = true
    @meshes.crate_19.castShadow = true

    @meshes.step_7.castShadow = true
    @meshes.step_7.castShadow = true
    @meshes.step_8.castShadow = true
    @meshes.step_8.castShadow = true
    @meshes.step_9.castShadow = true
    @meshes.step_9.castShadow = true




module.exports = PlayGround