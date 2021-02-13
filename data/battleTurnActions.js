var turnactions={};
var Utils = require('../lib/utils.js');
var exports = module.exports = turnactions;
//*************************************************
//*************************************************
//|||||||||||||||||||USER||||||||||||||||||||||||||
//*************************************************
//*************************************************
turnactions.newMovement= function(allactions){
  return new Promise((resolve,reject)=>{
    console.log(allactions);
    console.log("SE EJECUTA EL PRIMER MOVIMIENTO");
  });
};
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
turnactions.npcSelectAttack= function(npcBattle,focus){
  var num = Utils.ranInt(1,4);
  var result={};
  if(npcBattle.fieldBattle.monster["mov_1"].pp===0 && npcBattle.fieldBattle.monster["mov_2"].pp===0 && npcBattle.fieldBattle.monster["mov_3"].pp===0 && npcBattle.fieldBattle.monster["mov_4"].pp===0){
    console.log("USAR FORCEJEO YA NO LE QUEDAN PPS");  
    result={
      type:"movement",
      id:0,
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
  else if(npcBattle.fieldBattle.monster["mov_"+num].pp!==null && npcBattle.fieldBattle.monster["mov_"+num].pp>0){
    result={
      type:"movement",
      id:num,
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
  else if(npcBattle.fieldBattle.monster["mov_"+num].pp===null || npcBattle.fieldBattle.monster["mov_"+num].pp<=0){
    this.npcSelectAttack(npcBattle);
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
  console.log(focus.user_name);
  return focus;
};