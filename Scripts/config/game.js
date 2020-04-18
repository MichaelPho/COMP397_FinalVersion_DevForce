"use strict";
var config;
(function (config) {
    var Game = /** @class */ (function () {
        function Game() {
        }
        Game.SCREEN_WIDTH = 720;
        Game.SCREEN_HEIGHT = 1002;
        Game.FPS = 60; // 60 Frames per second
        Game.CLOUD_NUM = 4;
        Game.ENEMY_NUM = 5;
        Game.ENEMY_NUM2 = 15;
        Game.FINISH_NUM = 10;
        Game.FINISH_NUM2 = 30;
        Game.FINISH_NUM3 = 50;
        Game.DEATH_NUM2 = 100;
        Game.DEATH_NUM = 200;
        Game.SCORE = 0;
        Game.HIGH_SCORE = 0;
        Game.CURRENT_LIVES = 0;
        return Game;
    }());
    config.Game = Game;
})(config || (config = {}));
//# sourceMappingURL=game.js.map