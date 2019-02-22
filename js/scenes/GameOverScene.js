import { CST} from "../CST";

export class GameOverScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.GAMEOVER
        })
    }
    init(data){
        //console.log(data);
    }

    preload(){
        this.add.text(this.cameras.main.width/2, this.cameras.main.height/2, 'GAME OVER', {fontFamily: 'VT323', fontSize: 50, color: '#fff', alight: 'center'}).setOrigin(0.5);
    }

    create(){
        //Creating Game Over Scene
        this.cameras.main.fadeFrom(2500, 0, 0, 0, false);
        
        let mainMenu = this.add.text(this.cameras.main.width/2, this.cameras.main.height/2 + 75, 'Return To Main Menu', {fontFamily: 'VT323', fontSize: 25, color: '#ffffff', align: 'center'}).setOrigin(0.5);
        mainMenu.setInteractive();
        mainMenu.on("pointerdown", ()=>{
            this.scene.start(CST.SCENES.MENU, "Starting New Game");
        })
    }
}