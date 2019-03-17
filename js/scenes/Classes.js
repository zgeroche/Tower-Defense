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
		this.scene = scene;
		this.stats = stats;
		
		this.stunned = false;
		this.stuntime = 0;
		
		this.slowed = false;
		this.slowtime = 0;
		
		this.burned = false;
		this.burntime = 0;
		this.burncounter = 0;
		
		this.ministunned = false;
		this.ministuntime = 0;
		
		this.weakened = false;
		
        this.facing = 'i';
        this.prevx = 0;
        this.prevy = 0;

        this.camera = scene.cameras.main;
        
        this.hurt = scene.sound.add('hit');
        this.hurt.volume = 0.03;
        this.hurt.loop = false;
		
		this.explode = scene.sound.add('explosionSound');
        this.explode.volume = 0.03;
        this.explode.loop = false;
		
		this.stunSound = scene.sound.add('stunSound');
		this.stunSound.volume = 0.05;
		this.stunSound.loop = false;
		
		this.slowSound = scene.sound.add('slowSound');
		this.slowSound.volume = 0.04;
		this.slowSound.loop = false;
		
		this.ministunSound = scene.sound.add('ministunSound');
		this.ministunSound.volume = 0.04;
		this.ministunSound.loop = false;
		
		this.weakenSound = scene.sound.add('weakenSound');
		this.weakenSound.volume = 0.04;
		this.weakenSound.loop = false;
		
		this.text = scene.add.text(0, 0, "HP: "+ this.hp, {font: "16px Arial", fill: "#ffffff"});		//textHP
		this.text.setPadding(0, 0, 0, 60);														//textHP
		this.text.setOrigin(0.5);																//textHP
		this.healthbar = new HealthBar(scene, 0, 0, this.hp);
		
    	var particles = scene.add.particles('explosion');

        this.emitter = particles.createEmitter({
			alpha: { start: 1, end: 0 },
			scale: { start: 0.5, end: 2.5 },
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

	startOnPath (path)
    {
		this.follower.t = 0;
        this.path = path;
        this.path.getPoint(this.follower.t, this.follower.vec);
		this.setPosition(this.follower.vec.x, this.follower.vec.y);
		
		//this.text.setPosition(this.follower.vec.x, this.follower.vec.y);
        this.healthbar.setPosition(this.follower.vec.x - this.width, this.follower.vec.y - this.height);
        this.healthbar.setMax(this.hp);
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
			
			this.death.play();																//sounds
			this.destroy();
			GV.GOLD += this.value;
			
			if(this.particlesShock){this.particlesShock.destroy();};
			if(this.particlesSnow){this.particlesSnow.destroy();};
			if(this.particlesStun){this.particlesStun.destroy();};
			if(this.particlesWeak){this.particlesWeak.destroy();};
			if(this.particlesBurn){this.particlesBurn.destroy();};
			
		}
	}
	
	stun()
	{
		if(!this.stunned)
			{
				var shape1 = new Phaser.Geom.Ellipse(0, 0, this.width, this.width/4);
				this.particlesStun = this.scene.add.particles('confuse');
				var emitter = this.particlesStun.createEmitter({
					x: 0,
					y: 0,
					scale: { start: 0.5, end: 0 },
					blendMode: 'SCREEN',
					emitZone: { type: 'edge', source: shape1, quantity: 60, yoyo: false }
				});
				emitter.startFollow(this);
			}
		this.speed = 0;
		this.stunned = true;
		this.stunSound.play();
		this.setTint(0xFFFF00);
		this.stuntime = this.scene.sys.game.loop.time;
	}

	slow()
	{
		if(!this.slowed)
		{
			this.speed = this.speed * 0.6;
			this.slowSound.play();
			
			var shape3 = new Phaser.Geom.Rectangle(0, 0, this.width, this.height);
			this.particlesSnow = this.scene.add.particles('snowflake');
			var emitter = this.particlesSnow.createEmitter({
				x: { min: (this.width/2)*-1, max: (this.width/2) },
				y: { min: (this.height/2)*-1, max: (this.height/2)},
				lifespan: 1000,
				gravityY: 10,
				scale: { start: 0, end: 0.5, ease: 'Quad.easeOut' },
				alpha: { start: 1, end: 0, ease: 'Quad.easeIn' },
				blendMode: 'SCREEN',
				emitZone: { type: 'random', source: shape3 }
			});
			emitter.startFollow(this);
		}
		
		this.slowed = true;
		this.setTint(0xADD8E6);
		this.slowtime = this.scene.sys.game.loop.time;
	}
	
	burn()
	{
		if(!this.burned)
		{
			 this.particlesBurn = this.scene.add.particles('explosion');
			 var emitter = this.particlesBurn.createEmitter({
				x: { min: (this.width/2)*-1, max: (this.width/2) },
				y: { min: (this.height/2)*-1, max: (this.height/2)},
				speed: { min: 100, max: 200 },
				angle: { min: -85, max: -95 },
				scale: { start: 0, end: 1, ease: 'Back.easeOut' },
				alpha: { start: 1, end: 0, ease: 'Quart.easeOut' },
				blendMode: 'SCREEN',
				lifespan: 1000
			});

			emitter.startFollow(this);

		}
		
		this.burned = true;
		this.setTint(0xFF4500);
		this.burntime = this.scene.sys.game.loop.time;
		this.burncounter = 0;
	}
	
	ministun()
	{
		this.speed = 0;
		this.ministunned = true;
		this.ministunSound.play();
		this.setTint(0xFFFF00);
		this.ministuntime = this.scene.sys.game.loop.time;

		this.particlesShock = this.scene.add.particles('shock');
		var emitter = this.particlesShock.createEmitter({
			x: { min: (this.width/2)*-1, max: (this.width/2) },
			y: { min: (this.height/2)*-1, max: (this.height/2)},
			lifespan: 500,
			speed: { min: -100, max: 100 },
			scale: { start: 0.2, end: 0 },
			quantity: 25,
			blendMode: 'SCREEN'
		});
		emitter.startFollow(this);
	}
	
	weaken()
	{
		if(!this.weakened)
		{
			this.weakened = true;
			this.weakenSound.play();
			this.physicalArmor -= 25;
			this.magicArmor -= 25;
			this.setTint(0x8B008B);
			
			this.particlesWeak = this.scene.add.particles('purplemagic');
				var emitter = this.particlesWeak.createEmitter({
					x: { min: (this.width/2)*-1, max: (this.width/2) },
					y: { min: (this.height/2)*-1, max: (this.height/2)},
					lifespan: 500,
					speedY: { min: 0, max: this.height},
					scale: { start: 0.5, end: 0 },
					quantity: 0.5,
					blendMode: 'MULTIPLY'
				});
				emitter.startFollow(this);
			
			
		}
	}
	coins()
	{
		var image = this.scene.add.image(this.follower.vec.x - this.width/4, this.follower.vec.y - this.height, 'coinPop');
		this.scene.tweens.add({
			targets: image,
			angle: 180,
			y: '-=30', 
			duration: 300, 
			ease: 'Linear',
			delay: 0,
			onComplete: function () {image.destroy();}
		});
	}
	
	restore(clear)
	{
		this.speed = this.stats.speed/3;
		this.clearTint();
		
		if(clear == 0)
		{
			if(this.particlesStun){this.particlesStun.destroy();};
			this.stunned = false;
		}
		else if(clear == 1)
		{
			if(this.particlesSnow){this.particlesSnow.destroy();};
			this.slowed = false;
		}
		if(clear == 2)
		{
			if(this.particlesShock){this.particlesShock.destroy();};
			this.ministunned = false;
		}
		if(clear == 3)
		{
			if(this.particlesBurn){this.particlesBurn.destroy();}
			this.burned = false;
		}
	}
	
	clearBurn()
	{
		this.burned = false;
		this.burncounter = 0;
		this.clearTint();
	}
	
	turnDown()
	{
	    let anim = this.enemyName.toLowerCase() + "_down";
	    this.anims.play(anim);
        this.facing = 'd';
	}

	turnRight()
	{
	    let anim = this.enemyName.toLowerCase() + "_right";
	    this.anims.play(anim);
        this.flipX = false;
        this.facing = 'r';
	}
	turnUp()
	{
	    let anim = this.enemyName.toLowerCase() + "_up";
        this.anims.play(anim);
        this.facing = 'u';
	}
	turnLeft()
	{
	    let anim = this.enemyName.toLowerCase() + "_right";
	    this.anims.play(anim);
        this.flipX = true;
        this.facing = 'l';
	}
	
	update (time, delta)
    {
        this.prevx = this.follower.vec.x;
        this.prevy = this.follower.vec.y;
        this.follower.t += GV.ENEMY_SPEED * delta * this.speed;

        this.path.getPoint(this.follower.t, this.follower.vec);
		this.setPosition(this.follower.vec.x, this.follower.vec.y);
		this.text.setPosition(this.follower.vec.x, this.follower.vec.y-30);									//textHP
        this.healthbar.setPosition(this.follower.vec.x - this.width, this.follower.vec.y - this.height);
		
		if (this.stunned)
		{
			if (time - 1500 >= this.stuntime)
			{
				this.restore(0);
			}		
		}
		
		if (this.slowed)
		{
			if (time - 3000 >= this.slowtime)
			{
				this.restore(1);
			}
		}
		
		if (this.ministunned)
		{
			if (time - 200 >= this.ministuntime)
			{
				this.restore(2);
			}
		}  
      
		if (this.burned)
		{
			if (time - 500 >= this.burntime)
			{
				this.receiveDamage(25, "magical");
				this.burncounter++;
				this.burntime += 500;
			}
			
			if(this.burncounter >= 4)
			{
				this.restore(3);
			}	
		}

		if (this.follower.t >= 1)
		{
			this.setActive(false);
			this.setVisible(false);
			this.text.setActive(false);										//textHP
			this.text.setVisible(false);									//textHP
			this.healthbar.destroy();
			this.destroy();
			GV.PLAYER_HEALTH -= this.damage;
			
			if(this.particlesShock){this.particlesShock.destroy();};
			if(this.particlesSnow){this.particlesSnow.destroy();};
			if(this.particlesStun){this.particlesStun.destroy();};
			if(this.particlesWeak){this.particlesWeak.destroy();};
			if(this.particlesBurn){this.particlesBurn.destroy();};
		}
        if (!this.flying) {
            if (this.prevx < this.follower.vec.x && this.facing != 'r') {
                this.turnRight();
            }
            else if (this.prevx > this.follower.vec.x && this.facing != 'l') {
                this.turnLeft();
            }
            else if (this.prevy < this.follower.vec.y && this.facing != 'd') {
                this.turnDown();
            }
            else if (this.prevy > this.follower.vec.y && this.facing != 'u') {
                this.turnUp();
            }
        }
        else if (this.prevx < this.follower.vec.x && this.facing != 'r') {
            this.turnRight();
        }
        else if (this.prevx > this.follower.vec.x && this.facing != 'l') {
            this.turnLeft();
        }
	}
};

