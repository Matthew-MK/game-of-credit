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

import { mapObject, forEach } from "underscore";

export function loadTextures(config, onLoad) {

  THREE.DefaultLoadingManager.onLoad = onLoad;

  return {
    simple: mapObject(config.simple, file =>
        THREE.ImageUtils.loadTexture(file, THREE.UVMapping)
    ),
    cube: mapObject(config.cube, files =>
        THREE.ImageUtils.loadTextureCube(files, THREE.UVMapping)
    )
  };
}

export function loadModels(config, onLoad) {

  class JSONLoader extends THREE.JSONLoader {
    constructor(manager) {
      super();
      this.manager = manager;
    }

    load(url, callback, texturePath) {
      this.manager.itemStart(url);
      super.load(url, (...args) => {
        callback(...args);
        this.manager.itemEnd(url);
      }, texturePath);
    }
  }

  const loadingManager = new THREE.LoadingManager();
  const loader = new JSONLoader(loadingManager);

  var models = {};

  loadingManager.onLoad = () => onLoad(models);

  forEach(config, (file, key) =>
      loader.load(file, (geometry, materials) => {
        geometry.computeBoundingBox();
        geometry.computeMorphNormals();
        models[key] = {geometry, materials};
      })
  );
}
