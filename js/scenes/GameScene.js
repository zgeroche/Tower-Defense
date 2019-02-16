import {CST} from "../CST";
//import {Enemy} from "../Enemy";
//import {GlobalVariables} from "../GlobalVariables";

var path;
var TOWER_GROUP = [];
var ENEMY_GROUP = [];
var ATTACKS_GROUP;
var BUTTON_GROUP = [];
var SPAWNED = 0;
var WAVE = 1;
var GOLD = 0;

var ENEMY_SPEED = 1/10000;
//var ENEMY_SPEED = 1/Math.floor((Math.random() * 10000) + 10000);
var ENEMY_HP = 1000;
var ENEMY_SPAWN_RATE = 2000;
//var ENEMY_SPAWN_RATE = Math.floor((Math.random() * 1000) + 1000);
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

var deathknightStats =  {enemyId: 0,    enemyName: "Deathknight",   speed: 1,   hp: 500,    magicArmor: 0,  physicalArmor: 0,   flying: false,  value: 1};
var skeletonStats =     {enemyId: 1,    enemyName: "Skeleton",      speed: 1,   hp: 600,    magicArmor: 0,  physicalArmor: 0,   flying: false,  value: 2};
var batStats =          {enemyId: 2,    enemyName: "Bat",           speed: 1,   hp: 300,    magicArmor: 0,  physicalArmor: 0,   flying: true,   value: 1};
var ogreStats =         {enemyId: 3,    enemyName: "Ogre",          speed: .75, hp: 2000,   magicArmor: 10, physicalArmor: 10,  flying: false,  value: 5};
var spiderStats =       {enemyId: 4,    enemyName: "Spider",        speed: 1.5, hp: 450,    magicArmor: 0,  physicalArmor: 0,   flying: false,  value: 1};   

var enemyArr = [deathknightStats,
                skeletonStats,
                batStats,
                ogreStats
];
//map for tower placement, 0=can place, -1=cannot place, towerObj=tower already occupying space
var map =  [[ 0,-1, 0,-1,-1,-1,-1,-1,-1,-1],
            [ 0,-1, 0, 0, 0, 0, 0, 0, 0,-1],
            [ 0,-1,-1,-1,-1,-1,-1,-1, 0,-1],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0,-1],
            [-1,-1,-1,-1,-1,-1, 0,-1, 0,-1],
            [-1,-1,-1,-1,-1,-1, 0,-1, 0,-1],
            [-1,-1,-1,-1,-1,-1, 0,-1, 0,-1],
            [-1,-1,-1,-1,-1,-1, 0,-1, 0,-1]];
			

//------------------------------------------FUNCTIONS---------------------------------------------------			
//build the pathing and map for level
function buildMap(scene){
	//path to which enemey follows
    var graphics = scene.add.graphics();    
    drawLines(graphics);
    path = scene.add.path(96, -32);
    path.lineTo(96, 164);
    path.lineTo(480, 164);
    path.lineTo(480, 544);
    graphics.lineStyle(0, 0xffffff, 1);
    path.draw(graphics);
    
	//add map image
	scene.add.image(320, 256, 'map');

	//add background music
	scene.bgm = scene.sound.add('background');
	scene.bgm.volume = 0.04;
	scene.bgm.loop = true;
	//bgm.play();																//sounds
	
	scene.scene.add('HUD', HUD, true, { x: 640, y: 66 });
	
	//misc
	scene.nextEnemy = 0;
	scene.physics.add.overlap(ENEMY_GROUP, ATTACKS_GROUP, damageEnemy);
    scene.input.mouse.disableContextMenu();
}

