// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js/CST.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CST = void 0;
var CST = {
  SCENES: {
    LOAD: "LOAD",
    MENU: "MENU",
    GAME: "GAME"
  }
};
exports.CST = CST;
},{}],"js/scenes/MenuScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuScene = void 0;

var _CST = require("../CST");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MenuScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(MenuScene, _Phaser$Scene);

  function MenuScene() {
    _classCallCheck(this, MenuScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(MenuScene).call(this, {
      key: _CST.CST.SCENES.MENU
    }));
  }

  _createClass(MenuScene, [{
    key: "init",
    value: function init(data) {
      console.log(data);
    }
    /* preload(){
         this.load.image('menuscreen', 'assets/bg.png', { frameWidth: 640, frameHeight: 512 });
         this.load.image('newgame', 'assets/new.png');
     }*/

  }, {
    key: "create",
    value: function create() {
      var _this = this;

      //Creating menu screen background layers
      this.add.image(0, 0, 'menuscreen').setOrigin(0).setDepth(0);
      var newGame = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'newgame').setDepth(1);
      console.log("In Menu Scene");
      newGame.setInteractive();
      newGame.on("pointerdown", function () {
        _this.scene.start(_CST.CST.SCENES.GAME, "Starting New Game");
      });
    }
  }]);

  return MenuScene;
}(Phaser.Scene);

exports.MenuScene = MenuScene;
},{"../CST":"js/CST.js"}],"js/scenes/GameScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameScene = void 0;

var _CST = require("../CST");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

//import {Enemy} from "../Enemy";
//import {GlobalVariables} from "../GlobalVariables";
//--------------------------------------------------GLOBAL VARIABLES-------------------------------------------
var path;
var TOWER_GROUP = [];
var ENEMY_GROUP;
var ATTACKS_GROUP;
var THIS_SCENE;
var ENEMY_SPEED = 1 / 10000; //var ENEMY_SPEED = 1/Math.floor((Math.random() * 10000) + 10000);

var ENEMY_HP = 1000;
var ENEMY_SPAWN_RATE = 2000; //var ENEMY_SPAWN_RATE = Math.floor((Math.random() * 1000) + 1000);

var ATTACK_DAMAGE = 50;
var TOWER_FIRE_RATE = 300; //stats for each tower type loaded from file rather than defined here, but for now do this
//objects to hold sounds and animation information as well?

var peasantStats = {
  towerId: 0,
  towerName: "Peasant",
  upgrade: true,
  str: 5,
  atkRange: "short",
  atkType: "physical",
  atkRate: "slow",
  hitfly: false
};
var soldierStats = {
  towerId: 1,
  towerName: "Soldier",
  upgrade: true,
  str: 10,
  atkRange: "short",
  atkType: "physical",
  atkRate: "medium",
  hitfly: false
};
var archerStats = {
  towerId: 2,
  towerName: "Archer",
  upgrade: true,
  str: 8,
  atkRange: "medium",
  atkType: "physical",
  atkRate: "slow",
  hitfly: true
};
var apprenticeStats = {
  towerId: 3,
  towerName: "Apprentice",
  upgrade: true,
  str: 7,
  atkRange: "medium",
  atkType: "magical",
  atkRate: "medium",
  hitfly: false
};
var knightStats = {
  towerId: 4,
  towerName: "Knight",
  upgrade: true,
  str: 15,
  atkRange: "short",
  atkType: "physical",
  atkRate: "medium",
  hitfly: false
};
var duelistStats = {
  towerId: 5,
  towerName: "Duelist",
  upgrade: true,
  str: 12,
  atkRange: "short",
  atkType: "physical",
  atkRate: "fast",
  hitfly: false
};
var riflemanStats = {
  towerId: 6,
  towerName: "Rifleman",
  upgrade: true,
  str: 20,
  atkRange: "medium",
  atkType: "physical",
  atkRate: "slow",
  hitfly: true
};
var rangerStats = {
  towerId: 7,
  towerName: "Ranger",
  upgrade: true,
  str: 14,
  atkRange: "medium",
  atkType: "physical",
  atkRate: "medium",
  hitfly: true
};
var wizardStats = {
  towerId: 8,
  towerName: "Wizard",
  upgrade: true,
  str: 10,
  atkRange: "medium",
  atkType: "magical",
  atkRate: "medium",
  hitfly: true
};
var sorceressStats = {
  towerId: 9,
  towerName: "Sorceress",
  upgrade: true,
  str: 13,
  atkRange: "medium",
  atkType: "magical",
  atkRate: "slow",
  hitfly: true
};
var commanderStats = {
  towerId: 10,
  towerName: "Commander",
  upgrade: false,
  str: 25,
  atkRange: "short",
  atkType: "physical",
  atkRate: "slow",
  hitfly: false
};
var paladinStats = {
  towerId: 11,
  towerName: "Paladin",
  upgrade: false,
  str: 17,
  atkRange: "short",
  atkType: "physical",
  atkRate: "medium",
  hitfly: true
};
var swordmasterStats = {
  towerId: 12,
  towerName: "Swordmaster",
  upgrade: false,
  str: 14,
  atkRange: "short",
  atkType: "physical",
  atkRate: "fast",
  hitfly: false
};
var cutpurseStats = {
  towerId: 13,
  towerName: "Cutpurse",
  upgrade: false,
  str: 6,
  atkRange: "veryshort",
  atkType: "physical",
  atkRate: "veryfast",
  hitfly: false
};
var cannoneerStats = {
  towerId: 14,
  towerName: "Cannoneer",
  upgrade: false,
  str: 30,
  atkRange: "long",
  atkType: "physical",
  atkRate: "veryslow",
  hitfly: false
};
var sharpshooterStats = {
  towerId: 15,
  towerName: "Sharpshooter",
  upgrade: false,
  str: 35,
  atkRange: "verylong",
  atkType: "physical",
  atkRate: "slow",
  hitfly: true
};
var beastmasterStats = {
  towerId: 16,
  towerName: "Beastmaster",
  upgrade: false,
  str: 20,
  atkRange: "long",
  atkType: "physical",
  atkRate: "medium",
  hitfly: true
};
var assassinStats = {
  towerId: 17,
  towerName: "Assassin",
  upgrade: false,
  str: 18,
  atkRange: "long",
  atkType: "physical",
  atkRate: "fast",
  hitfly: true
};
var firemageStats = {
  towerId: 18,
  towerName: "FireMage",
  upgrade: false,
  str: 20,
  atkRange: "medium",
  atkType: "magical",
  atkRate: "fast",
  hitfly: true
};
var icemageStats = {
  towerId: 19,
  towerName: "IceMage",
  upgrade: false,
  str: 10,
  atkRange: "long",
  atkType: "magical",
  atkRate: "medium",
  hitfly: true
};
var lightningmageStats = {
  towerId: 20,
  towerName: "LightningMage",
  upgrade: false,
  str: 22,
  atkRange: "short",
  atkType: "magical",
  atkRate: "medium",
  hitfly: true
};
var warlockStats = {
  towerId: 21,
  towerName: "Warlock",
  upgrade: false,
  str: 15,
  atkRange: "long",
  atkType: "magical",
  atkRate: "slow",
  hitfly: true
};
var priestessStats = {
  towerId: 22,
  towerName: "Priestess",
  upgrade: false,
  str: 13,
  atkRange: "medium",
  atkType: "magical",
  atkRate: "medium",
  hitfly: true
};
var towerArr = [peasantStats, soldierStats, archerStats, apprenticeStats, knightStats, duelistStats, riflemanStats, rangerStats, wizardStats, sorceressStats, commanderStats, paladinStats, swordmasterStats, cutpurseStats, cannoneerStats, sharpshooterStats, beastmasterStats, assassinStats, firemageStats, icemageStats, lightningmageStats, warlockStats, priestessStats]; //map for tower placement, 0=can place, -1=cannot place, towerObj=tower already occupying space

