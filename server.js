//server.js    //server.js //server.js 
//ACA ME QUEDE socket.on('battleWildMonster',(monID)
//startPlayerWildBattle
//LIB
var Utils = require("./lib/utils.js");
var mapas = require("./data/maps.js");
var plrGame = require("./lib/WorldEntityPlayer.js");
var plrBattle = require("./lib/BattleEntityPlayer.js");
var npcBattle = require("./lib/BattleEntityNpc.js");

var worldMap = require("./lib/mapWorld.js");
var battleMap = require("./lib/mapBattle.js");
var roomsGame={};
var roomsBattle={};
   
// where your node app starts
var basicFunctions = require("./basicFunctions.js");
var timeServerEntity = require("./data/timeWorld.js");
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
 
var timeServer=new timeServerEntity();
//setInterval(()=>{console.log(timeServer.current.segundo)},1000);
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################
// init project##############################################################################################
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################


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


//el connection sucede en cada uno de los users individuales
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
io.sockets.on('connection', function(socket){
  var socketPlayer=socket;
  var id=socket.id;
  socketPlayer.isWaiting=false;
  //##############################################################################################
  //En escena INGRESO
  //##############################################################################################
  socket.on('userLogin',(data)=>{
    if(ValueIsString(data.user) && ValueIsString(data.pass)){
      if(Object.keys(allplayers).length<maxPlayers && socketPlayer.isWaiting===false){
        socketPlayer.isWaiting=true;
        LoginSQL(conexion,data,id,socketPlayer);
      }else if(Object.keys(allplayers).length>maxPlayers){
        socket.emit('serverFull',"Servidor Lleno, debes esperar que alguien salga o puedes donar para ingresar directamente");
      }
    }
    else{
      //Ingrese un usuario y password válidos
      var infoLog="Please enter a user and password valids, no use specials characters";
			socket.emit("loginInfo",infoLog);
    }
  });
  socket.on('userRegister',(data)=>{
    if(ValueIsString(data.user) && ValueIsString(data.pass) && ValueIsString(data.email)){
      if(socketPlayer.isWaiting===false){
        socketPlayer.isWaiting=true;
        RegisterSQL(conexion,data,socketPlayer);
      }
    }else{
      //Ingrese un usuario, email y password válidos
      var infoReg="Please enter a user, email and password valids, no use specials characters";
			socket.emit("registerInfo",infoReg);
    }
  });
  //##############################################################################################
  //En escena CrearPlayer
  //##############################################################################################
  socket.on('crearPlayer',(data)=>{
    if(socketPlayer.isWaiting===false){
      socketPlayer.isWaiting=true;
      createTrainerMonsterStarter(conexion,data,socketPlayer,id);  
    }
	});
  //##############################################################################################
  //En escena GLOBAL
  //##############################################################################################
  socket.on('playerJoin',(data)=>{
		startPlayer(data,id,socketPlayer);
	});
  socket.on('newMsg',(data)=>{
      var userN = roomsGame[socketPlayer.player.mapCode].players[socketPlayer.player.userID].user_name;
      var catLevel=roomsGame[socketPlayer.player.mapCode].players[socketPlayer.player.userID].categoria; 
      var msg = data.msg;
      var date=new Date();
      var fecha={
        hora:date.getHours(),
        minuto:date.getMinutes(),
        dia: basicFunctions.NameDay(date.getDay())
      } 
      socketPlayer.broadcast.to(socketPlayer.player.mapCode).emit('newMsg', {sender:userN,nivel:catLevel,msg:msg,date:fecha});
      socket.emit('newMsg', {sender:userN,nivel:catLevel,msg:msg,date:fecha});

	});
  //ACTIONS-
  socket.on('action',(data)=>{
    if(data.type=="movement"){
      if(socketPlayer.player)roomsGame[socketPlayer.player.mapCode].playerAction(data,socketPlayer);
    }
	});
  socket.on('wildaction',(data)=>{
    if(data.type=="movement"){
      roomsGame[socketPlayer.player.mapCode].wildMonsterAction(data,socketPlayer);
    }
	});
  socket.on('trainerMonsterAction',(data)=>{
    if(data.type=="movement"){
      roomsGame[socketPlayer.player.mapCode].trainerMonsterAction(data,socketPlayer);
    }
	});
  socket.on('moveAction',(data)=>{
    if(data.type=="movement"){
      roomsGame[socketPlayer.player.mapCode].moveAction(data,socketPlayer);
    }
	});
  //
  socket.on('moveContact',(data)=>{
    roomsGame[socketPlayer.player.mapCode].moveContact(data,socketPlayer);
	});
  socket.on('chooseMonster',(data)=>{
    var ap=roomsGame[socketPlayer.player.mapCode].players[socketPlayer.player.userID];
    roomsGame[socketPlayer.player.mapCode].createMonsterBattle(socketPlayer,conexion,data);
	});
  socket.on('teamMonsters',(data)=>{
    var player=socketPlayer.player;
    var ap=roomsGame[player.mapCode].players[player.userID];
    if(socketPlayer.isWaiting===false){
      socketPlayer.isWaiting=true;
      TeamMonsterServer(socketPlayer,id,conexion,ap);
    }
	});
  socket.on('monsters',(data)=>{
    if(allplayers[socketPlayer.player.userID]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      var ap=roomsGame[socketPlayer.player.mapCode].players[socketPlayer.player.userID];
      if(socketPlayer.isWaiting===false){
        socketPlayer.isWaiting=true;
        AllMonsterServer(socketPlayer,id,conexion,ap,socketPlayer.isWaiting);
      }
    }
	});
  socket.on('monsterProfile',(data)=>{//data=monID
    if(allplayers[socketPlayer.player.userID]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      var ap=roomsGame[socketPlayer.player.mapCode].players[socketPlayer.player.userID];
      MonsterProfileServer(socketPlayer,id,conexion,ap,data);
    }
	});
  socket.on('bag',(data)=>{
    if(allplayers[socketPlayer.player.userID]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      var ap=roomsGame[socketPlayer.player.mapCode].players[socketPlayer.player.userID];
      if(socketPlayer.isWaiting===false){
        socketPlayer.isWaiting=true;
        bagServer(socketPlayer,id,conexion,ap,socketPlayer.isWaiting);
      }
    }
	});
  socket.on('evolveMonster',(data)=>{
    if(allplayers[socketPlayer.player.userID]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      var ap=roomsGame[socketPlayer.player.mapCode].players[socketPlayer.player.userID];
      evolveServer(socketPlayer,id,conexion,ap,data.monid);
    }
	});
  socket.on('evolveMonsterStart',(data)=>{
    var ap=roomsGame[socketPlayer.player.mapCode].players[socketPlayer.player.userID];
    evolveServerStart(socketPlayer,id,conexion,ap,data.monid,data.monnum);
	});
  socket.on('wildMonsterSelect',(data)=>{
    roomsGame[socketPlayer.player.mapCode].monsterSelectBattle(data,socketPlayer.player,socketPlayer);
	});
  socket.on('battleWildMonster',(monID)=>{//ACA SE ENVIA LA DATA PARA CAMBIAR BATALLA 
    roomsGame[socketPlayer.player.mapCode].changeWildBattleMap(socketPlayer,roomsBattle,monID);
	});
  socket.on('battleTurnAction',(data)=>{
    //data.type--data.id
    //movement,monster,item,run----num or idbag)
    var player=socketPlayer.player;
    var team=roomsBattle[player.battleMap].players[player.userID].team;
    if(data.type==="run")roomsGame[player.mapCode].monsterRunBattle(socketPlayer);//temporal por que run debe ser efectivo solo si tiene turno
    if(roomsBattle[player.battleMap].players[player.userID].turno===true){
      //roomsBattle[player.battleMap].players[player.userID].turn=false;
      //if(data.type==="run")roomsGame[player.mapCode].monsterRunBattle(socketPlayer);
      roomsBattle[player.battleMap].turnoActionPlayer(conexion,socketPlayer,data);//id,team,data
    }
  });
  socket.on('cancelBattleWildMonster',(monID)=>{//se cancela la batalla antes de cambiar mapa
    roomsGame[socketPlayer.player.mapCode].monsterCancelBattle(socketPlayer);
	});
  socket.on('runBattleWildMonster',(monID)=>{//se cancela la batalla despues de cambiar mapa
    roomsGame[socketPlayer.player.mapCode].monsterRunBattle(socketPlayer);
    //roomsBattle[player.nextMap].changeWorldMap(player,socketPlayer);
	});
  //##############################################################################################
  //En escena NPC
  //##############################################################################################
  socket.on('npcSelect',(data)=>{
    roomsGame[socketPlayer.player.mapCode].NPCDialog(conexion,socketPlayer,data.npcID,data.guid);
	});
  //##############################################################################################
  //En escena WILDBATTLE
  //##############################################################################################
  socket.on('playerJoinWildBattle',(data)=>{
    startPlayerWildBattle(data,socketPlayer,id,conexion);
	});
  socket.on('startedWildBattle',(data)=>{
    roomsBattle[socketPlayer.player.battleMap].allNpcsAction(socketPlayer);
	});
  socket.on('WildBattleStatus',(data)=>{
    FinishPlayerWildBattle(socket,id,data.status,conexion);
  });
  //##############################################################################################
  //En escena GLOBAL Batalla
  //##############################################################################################
  socket.on('SendAtk',(data)=>{//data.id,coldown,lastTime
    if(socketPlayer.player)roomsGame[socketPlayer.player.mapCode].createAtkMonster(socketPlayer,data);
	});
  //##############################################################################################
  //En DESCONEXION
  //##############################################################################################
  socket.on('disconnect',()=>{
    DisconnectPlayer(socketPlayer,conexion);
  });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});
