var monsterBattleEntity={};
var cls = require("./class");
var Utils = require('./utils.js');
var libMonsters = require("../monsters.js");
var uuid = require("uuid");
var creatorDB=require('./creatorDB.js');
var sql = require('./sql.js');
monsterBattleEntity = cls.Class.extend({
  init: function(data) {
    this.monster_id=null;
    this.monster_num=data.monsternum;
    this.monstername=data.monstername;
    this.special=data.special
    this.genero=data.gender;
    this.type_1=data.type_1;
    this.type_2=data.type_2;
    this.level=data.nivel;

    
    this.altura=libMonsters.monster[data.monsternum].altura;
    this.x=null;
    this.y=null;
    this.z=null;
    this.rotX=null;
    this.rotY=null;
    this.rotZ=null;
    
    this.ps=Utils.StatPromedio(data,"ps",libMonsters.monster[data.monsternum].stats.ps);
    this.atk=Utils.StatPromedio(data,"atk",libMonsters.monster[data.monsternum].stats.atk);
    this.def=Utils.StatPromedio(data,"def",libMonsters.monster[data.monsternum].stats.def);
    this.atk_es=Utils.StatPromedio(data,"atk_es",libMonsters.monster[data.monsternum].stats.atk_es);
    this.def_es=Utils.StatPromedio(data,"def_es",libMonsters.monster[data.monsternum].stats.def_es);
    this.velocidad=Utils.StatPromedio(data,"velocidad",libMonsters.monster[data.monsternum].stats.velocidad);
    this.mov_1=data.mov_1;
    this.mov_2=data.mov_2;
    this.mov_3=data.mov_3;
    this.mov_4=data.mov_4;
  },
  updateMonsterID:function(conexion,monid){
    this.monsterID=monid;
    creatorDB.UpdateMonsterID(conexion,this);
  },
  saveMonster:function(conexion){
    //datos que se guardaran en db
    var arrString=JSON.stringify(this);
    creatorDB.SaveMonster(conexion,this);
  }, 
  loadMonster:function(info){
    //datos que se guardaran en db
    if(info.monsterID)this.monsterID=info.monsterID;
    if(info.monstername)this.monstername=info.monstername;
    if(info.special)this.special=info.special;
  },
});
//---------------FIN----------------------
module.exports = monsterBattleEntity;