var map = [[0, -1, 0, -1, -1, -1, -1, -1, -1, -1], [0, -1, 0, 0, 0, 0, 0, 0, 0, -1], [0, -1, -1, -1, -1, -1, -1, -1, 0, -1], [0, 0, 0, 0, 0, 0, 0, -1, 0, -1], [-1, -1, -1, -1, -1, -1, 0, -1, 0, -1], [-1, -1, -1, -1, -1, -1, 0, -1, 0, -1], [-1, -1, -1, -1, -1, -1, 0, -1, 0, -1], [-1, -1, -1, -1, -1, -1, 0, -1, 0, -1]]; //------------------------------------------FUNCTIONS---------------------------------------------------			
//build the pathing and map for level

function buildMap() {
  //path to which enemey follows
  var graphics = THIS_SCENE.add.graphics();
  drawLines(graphics);
  path = THIS_SCENE.add.path(96, -32);
  path.lineTo(96, 164);
  path.lineTo(480, 164);
  path.lineTo(480, 544);
  graphics.lineStyle(0, 0xffffff, 1);
  path.draw(graphics); //add map image

  THIS_SCENE.add.image(320, 256, 'map'); //add background music

  var background = THIS_SCENE.sound.add('background');
  background.volume = 0.04;
  background.loop = true; //background.play();																//sounds

  THIS_SCENE.nextEnemy = 0;
  THIS_SCENE.physics.add.overlap(ENEMY_GROUP, ATTACKS_GROUP, damageEnemy);
  THIS_SCENE.input.mouse.disableContextMenu();
} //user input related actions 


function userAction(pointer) {
  var i = Math.floor(pointer.y / 64);
  var j = Math.floor(pointer.x / 64);

  if (pointer.leftButtonDown()) {
    //if new tower
    if (map[i][j] == 0) {
      var newTower = TOWER_GROUP[peasantStats.towerId].get(peasantStats);
      newTower.placeTower(pointer);
    } //if upgrade tower
    else if (_typeof(map[i][j]) === "object") {
        var currTower = map[i][j];
        var newTower = TOWER_GROUP[soldierStats.towerId].get(soldierStats);
        currTower.upgradeTower(pointer, newTower);
      }
  } else if (pointer.rightButtonDown()) {
    var tower = map[i][j];

    if (_typeof(tower) === "object") {
      tower.removeTower(pointer);
    }
  }
}

function getEnemy(x, y, distance) {
  var enemyUnits = ENEMY_GROUP.getChildren();

  for (var i = 0; i < enemyUnits.length; i++) {
    if (enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance) return enemyUnits[i];
  }

  return false;
}

function damageEnemy(enemy, attack) {
  // only if both enemy and attack are alive
  if (enemy.active === true && attack.active === true) {
    // we remove the attack right away
    attack.setActive(false);
    attack.setVisible(false); // decrease the enemy hp with ATTACK_DAMAGE

    enemy.receiveDamage(ATTACK_DAMAGE); //damage.play();
  }
}

function drawLines(graphics) {
  graphics.lineStyle(1, 0x0000ff, 0.8);

  for (var i = 0; i < 8; i++) {
    graphics.moveTo(0, i * 64);
    graphics.lineTo(640, i * 64);
  }

  for (var j = 0; j < 10; j++) {
    graphics.moveTo(j * 64, 0);
    graphics.lineTo(j * 64, 512);
  }

  graphics.strokePath();
}

function addAttack(x, y, angle) {
  var attack = ATTACKS_GROUP.get();

  if (attack) {
    attack.fire(x, y, angle);
  }
} //---------------------------------------------------------CLASSES--------------------------------------------
//enemy class


var Enemy =
/*#__PURE__*/
function (_Phaser$GameObjects$S) {
  _inherits(Enemy, _Phaser$GameObjects$S);

  function Enemy(scene) {
    var _this;

    _classCallCheck(this, Enemy);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Enemy).call(this, scene)); //dknight.animations.add('walk_down', 1, 4);
    //this.anims.create({ key: 'down', frames: this.anims.generateFrameNames('deathknight', { prefix: 'walk_down_', start: 1, end: 4 }), frameRate: 5, repeat: -1 })
    //var enemy = Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'deathknight');

    _this.follower = {
      t: 0,
      vec: new Phaser.Math.Vector2()
    };
    _this.hp = 0;
    _this.turned = 0; //this.text = THIS_SCENE.add.text(0, 0, "HP: "+ ENEMY_HP, {font: "16px Arial", fill: "#ffffff"});
    //this.text.setPadding(0, 0, 0, 60);
    //this.text.setOrigin(0.5);

    _this.healthbar = new HealthBar(scene, 0, 0);
    return _this;
  }

  _createClass(Enemy, [{
    key: "startOnPath",
    value: function startOnPath() {
      this.follower.t = 0;
      this.hp = ENEMY_HP; //this.walk.play();																//sounds

      path.getPoint(this.follower.t, this.follower.vec);
      this.setPosition(this.follower.vec.x, this.follower.vec.y); //this.text.setPosition(this.follower.vec.x, this.follower.vec.y);

      this.healthbar.setPosition(this.follower.vec.x - this.width, this.follower.vec.y - this.height);
    }
  }, {
    key: "receiveDamage",
    value: function receiveDamage(damage) {
      this.hp -= damage; //this.text.setText("HP: " + this.hp);

      this.healthbar.decrease(damage);
      this.damage.play(); //sounds
      // if hp drops below 0 we deactivate this enemy

      if (this.hp <= 0) {
        this.setActive(false);
        this.setVisible(false); //this.text.setActive(false);
        //this.text.setVisible(false);

        this.healthbar.destroy(); //Need to set this to stop when all enemies are dead

        this.death.play(); //sounds
        //this.walk.stop();																//sounds

        this.destroy();
      }
    }
  }, {
    key: "update",
    value: function update(time, delta) {
      //ENEMY_SPEED = 1/Math.floor((Math.random() * (10000 - 5000)) + 5000);
      this.follower.t += ENEMY_SPEED * delta;
      path.getPoint(this.follower.t, this.follower.vec);
      this.setPosition(this.follower.vec.x, this.follower.vec.y); //this.text.setPosition(this.follower.vec.x, this.follower.vec.y);

      this.healthbar.setPosition(this.follower.vec.x - this.width, this.follower.vec.y - this.height);

      if (this.follower.vec.y == 164 && this.turned == 0) {
        this.anims.play('dkright');
        this.turned = 1;
      } else if (this.follower.vec.y != 164 && this.turned == 1) {
        this.anims.play('dkdown');
        this.turned = 2;
      }

      if (this.follower.t >= 1) {
        this.setActive(false);
        this.setVisible(false); //this.text.setActive(false);
        //this.text.setVisible(false);

        this.healthbar.destroy(); //this.walk.stop();												//sounds

        this.destroy();
      }
    }
  }]);

  return Enemy;
}(Phaser.GameObjects.Sprite);

