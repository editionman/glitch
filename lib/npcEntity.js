var npcEntity={};
var cls = require("./class");
var Utils = require('./utils.js');
var uuid = require("uuid");
var sql = require('./sql.js');

npcEntity = cls.Class.extend({
  init: function(name,moveType,char) {
    this.uid = uuid.v4();;
    this.name = name;
    this.char=char;
    this.pX = null;
    this.pY = null;
    this.pZ = null;
    this.rX = null;
    this.rY = null;
    this.rZ = null;
    this.bRotX = null;
    this.bRotY = null;
    this.bRotZ = null;
    this.moveType = moveType;
    this.animStatus = 'idle';
    this.speed=30;
    this.speedAcelerate=40*1.5;
    //this.team=(Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue';
    //this.active=false;
  },
  changeAnimStatus:function(newAnimStatus){
    this.animStatus = newAnimStatus;
  },
  updatePersonaje:function(newCharCode,conexionSQL){
    this.personaje = newCharCode;
    sql.UpdatePersonaje(conexionSQL,{newPersonajeCode:this.personaje,userID:this.userID});
  },
});
//---------------FIN----------------------
module.exports = npcEntity;