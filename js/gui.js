var robot;
var jointArry = new Array(); //全局变量，记录每一关节对应的位置
var LinkValuearr = new Array();
//开启Three.js渲染器
var dataone;
var manager = new THREE.LoadingManager();
var Point = new THREE.Vector3(0, 0, 0);
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
manager.onLoad = function() {
  updateobj(); //全部加载结束后，在进行操作。
}

function Load_init(data, status) {
  robot = data;
  $('.CanvasTitle').text(robot.RobotName + '   robot');
  threeStart(); //渲染场景并且构造
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
  robot.linkNum = linkNumArray.length;
  robot.linkNumArray = linkNumArray;
  AddSlider(robot.linkNum);
  robot.MeshArry = MeshArry; //其中里面的内容不完全是

};
//更新界面图像
function AddSlider(num) {

  for (var i = 0; i < num; i++) {
    var a = '<span class="Sliderspan">' + robot.link[robot.linkNumArray[i]].RANGE.min + '</span>\
                    <input id="ex' + i + '"type="text" serier="' + i + '"data-slider-min="' + robot.link[robot.linkNumArray[i]].RANGE.min + '" data-slider-max="' + robot.link[robot.linkNumArray[i]].RANGE.max + '" data-slider-step="0.01" data-slider-value="'+robot.link[robot.linkNumArray[i]].DHParametes.theta+'" />\
                    <span class="Sliderspan">' + robot.link[robot.linkNumArray[i]].RANGE.max + '</span>\
                    <span id="ex' + i + 'CurrentSliderValLabel" class="sliderSpan">V:\
                    <input id="ex' + i + 'SliderVal" serier="' + i + '" value= "0" class="sliderInput">\
                    </span>';
    var main = $('<div></div>').html(a); //创建一个父DIV
    if (robot.link[robot.linkNumArray[i]].type == "rotating")
      LinkValuearr.push(robot.link[robot.linkNumArray[i]].DHParametes.theta);
    else
      LinkValuearr.push(robot.link[robot.linkNumArray[i]].DHParametes.D);
    main.addClass('sliderPart');
    $('.RightTwo').append(main);
    var button = "<input type='button' value=" + i + " class='btn btn-primary'/>";
    $('.PhoneBtn').append(button);
    $('#ex' + i).slider();
    $("#ex" + i).on("slide", function(slideEvt) {
      var j = parseFloat(slideEvt.currentTarget.getAttribute('serier'));
      $("#ex" + j + "SliderVal").val(slideEvt.value);
      LinkValuearr[j] = $('#ex' + j + 'SliderVal').val();
      change(LinkValuearr);
      updateobj();
    });
    $("#ex" + i + "SliderVal").change(function(event) {
      var j = parseFloat(event.currentTarget.getAttribute('serier'));
      var CValue=parseFloat($('#ex' + j + 'SliderVal').val());
      //检测第j个范围
      if(CValue<robot.link[robot.linkNumArray[j]].RANGE.min||CValue>robot.link[robot.linkNumArray[j]].RANGE.max)
         return errorMessage("关节设置超过范围");
      var mySlider = $("#ex" + j);
      
     
      var Oldarr = LinkValuearr.slice(0);
      mySlider.slider('setValue',CValue);
      LinkValuearr[j] = parseFloat($('#ex' + j + 'SliderVal').val());
      changeArray(Oldarr, LinkValuearr);
    });
  }
  $(".InverseBtn").click(function() {
    var InputArray = $("div>p>span>input");
    eval(robot.inversefun+"("+parseFloat(InputArray[0].value)+","+parseFloat(InputArray[1].value)+","+parseFloat(InputArray[2].value)+")");
  });
  $(".sliderPart:first").css('display', 'block');
  var height = document.documentElement.clientHeight;
  var height2 = $(".PhoneBtn").outerHeight(true);
  $(".PhoneBtn").offset({
    top: (height - height2) / 2
  });
  PhoneChoose();
}
function cheakNum(j,value)
{
  
}
function PhoneChoose() {
  var PhoneBtn = $('.PhoneBtn input');
  var PhoneSlider = $('.sliderPart');
  PhoneBtn.each(function(i) {
    $(this).click(function() {
      PhoneSlider.hide();
      PhoneSlider.eq(i).show();
    })
  })
}

