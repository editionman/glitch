var monsterBattleEntity={};
var cls = require("../data/class.js");
var Utils = require('./utils.js');
var libMonsters = require("../data/monsters.js"); 
var uuid = require("uuid");
var creatorDB=require('./DBcreator.js');
var sql = require('./sql.js');
monsterBattleEntity = cls.Class.extend({
  init: function(data) {
    this.monster_id=data.monster_id;
    this.monster_num=data.monster_num;
    this.monstername=data.monster_name;
    this.special=data.special
    this.genero=data.genero;
    this.type_1=data.type_1;
    this.type_2=data.type_2;
    this.nivel=data.nivel;

    this.altura=libMonsters.monster[data.monster_num].altura;
    this.x=null;
    this.y=null;
    this.z=null;
    this.rotX=null;
    this.rotY=null;
    this.rotZ=null;
    
    this.ps=Utils.StatPromedio(data,"ps",libMonsters.monster[data.monster_num].stats.ps);
    this.atk=Utils.StatPromedio(data,"atk",libMonsters.monster[data.monster_num].stats.atk);
    this.def=Utils.StatPromedio(data,"def",libMonsters.monster[data.monster_num].stats.def);
    this.atk_es=Utils.StatPromedio(data,"atk_es",libMonsters.monster[data.monster_num].stats.atk_es);
    this.def_es=Utils.StatPromedio(data,"def_es",libMonsters.monster[data.monster_num].stats.def_es);
    this.velocidad=Utils.StatPromedio(data,"velocidad",libMonsters.monster[data.monster_num].stats.velocidad);
    
    this.mov_1=JSON.parse(data.mov_1);
    this.mov_2=JSON.parse(data.mov_2);
    this.mov_3=JSON.parse(data.mov_3);
    this.mov_4=JSON.parse(data.mov_4);
    
    this.owner=data.user_current_owner;
    //this.battleParty=null;
    //this.party=null; 
  },
});
//---------------FIN----------------------
module.exports = monsterBattleEntity;