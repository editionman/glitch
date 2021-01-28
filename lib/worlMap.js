var worldMap = {};
var cls = require("./class");
var Types = require("./types.js");
var npcEntity = require("./npcWorldEntity.js");
var monsterWorldEntity = require("./monsterWorldEntity.js");
var gMonsters = require("../monsters.js");
var gNPCS = require("./npcs.js");
var gQuests = require("./quests.js"); 
var uuid = require("uuid");
var utils = require("./utils.js");
var _ = require("underscore");

 

worldMap=cls.Class.extend({
  init:function(id,mapName,maxpPlayers,teleports){
    var self = this;
    
    this.id = id;
    this.mapName = mapName;
    this.maxPlayers = maxpPlayers;
    this.monsters = {};
    this.players = {};
    this.npcs = {};
    
    this.playerCount=0;
    this.monsterCount=0;
    
    this.nextMaps=teleports;
  },
  //##############################################################################################
  //Create Entities
  //##############################################################################################
  createNPCS: function(npcsAreas){
    var self=this;
    //self.npcs=
    this.npcs=spawnNPCSFunc(npcsAreas);//es un objeto {}
  },
  createMonsters: function(monstersAreas){
    var self=this;
    Object.keys(monstersAreas).forEach(function(id){
      self.monsters[id]=spawnMonstersFunc(monstersAreas[id].arrayMonster,monstersAreas[id].qtyMonster,monstersAreas[id].arrayLevelMonster,id);
    });
  },
  //##############################################################################################
  //NPC Functions
  //##############################################################################################
  NPCDialog: function(conexion,websocket,npcID,npcGUID){
    var self=this;
    this.npcs[npcID].questActive(conexion,websocket.userID,this.npcs[npcID]).then((numQuest)=>{
      this.npcs[npcID].activeQuest=gNPCS[this.npcs[npcID].idnpc].quests[numQuest];//numero de quest actual
      if(numQuest>=gNPCS[this.npcs[npcID].idnpc].quests.length){//Ya completo todas las quest de este npc
        websocket.emit("npcUpdateMap",{talk:gNPCS[this.npcs[npcID].idnpc].talk,status:"complete",guid:npcGUID});
      }
      else{//aun no completa las misiones de este npc
        //VERIFICAR SI SE COMPLETO EL QUEST ACTUAL SI ES ASI ENTONCES DAR RECOMPENSA Y FINALIZAR QUEST ACTUAL EN EL SERVIDOR Y LA DB
        //verificarQuest(websocket)
        //gQuests[this.npcs[npcID].activeQuest]
        websocket.emit("npcUpdateMap",{talk:gNPCS[this.npcs[npcID].idnpc].talk,status:"incomplete",guid:npcGUID});
        
        console.log("se envia");
        console.log("hasta aca me quede en worldMap, ahora que el usuario reciba la info del quest");
      }
    });
  },
  //##############################################################################################
  //Monster Functions
  //##############################################################################################
  monsterAction: function(monsterID,direction){
    var self=this;
    console.log("monster is Actioning ");
  },
  monsterCancelBattle: function(websocket){
    var self=this;
    var ap=this.players[websocket.userID];
    if(ap.wildMon===null){return;};//no hay monster
    //var spawn=(ap.wildMon)?ap.wildMon.spawn:null;
    var spawn=ap.wildMon.spawn;
    ap.wildMon.rival=null;
    ap.wildMon.inBattle=false;
    var dataAll={index:ap.wildMon.uid,spawn:spawn,state:"libre",x:ap.userX,y:ap.userY,z:ap.userZ};
    websocket.broadcast.to(websocket.mapCode).emit('wildMonUpdateMap',dataAll);
    websocket.emit("wildMonUpdateMap",dataAll); 
    ap.wildMon=null;
  },
  monsterRunBattle: function(websocket){
    var self=this;
    var ap=this.players[websocket.userID];
    var spawn=ap.wildMon.rival.spawn;
    if(ap.wildMon===null);//no hay monster
    ap.inBattle=false;
    ap.wildMon.rival=null;
    ap.wildMon.inBattle=false;
    var dataAll={index:ap.wildMon.uid,spawn:spawn,state:"libre",x:ap.userX,y:ap.userY,z:ap.userZ};
    websocket.broadcast.to(websocket.mapCode).emit('wildMonUpdateMap',dataAll);
    websocket.emit("WildBattleRun",{map:websocket.mapCode,exp:0,inBattle:this.players[websocket.userID].inBattle,players:this.players,monsters:this.monsters,player:this.players[websocket.userID]});
    ap.wildMon=null;
  },
  monsterSelectBattle: function(data,websocket){
    var self=this;
    var monsterID=data.monsterID;
    Object.keys(this.monsters).find(function(spawnid){
      if(self.monsters[spawnid][monsterID] !== undefined && self.monsters[spawnid][monsterID].rival===null && self.players[websocket.userID].wildMon==null){
        self.monsters[spawnid][monsterID].rival=websocket.userID;
        self.monsters[spawnid][monsterID].spawn=spawnid;
        self.monsters[spawnid][monsterID].inBattle=true;
        self.monsters[spawnid][monsterID].x=data.x;
        self.monsters[spawnid][monsterID].y=data.y;
        self.monsters[spawnid][monsterID].z=data.z;
        self.monsters[spawnid][monsterID].rotX=data.rotX;
        self.monsters[spawnid][monsterID].rotY=data.rotY;
        self.monsters[spawnid][monsterID].rotZ=data.rotZ;
        self.players[websocket.userID].wildMon=self.monsters[spawnid][monsterID];
        var mon=self.monsters[spawnid][monsterID];
        console.log(mon);
        var dataUser={special:mon.special,num:mon.monster_num,name:mon.monstername,level:mon.level,index:monsterID};
        var dataAll={index:monsterID,spawn:spawnid,state:"ocupado",x:data.x,y:data.y,z:data.z,rotX:data.rotX,rotY:data.rotY,rotZ:data.rotZ};
        websocket.emit("wildMonInfo",dataUser);
        websocket.broadcast.to(websocket.mapCode).emit('wildMonUpdateMap',dataAll);
      }else{
        websocket.emit("wildMonNotFound",{info:"Wild monster on battle or dead",spawn:spawnid,index:monsterID});
      }
    });
  }, 
  monsterMapDestroy: function(websocket,areasMon){
    var monster=this.players[websocket.userID].wildMon;
    var spawn=monster.spawn;
    delete this.monsters[spawn][monster.uid];//-DELETE
    var newMonster=uniqueMonster(areasMon[spawn].arrayMonster,areasMon[spawn].arrayLevelMonster,spawn);//-CREATE
    this.monsters[spawn][newMonster.uid]=newMonster
    this.players[websocket.userID].wildMon=null;
    websocket.broadcast.to(websocket.mapCode).emit('wildMonUpdateMap',{index:monster.uid,spawn:spawn,state:"die",newMon:newMonster});
    websocket.broadcast.to(websocket.mapCode).emit('OtherPlayerInWildBattle',{playerID:websocket.userID,inBattle:false,index:monster.uid});
  },
  monsterStartBattle: function(monsterID,websocket){
    var data={num:this.players[websocket.userID].wildMon.monid,special:this.players[websocket.userID].wildMon.especial,name:this.players[websocket.userID].wildMon.name,level:this.players[websocket.userID].wildMon.level};
    websocket.emit("battleWildMonInfo",{dataWild:data,inBattle:true});//cambiar dataWild
    websocket.broadcast.to(websocket.mapCode).emit('OtherPlayerInWildBattle',{playerID:websocket.userID,inBattle:true,index:monsterID});
  },
  //##############################################################################################
  //Player Functions
  //##############################################################################################
  playerAction: function(playerID,data,websocket){
    var self=this;
    this.players[websocket.userID].userX=data.position.x;
    this.players[websocket.userID].userY=data.position.y;
    this.players[websocket.userID].userZ=data.position.z;
    this.players[websocket.userID].userRotX=data.rotation.x;
    this.players[websocket.userID].userRotY=data.rotation.y;
    this.players[websocket.userID].userRotZ=data.rotation.z;
    this.players[websocket.userID].userBodyRotX=data.brotation.x;
    this.players[websocket.userID].userBodyRotY=data.brotation.y;
    this.players[websocket.userID].userBodyRotZ=data.brotation.z;
    this.players[websocket.userID].animStatus=data.state;
    websocket.broadcast.to(websocket.mapCode).emit('playerAction',{player:this.players[websocket.userID],type:'movement',state:this.players[websocket.userID].animStatus});
  },
  playerJoin: function(playerID,data,websocket){
    //this.players[playerID].userID==websocket.userID;
    this.players[playerID].userX=data.position.x;
    this.players[playerID].userY=data.position.y;
    this.players[playerID].userZ=data.position.z;
    this.players[playerID].userRotX=data.rotation.x;
    this.players[playerID].userRotY=data.rotation.y;
    this.players[playerID].userRotZ=data.rotation.z;
    websocket.broadcast.to(websocket.mapCode).emit('playerJoined', this.players[playerID]);
    websocket.emit("playerStart",{players:this.players,monsters:this.monsters,npcs:this.npcs});
  },
  playerLeft: function(conexion,websocket){
    this.players[websocket.userID].savePlayerDB(conexion);
    websocket.broadcast.to(websocket.mapCode).emit('playerExit',this.players[websocket.userID]);
    delete this.players[websocket.userID];
  },
  StartRoom:function(){
    //inicia el bucle que se repetira infinitamente y se enviara a los jugadores
  }
})
//---------------FIN----------------------
module.exports = worldMap;




























































