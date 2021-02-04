var battleMap = {};
var cls = require("../data/class.js");
var Types = require("./types.js");
var npcEntity = require("./WorldEntityNpc.js");
var monsterWorldEntity = require("./WorldEntityMonster.js");
var gMonsters = require("../data/monsters.js");
var gNPCS = require("../data/npcs.js");
var gQuests = require("../data/quests.js"); 
var uuid = require("uuid");
var utils = require("./utils.js");
var _ = require("underscore");
//-------------------------------------
var playerMonsterBattleEntity = require("./BattleEntityPlayerMonster.js");
var npcMonsterBattleEntity = require("./BattleEntityNpcMonster.js");
var checkerDB=require("./DBchecker.js");
var actions = require("../data/battleTurnActions.js");
var mapas = require("../data/maps.js");
 
  

battleMap=cls.Class.extend({
  init:function(id,mapName){
    var self = this;
    
    this.id = id;
    this.mapName = mapName;
    this.players = {};//TODOS LOS PARTICIPANTES SOLO TIENE EL TEAM
    this.npcs={};
    this.teams={
        SpawnBattleTeamA: {1: false, 2: false, 3: false},
        SpawnBattleTeamB: {1: false, 2: false, 3: false},
    };//las posiciones en el mapa de juego
    this.partys=["SpawnBattleTeamA","SpawnBattleTeamB"];
    //this.monsters = {};
    //this.players = {};
    this.viewers = {};
    this.arbitros = {};
    this.turno=0;//empieza en el turno cero
    this.weather={name:"Neutral",turno:0};
    this.ambiente=mapas.battle[id].ambiente;
    this.acumuleActions={};
  },
  //##############################################################################################
  //PLAYER
  //##############################################################################################
  addPlayer:function(playerObj,party){//A o B
    if(Object.keys(this.players).length===0 && playerObj.npc===undefined)playerObj.host=true;//el primero en entrar al mapa de combate es el host
    //if(Object.keys(this.players).length===0)playerObj.host=true;//el primero en entrar al mapa de combate es el host
    this.players[playerObj.user_id]=playerObj;
    this.players[playerObj.user_id].battlePartyName=party;
    //this.players[playerObj.user_id].fieldBattle={};
  },
  //##############################################################################################
  //NPC
  //##############################################################################################
  addWildNPC:async function(websocket,wildObj,party){//A o B
    if(this.players[websocket.userID].host===false)return;//si no es host no hacer nada
    this.npcs[wildObj.user_id]=wildObj;//solo tiene un string debe ser obj
    this.npcs[wildObj.user_id].battlePartyName=party;
    var newTeamBattle=await TeamMonsterWorld_To_TeamMonsterBattle(this.npcs[wildObj.user_id].team);
    this.npcs[wildObj.user_id].team=newTeamBattle;
    //this.turnoActionNPC(websocket,this.npcs[wildObj.user_id]);
  },
  allNpcsAction:function(websocket){
    if(this.players[websocket.userID].host===false)return;//si no es host no hacer nada
    Object.keys(this.npcs).forEach((id)=>{
      this.turnoActionNPC(websocket,this.npcs[id]);
    });
  },
  turnoActionNPC:async function(websocket,playerNPC){
    if(this.players[websocket.userID].host===false)return;//si no es host no hacer nada
    if(playerNPC.fieldBattle.monster===null){
      var monsterToBattle=await TeamMonsterBattle_To_battlefield(playerNPC.team);
      if(monsterToBattle===null);//PERDIO EL COMBATE NO TIENE EQUIPO CON VIDA TERMINAR EL COMBATE PARA ESTE NPC
      else playerNPC.fieldBattle.monster=monsterToBattle;
      var partyid=playerNPC.battlePartyID;
      var partynum=playerNPC.battlePartyNum;
      websocket.broadcast.to(websocket.battleMap).emit('turno_invokeMonster',{id:playerNPC.user_id,monster:monsterToBattle,partyID:partyid,partyNUM:partynum});
      websocket.emit("turno_invokeMonster",{id:playerNPC.user_id,monster:monsterToBattle,partyID:partyid,partyNUM:partynum});
      //var newMonsterBattle=new npcMonsterBattleEntity(monsterResult.object[0]);
    }
  },
  //##############################################################################################
  //ALL FUNCTIONS MAP
  //##############################################################################################
  addMonster:function(monObj,ownerID){//A o B
    var fieldID=null;
    var self=this;
    return new Promise((resolve,reject)=>{
      console.log("ACA ME QUEDE EN SERVIDOR");
      resolve(true);
    });    
  },
  setPartysPlayers: function(partysGame,websocket){
    if(this.players[websocket.userID].host===false)return;//si no es host no hacer nada
    Object.keys(this.players).forEach((id)=>{
      insertPartyPlayers(this.teams,this.partys,this.players[id].battlePartyName,this.players[id]);
    });
    //avanza un turno despues de que todos hayan hecho su jugada,
    //verifica todos los estados y 
    websocket.broadcast.to(websocket.battleMap).emit("shotPartys",this.teams);
    websocket.emit("shotPartys",this.teams);
  },
  setPartysNpcs: function(websocket){
    if(this.players[websocket.userID].host===false)return;//si no es host no hacer nada
    Object.keys(this.npcs).forEach((id)=>{
      insertPartyNpcs(this.teams,this.partys,this.npcs[id].battlePartyName,this.npcs[id]);
    });
  },
  monsterAction: function(monsterID,direction){
    var self=this;
    console.log("monster is Actioning ");
  },
  turnoActionPlayer:async function(conexion,websocket,data){
    //data.type-data.id
    //console.log(this.players[websocket.userID]);
    console.log("hasta aca bien0");
    console.log(this.players[websocket.userID].fieldBattle.monster)
    if(this.players[websocket.userID].fieldBattle.monster===null){
      //esta invocando su monster por que su campo esta vacio
      //MONSTER INSERTION
      console.log("hasta aca bien1");
      var newMonsterBattle=null;
      var newBagBattle=null;
      var monsterResult=await checkerDB.CheckProfileMonster(conexion,websocket.userID,this.players[websocket.userID].team[data.id]);
      if(monsterResult.object!==null && monsterResult.object!==undefined)newMonsterBattle=new playerMonsterBattleEntity(monsterResult.object[0]);
      //BAG INSERTION
      var bagResult=await checkerDB.CheckBagBattle(conexion,websocket.userID);
      this.players[websocket.userID].bag=bagResult.object;//ordenarlo bonito y mandarlo al cliente
      console.log("invocar monstruo no pierde turno");
      //ENVIO A TODOS LOS JUGADORES
      console.log("hasta aca bien2");
      this.players[websocket.userID].fieldBattle.monster=newMonsterBattle;
      var partyid=this.players[websocket.userID].battlePartyID;
      var partynum=this.players[websocket.userID].battlePartyNum;
      websocket.broadcast.to(websocket.battleMap).emit('turno_invokeMonster',{id:websocket.userID,monster:newMonsterBattle,partyID:partyid,partyNUM:partynum});
      websocket.emit("turno_invokeMonster",{id:websocket.userID,monster:newMonsterBattle,bag:bagResult.object,partyID:partyid,partyNUM:partynum});
    }
    //this.players[websocket.userID].turno=false;
    /*
    var result=null;
    var already=await actions.checkAllReady(this.players);
    var battlePartyID=this.players[websocket.userID].battlePartyID;//return teamA o teamB
    var checkfield=Object.keys(this["field"+battlePartyID][websocket.userID]).length;
    if(checkfield===0){
      //no termina turno por que solo esta poniendo un nuevo pokemon
      if(data.type==="monster" && already===false){
        var newMonsterBattle=null;
        //MONSTER INSERTION
        var monsterResult=await checkerDB.CheckProfileMonster(conexion,websocket.userID,this.players[websocket.userID].team[data.id]);
        if(monsterResult.object!==null && monsterResult.object!==undefined)newMonsterBattle=new playerMonsterBattleEntity(monsterResult.object[0]);
        this["field"+this.players[websocket.userID].battlePartyID][websocket.userID]=newMonsterBattle;
        //BAG INSERTION
        var bagResult=await checkerDB.CheckBagBattle(conexion,websocket.userID);
        this.players[websocket.userID].bag=bagResult.object;//ordenarlo bonito y mandarlo al cliente
        //ENVIO A TODOS LOS JUGADORES
        websocket.broadcast.to(websocket.battleMap).emit('turn_invokeMonster',{id:websocket.userID,monster:newMonsterBattle});
        websocket.emit("turn_invokeMonster",{id:websocket.userID,monster:newMonsterBattle,bag:bagResult.object}); 
      }
      //agregar nuevo pokemon y enviar a todos los que se encuentren en la room el nuevo pokemon que se agregó al campo
    }
    else if(checkfield!==0 && already===false){
      this.acumuleActions[websocket.userID]=data;
      this.players[websocket.userID].turno=false;
    }
    else if(already===true){
      var result=await actions.newMovement(this.acumuleActions);
    }
    */
  },
  nextTurno: function(playerID,data,websocket){
    //avanza un turno despues de que todos hayan hecho su jugada,
    //verifica todos los estados y 
  },
  
})
//---------------FIN----------------------
module.exports = battleMap;



























































