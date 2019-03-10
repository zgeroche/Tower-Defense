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
        this.add.image(0, 0, 'introscreen').setOrigin(0).setDepth(0).setDisplaySize(this.game.renderer.width, this.game.renderer.height).setAlpha(.5);
        this.add.text(this.game.renderer.width / 2 - 400, this.game.renderer.height / 2 - 200,
            'In a quiet castle village there lived a king who was loved by his people. He had helped force all enemies back into the darkness many years ago, allowing the citizens to live peaceful lives. Unbeknownst to the king, however, the allies of darkness were preparing an attack to launch at the kingdom! It is up to you to help protect the king and save the kingdom!',
            { fontFamily: 'VT323', fontSize: 50, color: '#ffffff', wordWrap: { width: 800, useAdvancedWrap: true } });
        let startGame = this.add.text(this.game.renderer.width - 125, this.game.renderer.height - 40, 'Start ->', { fontFamily: 'VT323', fontSize: 30, color: '#ffffff' }).setDepth(1);

        startGame.setInteractive();
        startGame.on("pointerdown", () => {
            this.scene.start(CST.SCENES.GAME);
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