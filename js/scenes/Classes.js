import {CST} from "../CST";
var GV = require('./Globals.js');
var FN = require('./Functions.js');

//enemy class
export class Enemy extends Phaser.GameObjects.Sprite {

    constructor (scene, stats)
    {
        super(scene);

        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.hp = stats.hp;
        this.value = stats.value;
        this.speed = stats.speed/3; //had to divide by 3 (randomly chose 3) so that the walk speed would slow down
        this.magicArmor = stats.magicArmor;
        this.physicalArmor = stats.physicalArmor;
        this.flying = stats.flying;
        this.damage = stats.damage;
        this.enemyName = stats.enemyName.toLowerCase();

        this.turned = 0;

        this.camera = scene.cameras.main;
        
        this.hurt = scene.sound.add('hit');
        this.hurt.volume = 0.03;
        this.hurt.loop = false;
		
		this.explode = scene.sound.add('explosionSound');
        this.explode.volume = 0.03;
        this.explode.loop = false;
		
		this.text = scene.add.text(0, 0, "HP: "+ this.hp, {font: "16px Arial", fill: "#ffffff"});		//textHP
		this.text.setPadding(0, 0, 0, 60);														//textHP
		this.text.setOrigin(0.5);																//textHP
		this.healthbar = new HealthBar(scene, 0, 0, this.hp);
		
    	var particles = scene.add.particles('explosion');

        this.emitter = particles.createEmitter({
			alpha: { start: 1, end: 0 },
			scale: { start: 0.5, end: 2.5 },
			//tint: { start: 0xff945e, end: 0xff945e },
			speed: 20,
			accelerationY: -300,
			angle: { min: -85, max: -95 },
			rotate: { min: -180, max: 180 },
			lifespan: { min: 1000, max: 1100 },
			blendMode: 'ADD',
			frequency: 110,
			maxParticles: 10,
			on: false
		});
		

    }

	startOnPath ()
	{
		this.follower.t = 0;
		//this.hp = ENEMY_HP;
		
		//this.walk.play();																//sounds
		if (!this.flying)
		{GV.WALKPATH.getPoint(this.follower.t, this.follower.vec);}
		else
		{GV.FLYPATH.getPoint(this.follower.t, this.follower.vec);}
		
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
		this.hurt.play();														//sounds
		
		// if hp drops below 0 we deactivate this enemy
		if (this.hp <= 0) {
			this.emitter.explode(5,this.follower.vec.x,this.follower.vec.y);
			this.explode.play();		
			this.setActive(false);
			this.setVisible(false);
			this.text.setActive(false);													//textHP
			this.text.setVisible(false);												//textHP
			this.healthbar.destroy();
			
			//Need to set this to stop when all enemies are dead
			this.death.play();																//sounds
			//this.walk.stop();																//sounds
			this.destroy();
			GV.GOLD += this.value;
		}
	}

	turnDown()
	{
	    let anim = this.enemyName + "_down";
	    this.anims.play(anim);

	}

	turnRight()
	{
	    let anim = this.enemyName + "_right";
	    this.anims.play(anim);
	    this.flipX = false;
	}
	turnUp()
	{
	    let anim = this.enemyName + "_up";
	    this.anims.play(anim);
	}
	turnLeft()
	{
	    let anim = this.enemyName + "_right";
	    this.anims.play(anim);
	    this.flipX = true;
	}
	
