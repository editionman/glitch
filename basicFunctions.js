var exports = module.exports = {
  
  
  speak: function() {
    return "Hello";
  },

  NameDay: function(num){
    switch (num){
      case 0:
      return 'Monday';
      break;
      case 1:
      return 'Thuesday';
      break;
      case 2:
      return 'Wednesday';
      break;
      case 3:
      return 'Thursday';
      break;
      case 4:
      return 'Friday';
      break;
      case 5:
      return 'Saturday';
      break;
      case 6:
      return 'Sunday';
      break;
    }
},
  NumeroAleatorio: function(min,max){
    return Math.round(Math.random()*(max-min)+min);
  },
  //
  movsAprendidosPorNivel: function(data,nivel){
    var result=[];
    for(var i=0;i<data.movimientos.length;i++){
      if(data.movimientos[i][2]<=nivel && data.movimientos[i][3]==="lvlup"){
        result.push(data.movimientos[i][0]);
      }
    }
    return result.toString();
  },
  wildMonsterRandom:function(){
    var monstersRandom=[0,1,4,7,10];
    var max=monstersRandom.length-1;
    var min=1
    var num=Math.round(Math.random()*(max-min)+min);//del1 al 5
    return monstersRandom[num];
  },
  probabilidadShiny:function(){
    return probabilidad_1deMAX(8192);//8192
  },
  probabilidadCatch:function(){
    return probabilidad_1deMAX(5);//8192
  },
  

//STATISTICS PROMEDIAL
  StatPromedio: function(data,stat){
    var nivel=nivelMonster(data.exp);
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
  }
};//HASTA ACA LO QUE SE EXPORTA


function nivelMonster(exp){
    if(exp===0){
        return 1;
    }
    else{return Math.round(Math.sqrt(exp));}
}


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

function probabilidad_1deMAX(max) {
  var result=Math.floor(Math.random()*max)+1;
  return (result/(max)===1)?1:0;
}