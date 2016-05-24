var renderer; //声明全局变量（对象）
//设置相机 初始化相机对象
var camera;
//设置场景 初始化场景，Object 
var scene;
//初始化render对象
  var line;
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

function initCamera() {
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 5000); //设置透视投影的相机,默认情况下相机的上方向为Y轴，右方向为X轴，沿着Z轴朝里（视野角：fov 纵横比：aspect 相机离视体积最近的距离：near 相机离视体积最远的距离：far）
  camera.position.set( -1.70, 40, 78.30 );
  camera.rotation.set( -0.4, 0, 0);
}

function initScene() {
  scene = new THREE.Scene();
  var grid = new THREE.GridHelper(1000, 50);
  grid.rotation.set(1.58, 0, 0);
  scene.add(grid);
  //
  var material = new THREE.LineBasicMaterial({
    color: 0x0000ff
  });

  var geometry = new THREE.Geometry();

  geometry.vertices.push(
    new THREE.Vector3(0, 0, 0)
  );

  line = new THREE.Line(geometry, material);
   
  scene.add(line);

  //对场景进行大小变化以求得适应的大小
  scene.scale.set(0.06, 0.06, 0.08);
  scene.rotation.set(-1.58, 0, 0);
}
//渲染对象
function rendererFun() {
  renderer.setPixelRatio(window.devicePixelRatio);
   renderer.clear();
  renderer.render(scene, camera);
}
//总执行对象
function threeStart() {
  initThree();
  initCamera();
  initScene();
  // line.geometry.vertices.push(
  //   new THREE.Vector3(1000, 0, 1000)
  // );
  rendererFun();
  // line.geometry.vertices.push(
  //   new THREE.Vector3(0, 0, 1000)
  // );
 



  rendererFun();
}