//user input related actions 
function userAction(pointer, scene){
	var i = Math.floor(pointer.y/64);
	var j = Math.floor(pointer.x/64);
	if (pointer.leftButtonDown())
    {
		//if new tower
		if(map[i][j] == 0)
		{
			BUTTON_GROUP[0].clear(true, true);
			var placeButton = BUTTON_GROUP[0].get();
			placeButton.makeButton(pointer, scene);
			
			placeButton.on("pointerdown", ()=>{
				var newTower = TOWER_GROUP[peasantStats.towerId].get(peasantStats);
				newTower.placeTower(i, j, scene);
				placeButton.setActive(false);
				placeButton.setVisible(false);
				BUTTON_GROUP[0].remove(placeButton, true, true);
			});
		}
		//if upgrade tower
		else if(map[i][j].towerId == 0)
		{
			//old code to upgrade
			/* var currTower = map[i][j];
			var newTower = TOWER_GROUP[soldierStats.towerId].get(soldierStats);
			currTower.upgradeTower(i, j, newTower, scene); */
			
			
			//New code for remove and upgrade buttons
			BUTTON_GROUP[1].clear(true, true);
			BUTTON_GROUP[2].clear(true, true);
			
			var removeButton = BUTTON_GROUP[1].get();
			removeButton.makeButton(pointer, scene);
			
			var upgradeButton = BUTTON_GROUP[2].get();
			upgradeButton.makeButton(pointer, scene);
			
			removeButton.on("pointerdown", ()=>{
				var tower = map[i][j];
				if(typeof tower ==="object")
				{
					tower.removeTower(i, j);
				}
				removeButton.setActive(false);
				removeButton.setVisible(false);
				BUTTON_GROUP[1].remove(removeButton, true, true);
				upgradeButton.setActive(false);
				upgradeButton.setVisible(false);
				BUTTON_GROUP[2].remove(removeButton, true, true);
			});

			
			upgradeButton.on("pointerdown", ()=>{
				var currTower = map[i][j];
				var newTower = TOWER_GROUP[soldierStats.towerId].get(soldierStats);
				currTower.upgradeTower(i, j, newTower, scene);
				GOLD -= 2;
				removeButton.setActive(false);
				removeButton.setVisible(false);
				BUTTON_GROUP[1].remove(removeButton, true, true);
				upgradeButton.setActive(false);
				upgradeButton.setVisible(false);
				BUTTON_GROUP[2].remove(upgradeButton, true, true);
			});
		}
		else if(map[i][j].towerId == 1)
		{
			//old code
			/* var currTower = map[i][j];
			var newTower = TOWER_GROUP[archerStats.towerId].get(archerStats);
			currTower.upgradeTower(i, j, newTower, scene); */
			//new code
			BUTTON_GROUP[1].clear(true, true);
			BUTTON_GROUP[2].clear(true, true);
			
			var removeButton = BUTTON_GROUP[1].get();
			removeButton.makeButton(pointer, scene);
			
			var upgradeButton = BUTTON_GROUP[2].get();
			upgradeButton.makeButton(pointer, scene);

			removeButton.on("pointerdown", ()=>{
				var tower = map[i][j];
				if(typeof tower ==="object")
				{
					tower.removeTower(i, j);
				}
				removeButton.setActive(false);
				removeButton.setVisible(false);
				BUTTON_GROUP[1].remove(removeButton, true, true);
				upgradeButton.setActive(false);
				upgradeButton.setVisible(false);
				BUTTON_GROUP[2].remove(upgradeButton, true, true);
			});
			
			
			upgradeButton.on("pointerdown", ()=>{
				var currTower = map[i][j];
				var newTower = TOWER_GROUP[archerStats.towerId].get(archerStats);
				currTower.upgradeTower(i, j, newTower, scene);
				GOLD -= 3;
				removeButton.setActive(false);
				removeButton.setVisible(false);
				BUTTON_GROUP[1].remove(removeButton, true, true);
				upgradeButton.setActive(false);
				upgradeButton.setVisible(false);
				BUTTON_GROUP[2].remove(upgradeButton, true, true);
			});
		}
		else if(map[i][j].towerId == 2)
		{
			//new code
			BUTTON_GROUP[2].clear(true, true);
			
			var removeButton = BUTTON_GROUP[1].get();
			removeButton.makeButton(pointer, scene);

			removeButton.on("pointerdown", ()=>{
				var tower = map[i][j];
				if(typeof tower ==="object")
				{
					tower.removeTower(i, j);
				}
				removeButton.setActive(false);
				removeButton.setVisible(false);
				BUTTON_GROUP[1].remove(removeButton, true, true);
			});
		}
	}
	else if (pointer.rightButtonDown())
	{
		var tower = map[i][j];
		if(typeof tower === "object")
		{
			tower.removeTower(i, j);
		}

	}
}

function getEnemy(x, y, distance, hitFly) {
    for (var j = 0; j < ENEMY_GROUP.length; j++)
    {
        var enemyUnits = ENEMY_GROUP[j].getChildren();
        for(var i = 0; i < enemyUnits.length; i++) {       
            if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
                if (hitFly || !enemyUnits[i].flying)
                    return enemyUnits[i];
        }
    }
    return false;
} 

