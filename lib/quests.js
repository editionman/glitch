var quests={};
//------------------------START--------------------
quests[0]={
  questname: "In Development",
  description:"Desc In Development",
  func:"talk",//que hace
  args:[2],
  onInit:[
    "Text1",
    "Text2",
  ],
  onprogress:[
    "Text1",
    "Text2",
  ],
  oncomplete:[
    "Text1",
    "Text2",
  ],
  oninactive:[
    "Text1",
    "Text2",
  ],
}
quests[1]={
  questname: "Profesor Kukui",
  description:"Start in game",
  func:"teleport",
  args:[2],//al ser func teleport y args 2 quiere decir que transporta al mapa numero 2
  reward:"coins de 2 a 5",
  onInit:[
    "Text1",
    "Text2",
  ],
  onprogress:[
    "Text1",
    "Text2",
  ],
  oncomplete:[
    "Text1",
    "Text2",
  ],
  oninactive:[
    "Text1",
    "Text2",
  ],
}
quests[2]={
  questname: "Farmer Fred",
  description:"Help the farmer",
  func:"defeat",
  args:[10,5],//al ser func defeat y args 10,5 quiere decir que derrotes al monster 10 osea caterpie 5 veces
  reward:"coins de 2 a 5",
  onInit:[
    "Text1",
    "Text2",
  ],
  onprogress:[
    "Text1",
    "Text2",
  ],
  oncomplete:[
    "Text1",
    "Text2",
  ],
  oninactive:[
    "Text1",
    "Text2",
  ],
}





//-------------------------FIN---------------------
var exports = module.exports = quests;