import {MenuScene} from "./scenes/MenuScene";
import {GameScene} from "./scenes/GameScene";
import {GameScene2} from "./scenes/GameScene2";
import {LoadScene} from "./scenes/LoadScene";
import {GameOverScene} from "./scenes/GameOverScene";

//-------------------------------------------------------SETUP-----------------------------------------------------
//master config for game

var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 640,
    height: 512,
    //resolution: window.devicePixelRatio,
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
		GameScene2,
        GameOverScene]

};

//begin game
var game = new Phaser.Game(config);

