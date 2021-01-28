var Utils = {};
var Types = require("./types.js");
 

Utils.speak= function() {
    return "Hello";
};

Utils.StatPromedio= function(data,stat){
    var nivel=data.nivel;//nivelMonster(data.exp);
    var base;
    var iv;
    var ev;
    var naturaleza;
    if(stat==="ps"){
        base=data.base_ps;
        iv=data.iv_ps;
        ev=data.ev_ps;
        return Math.round(10+(nivel/100*((base*2)+iv+(ev/4)))+nivel);
    }
    if(stat==="atk"){
        base=data.base_atk;
        iv=data.iv_atk;
        ev=data.ev_atk;
        naturaleza=valueNaturaleza(stat,data.naturaleza);
        return Math.round(5+(nivel/100*((base*2)+iv+(ev/4)))*(1+naturaleza));
    }
    if(stat==="def"){
        base=data.base_def;
        iv=data.iv_def;
        ev=data.ev_def;
        naturaleza=valueNaturaleza(stat,data.naturaleza);
        return Math.round(5+(nivel/100*((base*2)+iv+(ev/4)))*(1+naturaleza));
    }
    if(stat==="atk_es"){
        base=data.base_atk_es;
        iv=data.iv_atk_es;
        ev=data.ev_atk_es;
        naturaleza=valueNaturaleza(stat,data.naturaleza);
        return Math.round(5+(nivel/100*((base*2)+iv+(ev/4)))*(1+naturaleza));
    }
    if(stat==="def_es"){
        base=data.base_def_es;
        iv=data.iv_def_es;
        ev=data.ev_def_es;
        naturaleza=valueNaturaleza(stat,data.naturaleza);
        return Math.round(5+(nivel/100*((base*2)+iv+(ev/4)))*(1+naturaleza));
    }
    if(stat==="velocidad"){
        base=data.base_velocidad;
        iv=data.iv_velocidad;
        ev=data.ev_velocidad;
        naturaleza=valueNaturaleza(stat,data.naturaleza);
        return Math.round(5+(nivel/100*((base*2)+iv+(ev/4)))*(1+naturaleza));
    }
};
//1-Activa (Hasty)	2-Huraña (Lonely) 3-Afable (Mild)	4-Ingenua (Naive) 5-Agitada (Impish) 6-Mansa (Quiet)
//7-Alegre (Jolly) 8-Miedosa (Timid) 9-Alocada (Rash) 10-Modesta (Modest) 11-Amable (Gentle) 12-Osada (Bold)
//13-Audaz (Brave) 14-Pícara (Naughty) 15-Cauta (Careful)	16-Plácida (Relaxed) 17-Dócil (Docile)	18-Rara (Quirky)
//19-Firme (Adamant)	20-Serena (Calm) 21-Floja (Lax)	22-Seria (Serious) 23-Fuerte (Hardy)	24-Tímida (Bashful) 25-Grosera (Sassy)
Utils.ranNaturaleza=function(){
    var max=1;
    var min=25;
    return Math.round(Math.random()*(max-min)+min);
};
//primero busca un numero aleatorio entre 1 y dos que son habilidad normal y oculta y si es normal otro aleatorio entre uno y dos si es oculta lo manda directo
Utils.ranHabilidad= function(monsterHabilidades){
    var monHabilidad=Math.round(Math.random()*(2-1)+1);
    if(monHabilidad==1){
      return monsterHabilidades[1][Math.round(Math.random()*(1-0)+0)];
    }
    else{
      return monsterHabilidades[2];
    }
};
Utils.ranIV=function(){
    var max=1;
    var min=31;
    return Math.round(Math.random()*(max-min)+min);
};
Utils.ranGender=function(){
  var femaleProb=100/12.5;//12.5% que sea hembra
  var bool=(Math.floor(Math.random()*femaleProb)+1===1)?true:false;
  if(bool==true)return 0;
  else return 1;
};
Utils.getTeamPosition=function(team){
  var newSlot=null;
  var fin=false;
  Object.keys(team).find(function(slot){
    if(team[slot]===null && fin===false){
      newSlot=slot;
      fin=true;
    }    
  });
  return newSlot;
};















