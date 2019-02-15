import {MenuScene} from "./scenes/MenuScene";
import {GameScene} from "./scenes/GameScene";
import {LoadScene} from "./scenes/LoadScene";
import {Globals} from "./scenes/Globals";

//-------------------------------------------------------SETUP-----------------------------------------------------
//master config for game

var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 640,
    height: 512,
    physics: {
        default: 'arcade'
    },
    render:{
        pixelArt: true
    },
    scene: [
        LoadScene,
        MenuScene,
        GameScene,
		Globals]

};

//begin game
var game = new Phaser.Game(config);

