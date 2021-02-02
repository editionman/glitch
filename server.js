//server.js    //server.js //server.js 
//ACA ME QUEDE socket.on('battleWildMonster',(monID)
//startPlayerWildBattle
//LIB
var Utils = require("./lib/utils.js");
var mapas = require("./data/maps.js");
var plrGame = require("./lib/playerWorldEntity.js");
var plrBattle = require("./lib/playerBattleEntity.js");

var worldMap = require("./lib/mapWorld.js");
var battleMap = require("./lib/mapBattle.js");
var roomsGame={};
var roomsBattle={};
  
// where your node app starts
var basicFunctions = require("./basicFunctions.js");
var uuid = require("uuid");

var moves = require("./data/moves.js");
var npcs = require("./data/npcs.js");

//var maps = require("./maps.js");
var items = require("./data/items.js");
var sqlFuncs = require("./mysqlFunctions.js");
var sql=require("./lib/sql.js");

var CreatorObjects=require("./lib/Objects.js");
var creatorDB=require("./lib/DBcreator.js");
var checkerDB=require("./lib/DBchecker.js");

var monGameDB = require("./lib/DBnewMonsterEntity.js");
var monsters = require("./data/monsters.js");
//console.log(npcs);
 
//Prueba de una funcion importada de un archivo--------->console.log(basicFunctions.speak());
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################
// init project##############################################################################################
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################
//const express = require('express');
//const app = express();
const http = require('http').createServer();
var io = require('socket.io')(http,{
  cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    transports: ['websocket']
});
var mysql=require('mysql');
//DATOS INGAME
var allplayers={};
var maxPlayers=50;
//var mapas=[];
var gameState={
  maps:{},
	players: {},
	horario:'day',
	//snow-rain-sunny
	clima: 'sunny'
};
 
var tiempo={
	hora: null,
	minuto: null,
	segundo: null
};
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################
// init project##############################################################################################
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################
//OBJETOS INGAME
function PlayerServer(id,userID,mapCode){
	this.id=id;
	this.userID=userID;
	this.mapCode=mapCode;
  this.teamMonsters={};
}


function itemInfo(itemID,item_num,item_name,item_type,user_owner){
	this.itemID=itemID;
	this.item_num=item_num;
	this.item_name=item_name;
  this.item_type=item_type;
  this.user_owner=user_owner;
}


//ESTABLECER CONEXION
//createConnection
var conexion = mysql.createPool({//createConnection
  //https://remotemysql.com/
  connectionLimit : maxPlayers,
  host: 'remotemysql.com',//localhost//https://eg.sytes.net//Remote SQL=remotemysql.com
  user: '0GmXfVfhCq',//localhost=projectpkm//eg.sytes.net=administradorpkm//Remote SQL=ZeTYHTj33E
  password: 's82moZSDa8',//administradorpkmr4gt0j//Remote SQL=Z0J8yoATWw
  database: '0GmXfVfhCq',//project_pokemon//Remote SQL=ZeTYHTj33E
  debug: false,
  multipleStatements: true
});
conexion.on('end',function(){
  conexion.release();
})
//test.changeMap(2,conexion);
//console.log(test);
function keepalive() {
    conexion.query('select 1', [], function(err, result) {
        if(err) return console.log(err);    
        console.log('Successful keepalive.');
    });
}
setInterval(keepalive,60000);



// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
io.sockets.on('connection', function(socket){
  var socketGlobal=socket;
  var id=socket.id;
  socketGlobal.logged=false;
  socketGlobal.isWaiting=false;
  //##############################################################################################
  //En escena INGRESO
  //##############################################################################################
  socket.on('userLogin',(data)=>{
    if(ValueIsString(data.user) && ValueIsString(data.pass)){
      //"usuario correcto para ingresar");
      if(Object.keys(allplayers).length<maxPlayers && socketGlobal.logged===false){
        socketGlobal.logged=true;
        LoginSQL(conexion,data,id,socketGlobal);
      }else socket.emit('serverFull',"Servidor Lleno, debes esperar que alguien salga o puedes donar para ingresar directamente");
    }
    else{
      var infoLog="Ingrese un usuario y password válidos";
			socket.emit("loginInfo",infoLog);
    }
  });
  socket.on('userRegister',(data)=>{
    if(ValueIsString(data.user) && ValueIsString(data.pass) && ValueIsString(data.email)){
      //usuario correcto para registrar");
      RegisterSQL(conexion,data,id,socketGlobal);
    }
    else{
      var infoReg="Ingrese un usuario, email y password válidos";
			socket.emit("registerInfo",infoReg);
    }
  });
  //##############################################################################################
  //En escena CrearPlayer
  //##############################################################################################
  socket.on('crearPlayer',(data)=>{
    if(socketGlobal.isWaiting===false){
      socketGlobal.isWaiting=true;
      createTrainerMonsterStarter(conexion,data,socketGlobal);  
    }
	});
  //##############################################################################################
  //En escena GLOBAL
  //##############################################################################################
  socket.on('playerJoin',(data)=>{
		startPlayer(data,id,socketGlobal);
	});
  socket.on('newMsg',(data)=>{
      var userN = roomsGame[socketGlobal.mapCode].players[socketGlobal.userID].username;
      var msg = data.msg;
      var date=new Date();
      var fecha={
        hora:date.getHours(),
        minuto:date.getMinutes(),
        dia: basicFunctions.NameDay(date.getDay())
      } 
      socketGlobal.broadcast.to(socketGlobal.mapCode).emit('newMsg', {sender:userN,nivel:roomsGame[socketGlobal.mapCode].players[socketGlobal.userID].categoria,msg:msg,date:fecha});
      socket.emit('newMsg', {sender:userN,nivel:roomsGame[socketGlobal.mapCode].players[socketGlobal.userID].categoria,msg:msg,date:fecha});

	});
  socket.on('action',(data)=>{
    if(data.type=="movement"){
      roomsGame[socketGlobal.mapCode].playerAction(socketGlobal.userID,data,socketGlobal);
    }
	});
  socket.on('teamMonsters',(data)=>{
    var ap=roomsGame[socketGlobal.mapCode].players[socketGlobal.userID];
    if(socketGlobal.isWaiting===false){
      TeamMonsterServer(socketGlobal,id,conexion,ap);
      socketGlobal.isWaiting=true;
    }
	});
  socket.on('monsters',(data)=>{
    if(allplayers[id]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      var ap=roomsGame[socketGlobal.mapCode].players[socketGlobal.userID];
      if(socketGlobal.isWaiting===false){
        AllMonsterServer(socketGlobal,id,conexion,ap);
        socketGlobal.isWaiting=true;
      }
    }
	});
  socket.on('monsterProfile',(data)=>{//data=monID
    if(allplayers[id]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      var ap=roomsGame[socketGlobal.mapCode].players[socketGlobal.userID];
      MonsterProfileServer(socketGlobal,id,conexion,ap,data);
    }
	});
  socket.on('bag',(data)=>{
    if(allplayers[id]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      var ap=roomsGame[socketGlobal.mapCode].players[socketGlobal.userID];
      if(socketGlobal.isWaiting===false){
        bagServer(socketGlobal,id,conexion,ap);
        socketGlobal.isWaiting=true;
      }
    }
	});
  socket.on('evolveMonster',(data)=>{
    if(allplayers[id]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      var ap=roomsGame[socketGlobal.mapCode].players[socketGlobal.userID];
      evolveServer(socketGlobal,id,conexion,ap,data.monid);
    }
	});
  socket.on('evolveMonsterStart',(data)=>{
    if(allplayers[id]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      var ap=roomsGame[socketGlobal.mapCode].players[socketGlobal.userID];
      evolveServerStart(socketGlobal,id,conexion,ap,data.monid,data.monnum);
    }
	});
  socket.on('wildMonsterSelect',(data)=>{
    if(allplayers[id]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      roomsGame[socketGlobal.mapCode].monsterSelectBattle(data,socketGlobal);
    }
	});
  socket.on('battleWildMonster',(monID)=>{
    socketGlobal.battleMap=("Battle"+uuid.v4());
    socketGlobal.leave(socketGlobal.mapCode);
    socketGlobal.join(socketGlobal.battleMap);
    var playerBattle=new plrBattle(roomsGame[socketGlobal.mapCode].players[socketGlobal.userID]);
    if(roomsBattle[socketGlobal.battleMap]==undefined){
      roomsBattle[socketGlobal.battleMap]=new battleMap(socketGlobal.mapCode);//creado
      //roomsBattle[socketGlobal.battleMap].teamA[socketGlobal.userID]=playerBattle;
      roomsBattle[socketGlobal.battleMap].addPlayer(playerBattle,socketGlobal.party);
    }
    else roomsBattle[socketGlobal.battleMap].addPlayer(playerBattle,socketGlobal.party);
    roomsGame[socketGlobal.mapCode].monsterStartBattle(monID,socketGlobal);//envia a todos los del mapa que este usuario entro en batalla con el wild
	});
  socket.on('battleTurnAction',(data)=>{
    //data.type--data.id
    //movement,monster,item,run----num or idbag)
    var team=roomsBattle[socketGlobal.battleMap].players[socketGlobal.userID].team;
    if(roomsBattle[socketGlobal.battleMap].players[socketGlobal.userID].turn===true){
      //roomsBattle[socketGlobal.battleMap].players[socketGlobal.userID].turn=false;
      if(data.type==="run")roomsGame[socketGlobal.mapCode].monsterRunBattle(socketGlobal);
      else roomsBattle[socketGlobal.battleMap].turn(conexion,socketGlobal,data);//id,team,data
    }
  });
  socket.on('cancelBattleWildMonster',(monID)=>{//se cancela la batalla antes de cambiar mapa
    roomsGame[socketGlobal.mapCode].monsterCancelBattle(socketGlobal);
	});
  socket.on('runBattleWildMonster',(monID)=>{//se cancela la batalla despues de cambiar mapa
    roomsGame[socketGlobal.mapCode].monsterRunBattle(socketGlobal);
	});
  //##############################################################################################
  //En escena NPC
  //##############################################################################################
  socket.on('npcSelect',(data)=>{
    roomsGame[socketGlobal.mapCode].NPCDialog(conexion,socketGlobal,data.npcID,data.guid);
	});
  //##############################################################################################
  //En escena WILDBATTLE
  //##############################################################################################
  socket.on('playerJoinWildBattle',(data)=>{
    if(allplayers[id]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      startPlayerWildBattle(data,socketGlobal,id,conexion);
    }
	});
  socket.on('WildBattleStatus',(data)=>{
    FinishPlayerWildBattle(socket,data.status,conexion);
  });  
  //##############################################################################################
  //En DESCONEXION
  //##############################################################################################
  socket.on('disconnect',()=>{
    //"user disconnected");
    if(allplayers[id]!=undefined){
      roomsGame[socketGlobal.mapCode].monsterCancelBattle(socketGlobal);
      roomsGame[socketGlobal.mapCode].playerLeft(conexion,socketGlobal);
		}
  });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});


















































 

