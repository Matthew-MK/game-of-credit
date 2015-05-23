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
 * @providesModule textures
 **/

/* global THREE */
import path from "path";

/**
 * Load all textures
 * @param basePath {String}
 * @param onProgress {Function} callback (item, loaded, total)
 * @return {Object}
 */
export function loadTextures(basePath, onProgress) {
  THREE.DefaultLoadingManager.onProgress = onProgress;

  const loadTexture = filename =>
    THREE.ImageUtils.loadTexture(path.join(basePath, filename));

  const loadTextureCube = filenames =>
    THREE.ImageUtils.loadTextureCube(filenames.map(filename =>
        path.join(basePath, filename)
    ));

  return {
    bricks: loadTexture("materials/bricks.jpg"),
    grass: loadTexture("materials/grass-512.jpg"),
    rock: loadTexture("materials/rock-512.jpg"),
    wall: loadTexture("materials/wall.jpg"),
    woodCrate: loadTexture("materials/crate.gif"),
    skyBox: loadTextureCube([
      "skyBox/front.jpg",
      "skyBox/back.jpg",
      "skyBox/up.jpg",
      "skyBox/down.jpg",
      "skyBox/right.jpg",
      "skyBox/left.jpg"
    ])
  };
}

