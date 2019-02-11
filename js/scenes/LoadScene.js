import { CST} from "../CST";

export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }

    preload(){
        this.add.text(230, 230, 'Loading', { font: '50px Arial', fill: '#fff' });
        this.load.atlas('deathknight', './dist/assets/deathknight.png', './dist/assets/deathknight.json');
        this.load.atlas('soldier', './dist/assets/soldier.png', './dist/assets/soldier.json');
        this.load.atlas('peasant', './dist/assets/peasant.png', './dist/assets/peasant.json');

        this.load.image('attack', './dist/assets/coin.png');
        this.load.image('maps', './dist/assets/castle-gates.png', { frameWidth: 640, frameHeight: 512 });

        this.load.audio('dkDeath', './dist/assets/Sounds/Death Screams/Human/sfx_deathscream_human5.wav');
        this.load.audio('hit', './dist/assets/Sounds/General Sounds/Simple Damage Sounds/sfx_damage_hit2.wav');
        this.load.audio('walk', './dist/assets/Sounds/Movement/Footsteps/sfx_movement_footstepsloop4_slow.wav');
        this.load.audio('background', './dist/assets/Sounds/random silly chip song.ogg');
		this.load.audio('upgradeSound', './dist/assets/Sounds/General Sounds/Positive Sounds/sfx_sounds_powerup6.wav');
        this.load.image('menuscreen', './dist/assets/bg.png', { frameWidth: 640, frameHeight: 512 });
        this.load.image('newgame', './dist/assets/new.png');
    }
    create(){
        //Creating menu screen background layers
        this.scene.start(CST.SCENES.MENU, "Loading complete");
        }
}