//########################################
//########################################
//##FUNCIONES SQL PARA TODO EL SERVIDOR###
//########################################
//########################################

//##############################################################
//##############################################################
//########################ESCENA Ingreso########################
//##############################################################
//##############################################################
//###############################
//Login con base de datos
//###############################
async function LoginSQL(conexion,data,SockID,socketGlobal){
  const result=await checkerDB.checkLogin(conexion,data);
  if(result.object===null){
    socketGlobal.emit("loginInfo",result.info);
    socketGlobal.logged=false;
    return
  }
  var user=result.object[0];
  var userGame=new plrGame(user);
  allplayers[SockID]=new PlayerServer(SockID,userGame.user_id,userGame.mapCode);
  socketGlobal.mapCode=userGame.mapCode;
  socketGlobal.userID=userGame.user_id;
  socketGlobal.username=userGame.user_name;
  socketGlobal.battleMap=null;
  socketGlobal.party=userGame.user_id;
  socketGlobal.wildMonster=null;
  
  socketGlobal.join(userGame.mapCode);
  if(roomsGame[socketGlobal.mapCode]==undefined){//No existe mapa
    roomsGame[socketGlobal.mapCode]=new worldMap(socketGlobal.mapCode);//creado
    roomsGame[socketGlobal.mapCode].createMonsters();//CREATE MONSTERS
    roomsGame[socketGlobal.mapCode].createNPCS();//CREATE NPCS
    roomsGame[socketGlobal.mapCode].players[socketGlobal.userID]=userGame;//PONIENDO AL  PLAYER EN MAPA
  }else roomsGame[socketGlobal.mapCode].players[socketGlobal.userID]=userGame;//PONIENDO AL PLAYER EN MAPA EXISTENTE
  socketGlobal.emit("loginSuccess",userGame);
  socketGlobal.logged=false;
}
//###############################
//Register con base de datos
//###############################
async function RegisterSQL(conexion,data,SockID,socketGlobal){
  const result=await creatorDB.registerSQL(conexion,data,SockID,socketGlobal);
  if(result.object===null){
    socketGlobal.emit("registerInfo",result.info);
    socketGlobal.logged=false;
    return
  }
  socketGlobal.emit(result.object,result.info);
  socketGlobal.logged=false;
}
//##############################################################
//##############################################################
//####################ESCENA CREAR TRAINER######################
//##############################################################
//##############################################################
async function createTrainerMonsterStarter(conexion,data,socketGlobal){
  var starters={0:undefined,1:"Bulbasaur",4:"Charmander",7:"Squirtle"};//DISPONIBLES PARA EMPEZAR EL VIAJE
  var trainers={0:undefined,1:"Tilo",2:"Lillie"};                      //DISPONIBLES PARA EMPEZAR EL VIAJE
  var trainerNum=data.personaje;
  var monsterNum=data.starter;
  var plr=roomsGame[socketGlobal.mapCode].players[socketGlobal.userID];
  var existTeam=Utils.getTeamPosition(plr.team);//regresa del 1 al 6 si hay slot vacio sino si esta lleno regresa null
  //verificar monster y trainer
  if(trainers[trainerNum]===undefined && starters[monsterNum]===undefined){
    socketGlobal.emit("crearPlayerInfo","Error el trainer que seleccionaste o el pokemon elegido no existen");
    socketGlobal.isWaiting=false;
    return;
  }
  //verificar si no tiene personaje y no tiene ningun pokemon en team
  if(plr.personaje===0 && (existTeam===null || existTeam>1)){
    socketGlobal.emit("crearPlayerInfo","Error este trainer ya no debe estar aca.");
    socketGlobal.isWaiting=false;
    return;
  }
  var newmon=newmon=new monGameDB(monsterNum,socketGlobal.userID);
  var result=await creatorDB.CreateStarterTrainer(conexion,trainerNum,newmon,plr);
  if(result.object===null){
    socketGlobal.emit("crearPlayerInfo",result.info);
    socketGlobal.isWaiting=false;
    return
  }
  socketGlobal.emit(result.object,{info:result.info,updatePlayer:roomsGame[socketGlobal.mapCode].players[socketGlobal.userID]});
  socketGlobal.isWaiting=false;
}
//##############################################################
//##############################################################
//#########################ESCENA GLOBAL########################
//##############################################################
//##############################################################
async function TeamMonsterServer(socketGlobal,SockID,conexion,arrayPlayer){
  var teamArr=[];
  var result=await checkerDB.CheckTeam(conexion,socketGlobal.userID);
  if(result.object===null){
    socketGlobal.emit("error",result.info);
    socketGlobal.isWaiting=false;
    return
  }
  for(var i=0;i<result.object.length;i++){
    teamArr[i]=CreatorObjects.MonsterBasicInfo(result.object[i]);
  }
  socketGlobal.emit("teamMonsters",teamArr);
  socketGlobal.isWaiting=false;
}

