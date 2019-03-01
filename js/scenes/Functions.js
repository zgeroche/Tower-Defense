var GV = require('./Globals.js');
var CS = require('./Classes.js');

//build the pathing and map for level
export function buildMap(scene, mapBG){
	//path to which enemey follows
    var graphics = scene.add.graphics();    
    drawLines(graphics);
    GV.WALKPATH = scene.add.path(0, 352);		//start point for path coords
    GV.WALKPATH.lineTo(416, 352);
    GV.WALKPATH.lineTo(416, 160);
    GV.WALKPATH.lineTo(800, 160);
    GV.WALKPATH.lineTo(800, 608);
    GV.WALKPATH.lineTo(608, 608);
    GV.WALKPATH.lineTo(608, 864);
    GV.WALKPATH.lineTo(1248, 864);
    GV.WALKPATH.lineTo(1248, 544);
    GV.WALKPATH.lineTo(1568, 544);
    GV.WALKPATH.lineTo(1568, 288);
    GV.WALKPATH.lineTo(1920, 288);
    graphics.lineStyle(0, 0xffffff, 1);
    GV.WALKPATH.draw(graphics);

    GV.FLYPATH = scene.add.path(0, 352);
    GV.FLYPATH.lineTo(1920, 288);
    GV.FLYPATH.draw(graphics);
    
	//add map image
	scene.add.image(960, 512, mapBG).setDepth(0);

	//add background music
	scene.bgm = scene.sound.add('background');
	scene.bgm.volume = 0.04;
	scene.bgm.loop = true;
	//bgm.play();																//sounds
	
	//add HUD
	scene.scene.add('HUD', CS.HUD, true, { x: 680, y: 66 });

	//misc
	scene.nextEnemy = 0;
	scene.physics.add.overlap(GV.ENEMY_GROUP, GV.ATTACKS_GROUP, damageEnemy);
    scene.input.mouse.disableContextMenu();
}

//create animations for all enemies and towers
export function createAnimations(scene, sprites, side) {
    for (var i = 0; i < sprites.length; i++) {
		if(side == 0)
		{
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
			scene.anims.create({
			    key: enemy + "_up",
			    frames: scene.anims.generateFrameNames(enemy, { prefix: movement+'_up_', start: 1, end: frameEnd }),
			    frameRate: 5,
			    repeat: -1
			}); 
		}
		if(side == 1)
		{
			var tower = sprites[i].towerName.toLowerCase();

			scene.anims.create({
				key: tower + "_idle",
				frames: scene.anims.generateFrameNames(tower, { prefix: 'idle_down_', start: 1, end: 2 }),
				frameRate: 5,
				repeat: -1
			});
			scene.anims.create({
				key: tower + "_atk",
				frames: scene.anims.generateFrameNames(tower, { prefix: 'atk_down_', start: 1, end: 5 }),
				frameRate: 15,
				repeat: -1
			}); 
			
		}
	}
}

//highlights the location the user clicks on to place/upgrade/remove tower
export function highlightLoc(scene, i, j){

	//checks if highlight box exists already, if so destroy before creating a new one.
	if(typeof scene.lightBox === 'object'){scene.lightBox.destroy();}
	
	//create a box at any clickable location on the map
	if(GV.MAP[i][j] != -1)
	{
		var x = j * 64 + 64/2;
		var y = i * 64 + 64/2;
		//var shape = new Phaser.Geom.Circle(0, 0, 20);
		var shape = new Phaser.Geom.Rectangle(-32, -32, 64, 64);
		scene.lightBox = scene.scene.add.particles('highlight');
		scene.lightBox.createEmitter({
			x: x, 
			y: y,
			//tint: 0xff00ff,
			scale: { start: 0.3, end: 0 },
			frequency: 35,
			blendMode: 'SCREEN',
			emitZone: { type: 'edge', source: shape, quantity: 30, yoyo: false}
		});
	}
}

