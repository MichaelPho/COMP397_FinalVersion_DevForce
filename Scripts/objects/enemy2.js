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
var objects;
(function (objects) {
    var enemy2 = /** @class */ (function (_super) {
        __extends(enemy2, _super);
        // CONSTRUCTOR
        function enemy2() {
            var _this = _super.call(this, config.Game.ASSETS.getResult("island"), new objects.Vector2(), true) || this;
            _this._health = 3;
            _this.Start();
            return _this;
        }
        Object.defineProperty(enemy2.prototype, "Health", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._health;
            },
            set: function (value) {
                this._health = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(enemy2.prototype, "enemyBullet", {
            get: function () {
                return this._enemybullet;
            },
            set: function (value) {
                this._enemybullet = value;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        enemy2.prototype._checkBounds = function () {
            if (this.y >= config.Game.SCREEN_HEIGHT + this.height) {
                this.Reset();
            }
        };
        enemy2.prototype._move = function () {
            this.position = objects.Vector2.add(this.position, this.velocity);
        };
        enemy2.prototype.StartRun = function () {
            this._verticalSpeed = 4;
            this.velocity = new objects.Vector2(0, this._verticalSpeed);
            console.log("start run");
        };
        // PUBLIC METHODS
        enemy2.prototype.Start = function () {
            this.enemyBullet = new objects.bulletenemy();
            this.type = enums.GameObjectType.ISLAND;
            this._verticalSpeed = 0;
            this.velocity = new objects.Vector2(0, this._verticalSpeed);
            this.Reset();
        };
        enemy2.prototype.Update = function () {
            this._move();
            this._checkBounds();
        };
        enemy2.prototype.Reset = function () {
            this.Health = 3;
            var randomX = util.Mathf.RandomRange(this.halfWidth, config.Game.SCREEN_WIDTH - this.halfWidth);
            //  let randomY = util.Mathf.RandomRange(-this.height * 3, -this.height);
            this.position = new objects.Vector2(randomX, 0);
        };
        return enemy2;
    }(objects.GameObject));
    objects.enemy2 = enemy2;
})(objects || (objects = {}));
//# sourceMappingURL=enemy2.js.map