import { CST } from "../CST";

export class IntroScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.INTRO
        })
    }
    init(data) {
        //console.log(data);
    }

    create() {
        //Creating menu screen background layers
		this.cameras.main.fadeIn(3000);
        this.add.image(0, 0, 'introscreen').setOrigin(0).setDepth(0).setDisplaySize(this.game.renderer.width, this.game.renderer.height).setAlpha(.5);
        this.add.text(this.game.renderer.width / 2 - 400, this.game.renderer.height / 2 - 250,
            'In a quiet castle village there lived a king who was loved by his people. He had helped force all enemies back into the darkness many years ago, allowing the citizens to live peaceful lives. Unbeknownst to the king, however, the allies of darkness were preparing an attack to launch at the kingdom! It is up to you to help protect the king and save the kingdom!',
            { fontFamily: 'VT323', fontSize: 50, color: '#ffffff', wordWrap: { width: 800, useAdvancedWrap: true } });
        let startGame = this.add.text(this.game.renderer.width / 2 - 75, this.game.renderer.height - 250, 'Start ->', { fontFamily: 'VT323', fontSize: 30, color: '#ffffff' }).setDepth(1);

		var sceneBGM = this.sound.add('introSceneBGM');
		sceneBGM.volume = 0.2;
		sceneBGM.loop = true;
		sceneBGM.play();
		
		 var start = this.tweens.add({
            targets: startGame, // on the start button
            duration: 500, // for 200ms 
            scaleX: 1.2, // that scale vertically by 20% 
            scaleY: 1.2, // and scale horizontally by 20% 
            alpha: 0.2,
            yoyo: true, // at the end, go back to original scale 
            loop: -1
        });
		
        startGame.setInteractive({ useHandCursor: true }).on("pointerdown", () => {
			var clickSound = this.sound.add('menuClickSound');
			clickSound.volume = 0.05;
			clickSound.loop = false;
			clickSound.play();
			sceneBGM.stop();
			start.stop();
			this.tweens.add({
				targets: startGame, // on the start button
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
				 scene.scene.start(CST.SCENES.GAME);
				
			});
			
           
        })
		
       
    }
}