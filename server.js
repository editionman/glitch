//server.js    //server.js //server.js 
//LIB
var utils = require("./lib/utils.js");
var mapas = require("./lib/maps.js");
var plrGame = require("./lib/player.js");
var worldMap = require("./lib/worlMap.js");
var roomsGame={};
//var plr = require("./lib/player.js");
//var test=new plr(1,"xd",0,1,1,0,0);
//test.run("hola"); 
//var quest = require("./lib/quest.js");
//var test=new quest(1,"Ed");
//console.log(test);

// where your node app starts
var basicFunctions = require("./basicFunctions.js");
var monsters = require("./monsters.js");
var moves = require("./moves.js");
var npcs = require("./npcs.js");

//var maps = require("./maps.js");
var items = require("./items.js");
var sqlFuncs = require("./mysqlFunctions.js");
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

function Monster(monsterID,monster_num,monstername,special,user_current_owner,user_owner,in_team,genero,type_1,type_2,exp,naturaleza,habilidad,mov_1,mov_2,mov_3,mov_4,iv_ps,iv_atk,iv_def,iv_atk_es,iv_def_es,iv_velocidad,ev_ps,ev_atk,ev_def,ev_atk_es,ev_def_es,ev_velocidad){
	this.monsterID=monsterID;
	this.monster_num=monster_num;
	this.monstername=monstername;
	this.special=special;
	this.user_current_owner=user_current_owner;
	this.user_owner=user_owner;
  this.in_team=in_team;
  this.genero=genero;
  this.type_1=type_1;
  this.type_2=type_2;
  this.exp=exp;
  this.naturaleza=naturaleza;
  this.habilidad=habilidad;
  this.mov_1=mov_1;
  this.mov_2=mov_2;
  this.mov_3=mov_3;
  this.mov_4=mov_4;
  this.iv_ps=iv_ps;
  this.iv_atk=iv_atk;
  this.iv_def=iv_def;
  this.iv_atk_es=iv_atk_es;
  this.iv_def_es=iv_def_es;
  this.iv_velocidad=iv_velocidad;
  this.ev_ps=ev_ps;
  this.ev_atk=ev_atk;
  this.ev_def=ev_def;
  this.ev_atk_es=ev_atk_es;
  this.ev_def_es=ev_def_es;
  this.ev_velocidad=ev_velocidad;
}
function MonsterBasicInfo(monsterID,monster_num,monstername,special,exp,genero,in_team,type_1,type_2){
	this.monsterID=monsterID;
	this.monster_num=monster_num;
	this.monstername=monstername;
  this.special=special;
  this.exp=exp;
  this.genero=genero;
  this.in_team=in_team;
  this.type_1=type_1;
  this.type_2=type_2;
}