async function AllMonsterServer(socketGlobal,id,conexion,arrayPlayer){
  var monstersArr=[];
  var result=await checkerDB.CheckAllMonsters(conexion,socketGlobal.userID);
  if(result.object===null){
    socketGlobal.emit("error",result.info);
    socketGlobal.isWaiting=false;
    return
  }
  for(var i=0;i<result.object.length;i++){
    monstersArr[i]=CreatorObjects.MonsterBasicInfo(result.object[i]);
  }
  socketGlobal.emit("monsters",monstersArr);
  socketGlobal.isWaiting=false;
}

async function MonsterProfileServer(socketGlobal,id,conexion,arrayPlayer,monID){
  var monArr=[];
  var result=await checkerDB.CheckProfileMonster(conexion,socketGlobal.userID,monID)
  if(result.object===null){
    socketGlobal.emit("error",result.info);
    socketGlobal.isWaiting=false;
    return
  }
  monArr[0]=CreatorObjects.MonsterInfo(result.object[0]);
  socketGlobal.emit("monsterProfile",monArr);
  socketGlobal.isWaiting=false;
}

async function bagServer(socketGlobal,id,conexion,arrayPlayer){
  var itemArr=[];
  var result=await checkerDB.checkBagGlobal(conexion,socketGlobal.userID);
  if(result.object===null){
    socketGlobal.emit("error",result.info);
    socketGlobal.isWaiting=false;
    return
  }
  for(var i=0;i<result.object.length;i++){
    itemArr[i]=CreatorObjects.itemInfo(result.object[i]);
  }
  socketGlobal.emit("bag",itemArr);
  socketGlobal.isWaiting=false;
}

