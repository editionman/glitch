var monsterEntity={};
var cls = require("../data/class.js");
var Utils = require('./utils.js');
var libMonsters = require("../data/monsters.js");
var uuid = require("uuid");
var creatorDB=require('./DBcreator.js');
var sql = require('./sql.js');
monsterEntity = cls.Class.extend({
  init: function(monsternum,level,spawn,ambiente) {
    this.uid = uuid.v4();
    this.monster_num=monsternum;
    this.monstername=libMonsters.monster[monsternum].monstername;
    this.special=Utils.probabilidadShiny();
    this.genero=Utils.ranGender();
    this.type_1=libMonsters.monster[monsternum].type_1;
    this.type_2=libMonsters.monster[monsternum].type_2;
    this.level=level;
    
    this.inBattle=false;
    this.rival=null;
    this.spawn=spawn;
    
    this.altura=libMonsters.monster[monsternum].altura;
    this.x=null;
    this.y=null;
    this.z=null;
    this.rotX=null;
    this.rotY=null;
    this.rotZ=null;
    this.animStatus = 'idle';
    this.party=null;
    this.ambiente=ambiente;//mapa donde peleara el wild
    //este creo que es temporal por que va a ser del obj de batalla y este es de world
    this.owner=null;
    this.battleParty=null;
    this.party=null;
    this.monster_id=this.uid;
    
    //this.
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
module.exports = monsterEntity; 