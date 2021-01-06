var maps={};
//------------------------START--------------------
maps[0]={
  mapname: "In Development",
  npcs: [
    [0,0,0,0,0,0,0],//id,posX,posY,posZ,rotX,rotY,rotZ
  ],
  areasMonsters:{
    [0]:{
      arrayMonster:[1,4,7],//ids de monstruos spameables
      arrayLevelMonster:[1,7],//ids de nivel de monsters del 1 al 7
      qtyMonster:3,//cantidad de monsters que spameara 3,
    }
    
  },
  maxPlayers:50,
  teleports:[1],//Teleports to next maps--mapCodes
}
maps[1]={
  mapname: "Mapa1",
  npcs: [
    [1,0,0,50,180,0,180],//id,posX,posY,posZ,rotX,rotY,rotZ
  ],
  areasMonsters:{
    [0]:{
      arrayMonster:[1,4,7,10],
      arrayLevelMonster:[1,7],
      qtyMonster:3,
    }
  },
  maxPlayers:50,
  teleports:[2],//Teleports to next maps--mapCodes
}






//-------------------------FIN---------------------
var exports = module.exports = maps;