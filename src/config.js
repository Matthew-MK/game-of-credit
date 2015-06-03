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
 * @providesModule config
 **/
import os from "os";
import { version } from "../package.json";

export const PORT = 8888;
export const HOST = os.hostname() || "localhost";
export const DEV_SERVER_URL = `//${HOST}:${PORT}`;
export const APP_PREFIX = process.env.APP_PREFIX || "";

const common = {
  APP_PREFIX,
  textures: {
    simple: {
      bricks: "static/textures/materials/bricks.jpg",
      container: "static/textures/materials/container.jpg",
      crate: "static/textures/materials/crate.gif",
      grass: "static/textures/materials/grass-512.jpg",
      ratamahattaBody: "static/textures/ratamahatta/ratamahatta.png",
      ratamahattaWeapon: "static/textures/ratamahatta/weapon.png",
      rock: "static/textures/materials/rock-512.jpg",
      wall: "static/textures/materials/wall.jpg"
    },
    cube: {
      skyBox: [
        "static/textures/skyBox/front.jpg",
        "static/textures/skyBox/back.jpg",
        "static/textures/skyBox/up.jpg",
        "static/textures/skyBox/down.jpg",
        "static/textures/skyBox/right.jpg",
        "static/textures/skyBox/left.jpg"
      ]
    }
  },
  models: {
    ratamahattaBody: "static/models/ratamahatta/ratamahatta.json",
    ratamahattaWeapon: "static/models/ratamahatta/weapon.json"
  },
  favicon: "/static/favicon.ico",
  ui: {
    crosshair: {
      src: "static/ui/crosshair.png",
      width: 86,
      height: 86
    }
  }
};

const development = {
  ...common,
  css: {
    normalize: "/static/css/normalize.css"
  },
  js: {
    three: "/static/js/three.js",
    bundle: `${DEV_SERVER_URL}/build/bundle.js`
  }
};

const production = {
  ...common,
  css: {
    normalize: APP_PREFIX + "/static/css/normalize.min.css",
    bundle: `${APP_PREFIX}/build/bundle.css?v=${version}`
  },
  js: {
    three: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r71/three.min.js",
    bundle: `${APP_PREFIX}/build/bundle.js?v=${version}`
  }
};

export function getConfig(env) {
  return env === "production" ? production : development;
}
