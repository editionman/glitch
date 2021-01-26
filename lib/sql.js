//user: '0GmXfVfhCq',
//password: 's82moZSDa8',
var sql={};
var exports = module.exports = sql;
//*************************************************
//*************************************************
//||||||||||||||||||UPDATES||||||||||||||||||||||||
//*************************************************
//*************************************************
sql.UpdateMapCode= function(conexion,data){
  var changeMap = "UPDATE users SET mapCode='"+data.newMapCode+"'"+" WHERE user_id='"+data.userID+"'";
  conexion.query(changeMap, function (err, result) {
    //conexion.release();
    if (err) return console.log(err);
  })
}
sql.UpdatePersonaje= function(conexion,data){
  var changePersonaje = "UPDATE users SET personaje='"+data.newPersonajeCode+"'"+" WHERE user_id='"+data.userID+"'";
  conexion.query(changePersonaje, function (err, result) {
    //conexion.release();
    if (err) return console.log(err);
  })
}
sql.UpdateGold= function(conexion,data){
  var changeGold = "UPDATE users SET gold='"+data.newGold+"'"+" WHERE user_id='"+data.userID+"'";
  conexion.query(changeGold, function (err, result) {
    //conexion.release();
    if (err) return console.log(err);
  })
}
sql.UpdateCash= function(conexion,data){
  var changeCash = "UPDATE users SET cash='"+data.newCash+"'"+" WHERE user_id='"+data.userID+"'";
  conexion.query(changeCash, function (err, result) {
    if (err) return console.log(err);
  })
}
//*************************************************
//*************************************************
//||||||||||||||LOGIN REGISTER|||||||||||||||||||||
//*************************************************
//*************************************************
sql.LoginSQL= function(conexion,data){
  var loginSQL = "SELECT * FROM users WHERE user_name =  '"+data.user+"' AND USER_password= '"+data.pass+"'";
  conexion.query(loginSQL, function (err, result) {
    if (err) return console.log(err);
  })
}

