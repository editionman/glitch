var Utils = {};
var Types = require("./types.js");
 

Utils.speak= function() {
    return "Hello";
};

Utils.ranInt= function(min,max){
  return Math.round(Math.random()*(max-min)+min);
};

Utils.probabilidad=function(percent){//0%-100%---->100% sale siempre
  var amount=100/percent;
  var bool=(Math.floor(Math.random()*amount)+1===1)?true:false;
  if(bool==true)return true;
  else return false;
};
Utils.probabilidadGender=function(percent){//porcentaje que sea hembra
  var amount=100/percent;
  var bool=(Math.floor(Math.random()*amount)+1===1)?true:false;
  if(bool==true)return 0;
  else return 1;
};
Utils.probabilidadShiny=function(){
  return probabilidad_1deMAX(8192);//8192
}
Utils.randomRange = function(min, max) {
    return min + (Math.random() * (max - min));
};

Utils.randomInt = function(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
};

Utils.clamp = function(min, max, value) {
    if(value < min) {
        return min;
    } else if(value > max) {
        return max;
    } else {
        return value;
    }
};

Utils.randomOrientation = function() {
    var o, r = Utils.random(4);
    
    if(r === 0)
        o = Types.Orientations.LEFT;
    if(r === 1)
        o = Types.Orientations.RIGHT;
    if(r === 2)
        o = Types.Orientations.UP;
    if(r === 3)
        o = Types.Orientations.DOWN;
    
    return o;
};

Utils.Mixin = function(target, source) {
  if (source) {
    for (var key, keys = Object.keys(source), l = keys.length; l--; ) {
      key = keys[l];

      if (source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};

Utils.distanceTo = function(x, y, x2, y2) {
    var distX = Math.abs(x - x2);
    var distY = Math.abs(y - y2);

    return (distX > distY) ? distX : distY;
};
//----------------------FIN------------------------
module.exports = Utils;


//************************
//************************
//************************
//FUNCIONES TEMPORALES
function probabilidad_1deMAX(max) {
  var result=Math.floor(Math.random()*max)+1;
  return (result/(max)===1)?1:0;
}