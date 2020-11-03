var teamMon=[];
var exports = module.exports = {
  
  speak: function() {
    return "Hello";
  },
  //----SQL FUNCTIONS FOR MONSTERS
  teamSQL: function(SockID,conexion,arrayPlayer){
    return new Promise((resolve,reject)=>{
      var monstersArr=[];
      var sqlTeam = "SELECT * FROM monsters WHERE user_current_owner = '"+arrayPlayer.userID+"' AND in_team > 0 ORDER BY in_team";
      //consultar
      conexion.query(sqlTeam, function (err, result) {
        if (err) return reject(err);

        if(result!=undefined && result.length>6){
          var error=[];
          resolve(error);
        }
        else if(result!=undefined && result.length<=6)
        {
          for(var i=0;i<result.length;i++){
            monstersArr[i]=new MonsterTeamBattle(result[i].monster_id,result[i].monster_num,result[i].monster_name,result[i].special,result[i].exp,result[i].genero,result[i].in_team,result[i].type_1,result[i].type_2)
          }
          resolve(monstersArr);
        }
      });
    });
  },
  //-------
  SelectWildMonSQL: function(SockID,conexion,arrayPlayer){
    return new Promise((resolve, reject) => {
      var wildArr=[];
      var sqlBattleWildMon = "SELECT * FROM temp_monsters WHERE user_owner='"+arrayPlayer.userID+"';";
      conexion.query(sqlBattleWildMon, function (err, result) {
        if (err) return reject(err);
        if(result!=undefined){
          for(var i=0;i<result.length;i++){
            wildArr[i]=new WildMonsterBattle(result[0].temp_mon_id,result[0].temp_mon_num,result[0].temp_mon_special,result[0].temp_mon_name,result[0].catchable);
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
  //-------
}
//#############################################################################
//#############################################################################
//----FUNCTIONS NEEDED
//#############################################################################
//#############################################################################
function MonsterTeamBattle(monsterID,monster_num,monstername,special,exp,genero,in_team,type_1,type_2){
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
function WildMonsterBattle(monsterID,monster_num,special,monstername,catchable){
	this.monsterID=monsterID;
	this.monster_num=monster_num;
  this.special=special;
	this.monstername=monstername;
  this.catchable=catchable;
}