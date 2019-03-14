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
		GV.scene = CST.SCENES.GAME2;
		GV.PLAYER_HEALTH = 100;
        GV.WAVE = 1;
        GV.GOLD = 25;
        GV.SPAWNED = 0;
		
		GV.TOWER_GROUP = [];
		GV.ENEMY_GROUP = [];
		GV.ATTACK_GROUP = [];
		GV.BUTTON_GROUP = [];

        GV.WAVE_DETAIL = ['10 Slimes', '10 Deathknights', '10 Jackos', '10 Ghosts (flying)', '10 Jackos + Boss', '20 Deathknight + Slimes', '20 Ghosts (flying, Mass)', '70 Slimes (mass)', '60 Slimes, Deathknights & Jackos', '5 Minotaur Bosses'];

		//var graphics = this.add.graphics();    
		//FN.drawLines(graphics);
		
		this.add.image(960, 512, 'map2').setDepth(0);
		
		var coords = [
			[ 3, 3, 6, 6,11,11,21,21,27,27,29], //x path 1
			[15, 7, 7, 3, 3, 4, 4, 2, 2, 7, 7],  //y path 1
			[ 3, 3,14,14,17,17,26,26,29], //x path 2
			[15,13,13, 8, 8,10,10, 7, 7]   //y path 2
		];
		
		for(var i = 0; i < coords[0].length; i++ )
		{
			if(i == 0)
			{
				GV.WALKPATH = this.add.path((coords[0][i]+0.5)*64, (coords[1][i]+0.5)*64);		//start point for path coords
			}
			else
			{
				GV.WALKPATH.lineTo((coords[0][i]+0.5)*64, (coords[1][i]+0.5)*64);
			}
		}
		
		for(var i = 0; i < coords[2].length; i++ )
		{
			if(i == 0)
			{
				GV.WALKPATH2 = this.add.path((coords[2][i]+0.5)*64, (coords[3][i]+0.5)*64);		//start point for path coords
			}
			else
			{
				GV.WALKPATH2.lineTo((coords[2][i]+0.5)*64, (coords[3][i]+0.5)*64);
			}
		}
		
		//graphics.lineStyle(1, 0xffffff, 1);
		//GV.WALKPATH.draw(graphics);
		//GV.WALKPATH2.draw(graphics);

        var flyPoints = [
            3.5 * 64, 16.5 * 64,
            3.5 * 64, 13.5 * 64,
            9.5 * 64, 6.5 * 64,
            15.5 * 64, 10.5 * 64,
            20.5 * 64, 2.5 * 64,
            29.5*64, 7.5*64
        ];
        GV.FLYPATH = new Phaser.Curves.Spline(flyPoints);
        //GV.FLYPATH.draw(graphics);

		GV.MAP = [
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
            [-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1, 0,-1],
            [-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0, 0,-1, 0,-1],
            [-1,-1,-1,-1,-1, 0,-1, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1, 0,-1, 0,-1],
            [-1,-1,-1,-1,-1, 0,-1, 0,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1, 0,-1, 0,-1],
            [-1,-1, 0, 0, 0, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0,-1, 0, 0],
            [-1,-1, 0,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1],
			[-1,-1, 0,-1, 0, 0, 0, 0,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1, 0,-1, 0, 0, 0],
			[-1,-1, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1, 0, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0,-1, 0,-1,-1],
			[-1,-1, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1],
			[-1,-1, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1],
			[-1,-1, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
			];

    }

    //create function initializes and adds assets to game
    create() {
		this.bgm = this.sound.add('armory');
		this.bgm.volume = 0.04;
		this.bgm.loop = true;
		this.bgm.play();
		
		FN.loadUnits(this);
		
        /*creates a group for a tower type, that way we can use GV.TOWER_GROUP.get(towerStats) to instantiate new towers easily
		loop through GV.TOWER_ARRAY to get each tower object
		then add each object to GV.TOWER_GROUP arr
		we do this becuase GV.TOWER_GROUP can now be easily used to manipulate tower objects with Phaser functions.*/
		//loop through all 23 towers
		for(var i = 0; i < 23; i++) {
			var towerClass = "CS."+GV.TOWER_ARRAY[i].towerName;
			GV.TOWER_GROUP[GV.TOWER_ARRAY[i].towerId] = this.add.group({ classType: eval(towerClass), runChildUpdate: true });
		}

        //enemy group will be a loop similar to tower group
        for (var i = 0; i < 18; i++) {
            var enemyClass = "CS."+GV.ENEMY_ARRAY[i].enemyName;
            GV.ENEMY_GROUP[GV.ENEMY_ARRAY[i].enemyId] = this.physics.add.group({ classType: eval(enemyClass), runChildUpdate: true});
        }
		
        //turned into attack group soon for different attack types
		for (var i = 0; i < 23; i++) {
			var attackClass = "CS."+GV.ATTACK_ARRAY[i].attackName;
			GV.ATTACK_GROUP[GV.ATTACK_ARRAY[i].attackId] = this.physics.add.group({ classType: eval(attackClass), runChildUpdate: true});
		}
		
		//button group
		GV.BUTTON_GROUP = this.add.group();
		
        //build the game map, this includes pathing, map image, animations, background sounds, and general game assets
        FN.buildMap(this, 'map2');
		
		//wave management
		this.startPoint = this.add.text(GV.WALKPATH.startPoint.x, GV.WALKPATH.startPoint.y-32, '->', { fontFamily: 'VT323', fontSize: 75, color: '#0000ff', stroke: "#ffffff", strokeThickness: 2 }).setOrigin(0.5).setDepth(1);
 		this.startPoint.angle = -90;
		var targets = [this.startPoint]
		this.startPosIndicate = this.tweens.add({
				targets: targets, 
				duration: 500, 
				scaleX: 2,
				scaleY: 2, 
				yoyo: true, // at the end, go back to original scale 
				loop: -1
			});
		
 		this.buttonImg = this.add.image(1660, 1008, 'waveHUD').setDepth(1);
		this.nextEnemy = this.sys.game.loop.time + GV.WAVE_DELAY;
        this.complete = this.add.text(1660, 1008, 'Wave Complete', {fontFamily: 'VT323', fontSize: 30, color: '#ff0000'}).setDepth(1).setOrigin(.8,0.5);
        this.complete.setVisible(false);
        this.delay = this.add.text(1660, 1008, 'Next Level in ' + (GV.WAVE_DELAY/1000) + ' Seconds', {fontFamily: 'VT323', fontSize: 30, color: '#ff0000'}).setDepth(1).setOrigin(.8,0.5);
        this.skipWave = this.add.text(1660,1008, 'Skip Wait?', {fontFamily: 'VT323', fontSize: 30, color: '#ff0000'}).setDepth(1).setOrigin(-0.8,0.5);
        this.skipWave.setInteractive({ useHandCursor: true });
        this.skipWave.on("pointerup", ()=>{
            this.nextEnemy = 0;
            this.skipWave.setVisible(false);
			this.delay.setVisible(false);
			this.buttonImg.setVisible(false);
			this.startPoint.setVisible(false);
			this.startPosIndicate.pause();
        });
		
        //input related actions in userAction function
        this.input.on('pointerdown', function (pointer){FN.userAction(pointer, this)});
		
		//track if scene is over either by win or loss
		this.sceneOver = false;

		/////////////*TESTING*//////////////
        let win = this.add.text(30, 970, 'Force Win', { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' }).setDepth(1);
        win.setInteractive({ useHandCursor: true });
        win.on("pointerup", ()=>{
            //this.scene.remove('HUD');
            //this.scene.restart();
			//this.bgm.stop();
            //this.scene.start(CST.SCENES.TRANSITION1);
			FN.levelVictory(this, CST.SCENES.TRANSITION2);	
			
        });		
		let lose = this.add.text(30, 990, 'Force Lose', { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' }).setDepth(1);
        lose.setInteractive({ useHandCursor: true });
        lose.on("pointerup", ()=>{
            //this.scene.remove('HUD');
            //this.scene.restart();
			//this.bgm.stop();
            //this.scene.start(CST.SCENES.TRANSITION1);
			FN.gameOver(this, CST.SCENES.GAMEOVER);	
			
        });	
		/////////////*TESTING*//////////////	

		
    }

    //update function constantly refreshes so to progress game
    update(time, delta) {  
        //Check if player still alive
       if (GV.PLAYER_HEALTH <= 0 && !this.sceneOver)
        {
			FN.gameOver(this, CST.SCENES.GAMEOVER);
			console.log("Game Over");
        }
		else if(this.sceneOver == true)
		{
			console.log("done");
		}
        else
		{
		//Wave timer and skip in bottom HUD
		FN.waveHUD(this, Math.trunc((this.nextEnemy - time) / 1000));
		FN.pathIndicator(this, Math.trunc((this.nextEnemy - time) / 1000), 1, 1)
        this.delay.setText('Next wave in ' + Math.trunc((this.nextEnemy - time) / 1000) + ' Seconds');
        if (time > this.nextEnemy) {
			
            switch (GV.WAVE) {
                case 1: //Spawn 10 slime
                    if (GV.SPAWNED < 10) {
                        var enemy = GV.ENEMY_GROUP[16].get(GV.ENEMY_ARRAY[16]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.WALKPATH);
                            this.nextEnemy = time + GV.ENEMY_SPAWN_RATE;
                            GV.SPAWNED += 1;
                        }
                    }
                    else if (GV.ENEMY_GROUP[16].countActive(true) === 0) {									
                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 2: //10 Deathknight
                    if (GV.SPAWNED < 10) {
                        enemy = GV.ENEMY_GROUP[0].get(GV.ENEMY_ARRAY[0]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.WALKPATH);
                            this.nextEnemy = time + GV.ENEMY_SPAWN_RATE;
                            GV.SPAWNED += 1;
                        }
                    }
                    else if (GV.ENEMY_GROUP[0].countActive(true) === 0) {
                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 3: //10 Jacko
                    if (GV.SPAWNED < 10) {
                        enemy = GV.ENEMY_GROUP[10].get(GV.ENEMY_ARRAY[10]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.WALKPATH2);
                            this.nextEnemy = time + GV.ENEMY_SPAWN_RATE;
                            GV.SPAWNED += 1;
                        }
                    }
                    else if (GV.ENEMY_GROUP[10].countActive(true) === 0) {
                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 4: //10 Ghosts
                    if (GV.SPAWNED < 10) {
                        enemy = GV.ENEMY_GROUP[5].get(GV.ENEMY_ARRAY[5]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.FLYPATH);
                            this.nextEnemy = time + GV.ENEMY_SPAWN_RATE;
                            GV.SPAWNED += 1;
                        }
                    }
                    else if (GV.ENEMY_GROUP[5].countActive(true) === 0) {
                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 5: //Jacko + Horseman
                    if (GV.SPAWNED < 10) {
                        enemy = GV.ENEMY_GROUP[10].get(GV.ENEMY_ARRAY[10]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.WALKPATH);
                            this.nextEnemy = time + GV.ENEMY_SPAWN_RATE;
                            GV.SPAWNED += 1;
                        }
                        if (GV.SPAWNED == 5) {
                            enemy = GV.ENEMY_GROUP[9].get(GV.ENEMY_ARRAY[9]);
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.WALKPATH2);
                        }
                    }
                    else if (GV.ENEMY_GROUP[10].countActive(true) === 0 && GV.ENEMY_GROUP[9].countActive(true) === 0) {
                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 6: //Deathknight + Slime
                    if (GV.SPAWNED < 20) {
                        if (GV.SPAWNED % 2 === 0) {
                            enemy = GV.ENEMY_GROUP[0].get(GV.ENEMY_ARRAY[0]);
                            if (enemy) {
                                enemy.setActive(true);
                                enemy.setVisible(true);
                                enemy.startOnPath(GV.WALKPATH2);
                                this.nextEnemy = time + 350;
                                GV.SPAWNED += 1;
                            }
                        }
                        else {
                            enemy = GV.ENEMY_GROUP[16].get(GV.ENEMY_ARRAY[16]);
                            if (enemy) {
                                enemy.setActive(true);
                                enemy.setVisible(true);
                                enemy.startOnPath(GV.WALKPATH2);
                                this.nextEnemy = time + 350;
                                GV.SPAWNED += 1;
                            }
                        }
                    }
                    else if (GV.ENEMY_GROUP[0].countActive(true) === 0 && GV.ENEMY_GROUP[16].countActive(true) === 0) {
                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 7: //Mass Ghosts
                    if (GV.SPAWNED < 20) {
                        enemy = GV.ENEMY_GROUP[5].get(GV.ENEMY_ARRAY[5]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.FLYPATH);
                            this.nextEnemy = time + 250;
                            GV.SPAWNED += 1;
                        }
                    }
                    else if (GV.ENEMY_GROUP[5].countActive(true) === 0) {
                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 8: //Mass Slimes
                    if (GV.SPAWNED < 35) {
                        enemy = GV.ENEMY_GROUP[16].get(GV.ENEMY_ARRAY[16]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.WALKPATH);
                            this.nextEnemy = time + 150;
                            GV.SPAWNED += 1;
                        }
                    }
                    else if (GV.SPAWNED < 70) {
                        enemy = GV.ENEMY_GROUP[16].get(GV.ENEMY_ARRAY[16]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.WALKPATH2);
                            this.nextEnemy = time + 150;
                            GV.SPAWNED += 1;
                        }
                    }
                    else if (GV.ENEMY_GROUP[16].countActive(true) === 0) {
                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 9: //Slime + Deathknight + Jacko
                    if (GV.SPAWNED < 60) {
                        if (GV.SPAWNED % 3 === 0) {
                            enemy = GV.ENEMY_GROUP[16].get(GV.ENEMY_ARRAY[16]);
                            if (enemy) {
                                enemy.setActive(true);
                                enemy.setVisible(true);
                                enemy.startOnPath(GV.WALKPATH);
                                this.nextEnemy = time + GV.ENEMY_SPAWN_RATE / 3;
                                GV.SPAWNED += 1;
                            }
                        }
                        else if (GV.SPAWNED % 2 === 0) {
                            enemy = GV.ENEMY_GROUP[0].get(GV.ENEMY_ARRAY[0]);
                            if (enemy) {
                                enemy.setActive(true);
                                enemy.setVisible(true);
                                enemy.startOnPath(GV.WALKPATH2);
                                this.nextEnemy = time + GV.ENEMY_SPAWN_RATE / 3;
                                GV.SPAWNED += 1;
                            }
                        }
                        else {
                            enemy = GV.ENEMY_GROUP[10].get(GV.ENEMY_ARRAY[10]);
                            if (enemy) {
                                enemy.setActive(true);
                                enemy.setVisible(true);
                                enemy.startOnPath(GV.WALKPATH);
                                this.nextEnemy = time + GV.ENEMY_SPAWN_RATE / 3;
                                GV.SPAWNED += 1;
                            }
                        }
                    }
                    else if (GV.ENEMY_GROUP[16].countActive(true) === 0 && GV.ENEMY_GROUP[0].countActive(true) === 0 && GV.ENEMY_GROUP[10].countActive(true) === 0) {
                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 10: //5 Minotaur Bosses
                    if (GV.SPAWNED < 3) {
                        enemy = GV.ENEMY_GROUP[17].get(GV.ENEMY_ARRAY[17]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.WALKPATH);
                            this.nextEnemy = time + 750;
                            GV.SPAWNED += 1;
                        }
                    }
                    else if (GV.SPAWNED < 5) {
                        enemy = GV.ENEMY_GROUP[17].get(GV.ENEMY_ARRAY[17]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.WALKPATH2);
                            this.nextEnemy = time + 750;
                            GV.SPAWNED += 1;
                        }
                    }
                    else if (GV.ENEMY_GROUP[17].countActive(true) === 0) {
						FN.levelVictory(this, CST.SCENES.TRANSITION2);
                       /*  GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY; */
                    }
                    break;
            }
		}
        }
    }
}
