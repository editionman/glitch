var creatorsql={};
var exports = module.exports = creatorsql;
var Utils = require('./utils.js');
var Items = require('../data/items.js');

//*************************************************
//*************************************************
//||||||||||||||||||||USER|||||||||||||||||||||||||
//*************************************************
//*************************************************
creatorsql.registerSQL= function(conexion,data){
  var newTeam={1:null,2:null,3:null,4:null,5:null,6:null};
  return new Promise((resolve,reject)=>{
    var sql1 = "SELECT * FROM users WHERE user_name =  '"+data.user+"' OR user_email= '"+data.email+"'";
    var sql2 = "INSERT INTO users (user_id, user_name, user_password, user_email, team) VALUES (NULL, '"+data.user+"', '"+data.pass+"', '"+data.email+"', '"+JSON.stringify(newTeam)+"')";
    conexion.query(sql1, function (err, result) {
      if (err) resolve({object:null,info:"ERROR DESCONOCIDO EN REGISTER."});
      if(result!=undefined && result.length>1){
        resolve({object:null,info:"Este usuario y correo ya estan registrados, intenta con otros."});
      }
      
      else if(result!=undefined && result.length==1){
        resolve({object:null,info:"Este usuario o correo ya esta registrados"});
      }else{
        conexion.query(sql2, function (err, result) {
          if(result!=undefined){
            resolve({object:"registerSuccess",info:"Felicidades, tu cuenta a sido creada!"});
          }else{
            resolve({object:null,info:"Error desconocido al crear cuenta, consulta con un administrador"});
          }
        });
      }
    });
  });
};
creatorsql.CreateStarterTrainer= function(conexion,personajeNum,data,plr){
  var slot=Utils.getTeamPosition(plr.team);//regresa del 1 al 6 si hay slot vacio sino regresa null
  var sql1="";
  var sql2="";
  return new Promise((resolve,reject)=>{
    if(slot!==null){
      sql1="INSERT INTO monsters(monster_id,monster_num,monster_name,nivel,exp,special,user_current_owner,user_owner,in_team,genero,type_1,type_2,naturaleza,habilidad,mov_1,mov_2,mov_3,mov_4,allmoves,iv_ps,iv_atk,iv_def,iv_atk_es,iv_def_es,iv_velocidad) VALUES (NULL,'"+data.monster_num+"','"+data.monstername+"','"+data.nivel+"',"+0+",0,'"+plr.user_id+"','"+plr.user_id+"',"+slot+","+data.genero+","+data.type_1+","+data.type_2+","+data.naturaleza+","+data.habilidad+",'"+JSON.stringify(data.mov_1)+"','"+JSON.stringify(data.mov_2)+"','"+JSON.stringify(data.mov_3)+"','"+JSON.stringify(data.mov_4)+"','"+JSON.stringify(data.allMoves)+"',"+data.iv_ps+","+data.iv_atk+","+data.iv_def+","+data.iv_atk_es+","+data.iv_def_es+","+data.iv_velocidad+");";
    }
    else{
      sql1="INSERT INTO monsters(monster_id,monster_num,monster_name,nivel,exp,special,user_current_owner,user_owner,in_team,genero,type_1,type_2,naturaleza,habilidad,mov_1,mov_2,mov_3,mov_4,allmoves,iv_ps,iv_atk,iv_def,iv_atk_es,iv_def_es,iv_velocidad) VALUES (NULL,'"+data.monster_num+"','"+data.monstername+"','"+data.nivel+"',"+0+",0,'"+plr.user_id+"','"+plr.user_id+"',"+0+","+data.genero+","+data.type_1+","+data.type_2+","+data.naturaleza+","+data.habilidad+",'"+JSON.stringify(data.mov_1)+"','"+JSON.stringify(data.mov_2)+"','"+JSON.stringify(data.mov_3)+"','"+JSON.stringify(data.mov_4)+"','"+JSON.stringify(data.allMoves)+"',"+data.iv_ps+","+data.iv_atk+","+data.iv_def+","+data.iv_atk_es+","+data.iv_def_es+","+data.iv_velocidad+");";
    }
    conexion.query(sql1, function (err, result) {
      if (err) resolve({object:null,info:"ERROR DESCONOCIDO EN CREAR STARTER 1."});
      else if(slot!==null)
      {
        plr.updatePersonaje(personajeNum);
        plr.updateTeamMonster(slot,result.insertId);
        var itemNum=20//numero de la pokeball itemid
        var itemPokeball=Items[itemNum];
        var qty=6;//cantidad de balls
        sql2="UPDATE users SET personaje='"+plr.personaje+"', team='"+JSON.stringify(plr.team)+"' WHERE user_id='"+plr.user_id+"';";
        sql2+="INSERT INTO items(item_id,user_owner,item_name,item_num,item_qty,item_type,item_battle,held_item) VALUES (NULL,'"+plr.user_id+"','"+itemPokeball.item_name+"',"+itemNum+",'"+qty+"','"+itemPokeball.item_type+"',"+itemPokeball.item_battle+","+itemPokeball.held_item+");";
        conexion.query(sql2, function (err2, result2) {
          if (err2) resolve({object:null,info:"ERROR DESCONOCIDO EN CREAR STARTER 2."});
          resolve({object:"crearPlayerSucess",info:"Cambios realizados con exito"})
        });
      }
    });
  });
};
//*************************************************
//*************************************************
//|||||||||||||||||MONSTER|||||||||||||||||||||||||
//*************************************************
//*************************************************
creatorsql.CreateMonsterBatle= function(conexion,data){
  var newTeam={1:null,2:null,3:null,4:null,5:null,6:null};
  return new Promise((resolve,reject)=>{
    
  });
};