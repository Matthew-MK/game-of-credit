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
 * @providesModule state
 **/

import Immutable from "immutable";
import Cursor from "immutable/contrib/cursor";
import EventEmitter from "events";
import { getInitialState } from "./initialState";
import { isBrowser } from "./utils/ExecutionEnvironment";

/**
 * Base store factory with initialState from server
 * @param initialState {Object}
 * @return {Object}
 */
function createStore(initialState) {

  //private
  const CHANGE_EVENT = "change";
  const emitter = new EventEmitter();
  emitter.setMaxListeners(0); // unlimited TODO check for potential memory leak
  let state = Immutable.fromJS(initialState);

  // public
  return {

    getState() {
      return state;
    },
    setState(newState) {
      if (state === newState) return;
      state = newState;
      emitter.emit(CHANGE_EVENT);
    },
    cursor(cursorPath) {
      return () => Cursor.from(state, cursorPath, newState =>
          this.setState(newState)
      );
    },
    /**
     * New store factory with cursor to base store state
     * @param path {Array} cursor path of store
     * @param spec {Object} object which is assigned to base store
     * @return {Object} new store
     */
    createSubStore(path, spec) {
      const cursor = this.cursor(path);
      return {
        __proto__: spec,

        addChangeListener(callback) {
          emitter.addListener(CHANGE_EVENT, callback);
        },
        removeChangeListener(callback) {
          emitter.removeListener(CHANGE_EVENT, callback);
        },
        get state() {
          return cursor();
        }
      };
    }
  };
}

export default createStore(isBrowser ? window._STATE_ : getInitialState());


