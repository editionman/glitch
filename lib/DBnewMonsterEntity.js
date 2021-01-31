var monsterEntity={};
var cls = require("../data/class.js");
var Utils = require('./utils.js');
var libMonsters = require("../data/monsters.js");
var uuid = require("uuid");
var creatorDB=require('./DBcreator.js');
var sql = require('./sql.js');
monsterEntity = cls.Class.extend({
  init: function(monsternum,userid) {
    //this.uid = uuid.v4(); 
    this.monsterID=null;
    this.monster_num=monsternum;
    this.monstername=libMonsters.monster[monsternum].monstername;
    this.special=Utils.probabilidadShiny();
    this.user_current_owner=userid;
    this.user_owner=userid;
    this.in_team=0;
    this.genero=Utils.ranGender();
    this.type_1=libMonsters.monster[monsternum].type_1;
    this.type_2=libMonsters.monster[monsternum].type_2;
    this.exp=0;
    this.level=1;
    this.naturaleza=Utils.ranNaturaleza();
    this.habilidad=Utils.ranHabilidad(libMonsters.monster[monsternum].habilidades);
    
    this.evaluateMovs=moveObjForDB(libMonsters.monster[monsternum].movimientos,this.level,{});//allmovesOBJ,lvlINT,movesaprendidosOBJ
    this.mov_1=this.evaluateMovs.battlemoves[1];
    this.mov_2=this.evaluateMovs.battlemoves[2];
    this.mov_3=this.evaluateMovs.battlemoves[3];
    this.mov_4=this.evaluateMovs.battlemoves[4];
    this.allMoves=this.evaluateMovs.allmoves;
    
    this.iv_ps=Utils.ranIV();
    this.iv_atk=Utils.ranIV();
    this.iv_def=Utils.ranIV();
    this.iv_atk_es=Utils.ranIV();
    this.iv_def_es=Utils.ranIV();
    this.iv_velocidad=Utils.ranIV();
    this.ev_ps=0;
    this.ev_atk=0;
    this.ev_def=0;
    this.ev_atk_es=0;
    this.ev_def_es=0;
    this.ev_velocidad=0;

    this.base_ps=libMonsters.monster[this.monster_num].stats.ps;
    this.base_atk=libMonsters.monster[this.monster_num].stats.atk;
    this.base_def=libMonsters.monster[this.monster_num].stats.def;
    this.base_atk_es=libMonsters.monster[this.monster_num].stats.atk_es;
    this.base_def_es=libMonsters.monster[this.monster_num].stats.def_es;
    this.base_velocidad=libMonsters.monster[this.monster_num].stats.velocidad;

    this.ps=Math.round(10+(this.level/100*((this.base_ps*2)+this.iv_ps+(this.ev_ps/4)))+this.level);
    this.atk=Math.round(5+(this.level/100*((this.base_atk*2)+this.iv_atk+(this.ev_atk/4)))*(1+0));//al final multiplica por la potencia de la naturaleza que es de neutral=1---favor=1.25----contra=0.75
    this.def=Math.round(5+(this.level/100*((this.base_def*2)+this.iv_def+(this.ev_def/4)))*(1+0));
    this.atk_es=Math.round(5+(this.level/100*((this.base_atk_es*2)+this.iv_atk_es+(this.ev_atk_es/4)))*(1+0));
    this.def_es=Math.round(5+(this.level/100*((this.base_def_es*2)+this.iv_def_es+(this.ev_def_es/4)))*(1+0));
    this.velocidad=Math.round(5+(this.level/100*((this.base_velocidad*2)+this.iv_velocidad+(this.ev_velocidad/4)))*(1+0));
  },
  updateMonsterID:function(conexion,monid){
    this.monsterID=monid;
    creatorDB.UpdateMonsterID(conexion,this);
  },
  saveMonster:function(conexion){
    //datos que se guardaran en db
    var arrString=JSON.stringify(this);
    creatorDB.SaveMonster(conexion,this);
  }, 
  loadMonster:function(info){
    //datos que se guardaran en db
    if(info.monsterID)this.monsterID=info.monsterID;
    if(info.monstername)this.monstername=info.monstername;
    if(info.special)this.special=info.special;
  },
});
//---------------FIN----------------------
module.exports = monsterEntity;




















function moveObjForDB(allmoves,level,availableMoves){
  var result={}
  result.allmoves=availableMoves;
  result.battlemoves={
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
    if(level>=allmoves[i][2] && allmoves[i][3]==="lvlup" && result.allmoves[allmoves[i][0]]===undefined){//puede aprender este movimiento
      result.allmoves[allmoves[i][0]]=allmoves[i][1];
    }
    if(level>=allmoves[i][2] && result.allmoves[allmoves[i][0]]===allmoves[i][1] && result.battlemoves[1].id===null && allmoves[i][4]===false){//aprender en el primero
      result.battlemoves[1]={id:allmoves[i][0],pp:10,maxpp:10};
      allmoves[i][4]=true;
    }
    if(level>=allmoves[i][2] && result.allmoves[allmoves[i][0]]===allmoves[i][1] && result.battlemoves[2].id===null && allmoves[i][4]===false){//aprender en el segundo
      result.battlemoves[2]={id:allmoves[i][0],pp:10,maxpp:10};
      allmoves[i][4]=true;
    }
    if(level>=allmoves[i][2] && result.allmoves[allmoves[i][0]]===allmoves[i][1] && result.battlemoves[3].id===null && allmoves[i][4]===false){//aprender en el tercero
      result.battlemoves[3]={id:allmoves[i][0],pp:10,maxpp:10};
      allmoves[i][4]=true;
    }
    if(level>=allmoves[i][2] && result.allmoves[allmoves[i][0]]===allmoves[i][1] && result.battlemoves[4].id===null && allmoves[i][4]===false){//aprender en el cuarto
      result.battlemoves[4]={id:allmoves[i][0],pp:10,maxpp:10};
      allmoves[i][4]=true;
    }
  }
  return result;
}