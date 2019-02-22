var PATH;
var TOWER_GROUP = [];
var ENEMY_GROUP = [];
var ATTACKS_GROUP;
var BUTTON_GROUP = [];
var SPAWNED = 0;
var WAVE = 1;
var GOLD = 25;
var WAVE_DELAY = 15000;

var ENEMY_SPEED = 1/10000;
var ENEMY_HP = 1000;
var ENEMY_SPAWN_RATE = 2000;
var ATTACK_DAMAGE = 50;
var TOWER_FIRE_RATE = 300;

//stats for each tower type loaded from file rather than defined here, but for now do this
//objects to hold sounds and animation information as well?
var PEASANT_STATS = 		 {towerId:0,  towerName:"Peasant", 		 cost:1,  str:50,  atkRange:150, atkType:"physical", atkRate:750,  hitFly:false};
var SOLDIER_STATS = 		 {towerId:1,  towerName:"Soldier", 		 cost:2,  str:100, atkRange:200, atkType:"physical", atkRate:400,  hitFly:false};
var ARCHER_STATS = 			 {towerId:2,  towerName:"Archer", 		 cost:2,  str:75,  atkRange:300, atkType:"physical", atkRate:600,  hitFly:true};
var APPRENTICE_STATS = 		 {towerId:3,  towerName:"Apprentice", 	 cost:2,  str:80,  atkRange:250, atkType:"magical",  atkRate:500,  hitFly:false};
var KNIGHT_STATS = 			 {towerId:4,  towerName:"Knight", 		 cost:3,  str:200, atkRange:200, atkType:"physical", atkRate:600,  hitFly:false};
var DUELIST_STATS = 		 {towerId:5,  towerName:"Duelist", 		 cost:3,  str:125, atkRange:225, atkType:"physical", atkRate:400,  hitFly:false};
var RIFLEMAN_STATS =	 	 {towerId:6,  towerName:"Rifleman", 	 cost:3,  str:150, atkRange:350, atkType:"physical", atkRate:650,  hitFly:true};
var RANGER_STATS = 			 {towerId:7,  towerName:"Ranger", 		 cost:3,  str:100, atkRange:300, atkType:"physical", atkRate:500,  hitFly:true};
var WIZARD_STATS = 			 {towerId:8,  towerName:"Wizard", 		 cost:3,  str:100, atkRange:250, atkType:"magical",  atkRate:500,  hitFly:true};
var SORCERESS_STATS = 		 {towerId:9,  towerName:"Sorceress", 	 cost:3,  str:120, atkRange:275, atkType:"magical",  atkRate:600,  hitFly:true};
var COMMANDER_STATS = 		 {towerId:10, towerName:"Commander", 	 cost:4,  str:300, atkRange:200, atkType:"physical", atkRate:550,  hitFly:false};
var PALADIN_STATS = 		 {towerId:11, towerName:"Paladin", 		 cost:4,  str:250, atkRange:225, atkType:"physical", atkRate:450,  hitFly:true};
var SWORDMASTER_STATS = 	 {towerId:12, towerName:"Swordmaster", 	 cost:4,  str:140, atkRange:225, atkType:"physical", atkRate:350,  hitFly:false};
var CUTPURSE_STATS = 		 {towerId:13, towerName:"Cutpurse", 	 cost:4,  str:50 , atkRange:100, atkType:"physical", atkRate:200,  hitFly:false};
var CANNONEER_STATS = 		 {towerId:14, towerName:"Cannoneer", 	 cost:4,  str:250, atkRange:400, atkType:"physical", atkRate:1000, hitFly:false};
var SHARPSHOOTER_STATS = 	 {towerId:15, towerName:"Sharpshooter",  cost:4,  str:200, atkRange:500, atkType:"physical", atkRate:750,  hitFly:true};
var BEASTMASTER_STATS = 	 {towerId:16, towerName:"Beastmaster", 	 cost:4,  str:150, atkRange:350, atkType:"physical", atkRate:500,  hitFly:true};
var ASSASSIN_STATS = 		 {towerId:17, towerName:"Assassin", 	 cost:4,  str:120, atkRange:350, atkType:"magical",  atkRate:350,  hitFly:true};
var FIREMAGE_STATS = 		 {towerId:18, towerName:"FireMage", 	 cost:4,  str:200, atkRange:250, atkType:"magical",  atkRate:475,  hitFly:true};
var ICEMAGE_STATS = 		 {towerId:19, towerName:"IceMage", 		 cost:4,  str:130, atkRange:300, atkType:"magical",  atkRate:450,  hitFly:true};
var LIGHTNINGMAGE_STATS =	 {towerId:20, towerName:"LightningMage", cost:4,  str:175, atkRange:225, atkType:"magical",  atkRate:500,  hitFly:true};
var WARLOCK_STATS = 		 {towerId:21, towerName:"Warlock", 		 cost:4,  str:200, atkRange:300, atkType:"magical",  atkRate:650,  hitFly:true};
var PRIESTESS_STATS =   	 {towerId:22, towerName:"Priestess", 	 cost:4,  str:150, atkRange:250, atkType:"magical",  atkRate:500,  hitFly:true};

