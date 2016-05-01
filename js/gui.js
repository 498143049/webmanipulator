            //开启Three.js渲染器
             var renderer;//声明全局变量（对象）
             var dataone;
             function initThree() {
                width = document.getElementById('canvas3d').clientWidth;//获取画布「canvas3d」的宽
                height = document.getElementById('canvas3d').clientHeight;//获取画布「canvas3d」的高
                renderer=new THREE.WebGLRenderer({antialias:true});//生成渲染器对象（属性：抗锯齿效果为设置有效）
                renderer.setSize(width, height );//指定渲染器的高宽（和画布框大小一致）
                document.getElementById('canvas3d').appendChild(renderer.domElement);//追加 【canvas】 元素到 【canvas3d】 元素中。
                // renderer.setClearColorHex(0xFFFFFF, 1.0);//设置canvas背景色(clearColor)
                renderer.setClearColor( 0xFFFFFF );
                // renderer.alpha=true;
              }
               //设置相机
              var camera;
              function initCamera() { 
                camera = new THREE.PerspectiveCamera( 45, width / height , 1 , 5000 );//设置透视投影的相机,默认情况下相机的上方向为Y轴，右方向为X轴，沿着Z轴朝里（视野角：fov 纵横比：aspect 相机离视体积最近的距离：near 相机离视体积最远的距离：far）
                camera.position.x = 0;//设置相机的位置坐标
                camera.position.y = 50;//设置相机的位置坐标
                camera.position.z = 100;//设置相机的位置坐标
                camera.up.x = 0;//设置相机的上为「x」轴方向
                camera.up.y = 1;//设置相机的上为「y」轴方向
                camera.up.z = 0;//设置相机的上为「z」轴方向
                camera.lookAt( {x:0, y:0, z:0 } );//设置视野的中心坐标
              }
               //设置场景
              var scene;
              function initScene() {   
                scene = new THREE.Scene();
                //对场景进行大小变化以求得适应的大小
                scene.scale.set( 0.1, 0.1, 0.1); 
              }
              function getJsonAndPrase(){
               $.getJSON("http://7xt8mz.com2.z0.glb.clouddn.com/Scaraconfig.json", function(data) { 
                console.log(1);
                alert(data.name); 
                }); 
               };
               //设置物体
              var sphere;
              function initObject(){  
                getJsonAndPrase();
                var loader = new THREE.STLLoader();
                loader.load( 'http://7xt8mz.com2.z0.glb.clouddn.com/scara/linktwo.stl', function ( geometry ) {
                var mesh = new THREE.Mesh( geometry );
                mesh.position.set( 0, 0, 0 );
                mesh.rotation.set( 0, 0, 0 );

                mesh.castShadow = true;
                mesh.receiveShadow = true;
                scene.add( mesh );
                renderer.setPixelRatio( window.devicePixelRatio );  
                renderer.clear(); 
                renderer.render(scene, camera);
              } )
              };
              //执行
              function threeStart() {
                initThree();
                initCamera();
                initScene();   
                initObject();
              }