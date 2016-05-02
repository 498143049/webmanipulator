var robot;
var jointArry = new Array();   //全局变量，记录每一关节对应的位置
//开启Three.js渲染器
var renderer; //声明全局变量（对象）
var dataone;

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
//设置相机
var camera;

function initCamera() {
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 5000); //设置透视投影的相机,默认情况下相机的上方向为Y轴，右方向为X轴，沿着Z轴朝里（视野角：fov 纵横比：aspect 相机离视体积最近的距离：near 相机离视体积最远的距离：far）
  camera.position.x = 0; //设置相机的位置坐标
  camera.position.y = 50; //设置相机的位置坐标
  camera.position.z = 100; //设置相机的位置坐标
  camera.up.x = 0; //设置相机的上为「x」轴方向
  camera.up.y = 1; //设置相机的上为「y」轴方向
  camera.up.z = 0; //设置相机的上为「z」轴方向
  camera.lookAt({
    x: 0,
    y: 0,
    z: 0
  }); //设置视野的中心坐标
}
//设置场景
var scene;

function initScene() {
  scene = new THREE.Scene();
  //对场景进行大小变化以求得适应的大小
  scene.scale.set(0.1, 0.1, 0.1);
}
//设置物体
var sphere;

function initObject() {

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.clear();
  renderer.render(scene, camera);
}
//执行
function threeStart() {
  initThree();
  initCamera();
  initScene();
  initObject();
}
var manager = new THREE.LoadingManager();
//利用函数去配种
manager.onProgress = function(item, loaded, total) {
    item = item.substring(38);
    for (var i = 0; i < robot.link.length; i++) {
      if (robot.link[i].fileName == item) {
        jointArry.push(i);
      }
    }
};
//全部加载结束
manager.onLoad=function(){
  console.log("I am down!");
}
function Load_init(data, status) {
  robot = data;
  var MeshArry = new Array();
  for (var i = 0; i < robot.link.length; i++) {
    // while(!compete);
    compete = 0;
    var loader = new THREE.STLLoader(manager);
    loader.load("http://7xt8mz.com2.z0.glb.clouddn.com/" + robot.link[i].fileName, function(geometry) {
    var mesh = new THREE.Mesh(geometry);
    MeshArry.push(mesh);
    });
    robot.MeshArry = MeshArry;    //其中里面的内容不完全是
  }
  // if(robot.link[i].type!="base")
  //  {
  //    mat4.translate(base,base,[robot.link[i].DHParametes.A,0,0]);
  //    mat4.rotateX(base,base,robot.link[i].DHParametes.alpha*Math.PI/180);
  //    mat4.translate(base,base,[0,0,robot.link[i].DHParametes.D]);
  //    mat4.translate(base,base,link[i].DHParametes.theta*Math.PI/180);
  //    mesh.rotation.set( 0, 0, 0 );
  //    mesh.position.set( base[12], base[13], base[14] );

  //  }
  //  else
  //  {
  //    mesh.position.set( 0, 0, 0 );
  //    mesh.rotation.set( 0, 0, 0 );
  //  }
};

function Load_num() {
  $.getJSON("http://7xt8mz.com2.z0.glb.clouddn.com/ScaraconfigNew.json", Load_init)
};