export class Deathknight extends Enemy {
	constructor(scene, stats) {
		super(scene, stats);
		Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'deathknight');
		
		//create sounds
		this.death = scene.sound.add('dkDeath');
		this.death.volume = 0.05;
		this.death.loop = false;
	}
}

export class Skeleton extends Enemy {
    constructor(scene, stats){
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'skeleton');
		
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
		
		//create sounds
		this.death = scene.sound.add('dkDeath');
		this.death.volume = 0.05;
		this.death.loop = false;

    }
}

export class Goblin extends Enemy {
    constructor(scene, stats){
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'goblin');
		
        //create sounds
        this.death = scene.sound.add('dkDeath');
        this.death.volume = 0.05;
        this.death.loop = false;
    }
}

export class BossSkeleton extends Enemy {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'bossSkeleton');

        //create sounds
        this.death = scene.sound.add('dkDeath');
        this.death.volume = 0.05;
        this.death.loop = false;
    }
}

export class Ghost extends Enemy {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'ghost');

        //create sounds
        this.death = scene.sound.add('dkDeath');
        this.death.volume = 0.05;
        this.death.loop = false;
    }
}

export class Witch extends Enemy {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'witch');

        //create sounds
        this.death = scene.sound.add('dkDeath');
        this.death.volume = 0.05;
        this.death.loop = false;
    }
}

