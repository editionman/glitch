var basicFunctions = require("./basicFunctions.js");
var monsters = require("./monsters.js");
var moves = require("./moves.js");
var starters={1:"Bulbasaur",4:"Charmander",7:"Squirtle"}
var trainers={0:"undefined",1:"Tilo",2:"Lillie"}
var exports = module.exports = {
  speak: function() {
    return "Hello";
  },
  //-------SQL FUNCTIONS FOR LOGIN
  loginSQL: function(conexion,data,SockID,socketGlobal){
    return new Promise((resolve,reject)=>{
      
      var sqlLogin = "SELECT * FROM users WHERE user_name =  '"+data.user+"' AND USER_password= '"+data.pass+"'";
      //consultar
      conexion.query(sqlLogin, function (err, result) {
        //conexion.release();
        if (err) return reject(err);
        if(result!=undefined && result.length==1){
          resolve(result);
        }
        else if(result!=undefined && result.length>1){
          var error="Existe un error de bug con este usuario, vuelve a intentar o consulta con un administrador";
          socketGlobal.emit("loginInfo",error);
          //resolve(error);
        }else{
          var error="Usuario o Password Incorrecto";
          socketGlobal.emit("loginInfo",error);
          //resolve(error);
        }
      });
      
    });
  },
  //-------SQL FUNCTIONS FOR LOGIN
  registerSQL: function(conexion,data,SockID,socketGlobal){
    return new Promise((resolve,reject)=>{
      var sql1 = "SELECT * FROM users WHERE user_name =  '"+data.user+"' OR user_email= '"+data.email+"'";
      var sql2 = "INSERT INTO users (user_id, user_name, user_password, user_email) VALUES (NULL, '"+data.user+"', '"+data.pass+"', '"+data.email+"')";
      conexion.query(sql1, function (err, result) {
        if(result!=undefined && result.length>1){
          socketGlobal.emit("registerInfo","Este usuario y correo ya estan registrados, intenta con otros.");
        }
        else if(result!=undefined && result.length==1){
          socketGlobal.emit("registerInfo","Ya existe este usuario o el email ya esta registrado");
        }else{
          conexion.query(sql2, function (err, result) {
            //conexion.release();
            if(result!=undefined){
              socketGlobal.emit("registerSuccess","Felicidades, tu cuenta a sido creada!");
            }else{
              socketGlobal.emit("registerInfo","Error desconocido al crear cuenta, consulta con un administrador");
            }
          });
        }
      });
    });
  },
  //-------SQL FUNCTIONS FOR CREATE TRAINER
  createTrainerSQL: function(conexion,data,SockID,socketGlobal,playerdata){
    var trainer=data.personaje;
    var monster=data.starter;
    //console.log(trainer+"--"+monster+"--"+" TRAINER Y MONSTER");
    //si es trainer valido ahora solo hay 2
    if(trainer>0 && trainer<=2){//trainers[trainer]!==undefined
      //si es starter solo hay 1-4-7
      if(monster===1 || monster===4 || monster===7){//starters[monster]!==undefined
        var sql="SELECT * FROM monsters WHERE user_current_owner = "+socketGlobal.userID;
        conexion.query(sql, function (err, result) {
          if(result!==undefined && result.length==0){//No hay starter
            //los datos que se inyectan al servidor son----->                                                                                                                                                                                                                                                           monster_id  monster_num              monster_name                      special    user_current_owner      user_owner            in_team-genero          type_1                                 type_2                       exp       naturaleza                      habilidad                                                              mov_1                                                  mov_2                                                  mov_3                                          mov_4                                                            movs                                                                          iv_ps                                        iv_atk                            iv_def                                          iv_atk_es                              iv_def_es                                      iv_velocidad        ev_ps,ev_atk,ev_def,ev_atk_es,ev_def_es,ev_velocidad                                             
            var sql1="INSERT INTO monsters(monster_id,monster_num,monster_name,special,user_current_owner,user_owner,in_team,genero,type_1,type_2,exp,naturaleza,habilidad,mov_1,mov_2,mov_3,mov_4,movs,iv_ps,iv_atk,iv_def,iv_atk_es,iv_def_es,iv_velocidad,ev_ps,ev_atk,ev_def,ev_atk_es,ev_def_es,ev_velocidad) VALUES (NULL,'"+data.starter+"','"+monsters.monster(data.starter).monstername+"',0,'"+socketGlobal.userID+"','"+socketGlobal.userID+"',1,0,"+monsters.monster(data.starter).type_1+","+monsters.monster(data.starter).type_2+",1,"+monsters.naturaleza()+","+monsters.habilidad(monsters.monster(data.starter).habilidades)+","+monsters.monster(data.starter).movimientos[0][0]+","+monsters.monster(data.starter).movimientos[0][0]+","+monsters.monster(data.starter).movimientos[0][0]+","+monsters.monster(data.starter).movimientos[0][0]+",'"+basicFunctions.movsAprendidosPorNivel(monsters.monster(data.starter),1)+"',"+basicFunctions.NumeroAleatorio(1,31)+","+basicFunctions.NumeroAleatorio(1,31)+","+basicFunctions.NumeroAleatorio(1,31)+","+basicFunctions.NumeroAleatorio(1,31)+","+basicFunctions.NumeroAleatorio(1,31)+","+basicFunctions.NumeroAleatorio(1,31)+",0,0,0,0,0,0);";
            sql1+="UPDATE users SET personaje='"+data.personaje+"'"+" WHERE user_id='"+socketGlobal.userID+"'";
            conexion.query(sql1, function (err, result) {
              //conexion.release();//suelta la connection 
              if(result!==undefined){//SE CREA EL PERSONAJE Y EL STARTER
                var infoTM="Cambios realizados con exito";
                playerdata.personaje=data.personaje
                socketGlobal.emit("crearPlayerSucess",{info:infoTM,updatePlayer:playerdata});
              }else socketGlobal.emit("crearPlayerInfo","Error no se puede realizar esta accion, contacta con un ADMINISTRADOR");
            });
          }else if(result!==undefined && result.length>0) socketGlobal.emit("crearPlayerInfo","Error esta cuenta ya tienen starter");
          else socketGlobal.emit("crearPlayerInfo","Error en la caja de pokemon");
        });
      }//socketGlobal.emit("crearPlayerInfo","Error el pokemon que seleccionaste no es starter o no existe");
    }else socketGlobal.emit("crearPlayerInfo","Error el trainer que seleccionaste no existe para los usuarios");
  },
  //----SQL FUNCTIONS FOR TEAMMONSTERS
  teamSQL: function(SockID,conexion,userID){
    return new Promise((resolve,reject)=>{
      var monstersArr=[];
      var sqlTeam = "SELECT * FROM monsters WHERE user_current_owner = '"+userID+"' AND in_team > 0 ORDER BY in_team";
      //consultar
      conexion.query(sqlTeam, function (err, result) {
        //conexion.release();
        if (err) return reject(err);

        if(result!=undefined && result.length>6){
          var error=[];
          resolve(error);
        }
        else if(result!=undefined && result.length<=6)
        {
          for(var i=0;i<result.length;i++){
            var datas=new dataStats(result[i]);
            monstersArr[i]=new MonsterTeamBattle(result[i].monster_id,result[i].monster_num,result[i].monster_name,result[i].nivel,result[i].holditem_id,result[i].special,result[i].exp,result[i].genero,result[i].in_team,result[i].type_1,result[i].type_2,result[i].habilidad,result[i].mov_1,result[i].mov_2,result[i].mov_3,result[i].mov_4,datas)
          }
          resolve(monstersArr);
        }
      });
    });
  },
  //-------SQL FUNCTIONS FOR WILDMMONSTERS
  SelectWildMonSQL: function(SockID,conexion,arrayPlayer){
    return new Promise((resolve, reject) => {
      var wildArr=[];
      var sqlBattleWildMon = "SELECT * FROM temp_monsters WHERE user_owner='"+arrayPlayer.userID+"';";
      conexion.query(sqlBattleWildMon, function (err, result) {
        //conexion.release();
        if (err) return reject(err);
        if(result!=undefined){
          for(var i=0;i<result.length;i++){
            
            wildArr[i]=new WildMonsterBattle(result[i].temp_mon_id,result[i].temp_mon_num,result[i].temp_mon_special,result[i].temp_mon_name,result[i].catchable);
          }
          resolve(wildArr);
        }
        else
        {
          var error="Hubo un error al entrar en batalla con wild monster contacta con un ADMINISTRADOR";
          resolve(error);
        }
      });
    });
  },
  //------- GIVE EXP TO MONSTER
  GiveExpMonSQL: function(socketGlobal,conexion,qtyExp){
    return new Promise((resolve, reject) => {
      var sqlExpTeamMonBattle = "SELECT * FROM monsters WHERE monster_id='"+socketGlobal.monBattleID+"';";
      conexion.query(sqlExpTeamMonBattle, function (err, result) {
        if (err) return reject(err);
        if(result!=undefined){
          var newExp=result[0].exp+qtyExp;
          var sqlUpdateExpTeamMonBattle = "UPDATE monsters SET exp="+newExp+" WHERE monster_id='"+socketGlobal.monBattleID+"';";
          //--segunda consulta
          conexion.query(sqlUpdateExpTeamMonBattle, function (err, result) {
            //conexion.release();
            if (err) return reject(err);
            /*
            if(result!=undefined){
              console.log("Se subió de exp");
            }
            */
          })
          //---------------
        }
      })   
    });
  }
  //-------
}
//#############################################################################
//#############################################################################
//----OBJECTS NEEDED------USER
//#############################################################################
//#############################################################################

