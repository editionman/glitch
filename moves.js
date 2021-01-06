var moves = {};
var criticoNormal=625/100;//6.25%
var criticoAlto=3000/100;//30%
var cantidadNormal=1;
var cantidadMax=5;
moves = {
  //############
  //MOVIMIENTOS
  //############
  //STATUS||| 1:BURNED	2:FROZEN	3:PARALYZED	4:POISONED	5:ASLEEP 6:CONFUSION
  //KIL||| mata de una
  //DISABLE||| desactiva el ultimo ataque del rival
  //TURNO||| no ataca en esos turnos
  //LIFEDISCOUNT||| descuenta vida del enemigo
  //DMGBACK||| regresa un porcentaje de daño provocado del 0 al 1 que es de 0% al 100%
  //STATS||| 1:hp 2:atk 3:def 4:atk_es 5:def_es 6:velocidad
  //STATSENEMY||| 1:hp 2:atk 3:def 4:atk_es 5:def_es 6:velocidad
  //UNSTATUS||| evita cambios de estado
  //AWAY||| ahuyenta al pokemon en combate
  //INMUNE||| no te pueden atacar mientras ejecutas el movimiento
  //TRAPPED||| te atrapa de 2 a 5 turnos y resta 1/6 de vida
  //KNOCKBACK||| 30% probabilidad de hacer retroceder
  //CONTINUOUS||| usa el mismo ataque en 2 a 3 turnos luego se confunde continuous
  //COUNTER|||devuelve el daño fisico recibido
  //ABSORB|||devuelve la mitad del daño hecho en ps
  //DRAIN||| hace perder 12.5% de ps al rival cada turno y lo transfiere al usuario invulnerable contra tipo grass
  //###################################################################
  //###################################################################
  //EXTRA||| status:1-6  kill:bool stats:{atk:2} statsenemy:{atk:2} away:bool inmune:bool trapped:bool knockback:bool dmgback:0-1 continuous:bool LifeDiscount:int disable:bool
  //         unstatus:bool turno:int counter:bool absorb:true
  //###################################################################
  //###################################################################
  /*ataques movimientos
  22-latigo sepa Vine Whip
  33-Placaje tackle
  34-clorofila chlorofyll
  36-derribo Take Down
  45-Gruñido growl
  65-espesura overgrowl
  73-drenadoras Leech Seed
  77-polvo veneno Poisonpowder
  79-somnifero Sleep Powder
  */
  //creo que esta mal esta forma de hacerlo
  
  movimientos:function(movID){
    var criticoNormal=625/100;//6.25%
    var criticoAlto=3000/100;//30%
    var cantidadNormal=1;
    var cantidadMax=5;
    var mov={
      movName:"In Development",
        type:11,
        categoria:"atk1",//atk1-atk2-atk3---fisico-especial-estado
        energia:energyNeed(35),
        velocidad:100,
        poder:40,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
    };
    //start de monster
    if(movID===1){
      mov ={
        movName:"Pound",
        type:11,
        categoria:"atk1",//1=fisico 2=especial 3=estado
        energia:energyNeed(35),//energia necesaria para usar el poder 35=35pp
        velocidad:100,//100=100% de accuracy
        poder:40,
        quantity:cantidadNormal,//1=cantidad normal cantidadMax=maxima cantidad de golpes multiples
        icritico:criticoNormal,
        turno:1,//1:no carga 2:carga
      };
    }
    if(movID===2){
      mov ={
        movName:"Karate Chop",
        type:10,
        categoria:"atk1",//1=fisico 2=especial 3=estado
        energia:energyNeed(25),//energia necesaria para usar el poder 35=35pp
        velocidad:100,//100=100% de accuracy
        poder:50,
        quantity:cantidadNormal,
        icritico:criticoAlto,//alta probabilidad de critico 30%
        turno:1,
      };
    }
    if(movID===3){
      mov ={
        movName:"Double Slap",
        type:11,
        categoria:"atk1",
        energia:energyNeed(25),
        velocidad:100,
        poder:50,
        quantity:cantidadMax,
        icritico:criticoNormal,
        turno:1,
      };
    }
    if(movID===4){
      mov ={
        movName:"Comet Punch",
        type:11,
        categoria:"atk1",
        energia:energyNeed(15),
        velocidad:85,
        poder:80,
        quantity:cantidadMax,
        icritico:criticoNormal,
        turno:1,
      };
    }
    if(movID===5){
      mov ={
        movName:"Mega Punch",
        type:11,
        categoria:"atk1",
        energia:energyNeed(20),
        velocidad:85,
        poder:80,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
      };
    }
    if(movID===6){
      mov ={
        movName:"Pay Day",
        type_1:11,
        type_2:0,
        categoria:"atk1",
        energia:energyNeed(20),
        velocidad:100,
        poder:40,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
      };
    }
    if(movID===7){
      mov ={
        movName:"Fire Punch",
        type:7,
        categoria:"atk1",
        energia:energyNeed(15),
        velocidad:100,
        poder:75,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          status:1,
        },
      };
    }
    if(movID===8){
      mov ={
        movName:"Ice Punch",
        type:9,
        categoria:"atk1",
        energia:energyNeed(15),
        velocidad:100,
        poder:75,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          status:2,
        },
      };
    }
    if(movID===9){
      mov ={
        movName:"Thunder Punch",
        type:5,
        categoria:"atk1",
        energia:energyNeed(15),
        velocidad:100,
        poder:75,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          status:3,//1:BURNED	2:FROZEN	3:PARALYZED	4:POISONED	5:ASLEEP
        },
      };
    }
    if(movID===10){
      mov ={
        movName:"Scratch",
        type:11,
        categoria:"atk1",
        energia:energyNeed(35),
        velocidad:100,
        poder:40,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
      };
    }
    if(movID===11){
      mov ={
        movName:"Vicegrip",
        type:11,
        categoria:"atk1",
        energia:energyNeed(30),
        velocidad:100,
        poder:55,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
      };
    }
    if(movID===12){
      mov ={
        movName:"Guillotine",//mata de una si le da al usuario
        type:11,
        categoria:"atk1",
        energia:energyNeed(5),
        velocidad:30,
        poder:0,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          kill:true,
        },
      };
    }
    if(movID===13){
      mov ={
        movName:"Razor Wind",
        type:11,
        categoria:"atk2",
        energia:energyNeed(10),
        velocidad:100,
        poder:80,
        quantity:cantidadNormal,
        icritico:criticoAlto,
        turno:2,
      };
    }
    if(movID===14){
      mov ={
        movName:"Swords Dance",
        type:11,
        categoria:"atk3",
        energia:energyNeed(30),
        velocidad:100,
        turno:1,
        extra:{
          stats:{
            atk:2,
          },
        },
      };
    }
    if(movID===15){
      mov ={
        movName:"Cut",
        type:11,
        categoria:"atk1",
        energia:energyNeed(30),
        velocidad:95,
        poder:50,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
      };
    }
    if(movID===16){
      mov ={
        movName:"Gust",
        type:18,
        categoria:"atk2",
        energia:energyNeed(35),
        velocidad:100,
        poder:40,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
      };
    }
    if(movID===17){
      mov ={
        movName:"Wing Attack",
        type:18,
        categoria:"atk1",
        energia:energyNeed(35),
        velocidad:100,
        poder:60,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
      };
    }
    if(movID===18){
      mov ={
        movName:"Whirlwind",
        type:11,
        categoria:"atk3",
        energia:energyNeed(20),
        velocidad:100,
        turno:1,
        extra:{
          away:true,
        },
      };
    }
    if(movID===19){
      mov ={
        movName:"Fly",
        type:18,
        categoria:"atk1",
        energia:energyNeed(15),
        velocidad:95,
        poder:90,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:2,
        extra:{
          inmune:true,
        },
      };
    }
    if(movID===20){
      mov ={
        movName:"Bind",
        type:11,
        categoria:"atk1",
        energia:energyNeed(20),
        velocidad:75,
        poder:15,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          trapped:true,
        },
      };
    }
    if(movID===21){
      mov ={
        movName:"Slam",
        type:11,
        categoria:"atk1",
        energia:energyNeed(20),
        velocidad:75,
        poder:80,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
      };
    }
    if(movID===22){
      mov ={
        movName:"Vine Whip",
        type:12,
        categoria:"atk1",
        energia:energyNeed(15),
        velocidad:100,
        poder:35,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
      };
    }
    if(movID===23){
      mov ={
        movName:"Stomp",
        type:11,
        categoria:"atk1",
        energia:energyNeed(20),
        velocidad:100,
        poder:65,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          knockback:true,
        },
      };
    }
    if(movID===24){
      mov ={
        movName:"Double Kick",
        type:10,
        categoria:"atk1",
        energia:energyNeed(30),
        velocidad:100,
        poder:30,
        quantity:2,
        icritico:criticoNormal,
        turno:1,
        extra:{
          knockback:true,
        },
      };
    }
    if(movID===25){
      mov ={
        movName:"Mega Kick",
        type:11,
        categoria:"atk1",
        energia:energyNeed(5),
        velocidad:75,
        poder:120,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          knockback:true,
        },
      };
    }
    if(movID===26){
      mov ={
        movName:"Jump Kick",
        type:10,
        categoria:"atk1",
        energia:energyNeed(25),
        velocidad:95,
        poder:85,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          knockback:true,
        },
      };
    }
    if(movID===27){
      mov ={
        movName:"Rolling Kick",
        type:10,
        categoria:"atk1",
        energia:energyNeed(15),
        velocidad:85,
        poder:60,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          knockback:true,
        },
      };
    }
    if(movID===28){
      mov ={
        movName:"Sand attack",
        type:16,
        categoria:"atk3",
        energia:energyNeed(15),
        velocidad:100,
        turno:1,
        extra:{
          statsenemy:{
            velocidad:0.66,//reduce un nivel la velocidad
          },
        },
      };
    }
    if(movID===29){
      mov ={
        movName:"Headbutt",
        type:11,
        categoria:"atk1",
        energia:energyNeed(15),
        velocidad:100,
        poder:70,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          knockback:true,
        },
      };
    }
    if(movID===30){
      mov ={
        movName:"Horn Attack",
        type:11,
        categoria:"atk1",
        energia:energyNeed(25),
        velocidad:100,
        poder:65,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
      };
    }
    if(movID===31){
      mov ={
        movName:"Fury Attack",
        type:11,
        categoria:"atk1",
        energia:energyNeed(20),
        velocidad:85,
        poder:15,
        quantity:cantidadMax,
        icritico:criticoNormal,
        turno:1,
      };
    }
    if(movID===32){
      mov ={
        movName:"Horn Drill",
        type:11,
        categoria:"atk1",
        energia:energyNeed(5),
        velocidad:30,
        poder:0,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          kill:true,
        },
      };
    }
    if(movID===33){
      mov ={
        movName:"Tackle",
        type:11,
        categoria:"atk1",
        energia:energyNeed(35),
        velocidad:100,
        poder:40,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        categoria: "atk1",
      };
    }
    if(movID===34){
      mov ={
        movName:"Body Slam",
        type:11,
        categoria:"atk1",
        energia:energyNeed(15),
        velocidad:100,
        poder:85,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          status:3,//paralize
        },
      };
    }
    if(movID===35){
      mov ={
        movName:"Wrap",
        type:11,
        categoria:"atk1",
        energia:energyNeed(20),
        velocidad:85,
        poder:15,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          trapped:true,//trapped 2 a 5 turnos y causa 1/6 de daño
        },
      };
    }
    if(movID===36){
      mov ={
        movName:"Take Down",
        type:11,
        categoria:"atk1",
        energia:energyNeed(20),
        velocidad:85,
        poder:90,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          dmgback:0.25,//regresa el 25% de daño provocado
        },
      };
    }
    if(movID===37){
      mov ={
        movName:"Thrash",
        type:11,
        categoria:"atk1",
        energia:energyNeed(20),
        velocidad:100,
        poder:90,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:3,
        extra:{
          continuous:true,//usa el mismo ataque en 2 a 3 turnos luego se confunde
        },
      };
    }
    if(movID===38){
      mov ={
        movName:"Double Edge",
        type:11,
        categoria:"atk1",
        energia:energyNeed(15),
        velocidad:100,
        poder:120,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          dmgback:0.33,//provoca daño de retroceso
        },
      };
    }
    if(movID===39){
      mov ={
        movName:"Tail Whip",
        type:11,
        categoria:"atk3",
        energia:energyNeed(30),
        velocidad:100,
        turno:1,
        extra:{
          statsenemy:{
            def:0.66,//reduce un nivel la defensa
          },
        },
      };
    }
    if(movID===40){
      mov ={
        movName:"Poison Sting",
        type:17,
        categoria:"atk1",
        energia:energyNeed(35),
        velocidad:100,
        poder:15,
        quantity:cantidadMax,
        icritico:criticoNormal,
        turno:1,
        extra:{
            status:4,//10% de envenenar
        },
      };
    }
    if(movID===41){
      mov ={
        movName:"Twineedle",
        type:3,
        categoria:"atk1",
        energia:energyNeed(20),
        velocidad:100,
        poder:25,
        quantity:2,
        icritico:criticoNormal,
        turno:1,
        extra:{
            status:4,//10% de envenenar
        },
      };
    }
    if(movID===42){
      mov ={
        movName:"Pin Missile",
        type:3,
        categoria:"atk1",
        energia:energyNeed(20),
        velocidad:85,
        poder:14,
        quantity:cantidadMax,
        icritico:criticoNormal,
        turno:1,
      };
    }
    if(movID===43){
      mov ={
        movName:"Leer",
        type:11,
        categoria:"atk3",
        energia:energyNeed(30),
        velocidad:100,
        turno:1,
        extra:{
          statsenemy:{
            def:0.66,//reduce un nivel la defensa
          },
        },
      };
    }
    if(movID===44){
      mov ={
        movName:"Bite",
        type:15,
        categoria:"atk1",
        energia:energyNeed(25),
        velocidad:100,
        poder:60,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          knockback:true,
        },
      };
    }
    if(movID===45){
      mov ={
        movName:"Growl",
        type:11,
        categoria:"atk3",
        energia:energyNeed(30),
        velocidad:100,
        turno:1,
        extra:{
          statsenemy:{
            atk:0.66,//reduce un nivel la defensa
          },
        },
      };
    }
    if(movID===46){
      mov ={
        movName:"Roar",
        type:11,
        categoria:"atk3",
        energia:energyNeed(20),
        velocidad:100,
        turno:1,
        extra:{
          away:true,
        },
      };
    }
    if(movID===47){
      mov ={
        movName:"Sing",
        type:11,
        categoria:"atk3",
        energia:energyNeed(15),
        velocidad:55,
        turno:1,
        extra:{
          status:5,//10% de provocar sueño
        },
      };
    }
    if(movID===48){
      mov ={
        movName:"Supersonic",
        type:11,
        categoria:"atk3",
        energia:energyNeed(20),
        velocidad:55,
        turno:1,
        extra:{
          status:6,//10% de provocar confusion
        },
      };
    }
    if(movID===49){
      mov ={
        movName:"Sonic boom",
        type:11,
        categoria:"atk2",
        energia:energyNeed(90),
        velocidad:90,
        poder:0,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          LifeDiscount:20,//resta 20 de vida al rival
        },
      };
    }
    if(movID===50){
      mov ={
        movName:"Disable",
        type:11,
        categoria:"atk3",
        energia:energyNeed(20),
        velocidad:80,
        turno:1,
        extra:{
          disable:true,//desactiva el ultimo ataque usado por el rival
        },
      };
    }
    if(movID===51){
      mov ={
        movName:"Acid",
        type:17,
        categoria:"atk2",
        energia:energyNeed(30),
        velocidad:100,
        poder:40,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          statsenemy:{
            def_es:0.1,//reduce 10% de la defensa especial
          },
        },
      };
    }
    if(movID===52){
      mov ={
        movName:"Ember",
        type:7,
        categoria:"atk2",
        energia:energyNeed(25),
        velocidad:100,
        poder:40,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          status:1,//10% posibilidad de quemar
        },
      };
    }
    if(movID===53){
      mov ={
        movName:"Flamethrower",
        type:7,
        categoria:"atk2",
        energia:energyNeed(15),
        velocidad:100,
        poder:95,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          status:1,//10% posibilidad de quemar
        },
      };
    }
    if(movID===54){
      mov ={
        movName:"Mist",
        type:9,
        categoria:3,
        energia:energyNeed(30),
        velocidad:100,
        turno:1,
        extra:{
          unstatus:true,//evita alteraciones de estado
        },
      };
    }
    if(movID===55){
      mov ={
        movName:"Water Gun",
        type:2,
        categoria:"atk2",
        energia:energyNeed(25),
        velocidad:100,
        poder:40,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
      };
    }
    if(movID===56){
      mov ={
        movName:"Hydro Pump",
        type:2,
        categoria:"atk2",
        energia:energyNeed(5),
        velocidad:80,
        poder:120,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
      };
    }
    if(movID===57){
      mov ={
        movName:"Surf",
        type:2,
        categoria:"atk2",
        energia:energyNeed(15),
        velocidad:100,
        poder:95,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
      };
    }
    if(movID===58){
      mov ={
        movName:"Ice Beam",
        type:9,
        categoria:"atk2",
        energia:energyNeed(10),
        velocidad:100,
        poder:95,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          status:2,//10% probabilidad de congelar
        },
      };
    }
    if(movID===59){
      mov ={
        movName:"Blizzard",
        type:9,
        categoria:"atk2",
        energia:energyNeed(5),
        velocidad:70,
        poder:120,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          status:2,//10% probabilidad de congelar
        },
      };
    }
    if(movID===60){
      mov ={
        movName:"Psybeam",
        type:13,
        categoria:"atk2",
        energia:energyNeed(20),
        velocidad:100,
        poder:65,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          status:6,//10% probabilidad de confundir al rival
        },
      };
    }
    if(movID===61){
      mov ={
        movName:"Bubble beam",
        type:2,
        categoria:"atk2",
        energia:energyNeed(20),
        velocidad:100,
        poder:65,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          statsenemy:{
            velocidad:0.66,//reduce un nivel la velocidad del rival
          },
        },
      };
    }
    if(movID===62){
      mov ={
        movName:"Aurora Beam",
        type:9,
        categoria:"atk2",
        energia:energyNeed(20),
        velocidad:100,
        poder:65,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          statsenemy:{
            atk:0.66,//reduce un nivel la velocidad del rival
          },
        },
      };
    }
    if(movID===63){
      mov ={
        movName:"Hyper Beam",
        type:11,
        categoria:"atk2",
        energia:energyNeed(5),
        velocidad:90,
        poder:150,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          turno:1 //no ataca en 1 turnos
        },
      };
    }
    if(movID===64){
      mov ={
        movName:"Peck",
        type:18,
        categoria:"atk1",
        energia:energyNeed(35),
        velocidad:100,
        poder:35,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
      };
    }
    if(movID===65){
      mov ={
        movName:"Drill Peck",
        type:18,
        categoria:"atk1",
        energia:energyNeed(20),
        velocidad:100,
        poder:80,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
      };
    }
    if(movID===66){
      mov ={
        movName:"Submission",
        type:10,
        categoria:"atk1",
        energia:energyNeed(25),
        velocidad:80,
        poder:80,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          dmgback:0.25,
        }
      };
    }
    if(movID===67){
      mov ={
        movName:"Low Kick",
        type:10,
        categoria:"atk1",
        energia:energyNeed(20),
        velocidad:100,
        poder:40,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        //depende del peso del pokemon rival
      };
    }
    if(movID===68){
      mov ={
        movName:"Counter",
        type:10,
        categoria:"atk1",
        energia:energyNeed(20),
        velocidad:100,
        poder:0,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          counter:true,//devuelve el doble de daño fisico recibido
        }
      };
    }
    if(movID===69){
      mov ={
        movName:"Seismic Toss",
        type:10,
        categoria:"atk1",
        energia:energyNeed(20),
        velocidad:100,
        poder:50,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        //depende del nivel del usuario en ps
      };
    }
    if(movID===70){
      mov ={
        movName:"Strength",
        type:11,
        categoria:"atk1",
        energia:energyNeed(15),
        velocidad:100,
        poder:80,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
      };
    }
    if(movID===71){
      mov ={
        movName:"Absorb",
        type:12,
        categoria:"atk2",
        energia:energyNeed(25),
        velocidad:100,
        poder:20,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          absorb:true,//devuelve la mitad del daño causado en PS
        }
      };
    }
    if(movID===72){
      mov ={
        movName:"Mega Drain",
        type:12,
        categoria:"atk2",
        energia:energyNeed(15),
        velocidad:100,
        poder:40,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          absorb:true,//devuelve la mitad del daño causado en PS
        }
      };
    }
    if(movID===73){
      mov ={
        movName:"Leech Seed",
        type:12,
        categoria:"atk3",
        energia:energyNeed(10),
        velocidad:90,
        turno:1,
        extra:{
          drain:true,//hace perder 12.5% de ps al rival cada turno y lo transfiere al usuario no sirve contra tipo grass
        }
      };
    }
    if(movID===74){
      mov ={
        movName:"Growth",
        type:11,
        categoria:"atk3",
        energia:energyNeed(40),
        velocidad:100,
        turno:1,
        extra:{
          stats:{
            atk_es:1.5//aumenta en un nivel el ataque especial
          },
        }
      };
    }
    if(movID===75){
      mov ={
        movName:"Razor Leaf",
        type:12,
        categoria:"atk1",
        energia:energyNeed(25),
        velocidad:95,
        poder:55,
        quantity:cantidadNormal,
        icritico:criticoAlto,
        turno:1,
      };
    }
    if(movID===76){
      mov ={
        movName:"Solar beam",
        type:12,
        categoria:"atk2",
        energia:energyNeed(10),
        velocidad:100,
        poder:120,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:2,//requiere un turno para atacar
      };
    }
    if(movID===77){
      mov ={
        movName:"Poison powder",
        type:17,
        categoria:"atk3",
        energia:energyNeed(35),
        velocidad:75,
        turno:1,
        extra:{
          status:4,
        },
      };
    }
    if(movID===78){
      mov ={
        movName:"Stun Spore",
        type:12,
        categoria:"atk3",
        energia:energyNeed(30),
        velocidad:75,
        turno:1,
        extra:{
          status:3,
        },
      };
    }
    if(movID===79){
      mov ={
        movName:"Sleep Powder",
        type:12,
        categoria:"atk3",
        energia:energyNeed(15),
        velocidad:75,
        turno:1,
        extra:{
          status:5,
        },
      };
    }
    if(movID===80){
      mov ={
        movName:"Petal Dance",
        type:12,
        categoria:"atk2",
        energia:energyNeed(20),
        velocidad:100,
        poder:90,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
        extra:{
          continuous:true,//durante 3 turnos ataca luego se confunde
        },
      };
    }//fin de if
    return mov;
  },//fin de movimientos
}

//calculo de energia necesaria para usar un movimiento
function energyNeed(a){
  return Math.round(Math.round((a/a/a)+5)*(100/a));
}

var exports = module.exports = moves;