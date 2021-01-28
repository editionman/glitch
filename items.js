//#####################################################
/*//########ITEMS DE VIAJE-------->ITEM_TYPE###########
//#####################################################
0-VACIO----------------->SlotVacio
1-Medicina-------------->Medicines
2-Pokeballs------------->Balls
3-Articulos------------->Items
4-TM-------------------->MTMOs
5-Bayas----------------->Berries
6-Elementos clave------->KeyItems
7-Cristales------------->Crystals--->de las megapiedras para equipar a los pokemon
*/
//#####################################################
/*//########ITEMS DE BATALLA------->ITEM_BATTLE########
//#####################################################
0-NO ES PARA BATALLA-->  NO-USADO
1-Restauración HP / PP-->  REGENERACION
2-Pokeballs------------>  BALLS
3-Restaurar estado------>  RESTAURACION
4-Objetos de batalla---->  OBJETOS DE BATALLA
*/
//######################################################
/*//########ITEMS EQUIPABLES-------->HELD_ITEMS#########
//######################################################
0-NO EQUIPABLE
1-EQUIPABLE
*/


//itemStorage....contenido|||itemid,qty
//item_id	          user_owner	item_name	    item_num	item_qty	item_type	item_battle  held_item
//autoincrement        1        "Pokeball"       0        255         2        3            0
//autoincrement        1        "Potion"         6        10          2        1            0








var items={};
items[0]={
  //slot-vacio
  item_name:"inDev",
  item_desc:"Small description",
  item_type:0,
  item_battle:0,
  held_item:0,
};
items[1]={
  //slot-vacio
  item_name:"Beast Ball",
  item_desc:"A somewhat different Poké Ball that has a low success rate for catching a Pokémon.",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[2]={
  //slot-vacio
  item_name:"Cherish Ball",
  item_desc:"A quite rare Poké Ball that has been crafted in order to commemorate a special occasion of some sort.",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[3]={
  //slot-vacio
  item_name:"Dive Ball",
  item_desc:"A somewhat different Poké Ball that works especially well when catching Pokémon that live underwater.",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[4]={
  //slot-vacio
  item_name:"Dream Ball",
  item_desc:"",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[5]={
  //slot-vacio
  item_name:"Dusk Ball",
  item_desc:"",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[6]={
  //slot-vacio
  item_name:"Fast Ball",
  item_desc:"",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[7]={
  //slot-vacio
  item_name:"Friend Ball",
  item_desc:"",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[8]={
  //slot-vacio
  item_name:"Great Ball",
  item_desc:"",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[9]={
  //slot-vacio
  item_name:"Heal Ball",
  item_desc:"",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[10]={
  //slot-vacio
  item_name:"Heavy Ball",
  item_desc:"",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[11]={
  //slot-vacio
  item_name:"Level Ball",
  item_desc:"",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[12]={
  //slot-vacio
  item_name:"Love Ball",
  item_desc:"",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[13]={
  //slot-vacio
  item_name:"Lure Ball",
  item_desc:"",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[14]={
  //slot-vacio
  item_name:"Luxury Ball",
  item_desc:"",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[15]={
  //slot-vacio
  item_name:"Master Ball",
  item_desc:"",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[16]={
  //slot-vacio
  item_name:"Moon Ball",
  item_desc:"",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[17]={
  //slot-vacio
  item_name:"Nest Ball",
  item_desc:"",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[18]={
  //slot-vacio
  item_name:"Net Ball",
  item_desc:"",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[19]={
  //slot-vacio
  item_name:"Park Ball",
  item_desc:"",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[20]={
  //slot-vacio
  item_name:"Poke Ball",
  item_desc:"	A device for catching wild Pokémon. It's thrown like a ball at a Pokémon, comfortably encapsulating its target.",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[21]={
  //slot-vacio
  item_name:"Premier Ball",
  item_desc:"",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[22]={
  //slot-vacio
  item_name:"Quick Ball",
  item_desc:"",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[23]={
  //slot-vacio
  item_name:"Repeat Ball",
  item_desc:"",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[24]={
  //slot-vacio
  item_name:"Safari Ball",
  item_desc:"",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[25]={
  //slot-vacio
  item_name:"Sport Ball",
  item_desc:"",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[26]={
  //slot-vacio
  item_name:"Timer Ball",
  item_desc:"",
  item_type:2,
  item_battle:2,
  held_item:0,
};
items[27]={
  //slot-vacio
  item_name:"Ultra Ball",
  item_desc:"",
  item_type:2,
  item_battle:2,
  held_item:0,
};
//-------------------------FIN---------------------
var exports = module.exports = items;