function updateobj() {
  var defaultmat = new THREE.Matrix4();
  var TempPoint = new THREE.Vector4(0, 0, 0, 1);
  for (var i = 0; i < robot.link.length; i++) {
    var mesh = robot.MeshArry[jointArry.indexOf(i)]; //通过这个方法定位
    var m = new THREE.Matrix4();
    // mesh.matrixAutoUpdate=true;
    m.fromArray(caculat(robot.link[i].DHParametes));
    defaultmat.multiply(m);
    defaultmat.decompose(mesh.position, mesh.quaternion, mesh.scale);

  }
  TempPoint.applyMatrix4(defaultmat);
  Point.set(TempPoint.getComponent(0), TempPoint.getComponent(1), TempPoint.getComponent(2));
  changeText(Point); //改变其向量的值

  rendererFun();
}

function changeText(Point) {
  $('.InverseTitle')[0].innerText = "Crruent X: " + Point.getComponent(0).toFixed(2) + "Y:" + Point.getComponent(1).toFixed(2) + " Z:" + Point.getComponent(2).toFixed(2);
}

function change(theta) {
  //传入改变的参数
  for (var i = 1; i <= robot.linkNum; i++) {
    if (robot.link[i].type == "rotating") {
      robot.link[i].DHParametes.theta = theta[i - 1];
    } else {
      robot.link[i].DHParametes.D = theta[i - 1];
    }
  }
}
function errorMessage(message)
{
  $('#message strong').text(message);
  $(".RightFive").show();
  $(".RightFive").fadeToggle(2000);
}
function inverse_kinematics_Scara(x, y, z) {
  var c1 = 250,
    c2 = 270,
    c3 = 100;
  var temp1 = 100 - z;
  if(temp1>0||temp1<-175)
    return errorMessage("关节三的值超过约定范围");
  var value = (x * x + y * y - c1 * c1 - c2 * c2) / (2 * c1 * c2); //由于其角度是150so其最大值不超过0.8660根号好2/2
  if (value < -0.866 || value > 1)
    return errorMessage("关节二的值超过约定范围");

  var temp2_1 = Math.acos(value);
  var C = (250 + 270 * value) / Math.sqrt(x * x + y * y);
  if (C > 1 || C < -1)
    return errorMessage("关节一的值超过约定范围");

  var temp3_1 = Math.asin(C) - Math.asin(x / y); //第一组解
  var temp2_2 = -temp2_1;
  var temp3_2 = Math.PI - Math.asin(C) - Math.atan(x / y);
  var oldarr = [0, 0, 0, 0];
  var NewArray = [0, 0, 0, 0];
  oldarr[0] = parseFloat($('#ex0SliderVal').val());
  oldarr[1] = parseFloat($('#ex1SliderVal').val());
  oldarr[2] = parseFloat($('#ex2SliderVal').val());
  oldarr[3] = parseFloat($('#ex3SliderVal').val());
  if (Math.abs(temp3_1 - oldarr[0]) < Math.abs(temp3_2 - oldarr[0])) {
    NewArray[0] = temp3_1 * 180 / Math.PI;
    NewArray[1] = temp2_1 * 180 / Math.PI;
    NewArray[2] = temp1;
    NewArray[3] = oldarr[3];
  } else {
    NewArray[0] = temp3_2 * 180 / Math.PI;
    NewArray[1] = temp2_2 * 180 / Math.PI;
    NewArray[2] = temp1;
    NewArray[3] = oldarr[3];
  }
  changeArray(oldarr, NewArray);
  //更新面板
  //更新运动学面板
  for (var i = 0; i < robot.linkNum; i++) {
    $("#ex" + i + "SliderVal").val(NewArray[i].toFixed(2));
    mySlider = $("#ex" + i);
    mySlider.slider('setValue', parseFloat(NewArray[i].toFixed(2)));
  }
}

function inverse_kinematics_Abb1200() {
 return errorMessage("代码还在重构！T_T");
}

var CountTime = 0;
var diff = [];

function changeArray(theta1, theta2) {
  diff = [];

  CountTime = 0;
  diff_Array(theta1, theta2, diff);
  setTimeout(_change_time(theta1), 200);
}

function change_time(theta1) {
  mul_Array(theta1, diff);
  change(theta1);
  updateobj();
  CountTime++;
  if (CountTime < 10) {
    setTimeout(_change_time(theta1), 50);
  }
}

function _change_time(_theta1) {
  return function() {
    change_time(_theta1);
  }
}

function diff_Array(aArr, bArr, diff) { //第一个数组减去第二个数组
  for (var e in aArr) {
    diff.push((aArr[e] - bArr[e]) / 10);
  }
}