;

var Deathknight =
/*#__PURE__*/
function (_Enemy) {
  _inherits(Deathknight, _Enemy);

  function Deathknight(scene, stats) {
    var _this2;

    _classCallCheck(this, Deathknight);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Deathknight).call(this, scene));
    Phaser.GameObjects.Sprite.call(_assertThisInitialized(_assertThisInitialized(_this2)), scene, 0, 0, 'deathknight'); //create animations

    THIS_SCENE.anims.create({
      key: 'dkdown',
      frames: THIS_SCENE.anims.generateFrameNames('deathknight', {
        prefix: 'walk_down_',
        start: 1,
        end: 4
      }),
      frameRate: 3,
      repeat: -1
    });
    THIS_SCENE.anims.create({
      key: 'dkright',
      frames: THIS_SCENE.anims.generateFrameNames('deathknight', {
        prefix: 'walk_right_',
        start: 1,
        end: 4
      }),
      frameRate: 5,
      repeat: -1
    });

    _this2.anims.play('dkdown'); //create sounds


    _this2.death = THIS_SCENE.sound.add('dkDeath');
    _this2.death.volume = 0.05;
    _this2.death.loop = false;
    _this2.damage = THIS_SCENE.sound.add('hit');
    _this2.damage.volume = 0.03;
    _this2.damage.loop = false;
    /* this.walk = THIS_SCENE.sound.add('walk');
    this.walk.volume = 0.01;
    this.walk.loop = true; */

    return _this2;
  }

  _createClass(Deathknight, [{
    key: "pFn",
    value: function pFn() {
      console.log(this.towerName);
    }
  }]);

  return Deathknight;
}(Enemy); //tower class


var Tower =
/*#__PURE__*/
function (_Phaser$GameObjects$S2) {
  _inherits(Tower, _Phaser$GameObjects$S2);

  function Tower(scene, stats) {
    var _this3;

    _classCallCheck(this, Tower);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Tower).call(this, scene));
    _this3.nextTic = 0;
    _this3.towerId = stats.towerId; //each tower has unique id

    _this3.towerName = stats.towerName;
    _this3.upgrade = stats.upgrade; //true = can upgrade, false = can't upgrade

    _this3.str = stats.str; //value tha determines attack strength

    _this3.atkRange = stats.atkRange;
    _this3.atkType = stats.atkType;
    _this3.atkRate = stats.atkRate;
    _this3.hitFly = stats.hitFly; //true = can hit flying enemeies, false = cannot hit flying enemies
    //this.aoeRange = aoeRange; //area of effect range
    //this.spc = spc; //has special attack, each value represents special type, 0 = none, 1 = chance to stun, etc.

    _this3.text = THIS_SCENE.add.text(0, 0, _this3.towerName, {
      font: "16px Arial",
      fill: "#ffffff"
    });
    _this3.upgradeSound = THIS_SCENE.sound.add('upgradeSound');
    _this3.upgradeSound.volume = 0.05;
    _this3.upgradeSound.loop = false;
    return _this3;
  }

  _createClass(Tower, [{
    key: "placeTower",
    value: function placeTower(pointer) {
      var i = Math.floor(pointer.y / 64);
      var j = Math.floor(pointer.x / 64);

      if (map[i][j] === 0) {
        //console.log(tower);
        if (this) {
          this.text.y = (i + .50) * 64 + 64 / 2;
          this.text.x = j * 64 + 64 / 2;
          this.text.setOrigin(0.5); //THIS_SCENE.add.container([this.text, this]);

          this.setActive(true);
          this.setVisible(true);
          this.y = i * 64 + 64 / 2;
          this.x = j * 64 + 64 / 2; //map[i][j] = 1;

          map[i][j] = this;
        } //console.log(TOWER_GROUP.getTotalUsed());
        //console.log(TOWER_GROUP.getLength());

      } else {
        TOWER_GROUP[this.towerId].remove(this, true, true); //tower is created before it's placed so removed if the place clicked on is  not avaialble
      }
    }
  }, {
    key: "removeTower",
    value: function removeTower(pointer) {
      var i = Math.floor(pointer.y / 64);
      var j = Math.floor(pointer.x / 64);

      if (map[i][j] !== 0) {
        this.setActive(false);
        this.setVisible(false);
        this.text.destroy();
        map[i][j] = 0; //remove from map

        TOWER_GROUP[this.towerId].remove(this, true, true); //removes from group, if want to keep it as inactive then remove this line
      }
    }
  }, {
    key: "upgradeTower",
    value: function upgradeTower(pointer, newTower) {
      //check if tower is already upgraded, if not the upgrade
      if (this.towerName !== newTower.towerName) {
        var i = Math.floor(pointer.y / 64);
        var j = Math.floor(pointer.x / 64);
        this.removeTower(pointer);
        newTower.placeTower(pointer); //console.log(TOWER_GROUP.getTotalUsed());
        //console.log(TOWER_GROUP.getLength());

        this.text = newTower.towerName;
        this.upgradeSound.play();
      } else {
        TOWER_GROUP[newTower.towerId].remove(newTower, true, true); //tower is created before it's placed so removed if the place clicked on is  not avaialble

        newTower.text.destroy();
      }
    }
  }, {
    key: "fire",
    value: function fire() {
      var enemy = getEnemy(this.x, this.y, 200);

      if (enemy) {
        var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
        addAttack(this.x, this.y, angle); //this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;    //uncomment to make towers rotate to face enemy
      }
    }
  }, {
    key: "update",
    value: function update(time, delta, pointer) {
      if (time > this.nextTic) {
        this.fire();
        this.nextTic = time + TOWER_FIRE_RATE;
      }
    }
  }, {
    key: "sayName",
    value: function sayName() {
      console.log(this.towerName);
    }
  }]);

  return Tower;
}(Phaser.GameObjects.Sprite);

;

