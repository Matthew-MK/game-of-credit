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
 * @providesModule client
 **/

import SocketType from "../constants/SocketTypes";
import { createPacker } from "../utils/Packer";

const packer = createPacker([
  { type: "Uint8Array", count: 4 },
  { type: "Float32Array", count: 4 }
]);

export function createMessage({ data, code, id = 0, binary = false }) {
  if (binary) {
    return packer.pack(data);
  } else {
    if (!code) throw "Event code of message must be set.";
    data = data !== undefined ? "-" + data : "";
    return `${code}-${id}${data}`;
  }
}

export function parseMessage(data) {
  var code, id, message;
  if (data instanceof ArrayBuffer) {
    code = SocketType.DATA;
    [id, ...message] = packer.unpack(data);
  } else {
    [code, id, message] = data.split("-", 2);
  }
  return {code, id, message};
}
