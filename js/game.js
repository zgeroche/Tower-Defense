import { MenuScene } from "./scenes/MenuScene";
import { IntroScene } from "./scenes/IntroScene";
import {GameScene} from "./scenes/GameScene";
import {GameScene2} from "./scenes/GameScene2";
import {GameScene3} from "./scenes/GameScene3";
import {LoadScene} from "./scenes/LoadScene";
import { GameOverScene } from "./scenes/GameOverScene";
import { TransitionScene1 } from "./scenes/TransitionScene1";
import { TransitionScene2 } from "./scenes/TransitionScene2";

//-------------------------------------------------------SETUP-----------------------------------------------------
//master config for game

var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 1920,
    height: 1024,
    physics: {
        default: 'arcade'
    },
    render:{
        pixelArt: true
    },
    scene: [
        LoadScene,
        MenuScene,
        IntroScene,
        GameScene,
        TransitionScene1,
        GameScene2,
        TransitionScene2,
		GameScene3,
        GameOverScene]

};

//begin game
var game = new Phaser.Game(config);
 resize();
window.addEventListener("resize", resize, false);

function resize() {
    var canvas = document.querySelector("Canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth/windowHeight;
    var gameRatio = game.config.width/game.config.height;
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth/gameRatio) + "px";
    }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
} 