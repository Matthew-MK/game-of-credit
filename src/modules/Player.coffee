###
Copyright 2015 Jan Svager

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
###
require("../modules/MD2Character")
mapping = require("../mapping.json")

class Player extends THREE.MD2Character

  lastAnimation: null

  constructor: (position) ->
    super()
    @loadParts(mapping["models"]["ratamahatta"])
    @root.position.copy(position)
    @onLoadComplete = =>
      @setWeapon(0)

  onUpdate: (data) ->
    @root.position.copy(data.position)
    @root.rotation.y = data.rotation.y + Math.PI

    if @lastAnimation != data.animation and @meshWeapon and @meshBody
      @lastAnimation = data.animation
      @setAnimation(data.animation)

module.exports = Player