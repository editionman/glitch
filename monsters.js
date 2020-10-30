var exports = module.exports = {
  monster:function(MonsterNum){
    var mon={
        monstername:"In Development",
        lvlmin:1,
        lvlmax:100,
        type_1:11,
        type_2:0,
        stats:{
          ps:45,
          atk:49,
          def:49,
          atk_es:65,
          def_es:65,
          velocidad:45,
        },
        habilidades:{
          1:[65,65],//normal
          2:34,//oculta
        },
        //array de movimientos: [id,name,lvlneed,modo]
        //modos: lvlup,mt-mo,tutor,breed,evento
        movimientos:[
          [33,"Tackle",1,"lvlup"],
          [497,"Echoed Voice",1,"lvlup"],
        ],
      };;
    //start de monster
    if(MonsterNum===1){
      mon ={
        monstername:"Bulbasaur",
        lvlmin:1,
        lvlmax:100,
        type_1:12,
        type_2:17,
        stats:{
          ps:45,
          atk:49,
          def:49,
          atk_es:65,
          def_es:65,
          velocidad:45,
        },
        habilidades:{
          1:[65,65],//normal
          2:34,//oculta
        },
        evo:{
          nivel:16,
          object:0,
          in:2,
        },
        //array de movimientos: [id,name,lvlneed,modo]
        //modo: lvlup,mtmo,tutor,breed,evento
        movimientos:[
          [33,"Tackle",1,"lvlup"],
          [45,"Growl",3,"lvlup"],
          [73,"Leech Seed",7,"lvlup"],
          [22,"Vine Whip",9,"lvlup"],
          [77,"Poisonpowder",13,"lvlup"],
          [79,"Sleep Powder",13,"lvlup"],
          [36,"Take Down",15,"lvlup"],
          [75,"Razor Leaf",19,"lvlup"],
          [230,"Sweet Scent",21,"lvlup"],
          [74,"Growth",25,"lvlup"],
          [38,"Double Edge",27,"lvlup"],
          [388,"Worry Seed",31,"lvlup"],
          [235,"Synthesis",33,"lvlup"],
          [402,"Seed Bomb",37,"lvlup"],
        ],
      };
    }
    if(MonsterNum===2){
      mon ={
        monstername:"Ivysaur",
        lvlmin:1,
        lvlmax:100,
        type_1:12,
        type_2:17,
        stats:{
          ps:60,
          atk:62,
          def:63,
          atk_es:80,
          def_es:80,
          velocidad:60,
        },
        habilidades:{
          1:[65,65],//normal
          2:34,//oculta
        },
        evo:{
          nivel:32,
          object:0,
          in:3,
        },
        movimientos:[
          [33,"Tackle",1,"lvlup"],
          [45,"Growl",1,"lvlup"],
          [73,"Leech Seed",1,"lvlup"],
          [22,"Vine Whip",9,"lvlup"],
          [77,"Poisonpowder",13,"lvlup"],
          [79,"Sleep Powder",13,"lvlup"],
          [36,"Take Down",15,"lvlup"],
          [75,"Razor Leaf",20,"lvlup"],
          [230,"Sweet Scent",23,"lvlup"],
          [74,"Growth",28,"lvlup"],
          [38,"Double Edge",31,"lvlup"],
          [388,"Worry Seed",36,"lvlup"],
          [235,"Synthesis",39,"lvlup"],
          [76,"Solar Beam",44,"lvlup"],
        ],
      };
    }
    if(MonsterNum===3){
      mon ={
        monstername:"Venusaur",
        lvlmin:1,
        lvlmax:100,
        type_1:12,
        type_2:17,
        stats:{
          ps:80,
          atk:82,
          def:83,
          atk_es:100,
          def_es:100,
          velocidad:80,
        },
        megaevo:{
          bool:true,
          object:0,
        },
        habilidades:{
          1:[65,65],//normal
          2:34,//oculta
        },
        movimientos:[
          [80,"Petal Dance",0,"lvlup"],
          [33,"Tackle",1,"lvlup"],
          [45,"Growl",1,"lvlup"],
          [73,"Leech Seed",1,"lvlup"],
          [22,"Vine Whip",1,"lvlup"],
          [77,"Poisonpowder",13,"lvlup"],
          [79,"Sleep Powder",13,"lvlup"],
          [36,"Take Down",15,"lvlup"],
          [75,"Razor Leaf",20,"lvlup"],
          [230,"Sweet Scent",23,"lvlup"],
          [74,"Growth",28,"lvlup"],
          [38,"Double Edge",31,"lvlup"],
          [388,"Worry Seed",39,"lvlup"],
          [235,"Synthesis",45,"lvlup"],
          [572,"Petal Blizzard",50,"lvlup"],
          [76,"Solar Beam",53,"lvlup"],
        ],
      };
    }
    if(MonsterNum===4){
      mon ={
        monstername:"Charmander",
        lvlmin:1,
        lvlmax:100,
        type_1:7,
        type_2:0,
        stats:{
          ps:39,
          atk:52,
          def:43,
          atk_es:60,
          def_es:50,
          velocidad:65,
        },
        habilidades:{
          1:[66,66],//normal
          2:94,//oculta
        },
        evo:{
          nivel:16,
          object:0,
          in:5
        },
        //array de movimientos: [id,name,lvlneed,modo]
        //modo: lvlup,mtmo,tutor,breed,evento
        movimientos:[
          [10,"Scratch",1,"lvlup"],
          [45,"Growl",1,"lvlup"],
          [52,"Ember",7,"lvlup"],
          [108,"Smokescreen",10,"lvlup"],
          [82,"Dragon Rage",16,"lvlup"],
          [184,"Scary Face",19,"lvlup"],
          [424,"Fire Fang",25,"lvlup"],
          [481,"Flame Burst",28,"lvlup"],
          [163,"Slash",34,"lvlup"],
          [53,"Flamethrower",37,"lvlup"],
          [83,"Fire Spin",43,"lvlup"],
          [517,"Inferno",46,"lvlup"],
        ],
      };
    }
    if(MonsterNum===5){
      mon ={
        monstername:"Charmeleon",
        lvlmin:1,
        lvlmax:100,
        type_1:7,
        type_2:0,
        stats:{
          ps:58,
          atk:64,
          def:58,
          atk_es:80,
          def_es:65,
          velocidad:80,
        },
        evo:{
          nivel:36,
          object:0,
          in:6
        },
        habilidades:{
          1:[66,66],//normal
          2:94,//oculta
        },
        movimientos:[
          [10,"Scratch",1,"lvlup"],
          [45,"Growl",1,"lvlup"],
          [52,"Ember",1,"lvlup"],
          [108,"Smokescreen",10,"lvlup"],
          [82,"Dragon Rage",17,"lvlup"],
          [184,"Scary Face",21,"lvlup"],
          [424,"Fire Fang",28,"lvlup"],
          [481,"Flame Burst",32,"lvlup"],
          [163,"Slash",39,"lvlup"],
          [53,"Flamethrower",43,"lvlup"],
          [83,"Fire Spin",50,"lvlup"],
          [517,"Inferno",54,"lvlup"],
        ],
      };
    }
    if(MonsterNum===6){
      mon ={
        monstername:"Charizard",
        lvlmin:1,
        lvlmax:100,
        type_1:7,
        type_2:18,
        stats:{
          ps:78,
          atk:84,
          def:78,
          atk_es:109,
          def_es:85,
          velocidad:100,
        },
        megaevo:{
          bool:true,
          object:0,
        },
        habilidades:{
          1:[66,66],//normal
          2:94,//oculta
        },
        movimientos:[
          [17,"Wing Attack",0,"lvlup"],
          [394,"Flare Blitz",1,"lvlup"],
          [257,"Heat Wave",1,"lvlup"],
          [337,"Dragon Claw",1,"lvlup"],
          [421,"Shadow Claw",1,"lvlup"],
          [403,"Air Slash",1,"lvlup"],
          [10,"Scratch",1,"lvlup"],
          [45,"Growl",1,"lvlup"],
          [52,"Ember",1,"lvlup"],
          [108,"Smokescreen",10,"lvlup"],
          [82,"Dragon Rage",17,"lvlup"],
          [184,"Scary Face",21,"lvlup"],
          [424,"Fire Fang",28,"lvlup"],
          [481,"Flame Burst",32,"lvlup"],
          [163,"Slash",41,"lvlup"],
          [53,"Flamethrower",47,"lvlup"],
          [83,"Fire Spin",56,"lvlup"],
          [517,"Inferno",62,"lvlup"],
        ],
      };
    }
    if(MonsterNum===7){
      mon ={
        monstername:"Squirtle",
        lvlmin:1,
        lvlmax:100,
        type_1:2,
        type_2:0,
        stats:{
          ps:44,
          atk:48,
          def:65,
          atk_es:50,
          def_es:64,
          velocidad:43,
        },
        habilidades:{
          1:[67,67],//normal
          2:44,//oculta
        },
        evo:{
          nivel:16,
          object:0,
          in:8,
        },
        //array de movimientos: [id,name,lvlneed,modo]
        //modo: lvlup,mtmo,tutor,breed,evento
        movimientos:[
          [33,"Tackle",1,"lvlup"],
          [39,"Tail Whip",4,"lvlup"],
          [55,"Water Gun",7,"lvlup"],
          [110,"Withdraw",10,"lvlup"],
          [145,"Bubble",13,"lvlup"],
          [44,"Bite",16,"lvlup"],
          [229,"Rapid Spin",19,"lvlup"],
          [182,"Protect",22,"lvlup"],
          [352,"Water Pulse",25,"lvlup"],
          [401,"Aqua Tail",28,"lvlup"],
          [130,"Skull Bash",31,"lvlup"],
          [334,"Iron Defense",34,"lvlup"],
          [240,"Rain Dance",37,"lvlup"],
          [56,"Hydro Pump",40,"lvlup"],
        ],
      };
    }
    if(MonsterNum===8){
      mon ={
        monstername:"Wartortle",
        lvlmin:1,
        lvlmax:100,
        type_1:2,
        type_2:0,
        stats:{
          ps:59,
          atk:63,
          def:80,
          atk_es:65,
          def_es:80,
          velocidad:58,
        },
        evo:{
          nivel:36,
          object:0,
          in:9,
        },
        habilidades:{
          1:[67,67],//normal
          2:44,//oculta
        },
        movimientos:[
          [33,"Tackle",1,"lvlup"],
          [39,"Tail Whip",1,"lvlup"],
          [55,"Water Gun",1,"lvlup"],
          [110,"Withdraw",10,"lvlup"],
          [145,"Bubble",13,"lvlup"],
          [44,"Bite",17,"lvlup"],
          [229,"Rapid Spin",21,"lvlup"],
          [182,"Protect",25,"lvlup"],
          [352,"Water Pulse",29,"lvlup"],
          [401,"Aqua Tail",33,"lvlup"],
          [130,"Skull Bash",37,"lvlup"],
          [334,"Iron Defense",41,"lvlup"],
          [240,"Rain Dance",45,"lvlup"],
          [56,"Hydro Pump",49,"lvlup"],
        ],
      };
    }
    if(MonsterNum===9){
      mon ={
        monstername:"Blastoise",
        lvlmin:1,
        lvlmax:100,
        type_1:2,
        type_2:0,
        stats:{
          ps:78,
          atk:83,
          def:100,
          atk_es:85,
          def_es:105,
          velocidad:78,
        },
        megaevo:{
          bool:true,
          object:0,
        },
        habilidades:{
          1:[67,67],//normal
          2:44,//oculta
        },
        movimientos:[
          [430,"Flash Cannon",1,"lvlup"],
          [33,"Tackle",1,"lvlup"],
          [39,"Tail Whip",1,"lvlup"],
          [55,"Water Gun",1,"lvlup"],
          [110,"Withdraw",1,"lvlup"],
          [145,"Bubble",13,"lvlup"],
          [44,"Bite",17,"lvlup"],
          [229,"Rapid Spin",21,"lvlup"],
          [182,"Protect",25,"lvlup"],
          [352,"Water Pulse",29,"lvlup"],
          [401,"Aqua Tail",33,"lvlup"],
          [130,"Skull Bash",40,"lvlup"],
          [334,"Iron Defense",47,"lvlup"],
          [240,"Rain Dance",54,"lvlup"],
          [56,"Hydro Pump",60,"lvlup"],
        ],
      };
    }
    //fin de if
    return mon;
  },//Fin de monsters
  //############
  //NATURALEZAS
  //############
  //1-Activa (Hasty)	2-Huraña (Lonely) 3-Afable (Mild)	4-Ingenua (Naive) 5-Agitada (Impish) 6-Mansa (Quiet)
  //7-Alegre (Jolly) 8-Miedosa (Timid) 9-Alocada (Rash) 10-Modesta (Modest) 11-Amable (Gentle) 12-Osada (Bold)
  //13-Audaz (Brave) 14-Pícara (Naughty) 15-Cauta (Careful)	16-Plácida (Relaxed) 17-Dócil (Docile)	18-Rara (Quirky)
  //19-Firme (Adamant)	20-Serena (Calm) 21-Floja (Lax)	22-Seria (Serious) 23-Fuerte (Hardy)	24-Tímida (Bashful) 25-Grosera (Sassy)
  naturaleza:function(){
    var max=1;
    var min=25;
    return Math.round(Math.random()*(max-min)+min);
  },
  /*habilidades
  34-clorofila
  65-espesura
  */
  //############
  //HABILIDAD
  //############
  //primero busca un numero aleatorio entre 1 y dos que son habilidad normal y oculta y si es normal otro aleatorio entre uno y dos si es oculta lo manda directo
  habilidad: function(monsterHabilidades){
    var monHabilidad=Math.round(Math.random()*(2-1)+1);
    if(monHabilidad==1){
      return monsterHabilidades[1][Math.round(Math.random()*(1-0)+0)];
    }
    else{
      return monsterHabilidades[2];
    }
  },
  
  changeHabilidad:function(monsterHabilidadCurrent,monsterHabilidadesEvo){
    if(monsterHabilidadCurrent===monsterHabilidadesEvo[1][0] || monsterHabilidadCurrent===monsterHabilidadesEvo[1][1]){
      return monsterHabilidadCurrent;
    }
    else {
      return monsterHabilidadesEvo[2];
    }
  },
  
  
  
  
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
        categoria:1,
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
        categoria:1,//1=fisico 2=especial 3=estado
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
        categoria:1,//1=fisico 2=especial 3=estado
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:2,
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
        categoria:3,
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
        categoria:1,
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
        categoria:2,
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
        categoria:1,
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
        categoria:3,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:3,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
        energia:energyNeed(35),
        velocidad:100,
        poder:40,
        quantity:cantidadNormal,
        icritico:criticoNormal,
        turno:1,
      };
    }
    if(movID===34){
      mov ={
        movName:"Body Slam",
        type:11,
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:3,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:3,
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
        categoria:1,
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
        categoria:3,
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
        categoria:3,
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
        categoria:3,
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
        categoria:3,
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
        categoria:2,
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
        categoria:3,
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
        categoria:2,
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
        categoria:2,
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
        categoria:2,
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
        categoria:2,
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
        categoria:2,
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
        categoria:2,
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
        categoria:2,
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
        categoria:2,
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
        categoria:2,
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
        categoria:2,
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
        categoria:2,
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
        categoria:2,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:1,
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
        categoria:2,
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
        categoria:2,
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
        categoria:3,
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
        categoria:3,
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
        categoria:1,
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
        categoria:2,
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
        categoria:3,
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
        categoria:3,
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
        categoria:3,
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
        categoria:2,
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
}//fin del export


//calculo de energia necesaria para usar un movimiento
function energyNeed(a){
  return Math.round(Math.round((a/a/a)+5)*(100/a));
}




