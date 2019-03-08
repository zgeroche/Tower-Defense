var WALKPATH;
var FLYPATH;
var TOWER_GROUP = [];
var ENEMY_GROUP = [];
var ATTACK_GROUP = [];
var BUTTON_GROUP = [];
var SPAWNED = 0;
var WAVE = 1;
var GOLD = 2500;
var WAVE_DELAY = 15000;
var PLAYER_HEALTH = 100;

var ENEMY_SPEED = 1/10000;
var ENEMY_HP = 1000;
var ENEMY_SPAWN_RATE = 2000;
var ATTACK_DAMAGE = 50;
var TOWER_FIRE_RATE = 300;

//stats for each tower type loaded from file rather than defined here, but for now do this
//objects to hold sounds and animation information as well?
var PEASANT_STATS = 		 {towerId:0,  towerName:"Peasant", 		 cost:5,   str:50,  atkRange:150, atkType:"physical", atkRate:750,  hitFly:false, upgrades: [1, 2, 3]};
var SOLDIER_STATS = 		 {towerId:1,  towerName:"Soldier", 		 cost:20,  str:100, atkRange:200, atkType:"physical", atkRate:400,  hitFly:false, upgrades: [4, 5]};
var ARCHER_STATS = 			 {towerId:2,  towerName:"Archer", 		 cost:20,  str:75,  atkRange:300, atkType:"physical", atkRate:600,  hitFly:true, upgrades: [6, 7]};
var APPRENTICE_STATS = 		 {towerId:3,  towerName:"Apprentice", 	 cost:20,  str:80,  atkRange:250, atkType:"magical",  atkRate:500,  hitFly:false, upgrades: [8, 9]};
var KNIGHT_STATS = 			 {towerId:4,  towerName:"Knight", 		 cost:3,   str:200, atkRange:200, atkType:"physical", atkRate:600,  hitFly:false, upgrades: [10, 17]};
var DUELIST_STATS = 		 {towerId:5,  towerName:"Duelist", 		 cost:3,   str:125, atkRange:225, atkType:"physical", atkRate:400,  hitFly:false, upgrades: [12, 13]};
var RIFLEMAN_STATS =	 	 {towerId:6,  towerName:"Rifleman", 	 cost:3,   str:150, atkRange:350, atkType:"physical", atkRate:650,  hitFly:true, upgrades: [14, 15]};
var RANGER_STATS = 			 {towerId:7,  towerName:"Ranger", 		 cost:3,   str:100, atkRange:300, atkType:"physical", atkRate:500,  hitFly:true, upgrades: [16, 11]};
var WIZARD_STATS = 			 {towerId:8,  towerName:"Wizard", 		 cost:3,   str:100, atkRange:250, atkType:"magical",  atkRate:500,  hitFly:true, upgrades: [18, 19, 20]};
var SORCERESS_STATS = 		 {towerId:9,  towerName:"Sorceress", 	 cost:3,   str:120, atkRange:275, atkType:"magical",  atkRate:600,  hitFly:true, upgrades: [21, 22]};
var COMMANDER_STATS = 		 {towerId:10, towerName:"Commander", 	 cost:4,   str:300, atkRange:200, atkType:"physical", atkRate:550,  hitFly:false, upgrades: null};
//var PALADIN_STATS = 		 {towerId:11, towerName:"Paladin", 		 cost:4,   str:250, atkRange:225, atkType:"physical", atkRate:450,  hitFly:true, upgrades: null};
var HEADHUNTER_STATS = 		 {towerId:11, towerName:"Headhunter", 		 cost:4,   str:250, atkRange:225, atkType:"physical", atkRate:450,  hitFly:true, upgrades: null};
var SWORDMASTER_STATS = 	 {towerId:12, towerName:"Swordmaster", 	 cost:4,   str:140, atkRange:225, atkType:"physical", atkRate:350,  hitFly:false, upgrades: null};
var CUTPURSE_STATS = 		 {towerId:13, towerName:"Cutpurse", 	 cost:4,   str:50 , atkRange:100, atkType:"physical", atkRate:100,  hitFly:false, upgrades: null};
var CANNONEER_STATS = 		 {towerId:14, towerName:"Cannoneer", 	 cost:4,   str:250, atkRange:400, atkType:"physical", atkRate:1000, hitFly:false, upgrades: null};
var SHARPSHOOTER_STATS = 	 {towerId:15, towerName:"Sharpshooter",  cost:4,   str:200, atkRange:500, atkType:"physical", atkRate:750,  hitFly:true, upgrades: null};
var BEASTMASTER_STATS = 	 {towerId:16, towerName:"Beastmaster", 	 cost:4,   str:150, atkRange:350, atkType:"physical", atkRate:500,  hitFly:true, upgrades: null};
//var ASSASSIN_STATS = 		 {towerId:17, towerName:"Assassin", 	 cost:4,   str:120, atkRange:350, atkType:"magical",  atkRate:350,  hitFly:true, upgrades: null};
var BERSERKER_STATS = 		 {towerId:17, towerName:"Berserker", 	 cost:4,   str:120, atkRange:350, atkType:"magical",  atkRate:350,  hitFly:true, upgrades: null};
var FIREMAGE_STATS = 		 {towerId:18, towerName:"FireMage", 	 cost:4,   str:200, atkRange:250, atkType:"magical",  atkRate:475,  hitFly:true, upgrades: null};
var ICEMAGE_STATS = 		 {towerId:19, towerName:"IceMage", 		 cost:4,   str:130, atkRange:300, atkType:"magical",  atkRate:450,  hitFly:true, upgrades: null};
var LIGHTNINGMAGE_STATS =	 {towerId:20, towerName:"LightningMage", cost:4,   str:175, atkRange:225, atkType:"magical",  atkRate:500,  hitFly:true, upgrades: null};
var WARLOCK_STATS = 		 {towerId:21, towerName:"Warlock", 		 cost:4,   str:200, atkRange:300, atkType:"magical",  atkRate:650,  hitFly:true, upgrades: null};
var PRIESTESS_STATS =   	 {towerId:22, towerName:"Priestess", 	 cost:4,   str:150, atkRange:250, atkType:"magical",  atkRate:500,  hitFly:true, upgrades: null};

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
			//PALADIN_STATS,//11
			HEADHUNTER_STATS,//11
			SWORDMASTER_STATS,//12
			CUTPURSE_STATS,//13
			CANNONEER_STATS,//14
			SHARPSHOOTER_STATS,//15
			BEASTMASTER_STATS,//16
			//ASSASSIN_STATS,//17
			BERSERKER_STATS,//17
			FIREMAGE_STATS,//18
			ICEMAGE_STATS,//19
			LIGHTNINGMAGE_STATS,//20
			WARLOCK_STATS,//21
			PRIESTESS_STATS];//22

