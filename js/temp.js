    // mat4.mul(defaultmat,caculat(robot.link[i].DHParametes),defaultmat);
   // console.log(defaultmat);
    //Ω«∂»º∆À„

    // var thetax,thetay,thetaz;
    // if(defaultmat[8]!=1&&defaultmat[8]!=-1)
    // {
    //   thetay=Math.atan2(-defaultmat[8],Math.sqrt(Math.pow(defaultmat[0],2)+Math.pow(defaultmat[4],2)));
    //   thetaz=Math.atan2(defaultmat[4]/Math.cos(thetay),defaultmat[0]/Math.cos(thetay));
    //   thetax=Math.atan2(defaultmat[9]/Math.cos(thetay),defaultmat[10]/Math.cos(thetay));
    // }
    // else
    // {    
    //   thetay = Math.PI/2;
    //   thetaz = 0;
    //   thetax = Math.atan2(defaultmat[1], defaultmat[5]);
    // }
    //console.log(thetax+','+thetay+','+thetaz);
    // mesh.rotation.set(thetax, thetay, thetaz);
    // mesh.position.set(defaultmat[3], defaultmat[7], defaultmat[11]);