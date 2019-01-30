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
var TOWER_GROUP;
var ENEMY_GROUP;

var ENEMY_SPEED = 1/10000;
//var ENEMY_SPEED = 1/Math.floor((Math.random() * 10000) + 10000);
var ENEMY_HP = 1000;
var ENEMY_SPAWN_RATE = 2000;
//var ENEMY_SPAWN_RATE = Math.floor((Math.random() * 1000) + 1000);
var ATTACK_DAMAGE = 50;
var TOWER_FIRE_RATE = 300;

//stats for each tower type loaded from file rather than defined here, but for now do this
var peasantStats = {towerId:0, towerName:"peasant", upgrade:true, str:10, atkRange:"short", atkType:"physical", atkRate:"medium", hitfly:false};
var soldierStats = {towerId:1, towerName:"soldier", upgrade:true, str:10, atkRange:"short", atkType:"physical", atkRate:"medium", hitfly:false};

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
        damage.play();
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
class Enemy extends Phaser.GameObjects.Sprite {

    constructor (scene)
    {
        super(scene);
        
        //dknight.animations.add('walk_down', 1, 4);
        //this.anims.create({ key: 'down', frames: this.anims.generateFrameNames('deathknight', { prefix: 'walk_down_', start: 1, end: 4 }), frameRate: 5, repeat: -1 })
        
        var enem = Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'deathknight');
        this.anims.play('dkdown');
        walk.play();
        //this.dknight.anims.play('walk_down_', 1)
        //this.sprite.anims.add({ key: 'walk_down', frames: this.anims.generateFrameNames('walk_down_', 1, 4), frameRate: 5, repeat: -1 });
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.hp = 0;
        this.turned = 0;
    }

        startOnPath ()
        {
            this.follower.t = 0;
            this.hp = ENEMY_HP;
            
            path.getPoint(this.follower.t, this.follower.vec);
            
            this.setPosition(this.follower.vec.x, this.follower.vec.y);            
        }
		
        receiveDamage(damage) {
            this.hp -= damage;           
            
            // if hp drops below 0 we deactivate this enemy
            if (this.hp <= 0) {
                this.setActive(false);
                this.setVisible(false);
                dkdeath.play();
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
        }
		
		placeTower(pointer) {
			var i = Math.floor(pointer.y/64);
			var j = Math.floor(pointer.x/64);
			if(map[i][j] === 0) {
				//console.log(tower);
				if (this)
				{
					this.setActive(true);
					this.setVisible(true);
					this.y = i * 64 + 64/2;
					this.x = j * 64 + 64/2;
					map[i][j] = 1;
				}   
				//console.log(TOWER_GROUP.getTotalUsed());
				//console.log(TOWER_GROUP.getLength());
			}
			else
				TOWER_GROUP.remove(this, true, true);		//tower is created before it's placed so removed if the place clicked on is  not avaialble
		}

		removeTower(pointer) {
			var i = Math.floor(pointer.y/64);
			var j = Math.floor(pointer.x/64);
			if(map[i][j] !== 0) {
				this.setActive(false);
				this.setVisible(false);
				map[i][j] = 0;								//remove from map
				TOWER_GROUP.remove(this, true, true);			//removes from group, if want to keep it as inactive then remove this line
			}
				
		}
		
		upgradeTower(pointer) {
			var i = Math.floor(pointer.y/64);
			var j = Math.floor(pointer.x/64);
			if(map[i][j] === 1) {
				//console.log(tower);
				var x = this.x;
				var y = this.y;
				this.removeTower(pointer);
				//var group = TOWER_GROUP.add.group({ classType: Soldier, runChildUpdate: true });
				
				/* this.setActive(true);
				this.setVisible(true);
				this.y = i * 64 + 64/2;
				this.x = j * 64 + 64/2;
				map[i][j] = 1; */ 
				//console.log(TOWER_GROUP.getTotalUsed());
				//console.log(TOWER_GROUP.getLength());
			}
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
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'goldenarmor', 'sprite25');
		
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

    dkdeath = this.sound.add('dkDeath');
    damage = this.sound.add('hit');
    damage.volume = 0.3;
    walk = this.sound.add('walk');
    walk.volume = 0.3;
    walk.loop = true;
    background = this.sound.add('background');
    background.volume = 0.2;
    background.loop = true;
    background.play();
	
	//creates a group for a tower type, that way we can use TOWER_GROUP.get(peasantStats) to instantiate new base level towers easily
    //same goes for enemies and attacks and for any new classes created
	TOWER_GROUP = this.add.group({ classType: Peasant, runChildUpdate: true });
	
	ENEMY_GROUP = this.physics.add.group({ classType: Enemy, runChildUpdate: true }); //key: 'walk_down_', frame: [1, 2, 3, 4], repeat: 5, active: true });
    
    //ENEMY_GROUP.callAll('play', null, 'down',);

    attacks = this.physics.add.group({ classType: Attack, runChildUpdate: true });
    
    this.nextEnemy = 0;
    
    this.physics.add.overlap(ENEMY_GROUP, attacks, damageEnemy);
    
	this.input.mouse.disableContextMenu();
	
    this.input.on('pointerdown', function (pointer) {
		if (pointer.leftButtonDown())
        {
			var tower = TOWER_GROUP.get(peasantStats);
			tower.placeTower(pointer);
        }
        else if (pointer.rightButtonDown())
        {
			TOWER_GROUP.children.iterate(function (tower) {
				var i = Math.floor(pointer.y/64);
				var j = Math.floor(pointer.x/64);
				var y = i * 64 + 64/2;
				var x = j * 64 + 64/2;
				if (tower && tower.x == x && tower.y == y)
				{
					//tower.removeTower(pointer);
					tower.upgradeTower(pointer);
				}
			});
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

