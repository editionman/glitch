//server.js    //server.js //server.js 
// where your node app starts
var basicFunctions = require("./basicFunctions.js");
var monsters = require("./monsters.js");
var sqlFuncs = require("./mysqlFunctions.js");
//Prueba de una funcion importada de un archivo--------->console.log(basicFunctions.speak());
// init project
const express = require('express');
const app = express();
const http = require('http').createServer(app);
var io = require('socket.io')(http);
var mysql=require('mysql');
//DATOS INGAME
var players={};
var mapas=[];
var gameState={
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
//OBJETOS INGAME
function Player(id,userID,currentMap){
	this.id=id;
	this.userID=userID;
	this.currentMap=currentMap;
  this.teamMonsters={};
}
 
function PlayerInGame(userID,username,categoria,mapCode,personaje,gold,cash,isMovimiento=false){
	this.userID=userID;
	this.username=username;
  this.categoria=categoria;
  this.mapCode= mapCode;
  this.personaje=personaje;
	this.gold=gold;
	this.cash=cash;
	//this.team=(Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue';
  this.isMovimiento=isMovimiento;
  this.userX=0;//temporal
	this.userY=0;//temporal
  this.userZ=0;//temporal
  this.userRotX=0;//temporal
  this.userRotY=0;//temporal
  this.userRotZ=0;//temporal
	this.currentState="idle1";
  this.speed=30;
	this.speedAcelerate=40*1.5;
  this.inBattle=false;
  this.categoria=0;
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

var conexion = mysql.createConnection({
  //https://remotemysql.com/
  host: 'remotemysql.com',//localhost//https://eg.sytes.net//Remote SQL=remotemysql.com
  user: '0GmXfVfhCq',//localhost=projectpkm//eg.sytes.net=administradorpkm//Remote SQL=ZeTYHTj33E
  password: 's82moZSDa8',//administradorpkmr4gt0j//Remote SQL=Z0J8yoATWw
  database: '0GmXfVfhCq',//project_pokemon//Remote SQL=ZeTYHTj33E
  debug: false,
  multipleStatements: true
});
//FIX ERROR CONEXION 
function handleDisconnect(conexion) {
  conexion = mysql.createConnection({
  //https://remotemysql.com/
  host: 'remotemysql.com',//localhost//https://eg.sytes.net//Remote SQL=remotemysql.com
  user: '0GmXfVfhCq',//localhost=projectpkm//eg.sytes.net=administradorpkm//Remote SQL=dMt9KPOKu0
  password: 's82moZSDa8',//administradorpkmr4gt0j//Remote SQL=Z0J8yoATWw
  database: '0GmXfVfhCq',//project_pokemon//Remote SQL=ZeTYHTj33E
  debug: false,
  multipleStatements: true
}); // Recreate the connection, since
 
  conexion.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 1000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  conexion.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                 // server variable configures this)
      handleDisconnect();
    }
  });
}
handleDisconnect(conexion);

