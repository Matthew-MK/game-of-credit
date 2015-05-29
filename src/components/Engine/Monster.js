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
 * @providesModule Monster
 **/

/* global THREE */

/**
 * Monster factory
 * @return {Object}
 */
export function createMonster({body, weapon}) {

  const bodyGeometry = body.model.geometry;
  const weaponGeometry = weapon.model.geometry;

  const bodyTexture = body.texture;
  const weaponTexture = weapon.texture;
  const monster = new THREE.Object3D();

  const bodyMaterial = new THREE.MeshLambertMaterial({
    map: bodyTexture,
    morphTargets: true, morphNormals: true,
    specular: 0xffffff, shininess: 60,
    shading: THREE.SmoothShading,
    vertexColors: THREE.FaceColors
  });
  const weaponMaterial = new THREE.MeshLambertMaterial({
    map: weaponTexture,
    morphTargets: true, morphNormals: true,
    specular: 0xffffff, shininess: 60,
    shading: THREE.SmoothShading,
    vertexColors: THREE.FaceColors
  });

  const bodyMesh = new THREE.MorphAnimMesh(bodyGeometry, bodyMaterial);
  const weaponMesh = new THREE.MorphAnimMesh(weaponGeometry, weaponMaterial);

  bodyMesh.parseAnimations();
  bodyMesh.playAnimation("stand", 10);
  weaponMesh.parseAnimations();
  weaponMesh.playAnimation("stand", 10);

  monster.add(bodyMesh);
  monster.add(weaponMesh);
  monster.rotation.y += Math.PI / 2;

  return monster;
}
