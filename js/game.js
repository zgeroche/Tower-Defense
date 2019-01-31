//-------------------------------------------------------SETUP-----------------------------------------------------
//master config for game
var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 640,
    height: 512,
    physics: {
        default: 'arcade'
    },
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
    
};

//begin game
var game = new Phaser.Game(config);

//--------------------------------------------------GLOBAL VARIABLES-------------------------------------------
var path;
var TOWER_GROUP = [];
var ENEMY_GROUP;
var mainGame;

var ENEMY_SPEED = 1/10000;
//var ENEMY_SPEED = 1/Math.floor((Math.random() * 10000) + 10000);
var ENEMY_HP = 1000;
var ENEMY_SPAWN_RATE = 2000;
//var ENEMY_SPAWN_RATE = Math.floor((Math.random() * 1000) + 1000);
var ATTACK_DAMAGE = 50;
var TOWER_FIRE_RATE = 300;

//stats for each tower type loaded from file rather than defined here, but for now do this
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

//map for tower placement, 0=can place, -1=cannot place, 1=can place with turrent already occupying space
var map =  [[ 0,-1, 0,-1,-1,-1,-1,-1,-1,-1],
            [ 0,-1, 0, 0, 0, 0, 0, 0, 0,-1],
            [ 0,-1,-1,-1,-1,-1,-1,-1, 0,-1],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0,-1],
            [-1,-1,-1,-1,-1,-1, 0,-1, 0,-1],
            [-1,-1,-1,-1,-1,-1, 0,-1, 0,-1],
            [-1,-1,-1,-1,-1,-1, 0,-1, 0,-1],
            [-1,-1,-1,-1,-1,-1, 0,-1, 0,-1]];
			

