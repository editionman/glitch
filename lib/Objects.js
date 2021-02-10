var newobject={};
var Utils=require("./utils.js");
var libMonsters = require("../data/monsters.js");
var exports = module.exports = newobject;
//*************************************************
//*************************************************
//|||||||||||||||||||USER||||||||||||||||||||||||||
//*************************************************
//*************************************************
newobject.playerBattle = function(data){
  return {
    user_id:data.user_id,
    user_name:data.user_name,
    categoria:data.categoria,
    personaje:data.personaje,
    team:{1:data.team[1],2:data.team[2],3:data.team[3],4:data.team[4],5:data.team[5],6:data.team[6]},
    
  };
};
newobject.PlayerServer = function(data){
  return {
    userID:data.user_id,
    user_name:data.user_name,
    mapCode:data.mapCode,
    battleMap:data.battleMap,
    nextMap:data.nextMap,
    party:data.party,
    wildMonster:data.wildMonster,
  };
};
//*************************************************
//*************************************************
//|||||||||||||||MONSTERS||||||||||||||||||||||||||
//*************************************************
//*************************************************
newobject.MonsterBasicInfo = function(data){
  return {
    monsterID:data.monster_id,
    monster_num:data.monster_num,
    monstername:data.monster_name,
    special:data.special,
    nivel:data.nivel,
    exp:data.exp,
    genero:data.genero,
    in_team:data.in_team,
    type_1:data.type_1,
    type_2:data.type_2,
  };
};
newobject.MonsterInfo = function(data){
  return {
    monsterID:data.monster_id,
    monster_num:data.monster_num,
    monstername:data.monster_name,
    special:data.special,
    user_current_owner:data.user_current_owner,
    user_owner:data.user_owner,
    in_team:data.in_team,
    genero:data.genero,
    type_1:data.type_1,
    type_2:data.type_2,
    exp:data.exp,
    nivel:data.nivel,
    naturaleza:data.naturaleza,
    habilidad:data.habilidad,
    holditem:data.holditem_id,
    mov_1:data.mov_1,
    mov_2:data.mov_2,
    mov_3:data.mov_3,
    mov_4:data.mov_4,
    iv_ps:data.iv_ps,
    iv_atk:data.iv_atk,
    iv_def:data.iv_def,
    iv_atk_es:data.iv_atk_es,
    iv_def_es:data.iv_def_es,
    iv_velocidad:data.iv_velocidad,
    ev_ps:data.ev_ps,
    ev_atk:data.ev_atk,
    ev_def:data.ev_def,
    ev_atk_es:data.ev_atk_es,
    ev_def_es:data.ev_def_es,
    ev_velocidad:data.ev_velocidad,
    base_ps:data.base_ps,
    base_atk:data.base_atk,
    base_def:data.base_def,
    base_atk_es:data.base_atk_es,
    base_def_es:data.base_def_es,
    base_velocidad:data.base_velocidad,
    ps:Utils.StatPromedio(data,"ps",libMonsters.monster[data.monster_num].stats.ps),
    atk:Utils.StatPromedio(data,"atk",libMonsters.monster[data.monster_num].stats.atk),
    def:Utils.StatPromedio(data,"def",libMonsters.monster[data.monster_num].stats.def),
    atk_es:Utils.StatPromedio(data,"atk_es",libMonsters.monster[data.monster_num].stats.atk_es),
    def_es:Utils.StatPromedio(data,"def_es",libMonsters.monster[data.monster_num].stats.def_es),
    velocidad:Utils.StatPromedio(data,"velocidad",libMonsters.monster[data.monster_num].stats.velocidad),
    mov_1:JSON.parse(data.mov_1),
    mov_2:JSON.parse(data.mov_2),
    mov_3:JSON.parse(data.mov_3),
    mov_4:JSON.parse(data.mov_4),
  };
};
newobject.MonsterBattle = function(data){
  return {
    monsterID:data.monster_id,
    monster_num:data.monster_num,
    monstername:data.monster_name,
    genero:data.genero,
    special:data.special,
    nivel:data.nivel,
    exp:data.exp,
    type_1:1,
    type_2:2,
    objeto:1,
    habilidad:321,
    naturaleza:1,
    status:{},//estatus en que se encuentra ejemplo 1=burned por 5 turnos
    canChangeStats:false,
    canChangeStatus:false,
    canChangeMonster:false,
    statsmodify:{
      hp:1,
      atk:1,
      def:1,
      atk_es:1,
      def_es:1,
      velocidad:1,
    },
    stats:{
      hp:1,//+this.monsterinbattle.statsmod.hp,
      atk:1,//+this.monsterinbattle.statsmod.atk,
      def:1,//+this.monsterinbattle.statsmod.def,
      atk_es:1,//+this.monsterinbattle.statsmod.atk_es,
      def_es:1,//+this.monsterinbattle.statsmod.def_es,
      velocidad:1,//+this.monsterinbattle.statsmod.velocidad,
    },
    currHP:0,
    maxHP:1,
  };
};
//*************************************************
//*************************************************
//|||||||||||||||||||ITEM||||||||||||||||||||||||||
//*************************************************
//*************************************************
newobject.itemInfo = function(data){
  return {
    item_id:data.item_id,
	  item_num:data.item_num,
	  item_name:data.item_name,
    item_type:data.item_type,
    user_owner:data.user_owner,
  };
};