var TOWER_ARRAY = [PEASANT_STATS, 
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
			PRIESTESS_STATS];

var DEATHKNIGHT_STATS =  {enemyId: 0,    enemyName: "Deathknight",   speed: 1,   hp: 500,    magicArmor: 0,  physicalArmor: 0,   flying: false,  value: 1, frameEnd: 4};
var SKELETON_STATS =     {enemyId: 1,    enemyName: "Skeleton",      speed: 1,   hp: 600,    magicArmor: 0,  physicalArmor: 0,   flying: false,  value: 2, frameEnd: 4};
var BAT_STATS =          {enemyId: 2,    enemyName: "Bat",           speed: 1,   hp: 300,    magicArmor: 0,  physicalArmor: 0,   flying: true,   value: 1, frameEnd: 5};
var OGRE_STATS =         {enemyId: 3,    enemyName: "Ogre",          speed: .75, hp: 2000,   magicArmor: 10, physicalArmor: 10,  flying: false,  value: 5, frameEnd: 6};
var SPIDER_STATS =       {enemyId: 4,    enemyName: "Spider",        speed: 1.5, hp: 450,    magicArmor: 0,  physicalArmor: 0,   flying: false,  value: 1, frameEnd: 4};   

var ENEMY_ARRAY = [DEATHKNIGHT_STATS,
                SKELETON_STATS,
                BAT_STATS,
                OGRE_STATS
];

var BUTTON_ARRAY = ["CS.PlaceButton",
				"CS.RemoveButton",
				"CS.UpgradeButton",
				"CS.SoldierButton",
				"CS.ArcherButton",
				"CS.ApprenticeButton",
				"CS.KnightButton",
				"CS.DuelistButton",
				"CS.RiflemanButton",
				"CS.RangerButton",
				"CS.WizardButton",
				"CS.SorceressButton",
				"CS.CommanderButton",
				"CS.PaladinButton",
				"CS.SwordmasterButton",
				"CS.CutpurseButton",
				"CS.CannoneerButton",
				"CS.SharpshooterButton",
				"CS.BeastmasterButton",
				"CS.AssassinButton",
				"CS.FireMageButton",
				"CS.IceMageButton",
				"CS.LightningMageButton",
				"CS.WarlockButton",
				"CS.PriestessButton"
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
BUTTON_GROUP,
SPAWNED,
WAVE,
GOLD,
ENEMY_SPEED,
ENEMY_HP,
ENEMY_SPAWN_RATE,
WAVE_DELAY,
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
ENEMY_ARRAY,
BUTTON_ARRAY,
MAP
}