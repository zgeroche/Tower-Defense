import { CST} from "../CST";

export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }

    preload(){
        this.load.atlas('deathknight', './assets/deathknight.png', 'assets/deathknight.json');
        this.load.atlas('soldier', './assets/goldenarmor.png', 'assets/goldenarmor.json');
        this.load.atlas('peasant', './assets/peasant.png', 'assets/peasant.json');
		//load enemy sprites, will be a loop like load tower sprites
		this.load.atlas('deathknight', 'assets/deathknight.png', 'assets/deathknight.json');
		
		//load map
		this.load.image('map', 'assets/castle-gates.png', { frameWidth: 640, frameHeight: 512 });
		
		//load sounds
		this.load.audio('dkDeath', 'assets/Sounds/Death Screams/Human/sfx_deathscream_human5.wav');
		this.load.audio('hit', 'assets/Sounds/General Sounds/Simple Damage Sounds/sfx_damage_hit2.wav');
		this.load.audio('walk', 'assets/Sounds/Movement/Footsteps/sfx_movement_footstepsloop4_slow.wav');
		this.load.audio('background', 'assets/Sounds/random silly chip song.ogg');
		this.load.audio('upgradeSound', 'assets/Sounds/General Sounds/Positive Sounds/sfx_sounds_powerup6.wav');
		
		//load misc
		this.load.image('attack', 'assets/coin.png');
		this.load.image('menuscreen', './assets/bg.png', { frameWidth: 640, frameHeight: 512 });
        this.load.image('newgame', './assets/new.png');
    }
    create(){
        //Creating menu screen background layers
        this.scene.start(CST.SCENES.MENU, "Loading complete");
        }
}