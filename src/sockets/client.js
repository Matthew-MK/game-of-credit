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
import EventEmitter from "events";
import SocketType from "../constants/SocketTypes";
import { createMessage, parseMessage } from "./message";

export function createWebSocketClient({prefix = "", path = "/"}) {

  const emitter = new EventEmitter();
  const ws = new WebSocket("ws://" + window.document.location.host + prefix + path);

  // send/receive binary data only with ArrayBuffer
  ws.binaryType = "arraybuffer";

  ws.onmessage = function handleMessage({ data }) {
    const { code, id, message } = parseMessage(data);

    switch (code) {
      case SocketType.CONNECT:
        emitter.emit(code, id);
        break;
      case SocketType.DISCONNECT:
        emitter.emit(code, id);
        break;
      case SocketType.JOIN:
        emitter.emit(code, id);
        break;
      case SocketType.LEAVE:
        emitter.emit(code, id);
        break;
      case SocketType.DATA:
        emitter.emit(code, id, message);
        break;
    }
  };
  ws.onerror = function handleError({ data }) {
    console.error(data);
  };

  function send(message) {
    if (ws.readyState === 1) {
      ws.send(message, { mask: true });
    } else {
      setTimeout(() => send(message), 16);
    }
  }

  return {
    emitData(data) {
      send(createMessage({ binary: true, data: data }));
    },
    emitJoin() {
      send(createMessage({ code: SocketType.JOIN }));
    },
    emitLeave() {
      send(createMessage({ code: SocketType.LEAVE }));
    },
    handleData(cb) {
      emitter.addListener(SocketType.DATA, cb);
    },
    handleConnect(cb) {
      emitter.addListener(SocketType.CONNECT, cb);
    },
    handleDisconnect(cb) {
      emitter.addListener(SocketType.DISCONNECT, cb);
    },
    handleJoin(cb) {
      emitter.addListener(SocketType.JOIN, cb);
    },
    handleLeave(cb) {
      emitter.addListener(SocketType.LEAVE, cb);
    }
  };
}