//*************************************************
//*************************************************
//||||||||||||||||CREATE BAG|||||||||||||||||||||||
//*************************************************
//*************************************************
sql.createBalls= function(conexion,data){
  //JSON.stringify(obj)-------------->para cambiar de objeto a texto
  //JSON.parse(stringfy)------------->para cambiar de texto a objeto
  var ballStarter={pokeball:6,superball:0,ultraball:0,masterball:0,safariball:0};
  var ballSQL = "INSERT INTO ballStorage (storage_id,user_owner,contenido) VALUES (NULL, '"+data.userID+"', '"+JSON.stringify(ballStarter)+"')";
  conexion.query(ballSQL, function (err, result) {
    if (err) return console.log(err);
  })
}
//*************************************************
//*************************************************
//||||||||||||||||NPCS ACTIONS|||||||||||||||||||||
//*************************************************
//*************************************************
sql.searchQuest= function(conexion,data){
  //console.log(data.npc.func);
  //data.npc.idnpc
  //JSON.stringify(obj)-------------->para cambiar de texto a objeto
  //JSON.parse(stringfy)------------->para cambiar de texto a objeto
  return new Promise((resolve,reject)=>{
    var quest_story={},quest_secondary={},quest_battle={},quest_season={},quest_event={};
    var str_story="",str_secondary="",str_battle="",str_season="",str_event="";
    var activeQuest=null;
    var questSQL = "SELECT * FROM questStorage WHERE user_owner =  '"+data.user+"'";//data.npc
    conexion.query(questSQL, function (err, result) {
      if (err) return console.log(err);
      if(result.length===0){//------------->no existe datos, insertar nuevos datos
        if(data.npc.func==="story"){
          quest_story[data.npc.idnpc]=0;
        }
        if(data.npc.func==="secondary"){
          quest_secondary[data.npc.idnpc]=0;
        }
        if(data.npc.func==="battle"){
          quest_battle[data.npc.idnpc]=0;
        }
        if(data.npc.func==="season"){
          quest_season[data.npc.idnpc]=0;
        }
        if(data.npc.func==="event"){
          quest_event[data.npc.idnpc]=0;          
        }
        str_story=JSON.stringify(quest_story);
        str_secondary=JSON.stringify(quest_secondary);
        str_battle=JSON.stringify(quest_battle);
        str_season=JSON.stringify(quest_season);
        str_event=JSON.stringify(quest_event);
        var insertQuestSQL = "INSERT INTO questStorage (quest_id,user_owner,story,secondary,battle,season,event) VALUES (NULL, '"+data.user+"', '"+str_story+"', '"+str_secondary+"', '"+str_battle+"', '"+str_season+"', '"+str_event+"')";
        conexion.query(insertQuestSQL, function (err, result) {
          if (err) return console.log(err);
        });
        activeQuest=0;
        resolve(activeQuest);
      }
      if(result.length===1){//------------>si existe datos de quests
        var quests;
        var fixInsertQuestSQL;
        if(data.npc.func==="story"){
          quests=JSON.parse(result[0].story);
          if(quests[data.npc.idnpc]===undefined){
            quests[data.npc.idnpc]=0;
            fixInsertQuestSQL="INSERT INTO questStorage (quest_id,user_owner,story,secondary,battle,season,event) VALUES (NULL, '"+data.user+"', '"+JSON.stringify(quests)+"', '"+result[0].secondary+"', '"+result[0].battle+"', '"+result[0].season+"', '"+result[0].event+"')";
          }
        }
        if(data.npc.func==="secondary"){
          quests=JSON.parse(result[0].secondary);
          if(quests[data.npc.idnpc]===undefined){
            quests[data.npc.idnpc]=0;
            fixInsertQuestSQL="INSERT INTO questStorage (quest_id,user_owner,story,secondary,battle,season,event) VALUES (NULL, '"+data.user+"', '"+result[0].story+"', '"+JSON.stringify(quests)+"', '"+result[0].battle+"', '"+result[0].season+"', '"+result[0].event+"')";
          }
        }
        if(data.npc.func==="battle"){
          quests=JSON.parse(result[0].battle);
          if(quests[data.npc.idnpc]===undefined){
            quests[data.npc.idnpc]=0;
            fixInsertQuestSQL="INSERT INTO questStorage (quest_id,user_owner,story,secondary,battle,season,event) VALUES (NULL, '"+data.user+"', '"+result[0].story+"', '"+result[0].secondary+"', '"+JSON.stringify(quests)+"', '"+result[0].season+"', '"+result[0].event+"')";
          }
        }
        if(data.npc.func==="season"){
          quests=JSON.parse(result[0].season);
          if(quests[data.npc.idnpc]===undefined){
            quests[data.npc.idnpc]=0;
            fixInsertQuestSQL="INSERT INTO questStorage (quest_id,user_owner,story,secondary,battle,season,event) VALUES (NULL, '"+data.user+"', '"+result[0].story+"', '"+result[0].secondary+"', '"+result[0].battle+"', '"+JSON.stringify(quests)+"', '"+result[0].event+"')";
          }
        }
        if(data.npc.func==="event"){
          quests=JSON.parse(result[0].event);
          if(quests[data.npc.idnpc]===undefined){
            quests[data.npc.idnpc]=0;
            fixInsertQuestSQL="INSERT INTO questStorage (quest_id,user_owner,story,secondary,battle,season,event) VALUES (NULL, '"+data.user+"', '"+result[0].story+"', '"+result[0].secondary+"', '"+result[0].battle+"', '"+result[0].season+"', '"+JSON.stringify(quests)+"')";
          }
        }
        //ENVIANDO DATOS
        if(quests[data.npc.idnpc]!==undefined){
          activeQuest=quests[data.npc.idnpc];
          resolve(activeQuest);
        }else{
          conexion.query(fixInsertQuestSQL, function (err, result) {
            if (err) return console.log(err);
          });
          activeQuest=0;
          resolve(activeQuest);
        }
      }
    });
  });
}
sql.questUpdate= function(conexion,data){
  
};