function evolveServer(socketGlobal,id,conexion,arrayPlayer,monsterid){
  var itemArr=[];
	var sqlMon = "SELECT * FROM monsters WHERE monster_id = '"+monsterid+"' AND user_current_owner ='"+arrayPlayer.userID+"'";
  conexion.query(sqlMon, function (err, result) {
		if(result!=undefined){
      var res=monsters.monster(result[0].monster_num);
      socketGlobal.emit("evolveInfo",{evo:res.evo,id:monsterid,special:result[0].special,num:result[0].monster_num,evolved:false});
		}
		else{
      var error="No se encontro monsterEvo contacta con un ADMINISTRADOR";
			socketGlobal.emit("evolveError",error);
		}
    //socketGlobal.emit("bag",itemArr);
	});
}
function evolveServerStart(socketGlobal,id,conexion,arrayPlayer,monsterid,monsternum){
  var itemArr=[];
  var itemReq="SELECT * FROM items WHERE item_num = '"+monsters.monster(monsternum).evo.object+"' AND user_owner ='"+arrayPlayer.userID+"'";
	var sqlMon = "SELECT * FROM monsters WHERE monster_id = '"+monsterid+"' AND user_current_owner ='"+arrayPlayer.userID+"';";
  sqlMon+=(monsters.monster(monsternum).evo.object>0)?itemReq:"";
  conexion.query(sqlMon, function (err, result) {
		if(result!=undefined || result[0][0]!=undefined && result[1][0]!=undefined){
      var resMon=(result.length>1)?monsters.monster(result[0][0].monster_num):monsters.monster(result[0].monster_num);
      var resHabilidad=(result.length>1)?result[0][0].habilidad:result[0].habilidad;
      var resSpecial=(result.length>1)?result[0][0].special:result[0].special;
      var resNivel=(result.length>1)?nivelMonster(result[0][0].exp):nivelMonster(result[0].exp);
      var resItem=(result.length>1 && result[1].length>0)?result[1][0]:null;
      var resEvo=monsters.monster(resMon.evo.in);//trae todos los datos del monster al que evoluciona
      var itemUpd=(resItem!==null)?"UPDATE items SET item_qty = '"+(resItem.item_qty-1)+"' WHERE item_id ='"+resItem.item_id+"'":"";
      var itemDel=(resItem!==null)?"DELETE FROM items WHERE item_id='"+resItem.item_id+"'":"";
      var sqlMonEvo = (resNivel>=resMon.evo.nivel && resMon.evo.object===0 || resNivel>=resMon.evo.nivel && resItem!==null)?"UPDATE monsters SET monster_num='"+resMon.evo.in+"',monster_name='"+resEvo.monstername+"',type_1='"+resEvo.type_1+"',type_2='"+resEvo.type_2+"',habilidad='"+monsters.changeHabilidad(resHabilidad,resEvo.habilidades)+"'"+" WHERE monster_id ='"+monsterid+"';":"";
      sqlMonEvo+=(resItem!==null && (resItem.item_qty-1)>0)?itemUpd:itemDel;
      conexion.query(sqlMonEvo, function (err, result) {
        if(result!=undefined && resNivel>=resMon.evo.nivel){
          socketGlobal.emit("evolveInfo",{special:resSpecial,num:resMon.evo.in,evolved:true});
        }
        else{
          var error="No se pudo evolucionar al monster. Verifica que cumples con los requerimientos o contacta a un ADMINISTRADOR";
			    socketGlobal.emit("evolveError",error);
        }
      });
      
		}
		else{
      var error="No se puede evolucionar este monster. Verifica que cumples con los requerimientos.";
			socketGlobal.emit("evolveError",error);
		}
	});
}


