import { CST} from "../CST";

export class GameVictoryScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.GAMEVICTORY
        })
    }
    init(data){
        //console.log(data);
    }

    preload(){
       
    }

    create(){
        this.cameras.main.fadeFrom(6000, 0, 0, 0, false);
        this.add.image(0, 0, 'gameVictoryBG').setOrigin(0).setDepth(0).setDisplaySize(this.game.renderer.width, this.game.renderer.height).setAlpha(.5);
        this.add.text(this.game.renderer.width / 2 - 400, this.game.renderer.height / 2 - 300,
            'With the King\'s leadership, the citizens were able to band together and defend their kingdom. The final onslaught of minions was defeated, and there was peace throughout the realm once again. Praise and honor was bestowed upon those who arose to the call of duty as a giant feast was thrown in their honor. The citizens could once again sleep peacefully, for now...',
            { fontFamily: 'VT323', fontSize: 50, color: '#ffffff', wordWrap: { width: 800, useAdvancedWrap: true } });
        let finishGame = this.add.text(this.game.renderer.width / 2 - 75, this.game.renderer.height - 250, 'End', { fontFamily: 'VT323', fontSize: 30, color: '#ffffff' }).setDepth(1);
		
		var sceneBGM = this.sound.add('gameVictoryBGM');
		sceneBGM.volume = 0.05;
		sceneBGM.loop = true;
		sceneBGM.play();
		
		
        var start = this.tweens.add({
            targets: finishGame, // on the start button
            duration: 500, // for 200ms 
            scaleX: 1.2, // that scale vertically by 20% 
            scaleY: 1.2, // and scale horizontally by 20% 
            alpha: 0.2,
            yoyo: true, // at the end, go back to original scale 
            loop: -1
        });
		
        finishGame.setInteractive({ useHandCursor: true }).on("pointerdown", () => {
            var clickSound = this.sound.add('menuClickSound');
			clickSound.volume = 0.05;
			clickSound.loop = false;
			clickSound.play();
			sceneBGM.stop();
			start.stop();
			this.tweens.add({
				targets: finishGame, // on the start button
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
				scene.scene.start(CST.SCENES.MENU);
				
			});
        });
    }
}