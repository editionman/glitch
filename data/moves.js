var moves = {};
var criticoNormal=625/100;//6.25%
var criticoAlto=3000/100;//30%
var cantidadNormal=1;
var cantidadMax=5;
  //MovimientoActivo:37---->ataque thrash ataca de 2 a 3 turnos, no puede ser intercambiado cuando esta en movimiento activo hasta que acabe
  //cuando un ataque es de mas de 1 turno el pokemon que lo usa entra en un estado de MovimientoActivo y el valor es del ataque que esta usando
  //primero se ve los turnos, despues la condicion luego si es sucesivo y al final despues de realizar el calculo de daño el effect que realiza el ataque

  //primero analiza la condicion y luego los turnos 
  //############
  //CONDICION
  //############
  //wait:1------------------------------>cuanto debe cargar el movimiento para usarse-->generalmente se espera 1 turno
  //*onMovimientoActivo:{19:"Vuelo"},potencia:1.5-->cuando el rival seleccionado esta usando alguno de estos movimientos 19:vuelo, el ataque aumenta su potencia base en 50%---mejor es que se multiplique al daño total
  //fail:true,maxhp:0.5---------->si falla el ataque, el usuario recibe de daño el 50% de sus ps max
  //############
  //PRIORIDAD
  //############
  /*
  +9	Uso de una Poké Ball
  +8	Mensaje de activación de un poder O, de la garra rápida y de la baya Chiri
  +7	Persecución (solo si el oponente cambia de Pokémon)
  +6	Carga de coraza trampa, pico cañón y puño certero, uso de objetos, cambio de Pokémon, huir de un combate, rotación de Pokémon o megaevolución
  +5	Refuerzo
  +4	Barrera espinosa, capa mágica, escudo real, búnker, protección1, detección1 y robo
  +3	Aguante, anticipo, sorpresa2, truco defensa y vastaguardia
  Movimientos de curación usados con la habilidad primer auxilio
  +2	Amago, cambio banda, escaramuza, foco, señuelo3, polvo ira3 y velocidad extrema2
  +1	Acua jet, ataque rápido, canto helado, cortina plasma, golpe bajo, ojitos tiernos, onda vacío, polvo explosivo, puño bala, roca veloz, shuriken de agua, sombra vil, ultrapuño, venganza,
  Movimientos de tipo volador (Tipo volador.gif) usados por Pokémon con habilidad alas vendaval y
  Movimientos de categoría de estado (Categoría de estado) usados con la habilidad bromista
  0	Resto de movimientos
  -1	Tiro vital
  -2	Ninguno
  -3	Coraza trampa, pico cañón y puño certero
  -4	Alud y desquite
  -5	Contraataque y manto espejo
  -6	Cola dragón, llave giro, remolino y rugido
  -7	Espacio raro
  */
  //############
  //MOVIMIENTOS EFFECTS
  //############
  //MYSTATUSEND||| 1:BURNED	2:FROZEN	3:PARALYZED	4:POISONED	5:ASLEEP 6:CONFUSION------->ESTADO QUE PASA A ESTAR EL POKEMON DESPUES DE TERMINADO SU ATAQUE
  //*STATUS||| 1:BURNED	2:FROZEN	3:PARALYZED	4:POISONED	5:ASLEEP 6:CONFUSION----------------------------------------------------------->debe crearse este verificador en cada pokemon de la batalla con el numero del efecto y los turnos que le quedan 
  //KILL||| mata de una
  //DISABLE||| desactiva el ultimo ataque del rival, de un min y max de turnos
  //LIFEDISCOUNT||| descuenta una cantidad de vida del enemigo fija
  //DMGBACK||| regresa un porcentaje de daño provocado del 0 al 1 que es de 0% al 100%
  //MYSTATS||| 1:hp 2:atk 3:def 4:atk_es 5:def_es 6:velocidad
  //ENEMYSTATS||| 1:hp 2:atk 3:def 4:atk_es 5:def_es 6:velocidad
  //REEMPLAZADO//----------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//UNSTATUS||| evita cambios de estado
  //AWAY||| ahuyenta al pokemon en combate o cambia de pokemon al entrenador por otro al azar
  //INMUNE||| no te pueden atacar mientras ejecutas el movimiento
  //TRAPPED||| te atrapa de 4 a 5 turnos y resta 1/6 de vidamax o mejor vidamaxima*0.875 que es el 12.5% de la vida max                  --si tiene un item(garra garfio)siempre durará 5 turnos--->debe crearse este verificador en cada pokemon de la batalla con el numero del movimiento y los turnos que le quedan 
  //KNOCKBACK||| 30% probabilidad de hacer retroceder
  //CONTINUOUS||| usa el mismo ataque en 2 a 3 turnos luego se confunde continuous
  //COUNTER|||devuelve el daño fisico recibido
  //ABSORB|||devuelve la mitad del daño hecho en ps
  //DRAIN||| hace perder 12.5% de ps al rival cada turno y lo transfiere al usuario invulnerable contra tipo grass
  //ALLCHANGESTATS|||Durante 5 turnos o cuando se cambia el pokemon usuario, no pueden alterarse los stats de ningun pokemon, exepto por movimientos especificos o habilidad allanamiento---> debe crearse este verificador en cada pokemon de la batalla y los turnos que le quedan 
  //###################################################################
  //###################################################################
  //EFFECT|||mystatusend:1-6 status:1-6  kill:bool mystats:{atk:2} enemystats:{atk:2} away:bool inmune:bool trapped:bool knockback:bool dmgback:0-1 continuous:bool LifeDiscount:int disable:bool
  //         unstatus:bool counter:bool absorb:true allchangestats:false
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
moves[0]={
  name:"In Development",
  type:11,
  categoria:"atk1",//atk1-atk2-atk3---fisico-especial-estado---->atk4 es un ataque que depende de otros factores
  
  
  probabilidad_critico:0.0625,//tiene un 6,25% de probabilidad-->al aumentar un nivel la prob se multiplica el actual por 2-->6.25*2=12.5-->en 4 incrementos son 100%
  critico:1.5,//el critico aumenta en 50% mas de la potencia base, aunque incrementa con movimientos como francotirador que lo aumenta 125% a 2.25
  potencia:100,
  pp:35,
  precision:1,//Es el porcentaje que tiene de exito, 100%
  effect:{},//efecto secundario del ataque->{} no hace efecto
  contact:1,//si hace contacto, la mayoria de atks fisicos hace contacto y la mayoria de atks especiales no hace contacto
  prioridad:0,//la prioridad del ataque--->0 es base
  //sonido:1,//por ahora desactivado por que no se que sonidos poners--->No se pondra
  //stab:1,//si es mismo tipo del pokemon que ataca aumenta a un 50% se multiplica 1.5---> este se usará en calculo de daño en batalla
  sucesivo:{min:2,max:2},//cantidad minima y maxima de golpes por turno ejemplo si es 5---de 1 a 5;
  condition:{},//condicion que tiene el ataque para que suceda---> se analiza primero al realizar el ataque
  turnos:{},//cuando tiene mas de un turno entra en MovimientoActivo hasta que acaben sus turnos que pueden ser desde min hasta el max de turnos, si esta vacio el turno es basico de 1
}
moves[1]={
  name:"Pound",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:100,
  pp:35,
  maxpp:35,
  precision:1,
  effect:{},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{onMovimientoActivo:{19:"Vuelo"},potencia:0},//cuando se esta usando estos ataques quitará 0 realizar a todos los movs
  turnos:{},
}
moves[2]={
  name:"Karate Chop",
  type:10,
  categoria:"atk1",
  probabilidad_critico:0.3,
  critico:1.5,
  potencia:50,
  pp:25,
  maxpp:25,
  precision:1,
  effect:{},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[3]={
  name:"Double Slap",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:50,
  pp:25,
  maxpp:25,
  precision:1,
  effect:{},
  contact:1,
  prioridad:0,
  sucesivo:{min:2,max:5},
  condition:{},
  turnos:{},
}
moves[4]={
  name:"Comet Punch",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:18,
  pp:15,
  maxpp:15,
  precision:0.85,
  effect:{},
  contact:1,
  prioridad:0,
  sucesivo:{min:2,max:5},
  condition:{},
  turnos:{},
}
moves[5]={
  name:"Mega Punch",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:80,
  pp:20,
  maxpp:20,
  precision:0.85,
  effect:{},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[6]={
  name:"Pay Day",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:40,
  pp:20,
  maxpp:20,
  precision:1,
  effect:{},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[7]={
  name:"Fire Punch",
  type:7,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:75,
  pp:15,
  maxpp:15,
  precision:1,
  effect:{status:1,precision:0.1},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[8]={
  name:"Ice Punch",
  type:9,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:75,
  pp:15,
  maxpp:15,
  precision:1,
  effect:{status:2,precision:0.1},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[9]={
  name:"Thunder Punch",
  type:5,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:75,
  pp:15,
  maxpp:15,
  precision:1,
  effect:{status:3,precision:0.1},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[10]={
  name:"Scratch",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:40,
  pp:35,
  maxpp:35,
  precision:1,
  effect:{},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[11]={
  name:"Vice Grip",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:55,
  pp:30,
  maxpp:30,
  precision:1,
  effect:{},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[12]={
  name:"Guillotine",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:1,
  pp:5,
  maxpp:5,
  precision:0.3,
  effect:{kill:true},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[13]={
  name:"Razor Wind",
  type:11,
  categoria:"atk2",
  probabilidad_critico:0.3,
  critico:1.5,
  potencia:80,
  pp:10,
  maxpp:10,
  precision:1,
  effect:{},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{wait:1},
  turnos:{min:2,max:2},//espera el primer turno y ataca el segundo
}
moves[14]={
  name:"Swords Dance",
  type:11,
  categoria:"atk3",
  probabilidad_critico:0,
  critico:0,
  potencia:0,
  pp:20,
  maxpp:20,
  precision:10,
  effect:{mystats:{atk:2}},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[15]={
  name:"Cut",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:50,
  pp:30,
  maxpp:30,
  precision:0.95,
  effect:{},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[16]={
  name:"Gust",
  type:18,
  categoria:"atk2",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:40,
  pp:35,
  maxpp:35,
  precision:1,
  effect:{},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{onMovimientoActivo:{19:"Fly",340:"Bounce",507:"Sky Drop"},potencia:1.5},
  turnos:{},
}
moves[17]={
  name:"Wing Attack",
  type:18,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:60,
  pp:35,
  maxpp:35,
  precision:1,
  effect:{},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[18]={
  name:"Whirlwind",
  type:11,
  categoria:"atk3",
  probabilidad_critico:0,
  critico:0,
  potencia:0,
  pp:20,
  maxpp:20,
  precision:10,
  effect:{away:true},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[19]={
  name:"Fly",
  type:18,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:90,
  pp:15,
  maxpp:15,
  precision:0.95,
  effect:{},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{wait:1},
  turnos:{min:2,max:2},
}
moves[20]={
  name:"Bind",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:15,
  pp:20,
  maxpp:20,
  precision:0.85,
  effect:{trapped:true},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[21]={
  name:"Slam",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:80,
  pp:20,
  maxpp:20,
  precision:0.75,
  effect:{},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[22]={
  name:"Vine Whip",
  type:12,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:45,
  pp:25,
  maxpp:25,
  precision:1,
  effect:{},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[23]={
  name:"Stomp",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:65,
  pp:20,
  maxpp:20,
  precision:1,
  effect:{knockback:true,precision:0.3},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{onMovimientoActivo:{107:"Minimize"},potencia:2,precision:10},//si esta usando reduccion el rival ignora su evasion
  turnos:{},
}
moves[24]={
  name:"Double Kick",
  type:10,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:30,
  pp:30,
  maxpp:30,
  precision:1,
  effect:{},
  contact:1,
  prioridad:0,
  sucesivo:{min:2,max:2},
  condition:{},
  turnos:{},
}
moves[25]={
  name:"Mega Kick",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:120,
  pp:5,
  maxpp:5,
  precision:0.75,
  effect:{},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[26]={
  name:"Jump Kick",
  type:10,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:100,
  pp:10,
  maxpp:10,
  precision:0.95,
  effect:{},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{fail:true,maxhp:0.5},//si falla el usuario recibe el vidamaxima*0.5 de daño de su vida maxima, osea reduce 50% de su vida maxima
  turnos:{},
}
moves[27]={
  name:"Rolling Kick",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:60,
  pp:15,
  maxpp:15,
  precision:0.85,
  effect:{knockback:true,precision:0.3},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[28]={
  name:"Sand Attack",
  type:16,
  categoria:"atk3",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:0,
  pp:15,
  maxpp:15,
  precision:1,
  effect:{enemystats:{velocidad:0.66},precision:1},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[29]={
  name:"Headbutt",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:70,
  pp:15,
  maxpp:15,
  precision:1,
  effect:{knockback:true,precision:0.3},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[30]={
  name:"Horn Attack",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:65,
  pp:25,
  maxpp:25,
  precision:1,
  effect:{},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[31]={
  name:"Fury Attack",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:15,
  pp:20,
  maxpp:20,
  precision:0.85,
  effect:{},
  contact:1,
  prioridad:0,
  sucesivo:{min:2,max:5},
  condition:{},
  turnos:{},
}
moves[32]={
  name:"Horn Drill",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:1,
  pp:5,
  maxpp:5,
  precision:0.3,
  effect:{kill:true},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[33]={
  name:"Tackle",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:40,
  pp:35,
  maxpp:35,
  precision:1,
  effect:{},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[34]={
  name:"Body Slam",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:85,
  pp:15,
  maxpp:15,
  precision:1,
  effect:{status:3,precision:0.3},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[35]={
  name:"Wrap",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:15,
  pp:20,
  maxpp:20,
  precision:0.9,
  effect:{trapped:true},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[36]={
  name:"Take Down",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:90,
  pp:20,
  maxpp:20,
  precision:0.85,
  effect:{dmgback:0.25},//25% del daño provocado al rival
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[37]={
  name:"Thrash",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:120,
  pp:10,
  maxpp:10,
  precision:1,
  effect:{mystatusend:6},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{min:2,max:3},
}
moves[38]={
  name:"Double Edge",
  type:11,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:120,
  pp:15,
  maxpp:15,
  precision:1,
  effect:{dmgback:0.33},//33% del daño provocado al rival
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[39]={
  name:"Tail Whip",
  type:11,
  categoria:"atk3",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:0,
  pp:30,
  maxpp:30,
  precision:1,
  effect:{enemystats:{def:0.66},precision:1},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[40]={
  name:"Poison Sting",
  type:17,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:15,
  pp:35,
  maxpp:35,
  precision:1,
  effect:{status:4,precision:0.3},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[41]={
  name:"Twineedle",
  type:3,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:25,
  pp:20,
  maxpp:20,
  precision:1,
  effect:{status:4,precision:0.2},
  contact:1,
  prioridad:0,
  sucesivo:{min:2,max:2},
  condition:{},
  turnos:{},
}
moves[42]={
  name:"Pin Missile",
  type:3,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:25,
  pp:20,
  maxpp:20,
  precision:0.95,
  effect:{status:4,precision:0.2},
  contact:1,
  prioridad:0,
  sucesivo:{min:2,max:5},
  condition:{},
  turnos:{},
}
moves[43]={
  name:"Leer",
  type:11,
  categoria:"atk3",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:0,
  pp:30,
  maxpp:30,
  precision:1,
  effect:{enemystats:{def:0.66},precision:1},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[44]={
  name:"Bite",
  type:15,
  categoria:"atk1",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:60,
  pp:25,
  maxpp:25,
  precision:1,
  effect:{knockback:true,precision:0.3},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[45]={
  name:"Growl",
  type:11,
  categoria:"atk3",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:0,
  pp:40,
  maxpp:40,
  precision:10,
  effect:{enemystats:{atk:0.66},precision:1},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[46]={
  name:"Roar",
  type:11,
  categoria:"atk3",
  probabilidad_critico:0.0625,
  critico:0,
  potencia:0,
  pp:20,
  maxpp:20,
  precision:10,
  effect:{away:true},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[47]={
  name:"Sing",
  type:11,
  categoria:"atk3",
  probabilidad_critico:0.0625,
  critico:0,
  potencia:0,
  pp:15,
  maxpp:15,
  precision:0.55,
  effect:{status:5,precision:1},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[48]={
  name:"Supersonic",
  type:11,
  categoria:"atk3",
  probabilidad_critico:0.0625,
  critico:0,
  potencia:0,
  pp:20,
  maxpp:20,
  precision:0.55,
  effect:{status:6,precision:1},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[49]={
  name:"Sonic Boom",
  type:11,
  categoria:"atk2",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:1,
  pp:20,
  maxpp:20,
  precision:0.9,
  effect:{LifeDiscount:20},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[50]={
  name:"Disable",
  type:11,
  categoria:"atk3",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:0,
  pp:20,
  maxpp:20,
  precision:1,
  effect:{disable:true,turnos:{min:4,max:7}},//desactiva el ultimo mov del objetivo de 4 a 7 turnos
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[51]={
  name:"Acid",
  type:17,
  categoria:"atk2",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:40,
  pp:30,
  maxpp:30,
  precision:1,
  effect:{enemystats:{velocidad:0.66},precision:0.1},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[52]={
  name:"Ember",
  type:7,
  categoria:"atk2",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:40,
  pp:25,
  maxpp:25,
  precision:1,
  effect:{status:1,precision:0.1},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[53]={
  name:"Flamethrower",
  type:7,
  categoria:"atk2",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:90,
  pp:15,
  maxpp:15,
  precision:1,
  effect:{status:1,precision:0.1},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
moves[54]={
  name:"Mist",
  type:9,
  categoria:"atk3",
  probabilidad_critico:0.0625,
  critico:1.5,
  potencia:0,
  pp:30,
  maxpp:30,
  precision:10,
  effect:{allchangestats:false,turnos:5},
  contact:1,
  prioridad:0,
  sucesivo:{},
  condition:{},
  turnos:{},
}
//-------------------------FIN---------------------
var exports = module.exports = moves;
 