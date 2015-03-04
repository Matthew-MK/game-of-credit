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

Base = require("./Base")
{Plane, TexturedCube, SkyBox} = require("./Objects")

{playGround} = require("../mapping")

class PlayGround extends Base

  meshes: []
  objects: []

  init: (textures) ->

    baseMeshes =
      groundPlane: new Plane(1024, 1024, textures.grass, 16, 16)
      wallPlane: new Plane(1024, 128, textures.wall, 16, 2)
      woodenBox: new THREE.Mesh(
        new THREE.BoxGeometry(15, 15, 15),
        new THREE.MeshLambertMaterial(map: textures.woodCrate)
      )
      containerBox: new TexturedCube(60, 60, 120, textures.metal, true, 2, 1)
      rockBox: new TexturedCube(250, 60, 150, textures.rock, true, 12, 5)
      stepBox: new TexturedCube(30, 15, 10, textures.step, true, 1, 1)

    objects =
      containers: new THREE.Object3D
      crates: new THREE.Object3D
      fortress: new THREE.Object3D
      prison: new THREE.Object3D
      pyramid: new THREE.Object3D
      smallCrates: new THREE.Object3D

    for name, object of playGround
      for item in object.items
        mesh = baseMeshes[item.mesh].clone()
        mesh.position.set(item.position...) if item.position
        mesh.rotation.set(item.rotation...) if item.rotation
        mesh.scale.set(item.scale...) if item.scale
        mesh.castShadow or= item.castShadow
        mesh.receiveShadow or= item.receiveShadow
        @meshes.push(mesh)
        objects[name].add(mesh)
      objects[name].position.set(object.position...) if object.position
      @scene.add(objects[name])

    # TODO add to mapping
    fortressB = objects.fortress.clone()
    fortressB.rotation.y += Math.PI
    @meshes.push(children) for children in fortressB.children
    @scene.add(fortressB)

    # SkyBox
    skyBox = new SkyBox(8000, 8000, 8000, textures.skyBox)
    @scene.add(skyBox)


module.exports = PlayGround