var PEASANT_ATTACK = 		{attackId:0,  attackName:"Tomato"};
var SOLDIER_ATTACK = 		{attackId:1,  attackName:"Sword"};
var ARCHER_ATTACK =  		{attackId:2,  attackName:"Arrow"};
var APPRENTICE_ATTACK = 	{attackId:3,  attackName:"WhiteMagic"};
var KNIGHT_ATTACK =  		{attackId:4,  attackName:"KnightSword"};
var DUELIST_ATTACK =  		{attackId:5,  attackName:"CurvedSword"};
var RIFLEMAN_ATTACK =   	{attackId:6,  attackName:"GoldBullet"};
var RANGER_ATTACK =  		{attackId:7,  attackName:"RangerArrow"};
var WIZARD_ATTACK =  		{attackId:8,  attackName:"BlueMagic"};
var SORCERESS_ATTACK =   	{attackId:9,  attackName:"PinkMagic"};
var COMMANDER_ATTACK =  	{attackId:10, attackName:"CommanderSword"};
//var PALADIN_ATTACK =     	{attackId:11, attackName:"PaladinAttack"};
var HEADHUNTER_ATTACK =     	{attackId:11, attackName:"HeadhunterAttack"};
var SWORDMASTER_ATTACK =    {attackId:12, attackName:"BlackSword"};
var CUTPURSE_ATTACK =  		{attackId:13, attackName:"Knife"};
var CANNONEER_ATTACK =  	{attackId:14, attackName:"Cannonball"};
var SHARPSHOOTER_ATTACK =   {attackId:15, attackName:"SilverBullet"};
var BEASTMASTER_ATTACK =    {attackId:16, attackName:"BeastmasterAttack"};
//var ASSASSIN_ATTACK = 		{attackId:17, attackName:"AssassinAttack"};
var BERSERKER_ATTACK = 		{attackId:17, attackName:"BerserkerAttack"};
var FIREMAGE_ATTACK =  		{attackId:18, attackName:"Fireball"};
var ICEMAGE_ATTACK =  		{attackId:19, attackName:"Icicle"};
var LIGHTNINGMAGE_ATTACK =  {attackId:20, attackName:"Lightning"};
var WARLOCK_ATTACK =  		{attackId:21, attackName:"WarlockAttack"};
var PRIESTESS_ATTACK =  	{attackId:22, attackName:"PurpleMagic"};
			
