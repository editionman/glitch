var sql={};
var exports = module.exports = sql;
//*************************************************
//*************************************************
//||||||||||||||||||UPDATES||||||||||||||||||||||||
//*************************************************
//*************************************************
sql.UpdateMapCode= function(conexion,data){
  var changeMap = "UPDATE users SET mapCode='"+data.newMapCode+"'"+" WHERE user_id='"+data.userID+"'";
  conexion.query(changeMap, function (err, result) {
    //conexion.release();
    if (err) return console.log(err);
  })
}
sql.UpdatePersonaje= function(conexion,data){
  var changePersonaje = "UPDATE users SET personaje='"+data.newPersonajeCode+"'"+" WHERE user_id='"+data.userID+"'";
  conexion.query(changePersonaje, function (err, result) {
    //conexion.release();
    if (err) return console.log(err);
  })
}
sql.UpdateGold= function(conexion,data){
  var changeGold = "UPDATE users SET gold='"+data.newGold+"'"+" WHERE user_id='"+data.userID+"'";
  conexion.query(changeGold, function (err, result) {
    //conexion.release();
    if (err) return console.log(err);
  })
}
sql.UpdateCash= function(conexion,data){
  var changeCash = "UPDATE users SET cash='"+data.newCash+"'"+" WHERE user_id='"+data.userID+"'";
  conexion.query(changeCash, function (err, result) {
    if (err) return console.log(err);
  })
}
//*************************************************
//*************************************************
//||||||||||||||LOGIN REGISTER|||||||||||||||||||||
//*************************************************
//*************************************************
sql.LoginSQL= function(conexion,data){
  var loginSQL = "SELECT * FROM users WHERE user_name =  '"+data.user+"' AND USER_password= '"+data.pass+"'";
  conexion.query(loginSQL, function (err, result) {
    if (err) return console.log(err);
  })
}

//*************************************************
//*************************************************
//||||||||||||||||CREATE BAG|||||||||||||||||||||||
//*************************************************
//*************************************************
sql.createBalls= function(conexion,data){
  //JSON.parse(stringfy)------------->para cambiar de texto a objeto
  var ballStarter={pokeball:6,superball:0,ultraball:0,masterball:0,safariball:0};
  var ballSQL = "INSERT INTO ballStorage (storage_id,user_owner,contenido) VALUES (NULL, '"+data.userID+"', '"+JSON.stringify(ballStarter)+"')";
  conexion.query(ballSQL, function (err, result) {
    if (err) return console.log(err);
  })
}