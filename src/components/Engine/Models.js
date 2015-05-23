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

export function createModels(textures) {

  const { Mesh } = THREE;
  const { PI } = Math;

  function repeatTexture(texture, repeat) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(...repeat);
    return texture;
  }

  const geometry = {
    ground: new THREE.PlaneBufferGeometry(1024, 1024),
    wall: new THREE.PlaneBufferGeometry(1024, 128),
    skyBox: new THREE.BoxGeometry(5000, 5000, 5000)
  };

  const material = {
    grass: new THREE.MeshLambertMaterial({
      map: repeatTexture(textures.grass, [16, 16])
    }),
    wall: new THREE.MeshLambertMaterial({
      map: repeatTexture(textures.wall, [16, 2])
    }),
    skyBox: (() => {
      const shader = THREE.ShaderLib.cube;
      var uniforms = THREE.UniformsUtils.clone(shader.uniforms);
      uniforms["tCube"].value = textures.skyBox;
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
    box: {
      position: [0, 20, 0]
    }
  };

  // Meshes
  const wallMesh = new Mesh(geometry.wall, material.wall);
  const meshes = {
    box: new Mesh(
      new THREE.BoxGeometry(10, 10, 10),
      new THREE.MeshBasicMaterial({color: "red"})
    ),
    frontWall: wallMesh.clone(),
    leftWall: wallMesh.clone(),
    rightWall: wallMesh.clone(),
    backWall: wallMesh.clone(),
    ground: new Mesh(geometry.ground, material.grass),
    skyBox: new Mesh(geometry.skyBox, material.skyBox)
  };

  Object.keys(mapping).forEach(key => {
    const mesh = meshes[key];
    const { position, rotation, castShadow, receiveShadow } = mapping[key];
    if (position) mesh.position.set(...position);
    if (rotation) mesh.rotation.set(...rotation);
    if (castShadow) mesh.castShadow = castShadow;
    if (receiveShadow) mesh.receiveShadow = receiveShadow;
  });
  return Object.keys(meshes).map(key => meshes[key]);
}

