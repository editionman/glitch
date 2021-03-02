var cls = require("../data/class.js");
var basicFunctions = require("../basicFunctions.js");
var time;
//------------------------START--------------------
module.exports = time = cls.Class.extend({
  init: function() {
    this.current = setInterval(function(){
      var date=new Date();
      var self=this;
      this.dia=date.getDay();//basicFunctions.NameDay(date.getDay());
      this.hora=date.getHours();
      this.minuto= date.getMinutes();
      this.segundo= date.getSeconds();
      this.full=date.getTime();
    },1000);
  },
  getDayName:function(daynum){
    return basicFunctions.NameDay(daynum);
  },
  clear: function() {
    clearInterval(this.current);
  },
});
//-------------------------FIN---------------------
var exports = module.exports = time; 