//---------------------------TERMINO LAS FUNCIONES DE SOCKET RECIBIDOS
function DisconnectPlayer(websocket,conexion){
  //"user disconnected");
    if(websocket.player!==undefined && allplayers[websocket.player.userID]!=undefined){
      //var player=allplayers[id];
      var player=websocket.player;
      roomsGame[player.mapCode].monsterCancelBattle(websocket);
      roomsGame[player.mapCode].playerLeft(conexion,websocket);
      delete allplayers[websocket.player.userID];
		}
}















































 

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
    setTimeout(function(){socketGlobal.isWaiting=false;},1000);
    return
  }
  var user=result.object[0];
  var userGame=new plrGame(user);
  if(allplayers[userGame.user_id]!==undefined){
    socketGlobal.emit("loginInfo","ESTE USUARIO YA ESTA JUGANDO");
    setTimeout(function(){socketGlobal.isWaiting=false;},1000);
    return
  }
  allplayers[userGame.user_id]=CreatorObjects.PlayerServer(userGame,SockID);
  //allplayers[SockID]=CreatorObjects.PlayerServer(userGame);
  socketGlobal.player=allplayers[userGame.user_id];
  var player=socketGlobal.player;
  if(roomsGame[player.mapCode]==undefined){//No existe mapa
    roomsGame[player.mapCode]=new worldMap(player.mapCode,timeServer);//creado
    roomsGame[player.mapCode].createMonsters();//CREATE MONSTERS
    roomsGame[player.mapCode].createNPCS();//CREATE NPCS
    roomsGame[player.mapCode].players[player.userID]=userGame;//PONIENDO AL  PLAYER EN MAPA
  }else roomsGame[player.mapCode].players[player.userID]=userGame;//PONIENDO AL PLAYER EN MAPA EXISTENTE
  socketGlobal.emit("loginSuccess",userGame);
  setTimeout(function(){socketGlobal.isWaiting=false;},1000);
}
//###############################
//Register con base de datos
//###############################
async function RegisterSQL(conexion,data,socketGlobal){
  const result=await creatorDB.registerSQL(conexion,data);//aca no llega object
  if(result.object===null){
    socketGlobal.emit("registerInfo",result.info);
    setTimeout(function(){socketGlobal.isWaiting=false;},1000);
    return
  }
  socketGlobal.emit(result.object,result.info);
  setTimeout(function(){socketGlobal.isWaiting=false;},1000);
}
//##############################################################
//##############################################################
//####################ESCENA CREAR TRAINER######################
//##############################################################
//##############################################################
async function createTrainerMonsterStarter(conexion,data,socketGlobal,SockID){
  var starters={0:undefined,1:"Bulbasaur",4:"Charmander",7:"Squirtle"};//DISPONIBLES PARA EMPEZAR EL VIAJE
  var trainers={0:undefined,1:"Tilo",2:"Lillie"};                      //DISPONIBLES PARA EMPEZAR EL VIAJE
  var trainerNum=data.personaje;
  var monsterNum=data.starter;
  //var player=allplayers[SockID];
  var plr=roomsGame[socketGlobal.player.mapCode].players[socketGlobal.player.userID];
  var existTeam=Utils.getTeamPosition(plr.team);//regresa del 1 al 6 si hay slot vacio sino si esta lleno regresa null
  //verificar monster y trainer
  if(trainers[trainerNum]===undefined && starters[monsterNum]===undefined){
    socketGlobal.emit("crearPlayerInfo","Error el trainer que seleccionaste o el pokemon elegido no existen");
    setTimeout(function(){socketGlobal.isWaiting=false;},1000);
    return;
  }
  //verificar si no tiene personaje y no tiene ningun pokemon en team
  if(plr.personaje===0 && (existTeam===null || existTeam>1)){
    socketGlobal.emit("crearPlayerInfo","Error este trainer ya no debe estar aca.");
    setTimeout(function(){socketGlobal.isWaiting=false;},1000);
    return;
  }
  var newmon=newmon=new monGameDB(monsterNum,socketGlobal.player.userID);
  var result=await creatorDB.CreateStarterTrainer(conexion,trainerNum,newmon,plr);
  if(result.object===null){
    socketGlobal.emit("crearPlayerInfo",result.info);
    setTimeout(function(){socketGlobal.isWaiting=false;},1000);
    return
  }
  socketGlobal.emit(result.object,{info:result.info,updatePlayer:roomsGame[socketGlobal.player.mapCode].players[socketGlobal.player.userID]});
  setTimeout(function(){socketGlobal.isWaiting=false;},1000);
}
//##############################################################
//##############################################################
//#########################ESCENA GLOBAL########################
//##############################################################
//##############################################################
async function TeamMonsterServer(socketGlobal,SockID,conexion,arrayPlayer){
  //var player=allplayers[SockID];
  var teamArr=[];
  var result=await checkerDB.CheckTeam(conexion,socketGlobal.player.userID);
  if(result.object===null){
    socketGlobal.emit("error",result.info);
    setTimeout(function(){socketGlobal.isWaiting=false;},1000);
    return
  }
  for(var i=0;i<result.object.length;i++){
    teamArr[i]=CreatorObjects.MonsterBasicInfo(result.object[i]);
  }
  socketGlobal.emit("teamMonsters",teamArr);
  setTimeout(function(){socketGlobal.isWaiting=false;},1000);
}

