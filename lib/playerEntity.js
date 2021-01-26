var cls = require("./class");
var Utils = require('./utils.js');
var sql = require('./sql.js');
var Player;
module.exports = Player = cls.Class.extend({
  init: function(obj) {
    this.userID = obj.user_id;//viene desde la db users
    this.username = obj.user_name;//viene desde la db users
    this.categoria = 0;//obj.categoria;
    this.mapCode = 1//obj.mapCode;//al pimer mapa
    this.personaje = 0;//obj.personaje;
    this.gold = 0;//obj.gold;
    this.cash = 0;//obj.cash;
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
    this.host=false;
    this.wildMon=null;
    //SE AGREGO NUEVO PARA INTENTAR
    this.maxMonsterNum=300;
    this.currMonsterNum=0;
    this.team={};
    //this.team=(Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue';
  },
  changeAnimStatus:function(newAnimStatus){
    this.animStatus = newAnimStatus;
  },
  changeInBattle:function(){
    this.inBattle = !this.inBattle;
  },
  updateMap:function(newMapCode,conexionSQL){
    this.mapCode = newMapCode;
  },
  updateGold:function(qtyGold,conexionSQL){//qtyGold is positive or negative if add o resta
    this.gold = this.gold + qtyGold;
  },
  UpdateCash:function(qtyCash){//qtyCash is positive or negative if add o resta
    this.cash = this.cash + qtyCash;
  },
  updatePersonaje:function(newCharCode){
    this.personaje = newCharCode;
  },
  //ON START
  loadPlayer:function(info){
    //this.username = info.user_name;
    if(info.categoria)this.categoria = info.categoria;
    if(info.mapCode)this.mapCode = info.mapCode;
    if(info.personaje)this.personaje = info.personaje;
    if(info.gold)this.gold = info.gold;
    if(info.cash)this.cash = info.cash;
    if(info.maxMonsterNum)this.maxMonsterNum = info.maxMonsterNum;
    if(info.currMonsterNum)this.currMonsterNum = info.currMonsterNum;
    if(info.team)this.team = info.team;
  },
  //ON EXIT
  savePlayer:function(conexion){
    //datos que se guardaran en db
    var arrString=JSON.stringify(this);
    sql.SavePlayer(conexion,arrString,this.userID);
  },
});