/*
const conexion = mysql.createPool({
  connectionLimit : 1000,
  host: 'remotemysql.com',
  user: 'ZeTYHTj33E',
  database: 'ZeTYHTj33E',
  password: 'Z0J8yoATWw',
  debug: false,
  multipleStatements: true
});
setInterval(() => {
    conexion.query('SELECT 1', (err, rows) => {
        if(err) {
          //throw err;
          console.log('error when connecting to db:', err);
        }
    });   
}, 1000);
*/
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
io.on('connection', function(socket){
  var socketGlobal=socket;
  var id=socket.id;
  //##############################################################################################
  //En escena INGRESO
  //##############################################################################################
  socket.on('userLogin',(data)=>{
    if(ValueIsString(data.user) && ValueIsString(data.pass)){
      //console.log("usuario correcto para ingresar");
      LoginSQL(conexion,data,id,socketGlobal);
    }
    else{
      var infoLog="Ingrese un usuario y password válidos";
			socket.emit("loginInfo",infoLog);
    }
  });
  socket.on('userRegister',(data)=>{
    if(ValueIsString(data.user) && ValueIsString(data.pass) && ValueIsString(data.email)){
      //console.log("usuario correcto para registrar");
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
      var userN = gameState.players[players[id].userID].username;
      var msg = data.msg;
      var date=new Date();
      var fecha={
        hora:date.getHours(),
        minuto:date.getMinutes(),
        dia: basicFunctions.NameDay(date.getDay())
      } 
      socket.broadcast.emit('newMsg', {sender:userN,nivel:gameState.players[players[id].userID].categoria,msg:msg,date:fecha});
      socket.emit('newMsg', {sender:userN,nivel:gameState.players[players[id].userID].categoria,msg:msg,date:fecha});
    
	});
  socket.on('action',(data)=>{
    UpdatePlayer(data,socketGlobal);
    /*
		if(typeof mapas[data.currentMap]!="undefined"){
			//UpdatePlayer(data);
		}
    */
	});
  socket.on('teamMonsters',(data)=>{ 
    if(players[id]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      var ap=gameState.players[players[id].userID];
      TeamMonsterServer(socketGlobal,id,conexion,ap);
    }
	});
  socket.on('monsters',(data)=>{
    if(players[id]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      var ap=gameState.players[players[id].userID];
      AllMonsterServer(socketGlobal,id,conexion,ap);
    }
	});
  socket.on('monsterProfile',(data)=>{//data=monID
    //console.log(gameState.players[players[id].userID]);
    if(players[id]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      var ap=gameState.players[players[id].userID];
      MonsterProfileServer(socketGlobal,id,conexion,ap,data);
    }
	});
  socket.on('bag',(data)=>{
    if(players[id]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      var ap=gameState.players[players[id].userID];
      bagServer(socketGlobal,id,conexion,ap);
    }
	});
  socket.on('evolveMonster',(data)=>{
    if(players[id]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      var ap=gameState.players[players[id].userID];
      evolveServer(socketGlobal,id,conexion,ap,data.monid);
    }
	});
  socket.on('evolveMonsterStart',(data)=>{
    if(players[id]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      var ap=gameState.players[players[id].userID];
      evolveServerStart(socketGlobal,id,conexion,ap,data.monid,data.monnum);
    }
	});
  socket.on('wildMonster',(data)=>{
    if(players[id]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      var ap=gameState.players[players[id].userID];
      wildMonsterServer(socketGlobal,id,conexion,ap);
    }
	});
  socket.on('battleWildMonster',(data)=>{
    if(players[id]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      gameState.players[players[id].userID].inBattle=true;
      var ap=gameState.players[players[id].userID];
      battleWildMonsterServer(socketGlobal,id,conexion,ap);
    }
	});
  //##############################################################################################
  //En escena WILDBATTLE
  //##############################################################################################
  socket.on('playerJoinWildBattle',(data)=>{
    if(players[id]===undefined){
      socket.emit("disconnect",{info:"Se ha actualizado el servidor"});
    }
    else {
      var ap=gameState.players[players[id].userID];
      gameState.players[players[id].userID].inBattle=true;
      startPlayerWildBattle(data,socketGlobal,id,conexion,ap);
    }
	});
  
  //En DESCONEXION
  socket.on('disconnect',()=>{
    //console.log("user disconnected");
    if(players[id]!=undefined){
      socket.broadcast.emit('playerExit',gameState.players[players[id].userID]);
			delete gameState.players[players[id].userID];
			DeletePlayerInRoom(players[id]);
		}
  });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});



















































//Actualizar player
function UpdatePlayer(data,socketGlobal){
  /*
	for(var i=0;i<mapas[data.player.mapCode].players.length;i++){	
		if(mapas[data.player.mapCode].players[i].userID==data.player.userID){
			mapas[data.player.mapCode].players[i].userX=data.player.userX;
			mapas[data.player.mapCode].players[i].userY=data.player.userY;
			mapas[data.player.mapCode].players[i].direction=data.player.direction;
			mapas[data.player.mapCode].players[i].isMovimiento=data.player.isMovimiento;
		}	
	}
  */
  if(data.type=="movement"){
    for(var id in players){
      for(var userID in gameState.players){
        //console.log(userID);
        if(players[id].userID==userID){
          gameState.players[userID].userX=data.position.x;
          gameState.players[userID].userY=data.position.y;
          gameState.players[userID].userZ=data.position.z;
          gameState.players[userID].userRotX=data.rotation.x;
          gameState.players[userID].userRotY=data.rotation.y;
          gameState.players[userID].userRotZ=data.rotation.z;
          gameState.players[userID].currentState=data.state;
          socketGlobal.broadcast.emit('playerAction',{player:gameState.players[userID],type:'movement',state:gameState.players[userID].currentState});
        }
      }
    }
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
function LoginSQL(conexion,data,SockID,socketGlobal){
  var sql = "SELECT * FROM users WHERE user_name =  '"+data.user+"' AND USER_password= '"+data.pass+"'";
	//consultar
	conexion.query(sql, function (err, result) {
		if(result!=undefined && result.length>1){
			var infoLog="Existe un error de bug con este usuario, vuelve a intentar o consulta con un administrador";
      socketGlobal.emit("loginInfo",infoLog);
       
		}
		else if(result!=undefined && result.length==1){
			var infoLog="Ingreso satisfactorio";
			var player=result[0];
      var playerServer=new Player(SockID,player.user_id,player.mapCode);
			var playerGame=new PlayerInGame(player.user_id,player.user_name,player.categoria,player.mapCode,player.personaje,player.gold,player.cash);
      playerGame.categoria=player.categoria;

			players[SockID]=playerServer;
			gameState.players[result[0].user_id]=playerGame;
      //---------->se emite en la funcion teammonterserver para poder emitir junto con el team monster
      socketGlobal.emit("loginSuccess",playerGame);
      socketGlobal.emit("uniqueID",SockID);
		}
		else
		{
			var infoLog="Usuario o Password Incorrecto";
      socketGlobal.emit("loginInfo",infoLog);
		}
	});
	//fin de consulta
}

//###############################
//Register con base de datos
//###############################
function RegisterSQL(conexion,data,SockID,socketGlobal){
  var infoReg;
  var sql1 = "SELECT * FROM users WHERE user_name =  '"+data.user+"' OR user_email= '"+data.email+"'";
  var sql2 = "INSERT INTO users (user_id, user_name, user_password, user_email) VALUES (NULL, '"+data.user+"', '"+data.pass+"', '"+data.email+"')";
  //console.log(data.user+"-"+data.pass+"-"+data.email);
	//consultar
	conexion.query(sql1, function (err, result) {
		if(result!=undefined && result.length>1){
			infoReg="Este usuario y correo ya estan registrados, intenta con otros.";
			socketGlobal.emit("registerInfo",infoReg);
		}
		else if(result!=undefined && result.length==1){
			infoReg="Ya existe este usuario o el email ya esta registrado";
      socketGlobal.emit("registerInfo",infoReg);
		}
		else
		{
      conexion.query(sql2, function (err, result) {
        if(result!=undefined){
          infoReg="Felicidades, tu cuenta a sido creada!";
          socketGlobal.emit("registerSuccess",infoReg);
        }
        else{
          infoReg="Error desconocido al crear cuenta, consulta con un administrador";
          socketGlobal.emit("registerInfo",infoReg);
        }
      });
		}
	});
	//fin de consulta
}
//##############################################################
//##############################################################
//####################ESCENA CREAR TRAINER######################
//##############################################################
//##############################################################
function createTrainerMonsterStarter(conexion,data,SockID,socketGlobal){
  var infoTM;
  var countSuccess=0;
  var trainer=data.personaje;
  var monster=data.starter;
  //si es trainer valido ahora solo hay 2
  if(trainer>0 && trainer<=2){
    //si es starter
    if(monster===1 || monster===4 || monster===7){
      var sql="SELECT * FROM monsters WHERE user_current_owner = "+players[SockID].userID;
      //consultar
	    conexion.query(sql, function (err, result) {
        if(result!==undefined && result.length==0){
          //los datos que se inyectan al servidor son----->                                                                                                                                                                                                                                                           monster_id  monster_num              monster_name                      special    user_current_owner      user_owner            in_team-genero          type_1                                 type_2                       exp       naturaleza                      habilidad                                                              mov_1                                                  mov_2                                                  mov_3                                          mov_4                                                            movs                                                                          iv_ps                                        iv_atk                            iv_def                                          iv_atk_es                              iv_def_es                                      iv_velocidad        ev_ps,ev_atk,ev_def,ev_atk_es,ev_def_es,ev_velocidad                                             
          var sql1="INSERT INTO monsters(monster_id,monster_num,monster_name,special,user_current_owner,user_owner,in_team,genero,type_1,type_2,exp,naturaleza,habilidad,mov_1,mov_2,mov_3,mov_4,movs,iv_ps,iv_atk,iv_def,iv_atk_es,iv_def_es,iv_velocidad,ev_ps,ev_atk,ev_def,ev_atk_es,ev_def_es,ev_velocidad) VALUES (NULL,'"+data.starter+"','"+monsters.monster(data.starter).monstername+"',0,'"+players[SockID].userID+"','"+players[SockID].userID+"',1,0,"+monsters.monster(data.starter).type_1+","+monsters.monster(data.starter).type_2+",1,"+monsters.naturaleza()+","+monsters.habilidad(monsters.monster(data.starter).habilidades)+","+monsters.monster(data.starter).movimientos[0][0]+","+monsters.monster(data.starter).movimientos[0][0]+","+monsters.monster(data.starter).movimientos[0][0]+","+monsters.monster(data.starter).movimientos[0][0]+",'"+basicFunctions.movsAprendidosPorNivel(monsters.monster(data.starter),nivelMonster(1))+"',"+basicFunctions.NumeroAleatorio(1,31)+","+basicFunctions.NumeroAleatorio(1,31)+","+basicFunctions.NumeroAleatorio(1,31)+","+basicFunctions.NumeroAleatorio(1,31)+","+basicFunctions.NumeroAleatorio(1,31)+","+basicFunctions.NumeroAleatorio(1,31)+",0,0,0,0,0,0);";
          sql1+="UPDATE users SET personaje='"+data.personaje+"'"+" WHERE user_id='"+players[SockID].userID+"'";
          conexion.query(sql1, function (err, result) {
            if(result!==undefined){
              var monstersArr=[]; 
              monstersArr[0]=new Monster(null,data.starter,monsters.monster(data.starter).monstername,0,players[SockID].userID,players[SockID].userID,1,monsters.monster(data.starter).type_1,monsters.monster(data.starter).type_2,0,1);
              gameState.players[players[SockID].userID].personaje=data.personaje;
              infoTM="Cambios realizados con exito";
              socketGlobal.emit("crearPlayerSucess",{info:infoTM,updatePlayer:gameState.players[players[SockID].userID]});
            } 
            else{
              infoTM="Error no se puede realizar esta accion, contacta con un ADMINISTRADOR";
              console.log(err)
              socketGlobal.emit("crearPlayerInfo",infoTM);
            }
          });
        }
        else if(result!==undefined && result.length>0){
          infoTM="Error esta cuenta ya tienen starter";
          socketGlobal.emit("crearPlayerInfo",infoTM);
        }
        else{
          infoTM="Error en la caja de pokemon";
          socketGlobal.emit("crearPlayerInfo",infoTM);
        }
      });
    }
    else{
      infoTM="Error el pokemon que seleccionaste no es starter o no existe";
      socketGlobal.emit("crearPlayerInfo",infoTM);
    }
  }
  else{
    infoTM="Error el trainer que seleccionaste no existe para los usuarios";
    socketGlobal.emit("crearPlayerInfo",infoTM);
  }
}
//##############################################################
//##############################################################
//#########################ESCENA GLOBAL########################
//##############################################################
//##############################################################
function TeamMonsterServer(socketGlobal,SockID,conexion,arrayPlayer){
  //if(arrayPlayer===0) console.log("No se encontro arrayplayer en TeamMonsterServer");
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
    players[SockID].teamMonsters=monstersArr;
    socketGlobal.emit("teamMonsters",monstersArr);
	});
}

function AllMonsterServer(socketGlobal,id,conexion,arrayPlayer){
  //if(arrayPlayer===0) console.log("No se encontro arrayplayer en AllMonsterServer");
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
  //if(arrayPlayer===0) console.log("No se encontro arrayplayer en MonsterProfileServer");
  var monArr=[]
  var sqlTeam = "SELECT * FROM monsters WHERE user_current_owner = '"+arrayPlayer.userID+"' AND monster_id = '"+monID+"'";
  conexion.query(sqlTeam, function (err, result) {
		if(result!=undefined){
      for(var i=0;i<result.length;i++){
				monArr[i]=new MonsterProfile(result[i].monster_id,result[i].monster_num,result[i].monster_name,result[i].special,result[i].user_current_owner,result[i].user_owner,result[i].in_team,result[i].genero,result[i].type_1,result[i].type_2,result[i].exp,result[i].naturaleza,result[i].habilidad,result[i].mov_1,result[i].mov_2,result[i].mov_3,result[i].mov_4,result[i].iv_ps,result[i].iv_atk,result[i].iv_def,result[i].iv_atk_es,result[i].iv_def_es,result[i].iv_velocidad,result[i].ev_ps,result[i].ev_atk,result[i].ev_def,result[i].ev_atk_es,result[i].ev_def_es,result[i].ev_velocidad,monsters.monster(result[i].monster_num).stats.ps,monsters.monster(result[i].monster_num).stats.atk,monsters.monster(result[i].monster_num).stats.def,monsters.monster(result[i].monster_num).stats.atk_es,monsters.monster(result[i].monster_num).stats.def_es,monsters.monster(result[i].monster_num).stats.velocidad);
        monArr[i].mov_1=monsters.movimientos(result[i].mov_1);
        monArr[i].mov_2=monsters.movimientos(result[i].mov_2);
        monArr[i].mov_3=monsters.movimientos(result[i].mov_3);
        monArr[i].mov_4=monsters.movimientos(result[i].mov_4);
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
  //if(arrayPlayer===0) console.log("No se encontro arrayplayer en bagServer");
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
  //if(arrayPlayer===0) console.log("No se encontro arrayplayer en bagServer");
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
  //if(arrayPlayer===0) console.log("No se encontro arrayplayer en bagServer");
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
function wildMonsterServer(socketGlobal,id,conexion,arrayPlayer){
  var itemArr=[];
  var tempMonNum=basicFunctions.wildMonsterRandom();
  var tempMon=monsters.monster(tempMonNum);
  var tempSpecial=basicFunctions.probabilidadShiny();
  var tempCatchable=basicFunctions.probabilidadCatch();
  var sqlWildDelete = "DELETE FROM temp_monsters WHERE user_owner='"+arrayPlayer.userID+"'";
  conexion.query(sqlWildDelete, function (err, result) {
    if(result!=undefined){
      var sqlWildMon = "INSERT INTO temp_monsters (temp_mon_id, temp_mon_name, temp_mon_num, temp_mon_special, user_owner, catchable) VALUES (NULL, '"+tempMon.monstername+"', '"+tempMonNum+"', '"+tempSpecial+"', '"+arrayPlayer.userID+"', '"+tempCatchable+"')";
      conexion.query(sqlWildMon, function (err, result) {
        if(result!=undefined){
          socketGlobal.emit("wildMonInfo",{special:tempSpecial,num:tempMonNum,name:tempMon.monstername});
        }
        else{
          var error="No se encontro wild monster contacta con un ADMINISTRADOR";
          socketGlobal.emit("wildMonError",error);
        }
      });
    }
    else{
      var error="Error al buscar un wild monster contacta con un ADMINISTRADOR";
      socketGlobal.emit("wildMonError",error);
    }
  });
}
function battleWildMonsterServer(socketGlobal,id,conexion,arrayPlayer){
  var sqlBattleWildMon = "SELECT * FROM temp_monsters WHERE user_owner='"+arrayPlayer.userID+"';";
  conexion.query(sqlBattleWildMon, function (err, result) {
    if(result!=undefined){
      var data={num:result[0].temp_mon_num,special:result[0].temp_mon_special,name:result[0].temp_mon_name,catchable:result[0].catchable};
      socketGlobal.emit("battleWildMonInfo",{dataWild:data,inBattle:true});
      socketGlobal.broadcast.emit('OtherPlayerInBattle',{playerID:gameState.players[players[id].userID].userID,inBattle:true});
    }
    else{
      var error="Hubo un error al entrar en batalla con wild monster contacta con un ADMINISTRADOR";
      socketGlobal.emit("battleWildMonError",error);
    }
  });
  //SELECT * FROM temp_monsters WHERE user_owner='52'
}
//##############################################################
//##############################################################
//####################ESCENA WILDBATTLEMONSTER##################
//##############################################################
//##############################################################
function startPlayerWildBattle(data,socketGlobal,id,conexion,ap){
  sqlFuncs.teamSQL(id,conexion,ap).then((teammon)=>{
    sqlFuncs.SelectWildMonSQL(id,conexion,ap).then((wildmon)=>{
      socketGlobal.emit("WildBattleStart",{team:teammon,wild:wildmon});
    });
  });
  
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
  gameState.players[players[id].userID].userID==players[id].userID;
  gameState.players[players[id].userID].userX=data.position.x;
  gameState.players[players[id].userID].userY=data.position.y;
  gameState.players[players[id].userID].userZ=data.position.z;
  gameState.players[players[id].userID].userRotX=data.rotation.x;
  gameState.players[players[id].userID].userRotY=data.rotation.y;
  gameState.players[players[id].userID].userRotZ=data.rotation.z;
  socketGlobal.emit("playerStart",gameState.players);
  socketGlobal.broadcast.emit('playerJoined', gameState.players[players[id].userID]);
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
	//borrar player del room
  /*
	for(i=0;i<mapas[user.currentMap].players.length;i++){
		if(mapas[user.currentMap].players[i].userID==user.userID){
			mapas[user.currentMap].players.splice(i,1);
		}
	}
  */
	//borrar player del servidor
	Object.keys(players).forEach((id)=>{
		if(players[id].userID==user.userID){
			delete players[id];
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