function Player(id,userID,mapCode){
	this.id=id;
	this.userID=userID;
	this.mapCode=mapCode;
  this.teamMonsters={};
}

//#############################################################################
//#############################################################################
//---OBJECTS NEEDED----MONSTERS-->SE ENVIA AL ENTRENADOR PARA DATOS DE COMBATE#
//#############################################################################
//#############################################################################
function MonsterTeamBattle(monsterID,monster_num,monstername,level,holditem,special,exp,genero,in_team,type_1,type_2,habilidad,mov1,mov2,mov3,mov4,data){
	this.monsterID=monsterID;
	this.monster_num=monster_num;
  this.altura=monsters.monster(monster_num).altura;
	this.monstername=monstername;
  this.level=level;
  this.holditem=holditem;
  this.special=special;
  this.exp=exp;
  this.genero=genero;
  this.in_team=in_team;
  this.type_1=type_1;
  this.type_2=type_2;
  
  
  this.habilidad=habilidad;
  
  this.mov1=moves.movimientos(mov1);
  this.mov2=moves.movimientos(mov2);
  this.mov3=moves.movimientos(mov3);
  this.mov4=moves.movimientos(mov4);
  

  this.ps=basicFunctions.StatPromedio(data,"ps");
  this.currHealth=this.ps;
  this.atk=basicFunctions.StatPromedio(data,"atk");
  this.def=basicFunctions.StatPromedio(data,"def");
  this.atk_es=basicFunctions.StatPromedio(data,"atk_es");
  this.def_es=basicFunctions.StatPromedio(data,"def_es");
  this.velocidad=basicFunctions.StatPromedio(data,"velocidad");
  

  
}
function WildMonsterBattle(monsterID,monster_num,special,monstername,catchable){
	this.monsterID=monsterID;
	this.monster_num=monster_num;
  this.special=special;
	this.monstername=monstername;
  this.catchable=catchable;
}
//STATS MONSTERS
function dataStats(data){
  var monster=monsters.monster(data.monster_num);
  this.nivel=data.nivel;
  
  this.base_ps=monster.stats.ps;
  this.base_atk=monster.stats.atk;
  this.base_def=monster.stats.def;
  this.base_atk_es=monster.stats.atk_es;
  this.base_def_es=monster.stats.def_es;
  this.base_velocidad=monster.stats.velocidad;
  
  this.iv_ps=data.iv_ps;
  this.iv_atk=data.iv_atk;
  this.iv_def=data.iv_def;
  this.iv_atk_es=data.iv_atk_es;
  this.iv_def_es=data.iv_def_es;
  this.iv_velocidad=data.iv_velocidad;
  
  this.ev_ps=data.ev_ps;
  this.ev_atk=data.ev_atk;
  this.ev_def=data.ev_def;
  this.ev_atk_es=data.ev_atk_es;
  this.ev_def_es=data.ev_def_es;
  this.ev_velocidad=data.ev_velocidad;
  
  this.naturaleza=data.naturaleza;  
}
