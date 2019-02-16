import {CST} from "../CST";
var GV = require('./Globals.js');	
var FN = require('./Functions.js');
var CS = require('./Classes.js');

export class GameScene2 extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.GAME2
        })
    }
    
    //Preload function loads assets before game starts
 
    init(data){
        //console.log(data);
    }

    //create function initializes and adds assets to game
    create() {
		/*creates a group for a tower type, that way we can use GV.TOWER_GROUP.get(towerStats) to instantiate new towers easily
		loop through GV.TOWER_ARRAY to get each tower object
		then add each object to GV.TOWER_GROUP arr
		we do this becuase GV.TOWER_GROUP can now be easily used to manipulate tower objects with Phaser functions.*/
		//loop set to 2 since we only have 2 developed classes at the moment
		for(var i = 0; i < 3; i++) {
			var towerClass = "CS."+GV.TOWER_ARRAY[i].towerName;
			GV.TOWER_GROUP[GV.TOWER_ARRAY[i].towerId] = this.add.group({ classType: eval(towerClass), runChildUpdate: true });
		}
		
		//enemy group will be a loop similar to tower group
		for (var i = 0; i < 4; i++) {
			var enemyClass = "CS."+GV.ENEMY_ARRAY[i].enemyName;
			GV.ENEMY_GROUP[GV.ENEMY_ARRAY[i].enemyId] = this.physics.add.group({classType: eval(enemyClass), runChildUpdate: true});
		}
		
		//turned into attack group soon for different attack types
		GV.ATTACKS_GROUP = this.physics.add.group({ classType: CS.Attack, runChildUpdate: true });
		
		//test button group
		GV.BUTTON_GROUP[0] = this.add.group({ classType: CS.PlaceButton, runChildUpdate: false });
		GV.BUTTON_GROUP[1] = this.add.group({ classType: CS.RemoveButton, runChildUpdate: false });
		GV.BUTTON_GROUP[2] = this.add.group({ classType: CS.UpgradeButton, runChildUpdate: false });
		
		//turned into attack group soon for different attack types
		GV.ATTACKS_GROUP = this.physics.add.group({ classType: CS.Attack, runChildUpdate: true });
		
		//build the game map, this includes pathing, map image, animations, background sounds, and general game assets
		FN.buildMap(this, 'map2');
		
		//create animations
		FN.createAnimations(this, GV.ENEMY_ARRAY);
		
		//input related actions in userAction function
		this.input.on('pointerdown', function (pointer){FN.userAction(pointer, this)});

		/*let nextScene = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2, 'nextScene').setDepth(1);
		nextScene.setInteractive();
		nextScene.on("pointerdown", ()=>{
			this.scene.start(CST.SCENES.GAME2, "Armory Level");
		})*/
    }

    //update function constantly refreshes so to progress game
    update(time, delta) {  
		if (time > this.nextEnemy && GV.SPAWNED <= 10)
		{
			var enemy = GV.ENEMY_GROUP[GV.WAVE-1].get(GV.ENEMY_ARRAY[GV.WAVE-1]);
			if (enemy)
			{
				enemy.setActive(true);
				enemy.setVisible(true);
				enemy.startOnPath();
				this.nextEnemy = time + GV.ENEMY_SPAWN_RATE;
				GV.SPAWNED += 1;
			}
			if (GV.SPAWNED == 10 && GV.WAVE < 4)
			{
			   GV.SPAWNED = 0;
			   GV.WAVE += 1;
			}
		}
    }
}
