var monsterBattleEntity={};
var cls = require("../data/class.js");
var Utils = require('./utils.js');
var libMonsters = require("../data/monsters.js"); 
var uuid = require("uuid");
var creatorDB=require('./DBcreator.js');
var sql = require('./sql.js');
monsterBattleEntity = cls.Class.extend({
  init: function(data) {
    this.monster_id=data.monster_id;
    this.monster_num=data.monster_num;
    this.monstername=data.monstername;
    this.special=data.special
    this.genero=data.genero;
    this.type_1=data.type_1;
    this.type_2=data.type_2;
    this.nivel=data.level;
    this.exp=0;
    this.maxExp=0;//aca va el exp para el siguiente nivel
    
    this.altura=libMonsters.monster[data.monster_num].altura;
    this.x=null;
    this.y=null;
    this.z=null;
    this.rotX=null;
    this.rotY=null;
    this.rotZ=null;

    this.naturaleza=Utils.ranNaturaleza();
    this.habilidad=Utils.ranHabilidad(libMonsters.monster[data.monster_num].habilidades);

    
    var iv_ps=Utils.ranIV();
    var iv_atk=Utils.ranIV();
    var iv_def=Utils.ranIV();
    var iv_atk_es=Utils.ranIV();
    var iv_def_es=Utils.ranIV();
    var iv_velocidad=Utils.ranIV();
    var ev_ps=0;
    var ev_atk=0;
    var ev_def=0;
    var ev_atk_es=0;
    var ev_def_es=0;
    var ev_velocidad=0;

    var base_ps=libMonsters.monster[this.monster_num].stats.ps;
    var base_atk=libMonsters.monster[this.monster_num].stats.atk;
    var base_def=libMonsters.monster[this.monster_num].stats.def;
    var base_atk_es=libMonsters.monster[this.monster_num].stats.atk_es;
    var base_def_es=libMonsters.monster[this.monster_num].stats.def_es;
    var base_velocidad=libMonsters.monster[this.monster_num].stats.velocidad;

    this.ps=Math.round(10+(this.nivel/100*((base_ps*2)+iv_ps+(ev_ps/4)))+this.nivel);
    this.atk=Math.round(5+(this.nivel/100*((base_atk*2)+iv_atk+(ev_atk/4)))*(1+0));//al final multiplica por la potencia de la naturaleza que es de neutral=1---favor=1.25----contra=0.75
    this.def=Math.round(5+(this.nivel/100*((base_def*2)+iv_def+(ev_def/4)))*(1+0));
    this.atk_es=Math.round(5+(this.nivel/100*((base_atk_es*2)+iv_atk_es+(ev_atk_es/4)))*(1+0));
    this.def_es=Math.round(5+(this.nivel/100*((base_def_es*2)+iv_def_es+(ev_def_es/4)))*(1+0));
    this.velocidad=Math.round(5+(this.nivel/100*((base_velocidad*2)+iv_velocidad+(ev_velocidad/4)))*(1+0));
    
    var evaluateMovs=movesObj(libMonsters.monster[data.monster_num].movimientos,this.nivel);//allmovesOBJ,lvlINT,movesaprendidosOBJ
    this.mov_1=evaluateMovs[1];
    this.mov_2=evaluateMovs[2];
    this.mov_3=evaluateMovs[3];
    this.mov_4=evaluateMovs[4];
    
    this.currPS=this.ps;
    this.battlePartyName=null;
    this.battlePartyNum=null;
    //this.battleParty=null;
    //this.party=null; 
  },
});
//---------------FIN----------------------
module.exports = monsterBattleEntity;
































function movesObj(allmoves,level){
  var result={}
  result={
    1:{id:null,pp:null,maxpp:null},
    2:{id:null,pp:null,maxpp:null},
    3:{id:null,pp:null,maxpp:null},
    4:{id:null,pp:null,maxpp:null},
  };
  for(var i=0;i<allmoves.length;i++){
    allmoves[i][4]=false;
    //allmoves[i][0]--->idmove
    //allmoves[i][1]--->name
    //allmoves[i][2]--->lvlneed
    //allmoves[i][3]--->modeobtain
    //allmoves[i][4]--->CREADO ESPECIALMENTE PARA VER SI ESTA SIENDO USADO ESTE MOVE EN LA FUNCION
    if(level>=allmoves[i][2] && allmoves[i][3]==="lvlup" && result[allmoves[i][0]]===undefined){//puede aprender este movimiento
      result[allmoves[i][0]]=allmoves[i][1];
    }
    if(level>=allmoves[i][2] && result[allmoves[i][0]]===allmoves[i][1] && result[1].id===null && allmoves[i][4]===false){//aprender en el primero
      result[1]={id:allmoves[i][0],pp:10,maxpp:10};
      allmoves[i][4]=true;
    }
    if(level>=allmoves[i][2] && result[allmoves[i][0]]===allmoves[i][1] && result[2].id===null && allmoves[i][4]===false){//aprender en el segundo
      result[2]={id:allmoves[i][0],pp:10,maxpp:10};
      allmoves[i][4]=true;
    }
    if(level>=allmoves[i][2] && result[allmoves[i][0]]===allmoves[i][1] && result[3].id===null && allmoves[i][4]===false){//aprender en el tercero
      result[3]={id:allmoves[i][0],pp:10,maxpp:10};
      allmoves[i][4]=true;
    }
    if(level>=allmoves[i][2] && result[allmoves[i][0]]===allmoves[i][1] && result[4].id===null && allmoves[i][4]===false){//aprender en el cuarto
      result[4]={id:allmoves[i][0],pp:10,maxpp:10};
      allmoves[i][4]=true;
    }
  }
  return result;
}