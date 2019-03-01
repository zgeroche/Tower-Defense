import { CST} from "../CST";

export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }

    preload(){
		this.load.image('HUD', 'assets/HUD.png');
		this.load.image('vol', 'assets/volume.png');
		this.load.image('volDown', 'assets/volDown.png');
		this.load.image('play', 'assets/play.png');
		this.load.image('playDown', 'assets/playDown.png');
		this.add.text(230, 230, 'Loading', { font: '50px Arial', fill: '#fff' });
        this.load.atlas('deathknight', 'assets/deathknight.png', 'assets/deathknight.json');
        this.load.atlas('soldier', 'assets/soldier.png', 'assets/soldier.json');
        this.load.atlas('peasant', 'assets/peasant.png', 'assets/peasant.json');
        this.load.atlas('archer', 'assets/archer.png', 'assets/archer.json');
		this.load.image('placeholder', 'assets/placeholder.png');
		
		//load enemy sprites, will be a loop like load tower sprites
        this.load.atlas('deathknight', 'assets/deathknight.png', 'assets/deathknight.json');
        this.load.atlas('skeleton', 'assets/skeleton.png', 'assets/skeleton.json');
        this.load.atlas('bat', 'assets/bat.png', 'assets/bat.json');
        this.load.atlas('ogre', 'assets/ogre.png', 'assets/ogre.json');
        this.load.atlas('goblin', 'assets/goblin.png', 'assets/goblin.json');
        this.load.atlas('bossskeleton', 'assets/bossskeleton.png', 'assets/bossskeleton.json');
        this.load.atlas('reaper', 'assets/reaper.png', 'assets/reaper.json');
        this.load.atlas('witch', 'assets/witch.png', 'assets/witch.json');
        this.load.atlas('ghost', 'assets/ghost.png', 'assets/ghost.json');
        this.load.atlas('jacko', 'assets/jacko.png', 'assets/jacko.json');
        this.load.atlas('horseman', 'assets/horseman.png', 'assets/horseman.json');
		
		//load map
		//this.load.image('map', 'assets/castle-gates.png', { frameWidth: 640, frameHeight: 512 });
		this.load.image('map', 'assets/castle gates - big.png', { frameWidth: 1920, frameHeight: 1024 });
		this.load.image('map2', 'assets/armory.png', { frameWidth: 640, frameHeight: 512 });
		
		//load sounds
		this.load.audio('dkDeath', 'assets/Sounds/Death Screams/Human/sfx_deathscream_human5.wav');
		this.load.audio('hit', 'assets/Sounds/General Sounds/Simple Damage Sounds/sfx_damage_hit2.wav');
		this.load.audio('walk', 'assets/Sounds/Movement/Footsteps/sfx_movement_footstepsloop4_slow.wav');
		this.load.audio('background', 'assets/Sounds/random silly chip song.ogg');
		this.load.audio('upgradeSound', 'assets/Sounds/General Sounds/Positive Sounds/sfx_sounds_powerup6.wav');
		this.load.audio('explosionSound', 'assets/Sounds/Explosions/Short/sfx_exp_short_hard2.wav');
		
		//load misc
		this.load.image('towerbutton', './assets/buttons/blackbox.png');
		this.load.image('placetowerbutton', './assets/buttons/placetower.png');
		this.load.image('removetowerbutton', './assets/buttons/removetower.png');
		this.load.image('upgradetowerbutton', './assets/buttons/upgradetower.png');
		this.load.image('soldierbutton', './assets/buttons/Soldier.png');
		this.load.image('archerbutton', './assets/buttons/Archer.png');
		this.load.image('apprenticebutton', './assets/buttons/Apprentice.png');
		this.load.image('knightbutton', './assets/buttons/Knight.png');
		this.load.image('duelistbutton', './assets/buttons/Duelist.png');
		this.load.image('riflemanbutton', './assets/buttons/Rifleman.png');
		this.load.image('rangerbutton', './assets/buttons/Ranger.png');
		this.load.image('wizardbutton', './assets/buttons/Wizard.png');
		this.load.image('sorceressbutton', './assets/buttons/Sorceress.png');
		this.load.image('commanderbutton', './assets/buttons/Commander.png');
		this.load.image('paladinbutton', './assets/buttons/Paladin.png');
		this.load.image('swordmasterbutton', './assets/buttons/Swordmaster.png');
		this.load.image('cutpursebutton', './assets/buttons/Cutpurse.png');
		this.load.image('cannoneerbutton', './assets/buttons/Cannoneer.png');
		this.load.image('sharpshooterbutton', './assets/buttons/Sharpshooter.png');
		this.load.image('beastmasterbutton', './assets/buttons/Beastmaster.png');
		this.load.image('assassinbutton', './assets/buttons/Assassin.png');
		this.load.image('firemagebutton', './assets/buttons/FireMage.png');
		this.load.image('icemagebutton', './assets/buttons/IceMage.png');
		this.load.image('lightningmagebutton', './assets/buttons/LightningMage.png');
		this.load.image('warlockbutton', './assets/buttons/Warlock.png');
		this.load.image('priestessbutton', './assets/buttons/Priestess.png');
		this.load.image('attack', 'assets/coin.png');
		this.load.image('highlight', 'assets/blue.png');
		this.load.image('explosion', 'assets/muzzleflash3.png');
		this.load.image('menuscreen', 'assets/bg.png', { frameWidth: 1280, frameHeight: 1024 });
        this.load.image('newgame', 'assets/new.png');
    }
    create(){
        //Creating menu screen background layers

        this.scene.start(CST.SCENES.MENU, "Loading complete");
        }
}