export class Reaper extends Enemy {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'reaper');

        //create sounds
        this.death = scene.sound.add('dkDeath');
        this.death.volume = 0.05;
        this.death.loop = false;
    }
}

export class Horseman extends Enemy {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'horseman');

        //create sounds
        this.death = scene.sound.add('dkDeath');
        this.death.volume = 0.05;
        this.death.loop = false;
    }
}

export class Jacko extends Enemy {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'jacko');

        //create sounds
        this.death = scene.sound.add('dkDeath');
        this.death.volume = 0.05;
        this.death.loop = false;
    }
}

export class Dragon extends Enemy {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'dragon');

        //create sounds
        this.death = scene.sound.add('dkDeath');
        this.death.volume = 0.05;
        this.death.loop = false;
    }
}

export class Golem extends Enemy {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'golem');

        //create sounds
        this.death = scene.sound.add('dkDeath');
        this.death.volume = 0.05;
        this.death.loop = false;
    }
}

export class Imp extends Enemy {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'imp');

        //create sounds
        this.death = scene.sound.add('dkDeath');
        this.death.volume = 0.05;
        this.death.loop = false;
    }
}

export class Zombie extends Enemy {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'zombie');

        //create sounds
        this.death = scene.sound.add('dkDeath');
        this.death.volume = 0.05;
        this.death.loop = false;
    }
}

