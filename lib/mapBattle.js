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
var checkerDB=require("./DBchecker.js");
var actions = require("../data/battleTurnActions.js");
var mapas = require("../data/maps.js");
 
  

battleMap=cls.Class.extend({
  init:function(id,mapName){
    var self = this;
    
    this.id = id;
    this.mapName = mapName;
    this.players = {};//TODOS LOS PARTICIPANTES SOLO TIENE EL TEAM
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
  //Add Player Entities
  //##############################################################################################
  setPartys: function(partysGame,websocket){
    if(this.players[websocket.userID].host===false)return;//si no es host no hacer nada
    //this.teams=partysGame;
    //console.log(partysGame);
    Object.keys(this.players).forEach((id)=>{
      if(typeof this.players[id]==="object"){//es player o npc
        insertPartyBattle(this.teams,this.partys,this.players[id].battleParty,this.players[id]);
      }
      else if(typeof this.players[id]==="string"){//es wild
        insertPartyBattle(this.teams,this.partys,this.players[id],this.players[id]);
      }
    });
    //avanza un turno despues de que todos hayan hecho su jugada,
    //verifica todos los estados y 
    websocket.broadcast.to(websocket.battleMap).emit("shotPartys",this.teams);
    websocket.emit("shotPartys",this.teams);
  },
  addWildNPC:function(wildObj,party){//A o B
    this.players[wildObj.user_id]=wildObj;//solo tiene un string debe ser obj
    this.players[wildObj.user_id].battleParty=party;
    //this.players[wildObj.user_id].fieldBattle={};
  },
  
  addPlayer:function(playerObj,party){//A o B
    if(Object.keys(this.players).length===0 && playerObj.npc===undefined)playerObj.host=true;//el primero en entrar al mapa de combate es el host
    //if(Object.keys(this.players).length===0)playerObj.host=true;//el primero en entrar al mapa de combate es el host
    this.players[playerObj.user_id]=playerObj;
    this.players[playerObj.user_id].battleParty=party;
    //this.players[playerObj.user_id].fieldBattle={};
    
  },
  
  addMonster:function(monObj,ownerID){//A o B
    //monObj.battleParty=A o B
    var fieldID=null;
    var self=this;
    return new Promise((resolve,reject)=>{
      console.log("ACA ME QUEDE EN SERVIDOR");
      
      resolve(true);
    });    
  },
  //##############################################################################################
  //Monster Functions
  //##############################################################################################
  monsterAction: function(monsterID,direction){
    var self=this;
    console.log("monster is Actioning ");
  },
  turnoAction:async function(conexion,websocket,data){
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
      websocket.broadcast.to(websocket.battleMap).emit('turno_invokeMonster',{id:websocket.userID,monster:newMonsterBattle});
      websocket.emit("turno_invokeMonster",{id:websocket.userID,monster:newMonsterBattle,bag:bagResult.object});
    }
    //this.players[websocket.userID].turno=false;
    /*
    var result=null;
    var already=await actions.checkAllReady(this.players);
    var battleParty=this.players[websocket.userID].battleParty;//return teamA o teamB
    var checkfield=Object.keys(this["field"+battleParty][websocket.userID]).length;
    if(checkfield===0){
      //no termina turno por que solo esta poniendo un nuevo pokemon
      if(data.type==="monster" && already===false){
        var newMonsterBattle=null;
        //MONSTER INSERTION
        var monsterResult=await checkerDB.CheckProfileMonster(conexion,websocket.userID,this.players[websocket.userID].team[data.id]);
        if(monsterResult.object!==null && monsterResult.object!==undefined)newMonsterBattle=new playerMonsterBattleEntity(monsterResult.object[0]);
        this["field"+this.players[websocket.userID].battleParty][websocket.userID]=newMonsterBattle;
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
function insertPartyBattle(teams,partys,partyName,playerObj){
    if(teams[partys[0]].name===undefined){//vacio crear y poner jugador
        //console.log("este esta vacio: "+partys[0]);
        teams[partys[0]].name=partyName;
        if(teams[partys[0]][1]===false)teams[partys[0]][1]=playerObj;
        else if(teams[partys[0]][2]===false)teams[partys[0]][2]=playerObj;
        else if(teams[partys[0]][3]===false)teams[partys[0]][3]=playerObj;
    }
    else if(teams[partys[0]].name===partyName){//mismo team poner jugador
        //console.log("mismo team: "+partys[0]);
        if(teams[partys[0]][1]===false)teams[partys[0]][1]=playerObj;
        else if(teams[partys[0]][2]===false)teams[partys[0]][2]=playerObj;
        else if(teams[partys[0]][3]===false)teams[partys[0]][3]=playerObj;
    }
    else if(teams[partys[1]].name===undefined){//vacio crear y poner jugador
        //console.log("vacio: "+partys[1]);
        teams[partys[1]].name=partyName;
        if(teams[partys[1]][1]===false)teams[partys[1]][1]=playerObj;
        else if(teams[partys[1]][2]===false)teams[partys[1]][2]=playerObj;
        else if(teams[partys[1]][3]===false)teams[partys[1]][3]=playerObj;
    }
    else if(teams[partys[1]].name===partyName){//mismo team poner jugador
        //console.log("mismo team: "+partys[1]);
        if(teams[partys[1]][1]===false)teams[partys[1]][1]=playerObj;
        else if(teams[partys[1]][2]===false)teams[partys[1]][2]=playerObj;
        else if(teams[partys[1]][3]===false)teams[partys[1]][3]=playerObj;
    }
}
