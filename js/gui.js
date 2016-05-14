var robot;
var jointArry = new Array();   //全局变量，记录每一关节对应的位置
//开启Three.js渲染器
var dataone;
var renderer; //声明全局变量（对象）

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
  //STL文件加载完毕  //渲染出第一个文件
  threeStart();
  var defaultmat=mat4.create();
  for (var i = 0; i < robot.link.length; i++) {
    var mesh = robot.MeshArry[jointArry.indexOf(i)]; //通过这个方法定位
    mat4.mul(defaultmat,caculat(robot.link[i].DHParametes),defaultmat);
    console.log(defaultmat);
    //角度计算
    var thetax,thetay,thetaz;
    if(defaultmat[8]!=1&&defaultmat[8]!=-1)
    {
      thetay=Math.atan2(-defaultmat[8],Math.sqrt(Math.pow(defaultmat[0],2)+Math.pow(defaultmat[4],2)));
      thetaz=Math.atan2(defaultmat[4]/Math.cos(thetay),defaultmat[0]/Math.cos(thetay));
      thetax=Math.atan2(defaultmat[9]/Math.cos(thetay),defaultmat[10]/Math.cos(thetay));
    }
    else
    {    
      thetay = Math.PI/2;
      thetaz = 0;
      thetax = Math.atan2(defaultmat[1], defaultmat[5]);
    }
    //console.log(thetax+','+thetay+','+thetaz);
    mesh.rotation.set(thetax, thetay, thetaz);
    mesh.position.set(defaultmat[3], defaultmat[7], defaultmat[11]);
    scene.add(mesh);
  }
  initObject();
}
function Load_init(data, status) {
  robot = data;
  var MeshArry = new Array();
  for (var i = 0; i < robot.link.length; i++) { 
    var loader = new THREE.STLLoader(manager);
    loader.load("http://7xt8mz.com2.z0.glb.clouddn.com/" + robot.link[i].fileName, function(geometry) {
      var mesh = new THREE.Mesh(geometry);
      MeshArry.push(mesh);
    });
    robot.MeshArry = MeshArry;    //其中里面的内容不完全是
  }
};
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