function mul_Array(aArr, bArr) { //第一个数组减去第二个数组
  for (var e in aArr) {
    aArr[e] = aArr[e] - bArr[e];
  }
}

function Add_Event() {
  $("#canvas3d").mousedown(onMouseDown);
  $("#canvas3d").bind('touchstart', My_ontouchstart);
  $('#canvas3d').mousewheel(function(event, delta, deltaX, deltaY) {
    event.preventDefault();
    if (delta > 0)
      zoom(100);
    else
      zoom(-100);
  });
}

function zoom(delta1) {
  var delta = new THREE.Vector3(0, 0, delta1)
  center = new THREE.Vector3();
  var normalMatrix = new THREE.Matrix3();
  var distance = camera.position.distanceTo(center);
  delta.multiplyScalar(distance * 0.001);
  if (delta.length() > distance) return;
  delta.applyMatrix3(normalMatrix.getNormalMatrix(camera.matrix));
  camera.position.add(delta);
  rendererFun();
};
var pointer = new THREE.Vector2();
var pointerOld = new THREE.Vector2();
var domElement = (domElement !== undefined) ? domElement : document;

function onMouseDown(event) {
  pointerOld.set(event.clientX, event.clientY);
  domElement.addEventListener('mousemove', onMouseMove, false);
  domElement.addEventListener('mouseup', onMouseUp, false);
  domElement.addEventListener('mouseout', onMouseUp, false);
  domElement.addEventListener('dblclick', onMouseUp, false);
}

function My_ontouchstart(event) {
  pointerOld.set(event.clientX, event.clientY);
  domElement.addEventListener('touchmove', ontoughMove, false);
  domElement.addEventListener('touchend', touchend, false);
}

function onMouseMove(event) {
  pointer.set(event.clientX, event.clientY);
  var movementX = pointer.x - pointerOld.x;
  var movementY = pointer.y - pointerOld.y;
  changePos(new THREE.Vector3(-movementX * 0.005, -movementY * 0.005, 0));
  pointerOld.set(event.clientX, event.clientY);
}

function ontoughMove(event) {
  if (event.targetTouches.length == 1) {　　　　
    event.preventDefault(); // 阻止浏览器默认事件，重要 
    var touch = event.targetTouches[0];
    // 把元素放在手指所在的位置
    pointer.set(touch.pageX, touch.pageY);
    var movementX = pointer.x - pointerOld.x;
    var movementY = pointer.y - pointerOld.y;
    changePos(new THREE.Vector3(-movementX * 0.005, -movementY * 0.005, 0));
    pointerOld.set(touch.pageX, touch.pageY);
  }

}
var vector = new THREE.Vector3();
var spherical = new THREE.Spherical();

function changePos(delta) {
  var center = new THREE.Vector3();
  vector.copy(camera.position).sub(center);
  spherical.setFromVector3(vector);
  spherical.theta += delta.x;
  spherical.phi += delta.y;
  spherical.makeSafe();
  vector.setFromSpherical(spherical);
  camera.position.copy(center).add(vector);
  camera.lookAt(center);
  rendererFun();
};

function onMouseUp(event) {
  domElement.removeEventListener('mousemove', onMouseMove, false);
  domElement.removeEventListener('mouseup', onMouseUp, false);
  domElement.removeEventListener('mouseout', onMouseUp, false);
  domElement.removeEventListener('dblclick', onMouseUp, false);
}

function touchend(event) {
  domElement.removeEventListener('touchmove', ontoughMove, false);
  domElement.removeEventListener('touchend', touchend, false);
}

function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

function Load_config() {
//    alert($(window).width());
  // 先设置DIV的高度
  if (document.body.clientWidth > 900) {
    $('#canvas3d').height(document.body.clientHeight - 123);
  }
  $('#Scara').click(function(){ window.location.href="setup.html?type=1"; });
  $('#ABB1200').click(function(){ window.location.href="setup.html?type=2"; });
  //設置高度
  var c = GetQueryString('type');
  if(c==null)
  {
     window.location.href="setup.html?type=1";
  }
  if (c == null || c == 1) {
    $.getJSON("http://7xt8mz.com2.z0.glb.clouddn.com/ScaraconfigNew.json", Load_init)
  } else {
    $.getJSON("http://7xt8mz.com2.z0.glb.clouddn.com/ABB1200config.json", Load_init)
  }
  Add_Event();
};