var ATTACK_ARRAY = [PEASANT_ATTACK, //0
			SOLDIER_ATTACK, //1
			ARCHER_ATTACK, //2
			APPRENTICE_ATTACK, //3
			KNIGHT_ATTACK, //4
			DUELIST_ATTACK, //5
			RIFLEMAN_ATTACK, //6
			RANGER_ATTACK, //7
			WIZARD_ATTACK, //8
			SORCERESS_ATTACK, //9
			COMMANDER_ATTACK, //10
			//PALADIN_ATTACK, //11
			HEADHUNTER_ATTACK, //11
			SWORDMASTER_ATTACK, //12
			CUTPURSE_ATTACK, //13
			CANNONEER_ATTACK, //14
			SHARPSHOOTER_ATTACK, //15
			BEASTMASTER_ATTACK, //16
			//ASSASSIN_ATTACK, //17
			BERSERKER_ATTACK, //17
			FIREMAGE_ATTACK, //18
			ICEMAGE_ATTACK, //19
			LIGHTNINGMAGE_ATTACK, //20
			WARLOCK_ATTACK, //21
			PRIESTESS_ATTACK]; //22 

var DEATHKNIGHT_STATS =  {enemyId: 0,    enemyName: "Deathknight",   speed: 1,   hp: 500,    magicArmor: 0,  physicalArmor: 0,   flying: false,  value: 1, frameEnd: 4, damage: 10};
var SKELETON_STATS =     {enemyId: 1,    enemyName: "Skeleton",      speed: 1,   hp: 600,    magicArmor: 10, physicalArmor: 0,   flying: false,  value: 2, frameEnd: 4, damage: 10};
var BAT_STATS =          {enemyId: 2,    enemyName: "Bat",           speed: 2,   hp: 300,    magicArmor: 0,  physicalArmor: 0,   flying: true,   value: 1, frameEnd: 5, damage: 7};
var OGRE_STATS =         {enemyId: 4,    enemyName: "Ogre",          speed: .75, hp: 2000,   magicArmor: 10, physicalArmor: 10,  flying: false,  value: 5, frameEnd: 6, damage: 20};
var GOBLIN_STATS =       {enemyId: 3,    enemyName: "Goblin",        speed: 1.5, hp: 400,    magicArmor: 0,  physicalArmor: 5,   flying: false,  value: 3, frameEnd: 3, damage:10};
var GHOST_STATS =       {enemyId: 5,   enemyName: "Ghost",          speed: 1.5, hp: 450,    magicArmor: 0,  physicalArmor: 0,   flying: true,   value: 1, frameEnd: 3, damage: 5 };
var BOSSSKELETON_STATS = { enemyId: 6, enemyName: "BossSkeleton",   speed: .75,  hp: 2500,    magicArmor: 15, physicalArmor: 15, flying: false,  value: 10, frameEnd: 4, damage: 25 };
var WITCH_STATS =       { enemyId: 7, enemyName: "Witch",           speed: 1,   hp: 450,     magicArmor: 0, physicalArmor: 0,  flying: false,  value: 1, frameEnd: 3, damage: 5 };
var REAPER_STATS =       { enemyId: 8, enemyName: "Reaper",         speed: 1,   hp: 450,     magicArmor: 0, physicalArmor: 0, flying: false, value: 1, frameEnd: 3, damage: 5 };
var HORSEMAN_STATS =    { enemyId: 9, enemyName: "Horseman",        speed: 2,    hp: 750,   magicArmor: 0,  physicalArmor: 0, flying: false, value: 1, frameEnd: 3, damage: 5 };
var JACKO_STATS =       { enemyId: 10, enemyName: "Jacko",          speed: 1,   hp: 450,    magicArmor: 0, physicalArmor: 0, flying: false, value: 1, frameEnd: 3, damage: 5 };
var DRAGON_STATS =      { enemyId: 11, enemyName: "Dragon",         speed: 1,   hp: 450,    magicArmor: 30, physicalArmor: 30, flying: true, value: 1, frameEnd: 3, damage: 5 };
var GOLEM_STATS =       { enemyId: 12, enemyName: "Golem",          speed: 1,   hp: 450,    magicArmor: 0, physicalArmor: 0, flying: false, value: 1, frameEnd: 7, damage: 5 };
var IMP_STATS =         { enemyId: 13, enemyName: "Imp",            speed: 1,   hp: 450,    magicArmor: 0, physicalArmor: 0, flying: false, value: 1, frameEnd: 4, damage: 5 };
var ZOMBIE_STATS =      { enemyId: 14, enemyName: "Zombie",         speed: 1,   hp: 450,    magicArmor: 0, physicalArmor: 0, flying: false, value: 1, frameEnd: 9, damage: 5 };
var VAMPIRE_STATS =     { enemyId: 15, enemyName: "Vampire",        speed: 1,   hp: 450,    magicArmor: 0, physicalArmor: 0, flying: false, value: 1, frameEnd: 3, damage: 5 };
var SLIME_STATS =       { enemyId: 16, enemyName: "Slime",          speed: 1,   hp: 450,    magicArmor: 0, physicalArmor: 0, flying: false, value: 1, frameEnd: 3, damage: 5 };
var MINOTAUR_STATS =    { enemyId: 17, enemyName: "Minotaur",       speed: 1,   hp: 450,    magicArmor: 0, physicalArmor: 0, flying: false, value: 1, frameEnd: 3, damage: 5 };

