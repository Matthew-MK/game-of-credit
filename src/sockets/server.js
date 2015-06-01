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
 * @providesModule server
 **/

import SocketType from "../constants/SocketTypes";
import { Server as WebSocketServer } from "ws";
import { createMessage, parseMessage } from "./message";
import { forEach, without } from "underscore";
import { idGenerator } from "../utils/Helpers";

export function createWebSocketsServer(server, maxClients = 12) {

  const wss = new WebSocketServer({ server });
  const generator = idGenerator();


  function send(client, message, maxRetries = 10) {
    if (client.readyState === 1) {
      return client.send(message);
    }
    if (maxRetries > 0) {
      setTimeout(() => send(client, message, --maxRetries), 16);
    }
  }

  function broadcast(clients, message) {
    forEach(clients, client => send(client, message));
  }

  wss.on("connection", client => {

    const id = generator.generate();

    if (wss.clients.length > maxClients) {
      client.terminate();
    } else {
      const clients = without(wss.clients, client);
      const message = createMessage({ code: SocketType.CONNECT, id });
      broadcast(clients, message);
    }

    client.on("message", data => {
      // add client ID to text and binary messages
      if (data instanceof Buffer) {
        data[0] = id;
      } else {
        const { code, message } = parseMessage(data);
        data = createMessage({ code, id, message });
      }
      const clients = without(wss.clients, client);
      broadcast(clients, data);
    });

    client.on("close", () => {
      const message = createMessage({ code: SocketType.DISCONNECT, id });
      broadcast(wss.clients, message);
      generator.release(id);
    });
  });
  return wss;
}