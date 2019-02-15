var PATH;
var TOWER_GROUP = [];
var ENEMY_GROUP = [];
var ATTACKS_GROUP;
var SPAWNED = 0;
var WAVE = 1;
var GOLD = 0;

var ENEMY_SPEED = 1/10000;
var ENEMY_HP = 1000;
var ENEMY_SPAWN_RATE = 2000;
var ATTACK_DAMAGE = 50;
var TOWER_FIRE_RATE = 300;

//stats for each tower type loaded from file rather than defined here, but for now do this
//objects to hold sounds and animation information as well?
var peasantStats = 		 {towerId:0,  towerName:"Peasant", 		 upgrade:true,  str:50,  atkRange:150,        atkType:"physical", atkRate:500, 	      hitFly:false};
var soldierStats = 		 {towerId:1,  towerName:"Soldier", 		 upgrade:true,  str:100, atkRange:200,        atkType:"physical", atkRate:400,        hitFly:false};
var archerStats = 		 {towerId:2,  towerName:"Archer", 		 upgrade:true,  str:120, atkRange:250,        atkType:"physical", atkRate:350, 	      hitFly:true};
var apprenticeStats = 	 {towerId:3,  towerName:"Apprentice", 	 upgrade:true,  str:7,  atkRange:"medium",    atkType:"magical",  atkRate:"medium",   hitFly:false};
var knightStats = 		 {towerId:4,  towerName:"Knight", 		 upgrade:true,  str:15, atkRange:"short",     atkType:"physical", atkRate:"medium",   hitFly:false};
var duelistStats = 		 {towerId:5,  towerName:"Duelist", 		 upgrade:true,  str:12, atkRange:"short",     atkType:"physical", atkRate:"fast", 	  hitFly:false};
var riflemanStats =	 	 {towerId:6,  towerName:"Rifleman", 	 upgrade:true,  str:20, atkRange:"medium",    atkType:"physical", atkRate:"slow", 	  hitFly:true};
var rangerStats = 		 {towerId:7,  towerName:"Ranger", 		 upgrade:true,  str:14, atkRange:"medium",    atkType:"physical", atkRate:"medium",   hitFly:true};
var wizardStats = 		 {towerId:8,  towerName:"Wizard", 		 upgrade:true,  str:10, atkRange:"medium", 	  atkType:"magical",  atkRate:"medium",   hitFly:true};
var sorceressStats = 	 {towerId:9,  towerName:"Sorceress", 	 upgrade:true,  str:13, atkRange:"medium", 	  atkType:"magical",  atkRate:"slow", 	  hitFly:true};
var commanderStats = 	 {towerId:10, towerName:"Commander", 	 upgrade:false, str:25, atkRange:"short", 	  atkType:"physical", atkRate:"slow", 	  hitFly:false};
var paladinStats = 		 {towerId:11, towerName:"Paladin", 		 upgrade:false, str:17, atkRange:"short", 	  atkType:"physical", atkRate:"medium",   hitFly:true};
var swordmasterStats = 	 {towerId:12, towerName:"Swordmaster", 	 upgrade:false, str:14, atkRange:"short", 	  atkType:"physical", atkRate:"fast", 	  hitFly:false};
var cutpurseStats = 	 {towerId:13, towerName:"Cutpurse", 	 upgrade:false, str:6,  atkRange:"veryshort", atkType:"physical", atkRate:"veryfast", hitFly:false};
var cannoneerStats = 	 {towerId:14, towerName:"Cannoneer", 	 upgrade:false, str:30, atkRange:"long", 	  atkType:"physical", atkRate:"veryslow", hitFly:false};
var sharpshooterStats =  {towerId:15, towerName:"Sharpshooter",  upgrade:false, str:35, atkRange:"verylong",  atkType:"physical", atkRate:"slow", 	  hitFly:true};
var beastmasterStats =   {towerId:16, towerName:"Beastmaster", 	 upgrade:false, str:20, atkRange:"long",      atkType:"physical", atkRate:"medium",   hitFly:true};
var assassinStats = 	 {towerId:17, towerName:"Assassin", 	 upgrade:false, str:18, atkRange:"long",      atkType:"physical", atkRate:"fast", 	  hitFly:true};
var firemageStats = 	 {towerId:18, towerName:"FireMage", 	 upgrade:false, str:20, atkRange:"medium",    atkType:"magical",  atkRate:"fast", 	  hitFly:true};
var icemageStats = 		 {towerId:19, towerName:"IceMage", 		 upgrade:false, str:10, atkRange:"long",      atkType:"magical",  atkRate:"medium",   hitFly:true};
var lightningmageStats = {towerId:20, towerName:"LightningMage", upgrade:false, str:22, atkRange:"short",     atkType:"magical",  atkRate:"medium",   hitFly:true};
var warlockStats = 		 {towerId:21, towerName:"Warlock", 		 upgrade:false, str:15, atkRange:"long",      atkType:"magical",  atkRate:"slow", 	  hitFly:true};
var priestessStats =     {towerId:22, towerName:"Priestess", 	 upgrade:false, str:13, atkRange:"medium",    atkType:"magical",  atkRate:"medium",   hitFly:true};

var TOWER_ARRAY = [peasantStats, 
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

var deathknightStats =  {enemyId: 0,    enemyName: "Deathknight",   speed: 1,   hp: 500,    magicArmor: 0,  physicalArmor: 0,   flying: false,  value: 1, frameEnd: 4};
var skeletonStats =     {enemyId: 1,    enemyName: "Skeleton",      speed: 1,   hp: 600,    magicArmor: 0,  physicalArmor: 0,   flying: false,  value: 2, frameEnd: 4};
var batStats =          {enemyId: 2,    enemyName: "Bat",           speed: 1,   hp: 300,    magicArmor: 0,  physicalArmor: 0,   flying: true,   value: 1, frameEnd: 5};
var ogreStats =         {enemyId: 3,    enemyName: "Ogre",          speed: .75, hp: 2000,   magicArmor: 10, physicalArmor: 10,  flying: false,  value: 5, frameEnd: 6};
var spiderStats =       {enemyId: 4,    enemyName: "Spider",        speed: 1.5, hp: 450,    magicArmor: 0,  physicalArmor: 0,   flying: false,  value: 1, frameEnd: 4};   

var ENEMY_ARRAY = [deathknightStats,
                skeletonStats,
                batStats,
                ogreStats
];
//map for tower placement, 0=can place, -1=cannot place, towerObj=tower already occupying space
var MAP =  [[ 0,-1, 0,-1,-1,-1,-1,-1,-1,-1],
            [ 0,-1, 0, 0, 0, 0, 0, 0, 0,-1],
            [ 0,-1,-1,-1,-1,-1,-1,-1, 0,-1],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0,-1],
            [-1,-1,-1,-1,-1,-1, 0,-1, 0,-1],
            [-1,-1,-1,-1,-1,-1, 0,-1, 0,-1],
            [-1,-1,-1,-1,-1,-1, 0,-1, 0,-1],
            [-1,-1,-1,-1,-1,-1, 0,-1, 0,-1]];
			
			
export{
PATH,
TOWER_GROUP,
ENEMY_GROUP,
ATTACKS_GROUP,
SPAWNED,
WAVE,
GOLD,
ENEMY_SPEED,
ENEMY_HP,
ENEMY_SPAWN_RATE,
ATTACK_DAMAGE,
TOWER_FIRE_RATE,
peasantStats,
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
priestessStats,
TOWER_ARRAY,
deathknightStats,
skeletonStats,
batStats,
ogreStats,
spiderStats,
ENEMY_ARRAY,
MAP
}