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
 * @providesModule mapping
 **/
const { PI } = Math;

export default {
  "skyBox": {
    items: [
      {
        "mesh": "skyBox"
      }
    ]
  },
  "containers": {
    "items": [
      {
        "mesh": "container",
        "position": [350, 30, 350],
        "castShadow": true
      },
      {
        "mesh": "container",
        "position": [-250, 30, -340],
        "castShadow": true
      },
      {
        "mesh": "container",
        "position": [-352, 30, 0],
        "castShadow": true
      },
      {
        "mesh": "container",
        "position": [-352, 90, 0],
        "castShadow": true
      },
      {
        "mesh": "container",
        "position": [-292, 30, 0],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "container",
        "position": [-412, 30, 0],
        "castShadow": true
      },
      {
        "mesh": "container",
        "position": [-352, 90, 120]
      },
      {
        "mesh": "container",
        "position": [-412, 30, 120],
        "castShadow": true
      },
      {
        "mesh": "container",
        "position": [-292, 30, 180],
        "castShadow": true
      },
      {
        "mesh": "container",
        "position": [-337, 30, -90],
        "rotation": [0, PI / 2, 0],
        "castShadow": true
      },
      {
        "mesh": "container",
        "position": [337, 30, 165],
        "castShadow": true
      },
      {
        "mesh": "container",
        "position": [337, 90, 165],
        "castShadow": true
      },
      {
        "mesh": "container",
        "position": [397, 30, 165],
        "castShadow": true
      },
      {
        "mesh": "container",
        "position": [455, 30, -50],
        "rotation": [0, PI / 2, 0],
        "castShadow": true
      },
      {
        "mesh": "container",
        "position": [200, 30, 228],
        "castShadow": true
      },
      {
        "mesh": "container",
        "position": [-50, 30, -182],
        "rotation": [0, PI / 2, 0],
        "castShadow": true
      }
    ]
  },
  "fortressA": {
    "items": [
      {
        "position": [387, 30, -437],
        "mesh": "rock",
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "position": [467, 7.5, -357],
        "mesh": "bricks",
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "position": [467, 22.5, -357],
        "mesh": "bricks",
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "position": [467, 37.5, -357],
        "mesh": "bricks",
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "position": [467, 7.5, -347],
        "mesh": "bricks",
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "position": [467, 22.5, -347],
        "mesh": "bricks",
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "position": [467, 7.5, -337],
        "mesh": "bricks",
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "position": [277, 67.5, -367],
        "mesh": "bricks",
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "position": [337, 67.5, -367],
        "mesh": "bricks",
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "position": [397, 67.5, -367],
        "mesh": "bricks",
        "castShadow": true,
        "receiveShadow": true
      }
    ]
  },
  "fortressB": {
    rotation: [0, PI, 0],
    "items": [
      {
        "position": [387, 30, -437],
        "mesh": "rock",
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "position": [467, 7.5, -357],
        "mesh": "bricks",
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "position": [467, 22.5, -357],
        "mesh": "bricks",
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "position": [467, 37.5, -357],
        "mesh": "bricks",
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "position": [467, 7.5, -347],
        "mesh": "bricks",
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "position": [467, 22.5, -347],
        "mesh": "bricks",
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "position": [467, 7.5, -337],
        "mesh": "bricks",
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "position": [277, 67.5, -367],
        "mesh": "bricks",
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "position": [337, 67.5, -367],
        "mesh": "bricks",
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "position": [397, 67.5, -367],
        "mesh": "bricks",
        "castShadow": true,
        "receiveShadow": true
      }
    ]
  },
  "prison": {
    "items": [
      {
        "mesh": "ground",
        "position": [0, 0, 0],
        "rotation": [-PI / 2, 0, 0],
        "receiveShadow": true
      },
      {
        "mesh": "wall",
        "position": [0, 64, -512],
        "receiveShadow": true
      },
      {
        "mesh": "wall",
        "position": [-500, 64, 0],
        "rotation": [0, PI / 2, 0],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "wall",
        "position": [512, 64, 0],
        "rotation": [0, -PI / 2, 0],
        "receiveShadow": true
      },
      {
        "mesh": "wall",
        "position": [0, 64, 512],
        "rotation": [0, PI, 0],
        "receiveShadow": true,
        "castShadow": true
      }
    ]
  },
  "pyramid": {
    "position": [150, 0, -100],
    "items": [
      {
        "mesh": "crate",
        "position": [15, 22.5, 0],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "crate",
        "position": [0, 22.5, 15],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "crate",
        "position": [15, 22.5, 15],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "crate",
        "position": [0, 22.5, -15],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "crate",
        "position": [-15, 22.5, 0],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "crate",
        "position": [-15, 22.5, -15],
        "castShadow": true,
        "receiveShadow": true
      },//
      {
        "mesh": "crate",
        "position": [-15, 22.5, 15],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "crate",
        "position": [15, 22.5, -15],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "crate",
        "position": [-30, 7.5, 30],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "crate",
        "position": [-30, 7.5, -30],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "crate",
        "position": [30, 7.5, -30],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "crate",
        "position": [30, 7.5, 30],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "crate",
        "position": [15, 7.5, 30],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "crate",
        "position": [0, 7.5, 30],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "crate",
        "position": [-15, 7.5, 30],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "crate",
        "position": [30, 7.5, 15],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "crate",
        "position": [30, 7.5, 0],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "crate",
        "position": [30, 7.5, -15],
        "castShadow": true,
        "receiveShadow": true
      },//
      {
        "mesh": "crate",
        "position": [-30, 7.5, -15],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "crate",
        "position": [-30, 7.5, 0],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "crate",
        "position": [-30, 7.5, 15],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "crate",
        "position": [-15, 7.5, -30],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "crate",
        "position": [0, 7.5, -30],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "crate",
        "position": [15, 7.5, -30],
        "castShadow": true,
        "receiveShadow": true
      },
      {
        "mesh": "crate",
        "position": [0, 37.5, 0],
        "castShadow": true,
        "receiveShadow": true
      }
    ]
  },
  "crates": {
    "items": [
      {
        "mesh": "crate",
        "position": [497, 15, 497],
        "scale": [2, 2, 2]
      },
      {
        "mesh": "crate",
        "position": [497, 45, 497],
        "scale": [2, 2, 2]
      },
      {
        "mesh": "crate",
        "position": [467, 15, 497],
        "scale": [2, 2, 2]
      },
      {
        "mesh": "crate",
        "position": [467, 15, 437],
        "scale": [2, 2, 2]
      },
      {
        "mesh": "crate",
        "position": [327, 15, 437],
        "scale": [2, 2, 2]
      },
      {
        "mesh": "crate",
        "position": [227, 15, 437],
        "scale": [2, 2, 2]
      },
      {
        "mesh": "crate",
        "position": [127, 15, 437],
        "scale": [2, 2, 2]
      },
      {
        "mesh": "crate",
        "position": [27, 15, 437],
        "scale": [2, 2, 2]
      },
      {
        "mesh": "crate",
        "position": [-27, 15, 437],
        "scale": [2, 2, 2]
      },
      {
        "mesh": "crate",
        "position": [-127, 15, 437],
        "scale": [2, 2, 2]
      },
      {
        "mesh": "crate",
        "position": [-127, 15, 200],
        "scale": [2, 2, 2],
        "castShadow": true
      },
      {
        "mesh": "crate",
        "position": [-127, 15, -350],
        "scale": [2, 2, 2],
        "castShadow": true
      },
      {
        "mesh": "crate",
        "position": [-307, 75, 0],
        "scale": [2, 2, 2],
        "castShadow": true
      },
      {
        "mesh": "crate",
        "position": [365, 15, 275],
        "scale": [2, 2, 2]
      }
    ]
  },
  "smallCrates": {
    "items": [
      {
        "mesh": "crate",
        "position": [-254.5, 7.5, 0],
        "castShadow": true
      },
      {
        "mesh": "crate",
        "position": [-254.5, 22.5, 0],
        "castShadow": true
      },
      {
        "mesh": "crate",
        "position": [-254.5, 37.5, 0],
        "castShadow": true
      },
      {
        "mesh": "crate",
        "position": [-239.5, 7.5, 0],
        "castShadow": true
      },
      {
        "mesh": "crate",
        "position": [-239.5, 22.5, 0],
        "castShadow": true
      },
      {
        "mesh": "crate",
        "position": [-224.5, 7.5, 0],
        "castShadow": true
      },
      {
        "mesh": "crate",
        "position": [238, 7.5, 278],
        "castShadow": true
      },
      {
        "mesh": "crate",
        "position": [238, 22.5, 278],
        "castShadow": true
      },
      {
        "mesh": "crate",
        "position": [238, 37.5, 278],
        "castShadow": true
      },
      {
        "mesh": "crate",
        "position": [253, 7.5, 278],
        "castShadow": true
      },
      {
        "mesh": "crate",
        "position": [253, 22.5, 278],
        "castShadow": true
      },
      {
        "mesh": "crate",
        "position": [268, 7.5, 278],
        "castShadow": true
      }
    ]
  }
};

