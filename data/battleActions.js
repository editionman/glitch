var turnactions={};
var Utils = require('../lib/utils.js');
var Movs = require('../data/moves.js');
var exports = module.exports = turnactions;
//*************************************************
//*************************************************
//|||||||||||||||||||USER||||||||||||||||||||||||||
//*************************************************
//*************************************************
turnactions.efectividadDMG=function(ataqueTipo,enemyTipo){
  var efectividad=1;
	//tipos del pokemon enemigo
	switch (enemyTipo) {
		//--------Normal
		case "1":
			switch (ataqueTipo) {
				//###Normal
						case "1":
							efectividad=1;
							break;
						//###Fighting
						case "2":
							efectividad=2;
							break;
						//###Flying
						case "3":
							efectividad=1;
							break;
						//###Poison
						case "4":
							efectividad=1;
							break;
						//###Ground
						case "5":
							efectividad=1;
							break;
						//###Rock
						case "6":
							efectividad=1;
							break;
						//###Bug
						case "7":
							efectividad=1;
							break;
						//###Ghost
						case "8":
							efectividad=0;
							break;
						//###Steel
						case "9":
							efectividad=1;
							break;
						//###Fire
						case "10":
							efectividad=1;
							break;
						//###Water
						case "11":
							efectividad=1;
							break;
						//###Grass
						case "12":
							efectividad=1;
							break;
						//###Electric
						case "13":
							efectividad=1;
							break;
						//###Psychic
						case "14":
							efectividad=1;
							break;
						//###Ice
						case "15":
							efectividad=1;
							break;
						//###Dragon
						case "16":
							efectividad=1;
							break;
						//###Dark
						case "17":
							efectividad=1;
							break;
						//###Fairy
						case "18":
							efectividad=1;
							break;
						//###Defecto
						default:
							efectividad=1;
							break;
					}
					break;
				//--------Fighting
				case "2":
					switch (ataqueTipo) {
						//###Normal
						case "1":
							efectividad=1;
							break;
						//###Fighting
						case "2":
							efectividad=1;
							break;
						//###Flying
						case "3":
							efectividad=2;
							break;
						//###Poison
						case "4":
							efectividad=1;
							break;
						//###Ground
						case "5":
							efectividad=1;
							break;
						//###Rock
						case "6":
							efectividad=1;
							break;
						//###Bug
						case "7":
							efectividad=0.5;
							break;
						//###Ghost
						case "8":
							efectividad=1;
							break;
						//###Steel
						case "9":
							efectividad=1;
							break;
						//###Fire
						case "10":
							efectividad=1;
							break;
						//###Water
						case "11":
							efectividad=1;
							break;
						//###Grass
						case "12":
							efectividad=1;
							break;
						//###Electric
						case "13":
							efectividad=1;
							break;
						//###Psychic
						case "14":
							efectividad=2;
							break;
						//###Ice
						case "15":
							efectividad=1;
							break;
						//###Dragon
						case "16":
							efectividad=1;
							break;
						//###Dark
						case "17":
							efectividad=0.5;
							break;
						//###Fairy
						case "18":
							efectividad=2;
							break;
						//###Defecto
						default:
							efectividad=1;
							break;
					}
					break;
				//--------Flying	
				case "3":
					switch (ataqueTipo) {
						//###Normal
						case "1":
							efectividad=1;
							break;
						//###Fighting
						case "2":
							efectividad=0.5;
							break;
						//###Flying
						case "3":
							efectividad=1;
							break;
						//###Poison
						case "4":
							efectividad=1;
							break;
						//###Ground
						case "5":
							efectividad=0;
							break;
						//###Rock
						case "6":
							efectividad=2;
							break;
						//###Bug
						case "7":
							efectividad=0.5;
							break;
						//###Ghost
						case "8":
							efectividad=1;
							break;
						//###Steel
						case "9":
							efectividad=1;
							break;
						//###Fire
						case "10":
							efectividad=1;
							break;
						//###Water
						case "11":
							efectividad=1;
							break;
						//###Grass
						case "12":
							efectividad=0.5;
							break;
						//###Electric
						case "13":
							efectividad=2;
							break;
						//###Psychic
						case "14":
							efectividad=1;
							break;
						//###Ice
						case "15":
							efectividad=2;
							break;
						//###Dragon
						case "16":
							efectividad=1;
							break;
						//###Dark
						case "17":
							efectividad=1;
							break;
						//###Fairy
						case "18":
							efectividad=1;
							break;
						//###Defecto
						default:
							efectividad=1;
							break;
					}
					break;
				//--------Poison
				case "4":
					switch (ataqueTipo) {
						//###Normal
						case "1":
							efectividad=1;
							break;
						//###Fighting
						case "2":
							efectividad=0.5;
							break;
						//###Flying
						case "3":
							efectividad=1;
							break;
						//###Poison
						case "4":
							efectividad=0.5;
							break;
						//###Ground
						case "5":
							efectividad=2;
							break;
						//###Rock
						case "6":
							efectividad=1;
							break;
						//###Bug
						case "7":
							efectividad=0.5;
							break;
						//###Ghost
						case "8":
							efectividad=1;
							break;
						//###Steel
						case "9":
							efectividad=1;
							break;
						//###Fire
						case "10":
							efectividad=1;
							break;
						//###Water
						case "11":
							efectividad=1;
							break;
						//###Grass
						case "12":
							efectividad=0.5;
							break;
						//###Electric
						case "13":
							efectividad=1;
							break;
						//###Psychic
						case "14":
							efectividad=2;
							break;
						//###Ice
						case "15":
							efectividad=1;
							break;
						//###Dragon
						case "16":
							efectividad=1;
							break;
						//###Dark
						case "17":
							efectividad=1;
							break;
						//###Fairy
						case "18":
							efectividad=0.5;
							break;
						//###Defecto
						default:
							efectividad=1;
							break;
					}
					break;
				//--------Ground
				case "5":
					switch (ataqueTipo) {
						//###Normal
						case "1":
							efectividad=1;
							break;
						//###Fighting
						case "2":
							efectividad=1;
							break;
						//###Flying
						case "3":
							efectividad=1;
							break;
						//###Poison
						case "4":
							efectividad=0.5;
							break;
						//###Ground
						case "5":
							efectividad=1;
							break;
						//###Rock
						case "6":
							efectividad=0.5;
							break;
						//###Bug
						case "7":
							efectividad=1;
							break;
						//###Ghost
						case "8":
							efectividad=1;
							break;
						//###Steel
						case "9":
							efectividad=1;
							break;
						//###Fire
						case "10":
							efectividad=1;
							break;
						//###Water
						case "11":
							efectividad=2;
							break;
						//###Grass
						case "12":
							efectividad=2;
							break;
						//###Electric
						case "13":
							efectividad=0;
							break;
						//###Psychic
						case "14":
							efectividad=1;
							break;
						//###Ice
						case "15":
							efectividad=2;
							break;
						//###Dragon
						case "16":
							efectividad=1;
							break;
						//###Dark
						case "17":
							efectividad=1;
							break;
						//###Fairy
						case "18":
							efectividad=1;
							break;
						//###Defecto
						default:
							efectividad=1;
							break;
					}
					break;
				//--------Rock	
				case "6":
					switch (ataqueTipo) {
						//###Normal
						case "1":
							efectividad=0.5;
							break;
						//###Fighting
						case "2":
							efectividad=2;
							break;
						//###Flying
						case "3":
							efectividad=0.5;
							break;
						//###Poison
						case "4":
							efectividad=0.5;
							break;
						//###Ground
						case "5":
							efectividad=2;
							break;
						//###Rock
						case "6":
							efectividad=1;
							break;
						//###Bug
						case "7":
							efectividad=1;
							break;
						//###Ghost
						case "8":
							efectividad=1;
							break;
						//###Steel
						case "9":
							efectividad=2;
							break;
						//###Fire
						case "10":
							efectividad=0.5;
							break;
						//###Water
						case "11":
							efectividad=2;
							break;
						//###Grass
						case "12":
							efectividad=2;
							break;
						//###Electric
						case "13":
							efectividad=1;
							break;
						//###Psychic
						case "14":
							efectividad=1;
							break;
						//###Ice
						case "15":
							efectividad=1;
							break;
						//###Dragon
						case "16":
							efectividad=1;
							break;
						//###Dark
						case "17":
							efectividad=1;
							break;
						//###Fairy
						case "18":
							efectividad=1;
							break;
						//###Defecto
						default:
							efectividad=1;
							break;
					}
					break;
				//--------bug
				case "7":
					switch (ataqueTipo) {
						//###Normal
						case "1":
							efectividad=1;
							break;
						//###Fighting
						case "2":
							efectividad=0.5;
							break;
						//###Flying
						case "3":
							efectividad=2;
							break;
						//###Poison
						case "4":
							efectividad=1;
							break;
						//###Ground
						case "5":
							efectividad=0.5;
							break;
						//###Rock
						case "6":
							efectividad=2;
							break;
						//###Bug
						case "7":
							efectividad=1;
							break;
						//###Ghost
						case "8":
							efectividad=1;
							break;
						//###Steel
						case "9":
							efectividad=1;
							break;
						//###Fire
						case "10":
							efectividad=2;
							break;
						//###Water
						case "11":
							efectividad=1;
							break;
						//###Grass
						case "12":
							efectividad=0.5;
							break;
						//###Electric
						case "13":
							efectividad=1;
							break;
						//###Psychic
						case "14":
							efectividad=1;
							break;
						//###Ice
						case "15":
							efectividad=1;
							break;
						//###Dragon
						case "16":
							efectividad=1;
							break;
						//###Dark
						case "17":
							efectividad=1;
							break;
						//###Fairy
						case "18":
							efectividad=1;
							break;
						//###Defecto
						default:
							efectividad=1;
							break;
					}
					break;
				//--------Ghost
				case "8":
					switch (ataqueTipo) {
						//###Normal
						case "1":
							efectividad=0;
							break;
						//###Fighting
						case "2":
							efectividad=0;
							break;
						//###Flying
						case "3":
							efectividad=1;
							break;
						//###Poison
						case "4":
							efectividad=0.5;
							break;
						//###Ground
						case "5":
							efectividad=1;
							break;
						//###Rock
						case "6":
							efectividad=1;
							break;
						//###Bug
						case "7":
							efectividad=0.5;
							break;
						//###Ghost
						case "8":
							efectividad=2;
							break;
						//###Steel
						case "9":
							efectividad=1;
							break;
						//###Fire
						case "10":
							efectividad=1;
							break;
						//###Water
						case "11":
							efectividad=1;
							break;
						//###Grass
						case "12":
							efectividad=1;
							break;
						//###Electric
						case "13":
							efectividad=1;
							break;
						//###Psychic
						case "14":
							efectividad=1;
							break;
						//###Ice
						case "15":
							efectividad=1;
							break;
						//###Dragon
						case "16":
							efectividad=1;
							break;
						//###Dark
						case "17":
							efectividad=2;
							break;
						//###Fairy
						case "18":
							efectividad=1;
							break;
						//###Defecto
						default:
							efectividad=1;
							break;
					}
					break;
				//--------Steel
				case "9":
					switch (ataqueTipo) {
						//###Normal
						case "1":
							efectividad=0.5;
							break;
						//###Fighting
						case "2":
							efectividad=2;
							break;
						//###Flying
						case "3":
							efectividad=0.5;
							break;
						//###Poison
						case "4":
							efectividad=0;
							break;
						//###Ground
						case "5":
							efectividad=2;
							break;
						//###Rock
						case "6":
							efectividad=0.5;
							break;
						//###Bug
						case "7":
							efectividad=0.5;
							break;
						//###Ghost
						case "8":
							efectividad=1;
							break;
						//###Steel
						case "9":
							efectividad=0.5;
							break;
						//###Fire
						case "10":
							efectividad=2;
							break;
						//###Water
						case "11":
							efectividad=1;
							break;
						//###Grass
						case "12":
							efectividad=0.5;
							break;
						//###Electric
						case "13":
							efectividad=1;
							break;
						//###Psychic
						case "14":
							efectividad=0.5;
							break;
						//###Ice
						case "15":
							efectividad=0.5;
							break;
						//###Dragon
						case "16":
							efectividad=0.5;
							break;
						//###Dark
						case "17":
							efectividad=1;
							break;
						//###Fairy
						case "18":
							efectividad=0.5;
							break;
						//###Defecto
						default:
							efectividad=1;
							break;
					}
					break;
				//--------Fire
				case "10":
					switch (ataqueTipo) {
						//###Normal
						case "1":
							efectividad=1;
							break;
						//###Fighting
						case "2":
							efectividad=1;
							break;
						//###Flying
						case "3":
							efectividad=1;
							break;
						//###Poison
						case "4":
							efectividad=1;
							break;
						//###Ground
						case "5":
							efectividad=2;
							break;
						//###Rock
						case "6":
							efectividad=2;
							break;
						//###Bug
						case "7":
							efectividad=0.5;
							break;
						//###Ghost
						case "8":
							efectividad=1;
							break;
						//###Steel
						case "9":
							efectividad=0.5;
							break;
						//###Fire
						case "10":
							efectividad=0.5;
							break;
						//###Water
						case "11":
							efectividad=2;
							break;
						//###Grass
						case "12":
							efectividad=0.5;
							break;
						//###Electric
						case "13":
							efectividad=1;
							break;
						//###Psychic
						case "14":
							efectividad=1;
							break;
						//###Ice
						case "15":
							efectividad=0.5;
							break;
						//###Dragon
						case "16":
							efectividad=1;
							break;
						//###Dark
						case "17":
							efectividad=1;
							break;
						//###Fairy
						case "18":
							efectividad=0.5;
							break;
						//###Defecto
						default:
							efectividad=1;
							break;
					}
					break;
				//--------Water
				case "11":
					switch (ataqueTipo) {
						//###Normal
						case "1":
							efectividad=1;
							break;
						//###Fighting
						case "2":
							efectividad=1;
							break;
						//###Flying
						case "3":
							efectividad=1;
							break;
						//###Poison
						case "4":
							efectividad=1;
							break;
						//###Ground
						case "5":
							efectividad=1;
							break;
						//###Rock
						case "6":
							efectividad=1;
							break;
						//###Bug
						case "7":
							efectividad=1;
							break;
						//###Ghost
						case "8":
							efectividad=1;
							break;
						//###Steel
						case "9":
							efectividad=0.5;
							break;
						//###Fire
						case "10":
							efectividad=0.5;
							break;
						//###Water
						case "11":
							efectividad=0.5;
							break;
						//###Grass
						case "12":
							efectividad=2;
							break;
						//###Electric
						case "13":
							efectividad=2;
							break;
						//###Psychic
						case "14":
							efectividad=1;
							break;
						//###Ice
						case "15":
							efectividad=0.5;
							break;
						//###Dragon
						case "16":
							efectividad=1;
							break;
						//###Dark
						case "17":
							efectividad=1;
							break;
						//###Fairy
						case "18":
							efectividad=1;
							break;
						//###Defecto
						default:
							efectividad=1;
							break;
					}
					break;
				//--------Grass
				case "12":
					switch (ataqueTipo) {
						//###Normal
						case "1":
							efectividad=1;
							break;
						//###Fighting
						case "2":
							efectividad=1;
							break;
						//###Flying
						case "3":
							efectividad=2;
							break;
						//###Poison
						case "4":
							efectividad=2;
							break;
						//###Ground
						case "5":
							efectividad=0.5;
							break;
						//###Rock
						case "6":
							efectividad=1;
							break;
						//###Bug
						case "7":
							efectividad=2;
							break;
						//###Ghost
						case "8":
							efectividad=1;
							break;
						//###Steel
						case "9":
							efectividad=1;
							break;
						//###Fire
						case "10":
							efectividad=2;
							break;
						//###Water
						case "11":
							efectividad=0.5;
							break;
						//###Grass
						case "12":
							efectividad=0.5;
							break;
						//###Electric
						case "13":
							efectividad=0.5;
							break;
						//###Psychic
						case "14":
							efectividad=1;
							break;
						//###Ice
						case "15":
							efectividad=2;
							break;
						//###Dragon
						case "16":
							efectividad=1;
							break;
						//###Dark
						case "17":
							efectividad=1;
							break;
						//###Fairy
						case "18":
							efectividad=1;
							break;
						//###Defecto
						default:
							efectividad=1;
							break;
					}
					break;
				//--------Electric
				case "13":
					switch (ataqueTipo) {
						//###Normal
						case "1":
							efectividad=1;
							break;
						//###Fighting
						case "2":
							efectividad=1;
							break;
						//###Flying
						case "3":
							efectividad=0.5;
							break;
						//###Poison
						case "4":
							efectividad=1;
							break;
						//###Ground
						case "5":
							efectividad=2;
							break;
						//###Rock
						case "6":
							efectividad=1;
							break;
						//###Bug
						case "7":
							efectividad=1;
							break;
						//###Ghost
						case "8":
							efectividad=1;
							break;
						//###Steel
						case "9":
							efectividad=0.5;
							break;
						//###Fire
						case "10":
							efectividad=1;
							break;
						//###Water
						case "11":
							efectividad=1;
							break;
						//###Grass
						case "12":
							efectividad=1;
							break;
						//###Electric
						case "13":
							efectividad=0.5;
							break;
						//###Psychic
						case "14":
							efectividad=1;
							break;
						//###Ice
						case "15":
							efectividad=1;
							break;
						//###Dragon
						case "16":
							efectividad=1;
							break;
						//###Dark
						case "17":
							efectividad=1;
							break;
						//###Fairy
						case "18":
							efectividad=1;
							break;
						//###Defecto
						default:
							efectividad=1;
							break;
					}
					break;
				//--------Psychic
				case "14":
					switch (ataqueTipo) {
						//###Normal
						case "1":
							efectividad=1;
							break;
						//###Fighting
						case "2":
							efectividad=0.5;
							break;
						//###Flying
						case "3":
							efectividad=1;
							break;
						//###Poison
						case "4":
							efectividad=1;
							break;
						//###Ground
						case "5":
							efectividad=1;
							break;
						//###Rock
						case "6":
							efectividad=1;
							break;
						//###Bug
						case "7":
							efectividad=2;
							break;
						//###Ghost
						case "8":
							efectividad=2;
							break;
						//###Steel
						case "9":
							efectividad=1;
							break;
						//###Fire
						case "10":
							efectividad=1;
							break;
						//###Water
						case "11":
							efectividad=1;
							break;
						//###Grass
						case "12":
							efectividad=1;
							break;
						//###Electric
						case "13":
							efectividad=1;
							break;
						//###Psychic
						case "14":
							efectividad=0.5;
							break;
						//###Ice
						case "15":
							efectividad=1;
							break;
						//###Dragon
						case "16":
							efectividad=1;
							break;
						//###Dark
						case "17":
							efectividad=2;
							break;
						//###Fairy
						case "18":
							efectividad=1;
							break;
						//###Defecto
						default:
							efectividad=1;
							break;
					}
					break;
				//--------Ice
				case "15":
					switch (ataqueTipo) {
						//###Normal
						case "1":
							efectividad=1;
							break;
						//###Fighting
						case "2":
							efectividad=2;
							break;
						//###Flying
						case "3":
							efectividad=1;
							break;
						//###Poison
						case "4":
							efectividad=1;
							break;
						//###Ground
						case "5":
							efectividad=1;
							break;
						//###Rock
						case "6":
							efectividad=2;
							break;
						//###Bug
						case "7":
							efectividad=1;
							break;
						//###Ghost
						case "8":
							efectividad=1;
							break;
						//###Steel
						case "9":
							efectividad=2;
							break;
						//###Fire
						case "10":
							efectividad=2;
							break;
						//###Water
						case "11":
							efectividad=1;
							break;
						//###Grass
						case "12":
							efectividad=1;
							break;
						//###Electric
						case "13":
							efectividad=1;
							break;
						//###Psychic
						case "14":
							efectividad=1;
							break;
						//###Ice
						case "15":
							efectividad=0.5;
							break;
						//###Dragon
						case "16":
							efectividad=1;
							break;
						//###Dark
						case "17":
							efectividad=1;
							break;
						//###Fairy
						case "18":
							efectividad=1;
							break;
						//###Defecto
						default:
							efectividad=1;
							break;
					}
					break;
				//--------Dragon
				case "16":
					switch (ataqueTipo) {
						//###Normal
						case "1":
							efectividad=1;
							break;
						//###Fighting
						case "2":
							efectividad=1;
							break;
						//###Flying
						case "3":
							efectividad=1;
							break;
						//###Poison
						case "4":
							efectividad=1;
							break;
						//###Ground
						case "5":
							efectividad=1;
							break;
						//###Rock
						case "6":
							efectividad=1;
							break;
						//###Bug
						case "7":
							efectividad=1;
							break;
						//###Ghost
						case "8":
							efectividad=1;
							break;
						//###Steel
						case "9":
							efectividad=1;
							break;
						//###Fire
						case "10":
							efectividad=0.5;
							break;
						//###Water
						case "11":
							efectividad=0.5;
							break;
						//###Grass
						case "12":
							efectividad=0.5;
							break;
						//###Electric
						case "13":
							efectividad=0.5;
							break;
						//###Psychic
						case "14":
							efectividad=1;
							break;
						//###Ice
						case "15":
							efectividad=2;
							break;
						//###Dragon
						case "16":
							efectividad=2;
							break;
						//###Dark
						case "17":
							efectividad=1;
							break;
						//###Fairy
						case "18":
							efectividad=2;
							break;
						//###Defecto
						default:
							efectividad=1;
							break;
					}
					break;
				//--------Dark
				case "17":
					switch (ataqueTipo) {
						//###Normal
						case "1":
							efectividad=1;
							break;
						//###Fighting
						case "2":
							efectividad=2;
							break;
						//###Flying
						case "3":
							efectividad=1;
							break;
						//###Poison
						case "4":
							efectividad=1;
							break;
						//###Ground
						case "5":
							efectividad=1;
							break;
						//###Rock
						case "6":
							efectividad=1;
							break;
						//###Bug
						case "7":
							efectividad=2;
							break;
						//###Ghost
						case "8":
							efectividad=0.5;
							break;
						//###Steel
						case "9":
							efectividad=1;
							break;
						//###Fire
						case "10":
							efectividad=1;
							break;
						//###Water
						case "11":
							efectividad=1;
							break;
						//###Grass
						case "12":
							efectividad=1;
							break;
						//###Electric
						case "13":
							efectividad=1;
							break;
						//###Psychic
						case "14":
							efectividad=0;
							break;
						//###Ice
						case "15":
							efectividad=1;
							break;
						//###Dragon
						case "16":
							efectividad=1;
							break;
						//###Dark
						case "17":
							efectividad=0.5;
							break;
						//###Fairy
						case "18":
							efectividad=2;
							break;
						//###Defecto
						default:
							efectividad=1;
							break;
					}
					break;
				//--------Fairy
				case "18":
					switch (ataqueTipo) {
						//###Normal
						case "1":
							efectividad=1;
							break;
						//###Fighting
						case "2":
							efectividad=0.5;
							break;
						//###Flying
						case "3":
							efectividad=1;
							break;
						//###Poison
						case "4":
							efectividad=2;
							break;
						//###Ground
						case "5":
							efectividad=1;
							break;
						//###Rock
						case "6":
							efectividad=1;
							break;
						//###Bug
						case "7":
							efectividad=0.5;
							break;
						//###Ghost
						case "8":
							efectividad=1;
							break;
						//###Steel
						case "9":
							efectividad=2;
							break;
						//###Fire
						case "10":
							efectividad=1;
							break;
						//###Water
						case "11":
							efectividad=1;
							break;
						//###Grass
						case "12":
							efectividad=1;
							break;
						//###Electric
						case "13":
							efectividad=1;
							break;
						//###Psychic
						case "14":
							efectividad=1;
							break;
						//###Ice
						case "15":
							efectividad=1;
							break;
						//###Dragon
						case "16":
							efectividad=0;
							break;
						//###Dark
						case "17":
							efectividad=0.5;
							break;
						//###Fairy
						case "18":
							efectividad=1;
							break;
						//###Defecto
						default:
							efectividad=1;
							break;
					}
					break;
		//--------Defecto
		default:
			efectividad=1;
			break;
	}
	return efectividad;
}