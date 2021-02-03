var cls = require("../data/class.js");
var Utils = require('./utils.js');
var sql = require('./sql.js');
var Player;
module.exports = Player = cls.Class.extend({
  init: function(obj) {
    this.user_id = obj.user_id;//viene desde la db users
    this.user_name = obj.user_name;//viene desde la db users
    this.categoria = obj.categoria;
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
    this.team=obj.team;
    this.monsterBattle={};
    this.fieldBattle={monster:null,info:null};
    this.turno=true;
    this.host=false;
    this.battleParty=null;
    this.bag=null;
  },
});