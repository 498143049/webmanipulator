function caculat(paramtes){
  c = Math.cos(paramtes.theta*Math.PI/180);
  s = Math.sin(paramtes.theta*Math.PI/180);
  ca = Math.cos(paramtes.alpha*Math.PI/180);
  sa = Math.sin(paramtes.alpha*Math.PI/180);
  var out=mat4.fromValues(c,-s,0,paramtes.A,s*ca,c*ca,-sa,-sa*paramtes.D,s*sa,c*sa,ca,ca*paramtes.D,0,0,0,1);
  console.log(out);
  return out;
}