//*************************************
//*************************************
//*************************************
var monsterCategorias=["L","S","A","B","C","D","E","F"];

function uniqueMonster(array,arrLevel,spawn){
  return foundMonster(array,arrLevel,spawn);
}
//FUNCIONES NECESARIAS TEMPORAL-------
function spawnMonstersFunc(array,qty,arrLevel,spawn){
  if(qty==0)return;
  var monsters={};
  //monsters.monster(array)
  for(var i=0;i<qty;i++){
    //monsters[i]=foundMonster(array,arrLevel);
    var newMonster=foundMonster(array,arrLevel,spawn);
    monsters[newMonster.uid]=newMonster;
  }
  if(i==qty-1 && monsters.length==0);//Crear monstruo por que ya esta en el final y no creo nada;
  return monsters;
  
}
function foundMonster(array,arrLevel,spawn){
  var newMonsterFounded;
  var mostLowCategoria=monsterCategorias[0];
  var mostLowCatMonster;
  var mostLowCatIndex;
  var mostLowCatName;
  var isCreated=false;
  for(var i=0;i<array.length;i++){//BUSCAR LA CATEGORIA MAS BAJA
    //var categoria=gMonsters.monster(array[i]).categoria;
    var categoria=gMonsters.monster[array[i]].categoria;
    mostLowCategoria=compareCategoria(mostLowCategoria,categoria);
  }
  for(var i=0;i<array.length;i++){
    var categoria=gMonsters.monster[array[i]].categoria;
    if(categoria==="0")return;//monster en desarrollo
    if(categoria===mostLowCategoria){
      mostLowCatMonster=gMonsters.monster[array[i]];
      mostLowCatIndex=array[i];
      mostLowCatName=gMonsters.monster[array[i]].monstername;
    }
    var prob=probCategoria(categoria);
    isCreated=utils.probabilidad(prob);
    if(isCreated==true){//se crea monster
      newMonsterFounded=crearMonsterWild(gMonsters.monster[array[i]].monstername,gMonsters.monster[array[i]],array[i],arrLevel,spawn);
      return newMonsterFounded;
    }
  }
  foundMonster(array,arrLevel);
  newMonsterFounded=crearMonsterWild(mostLowCatName,mostLowCatMonster,mostLowCatIndex,arrLevel,spawn);
  return newMonsterFounded;
}
function crearMonsterWild(name,monInfo,monsternum,arrLevel,spawn){
  var especial=utils.probabilidadShiny();
  //monsterEntity
  //var newMon=new Mon(name,numMon,especial,lvlMonsterMap(arrLevel),false,null,spawn);
  var newMon=new monsterWorldEntity(monsternum,lvlMonsterMap(arrLevel),spawn);
  return newMon;
}
function lvlMonsterMap(arrLevel){
  return ranInt(arrLevel[0],arrLevel[1]);
}
function probCategoria(categoria){
  if(categoria=="L")return 0;
  if(categoria=="S")return 1;//0.01
  if(categoria=="A")return 3;//0.1
  if(categoria=="B")return 10;//5
  if(categoria=="C")return 45;//15
  if(categoria=="D")return 50;//30
  if(categoria=="E")return 70;//70
  if(categoria=="F")return 90;//90
}
function compareCategoria(currCat,newCat){
  var newCatIndex=0;
  var currCatIndex=0;
  for(var i=0;i<monsterCategorias.length;i++){
    if(monsterCategorias[i]==newCat){
        newCatIndex=i;
    }
    if(monsterCategorias[i]==currCat){
      currCatIndex=i;
    }
  }
  if(newCatIndex>currCatIndex){
    return monsterCategorias[newCatIndex];
  }else if(newCatIndex<currCatIndex){
    return monsterCategorias[currCatIndex];
  }
  else return monsterCategorias[currCatIndex];
}
//Funciones de probabilidades
function probabilidad(max) {//1 de max
  var result=Math.floor(Math.random()*max)+1;
  if(result==1)return true;
  else return false;
}
function Percentage(percent){//del 0% al100%
  var amount=100/percent;
  var bool=probabilidad(amount);
  if(bool==true)return true;
  else return false;
}
function ranInt(min,max){
  return Math.round(Math.random()*(max-min)+min);
}
/*
function Mon(name,monid,especial,level,inBattle,rival,spawn){
  //this.id=0;
  this.uid=uuid.v4();
  this.name=name;
	this.monid=monid;
	this.especial=especial;
  this.level=level;
	this.inBattle=inBattle;
  this.rival=rival;
  this.spawn=spawn;
  //Math.round(5+(nivel/100*((base*2)+iv+(ev/4)))*(1+naturaleza));
  //monsters.monster(monid).stats.ps;
  this.ps=Math.round(10+(level/100*((gMonsters.monster[monid].stats.ps*2)+31+(0/4)))+level);
  this.currHealth=this.ps;
  this.atk=Math.round(5+(level/100*((gMonsters.monster[monid].stats.atk*2)+31+(0/4)))*(1+0));
  this.def=Math.round(5+(level/100*((gMonsters.monster[monid].stats.def*2)+31+(0/4)))*(1+0));;
  this.atk_es=Math.round(5+(level/100*((gMonsters.monster[monid].stats.atk_es*2)+31+(0/4)))*(1+0));
  this.def_es=Math.round(5+(level/100*((gMonsters.monster[monid].stats.def_es*2)+31+(0/4)))*(1+0));;
  this.velocidad=Math.round(5+(level/100*((gMonsters.monster[monid].stats.velocidad*2)+31+(0/4)))*(1+0));;
  this.type_1=gMonsters.monster[monid].type_1;
  this.type_2=gMonsters.monster[monid].type_1;
  this.altura=gMonsters.monster[monid].altura;
  this.genero=utils.probabilidadGender(10);//0 hembra 1 macho|||tiene un 10% de probabilidades de q salga hembra
  this.x=null;
  this.y=null;
  this.z=null;
  this.rotX=null;
  this.rotY=null;
  this.rotZ=null;
}
*/

//*************************************
//*************************************
//*************************************
function spawnNPCSFunc(npcs){
  //console.log(npcs);
  var newNPCS={};
  for(var id in npcs){
    //[1,0,0,50,180,0,180],//id,posX,posY,posZ,rotX,rotY,rotZ
    //npcs[id][0];//regresa el id del npc
    var npc=npcs[id];
    var tempNPC=new npcEntity(gNPCS[npc[0]].name,gNPCS[npc[0]].moveType,gNPCS[npc[0]].char,gNPCS[npc[0]].func,npc[0]);
    newNPCS[tempNPC.uid]=tempNPC;
    newNPCS[tempNPC.uid].pX=npc[1];
    newNPCS[tempNPC.uid].pY=npc[2];
    newNPCS[tempNPC.uid].pZ=npc[3];
    newNPCS[tempNPC.uid].rX=npc[4];
    newNPCS[tempNPC.uid].rY=npc[5];
    newNPCS[tempNPC.uid].rZ=npc[6];
  }
  return newNPCS;
}
//*************************************
//*************************************
//*************************************
function verificarQuest(){
  
}