export class Vampire extends Enemy {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'vampire');

        //create sounds
        this.death = scene.sound.add('dkDeath');
        this.death.volume = 0.05;
        this.death.loop = false;
    }
}

export class Slime extends Enemy {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'slime');

        //create sounds
        this.death = scene.sound.add('dkDeath');
        this.death.volume = 0.05;
        this.death.loop = false;
    }
}

export class Minotaur extends Enemy {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'minotaur');

        //create sounds
        this.death = scene.sound.add('dkDeath');
        this.death.volume = 0.05;
        this.death.loop = false;
    }
}
/************************************************************************************************************************************/
//tower class
/************************************************************************************************************************************/
export class Tower extends Phaser.GameObjects.Sprite{

	constructor (scene, stats)
	{
		super(scene);

		this.nextTic = -1;
		this.towerId =  stats.towerId; //each tower has unique id
		this.towerName = stats.towerName;
		this.cost = stats.cost //price of building the tower
		this.str = stats.str; //value tha determines attack strength
		this.atkRange = stats.atkRange;
		this.atkType = stats.atkType;
		this.atkRate = stats.atkRate; 
		this.hitFly = stats.hitFly; //true = can hit flying enemeies, false = cannot hit flying enemies
		
		this.priestessBuff = false;
		
        this.text = scene.add.text(0, 0, this.towerName, { fontFamily: 'VT323', fontSize: 21, fill: "#ffffff", stroke: "000000", strokeThickness: 2 });
        this.upgrades = stats.upgrades;
		
		this.upgradeSound = scene.sound.add('upgradeSound');
		this.upgradeSound.volume = 0.05;
		this.upgradeSound.loop = false;
		
		this.attack = 0;
		
	}
	checkCost()
	{
		if (GV.GOLD - this.cost >= 0)
			return true
		else	
			return false;
	}	
	
	placeTower(i, j, scene) {
		if(GV.MAP[i][j] === 0) {
			if (this)
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
				
				var priestesses = GV.TOWER_GROUP[22].getChildren();
				for (var k = 0; k < priestesses.length; k++)
				{
					if (priestesses[k].active && Phaser.Math.Distance.Between(this.x, this.y, priestesses[k].x, priestesses[k].y) < 250)
					{
						this.priestessBuff = true;
					}
				}
			}   
		}
		else
		{
			GV.TOWER_GROUP[this.towerId].remove(this, true, true);		//tower is created before it's placed so removed if the place clicked on is  not avaialble
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
			
			if (newTower.towerName == "Priestess")
			{				
				FN.buffTowers(this.x, this.y, this.atkRange);
			}

		}
		else
		{
			GV.TOWER_GROUP[newTower.towerId].remove(newTower, true, true);		//tower is created before it's placed so removed if the place clicked on is  not avaialble
			newTower.text.destroy();
		}
	
	}
	
    fire() {
        var enemy = FN.getEnemy(this.x, this.y, this.atkRange, this.hitFly);
	    if (enemy) {
	        var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
			if (this.priestessBuff)
			{
				FN.addAttack(this.x, this.y, angle, (this.str * 1.2), this.atkType, this.towerId, enemy);
			}
			else
			{
				FN.addAttack(this.x, this.y, angle, this.str, this.atkType, this.towerId, enemy);
			}
	    }
		 if(enemy && this.attack == 0)
		{
			this.anims.play(this.towerName.toLowerCase()+'_atk');
			this.attack = 1;
		}
		else if(!enemy && this.attack == 1)
		{
			this.anims.play(this.towerName.toLowerCase()+'_idle');
			this.attack = 0;
		} 
		
	}
	
	update(time, delta, pointer)
	{
		if(time >= this.nextTic) {
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
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'apprentice');
		
		this.anims.play('apprentice_idle');
    }
}

