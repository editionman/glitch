var turnactions={};
var exports = module.exports = turnactions;
//*************************************************
//*************************************************
//|||||||||||||||||||USER||||||||||||||||||||||||||
//*************************************************
//*************************************************
turnactions.newMovement= function(allactions){
  return new Promise((resolve,reject)=>{
    console.log(allactions);
    console.log("SE EJECUTA EL PRIMER MOVIMIENTO");
  });
};
turnactions.checkAllReady= function(playersObj){
  return new Promise((resolve,reject)=>{
    var ready=true;
    Object.keys(playersObj).find((id)=>{
      console.log("CHECK ALL READY BATTLE TURN ACTIONS: "+playersObj[id].turn);
      if(playersObj[id].turn===true){
        ready=false;
      }
    });
    resolve(ready);
  });
};
/*
turnactions.CheckAllMonsters= function(conexion,userid){
  return new Promise((resolve,reject)=>{
    var sqlMons = "SELECT * FROM monsters WHERE user_current_owner = '"+userid+"'";
    conexion.query(sqlMons, function (err, result) {
      if (err) resolve({object:null,info:"ERROR DESCONOCIDO EN CHECK MONSTERS."});
      resolve({object:result,info:"SUCCESS"});
    });
  });
};
turnactions.CheckProfileMonster= function(conexion,userid,monid){
  return new Promise((resolve,reject)=>{
    var sqlMon = "SELECT * FROM monsters WHERE user_current_owner = '"+userid+"' AND monster_id = '"+monid+"'";
    conexion.query(sqlMon, function (err, result) {
      if (err) resolve({object:null,info:"ERROR DESCONOCIDO EN PROFILE MONSTER."});
      resolve({object:result,info:"SUCCESS"});
    });
  });
};
*/
