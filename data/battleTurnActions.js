var turnactions={};
var Utils = require('../lib/utils.js');
var Movs = require('../data/moves.js');
var exports = module.exports = turnactions;
//*************************************************
//*************************************************
//|||||||||||||||||||USER||||||||||||||||||||||||||
//*************************************************
//*************************************************
turnactions.checkAllReady= function(players,npcs){
  var ready=true;
  Object.keys(players).find((id)=>{
    if(players[id].turn===true)ready=false;
  });
  Object.keys(npcs).find((id)=>{
    if(npcs[id].turn===true)ready=false;
  });
  return ready;
};
//*************************************************
//*************************************************
//|||||||||||||||||||NPC|||||||||||||||||||||||||||
//*************************************************
//*************************************************
turnactions.npcSelectAttack= function(npcBattle,focus){//a veces esta funcion retorna null
  var result=null;
  if((npcBattle.fieldBattle.monster["mov_1"].pp===0 || npcBattle.fieldBattle.monster["mov_1"].pp===null) && (npcBattle.fieldBattle.monster["mov_2"].pp===0 || npcBattle.fieldBattle.monster["mov_2"].pp===null) && (npcBattle.fieldBattle.monster["mov_3"].pp===0 || npcBattle.fieldBattle.monster["mov_3"].pp===null) && (npcBattle.fieldBattle.monster["mov_4"].pp===0 || npcBattle.fieldBattle.monster["mov_4"].pp===null)){
    console.log("USAR FORCEJEO YA NO LE QUEDAN PPS");  
    result={
      owner:npcBattle.user_id,
      type:"movement",
      index:0,
      id:165,//struggle por que no tiene movs
      prioridad:Movs[165].prioridad,
      move:Movs[165],
      monsterOwner:npcBattle.fieldBattle.monster,
      monsterAlly:1,//callSearchTrainer(npcBattle.fieldBattle.monster.battlePartyName,npcBattle.fieldBattle.monster.battlePartyNum),
      monsterEnemy:1,//callSearchTrainer(focus.fieldBattle.monster.battlePartyName,focus.fieldBattle.monster.battlePartyNum),
      ally:{
        name:npcBattle.fieldBattle.monster.battlePartyName,
        num:npcBattle.fieldBattle.monster.battlePartyNum,
      },
      enemy:{
        name:focus.fieldBattle.monster.battlePartyName,
        num:focus.fieldBattle.monster.battlePartyNum,
      },
    };
  }
  else{
    do{
      var num=Utils.ranInt(1,4);
    }while(npcBattle.fieldBattle.monster["mov_"+num].id===null || npcBattle.fieldBattle.monster["mov_"+num].pp<=0);
    result={
      owner:npcBattle.user_id,
      type:"movement",
      index:num,
      id:npcBattle.fieldBattle.monster["mov_"+num].id,
      prioridad:Movs[165].prioridad,
      move:Movs[npcBattle.fieldBattle.monster["mov_"+num].id],
      monsterOwner:npcBattle.fieldBattle.monster,
      monsterAlly:1,//callSearchTrainer(npcBattle.fieldBattle.monster.battlePartyName,npcBattle.fieldBattle.monster.battlePartyNum),
      monsterEnemy:1,//callSearchTrainer(focus.fieldBattle.monster.battlePartyName,focus.fieldBattle.monster.battlePartyNum),
      ally:{
        name:npcBattle.fieldBattle.monster.battlePartyName,
        num:npcBattle.fieldBattle.monster.battlePartyNum,
      },
      enemy:{
        name:focus.fieldBattle.monster.battlePartyName,
        num:focus.fieldBattle.monster.battlePartyNum,
      },
    };
    return result;
  }
};

turnactions.npcSelectRival= function(npcTeam,players,npcs){
  var focus=null;
  var founded=false;
  Object.keys(players).forEach(function(id){
    if(npcTeam!==players[id].battlePartyName && players[id].fieldBattle.monster!==null && founded===false){
      focus=players[id];
      founded=true;
    }
  });
  Object.keys(npcs).forEach(function(id){
    if(npcTeam!==npcs[id].battlePartyName && players[id].fieldBattle.monster!==null && founded===false){
      focus=npcs[id];
      founded=true;
    }
  });
  return focus;
};
//*************************************************
//*************************************************
//|||||||||||||||||BATTLE||||||||||||||||||||||||||
//*************************************************
//*************************************************
turnactions.executeActions= function(allactions){
  allactions.sort(this.sortPositions);
  console.log(allactions);//ACA ME QUEDE
  //TRAER LOS DATOS DEL MONSTER OWNER DEL ENEMY Y DEL ALLY, LUEGO CALCULARLOS CON LOS DATOS DEL MOVE
};
//POSICIONAR MONSTERS POR PRIORIDAD Y VELOCIDAD
turnactions.sortPositions= function(a,b){
  //por prioridad
  if(a.prioridad > b.prioridad){
    return -1;
  }else if(a.prioridad < b.prioridad){
    return 1;
  }else if(a.prioridad === b.prioridad){
    //por velocidad
    if(a.monsterOwner.velocidad > b.monsterOwner.velocidad){
      return -1;
    }else if(a.monsterOwner.velocidad < b.monsterOwner.velocidad){
      return 1;
    }else{
      return 0;//no se define como buscar despues asi que 0
    }
  }
  else{//aun no se define como buscar despues asi que 0
    return 0;
  }
};