function damageEnemy(enemy, attack) {  
    // only if both enemy and attack are alive
    if (enemy.active === true && attack.active === true) {
        // we remove the attack right away
        attack.setActive(false);
        attack.setVisible(false);    
        
        // decrease the enemy hp with ATTACK_DAMAGE
        enemy.receiveDamage(attack.damage);
        //damage.play();
    }
}

function drawLines(graphics) {
    graphics.lineStyle(1, 0x0000ff, 0.8);
    for(var i = 0; i < 8; i++) {
        graphics.moveTo(0, i * 64);
        graphics.lineTo(640, i * 64);
    }
    for(var j = 0; j < 10; j++) {
        graphics.moveTo(j * 64, 0);
        graphics.lineTo(j * 64, 512);
    }
    graphics.strokePath();
}	

function addAttack(x, y, angle, damage, type) {
    var attack = ATTACKS_GROUP.get();
    if (attack)
    {
        attack.fire(x, y, angle, damage, type);
    }
}
//---------------------------------------------------------CLASSES--------------------------------------------
class HUD extends Phaser.Scene {

     constructor (scene)
    {
        super(scene);
        Phaser.Scene.call(this, { key: 'HUD', active: true });
		
    }

    preload()
    {
        
    }

    create()
    {
		//Get scene with game in it
		let sceneA = this.scene.get(CST.SCENES.GAME);
	
        //setup HUD
		var HUD = this.add.image(320,33, 'HUD');
		var volume = this.add.image(594,16, 'vol');
		var volDown = this.add.image(594,16, 'volDown');
		var play = this.add.image(556,16, 'play');
		var playDown = this.add.image(556,16, 'playDown');
		volDown.setVisible(false);
		playDown.setVisible(false);
		this.infoBar = this.add.text(270, 9, 'Wave '+WAVE+': 10 '+enemyArr[WAVE-1].enemyName, { fontFamily: 'Arial', fontSize: 15, color: '#00ff00' });
		this.goldBar = this.add.text(50, 40, 'Gold: '+GOLD, { fontFamily: 'Arial', fontSize: 15, color: '#ffd700'});
		
		/* HUD.setDepth(1);
		volume.setDepth(1);
		volDown.setDepth(1);
		play.setDepth(1);
		playDown.setDepth(1);
		this.infoBar.setDepth(1); */
		
		volume.setInteractive({ useHandCursor: true });
			volume.on("pointerover", ()=>{
			volDown.setVisible(true);
		});
		volume.on("pointerout", ()=>{
			volDown.setVisible(false);
		});
		
		volume.on("pointerup", ()=>{
			if(sceneA.bgm.isPaused)
			{
				sceneA.bgm.resume();
			}
			else if(sceneA.bgm.isPlaying)
			{
				sceneA.bgm.pause();
			}
			else
			{
				sceneA.bgm.play();
			}
		});
		
		play.setInteractive({ useHandCursor: true });
		play.on("pointerover", ()=>{
			playDown.setVisible(true);
		});
		play.on("pointerout", ()=>{
			playDown.setVisible(false);
		});
		
		play.on("pointerup", ()=>{
			if(sceneA.scene.isActive())
			{
				sceneA.scene.pause();
				sceneA.bgm.pause();
			}
			else
			{
				sceneA.scene.resume();
				sceneA.bgm.resume();
			}
		});
    }

    update() {
        this.infoBar.setText('Wave '+WAVE+': 10 '+enemyArr[WAVE-1].enemyName);
        this.goldBar.setText('Gold: '+GOLD);
    }

}

//enemy class
class Enemy extends Phaser.GameObjects.Sprite {

    constructor (scene, stats)
    {
        super(scene);

        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.hp = stats.hp;
        this.value = stats.value;
        this.speed = stats.speed;
        this.magicArmor = stats.magicArmor;
        this.physicalArmor = stats.physicalArmor;
        this.flying = stats.flying;

        this.turned = 0;

        
        this.damage = scene.sound.add('hit');
        this.damage.volume = 0.03;
        this.damage.loop = false;
		
		this.text = scene.add.text(0, 0, "HP: "+ this.hp, {font: "16px Arial", fill: "#ffffff"});		//textHP
		this.text.setPadding(0, 0, 0, 60);														//textHP
		this.text.setOrigin(0.5);																//textHP
		this.healthbar = new HealthBar(scene, 0, 0, this.hp);

    }

