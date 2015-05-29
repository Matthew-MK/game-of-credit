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
import { repeatTexture } from "../utils/Helpers";
import { createMonster } from "./Monster";

export function createMeshes(textures, models) {

  const { Mesh } = THREE;
  const { PI } = Math;

  const geometry = {
    ground: new THREE.PlaneBufferGeometry(1024, 1024),
    wall: new THREE.PlaneBufferGeometry(1024, 128),
    skyBox: new THREE.BoxGeometry(5000, 5000, 5000)
  };

  const material = {
    grass: new THREE.MeshLambertMaterial({
      map: repeatTexture(textures.simple.grass, [16, 16])
    }),
    wall: new THREE.MeshLambertMaterial({
      map: repeatTexture(textures.simple.wall, [16, 2])
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

  const mapping = {
    frontWall: {
      position: [0, 64, -512]
    },
    leftWall: {
      position: [-512, 64, 0],
      rotation: [0, PI / 2, 0],
      castShadow: true
    },
    rightWall: {
      position: [512, 64, 0],
      rotation: [0, -PI / 2, 0],
      receiveShadow: true
    },
    backWall: {
      position: [0, 64, 512],
      rotation: [0, PI, 0],
      castShadow: true,
      receiveShadow: true
    },
    ground: {
      rotation: [-PI / 2, 0, 0],
      receiveShadow: true
    },
    monster: {
      scale: [0.5, 0.5, 0.5],
      position: [30, 12, -100]
    }
  };

  // Meshes
  const wallMesh = new Mesh(geometry.wall, material.wall);
  const meshes = {
    frontWall: wallMesh.clone(),
    leftWall: wallMesh.clone(),
    rightWall: wallMesh.clone(),
    backWall: wallMesh.clone(),
    ground: new Mesh(geometry.ground, material.grass),
    skyBox: new Mesh(geometry.skyBox, material.skyBox),
    monster: createMonster({
      body: {
        model: models.ratamahattaBody,
        texture: textures.simple.ratamahattaBody
      },
      weapon: {
        model: models.ratamahattaWeapon,
        texture: textures.simple.ratamahattaWeapon
      }
    })
  };

  Object.keys(mapping).forEach(key => {
    const mesh = meshes[key];
    const { position, rotation, scale, castShadow, receiveShadow } = mapping[key];
    if (position) mesh.position.set(...position);
    if (rotation) mesh.rotation.set(...rotation);
    if (scale) mesh.scale.set(...scale);
    if (castShadow) mesh.castShadow = castShadow;
    if (receiveShadow) mesh.receiveShadow = receiveShadow;

  });

  return {
    items: Object.keys(meshes).map(key => meshes[key]),
    update(delta) {
      meshes.monster.children.forEach(child =>
        child.updateAnimation(delta * 1000)
      );
    }
  };
}