	update (time, delta)
	{
		//ENEMY_SPEED = 1/Math.floor((Math.random() * (10000 - 5000)) + 5000);
		this.follower.t += GV.ENEMY_SPEED * delta * this.speed;
		if (!this.flying){ GV.WALKPATH.getPoint(this.follower.t, this.follower.vec);}
		else{ GV.FLYPATH.getPoint(this.follower.t, this.follower.vec)};
		
		this.setPosition(this.follower.vec.x, this.follower.vec.y);
		//console.log(this.follower.vec.x);
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
			//this.camera.shake(150, .05, false);							//camera
			//this.camera.flash(150,  200, 0, 0, false);					//camera
			GV.PLAYER_HEALTH -= this.damage;
		}
		if (!this.flying)
		{
		    if (this.follower.vec.x == 352 && this.turned==0){
		        this.turnUp();
		        this.turned += 1;
		    }
		    else if (this.follower.vec.y == 160 && this.turned ==1)
		    {
		        this.turnRight();
		        this.turned += 1;
		    }
		    else if (this.follower.vec.x == 608 && this.turned == 2)
		    {
		        this.turnDown();
		        this.turned += 1;
		    }
		    else if (this.follower.vec.y == 736 && this.turned == 3)
		    {
		        this.turnLeft();
		        this.turned += 1;
		    }
		    else if (this.follower.vec.x == 480 && this.turned == 4)
		    {
		        this.turnDown();
		        this.turned += 1;
		    }
		    else if (this.follower.vec.y == 1056 && this.turned == 5)
		    {
		        this.turnRight();
		        this.turned += 1;
		    }
		    else if (this.follower.vec.x == 1120 && this.turned == 6)
		    {
		        this.turnUp();
		        this.turned += 1;
		    }
		    else if (this.follower.vec.y == 288 && this.turned == 7)
		    {
		        this.turnRight();
		        this.turned += 1;
		    }
		}
	}
};

export class Deathknight extends Enemy {
	constructor(scene, stats) {
		super(scene, stats);
		Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'deathknight');

		
        this.anims.play('deathknight_right');
		
		//create sounds
		this.death = scene.sound.add('dkDeath');
		this.death.volume = 0.05;
		this.death.loop = false;
		
		

		/* this.walk = scene.sound.add('walk');
		this.walk.volume = 0.01;
		this.walk.loop = true; */
	}
}

export class Skeleton extends Enemy {
    constructor(scene, stats){
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'skeleton');

        this.anims.play('skeleton_right');
		
		//create sounds
		this.death = scene.sound.add('dkDeath');
		this.death.volume = 0.05;
		this.death.loop = false;

    }
}

export class Bat extends Enemy {
    constructor(scene, stats){
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'bat');

        this.anims.play('bat_right');
		
		//create sounds
		this.death = scene.sound.add('dkDeath');
		this.death.volume = 0.05;
		this.death.loop = false;

    }
}

export class Ogre extends Enemy {
    constructor(scene, stats){
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'ogre');

        this.anims.play('ogre_right');
		
		//create sounds
		this.death = scene.sound.add('dkDeath');
		this.death.volume = 0.05;
		this.death.loop = false;

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
		this.cost = stats.cost //price of building the tower
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
		