export class Knight extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'knight');
		
		this.anims.play('knight_idle');
    }
}

export class Duelist extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'duelist');
		
		this.anims.play('duelist_idle');
    }
}

export class Rifleman extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'rifleman');
		
		this.anims.play('rifleman_idle');
    }
}

export class Ranger extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'ranger');
		
		this.anims.play('ranger_idle');
    }
}

export class Wizard extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'wizard');
        this.special = 'Small AoE';

		this.anims.play('wizard_idle');
    }
}

export class Sorceress extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'sorceress');
		
		this.anims.play('sorceress_idle');
    }
}

export class Commander extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'commander');
        this.special = 'Chance to Stun';
		
		this.anims.play('commander_idle');
    }
}

export class Berserker extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'berserker');

		this.anims.play('berserker_idle');
    }
}

export class Swordmaster extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'swordmaster');
        this.special = 'Ignores Armor';
		
		this.anims.play('swordmaster_idle');
    }
}

export class Cutpurse extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'cutpurse');
        this.special = 'Steals Gold';
		
		this.anims.play('cutpurse_idle');
    }
}

export class Cannoneer extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'cannoneer');
        this.special = 'Area Damage';

		this.anims.play('cannoneer_idle');
    }
}

export class Sharpshooter extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'sharpshooter');
		
		this.anims.play('sharpshooter_idle');
    }
}

export class Beastmaster extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'beastmaster');
        this.special = 'Double Damage Every 5 Hits';
		
		this.anims.play('beastmaster_idle');
    }
}

export class Headhunter extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'headhunter');
        this.special = '5% Critical Chance';

		this.anims.play('headhunter_idle');
    }
}

export class FireMage extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'firemage');
        this.special = 'Burns Enemies, Splash';

		this.anims.play('firemage_idle');
    }
}

export class IceMage extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'icemage');
        this.special = 'Slows Enemies, Splash';

		this.anims.play('icemage_idle');
    }
}

export class LightningMage extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'lightningmage');
        this.special = 'Briefly Stuns Enemy';
		
		this.anims.play('lightningmage_idle');
    }
}

export class Warlock extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'warlock');
        this.special = 'Shreds Armor';
		
		this.anims.play('warlock_idle');
    }
}

export class Priestess extends Tower {
    constructor(scene, stats) {
        super(scene, stats);
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'priestess');
        this.special = 'Buffs Ally Damage';
		
		this.anims.play('priestess_idle');
    }
}
/*********************************************************************************************************************************************************/
//all other classes
/**********************************************************************************************************************************************************/
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

    setMax(health) {
        this.maxValue = health;
        this.value = health;
        this.p = 76 / this.maxValue;
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

		this.incX = 0;
		this.incY = 0;
		this.lifespan = 0;
        this.scene = scene;

    	this.particles = scene.add.particles('coin');

        this.emitter = this.particles.createEmitter({
            speed: 75,
            scale: { start: 0.2, end: 0 },
            quantity: 1,
            blendMode: 'SCREEN'
        });

	    this.emitter.startFollow(this);
		
		this.atkSound = scene.sound.add('swingSound');
		this.atkSound.volume = 0.04;
		this.atkSound.loop = false;
        
	}

    fire(x, y, angle, id, damage, type, enemy)
    {
        this.setActive(true);
        this.setVisible(true);
        //  Attacks fire from the middle of the screen to the given x/y
        this.setPosition(x, y);
		
        //  we don't need to rotate the attacks as they are round
        this.setRotation(angle);

        this.enemy = enemy;

		this.id = id;
        this.lifespan = 1000;
        this.damage = damage;
        this.atkType = type;
		
		this.atkSound.play();
    }

	update (time, delta)
	{
        this.lifespan -= delta;
        this.scene.physics.moveToObject(this, this.enemy, this.speed);

        this.emitter.explode(5,this.x,this.y);

		if (this.lifespan <= 0 || this.enemy === null)
		{
			this.setActive(false);
			this.setVisible(false);  
		}
	}
};

