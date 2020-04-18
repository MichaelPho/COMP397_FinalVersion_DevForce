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
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            _this.check = true;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        //initialize and instatiate
        Play.prototype.Start = function () {
            this.platform = new objects.platform();
            this.bullet = new objects.bullet();
            this.status = new objects.Label("kill: 0/" + config.Game.FINISH_NUM, "30px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH - 100, 20, true);
            this.health = new objects.Label(" ", "30px", "Consolas", "#FFFF00", 30, 20, true);
            this.score = new objects.Label("score: ", "30px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH / 2, config.Game.SCREEN_HEIGHT - 30, true);
            this.enemy2 = new objects.enemy2();
            this.master = new objects.Catsle();
            // create the cloud array
            this.enemy = new Array(); // empty container
            var i = 1;
            var temp;
            // instantiating ENEMY_NUM 
            for (var index = 0; index < config.Game.ENEMY_NUM; index++) {
                temp = new objects.enemy();
                this.enemy.push(temp);
            }
            this.Main();
        };
        Play.prototype.Update = function () {
            var _this = this;
            this.check = false;
            this.master.Update();
            this.bullet.Update();
            this.enemy.forEach(function (en) {
                en.Update();
            });
            var locationX = this.bullet.x;
            if (this.bullet.x != 0 && this.bullet.y != 1000) {
                this.checkgun();
            }
            this.checkDamage();
            //locaction check
            var onClick = function (e) {
                if (_this.bullet.position.y == 1000 && _this.bullet.position.x == 0) {
                    sessionStorage.X = e.clientX;
                    sessionStorage.Y = e.clientY;
                    sessionStorage.check = true;
                }
            };
            //shooting start
            this.check = sessionStorage.check;
            if (this.check) {
                this.addChild(this.bullet);
                console.log("working : " + sessionStorage.X + " " + sessionStorage.Y);
                var x = this.master.x - sessionStorage.X;
                var y = this.master.y - sessionStorage.Y;
                var l = Math.sqrt(x * x + y * y);
                this.bullet.angle.x = x / l * -10;
                this.bullet.angle.y = y / l * -10;
                var Sound = createjs.Sound.play("shooting");
                Sound.volume = 0.2;
                this.bullet.StartRun();
                sessionStorage.clear();
            }
            //console.log("changed x: "+this.bullet.x +" y: "+this.bullet.y);
            this.status.text = "kill: " + this.master.score + "/" + config.Game.FINISH_NUM;
            this.health.text = "Health: " + (config.Game.DEATH_NUM - this.master.damage);
            this.score.text = "score:" + (config.Game.SCORE);
            if (config.Game.HIGH_SCORE < config.Game.SCORE)
                config.Game.HIGH_SCORE = config.Game.SCORE;
            window.addEventListener('click', onClick);
        };
        Play.prototype.checkgun = function () {
            //  console.log("changed x: "+this.bullet.x +" y: "+this.bullet.y);
            var _this = this;
            this.enemy.forEach(function (en) {
                if (managers.Collision.AABBCheck(_this.bullet, en)) {
                    en.Reset();
                    _this.master.score += 1;
                    config.Game.SCORE += 1 * 100;
                    console.log("shoot small: " + _this.master.score);
                    console.log("changed x: " + _this.bullet.x + " y: " + _this.bullet.y);
                    _this.bullet.Reset();
                }
            });
            if (managers.Collision.AABBCheck(this.bullet, this.enemy2)) {
                this.enemy2.Reset();
                this.master.score += 2;
                console.log("shoot big" + this.master.score);
                console.log("changed x: " + this.bullet.x + " y: " + this.bullet.y);
                this.bullet.Reset();
            }
            if (this.master.score >= config.Game.FINISH_NUM) {
                config.Game.SCENE = scenes.State.PLAY2;
            }
        };
        Play.prototype.Main = function () {
            var _this = this;
            this.addChild(this.platform);
            this.addChild(this.enemy2);
            var i = 1;
            var _loop_1 = function (en) {
                setTimeout(function () {
                    en.StartRun();
                    _this.addChild(en);
                    console.log("enemy out");
                }, i * 5000);
                i++;
            };
            for (var _i = 0, _a = this.enemy; _i < _a.length; _i++) {
                var en = _a[_i];
                _loop_1(en);
            }
            this.addChild(this.master);
            this.addChild(this.health);
            this.addChild(this.score);
            this.addChild(this.status);
        };
        Play.prototype.checkDamage = function () {
            var _this = this;
            this.enemy.forEach(function (en) {
                if (en.y == 680) {
                    en.Reset();
                    _this.master.damage += 1;
                    console.log("damage :" + _this.master.damage);
                }
            });
            if (managers.Collision.AABBCheck(this.master, this.enemy2)) {
                this.master.damage += 2;
                console.log("damage :" + this.master.damage);
            }
            if (this.master.damage >= config.Game.DEATH_NUM) {
                config.Game.SCENE = scenes.State.END;
            }
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map