	startOnPath ()
	{
		this.follower.t = 0;
		//this.hp = ENEMY_HP;
		
		//this.walk.play();																//sounds
		
		path.getPoint(this.follower.t, this.follower.vec);
		
		this.setPosition(this.follower.vec.x, this.follower.vec.y);
		
		//this.text.setPosition(this.follower.vec.x, this.follower.vec.y);
		this.healthbar.setPosition(this.follower.vec.x - this.width, this.follower.vec.y - this.height);
	 }
	
	receiveDamage(damage, type) {
	    if (type == "physical")
	    {
	        this.hp -= Math.floor(damage * 100/(100+this.physicalArmor));
	    }
	    else
	    {
	        this.hp -= Math.floor(damage * (100/(100+this.magicArmor)));
	    }
		//this.hp -= damage;           
		this.text.setText("HP: " + this.hp);											//textHP
		this.healthbar.decrease(damage);
		this.damage.play();														//sounds
		
		// if hp drops below 0 we deactivate this enemy
		if (this.hp <= 0) {
			this.setActive(false);
			this.setVisible(false);
			this.text.setActive(false);													//textHP
			this.text.setVisible(false);												//textHP
			this.healthbar.destroy();
			
			//Need to set this to stop when all enemies are dead
			//this.death.play();																//sounds
			//this.walk.stop();																//sounds
			this.destroy();
			GOLD += this.value;
		}
	}
	
	update (time, delta)
	{
		//ENEMY_SPEED = 1/Math.floor((Math.random() * (10000 - 5000)) + 5000);
		this.follower.t += ENEMY_SPEED * delta * this.speed;
		
		path.getPoint(this.follower.t, this.follower.vec);
		
		this.setPosition(this.follower.vec.x, this.follower.vec.y);
		this.text.setPosition(this.follower.vec.x, this.follower.vec.y);									//textHP
		this.healthbar.setPosition(this.follower.vec.x - this.width, this.follower.vec.y - this.height);

		if (this.follower.t >= 1)
		{
			this.setActive(false);
			this.setVisible(false);
			this.text.setActive(false);										//textHP
			this.text.setVisible(false);									//textHP
			this.healthbar.destroy();
			//this.walk.stop();												//sounds
			this.destroy();
		}

		if (this.follower.vec.y == 164 && this.turned==0){
		    this.turnRight();
		    this.turned = 1;
		}
		else if (this.follower.vec.y != 164 && this.turned ==1)
		{
		    this.turnDown();
		    this.turned = 2;
		}
	}
};

class Deathknight extends Enemy {
	constructor(scene, stats) {
		super(scene, stats);
		Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'deathknight');

		
        this.anims.play('dkdown');
		
		//create sounds
		this.death = scene.sound.add('dkDeath');
		this.death.volume = 0.05;
		this.death.loop = false;
		
		

		/* this.walk = scene.sound.add('walk');
		this.walk.volume = 0.01;
		this.walk.loop = true; */
	}
    turnDown()
    {
        this.anims.play('dkdown');
    }

    turnRight()
    {
        this.anims.play('dkright');
    }

	pFn()
	{
		console.log(this.towerName);
	}

}

class Skeleton extends Enemy {
    constructor(scene, stats){
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'skeleton');

        this.anims.play('skeleton_down');

    }

    turnDown()
    {
        this.anims.play('skeleton_down');
    }

    turnRight()
    {
        this.anims.play('skeleton_right');
    }
}

class Bat extends Enemy {
    constructor(scene, stats){
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'bat');

        this.anims.play('bat_down');

    }

    turnDown()
    {
        this.anims.play('bat_down');
    }

    turnRight()
    {
        this.anims.play('bat_right');
    }
}

class Ogre extends Enemy {
    constructor(scene, stats){
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'ogre');

        this.anims.play('ogre_down');

    }

    turnDown()
    {
        this.anims.play('ogre_down');
    }

    turnRight()
    {
        this.anims.play('ogre_right');
    }
}

//tower class
class Tower extends Phaser.GameObjects.Sprite{