function wildMonsterServer(socketGlobal,id,conexion,arrayPlayer,index,map){//--Ya no sirve reemplazado!
  var mon=0;
  var indx=0;
  var stringspawn="";
  //console.log("This monster is for battle: "+index);
    Object.keys(map.spawnMonsters).forEach((spawns)=>{
      if(map.spawnMonsters[spawns].monsters[index]===undefined){
        mon=false;//NO EXISTE MONSTER EN EL MAPA DEL PLAYER
      }
      else{
        //return true;//SI EXISTE MONSTER EN EL MAPA DEL PLAYER
        if(map.spawnMonsters[spawns].monsters[index].rival!==null)mon=false;//existe pero ya tiene rival
        else{
          mon=map.spawnMonsters[spawns].monsters[index];
          indx=index;
          stringspawn=spawns.toString();
        }
      }
    });
  if(mon===false || mon===0)console.log("No se encontró monster en el mapa o ya tiene rival");
  else{
    socketGlobal.wildMonster=mon;
    socketGlobal.wildMonster.index=indx;
    socketGlobal.wildMonster.spawn=stringspawn;
    socketGlobal.wildMonster.rival=arrayPlayer.username;
    var dataUser={special:mon.especial,num:mon.monid,name:mon.name,level:mon.level,index:index};
    var dataAll={index:index,state:"ocupado",x:arrayPlayer.userX,y:arrayPlayer.userY,z:arrayPlayer.userZ};
    socketGlobal.emit("wildMonInfo",dataUser);
    socketGlobal.broadcast.to(socketGlobal.mapCode).emit('wildMonUpdateMap',dataAll);
    
    //roomsGame[socketGlobal.mapCode].playerAction(socketGlobal.userID,data,socketGlobal)
  }
}


function battleWildMonsterServer(socketGlobal,id,conexion,arrayPlayer,index){//--Ya no sirve reemplazado!
  //console.log(socketGlobal.wildMonster.rival);
  if(socketGlobal.wildMonster===null);//No estas en contacto con ningun monster
  if(socketGlobal.wildMonster.rival!==arrayPlayer.username);//no eres el rival
  if(socketGlobal.wildMonster.rival===arrayPlayer.username){
    //socketGlobal.enemys.push(socketGlobal.wildMonster.index);
    var data={num:socketGlobal.wildMonster.monid,special:socketGlobal.wildMonster.especial,name:socketGlobal.wildMonster.name,level:socketGlobal.wildMonster.level};
    socketGlobal.emit("battleWildMonInfo",{dataWild:data,inBattle:true});//cambiar dataWild
    socketGlobal.broadcast.to(socketGlobal.mapCode).emit('OtherPlayerInWildBattle',{playerID:socketGlobal.userID,inBattle:true,index:index});
  }
}

