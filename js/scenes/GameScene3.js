import {CST} from "../CST";
var GV = require('./Globals.js');	
var FN = require('./Functions.js');
var CS = require('./Classes.js');

export class GameScene3 extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.GAME3
        })
    }
    
    //Preload function loads assets before game starts
 
    init(data){
        //console.log(data);
		GV.scene = CST.SCENES.GAME3;
		GV.PLAYER_HEALTH = 100;
        GV.WAVE = 1;
        GV.GOLD = 25;
        GV.SPAWNED = 0;
		
		GV.TOWER_GROUP = [];
		GV.ENEMY_GROUP = [];
		GV.ATTACK_GROUP = [];
		GV.BUTTON_GROUP = [];

        GV.WAVE_DETAIL = ['10 Imps', '10 Zombies', '15 Reapers (fast)', '5 Dragons (flying)', '15 Imps + Golem (miniBoss)', '20 Vampire + Zombie', '40 Imp + Reaper', '60 Dragon, Zombie, Vampire', '50 Reaper, Golem, Imp', '30 Dragons (Mass)'];

		//var graphics = this.add.graphics();    
		//FN.drawLines(graphics);
		
		this.add.image(960, 512, 'map3').setDepth(0);
		
		var coords = [
			[ -1, 10,10, 6,6,14,14], //x path 1
			[12, 12, 7, 7, 2, 2, 0],  //y path 1
			[30,18,18,26,26,17,17,15,15], //x path 2
			[11,11, 7, 7, 5, 5, 2, 2, 0],  //y path 2
		];
		
		for(var i = 0; i < coords[0].length; i++ )
		{
			if(i == 0)
			{
				GV.WALKPATH = this.add.path((coords[0][i]+0.5)*64, (coords[1][i]+0.5)*64);		//start point for path coords
				//GV.MAP[coords[1][i]-1][coords[0][i]-1] = 0
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
				//GV.MAP[coords[1][i]-1][coords[0][i]-1] = 0
				GV.WALKPATH2.lineTo((coords[2][i]+0.5)*64, (coords[3][i]+0.5)*64);
			}
		}
		
		//graphics.lineStyle(1, 0xffffff, 1);
		//GV.WALKPATH.draw(graphics);
		//GV.WALKPATH2.draw(graphics);
		
		GV.FLYPATH = this.add.path(-1.5*64, 12.5*64);
		GV.FLYPATH.lineTo(15.5*64, 0.5*64);
		//GV.FLYPATH.draw(graphics);
		
		GV.FLYPATH2 = this.add.path(30.5*64, 12.5*64);
		GV.FLYPATH2.lineTo(15.5*64, 0.5*64);
		//GV.FLYPATH2.draw(graphics);
		
		GV.MAP = [
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1, 0,-1, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1],
            [-1,-1,-1,-1,-1, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1],
            [-1,-1,-1,-1,-1, 0,-1, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1, 0,-1,-1],
            [-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1],
			[-1,-1,-1,-1,-1, 0, 0, 0, 0, 0,-1, 0,-1,-1,-1,-1,-1, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1, 0,-1,-1,-1,-1,-1, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1, 0,-1,-1,-1,-1,-1, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1],
			[-1,-1, 0, 0, 0, 0, 0, 0, 0, 0,-1, 0,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1],
			[-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
			];

    }

    //create function initializes and adds assets to game
    create() {
		this.bgm = this.sound.add('throneroom');
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
        FN.buildMap(this, 'map3');
			
		//wave management
		this.startPoint = this.add.text(128, GV.WALKPATH.startPoint.y, '->', { fontFamily: 'VT323', fontSize: 75, color: '#00ff00', stroke: "#ffffff", strokeThickness: 2 }).setOrigin(0.5).setDepth(1);
		this.startPoint2 = this.add.text(GV.WALKPATH2.startPoint.x-128, GV.WALKPATH2.startPoint.y, '<-', { fontFamily: 'VT323', fontSize: 75, color: '#00ff00', stroke: "#ffffff", strokeThickness: 2 }).setOrigin(0.5).setDepth(1);
		this.startPoint2.setVisible(false);
		var targets = [this.startPoint, this.startPoint2];
		this.numPaths = 1;
		this.pathSide = 1;
		this.startPosIndicate = this.tweens.add({
				targets: targets, // on the start button
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
			this.startPoint2.setVisible(false);
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
			FN.levelVictory(this, CST.SCENES.GAMEVICTORY);	
			
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
		FN.pathIndicator(this, Math.trunc((this.nextEnemy - time) / 1000), this.numPaths, this.pathSide)
        this.delay.setText('Next wave in ' + Math.trunc((this.nextEnemy - time) / 1000) + ' Seconds');
        if (time > this.nextEnemy) {
            switch (GV.WAVE) {
                case 1: //Spawn 10 imp
                    if (GV.SPAWNED < 10) {
                        var enemy = GV.ENEMY_GROUP[13].get(GV.ENEMY_ARRAY[13]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.WALKPATH);
                            this.nextEnemy = time + GV.ENEMY_SPAWN_RATE;
                            GV.SPAWNED += 1;
                        }
                    }
                    else if (GV.ENEMY_GROUP[13].countActive(true) === 0) {
                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 2: //10 zombies
                    if (GV.SPAWNED < 10) {
                        enemy = GV.ENEMY_GROUP[14].get(GV.ENEMY_ARRAY[14]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.WALKPATH);
                            this.nextEnemy = time + GV.ENEMY_SPAWN_RATE;
                            GV.SPAWNED += 1;
                        }
                    }
                    else if (GV.ENEMY_GROUP[14].countActive(true) === 0) {
						this.numPaths = 1;
						this.pathSide = 2;
                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 3: //15 reapers
                    if (GV.SPAWNED < 15) {
                        enemy = GV.ENEMY_GROUP[8].get(GV.ENEMY_ARRAY[8]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.WALKPATH2);

                            this.nextEnemy = time + GV.ENEMY_SPAWN_RATE;
                            GV.SPAWNED += 1;
                        }
                    }
                    else if (GV.ENEMY_GROUP[8].countActive(true) === 0) {
						this.numPaths = 1;
						this.pathSide = 1;
                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 4: //10 Dragons
                    if (GV.SPAWNED < 10) {
                        enemy = GV.ENEMY_GROUP[11].get(GV.ENEMY_ARRAY[11]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.FLYPATH);
                            this.nextEnemy = time + GV.ENEMY_SPAWN_RATE;
                            GV.SPAWNED += 1;
                        }
                    }
                    else if (GV.ENEMY_GROUP[11].countActive(true) === 0) {
						this.numPaths = 2;
						this.pathSide = -1;
                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 5: //imp + golem
                    if (GV.SPAWNED < 15) {
                        enemy = GV.ENEMY_GROUP[13].get(GV.ENEMY_ARRAY[13]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.WALKPATH2);
                            this.nextEnemy = time + GV.ENEMY_SPAWN_RATE;
                            GV.SPAWNED += 1;
                        }
                        if (GV.SPAWNED === 7) {
                            enemy = GV.ENEMY_GROUP[12].get(GV.ENEMY_ARRAY[12]);
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.WALKPATH);
                        }
                    }
                    else if (GV.ENEMY_GROUP[13].countActive(true) === 0 && GV.ENEMY_GROUP[7].countActive(true) === 0) {
                        this.numPaths = 1;
						this.pathSide = 2;
						GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 6: //vampire + zombie
                    if (GV.SPAWNED < 20) {
                        if (GV.SPAWNED % 2 === 0) {
                            enemy = GV.ENEMY_GROUP[15].get(GV.ENEMY_ARRAY[15]);
                            if (enemy) {
                                enemy.setActive(true);
                                enemy.setVisible(true);
                                enemy.startOnPath(GV.WALKPATH2);
                                this.nextEnemy = time + 750;
                                GV.SPAWNED += 1;
                            }
                        }
                        else {
                            enemy = GV.ENEMY_GROUP[14].get(GV.ENEMY_ARRAY[14]);
                            if (enemy) {
                                enemy.setActive(true);
                                enemy.setVisible(true);
                                enemy.startOnPath(GV.WALKPATH);
                                this.nextEnemy = time + 350;
                                GV.SPAWNED += 1;
                            }
                        }
                    }
                    else if (GV.ENEMY_GROUP[15].countActive(true) === 0 && GV.ENEMY_GROUP[14].countActive(true) === 0) {
                        this.numPaths = 2;
						this.pathSide = -1;
						GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 7: //Mass imp + reaper
                    if (GV.SPAWNED < 40) {
                        if (GV.SPAWNED % 2 === 0) {
                            enemy = GV.ENEMY_GROUP[13].get(GV.ENEMY_ARRAY[13]);
                            if (enemy) {
                                enemy.setActive(true);
                                enemy.setVisible(true);
                                enemy.startOnPath(GV.WALKPATH2);
                                this.nextEnemy = time + 350;
                                GV.SPAWNED += 1;
                            }
                        }
                        else {
                            enemy = GV.ENEMY_GROUP[8].get(GV.ENEMY_ARRAY[8]);
                            if (enemy) {
                                enemy.setActive(true);
                                enemy.setVisible(true);
                                enemy.startOnPath(GV.WALKPATH);
                                this.nextEnemy = time + 350;
                                GV.SPAWNED += 1;
                            }
                        }
                    }
                    else if (GV.ENEMY_GROUP[13].countActive(true) === 0 && GV.ENEMY_GROUP[8].countActive(true) === 0) {
                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 8: //Dragon, Vampire, Zombie
                    if (GV.SPAWNED < 60) {
                        if (GV.SPAWNED % 3 === 0) {
                            enemy = GV.ENEMY_GROUP[11].get(GV.ENEMY_ARRAY[11]);
                            if (enemy) {
                                enemy.setActive(true);
                                enemy.setVisible(true);
                                enemy.startOnPath(GV.FLYPATH);
                                this.nextEnemy = time + GV.ENEMY_SPAWN_RATE / 3;
                                GV.SPAWNED += 1;
                            }
                        }
                        else if (GV.SPAWNED % 2 === 0) {
                            enemy = GV.ENEMY_GROUP[15].get(GV.ENEMY_ARRAY[15]);
                            if (enemy) {
                                enemy.setActive(true);
                                enemy.setVisible(true);
                                enemy.startOnPath(GV.WALKPATH2);
                                this.nextEnemy = time + GV.ENEMY_SPAWN_RATE / 3;
                                GV.SPAWNED += 1;
                            }
                        }
                        else {
                            enemy = GV.ENEMY_GROUP[14].get(GV.ENEMY_ARRAY[14]);
                            if (enemy) {
                                enemy.setActive(true);
                                enemy.setVisible(true);
                                enemy.startOnPath(GV.WALKPATH);
                                this.nextEnemy = time + GV.ENEMY_SPAWN_RATE / 3;
                                GV.SPAWNED += 1;
                            }
                        }
                    }
                    else if (GV.ENEMY_GROUP[11].countActive(true) === 0 && GV.ENEMY_GROUP[15].countActive(true) === 0 && GV.ENEMY_GROUP[14].countActive(true) === 0) {
                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 9: //Reaper, Golem, Imp
                    if (GV.SPAWNED < 50) {
                        if (GV.SPAWNED % 10 === 0) {
                            enemy = GV.ENEMY_GROUP[12].get(GV.ENEMY_ARRAY[12]);
                            if (enemy) {
                                enemy.setActive(true);
                                enemy.setVisible(true);
                                enemy.startOnPath(GV.WALKPATH);
                                this.nextEnemy = time + GV.ENEMY_SPAWN_RATE / 3;
                                GV.SPAWNED += 1;
                            }
                        }
                        else if (GV.SPAWNED % 2 === 0) {
                            enemy = GV.ENEMY_GROUP[8].get(GV.ENEMY_ARRAY[8]);
                            if (enemy) {
                                enemy.setActive(true);
                                enemy.setVisible(true);
                                enemy.startOnPath(GV.WALKPATH2);
                                this.nextEnemy = time + GV.ENEMY_SPAWN_RATE / 3;
                                GV.SPAWNED += 1;
                            }
                        }
                        else {
                            enemy = GV.ENEMY_GROUP[13].get(GV.ENEMY_ARRAY[13]);
                            if (enemy) {
                                enemy.setActive(true);
                                enemy.setVisible(true);
                                enemy.startOnPath(GV.WALKPATH);
                                this.nextEnemy = time + GV.ENEMY_SPAWN_RATE / 3;
                                GV.SPAWNED += 1;
                            }
                        }
                    }
                    else if (GV.ENEMY_GROUP[12].countActive(true) === 0 && GV.ENEMY_GROUP[13].countActive(true) === 0 && GV.ENEMY_GROUP[8].countActive(true) === 0) {
                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 10: //Mass Dragons
                    if (GV.SPAWNED < 15) {
                        enemy = GV.ENEMY_GROUP[11].get(GV.ENEMY_ARRAY[11]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.FLYPATH);
                            this.nextEnemy = time + 250;
                            GV.SPAWNED += 1;
                        }
                    }
                    else if (GV.SPAWNED < 30) {
                        enemy = GV.ENEMY_GROUP[11].get(GV.ENEMY_ARRAY[11]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.FLYPATH2);
                            this.nextEnemy = time + 250;
                            GV.SPAWNED += 1;
                        }
                    }
                    else if (GV.ENEMY_GROUP[11].countActive(true) === 0) {
						FN.levelVictory(this, CST.SCENES.GAMEVICTORY);
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
