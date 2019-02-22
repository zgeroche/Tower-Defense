import {CST} from "../CST";
var GV = require('./Globals.js');	
var FN = require('./Functions.js');
var CS = require('./Classes.js');

export class GameScene extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.GAME
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

		//loop set to 22 to include all tower classes
		for(var i = 0; i < 22; i++) {
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
		for (var i = 0; i < 25; i++) {
			GV.BUTTON_GROUP[i] = this.add.group({ classType: eval(GV.BUTTON_ARRAY[i]), runChildUpdate: false});
		}

		
        //turned into attack group soon for different attack types
        GV.ATTACKS_GROUP = this.physics.add.group({ classType: CS.Attack, runChildUpdate: true });
		
        //build the game map, this includes pathing, map image, animations, background sounds, and general game assets
        FN.buildMap(this, 'map');
		
        //create animations
        FN.createAnimations(this, GV.ENEMY_ARRAY, 0);
        FN.createAnimations(this, GV.TOWER_ARRAY, 1);
		

        //Wave Management
        this.nextEnemy = GV.WAVE_DELAY;
        this.complete = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2, 'Wave Complete', {fontFamily: 'VT323', fontSize: 50, color: '#ff0000'}).setDepth(1);
        this.complete.setVisible(false);
        this.delay = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 50, 'Next Level in ' + (GV.WAVE_DELAY/1000) + ' Seconds', {fontFamily: 'VT323', fontSize: 50, color: '#ff0000'}).setDepth(1);
        this.skipWave = this.add.text(this.game.renderer.width / 2,this.game.renderer.height / 2 + 100, 'Skip Wait?', {fontFamily: 'VT323', fontSize: 50, color: '#ff0000'}).setDepth(1);
        this.skipWave.setInteractive();
        this.skipWave.on("pointerup", ()=>{
            this.nextEnemy = 0;
            this.skipWave.setVisible(false);
        })


        //input related actions in userAction function
        this.input.on('pointerdown', function (pointer){FN.userAction(pointer, this)});

        let nextScene = this.add.text(100, 280, 'Next Level', { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' }).setDepth(1);
        nextScene.setInteractive();
        nextScene.on("pointerup", ()=>{
            this.scene.remove('HUD');
            //this.scene.restart();
            this.scene.start(CST.SCENES.GAME2);
        });		

		
    }

    //update function constantly refreshes so to progress game
    update(time, delta) {  
        //Check if player still alive
        /*if (GV.PLAYER_HEALTH <= 0)
        {
            this.scene.remove('HUD');
            this.delay.destroy();
            this.complete.destroy();
            this.skipWave.destroy();
             this.cameras.main.fade(2500,0,0,0, false);
            this.cameras.main.once('camerafadeoutcomplete', ()=>{
                this.scene.start(CST.SCENES.GAMEOVER);
            }); 
        }
        else {*/
            this.delay.setText('Next wave in ' + Math.trunc((this.nextEnemy-time)/1000) + ' Seconds');
            if (time > this.nextEnemy && GV.SPAWNED < 10)
            {
                this.complete.setVisible(false);
                this.delay.setVisible(false);
                this.skipWave.setVisible(false);
                var enemy = GV.ENEMY_GROUP[GV.WAVE-1].get(GV.ENEMY_ARRAY[GV.WAVE-1]);
                if (enemy)
                {
                    enemy.setActive(true);
                    enemy.setVisible(true);
                    enemy.startOnPath();
                    this.nextEnemy = time + GV.ENEMY_SPAWN_RATE;
                    GV.SPAWNED += 1;
                }
            }
            if (GV.SPAWNED == 10 && GV.WAVE < 4 && GV.ENEMY_GROUP[GV.WAVE-1].countActive(true) === 0)
            {
                this.complete.setVisible(true);
                this.delay.setVisible(true);
                this.skipWave.setVisible(true);
                GV.SPAWNED = 0;
                GV.WAVE += 1;
                this.nextEnemy = time + GV.WAVE_DELAY;
            }
        //}
    }
}