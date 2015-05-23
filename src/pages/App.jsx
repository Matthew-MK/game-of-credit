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
 * @providesModule App
 **/

import React, { Component } from "react";
import { RouteHandler } from "react-router";
import { isBrowser } from "../utils/ExecutionEnvironment";

if (isBrowser) require("./App.css");

/**
 * Main application component
 * @class App
 */
export default class App extends Component {

  render() {
    return <RouteHandler {...this.props} />;
  }
}
