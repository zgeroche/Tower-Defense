import { CST } from "../CST";

export class TransitionScene1 extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.TRANSITION1
        })
    }
    init(data) {
        //console.log(data);
    }

    create() {
        //Creating menu screen background layers
        this.cameras.main.fadeFrom(6000, 0, 0, 0, false);
        this.add.image(0, 0, 'transition').setOrigin(0).setDepth(0).setDisplaySize(this.game.renderer.width, this.game.renderer.height).setAlpha(.5);
        this.add.text(this.game.renderer.width / 2 - 400, this.game.renderer.height / 2 - 200,
            'The citizens held off the minions as long as they could, but were eventually overwhelmed and forced to retreat to a more fortifiable area. The king called for everyone to regroup in the armory to put up another fight, only this time they were faced with more powerful monsters...',
            { fontFamily: 'VT323', fontSize: 50, color: '#ffffff', wordWrap: { width: 800, useAdvancedWrap: true } });
        let startGame = this.add.text(this.game.renderer.width / 2 - 75, this.game.renderer.height - 300, 'Start ->', { fontFamily: 'VT323', fontSize: 30, color: '#ffffff' }).setDepth(1);

       var sceneBGM = this.sound.add('transScene1BGM');
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
				scene.scene.start(CST.SCENES.GAME2);
				
			});
            
        })

        
    }
}