function WildMonsterBattleOff(socketGlobal,ap){//--Ya no sirve reemplazado!
  if(socketGlobal.wildMonster===null)return;//no hay monster
  else{
    socketGlobal.wildMonster.rival=null;
    socketGlobal.wildMonster.inBattle=false;
    var dataAll={index:socketGlobal.wildMonster.index,state:"libre",x:ap.userX,y:ap.userY,z:ap.userZ};
    socketGlobal.broadcast.to(socketGlobal.mapCode).emit('wildMonUpdateMap',dataAll);
  }
}
//##############################################################
//##############################################################
//####################ESCENA WILDBATTLEMONSTER##################
//##############################################################
//##############################################################
async function startPlayerWildBattle(data,socketGlobal,id,conexion){
  roomsGame[socketGlobal.mapCode].players[socketGlobal.userID].inBattle=true;//entra en batalla
  var teamArr=[];
  var monWild=roomsGame[socketGlobal.mapCode].players[socketGlobal.userID].wildMon;
  var monid=monWild.monid;
  var monParty=uuid.v4();
  var wildResult=await roomsBattle[socketGlobal.battleMap].addMonster(monWild,monParty);
  var teamResult=await checkerDB.CheckTeam(conexion,socketGlobal.userID);
  if(teamResult.object===null){
    socketGlobal.emit("error",teamResult.info);
    socketGlobal.isWaiting=false;
    return
  }
  for(var i=0;i<teamResult.object.length;i++){
    teamArr[i]=CreatorObjects.MonsterBasicInfo(teamResult.object[i]);
  }
  //socketGlobal.emit("WildBattleStart",{team:teamArr,wild:monWild});
  socketGlobal.emit("WildBattleStart",{team:teamArr,wild:wildResult});
  socketGlobal.isWaiting=false;
}

function FinishPlayerWildBattle(socketGlobal,status,conexion){
  var monWild=roomsGame[socketGlobal.mapCode].players[socketGlobal.userID].wildMon;
  //if(monWild===null){return;}//no hay monster
  //if(monWild.currHealth>0){return;}//no esta muerto
  console.log(status);
  console.log(monWild===null);
  console.log(monWild.currHealth);
  if(status="Wild_Die"){
    var exp=1;
    //destruir al pokemon salvaje-------------
    roomsGame[socketGlobal.mapCode].monsterMapDefeat(socketGlobal);
    //dar exp al pokemon player---------------
    sqlFuncs.GiveExpMonSQL(socketGlobal,conexion,exp)//.then((result)=>{});
    socketGlobal.monBattleID=null;
    //cambiar de mapa para regresar-----------
    roomsGame[socketGlobal.mapCode].players[socketGlobal.userID].inBattle=false;
    socketGlobal.emit("WildBattleEnd",{map:socketGlobal.mapCode,exp:exp,inBattle:roomsGame[socketGlobal.mapCode].players[socketGlobal.userID].inBattle,players:roomsGame[socketGlobal.mapCode].players,monsters:roomsGame[socketGlobal.mapCode].monsters,player:roomsGame[socketGlobal.mapCode].players[socketGlobal.userID]});
    
  }
  
}
//##############################################################
//##############################################################
//####################FUNCIONES GLOBAL##########################
//##############################################################
//##############################################################
//########################################
//########################################
//FUNCIONES GLOBALES PARA TODO EL SERVIDOR
//########################################
//########################################
function startPlayer(data,id,socketGlobal){
  roomsGame[socketGlobal.mapCode].playerJoin(socketGlobal.userID,data,socketGlobal);
}

function ValueIsString(variable){
	if(typeof variable === 'string'){
		if(variable.indexOf(" ")>=0 || variable.indexOf("'")>=0 || variable.indexOf("/'")>=0 || variable.indexOf("\\")>=0  || variable.indexOf("/")>=0 || variable.length<=0){
			return false;
		}
		else{
			return true;
		}
	}
	else{
		return false;
	} 
}
function nivelMonster(exp){
    if(exp===0){
        return 1;
    }
    else{return Math.round(Math.sqrt(exp));}
}
//Desconectar player en room
function DeletePlayerInRoom(user){
	Object.keys(allplayers).forEach((id)=>{
		if(allplayers[id].userID==user.userID){
			delete allplayers[id];
		}
	});
}
//setInterval(function(){console.log(Object.keys(gameState.players).length);},3000);
//Object.keys(objeto).length)--------------------------->longitud de un object
//gameState.players[0]==players.userID
//players.id=socket id
//######################################
//######################################
//ATRIBUTOS DE MONSTERS
//######################################
//##########################

