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
 * @providesModule Engine
 **/

import React, { Component, PropTypes } from "react";
import { createEngine } from "./Engine";

/**
 * @class Engine
 */
export default class Engine extends Component {

  static propTypes = {
    textures: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.unmounted = false;
    this.handleResize = this.handleResize.bind(this);
    this.state = {
      canvasWidth: 0,
      canvasHeight: 0
    };
  }

  /**
   * Invoked once, only on the client (not on the server), immediately after
   * the initial rendering occurs.
   */
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);

    this.engine = createEngine({
      textures: this.props.textures,
      emitter: this.props.emitter,
      socket: this.props.socket,
      renderer: {
        canvas: React.findDOMNode(this.refs.engine)
      },
      canvasWidth: window.innerWidth,
      canvasHeight: window.innerHeight
    });
    this.engine.animate(() => {
      if (this.unmounted) return;
      this.forceUpdate();
    });
  }

  /**
   * Invoked before rendering when new props or state are being received. This
   * method is not called for the initial render or when `forceUpdate` is used.
   * @return {boolean}
   */
  shouldComponentUpdate() {
    return false;
  }

  // Un-mounting
  /**
   * Invoked immediately before a component is unmounted from the DOM.
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    this.unmounted = true;
  }

  handleResize() {
    const size = {
      canvasWidth: window.innerWidth,
      canvasHeight: window.innerHeight
    };
    this.setState(size, () => this.engine.resize(size));
  }

  render() {
    return <canvas id="engine" ref="engine"/>;
  }
}