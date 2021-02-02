var battleMap = {};
var cls = require("../data/class.js");
var Types = require("./types.js");
var npcEntity = require("./npcWorldEntity.js");
var monsterWorldEntity = require("./monsterWorldEntity.js");
var gMonsters = require("../data/monsters.js");
var gNPCS = require("../data/npcs.js");
var gQuests = require("../data/quests.js"); 
var uuid = require("uuid");
var utils = require("./utils.js");
var _ = require("underscore");
//-------------------------------------
var monsterBattleEntity = require("./monsterBattleEntity.js");
var checkerDB=require("./DBchecker.js");
var actions = require("../data/battleTurnActions.js");
var mapas = require("../data/maps.js");
 
  

battleMap=cls.Class.extend({
  init:function(id,mapName){
    var self = this;
    
    this.id = id;
    this.mapName = mapName;
    this.players = {};//TODOS LOS PARTICIPANTES SOLO TIENE EL TEAM
    this.teamA = {};//objects de hasta 3 participantes
    this.teamB = {};//objects de hasta 3 participantes
    this.fieldA = {};//objects de hasta 3 participantes
    this.fieldB = {};//objects de hasta 3 participantes
    //this.monsters = {};
    //this.players = {};
    this.viewers = {};
    this.arbitros = {};
    this.turno=0;//empieza en el turno cero
    this.weather=null;
    this.ambiente=mapas.battle[id].ambiente;
    this.teams={A:null,B:null};
    this.acumuleActions={};
  },
  //##############################################################################################
  //Add Player Entities
  //##############################################################################################
  AddTeam:function(teamnum,player){//A o B
    var self=this;
    
  },
  
  addPlayer:function(playerObj,party){//A o B
    var self=this;
    //console.log(this.teams);
    if(this.teams.A===null || this.teams.A===party){
      playerObj.battleParty="A";
      this.teams.A=party;
      this.teamA[playerObj.user_id]=playerObj;
      this.fieldA[playerObj.user_id]={};
    }else if(this.teams.B===null || this.teams.B===party){
      playerObj.battleParty="B";
      this.teams.B=party;
      this.teamB[playerObj.user_id]=playerObj;
      this.fieldB[playerObj.user_id]={};
    }
    //DESPUES QUE AGREGA  A UN TEAM
    this.players[playerObj.user_id]=playerObj;
  },
  
  addMonster:function(monObj,party){//A o B
    //monObj.battleParty=A o B
    var fieldID=null;
    var self=this;
    return new Promise((resolve,reject)=>{
      if(this.teams.A===null || this.teams.A===party){
        if(this.fieldA[monObj.owner]!==undefined){
          this.fieldA[monObj.owner]=monObj;
          fieldID=monObj.owner;
        }else{
          this.fieldA[monObj.monster_id]=monObj;
          fieldID=monObj.monster_id;
        }
        if(this.teams.A===null){
          this.teams.A=party;
        }
        monObj.battleParty="A";
      }else if(this.teams.B===null || this.teams.B===party){
        if(this.fieldB[monObj.owner]!==undefined){
          this.fieldB[monObj.owner]=monObj;  
          fieldID=monObj.owner;
        }else{
          this.fieldB[monObj.monster_id]=monObj;
          fieldID=monObj.monster_id;
        }
        if(this.teams.B===null){
          this.teams.B=party;
        }
        monObj.battleParty="B";
      }
      resolve(this["field"+monObj.battleParty][fieldID]);
    });    
  },
  //##############################################################################################
  //Monster Functions
  //##############################################################################################
  monsterAction: function(monsterID,direction){
    var self=this;
    console.log("monster is Actioning ");
  },
  turn:async function(conexion,websocket,data){
    //data.type-data.id
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
        if(monsterResult.object!==null && monsterResult.object!==undefined)newMonsterBattle=new monsterBattleEntity(monsterResult.object[0]);
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
      this.players[websocket.userID].turn=false;
    }
    else if(already===true){
      var result=await actions.newMovement(this.acumuleActions);
    }
  },
  nextTurn: function(playerID,data,websocket){
    //avanza un turno despues de que todos hayan hecho su jugada,
    //verifica todos los estados y 
  },
})
//---------------FIN----------------------
module.exports = battleMap;




























































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