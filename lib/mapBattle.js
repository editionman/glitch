var battleMap = {};
var cls = require("../data/class.js");
var Types = require("./types.js");
var npcEntity = require("./WorldEntityNpc.js");
var wildMonsterWorldEntity = require("./WorldEntityWildMonster.js");
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
var Movs=require("../data/moves.js");
var mapas = require("../data/maps.js");
 
  

battleMap=cls.Class.extend({
  init:function(id){
    var self = this;
    
    this.id = id;
    this.mapName = mapas.battle[id].mapname;
    this.players={};//TODOS LOS PARTICIPANTES SOLO TIENE EL TEAM
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
    this.acumuleActions=[];
  },
  //##############################################################################################
  //PLAYER
  //##############################################################################################
  addPlayer:function(playerObj,party){//A o B
    if(Object.keys(this.players).length===0 && playerObj.npc===undefined)playerObj.host=true;//el primero en entrar al mapa de combate es el host
    this.players[playerObj.user_id]=playerObj;
    this.players[playerObj.user_id].battlePartyName=party;
    //this.players[playerObj.user_id].fieldBattle={};
  },
  //##############################################################################################
  //NPC
  //##############################################################################################
  addWildNPC:async function(player,websocket,wildObj,party){//A o B
    if(this.players[player.userID].host===false)return;//si no es host no hacer nada
    this.npcs[wildObj.user_id]=wildObj;//solo tiene un string debe ser obj
    this.npcs[wildObj.user_id].battlePartyName=party;
    //this.battlePartyName=null;
    //this.battlePartyNum=null;
    var newTeamBattle=await TeamMonsterWorld_To_TeamMonsterBattle(this.npcs[wildObj.user_id].team);
    this.npcs[wildObj.user_id].team=newTeamBattle;
  },
  allNpcsAction:function(websocket){
    var player=websocket.player;
    if(this.players[player.userID].host===false)return;//si no es host no hacer nada
    Object.keys(this.npcs).forEach((id)=>{
      if(this.npcs[id].turno===true)this.turnoActionNPC(websocket,this.npcs[id]);
    });
  },
  turnoActionNPC:async function(websocket,playerNPC){
    var playerServer=websocket.player;
    if(this.players[playerServer.userID].host===false)return;//si no es host no hacer nada
    if(playerNPC.fieldBattle.monster===null){
      var monsterToBattle=await TeamMonsterBattle_To_battlefield(playerNPC.team);
      if(monsterToBattle===null);//PERDIO EL COMBATE NO TIENE EQUIPO CON VIDA TERMINAR EL COMBATE PARA ESTE NPC
      else playerNPC.fieldBattle.monster=monsterToBattle;
      playerNPC.fieldBattle.monster.battlePartyName=playerNPC.battlePartyID;
      playerNPC.fieldBattle.monster.battlePartyNum=playerNPC.battlePartyNum;
      websocket.broadcast.to(playerServer.battleMap).emit('turno_invokeMonster',{id:playerNPC.user_id,monster:monsterToBattle});
      websocket.emit("turno_invokeMonster",{id:playerNPC.user_id,monster:monsterToBattle});
    }
    else if(playerNPC.fieldBattle.monster!==null){
      var focus=actions.npcSelectRival(playerNPC.battlePartyName,this.players,this.npcs);
      var moveAtk=actions.npcSelectAttack(playerNPC,focus);
      this.acumuleActions.push(moveAtk);
      playerNPC.turno=false;
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
  setPartysPlayers: function(websocket){
    var player=websocket.player;
    if(this.players[player.userID].host===false)return;//si no es host no hacer nada
    Object.keys(this.players).forEach((id)=>{
      insertPartyPlayers(this.teams,this.partys,this.players[id].battlePartyName,this.players[id]);
    });
    //avanza un turno despues de que todos hayan hecho su jugada,
    //verifica todos los estados y 
    websocket.broadcast.to(websocket.battleMap).emit("shotPartys",this.teams);
    websocket.emit("shotPartys",this.teams);
  },
  setPartysNpcs: function(websocket){
    var self=this;
    var player=websocket.player;
    if(this.players[player.userID].host===false)return;//si no es host no hacer nada
    Object.keys(self.npcs).forEach((id)=>{
      insertPartyNpcs(self.teams,self.partys,self.npcs[id].battlePartyName,self.npcs[id]);
    });
  },
  turnoActionPlayer:async function(conexion,websocket,data){
    var player=websocket.player;
    //console.log("hasta aca bien0");
    if(this.players[player.userID].fieldBattle.monster===null){
      //MONSTER INSERTION
      //console.log("hasta aca bien1");
      var newMonsterBattle=null;
      var newBagBattle=null;
      var monsterResult=await checkerDB.CheckProfileMonster(conexion,player.userID,this.players[player.userID].team[data.index]);
      if(monsterResult.object!==null && monsterResult.object!==undefined)newMonsterBattle=new playerMonsterBattleEntity(monsterResult.object[0]);
      //BAG INSERTION
      var bagResult=await checkerDB.CheckBagBattle(conexion,player.userID);
      this.players[player.userID].bag=bagResult.object;//ordenarlo bonito y mandarlo al cliente
      //console.log("invocar monstruo no pierde turno");
      //ENVIO A TODOS LOS JUGADORES
      //console.log("hasta aca bien2");
      this.players[player.userID].fieldBattle.monster=newMonsterBattle;
      newMonsterBattle.battlePartyName=this.players[player.userID].battlePartyID;
      newMonsterBattle.battlePartyNum=this.players[player.userID].battlePartyNum;
      websocket.broadcast.to(player.battleMap).emit('turno_invokeMonster',{id:player.userID,monster:newMonsterBattle});
      websocket.emit("turno_invokeMonster",{id:player.userID,monster:newMonsterBattle,bag:bagResult.object});
    }
    else if(this.players[player.userID].fieldBattle.monster!==null){
      if(this.players[player.userID].host===true)this.allNpcsAction(websocket);//los npcs atacan este iba arriba antes de la condicional if
      this.players[player.userID].turno=false;
      data.prioridad=Movs[data.id].prioridad;//analizar si esta usando un item o esta runeando o esta usando mov
      data.move=Movs[data.id];
      data.monsterOwner=this.players[player.userID].fieldBattle.monster;
      data.monsterAlly=this.SearchObjective(data.ally.name,data.ally.num);
      data.monsterEnemy=this.SearchObjective(data.enemy.name,data.enemy.num);
      data.owner=player.userID;
      this.acumuleActions.push(data);
      if(actions.checkAllReady(this.players,this.npcs)){
        console.log("DESARROLLAR LOS ATAQUES TODOS ESTAN LISTOS");
        actions.executeActions(this.acumuleActions);//me quede en this.SearchObjective
      }
      //testear lo que agrege
      //FUNCIONA!!!! SE PUEDE SUBIR O BAJAR DE NIVEL 
      /*
      console.log(this.players[player.userID].fieldBattle.monster.ps);
      this.players[player.userID].fieldBattle.monster.nivelPS(1);
      console.log(this.players[player.userID].fieldBattle.monster.ps);
      */
    }
    //this.players[websocket.userID].turno=false;
  },
  nextTurno: function(playerID,data,websocket){
    //avanza un turno despues de que todos hayan hecho su jugada,
    //verifica todos los estados y 
  },
  playerJoin:function(playerID,data,websocket){
    
  },
  changeWorldMap:function(websocket){//ya sale del nextMap en playerJoin en roomGame
    websocket.broadcast.to(websocket.mapCode).emit('playerBattleExit',this.players[websocket.userID]);
    delete this.players[websocket.userID];
  },
  //BUSCAR TRAINER IN BATTLE
  SearchObjective:function(nameParty,numParty){
    var objective=null;
    var founded=false;
    var self=this;
    Object.keys(self.players).forEach(function(id){
      if(self.players[id].battlePartyName===nameParty && self.players[id].battlePartyNum===numParty && founded===false){
        objective=self.players[id].fieldBattle.monster;
        founded=true;
        console.log("encontrado");
      }
    });
    Object.keys(self.npcs).forEach(function(id){
      if(self.npcs[id].battlePartyName===nameParty && self.npcs[id].battlePartyNum===numParty && founded===false){
        objective=self.npcs[id].fieldBattle.monster;
        founded=true;
        console.log("encontrado");
      }
    });
    console.log(objective);
    return objective;
  },
})
//---------------FIN----------------------
module.exports = battleMap;



























































//*************************************
//*************************************
//*************************************
//FUNCIONES NECESARIAS PARA ESTE OBJETO
function TeamMonsterWorld_To_TeamMonsterBattle(team){
   return new Promise((resolve,reject)=>{
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
    resolve(newTeam);
   });
}

function TeamMonsterBattle_To_battlefield(teambattle){
  return new Promise((resolve,reject)=>{
    var monsterToBattle=null;
    var founded=false;
    Object.keys(teambattle).find(function(id){
      if(teambattle[id].currPS>0 && founded===false){
        monsterToBattle=teambattle[id];
        founded=true;
      }
    });
    resolve(monsterToBattle);
  });  
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

