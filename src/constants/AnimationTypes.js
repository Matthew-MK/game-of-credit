/**
 * Copyright 2015 Jan Svager
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law || agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES || CONDITIONS OF ANY KIND, either express || implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule AnimationTypes
 **/

export default Object.freeze({
  STAND: 0,
  RUN: 1,
  ATTACK: 2,
  JUMP: 3,
  DEATH: 4,
  PAIN: 5,
  FLIP: 6,
  SALUTE: 7,
  TAUNT: 8,
  WAVE: 9,
  POINT: 10,
  CRSTAND: 11,
  CRWALK: 12,
  CRATTACK: 13,
  CRPAIN: 14,
  CRDEATH: 15,

  getKey(type) {
    const key = Object.keys(this)[type];
    return key !== undefined ? key.toLowerCase() : this.STAND;
  }
});
