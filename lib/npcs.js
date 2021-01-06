var npcs={};

npcs[0]={
  name:"In Dev",
  moveType:"idle",
}
npcs[1]={
  name:"Profesor Kukui",
  moveType:"idle",
  char:3,
  talk:[
    "Hello Trainer, Welcome im Profesor Kukui",
    "You want to go InDev town?",
  ],
  quests: [1],//al completarse el actual sigue con el siguiente y asi sucesivamente
  reward:["teleport",2],//transporta al mapa 2
}
npcs[2]={
  name:"Farmer Fred",
  moveType:"idle",
  talk:[
    "Hello Trainer, Im Fred and need help",
    "You can help me?",
  ],
  quests: [2],//al completarse el actual sigue con el siguiente y asi sucesivamente
}
var exports = module.exports = npcs;