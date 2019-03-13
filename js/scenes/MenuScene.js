import { CST} from "../CST";

export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }
    init(data){
        console.log(data);
    }

    create(){
        //Creating menu screen background layers
        //this.add.image(0, 0, 'menuscreen').setOrigin(0).setDepth(0);
		
		this.image0 = this.add.tileSprite(0, 0, 1920, 1024, 'menuscreenA').setOrigin(0).setDepth(0);
		this.image5 = this.add.tileSprite(0, 0, 1920, 1024, 'menuscreenF').setOrigin(0).setDepth(1);
		this.image1 = this.add.tileSprite(0, 0, 1920, 1024, 'menuscreenB').setOrigin(0).setDepth(2);
		this.image2 = this.add.tileSprite(0, 0, 1920, 1024, 'menuscreenC').setOrigin(0).setDepth(3);
		this.image3 = this.add.tileSprite(0, 0, 1920, 1024, 'menuscreenD').setOrigin(0).setDepth(4);
        this.image4 = this.add.tileSprite(0, 0, 1920, 1024, 'menuscreenE').setOrigin(0).setDepth(5);

		
		//this.add.image(0, 0, 'menuscreen').setOrigin(0).setDepth(0).setDisplaySize(this.game.renderer.width, this.game.renderer.height).setAlpha(.5);
        let newGame = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'newgame').setDepth(6);
        console.log("In Menu Scene");
		
		var menuSound = this.sound.add('menuBGM');
		menuSound.volume = 0.2;
		menuSound.loop = true;
		menuSound.play();
		
        newGame.setInteractive({ useHandCursor: true }).on("pointerdown", () => {
			var clickSound = this.sound.add('itemClickSound');
			clickSound.volume = 0.4;
			clickSound.loop = false;
			clickSound.play();
			menuSound.stop();
			this.tweens.add({
				targets: newGame, // on the start button
				duration: 1000, // for 200ms 
				scaleX: 1.5, // that scale vertically by 20% 
				scaleY: 1.5, // and scale horizontally by 20% 
				alpha: 0,
				yoyo: false, // at the end, go back to original scale 
				loop: 0
			});
			this.cameras.main.fadeOut(2000);
			var scene = this;
			this.cameras.main.once('camerafadeoutcomplete', function (camera) {
				scene.scene.start(CST.SCENES.INTRO);
				
			});
			
            
        });
		
		 
    }
	update()
	{
		this.image5.tilePositionX +=0.10;
		this.image1.tilePositionX +=0.125;
		this.image2.tilePositionX +=0.25;
		this.image3.tilePositionX +=0.5;
		this.image4.tilePositionX +=1;
		
	}
}
