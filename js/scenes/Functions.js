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

export function placeTowerAction(){
}


export function upgradeTowerAction(i, j, scene, pointer, id){
	
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
		removeButton.destroy();
		GV.BUTTON_GROUP[1].remove(removeButton, true, true);
		upgradeButton.destroy();
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
		if(GV.TOWER_ARRAY[id].upgrades)
		{
			var numOfUpgrades = GV.TOWER_ARRAY[id].upgrades.length;
			var currTower = GV.MAP[i][j];
			var y = 982;
			var buttonImgGroup = scene.scene.add.group();
			var buttonTextGroup = scene.scene.add.group();
			for (var count = 0; count < numOfUpgrades; count++) 
			{
				var upgradeID = GV.TOWER_ARRAY[id].upgrades[count];
				var upgradedTower = GV.TOWER_ARRAY[upgradeID];
				var newTower = GV.TOWER_GROUP[upgradeID].get(upgradedTower);
				
				var buttonImg = scene.scene.add.image(120, y, 'towerbutton').setDepth(1);
				var buttontext = scene.scene.add.text(120/2, y-15, newTower.towerName, { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' }).setDepth(2);
				
				buttonImgGroup.add(buttonImg);
				buttonTextGroup.add(buttontext);
				
				buttonImg.setInteractive({ useHandCursor: true }).on('pointerdown', () =>{
					if (currTower){currTower.upgradeTower(i, j, newTower, scene)};
					buttonImgGroup.clear(true,true);
					buttonTextGroup.clear(true,true);
					
				});
				y = y - 60;
				

				/* var towerButton = new CS.XButton(scene.scene, y);
				towerButton.placeTower(pointer,scene, currTower, newTower,i,j); */
				/* var towerButton = GV.BUTTON_GROUP[upgradeID+2].get(y);
				towerButton.makeButton(pointer, scene, currTower, newTower, numOfUpgrades, upgradeID, i, j); */
				
			}
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
		
		for (var count = 0; count < 2; count++) {
			GV.BUTTON_GROUP[count].clear(true, true);
		}
		
		//if new tower
		if(GV.MAP[i][j] == 0)
		{	
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
		else if(typeof GV.MAP[i][j] ==="object")
		{
			upgradeTowerAction(i, j, scene, pointer, GV.MAP[i][j].towerId);
		}
		//if tower clicked on is a peasant
		/* else if(GV.MAP[i][j].towerId == 0)
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
					for (var count = 3; count < 6; count++) {
						GV.BUTTON_GROUP[count].clear(true, true);
					}
				});
				
				archerButton.on("pointerdown", ()=>{
					var currTower = GV.MAP[i][j];
					var newTower = GV.TOWER_GROUP[GV.ARCHER_STATS.towerId].get(GV.ARCHER_STATS);
					currTower.upgradeTower(i, j, newTower, scene);
					for (var count = 3; count < 6; count++) {
						GV.BUTTON_GROUP[count].clear(true, true);
					}
				});
				apprenticeButton.on("pointerdown", ()=>{
					var currTower = GV.MAP[i][j];
					var newTower = GV.TOWER_GROUP[GV.APPRENTICE_STATS.towerId].get(GV.APPRENTICE_STATS);
					currTower.upgradeTower(i, j, newTower, scene);
					for (var count = 3; count < 6; count++) {
						GV.BUTTON_GROUP[count].clear(true, true);
					}
				});
			});
		}

		//if tower clicked on is a soldier
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
				//remove upgrade and remove buttons
				removeButton.setActive(false);
				removeButton.setVisible(false);
				GV.BUTTON_GROUP[1].remove(removeButton, true, true);
				upgradeButton.setActive(false);
				upgradeButton.setVisible(false);
				GV.BUTTON_GROUP[2].remove(upgradeButton, true, true);
				
				//make knight and duelist buttons
				var knightButton = GV.BUTTON_GROUP[6].get();
				knightButton.makeButton(pointer, scene);
				
				var duelistButton = GV.BUTTON_GROUP[7].get();
				duelistButton.makeButton(pointer, scene);
				
				//Assign function to each button
				knightButton.on("pointerdown", ()=>{
					var currTower = GV.MAP[i][j];
					var newTower = GV.TOWER_GROUP[GV.KNIGHT_STATS.towerId].get(GV.KNIGHT_STATS);
					currTower.upgradeTower(i, j, newTower, scene);
					for (var count = 6; count < 8; count++) {
						GV.BUTTON_GROUP[count].clear(true, true);
					}
				});
				
				duelistButton.on("pointerdown", ()=>{
					var currTower = GV.MAP[i][j];
					var newTower = GV.TOWER_GROUP[GV.DUELIST_STATS.towerId].get(GV.DUELIST_STATS);
					currTower.upgradeTower(i, j, newTower, scene);
					for (var count = 6; count < 8; count++) {
						GV.BUTTON_GROUP[count].clear(true, true);
					}
				});
					
			});
		}
		//if tower clicked on is an archer
		else if(GV.MAP[i][j].towerId == 2)
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
				//remove upgrade and remove buttons
				removeButton.setActive(false);
				removeButton.setVisible(false);
				GV.BUTTON_GROUP[1].remove(removeButton, true, true);
				upgradeButton.setActive(false);
				upgradeButton.setVisible(false);
				GV.BUTTON_GROUP[2].remove(upgradeButton, true, true);
				
				//make rifleman and ranger buttons
				var riflemanButton = GV.BUTTON_GROUP[8].get();
				riflemanButton.makeButton(pointer, scene);
				
				var rangerButton = GV.BUTTON_GROUP[9].get();
				rangerButton.makeButton(pointer, scene);
				
				//Assign function to each button
				riflemanButton.on("pointerdown", ()=>{
					var currTower = GV.MAP[i][j];
					var newTower = GV.TOWER_GROUP[GV.RIFLEMAN_STATS.towerId].get(GV.RIFLEMAN_STATS);
					currTower.upgradeTower(i, j, newTower, scene);
					for (var count = 8; count < 10; count++) {
						GV.BUTTON_GROUP[count].clear(true, true);
					}
				});
				
				rangerButton.on("pointerdown", ()=>{
					var currTower = GV.MAP[i][j];
					var newTower = GV.TOWER_GROUP[GV.RANGER_STATS.towerId].get(GV.RANGER_STATS);
					currTower.upgradeTower(i, j, newTower, scene);
					for (var count = 8; count < 10; count++) {
						GV.BUTTON_GROUP[count].clear(true, true);
					}
				});
					
			});
		}
		//if tower clicked on is apprentice
		else if (GV.MAP[i][j].towerId == 3)
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
				//remove upgrade and remove buttons
				removeButton.setActive(false);
				removeButton.setVisible(false);
				GV.BUTTON_GROUP[1].remove(removeButton, true, true);
				upgradeButton.setActive(false);
				upgradeButton.setVisible(false);
				GV.BUTTON_GROUP[2].remove(upgradeButton, true, true);
				
				//make wizard and sorceress buttons
				var wizardButton = GV.BUTTON_GROUP[10].get();
				wizardButton.makeButton(pointer, scene);
				
				var sorceressButton = GV.BUTTON_GROUP[11].get();
				sorceressButton.makeButton(pointer, scene);
				
				//Assign function to each button
				wizardButton.on("pointerdown", ()=>{
					var currTower = GV.MAP[i][j];
					var newTower = GV.TOWER_GROUP[GV.WIZARD_STATS.towerId].get(GV.WIZARD_STATS);
					currTower.upgradeTower(i, j, newTower, scene);
					for (var count = 10; count < 12; count++) {
						GV.BUTTON_GROUP[count].clear(true, true);
					}
				});
				
				sorceressButton.on("pointerdown", ()=>{
					var currTower = GV.MAP[i][j];
					var newTower = GV.TOWER_GROUP[GV.SORCERESS_STATS.towerId].get(GV.SORCERESS_STATS);
					currTower.upgradeTower(i, j, newTower, scene);
					for (var count = 10; count < 12; count++) {
						GV.BUTTON_GROUP[count].clear(true, true);
					}
				});
					
			});
		}
		//if tower clicked on is knight
		else if (GV.MAP[i][j].towerId == 4)
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
				//remove upgrade and remove buttons
				removeButton.setActive(false);
				removeButton.setVisible(false);
				GV.BUTTON_GROUP[1].remove(removeButton, true, true);
				upgradeButton.setActive(false);
				upgradeButton.setVisible(false);
				GV.BUTTON_GROUP[2].remove(upgradeButton, true, true);
				
				//make commander and paladin buttons
				var commanderButton = GV.BUTTON_GROUP[12].get();
				commanderButton.makeButton(pointer, scene);
				
				var paladinButton = GV.BUTTON_GROUP[13].get();
				paladinButton.makeButton(pointer, scene);
				
				//Assign function to each button
				commanderButton.on("pointerdown", ()=>{
					var currTower = GV.MAP[i][j];
					var newTower = GV.TOWER_GROUP[GV.COMMANDER_STATS.towerId].get(GV.COMMANDER_STATS);
					currTower.upgradeTower(i, j, newTower, scene);
					for (var count = 12; count < 14; count++) {
						GV.BUTTON_GROUP[count].clear(true, true);
					}
				});
				
				paladinButton.on("pointerdown", ()=>{
					var currTower = GV.MAP[i][j];
					var newTower = GV.TOWER_GROUP[GV.PALADIN_STATS.towerId].get(GV.PALADIN_STATS);
					currTower.upgradeTower(i, j, newTower, scene);
					for (var count = 12; count < 14; count++) {
						GV.BUTTON_GROUP[count].clear(true, true);
					}
				});
					
			});
		}
		//if tower clicked on is duelist
		else if (GV.MAP[i][j].towerId ==5)
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
				//remove upgrade and remove buttons
				removeButton.setActive(false);
				removeButton.setVisible(false);
				GV.BUTTON_GROUP[1].remove(removeButton, true, true);
				upgradeButton.setActive(false);
				upgradeButton.setVisible(false);
				GV.BUTTON_GROUP[2].remove(upgradeButton, true, true);
				
				//make swordmaster and cutpurse buttons
				var swordmasterButton = GV.BUTTON_GROUP[14].get();
				swordmasterButton.makeButton(pointer, scene);
				
				var cutpurseButton = GV.BUTTON_GROUP[15].get();
				cutpurseButton.makeButton(pointer, scene);
				
				//Assign function to each button
				swordmasterButton.on("pointerdown", ()=>{
					var currTower = GV.MAP[i][j];
					var newTower = GV.TOWER_GROUP[GV.SWORDMASTER_STATS.towerId].get(GV.SWORDMASTER_STATS);
					currTower.upgradeTower(i, j, newTower, scene);
					for (var count = 14; count < 16; count++) {
						GV.BUTTON_GROUP[count].clear(true, true);
					}
				});
				
				cutpurseButton.on("pointerdown", ()=>{
					var currTower = GV.MAP[i][j];
					var newTower = GV.TOWER_GROUP[GV.CUTPURSE_STATS.towerId].get(GV.CUTPURSE_STATS);
					currTower.upgradeTower(i, j, newTower, scene);
					for (var count = 14; count < 16; count++) {
						GV.BUTTON_GROUP[count].clear(true, true);
					}
				});
					
			});
		}
		//if tower clicked on is rifleman
		else if (GV.MAP[i][j].towerId == 6)
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
				//remove upgrade and remove buttons
				removeButton.setActive(false);
				removeButton.setVisible(false);
				GV.BUTTON_GROUP[1].remove(removeButton, true, true);
				upgradeButton.setActive(false);
				upgradeButton.setVisible(false);
				GV.BUTTON_GROUP[2].remove(upgradeButton, true, true);
				
				//make cannoneer and sharpshooter buttons
				var cannoneerButton = GV.BUTTON_GROUP[16].get();
				cannoneerButton.makeButton(pointer, scene);
				
				var sharpshooterButton = GV.BUTTON_GROUP[17].get();
				sharpshooterButton.makeButton(pointer, scene);
				
				//Assign function to each button
				cannoneerButton.on("pointerdown", ()=>{
					var currTower = GV.MAP[i][j];
					var newTower = GV.TOWER_GROUP[GV.CANNONEER_STATS.towerId].get(GV.CANNONEER_STATS);
					currTower.upgradeTower(i, j, newTower, scene);
					for (var count = 16; count < 18; count++) {
						GV.BUTTON_GROUP[count].clear(true, true);
					}
				});
				
				sharpshooterButton.on("pointerdown", ()=>{
					var currTower = GV.MAP[i][j];
					var newTower = GV.TOWER_GROUP[GV.SHARPSHOOTER_STATS.towerId].get(GV.SHARPSHOOTER_STATS);
					currTower.upgradeTower(i, j, newTower, scene);
					for (var count = 16; count < 18; count++) {
						GV.BUTTON_GROUP[count].clear(true, true);
					}
				});
					
			});
		}
		//if tower clicked on is ranger
		else if (GV.MAP[i][j].towerId == 7)
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
				//remove upgrade and remove buttons
				removeButton.setActive(false);
				removeButton.setVisible(false);
				GV.BUTTON_GROUP[1].remove(removeButton, true, true);
				upgradeButton.setActive(false);
				upgradeButton.setVisible(false);
				GV.BUTTON_GROUP[2].remove(upgradeButton, true, true);
				
				//make beastmaster and assassin buttons
				var beastmasterButton = GV.BUTTON_GROUP[18].get();
				beastmasterButton.makeButton(pointer, scene);
				
				var assassinButton = GV.BUTTON_GROUP[19].get();
				assassinButton.makeButton(pointer, scene);
				
				//Assign function to each button
				beastmasterButton.on("pointerdown", ()=>{
					var currTower = GV.MAP[i][j];
					var newTower = GV.TOWER_GROUP[GV.BEASTMASTER_STATS.towerId].get(GV.BEASTMASTER_STATS);
					currTower.upgradeTower(i, j, newTower, scene);
					for (var count = 18; count < 20; count++) {
						GV.BUTTON_GROUP[count].clear(true, true);
					}
				});
				
				assassinButton.on("pointerdown", ()=>{
					var currTower = GV.MAP[i][j];
					var newTower = GV.TOWER_GROUP[GV.ASSASSIN_STATS.towerId].get(GV.ASSASSIN_STATS);
					currTower.upgradeTower(i, j, newTower, scene);
					for (var count = 18; count < 20; count++) {
						GV.BUTTON_GROUP[count].clear(true, true);
					}
				});
					
			});
		}
		//if tower clicked on is wizard
		else if (GV.MAP[i][j].towerId == 8)
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
				//remove upgrade and remove buttons
				removeButton.setActive(false);
				removeButton.setVisible(false);
				GV.BUTTON_GROUP[1].remove(removeButton, true, true);
				upgradeButton.setActive(false);
				upgradeButton.setVisible(false);
				GV.BUTTON_GROUP[2].remove(upgradeButton, true, true);
				
				//make fire, ice and lightning mage buttons
				var firemageButton = GV.BUTTON_GROUP[20].get();
				firemageButton.makeButton(pointer, scene);
				
				var icemageButton = GV.BUTTON_GROUP[21].get();
				icemageButton.makeButton(pointer, scene);
				
				var lightningmageButton = GV.BUTTON_GROUP[22].get();
				lightningmageButton.makeButton(pointer, scene);
				
				//Assign function to each button
				firemageButton.on("pointerdown", ()=>{
					var currTower = GV.MAP[i][j];
					var newTower = GV.TOWER_GROUP[GV.FIREMAGE_STATS.towerId].get(GV.FIREMAGE_STATS);
					currTower.upgradeTower(i, j, newTower, scene);
					for (var count = 20; count < 23; count++) {
						GV.BUTTON_GROUP[count].clear(true, true);
					}
				});
				
				icemageButton.on("pointerdown", ()=>{
					var currTower = GV.MAP[i][j];
					var newTower = GV.TOWER_GROUP[GV.ICEMAGE_STATS.towerId].get(GV.ICEMAGE_STATS);
					currTower.upgradeTower(i, j, newTower, scene);
					for (var count = 20; count < 23; count++) {
						GV.BUTTON_GROUP[count].clear(true, true);
					}
				});
				
				lightningmageButton.on("pointerdown", ()=>{
					var currTower = GV.MAP[i][j];
					var newTower = GV.TOWER_GROUP[GV.LIGHTNINGMAGE_STATS.towerId].get(GV.LIGHTNINGMAGE_STATS);
					currTower.upgradeTower(i, j, newTower, scene);
					for (var count = 20; count < 23; count++) {
						GV.BUTTON_GROUP[count].clear(true, true);
					}
				});
					
			});
		}
		//if tower clicked on is sorceress
		else if (GV.MAP[i][j].towerId == 9)
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
				//remove upgrade and remove buttons
				removeButton.setActive(false);
				removeButton.setVisible(false);
				GV.BUTTON_GROUP[1].remove(removeButton, true, true);
				upgradeButton.setActive(false);
				upgradeButton.setVisible(false);
				GV.BUTTON_GROUP[2].remove(upgradeButton, true, true);
				
				//make warlock and priestess buttons
				var warlockButton = GV.BUTTON_GROUP[23].get();
				warlockButton.makeButton(pointer, scene);
				
				var priestessButton = GV.BUTTON_GROUP[24].get();
				priestessButton.makeButton(pointer, scene);
				
				//Assign function to each button
				warlockButton.on("pointerdown", ()=>{
					var currTower = GV.MAP[i][j];
					var newTower = GV.TOWER_GROUP[GV.WARLOCK_STATS.towerId].get(GV.WARLOCK_STATS);
					currTower.upgradeTower(i, j, newTower, scene);
					for (var count = 23; count < 25; count++) {
						GV.BUTTON_GROUP[count].clear(true, true);
					}
				});
				
				priestessButton.on("pointerdown", ()=>{
					var currTower = GV.MAP[i][j];
					var newTower = GV.TOWER_GROUP[GV.PRIESTESS_STATS.towerId].get(GV.PRIESTESS_STATS);
					currTower.upgradeTower(i, j, newTower, scene);
					for (var count = 23; count < 25; count++) {
						GV.BUTTON_GROUP[count].clear(true, true);
					}
				});
					
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
	} */
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