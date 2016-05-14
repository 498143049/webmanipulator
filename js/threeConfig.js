//初始化render对象
function initThree() {
  width = document.getElementById('canvas3d').clientWidth; //获取画布「canvas3d」的宽
  height = document.getElementById('canvas3d').clientHeight; //获取画布「canvas3d」的高
  renderer = new THREE.WebGLRenderer({
    antialias: true
  }); //生成渲染器对象（属性：抗锯齿效果为设置有效）
  renderer.setSize(width, height); //指定渲染器的高宽（和画布框大小一致）
  document.getElementById('canvas3d').appendChild(renderer.domElement); //追加 【canvas】 元素到 【canvas3d】 元素中。
  // renderer.setClearColorHex(0xFFFFFF, 1.0);//设置canvas背景色(clearColor)
  renderer.setClearColor(0xFFFFFF);
  // renderer.alpha=true;
}
//设置相机 初始化相机对象
var camera;
function initCamera() {
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 5000); //设置透视投影的相机,默认情况下相机的上方向为Y轴，右方向为X轴，沿着Z轴朝里（视野角：fov 纵横比：aspect 相机离视体积最近的距离：near 相机离视体积最远的距离：far）
  camera.position.set( -1.70, 15, 78.30 );
}
//设置场景 初始化场景，Object 
var scene;
function initScene() {
  scene = new THREE.Scene();
  // var plane = new THREE.Mesh(
  //   new THREE.PlaneBufferGeometry(40, 40),
  //   new THREE.MeshPhongMaterial({
  //     color: 0x999999,
  //     specular: 0x101010
  //   })
  // );
  // plane.rotation.x = -Math.PI / 2;
  // plane.position.y = -0.5;
  // scene.add(plane);

  // plane.receiveShadow = true;

  //对场景进行大小变化以求得适应的大小
  scene.scale.set(0.05, 0.05, 0.05);
  scene.rotation.set(-1.58,0,0);
}
//渲染对象
function renderer() {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.clear();
  renderer.render(scene, camera);
}
//总执行对象
function threeStart() {
  initThree();
  initCamera();
  initScene();
  initObject();
}