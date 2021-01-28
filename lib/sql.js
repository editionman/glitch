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

sql.UpdatePlayer= function(conexion,user,nameupdate){
  return new Promise((resolve,reject)=>{
    var changeContent = "UPDATE users SET "+nameupdate+"='"+user[nameupdate]+"'"+" WHERE user_id='"+user.userID+"'";  
    conexion.query(changeContent, function (err, result) {
      if (err) return reject(err);
      resolve(true);
    });
  });
};
sql.SavePlayer= function(conexion,user){
  return new Promise((resolve,reject)=>{
    var changeContent = "UPDATE users SET categoria='"+user.categoria+"',"+"mapCode='"+user.mapCode+"',"+"personaje='"+user.personaje+"',"+"team='"+user.team+"',"+"gold='"+user.gold+"',"+"cash='"+user.cash+"',"+"currMonsterNum='"+user.currMonsterNum+"'"+" WHERE user_id='"+user.userID+"'";  
    conexion.query(changeContent, function (err, result) {
      if (err) return reject(err);
      resolve(true);
    });
  });
};









