"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var End = /** @class */ (function (_super) {
        __extends(End, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function End() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        // Initializing and Instantiating
        End.prototype.Start = function () {
            //instantiate a new Text object
            this._endLabel = new objects.Label("Game Finish", "80px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH / 2, 180, true);
            // buttons
            this._backButton = new objects.Button(config.Game.ASSETS.getResult("backButton"), config.Game.SCREEN_WIDTH / 2, config.Game.SCREEN_HEIGHT / 2 + 120, true);
            this._highScore = new objects.Label("High Score: " + config.Game.HIGH_SCORE, "50px", "Consolas", "#B53737", config.Game.SCREEN_WIDTH / 2, config.Game.SCREEN_HEIGHT / 2, true);
            this._score = new objects.Label("Curent Score: " + config.Game.SCORE, "50px", "Consolas", "#1261A0", config.Game.SCREEN_WIDTH / 2, config.Game.SCREEN_HEIGHT / 2 - 100, true);
            if (config.Game.CURRENT_LIVES > 0)
                this._lives = new objects.Label("_lives: " + config.Game.CURRENT_LIVES, "50px", "Consolas", "#1261A0", config.Game.SCREEN_WIDTH / 2, config.Game.SCREEN_HEIGHT / 2 - 50, true);
            else
                this._lives = new objects.Label("Good Luck next time!", "50px", "Consolas", "#1261A0", config.Game.SCREEN_WIDTH / 2, config.Game.SCREEN_HEIGHT / 2 - 50, true);
            this._ocean = new objects.background();
            config.Game.SCORE = 0;
            config.Game.CURRENT_LIVES = 100;
            this.Main();
        };
        End.prototype.Update = function () {
            this._ocean.Update();
        };
        End.prototype.Main = function () {
            this.addChild(this._ocean);
            this.addChild(this._endLabel);
            this.addChild(this._lives);
            this.addChild(this._backButton);
            this.addChild(this._score);
            this.addChild(this._highScore);
            this._backButton.on("click", function () {
                config.Game.SCENE = scenes.State.START;
            });
        };
        return End;
    }(objects.Scene));
    scenes.End = End;
})(scenes || (scenes = {}));
//# sourceMappingURL=End.js.map