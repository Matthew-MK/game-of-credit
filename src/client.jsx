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
import { createWebSocketClient } from "./sockets/client";

const initialState = window._STATE_;
const config = initialState.config;
const renderElement = document.getElementById("render");

const socket = createWebSocketClient({
  secure: config.APP_SECURE,
  prefix: config.APP_PREFIX
});

Router.run(routes, Router.HistoryLocation, (Handler) =>
    React.render(<Handler socket={socket} state={initialState}/>, renderElement)
);
