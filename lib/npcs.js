var npcs={};

npcs[0]={
  name:"In Dev",
  moveType:"idle",//idle,slowrandom,fastrandom
  func:"story",//story,secondary,battle,season,event,teleport
}
npcs[1]={
  name:"Profesor Kukui",
  moveType:"idle",
  func:"story",//story,secondary,battle,season,event
  char:3,
  talk:[
    "Hello my name is Kukui",
    "you are new trainer? let me update you on what happened in the world...",
    "Before the catastrophe there were groups of trainers who did their best to take over the world.",
    "the pokemon police tried to eliminate these groups, but they were too many and every day more trainers joined them.",
    "one day, we do not know how or when, they managed to obtain a dark and destructive energy.",
    "when they discovered how powerful this energy was, they began to experiment more with it",
    "They created machines, objects and many other things that we are still investigating",
    "they began to experiment with this unstable energy there was an error and the world shook strongly",
    "after this event the pokemon began to act strangely, and many disappeared without a trace",
    "many researchers try to find a solution but so far we don't know anything.",
    "since you are a trainer you can help us with the investigation",
    "come see me if you discover something",
    //"hello trainer what did you discover?",
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
npcs[3]={
  name:"first map to second map",
  moveType:"idle",
  func:"teleport",
}
var exports = module.exports = npcs;