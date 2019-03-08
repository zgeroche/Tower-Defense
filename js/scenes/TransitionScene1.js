import { CST } from "../CST";

export class TransitionScene1 extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.TRANSITION1
        })
    }
    init(data) {
        console.log(data);
    }

    create() {
        //Creating menu screen background layers
        this.cameras.main.fadeFrom(6000, 0, 0, 0, false);
        this.add.image(0, 0, 'transition').setOrigin(0).setDepth(0).setDisplaySize(this.game.renderer.width, this.game.renderer.height).setAlpha(.5);
        this.add.text(this.game.renderer.width / 2 - 400, this.game.renderer.height / 2 - 200,
            'The citizens held off the minions as long as they could, but were eventually overwhelmed and forced to retreat to a more fortifiable area. The king called for everyone to regroup in the armory to put up another fight, only this time they were faced with more powerful monsters...',
            { fontFamily: 'VT323', fontSize: 50, color: '#ffffff', wordWrap: { width: 800, useAdvancedWrap: true } });
        let startGame = this.add.text(this.game.renderer.width - 125, this.game.renderer.height - 40, 'Start ->', { fontFamily: 'VT323', fontSize: 30, color: '#ffffff' }).setDepth(1);

        startGame.setInteractive();
        startGame.on("pointerdown", () => {
            this.scene.start(CST.SCENES.GAME2);
        })

        this.tweens.add({
            targets: startGame, // on the start button
            duration: 500, // for 200ms 
            scaleX: 1.2, // that scale vertically by 20% 
            scaleY: 1.2, // and scale horizontally by 20% 
            alpha: 0.2,
            yoyo: true, // at the end, go back to original scale 
            loop: -1
        });
    }
}