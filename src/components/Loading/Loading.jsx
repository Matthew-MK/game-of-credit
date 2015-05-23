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
 * @providesModule Loading
 **/

import React, { Component, PropTypes } from "react";
import { isBrowser } from "../../utils/ExecutionEnvironment";

if (isBrowser) require("./Loading.css");

/**
 * @class Loading
 */
export default class Loading extends Component {
  static propTypes = {
    progress: PropTypes.number.isRequired
  };

  render() {
    return (
      <div id="loading">
        <div>Loading...</div>
        <progress value={this.props.progress} max="100"/>
      </div>
    );
  }
}