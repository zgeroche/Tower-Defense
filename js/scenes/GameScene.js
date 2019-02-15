import {CST} from "../CST";
//import {Enemy} from "../Enemy";
//import {GlobalVariables} from "../GlobalVariables";

var globals = require('./Globals.js');
var fn = require('./Functions.js')
var classes = require('./Classes.js');

export class GameScene extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.GAME
        })
    }
    //Preload function loads assets before game starts
 
    init(data){
        console.log(data);
    }

    //create function initializes and adds assets to game
    create() {
		/*creates a group for a tower type, that way we can use TOWER_GROUP.get(towerStats) to instantiate new towers easily
		loop through TOWER_ARRAY to get each tower object
		then add each object to TOWER_GROUP arr
		we do this becuase TOWER_GROUP can now be easily used to manipulate tower objects with Phaser functions.*/
		//loop set to 3 since we only have 3 developed classes at the moment
		for(var i = 0; i < 3; i++) {
			var className = "classes."+globals.TOWER_ARRAY[i].towerName;
			console.log(className);
			globals.TOWER_GROUP[globals.TOWER_ARRAY[i].towerId] = this.add.group({ classType: eval(className), runChildUpdate: true });
		}
		
		//enemy group will be a loop similar to tower group
		globals.ENEMY_GROUP = this.physics.add.group({ classType: classes.Deathknight, runChildUpdate: true }); //key: 'walk_down_', frame: [1, 2, 3, 4], repeat: 5, active: true });
		
		//turned into attack group soon for different attack types
		globals.ATTACKS_GROUP = this.physics.add.group({ classType: classes.Attack, runChildUpdate: true });
		
		//build the game map, this includes pathing, map image, background sounds, and general game assets
		fn.buildMap(this);
		
		//input related actions in userAction function
		this.input.on('pointerdown', function (pointer){fn.userAction(pointer, this)});

		/*let nextScene = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2, 'nextScene').setDepth(1);
		nextScene.setInteractive();
		nextScene.on("pointerdown", ()=>{
			this.scene.start(CST.SCENES.GAME2, "Armory Level");
		})*/
    }

    //update function constantly refreshes so to progress game
    update(time, delta, PATH) {  

        if (time > this.nextEnemy)
        {
            var enemy = globals.ENEMY_GROUP.get(globals.PATH);
            if (enemy)
            {
                enemy.setActive(true);
                enemy.setVisible(true);
                enemy.startOnPath();
                //ENEMY_SPEED = 1/Math.floor((Math.random() * (2000 - 500)) + 500);
                this.nextEnemy = time + globals.ENEMY_SPAWN_RATE;
            }       
        }
	
    }
}