var Peasant =
/*#__PURE__*/
function (_Tower) {
  _inherits(Peasant, _Tower);

  function Peasant(scene, stats) {
    var _this4;

    _classCallCheck(this, Peasant);

    // Note: In derived classes, super() must be called before you
    // can use 'this'. Leaving this out will cause a reference error.
    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(Peasant).call(this, scene, stats));
    Phaser.GameObjects.Image.call(_assertThisInitialized(_assertThisInitialized(_this4)), scene, 0, 0, 'peasant', 'sprite35');
    return _this4;
  }

  _createClass(Peasant, [{
    key: "pFn",
    value: function pFn() {
      console.log(this.towerName);
    }
  }]);

  return Peasant;
}(Tower);

var Soldier =
/*#__PURE__*/
function (_Tower2) {
  _inherits(Soldier, _Tower2);

  function Soldier(scene, stats) {
    var _this5;

    _classCallCheck(this, Soldier);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(Soldier).call(this, scene, stats));
    Phaser.GameObjects.Image.call(_assertThisInitialized(_assertThisInitialized(_this5)), scene, 0, 0, 'soldier', 'sprite25');
    return _this5;
  }

  _createClass(Soldier, [{
    key: "sFn",
    value: function sFn() {
      console.log(this.towerName);
    }
  }]);

  return Soldier;
}(Tower); //all other classes
//HP class


var HealthBar =
/*#__PURE__*/
function () {
  function HealthBar(scene, x, y) {
    _classCallCheck(this, HealthBar);

    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.x = x;
    this.y = y;
    this.value = ENEMY_HP;
    this.p = .076;
    this.draw();
    THIS_SCENE.add.existing(this.bar);
  }

  _createClass(HealthBar, [{
    key: "setPosition",
    value: function setPosition(x, y) {
      this.x = x;
      this.y = y;
      this.draw();
    }
  }, {
    key: "decrease",
    value: function decrease(amount) {
      this.value -= amount;

      if (this.value < 0) {
        this.value = 0;
      }

      this.draw();
      return this.value === 0;
    }
  }, {
    key: "draw",
    value: function draw() {
      this.bar.clear(); //  BG

      this.bar.fillStyle(0x000000);
      this.bar.fillRect(this.x, this.y, 80, 16); //  Health

      this.bar.fillStyle(0xffffff);
      this.bar.fillRect(this.x + 2, this.y + 2, 76, 12);

      if (this.value < 0.6 * ENEMY_HP) {
        this.bar.fillStyle(0xff0000);
      } else if (this.value < 0.3 * ENEMY_HP) this.bar.fillStyle(0x00ffff);else {
        this.bar.fillStyle(0x00ff00);
      }

      var d = Math.floor(this.p * this.value);
      this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.bar.destroy();
    }
  }]);

  return HealthBar;
}(); //the yellow thing the towers shoots at enemy, can be any form of projectile


var Attack =
/*#__PURE__*/
function (_Phaser$GameObjects$I) {
  _inherits(Attack, _Phaser$GameObjects$I);

  function Attack(scene) {
    var _this6;

    _classCallCheck(this, Attack);

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Attack).call(this, scene));
    Phaser.GameObjects.Image.call(_assertThisInitialized(_assertThisInitialized(_this6)), scene, 0, 0, 'attack');
    _this6.incX = 0;
    _this6.incY = 0;
    _this6.lifespan = 0;
    _this6.speed = Phaser.Math.GetSpeed(600, 1);
    return _this6;
  }

  _createClass(Attack, [{
    key: "fire",
    value: function fire(x, y, angle) {
      this.setActive(true);
      this.setVisible(true); //  Attacks fire from the middle of the screen to the given x/y

      this.setPosition(x, y); //  we don't need to rotate the attacks as they are round
      //    this.setRotation(angle);

      this.dx = Math.cos(angle);
      this.dy = Math.sin(angle);
      this.lifespan = 1000;
    }
  }, {
    key: "update",
    value: function update(time, delta) {
      this.lifespan -= delta;
      this.x += this.dx * (this.speed * delta);
      this.y += this.dy * (this.speed * delta);

      if (this.lifespan <= 0) {
        this.setActive(false);
        this.setVisible(false);
      }
    }
  }]);

  return Attack;
}(Phaser.GameObjects.Image);

;

var GameScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(GameScene, _Phaser$Scene);

  function GameScene() {
    _classCallCheck(this, GameScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(GameScene).call(this, {
      key: _CST.CST.SCENES.GAME
    }));
  } //Preload function loads assets before game starts


  _createClass(GameScene, [{
    key: "init",
    value: function init(data) {
      console.log(data);
    } //create function initializes and adds assets to game

  }, {
    key: "create",
    value: function create() {
      //remove some ambiguity of what 'this' is. Can be used in classes without having to send as a parameter since it's now globabl
      THIS_SCENE = this;
      /*creates a group for a tower type, that way we can use TOWER_GROUP.get(towerStats) to instantiate new towers easily
      loop through towerArr to get each tower object
      then add each object to TOWER_GROUP arr
      we do this becuase TOWER_GROUP can now be easily used to manipulate tower objects with Phaser functions.*/
      //loop set to 2 since we only have 2 developed classes at the moment

      for (var i = 0; i < 2; i++) {
        TOWER_GROUP[towerArr[i].towerId] = this.add.group({
          classType: eval(towerArr[i].towerName),
          runChildUpdate: true
        });
      } //enemy group will be a loop similar to tower group


      ENEMY_GROUP = this.physics.add.group({
        classType: Deathknight,
        runChildUpdate: true
      }); //key: 'walk_down_', frame: [1, 2, 3, 4], repeat: 5, active: true });
      //turned into attack group soon for different attack types

      ATTACKS_GROUP = this.physics.add.group({
        classType: Attack,
        runChildUpdate: true
      }); //build the game map, this includes pathing, map image, background sounds, and general game assets

      buildMap(); //input related actions in userAction function

      this.input.on('pointerdown', function (pointer) {
        userAction(pointer);
      });
      /* this.input.on('gameobjectdown', function (pointer,gameObject){
      	console.log(gameObject);
      }); */
    } //update function constantly refreshes so to progress game

  }, {
    key: "update",
    value: function update(time, delta, path) {
      if (time > this.nextEnemy) {
        var enemy = ENEMY_GROUP.get(path);

        if (enemy) {
          enemy.setActive(true);
          enemy.setVisible(true);
          enemy.startOnPath(); //ENEMY_SPEED = 1/Math.floor((Math.random() * (2000 - 500)) + 500);

          this.nextEnemy = time + ENEMY_SPAWN_RATE;
        }
      }
    }
  }]);

  return GameScene;
}(Phaser.Scene);

exports.GameScene = GameScene;
},{"../CST":"js/CST.js"}],"js/scenes/LoadScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadScene = void 0;

