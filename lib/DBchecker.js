var checkersql={};
var exports = module.exports = checkersql;
//*************************************************
//*************************************************
//|||||||||||||||||||USER||||||||||||||||||||||||||
//*************************************************
//*************************************************
checkersql.checkLogin= function(conexion,data){
  return new Promise((resolve,reject)=>{
    var sqlLogin = "SELECT * FROM users WHERE user_name =  '"+data.user+"' AND USER_password= '"+data.pass+"'";
    conexion.query(sqlLogin, function (err, result) {
      if (err) resolve({object:null,info:"ERROR DESCONOCIDO EN LOGIN."});
      if(result!=undefined && result.length==1){
        resolve({object:result,info:"correcto"});
      }
      else if(result!=undefined && result.length>1){
        var error="Existe un error de bug con este usuario, vuelve a intentar o consulta con un administrador";
        resolve({object:null,info:error});
      }else{
        var error="Usuario o Password Incorrecto";
        resolve({object:null,info:error});
      }
    });
  });
};
checkersql.checkBagGlobal= function(conexion,userid){
  return new Promise((resolve,reject)=>{
    var sqlLogin = "SELECT * FROM items WHERE user_owner = '"+userid+"'";
    conexion.query(sqlLogin, function (err, result) {
      if (err) resolve({object:null,info:"ERROR DESCONOCIDO EN CHECK BAG GLOBAL."});
      resolve({object:result,info:"SUCCESS"});
    });
  });
};
//*************************************************
//*************************************************
//|||||||||||||||||MONSTER|||||||||||||||||||||||||
//*************************************************
//*************************************************
checkersql.CheckTeam= function(conexion,userid){
  return new Promise((resolve,reject)=>{
    var sqlTeam = "SELECT * FROM monsters WHERE user_current_owner = '"+userid+"' AND in_team > 0 ORDER BY in_team";
    conexion.query(sqlTeam, function (err, result) {
      if (err) resolve({object:null,info:"ERROR DESCONOCIDO EN CHECK TEAM."});
      resolve({object:result,info:"SUCCESS"});
    });
  });
};
checkersql.CheckAllMonsters= function(conexion,userid){
  return new Promise((resolve,reject)=>{
    var sqlMons = "SELECT * FROM monsters WHERE user_current_owner = '"+userid+"'";
    conexion.query(sqlMons, function (err, result) {
      if (err) resolve({object:null,info:"ERROR DESCONOCIDO EN CHECK MONSTERS."});
      resolve({object:result,info:"SUCCESS"});
    });
  });
};
checkersql.CheckProfileMonster= function(conexion,userid,monid){
  return new Promise((resolve,reject)=>{
    var sqlMon = "SELECT * FROM monsters WHERE user_current_owner = '"+userid+"' AND monster_id = '"+monid+"'";
    conexion.query(sqlMon, function (err, result) {
      if (err) resolve({object:null,info:"ERROR DESCONOCIDO EN PROFILE MONSTER."});
      resolve({object:result,info:"SUCCESS"});
    });
  });
};

//*************************************************
//*************************************************
//||||||||||||||||||||BAG||||||||||||||||||||||||||
//*************************************************
//*************************************************
checkersql.CheckBagBattle= function(conexion,userid){
  return new Promise((resolve,reject)=>{
    var sqlMon = "SELECT * FROM items WHERE user_owner = '"+userid+"' AND item_battle > 0";
    conexion.query(sqlMon, function (err, result) {
      if (err) resolve({object:null,info:"ERROR DESCONOCIDO EN BAG BATTLE."});
      resolve({object:result,info:"SUCCESS"});
    });
  });
};
//*************************************************
//*************************************************
//|||||||||||||||||MONSTER|||||||||||||||||||||||||
//*************************************************
//*************************************************
checkersql.CheckMonsterToBatle= function(conexion,data){
  return new Promise((resolve,reject)=>{
    var sqlMon= "SELECT * FROM monsters WHERE user_owner = '"+data.userid+"' AND monster_id = '"+data.monid+"' AND in_team > 0";
    conexion.query(sqlMon, function (err, result) {
      if (err) resolve({object:null,info:"ERROR DESCONOCIDO EN BAG BATTLE."});
      resolve({object:result,info:"SUCCESS"});
    });
  });
};