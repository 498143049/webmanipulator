var robot;
var jointArry = new Array();   //全局变量，记录每一关节对应的位置
//开启Three.js渲染器
var dataone;


var manager = new THREE.LoadingManager();

//利用函数去匹配其中的值。
manager.onProgress = function(item, loaded, total) {
    item = item.substring(38);
    //console.log(item);
    for (var i = 0; i < robot.link.length; i++) {
      if (robot.link[i].fileName == item) {
        jointArry.push(i);
      }
    }
};
//全部加载结束
manager.onLoad=function(){
  console.log("I am down!");
  updateobj();
}
function Load_init(data, status) {
	threeStart();   //渲染场景并且构造
   
	robot = data;
	var MeshArry = new Array();
	var linkNumArray = new Array(); //记录关节数据
	for (var i = 0; i < robot.link.length; i++) {
		if (robot.link[i].type != "base") {
			linkNumArray.push(i);
		}
		var loader = new THREE.STLLoader(manager);
		loader.load("http://7xt8mz.com2.z0.glb.clouddn.com/" + robot.link[i].fileName, function(geometry) {
			var mesh = new THREE.Mesh(geometry);
			MeshArry.push(mesh);
			scene.add(mesh);
		});
	}
	robot.MeshArry = MeshArry; //其中里面的内容不完全是
	robot.linkNum = linkNumArray.length;
	robot.linkNumArray = linkNumArray;

};
//更新界面图像
function updateobj(){
  var defaultmat=new THREE.Matrix4();
  for (var i = 0; i < robot.link.length; i++) {
    var mesh = robot.MeshArry[jointArry.indexOf(i)]; //通过这个方法定位
    var m = new THREE.Matrix4();
    // mesh.matrixAutoUpdate=true;
    m.fromArray(caculat(robot.link[i].DHParametes));
    defaultmat.multiply(m);
    defaultmat.decompose(mesh.position,mesh.quaternion,mesh.scale);
  }
  rendererFun();
}
function change(theta){
  //传入改变的参数
  for(var i=1;i<5;i++)
  {
    if(robot.link[i].type=="rotating")
    {
      robot.link[i].DHParametes.theta=theta[i-1];
    }
    else
    {
      robot.link[i].DHParametes.D=theta[i-1];
    }
  }
}

function Load_config() {
  $.getJSON("http://7xt8mz.com2.z0.glb.clouddn.com/ScaraconfigNew.json", Load_init)
};