function MonsterProfile(monsterID,monster_num,monstername,special,user_current_owner,user_owner,in_team,genero,type_1,type_2,exp,naturaleza,habilidad,mov_1,mov_2,mov_3,mov_4,iv_ps,iv_atk,iv_def,iv_atk_es,iv_def_es,iv_velocidad,ev_ps,ev_atk,ev_def,ev_atk_es,ev_def_es,ev_velocidad,base_ps,base_atk,base_def,base_atk_es,base_def_es,base_velocidad,prom_ps,prom_atk,prom_def,prom_atk_es,prom_def_es,prom_velocidad){
	this.monsterID=monsterID;
	this.monster_num=monster_num;
	this.monstername=monstername;
	this.special=special;
	this.user_current_owner=user_current_owner;
	this.user_owner=user_owner;
  this.in_team=in_team;
  this.genero=genero;
  this.type_1=type_1;
  this.type_2=type_2;
  this.exp=exp;
  this.naturaleza=naturaleza;
  this.habilidad=habilidad;
  this.mov_1=mov_1;
  this.mov_2=mov_2;
  this.mov_3=mov_3;
  this.mov_4=mov_4;
  this.iv_ps=iv_ps;
  this.iv_atk=iv_atk;
  this.iv_def=iv_def;
  this.iv_atk_es=iv_atk_es;
  this.iv_def_es=iv_def_es;
  this.iv_velocidad=iv_velocidad;
  this.ev_ps=ev_ps;
  this.ev_atk=ev_atk;
  this.ev_def=ev_def;
  this.ev_atk_es=ev_atk_es;
  this.ev_def_es=ev_def_es;
  this.ev_velocidad=ev_velocidad;
  this.base_ps=base_ps;
  this.base_atk=base_atk;
  this.base_def=base_def;
  this.base_atk_es=base_atk_es;
  this.base_def_es=base_def_es;
  this.base_velocidad=base_velocidad;
  this.prom_ps=prom_ps;
  this.prom_atk=prom_atk;
  this.prom_def=prom_def;
  this.prom_atk_es=prom_atk_es;
  this.prom_def_es=prom_def_es;
  this.prom_velocidad=prom_velocidad;
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
  var logged=false;
  //##############################################################################################
  //En escena INGRESO
  //##############################################################################################
  socket.on('userLogin',(data)=>{
    if(ValueIsString(data.user) && ValueIsString(data.pass)){
      //"usuario correcto para ingresar");
      if(Object.keys(allplayers).length<maxPlayers && logged===false){
        logged=true;
        LoginSQL(conexion,data,id,socketGlobal,logged);
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
    createTrainerMonsterStarter(conexion,data,id,socketGlobal);
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
    UpdatePlayer(data,socketGlobal);
	});
  socket.on('teamMonsters',(data)=>{ 
    if(allplayers[id]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      var ap=roomsGame[socketGlobal.mapCode].players[socketGlobal.userID];
      //ap);
      TeamMonsterServer(socketGlobal,id,conexion,ap);
    }
	});
  socket.on('monsters',(data)=>{
    if(allplayers[id]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      var ap=roomsGame[socketGlobal.mapCode].players[socketGlobal.userID];
      AllMonsterServer(socketGlobal,id,conexion,ap);
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
      bagServer(socketGlobal,id,conexion,ap);
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
    if(allplayers[id]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      roomsGame[socketGlobal.mapCode].monsterStartBattle(monID,socketGlobal);
    }
	});
  socket.on('cancelBattleWildMonster',(monID)=>{
    if(allplayers[id]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      roomsGame[socketGlobal.mapCode].monsterCancelBattle(socketGlobal);
    }
	});
  socket.on('runBattleWildMonster',(monID)=>{
    roomsGame[socketGlobal.mapCode].monsterRunBattle(socketGlobal);
	});
  //##############################################################################################
  //En escena NPC
  //##############################################################################################
  socket.on('npcSelect',(data)=>{
    roomsGame[socketGlobal.mapCode].NPCDialog(socketGlobal,data.npcID);
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
      roomsGame[socketGlobal.mapCode].playerLeft(socketGlobal);
		}
  });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});



















































//Actualizar player
function UpdatePlayer(data,socketGlobal){
  if(data.type=="movement"){
    roomsGame[socketGlobal.mapCode].playerAction(socketGlobal.userID,data,socketGlobal);
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
function LoginSQL(conexion,data,SockID,socketGlobal,logged){
  sqlFuncs.loginSQL(conexion,data,SockID,socketGlobal).then((result)=>{
    var player=result[0];
		var playerGame=new plrGame(player.user_id,player.user_name,player.categoria,player.mapCode,player.personaje,player.gold,player.cash);
    playerGame.categoria=player.categoria;
    allplayers[SockID]=new PlayerServer(SockID,player.user_id,player.mapCode);
    socketGlobal.mapCode=player.mapCode; 
    socketGlobal.userID=player.user_id;
    socketGlobal.username=player.user_name;
    socketGlobal.wildMonster=null;

    socketGlobal.join(player.mapCode);
    if(roomsGame[socketGlobal.mapCode]==undefined){//No existe mapa
      roomsGame[socketGlobal.mapCode]=new worldMap(socketGlobal.mapCode,mapas[socketGlobal.mapCode].mapname,mapas[socketGlobal.mapCode].maxPlayers,mapas[socketGlobal.mapCode].teleports);//creado
      roomsGame[socketGlobal.mapCode].createMonsters(mapas[socketGlobal.mapCode].areasMonsters);//CREATE MONSTERS
      roomsGame[socketGlobal.mapCode].createNPCS(mapas[socketGlobal.mapCode].npcs);//CREATE NPCS
      roomsGame[socketGlobal.mapCode].players[socketGlobal.userID]=playerGame;//PONIENDO AL  PLAYER EN MAPA
    }else roomsGame[socketGlobal.mapCode].players[socketGlobal.userID]=playerGame;//PONIENDO AL PLAYER EN MAPA EXISTENTE
    socketGlobal.emit("loginSuccess",playerGame);
  });
  logged=false;
}
//###############################
//Register con base de datos
//###############################
function RegisterSQL(conexion,data,SockID,socketGlobal){
  sqlFuncs.registerSQL(conexion,data,SockID,socketGlobal)//.then((result)=>{})
	//fin de consulta
}
//##############################################################
//##############################################################
//####################ESCENA CREAR TRAINER######################
//##############################################################
//##############################################################
function createTrainerMonsterStarter(conexion,data,SockID,socketGlobal){
  var player=roomsGame[socketGlobal.mapCode].players[socketGlobal.userID];
  sqlFuncs.createTrainerSQL(conexion,data,SockID,socketGlobal,player)//.then((result)=>{})
}
//##############################################################
//##############################################################
//#########################ESCENA GLOBAL########################
//##############################################################
//##############################################################
function TeamMonsterServer(socketGlobal,SockID,conexion,arrayPlayer){
  //if(arrayPlayer===0) ("No se encontro arrayplayer en TeamMonsterServer");
	var monstersArr=[];
	var sqlTeam = "SELECT * FROM monsters WHERE user_current_owner = '"+arrayPlayer.userID+"' AND in_team > 0 ORDER BY in_team";
	//consultar
	conexion.query(sqlTeam, function (err, result) {
		if(result!=undefined && result.length>6){
			var error="Mas de 6 monsters en team";
			socketGlobal.emit("error",error);
		}
		else if(result!=undefined && result.length<=6)
		{
			for(var i=0;i<result.length;i++){
        monstersArr[i]=new MonsterBasicInfo(result[i].monster_id,result[i].monster_num,result[i].monster_name,result[i].special,result[i].exp,result[i].genero,result[i].in_team,result[i].type_1,result[i].type_2)
			}
		}
		else{
			console.log(err);
		}
    allplayers[SockID].teamMonsters=monstersArr;
    socketGlobal.emit("teamMonsters",monstersArr);
	});
}

function AllMonsterServer(socketGlobal,id,conexion,arrayPlayer){
  //if(arrayPlayer===0) "No se encontro arrayplayer en AllMonsterServer");
  var monstersArr=[];
	var sqlTeam = "SELECT * FROM monsters WHERE user_current_owner = '"+arrayPlayer.userID+"'";
  conexion.query(sqlTeam, function (err, result) {
		if(result!=undefined){
      for(var i=0;i<result.length;i++){
        monstersArr[i]=new MonsterBasicInfo(result[i].monster_id,result[i].monster_num,result[i].monster_name,result[i].exp,result[i].genero,result[i].in_team,result[i].type_1,result[i].type_2);
			}
		}
		else{
      var error="No se encontro monsters contacta con un ADMINISTRADOR";
			socketGlobal.emit("error",error);
		}
    socketGlobal.emit("monsters",monstersArr);
	});
}

function MonsterProfileServer(socketGlobal,id,conexion,arrayPlayer,monID){
  //if(arrayPlayer===0) "No se encontro arrayplayer en MonsterProfileServer");
  var monArr=[]
  var sqlTeam = "SELECT * FROM monsters WHERE user_current_owner = '"+arrayPlayer.userID+"' AND monster_id = '"+monID+"'";
  conexion.query(sqlTeam, function (err, result) {
		if(result!=undefined){
      for(var i=0;i<result.length;i++){
				monArr[i]=new MonsterProfile(result[i].monster_id,result[i].monster_num,result[i].monster_name,result[i].special,result[i].user_current_owner,result[i].user_owner,result[i].in_team,result[i].genero,result[i].type_1,result[i].type_2,result[i].exp,result[i].naturaleza,result[i].habilidad,result[i].mov_1,result[i].mov_2,result[i].mov_3,result[i].mov_4,result[i].iv_ps,result[i].iv_atk,result[i].iv_def,result[i].iv_atk_es,result[i].iv_def_es,result[i].iv_velocidad,result[i].ev_ps,result[i].ev_atk,result[i].ev_def,result[i].ev_atk_es,result[i].ev_def_es,result[i].ev_velocidad,monsters.monster(result[i].monster_num).stats.ps,monsters.monster(result[i].monster_num).stats.atk,monsters.monster(result[i].monster_num).stats.def,monsters.monster(result[i].monster_num).stats.atk_es,monsters.monster(result[i].monster_num).stats.def_es,monsters.monster(result[i].monster_num).stats.velocidad);
        monArr[i].mov_1=moves.movimientos(result[i].mov_1);
        monArr[i].mov_2=moves.movimientos(result[i].mov_2);
        monArr[i].mov_3=moves.movimientos(result[i].mov_3);
        monArr[i].mov_4=moves.movimientos(result[i].mov_4);
        monArr[i].prom_ps=basicFunctions.StatPromedio(monArr[i],"ps");
        monArr[i].prom_atk=basicFunctions.StatPromedio(monArr[i],"atk");
        monArr[i].prom_def=basicFunctions.StatPromedio(monArr[i],"def");
        monArr[i].prom_atk_es=basicFunctions.StatPromedio(monArr[i],"atk_es");
        monArr[i].prom_def_es=basicFunctions.StatPromedio(monArr[i],"def_es");
        monArr[i].prom_velocidad=basicFunctions.StatPromedio(monArr[i],"velocidad");
        
			}
		}
		else{
      var error="No se encontro monsters contacta con un ADMINISTRADOR";
			socketGlobal.emit("error",error);
		}
    socketGlobal.emit("monsterProfile",monArr);
	});
}

function bagServer(socketGlobal,id,conexion,arrayPlayer){
  //if(arrayPlayer===0) "No se encontro arrayplayer en bagServer");
  var itemArr=[];
	var sqlTeam = "SELECT * FROM items WHERE user_owner = '"+arrayPlayer.userID+"'";
  conexion.query(sqlTeam, function (err, result) {
		if(result!=undefined){
      for(var i=0;i<result.length;i++){
        //(itemID,item_num,item_name,item_type,user_owner)
        itemArr[i]=new itemInfo(result[i].item_id,result[i].item_num,result[i].item_name,result[i].item_type,result[i].user_owner);
        console.log(itemArr[i]);
			}
		}
		else{
      var error="No se encontro items contacta con un ADMINISTRADOR";
			io.to(id).emit("error",err);
		}
    socketGlobal.emit("bag",itemArr);
	});
}

function evolveServer(socketGlobal,id,conexion,arrayPlayer,monsterid){
  //if(arrayPlayer===0) ("No se encontro arrayplayer en bagServer");
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
  //if(arrayPlayer===0) No se encontro arrayplayer en bagServer");
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
function startPlayerWildBattle(data,socketGlobal,id,conexion){
  var indexTeamMonBattle;
  var monWild=roomsGame[socketGlobal.mapCode].players[socketGlobal.userID].wildMon;
  socketGlobal.monBattleID=null;
  sqlFuncs.teamSQL(id,conexion,socketGlobal.userID).then((teammon)=>{
    if(monWild===null);//No hay monster en contacto
    else{
      for(var i=0;i<teammon.length;i++){
        if(teammon[i].currHealth>0 && indexTeamMonBattle===undefined){
          indexTeamMonBattle=i;
          socketGlobal.monBattleID=teammon[i].monsterID;
        }
      }
      if(indexTeamMonBattle===undefined);//NO HAY POKEMON VIVO EN EL TEAM
      socketGlobal.emit("WildBattleStart",{team:teammon,wild:monWild,index:indexTeamMonBattle});
      roomsGame[socketGlobal.mapCode].players[socketGlobal.userID].inBattle=true;
    }
  });
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
    roomsGame[socketGlobal.mapCode].monsterMapDestroy(socketGlobal,mapas[socketGlobal.mapCode].areasMonsters);
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

