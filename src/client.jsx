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
import React from "react";
import Router from "react-router";
import routes from "./routes";
import io from "socket.io-client";

var lastUsedHeap = 0;  // remember the heap size

function checkMemory() {
  if (window.performance.memory.usedJSHeapSize < lastUsedHeap) {
    console.log("Garbage collected!");
  }
  lastUsedHeap = window.performance.memory.usedJSHeapSize;
}

setInterval(checkMemory, 100);

const socket = io();

const initialState = window._STATE_;
const renderElement = document.getElementById("render");

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler socket={socket}
                        initialState={initialState}/>, renderElement);
});