Utils.ranInt= function(min,max){
  return Math.round(Math.random()*(max-min)+min);
};
Utils.changeHabilidad=function(monsterHabilidadCurrent,monsterHabilidadesEvo){//AUN NO SE DONDE PONERLO
    if(monsterHabilidadCurrent===monsterHabilidadesEvo[1][0] || monsterHabilidadCurrent===monsterHabilidadesEvo[1][1]){
      return monsterHabilidadCurrent;
    }
    else {
      return monsterHabilidadesEvo[2];
    }
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
  var amount=100/0.0122;//0.0122% de encontrar shiny
  var bool=(Math.floor(Math.random()*amount)+1===1)?true:false;
  if(bool==true)return 1;
  else return 0;
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
//***************************************************************
//***************************************************************
//***************************************************************
//FUNCIONES NECESARIAS PARA LAS FUNCIONES EXPORTADAS
function valueNaturaleza(statName,naturalezaNum){
    var result=0;
    if(statName==="velocidad" && naturalezaNum===25){//Sassy
        result= -0.1;return result;
    }
    if(statName==="def_es" && naturalezaNum===25){//Sassy
        result= 0.1;return result;
    }
    if(statName==="velocidad" && naturalezaNum===6){//Quiet
        result= -0.1;return result;
    }
    if(statName==="atk_es" && naturalezaNum===6){//Quiet
        result= 0.1;return result;
    }
    if(statName==="velocidad" && naturalezaNum===16){//Relaxed
        result= -0.1;return result;
    }
    if(statName==="def" && naturalezaNum===16){//Relaxed
        result= 0.1;return result;
    }
    if(statName==="velocidad" && naturalezaNum===13){//Brave
        result= -0.1;return result;
    }
    if(statName==="atk" && naturalezaNum===13){//Brave
        result= 0.1;return result;
    }
    if(statName==="def_es" && naturalezaNum===4){//Naive
        result= -0.1;return result;
    }
    if(statName==="velocidad" && naturalezaNum===4){//Naive
        result= 0.1;return result;
    }
    if(statName==="def_es" && naturalezaNum===9){//Rash
        result= -0.1;return result;
    }
    if(statName==="atk_es" && naturalezaNum===9){//Rash
        result= 0.1;return result;
    }
    if(statName==="def_es" && naturalezaNum===21){//Lax
        result= -0.1;return result;
    }
    if(statName==="def" && naturalezaNum===21){//Lax
        result= 0.1;return result;
    }
    if(statName==="def_es" && naturalezaNum===14){//Naughty
        result= -0.1;return result;
    }
    if(statName==="atk" && naturalezaNum===14){//Naughty
        result= 0.1;return result;
    }
    if(statName==="atk_es" && naturalezaNum===7){//Jolly
        result= -0.1;return result;
    }
    if(statName==="velocidad" && naturalezaNum===7){//Jolly
        result= 0.1;return result;
    }
    if(statName==="atk_es" && naturalezaNum===15){//Careful
        result= -0.1;return result;
    }
    if(statName==="def_es" && naturalezaNum===15){//Careful
        result= 0.1;return result;
    }
    if(statName==="atk_es" && naturalezaNum===5){//Impish
        result= -0.1;return result;
    }
    if(statName==="def" && naturalezaNum===5){//Impish
        result= 0.1;return result;
    }
    if(statName==="atk_es" && naturalezaNum===19){//Adamant
        result= -0.1;return result;
    }
    if(statName==="atk" && naturalezaNum===19){//Adamant
        result= 0.1;return result;
    }
    if(statName==="def" && naturalezaNum===1){//Hasty
        result= -0.1;return result;
    }
    if(statName==="velocidad" && naturalezaNum===1){//Hasty
        result= 0.1;return result;
    }
    if(statName==="def" && naturalezaNum===11){//Gentle
        result= -0.1;return result;
    }
    if(statName==="def_es" && naturalezaNum===11){//Gentle
        result= 0.1;return result;
    }
    if(statName==="def" && naturalezaNum===3){//mild
        result= -0.1;return result;
    }
    if(statName==="atk_es" && naturalezaNum===3){//mild
        result= 0.1;return result;
    }
    if(statName==="def" && naturalezaNum===2){//lonely
        result= -0.1;return result;
    }
    if(statName==="atk" && naturalezaNum===2){//lonely
        result= 0.1;return result;
    }
    if(statName==="atk" && naturalezaNum===8){//timid
        result= -0.1;return result;
    }
    if(statName==="velocidad" && naturalezaNum===8){//timid
        result= 0.1;return result;
    }
    if(statName==="atk" && naturalezaNum===20){//calm
        result= -0.1;return result;
    }
    if(statName==="def_es" && naturalezaNum===20){//calm
        result= 0.1;return result;
    }
    if(statName==="atk" && naturalezaNum===10){//modest
        result= -0.1;return result;
    }
    if(statName==="atk_es" && naturalezaNum===10){//modest
        result= 0.1;return result;
    }
    if(statName==="atk" && naturalezaNum===12){//bold
        result= -0.1;return result;
    }
    if(statName==="def" && naturalezaNum===12){//bold
        result= 0.1;return result;
    }
    if(naturalezaNum===23){result= 0;return result;}//hardy
    if(naturalezaNum===17){result= 0;return result;}//docile
    if(naturalezaNum===24){result= 0;return result;}//bashful
    if(naturalezaNum===18){result= 0;return result;}//quirky
    if(naturalezaNum===22){result= 0;return result;}//serious
    
    return result;
}