		this.attack = 0;
		
	}
	
	placeTower(i, j,scene) {
		//var i = Math.floor(pointer.y/64);
		//var j = Math.floor(pointer.x/64);
		if(GV.MAP[i][j] === 0) {
			//console.log(tower);
			if (this)
			{
			    if (GV.GOLD - this.cost >= 0)
			    {
			        this.text.y = (i+.50) * 64 + 64/2;
			        this.text.x = j * 64 + 64/2;
			        this.text.setOrigin(0.5);
			        this.setActive(true);
			        this.setVisible(true);
			        this.y = i * 64 + 64/2;
			        this.x = j * 64 + 64/2;
			        GV.MAP[i][j] = this;
			        this.setInteractive({ useHandCursor: true });
			        GV.GOLD -= this.cost;
			        this.upgradeSound.play();
				
			        scene.scene.tweens.add({
			            targets: this, // on the player 
			            duration: 200, // for 200ms 
			            scaleX: 1.2, // that scale vertically by 20% 
			            scaleY: 1.2, // and scale horizontally by 20% 
			            alpha: 0.2,
			            yoyo: true, // at the end, go back to original scale 
			        });
			    }
			    else 
			    {

			    }
			}   
		}
		else
		{
			TOWER_GROUP[this.towerId].remove(this, true, true);		//tower is created before it's placed so removed if the place clicked on is  not avaialble
		}
	}

	removeTower(i, j, scene) {
		if(GV.MAP[i][j] !== 0) {
			this.setActive(false);
			this.setVisible(false);
			this.text.destroy();
			GV.MAP[i][j] = 0;												//remove from MAP
			GV.TOWER_GROUP[this.towerId].remove(this, true, true);			//removes from group, if want to keep it as inactive then remove this line
		}
			
	}
	
	upgradeTower(i, j, newTower, scene) {
		//check if tower is already upgraded, if not the upgrade
		if(this.towerName !== newTower.towerName)
		{
			//var i = Math.floor(pointer.y/64);
			//var j = Math.floor(pointer.x/64);
			this.removeTower(i, j, scene);
			newTower.placeTower(i, j, scene);
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
			GV.TOWER_GROUP[newTower.towerId].remove(newTower, true, true);		//tower is created before it's placed so removed if the place clicked on is  not avaialble
			newTower.text.destroy();
		}
	
	}
	
	fire() {
	    var enemy = FN.getEnemy(this.x, this.y, this.atkRange, this.hitFly);
	    if(enemy) {
	        var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
	        FN.addAttack(this.x, this.y, angle, this.str, this.atkType);
	        //this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;    //uncomment to make towers rotate to face enemy
	    }
		/* if(enemy && this.attack == 0)
		{
			this.anims.play(this.towerName.toLowerCase()+'_atk');
			this.attack = 1;
		}
		else if(!enemy && this.attack == 1)
		{
			this.anims.play(this.towerName.toLowerCase()+'_idle');
			this.attack = 0;
		} */
		
	}
	
	update(time, delta, pointer)
	{
		if(time > this.nextTic) {
			this.fire();
			this.nextTic = time + this.atkRate;
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
		Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'peasant');
		
		this.anims.play('peasant_idle');
	}
}

export class Soldier extends Tower {
	constructor(scene, stats) {
		super(scene, stats);
		Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'soldier');
		
		this.anims.play('soldier_idle');
	}
}

export class Archer extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'archer');
		
		this.anims.play('archer_idle');
    }
}

export class Apprentice extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'placeholder');
    }
}

export class Knight extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'placeholder');
    }
}

export class Duelist extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'placeholder');
    }
}

export class Rifleman extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'placeholder');
    }
}

export class Ranger extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'placeholder');
    }
}

export class Wizard extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'placeholder');
    }
}

export class Sorceress extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'placeholder');
    }
}

export class Commander extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'placeholder');
    }
}

export class Paladin extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'placeholder');
    }
}

export class Swordmaster extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'placeholder');
    }
}

export class Cutpurse extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'placeholder');
    }
}

export class Cannoneer extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'placeholder');
    }
}

export class Sharpshooter extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'placeholder');
    }
}

export class Assassin extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'placeholder');
    }
}

export class FireMage extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'placeholder');
    }
}

export class IceMage extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'placeholder');
    }
}

export class LightningMage extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'placeholder');
    }
}

export class Warlock extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'placeholder');
    }
}

export class Priestess extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'placeholder');
    }
}