var _CST = require("../CST");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LoadScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(LoadScene, _Phaser$Scene);

  function LoadScene() {
    _classCallCheck(this, LoadScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(LoadScene).call(this, {
      key: _CST.CST.SCENES.LOAD
    }));
  }

  _createClass(LoadScene, [{
    key: "preload",
    value: function preload() {
      this.load.atlas('deathknight', './dist/assets/deathknight.png', './dist/assets/deathknight.json');
      this.load.atlas('solider', './assets/solider.png', './dist/assets/solider.json');
      this.load.atlas('peasant', './dist/assets/peasant.png', './dist/assets/peasant.json');
      this.load.spritesheet('bard', './dist/assets/bard.png', {
        frameWidth: 52,
        frameHeight: 75
      });
      this.load.image('attack', './dist/assets/coin.png');
      this.load.image('map', './dist/assets/castle-gates.png', {
        frameWidth: 640,
        frameHeight: 512
      });
      this.load.audio('dkDeath', './dist/assets/Sounds/Death Screams/Human/sfx_deathscream_human5.wav');
      this.load.audio('hit', './dist/assets/Sounds/General Sounds/Simple Damage Sounds/sfx_damage_hit2.wav');
      this.load.audio('walk', './dist/assets/Sounds/Movement/Footsteps/sfx_movement_footstepsloop4_slow.wav');
      this.load.audio('background', './dist/assets/Sounds/random silly chip song.ogg');
      this.load.audio('upgradeSound', './dist/dist/assets/Sounds/General Sounds/Positive Sounds/sfx_sounds_powerup6.wav');
      this.load.image('menuscreen', './dist/assets/bg.png', {
        frameWidth: 640,
        frameHeight: 512
      });
      this.load.image('newgame', './dist/assets/new.png');
    }
  }, {
    key: "create",
    value: function create() {
      //Creating menu screen background layers
      this.scene.start(_CST.CST.SCENES.MENU, "Loading complete");
    }
  }]);

  return LoadScene;
}(Phaser.Scene);

