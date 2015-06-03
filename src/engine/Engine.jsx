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

import React, { PropTypes } from "react";
import { createEngine } from "./Core";
import respawns from "./respawns";

function Engine(initialProps) {

  Engine.propTypes = {
    emitter: PropTypes.object,
    models: PropTypes.object,
    textures: PropTypes.object,
    socket: PropTypes.object
  };

  const spawn = respawns[Math.floor((Math.random() * respawns.length))];

  var unmounted = false;
  var engine;

  function handleResize() {
    engine.resize({
      canvasWidth: window.innerWidth,
      canvasHeight: window.innerHeight
    });
  }

  return {

    props: initialProps,

    componentDidMount() {
      window.addEventListener("resize", handleResize);

      engine = createEngine({
        textures: this.props.textures,
        models: this.props.models,
        initialPosition: spawn.position,
        initialRotation: spawn.rotation,
        emitter: this.props.emitter,
        socket: this.props.socket,
        renderer: {
          canvas: React.findDOMNode(this.refs.engine)
        },
        canvasWidth: window.innerWidth,
        canvasHeight: window.innerHeight
      });
      engine.animate(() => unmounted);
    },
    shouldComponentUpdate() {
      return false; // render component only once, disable updates
    },
    componentWillUnmount() {
      window.removeEventListener("resize", handleResize);
      unmounted = true;
    },
    render() {
      return <canvas id="engine" ref="engine"/>;
    }
  };
}

export default Engine;
