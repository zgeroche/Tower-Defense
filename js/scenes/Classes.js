import {CST} from "../CST";
var globals = require('./Globals.js');
var fn = require('./Functions.js');

export class Enemy extends Phaser.GameObjects.Sprite {

    constructor (scene)
    {
        super(scene);
        //dknight.animations.add('walk_down', 1, 4);
        //this.anims.create({ key: 'down', frames: this.anims.generateFrameNames('deathknight', { prefix: 'walk_down_', start: 1, end: 4 }), frameRate: 5, repeat: -1 })
		//var enemy = Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'deathknight');

        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.hp = 0;
        this.turned = 0;
		
		this.text = scene.add.text(0, 0, "HP: "+ globals.ENEMY_HP, {font: "16px Arial", fill: "#ffffff"});		//textHP
		this.text.setPadding(0, 0, 0, 60);														//textHP
		this.text.setOrigin(0.5);																//textHP
		this.healthbar = new HealthBar(scene, 0, 0);
		
    }

	startOnPath ()
	{
		this.follower.t = 0;
		this.hp = globals.ENEMY_HP;
		
		//this.walk.play();																//sounds
		
		globals.PATH.getPoint(this.follower.t, this.follower.vec);
		
		this.setPosition(this.follower.vec.x, this.follower.vec.y);
		
		//this.text.setPosition(this.follower.vec.x, this.follower.vec.y);
		this.healthbar.setPosition(this.follower.vec.x - this.width, this.follower.vec.y - this.height);
	 }
	
	receiveDamage(damage) {
		this.hp -= damage;           
		this.text.setText("HP: " + this.hp);											//textHP
		this.healthbar.decrease(damage);
		this.damage.play();																//sounds
		
		// if hp drops below 0 we deactivate this enemy
		if (this.hp <= 0) {
			this.setActive(false);
			this.setVisible(false);
			this.text.setActive(false);													//textHP
			this.text.setVisible(false);												//textHP
			this.healthbar.destroy();
			
			//Need to set this to stop when all enemies are dead
			this.death.play();																//sounds
			//this.walk.stop();																//sounds
			this.destroy();
		}
	}
	
	update (time, delta)
	{
		//ENEMY_SPEED = 1/Math.floor((Math.random() * (10000 - 5000)) + 5000);
		this.follower.t += globals.ENEMY_SPEED * delta;
		
		globals.PATH.getPoint(this.follower.t, this.follower.vec);
		
		this.setPosition(this.follower.vec.x, this.follower.vec.y);
		this.text.setPosition(this.follower.vec.x, this.follower.vec.y);									//textHP
		this.healthbar.setPosition(this.follower.vec.x - this.width, this.follower.vec.y - this.height);
		
		if (this.follower.vec.y == 164 && this.turned == 0) {
			this.anims.play('deathknight_right');
			this.turned = 1;
		}
		else if (this.follower.vec.y != 164 && this.turned == 1)
		{
			this.anims.play('deathknight_down');
			this.turned = 2;
		}

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
	}
};

export class Deathknight extends Enemy {
	constructor(scene) {
		super(scene);
		Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'deathknight');
		
        this.anims.play('deathknight_down');
		
		//create sounds
		this.death = scene.sound.add('dkDeath');
		this.death.volume = 0.05;
		this.death.loop = false;
		
		this.damage = scene.sound.add('hit');
		this.damage.volume = 0.03;
		this.damage.loop = false;
		
		/* this.walk = scene.sound.add('walk');
		this.walk.volume = 0.01;
		this.walk.loop = true; */
	}
	pFn()
	{
		console.log(this.towerName);
	}

}

//tower class
export class Tower extends Phaser.GameObjects.Sprite{

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
	
	placeTower(pointer,scene) {
		var i = Math.floor(pointer.y/64);
		var j = Math.floor(pointer.x/64);
		if(globals.MAP[i][j] === 0) {
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
				//globals.MAP[i][j] = 1;
				globals.MAP[i][j] = this;
				this.setInteractive({ useHandCursor: true });
			}   
			//console.log(globals.TOWER_GROUP.getTotalUsed());
			//console.log(globals.TOWER_GROUP.getLength());
		}
		else
		{
			globals.TOWER_GROUP[this.towerId].remove(this, true, true);		//tower is created before it's placed so removed if the place clicked on is  not avaialble
		}
	}

	removeTower(pointer) {
		var i = Math.floor(pointer.y/64);
		var j = Math.floor(pointer.x/64);
		if(globals.MAP[i][j] !== 0) {
			this.setActive(false);
			this.setVisible(false);
			this.text.destroy();
			globals.MAP[i][j] = 0;												//remove from map
			globals.TOWER_GROUP[this.towerId].remove(this, true, true);			//removes from group, if want to keep it as inactive then remove this line
		}
			
	}
	
	upgradeTower(pointer, newTower, scene) {
		//check if tower is already upgraded, if not the upgrade
		if(this.towerName !== newTower.towerName)
		{
			var i = Math.floor(pointer.y/64);
			var j = Math.floor(pointer.x/64);
			this.removeTower(pointer);
			newTower.placeTower(pointer, scene);
			//console.log(globals.TOWER_GROUP.getTotalUsed());
			//console.log(globals.TOWER_GROUP.getLength());
			this.text = newTower.towerName;
			this.upgradeSound.play();

            scene.scene.tweens.add({
                targets: newTower, // on the player 
                duration: 200, // for 200ms 
                scaleX: 1.2, // that scale vertically by 20% 
                scaleY: 1.2, // and scale horizontally by 20% 
                alpha: 0.2,
                yoyo: true, // at the end, go back to original scale 
            });

		}
		else
		{
			globals.TOWER_GROUP[newTower.towerId].remove(newTower, true, true);		//tower is created before it's placed so removed if the place clicked on is  not avaialble
			newTower.text.destroy();
		}
	
	}
	
	fire() {
	    var enemy = fn.getEnemy(this.x, this.y, this.atkRange);
	    if(enemy) {
	        var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
	        fn.addAttack(this.x, this.y, angle, this.str);
	        //this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;    //uncomment to make towers rotate to face enemy
	    }
	}
	
	update(time, delta, pointer)
	{
		if(time > this.nextTic) {
			this.fire();
			this.nextTic = time + this.atkRate;
			//this.nextTic = time + TOWER_FIRE_RATE;
		}
	}
	sayName()
	{
		console.log(this.towerName);
	}

};

export class Peasant extends Tower {
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

export class Soldier extends Tower {
	constructor(scene, stats) {
		super(scene, stats);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'soldier', 'sprite25');

	}
	sFn()
	{
		console.log(this.towerName);
	}

}

export class Archer extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'archer', 'tile051');
		
    }
    aFn()
    {
        console.log(this.towerName);
    }

}


//all other classes
//HP class
export class HealthBar {

    constructor(scene, x, y) {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.value = globals.ENEMY_HP;
        this.p = .076;

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

        if (this.value < 0.3 * globals.ENEMY_HP) {
            this.bar.fillStyle(0xff0000);
        }
        else if (this.value < 0.6 * globals.ENEMY_HP)
            this.bar.fillStyle(0x00ff00);
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
export class Attack extends Phaser.GameObjects.Image {
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

    fire(x, y, angle, damage)
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

export class HUD extends Phaser.Scene {

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
		this.infoBar = this.add.text(270, 9, 'Wave 1: Death Knights', { fontFamily: 'Arial', fontSize: 15, color: '#00ff00' });
		
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
			}
			else
			{
				sceneA.scene.resume();
			}
		});
    }

}