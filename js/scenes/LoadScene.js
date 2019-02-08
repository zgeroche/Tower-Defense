import { CST} from "../CST";

export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }

    preload(){
        this.load.atlas('deathknight', './assets/deathknight.png', 'assets/deathknight.json');
        this.load.atlas('goldenarmor', './assets/goldenarmor.png', 'assets/goldenarmor.json');
        this.load.atlas('peasant', './assets/peasant.png', 'assets/peasant.json');
        this.load.spritesheet('bard', './assets/bard.png', { frameWidth: 52, frameHeight: 75});
        this.load.image('attack', './assets/coin.png');
        this.load.image('map', './assets/castle-gates.png', { frameWidth: 640, frameHeight: 512 });
        this.load.audio('dkDeath', './assets/Sounds/Death Screams/Human/sfx_deathscream_human5.wav');
        this.load.audio('hit', './assets/Sounds/General Sounds/Simple Damage Sounds/sfx_damage_hit2.wav');
        this.load.audio('walk', './assets/Sounds/Movement/Footsteps/sfx_movement_footstepsloop4_slow.wav');
        this.load.audio('background', './assets/Sounds/random silly chip song.ogg');

        this.load.image('menuscreen', './assets/bg.png', { frameWidth: 640, frameHeight: 512 });
        this.load.image('newgame', './assets/new.png');
    }
    create(){
        //Creating menu screen background layers
        this.scene.start(CST.SCENES.MENU, "Loading complete");
        }
}