//PEASANT ATTACK
export class Tomato extends Attack {
	constructor(scene) {
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'tomato');
        this.speed = 600;
	}

};

//SOLDIER ATTACK
export class Sword extends Attack {
	constructor(scene) {
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sword');
		
        this.speed = 600;
		
		this.atkSound = scene.sound.add('swingSound');
		this.atkSound.volume = 0.04;
		this.atkSound.loop = false;
	}
	
};

//ARCHER ATTACK
export class Arrow extends Attack {
	constructor(scene) {
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'arrow');
        this.speed = 800;
		
		this.atkSound = scene.sound.add('arrowSound');
		this.atkSound.volume = 0.04;
		this.atkSound.loop = false;
	}
};

//APPRENTICE ATTACK
export class WhiteMagic extends Attack {
	constructor(scene) {
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'whitemagic');
        this.speed = 1000;
	}
};

//KNIGHT ATTACK
export class KnightSword extends Attack {
	constructor(scene) {
		super(scene);

		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sword');
        this.speed = 600;

	}
};

//DUELIST ATTACK
export class CurvedSword extends Attack {
	constructor(scene) {
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'curvedsword');
        this.speed = 800;
	}
};

//RIFLEMAN ATTACK
export class GoldBullet extends Attack {
	constructor(scene) {
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'goldbullet');

        this.speed = 1200;
		
		this.atkSound = scene.sound.add('rifleSound');
		this.atkSound.volume = 0.02;
		this.atkSound.loop = false;

	}
	
};

//RANGER ATTACK
export class RangerArrow extends Attack {
	constructor(scene) {
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'arrow');
        this.speed = 800;
		
		this.atkSound = scene.sound.add('arrowSound');
		this.atkSound.volume = 0.04;
		this.atkSound.loop = false;
	}
};

//WIZARD ATTACK
export class BlueMagic extends Attack {
	constructor(scene) {
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bluemagic');
        this.speed = 800;
		this.aoe = 50;
	}
};

//SORCERESS ATTACK
export class PinkMagic extends Attack {
	constructor(scene) {
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'pinkmagic');
        this.speed = 800;
		
		this.atkSound = scene.sound.add('spellSound');
		this.atkSound.volume = 0.01;
		this.atkSound.loop = false;
	}
};

//COMMANDER ATTACK
export class CommanderSword extends Attack {
	constructor(scene) {
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bigsword');
        this.speed = 600;
	}
};

//BERSERKER ATTACK
export class Axe extends Attack {
	constructor(scene) {
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'axe');
        this.speed = 800;
		
		this.atkSound = scene.sound.add('spearSound');
		this.atkSound.volume = 0.04;
		this.atkSound.loop = false;
	}
};

//SWORDMASTER ATTACK
export class BlackSword extends Attack {
	constructor(scene) {
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'blacksword');
        this.speed = 800;
	}
};

//CUTPURSE ATTACK
export class Knife extends Attack {
	constructor(scene) {
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'knife');
        this.speed = 800;
		
		//cutpurse sound
		this.cutpurseSound = scene.sound.add('extragold');
		this.cutpurseSound.volume = 0.04;
		this.cutpurseSound.loop = false;
	}
};

//CANNONEER ATTACK
export class Cannonball extends Attack {
	constructor(scene) {
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'cannonball');

        this.speed = 800;
        this.aoe = 150;
		
		this.atkSound = scene.sound.add('cannonSound');
		this.atkSound.volume = 0.02;
		this.atkSound.loop = false;

	}
};