//*************************************
//*************************************
//*************************************
//FUNCIONES NECESARIAS PARA ESTE OBJETO
function TeamMonsterWorld_To_TeamMonsterBattle(team){
  var newTeam={};
  if(team[1]!==undefined){
    newTeam[1]=new npcMonsterBattleEntity(team[1]);
  }else if(team[2]!==undefined){
    newTeam[2]=new npcMonsterBattleEntity(team[2]);
  }
  else if(team[3]!==undefined){
    newTeam[3]=new npcMonsterBattleEntity(team[3]);
  }
  else if(team[4]!==undefined){
    newTeam[4]=new npcMonsterBattleEntity(team[4]);
  }
  else if(team[5]!==undefined){
    newTeam[5]=new npcMonsterBattleEntity(team[5]);
  }
  else if(team[6]!==undefined){
    newTeam[6]=new npcMonsterBattleEntity(team[6]);
  }
  return newTeam;
}

function TeamMonsterBattle_To_battlefield(teambattle){
  var monsterToBattle=null;
  var founded=false;
  Object.keys(teambattle).find(function(id){
    if(teambattle[id].currPS>0 && founded===false){
      monsterToBattle=teambattle[id];
      founded=true;
    }
  });
  return monsterToBattle;
}

function insertPartyPlayers(teams,partys,partyName,playerObj){
    if(teams[partys[0]].name===undefined){//vacio crear y poner jugador
        //console.log("este esta vacio: "+partys[0]);
        teams[partys[0]].name=partyName;
        if(teams[partys[0]][1]===false){teams[partys[0]][1]=playerObj;playerObj.battlePartyNum=1;playerObj.battlePartyID=partys[0]}
        else if(teams[partys[0]][2]===false){teams[partys[0]][2]=playerObj;playerObj.battlePartyNum=2;playerObj.battlePartyID=partys[0]}
        else if(teams[partys[0]][3]===false){teams[partys[0]][3]=playerObj;playerObj.battlePartyNum=3;playerObj.battlePartyID=partys[0]}
    }
    else if(teams[partys[0]].name===partyName){//mismo team poner jugador
        //console.log("mismo team: "+partys[0]);
        if(teams[partys[0]][1]===false){teams[partys[0]][1]=playerObj;playerObj.battlePartyNum=1;playerObj.battlePartyID=partys[0]}
        else if(teams[partys[0]][2]===false){teams[partys[0]][2]=playerObj;playerObj.battlePartyNum=2;playerObj.battlePartyID=partys[0]}
        else if(teams[partys[0]][3]===false){teams[partys[0]][3]=playerObj;playerObj.battlePartyNum=3;playerObj.battlePartyID=partys[0]}
    }
    else if(teams[partys[1]].name===undefined){//vacio crear y poner jugador
        //console.log("vacio: "+partys[1]);
        teams[partys[1]].name=partyName;
        if(teams[partys[1]][1]===false){teams[partys[1]][1]=playerObj;playerObj.battlePartyNum=1;playerObj.battlePartyID=partys[1]}
        else if(teams[partys[1]][2]===false){teams[partys[1]][2]=playerObj;playerObj.battlePartyNum=2;playerObj.battlePartyID=partys[1]}
        else if(teams[partys[1]][3]===false){teams[partys[1]][3]=playerObj;playerObj.battlePartyNum=3;playerObj.battlePartyID=partys[1]}
    }
    else if(teams[partys[1]].name===partyName){//mismo team poner jugador
        //console.log("mismo team: "+partys[1]);
        if(teams[partys[1]][1]===false){teams[partys[1]][1]=playerObj;playerObj.battlePartyNum=1;playerObj.battlePartyID=partys[1]}
        else if(teams[partys[1]][2]===false){teams[partys[1]][2]=playerObj;playerObj.battlePartyNum=2;playerObj.battlePartyID=partys[1]}
        else if(teams[partys[1]][3]===false){teams[partys[1]][3]=playerObj;playerObj.battlePartyNum=3;playerObj.battlePartyID=partys[1]}
    }
}
function insertPartyNpcs(teams,partys,partyName,npcObj){
  var partynum=0;
  //this.battlePartyNum=null;
    if(teams[partys[0]].name===undefined){//vacio crear y poner jugador
        //console.log("este esta vacio: "+partys[0]);
        teams[partys[0]].name=partyName;
        if(teams[partys[0]][1]===false){teams[partys[0]][1]=npcObj;npcObj.battlePartyNum=1;npcObj.battlePartyID=partys[0]}
        else if(teams[partys[0]][2]===false){teams[partys[0]][2]=npcObj;npcObj.battlePartyNum=2;npcObj.battlePartyID=partys[0]}
        else if(teams[partys[0]][3]===false){teams[partys[0]][3]=npcObj;npcObj.battlePartyNum=3;npcObj.battlePartyID=partys[0]}
    }
    else if(teams[partys[0]].name===partyName){//mismo team poner jugador
        //console.log("mismo team: "+partys[0]);
        if(teams[partys[0]][1]===false){teams[partys[0]][1]=npcObj;npcObj.battlePartyNum=1;npcObj.battlePartyID=partys[0]}
        else if(teams[partys[0]][2]===false){teams[partys[0]][2]=npcObj;npcObj.battlePartyNum=2;npcObj.battlePartyID=partys[0]}
        else if(teams[partys[0]][3]===false){teams[partys[0]][3]=npcObj;npcObj.battlePartyNum=3;npcObj.battlePartyID=partys[0]}
    }
    else if(teams[partys[1]].name===undefined){//vacio crear y poner jugador
        //console.log("vacio: "+partys[1]);
        teams[partys[1]].name=partyName;
        if(teams[partys[1]][1]===false){teams[partys[1]][1]=npcObj;npcObj.battlePartyNum=1;npcObj.battlePartyID=partys[1]}
        else if(teams[partys[1]][2]===false){teams[partys[1]][2]=npcObj;npcObj.battlePartyNum=2;npcObj.battlePartyID=partys[1]}
        else if(teams[partys[1]][3]===false){teams[partys[1]][3]=npcObj;npcObj.battlePartyNum=3;npcObj.battlePartyID=partys[1]}
    }
    else if(teams[partys[1]].name===partyName){//mismo team poner jugador
        //console.log("mismo team: "+partys[1]);
        if(teams[partys[1]][1]===false){teams[partys[1]][1]=npcObj;npcObj.battlePartyNum=1;npcObj.battlePartyID=partys[1]}
        else if(teams[partys[1]][2]===false){teams[partys[1]][2]=npcObj;npcObj.battlePartyNum=2;npcObj.battlePartyID=partys[1]}
        else if(teams[partys[1]][3]===false){teams[partys[1]][3]=npcObj;npcObj.battlePartyNum=3;npcObj.battlePartyID=partys[1]}
    }
}