	constructor (scene, stats)
	{
		super(scene);

		this.nextTic = 0;
		this.towerId =  stats.towerId; //each tower has unique id
		this.towerName = stats.towerName;
		this.upgrade = stats.upgrade; //true = can upgrade, false = can't upgrade
		this.str = stats.str; //value tha determines attack strength
		this.atkRange = stats.atkRange;
		this.atkType = stats.atkType;
		this.atkRate = stats.atkRate; 
		this.hitFly = stats.hitFly; //true = can hit flying enemeies, false = cannot hit flying enemies
		//this.aoeRange = aoeRange; //area of effect range
		//this.spc = spc; //has special attack, each value represents special type, 0 = none, 1 = chance to stun, etc.
		
		this.text = scene.add.text(0, 0, this.towerName, {font: "16px Arial", fill: "#ffffff"});
		
		this.upgradeSound = scene.sound.add('upgradeSound');
		this.upgradeSound.volume = 0.05;
		this.upgradeSound.loop = false;
		
	}
	
	placeTower(i, j, scene) {
		//var i = Math.floor(pointer.y/64);
		//var j = Math.floor(pointer.x/64);
		if(map[i][j] === 0) {
			//console.log(tower);
			if (this)
			{
				this.text.y = (i+.50) * 64 + 64/2;
				this.text.x = j * 64 + 64/2;
				this.text.setOrigin(0.5);
				//scene.add.container([this.text, this]);
				this.setActive(true);
				this.setVisible(true);
				this.y = i * 64 + 64/2;
				this.x = j * 64 + 64/2;
				//map[i][j] = 1;
				map[i][j] = this;
				this.setInteractive({ useHandCursor: true });
				GOLD -= 1;
			}   
			//console.log(TOWER_GROUP.getTotalUsed());
			//console.log(TOWER_GROUP.getLength());
		}
		else
		{
			TOWER_GROUP[this.towerId].remove(this, true, true);		//tower is created before it's placed so removed if the place clicked on is  not avaialble
		}
	}

	removeTower(i, j) {
		//var i = Math.floor(pointer.y/64);
		//var j = Math.floor(pointer.x/64);
		if(map[i][j] !== 0) {
			this.setActive(false);
			this.setVisible(false);
			this.text.destroy();
			map[i][j] = 0;												//remove from map
			TOWER_GROUP[this.towerId].remove(this, true, true);			//removes from group, if want to keep it as inactive then remove this line
		}
			
	}
	
	upgradeTower(i, j, newTower, scene) {
		//check if tower is already upgraded, if not the upgrade
		if(this.towerName !== newTower.towerName)
		{
			//var i = Math.floor(pointer.y/64);
			//var j = Math.floor(pointer.x/64);
			this.removeTower(i, j);
			newTower.placeTower(i, j, scene);
			//console.log(TOWER_GROUP.getTotalUsed());
			//console.log(TOWER_GROUP.getLength());
			this.text = newTower.towerName;
			this.upgradeSound.play();

            /* scene.tweens.add({
                targets: newTower, // on the player 
                duration: 200, // for 200ms 
                scaleX: 1.2, // that scale vertically by 20% 
                scaleY: 1.2, // and scale horizontally by 20% 
                alpha: 0.2,
                yoyo: true, // at the end, go back to original scale 
            }); */

		}
		else
		{
			TOWER_GROUP[newTower.towerId].remove(newTower, true, true);		//tower is created before it's placed so removed if the place clicked on is  not avaialble
			newTower.text.destroy();
		}
	
	}
	
	fire() {
	    var enemy = getEnemy(this.x, this.y, this.atkRange, this.hitFly);
	    if(enemy) {
	        var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
	        addAttack(this.x, this.y, angle, this.str, this.atkType);
	        //this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;    //uncomment to make towers rotate to face enemy
	    }
	}
	
	update(time, delta, pointer)
	{
		if(time > this.nextTic) {
			this.fire();
			this.nextTic = time + TOWER_FIRE_RATE;
		}
	}
	sayName()
	{
		console.log(this.towerName);
	}

};

class Peasant extends Tower {
	constructor(scene, stats) {
		// Note: In derived classes, super() must be called before you
		// can use 'this'. Leaving this out will cause a reference error.
		super(scene, stats);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'peasant', 'sprite35');
	}
	

}

class Soldier extends Tower {
	constructor(scene, stats) {
		super(scene, stats);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'soldier', 'sprite25');

	}
	

}