//all other classes
//HP class
export class HealthBar {

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
        else if (this.value < 0.6 * this.maxValue){
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

export class HUD extends Phaser.Scene {

     constructor (scene)
    {
        super(scene);
        Phaser.Scene.call(this, { key: 'HUD', active: true });
    }
    create()
    {
		//Get scene with game in it
		let sceneA = this.scene.get(CST.SCENES.GAME);
	
        //setup HUD
		var HUD = this.add.image(0,0, 'HUD').setOrigin(0);
		this.playerHealth = this.add.text(125, 20, 'Health: ' + GV.PLAYER_HEALTH +'/100', {fontFamily: 'VT323', fontSize: 45, color: '#ff0000'});
		var volume = this.add.image(1485,40, 'vol');
		var volDown = this.add.image(1485,40, 'volDown');
		var play = this.add.image(1390,40, 'play');
		var playDown = this.add.image(1390,40, 'playDown');
		volDown.setVisible(false);
		playDown.setVisible(false);
		this.infoBar = this.add.text(675, 20, 'Wave '+GV.WAVE+': 10 '+GV.ENEMY_ARRAY[GV.WAVE-1].enemyName + '\'s', { fontFamily: 'VT323', fontSize: 62, color: '#00ff00' });
		this.goldBar = this.add.text(125, 93, 'Gold: '+GV.GOLD, { fontFamily: 'VT323', fontSize: 62, color: '#ffd700'});
		
		/* HUD.setDepth(1);
		volume.setDepth(1);
		volDown.setDepth(1);
		play.setDepth(1);
		playDown.setDepth(1);
		this.infoBar.setDepth(1); */
		
		volume.setInteractive({ useHandCursor: true });
		play.setInteractive({ useHandCursor: true });
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

    update() 
	{
        this.infoBar.setText('Wave '+GV.WAVE+': 10 '+GV.ENEMY_ARRAY[GV.WAVE-1].enemyName + '\'s');
        this.goldBar.setText('Gold: '+GV.GOLD);
        this.playerHealth.setText('Health: ' + GV.PLAYER_HEALTH +'/100');
    }
}

export class TowerButton extends Phaser.GameObjects.Image {
	constructor(scene)
	{
		super(scene);
	}
	
	makeButton(pointer,scene) 
	{
		var i = Math.floor(pointer.y/64);
		var j = Math.floor(pointer.x/64);
		if (this)
		{
			this.setActive(true);
			this.setVisible(true);
			this.setInteractive();
		}   
	}
};

export class PlaceButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'placetowerbutton');
		this.x = 120;
		this.y = 482;
	}
};

export class RemoveButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'removetowerbutton');
		this.x = 120;
		this.y = 482;
	}
};

export class UpgradeButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'upgradetowerbutton');
		this.x = 120;
		this.y = 422;
	}
};

export class SoldierButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'soldierbutton');
		this.x = 120;
		this.y = 482;
	}
};

export class ArcherButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'archerbutton');
		this.x = 120;
		this.y = 422;
	}
};

export class ApprenticeButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'apprenticebutton');
		this.x = 120;
		this.y = 362;
	}
};

export class KnightButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'knightbutton');
		this.x = 120;
		this.y = 482;
	}
};

export class DuelistButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'duelistbutton');
		this.x = 120;
		this.y = 422;
	}
};

export class RiflemanButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'riflemanbutton');
		this.x = 120;
		this.y = 482;
	}
};

export class RangerButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'rangerbutton');
		this.x = 120;
		this.y = 422;
	}
};

export class WizardButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'wizardbutton');
		this.x = 120;
		this.y = 482;
	}
};

export class SorceressButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sorceressbutton');
		this.x = 120;
		this.y = 422;
	}
};

export class CommanderButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'commanderbutton');
		this.x = 120;
		this.y = 482;
	}
};

export class PaladinButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'paladinbutton');
		this.x = 120;
		this.y = 422;
	}
};

export class SwordmasterButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'swordmasterbutton');
		this.x = 120;
		this.y = 482;
	}
};

export class CutpurseButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'cutpursebutton');
		this.x = 120;
		this.y = 422;
	}
};

export class CannoneerButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'cannoneerbutton');
		this.x = 120;
		this.y = 482;
	}
};

export class SharpshooterButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sharpshooterbutton');
		this.x = 120;
		this.y = 422;
	}
};

export class BeastmasterButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'beastmasterbutton');
		this.x = 120;
		this.y = 482;
	}
};

export class AssassinButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'assassinbutton');
		this.x = 120;
		this.y = 422;
	}
};

export class FireMageButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'firemagebutton');
		this.x = 120;
		this.y = 482;
	}
};

export class IceMageButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'icemagebutton');
		this.x = 120;
		this.y = 422;
	}
};

export class LightningMageButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'lightningmagebutton');
		this.x = 120;
		this.y = 362;
	}
};

export class WarlockButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'warlockbutton');
		this.x = 120;
		this.y = 482;
	}
};

export class PriestessButton extends TowerButton {
	constructor(scene)
	{
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'priestessbutton');
		this.x = 120;
		this.y = 422;
	}
};