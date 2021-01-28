var checkersql={};
var exports = module.exports = checkersql;

checkersql.CheckTeam= function(conexion,userid){
  return new Promise((resolve,reject)=>{
    var sqlTeam = "SELECT * FROM monsters WHERE user_current_owner = '"+userid+"' AND in_team > 0 ORDER BY in_team";
    conexion.query(sqlTeam, function (err, result) {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
checkersql.CheckAllMonsters= function(conexion,userid){
  return new Promise((resolve,reject)=>{
    var sqlMons = "SELECT * FROM monsters WHERE user_current_owner = '"+userid+"'";
    conexion.query(sqlMons, function (err, result) {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
checkersql.CheckProfileMonster= function(conexion,userid,monid){
  return new Promise((resolve,reject)=>{
    var sqlMon = "SELECT * FROM monsters WHERE user_current_owner = '"+userid+"' AND monster_id = '"+monid+"'";
    conexion.query(sqlMon, function (err, result) {
      if (err)return reject(err);
      resolve(result);
    });
  });
};