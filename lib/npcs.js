var npcs={};

npcs[0]={
  name:"In Dev",
  moveType:"idle",//idle,slowrandom,fastrandom
  func:"story",//story,secondary,battle,season,event
}
npcs[1]={
  name:"Profesor Kukui",
  moveType:"idle",
  func:"story",//story,secondary,battle,season,event
  char:3,
  talk:[
    "Hello Trainer, Welcome im Profesor Kukui",
    "You want to go InDev town?",
  ],
  quests: [1,2],//al completarse el actual sigue con el siguiente y asi sucesivamente
  reward:["teleport",2],//transporta al mapa 2
}
npcs[2]={
  name:"Farmer Fred",
  moveType:"idle",
  func:"secondary",
  talk:[
    "Hello Trainer, Im Fred and need help",
    "You can help me?",
  ],
  quests: [3],//al completarse el actual sigue con el siguiente y asi sucesivamente
}
var exports = module.exports = npcs;