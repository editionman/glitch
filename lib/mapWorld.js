//playerJoin me quede aca me falta cuando se agrega un personaje que lo agregue al mapa pero el que se agrega ultimo si ve a los que a estan
var worldMap = {};
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
var mapas = require("../data/maps.js");
//-----------------------------------
var checkerDB=require("./DBchecker.js");
var CreatorObjects=require("./Objects.js");
//-----------------------------------
var plrBattle = require("./BattleEntityPlayer.js");
var npcBattle = require("./BattleEntityNpc.js");
var battleMap = require("./mapBattle.js");
 

worldMap=cls.Class.extend({
  init:function(id){
    var self = this;
    
    this.id = id;
    this.mapName = mapas.world[id].mapname;
    this.maxPlayers = mapas.world[id].maxPlayers;
    this.monsters = {};
    this.players = {};
    this.npcs = {};
    this.trainerMonsters={};
    
    this.playerCount=0;
    this.monsterCount=0;
    
    this.nextMaps=mapas.world[id].teleports;
    this.haveHost=false;
  },
  //##############################################################################################
  //Create Entities
  //##############################################################################################
  createNPCS: function(){
    var self=this;
    var npcsAreas=mapas.world[this.id].npcs
    //self.npcs=
    this.npcs=spawnNPCSFunc(npcsAreas);//es un objeto {}
  },
  createMonsters: function(){
    var self=this;
    var monstersAreas=mapas.world[this.id].areasMonsters;
    Object.keys(monstersAreas).forEach(function(id){
      self.monsters[id]=spawnMonstersFunc(monstersAreas[id].arrayMonster,monstersAreas[id].qtyMonster,monstersAreas[id].arrayLevelMonster,id);
    });
  },
  createMonsterBattle:function(websocket,conexion,data){
    var player=websocket.player;
    console.log("Se escogio un monster para que saliera de su pokeball su id es: "+data.monid+" del player: "+player.user_id);
    //verificar que el monster sea de esta persona
    //poner el monster en this.trainerMonsters y enviarlo a todos los usuarios
    // PD: se debe enviar esta info cuando un user entra por primera vez al mapa
  },
  //##############################################################################################
  //NPC Functions
  //##############################################################################################
  NPCDialog: function(conexion,websocket,npcID,npcGUID){
    var self=this;
    var player=websocket.player;
    this.npcs[npcID].questActive(conexion,player.userID,this.npcs[npcID]).then((numQuest)=>{
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
  wildMonsterAction: function(data,websocket){
    var player=websocket.player;
    if(this.players[player.userID].host===false)return;
    this.monsters[data.spawn][data.id].x=data.position.x;
    this.monsters[data.spawn][data.id].y=data.position.y;
    this.monsters[data.spawn][data.id].z=data.position.z;
    this.monsters[data.spawn][data.id].rotX=data.rotation.x;
    this.monsters[data.spawn][data.id].rotY=data.rotation.y;
    this.monsters[data.spawn][data.id].rotZ=data.rotation.z;
    this.monsters[data.spawn][data.id].animStatus=data.state;
    websocket.broadcast.to(player.mapCode).emit('wildAction',{monster:this.monsters[data.spawn][data.id],type:'movement',state:this.monsters[data.spawn][data.id].animStatus});
  },
  monsterCancelBattle: function(websocket){
    var player=websocket.player;
    var self=this;
    var ap=this.players[player.userID];
    if(ap.wildMon===null){return;};//no hay monster
    //var spawn=(ap.wildMon)?ap.wildMon.spawn:null;
    var spawn=ap.wildMon.spawn;
    ap.wildMon.rival=null;
    ap.wildMon.inBattle=false;
    var dataAll={index:ap.wildMon.uid,spawn:spawn,state:"libre",x:ap.userX,y:ap.userY,z:ap.userZ};
    websocket.broadcast.to(player.mapCode).emit('wildMonUpdateMap',dataAll);
    websocket.emit("wildMonUpdateMap",dataAll); 
    ap.wildMon=null;
  },
  monsterRunBattle: function(websocket){
    var player=websocket.player;
    var self=this;
    var ap=this.players[player.userID];
    var spawn=ap.wildMon.rival.spawn;
    if(ap.wildMon===null);//no hay monster
    ap.inBattle=false;
    ap.wildMon.rival=null;
    ap.wildMon.inBattle=false;
    var dataAll={index:ap.wildMon.uid,spawn:spawn,state:"libre",x:ap.userX,y:ap.userY,z:ap.userZ};
    websocket.broadcast.to(player.mapCode).emit('wildMonUpdateMap',dataAll);
    websocket.emit("WildBattleRun",{map:player.mapCode,exp:0,inBattle:this.players[player.userID].inBattle,players:this.players,monsters:this.monsters,player:this.players[player.userID]});
    ap.wildMon=null;
  },
  monsterSelectBattle: function(data,player,websocket){
    var self=this;
    var monsterID=data.monsterID;
    Object.keys(self.monsters).find(function(spawnid){
      if(self.monsters[spawnid][monsterID] !== undefined && self.monsters[spawnid][monsterID].rival===null && self.players[player.userID].wildMon==null){
        self.monsters[spawnid][monsterID].rival=player.userID;
        self.monsters[spawnid][monsterID].spawn=spawnid;
        self.monsters[spawnid][monsterID].inBattle=true;
        self.monsters[spawnid][monsterID].x=data.x;
        self.monsters[spawnid][monsterID].y=data.y;
        self.monsters[spawnid][monsterID].z=data.z;
        self.monsters[spawnid][monsterID].rotX=data.rotX;
        self.monsters[spawnid][monsterID].rotY=data.rotY;
        self.monsters[spawnid][monsterID].rotZ=data.rotZ;
        self.players[player.userID].wildMon=self.monsters[spawnid][monsterID];
        var mon=self.monsters[spawnid][monsterID];
        var dataUser={special:mon.special,num:mon.monster_num,name:mon.monstername,level:mon.level,index:monsterID};
        var dataAll={index:monsterID,spawn:spawnid,state:"ocupado",x:data.x,y:data.y,z:data.z,rotX:data.rotX,rotY:data.rotY,rotZ:data.rotZ};
        websocket.emit("wildMonInfo",dataUser);
        websocket.broadcast.to(player.mapCode).emit('wildMonUpdateMap',dataAll);
      }else{
        websocket.emit("wildMonNotFound",{info:"Wild monster on battle or dead",spawn:spawnid,index:monsterID});
      }
    });
  }, 
  monsterMapDefeat: function(player,websocket){
    var areasMon=mapas.world[this.id].areasMonsters;
    var monster=this.players[player.userID].wildMon;
    var spawn=monster.spawn;
    delete this.monsters[spawn][monster.uid];//-DELETE
    var newMonster=uniqueMonster(areasMon[spawn].arrayMonster,areasMon[spawn].arrayLevelMonster,spawn);//-CREATE
    this.monsters[spawn][newMonster.uid]=newMonster
    this.players[player.userID].wildMon=null;
    websocket.broadcast.to(player.mapCode).emit('wildMonUpdateMap',{index:monster.uid,spawn:spawn,state:"die",newMon:newMonster});
    websocket.broadcast.to(player.mapCode).emit('OtherPlayerInWildBattle',{playerID:player.userID,inBattle:false,index:monster.uid});
  },
  //##############################################################################################
  //Player Functions
  //##############################################################################################
  playerAction: function(data,websocket){
    var player=websocket.player;
    this.players[player.userID].userX=data.position.x;
    this.players[player.userID].userY=data.position.y;
    this.players[player.userID].userZ=data.position.z;
    this.players[player.userID].userRotX=data.rotation.x;
    this.players[player.userID].userRotY=data.rotation.y;
    this.players[player.userID].userRotZ=data.rotation.z;
    this.players[player.userID].userBodyRotX=data.brotation.x;
    this.players[player.userID].userBodyRotY=data.brotation.y;
    this.players[player.userID].userBodyRotZ=data.brotation.z;
    this.players[player.userID].animStatus=data.state;
    websocket.broadcast.to(player.mapCode).emit('playerAction',{player:this.players[player.userID],type:'movement',state:this.players[player.userID].animStatus});
  },
  playerJoin: function(player,data,websocket){
    //this.players[player.userID]
    this.players[player.userID].userX=data.position.x;
    this.players[player.userID].userY=data.position.y;
    this.players[player.userID].userZ=data.position.z;
    this.players[player.userID].userRotX=data.rotation.x;
    this.players[player.userID].userRotY=data.rotation.y;
    this.players[player.userID].userRotZ=data.rotation.z;
    if(this.haveHost===false){this.players[player.userID].host=true;this.haveHost=true;}
    //---cambiar el mapa en socket
    if(websocket.battleMap)websocket.leave(websocket.battleMap);
    websocket.join(player.mapCode);
    //---enviar datos a todos y recibir datos de todos
    websocket.broadcast.to(player.mapCode).emit('playerJoined', this.players[player.userID]);
    websocket.emit("playerStart",{players:this.players,monsters:this.monsters,npcs:this.npcs,trainerMonsters:this.trainerMonsters});
  
  },
  playerLeft: function(conexion,websocket){
    var player=websocket.player;
    this.players[player.userID].savePlayerDB(conexion);
    if(this.players[player.userID].host===true)this.haveHost=false;
    this.changeHostMap(player,websocket);
    websocket.broadcast.to(player.mapCode).emit('playerExit',this.players[player.userID]);
    //se debe borrar tmb el this.trainerMonsters de este player
    delete this.players[player.userID];
  },
  StartRoom:function(){
    //inicia el bucle que se repetira infinitamente y se enviara a los jugadores
  },
  changeHostMap:function(oldHost,websocket){//oldHost.userID
    var self=this;
    var founded=false;
    Object.keys(self.players).forEach(function(id){
      if(id!==oldHost.userID && self.players[id].host===false && founded===false){
        self.players[id].host=true;
        self.haveHost=true;
        self.players[oldHost.userID].host=false;
        console.log("ahora el nuevo host es: "+self.players[id].user_name);
        websocket.broadcast.to(oldHost.mapCode).emit('changeHost', self.players[id].user_id);
        founded=true;
      }
    });
  },
  //##############################################################################################
  //##############################################################################################
  //##############################################################################################
  //WILD MAP BATTLE FUNCTIONS---------POR MIENTRAS SE CANCELA
  //##############################################################################################
  //##############################################################################################
  //##############################################################################################
  changeWildBattleMap:function(websocket,roomsBattle,monID){
    var player=websocket.player;
    player.battleMap=("Battle"+uuid.v4());
    var wild=this.players[player.userID].wildMon;
    var playerBattle=new plrBattle(this.players[player.userID]);
    var npcBattler= new npcBattle({user_id:wild.monster_id,user_name:null,personaje:null},{1:wild});//obj.info---obj.team
    if(roomsBattle[player.battleMap]==undefined){
      roomsBattle[player.battleMap]=new battleMap(player.mapCode);//creado
      roomsBattle[player.battleMap].addPlayer(playerBattle,player.party);//se agrega a player y establece el host
      roomsBattle[player.battleMap].addWildNPC(player,websocket,npcBattler,npcBattler.user_id);//id,party se agrega npc
    }else {
      roomsBattle[player.battleMap].addPlayer(playerBattle,player.party);//se establece el host
      roomsBattle[player.battleMap].addWildNPC(player,npcBattler,npcBattler.user_id);//id,party
    }
    //monster_id
    this.players[player.userID].inBattle=true;//entra en batalla
    var data={num:this.players[player.userID].wildMon.monster_num,special:this.players[player.userID].wildMon.special,name:this.players[player.userID].wildMon.monstername,level:this.players[player.userID].wildMon.level,ambiente:this.players[player.userID].wildMon.ambiente};
    websocket.emit("battleWildMonInfo",{dataWild:data,inBattle:true});//cambiar dataWild
    websocket.broadcast.to(player.mapCode).emit('OtherPlayerInWildBattle',{playerID:player.userID,inBattle:true,index:monID});

  },
  startWildBattleMap:async function(websocket,conexion,roomsBattle){
    var player=websocket.player;
    roomsBattle[player.battleMap].setPartysNpcs(websocket);
    roomsBattle[player.battleMap].setPartysPlayers(websocket);
    //TEAM
    var teamArr=[];
    var teamResult=await checkerDB.CheckTeam(conexion,player.userID);
    if(teamResult.object===null){
      websocket.emit("error",teamResult.info);
      return
    }
    for(var i=0;i<teamResult.object.length;i++){
      teamArr[i]=CreatorObjects.MonsterBasicInfo(teamResult.object[i]);
    }
    //cambiar de mapa
    websocket.leave(websocket.mapCode);
    if(websocket.battleMap)websocket.join(websocket.battleMap);
    //enviar datos
    websocket.emit("WildBattleStart",{team:teamArr});
    websocket.isWaiting=false;
  },
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
      newMonsterFounded=crearMonsterWild(gMonsters.monster[array[i]].monstername,gMonsters.monster[array[i]],array[i],arrLevel,spawn,gMonsters.monster[array[i]].ambiente);
      return newMonsterFounded;
    }
  }
  foundMonster(array,arrLevel);
  newMonsterFounded=crearMonsterWild(mostLowCatName,mostLowCatMonster,mostLowCatIndex,arrLevel,spawn,gMonsters.monster[mostLowCatIndex].ambiente);
  return newMonsterFounded;
}
function crearMonsterWild(name,monInfo,monsternum,arrLevel,spawn,ambiente){
  var especial=utils.probabilidadShiny();
  //monsterEntity
  //var newMon=new Mon(name,numMon,especial,lvlMonsterMap(arrLevel),false,null,spawn);
  var newMon=new monsterWorldEntity(monsternum,lvlMonsterMap(arrLevel),spawn,ambiente);
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
