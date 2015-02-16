###
Copyright 2015 Jan Svager & Michael Muller

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
helpers = require("./helpers")

class ColorCube extends THREE.Mesh
  constructor: (@width, @height, @depth, @color) ->
    super(
      new THREE.BoxGeometry(@width, @height, @depth),
      new THREE.MeshBasicMaterial(color: @color)
    )

class SkyBox extends THREE.Mesh
  constructor: (@width, @height, @depth, textures) ->
    shader = THREE.ShaderLib["cube"]
    shader.uniforms["tCube"].value = textures
    super(
      new THREE.BoxGeometry(@width, @height, @depth),
      new THREE.ShaderMaterial
        fragmentShader: shader.fragmentShader
        vertexShader: shader.vertexShader
        uniforms: shader.uniforms
        depthWrite: false
        side: THREE.BackSide
    )

class Plane extends THREE.Mesh
  constructor: (width, height, texture) ->
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(16, 16)

    super(
      new THREE.PlaneBufferGeometry(width, height),
      new THREE.MeshPhongMaterial(
        map: texture
        specular: 0x111111,
        shininess: 50,
        morphTargets: true,
        morphNormals: true,
        metal: true
      )
    )
class Shoot
  constructor: (@shootingDelay) ->
    shootingDelay = @shootingDelay

class Bullet extends THREE.Mesh
  constructor: (position, rotationY, rotationX, scene, @size, @color, @shoot) ->
    super(
      new THREE.SphereGeometry(@size, 50, 50),
      new THREE.MeshBasicMaterial(color: @color)
    )
    @shoot.shootingDelay = false
    @position.x = position.x
    @position.y = position.y
    @position.z = position.z

    setInterval =>
      @fire(8, rotationY, rotationX)
    , 10
    setTimeout =>
      @shoot.shootingDelay = true
    , 500
    setTimeout =>
      scene.remove(@)
    , 2500

  fire: (speed, rotY, rotX) ->
    moveX = Math.sin(rotY) * speed
    moveZ = Math.cos(rotY) * speed
    moveY = Math.sin(rotX) * speed
    x = @position.x - moveX
    z = @position.z - moveZ
    y = @position.y + moveY
    @position.set(x, y, z)

class HeightMap extends THREE.Mesh

  vertexShader: """
    uniform sampler2D heightMap;
    uniform float scale;

    varying float vAmount;
    varying vec2 vUV;

    void main()
    {
      vUV = uv;
      vec4 img = texture2D(heightMap, uv);

      // assuming map is grayscale it doesn't matter if you use r, g, or b.
      vAmount = img.r;

      // move the position along the normal
      vec3 newPosition = position + normal * scale * vAmount;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  """

  fragmentShader: """
    uniform sampler2D dirtTexture;
    uniform sampler2D sandyTexture;
    uniform sampler2D grassTexture;
    uniform sampler2D rockyTexture;
    uniform sampler2D snowyTexture;

    varying vec2 vUV;

    varying float vAmount;

    void main()
    {
      vec4 dirt = (smoothstep(0.01, 0.05, vAmount) - smoothstep(0.02, 0.26, vAmount)) * texture2D( dirtTexture, vUV * 10.0 );
      vec4 sand = (smoothstep(0.08, 0.27, vAmount) - smoothstep(0.30, 0.33, vAmount)) * texture2D( sandyTexture, vUV * 10.0 );
      vec4 grass = (smoothstep(0.30, 0.33, vAmount) - smoothstep(0.34, 0.35, vAmount)) * texture2D( grassTexture, vUV * 20.0 );
      vec4 rock = (smoothstep(0.30, 0.38, vAmount) - smoothstep(0.65, 0.75, vAmount)) * texture2D( rockyTexture, vUV * 20.0 );
      vec4 snow = (smoothstep(0.65, 0.75, vAmount))                                   * texture2D( snowyTexture, vUV * 10.0 );

      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0) + dirt + sand + grass + rock + snow;
    }
  """
  constructor: (width, height, textures, scale = 200) ->
    heightMap = textures.heightMap
    heightMap.wrapS = heightMap.wrapT = THREE.RepeatWrapping
    dirtTexture = textures.dirt
    dirtTexture.wrapS = dirtTexture.wrapT = THREE.RepeatWrapping
    sandyTexture = textures.sand
    sandyTexture.wrapS = sandyTexture.wrapT = THREE.RepeatWrapping
    grassTexture = textures.grass
    grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping
    rockyTexture = textures.rock
    rockyTexture.wrapS = rockyTexture.wrapT = THREE.RepeatWrapping
    snowyTexture = textures.snow
    snowyTexture.wrapS = snowyTexture.wrapT = THREE.RepeatWrapping

    super(
      new THREE.PlaneBufferGeometry(width, height, 100, 100)
      new THREE.ShaderMaterial
        uniforms:
          heightMap:
            type: "t", value: heightMap
          scale:
            type: "f", value: scale
          dirtTexture:
            type: "t", value: dirtTexture
          sandyTexture:
            type: "t", value: sandyTexture
          grassTexture:
            type: "t", value: grassTexture
          rockyTexture:
            type: "t", value: rockyTexture
          snowyTexture:
            type: "t", value: snowyTexture
        vertexShader: @vertexShader
        fragmentShader: @fragmentShader
    )

module.exports =
  ColorCube: ColorCube
  Plane: Plane
  SkyBox: SkyBox
  HeightMap: HeightMap
  Shoot: Shoot
  Bullet: Bullet