//SHARPSHOOTER ATTACK
export class SilverBullet extends Attack {
	constructor(scene) {
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'silverbullet');

        this.speed = 1200;
		
		this.atkSound = scene.sound.add('gunSound');
		this.atkSound.volume = 0.01;
		this.atkSound.loop = false;
	}
};

//BEASTMASTER ATTACK
export class Crow extends Attack {
	constructor(scene) {
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'crow');
        this.speed = 800;
		
		this.attackcount = 0;
	}
};

//HEADHUNTER ATTACK
export class Spear extends Attack {
	constructor(scene) {
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'spear');
        this.speed = 600;

	}
};

//FIRE MAGE ATTACK
export class Fireball extends Attack {
	constructor(scene) {
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'fireball');
        this.speed = 700;
        this.aoe = 100;
		
		this.atkSound = scene.sound.add('fireSound');
		this.atkSound.volume = 0.04;
		this.atkSound.loop = false;
	}
};

//ICE MAGE ATTACK
export class Icicle extends Attack {
	constructor(scene) {
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'icicle');
        this.speed = 700;
        this.aoe = 100;
		
		this.atkSound = scene.sound.add('iceSound');
		this.atkSound.volume = 0.02;
		this.atkSound.loop = false;
	}
};

//LIGHTNING MAGE ATTACK
export class Lightning extends Attack {
	constructor(scene) {
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'lightning');
        this.speed = 700;
		
		this.atkSound = scene.sound.add('lightningSound');
		this.atkSound.volume = 0.01;
		this.atkSound.loop = false;
	}
};

//WARLOCK ATTACK
export class GreenMagic extends Attack {
	constructor(scene) {
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'greenmagic');
        this.speed = 800;
	}
};

//PRIESTESS ATTACK
export class PurpleMagic extends Attack {
	constructor(scene) {
		super(scene);
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'purplemagic');
        this.speed = 800;
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
		let sceneA = this.scene.get(GV.scene);
	
	    var HUD = this.add.image(0,0, 'HUD').setOrigin(0);
		var volume = this.add.image(827,16, 'vol');
		var volDown = this.add.image(827,16, 'volDown');
		var play = this.add.image(789,16, 'play');
		var playDown = this.add.image(789,16, 'playDown');
		volDown.setVisible(false);
		playDown.setVisible(false);
 
		this.playerHealth = this.add.text(55, 3, 'Health: ' + GV.PLAYER_HEALTH +'/100', {fontFamily: 'VT323', fontSize: 26, color: '#ff0000'});
		this.infoBar = this.add.text(275, 2, 'Wave 1: ' + GV.WAVE_DETAIL[0], { fontFamily: 'VT323', fontSize: 30, color: '#00ff00' });
        this.goldBar = this.add.text(55, 34, 'Gold: ' + GV.GOLD, { fontFamily: 'VT323', fontSize: 26, color: '#ffd700' });
        this.nextBar = this.add.text(875, 2, 'Next Wave: ' + GV.WAVE_DETAIL[1], { fontFamily: 'VT323', fontSize: 30, color: '#00ff00' });

		var bottomHUD = this.add.image(1391,992, 'bottomHUD').setOrigin(0);
        this.towerBar = this.add.text(1596, 992, "Tower Menu", { fontFamily: 'VT323', fontSize: 30, color: '#00ff00' }).setOrigin(0);

        this.tooltip = this.add.graphics();
        this.tooltip.fillStyle(0x2f4f4f, .75);
        this.tooltip.fillRoundedRect(1325, 792, 200, 200, 12);
        this.tooltip.setVisible(false);

        this.tooltipText = this.add.text(1326, 793, "", { fontFamily: 'VT323', fontSize: 18, color: '#00ff00' });
        this.tooltipText.setVisible(false);
 
		
		volume.setInteractive({ useHandCursor: true });
		play.setInteractive({ useHandCursor: true });
		volume.on("pointerover", ()=>{
			volDown.setVisible(true);
		});
		volume.on("pointerout", ()=>{
			volDown.setVisible(false);
		});
			
