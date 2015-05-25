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
 * @providesModule Play
 **/

import React, { PropTypes } from "react";
import Title from "react-document-title";
import EventEmitter from "events";
import connectToStores from "../utils/ConnectToStores";
import { loadAssets } from "../components/Engine/Loaders";
import { isBrowser } from "../utils/ExecutionEnvironment";
import Blocker from "../components/Blocker/Blocker.jsx";
import Loading from "../components/Loading/Loading.jsx";
import Engine from "../components/Engine/EngineCanvas.jsx";

import PlayStore from "../stores/PlayStore";
import PlayActions from "../actions/PlayActions";
import EventTypes from "../constants/EventTypes";

/**
 * Retrieves state from stores for current props.
 */
function getState() {
  return {
    isPointerLocked: PlayStore.isPointerLocked(),
    isLoading: PlayStore.isLoading(),
    loadingProgress: PlayStore.getLoadingProgress()
  };
}

@connectToStores([PlayStore], getState)
export default class PlayPage {
  static propTypes = {
    // Injected by @connectToStores:
    isPointerLocked: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    loadingProgress: PropTypes.number.isRequired
  };

  constructor() {
    this.emitter = new EventEmitter();
    this.emitter.eventTypes = EventTypes;
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    if (isBrowser) {

      const config = {
        textures: {
          bricks: "static/textures/materials/bricks.jpg",
          grass: "static/textures/materials/grass-512.jpg",
          rock: "static/textures/materials/rock-512.jpg",
          wall: "static/textures/materials/wall.jpg",
          woodCrate: "static/textures/materials/crate.gif",
          ratamahattaBody: [
            "static/textures/ratamahatta/ratamahatta.png"
          ],
          ratamahattaWeapon: [
            "static/textures/ratamahatta/weapon.png"
          ]
        },
        texturesCube: {
          skyBox: [
            "static/textures/skyBox/front.jpg",
            "static/textures/skyBox/back.jpg",
            "static/textures/skyBox/up.jpg",
            "static/textures/skyBox/down.jpg",
            "static/textures/skyBox/right.jpg",
            "static/textures/skyBox/left.jpg"
          ]
        },
        models: {
          ratamahattaBody: "static/models/ratamahatta/ratamahatta.json",
          ratamahattaWeapon: "static/models/ratamahatta/weapon.json"
        }
      };

      const total = 15; // TODO dynamic counting
      this.assets = loadAssets(config, loaded => {
        const progress = Math.round((loaded * 100) / total);
        PlayActions.loadingProgressChanged(progress);
      });
    }
  }

  handleMouseMove(e) {
    if (this.props.isPointerLocked) {
      this.emitter.emit(EventTypes.MOUSE_MOVE, {
        x: e.movementX || e.mozMovementX || e.webkitMovementX || 0,
        y: e.movementY || e.mozMovementY || e.webkitMovementY || 0
      });
    }
  }

  handleKeyDown(e) {
    if (this.props.isPointerLocked) {
      this.emitter.emit(EventTypes.KEY_DOWN, e.keyCode);
    }
  }

  handleKeyUp(e) {
    if (this.props.isPointerLocked) {
      this.emitter.emit(EventTypes.KEY_UP, e.keyCode);
    }
  }

  handleClick() {
    if (this.props.isPointerLocked) {
      this.emitter.emit(EventTypes.CLICK);
    }
  }

  componentDidMount() {
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  render() {
    const { isLoading, loadingProgress, isPointerLocked, socket } = this.props;
    const loading = <Loading progress={loadingProgress}/>;
    const playing = (
      <div onClick={this.handleClick}>
        <Blocker isPointerLocked={isPointerLocked}
                 handler={PlayActions.pointerLockChanged}/>
        <Engine emitter={this.emitter}
                assets={this.assets}
                socket={socket}/>
      </div>
    );
    return (
      <Title title="Play | Game of Credit">
        <div id="play-page">
          {isLoading ? loading : playing}
        </div>
      </Title>
    );
  }
}