async function AllMonsterServer(socketGlobal,id,conexion,arrayPlayer,isWaiting){
  var monstersArr=[];
  var result=await checkerDB.CheckAllMonsters(conexion,socketGlobal.player.userID);
  if(result.object===null){
    socketGlobal.emit("error",result.info);
    isWaiting=false;
    return
  }
  for(var i=0;i<result.object.length;i++){
    monstersArr[i]=CreatorObjects.MonsterBasicInfo(result.object[i]);
  }
  socketGlobal.emit("monsters",monstersArr);
  isWaiting=false;
}

async function MonsterProfileServer(socketGlobal,id,conexion,arrayPlayer,monID){
  var monArr=[];
  var result=await checkerDB.CheckProfileMonster(conexion,socketGlobal.player.userID,monID)
  if(result.object===null){
    socketGlobal.emit("error",result.info);
    socketGlobal.isWaiting=false;
    return
  }
  monArr[0]=CreatorObjects.MonsterInfo(result.object[0]);
  socketGlobal.emit("monsterProfile",monArr);
  socketGlobal.isWaiting=false;
}

async function bagServer(socketGlobal,id,conexion,arrayPlayer,isWaiting){
  var itemArr=[];
  var result=await checkerDB.checkBagGlobal(conexion,socketGlobal.player.userID);
  if(result.object===null){
    socketGlobal.emit("error",result.info);
    isWaiting=false;
    return
  }
  for(var i=0;i<result.object.length;i++){
    itemArr[i]=CreatorObjects.itemInfo(result.object[i]);
  }
  socketGlobal.emit("bag",itemArr);
  isWaiting=false;
}

