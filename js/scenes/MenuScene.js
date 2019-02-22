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
   /* preload(){
        this.load.image('menuscreen', 'assets/bg.png', { frameWidth: 640, frameHeight: 512 });
        this.load.image('newgame', 'assets/new.png');
    }*/
    create(){
        //Creating menu screen background layers
        this.add.image(0, 0, 'menuscreen').setOrigin(0).setDepth(0);
        let newGame = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'newgame').setDepth(1);
        console.log("In Menu Scene");

        newGame.setInteractive();
        newGame.on("pointerdown", ()=>{
            this.scene.start(CST.SCENES.GAME);
        })
    }
}