//------------------------------------------FUNCTIONS---------------------------------------------------			
function getEnemy(x, y, distance) {
    var enemyUnits = ENEMY_GROUP.getChildren();
    for(var i = 0; i < enemyUnits.length; i++) {       
        if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
            return enemyUnits[i];
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
        enemy.receiveDamage(ATTACK_DAMAGE);
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

function addAttack(x, y, angle) {
    var attack = attacks.get();
    if (attack)
    {
        attack.fire(x, y, angle);
    }
}

//---------------------------------------------------------CLASSES--------------------------------------------
class HealthBar {

    constructor(scene, x, y) {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.value = ENEMY_HP;
        this.p = .076;

        this.draw();

        mainGame.add.existing(this.bar);
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

        if (this.value < 0.6 * ENEMY_HP) {
            this.bar.fillStyle(0xff0000);
        }
        else if (this.value < 0.3 * ENEMY_HP)
            this.bar.fillStyle(0x00ffff);
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


class Enemy extends Phaser.GameObjects.Sprite {

    constructor (scene)
    {
        super(scene);
        //dknight.animations.add('walk_down', 1, 4);
        //this.anims.create({ key: 'down', frames: this.anims.generateFrameNames('deathknight', { prefix: 'walk_down_', start: 1, end: 4 }), frameRate: 5, repeat: -1 })
        
		var enemy = Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'deathknight');
		
		mainGame.anims.create({
			key: 'dkdown',
			frames: mainGame.anims.generateFrameNames('deathknight', { prefix: 'walk_down_', start: 1, end: 4 }),
			frameRate: 3,
			repeat: -1
		});
		mainGame.anims.create({
			key: 'dkright',
			frames: mainGame.anims.generateFrameNames('deathknight', { prefix: 'walk_right_', start: 1, end: 4 }),
			frameRate: 5,
			repeat: -1
		});
        
        this.anims.play('dkdown');
        //walk.play();
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.hp = 0;
        this.turned = 0;
		
		this.text = mainGame.add.text(0, 0, "HP: "+ ENEMY_HP, {font: "16px Arial", fill: "#ffffff"});
		this.text.setPadding(0, 0, 0, 60);
		this.text.setOrigin(0.5);
		this.healthbar = new HealthBar(scene, 0, 0);
		
    }

	startOnPath ()
	{
		this.follower.t = 0;
		this.hp = ENEMY_HP;
		
		path.getPoint(this.follower.t, this.follower.vec);
		
		this.setPosition(this.follower.vec.x, this.follower.vec.y);     
		this.text.setPosition(this.follower.vec.x, this.follower.vec.y);
		this.healthbar.setPosition(this.follower.vec.x - this.width, this.follower.vec.y - this.height);
	 }
	
	receiveDamage(damage) {
		this.hp -= damage;           
		this.text.setText("HP: " + this.hp);
		this.healthbar.decrease(damage);
		// if hp drops below 0 we deactivate this enemy
		if (this.hp <= 0) {
			this.setActive(false);
			this.setVisible(false);
			this.text.setActive(false);
			this.text.setVisible(false);
			this.healthbar.destroy();
			//dkdeath.play();
			//Need to set this to stop when all enemies are dead
			//walk.stop();
			this.destroy();
		}
	}
	
	update (time, delta)
	{
		//ENEMY_SPEED = 1/Math.floor((Math.random() * (10000 - 5000)) + 5000);
		this.follower.t += ENEMY_SPEED * delta;
		
		path.getPoint(this.follower.t, this.follower.vec);
		
		this.setPosition(this.follower.vec.x, this.follower.vec.y);
		this.text.setPosition(this.follower.vec.x, this.follower.vec.y);
		this.healthbar.setPosition(this.follower.vec.x - this.width, this.follower.vec.y - this.height);
		if (this.follower.vec.y == 164 && this.turned == 0) {
			this.anims.play('dkright');
			this.turned = 1;
		}
		else if (this.follower.vec.y != 164 && this.turned == 1)
		{
			this.anims.play('dkdown');
			this.turned = 2;
		}

		if (this.follower.t >= 1)
		{
			this.setActive(false);
			this.setVisible(false);
			this.text.setActive(false);
			this.text.setVisible(false);
			this.healthbar.destroy();
			this.destroy();
		}
	}
};

//towers class
class Tower extends Phaser.GameObjects.Image {

	constructor (scene, stats)
	{
		super(scene);
		//Phaser.GameObjects.Image.call(this, scene, 0, 0, 'goldenarmor', 'sprite25');
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
		this.text = mainGame.add.text(0, 0, this.towerName, {font: "16px Arial", fill: "#ffffff"});
	}
	
	placeTower(pointer) {
		var i = Math.floor(pointer.y/64);
		var j = Math.floor(pointer.x/64);
		if(map[i][j] === 0) {
			//console.log(tower);
			if (this)
			{
				this.text.y = (i+.50) * 64 + 64/2;
				this.text.x = j * 64 + 64/2;
				this.text.setOrigin(0.5);
				//mainGame.add.container([this.text, this]);
				this.setActive(true);
				this.setVisible(true);
				this.y = i * 64 + 64/2;
				this.x = j * 64 + 64/2;
				//map[i][j] = 1;
				map[i][j] = this;
			}   
			//console.log(TOWER_GROUP.getTotalUsed());
			//console.log(TOWER_GROUP.getLength());
		}
		else
			TOWER_GROUP[this.towerId].remove(this, true, true);		//tower is created before it's placed so removed if the place clicked on is  not avaialble
	}

	removeTower(pointer) {
		var i = Math.floor(pointer.y/64);
		var j = Math.floor(pointer.x/64);
		if(map[i][j] !== 0) {
			this.setActive(false);
			this.setVisible(false);
			this.text.setActive(false);
			this.text.setVisible(false);
			map[i][j] = 0;								//remove from map
			TOWER_GROUP[this.towerId].remove(this, true, true);			//removes from group, if want to keep it as inactive then remove this line
		}
			
	}
	
	upgradeTower(pointer, newTower) {
		var i = Math.floor(pointer.y/64);
		var j = Math.floor(pointer.x/64);
		this.removeTower(pointer);
		newTower.placeTower(pointer);
		//console.log(TOWER_GROUP.getTotalUsed());
		//console.log(TOWER_GROUP.getLength());
	
	}
	
	fire() {
		var enemy = getEnemy(this.x, this.y, 200);
		if(enemy) {
			var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
			addAttack(this.x, this.y, angle);
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
	pFn()
	{
		console.log(this.towerName);
	}

}

class Soldier extends Tower {
	constructor(scene, stats) {
		super(scene, stats);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'goldenarmor', 'sprite25');
		
	}
	sFn()
	{
		console.log(this.towerName);
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
	}

	fire(x, y, angle)
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
	}

	update (time, delta)
	{
		this.lifespan -= delta;

		this.x += this.dx * (this.speed * delta);
		this.y += this.dy * (this.speed * delta);

		if (this.lifespan <= 0)
		{
			this.setActive(false);
			this.setVisible(false);
		}
	}

};

//----------------------------------------------------GAME-------------------------------------------	
	
//Preload function loads assets before game starts
function preload() {    
    this.load.atlas('deathknight', 'assets/deathknight.png', 'assets/deathknight.json');
    this.load.atlas('goldenarmor', 'assets/goldenarmor.png', 'assets/goldenarmor.json');
    this.load.atlas('peasant', 'assets/peasant.png', 'assets/peasant.json');
	this.load.spritesheet('bard', 'assets/bard.png', { frameWidth: 52, frameHeight: 75});
	this.load.image('attack', 'assets/coin.png');
	this.load.image('map', 'assets/castle-gates.png', { frameWidth: 640, frameHeight: 512 });
	this.load.audio('dkDeath', 'assets/Sounds/Death Screams/Human/sfx_deathscream_human5.wav');
	this.load.audio('hit', 'assets/Sounds/General Sounds/Simple Damage Sounds/sfx_damage_hit2.wav');
	this.load.audio('walk', 'assets/Sounds/Movement/Footsteps/sfx_movement_footstepsloop4_slow.wav');
	this.load.audio('background', 'assets/Sounds/random silly chip song.ogg');
}
 
//create function initializes and adds assets to game
function create() {
	//path to which enemey follows
    var graphics = this.add.graphics();    
    drawLines(graphics);
    path = this.add.path(96, -32);
    path.lineTo(96, 164);
    path.lineTo(480, 164);
    path.lineTo(480, 544);
	
    graphics.lineStyle(0, 0xffffff, 1);
    path.draw(graphics);
    
    this.add.image(320, 256, 'map');

	mainGame = this;

/*     dkdeath = this.sound.add('dkDeath');
    damage = this.sound.add('hit');
    damage.volume = 0.3;
    walk = this.sound.add('walk');
    walk.volume = 0.3;
    walk.loop = true;
    background = this.sound.add('background');
    background.volume = 0.2;
    background.loop = true;
    background.play(); */
	
	//creates a group for a tower type, that way we can use TOWER_GROUP.get(peasantStats) to instantiate new towers easily
    //same goes for enemies and attacks and for any new classes created
	TOWER_GROUP[peasantStats.towerId] = this.add.group({ classType: Peasant, runChildUpdate: true });
	TOWER_GROUP[soldierStats.towerId] = this.add.group({ classType: Soldier, runChildUpdate: true });
	
	ENEMY_GROUP = this.physics.add.group({ classType: Enemy, runChildUpdate: true }); //key: 'walk_down_', frame: [1, 2, 3, 4], repeat: 5, active: true });
   
	
    //ENEMY_GROUP.callAll('play', null, 'down',);

    attacks = this.physics.add.group({ classType: Attack, runChildUpdate: true });
    
    this.nextEnemy = 0;
    
    this.physics.add.overlap(ENEMY_GROUP, attacks, damageEnemy);
    
	this.input.mouse.disableContextMenu();
	
    this.input.on('pointerdown', function (pointer) {
		if (pointer.leftButtonDown())
        {
			var i = Math.floor(pointer.y/64);
			var j = Math.floor(pointer.x/64);
			if(map[i][j] == 0)
			{
				var tower = TOWER_GROUP[peasantStats.towerId].get(peasantStats);
				tower.placeTower(pointer);
			}
			else if(typeof map[i][j] === "object")
			{
				var tower = map[i][j];
				//var newTG = mainGame.add.group({ classType: Soldier, runChildUpdate: true });
				var newTower = TOWER_GROUP[soldierStats.towerId].get(soldierStats);
				tower.upgradeTower(pointer, newTower);
				tower.setText = newTower.towerName;
			}
        }
        else if (pointer.rightButtonDown())
        {
			var i = Math.floor(pointer.y/64);
			var j = Math.floor(pointer.x/64);
			var tower = map[i][j];
			if(typeof tower === "object")
			{
				tower.removeTower(pointer);
			}
			
			/* TOWER_GROUP.children.iterate(function (tower) {
				var i = Math.floor(pointer.y/64);
				var j = Math.floor(pointer.x/64);
				var y = i * 64 + 64/2;
				var x = j * 64 + 64/2;
				if (tower && tower.x == x && tower.y == y)
				{
					tower.removeTower(pointer);
					//tower.upgradeTower(pointer);
				}
			}); */
        }
	});
	
/* 	this.arrow = this.input.keyboard.createCursorKeys();
	if (this.arrow.down.isDown) {
	   this.scene.pause();
	}  */
}

//update function constantly refreshes so to progress game
function update(time, delta) {  

    if (time > this.nextEnemy)
    {
        var enemy = ENEMY_GROUP.get();
        if (enemy)
        {
            enemy.setActive(true);
            enemy.setVisible(true);
            enemy.startOnPath();
			//ENEMY_SPEED = 1/Math.floor((Math.random() * (2000 - 500)) + 500);
            this.nextEnemy = time + ENEMY_SPAWN_RATE;
        }       
    }
	
}