		volume.on("pointerup", ()=>{
			if(this.game.sound.mute)
			{
				this.game.sound.mute = false;
			}
			else
			{
				this.game.sound.mute = true;
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
				this.pauseText = this.add.text(960, 500, 'PAUSED', { fontFamily: 'VT323', fontSize: 150, color: '#ffffff', align: 'center'}).setDepth(1).setOrigin(0.5,1);
				sceneA.cameras.main.setAlpha(0.5);
				this.isMute = this.game.sound.mute;
				this.game.sound.mute = true;
			}
			else
			{
				if(this.isMute)
					this.game.sound.mute = true;
				else
					this.game.sound.mute = false;
				this.pauseText.destroy();
				sceneA.cameras.main.setAlpha(1);
				sceneA.scene.resume();
			}
		});
    }

    update() 
    {
        if (GV.WAVE == 10) {
            this.infoBar.setText('Final Wave: ' + GV.WAVE_DETAIL[GV.WAVE - 1]);
        }
        else {
            this.infoBar.setText('Wave ' + GV.WAVE + ': ' + GV.WAVE_DETAIL[GV.WAVE - 1]);
        }
        this.goldBar.setText('Gold: ' + GV.GOLD);
        if (GV.WAVE_DETAIL[GV.WAVE] === undefined) {
            this.nextBar.setText('');
        }
        else { 
            this.nextBar.setText('Next Wave: ' + GV.WAVE_DETAIL[GV.WAVE]);
        }
        this.playerHealth.setText('Health: ' + GV.PLAYER_HEALTH +'/100');
    }
}

export class TowerButton extends Phaser.GameObjects.Image {
	constructor(scene, z)
	{
		super(scene,z);
        this.z = z;
        this.hud = scene.scene.get('HUD');
	}
	
	upgradeTowerButton(pointer, scene, currTower, newTower,i,j)
	{		
		var buttonImg = FN.createButton(scene,1660, 1024, this.z, newTower.towerName+" | "+newTower.cost+ "g");
		
		buttonImg.setInteractive({ useHandCursor: true }).on('pointerdown', () =>{
			
				if (newTower.checkCost())
				{
					scene.scene.menuSounds.play();
					if (currTower){currTower.upgradeTower(i, j, newTower, scene)};
					GV.BUTTON_GROUP.clear(true,true);
				}
				else
				{
					newTower.text.destroy();											
					GV.TOWER_GROUP[newTower.towerId].remove(newTower, true, true);
					scene.scene.errorSounds.play();
					GV.BUTTON_GROUP.clear(true,true);
					FN.createButton(scene,1660, 1024, 0, "Not Enough Gold");
					FN.cancelAction(scene);
				}
            this.hud.tooltip.setVisible(false);
            this.hud.tooltipText.setVisible(false);
            scene.upgradeCircle.destroy();
        });

        buttonImg.on('pointerover', () => {
            this.hud.tooltip.setVisible(true);
            var towerInfo = [
                newTower.towerName,
                "Attack Speed:  " + newTower.atkRate,
                "Attack Range:  " + newTower.atkRange,    
                "Damage:        " + newTower.str,
                "Damage Type:   " + newTower.atkType,
                "Hit Flying:    " + newTower.hitFly];
            if (newTower.special) {
                towerInfo.push("Special: " + newTower.special);
            }
            if (newTower.upgrades) {
                for (var k = 0; k < newTower.upgrades.length; k++) {
                    if (k == 0) {
                        towerInfo.push("Upgrades:       " + GV.TOWER_ARRAY[newTower.upgrades[k]].towerName);
                    }
                    else {
                        towerInfo.push("                " + GV.TOWER_ARRAY[newTower.upgrades[k]].towerName);
                    }
                }
            }

            this.hud.tooltipText.setText(towerInfo);
            this.hud.tooltipText.setVisible(true);

            //Show Tower Attack Range
            var x = j * 64 + 64 / 2;
            var y = i * 64 + 64 / 2;
            scene.upgradeCircle = scene.scene.add.circle(x, y, newTower.atkRange, 0xffffff, 0.25);
            FN.showTowerRange(scene, i, j); 
        });

        buttonImg.on('pointerout', () => {
            FN.showTowerStats(scene, i, j);
            scene.upgradeCircle.destroy();
            scene.rangeCircle.destroy();
        });
		
	}
};