class Archer extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'archer', 'tile051');
		
    }


}


//all other classes
//HP class
class HealthBar {

    constructor(scene, x, y, health) {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.value = health;
        this.maxValue = health;
        this.p = 76/this.maxValue;

        this.draw();

        scene.add.existing(this.bar);
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.draw();
    }

    decrease(amount) {
        this.value -= amount;

        if (this.value < 0) {
            this.value = 0;
        }

        this.draw();

        return (this.value === 0);
    }

    draw() {
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 80, 16);

        //  Health

        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 2, this.y + 2, 76, 12);

        if (this.value < 0.3 * this.maxValue) {
            this.bar.fillStyle(0xff0000);
        }
        else if (this.value < 0.6 * this.maxValue) {
            this.bar.fillStyle(0xffff00);
        }
        else {
            this.bar.fillStyle(0x00ff00);
        }

        var d = Math.floor(this.p * this.value);

        this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
    }

    destroy() {
        this.bar.destroy();
    }

}

//the yellow thing the towers shoots at enemy, can be any form of projectile
class Attack extends Phaser.GameObjects.Image {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'attack');

		this.incX = 0;
		this.incY = 0;
		this.lifespan = 0;

		this.speed = Phaser.Math.GetSpeed(600, 1);

    	this.particles = scene.add.particles('attack');

        this.emitter = this.particles.createEmitter({
            speed: 75,
            scale: { start: 0.2, end: 0 },
            quantity: 1,
            blendMode: 'SCREEN'
        });

	    this.emitter.startFollow(this);
        
	}

    fire(x, y, angle, damage, type)
    {
        this.setActive(true);
        this.setVisible(true);
        //  Attacks fire from the middle of the screen to the given x/y
        this.setPosition(x, y);
		
        //  we don't need to rotate the attacks as they are round
        //    this.setRotation(angle);

        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);

        this.lifespan = 1000;
        this.damage = damage;
        this.atkType = type;
    }

	update (time, delta)
	{
		this.lifespan -= delta;
		this.x += this.dx * (this.speed * delta);
		this.y += this.dy * (this.speed * delta);
        this.emitter.explode(5,this.x,this.y);

		if (this.lifespan <= 0)
		{
			this.setActive(false);
			this.setVisible(false);
            
		}
	}

};

class TowerButton extends Phaser.GameObjects.Image {
	constructor(scene)
	{
		super(scene);
	}
	
	
};

class PlaceButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'placetowerbutton');
	}
			
	makeButton(pointer,scene) {
		var i = Math.floor(pointer.y/64);
		var j = Math.floor(pointer.x/64);
		if(map[i][j] === 0) {
			if (this)
			{
				this.setActive(true);
				this.setVisible(true);
				this.x = 120;
				this.y = 482;
				//map[i][j] = this;
				this.setInteractive();//{ useHandCursor: true });
			}   
		}
	}
};

class RemoveButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'removetowerbutton');
	}
	
	makeButton(pointer,scene) {
		var i = Math.floor(pointer.y/64);
		var j = Math.floor(pointer.x/64);
		if (this)
		{
			this.setActive(true);
			this.setVisible(true);
			this.x = 120;
			this.y = 482;
			//map[i][j] = this;
			this.setInteractive();//{ useHandCursor: true });
		}
	}
};

class UpgradeButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'upgradetowerbutton');
	}
		
	makeButton(pointer,scene) {
		var i = Math.floor(pointer.y/64);
		var j = Math.floor(pointer.x/64);
		if (this)
		{
			this.setActive(true);
			this.setVisible(true);
			this.x = 120;
			this.y = 422;
			//map[i][j] = this;
			this.setInteractive();//{ useHandCursor: true });
		}   
	}
};
		
		
		




