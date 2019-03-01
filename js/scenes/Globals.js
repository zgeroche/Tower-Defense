var WALKPATH;
var FLYPATH;
var TOWER_GROUP = [];
var ENEMY_GROUP = [];
var ATTACKS_GROUP;
var BUTTON_GROUP = [];
var SPAWNED = 0;
var WAVE = 1;
var GOLD = 25000;
var WAVE_DELAY = 15000;
var PLAYER_HEALTH = 100;

var ENEMY_SPEED = 1/10000;
var ENEMY_HP = 1000;
var ENEMY_SPAWN_RATE = 2000;
var ATTACK_DAMAGE = 50;
var TOWER_FIRE_RATE = 300;

//stats for each tower type loaded from file rather than defined here, but for now do this
//objects to hold sounds and animation information as well?
var PEASANT_STATS = 		 {towerId:0,  towerName:"Peasant", 		 cost:5,  str:50,  atkRange:150, atkType:"physical", atkRate:750,  hitFly:false, upgrades: [16]};
var SOLDIER_STATS = 		 {towerId:1,  towerName:"Soldier", 		 cost:10,  str:100, atkRange:200, atkType:"physical", atkRate:400,  hitFly:false, upgrades: [4, 5]};
var ARCHER_STATS = 			 {towerId:2,  towerName:"Archer", 		 cost:20,  str:75,  atkRange:300, atkType:"physical", atkRate:600,  hitFly:true, upgrades: [6, 7]};
var APPRENTICE_STATS = 		 {towerId:3,  towerName:"Apprentice", 	 cost:20,  str:80,  atkRange:250, atkType:"magical",  atkRate:500,  hitFly:false, upgrades: [8, 9]};
var KNIGHT_STATS = 			 {towerId:4,  towerName:"Knight", 		 cost:3,  str:200, atkRange:200, atkType:"physical", atkRate:600,  hitFly:false, upgrades: [10, 11]};
var DUELIST_STATS = 		 {towerId:5,  towerName:"Duelist", 		 cost:3,  str:125, atkRange:225, atkType:"physical", atkRate:400,  hitFly:false, upgrades: [12, 13]};
var RIFLEMAN_STATS =	 	 {towerId:6,  towerName:"Rifleman", 	 cost:3,  str:150, atkRange:350, atkType:"physical", atkRate:650,  hitFly:true, upgrades: [14, 15]};
var RANGER_STATS = 			 {towerId:7,  towerName:"Ranger", 		 cost:3,  str:100, atkRange:300, atkType:"physical", atkRate:500,  hitFly:true, upgrades: [16, 17]};
var WIZARD_STATS = 			 {towerId:8,  towerName:"Wizard", 		 cost:3,  str:100, atkRange:250, atkType:"magical",  atkRate:500,  hitFly:true, upgrades: [18, 19, 20]};
var SORCERESS_STATS = 		 {towerId:9,  towerName:"Sorceress", 	 cost:3,  str:120, atkRange:275, atkType:"magical",  atkRate:600,  hitFly:true, upgrades: [21, 22]};
var COMMANDER_STATS = 		 {towerId:10, towerName:"Commander", 	 cost:4,  str:300, atkRange:200, atkType:"physical", atkRate:550,  hitFly:false, upgrades: null};
var PALADIN_STATS = 		 {towerId:11, towerName:"Paladin", 		 cost:4,  str:250, atkRange:225, atkType:"physical", atkRate:450,  hitFly:true, upgrades: null};
var SWORDMASTER_STATS = 	 {towerId:12, towerName:"Swordmaster", 	 cost:4,  str:140, atkRange:225, atkType:"physical", atkRate:350,  hitFly:false, upgrades: null};
var CUTPURSE_STATS = 		 {towerId:13, towerName:"Cutpurse", 	 cost:4,  str:50 , atkRange:100, atkType:"physical", atkRate:200,  hitFly:false, upgrades: null};
var CANNONEER_STATS = 		 {towerId:14, towerName:"Cannoneer", 	 cost:4,  str:250, atkRange:400, atkType:"physical", atkRate:1000, hitFly:false, upgrades: null};
var SHARPSHOOTER_STATS = 	 {towerId:15, towerName:"Sharpshooter",  cost:4,  str:200, atkRange:500, atkType:"physical", atkRate:750,  hitFly:true, upgrades: null};
var BEASTMASTER_STATS = 	 {towerId:16, towerName:"Beastmaster", 	 cost:4,  str:150, atkRange:350, atkType:"physical", atkRate:500,  hitFly:true, upgrades: null};
var ASSASSIN_STATS = 		 {towerId:17, towerName:"Assassin", 	 cost:4,  str:120, atkRange:350, atkType:"magical",  atkRate:350,  hitFly:true, upgrades: null};
var FIREMAGE_STATS = 		 {towerId:18, towerName:"FireMage", 	 cost:4,  str:200, atkRange:250, atkType:"magical",  atkRate:475,  hitFly:true, upgrades: null};
var ICEMAGE_STATS = 		 {towerId:19, towerName:"IceMage", 		 cost:4,  str:130, atkRange:300, atkType:"magical",  atkRate:450,  hitFly:true, upgrades: null};
var LIGHTNINGMAGE_STATS =	 {towerId:20, towerName:"LightningMage", cost:4,  str:175, atkRange:225, atkType:"magical",  atkRate:500,  hitFly:true, upgrades: null};
var WARLOCK_STATS = 		 {towerId:21, towerName:"Warlock", 		 cost:4,  str:200, atkRange:300, atkType:"magical",  atkRate:650,  hitFly:true, upgrades: null};
var PRIESTESS_STATS =   	 {towerId:22, towerName:"Priestess", 	 cost:4,  str:150, atkRange:250, atkType:"magical",  atkRate:500,  hitFly:true, upgrades: null};

