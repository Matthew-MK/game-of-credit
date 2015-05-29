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
 * @providesModule Blocker
 **/

import React, { Component, PropTypes } from "react";
import shouldPureComponentUpdate from "react-pure-render/function";

import "./Blocker.css";

/**
 * @class Blocker
 */
export default class Blocker extends Component {

  static propTypes = {
    isPointerLocked: PropTypes.bool.isRequired,
    handler: PropTypes.func.isRequired
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.pointerLocked = false;
    this.pointerLockChanged = props.handler;
    this.handleClick = this.handleClick.bind(this);
    this.handleLockChange = this.handleLockChange.bind(this);
  }

  getDomElement(name) {
    return React.findDOMNode(this.refs[name]);
  }

  havePointerLock() {
    if (this._havePointerLock) return this._havePointerLock;

    if (typeof document !== "undefined") {
      this._havePointerLock =
        "pointerLockElement" in document ||
        "mozPointerLockElement" in document ||
        "webkitPointerLockElement" in document;
    }
    return this._havePointerLock || false;
  }

  handleClick() {
    if (this.pointerLocked || !this.havePointerLock) return;
    let blocker = this.getDomElement("blocker");
    blocker.requestPointerLock =
      blocker.requestPointerLock ||
      blocker.mozRequestPointerLock ||
      blocker.webkitRequestPointerLock;
    blocker.requestPointerLock();
  }

  handleLockChange() {
    const blocker = this.getDomElement("blocker");
    const pointerLocked =
      document.pointerLockElement === blocker ||
      document.mozPointerLockElement === blocker ||
      document.webkitPointerLockElement === blocker;
    if (this.pointerLocked !== pointerLocked) {
      this.pointerLocked = pointerLocked;
      this.pointerLockChanged(pointerLocked);
    }
  }

  componentDidMount() {
    if (this.havePointerLock()) {
      document.addEventListener("pointerlockchange", this.handleLockChange);
      document.addEventListener("mozpointerlockchange", this.handleLockChange);
      document.addEventListener("webkitpointerlockchange", this.handleLockChange);
    }
  }

  componentWillUnmount() {
    if (this.havePointerLock()) {
      document.removeEventListener("pointerlockchange", this.handleLockChange);
      document.removeEventListener("mozpointerlockchange", this.handleLockChange);
      document.removeEventListener("webkitpointerlockchange", this.handleLockChange);
    }
  }

  render() {
    let style = {opacity: +!this.props.isPointerLocked};
    let title, message;

    if (this.havePointerLock() || typeof window === "undefined") {
      title = "Click to play";
      message = "(W, A, S, D = Move, SPACE = Jump, MOUSE = Look around)";
    } else {
      title = "Sorry";
      message = "Your browser doesn't seem to support Pointer Lock API";
    }
    return (
      <div id="blocker" ref="blocker" style={style} onClick={this.handleClick}>
        <div id="instructions">
          <span>{title}</span>
          <span>{message}</span>
        </div>
      </div>
    );
  }
}