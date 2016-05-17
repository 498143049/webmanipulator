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
function Add_Event() {
  $("#canvas3d").bind('mousewheel', function(event) {
    // event = event || window.event;
    event.preventDefault();
    var delta = 0;
    if (event.wheelDelta) {
      // WebKit / Opera / Explorer 9
    delta = event.wheelDelta && (event.wheelDelta > 0 ? "mouseup" : "mousedown");
    console.log(direction);
    } else if (event.detail) {
      // Firefox
      delta = event.detail * 10;
    }
    console.log(delta);
    return false;
  });
}
function zoom ( delta1 ) {
   var delta=new THREE.Vector3( 0, 0, delta1 )
    center = new THREE.Vector3();
    var normalMatrix = new THREE.Matrix3();
    var distance = camera.position.distanceTo( center );

    delta.multiplyScalar( distance * 0.001 );

    if ( delta.length() > distance ) return;

    delta.applyMatrix3( normalMatrix.getNormalMatrix( camera.matrix ) );

    camera.position.add( delta );

    rendererFun();

  };
  
  // function onMouseDown( event ) {

  //   if ( scope.enabled === false ) return;

  //   if ( event.button === 0 ) {

  //     state = STATE.ROTATE;

  //   } else if ( event.button === 1 ) {

  //     state = STATE.ZOOM;

  //   } else if ( event.button === 2 ) {

  //     state = STATE.PAN;

  //   }

  //   pointerOld.set( event.clientX, event.clientY );

  //   domElement.addEventListener( 'mousemove', onMouseMove, false );
  //   domElement.addEventListener( 'mouseup', onMouseUp, false );
  //   domElement.addEventListener( 'mouseout', onMouseUp, false );
  //   domElement.addEventListener( 'dblclick', onMouseUp, false );

  // }

  // function onMouseMove( event ) {

  //   if ( scope.enabled === false ) return;

  //   pointer.set( event.clientX, event.clientY );

  //   var movementX = pointer.x - pointerOld.x;
  //   var movementY = pointer.y - pointerOld.y;

  //   if ( state === STATE.ROTATE ) {

  //     scope.rotate( new THREE.Vector3( - movementX * 0.005, - movementY * 0.005, 0 ) );

  //   } else if ( state === STATE.ZOOM ) {

  //     scope.zoom( new THREE.Vector3( 0, 0, movementY ) );

  //   } else if ( state === STATE.PAN ) {

  //     scope.pan( new THREE.Vector3( - movementX, movementY, 0 ) );

  //   }

  //   pointerOld.set( event.clientX, event.clientY );

  // }

  // function onMouseUp( event ) {

  //   domElement.removeEventListener( 'mousemove', onMouseMove, false );
  //   domElement.removeEventListener( 'mouseup', onMouseUp, false );
  //   domElement.removeEventListener( 'mouseout', onMouseUp, false );
  //   domElement.removeEventListener( 'dblclick', onMouseUp, false );

  //   state = STATE.NONE;

  // }
function Load_config() {
  $.getJSON("http://7xt8mz.com2.z0.glb.clouddn.com/ScaraconfigNew.json", Load_init)
  Add_Event();
};