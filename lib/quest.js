var cls = require("./class");
var quest={};

module.exports = quest = cls.Class.extend({
  init:function(userID,username,quest){
    this.name="First PokeBalls";
    this.ownerID=userID;
    this.ownerName=username;
    this.quest=quest;
    this.finishStatus=2;
    this.status=0;
    this.posX=10;
    this.posY=20;
    this.posZ=0;
    this.rotX=10;
    this.rotY=20;
    this.rotZ=0;
  },

  talk:{
    0:["Hi trainer my name is Jhon"],
    1:["What is your name?"],
    2:["Hi "+this.ownerName+" Take this gift for you."],
    3:["callback to gift 5 pokeballs"],
  },
  
})