exports.LoadScene = LoadScene;
},{"../CST":"js/CST.js"}],"js/game.js":[function(require,module,exports) {
"use strict";

var _MenuScene = require("./scenes/MenuScene");

var _GameScene = require("./scenes/GameScene");

var _LoadScene = require("./scenes/LoadScene");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
  render: {
    pixelArt: true
  },
  scene: [_LoadScene.LoadScene, _MenuScene.MenuScene, _GameScene.GameScene]
}; //begin game

var game = new Phaser.Game(config); //--------------------------------------------------GLOBAL VARIABLES-------------------------------------------

var path;
var TOWER_GROUP = [];
var ENEMY_GROUP;
var mainGame;
var ENEMY_SPEED = 1 / 10000; //var ENEMY_SPEED = 1/Math.floor((Math.random() * 10000) + 10000);

var ENEMY_HP = 1000;
var ENEMY_SPAWN_RATE = 2000; //var ENEMY_SPAWN_RATE = Math.floor((Math.random() * 1000) + 1000);

var ATTACK_DAMAGE = 50;
var TOWER_FIRE_RATE = 300; //stats for each tower type loaded from file rather than defined here, but for now do this

var peasantStats = {
  towerId: 0,
  towerName: "Peasant",
  upgrade: true,
  str: 50,
  atkRange: 150,
  atkType: "physical",
  atkRate: 500,
  hitfly: false
};
var soldierStats = {
  towerId: 1,
  towerName: "Soldier",
  upgrade: true,
  str: 100,
  atkRange: 200,
  atkType: "physical",
  atkRate: 400,
  hitfly: false
};
var archerStats = {
  towerId: 2,
  towerName: "Archer",
  upgrade: true,
  str: 120,
  atkRange: 250,
  atkType: "physical",
  atkRate: 350,
  hitfly: true
};
var apprenticeStats = {
  towerId: 3,
  towerName: "Apprentice",
  upgrade: true,
  str: 7,
  atkRange: "medium",
  atkType: "magical",
  atkRate: "medium",
  hitfly: false
};
var knightStats = {
  towerId: 4,
  towerName: "Knight",
  upgrade: true,
  str: 15,
  atkRange: "short",
  atkType: "physical",
  atkRate: "medium",
  hitfly: false
};
var duelistStats = {
  towerId: 5,
  towerName: "Duelist",
  upgrade: true,
  str: 12,
  atkRange: "short",
  atkType: "physical",
  atkRate: "fast",
  hitfly: false
};
var riflemanStats = {
  towerId: 6,
  towerName: "Rifleman",
  upgrade: true,
  str: 20,
  atkRange: "medium",
  atkType: "physical",
  atkRate: "slow",
  hitfly: true
};
var rangerStats = {
  towerId: 7,
  towerName: "Ranger",
  upgrade: true,
  str: 14,
  atkRange: "medium",
  atkType: "physical",
  atkRate: "medium",
  hitfly: true
};
var wizardStats = {
  towerId: 8,
  towerName: "Wizard",
  upgrade: true,
  str: 10,
  atkRange: "medium",
  atkType: "magical",
  atkRate: "medium",
  hitfly: true
};
var sorceressStats = {
  towerId: 9,
  towerName: "Sorceress",
  upgrade: true,
  str: 13,
  atkRange: "medium",
  atkType: "magical",
  atkRate: "slow",
  hitfly: true
};
var commanderStats = {
  towerId: 10,
  towerName: "Commander",
  upgrade: false,
  str: 25,
  atkRange: "short",
  atkType: "physical",
  atkRate: "slow",
  hitfly: false
};
var paladinStats = {
  towerId: 11,
  towerName: "Paladin",
  upgrade: false,
  str: 17,
  atkRange: "short",
  atkType: "physical",
  atkRate: "medium",
  hitfly: true
};
var swordmasterStats = {
  towerId: 12,
  towerName: "Swordmaster",
  upgrade: false,
  str: 14,
  atkRange: "short",
  atkType: "physical",
  atkRate: "fast",
  hitfly: false
};
var cutpurseStats = {
  towerId: 13,
  towerName: "Cutpurse",
  upgrade: false,
  str: 6,
  atkRange: "veryshort",
  atkType: "physical",
  atkRate: "veryfast",
  hitfly: false
};
var cannoneerStats = {
  towerId: 14,
  towerName: "Cannoneer",
  upgrade: false,
  str: 30,
  atkRange: "long",
  atkType: "physical",
  atkRate: "veryslow",
  hitfly: false
};
var sharpshooterStats = {
  towerId: 15,
  towerName: "Sharpshooter",
  upgrade: false,
  str: 35,
  atkRange: "verylong",
  atkType: "physical",
  atkRate: "slow",
  hitfly: true
};
var beastmasterStats = {
  towerId: 16,
  towerName: "Beastmaster",
  upgrade: false,
  str: 20,
  atkRange: "long",
  atkType: "physical",
  atkRate: "medium",
  hitfly: true
};
var assassinStats = {
  towerId: 17,
  towerName: "Assassin",
  upgrade: false,
  str: 18,
  atkRange: "long",
  atkType: "physical",
  atkRate: "fast",
  hitfly: true
};
var firemageStats = {
  towerId: 18,
  towerName: "FireMage",
  upgrade: false,
  str: 20,
  atkRange: "medium",
  atkType: "magical",
  atkRate: "fast",
  hitfly: true
};
var icemageStats = {
  towerId: 19,
  towerName: "IceMage",
  upgrade: false,
  str: 10,
  atkRange: "long",
  atkType: "magical",
  atkRate: "medium",
  hitfly: true
};
var lightningmageStats = {
  towerId: 20,
  towerName: "LightningMage",
  upgrade: false,
  str: 22,
  atkRange: "short",
  atkType: "magical",
  atkRate: "medium",
  hitfly: true
};
var warlockStats = {
  towerId: 21,
  towerName: "Warlock",
  upgrade: false,
  str: 15,
  atkRange: "long",
  atkType: "magical",
  atkRate: "slow",
  hitfly: true
};
var priestessStats = {
  towerId: 22,
  towerName: "Priestess",
  upgrade: false,
  str: 13,
  atkRange: "medium",
  atkType: "magical",
  atkRate: "medium",
  hitfly: true
}; //map for tower placement, 0=can place, -1=cannot place, 1=can place with turrent already occupying space

var map = [[0, -1, 0, -1, -1, -1, -1, -1, -1, -1], [0, -1, 0, 0, 0, 0, 0, 0, 0, -1], [0, -1, -1, -1, -1, -1, -1, -1, 0, -1], [0, 0, 0, 0, 0, 0, 0, -1, 0, -1], [-1, -1, -1, -1, -1, -1, 0, -1, 0, -1], [-1, -1, -1, -1, -1, -1, 0, -1, 0, -1], [-1, -1, -1, -1, -1, -1, 0, -1, 0, -1], [-1, -1, -1, -1, -1, -1, 0, -1, 0, -1]]; //------------------------------------------FUNCTIONS---------------------------------------------------			

function getEnemy(x, y, distance) {
  var enemyUnits = ENEMY_GROUP.getChildren();

  for (var i = 0; i < enemyUnits.length; i++) {
    if (enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance) return enemyUnits[i];
  }

  return false;
}

function damageEnemy(enemy, attack) {
  // only if both enemy and attack are alive
  if (enemy.active === true && attack.active === true) {
    // we remove the attack right away
    attack.setActive(false);
    attack.setVisible(false); // decrease the enemy hp with ATTACK_DAMAGE

    enemy.receiveDamage(attack.damage); //damage.play();
  }
}

function drawLines(graphics) {
  graphics.lineStyle(1, 0x0000ff, 0.8);

  for (var i = 0; i < 8; i++) {
    graphics.moveTo(0, i * 64);
    graphics.lineTo(640, i * 64);
  }

  for (var j = 0; j < 10; j++) {
    graphics.moveTo(j * 64, 0);
    graphics.lineTo(j * 64, 512);
  }

  graphics.strokePath();
}

function addAttack(x, y, angle, damage) {
  var attack = ATTACK_GROUP.get();

  if (attack) {
    attack.fire(x, y, angle, damage);
  }
} //---------------------------------------------------------CLASSES--------------------------------------------


var HealthBar =
/*#__PURE__*/
function () {
  function HealthBar(scene, x, y) {
    _classCallCheck(this, HealthBar);

    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.x = x;
    this.y = y;
    this.value = ENEMY_HP;
    this.p = .076;
    this.draw();
    mainGame.add.existing(this.bar);
  }

  _createClass(HealthBar, [{
    key: "setPosition",
    value: function setPosition(x, y) {
      this.x = x;
      this.y = y;
      this.draw();
    }
  }, {
    key: "decrease",
    value: function decrease(amount) {
      this.value -= amount;

      if (this.value < 0) {
        this.value = 0;
      }

      this.draw();
      return this.value === 0;
    }
  }, {
    key: "draw",
    value: function draw() {
      this.bar.clear(); //  BG

      this.bar.fillStyle(0x000000);
      this.bar.fillRect(this.x, this.y, 80, 16); //  Health

      this.bar.fillStyle(0xffffff);
      this.bar.fillRect(this.x + 2, this.y + 2, 76, 12);

      if (this.value < 0.6 * ENEMY_HP) {
        this.bar.fillStyle(0xff0000);
      } else if (this.value < 0.3 * ENEMY_HP) this.bar.fillStyle(0x00ffff);else {
        this.bar.fillStyle(0x00ff00);
      }

      var d = Math.floor(this.p * this.value);
      this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.bar.destroy();
    }
  }]);

  return HealthBar;
}();

var Enemy =
/*#__PURE__*/
function (_Phaser$GameObjects$S) {
  _inherits(Enemy, _Phaser$GameObjects$S);

  function Enemy(scene) {
    var _this;

    _classCallCheck(this, Enemy);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Enemy).call(this, scene)); //dknight.animations.add('walk_down', 1, 4);
    //this.anims.create({ key: 'down', frames: this.anims.generateFrameNames('deathknight', { prefix: 'walk_down_', start: 1, end: 4 }), frameRate: 5, repeat: -1 })

    var enemy = Phaser.GameObjects.Sprite.call(_assertThisInitialized(_assertThisInitialized(_this)), scene, 0, 0, 'deathknight');

    _this.anims.play('dkdown'); //walk.play();


    _this.follower = {
      t: 0,
      vec: new Phaser.Math.Vector2()
    };
    _this.hp = 0;
    _this.turned = 0;
    _this.text = mainGame.add.text(0, 0, "HP: " + ENEMY_HP, {
      font: "16px Arial",
      fill: "#ffffff"
    });

    _this.text.setPadding(0, 0, 0, 60);

    _this.text.setOrigin(0.5);

    _this.healthbar = new HealthBar(scene, 0, 0);
    return _this;
  }

  _createClass(Enemy, [{
    key: "startOnPath",
    value: function startOnPath() {
      this.follower.t = 0;
      this.hp = ENEMY_HP;
      path.getPoint(this.follower.t, this.follower.vec);
      this.setPosition(this.follower.vec.x, this.follower.vec.y);
      this.text.setPosition(this.follower.vec.x, this.follower.vec.y);
      this.healthbar.setPosition(this.follower.vec.x - this.width, this.follower.vec.y - this.height);
    }
  }, {
    key: "receiveDamage",
    value: function receiveDamage(damage) {
      this.hp -= damage;
      this.text.setText("HP: " + this.hp);
      this.healthbar.decrease(damage); // if hp drops below 0 we deactivate this enemy

      if (this.hp <= 0) {
        this.setActive(false);
        this.setVisible(false);
        this.text.setActive(false);
        this.text.setVisible(false);
        this.healthbar.destroy(); //dkdeath.play();
        //Need to set this to stop when all enemies are dead
        //walk.stop();

        this.destroy();
      }
    }
  }, {
    key: "update",
    value: function update(time, delta) {
      //ENEMY_SPEED = 1/Math.floor((Math.random() * (10000 - 5000)) + 5000);
      this.follower.t += ENEMY_SPEED * delta;
      path.getPoint(this.follower.t, this.follower.vec);
      this.setPosition(this.follower.vec.x, this.follower.vec.y);
      this.text.setPosition(this.follower.vec.x, this.follower.vec.y);
      this.healthbar.setPosition(this.follower.vec.x - this.width, this.follower.vec.y - this.height);

      if (this.follower.vec.y == 164 && this.turned == 0) {
        this.anims.play('dkright');
        this.turned = 1;
      } else if (this.follower.vec.y != 164 && this.turned == 1) {
        this.anims.play('dkdown');
        this.turned = 2;
      }

      if (this.follower.t >= 1) {
        this.setActive(false);
        this.setVisible(false);
        this.text.setActive(false);
        this.text.setVisible(false);
        this.healthbar.destroy();
        this.destroy();
      }
    }
  }]);

  return Enemy;
}(Phaser.GameObjects.Sprite);