var TOWER_ARRAY = [PEASANT_STATS, //0
			SOLDIER_STATS, //1
			ARCHER_STATS, //2
			APPRENTICE_STATS,//3 
			KNIGHT_STATS, //4
			DUELIST_STATS, //5
			RIFLEMAN_STATS, //6
			RANGER_STATS,//7
			WIZARD_STATS,//8
			SORCERESS_STATS,//9
			COMMANDER_STATS,//10
			PALADIN_STATS,//11
			SWORDMASTER_STATS,//12
			CUTPURSE_STATS,//13
			CANNONEER_STATS,//14
			SHARPSHOOTER_STATS,//15
			BEASTMASTER_STATS,//16
			ASSASSIN_STATS,//17
			FIREMAGE_STATS,//18
			ICEMAGE_STATS,//19
			LIGHTNINGMAGE_STATS,//20
			WARLOCK_STATS,//21
			PRIESTESS_STATS];//22

var DEATHKNIGHT_STATS =  {enemyId: 0,    enemyName: "Deathknight",   speed: 1,   hp: 500,    magicArmor: 0,  physicalArmor: 0,   flying: false,  value: 1, frameEnd: 4, damage: 10};
var SKELETON_STATS =     {enemyId: 1,    enemyName: "Skeleton",      speed: 1,   hp: 600,    magicArmor: 10,  physicalArmor: 0,  flying: false,  value: 2, frameEnd: 4, damage: 10};
var BAT_STATS =          {enemyId: 2,    enemyName: "Bat",           speed: 2,   hp: 300,    magicArmor: 0,  physicalArmor: 0,   flying: true,   value: 1, frameEnd: 5, damage: 7};
var OGRE_STATS =         {enemyId: 4,    enemyName: "Ogre",          speed: .75, hp: 2000,   magicArmor: 10, physicalArmor: 10,  flying: false,  value: 5, frameEnd: 6, damage: 20};
var GOBLIN_STATS =       {enemyId: 3,    enemyName: "Goblin",        speed: 1.5, hp: 400,    magicArmor: 0,  physicalArmor: 5,   flying: false,  value: 3, frameEnd: 3, damage:10};
var SPIDER_STATS =       {enemyId: 5,    enemyName: "Spider",        speed: 1.5, hp: 450,    magicArmor: 0,  physicalArmor: 0,   flying: false,  value: 1, frameEnd: 4, damage: 5};   

var ENEMY_ARRAY = [DEATHKNIGHT_STATS,
                SKELETON_STATS,
                BAT_STATS,
                GOBLIN_STATS,
                OGRE_STATS
                
];

var BUTTON_ARRAY = ["CS.PlaceButton",//0
				"CS.RemoveButton",//1
				"CS.UpgradeButton",//2
				"CS.SoldierButton",//3
				"CS.ArcherButton",//4
				"CS.ApprenticeButton",//5,
				"CS.KnightButton",//6
				"CS.DuelistButton",//7
				"CS.RiflemanButton",//8
				"CS.RangerButton",//9
				"CS.WizardButton",//10
				"CS.SorceressButton",//11
				"CS.CommanderButton",//12
				"CS.PaladinButton",//13
				"CS.SwordmasterButton",//14
				"CS.CutpurseButton",//15
				"CS.CannoneerButton",//16
				"CS.SharpshooterButton",//17
				"CS.BeastmasterButton",//18
				"CS.AssassinButton",//19
				"CS.FireMageButton",//20
				"CS.IceMageButton",//21
				"CS.LightningMageButton",//22
				"CS.WarlockButton",//23
				"CS.PriestessButton"//24
];

//map for tower placement, 0=can place, -1=cannot place, towerObj=tower already occupying space
var MAP =  [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1, 0,-1, 0, 0, 0, 0, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0,-1, 0,-1,-1,-1, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1, 0,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1, 0,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0,-1, 0,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0,-1, 0,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1, 0,-1,-1,-1,-1, 0,-1, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1, 0,-1, 0, 0, 0, 0,-1,-1,-1,-1, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]];
			
			
export{
WALKPATH,
FLYPATH,
TOWER_GROUP,
ENEMY_GROUP,
ATTACKS_GROUP,
BUTTON_GROUP,
SPAWNED,
WAVE,
GOLD,
ENEMY_SPEED,
ENEMY_HP,
ENEMY_SPAWN_RATE,
WAVE_DELAY,
PLAYER_HEALTH,
ATTACK_DAMAGE,
TOWER_FIRE_RATE,
PEASANT_STATS,
SOLDIER_STATS,
ARCHER_STATS,
APPRENTICE_STATS,
KNIGHT_STATS,
DUELIST_STATS,
RIFLEMAN_STATS,
RANGER_STATS,
WIZARD_STATS,
SORCERESS_STATS,
COMMANDER_STATS,
PALADIN_STATS,
SWORDMASTER_STATS,
CUTPURSE_STATS,
CANNONEER_STATS,
SHARPSHOOTER_STATS,
BEASTMASTER_STATS,
ASSASSIN_STATS,
FIREMAGE_STATS,
ICEMAGE_STATS,
LIGHTNINGMAGE_STATS,
WARLOCK_STATS,
PRIESTESS_STATS,
TOWER_ARRAY,
DEATHKNIGHT_STATS,
SKELETON_STATS,
BAT_STATS,
OGRE_STATS,
SPIDER_STATS,
GOBLIN_STATS,
ENEMY_ARRAY,
BUTTON_ARRAY,
MAP
}