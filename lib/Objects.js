var newobject={};
var Utils=require("./utils.js");
var exports = module.exports = newobject;
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
    prom_ps:Utils.StatPromedio(data,"ps"),
    prom_atk:Utils.StatPromedio(data,"atk"),
    prom_def:Utils.StatPromedio(data,"def"),
    prom_atk_es:Utils.StatPromedio(data,"atk_es"),
    prom_def_es:Utils.StatPromedio(data,"def_es"),
    prom_velocidad:Utils.StatPromedio(data,"velocidad"),
    mov_1:data.mov_1,
    mov_2:data.mov_2,
    mov_3:data.mov_3,
    mov_4:data.mov_4,
  };
};
newobject.MonsterBattle = function(data){
  return {
    monsterID:data.monster_id,
    monster_num:data.monster_num,
    monstername:data.monster_name,
    special:data.special,
    exp:data.exp,
    genero:data.genero,
    in_team:data.in_team,
    type_1:data.type_1,
    type_2:data.type_2,
  };
};