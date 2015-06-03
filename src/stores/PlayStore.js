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
 * @providesModule PlayStore
 **/

import dispatcher from "../dispatcher";
import store from "../store";
import Types from "../constants/ActionTypes";

const PlayStore = store.createSubStore(["playStore"], {

  dispatchToken: dispatcher.register(({type, data}) => {
    const { state } = PlayStore;
    switch (type) {
      case Types.POINTER_LOCK_CHANGE:
        state.set("pointerLocked", data);
        break;
      case Types.LOADING_TEXTURES_COMPLETE:
        state.set("textures", true);
        break;
      case Types.LOADING_MODELS_COMPLETE:
        state.set("models", data);
        break;
      case Types.PLAYER_CLICK:
        state.update("ammo", ammo => ammo > 0 ? ammo - 1 : 0);
    }
  }),
  getModels() {
    return this.state.get("models");
  },
  getAmmo() {
    return this.state.get("ammo");
  },
  isPointerLocked() {
    return this.state.get("pointerLocked");
  },
  isLoading() {
    return !this.state.get("textures") || !this.getModels();
  }
});

export default PlayStore;
