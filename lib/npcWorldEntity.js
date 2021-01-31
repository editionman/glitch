var npcEntity={};
var cls = require("../data/class.js");
var Utils = require('./utils.js');
var uuid = require("uuid");
var sql = require('./sql.js');

npcEntity = cls.Class.extend({
  init: function(name,moveType,char,func,idnpc) {
    this.uid = uuid.v4();;
    this.name = name;
    this.char=char;
    this.func=func;
    this.idnpc=idnpc;
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
    this.activeQuest=null;
    //this.team=(Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue';
    //this.active=false;
  },
  changeAnimStatus:function(newAnimStatus){
    this.animStatus = newAnimStatus;
  },
  questActive:function(conexionSQL,userID,npcInfo){
    return new Promise((resolve,reject)=>{
      sql.searchQuest(conexionSQL,{user:userID,npc:npcInfo}).then((activeQuest)=>{
        resolve(activeQuest);
      });
    });
  },
});
//---------------FIN----------------------
module.exports = npcEntity;