export class GameScene extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.GAME
        })
    }

    
    //Preload function loads assets before game starts
 
    init(data){
        console.log(data);
    }

    //create function initializes and adds assets to game
    create() {
        /*creates a group for a tower type, that way we can use TOWER_GROUP.get(towerStats) to instantiate new towers easily
	loop through towerArr to get each tower object
	then add each object to TOWER_GROUP arr
	we do this becuase TOWER_GROUP can now be easily used to manipulate tower objects with Phaser functions.*/
	//loop set to 2 since we only have 2 developed classes at the moment
	for(var i = 0; i < 3; i++) {
		TOWER_GROUP[towerArr[i].towerId] = this.add.group({ classType: eval(towerArr[i].towerName), runChildUpdate: true });
	}
	
	//enemy group will be a loop similar to tower group
	for (var i = 0; i < 4; i++) {
	    ENEMY_GROUP[enemyArr[i].enemyId] = this.physics.add.group({classType: eval(enemyArr[i].enemyName), runChildUpdate: true});
	}
	//ENEMY_GROUP = this.physics.add.group({ classType: Deathknight, runChildUpdate: true }); //key: 'walk_down_', frame: [1, 2, 3, 4], repeat: 5, active: true });
	
	//turned into attack group soon for different attack types
	ATTACKS_GROUP = this.physics.add.group({ classType: Attack, runChildUpdate: true });
	
	//test button group
	BUTTON_GROUP[0] = this.add.group({ classType: PlaceButton, runChildUpdate: false });
	BUTTON_GROUP[1] = this.add.group({ classType: RemoveButton, runChildUpdate: false });
	BUTTON_GROUP[2] = this.add.group({ classType: UpgradeButton, runChildUpdate: false });
	
	//build the game map, this includes pathing, map image, background sounds, and general game assets
	buildMap(this);
	
	//input related actions in userAction function
	this.input.on('pointerdown', function (pointer){userAction(pointer, this)});

    //create animations
	this.anims.create({
	    key: 'dkdown',
	    frames: this.anims.generateFrameNames('deathknight', { prefix: 'walk_down_', start: 1, end: 4 }),
	    frameRate: 3,
	    repeat: -1
	});
	this.anims.create({
	    key: 'dkright',
	    frames: this.anims.generateFrameNames('deathknight', { prefix: 'walk_right_', start: 1, end: 4 }),
	    frameRate: 5,
	    repeat: -1
	});

        //Skeleton Animations
	this.anims.create({
	    key: 'skeleton_down',
	    frames: this.anims.generateFrameNames('skeleton', {prefix: 'walk_down_', start:1, end: 4}),
	    frameRate: 5,
	    repeat: -1
	});

	this.anims.create({
	    key: 'skeleton_right',
	    frames: this.anims.generateFrameNames('skeleton', {prefix: 'walk_right_', start:1, end: 4}),
	    frameRate: 5,
	    repeat: -1
	});

        //Bat Animations
	this.anims.create({
	    key: 'bat_down',
	    frames: this.anims.generateFrameNames('bat', {prefix: 'fly_down_', start:1, end: 5}),
	    frameRate: 5,
	    repeat: -1
	});

	this.anims.create({
	    key: 'bat_right',
	    frames: this.anims.generateFrameNames('bat', {prefix: 'fly_right_', start:1, end: 5}),
	    frameRate: 5,
	    repeat: -1
	});
        //Ogre Animations
	this.anims.create({
	    key: 'ogre_down',
	    frames: this.anims.generateFrameNames('ogre', {prefix: 'walk_down_', start:1, end: 6}),
	    frameRate: 5,
	    repeat: -1
	});

	this.anims.create({
	    key: 'ogre_right',
	    frames: this.anims.generateFrameNames('ogre', {prefix: 'walk_right_', start:1, end: 6}),
	    frameRate: 5,
	    repeat: -1
	});

	/*let nextScene = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2, 'nextScene').setDepth(1);
	nextScene.setInteractive();
	nextScene.on("pointerdown", ()=>{
		this.scene.start(CST.SCENES.GAME2, "Armory Level");
	})*/
    }

    //update function constantly refreshes so to progress game
    update(time, delta) {  
            if (time > this.nextEnemy && SPAWNED <= 10)
            {
                var enemy = ENEMY_GROUP[WAVE-1].get(enemyArr[WAVE-1]);
                if (enemy)
                {
                    enemy.setActive(true);
                    enemy.setVisible(true);
                    enemy.startOnPath();
                    //ENEMY_SPEED = 1/Math.floor((Math.random() * (2000 - 500)) + 500);
                    this.nextEnemy = time + ENEMY_SPAWN_RATE;
                    SPAWNED += 1;
                }
                if (SPAWNED == 10 && WAVE < 4)
                {
                    SPAWNED = 0;
                    WAVE += 1;
                }
            }
    }
}
