var maps={};
maps.world={};
maps.battle={};
//------------------------START--------------------
//*************************************************
//*************************************************
//|||||||||||||||||||WORLD|||||||||||||||||||||||||
//************************************************* 
//*************************************************
maps.world[0]={
  mapname: "In Development",
  npcs: [
    [0,0,0,0,0,0,0],//id,posX,posY,posZ,rotX,rotY,rotZ
  ],
  areasMonsters:{
    [0]:{
      arrayMonster:[1,4,7],//ids de monstruos spameables
      arrayLevelMonster:[1,7],//ids de nivel de monsters del 1 al 7
      qtyMonster:10,//cantidad de monsters que spameara 3,
    }
    
  },
  maxPlayers:50,
  teleports:[1],//Teleports to next maps--mapCodes
}
maps.world[1]={
  mapname: "Mapa1",
  npcs: [
    [1,0,0,50,180,0,180],//idNPC,posX,posY,posZ,rotX,rotY,rotZ
  ],
  areasMonsters:{
    [0]:{
      arrayMonster:[1,4,7,10,11,12],
      arrayLevelMonster:[1,7],
      qtyMonster:10,
    }
  },
  maxPlayers:50,
  teleports:[2],//Teleports to next maps--mapCodes
}
maps.world[2]={
  mapname: "Mapa2",
  npcs: [
    //[1,0,0,50,180,0,180],//idNPC,posX,posY,posZ,rotX,rotY,rotZ
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
//*************************************************
//*************************************************
//||||||||||||||||||BATTLE|||||||||||||||||||||||||
//*************************************************
//*************************************************
maps.battle[0]={
  mapname: "IN_DEV Battle Map",
  team_A:{},
  team_B:{},
  viewers:{},
  arbitros:{},
  clima:null,
  ambiente:0,
}
maps.battle[1]={
  mapname: "Grass Battle Map",
  team_A:{},
  team_B:{},
  viewers:{},
  arbitros:{},
  clima:null,
  ambiente:1,
}


//-------------------------FIN---------------------
var exports = module.exports = maps;

//EJEMPLO DE TEAM
var team_A={
  21312:{
    userid:21312,
    usernum:2,
    username:"dfsafa",
    monsterinbattle:{
      campo:{reflejo:5,pantallaluz:5,espacioraro:true},//aca viene todos los movimientos que afectan al campo como espacio raro,neblina,pantallaluz,reflejo,
      //en el campo tmb vienen los turnos de cuanto dura cada habilidad y se descuenta en cada turno
      //cuando es booleano quiere decir que no acaba el efecto en turnos sino que se desactiva con algun movimiento o habilidad
      objeto:1,
      habilidad:321,
      naturaleza:1,
      status:{1:5},//estatus en que se encuentra ejemplo 1=burned por 5 turnos
      canChangeStats:false,
      canChangeStatus:false,
      canChangeMonster:false,
      statsmod:{
        hp:1,
        atk:1,
        def:1,
        atk_es:1,
        def_es:1,
        velocidad:1,
      },
      stats:{
        hp:1,//+this.monsterinbattle.statsmod.hp,
        atk:1,//+this.monsterinbattle.statsmod.atk,
        def:1,//+this.monsterinbattle.statsmod.def,
        atk_es:1,//+this.monsterinbattle.statsmod.atk_es,
        def_es:1,//+this.monsterinbattle.statsmod.def_es,
        velocidad:1,//+this.monsterinbattle.statsmod.velocidad,
      },
      type_1:1,
      type_2:2,
    },
    team:{
      1:1,
      2:1,
      3:1,
      4:1,
      5:1,
      6:1,
    }
  },
}
//otro ejemplo de como empieza en partida
var team_B={
  21312:{
    userid:21312,
    usernum:2,
    username:"dfsafa",
    monsterinbattle:{},//aca viene datos de pokemon in battle-------------------POR AHORA ES PREFERIBLE QUE SEA EL MISMO OBJETO
    team:{
      1:{},//aca viene datos de pokemon team battle-----------------------------POR AHORA ES PREFERIBLE QUE SEA EL MISMO OBJETO
      2:{},
      3:{},
      4:{},
      5:{},
      6:{},
    }
  },
};
