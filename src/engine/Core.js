/**
 * Copyright 2015 Jan Svager
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law || agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES || CONDITIONS OF ANY KIND, either express || implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule gameEngine
 **/

/* global THREE */
import Animation from "../constants/AnimationTypes";
import Event from "../constants/EventTypes";
import { createMeshes } from "./Meshes";
import { forEach } from "underscore";
import { getKeyFromCode } from "../utils/Helpers";
import { inProduction } from "../utils/ExecutionEnvironment";

/**
 * Game engine factory
 * @param props {Object}
 * @return {Object} with public methods and properties
 */
export function createEngine(props) {

  const {
    emitter,
    socket,
    // canvas
    canvasWidth = 0,
    canvasHeight = 0,
    // player
    speed = 30,
    initialPosition = [0, 0, 0],
    initialRotation = [0, 0, 0],
    } = props;

  const aspect = canvasWidth / canvasHeight;
  const velocity = new THREE.Vector3();
  const rayCaster = new THREE.Raycaster();
  const rayDirections = {
    down: new THREE.Vector3(0, -1, 0),
    front: new THREE.Vector3(0, 0, -1)
  };
  const intersects = [];
  const collision = {
    down: true,
    front: false,
    back: false,
    left: false,
    right: false
  };
  const rotationAngle = Math.PI / 4;
  const rotationAxe = new THREE.Vector3(0, 1, 0);
  const defaultHeight = 20;

  const renderer = new THREE.WebGLRenderer(props.renderer);
  const scene = new THREE.Scene();
  const clock = new THREE.Clock();

  const camera = new THREE.PerspectiveCamera(45, aspect, 1, 10000);
  const cameraPitch = camera;
  const cameraYaw = new THREE.Object3D();

  const ambientLight = new THREE.AmbientLight(0x404040);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);

  const meshes = createMeshes(props.textures, props.models);
  const players = {};
  const bullets = {};

  var delta = 0.0;
  var deltaSpeed;
  var idx = 0;
  var mouseX = 0;
  var mouseY = 0;
  var keys = {
    W: false,
    A: false,
    S: false,
    D: false,
    SPACE: false
  };
  var move = {
    front: false,
    left: false,
    back: false,
    right: false,
    jump: false,
    shoot: false
  };
  var isJumping = false;
  var currentAnimation = Animation.STAND;
  var direction;
  var height;

  // INITIALIZATION

  // Renderer
  renderer.setSize(canvasWidth, canvasHeight);
  renderer.shadowMapEnabled = true;

  // no THREE warnings in production
  if (inProduction) {
    renderer.context.getProgramInfoLog = function () {
      return "";
    };
  }

  // Camera
  cameraYaw.add(cameraPitch);
  cameraYaw.position.set(...initialPosition);
  cameraYaw.position.y += defaultHeight;
  cameraYaw.rotation.set(...initialRotation);
  scene.add(cameraYaw);

  // Lights
  directionalLight.position.set(-520, 520, 1000);
  directionalLight.castShadow = true;
  directionalLight.shadowCameraLeft = -720;
  directionalLight.shadowCameraRight = 700;
  directionalLight.shadowCameraBottom = -300;
  directionalLight.shadowCameraNear = 550;
  directionalLight.shadowCameraFar = 1850;
  //directionalLight.shadowCameraVisible = true;
  scene.add(ambientLight);
  scene.add(directionalLight);

  // Meshes
  forEach(meshes.objectList, item => scene.add(item));

  function createPlayer(id) {
    if (players[id] !== undefined) return;
    players[id] = meshes.getMonster();
    scene.add(players[id]);
  }

  function deletePlayer(id) {
    if (players[id] === undefined) return;
    scene.remove(players[id]);
    meshes.freeMonster(players[id]);
    delete players[id];
  }

  function shootBullet(position, [rotX, rotY]) {

    const bullet = meshes.getBullet();
    bullet.position.set(position.x, position.y, position.z);
    bullet.direction = {
      x: -Math.sin(rotY),
      y: Math.sin(rotX),
      z: -Math.cos(rotY)
    };
    bullets[bullet.uuid] = bullet;
    scene.add(bullet);

    setTimeout(() => {
      scene.remove(bullet);
      delete bullets[bullet.uuid];
      meshes.freeBullet(bullet);
    }, 3000);
  }

  function animatePlayer(player, anim, fps = 6) {
    if (player.lastAnimation === anim || player.isAnimating) return;
    forEach(player.children, part =>
        part.playAnimation(Animation.getKey(anim), fps)
    );
    player.lastAnimation = anim;

    switch (anim) {
      case Animation.JUMP:
        player.isAnimating = true;
        setTimeout(() => player.isAnimating = false, 500);
        break;
      case Animation.ATTACK:
        shootBullet(player.position, [player.rotX, player.rotY]);
        break;
    }
  }

  // EVENTS
  emitter.addListener(Event.CLICK, (ammo, callback) => {
    if (move.shoot || !ammo) return;
    move.shoot = true;
    callback();
    shootBullet(cameraYaw.position, [cameraPitch.rotation._x, cameraYaw.rotation._y]);
    setTimeout(() => move.shoot = false, 1000);
  });
  emitter.addListener(Event.MOUSE_MOVE, e => {
    mouseX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
    mouseY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

    cameraYaw.rotation.y -= mouseX * 0.002;
    cameraPitch.rotation.x -= mouseY * 0.002;
    cameraPitch.rotation.x = Math.max(
      -Math.PI / 2, Math.min(Math.PI / 2, cameraPitch.rotation.x)
    );

  });
  emitter.addListener(Event.KEY_DOWN, ({ keyCode }) => {
    const key = getKeyFromCode(keyCode);
    keys[key] = keys.hasOwnProperty(key);
  });

  emitter.addListener(Event.KEY_UP, ({ keyCode }) => {
    const key = getKeyFromCode(keyCode);
    keys[key] = !keys.hasOwnProperty(key);
  });

  socket.handleLeave(deletePlayer);

  socket.handleData((id, [anim, shoot, , posX, posY, posZ, rotX, rotY]) => {
    const player = players[id];
    if (player !== undefined) {
      player.position.set(posX, posY - defaultHeight + 12, posZ);
      player.rotation.y = rotY + Math.PI / 2;
      player.rotX = rotX;
      player.rotY = rotY;
      animatePlayer(player, anim);
    } else {
      createPlayer(id);
    }
  });

  // public
  return {

    aspect: aspect,
    info: renderer.info,

    render() {
      delta = clock.getDelta();
      deltaSpeed = speed * delta;

      // Gravity
      velocity.y -= 9.823 * delta;

      // y intersect
      rayCaster.far = 1000; // avoid skyBox
      rayCaster.set(cameraYaw.position, rayDirections.down);
      collision.down = rayCaster.intersectObjects(meshes.meshList)[0];
      height = height ? cameraYaw.position.y - collision.down.distance + defaultHeight : defaultHeight;

      // xz intersects
      rayCaster.far = speed;
      direction = rayDirections.front.clone();
      for (idx = 0; idx < 8; idx++) {
        direction.applyAxisAngle(rotationAxe, idx === 0 ? cameraYaw.rotation.y : rotationAngle);
        rayCaster.set(cameraYaw.position, direction);
        intersects[idx] = !!rayCaster.intersectObjects(meshes.meshList)[0];
      }
      collision.front = intersects[7] || intersects[0] || intersects[1];
      collision.back = intersects[3] || intersects[4] || intersects[5];
      collision.right = intersects[5] || intersects[6] || intersects[7];
      collision.left = intersects[1] || intersects[2] || intersects[3];

      move.front = keys.W && !collision.front;
      move.left = keys.A && !collision.left;
      move.back = keys.S && !collision.back;
      move.right = keys.D && !collision.right;
      move.jump = keys.SPACE && !isJumping;

      // Player move
      if (move.front) {
        velocity.z -= deltaSpeed;
      }
      if (move.left) {
        velocity.x -= deltaSpeed;
      }
      if (move.back) {
        velocity.z += deltaSpeed;
      }

      if (move.right) {
        velocity.x += deltaSpeed;
      }
      if (move.jump) {
        velocity.y += 3.0;
        isJumping = true;
      }

      currentAnimation = Animation.STAND;
      if (move.front || move.left || move.back || move.right) currentAnimation = Animation.RUN;
      if (move.jump) currentAnimation = Animation.JUMP;
      if (move.shoot) currentAnimation = Animation.ATTACK;

      forEach(players, player =>
          forEach(player.children, part => part.updateAnimation(delta * 1000))
      );
      forEach(bullets, bullet => {
        bullet.position.x += bullet.direction.x * speed;
        bullet.position.y += bullet.direction.y * speed;
        bullet.position.z += bullet.direction.z * speed;
      });

      cameraYaw.translateX(velocity.x);
      cameraYaw.translateY(velocity.y);
      cameraYaw.translateZ(velocity.z);

      // Ground check
      if (cameraYaw.position.y < height) {
        velocity.y = 0.0;
        cameraYaw.position.y = height;
        isJumping = false;
      }

      velocity.x -= velocity.x * deltaSpeed;
      velocity.z -= velocity.z * deltaSpeed;


      // temporary prevent loading bug with reload TODO fix it
      try {
        renderer.render(scene, camera);
      } catch (err) {
        window.location.reload();
      }
    },
    animate(callback) {
      const animationFrame = () => {
        if (callback()) return;
        this.render();
        socket.emitData([
          0,
          currentAnimation,
          0,
          0,
          cameraYaw.position.x,
          cameraYaw.position.y,
          cameraYaw.position.z,
          cameraPitch.rotation.x,
          cameraYaw.rotation.y
        ]);
        requestAnimationFrame(animationFrame);
      };
      requestAnimationFrame(animationFrame);
    },
    resize(size) {
      camera.aspect = size.canvasWidth / size.canvasHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(size.canvasWidth, size.canvasHeight);
    }
  };
}
