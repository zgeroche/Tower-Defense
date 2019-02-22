var GV = require('./Globals.js');
var CS = require('./Classes.js');

//build the pathing and map for level
export function buildMap(scene, mapBG){
	//path to which enemey follows
    var graphics = scene.add.graphics();    
    drawLines(graphics);
    GV.WALKPATH = scene.add.path(0, 480);		//start point for path coords
    GV.WALKPATH.lineTo(352, 480);
    GV.WALKPATH.lineTo(352, 160);
    GV.WALKPATH.lineTo(608, 160);
    GV.WALKPATH.lineTo(608, 736);
    GV.WALKPATH.lineTo(480, 736);
    GV.WALKPATH.lineTo(480, 1056);
    GV.WALKPATH.lineTo(1120, 1056);
    GV.WALKPATH.lineTo(1120, 288);
    GV.WALKPATH.lineTo(1568, 288);
    graphics.lineStyle(1, 0xffffff, 1);
    GV.WALKPATH.draw(graphics);

    GV.FLYPATH = scene.add.path(0, 480);
    GV.FLYPATH.lineTo(1568, 288);
    GV.FLYPATH.draw(graphics);
    
	//add map image
	scene.add.image(800, 640, mapBG).setDepth(0);

	//add background music
	scene.bgm = scene.sound.add('background');
	scene.bgm.volume = 0.04;
	scene.bgm.loop = true;
	//bgm.play();																//sounds
	
	//add HUD
	scene.scene.add('HUD', CS.HUD, true, { x: 640, y: 66 });

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
	if(typeof scene.lightBox === 'object')
	{
		scene.lightBox.destroy();
	}
	
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

//user input related actions 
export function userAction(pointer, scene){
	var i = Math.floor(pointer.y/64);
	var j = Math.floor(pointer.x/64);
	if (pointer.leftButtonDown())
        {
			//highlight location clicked by user
			highlightLoc(scene, i, j);
			/* for (var count = 0; count < 25; count++) {
				GV.BUTTON_GROUP[count].clear(true, true);
			} */
			
			//if new tower
			if(GV.MAP[i][j] == 0)
			{	
				/*var newTower = GV.TOWER_GROUP[GV.PEASANT_STATS.towerId].get(GV.PEASANT_STATS);
				newTower.placeTower(i, j, scene);*/
				
				GV.BUTTON_GROUP[0].clear(true, true);
				var placeButton = GV.BUTTON_GROUP[0].get();
				placeButton.makeButton(pointer, scene);
				
				placeButton.on("pointerdown", ()=>{
					var newTower = GV.TOWER_GROUP[GV.PEASANT_STATS.towerId].get(GV.PEASANT_STATS);
					newTower.placeTower(i, j, scene);
					placeButton.setActive(false);
					placeButton.setVisible(false);
					GV.BUTTON_GROUP[0].remove(placeButton, true, true);
				});
			}
			//if upgrade tower
			else if(GV.MAP[i][j].towerId == 0)
			{
				//New code for remove and upgrade buttons
				var removeButton = GV.BUTTON_GROUP[1].get();
				removeButton.makeButton(pointer, scene);
				
				var upgradeButton = GV.BUTTON_GROUP[2].get();
				upgradeButton.makeButton(pointer, scene);
				
				removeButton.on("pointerdown", ()=>{
					var tower = GV.MAP[i][j];
					if(typeof tower ==="object")
					{
						tower.removeTower(i, j, scene);
					}
					removeButton.setActive(false);
					removeButton.setVisible(false);
					GV.BUTTON_GROUP[1].remove(removeButton, true, true);
					upgradeButton.setActive(false);
					upgradeButton.setVisible(false);
					GV.BUTTON_GROUP[2].remove(removeButton, true, true);
				});

				
				upgradeButton.on("pointerdown", ()=>{
					//remove upgrade and remove buttons
					removeButton.setActive(false);
					removeButton.setVisible(false);
					GV.BUTTON_GROUP[1].remove(removeButton, true, true);
					upgradeButton.setActive(false);
					upgradeButton.setVisible(false);
					GV.BUTTON_GROUP[2].remove(upgradeButton, true, true);
					
					//make soldier, archer and apprentice buttons
					var soldierButton = GV.BUTTON_GROUP[3].get();
					soldierButton.makeButton(pointer, scene);
					
					var archerButton = GV.BUTTON_GROUP[4].get();
					archerButton.makeButton(pointer, scene);
					
					var apprenticeButton = GV.BUTTON_GROUP[5].get();
					apprenticeButton.makeButton(pointer, scene);
					
					//Assign function to each button
					soldierButton.on("pointerdown", ()=>{
						var currTower = GV.MAP[i][j];
						var newTower = GV.TOWER_GROUP[GV.SOLDIER_STATS.towerId].get(GV.SOLDIER_STATS);
						currTower.upgradeTower(i, j, newTower, scene);
						soldierButton.setActive(false);
						soldierButton.setVisible(false);
						GV.BUTTON_GROUP[3].remove(removeButton, true, true);
						archerButton.setActive(false);
						archerButton.setVisible(false);
						GV.BUTTON_GROUP[4].remove(upgradeButton, true, true);
						apprenticeButton.setActive(false);
						apprenticeButton.setVisible(false);
						GV.BUTTON_GROUP[5].remove(upgradeButton, true, true);
					});
					
					archerButton.on("pointerdown", ()=>{
						var currTower = GV.MAP[i][j];
						var newTower = GV.TOWER_GROUP[GV.ARCHER_STATS.towerId].get(GV.ARCHER_STATS);
						currTower.upgradeTower(i, j, newTower, scene);
						soldierButton.setActive(false);
						soldierButton.setVisible(false);
						GV.BUTTON_GROUP[3].remove(removeButton, true, true);
						archerButton.setActive(false);
						archerButton.setVisible(false);
						GV.BUTTON_GROUP[4].remove(upgradeButton, true, true);
						apprenticeButton.setActive(false);
						apprenticeButton.setVisible(false);
						GV.BUTTON_GROUP[5].remove(upgradeButton, true, true);
					});
					
					apprenticeButton.on("pointerdown", ()=>{
						var currTower = GV.MAP[i][j];
						var newTower = GV.TOWER_GROUP[GV.APPRENTICE_STATS.towerId].get(GV.APPRENTICE_STATS);
						currTower.upgradeTower(i, j, newTower, scene);
						soldierButton.setActive(false);
						soldierButton.setVisible(false);
						GV.BUTTON_GROUP[3].remove(removeButton, true, true);
						archerButton.setActive(false);
						archerButton.setVisible(false);
						GV.BUTTON_GROUP[4].remove(upgradeButton, true, true);
						apprenticeButton.setActive(false);
						apprenticeButton.setVisible(false);
						GV.BUTTON_GROUP[5].remove(upgradeButton, true, true);
					});
						
				});
			}
			else if(GV.MAP[i][j].towerId == 1)
			{
				//new code
				var removeButton = GV.BUTTON_GROUP[1].get();
				removeButton.makeButton(pointer, scene);
				
				var upgradeButton = GV.BUTTON_GROUP[2].get();
				upgradeButton.makeButton(pointer, scene);

				removeButton.on("pointerdown", ()=>{
					var tower = GV.MAP[i][j];
					if(typeof tower ==="object")
					{
						tower.removeTower(i, j, scene);
					}
					removeButton.setActive(false);
					removeButton.setVisible(false);
					GV.BUTTON_GROUP[1].remove(removeButton, true, true);
					upgradeButton.setActive(false);
					upgradeButton.setVisible(false);
					GV.BUTTON_GROUP[2].remove(upgradeButton, true, true);
				});
				
				
				upgradeButton.on("pointerdown", ()=>{
					var currTower = GV.MAP[i][j];
					var newTower = GV.TOWER_GROUP[GV.ARCHER_STATS.towerId].get(GV.ARCHER_STATS);
					currTower.upgradeTower(i, j, newTower, scene);
					removeButton.setActive(false);
					removeButton.setVisible(false);
					GV.BUTTON_GROUP[1].remove(removeButton, true, true);
					upgradeButton.setActive(false);
					upgradeButton.setVisible(false);
					GV.BUTTON_GROUP[2].remove(upgradeButton, true, true);
				});
			}
			else if(GV.MAP[i][j].towerId == 2)
			{
				//new code
				var removeButton = GV.BUTTON_GROUP[1].get();
				removeButton.makeButton(pointer, scene);

				removeButton.on("pointerdown", ()=>{
					var tower = GV.MAP[i][j];
					if(typeof tower ==="object")
					{
						tower.removeTower(i, j, scene);
					}
					removeButton.setActive(false);
					removeButton.setVisible(false);
					GV.BUTTON_GROUP[1].remove(removeButton, true, true);
				});
			}
		}
		else if (pointer.rightButtonDown())
		{
			var tower = GV.MAP[i][j];
			if(typeof tower === "object")
			{
				tower.removeTower(i, j, scene);
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
    for(var i = 0; i < 20; i++) {
        graphics.moveTo(0, i * 64);
        graphics.lineTo(1600, i * 64);
    }
    for(var j = 0; j < 25; j++) {
        graphics.moveTo(j * 64, 0);
        graphics.lineTo(j * 64, 1280);
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