//*************************************************
//*************************************************
//|||||||||||||||SAVES-LOAD||||||||||||||||||||||||
//*************************************************
//*************************************************
sql.LoadPlayer= function(conexion,userObj){
  return new Promise((resolve,reject)=>{
    var loadSQL = "SELECT * FROM players WHERE user_id =  '"+userObj.userID+"'";//data.npc
    conexion.query(loadSQL, function (err, result) {
      if (err) return reject(err);
      if(result.length===1){
        //resolve(result);//cargar ya existente--osea update
        var obj=JSON.parse(result[0].content)
        var updateData=userObj.loadPlayer(obj);
        resolve(userObj);
      }
      else if(result.length===0){
        //guardar nueva informacion no existe player data
        resolve(userObj);
      }
      else{
        //error extraño
      }
    });
  });
}

sql.SavePlayer= function(conexion,str,userid){
  return new Promise((resolve,reject)=>{
    var saveSQL = "SELECT * FROM players WHERE user_id =  '"+userid+"'";//data.npc
    conexion.query(saveSQL, function (err, result) {
      if (err) return reject(err);
      if(result.length===1){
        //resolve(result);//guardar en ya existente--osea update
        var changeContent = "UPDATE players SET content='"+str+"'"+" WHERE user_id='"+userid+"'";
        conexion.query(changeContent, function (err, result) {
          if (err) return reject(err);
        });
      }
      else if(result.length===0){
        //guardar nueva informacion
        var changeContent = "INSERT INTO players (player_id,user_id,content) VALUES (NULL, '"+userid+"', '"+str+"')";
        conexion.query(changeContent, function (err, result) {
          if (err) return reject(err);
        });
      }
      else{
        //error extraño
      }
    });
  });
};
//*************************************************
//*************************************************
//|||||||||||||||MONSTERS||||||||||||||||||||||||||
//*************************************************
//*************************************************
sql.InsertNewMonster= function(conexion,str,userid){
  return new Promise((resolve,reject)=>{
    var insertSQL = "INSERT INTO allmonsters (allmonsters_id,allmonsters_user,allmonsters_content) VALUES (NULL, '"+userid+"', '"+str+"')";
    conexion.query(insertSQL, function (err, result) {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
};
sql.UpdateMonsterID= function(conexion,monArr){
  var str=JSON.stringify(monArr);
  var updateMon = "UPDATE allmonsters SET allmonsters_content='"+str+"'"+" WHERE allmonsters_id='"+monArr.monsterID+"'";
  conexion.query(updateMon, function (err, result) {
    if (err) return console.log(err);
  });
};
sql.SaveMonster= function(conexion,arrMon){
  var str=JSON.stringify(arrMon);
  var saveContent = "UPDATE allmonsters SET allmonsters_content='"+str+"'"+" WHERE allmonsters_id='"+arrMon.monsterID+"'";
  conexion.query(saveContent, function (err, result) {
    if (err) return console.log(err);
  });
};
sql.UpdateMonsterStorage= function(conexion,arrMon,userid){
  var selectMonsterContent = "SELECT * FROM monstersStorage WHERE monster_storage_user =  '"+userid+"'";//data.npc
  conexion.query(selectMonsterContent, function (err, result) {
    if (err) return console.log(err);
    var newTeam={};
    var numSlot=0;
    if(result.length===0){
      numSlot=1;
      newTeam[arrMon.monsterID]=arrMon.monster_num;
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
    }
    var str=JSON.stringify(newTeam);
    var saveMonsterContent = "UPDATE monstersStorage SET monster_storage_content_"+numSlot+"='"+str+"'"+" WHERE monster_storage_user='"+userid+"'";
    conexion.query(saveMonsterContent, function (err, result) {
      if (err) return console.log(err);
    });
  });
};