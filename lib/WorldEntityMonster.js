var monsterEntity={};
var cls = require("../data/class.js");
var Utils = require('./utils.js');
var libMonsters = require("../data/monsters.js");
var uuid = require("uuid");
var creatorDB=require('./DBcreator.js');
var sql = require('./sql.js');
//"ESTE ES INFO PARA EL WILD";
monsterEntity = cls.Class.extend({
  init: function(monsternum,level,spawn,ambiente) {
    this.uid = uuid.v4();
    this.monster_num=monsternum;
    this.monstername=libMonsters.monster[monsternum].monstername;
    this.special=Utils.probabilidadShiny();
    this.genero=Utils.ranGender();
    this.type_1=libMonsters.monster[monsternum].type_1;
    this.type_2=libMonsters.monster[monsternum].type_2;
    this.level=level;
    //this.inBattle=false;
    //this.rival=null;
    this.spawn=spawn;
    
    this.altura=libMonsters.monster[monsternum].altura;
    this.x=null;
    this.y=null;
    this.z=null;
    this.rotX=null;
    this.rotY=null;
    this.rotZ=null;
    this.animStatus = 'idle';
    this.ambiente=ambiente;//mapa donde peleara el wild
    //este creo que es temporal por que va a ser del obj de batalla y este es de world
    //this.owner=null;
    this.battlePartyName="Wild";
    this.monster_id=this.uid;
    
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
    //data
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
    //static--max stats on game no changes
    this.s_ps=Math.round(10+(this.level/100*((base_ps*2)+iv_ps+(ev_ps/4)))+this.level);
    this.s_atk=Math.round(5+(this.level/100*((base_atk*2)+iv_atk+(ev_atk/4)))*(1+0));//al final multiplica por la potencia de la naturaleza que es de neutral=1---favor=1.25----contra=0.75
    this.s_def=Math.round(5+(this.level/100*((base_def*2)+iv_def+(ev_def/4)))*(1+0));
    this.s_atk_es=Math.round(5+(this.level/100*((base_atk_es*2)+iv_atk_es+(ev_atk_es/4)))*(1+0));
    this.s_def_es=Math.round(5+(this.level/100*((base_def_es*2)+iv_def_es+(ev_def_es/4)))*(1+0));
    this.s_velocidad=Math.round(5+(this.level/100*((base_velocidad*2)+iv_velocidad+(ev_velocidad/4)))*(1+0));
    //for game--max stats on game with changes
    this.ps=this.s_ps*((3+this.psIncrease)/(3+this.psDecrease))*this.psMultipler;
    this.atk=this.s_atk*((3+this.atkIncrease)/(3+this.atkDecrease))*this.atkMultipler;
    this.def=this.s_def*((3+this.defIncrease)/(3+this.defDecrease))*this.defMultipler;
    this.atk_es=this.s_atk_es*((3+this.atk_esIncrease)/(3+this.atk_esDecrease))*this.atk_esMultipler;
    this.def_es=this.s_def_es*((3+this.def_esIncrease)/(3+this.def_esDecrease))*this.def_esMultipler;
    this.velocidad=this.s_velocidad*((3+this.velocidadIncrease)/(3+this.velocidadDecrease))*this.velocidadMultipler;
    
    this.currPS=this.ps;//este debe venir de la base de datos cuando se agrege
  },
  //BATTLE FUNCTIONS
  takeDMG:function(dmgQty){
    var newCurrPS=this.currPS-dmgQty;
    if(newCurrPS<0){
      this.currPS=0;
      console.log("se debe destruir este monster por que ya no tiene vida");
    }
    else this.currPS=newCurrPS;
  },
  takeHealth:function(healthQty){
    var newCurrPS=this.currPS+healthQty;
    if(newCurrPS>0)this.currPS=newCurrPS
    else console.log("This monster is dead");
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
module.exports = monsterEntity; 