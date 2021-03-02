var monsterPlayerEntity={};
var cls = require("../data/class.js");
var Utils = require('./utils.js');
var libMonsters = require("../data/monsters.js"); 
var libMoves = require("../data/moves.js");
var uuid = require("uuid");
var creatorDB=require('./DBcreator.js');
var sql = require('./sql.js');
monsterPlayerEntity = cls.Class.extend({
  init: function(data,partyName,lastTime) {
    this.monster_id=data.monster_id;
    this.monster_num=data.monster_num;
    this.monstername=data.monster_name;
    this.special=data.special
    this.genero=data.genero;
    this.type_1=data.type_1;
    this.type_2=data.type_2;
    this.nivel=data.nivel;
    this.exp=data.exp;
    this.maxExp=data.nivel*data.nivel*data.nivel;//aca va el exp para el siguiente nivel

    this.altura=libMonsters.monster[data.monster_num].altura;
    
    this.mov_1=JSON.parse(data.mov_1);
    this.mov_1.coldown=(this.mov_1.id)?libMoves[this.mov_1.id].coldown:null;
    this.mov_1.lastTime=lastTime;
    this.mov_2=JSON.parse(data.mov_2);
    this.mov_2.coldown=(this.mov_2.id)?libMoves[this.mov_2.id].coldown:null;
    this.mov_2.lastTime=lastTime;
    this.mov_3=JSON.parse(data.mov_3);
    this.mov_3.coldown=(this.mov_3.id)?libMoves[this.mov_3.id].coldown:null;
    this.mov_3.lastTime=lastTime;
    this.mov_4=JSON.parse(data.mov_4);
    this.mov_4.coldown=(this.mov_4.id)?libMoves[this.mov_4pl.id].coldown:null;
    this.mov_4.lastTime=lastTime;
    
    this.owner=data.user_current_owner;
    this.battlePartyName=partyName;
    this.battlePartyNum=null;
    //this.battleParty=null;
    //this.party=null;
    ////multiplicador
    this.psMultipler=1;//se suma con lo que aumenta por ejemplo el doble *2=2, la mitad *0.5
    this.atkMultipler=1;
    this.defMultipler=1;
    this.atk_esMultipler=1;
    this.def_esMultipler=1;
    this.velocidadMultipler=1;
    //NIVELES
    this.psIncrease=0;//se suma un punto por nivel maximo +6
    this.psDecrease=0;//se suma un punto por nivel maximo +6
    this.atkIncrease=0;
    this.atkDecrease=0;
    this.defIncrease=0;
    this.defDecrease=0;
    this.atk_esIncrease=0;
    this.atk_esDecrease=0;
    this.def_esIncrease=0;
    this.def_esDecrease=0;
    this.velocidadIncrease=0;
    this.velocidadDecrease=0;
    //static--max stats on game no changes
    this.s_ps=Utils.StatPromedio(data,"ps",libMonsters.monster[data.monster_num].stats.ps);
    this.s_atk=Utils.StatPromedio(data,"atk",libMonsters.monster[data.monster_num].stats.atk);
    this.s_def=Utils.StatPromedio(data,"def",libMonsters.monster[data.monster_num].stats.def);
    this.s_atk_es=Utils.StatPromedio(data,"atk_es",libMonsters.monster[data.monster_num].stats.atk_es);
    this.s_def_es=Utils.StatPromedio(data,"def_es",libMonsters.monster[data.monster_num].stats.def_es);
    this.s_velocidad=Utils.StatPromedio(data,"velocidad",libMonsters.monster[data.monster_num].stats.velocidad);
    //for game--max stats on game with changes
    this.ps=this.s_ps*((3+this.psIncrease)/(3+this.psDecrease))*this.psMultipler;
    this.atk=this.s_atk*((3+this.atkIncrease)/(3+this.atkDecrease))*this.atkMultipler;
    this.def=this.s_def*((3+this.defIncrease)/(3+this.defDecrease))*this.defMultipler;
    this.atk_es=this.s_atk_es*((3+this.atk_esIncrease)/(3+this.atk_esDecrease))*this.atk_esMultipler;
    this.def_es=this.s_def_es*((3+this.def_esIncrease)/(3+this.def_esDecrease))*this.def_esMultipler;
    this.velocidad=this.s_velocidad*((3+this.velocidadIncrease)/(3+this.velocidadDecrease))*this.velocidadMultipler;
    
    this.currPS=this.ps;//este debe venir de la base de datos cuando se agrege
    //-----------------WORLD DATA----FOR ALL CONEXIONS
    this.monX = null;
    this.monY = null;
    this.monZ = null;
    this.monRotX = null;
    this.monRotY = null;
    this.monRotZ = null;
    this.monBodyRotX = null;
    this.monBodyRotY = null;
    this.monBodyRotZ = null;
    this.animStatus = 'idle';
  },
  //update Stats-->En cada turno se hace un update stats para actualizar los cambios por movs, habilidades, objetos, clima, status
  //UPDATEAR CUANDO CAMBIA UN INCREASE; DECREASE; MULTIPLIER
  updateStats:function(){
    this.ps=this.s_ps*((3+this.psIncrease)/(3+this.psDecrease))*this.psMultipler;
    this.atk=this.s_atk*((3+this.atkIncrease)/(3+this.atkDecrease))*this.atkMultipler;
    this.def=this.s_def*((3+this.defIncrease)/(3+this.defDecrease))*this.defMultipler;
    this.atk_es=this.s_atk_es*((3+this.atk_esIncrease)/(3+this.atk_esDecrease))*this.atk_esMultipler;
    this.def_es=this.s_def_es*((3+this.def_esIncrease)/(3+this.def_esDecrease))*this.def_esMultipler;
    this.velocidad=this.s_velocidad*((3+this.velocidadIncrease)/(3+this.velocidadDecrease))*this.velocidadMultipler;
  },
  //UPDATE NIVELES DE LOS STATS
  //LEVEL CHANGE|||||||| MIN -6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6 MAX
  nivelPS:function(qty){
    var sign=Math.sign(qty);
    if(sign===1){
      if(this.psDecrease===0){
        if(this.psIncrease===6){console.log("YA ESTA AL MAXIMO NIVEL");}
        else if(this.psIncrease+qty>6){this.psIncrease=6;}
        else{this.psIncrease=this.psIncrease+qty;}
      }
      else if(this.psDecrease>0){
        if(this.psDecrease-qty<0){
          var newQty=Math.abs(this.psDecrease-qty);
          this.psDecrease=0;
          return this.nivelPS(newQty);
        }else{this.psDecrease=this.psDecrease-qty;}
      }
      console.log("Inc: "+this.psIncrease);
      console.log("Dec: "+this.psDecrease);
    }else if(sign===-1){
      var posQty=Math.abs(qty);
      if(this.psIncrease===0){
        if(this.psDecrease===6){console.log("YA ESTA AL MINIMO NIVEL");}
        else if(this.psDecrease+posQty>6){this.psDecrease=6;}
        else{this.psDecrease=this.psDecrease+posQty;}
      }else if(this.psIncrease>0){
        if(this.psIncrease-posQty<0){
          var newQty=Math.abs(this.psIncrease-posQty);
          this.psIncrease=0;
          return this.nivelPS(-newQty);
        }else{this.psIncrease=this.psIncrease-posQty;}
      }
      console.log("Inc: "+this.psIncrease);
      console.log("Dec: "+this.psDecrease);
    }
    this.updateStats();//al terminar todo actualizar los stats
  },//....PS
  nivelATK:function(qty){
    var sign=Math.sign(qty);
    if(sign===1){
      if(this.atkDecrease===0){
        if(this.atkIncrease===6){console.log("YA ESTA AL MAXIMO NIVEL");}
        else if(this.atkIncrease+qty>6){this.atkIncrease=6;}
        else{this.atkIncrease=this.atkIncrease+qty;}
      }
      else if(this.atkDecrease>0){
        if(this.atkDecrease-qty<0){
          var newQty=Math.abs(this.atkDecrease-qty);
          this.atkDecrease=0;
          return this.nivelATK(newQty);
        }else{this.atkDecrease=this.atkDecrease-qty;}
      }
      console.log("Inc: "+this.atkIncrease);
      console.log("Dec: "+this.atkDecrease);
    }else if(sign===-1){
      var posQty=Math.abs(qty);
      if(this.atkIncrease===0){
        if(this.atkDecrease===6){console.log("YA ESTA AL MINIMO NIVEL");}
        else if(this.atkDecrease+posQty>6){this.atkDecrease=6;}
        else{this.atkDecrease=this.atkDecrease+posQty;}
      }else if(this.atkIncrease>0){
        if(this.atkIncrease-posQty<0){
          var newQty=Math.abs(this.atkIncrease-posQty);
          this.atkIncrease=0;
          return this.nivelATK(-newQty);
        }else{this.atkIncrease=this.atkIncrease-posQty;}
      }
      console.log("Inc: "+this.atkIncrease);
      console.log("Dec: "+this.atkDecrease);
    }
    this.updateStats();//al terminar todo actualizar los stats
  },//....ATK
  nivelDEF:function(qty){
    var sign=Math.sign(qty);
    if(sign===1){
      if(this.defDecrease===0){
        if(this.defIncrease===6){console.log("YA ESTA AL MAXIMO NIVEL");}
        else if(this.defIncrease+qty>6){this.defIncrease=6;}
        else{this.defIncrease=this.defIncrease+qty;}
      }
      else if(this.defDecrease>0){
        if(this.defDecrease-qty<0){
          var newQty=Math.abs(this.defDecrease-qty);
          this.defDecrease=0;
          return this.nivelDEF(newQty);
        }else{this.defDecrease=this.defDecrease-qty;}
      }
      console.log("Inc: "+this.defIncrease);
      console.log("Dec: "+this.defDecrease);
    }else if(sign===-1){
      var posQty=Math.abs(qty);
      if(this.defIncrease===0){
        if(this.defDecrease===6){console.log("YA ESTA AL MINIMO NIVEL");}
        else if(this.defDecrease+posQty>6){this.defDecrease=6;}
        else{this.defDecrease=this.defDecrease+posQty;}
      }else if(this.defIncrease>0){
        if(this.defIncrease-posQty<0){
          var newQty=Math.abs(this.defIncrease-posQty);
          this.defIncrease=0;
          return this.nivelDEF(-newQty);
        }else{this.defIncrease=this.defIncrease-posQty;}
      }
      console.log("Inc: "+this.defIncrease);
      console.log("Dec: "+this.defDecrease);
    }
    this.updateStats();//al terminar todo actualizar los stats
  },//....DEF
  nivelATK_ES:function(qty){
    var sign=Math.sign(qty);
    if(sign===1){
      if(this.atk_esDecrease===0){
        if(this.atk_esIncrease===6){console.log("YA ESTA AL MAXIMO NIVEL");}
        else if(this.atk_esIncrease+qty>6){this.atk_esIncrease=6;}
        else{this.atk_esIncrease=this.atk_esIncrease+qty;}
      }
      else if(this.atk_esDecrease>0){
        if(this.atk_esDecrease-qty<0){
          var newQty=Math.abs(this.atk_esDecrease-qty);
          this.atk_esDecrease=0;
          return this.nivelATK_ES(newQty);
        }else{this.atk_esDecrease=this.atk_esDecrease-qty;}
      }
      console.log("Inc: "+this.atk_esIncrease);
      console.log("Dec: "+this.atk_esDecrease);
    }else if(sign===-1){
      var posQty=Math.abs(qty);
      if(this.atk_esIncrease===0){
        if(this.atk_esDecrease===6){console.log("YA ESTA AL MINIMO NIVEL");}
        else if(this.atk_esDecrease+posQty>6){this.atk_esDecrease=6;}
        else{this.atk_esDecrease=this.atk_esDecrease+posQty;}
      }else if(this.atk_esIncrease>0){
        if(this.atk_esIncrease-posQty<0){
          var newQty=Math.abs(this.atk_esIncrease-posQty);
          this.atk_esIncrease=0;
          return this.nivelATK_ES(-newQty);
        }else{this.atk_esIncrease=this.atk_esIncrease-posQty;}
      }
      console.log("Inc: "+this.atk_esIncrease);
      console.log("Dec: "+this.atk_esDecrease);
    }
    this.updateStats();//al terminar todo actualizar los stats
  },//....ATK_ES
  nivelDEF_ES:function(qty){
    var sign=Math.sign(qty);
    if(sign===1){
      if(this.def_esDecrease===0){
        if(this.def_esIncrease===6){console.log("YA ESTA AL MAXIMO NIVEL");}
        else if(this.def_esIncrease+qty>6){this.def_esIncrease=6;}
        else{this.def_esIncrease=this.def_esIncrease+qty;}
      }
      else if(this.def_esDecrease>0){
        if(this.def_esDecrease-qty<0){
          var newQty=Math.abs(this.def_esDecrease-qty);
          this.def_esDecrease=0;
          return this.nivelDEF_ES(newQty);
        }else{this.def_esDecrease=this.def_esDecrease-qty;}
      }
      console.log("Inc: "+this.def_esIncrease);
      console.log("Dec: "+this.def_esDecrease);
    }else if(sign===-1){
      var posQty=Math.abs(qty);
      if(this.def_esIncrease===0){
        if(this.def_esDecrease===6){console.log("YA ESTA AL MINIMO NIVEL");}
        else if(this.def_esDecrease+posQty>6){this.def_esDecrease=6;}
        else{this.def_esDecrease=this.def_esDecrease+posQty;}
      }else if(this.def_esIncrease>0){
        if(this.def_esIncrease-posQty<0){
          var newQty=Math.abs(this.def_esIncrease-posQty);
          this.def_esIncrease=0;
          return this.nivelDEF_ES(-newQty);
        }else{this.def_esIncrease=this.def_esIncrease-posQty;}
      }
      console.log("Inc: "+this.def_esIncrease);
      console.log("Dec: "+this.def_esDecrease);
    }
    this.updateStats();//al terminar todo actualizar los stats
  },//....DEF_ES
  nivelVELOCIDAD:function(qty){
    var sign=Math.sign(qty);
    if(sign===1){
      if(this.velocidadDecrease===0){
        if(this.velocidadIncrease===6){console.log("YA ESTA AL MAXIMO NIVEL");}
        else if(this.velocidadIncrease+qty>6){this.velocidadIncrease=6;}
        else{this.velocidadIncrease=this.velocidadIncrease+qty;}
      }
      else if(this.velocidadDecrease>0){
        if(this.velocidadDecrease-qty<0){
          var newQty=Math.abs(this.velocidadDecrease-qty);
          this.velocidadDecrease=0;
          return this.nivelVELOCIDAD(newQty);
        }else{this.velocidadDecrease=this.velocidadDecrease-qty;}
      }
      console.log("Inc: "+this.velocidadIncrease);
      console.log("Dec: "+this.velocidadDecrease);
    }else if(sign===-1){
      var posQty=Math.abs(qty);
      if(this.velocidadIncrease===0){
        if(this.velocidadDecrease===6){console.log("YA ESTA AL MINIMO NIVEL");}
        else if(this.velocidadDecrease+posQty>6){this.velocidadDecrease=6;}
        else{this.velocidadDecrease=this.velocidadDecrease+posQty;}
      }else if(this.velocidadIncrease>0){
        if(this.velocidadIncrease-posQty<0){
          var newQty=Math.abs(this.velocidadIncrease-posQty);
          this.velocidadIncrease=0;
          return this.nivelVELOCIDAD(-newQty);
        }else{this.velocidadIncrease=this.velocidadIncrease-posQty;}
      }
      console.log("Inc: "+this.velocidadIncrease);
      console.log("Dec: "+this.velocidadDecrease);
    }
    this.updateStats();//al terminar todo actualizar los stats
  },//....VELOCIDAD
  //MULTIPLICADORES
  //se multiplica por la cantidad ejemplo this.psMultiplier*2*1.5*0.5
  mulPS:function(qty){
    this.psMultipler=this.psMultipler*qty;
    this.updateStats();
  },
  mulATK:function(qty){
    this.atkMultipler=this.atkMultipler*qty;
    this.updateStats();
  },
  mulDEF:function(qty){
    this.defMultipler=this.defMultipler*qty;
    this.updateStats();
  },
  mulATK_ES:function(qty){
    this.atk_esMultipler=this.atk_esMultipler*qty;
    this.updateStats();
  },
  mulDEF_ES:function(qty){
    this.def_esMultipler=this.def_esMultipler*qty;
    this.updateStats();
  },
  mulVELOCIDAD:function(qty){
    this.velocidadMultipler=this.velocidadMultipler*qty;
    this.updateStats();
  },
});
//---------------FIN----------------------
module.exports = monsterPlayerEntity;