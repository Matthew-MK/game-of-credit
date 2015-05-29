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

import EventEmitter from "events";
import React, { PropTypes } from "react";
import Title from "react-document-title";

import connectToStores from "../utils/ConnectToStores";
import { isBrowser } from "../utils/ExecutionEnvironment";
import { loadTextures, loadModels } from "../utils/AssetsLoader";

import Blocker from "../components/Blocker/Blocker.jsx";
import Engine from "../components/Engine/EngineCanvas.jsx";
import Loading from "../components/Loading/Loading.jsx";

import Event from "../constants/EventTypes";
import PlayActions from "../actions/PlayActions";
import PlayStore from "../stores/PlayStore";


function PlayPage(inititalProps) {

  PlayPage.propTypes = {
    // Injected by @connectToStores:
    isPointerLocked: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  const emitter = new EventEmitter();

  var textures;


  if (isBrowser) {

    const texturesConfig = {
      textures: {
        bricks: "static/textures/materials/bricks.jpg",
        grass: "static/textures/materials/grass-512.jpg",
        rock: "static/textures/materials/rock-512.jpg",
        wall: "static/textures/materials/wall.jpg",
        woodCrate: "static/textures/materials/crate.gif",
        ratamahattaBody: "static/textures/ratamahatta/ratamahatta.png",
        ratamahattaWeapon: "static/textures/ratamahatta/weapon.png"
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
      }
    };

    textures = loadTextures(texturesConfig, PlayActions.loadingTexturesCompleted);

    const modelsConfig = {
      ratamahattaBody: "static/models/ratamahatta/ratamahatta.json",
      ratamahattaWeapon: "static/models/ratamahatta/weapon.json"
    };
    loadModels(modelsConfig, PlayActions.loadingModelsCompleted);

  }

  return {

    props: inititalProps,

    handleEvent(eventType) {
      return (e) => {
        if (this.props.isPointerLocked) {
          emitter.emit(eventType, e);
        }
      }
    },
    componentWillMount() {
      this.handleEvent = this.handleEvent.bind(this);
    },
    componentDidMount() {
      window.addEventListener("mousemove", this.handleEvent(Event.MOUSE_MOVE));
      window.addEventListener("keydown", this.handleEvent(Event.KEY_DOWN));
      window.addEventListener("keyup", this.handleEvent(Event.KEY_UP));
    },

    componentWillUnmount() {
      window.removeEventListener("mousemove", this.handleEvent(Event.MOUSE_MOVE));
      window.removeEventListener("keydown", this.handleEvent(Event.KEY_DOWN));
      window.removeEventListener("keyup", this.handleEvent(Event.KEY_UP));
    },

    render() {
      const { isLoading, isPointerLocked, socket, models } = this.props;
      const loading = <Loading />;
      const playing = (
        <div onClick={this.handleEvent(Event.CLICK)}>
          <Blocker isPointerLocked={isPointerLocked}
                   handler={PlayActions.pointerLockChanged}/>
          <Engine emitter={emitter}
                  textures={textures}
                  models={models}
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
  };
}

/**
 * Retrieves state from stores.
 */
function getState() {
  return {
    isPointerLocked: PlayStore.isPointerLocked(),
    isLoading: PlayStore.isLoading(),
    models: PlayStore.getModels()
  };
}

export default connectToStores([PlayStore], getState)(PlayPage);


