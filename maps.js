//itemStorage....contenido|||itemid,qty
var exports = (module.exports = {
  getMap: function(mapid) {
    //Define Variables
    var map = {
      mapname: "In Development",
      mapcode: 0,
      monsters: {
        ps: 45,
        atk: 49,
        def: 49,
        atk_es: 65,
        def_es: 65,
        velocidad: 45
      },
      npcs: {
        //1: [65, 65], //normal
        //2: 34 //oculta
      },
      players:{}
    };
    //DANDO CONTENIDO A LAS VARIABLES
    //start de item
    if (mapid === 1) {
      map = {
        mapname: "EnPrueba1",
        mapcode: 1,
        monsters: {
          mon1: 1,
          mon2: 1,
          mon3: 1,
          mon4: 4,
          mon5: 4,
          mon6: 7,
        },
        npcs: {
          //1: [65, 65], //normal
          //2: 34 //oculta
        },
        players:{}
      };
    }
    if (mapid === 2) {
      map = {
        mapname: "EnPrueba2",
        mapcode: 2,
        monsters: {
          mon1: 1,
          mon2: 1,
          mon3: 1,
          mon4: 4,
          mon5: 4,
          mon6: 7,
        },
        npcs: {
          //1: [65, 65], //normal
          //2: 34 //oculta
        },
        players:{}
      };
    }
    return map;
    //FIN DE MAP######################################################
  },
}); //fin del export

//calculo de energia necesaria para usar un movimiento
function energyNeed(a) {
  return Math.round(Math.round(a / a / a + 5) * (100 / a));
}
