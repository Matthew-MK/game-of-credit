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
Base = require("./Base")

class Lights extends Base
  init: ->
    @ambientLight = new THREE.AmbientLight(0x404040)
    @directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    @directionalLight.position.set(-520, 520, 1000)
    @directionalLight.castShadow = true

    @directionalLight.shadowCameraLeft = -720
    @directionalLight.shadowCameraRight = 700
    @directionalLight.shadowCameraBottom = -300
    @directionalLight.shadowCameraNear = 550
    @directionalLight.shadowCameraFar = 1850

    @scene.add(@ambientLight)
    @scene.add(@directionalLight)

module.exports = Lights