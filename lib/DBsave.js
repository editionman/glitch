var savesql={};
var exports = module.exports = savesql;
var Utils = require('./utils.js');
var Items = require('../data/items.js');


//*************************************************
//*************************************************
//|||||||||||||||||MONSTER|||||||||||||||||||||||||
//*************************************************
//*************************************************
savesql.SaveMonsterBatle= function(conexion,data){
  var newTeam={1:null,2:null,3:null,4:null,5:null,6:null};
  return new Promise((resolve,reject)=>{
    //conexion,userID,monID
/*	
monster_id
monster_num
monster_name
nivel
holditem_id
special
user_current_owner
user_owner
in_team
genero
type_1
type_2
exp
naturaleza
habilidad
mov_1
mov_2
mov_3
mov_4
allmoves
iv_ps
iv_atk
iv_def
iv_atk_es
iv_def_es
iv_velocidad
ev_ps
ev_atk
ev_def
ev_atk_es
ev_def_es
ev_velocidad
*/
    //var sql = "SELECT * FROM monsters WHERE user_current_owner =  '"+userID+"' AND monster_id= '"+monID+"'";
    var sql="UPDATE monsters SET nivel='"+data.nivel+"', exp='"+data.exp+"' WHERE user_current_owner =  '"+data.owner+"' AND monster_id='"+data.monster_id+"';";
    conexion.query(sql, function (err, result) {
      if (err) resolve({object:null,info:"ERROR DESCONOCIDO GUARDANDO DATOS DE MONSTER."});
      else{
        resolve({object:true,info:"Se guardó la información del monster."});
      }
    });
  });
};