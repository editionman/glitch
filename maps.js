//itemStorage....contenido|||itemid,qty
var basicFunctions = require("./basicFunctions.js");
var monsters = require("./monsters.js");
var uuid=require("uuid");
//console.log(uuid.v4());
//OBJECTS
function Mon(name,monid,especial,level,inBattle,rival){
  //this.id=0;
  this.name=name;
	this.monid=monid;
	this.especial=especial;
  this.level=level;
	this.inBattle=inBattle;
  this.rival=rival;
  //Math.round(5+(nivel/100*((base*2)+iv+(ev/4)))*(1+naturaleza));
  //monsters.monster(monid).stats.ps;
  
  this.ps=Math.round(10+(level/100*((monsters.monster(monid).stats.ps*2)+31+(0/4)))+level);
  this.currHealth=this.ps;
  this.atk=Math.round(5+(level/100*((monsters.monster(monid).stats.atk*2)+31+(0/4)))*(1+0));
  this.def=Math.round(5+(level/100*((monsters.monster(monid).stats.def*2)+31+(0/4)))*(1+0));;
  this.atk_es=Math.round(5+(level/100*((monsters.monster(monid).stats.atk_es*2)+31+(0/4)))*(1+0));
  this.def_es=Math.round(5+(level/100*((monsters.monster(monid).stats.def_es*2)+31+(0/4)))*(1+0));;
  this.velocidad=Math.round(5+(level/100*((monsters.monster(monid).stats.velocidad*2)+31+(0/4)))*(1+0));;
  this.type_1=monsters.monster(monid).type_1;
  this.type_2=monsters.monster(monid).type_1;
  this.altura=monsters.monster(monid).altura;
  this.genero=basicFunctions.NumeroAleatorio(0,1);//0 hembra 1 macho
  this.x=0;
  this.y=0;
  this.z=0;
}

//EXPORT---------------------
var exports = (module.exports = {
  getMap: function(mapid) {
    //Define Variables
    var map = {
      mapname: "In Development",
      mapcode: 0,
      spawnMonsters: {
          spawn1: {
            arrMon:[1,4,7],
            arrlvl:[1,7],
            monsters: spawnMonstersFunc([0,0,0],0,[0,0]),//invocara entre 3 monsters de id 0 la cantidad de 0, de level 0 al 0
          },
        },
      npcs: {
        //1: [65, 65], //normal
        //2: 34 //oculta
      },
      players: {}
    };
    //DANDO CONTENIDO A LAS VARIABLES
    //start de item
    if (mapid === 1) {
      map = {
        mapname: "EnPrueba1",
        mapcode: 1,
        spawnMonsters: {
          spawn1: {
            arrMon:[1,4,7],
            arrlvl:[1,7],
            monsters: spawnMonstersFunc([1,4,7],5,[1,7]),//invocara 3 monsters bulbasaur,charmander,squirtle, de level 1 al 7
          },
        },
        npcs: {
          //1: [65, 65], //normal
          //2: 34 //oculta
        },
        players: {}
      };
    }
    if (mapid === 2) {
      map = {
        mapname: "EnPrueba2",
        mapcode: 2,
        levelMonsters:[0,0],
        spawnMonsters: {
          spawn1: {
            monsters: spawnMonstersFunc([1,4,7],3,[10,20]),//invocara 3 monsters bulbasaur,charmander,squirtle del level 10 al20
          },
        },
        npcs: {
          //1: [65, 65], //normal
          //2: 34 //oculta
        },
        players: {}
      };
    }
    return map;
    //FIN DE MAP######################################################
  },
  getBattleMap: function(mapid) {},
  getMonstersMap: function(arrMon,qty,arrLvl) {
    spawnMonstersFunc(arrMon,qty,arrLvl)
  },
}); //fin del export































var monsterCategorias=["L","S","A","B","C","D","E","F"];



function spawnMonstersFunc(array,qty,arrLevel){
  if(qty==0)return;
  var monsters=[];
  //monsters.monster(array)
  for(var i=0;i<qty;i++){
    //se repite tantas veces como cantidad de monster hay
    monsters[i]=foundMonster(array,arrLevel);
  }
  if(i==qty-1 && monsters.length==0);//Crear monstruo por que ya esta en el final y no creo nada;
  return monsters;
  
}
function foundMonster(array,arrLevel){
  var newMonsterFounded;
  var mostLowCategoria=monsterCategorias[0];
  var mostLowCatMonster;
  var mostLowCatIndex;
  var mostLowCatName;
  var isCreated=false;
  for(var i=0;i<array.length;i++){//BUSCAR LA CATEGORIA MAS BAJA
    var categoria=monsters.monster(array[i]).categoria;
    mostLowCategoria=compareCategoria(mostLowCategoria,categoria);
  }
  for(var i=0;i<array.length;i++){
    var categoria=monsters.monster(array[i]).categoria;
    if(categoria==="0")return;//monster en desarrollo
    if(categoria===mostLowCategoria){
      mostLowCatMonster=monsters.monster(array[i]);
      mostLowCatIndex=array[i];
      mostLowCatName=monsters.monster(array[i]).monstername;
    }
    var prob=probCategoria(categoria);
    isCreated=basicFunctions.probabilidadEncuentro(prob);
    if(isCreated==true){//se crea monster
      newMonsterFounded=crearMonsterWild(monsters.monster(array[i]).monstername,monsters.monster(array[i]),array[i],arrLevel);
      return newMonsterFounded;
    }
  }
  foundMonster(array,arrLevel);
  newMonsterFounded=crearMonsterWild(mostLowCatName,mostLowCatMonster,mostLowCatIndex,arrLevel);
  return newMonsterFounded;
}
function crearMonsterWild(name,monInfo,numMon,arrLevel){
  var especial=basicFunctions.probabilidadShiny();
  var newMon=new Mon(name,numMon,especial,lvlMonsterMap(arrLevel),false,null);
  return newMon;
}
function lvlMonsterMap(arrLevel){
  return ranInt(arrLevel[0],arrLevel[1]);
}
function probCategoria(categoria){
  if(categoria=="L")return 0;
  if(categoria=="S")return 1;//0.01
  if(categoria=="A")return 3;//0.1
  if(categoria=="B")return 10;//5
  if(categoria=="C")return 45;//15
  if(categoria=="D")return 50;//30
  if(categoria=="E")return 70;//70
  if(categoria=="F")return 90;//90
}
function compareCategoria(currCat,newCat){
  var newCatIndex=0;
  var currCatIndex=0;
  for(var i=0;i<monsterCategorias.length;i++){
    if(monsterCategorias[i]==newCat){
        newCatIndex=i;
    }
    if(monsterCategorias[i]==currCat){
      currCatIndex=i;
    }
  }
  if(newCatIndex>currCatIndex){
    return monsterCategorias[newCatIndex];
  }else if(newCatIndex<currCatIndex){
    return monsterCategorias[currCatIndex];
  }
  else return monsterCategorias[currCatIndex];
}
//Funciones de probabilidades
function probabilidad(max) {//1 de max
  var result=Math.floor(Math.random()*max)+1;
  if(result==1)return true;
  else return false;
}
function Percentage(percent){//del 0% al100%
  var amount=100/percent;
  var bool=probabilidad(amount);
  if(bool==true)return true;
  else return false;
}
function ranInt(min,max){
  return Math.round(Math.random()*(max-min)+min);
}

