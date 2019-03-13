//map for tower placement, 0=can place, -1=cannot place, towerObj=tower already occupying space
var MAP;
var WAVE_DETAIL;

var WALKPATH;
var FLYPATH;
var TOWER_GROUP = [];
var ENEMY_GROUP = [];
var ATTACK_GROUP = [];
var BUTTON_GROUP = [];
var SPAWNED;
var WAVE;
var GOLD;
var PLAYER_HEALTH;
var WAVE_DELAY = 15000;

var ENEMY_SPEED = 1/10000;
var ENEMY_HP = 1000;
var ENEMY_SPAWN_RATE = 2000;
var ATTACK_DAMAGE = 50;
var TOWER_FIRE_RATE = 300;

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
var BERSERKER_ATTACK =     	{attackId:11, attackName:"Axe"};
var SWORDMASTER_ATTACK =    {attackId:12, attackName:"BlackSword"};
var CUTPURSE_ATTACK =  		{attackId:13, attackName:"Knife"};
var CANNONEER_ATTACK =  	{attackId:14, attackName:"Cannonball"};
var SHARPSHOOTER_ATTACK =   {attackId:15, attackName:"SilverBullet"};
var BEASTMASTER_ATTACK =    {attackId:16, attackName:"Crow"};
var HEADHUNTER_ATTACK = 	{attackId:17, attackName:"Spear"};
var FIREMAGE_ATTACK =  		{attackId:18, attackName:"Fireball"};
var ICEMAGE_ATTACK =  		{attackId:19, attackName:"Icicle"};
var LIGHTNINGMAGE_ATTACK =  {attackId:20, attackName:"Lightning"};
var WARLOCK_ATTACK =  		{attackId:21, attackName:"GreenMagic"};
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
			BERSERKER_ATTACK, //11
			SWORDMASTER_ATTACK, //12
			CUTPURSE_ATTACK, //13
			CANNONEER_ATTACK, //14
			SHARPSHOOTER_ATTACK, //15
			BEASTMASTER_ATTACK, //16
			HEADHUNTER_ATTACK, //17
			FIREMAGE_ATTACK, //18
			ICEMAGE_ATTACK, //19
			LIGHTNINGMAGE_ATTACK, //20
			WARLOCK_ATTACK, //21
			PRIESTESS_ATTACK]; //22 

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
BERSERKER_ATTACK,
SWORDMASTER_ATTACK,
CUTPURSE_ATTACK,
CANNONEER_ATTACK,
SHARPSHOOTER_ATTACK,
BEASTMASTER_ATTACK,
HEADHUNTER_ATTACK,
FIREMAGE_ATTACK,
ICEMAGE_ATTACK,
LIGHTNINGMAGE_ATTACK,
WARLOCK_ATTACK,
PRIESTESS_ATTACK, 
ATTACK_ARRAY,
MAP,
WAVE_DETAIL
}