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
 * @providesModule Packer
 **/

// TODO unit & performance tests

/**
 * Lookup object for TypedArray size & constructor function
 * @type {Object}
 */
export const TypedArrays = Object.freeze({
  Int8Array: {
    Func: Int8Array,
    size: 1
  },
  Uint8Array: {
    Func: Uint8Array,
    size: 1
  },
  Uint8ClampedArray: {
    Func: Uint8ClampedArray,
    size: 1
  },
  Int16Array: {
    Func: Int16Array,
    size: 2
  },
  Uint16Array: {
    Func: Uint16Array,
    size: 2
  },
  Int32Array: {
    Func: Int32Array,
    size: 4
  },
  Uint32Array: {
    Func: Uint32Array,
    size: 4
  },
  Float32Array: {
    Func: Float32Array,
    size: 4
  },
  Float64Array: {
    Func: Float64Array,
    size: 8
  }
});

/**
 * Custom error for packer scheme
 * @param message
 * @return {Object}
 */
function schemeError(message) {
  return {
    __proto__: Error.prototype,
    name: "SchemeError",
    message: message
  };
}

/**
 * Packer factory
 *
 * @param scheme {Array}
 *
 *  Scheme is array of objects with "type" & "count" properties.
 *
 *  type {String} Defines used TypedArray.
 *  count {Number} Defines number of TypedArray items.
 *
 *  Example:
 *    const packer = createPacker([
 *      {type: "Float32Array", count: 2},
 *      {type: "Uint8Array", count: 1}
 *    ]);
 *    const data = [
 *      14.999999999999995,
 *      24.429796900022705,
 *      1
 *    ];
 *    const buffer = packer.pack(data);
 *    console.log(packer.unpack(buffer));
 *    // [15, 24.42979621887207, 1]
 *
 * @return {Object} Packer
 */
export function createPacker(scheme) {

  var totalSize = 0;

  scheme.forEach(item => {
    if (!item.hasOwnProperty("type")) {
      throw schemeError(`You need to specify "type" property.`);
    }
    if (!item.hasOwnProperty("count")) {
      throw schemeError(`You need to specify "count" property.`);
    }
    if (!TypedArrays.hasOwnProperty(item.type)) {
      throw schemeError(`"${item.type}" is not supported. Make sure that you provide correct type.`);
    }
    totalSize += TypedArrays[item.type].size * item.count;
  });

  // pre-cache scheme length
  var schemeLength = scheme.length;

  // public
  return {
    /**
     * Convert packet to ArrayBuffer based on scheme
     * @param packet {Array}
     * @return {ArrayBuffer}
     */
    pack(packet) {
      const buffer = new ArrayBuffer(totalSize);

      var dataIdx = 0;
      var offset = 0;

      var arrayIdx;
      var item;
      var length;
      var schemeIdx;
      var TypeArray;
      var typeArray;

      // use imperative "for" instead of "forEach" for extra performance
      for (schemeIdx = 0; schemeIdx < schemeLength; schemeIdx++) {
        item = scheme[schemeIdx];
        length = item.count;
        TypeArray = TypedArrays[item.type];
        typeArray = new TypeArray.Func(buffer, offset, length);
        offset += TypeArray.size * length;

        for (arrayIdx = 0; arrayIdx < length; arrayIdx++, dataIdx++) {
          typeArray[arrayIdx] = packet[dataIdx];
        }
      }
      return buffer;
    },
    /**
     * Convert ArrayBuffer back to data array
     * @param buffer {ArrayBuffer}
     * @return {Array} packet
     */
      unpack(buffer) {

      var end = 0;
      var packet = [];
      var start = 0;

      var item;
      var length;
      var TypeArray;
      var typeArray;

      var arrayIdx;
      var schemeIdx;

      for (schemeIdx = 0; schemeIdx < schemeLength; schemeIdx++) {
        item = scheme[schemeIdx];
        TypeArray = TypedArrays[item.type];

        end += item.count * TypeArray.size;
        typeArray = new TypeArray.Func(buffer.slice(start, end));
        start = end;

        length = typeArray.length; // pre-cache length
        for (arrayIdx = 0; arrayIdx < length; arrayIdx++) {
          packet.push(typeArray[arrayIdx]);
        }
      }
      return packet;
    }
  };
}

/**
 * Helper function for converting strings to char codes
 * @param str {String}
 * @return {Array}
 */
export function getCharCodes(str) {
  for (var codes = [], i = 0, len = str.length; i < len; i++) {
    codes.push(str.charCodeAt(i));
  }
  return codes;
}