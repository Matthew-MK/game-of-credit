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

/**
 * Load all assets based on configuration
 * @param config {Object}
 * @param onProgress {Function}
 * @return {{textures: Object, texturesCube: Object, models: Object}}
 */
export function loadAssets(config, onProgress) {

  const loader = new THREE.JSONLoader();

  const textureKeys = Object.keys(config.textures);
  const texturesCubeKeys = Object.keys(config.texturesCube);
  const modelKeys = Object.keys(config.models);

  var loadedItems = 0;

  THREE.DefaultLoadingManager.onProgress = () => {
    loadedItems += 1;
    onProgress(loadedItems);
  };
  loader.onLoadComplete = () => {
    loadedItems += 1;
    onProgress(loadedItems);
  };

  const loadTexture = file =>
    THREE.ImageUtils.loadTexture(file);

  const loadTextureCube = files =>
    THREE.ImageUtils.loadTextureCube(files);

  const loadModel = (file, callback) =>
    loader.load(file, callback);

  var assets = {
    textures: {},
    texturesCube: {},
    models: {}
  };

  // load textures
  textureKeys.forEach(key => {
    const item = config.textures[key];
    if (Array.isArray(item)) {
      const arr = [];
      item.forEach(filename =>
          arr.push(loadTexture(filename))
      );
      assets.textures[key] = arr;
    } else {
      assets.textures[key] = loadTexture(item);
    }
  });

  // load cube textures
  texturesCubeKeys.forEach(key => {
    const item = config.texturesCube[key];
    assets.texturesCube[key] = loadTextureCube(item);
  });

  // load models
  modelKeys.forEach(key => {
    const item = config.models[key];
    loadModel(item, (...args) => assets.models[key] = args);
  });
  return assets;
}


