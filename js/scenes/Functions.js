var globals = require('./Globals.js');
var classes = require('./Classes.js');

export function buildMap(scene){
	//path to which enemey follows
	var graphics = scene.add.graphics();    
	drawLines(graphics);
	globals.PATH = scene.add.path(96, -32);
	globals.PATH.lineTo(96, 164);
	globals.PATH.lineTo(480, 164);
	globals.PATH.lineTo(480, 544);
	graphics.lineStyle(0, 0xffffff, 1);
	globals.PATH.draw(graphics);
	
	//add map image
	scene.add.image(320, 256, 'map');
	
	//create animations
	createAnimations(scene, ["deathknight"]);

	//add background music
	scene.bgm = scene.sound.add('background');
	scene.bgm.volume = 0.04;
	scene.bgm.loop = true;
	//bgm.play();																//sounds
	
	scene.scene.add('HUD', classes.HUD, true, { x: 640, y: 66 });
	
	//misc
	scene.nextEnemy = 0;
	scene.physics.add.overlap(globals.ENEMY_GROUP, globals.ATTACKS_GROUP, globals.damageEnemy);
	scene.input.mouse.disableContextMenu();
}

	//user input related actions 
export function userAction(pointer, scene){
	var i = Math.floor(pointer.y/64);
	var j = Math.floor(pointer.x/64);
	if (pointer.leftButtonDown())
		{
			//if new tower
			if(globals.MAP[i][j] == 0)
			{
				var newTower = globals.TOWER_GROUP[globals.peasantStats.towerId].get(globals.peasantStats);
				newTower.placeTower(pointer,scene);
			}
			//if upgrade tower
			else if(globals.MAP[i][j].towerId == 0)
			{
				var currTower = globals.MAP[i][j];
				var newTower = globals.TOWER_GROUP[globals.soldierStats.towerId].get(globals.soldierStats);
				currTower.upgradeTower(pointer, newTower, scene);
			}
			else if(globals.MAP[i][j].towerId == 1)
			{
				var currTower = globals.MAP[i][j];
				var newTower = globals.TOWER_GROUP[globals.archerStats.towerId].get(globals.archerStats);
				currTower.upgradeTower(pointer, newTower, scene);
			}
		}
		else if (pointer.rightButtonDown())
		{
			var tower = globals.MAP[i][j];
			if(typeof tower === "object")
			{
				tower.removeTower(pointer);
			}

		}
}

export function createAnimations(scene, texture) {
	for (var i = 0; i < texture.length; i++) {
		scene.anims.create({
			key: texture[i] + "_down",
			frames: scene.anims.generateFrameNames(texture[i], { prefix: 'walk_down_', start: 1, end: 4 }),
			frameRate: 3,
			repeat: -1
		});
		scene.anims.create({
			key: texture[i] + "_right",
			frames: scene.anims.generateFrameNames(texture[i], { prefix: 'walk_right_', start: 1, end: 4 }),
			frameRate: 5,
			repeat: -1
		});
	}
}

export function getEnemy(x, y, distance) {
	var enemyUnits = globals.ENEMY_GROUP.getChildren();
	for(var i = 0; i < enemyUnits.length; i++) {       
		if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
			return enemyUnits[i];
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

export function addAttack(x, y, angle, damage) {
	var attack = globals.ATTACKS_GROUP.get();
	if (attack)
	{
		attack.fire(x, y, angle, damage);
	}
}