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
    var HowToPlay = /** @class */ (function (_super) {
        __extends(HowToPlay, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function HowToPlay() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        // Initializing and Instantiating
        HowToPlay.prototype.Start = function () {
            // buttons
            this._backButton = new objects.Button(config.Game.ASSETS.getResult("turnBack"), config.Game.SCREEN_WIDTH / 2 - 150, config.Game.SCREEN_HEIGHT - 50, true);
            this._nextButton = new objects.Button(config.Game.ASSETS.getResult("nextButton"), config.Game.SCREEN_WIDTH / 2 + 150, config.Game.SCREEN_HEIGHT - 50, true);
            this._background = new objects.background(config.Game.ASSETS.getResult("step1"));
            this._background2 = new objects.background(config.Game.ASSETS.getResult("step2"));
            this._background3 = new objects.background(config.Game.ASSETS.getResult("step3"));
            this._background.SetMiddle2();
            this._background2.SetMiddle2();
            this._background3.SetMiddle2();
            this._ocean = new objects.background();
            this._page = 1;
            this._ocean = new objects.background();
            this.Main();
        };
        HowToPlay.prototype.Update = function () {
            var _this = this;
            this._ocean.Update();
            this._nextButton.on("click", function () {
                switch (_this._page) {
                    case 1:
                        _this.addChild(_this._background);
                        _this.removeChild(_this._background2);
                        _this.removeChild(_this._background3);
                        _this._page += 1;
                        break;
                    case 2:
                        _this.addChild(_this._background2);
                        _this.removeChild(_this._background);
                        _this.removeChild(_this._background3);
                        _this._page += 1;
                        break;
                    case 3:
                        _this.addChild(_this._background3);
                        _this.removeChild(_this._background);
                        _this.removeChild(_this._background2);
                        _this._page = 1;
                        break;
                }
                _this.addChild(_this._nextButton);
                _this.addChild(_this._backButton);
            });
            if (this._page == 3) {
                this._page = 1;
            }
        };
        HowToPlay.prototype.Main = function () {
            this.addChild(this._ocean);
            this.addChild(this._endLabel);
            this.addChild(this._background);
            this.addChild(this._backButton);
            this._backButton.on("click", function () {
                config.Game.SCENE = scenes.State.START;
            });
            this.addChild(this._nextButton);
        };
        return HowToPlay;
    }(objects.Scene));
    scenes.HowToPlay = HowToPlay;
})(scenes || (scenes = {}));
//# sourceMappingURL=HowToPlay.js.map