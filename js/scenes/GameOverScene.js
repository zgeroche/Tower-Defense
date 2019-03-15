import { CST} from "../CST";
var GV = require('./Globals.js');	

export class GameOverScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.GAMEOVER
        })
    }
    init(data){
        //console.log(data);
		this.currLevel = this.scene.get(GV.scene);
    }

    preload(){
        this.add.text(this.cameras.main.width/2, this.cameras.main.height/2, 'GAME OVER', {fontFamily: 'VT323', fontSize: 50, color: '#fff', alight: 'center'}).setOrigin(0.5);
    }

    create(){
        //Creating Game Over Scene
        this.cameras.main.fadeFrom(2500, 0, 0, 0, false);
		
		var sceneBGM = this.sound.add('gameoverBGM');
		sceneBGM.volume = 0.2;
		sceneBGM.loop = true;
		sceneBGM.play();
        
        let mainMenu = this.add.text(this.cameras.main.width/2, this.cameras.main.height/2 + 125, 'Return To Main Menu', {fontFamily: 'VT323', fontSize: 25, color: '#ffffff', align: 'center'}).setOrigin(0.5);
        let retry = this.add.text(this.cameras.main.width/2, this.cameras.main.height/2 + 75, 'Retry Level', {fontFamily: 'VT323', fontSize: 25, color: '#ffffff', align: 'center'}).setOrigin(0.5);
		
		retry.setInteractive({ useHandCursor: true }).on("pointerdown", () => {
			var clickSound = this.sound.add('menuClickSound');
			clickSound.volume = 0.05;
			clickSound.loop = false;
			clickSound.play();
			sceneBGM.stop();
			this.tweens.add({
				targets: retry, // on the start button
				duration: 500, // for 200ms 
				scaleX: 2, // that scale vertically by 20% 
				scaleY: 2, // and scale horizontally by 20% 
				alpha: 0,
				yoyo: false, // at the end, go back to original scale 
				loop: 0
			});
			this.cameras.main.fadeOut(2000);
			var scene = this;
			this.cameras.main.once('camerafadeoutcomplete', function (camera) {
				scene.scene.start(scene.currLevel, "restart");
				
			});
            
        });
	   
	   
		mainMenu.setInteractive({ useHandCursor: true }).on("pointerdown", () => {
			var clickSound = this.sound.add('menuClickSound');
			clickSound.volume = 0.05;
			clickSound.loop = false;
			clickSound.play();
			sceneBGM.stop();
			this.tweens.add({
				targets: mainMenu, // on the start button
				duration: 500, // for 200ms 
				scaleX: 2, // that scale vertically by 20% 
				scaleY: 2, // and scale horizontally by 20% 
				alpha: 0,
				yoyo: false, // at the end, go back to original scale 
				loop: 0
			});
			this.cameras.main.fadeOut(2000);
			var scene = this;
			this.cameras.main.once('camerafadeoutcomplete', function (camera) {
				scene.scene.start(CST.SCENES.MENU, "Starting New Game");
				
			});
            
        });
    }
}