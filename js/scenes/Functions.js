var GV = require('./Globals.js');

//build the pathing and map for level
export function buildMap(scene){
	//path to which enemey follows
    var graphics = scene.add.graphics();    
    drawLines(graphics);
    GV.PATH = scene.add.path(96, -32);
    GV.PATH.lineTo(96, 164);
    GV.PATH.lineTo(480, 164);
    GV.PATH.lineTo(480, 544);
    graphics.lineStyle(0, 0xffffff, 1);
    GV.PATH.draw(graphics);
    
	//add map image
	scene.add.image(320, 256, 'map');

	//add background music
	scene.bgm = scene.sound.add('background');
	scene.bgm.volume = 0.04;
	scene.bgm.loop = true;
	//bgm.play();																//sounds
	
	//scene.scene.add('HUD', HUD, true, { x: 640, y: 66 });
	
	//misc
	scene.nextEnemy = 0;
	scene.physics.add.overlap(GV.ENEMY_GROUP, GV.ATTACKS_GROUP, damageEnemy);
    scene.input.mouse.disableContextMenu();
}

//create animations for all enemies
export function createAnimations(scene, sprites) {
    for (var i = 0; i < sprites.length; i++) {
		
		var enemy = sprites[i].enemyName.toLowerCase();
		var frameEnd = sprites[i].frameEnd;
		var movement = "walk";
		if(sprites[i].flying){movement = "fly";}
		
        scene.anims.create({
			key: enemy + "_down",
			frames: scene.anims.generateFrameNames(enemy, { prefix: movement+'_down_', start: 1, end: frameEnd }),
			frameRate: 5,
			repeat: -1
        });
		scene.anims.create({
			key: enemy + "_right",
			frames: scene.anims.generateFrameNames(enemy, { prefix: movement+'_right_', start: 1, end: frameEnd }),
			frameRate: 5,
			repeat: -1
        }); 
    }
}

//user input related actions 
export function userAction(pointer, scene){
	var i = Math.floor(pointer.y/64);
	var j = Math.floor(pointer.x/64);
	if (pointer.leftButtonDown())
        {
			//if new tower
			if(GV.MAP[i][j] == 0)
			{
				var newTower = GV.TOWER_GROUP[GV.peasantStats.towerId].get(GV.peasantStats);
				newTower.placeTower(pointer,scene);
			}
			//if upgrade tower
			else if(GV.MAP[i][j].towerId == 0)
			{
				var currTower = GV.MAP[i][j];
				var newTower = GV.TOWER_GROUP[GV.soldierStats.towerId].get(GV.soldierStats);
				currTower.upgradeTower(pointer, newTower, scene);
			}
			else if(GV.MAP[i][j].towerId == 1)
			{
			    var currTower = GV.MAP[i][j];
			    var newTower = GV.TOWER_GROUP[GV.archerStats.towerId].get(GV.archerStats);
			    currTower.upgradeTower(pointer, newTower, scene);
			}
        }
        else if (pointer.rightButtonDown())
        {
			var tower = GV.MAP[i][j];
			if(typeof tower === "object")
			{
				tower.removeTower(pointer);
			}

        }
}

export function getEnemy(x, y, distance, hitFly) {
    for (var j = 0; j < GV.ENEMY_GROUP.length; j++)
    {
        var enemyUnits = GV.ENEMY_GROUP[j].getChildren();
        for(var i = 0; i < enemyUnits.length; i++) {       
            if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
                if (hitFly || !enemyUnits[i].flying)
                    return enemyUnits[i];
        }
    }
    return false;
} 

export function damageEnemy(enemy, attack) {  
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

export function drawLines(graphics) {
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

export function addAttack(x, y, angle, damage, type) {
    var attack = GV.ATTACKS_GROUP.get();
    if (attack)
    {
        attack.fire(x, y, angle, damage, type);
    }
}