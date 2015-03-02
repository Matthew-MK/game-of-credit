!function(t){function e(n){if(i[n])return i[n].exports;var s=i[n]={exports:{},id:n,loaded:!1};return t[n].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){"use strict";var n,s,o,r,a,h,p;a=i(1),s=i(5),n=function(t){return document.getElementById(t)},o=n("app"),r=n("bundle"),h=o.dataset.env,p=r.dataset.server,i(18),a.render(s({env:h,server:p}),o)},function(t){t.exports=React},function(t,e,i){var n,s,o,r,a,h,p,c=function(t,e){function i(){this.constructor=t}for(var n in e)u.call(e,n)&&(t[n]=e[n]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t},u={}.hasOwnProperty,d=function(t,e){return function(){return t.apply(e,arguments)}};p=i(4),s=function(t){function e(t,i,n,s){this.width=t,this.height=i,this.depth=n,this.color=s,e.__super__.constructor.call(this,new THREE.BoxGeometry(this.width,this.height,this.depth),new THREE.MeshBasicMaterial({color:this.color}))}return c(e,t),e}(THREE.Mesh),h=function(t){function e(t,i,n,s,o,r,a){this.width=t,this.height=i,this.depth=n,o&&(s.wrapS=s.wrapT=THREE.RepeatWrapping,s.repeat.set(r,a)),e.__super__.constructor.call(this,new THREE.BoxGeometry(this.width,this.height,this.depth),new THREE.MeshPhongMaterial({map:s,specular:1118481,shininess:50,metal:!0}))}return c(e,t),e}(THREE.Mesh),a=function(t){function e(t,i,n,s){var o;this.width=t,this.height=i,this.depth=n,o=THREE.ShaderLib.cube,o.uniforms.tCube.value=s,e.__super__.constructor.call(this,new THREE.BoxGeometry(this.width,this.height,this.depth),new THREE.ShaderMaterial({fragmentShader:o.fragmentShader,vertexShader:o.vertexShader,uniforms:o.uniforms,depthWrite:!1,side:THREE.BackSide}))}return c(e,t),e}(THREE.Mesh),r=function(t){function e(t,i,n,s,o){n.wrapS=n.wrapT=THREE.RepeatWrapping,n.repeat.set(s,o),e.__super__.constructor.call(this,new THREE.PlaneBufferGeometry(t,i),new THREE.MeshLambertMaterial({map:n}))}return c(e,t),e}(THREE.Mesh),n=function(t){function e(t,i,n,s,o){var r,a;this.scene=t,this.objects=s,null==o&&(o={}),this.destroy=d(this.destroy,this),this.move=d(this.move,this),this.speed=o.speed||20,a=o.size||1,r=o.color||"white",e.__super__.constructor.call(this,new THREE.SphereGeometry(a,15,15),new THREE.MeshBasicMaterial({color:r})),this.position.copy(i),this.direction=this.getDirection(n),this.rayCaster=new THREE.Raycaster,this.rayCaster.far=this.speed,this.rayCaster.ray.direction.copy(this.direction)}return c(e,t),e.prototype.died=!1,e.prototype.getDirection=function(t){var e,i,n;return e=-Math.sin(t.y),i=Math.sin(t.x),n=-Math.cos(t.y),new THREE.Vector3(e,i,n)},e.prototype.move=function(){var t,e;if(!this.died)return this.position.x+=this.direction.x*this.speed,this.position.y+=this.direction.y*this.speed,this.position.z+=this.direction.z*this.speed,this.rayCaster.ray.origin.copy(this.position),t=this.rayCaster.intersectObjects(this.objects),t.length>0?(e=t[0].object,e instanceof THREE.MorphAnimMesh&&"function"==typeof this.killed&&this.killed(e),this.destroy()):void 0},e.prototype.destroy=function(){return this.died?void 0:(this.died=!0,this.scene.remove(this))},e.prototype.fire=function(t){return this.killed=t,this.scene.add(this),setInterval(this.move,16),setTimeout(this.destroy,2e3)},e}(THREE.Mesh),o=function(t){function e(t,i,n,s){var o,r,a,h,p,c;null==s&&(s=200),a=n.heightMap,a.wrapS=a.wrapT=THREE.RepeatWrapping,o=n.dirt,o.wrapS=o.wrapT=THREE.RepeatWrapping,p=n.sand,p.wrapS=p.wrapT=THREE.RepeatWrapping,r=n.grass,r.wrapS=r.wrapT=THREE.RepeatWrapping,h=n.rock,h.wrapS=h.wrapT=THREE.RepeatWrapping,c=n.snow,c.wrapS=c.wrapT=THREE.RepeatWrapping,e.__super__.constructor.call(this,new THREE.PlaneBufferGeometry(t,i,100,100),new THREE.ShaderMaterial({uniforms:{heightMap:{type:"t",value:a},scale:{type:"f",value:s},dirtTexture:{type:"t",value:o},sandyTexture:{type:"t",value:p},grassTexture:{type:"t",value:r},rockyTexture:{type:"t",value:h},snowyTexture:{type:"t",value:c}},vertexShader:this.vertexShader,fragmentShader:this.fragmentShader}))}return c(e,t),e.prototype.vertexShader="uniform sampler2D heightMap;\nuniform float scale;\n\nvarying float vAmount;\nvarying vec2 vUV;\n\nvoid main()\n{\n  vUV = uv;\n  vec4 img = texture2D(heightMap, uv);\n\n  // assuming map is grayscale it doesn't matter if you use r, g, or b.\n  vAmount = img.r;\n\n  // move the position along the normal\n  vec3 newPosition = position + normal * scale * vAmount;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);\n}",e.prototype.fragmentShader="uniform sampler2D dirtTexture;\nuniform sampler2D sandyTexture;\nuniform sampler2D grassTexture;\nuniform sampler2D rockyTexture;\nuniform sampler2D snowyTexture;\n\nvarying vec2 vUV;\n\nvarying float vAmount;\n\nvoid main()\n{\n  vec4 dirt = (smoothstep(0.01, 0.05, vAmount) - smoothstep(0.02, 0.26, vAmount)) * texture2D( dirtTexture, vUV * 10.0 );\n  vec4 sand = (smoothstep(0.08, 0.27, vAmount) - smoothstep(0.30, 0.33, vAmount)) * texture2D( sandyTexture, vUV * 10.0 );\n  vec4 grass = (smoothstep(0.30, 0.33, vAmount) - smoothstep(0.34, 0.35, vAmount)) * texture2D( grassTexture, vUV * 20.0 );\n  vec4 rock = (smoothstep(0.30, 0.38, vAmount) - smoothstep(0.65, 0.75, vAmount)) * texture2D( rockyTexture, vUV * 20.0 );\n  vec4 snow = (smoothstep(0.65, 0.75, vAmount))                                   * texture2D( snowyTexture, vUV * 10.0 );\n\n  gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0) + dirt + sand + grass + rock + snow;\n}",e}(THREE.Mesh),t.exports={ColorCube:s,Plane:r,SkyBox:a,HeightMap:o,Bullet:n,TexturedCube:h}},function(t){t.exports={eventType:{stand:0,crwalk:1,run:2,jump:3,attack:4},textures:{baseUrl:"static/textures/",items:{dirt:"dirt-512.jpg",grass:"grass-512.jpg",heightMap:"height_map_1024.png",rock:"rock-512.jpg",sand:"sand-512.jpg",skyBox:["front.jpg","back.jpg","up.jpg","down.jpg","right.jpg","left.jpg"],snow:"snow-512.jpg",wall:"wall.JPG",woodCrate:"crate.gif",metal:"metal.jpg",step:"step.jpg",mud:"mud.jpg"}},models:{ratamahatta:{baseUrl:"static/textures/ratamahatta",body:"ratamahatta.json",skins:["ratamahatta.png"],weapons:[["weapon.json","weapon.png"]]}},respawns:[{position:[-279,60,426],rotation:-1.57},{position:[100,0,0],rotation:0},{position:[0,0,300],rotation:0},{position:[243,0,-493],rotation:3.14},{position:[-357,0,96],rotation:3.14},{position:[497,0,465],rotation:0},{position:[-470,0,-481],rotation:3.14},{position:[-464,0,115],rotation:0},{position:[-185,0,479],rotation:0},{position:[498,0,-46],rotation:0},{position:[341,120,200],rotation:1.57},{position:[-46,60,-180],rotation:-1.57},{position:[474,60,-466],rotation:1.57}],ui:{crosshair:"static/ui/crosshair.png"}}},function(t,e){e.getImageData=function(t){var e,i;return e=document.createElement("canvas"),e.width=t.width,e.height=t.height,i=e.getContext("2d"),i.drawImage(t,0,0),i.getImageData(0,0,t.width,t.height)},e.getPixel=function(t,e,i){var n,s;return s=4*(e+t.width*i),n=t.data,{r:n[s],g:n[s+1],b:n[s+2],a:n[s+3]}}},function(t,e,i){var n,s,o,r,a,h,p,c,u;a=i(1),s=i(6),o=i(7),h=i(9),u=i(3),c=i(4),r=a.addons.PureRenderMixin,p=a.DOM.div,n=a.createClass({mixins:[r],LOADING:0,INITIATING:1,MENU:2,PLAYING:3,textures:{},player:{},getInitialState:function(){return{next:this.LOADING,windowWidth:window.innerWidth,windowHeight:window.innerHeight}},handleResize:function(){return this.setState({windowWidth:window.innerWidth,windowHeight:window.innerHeight})},handleLoading:function(t,e,i){return e===i&&this.state.next===this.LOADING?this.setState({next:this.INITIATING},this.init):void 0},handleClick:function(){return this.state.next===this.PLAYING?this.player.onClick():void 0},handleBlockerState:function(t){return this.setState({next:t?this.PLAYING:this.MENU})},init:function(){var t,e;return e=u.respawns,t=e[Math.floor(Math.random()*e.length)],this.player.position=function(t,e,i){i.prototype=t.prototype;var n=new i,s=t.apply(n,e);return Object(s)===s?s:n}(THREE.Vector3,t.position,function(){}),this.player.rotation=new THREE.Vector3(0,t.rotation),this.setState({next:this.MENU})},componentWillMount:function(){var t,e,i,n,s,o,r;THREE.DefaultLoadingManager.onProgress=this.handleLoading,t=u.textures.baseUrl,o=u.textures.items,r=[];for(n in o)e=o[n],"string"==typeof e?r.push(this.textures[n]=new THREE.ImageUtils.loadTexture(t+e)):(i=function(){var i,n,o;for(o=[],i=0,n=e.length;n>i;i++)s=e[i],o.push(t+s);return o}(),r.push(this.textures[n]=new THREE.ImageUtils.loadTextureCube(i)));return r},componentDidMount:function(){return window.addEventListener("resize",this.handleResize)},componentWillUnmount:function(){return window.removeEventListener("resize",this.handleResize)},render:function(){return this.state.next===this.LOADING||this.state.next===this.INITIATING?p({id:"loading"},"Loading..."):p({id:"wrapper",onClick:this.handleClick},h({width:this.state.windowWidth,height:this.state.windowHeight,playing:this.state.next===this.PLAYING}),s({sendState:this.handleBlockerState}),o({width:this.state.windowWidth,height:this.state.windowHeight,playing:this.state.next===this.PLAYING,dataServer:this.props.server,player:this.player,textures:this.textures}))}}),t.exports=a.createFactory(n)},function(t,e,i){var n,s,o,r,a,h;o=i(1),s=o.addons.PureRenderMixin,h=o.DOM,r=h.div,a=h.span,n=o.createClass({mixins:[s],locked:!1,getInitialState:function(){return{pointerLocked:!1}},handleClick:function(){var t;if(!this.locked&&this.havePointerLock)return t=this.refs.blocker.getDOMNode(),t.requestPointerLock=t.requestPointerLock||t.mozRequestPointerLock||t.webkitRequestPointerLock,t.requestPointerLock()},handleLockChange:function(){var t,e;return t=this.refs.blocker.getDOMNode(),e=document.pointerLockElement===t||document.mozPointerLockElement===t||document.webkitPointerLockElement===t,this.locked!==e?(this.locked=e,this.setState({pointerLocked:e}),this.props.sendState(e)):void 0},componentDidMount:function(){return this.havePointerLock?(document.addEventListener("pointerlockchange",this.handleLockChange),document.addEventListener("mozpointerlockchange",this.handleLockChange),document.addEventListener("webkitpointerlockchange",this.handleLockChange)):void 0},componentWillUnmount:function(){return this.havePointerLock?(document.removeEventListener("pointerlockchange",this.handleLockChange),document.removeEventListener("mozpointerlockchange",this.handleLockChange),document.removeEventListener("webkitpointerlockchange",this.handleLockChange)):void 0},render:function(){var t,e;return this.havePointerLock="pointerLockElement"in document||"mozPointerLockElement"in document||"webkitPointerLockElement"in document,this.havePointerLock?(e="Click to play",t="(W, A, S, D = Move, SPACE = Jump, MOUSE = Look around)"):(e="Sorry",t="Your browser doesn't seem to support Pointer Lock API"),r({id:"blocker",ref:"blocker",onClick:this.handleClick,style:{opacity:+!this.state.pointerLocked}},r({id:"instructions"},a({},e),a({},t)))}}),t.exports=o.createFactory(n)},function(t,e,i){var n,s,o,r,a,h,p,c,u;h=i(1),c=i(8),s=i(10),n=i(2).Bullet,r=i(11),p=i(13),a=h.addons.PureRenderMixin,u=h.DOM.canvas,o=h.createClass({mixins:[a],players:{},textures:{},clock:new THREE.Clock,getInitialState:function(){return{frameCount:0}},handleMouseMove:function(t){return this.props.playing?this.controls.handleMouseMove(t):void 0},resetFrameCount:function(){return setTimeout(this.resetFrameCount,1e3),this.fps=this.state.frameCount,this.setState({frameCount:0})},initScene:function(){var t,e,i,n,o;for(this.scene=new THREE.Scene,this.camera=new THREE.PerspectiveCamera(45,this.props.width/this.props.height,1,1e4),this.renderer=new THREE.WebGLRenderer({canvas:this.refs.render.getDOMNode(),antialias:!1}),this.renderer.setSize(this.props.width,this.props.height),this.ambientLight=new THREE.AmbientLight(4210752),this.directionalLight=new THREE.DirectionalLight(16777215,1),this.directionalLight.position.set(-520,520,1e3),this.directionalLight.castShadow=!0,this.directionalLight.shadowCameraLeft=-720,this.directionalLight.shadowCameraRight=700,this.directionalLight.shadowCameraBottom=-300,this.directionalLight.shadowCameraNear=550,this.directionalLight.shadowCameraFar=1850,this.playGround=new r(this.props.textures),this.sockets=new p(this.props.dataServer,this.scene,this.players,this.playGround),this.controls=new s(this.scene,this.camera,this.sockets,this.props.player,this.players,this.playGround.meshes),this.scene.add(this.ambientLight),this.scene.add(this.directionalLight),this.scene.add(this.controls.getCamera()),n=this.playGround.meshes,o=[],e=0,i=n.length;i>e;e++)t=n[e],o.push(this.scene.add(t));return o},renderFrame:function(){var t,e,i,n;t=this.clock.getDelta(),this.controls.update(t,this.props.playing),this.sockets.update(this.controls),n=this.players;for(e in n)i=n[e],i.update(t);return this.renderer.render(this.scene,this.camera)},animate:function(){return this.setState({frameCount:++this.state.frameCount}),this.renderFrame(),requestAnimationFrame(this.animate)},componentDidMount:function(){return this.resetFrameCount(),this.initScene(),window.addEventListener("mousemove",this.handleMouseMove),this.animate()},componentWillUpdate:function(){return this.width!==this.props.width||this.height!==this.props.height?(this.width=this.props.width,this.height=this.props.height,this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height)):void 0},componentWillUnmount:function(){return window.removeEventListener("mousemove",this.handleMouseMove)},render:function(){return u({id:"render",ref:"render"})}}),t.exports=h.createFactory(o)},function(t,e,i){var n,s,o;n=i(1),o=n.DOM.div,s=n.createClass({render:function(){return o({id:"stats",style:{position:"absolute"},dangerouslySetInnerHTML:{__html:this.props.stats.domElement.innerHTML}})}}),t.exports=function(t){return null==t&&(t=null),n.createElement(s,t)}},function(t,e,i){var n,s,o,r,a,h;o=i(1),h=i(3),s=o.addons.PureRenderMixin,a=o.DOM.div,n=o.createFactory(o.createClass({mixins:[s],crosshairUrl:h.ui.crosshair,render:function(){return a({id:"crosshair",style:{top:this.props.height/2-43,left:this.props.width/2-43,opacity:this.props.playing?1:0,backgroundImage:"url('"+this.crosshairUrl+"')"}})}})),r=o.createClass({mixins:[s],render:function(){return a({id:"ui"},n({width:this.props.width,height:this.props.height,playing:this.props.playing}))}}),t.exports=o.createFactory(r)},function(t,e,i){var n,s,o,r=function(t,e){return function(){return t.apply(e,arguments)}};o=i(16),n=i(2).Bullet,s=function(){function t(t,e,i,n,s,o){this.scene=t,this.sockets=i,this.players=s,this.objects=o,this.handleFire=r(this.handleFire,this),this.cameraPitch=e,this.cameraYaw=new THREE.Object3D,this.cameraYaw.add(this.cameraPitch),n.position.y+=this.defaultHeight,n.onClick=this.handleFire,this.cameraYaw.position.copy(n.position),this.cameraYaw.rotation.y=n.rotation.y,this.updateProps()}return t.prototype.defaultHeight=12,t.prototype.defaultSpeed=10,t.prototype.rayCaster=new THREE.Raycaster,t.prototype.velocity=new THREE.Vector3,t.prototype.animation="stand",t.prototype.fired=!1,t.prototype.jumped=!1,t.prototype.moved=!1,t.prototype.sprinted=!1,t.prototype.intersects=[],t.prototype.directions={axe:new THREE.Vector3(0,1,0),"default":new THREE.Vector3(0,0,1),down:new THREE.Vector3(0,-1,0)},t.prototype.updateProps=function(){var t,e;return this.position=this.cameraYaw.position,t=this.cameraPitch.rotation._x,e=this.cameraYaw.rotation._y,this.rotation=new THREE.Vector3(t,e),this.animation="stand",this.moved&&(this.animation="crwalk"),this.jumped&&(this.animation="jump"),this.moved&&this.sprinted&&(this.animation="run"),this.fired?this.animation="attack":void 0},t.prototype.getCamera=function(){return this.cameraYaw},t.prototype.getIntersect=function(t,e){var i;return null==e&&(e=1/0),this.rayCaster.set(this.cameraYaw.position,t),this.rayCaster.far=e,i=this.rayCaster.intersectObjects(this.objects),i.length>0?i[0]:!1},t.prototype.update=function(t,e){var i,n,s,r,a,h,p,c,u,d,l,m,f,y;if(e){for(this.updateProps(),this.velocity.y-=9.823*t,m=o.isPressed("W"),l=o.isPressed("S"),u=o.isPressed("A"),d=o.isPressed("D"),this.moved=m||l||u||d,this.sprinted=o.shift,f=this.sprinted?2*this.defaultSpeed:this.defaultSpeed,s=this.getIntersect(this.directions.down,1e3).distance,this.height=Math.abs(Math.round(this.position.y-s))+this.defaultHeight,i=Math.PI/4,n=this.directions["default"].clone().applyAxisAngle(this.directions.axe,this.rotation.y),this.intersects[0]=!!this.getIntersect(n,f),r=y=1;7>=y;r=++y)n=n.applyAxisAngle(this.directions.axe,i),this.intersects[r]=!!this.getIntersect(n,f);return a=this.intersects[7]||this.intersects[0]||this.intersects[1],c=this.intersects[1]||this.intersects[2]||this.intersects[3],h=this.intersects[3]||this.intersects[4]||this.intersects[5],p=this.intersects[5]||this.intersects[6]||this.intersects[7],this.moved&&(m&&!h&&(this.velocity.z-=f*t),l&&!a&&(this.velocity.z+=f*t),u&&!p&&(this.velocity.x-=f*t),d&&!c&&(this.velocity.x+=f*t)),o.isPressed("space")&&(this.jumped||(this.velocity.y+=3),this.jumped=!0),this.cameraYaw.translateX(this.velocity.x),this.cameraYaw.translateY(this.velocity.y),this.cameraYaw.translateZ(this.velocity.z),this.cameraYaw.position.y<this.height&&(this.jumped=!1,this.velocity.y=0,this.cameraYaw.position.y=this.height),this.velocity.x-=this.velocity.x*this.defaultSpeed*t,this.velocity.z-=this.velocity.z*this.defaultSpeed*t}},t.prototype.handleFire=function(){var t,e;if(!this.fired)return this.fired=!0,e=function(t){return function(){return t.fired=!1}}(this),setTimeout(e,1120),t=new n(this.scene,this.position,this.rotation,this.objects),t.fire(function(t){return function(e){var i,n,s,o,r,a,h;r=e.uuid,a=t.players,h=[];for(i in a){if(o=a[i],n=o.meshBody,s=o.meshWeapon,r===n.uuid||r===s.uuid){t.sockets.kill(i);break}h.push(void 0)}return h}}(this))},t.prototype.handleMouseMove=function(t){var e,i;return e=t.movementX||t.mozMovementX||t.webkitMovementX||0,i=t.movementY||t.mozMovementY||t.webkitMovementY||0,this.cameraYaw.rotation.y-=.002*e,this.cameraPitch.rotation.x-=.002*i,this.cameraPitch.rotation.x=Math.max(-Math.PI/2,Math.min(Math.PI/2,this.cameraPitch.rotation.x))},t}(),t.exports=s},function(t,e,i){var n,s,o,r,a;a=i(2),n=a.Plane,r=a.TexturedCube,o=a.SkyBox,s=function(){function t(t){var e,i,s,a,h,p,c,u,d,l,m,f,y,g,v,w,E,k,x,T,M,b,R,C,S,L,P,H,A,W,B,D;for(x=function(t,e,i){return new THREE.Vector3(t,e,i)},w=new o(8e3,8e3,8e3,t.skyBox),this.meshes.push(w),y=new THREE.Object3D,u=new n(1024,1024,t.grass,16,16),u.rotation.x-=Math.PI/2,y.add(u),this.meshes.push(u),c=new n(1024,128,t.wall,16,2),c.rotation.y=Math.PI,c.position.set(0,64,512),y.add(c),this.meshes.push(c),d=new n(1024,128,t.wall,16,2),d.rotation.y-=Math.PI/2,d.position.set(512,64,0),y.add(d),this.meshes.push(d),l=new n(1024,128,t.wall,16,2),l.rotation.y=Math.PI/2,l.position.set(-512,64,0),y.add(l),this.meshes.push(l),p=new n(1024,128,t.wall,16,2),p.position.set(0,64,-512),y.add(p),this.meshes.push(p),this.pyramid=new THREE.Object3D,f=[x(15,22.5,0),x(0,22.5,15),x(15,22.5,15),x(0,22.5,-15),x(-15,22.5,0),x(-15,22.5,-15),x(-15,22.5,15),x(15,22.5,-15),x(-30,7.5,30),x(-30,7.5,-30),x(30,7.5,-30),x(30,7.5,30),x(15,7.5,30),x(0,7.5,30),x(-15,7.5,30),x(30,7.5,15),x(30,7.5,0),x(30,7.5,-15),x(-30,7.5,-15),x(-30,7.5,0),x(-30,7.5,15),x(-15,7.5,-30),x(0,7.5,-30),x(15,7.5,-30),x(0,37.5,0)],T=0,C=f.length;C>T;T++)m=f[T],s=new r(15,15,15,t.woodCrate,!1),m.z+=100,s.position.copy(m),this.pyramid.add(s),this.meshes.push(s);for(g=new n(64,132,t.mud,1,4),g.rotation.x-=2*Math.PI/3,g.position.set(-390,27,305),this.meshes.push(g),v=new r(250,60,150,t.rock,!0,12,5),v.position.set(387,30,-437),this.meshes.push(v),v=new r(300,60,150,t.rock,!0,12,5),v.position.set(-362,30,437),this.meshes.push(v),f=[x(467,7.5,-357),x(467,22.5,-357),x(467,37.5,-357),x(467,7.5,-347),x(467,22.5,-347),x(467,7.5,-337),x(-342,67.5,367),x(-282,67.5,367),x(-232,67.5,367)],M=0,S=f.length;S>M;M++)m=f[M],k=new r(30,15,10,t.step,!0,1,1),k.position.copy(m),this.meshes.push(k);for(f=[x(350,30,350),x(-250,30,-352),x(-352,30,0),x(-352,90,0),x(-292,30,0),x(-412,30,0),x(-292,30,120),x(-352,90,120),x(-412,30,120),x(-292,30,180),x(-337,30,-90),x(337,30,165),x(337,90,165),x(397,30,165),x(455,30,-50),x(200,30,228),x(-50,30,-182)],a=b=0,L=f.length;L>b;a=++b)m=f[a],e=new r(60,60,120,t.metal,!0,2,1),e.position.copy(m),(10===a||16===a)&&(e.rotation.y=Math.PI/2),this.meshes.push(e);for(f=[x(497,15,497),x(497,45,497),x(467,15,497),x(497,75,-378),x(437,75,-378),x(377,75,-378),x(317,75,-378),x(276,75,-378),x(276,75,-438),x(276,75,-497),x(467,15,437),x(327,15,437),x(227,15,437),x(127,15,437),x(27,15,437),x(-27,15,437),x(-127,15,437),x(-127,15,200),x(-127,15,-350),x(-307,75,-0),x(395,15,262)],R=0,P=f.length;P>R;R++)m=f[R],i=new r(30,30,30,t.woodCrate,!1),i.position.copy(m),this.meshes.push(i);for(f=[x(-254.5,7.5,0),x(-254.5,22.5,0),x(-254.5,37.5,0),x(-239.5,7.5,0),x(-239.5,22.5,0),x(-224.5,7.5,0),x(238,7.5,278),x(238,22.5,278),x(238,37.5,278),x(253,7.5,278),x(253,22.5,278),x(268,7.5,278)],W=0,H=f.length;H>W;W++)m=f[W],E=new r(15,15,15,t.woodCrate,!1),E.position.copy(m),this.meshes.push(E);for(D=this.meshes,B=0,A=D.length;A>B;B++)h=D[B],h.castShadow=!0,h.receiveShadow=!0;this.meshes[1].castShadow=!1}return t.prototype.meshes=[],t}(),t.exports=s},function(t,e,i){var n,s,o,r=function(t,e){return function(){return t.apply(e,arguments)}},a=function(t,e){function i(){this.constructor=t}for(var n in e)h.call(e,n)&&(t[n]=e[n]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t},h={}.hasOwnProperty;i(19),o=i(3),n=i(2).Bullet,s=function(t){function e(t,i,n){this.scene=i,this.playground=n,this.afterKill=r(this.afterKill,this),e.__super__.constructor.call(this),this.loadParts(o.models.ratamahatta),this.root.position.copy(t.position),this.scale=.5,this.onLoadComplete=function(t){return function(){return t.setWeapon(0),t.playground.meshes.push(t.meshBody),t.playground.meshes.push(t.meshWeapon),t.scene.add(t.root)}}(this)}return a(e,t),e.prototype.onUpdate=function(t){var e;return this.root.position.copy(t.position),this.root.rotation.y=t.rotation.y+Math.PI,this.animation=t.animation,this.lastAnimation!==this.animation&&this.meshWeapon&&this.meshBody?("attack"===this.animation&&(e=new n(this.scene,t.position,t.rotation,this.playground.meshes),e.fire()),this.lastAnimation=this.animation,this.setAnimation(this.animation)):void 0},e.prototype.onDeath=function(){return this.setAnimation("crdeath"),setTimeout(this.afterKill,640)},e.prototype.afterKill=function(){return this.setAnimation("stand")},e}(THREE.MD2Character),t.exports=s},function(t,e,i){var n,s,o,r=function(t,e){return function(){return t.apply(e,arguments)}};n=i(12),o=i(3).eventType,s=function(){function t(t,e,i,n){this.scene=e,this.players=i,this.playground=n,this.onLeave=r(this.onLeave,this),this.onDataUpdate=r(this.onDataUpdate,this),this.onKill=r(this.onKill,this),this.sendUpdate=r(this.sendUpdate,this),this.socket=io.connect({path:t}),this.socket.on("data",this.onDataUpdate),this.socket.on("leave",this.onLeave),this.socket.on("kill",this.onKill),setInterval(this.sendUpdate,16)}return t.prototype.kill=function(t){return this.socket.emit("kill",t)},t.prototype.update=function(t){return this.controls=t},t.prototype.pack=function(t){var e,i,n,s,r,a,h;for(e=new ArrayBuffer(41),n=new Uint8Array(e,0,20),r=new Float32Array(e,20,3),a=new Float32Array(e,32,2),i=new Uint8Array(e,40,1),s=h=0;20>=h;s=++h)n[s]=this.socket.id.charCodeAt(s);return r[0]=t.position.x,r[1]=t.position.y,r[2]=t.position.z,a[0]=t.rotation.x,a[1]=t.rotation.y,i[0]=o[t.event],e},t.prototype.unpack=function(t){var e,i,n,s,r;return i=Object.keys(o),n=new Uint8Array(t.slice(0,20)),s=new Float32Array(t.slice(20,32)),r=new Float32Array(t.slice(32,40)),e=new Uint8Array(t.slice(40,41)),{id:String.fromCharCode.apply(null,n),position:function(t,e,i){i.prototype=t.prototype;var n=new i,s=t.apply(n,e);return Object(s)===s?s:n}(THREE.Vector3,s,function(){}),rotation:function(t,e,i){i.prototype=t.prototype;var n=new i,s=t.apply(n,e);return Object(s)===s?s:n}(THREE.Vector3,r,function(){}),animation:i[e[0]]}},t.prototype.sendUpdate=function(){var t;if(this.controls&&this.socket.id)return t=this.pack({position:this.controls.position,rotation:this.controls.rotation,event:this.controls.animation}),this.socket.emit("data",t)},t.prototype.onKill=function(t){var e;if(t!==this.socket.id)return null!=(e=this.players[t])?e.onDeath():void 0},t.prototype.onDataUpdate=function(t){var e,i;return e=this.unpack(t),i=e.id,i in this.players?this.players[i].onUpdate(e):this.players[i]=new n(e,this.scene,this.playground)},t.prototype.onLeave=function(t){var e,i,n;return t in this.players?(n=this.players[t],e=this.playground.meshes.indexOf(n.meshBody),e&&this.playground.meshes.splice(e,1),i=this.playground.meshes.indexOf(n.meshWeapon),i&&this.playground.meshes.splice(i,1),this.scene.remove(n.root),delete this.players[t]):void 0},t}(),t.exports=s},function(t){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var i=this[e];t.push(i[2]?"@media "+i[2]+"{"+i[1]+"}":i[1])}return t.join("")},t}},function(t,e,i){e=t.exports=i(14)(),e.push([t.id,"*{padding:0;margin:0}html{width:100%;height:100%}html,body{overflow:hidden}body{margin:0;padding:0}body,canvas,#blocker{width:100%;height:100%}#blocker{position:absolute;background-color:rgba(0,0,0,.5);display:table;text-align:center;cursor:pointer;color:#fff}#instructions{vertical-align:middle;display:table-cell;width:100%}#instructions span:first-child{font-size:3em;display:block}#crosshair{width:262px;height:262px;position:absolute;background-repeat:no-repeat}",""])},function(t){!function(e){function i(t,e){for(var i=t.length;i--;)if(t[i]===e)return i;return-1}function n(t,e){if(t.length!=e.length)return!1;for(var i=0;i<t.length;i++)if(t[i]!==e[i])return!1;return!0}function s(t){for(E in x)x[E]=t[S[E]]}function o(t){var e,n,o,r,a,p;if(e=t.keyCode,-1==i(C,e)&&C.push(e),(93==e||224==e)&&(e=91),e in x){x[e]=!0;for(o in M)M[o]==e&&(h[o]=!0)}else if(s(t),h.filter.call(this,t)&&e in k)for(p=m(),r=0;r<k[e].length;r++)if(n=k[e][r],n.scope==p||"all"==n.scope){a=n.mods.length>0;for(o in x)(!x[o]&&i(n.mods,+o)>-1||x[o]&&-1==i(n.mods,+o))&&(a=!1);(0!=n.mods.length||x[16]||x[18]||x[17]||x[91])&&!a||n.method(t,n)===!1&&(t.preventDefault?t.preventDefault():t.returnValue=!1,t.stopPropagation&&t.stopPropagation(),t.cancelBubble&&(t.cancelBubble=!0))}}function r(t){var e,n=t.keyCode,s=i(C,n);if(s>=0&&C.splice(s,1),(93==n||224==n)&&(n=91),n in x){x[n]=!1;for(e in M)M[e]==n&&(h[e]=!1)}}function a(){for(E in x)x[E]=!1;for(E in M)h[E]=!1}function h(t,e,i){var n,s;n=y(t),void 0===i&&(i=e,e="all");for(var o=0;o<n.length;o++)s=[],t=n[o].split("+"),t.length>1&&(s=g(t),t=[t[t.length-1]]),t=t[0],t=R(t),t in k||(k[t]=[]),k[t].push({shortcut:n[o],scope:e,method:i,key:n[o],mods:s})}function p(t,e){var i,s,o,r,a,h=[];for(i=y(t),r=0;r<i.length;r++){if(s=i[r].split("+"),s.length>1&&(h=g(s),t=s[s.length-1]),t=R(t),void 0===e&&(e=m()),!k[t])return;for(o=0;o<k[t].length;o++)a=k[t][o],a.scope===e&&n(a.mods,h)&&(k[t][o]={})}}function c(t){return"string"==typeof t&&(t=R(t)),-1!=i(C,t)}function u(){return C.slice(0)}function d(t){var e=(t.target||t.srcElement).tagName;return!("INPUT"==e||"SELECT"==e||"TEXTAREA"==e)}function l(t){T=t||"all"}function m(){return T||"all"}function f(t){var e,i,n;for(e in k)for(i=k[e],n=0;n<i.length;)i[n].scope===t?i.splice(n,1):n++}function y(t){var e;return t=t.replace(/\s/g,""),e=t.split(","),""==e[e.length-1]&&(e[e.length-2]+=","),e}function g(t){for(var e=t.slice(0,t.length-1),i=0;i<e.length;i++)e[i]=M[e[i]];return e}function v(t,e,i){t.addEventListener?t.addEventListener(e,i,!1):t.attachEvent&&t.attachEvent("on"+e,function(){i(window.event)})}function w(){var t=e.key;return e.key=L,t}var E,k={},x={16:!1,18:!1,17:!1,91:!1},T="all",M={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,command:91},b={backspace:8,tab:9,clear:12,enter:13,"return":13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,"delete":46,home:36,end:35,pageup:33,pagedown:34,",":188,".":190,"/":191,"`":192,"-":189,"=":187,";":186,"'":222,"[":219,"]":221,"\\":220},R=function(t){return b[t]||t.toUpperCase().charCodeAt(0)},C=[];for(E=1;20>E;E++)b["f"+E]=111+E;var S={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey"};for(E in M)h[E]=!1;v(document,"keydown",function(t){o(t)}),v(document,"keyup",r),v(window,"focus",a);var L=e.key;e.key=h,e.key.setScope=l,e.key.getScope=m,e.key.deleteScope=f,e.key.filter=d,e.key.isPressed=c,e.key.getPressedKeyCodes=u,e.key.noConflict=w,e.key.unbind=p,t.exports=h}(this)},function(t){function e(t,e){for(var i=0;i<t.length;i++){var n=t[i],o=h[n.id];if(o){o.refs++;for(var r=0;r<o.parts.length;r++)o.parts[r](n.parts[r]);for(;r<n.parts.length;r++)o.parts.push(s(n.parts[r],e))}else{for(var a=[],r=0;r<n.parts.length;r++)a.push(s(n.parts[r],e));h[n.id]={id:n.id,refs:1,parts:a}}}}function i(t){for(var e=[],i={},n=0;n<t.length;n++){var s=t[n],o=s[0],r=s[1],a=s[2],h=s[3],p={css:r,media:a,sourceMap:h};i[o]?i[o].parts.push(p):e.push(i[o]={id:o,parts:[p]})}return e}function n(){var t=document.createElement("style"),e=u();return t.type="text/css",e.appendChild(t),t}function s(t,e){var i,s,o;if(e.singleton){var h=l++;i=d||(d=n()),s=r.bind(null,i,h,!1),o=r.bind(null,i,h,!0)}else i=n(),s=a.bind(null,i),o=function(){i.parentNode.removeChild(i)};return s(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;s(t=e)}else o()}}function o(t,e,i){var n=["/** >>"+e+" **/","/** "+e+"<< **/"],s=t.lastIndexOf(n[0]),o=i?n[0]+i+n[1]:"";if(t.lastIndexOf(n[0])>=0){var r=t.lastIndexOf(n[1])+n[1].length;return t.slice(0,s)+o+t.slice(r)}return t+o}function r(t,e,i,n){var s=i?"":n.css;if(t.styleSheet)t.styleSheet.cssText=o(t.styleSheet.cssText,e,s);else{var r=document.createTextNode(s),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(r,a[e]):t.appendChild(r)}}function a(t,e){var i=e.css,n=e.media,s=e.sourceMap;if(s&&"function"==typeof btoa)try{i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(JSON.stringify(s))+" */",i='@import url("data:text/css;base64,'+btoa(i)+'")'}catch(o){}if(n&&t.setAttribute("media",n),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}var h={},p=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},c=p(function(){return/msie 9\b/.test(window.navigator.userAgent.toLowerCase())}),u=p(function(){return document.head||document.getElementsByTagName("head")[0]}),d=null,l=0;t.exports=function(t,n){n=n||{},"undefined"==typeof n.singleton&&(n.singleton=c());var s=i(t);return e(s,n),function(t){for(var o=[],r=0;r<s.length;r++){var a=s[r],p=h[a.id];p.refs--,o.push(p)}if(t){var c=i(t);e(c,n)}for(var r=0;r<o.length;r++){var p=o[r];if(0===p.refs){for(var u=0;u<p.parts.length;u++)p.parts[u]();delete h[p.id]}}}}},function(t,e,i){var n=i(15);"string"==typeof n&&(n=[[t.id,n,""]]);i(17)(n,{})},function(){THREE.MD2Character=function(){function t(t,e){for(var n=THREE.UVMapping,s=[],o=0;o<e.length;o++)s[o]=THREE.ImageUtils.loadTexture(t+e[o],n,i),s[o].name=e[o];return s}function e(t,e){t.computeMorphNormals();var i=THREE.ImageUtils.generateDataTexture(1,1,new THREE.Color(16777215)),s=new THREE.MeshPhongMaterial({color:16755200,specular:1118481,shininess:50,wireframe:!0,shading:THREE.SmoothShading,map:i,morphTargets:!0,morphNormals:!0,metal:!1}),o=new THREE.MeshPhongMaterial({color:16777215,specular:1118481,shininess:50,wireframe:!1,shading:THREE.SmoothShading,map:e,morphTargets:!0,morphNormals:!0,metal:!1});o.wrapAround=!0;var r=new THREE.MorphAnimMesh(t,o);return r.rotation.y=-Math.PI/2,r.castShadow=!0,r.receiveShadow=!0,r.materialTexture=o,r.materialWireframe=s,r.parseAnimations(),r.playAnimation(t.firstAnimation,n.animationFPS),r.baseDuration=r.duration,r}function i(){n.loadCounter-=1,0===n.loadCounter&&n.onLoadComplete()}var n=this;this.scale=1,this.animationFPS=6,this.root=new THREE.Object3D,this.meshBody=null,this.meshWeapon=null,this.skinsBody=[],this.skinsWeapon=[],this.weapons=[],this.activeAnimation=null,this.onLoadComplete=function(){},this.loadCounter=0,this.loadParts=function(s){this.loadCounter=2*s.weapons.length+s.skins.length+1;
for(var o=[],r=0;r<s.weapons.length;r++)o[r]=s.weapons[r][1];this.skinsBody=t(s.baseUrl+"/",s.skins),this.skinsWeapon=t(s.baseUrl+"/",o);var a=new THREE.JSONLoader;a.load(s.baseUrl+"/"+s.body,function(t){t.computeBoundingBox();var s=e(t,n.skinsBody[0]);s.scale.set(n.scale,n.scale,n.scale),n.root.add(s),n.meshBody=s,n.activeAnimation=t.firstAnimation,i()});for(var h=function(t,s){return function(o){var r=e(o,n.skinsWeapon[t]);r.scale.set(n.scale,n.scale,n.scale),r.visible=!1,r.name=s,n.root.add(r),n.weapons[t]=r,n.meshWeapon=r,i()}},p=0;p<s.weapons.length;p++)a.load(s.baseUrl+"/"+s.weapons[p][0],h(p,s.weapons[p][0]))},this.setPlaybackRate=function(t){this.meshBody&&(this.meshBody.duration=this.meshBody.baseDuration/t),this.meshWeapon&&(this.meshWeapon.duration=this.meshWeapon.baseDuration/t)},this.setWireframe=function(t){t?(this.meshBody&&(this.meshBody.material=this.meshBody.materialWireframe),this.meshWeapon&&(this.meshWeapon.material=this.meshWeapon.materialWireframe)):(this.meshBody&&(this.meshBody.material=this.meshBody.materialTexture),this.meshWeapon&&(this.meshWeapon.material=this.meshWeapon.materialTexture))},this.setSkin=function(t){this.meshBody&&this.meshBody.material.wireframe===!1&&(this.meshBody.material.map=this.skinsBody[t])},this.setWeapon=function(t){for(var e=0;e<this.weapons.length;e++)this.weapons[e].visible=!1;var i=this.weapons[t];i&&(i.visible=!0,this.meshWeapon=i,i.playAnimation(this.activeAnimation,this.animationFPS),this.meshWeapon.baseDuration=this.meshWeapon.duration,this.meshWeapon.time=this.meshBody.time,this.meshWeapon.duration=this.meshBody.duration)},this.setAnimation=function(t){this.meshBody&&(this.meshBody.playAnimation(t,this.animationFPS),this.meshBody.baseDuration=this.meshBody.duration),this.meshWeapon&&(this.meshWeapon.playAnimation(t,this.animationFPS),this.meshWeapon.baseDuration=this.meshWeapon.duration,this.meshWeapon.time=this.meshBody.time),this.activeAnimation=t},this.update=function(t){this.meshBody&&this.meshBody.updateAnimation(1e3*t),this.meshWeapon&&this.meshWeapon.updateAnimation(1e3*t)}}}]);