var ENEMY_ARRAY = [DEATHKNIGHT_STATS,
                SKELETON_STATS,
                BAT_STATS,
                GOBLIN_STATS,
                OGRE_STATS,
                GHOST_STATS,
                BOSSSKELETON_STATS,            
                WITCH_STATS,
                REAPER_STATS,
                HORSEMAN_STATS,
                JACKO_STATS,
                DRAGON_STATS,
                GOLEM_STATS,
                IMP_STATS,
                ZOMBIE_STATS,
                VAMPIRE_STATS,
                SLIME_STATS,
                MINOTAUR_STATS
];

//map for tower placement, 0=can place, -1=cannot place, towerObj=tower already occupying space
var MAP;
		
var WAVE_DETAIL = ['10 Skeletons', '10 Witches', '10 Goblins (fast)', '10 bats (flying)', '10 Skeletons + Boss', '20 Goblins (mass, fast)', '10 witches + 10 bats (flying)', '25 Skeletons (mass)' , '10 Skeletons, Witches & Goblins', '2 Ogre Boss'];

export{
WALKPATH,
FLYPATH,
TOWER_GROUP,
ENEMY_GROUP,
ATTACK_GROUP,
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
//PALADIN_STATS,
HEADHUNTER_STATS,
SWORDMASTER_STATS,
CUTPURSE_STATS,
CANNONEER_STATS,
SHARPSHOOTER_STATS,
BEASTMASTER_STATS,
//ASSASSIN_STATS,
BERSERKER_STATS,
FIREMAGE_STATS,
ICEMAGE_STATS,
LIGHTNINGMAGE_STATS,
WARLOCK_STATS,
PRIESTESS_STATS,
TOWER_ARRAY,
PEASANT_ATTACK,
SOLDIER_ATTACK,
ARCHER_ATTACK,
APPRENTICE_ATTACK,
KNIGHT_ATTACK,
DUELIST_ATTACK,
RIFLEMAN_ATTACK,
RANGER_ATTACK,
WIZARD_ATTACK,
SORCERESS_ATTACK,
COMMANDER_ATTACK,
//PALADIN_ATTACK,
HEADHUNTER_ATTACK,
SWORDMASTER_ATTACK,
CUTPURSE_ATTACK,
CANNONEER_ATTACK,
SHARPSHOOTER_ATTACK,
BEASTMASTER_ATTACK,
//ASSASSIN_ATTACK,
BERSERKER_ATTACK,
FIREMAGE_ATTACK,
ICEMAGE_ATTACK,
LIGHTNINGMAGE_ATTACK,
WARLOCK_ATTACK,
PRIESTESS_ATTACK, 
ATTACK_ARRAY,
DEATHKNIGHT_STATS,
SKELETON_STATS,
BAT_STATS,
OGRE_STATS,
GHOST_STATS,
WITCH_STATS,
REAPER_STATS,
GOBLIN_STATS,
BOSSSKELETON_STATS,
HORSEMAN_STATS,
JACKO_STATS,
DRAGON_STATS,
GOLEM_STATS,
IMP_STATS,
ZOMBIE_STATS,
VAMPIRE_STATS,
SLIME_STATS,
MINOTAUR_STATS,
ENEMY_ARRAY,
MAP,
WAVE_DETAIL
}