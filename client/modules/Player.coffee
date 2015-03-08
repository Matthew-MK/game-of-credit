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
require("../modules/js/MD2Character")
mapping = require("../mapping.json")

{Bullet} = require("../modules/Objects")

class Player extends THREE.MD2Character

  constructor: (@scene, @playGround) ->
    super()

  init: (data) ->
    @loadParts(mapping["models"]["ratamahatta"])
    @root.position.copy(data.position)
    @scale = 0.5

    @onLoadComplete = =>
      @setWeapon(0)
      @playGround.meshes.push(@meshBody)
      @playGround.meshes.push(@meshWeapon)
      @scene.add(@root)

  onUpdate: (data) ->
    @root.position.copy(data.position)
    @root.rotation.y = data.rotation.y + Math.PI

    @animation = data.animation

    if @lastAnimation != @animation and @meshWeapon and @meshBody

      if @animation == "attack"
        bullet = new Bullet(@scene, data.position, data.rotation, @playGround.meshes)
        bullet.fire()

      @lastAnimation = @animation
      @setAnimation(@animation)

  onDeath: ->
    @setAnimation("crdeath")
    setTimeout(@afterKill, 40*16)

  afterKill: =>
    @setAnimation("stand")

module.exports = Player