; //towers class

var Tower =
/*#__PURE__*/
function (_Phaser$GameObjects$I) {
  _inherits(Tower, _Phaser$GameObjects$I);

  function Tower(scene, stats) {
    var _this2;

    _classCallCheck(this, Tower);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Tower).call(this, scene));
    _this2.nextTic = 0;
    _this2.towerId = stats.towerId; //each tower has unique id

    _this2.towerName = stats.towerName;
    _this2.upgrade = stats.upgrade; //true = can upgrade, false = can't upgrade

    _this2.str = stats.str; //value that determines attack strength

    _this2.atkRange = stats.atkRange;
    _this2.atkType = stats.atkType;
    _this2.atkRate = stats.atkRate;
    _this2.hitFly = stats.hitFly; //true = can hit flying enemeies, false = cannot hit flying enemies
    //this.aoeRange = aoeRange; //area of effect range
    //this.spc = spc; //has special attack, each value represents special type, 0 = none, 1 = chance to stun, etc.

    _this2.text = mainGame.add.text(0, 0, _this2.towerName, {
      font: "16px Arial",
      fill: "#ffffff"
    });
    return _this2;
  }

  _createClass(Tower, [{
    key: "placeTower",
    value: function placeTower(pointer) {
      var i = Math.floor(pointer.y / 64);
      var j = Math.floor(pointer.x / 64);

      if (map[i][j] === 0) {
        //console.log(tower);
        if (this) {
          this.text.y = (i + .50) * 64 + 64 / 2;
          this.text.x = j * 64 + 64 / 2;
          this.text.setOrigin(0.5); //mainGame.add.container([this.text, this]);

          this.setActive(true);
          this.setVisible(true);
          this.y = i * 64 + 64 / 2;
          this.x = j * 64 + 64 / 2; //map[i][j] = 1;

          map[i][j] = this;
        } //console.log(TOWER_GROUP.getTotalUsed());
        //console.log(TOWER_GROUP.getLength());

      } else TOWER_GROUP[this.towerId].remove(this, true, true); //tower is created before it's placed so removed if the place clicked on is  not avaialble

    }
  }, {
    key: "removeTower",
    value: function removeTower(pointer) {
      var i = Math.floor(pointer.y / 64);
      var j = Math.floor(pointer.x / 64);

      if (map[i][j] !== 0) {
        this.setActive(false);
        this.setVisible(false);
        this.text.setActive(false);
        this.text.setVisible(false);
        map[i][j] = 0; //remove from map

        TOWER_GROUP[this.towerId].remove(this, true, true); //removes from group, if want to keep it as inactive then remove this line
      }
    }
  }, {
    key: "upgradeTower",
    value: function upgradeTower(pointer, newTower) {
      var i = Math.floor(pointer.y / 64);
      var j = Math.floor(pointer.x / 64);
      this.removeTower(pointer);
      newTower.placeTower(pointer); //console.log(TOWER_GROUP.getTotalUsed());
      //console.log(TOWER_GROUP.getLength());
    }
  }, {
    key: "fire",
    value: function fire() {
      var enemy = getEnemy(this.x, this.y, this.atkRange);

      if (enemy) {
        var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
        addAttack(this.x, this.y, angle, this.str); //this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;    //uncomment to make towers rotate to face enemy
      }
    }
  }, {
    key: "update",
    value: function update(time, delta, pointer) {
      if (time > this.nextTic) {
        this.fire();
        this.nextTic = time + this.atkRate;
      }
    }
  }, {
    key: "sayName",
    value: function sayName() {
      console.log(this.towerName);
    }
  }]);

  return Tower;
}(Phaser.GameObjects.Image);

;

var Peasant =
/*#__PURE__*/
function (_Tower) {
  _inherits(Peasant, _Tower);

  function Peasant(scene, stats) {
    var _this3;

    _classCallCheck(this, Peasant);

    // Note: In derived classes, super() must be called before you
    // can use 'this'. Leaving this out will cause a reference error.
    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Peasant).call(this, scene, stats));
    Phaser.GameObjects.Image.call(_assertThisInitialized(_assertThisInitialized(_this3)), scene, 0, 0, 'peasant', 'sprite35');
    return _this3;
  }

  _createClass(Peasant, [{
    key: "pFn",
    value: function pFn() {
      console.log(this.towerName);
    }
  }]);

  return Peasant;
}(Tower);

var Soldier =
/*#__PURE__*/
function (_Tower2) {
  _inherits(Soldier, _Tower2);

  function Soldier(scene, stats) {
    var _this4;

    _classCallCheck(this, Soldier);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(Soldier).call(this, scene, stats));
    Phaser.GameObjects.Image.call(_assertThisInitialized(_assertThisInitialized(_this4)), scene, 0, 0, 'goldenarmor', 'sprite25');
    return _this4;
  }

  _createClass(Soldier, [{
    key: "sFn",
    value: function sFn() {
      console.log(this.towerName);
    }
  }]);

  return Soldier;
}(Tower);

var Archer =
/*#__PURE__*/
function (_Tower3) {
  _inherits(Archer, _Tower3);

  function Archer(scene, stats) {
    var _this5;

    _classCallCheck(this, Archer);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(Archer).call(this, scene, stats));
    Phaser.GameObjects.Image.call(_assertThisInitialized(_assertThisInitialized(_this5)), scene, 0, 0, 'archer', 'tile051');
    return _this5;
  }

  _createClass(Archer, [{
    key: "aFn",
    value: function aFn() {
      console.log(this.towerName);
    }
  }]);

  return Archer;
}(Tower); //the yellow thing the towers shoots at enemy, can be any form of projectile


