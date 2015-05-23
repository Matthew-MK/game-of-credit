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
 * @providesModule gameEngine
 **/

/* global THREE */
import { createModels } from "./Models";

/**
 * Game engine factory
 * @param props {Object}
 * @return {Object} with public methods and properties
 */
export function createEngine(props) {

  const {
    emitter,
    // canvas
    width = 0,
    height = 0,
    // player
    speed = 20,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    } = props;

  const aspect = width / height;
  const velocity = new THREE.Vector3();
  const rayCaster = new THREE.Raycaster();
  const rayDirection = new THREE.Vector3(0, -1, 0);

  const renderer = new THREE.WebGLRenderer(props.renderer);
  const scene = new THREE.Scene();
  const clock = new THREE.Clock();

  const camera = new THREE.PerspectiveCamera(45, aspect, 1, 10000);
  const cameraPitch = camera;
  const cameraYaw = new THREE.Object3D();

  const ambientLight = new THREE.AmbientLight(0x404040);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);

  const models = createModels(props.textures);

  var delta = 0;
  var mouse = {
    x: 0,
    y: 0
  };
  var keys = {
    W: false,
    A: false,
    S: false,
    D: false,
    SPACE: false
  };
  var distance;
  var intersections;

  function onClick() {
    console.log("click");
  }

  function onMouseMove({x, y}) {
    if (mouse.x !== x || mouse.y !== y) {
      mouse = {x, y};
      cameraYaw.rotation.y -= mouse.x * 0.002;
      cameraPitch.rotation.x -= mouse.y * 0.002;
      cameraPitch.rotation.x = Math.max(
        -Math.PI / 2, Math.min(Math.PI / 2, cameraPitch.rotation.x)
      );
    }
  }

  function codeToKey(keyCode) {
    const char = String.fromCharCode(keyCode);
    switch (char) {
      case " ":
        return "SPACE";
      default:
        return char;
    }
  }

  function onKeyDown(keyCode) {
    const key = codeToKey(keyCode);
    if (keys.hasOwnProperty(key)) keys[key] = true;
  }

  function onKeyUp(keyCode) {
    const key = String.fromCharCode(keyCode);
    if (keys.hasOwnProperty(key)) keys[key] = false;
  }

  // Listeners
  const { eventTypes } = emitter;
  emitter.addListener(eventTypes.CLICK, onClick);
  emitter.addListener(eventTypes.MOUSE_MOVE, onMouseMove);
  emitter.addListener(eventTypes.KEY_DOWN, onKeyDown);
  emitter.addListener(eventTypes.KEY_UP, onKeyUp);

  // INITIALIZATION

  // Renderer
  renderer.setSize(width, height);
  renderer.shadowMapEnabled = true;

  // Camera
  cameraYaw.add(cameraPitch);
  cameraYaw.position.set(...position);
  cameraYaw.position.y += 10;
  cameraYaw.rotation.set(...rotation);
  scene.add(cameraYaw);

  // Lights
  directionalLight.position.set(-520, 520, 1000);
  directionalLight.castShadow = true;
  directionalLight.shadowCameraLeft = -720;
  directionalLight.shadowCameraRight = 700;
  directionalLight.shadowCameraBottom = -300;
  directionalLight.shadowCameraNear = 550;
  directionalLight.shadowCameraFar = 185;
  scene.add(ambientLight);
  scene.add(directionalLight);

  // Models
  models.forEach(mesh => scene.add(mesh));

  console.log(models[0]);

  // public
  return {

    aspect: aspect,
    info: renderer.info,

    render() {
      delta = clock.getDelta();

      // Gravity
      velocity.y -= 9.823 * delta;

      rayCaster.set(cameraYaw.position, rayDirection);
      rayCaster.far = 1000; // avoid skybox
      intersections = rayCaster.intersectObjects(models);
      distance = intersections[0].distance;
//      console.log(Math.abs(Math.round(cameraYaw.position.y - distance)) + 10)


      // Player move
      if (keys.W) velocity.z -= speed * delta;
      if (keys.S) velocity.z += speed * delta;
      if (keys.A) velocity.x -= speed * delta;
      if (keys.D) velocity.x += speed * delta;

      cameraYaw.translateX(velocity.x);
      cameraYaw.translateY(velocity.y);
      cameraYaw.translateZ(velocity.z);

      // Ground check
      if (cameraYaw.position.y < 10){
        velocity.y = 0;
        cameraYaw.position.y = 10;
      }

      velocity.x -= velocity.x * speed * delta;
      velocity.z -= velocity.z * speed * delta;



      renderer.render(scene, camera);
    },
    animate(callback) {
      const animationFrame = () => {
        this.render();
        callback();
        return requestAnimationFrame(animationFrame);
      };
      requestAnimationFrame(animationFrame);
    },
    resize(size) {
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();
      renderer.setSize(size.width, size.height);
    }
  };
}
