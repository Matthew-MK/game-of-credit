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
    @meshes.skyBox = new Objects.SkyBox(8000, 8000, 8000, textures.skyBox)

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
    @meshes.crate_20 = new Objects.TexturedCube(30, 30, 30, textures.woodCrate, false)
    @meshes.crate_21 = new Objects.TexturedCube(30, 30, 30, textures.woodCrate, false)


    @meshes.small_crate = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_2 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_3 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_4 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_5 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_6 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_7 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_8 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_9 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_10 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_11 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_12 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_13 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_14 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_15 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_16 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_17 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_18 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_19 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_20 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_21 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_22 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_23 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_24 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_25 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_26 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_27 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_28 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_29 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_30 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_31 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_32 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_33 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_34 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_35 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_36 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)
    @meshes.small_crate_37 = new Objects.TexturedCube(15, 15, 15, textures.woodCrate, false)

    @meshes.container = new Objects.TexturedCube(60, 60, 120, textures.metal, true, 2, 1)
    @meshes.container_2 = new Objects.TexturedCube(60, 60, 120, textures.metal, true, 2, 1)
    @meshes.container_3 = new Objects.TexturedCube(60, 60, 120, textures.metal, true, 2, 1)
    @meshes.container_4 = new Objects.TexturedCube(60, 60, 120, textures.metal, true, 2, 1)
    @meshes.container_5 = new Objects.TexturedCube(60, 60, 120, textures.metal, true, 2, 1)
    @meshes.container_6 = new Objects.TexturedCube(60, 60, 120, textures.metal, true, 2, 1)
    @meshes.container_7 = new Objects.TexturedCube(60, 60, 120, textures.metal, true, 2, 1)
    @meshes.container_8 = new Objects.TexturedCube(60, 60, 120, textures.metal, true, 2, 1)
    @meshes.container_9 = new Objects.TexturedCube(60, 60, 120, textures.metal, true, 2, 1)
    @meshes.container_10 = new Objects.TexturedCube(60, 60, 120, textures.metal, true, 2, 1)
    @meshes.container_11 = new Objects.TexturedCube(60, 60, 120, textures.metal, true, 2, 1)
    @meshes.container_12 = new Objects.TexturedCube(60, 60, 120, textures.metal, true, 2, 1)
    @meshes.container_13 = new Objects.TexturedCube(60, 60, 120, textures.metal, true, 2, 1)
    @meshes.container_14 = new Objects.TexturedCube(60, 60, 120, textures.metal, true, 2, 1)
    @meshes.container_15 = new Objects.TexturedCube(60, 60, 120, textures.metal, true, 2, 1)
    @meshes.container_16 = new Objects.TexturedCube(60, 60, 120, textures.metal, true, 2, 1)
    @meshes.container_17 = new Objects.TexturedCube(60, 60, 120, textures.metal, true, 2, 1)

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
    @meshes.crate_20.position.set(-307, 75, -0)
    @meshes.crate_21.position.set(395, 15, 262)


    @meshes.small_crate_2.position.set(-254.5, 7.5, 0)
    @meshes.small_crate_3.position.set(-254.5, 22.5, 0)
    @meshes.small_crate_4.position.set(-254.5, 37.5, 0)
    @meshes.small_crate_5.position.set(-239.5, 7.5, 0)
    @meshes.small_crate_6.position.set(-239.5, 22.5, 0)
    @meshes.small_crate_7.position.set(-224.5, 7.5, 0)
    @meshes.small_crate_8.position.set(238, 7.5, 278)
    @meshes.small_crate_9.position.set(238, 22.5, 278)
    @meshes.small_crate_10.position.set(238, 37.5, 278)
    @meshes.small_crate_11.position.set(253, 7.5, 278)
    @meshes.small_crate_12.position.set(253, 22.5, 278)
    @meshes.small_crate_13.position.set(268, 7.5, 278)


    @meshes.small_crate.position.set(0, 37.5, 0)
    @meshes.small_crate_14.position.set(15, 22.5, 0)
    @meshes.small_crate_15.position.set(0, 22.5, 15)
    @meshes.small_crate_16.position.set(15, 22.5, 15)
    @meshes.small_crate_17.position.set(0, 22.5, -15)
    @meshes.small_crate_18.position.set(-15, 22.5, 0)
    @meshes.small_crate_19.position.set(-15, 22.5, -15)
    @meshes.small_crate_20.position.set(-15, 22.5, 15)
    @meshes.small_crate_21.position.set(15, 22.5, -15)
    @meshes.small_crate_22.position.set(-30, 7.5, 30)
    @meshes.small_crate_23.position.set(-30, 7.5, -30)
    @meshes.small_crate_24.position.set(30, 7.5, -30)
    @meshes.small_crate_25.position.set(30, 7.5, 30)
    @meshes.small_crate_26.position.set(15, 7.5, 30)
    @meshes.small_crate_27.position.set(0, 7.5, 30)
    @meshes.small_crate_28.position.set(-15, 7.5, 30)
    @meshes.small_crate_29.position.set(30, 7.5, 15)
    @meshes.small_crate_30.position.set(30, 7.5, 0)
    @meshes.small_crate_31.position.set(30, 7.5, -15)
    @meshes.small_crate_32.position.set(-30, 7.5, -15)
    @meshes.small_crate_33.position.set(-30, 7.5, 0)
    @meshes.small_crate_34.position.set(-30, 7.5, 15)
    @meshes.small_crate_35.position.set(-15, 7.5, -30)
    @meshes.small_crate_36.position.set(0, 7.5, -30)
    @meshes.small_crate_37.position.set(15, 7.5, -30)


    @meshes.container.position.set(350, 30, 350)
    @meshes.container_2.position.set(-250, 30, -352)
    @meshes.container_3.position.set(-352, 30, 0)
    @meshes.container_4.position.set(-352, 90, 0)
    @meshes.container_5.position.set(-292, 30, 0)
    @meshes.container_6.position.set(-412, 30, 0)
    @meshes.container_7.position.set(-292, 30, 120)
    @meshes.container_8.position.set(-352, 90, 120)
    @meshes.container_9.position.set(-412, 30, 120)
    @meshes.container_10.position.set(-292, 30, 180)
    @meshes.container_11.position.set(-337, 30, -90)
    @meshes.container_12.position.set(337, 30, 165)
    @meshes.container_13.position.set(337, 90, 165)
    @meshes.container_14.position.set(397, 30, 165)
    @meshes.container_15.position.set(455, 30, -50)
    @meshes.container_16.position.set(200, 30, 228)
    @meshes.container_17.position.set(-50, 30, -182)

    @meshes.rock.position.set(387, 30, -437)
    @meshes.rock_2.position.set(-362, 30, 437)

    # Shadows
    @meshes.plane.receiveShadow = true

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

    @meshes.crate.castShadow = true
    @meshes.crate_2.castShadow = true
    @meshes.crate_3.castShadow = true
    @meshes.crate_4.castShadow = true
    @meshes.crate_5.castShadow = true
    @meshes.crate_6.castShadow = true
    @meshes.crate_7.castShadow = true
    @meshes.crate_8.castShadow = true
    @meshes.crate_9.castShadow = true
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
    @meshes.crate_20.castShadow = true
    @meshes.crate_21.castShadow = true


    @meshes.crate.receiveShadow = true
    @meshes.crate_2.receiveShadow = true
    @meshes.crate_3.receiveShadow = true
    @meshes.crate_4.receiveShadow = true
    @meshes.crate_5.receiveShadow = true
    @meshes.crate_6.receiveShadow = true
    @meshes.crate_7.receiveShadow = true
    @meshes.crate_8.receiveShadow = true
    @meshes.crate_9.receiveShadow = true
    @meshes.crate_10.receiveShadow = true
    @meshes.crate_11.receiveShadow = true
    @meshes.crate_12.receiveShadow = true
    @meshes.crate_13.receiveShadow = true
    @meshes.crate_14.receiveShadow = true
    @meshes.crate_15.receiveShadow = true
    @meshes.crate_16.receiveShadow = true
    @meshes.crate_17.receiveShadow = true
    @meshes.crate_18.receiveShadow = true
    @meshes.crate_19.receiveShadow = true
    @meshes.crate_20.receiveShadow = true
    @meshes.crate_21.receiveShadow = true

    @meshes.step.castShadow = true
    @meshes.step_2.castShadow = true
    @meshes.step_3.castShadow = true
    @meshes.step_4.castShadow = true
    @meshes.step_5.castShadow = true
    @meshes.step_6.castShadow = true
    @meshes.step_7.castShadow = true
    @meshes.step_8.castShadow = true
    @meshes.step_9.castShadow = true

    @meshes.small_crate.castShadow = true
    @meshes.small_crate_2.castShadow = true
    @meshes.small_crate_3.castShadow = true
    @meshes.small_crate_4.castShadow = true
    @meshes.small_crate_5.castShadow = true
    @meshes.small_crate_6.castShadow = true
    @meshes.small_crate_7.castShadow = true
    @meshes.small_crate_8.castShadow = true
    @meshes.small_crate_9.castShadow = true
    @meshes.small_crate_10.castShadow = true
    @meshes.small_crate_11.castShadow = true
    @meshes.small_crate_12.castShadow = true
    @meshes.small_crate_13.castShadow = true
    @meshes.small_crate_14.castShadow = true
    @meshes.small_crate_15.castShadow = true
    @meshes.small_crate_16.castShadow = true
    @meshes.small_crate_17.castShadow = true
    @meshes.small_crate_18.castShadow = true
    @meshes.small_crate_19.castShadow = true
    @meshes.small_crate_20.castShadow = true
    @meshes.small_crate_21.castShadow = true
    @meshes.small_crate_22.castShadow = true
    @meshes.small_crate_23.castShadow = true
    @meshes.small_crate_24.castShadow = true
    @meshes.small_crate_25.castShadow = true
    @meshes.small_crate_26.castShadow = true
    @meshes.small_crate_27.castShadow = true
    @meshes.small_crate_28.castShadow = true
    @meshes.small_crate_29.castShadow = true
    @meshes.small_crate_30.castShadow = true
    @meshes.small_crate_31.castShadow = true
    @meshes.small_crate_32.castShadow = true
    @meshes.small_crate_33.castShadow = true
    @meshes.small_crate_34.castShadow = true
    @meshes.small_crate_35.castShadow = true
    @meshes.small_crate_36.castShadow = true
    @meshes.small_crate_37.castShadow = true

    @meshes.small_crate.receiveShadow = true
    @meshes.small_crate_2.receiveShadow = true
    @meshes.small_crate_3.receiveShadow = true
    @meshes.small_crate_4.receiveShadow = true
    @meshes.small_crate_5.receiveShadow = true
    @meshes.small_crate_6.receiveShadow = true
    @meshes.small_crate_7.receiveShadow = true
    @meshes.small_crate_8.receiveShadow = true
    @meshes.small_crate_9.receiveShadow = true
    @meshes.small_crate_10.receiveShadow = true
    @meshes.small_crate_11.receiveShadow = true
    @meshes.small_crate_12.receiveShadow = true
    @meshes.small_crate_13.receiveShadow = true
    @meshes.small_crate_14.receiveShadow = true
    @meshes.small_crate_15.receiveShadow = true
    @meshes.small_crate_16.receiveShadow = true
    @meshes.small_crate_17.receiveShadow = true
    @meshes.small_crate_18.receiveShadow = true
    @meshes.small_crate_19.receiveShadow = true
    @meshes.small_crate_20.receiveShadow = true
    @meshes.small_crate_21.receiveShadow = true
    @meshes.small_crate_22.receiveShadow = true
    @meshes.small_crate_23.receiveShadow = true
    @meshes.small_crate_24.receiveShadow = true
    @meshes.small_crate_25.receiveShadow = true
    @meshes.small_crate_26.receiveShadow = true
    @meshes.small_crate_27.receiveShadow = true
    @meshes.small_crate_28.receiveShadow = true
    @meshes.small_crate_29.receiveShadow = true
    @meshes.small_crate_30.receiveShadow = true
    @meshes.small_crate_31.receiveShadow = true
    @meshes.small_crate_32.receiveShadow = true
    @meshes.small_crate_33.receiveShadow = true
    @meshes.small_crate_34.receiveShadow = true
    @meshes.small_crate_35.receiveShadow = true
    @meshes.small_crate_36.receiveShadow = true
    @meshes.small_crate_37.receiveShadow = true


module.exports = PlayGround