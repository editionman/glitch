var cls = require("./class");
var Utils = require('./utils.js');
var sql = require('./sql.js');
var Player;
module.exports = Player = cls.Class.extend({
  init: function(userID,username,categoria,mapCode,personaje,gold,cash) {
    this.userID = parseInt(userID);
    this.username = username;
    this.categoria = categoria;
    this.mapCode = mapCode;
    this.personaje = personaje;
    this.gold = gold;
    this.cash = cash;
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
    sql.UpdateMapCode(conexionSQL,{newMapCode:newMapCode,userID:this.userID});
  },
  updateGold:function(qtyGold,conexionSQL){//qtyGold is positive or negative if add o resta
    this.gold = this.gold + qtyGold;
    sql.UpdateGold(conexionSQL,{newGold:this.gold,userID:this.userID});
  },
  UpdateCash:function(qtyCash,conexionSQL){//qtyCash is positive or negative if add o resta
    this.cash = this.cash + qtyCash;
    sql.UpdateCash(conexionSQL,{newCash:this.cash,userID:this.userID});
  },
  updatePersonaje:function(newCharCode,conexionSQL){
    this.personaje = newCharCode;
    sql.UpdatePersonaje(conexionSQL,{newPersonajeCode:this.personaje,userID:this.userID});
  },
});