export function placeTowerAction(pointer, scene, i, j){
	
	var bannerImg = scene.scene.add.image(120, 982, 'towerbutton').setDepth(1);
	var bannerText = scene.scene.add.text(120/2, 982-15, "Place Tower", { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' }).setDepth(2);
	
	GV.BUTTON_GROUP.add(bannerImg);
	GV.BUTTON_GROUP.add(bannerText);
	
	bannerImg.setInteractive({ useHandCursor: true }).on('pointerdown', () =>{
		var buttonImg = scene.scene.add.image(120, 922, 'towerbutton').setDepth(1);
		var buttonText = scene.scene.add.text(120/2, 922-15, "Peasant", { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' }).setDepth(2);
		
		GV.BUTTON_GROUP.add(buttonImg);
		GV.BUTTON_GROUP.add(buttonText);
		
		buttonImg.setInteractive({ useHandCursor: true }).on('pointerdown', () =>{
			var newTower = GV.TOWER_GROUP[GV.PEASANT_STATS.towerId].get(GV.PEASANT_STATS);
			newTower.placeTower(i, j, scene);
			GV.BUTTON_GROUP.clear(true,true);
		});
	});
}

export function removeTowerAction(pointer, scene, i, j){
	var removeButtonImg = scene.scene.add.image(120, 982, 'towerbutton').setDepth(1);
	var removeButtonText = scene.scene.add.text(120/2, 982-15, "Remove tower", { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' }).setDepth(2);
	
	GV.BUTTON_GROUP.add(removeButtonImg);
	GV.BUTTON_GROUP.add(removeButtonText);
	
	removeButtonImg.setInteractive({ useHandCursor: true }).on('pointerdown', () =>{
		var tower = GV.MAP[i][j];
		if(typeof tower ==="object")
		{
			tower.removeTower(i, j, scene);
		}
		GV.BUTTON_GROUP.clear(true,true);
		
	});
}

export function upgradeTowerAction(i, j, scene, pointer, id){
	
	//New code for remove and upgrade buttons
	removeTowerAction(pointer, scene, i, j);
	
	var upgradeButtonImg = scene.scene.add.image(120, 922, 'towerbutton').setDepth(1);
	var upgradeButtonText = scene.scene.add.text(120/2, 922-15, "Upgrade tower", { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' }).setDepth(2);
	
	GV.BUTTON_GROUP.add(upgradeButtonImg);
	GV.BUTTON_GROUP.add(upgradeButtonText);
	
	upgradeButtonImg.setInteractive({ useHandCursor: true }).on('pointerdown', () =>{
		GV.BUTTON_GROUP.clear(true,true);
		
		if(GV.TOWER_ARRAY[id].upgrades)
		{
			var numOfUpgrades = GV.TOWER_ARRAY[id].upgrades.length;
			var currTower = GV.MAP[i][j];
			var y = 982;
			//var buttonImgGroup = scene.scene.add.group();
			//var buttonTextGroup = scene.scene.add.group();
			for (var count = 0; count < numOfUpgrades; count++) 
			{
				var upgradeID = GV.TOWER_ARRAY[id].upgrades[count];
				var upgradedTower = GV.TOWER_ARRAY[upgradeID];
				var newTower = GV.TOWER_GROUP[upgradeID].get(upgradedTower);
				
				var towerButton = new CS.XButton(scene.scene, y);
				towerButton.upgradeTowerButton(pointer,scene, currTower, newTower,i,j); 

				y = y - 60;	
			}
		}
		else
		{
			removeTowerAction(pointer, scene, i, j);
			
			var upgradeButtonImg = scene.scene.add.image(120, 922, 'towerbutton').setDepth(1);
			var upgradeButtonText = scene.scene.add.text(120/2, 922-15, "No Upgrades", { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' }).setDepth(2);
			
			GV.BUTTON_GROUP.add(upgradeButtonImg);
			GV.BUTTON_GROUP.add(upgradeButtonText);
			
		}
		
	});		
}

//user input related actions 
export function userAction(pointer, scene){
	var i = Math.floor(pointer.y/64);
	var j = Math.floor(pointer.x/64);
	if (pointer.leftButtonDown())
    {
		//highlight location clicked by user
		highlightLoc(scene, i, j);
		
		//if new tower
		if(GV.MAP[i][j] == 0)
		{	
			GV.BUTTON_GROUP.clear(true,true);
			placeTowerAction(pointer, scene, i, j);
		}
		else if(typeof GV.MAP[i][j] ==="object")
		{
			GV.BUTTON_GROUP.clear(true,true);
			upgradeTowerAction(i, j, scene, pointer, GV.MAP[i][j].towerId);
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
    for(var i = 0; i < 16; i++) {
        graphics.moveTo(0, i * 64);
        graphics.lineTo(1920, i * 64);
    }
    for(var j = 0; j < 30; j++) {
        graphics.moveTo(j * 64, 0);
        graphics.lineTo(j * 64, 1024);
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