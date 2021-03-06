 //AMBIENTES
//1-GRASS
//2-
var monsters={};
monsters.monster={};
monsters.mega={};
monsters.transform={};
monsters.monster[0]={
  monstername:"In Development",
  altura:0,
  categoria:"0",
  type_1:11,//https://pokemon.fandom.com/es/wiki/Tipos_elementales
  type_2:0,//https://pokemon.fandom.com/es/wiki/Tipos_elementales
  stats:{
    exp:64,//exp base que da un pokemon al ser derrotado||||https://pokemon.fandom.com/es/wiki/Experiencia_base
    ps:45,
    atk:49,
    def:49,
    atk_es:65,
    def_es:65,
    velocidad:45,
  },
  habilidades:{//https://www.wikidex.net/wiki/Lista_de_habilidades
    1:[65,65],//normal
    2:34,//oculta
  },
  //array de movimientos: [id,name,lvlneed,modo]
  //modos: lvlup,mt-mo,tutor,breed,evento
  movimientos:[
    [33,"Tackle",1,"lvlup"],
    [497,"Echoed Voice",1,"lvlup"],
  ],
  ambiente:0,//mapa donde peleara el wild
};
monsters.monster[1]={
  monstername:"Bulbasaur",
  altura:2,
  categoria:"A",
  type_1:12,
  type_2:17,
  stats:{
    exp:64,
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
    in:2,//que sea un array combiene mas para poder poner machos y hembras
  },
  //array de movimientos: [id,name,lvlneed,modo]
  //modos: lvlup,mt-mo,tutor,breed,evento
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
  ambiente:1,//Grass Ambient
};
monsters.monster[2]={
  monstername:"Ivysaur",
  altura:2.5,
  categoria:"A",
  type_1:12,
  type_2:17,
  stats:{
    exp:142,
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
  //array de movimientos: [id,name,lvlneed,modo]
  //modos: lvlup,mt-mo,tutor,breed,evento
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
  ambiente:1,
};
monsters.monster[3]={
  monstername:"Venusaur",
  altura:2.5,
  categoria:"A",
  type_1:12,
  type_2:17,
  stats:{
    exp:236,
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
  ambiente:1,
};
monsters.monster[4]={
  monstername:"Charmander",
  altura:2,
  categoria:"A",
  type_1:7,
  type_2:0,
  stats:{
    exp:62,
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
    in:5,
  },
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
  ambiente:1,
};
monsters.monster[5]={
  monstername:"Charmeleon",
  altura:2.5,
  categoria:"A",
  type_1:7,
  type_2:0,
  stats:{
    exp:142,
    ps:58,
    atk:64,
    def:58,
    atk_es:80,
    def_es:65,
    velocidad:80,
  },
  habilidades:{
    1:[66,66],//normal
    2:94,//oculta
  },
  evo:{
    nivel:36,
    object:0,
    in:6,
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
  ambiente:1,
};
monsters.monster[6]={
  monstername:"Charizard",
  altura:2.5,
  categoria:"A",
  type_1:7,
  type_2:18,
  stats:{
    exp:240,
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
  ambiente:1,
};
monsters.monster[7]={
  monstername:"Squirtle",
  altura:2,
  categoria:"A",
  type_1:2,
  type_2:0,
  stats:{
    exp:63,
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
  ambiente:1,
};
monsters.monster[8]={
  monstername:"Wartortle",
  altura:2.5,
  categoria:"A",
  type_1:2,
  type_2:0,
  stats:{
    exp:142,
    ps:59,
    atk:63,
    def:80,
    atk_es:65,
    def_es:80,
    velocidad:58,
  },
  habilidades:{
    1:[67,67],//normal
    2:44,//oculta
  },
  evo:{
    nivel:36,
    object:0,
    in:9,
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
  ambiente:1,
};
monsters.monster[9]={
  monstername:"Blastoise",
  altura:2.5,
  categoria:"A",
  type_1:2,
  type_2:0,
  stats:{
    exp:239,
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
  ambiente:1,
};
monsters.monster[10]={
  monstername:"Caterpie",
  altura:1.5,
  categoria:"D",
  type_1:3,
  type_2:0,
  stats:{
    exp:39,
    ps:45,
    atk:30,
    def:35,
    atk_es:20,
    def_es:20,
    velocidad:45,
  },
  habilidades:{
    1:[19,19],//normal
    2:50,//oculta
  },
  evo:{
    nivel:7,
    object:0,
    in:11,
  },
  movimientos:[
    [33,"Tackle",1,"lvlup"],
    //[81,"String Shot",1,"lvlup"],
    //[450,"Bug Bite",9,"lvlup"],
  ],
  ambiente:1,
};
monsters.monster[11]={
  monstername:"Metapod",
  altura:1.5,
  categoria:"D",
  type_1:3,
  type_2:0,
  stats:{
    exp:72,
    ps:50,
    atk:20,
    def:55,
    atk_es:25,
    def_es:25,
    velocidad:30,
  },
  habilidades:{
    1:[61,61],//normal
    2:61,//oculta
  },
  evo:{
    nivel:10,
    object:0,
    in:12,
  },
  movimientos:[
    [106,"Harden",1,"lvlup"],
  ],
  ambiente:1,
};
monsters.monster[12]={
  monstername:"Butterfree",
  altura:1.5,
  categoria:"D",
  type_1:3,
  type_2:18,
  stats:{
    exp:178,
    ps:60,
    atk:45,
    def:50,
    atk_es:90,
    def_es:80,
    velocidad:70,
  },
  habilidades:{
    1:[14,14],//normal
    2:110,//oculta
  },
  gigaevo:{
    bool:true,
    object:0,
  },
  movimientos:[
    [16,"Gust",1,"lvlup"],
    //[93,"Confusion",1,"lvlup"],
    //[77,"Poison Powder",13,"lvlup"],
  ],
  ambiente:1,
};
//-------------------------FIN---------------------
var exports = module.exports = monsters;


