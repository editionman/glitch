var monsterEntity={};
var cls = require("./class");
var Utils = require('./utils.js');
var libMonsters = require("../monsters.js");
var uuid = require("uuid");
var sql = require('./sql.js');
monsterEntity = cls.Class.extend({
  init: function(monsternum,userid) {
    //this.uid = uuid.v4(); 
    this.monsterID=null;
    this.monster_num=monsternum;
    this.monstername=libMonsters.monster[monsternum].monstername;
    this.special=Utils.probabilidadShiny();
    this.user_current_owner=userid;
    this.user_owner=userid;
    this.in_team=0;
    this.genero=Utils.ranGender();
    this.type_1=libMonsters.monster[monsternum].type_1;
    this.type_2=libMonsters.monster[monsternum].type_2;
    this.exp=0;
    this.level=1;
    this.naturaleza=Utils.ranNaturaleza();
    this.habilidad=Utils.ranHabilidad(libMonsters.monster[monsternum].habilidades);
    
    this.mov_1=libMonsters.monster[monsternum].movimientos[0][0];
    this.mov_2=libMonsters.monster[monsternum].movimientos[0][0];
    this.mov_3=libMonsters.monster[monsternum].movimientos[0][0];
    this.mov_4=libMonsters.monster[monsternum].movimientos[0][0];
    
    this.iv_ps=Utils.ranIV();
    this.iv_atk=Utils.ranIV();
    this.iv_def=Utils.ranIV();
    this.iv_atk_es=Utils.ranIV();
    this.iv_def_es=Utils.ranIV();
    this.iv_velocidad=Utils.ranIV();
    this.ev_ps=0;
    this.ev_atk=0;
    this.ev_def=0;
    this.ev_atk_es=0;
    this.ev_def_es=0;
    this.ev_velocidad=0;

    this.base_ps=libMonsters.monster[this.monster_num].stats.ps;
    this.base_atk=libMonsters.monster[this.monster_num].stats.atk;
    this.base_def=libMonsters.monster[this.monster_num].stats.def;
    this.base_atk_es=libMonsters.monster[this.monster_num].stats.atk_es;
    this.base_def_es=libMonsters.monster[this.monster_num].stats.def_es;
    this.base_velocidad=libMonsters.monster[this.monster_num].stats.velocidad;
    
    this.ps=Math.round(10+(this.level/100*((this.base_ps*2)+this.iv_ps+(this.ev_ps/4)))+this.level);
    this.atk=Math.round(5+(this.level/100*((this.base_atk*2)+this.iv_atk+(this.ev_atk/4)))*(1+0));//al final multiplica por la potencia de la naturaleza que es de neutral=1---favor=1.25----contra=0.75
    this.def=Math.round(5+(this.level/100*((this.base_def*2)+this.iv_def+(this.ev_def/4)))*(1+0));
    this.atk_es=Math.round(5+(this.level/100*((this.base_atk_es*2)+this.iv_atk_es+(this.ev_atk_es/4)))*(1+0));
    this.def_es=Math.round(5+(this.level/100*((this.base_def_es*2)+this.iv_def_es+(this.ev_def_es/4)))*(1+0));
    this.velocidad=Math.round(5+(this.level/100*((this.base_velocidad*2)+this.iv_velocidad+(this.ev_velocidad/4)))*(1+0));
  },
  updateMonsterID:function(conexion,monid){
    this.monsterID=monid;
    sql.UpdateMonsterID(conexion,this);
  },
  saveMonster:function(conexion){
    //datos que se guardaran en db
    var arrString=JSON.stringify(this);
    sql.SaveMonster(conexion,this);
  },
  loadMonster:function(info){
    //datos que se guardaran en db
    if(info.monsterID)this.monsterID=info.monsterID;
  },
});
//---------------FIN----------------------
module.exports = monsterEntity;