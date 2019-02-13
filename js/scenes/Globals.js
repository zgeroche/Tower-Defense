import { CST} from "../CST";

export class Globals extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.GLOBALS
        })
    }

preload(){
		var path;
		var TOWER_GROUP = [];
		var ENEMY_GROUP;
		var ATTACKS_GROUP;

		var ENEMY_SPEED = 1/10000;
		//var ENEMY_SPEED = 1/Math.floor((Math.random() * 10000) + 10000);
		var ENEMY_HP = 1000;
		var ENEMY_SPAWN_RATE = 2000;
		//var ENEMY_SPAWN_RATE = Math.floor((Math.random() * 1000) + 1000);
		var ATTACK_DAMAGE = 50;
		var TOWER_FIRE_RATE = 300;

		//stats for each tower type loaded from file rather than defined here, but for now do this
		//objects to hold sounds and animation information as well?
		var peasantStats = 		 {towerId:0,  towerName:"Peasant", 		 upgrade:true,  str:5,  atkRange:"short",     atkType:"physical", atkRate:"slow", 	  hitfly:false};
		var soldierStats = 		 {towerId:1,  towerName:"Soldier", 		 upgrade:true,  str:10, atkRange:"short",     atkType:"physical", atkRate:"medium",   hitfly:false};
		var archerStats = 		 {towerId:2,  towerName:"Archer", 		 upgrade:true,  str:8,  atkRange:"medium",    atkType:"physical", atkRate:"slow", 	  hitfly:true};
		var apprenticeStats = 	 {towerId:3,  towerName:"Apprentice", 	 upgrade:true,  str:7,  atkRange:"medium",    atkType:"magical",  atkRate:"medium",   hitfly:false};
		var knightStats = 		 {towerId:4,  towerName:"Knight", 		 upgrade:true,  str:15, atkRange:"short",     atkType:"physical", atkRate:"medium",   hitfly:false};
		var duelistStats = 		 {towerId:5,  towerName:"Duelist", 		 upgrade:true,  str:12, atkRange:"short",     atkType:"physical", atkRate:"fast", 	  hitfly:false};
		var riflemanStats =	 	 {towerId:6,  towerName:"Rifleman", 	 upgrade:true,  str:20, atkRange:"medium",    atkType:"physical", atkRate:"slow", 	  hitfly:true};
		var rangerStats = 		 {towerId:7,  towerName:"Ranger", 		 upgrade:true,  str:14, atkRange:"medium",    atkType:"physical", atkRate:"medium",   hitfly:true};
		var wizardStats = 		 {towerId:8,  towerName:"Wizard", 		 upgrade:true,  str:10, atkRange:"medium", 	  atkType:"magical",  atkRate:"medium",   hitfly:true};
		var sorceressStats = 	 {towerId:9,  towerName:"Sorceress", 	 upgrade:true,  str:13, atkRange:"medium", 	  atkType:"magical",  atkRate:"slow", 	  hitfly:true};
		var commanderStats = 	 {towerId:10, towerName:"Commander", 	 upgrade:false, str:25, atkRange:"short", 	  atkType:"physical", atkRate:"slow", 	  hitfly:false};
		var paladinStats = 		 {towerId:11, towerName:"Paladin", 		 upgrade:false, str:17, atkRange:"short", 	  atkType:"physical", atkRate:"medium",   hitfly:true};
		var swordmasterStats = 	 {towerId:12, towerName:"Swordmaster", 	 upgrade:false, str:14, atkRange:"short", 	  atkType:"physical", atkRate:"fast", 	  hitfly:false};
		var cutpurseStats = 	 {towerId:13, towerName:"Cutpurse", 	 upgrade:false, str:6,  atkRange:"veryshort", atkType:"physical", atkRate:"veryfast", hitfly:false};
		var cannoneerStats = 	 {towerId:14, towerName:"Cannoneer", 	 upgrade:false, str:30, atkRange:"long", 	  atkType:"physical", atkRate:"veryslow", hitfly:false};
		var sharpshooterStats =  {towerId:15, towerName:"Sharpshooter",  upgrade:false, str:35, atkRange:"verylong",  atkType:"physical", atkRate:"slow", 	  hitfly:true};
		var beastmasterStats =   {towerId:16, towerName:"Beastmaster", 	 upgrade:false, str:20, atkRange:"long",      atkType:"physical", atkRate:"medium",   hitfly:true};
		var assassinStats = 	 {towerId:17, towerName:"Assassin", 	 upgrade:false, str:18, atkRange:"long",      atkType:"physical", atkRate:"fast", 	  hitfly:true};
		var firemageStats = 	 {towerId:18, towerName:"FireMage", 	 upgrade:false, str:20, atkRange:"medium",    atkType:"magical",  atkRate:"fast", 	  hitfly:true};
		var icemageStats = 		 {towerId:19, towerName:"IceMage", 		 upgrade:false, str:10, atkRange:"long",      atkType:"magical",  atkRate:"medium",   hitfly:true};
		var lightningmageStats = {towerId:20, towerName:"LightningMage", upgrade:false, str:22, atkRange:"short",     atkType:"magical",  atkRate:"medium",   hitfly:true};
		var warlockStats = 		 {towerId:21, towerName:"Warlock", 		 upgrade:false, str:15, atkRange:"long",      atkType:"magical",  atkRate:"slow", 	  hitfly:true};
		var priestessStats =     {towerId:22, towerName:"Priestess", 	 upgrade:false, str:13, atkRange:"medium",    atkType:"magical",  atkRate:"medium",   hitfly:true};

		var towerArr = [peasantStats, 
					soldierStats, 
					archerStats, 
					apprenticeStats, 
					knightStats, 
					duelistStats, 
					riflemanStats, 
					rangerStats,
					wizardStats,
					sorceressStats,
					commanderStats,
					paladinStats,
					swordmasterStats,
					cutpurseStats,
					cannoneerStats,
					sharpshooterStats,
					beastmasterStats,
					assassinStats,
					firemageStats,
					icemageStats,
					lightningmageStats,
					warlockStats,
					priestessStats];

		//map for tower placement, 0=can place, -1=cannot place, towerObj=tower already occupying space
		var map =  [[ 0,-1, 0,-1,-1,-1,-1,-1,-1,-1],
					[ 0,-1, 0, 0, 0, 0, 0, 0, 0,-1],
					[ 0,-1,-1,-1,-1,-1,-1,-1, 0,-1],
					[ 0, 0, 0, 0, 0, 0, 0,-1, 0,-1],
					[-1,-1,-1,-1,-1,-1, 0,-1, 0,-1],
					[-1,-1,-1,-1,-1,-1, 0,-1, 0,-1],
					[-1,-1,-1,-1,-1,-1, 0,-1, 0,-1],
					[-1,-1,-1,-1,-1,-1, 0,-1, 0,-1]];
        }
}		