var Attack =
/*#__PURE__*/
function (_Phaser$GameObjects$I2) {
  _inherits(Attack, _Phaser$GameObjects$I2);

  function Attack(scene) {
    var _this6;

    _classCallCheck(this, Attack);

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Attack).call(this, scene));
    Phaser.GameObjects.Image.call(_assertThisInitialized(_assertThisInitialized(_this6)), scene, 0, 0, 'attack');
    _this6.incX = 0;
    _this6.incY = 0;
    _this6.lifespan = 0;
    _this6.damage = 0;
    _this6.speed = Phaser.Math.GetSpeed(600, 1);
    return _this6;
  }

  _createClass(Attack, [{
    key: "fire",
    value: function fire(x, y, angle, damage) {
      this.setActive(true);
      this.setVisible(true); //  Attacks fire from the middle of the screen to the given x/y

      this.setPosition(x, y); //  we don't need to rotate the attacks as they are round
      //    this.setRotation(angle);

      this.dx = Math.cos(angle);
      this.dy = Math.sin(angle);
      this.lifespan = 1000;
      this.damage = damage;
    }
  }, {
    key: "update",
    value: function update(time, delta) {
      this.lifespan -= delta;
      this.x += this.dx * (this.speed * delta);
      this.y += this.dy * (this.speed * delta);

      if (this.lifespan <= 0) {
        this.setActive(false);
        this.setVisible(false);
      }
    }
  }]);

  return Attack;
}(Phaser.GameObjects.Image);

; //----------------------------------------------------GAME-------------------------------------------	
//Preload function loads assets before game starts

function preload() {
  this.load.atlas('deathknight', 'assets/deathknight.png', 'assets/deathknight.json');
  this.load.atlas('goldenarmor', 'assets/goldenarmor.png', 'assets/goldenarmor.json');
  this.load.atlas('archer', 'assets/archer.png', 'assets/archer.json');
  this.load.atlas('peasant', 'assets/peasant.png', 'assets/peasant.json');
  this.load.spritesheet('bard', 'assets/bard.png', {
    frameWidth: 52,
    frameHeight: 75
  });
  this.load.image('attack', 'assets/coin.png');
  this.load.image('map', 'assets/castle-gates.png', {
    frameWidth: 640,
    frameHeight: 512
  });
  this.load.audio('dkDeath', 'assets/Sounds/Death Screams/Human/sfx_deathscream_human5.wav');
  this.load.audio('hit', 'assets/Sounds/General Sounds/Simple Damage Sounds/sfx_damage_hit2.wav');
  this.load.audio('walk', 'assets/Sounds/Movement/Footsteps/sfx_movement_footstepsloop4_slow.wav');
  this.load.audio('background', 'assets/Sounds/random silly chip song.ogg');
} //create function initializes and adds assets to game


function create() {
  //path to which enemey follows
  var graphics = this.add.graphics();
  drawLines(graphics);
  path = this.add.path(96, -32);
  path.lineTo(96, 164);
  path.lineTo(480, 164);
  path.lineTo(480, 544);
  graphics.lineStyle(0, 0xffffff, 1);
  path.draw(graphics);
  this.add.image(320, 256, 'map');
  mainGame = this;
  mainGame.anims.create({
    key: 'dkdown',
    frames: mainGame.anims.generateFrameNames('deathknight', {
      prefix: 'walk_down_',
      start: 1,
      end: 4
    }),
    frameRate: 3,
    repeat: -1
  });
  mainGame.anims.create({
    key: 'dkright',
    frames: mainGame.anims.generateFrameNames('deathknight', {
      prefix: 'walk_right_',
      start: 1,
      end: 4
    }),
    frameRate: 5,
    repeat: -1
  });
  /*     dkdeath = this.sound.add('dkDeath');
      damage = this.sound.add('hit');
      damage.volume = 0.3;
      walk = this.sound.add('walk');
      walk.volume = 0.3;
      walk.loop = true;
      background = this.sound.add('background');
      background.volume = 0.2;
      background.loop = true;
      background.play(); */
  //creates a group for a tower type, that way we can use TOWER_GROUP.get(peasantStats) to instantiate new towers easily
  //same goes for enemies and attacks and for any new classes created

  TOWER_GROUP[peasantStats.towerId] = this.add.group({
    classType: Peasant,
    runChildUpdate: true
  });
  TOWER_GROUP[soldierStats.towerId] = this.add.group({
    classType: Soldier,
    runChildUpdate: true
  });
  TOWER_GROUP[archerStats.towerId] = this.add.group({
    classType: Archer,
    runChildUpdate: true
  }); //TOWER_GROUP[apprenticeStats.towerId] = this.add.group({ classType: Apprentice, runChildUpdate: true });

  ENEMY_GROUP = this.physics.add.group({
    classType: Enemy,
    runChildUpdate: true
  }); //key: 'walk_down_', frame: [1, 2, 3, 4], repeat: 5, active: true });
  //ENEMY_GROUP.callAll('play', null, 'down',);

  ATTACK_GROUP = this.physics.add.group({
    classType: Attack,
    runChildUpdate: true
  });
  this.nextEnemy = 0;
  this.physics.add.overlap(ENEMY_GROUP, ATTACK_GROUP, damageEnemy);
  this.input.mouse.disableContextMenu();
  this.input.on('pointerdown', function (pointer) {
    if (pointer.leftButtonDown()) {
      var i = Math.floor(pointer.y / 64);
      var j = Math.floor(pointer.x / 64);

      if (map[i][j] == 0) {
        var tower = TOWER_GROUP[peasantStats.towerId].get(peasantStats);
        tower.placeTower(pointer);
      } else if (map[i][j].towerId == 0) {
        var tower = map[i][j]; //var newTG = mainGame.add.group({ classType: Soldier, runChildUpdate: true });

        var newTower = TOWER_GROUP[soldierStats.towerId].get(soldierStats);
        tower.upgradeTower(pointer, newTower);
        tower.setText = newTower.towerName;
      } else if (map[i][j].towerId == 1) {
        var tower = map[i][j]; //var newTG = mainGame.add.group({ classType: Soldier, runChildUpdate: true });

        var newTower = TOWER_GROUP[archerStats.towerId].get(archerStats);
        tower.upgradeTower(pointer, newTower);
        tower.setText = newTower.towerName;
      }
    } else if (pointer.rightButtonDown()) {
      var i = Math.floor(pointer.y / 64);
      var j = Math.floor(pointer.x / 64);
      var tower = map[i][j];

      if (_typeof(tower) === "object") {
        tower.removeTower(pointer);
      }
    } else if (pointer.middleButtonDown()) {}
  });
  /* 	this.arrow = this.input.keyboard.createCursorKeys();
  	if (this.arrow.down.isDown) {
  	   this.scene.pause();
  	}  */
}
},{"./scenes/MenuScene":"js/scenes/MenuScene.js","./scenes/GameScene":"js/scenes/GameScene.js","./scenes/LoadScene":"js/scenes/LoadScene.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61600" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/game.js"], null)
//# sourceMappingURL=/game.012fe464.map