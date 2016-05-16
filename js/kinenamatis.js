function caculat(parameters){
  c = Math.cos(parameters.theta*Math.PI/180);
  s = Math.sin(parameters.theta*Math.PI/180);
  ca = Math.cos(parameters.alpha*Math.PI/180);
  sa = Math.sin(parameters.alpha*Math.PI/180);
  var out=new Float32Array( [

		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1

	] );
//  var out=mat4.fromValues(c,-s,0,parameters.A,s*ca,c*ca,-sa,-sa*parameters.D,s*sa,c*sa,ca,ca*parameters.D,0,0,0,1);
  // console.log(out);
  out[ 0 ] = c;out[ 4 ] = -s;out[ 8 ] = 0;out[ 12 ] = parameters.A;
  out[ 1 ] = s*ca;out[ 5 ] = c*ca;out[ 9 ] = -sa;out[ 13 ] = -sa*parameters.D;
  out[ 2 ] = s*sa;out[ 6 ] = c*sa;out[ 10 ] = ca;out[ 14 ] = ca*parameters.D;
  out[ 3 ] = 0;out[ 7 ] = 0;out[ 11 ] = 0;out[ 15 ] = 1;
  return out;
}