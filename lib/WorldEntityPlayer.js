var cls = require("../data/class.js");
var Utils = require('./utils.js');
var sql = require('./sql.js');
var Player;
module.exports = Player = cls.Class.extend({
  init: function(obj) {
    this.user_id = obj.user_id.toString();//viene desde la db users
    this.user_name = obj.user_name;//viene desde la db users
    this.categoria = obj.categoria;
    this.mapCode = obj.mapCode;//al pimer mapa
    this.personaje = obj.personaje;
    this.gold = obj.gold;
    this.cash = obj.cash;
    this.userX = null;
    this.userY = null;
    this.userZ = null;
    this.userRotX = null;
    this.userRotY = null;
    this.userRotZ = null;
    this.userBodyRotX = null;
    this.userBodyRotY = null;
    this.userBodyRotZ = null;
    this.animStatus = 'idle';
    this.speed=30;
    this.speedAcelerate=40*1.5;
    this.inBattle=false;
    this.wildMon=null;
    //SE AGREGO NUEVO PARA INTENTAR
    this.host=false;
    this.maxMonsterNum=obj.maxMonsterNum;;
    this.currMonsterNum=obj.currMonsterNum;
    this.team=JSON.parse(obj.team);
    //this.team=(Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue';
    this.nextMap=null;
    this.party=obj.user_id;
  },
  changeAnimStatus:function(newAnimStatus){
    this.animStatus = newAnimStatus;
  },
  changeInBattle:function(){
    this.inBattle = !this.inBattle;
  },
  updateMap:function(conexion,newMapCode){
    this.mapCode = newMapCode;
  },
  updateGold:function(conexion,qtyGold){//qtyGold is positive or negative if add o resta
    this.gold = this.gold + qtyGold;
  },
  UpdateCash:function(conexion,qtyCash){//qtyCash is positive or negative if add o resta
    this.cash = this.cash + qtyCash;
  },
  updatePersonaje:function(newCharCode){
    this.personaje = newCharCode;
  },
  
  updateTeamMonster:function(slot,id){
    this.team[slot]=id;
  },
  
  //ON EXIT
  updateStatPlayerDB:function(conexion,nameobj,value){
    this[nameobj]=value;
    sql.UpdatePlayer(conexion,this,nameobj);
  },
  savePlayerDB:function(conexion){
    sql.SavePlayer(conexion,this);
  },
});