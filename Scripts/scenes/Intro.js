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
    var Intro = /** @class */ (function (_super) {
        __extends(Intro, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Intro() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        // Initializing and Instantiating
        Intro.prototype.Start = function () {
            // buttons
            this._backButton = new objects.Button(config.Game.ASSETS.getResult("turnBack"), config.Game.SCREEN_WIDTH / 2, config.Game.SCREEN_HEIGHT / 2 + 300, true);
            this._background = new objects.background(config.Game.ASSETS.getResult("intro"));
            this._background.SetMiddle();
            this._ocean = new objects.background();
            this.Main();
        };
        Intro.prototype.Update = function () {
            this._ocean.Update();
        };
        Intro.prototype.Main = function () {
            this.addChild(this._ocean);
            this.addChild(this._endLabel);
            this.addChild(this._background);
            this.addChild(this._backButton);
            this._backButton.on("click", function () {
                config.Game.SCENE = scenes.State.START;
            });
        };
        return Intro;
    }(objects.Scene));
    scenes.Intro = Intro;
})(scenes || (scenes = {}));
//# sourceMappingURL=Intro.js.map