function evolveServer(socketGlobal,id,conexion,arrayPlayer,monsterid){
  var itemArr=[];
  console.log(monsterid);
	var sqlMon = "SELECT * FROM monsters WHERE monster_id = '"+monsterid+"' AND user_current_owner ='"+socketGlobal.player.userID+"'";
  conexion.query(sqlMon, function (err, result) {
		if(result!=undefined){
      //console.log(result);
      var res=monsters.monster[result[0].monster_num];
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
  var itemReq="SELECT * FROM items WHERE item_num = '"+monsters.monster[monsternum].evo.object+"' AND user_owner ='"+socketGlobal.player.userID+"'";
	var sqlMon = "SELECT * FROM monsters WHERE monster_id = '"+monsterid+"' AND user_current_owner ='"+socketGlobal.player.userID+"';";
  sqlMon+=(monsters.monster[monsternum].evo.object>0)?itemReq:"";
  //console.log(sqlMon); 
  conexion.query(sqlMon, function (err, result) {
		if(result!=undefined || result[0][0]!=undefined && result[1][0]!=undefined){
      var resMon=(result.length>1)?monsters.monster[result[0][0].monster_num]:monsters.monster[result[0].monster_num];
      var resHabilidad=(result.length>1)?result[0][0].habilidad:result[0].habilidad;
      var resSpecial=(result.length>1)?result[0][0].special:result[0].special;
      var resNivel=(result.length>1)?result[0][0].nivel:result[0].nivel;
      var resItem=(result.length>1 && result[1].length>0)?result[1][0]:null;
      var resEvo=monsters.monster[resMon.evo.in];//trae todos los datos del monster al que evoluciona
      var itemUpd=(resItem!==null)?"UPDATE items SET item_qty = '"+(resItem.item_qty-1)+"' WHERE item_id ='"+resItem.item_id+"'":"";
      var itemDel=(resItem!==null)?"DELETE FROM items WHERE item_id='"+resItem.item_id+"'":"";
      var sqlMonEvo = (resNivel>=resMon.evo.nivel && resMon.evo.object===0 || resNivel>=resMon.evo.nivel && resItem!==null)?"UPDATE monsters SET monster_num='"+resMon.evo.in+"',monster_name='"+resEvo.monstername+"',type_1='"+resEvo.type_1+"',type_2='"+resEvo.type_2+"',habilidad='"+Utils.changeHabilidad(resHabilidad,resEvo.habilidades)+"'"+" WHERE monster_id ='"+monsterid+"';":"";
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


//##############################################################
//##############################################################
//####################ESCENA WILDBATTLEMONSTER##################
//##############################################################
//##############################################################
function startPlayerWildBattle(data,socketGlobal,SockID,conexion){//data esta vacio
  roomsGame[socketGlobal.player.mapCode].startWildBattleMap(socketGlobal,conexion,roomsBattle);
}

function FinishPlayerWildBattle(socketGlobal,SockID,status,conexion){
  var player=socketGlobal.player;
  var monWild=roomsGame[player.mapCode].players[player.userID].wildMon;
  //if(monWild===null){return;}//no hay monster
  //if(monWild.currHealth>0){return;}//no esta muerto
  console.log(status);
  console.log(monWild===null);
  console.log(monWild.currHealth);
  if(status="Wild_Die"){
    var exp=1;
    //destruir al pokemon salvaje-------------
    roomsGame[socketGlobal.mapCode].monsterMapDefeat(player,socketGlobal);
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
async function startPlayer(data,SockID,socketGlobal){
  var player=socketGlobal.player;
  roomsGame[player.mapCode].playerJoin(player,data,socketGlobal);
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

//setInterval(function(){console.log(Object.keys(gameState.players).length);},3000);
//Object.keys(objeto).length)--------------------------->longitud de un object
//gameState.players[0]==players.userID
//players.id=socket id
//######################################
//######################################
//ATRIBUTOS DE MONSTERS
//######################################
//##########################