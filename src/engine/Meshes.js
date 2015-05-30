/**
 * Copyright 2015 Jan Svager
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule createModels
 **/

/* global THREE */
import { createMonster } from "./Monster";
import { repeatTexture, setMeshProps } from "../utils/Helpers";
import { forEach, map } from "underscore";
import mapping from "./mapping.js";


export function createMeshes(textures, models) {

  const { Mesh, BoxGeometry, PlaneBufferGeometry } = THREE;

  const geometry = {
    bricks: new BoxGeometry(30, 15, 10),
    crate: new BoxGeometry(15, 15, 15),
    container: new BoxGeometry(60, 60, 120),
    ground: new PlaneBufferGeometry(1024, 1024),
    rock: new BoxGeometry(250, 60, 150),
    skyBox: new BoxGeometry(5000, 5000, 5000),
    wall: new PlaneBufferGeometry(1024, 128)
  };

  const material = {
    bricks: new THREE.MeshLambertMaterial({
      map: repeatTexture(textures.simple.bricks, [1, 1])
    }),
    container: new THREE.MeshLambertMaterial({
      map: repeatTexture(textures.simple.container, [2, 2])
    }),
    grass: new THREE.MeshLambertMaterial({
      map: repeatTexture(textures.simple.grass, [16, 16])
    }),
    wall: new THREE.MeshLambertMaterial({
      map: repeatTexture(textures.simple.wall, [16, 2])
    }),
    crate: new THREE.MeshLambertMaterial({
      map: repeatTexture(textures.simple.crate, [1, 1])
    }),
    rock: new THREE.MeshLambertMaterial({
      map: repeatTexture(textures.simple.rock, [12, 5])
    }),
    skyBox: (() => {
      const shader = THREE.ShaderLib.cube;
      var uniforms = THREE.UniformsUtils.clone(shader.uniforms);
      uniforms.tCube.value = textures.cube.skyBox;
      return new THREE.ShaderMaterial({
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: uniforms,
        depthWrite: false,
        side: THREE.BackSide
      });
    })()
  };

  const meshes = {
    bricks: new Mesh(geometry.bricks, material.bricks),
    container: new Mesh(geometry.container, material.container),
    wall: new Mesh(geometry.wall, material.wall),
    crate: new Mesh(geometry.crate, material.crate),
    ground: new Mesh(geometry.ground, material.grass),
    rock: new Mesh(geometry.rock, material.rock),
    skyBox: new Mesh(geometry.skyBox, material.skyBox)
  };

  // create meshes based on mapping file
  const meshList = [];
  const objectList = map(mapping, objProps => {
    const obj3D = new THREE.Object3D();
    forEach(objProps.items, props => {
      const mesh = setMeshProps(meshes[props.mesh].clone(), props);
      obj3D.add(mesh);
      meshList.push(mesh);
    });
    return setMeshProps(obj3D, objProps);
  });


  const monsterProps = {
    body: {
      model: models.ratamahattaBody,
      texture: textures.simple.ratamahattaBody
    },
    weapon: {
      model: models.ratamahattaWeapon,
      texture: textures.simple.ratamahattaWeapon
    }
  };

  const monster = createMonster(monsterProps);
  objectList.push(monster);

  return {
    meshList,
    objectList,

    update(delta) {
      forEach(monster.children, child => child.updateAnimation(delta * 1000));
    }
  };
}

