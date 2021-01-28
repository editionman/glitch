var creatorsql={};
var exports = module.exports = creatorsql;
var Utils = require('./utils.js');
var Items = require('../items.js');

//*************************************************
//*************************************************
//|||||||||||||||MONSTERS||||||||||||||||||||||||||
//*************************************************
//*************************************************
creatorsql.InsertNewMonsterDB= function(conexion,str,userid){
  return new Promise((resolve,reject)=>{
    var insertSQL = "INSERT INTO allmonsters (allmonsters_id,allmonsters_user,allmonsters_content) VALUES (NULL, '"+userid+"', '"+str+"')";
    conexion.query(insertSQL, function (err, result) {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
};
creatorsql.UpdateMonsterID= function(conexion,monArr){
  var str=JSON.stringify(monArr);
  var updateMon = "UPDATE allmonsters SET allmonsters_content='"+str+"'"+" WHERE allmonsters_id='"+monArr.monsterID+"'";
  conexion.query(updateMon, function (err, result) {
    if (err) return console.log(err);
  });
};
creatorsql.SaveMonster= function(conexion,arrMon){
  var str=JSON.stringify(arrMon);
  var saveContent = "UPDATE allmonsters SET allmonsters_content='"+str+"'"+" WHERE allmonsters_id='"+arrMon.monsterID+"'";
  conexion.query(saveContent, function (err, result) {
    if (err) return console.log(err);
  });
};
 
creatorsql.UpdateMonsterStorage= function(conexion,arrMon,userid){
  console.log("Se ejecuta aca");
  var selectMonsterContent = "SELECT * FROM monstersStorage WHERE monster_storage_user =  '"+userid+"'";//data.npc
  conexion.query(selectMonsterContent, function (err, result) {
    if (err) return console.log(err);
    var newTeam={};
    var numSlot=0;
    console.log("Se ejecuta");
    if(result.length===0){
      numSlot=1;
      newTeam[arrMon.monsterID]=arrMon.monster_num;
      var str=JSON.stringify(newTeam);
      console.log("se insertará esto1");
      var saveMonsterContent = "INSERT INTO monstersStorage (monster_storage_id,monster_storage_user,monster_storage_content_1,monster_storage_content_2,monster_storage_content_3,monster_storage_content_4,monster_storage_content_5,monster_storage_content_6,monster_storage_content_7,monster_storage_content_8,monster_storage_content_9,monster_storage_content_10) VALUES (NULL, '"+userid+"', '"+str+"','{}','{}','{}','{}','{}','{}','{}','{}','{}')";
      conexion.query(saveMonsterContent, function (err, result) {
        if (err) return console.log(err);
      });
    }
    if(result.length===1){
      var localData=result[0];
      var slot1=JSON.parse(localData.monster_storage_content_1);
      var slot2=JSON.parse(localData.monster_storage_content_2);
      var slot3=JSON.parse(localData.monster_storage_content_3);
      var slot4=JSON.parse(localData.monster_storage_content_4);
      var slot5=JSON.parse(localData.monster_storage_content_5);
      var slot6=JSON.parse(localData.monster_storage_content_6);
      var slot7=JSON.parse(localData.monster_storage_content_7);
      var slot8=JSON.parse(localData.monster_storage_content_8);
      var slot9=JSON.parse(localData.monster_storage_content_9);
      var slot10=JSON.parse(localData.monster_storage_content_10);
      if(Object.keys(slot1).length<1000){
        numSlot=1;
        slot1[arrMon.monsterID]=arrMon.monster_num;
        newTeam=slot1;
      }
      else if(Object.keys(slot2).length<1000){
        numSlot=2;
        slot2[arrMon.monsterID]=arrMon.monster_num;
        newTeam=slot2
      }
      else if(Object.keys(slot3).length<1000){
        numSlot=3;
        slot3[arrMon.monsterID]=arrMon.monster_num;
        newTeam=slot3
      }
      else if(Object.keys(slot4).length<1000){
        numSlot=4;
        slot4[arrMon.monsterID]=arrMon.monster_num;
        newTeam=slot4
      }
      else if(Object.keys(slot5).length<1000){
        numSlot=5;
        slot5[arrMon.monsterID]=arrMon.monster_num;
        newTeam=slot5
      }
      else if(Object.keys(slot6).length<1000){
        numSlot=6;
        slot6[arrMon.monsterID]=arrMon.monster_num;
        newTeam=slot6
      }
      else if(Object.keys(slot7).length<1000){
        numSlot=7;
        slot7[arrMon.monsterID]=arrMon.monster_num;
        newTeam=slot7
      }
      else if(Object.keys(slot8).length<1000){
        numSlot=8;
        slot8[arrMon.monsterID]=arrMon.monster_num;
        newTeam=slot8
      }
      else if(Object.keys(slot9).length<1000){
        numSlot=9;
        slot9[arrMon.monsterID]=arrMon.monster_num;
        newTeam=slot9
      }
      else if(Object.keys(slot10).length<1000){
        numSlot=10;
        slot10[arrMon.monsterID]=arrMon.monster_num;
        newTeam=slot9
      }
      var str=JSON.stringify(newTeam);
      console.log("se insertará esto2");
      var saveMonsterContent = "UPDATE monstersStorage SET monster_storage_content_"+numSlot+"='"+str+"'"+" WHERE monster_storage_user='"+userid+"'";
      conexion.query(saveMonsterContent, function (err, result) {
        if (err) return console.log(err);
      });
    }
  });
};

//REGISTER USER
creatorsql.registerSQL= function(conexion,data,SockID,socketGlobal){
  var newTeam={1:null,2:null,3:null,4:null,5:null,6:null};
  return new Promise((resolve,reject)=>{
    var sql1 = "SELECT * FROM users WHERE user_name =  '"+data.user+"' OR user_email= '"+data.email+"'";
    var sql2 = "INSERT INTO users (user_id, user_name, user_password, user_email, team) VALUES (NULL, '"+data.user+"', '"+data.pass+"', '"+data.email+"', '"+JSON.stringify(newTeam)+"')";
    conexion.query(sql1, function (err, result) {
      if(result!=undefined && result.length>1){
        socketGlobal.emit("registerInfo","Este usuario y correo ya estan registrados, intenta con otros.");
      }
      else if(result!=undefined && result.length==1){
        socketGlobal.emit("registerInfo","Ya existe este usuario o el email ya esta registrado");
      }else{
        conexion.query(sql2, function (err, result) {
          //conexion.release();
          if(result!=undefined){
            socketGlobal.emit("registerSuccess","Felicidades, tu cuenta a sido creada!");
          }else{
            socketGlobal.emit("registerInfo","Error desconocido al crear cuenta, consulta con un administrador");
          }
        });
      }
    });
  });
},
//CREATE TRAINER AND STARTER
creatorsql.CreateStarterTrainer= function(conexion,personajeNum,data,plr){
  var slot=Utils.getTeamPosition(plr.team);//regresa del 1 al 6 si hay slot vacio sino regresa null
  var sql1="";
  var sql2="";
  //console.log(plr.team[slot]);
  
  return new Promise((resolve,reject)=>{
    if(slot!==null){
      sql1="INSERT INTO monsters(monster_id,monster_num,monster_name,special,user_current_owner,user_owner,in_team,genero,type_1,type_2,exp,naturaleza,habilidad,mov_1,mov_2,mov_3,mov_4,iv_ps,iv_atk,iv_def,iv_atk_es,iv_def_es,iv_velocidad) VALUES (NULL,'"+data.monster_num+"','"+data.monstername+"',0,'"+plr.user_id+"','"+plr.user_id+"',"+slot+","+data.genero+","+data.type_1+","+data.type_2+",0,"+data.naturaleza+","+data.habilidad+","+data.mov_1+","+data.mov_2+","+data.mov_3+","+data.mov_4+","+data.iv_ps+","+data.iv_atk+","+data.iv_def+","+data.iv_atk_es+","+data.iv_def_es+","+data.iv_velocidad+");";
      //sql1+="UPDATE users SET personaje='"+plr.personaje+"', team='"+plr.team+"' WHERE user_id='"+plr.user_id+"'";
    }
    else{
      sql1="INSERT INTO monsters(monster_id,monster_num,monster_name,special,user_current_owner,user_owner,in_team,genero,type_1,type_2,exp,naturaleza,habilidad,mov_1,mov_2,mov_3,mov_4,iv_ps,iv_atk,iv_def,iv_atk_es,iv_def_es,iv_velocidad) VALUES (NULL,'"+data.monster_num+"','"+data.monstername+"',0,'"+plr.user_id+"','"+plr.user_id+"',"+0+","+data.genero+","+data.type_1+","+data.type_2+",0,"+data.naturaleza+","+data.habilidad+","+data.mov_1+","+data.mov_2+","+data.mov_3+","+data.mov_4+","+data.iv_ps+","+data.iv_atk+","+data.iv_def+","+data.iv_atk_es+","+data.iv_def_es+","+data.iv_velocidad+");";
      //sql1+="UPDATE users SET personaje='"+plr.personaje+"'"+" WHERE user_id='"+plr.user_id+"'";
    }
    conexion.query(sql1, function (err, result) {
      if (err) return reject(err);
      else if(slot!==null)
      {
        plr.updatePersonaje(personajeNum);
        plr.updateTeamMonster(slot,result.insertId);
        var itemNum=20//numero de la pokeball
        var itemPokeball=Items[itemNum];
        var qty=6;
        sql2="UPDATE users SET personaje='"+plr.personaje+"', team='"+JSON.stringify(plr.team)+"' WHERE user_id='"+plr.user_id+"';";
        sql2+="INSERT INTO items(item_id,user_owner,item_name,item_num,item_qty,item_type,item_battle,held_item) VALUES (NULL,'"+plr.user_id+"','"+itemPokeball.item_name+"',"+itemNum+",'"+qty+"','"+itemPokeball.item_type+"',"+itemPokeball.item_battle+","+itemPokeball.held_item+");";
        conexion.query(sql2, function (err2, result2) {
          if (err2) return reject(err2);
          resolve(true);
        });
      }
      //resolve(result[0].insertId);
    });
  });
  
};