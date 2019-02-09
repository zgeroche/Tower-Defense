import { CST} from "../CST";

export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }

    preload(){
        this.load.atlas('deathknight', './dist/assets/deathknight.png', './dist/assets/deathknight.json');
        this.load.atlas('solider', './assets/solider.png', './dist/assets/solider.json');
        this.load.atlas('peasant', './dist/assets/peasant.png', './dist/assets/peasant.json');
        this.load.spritesheet('bard', './dist/assets/bard.png', { frameWidth: 52, frameHeight: 75});
        this.load.image('attack', './dist/assets/coin.png');
        this.load.image('map', './dist/assets/castle-gates.png', { frameWidth: 640, frameHeight: 512 });
        this.load.audio('dkDeath', './dist/assets/Sounds/Death Screams/Human/sfx_deathscream_human5.wav');
        this.load.audio('hit', './dist/assets/Sounds/General Sounds/Simple Damage Sounds/sfx_damage_hit2.wav');
        this.load.audio('walk', './dist/assets/Sounds/Movement/Footsteps/sfx_movement_footstepsloop4_slow.wav');
        this.load.audio('background', './dist/assets/Sounds/random silly chip song.ogg');
		this.load.audio('upgradeSound', './dist/dist/assets/Sounds/General Sounds/Positive Sounds/sfx_sounds_powerup6.wav');
        this.load.image('menuscreen', './dist/assets/bg.png', { frameWidth: 640, frameHeight: 512 });
        this.load.image('newgame', './dist/assets/new.png');
    }
    create(){
        //Creating menu screen background layers
        this.scene.start(CST.SCENES.MENU, "Loading complete");
        }
}