var cls = require("../data/class.js");
var Utils = require('./utils.js');
var sql = require('./sql.js');
var libMonsters = require("../data/monsters.js");
var Data;
module.exports = Data = cls.Class.extend({
  init: function(enemy,owner,move) {
    this.monster_id=this.uid;
    this.monster_num=enemy.monster_num;
    this.monstername=libMonsters.monster[enemy.monster_num].monstername;
    //this.genero=Utils.ranGender();//si cambia de genero en batalla usar
    //this.type_1=libMonsters.monster[monsternum].type_1;//si cambia de tipo en batalla usar
    //this.type_2=libMonsters.monster[monsternum].type_2;//si cambia de tipo en batalla usar
    //this.spawn=spawn;//pensar si usarlo si es wild
    
    //this.altura=libMonsters.monster[monsternum].altura;//si te cambia de altura usar
    //this.ambiente=ambiente;//si cambia el ambiente usar---ejemplo trick room
    this.owner=null;
    
    ////multiplicador
    this.psMultipler=1;//se suma con lo que aumenta por ejemplo el doble *2=2, la mitad *0.5
    this.atkMultipler=1;
    this.defMultipler=1;
    this.atk_esMultipler=1;
    this.def_esMultipler=1;
    this.velocidadMultipler=1;
    //NIVELES
    this.psIncrease=0;//se suma un punto por nivel maximo +6
    this.psDecrease=0;//se suma un punto por nivel maximo +6
    this.atkIncrease=0;
    this.atkDecrease=0;
    this.defIncrease=0;
    this.defDecrease=0;
    this.atk_esIncrease=0;
    this.atk_esDecrease=0;
    this.def_esIncrease=0;
    this.def_esDecrease=0;
    this.velocidadIncrease=0;
    this.velocidadDecrease=0;
    //CAMBIOS HECHOS EN LOS STATS
    this.ps=this.s_ps*((3+this.psIncrease)/(3+this.psDecrease))*this.psMultipler;
    this.atk=this.s_atk*((3+this.atkIncrease)/(3+this.atkDecrease))*this.atkMultipler;
    this.def=this.s_def*((3+this.defIncrease)/(3+this.defDecrease))*this.defMultipler;
    this.atk_es=this.s_atk_es*((3+this.atk_esIncrease)/(3+this.atk_esDecrease))*this.atk_esMultipler;
    this.def_es=this.s_def_es*((3+this.def_esIncrease)/(3+this.def_esDecrease))*this.def_esMultipler;
    this.velocidad=this.s_velocidad*((3+this.velocidadIncrease)/(3+this.velocidadDecrease))*this.velocidadMultipler;
    
    this.currPS=enemy.currPS;
    this.state="none";
  },
});