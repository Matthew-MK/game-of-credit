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
import mapping from "./mapping.js";
import { forEach, map, range } from "underscore";
import { repeatTexture, setMeshProps } from "../utils/Helpers";


export function createMeshes(textures, models) {

  const { Mesh, BoxGeometry, PlaneBufferGeometry, MeshLambertMaterial } = THREE;

  const geometry = {
    bricks: new BoxGeometry(30, 15, 10),
    bullet: new THREE.SphereGeometry(5, 20, 20),
    container: new BoxGeometry(60, 60, 120),
    crate: new BoxGeometry(15, 15, 15),
    ground: new PlaneBufferGeometry(1024, 1024),
    monsterBody: models.ratamahattaBody.geometry,
    monsterWeapon: models.ratamahattaWeapon.geometry,
    rock: new BoxGeometry(250, 60, 150),
    skyBox: new BoxGeometry(5000, 5000, 5000),
    wall: new PlaneBufferGeometry(1024, 128)
  };

  const material = {
    bricks: new MeshLambertMaterial({
      map: repeatTexture(textures.simple.bricks, [1, 1])
    }),
    bullet: new THREE.MeshBasicMaterial({ color: 0xffff00 }),
    container: new MeshLambertMaterial({
      map: repeatTexture(textures.simple.container, [2, 2])
    }),
    grass: new MeshLambertMaterial({
      map: repeatTexture(textures.simple.grass, [16, 16])
    }),
    wall: new MeshLambertMaterial({
      map: repeatTexture(textures.simple.wall, [16, 2])
    }),
    crate: new MeshLambertMaterial({
      map: repeatTexture(textures.simple.crate, [1, 1])
    }),
    rock: new MeshLambertMaterial({
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
    })(),
    monsterBody: new MeshLambertMaterial({
      map: textures.simple.ratamahattaBody,
      morphTargets: true, morphNormals: true,
      specular: 0xffffff, shininess: 60,
      shading: THREE.SmoothShading,
      vertexColors: THREE.FaceColors
    }),
    monsterWeapon: new MeshLambertMaterial({
      map: textures.simple.ratamahattaWeapon,
      morphTargets: true, morphNormals: true,
      specular: 0xffffff, shininess: 60,
      shading: THREE.SmoothShading,
      vertexColors: THREE.FaceColors
    })
  };

  const meshes = {
    bricks: new Mesh(geometry.bricks, material.bricks),
    bullet: new Mesh(geometry.bullet, material.bullet),
    container: new Mesh(geometry.container, material.container),
    wall: new Mesh(geometry.wall, material.wall),
    crate: new Mesh(geometry.crate, material.crate),
    ground: new Mesh(geometry.ground, material.grass),
    rock: new Mesh(geometry.rock, material.rock),
    skyBox: new Mesh(geometry.skyBox, material.skyBox),
    createMonsterBody: () => {
      const mesh = new THREE.MorphAnimMesh(geometry.monsterBody, material.monsterBody);
      mesh.parseAnimations();
      mesh.playAnimation("stand", 10);
      return mesh;
    },
    createMonsterWeapon: () => {
      const mesh = new THREE.MorphAnimMesh(geometry.monsterWeapon, material.monsterWeapon);
      mesh.parseAnimations();
      mesh.playAnimation("stand", 10);
      return mesh;
    }
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

  function createMonster() {
    const obj = new THREE.Object3D();
    obj.add(meshes.createMonsterBody());
    obj.add(meshes.createMonsterWeapon());
    obj.scale.set(0.5, 0.5, 0.5);
    return obj;
  }

  function createBullet() {
    return meshes.bullet.clone();
  }

  // Create pools with some meshes
  const monsterPool = map(range(6), createMonster);
  const bulletPool = map(range(10), createBullet);

  return {
    meshList,
    objectList,

    getMonster() {
      return monsterPool.length > 0 ? monsterPool.pop() : createMonster();
    },
    freeMonster(monster) {
      monsterPool.push(monster);
    },
    getBullet() {
      return bulletPool.length > 0 ? bulletPool.pop() : createBullet();
    },
    freeBullet(bullet) {
      bulletPool.push(bullet);
    }
  };
}

