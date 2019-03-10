import { CST} from "../CST";
var GV = require('./Globals.js');

export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }

    preload(){
		//load towers from file. Tower files are named by tower ids
 		for(var i = 0; i < 23; i++) {
			var str = i.toString();
			var loader = 'assets/towers/json/'+str+'.json';
			var key = str+"_towers";
			this.load.json(key, loader);
		} 
		
		//load enemies from file. Enemy files are named by enemy ids
		for(var i = 0; i < 18; i++) {
			var str = i.toString();
			var loader = 'assets/Enemies/json/'+str+'.json';
			var key = str+"_enemies";
			this.load.json(key, loader);
		} 
		
		this.load.image('HUD', 'assets/HUD.png');
		this.load.image('vol', 'assets/volume.png');
		this.load.image('volDown', 'assets/volDown.png');
		this.load.image('play', 'assets/play.png');
		this.load.image('playDown', 'assets/playDown.png');
		this.add.text(960, 512, 'Loading', { font: '50px Arial', fill: '#fff' }).setOrigin(0.5);
		 
        this.load.atlas('apprentice', 'assets/towers/apprentice.png', 'assets/towers/towers.json');
		this.load.atlas('archer', 'assets/towers/archer.png', 'assets/towers/towers.json');
		this.load.atlas('assassin', 'assets/towers/assassin.png', 'assets/towers/towers.json');
		this.load.atlas('beastmaster', 'assets/towers/beastmaster.png', 'assets/towers/towers.json');
		this.load.atlas('cannoneer', 'assets/towers/cannoneer.png', 'assets/towers/towers.json');
        this.load.atlas('commander', 'assets/towers/commander.png', 'assets/towers/towers.json');
        this.load.atlas('cutpurse', 'assets/towers/cutpurse.png', 'assets/towers/towers.json');
        this.load.atlas('duelist', 'assets/towers/duelist.png', 'assets/towers/towers.json');
        this.load.atlas('firemage', 'assets/towers/firemage.png', 'assets/towers/towers.json');
		this.load.atlas('priestess', 'assets/towers/highpriestess.png', 'assets/towers/towers.json');
		this.load.atlas('icemage', 'assets/towers/icemage.png', 'assets/towers/towers.json');
        this.load.atlas('knight', 'assets/towers/knight.png', 'assets/towers/towers.json');
        this.load.atlas('lightningmage', 'assets/towers/lightningmage.png', 'assets/towers/towers.json');
        this.load.atlas('paladin', 'assets/towers/paladin.png', 'assets/towers/towers.json');
		this.load.atlas('peasant', 'assets/towers/peasant.png', 'assets/towers/towers.json');
		this.load.image('placeholder', 'assets/towers/placeholder.png');
		this.load.atlas('ranger', 'assets/towers/ranger.png', 'assets/towers/towers.json');
        this.load.atlas('rifleman', 'assets/towers/rifleman.png', 'assets/towers/towers.json');
        this.load.atlas('sharpshooter', 'assets/towers/sharpshooter.png', 'assets/towers/towers.json');
		this.load.atlas('soldier', 'assets/towers/soldier.png', 'assets/towers/towers.json');
		this.load.atlas('sorceress', 'assets/towers/sorceress.png', 'assets/towers/towers.json');
		this.load.atlas('swordmaster', 'assets/towers/swordmaster.png', 'assets/towers/towers.json');
		this.load.atlas('warlock', 'assets/towers/warlock.png', 'assets/towers/towers.json');
        this.load.atlas('wizard', 'assets/towers/wizard.png', 'assets/towers/towers.json');
        this.load.atlas('headhunter', 'assets/towers/headhunter.png', 'assets/towers/towers.json');
        this.load.atlas('berserker', 'assets/towers/berserker.png', 'assets/towers/towers.json');

		//load enemy sprites, will be a loop like load tower sprites
        this.load.atlas('deathknight', 'assets/Enemies/deathknight.png', 'assets/Enemies/deathknight.json');
        this.load.atlas('skeleton', 'assets/Enemies/skeleton.png', 'assets/Enemies/skeleton.json');
        this.load.atlas('bat', 'assets/Enemies/bat.png', 'assets/Enemies/bat.json');
        this.load.atlas('ogre', 'assets/Enemies/ogre.png', 'assets/Enemies/ogre.json');
        this.load.atlas('goblin', 'assets/Enemies/goblin.png', 'assets/Enemies/goblin.json');
        this.load.atlas('bossskeleton', 'assets/Enemies/bossskeleton.png', 'assets/Enemies/bossskeleton.json');
        this.load.atlas('reaper', 'assets/Enemies/reaper.png', 'assets/Enemies/reaper.json');
        this.load.atlas('witch', 'assets/Enemies/witch.png', 'assets/Enemies/witch.json');
        this.load.atlas('ghost', 'assets/Enemies/ghost.png', 'assets/Enemies/ghost.json');
        this.load.atlas('jacko', 'assets/Enemies/jacko.png', 'assets/Enemies/jacko.json');
        this.load.atlas('horseman', 'assets/Enemies/horseman.png', 'assets/Enemies/horseman.json');
        this.load.atlas('dragon', 'assets/Enemies/dragon.png', 'assets/Enemies/dragon.json');
        this.load.atlas('golem', 'assets/Enemies/golem.png', 'assets/Enemies/golem.json');
        this.load.atlas('imp', 'assets/Enemies/imp.png', 'assets/Enemies/imp.json');
        this.load.atlas('minotaur', 'assets/Enemies/minotaur.png', 'assets/Enemies/minotaur.json');
        this.load.atlas('slime', 'assets/Enemies/slime.png', 'assets/Enemies/slime.json');
        this.load.atlas('vampire', 'assets/Enemies/vampire.png', 'assets/Enemies/vampire.json');
        this.load.atlas('zombie', 'assets/Enemies/zombie.png', 'assets/Enemies/zombie.json');
		
		//load map
		this.load.image('map', 'assets/castle gates - big.png', { frameWidth: 1920, frameHeight: 1024 });
		this.load.image('map2', 'assets/armory - big.png', { frameWidth: 1920, frameHeight: 1024 });
		this.load.image('map3', 'assets/throne - big.png', { frameWidth: 1920, frameHeight: 1024 });
		
		//load sounds
		this.load.audio('dkDeath', 'assets/Sounds/Death Screams/Human/sfx_deathscream_human5.wav');
		this.load.audio('hit', 'assets/Sounds/General Sounds/Simple Damage Sounds/sfx_damage_hit2.wav');
		this.load.audio('walk', 'assets/Sounds/Movement/Footsteps/sfx_movement_footstepsloop4_slow.wav');
		//this.load.audio('background', 'assets/Sounds/bgm/random silly chip song.ogg');
		this.load.audio('upgradeSound', 'assets/Sounds/00031.wav');
		//this.load.audio('upgradeSound', 'assets/Sounds/General Sounds/Positive Sounds/sfx_sounds_powerup6.wav');
		this.load.audio('explosionSound', 'assets/Sounds/Explosions/Short/sfx_exp_short_hard2.wav');
		this.load.audio('menuSounds', 'assets/Sounds/Other/FFmenu.wav');
		this.load.audio('mapSounds', 'assets/Sounds/Other/00029.wav');
		this.load.audio('errorSounds', 'assets/Sounds/Other/Cursor No.wav');
		this.load.audio('cancelSounds', 'assets/Sounds/Other/Cursor Cancel.wav');

		this.load.audio('stunSound', 'assets/Sounds/General Sounds/Negative Sounds/sfx_sounds_damage1.wav');
		this.load.audio('slowSound', 'assets/Sounds/General Sounds/Interactions/sfx_sounds_interaction10.wav');
		this.load.audio('ministunSound', 'assets/Sounds/General Sounds/Negative Sounds/sfx_sounds_error2.wav');
		this.load.audio('weakenSound', 'assets/Sounds/General Sounds/Interactions/sfx_sounds_interaction26.wav');
		this.load.audio('extragold', 'assets/Sounds/General Sounds/Coins/sfx_coin_double3.wav');

		//this.load.audio('sword', 'assets/Sounds/7.wav');
		
		this.load.audio('rifleSound', 'assets/Sounds/TowerAttackSounds/pistol.wav');
		this.load.audio('gunSound', 'assets/Sounds/TowerAttackSounds/rifle.wav');
		this.load.audio('swingSound', 'assets/Sounds/TowerAttackSounds/swing3.wav');
		this.load.audio('cannonSound', 'assets/Sounds/TowerAttackSounds/explosion-1.wav');
		this.load.audio('arrowSound', 'assets/Sounds/TowerAttackSounds/arrow.wav');
		//this.load.audio('fireSound', 'assets/Sounds/TowerAttackSounds/foom_0.wav');
		this.load.audio('fireSound', 'assets/Sounds/TowerAttackSounds/fire.wav');
		this.load.audio('lightningSound', 'assets/Sounds/TowerAttackSounds/lightning.wav');
		this.load.audio('spearSound', 'assets/Sounds/TowerAttackSounds/spear.wav');
		this.load.audio('spellSound', 'assets/Sounds/TowerAttackSounds/spell.wav');
		this.load.audio('spell2Sound', 'assets/Sounds/TowerAttackSounds/Wind effects 5.wav');
		this.load.audio('iceSound', 'assets/Sounds/TowerAttackSounds/Ice attack 2.wav');
		
		this.load.audio('itemClickSound', 'assets/Sounds/Other/Item2A.wav');
		this.load.audio('menuClickSound', 'assets/Sounds/Other/Menu2A.wav');
		this.load.audio('menuBGM', 'assets/Sounds/bgm/menu.mp3');
		this.load.audio('castlegates', 'assets/Sounds/bgm/castlegates.wav');
		this.load.audio('armory', 'assets/Sounds/bgm/armory.mp3');
		this.load.audio('throneroom', 'assets/Sounds/bgm/throneroom.wav');
		this.load.audio('introSceneBGM', 'assets/Sounds/bgm/snow_about_a_castle.mp3');
		this.load.audio('transScene1BGM', 'assets/Sounds/bgm/Classical Murder.ogg');
		this.load.audio('transScene2BGM', 'assets/Sounds/bgm/Uncatchable.mp3');

		
		//load misc
		this.load.image('tomato', 'assets/attacks/Tomato.png');
		this.load.image('arrow', 'assets/attacks/Arrow.png');
		this.load.image('sword', 'assets/attacks/Sword.png');
		this.load.image('curvedsword', 'assets/attacks/CurvedSword.png');
		this.load.image('bigsword', 'assets/attacks/BigSword.png');
		this.load.image('spear', 'assets/attacks/Spear.png');
		this.load.image('axe', 'assets/attacks/Axe.png');
		this.load.image('blacksword', 'assets/attacks/BlackSword.png');
		this.load.image('knife', 'assets/attacks/Knife.png');
		this.load.image('goldbullet', 'assets/attacks/GoldBullet.png');
		this.load.image('whitemagic', 'assets/attacks/WhiteMagic.png');
		this.load.image('bluemagic', 'assets/attacks/BlueMagic.png');
		this.load.image('pinkmagic', 'assets/attacks/PinkMagic.png');
		this.load.image('purplemagic', 'assets/attacks/PurpleMagic.png');
		this.load.image('greenmagic', 'assets/attacks/GreenMagic.png');
		this.load.image('silverbullet', 'assets/attacks/SilverBullet.png');
		this.load.image('cannonball', 'assets/attacks/Cannonball.png');
		this.load.image('crow', 'assets/attacks/Crow.png');
		this.load.image('fireball', 'assets/attacks/Fireball.png');
		this.load.image('lightning', 'assets/attacks/Lightning.png');
		this.load.image('icicle', 'assets/attacks/Icicle.png');
		this.load.image('coin', 'assets/attacks/coin.png');
		this.load.image('highlight', 'assets/blue.png');
		this.load.image('explosion', 'assets/muzzleflash3.png');
        //this.load.image('menuscreen', 'assets/bg.png', { frameWidth: 1920, frameHeight: 1024 });
		
        this.load.image('menuscreenA', 'assets/menuBG.png', { frameWidth: 1920, frameHeight: 1024 });
        this.load.image('menuscreenB', 'assets/menuMountainFar.png', { frameWidth: 1920, frameHeight: 1024 });
        this.load.image('menuscreenC', 'assets/menuMountainClose.png', { frameWidth: 1920, frameHeight: 1024 });
        this.load.image('menuscreenD', 'assets/menuTreesFar.png', { frameWidth: 1920, frameHeight: 1024 });
        this.load.image('menuscreenE', 'assets/menuTreesClose.png', { frameWidth: 1920, frameHeight: 1024 });
        this.load.image('menuscreenF', 'assets/menuCloud.png', { frameWidth: 1920, frameHeight: 1024 });
		
        this.load.image('introscreen', 'assets/fortress.png', { frameWidth: 1920, frameHeight: 1024 });
        this.load.image('transition', 'assets/gate.png', { frameWidth: 1920, frameHeight: 1024 });
		this.load.image('newgame', 'assets/new.png');
        this.load.image('bottomHUD', 'assets/BottomHUD.png');
        this.load.image('waveHUD', 'assets/waveHUD.png');
        this.load.image('towerbutton', 'assets/menuBar.png');
        this.load.image('cancel', 'assets/cancel.png');
        this.load.image('towerButtonBG', 'assets/towerButtonBG.png');
		
        this.load.image('snowflake', 'assets/snowflake.png');
        this.load.image('shock', 'assets/shock.png');
        this.load.image('confuse', 'assets/star.png');
    }
    create(){
        //Creating menu screen background layers
        this.scene.start(CST.SCENES.MENU, "Loading complete");
        }
}