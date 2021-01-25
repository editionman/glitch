var monsterEntity={};
var cls = require("./class");
var Utils = require('./utils.js');
var libMonsters = require("../monsters.js");
var uuid = require("uuid");
var sql = require('./sql.js');
monsterEntity = cls.Class.extend({
  init: function(info) {
    this.uid = uuid.v4();
    this.monsterID=info.monsterID;
    this.monster_num=info.monster_num;
    this.monstername=info.monstername;
    this.special=info.special;
    this.user_current_owner=info.user_current_owner;
    this.user_owner=info.user_owner;
    this.in_team=info.in_team;
    this.genero=info.genero;
    this.type_1=info.type_1;
    this.type_2=info.type_2;
    this.exp=info.exp;
    this.level=this.level;
    this.naturaleza=info.naturaleza;
    this.habilidad=info.habilidad;
    this.mov_1=info.mov_1;
    this.mov_2=info.mov_2;
    this.mov_3=info.mov_3;
    this.mov_4=info.mov_4;
    this.iv_ps=info.iv_ps;
    this.iv_atk=info.iv_atk;
    this.iv_def=info.iv_def;
    this.iv_atk_es=info.iv_atk_es;
    this.iv_def_es=info.iv_def_es;
    this.iv_velocidad=info.iv_velocidad;
    this.ev_ps=info.ev_ps;
    this.ev_atk=info.ev_atk;
    this.ev_def=info.ev_def;
    this.ev_atk_es=info.ev_atk_es;
    this.ev_def_es=info.ev_def_es;
    this.ev_velocidad=info.ev_velocidad;

    this.base_ps=libMonsters.monster[this.monsterID].stats.ps;
    this.base_atk=libMonsters.monster[this.monsterID].stats.atk;
    this.base_def=libMonsters.monster[this.monsterID].stats.def;
    this.base_atk_es=libMonsters.monster[this.monsterID].stats.atk_es;
    this.base_def_es=libMonsters.monster[this.monsterID].stats.def_es;
    this.base_velocidad=libMonsters.monster[this.monsterID].stats.velocidad;
    
    this.ps=Math.round(10+(this.level/100*((this.base_ps*2)+31+(0/4)))+this.level);
    this.atk=Math.round(5+(this.level/100*((this.base_atk*2)+31+(0/4)))*(1+0));
    this.def=Math.round(5+(this.level/100*((this.base_def*2)+31+(0/4)))*(1+0));
    this.atk_es=Math.round(5+(this.level/100*((this.base_atk_es*2)+31+(0/4)))*(1+0));
    this.def_es=Math.round(5+(this.level/100*((this.base_def_es*2)+31+(0/4)))*(1+0));
    this.velocidad=Math.round(5+(this.level/100*((this.base_velocidad*2)+31+(0/4)))*(1+0));
  },
  
});
//---------------FIN----------------------
module.exports = monsterEntity;