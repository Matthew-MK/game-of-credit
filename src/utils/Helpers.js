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
 * @providesModule Helpers
 **/

/**
 * Helper function for converting keyCode to helpful string property
 * @param keyCode {Number}
 * @returns {String}
 */
export function getKeyFromCode(keyCode) {
  var key = String.fromCharCode(keyCode);
  switch (key) {
    case " ":
      return "SPACE";
      break;
    default:
      return key;
  }
}

/**
 * Helper function for repeat texture wrapping
 * @param texture {Object}
 * @param repeat {Array}
 * @returns {Object} texture
 */
export function repeatTexture(texture, repeat) {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(...repeat);
  return texture;
}