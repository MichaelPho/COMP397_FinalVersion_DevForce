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
    var Play2 = /** @class */ (function (_super) {
        __extends(Play2, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play2() {
            var _this = _super.call(this) || this;
            _this.check = true;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        //initialize and instatiate
        Play2.prototype.Start = function () {
            this.platform = new objects.platform(config.Game.ASSETS.getResult("background2"));
            this.bullet = new objects.bullet();
            this.status = new objects.Label("kill: 0/" + config.Game.FINISH_NUM2, "30px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH - 100, 20, true);
            this.health = new objects.Label(" ", "30px", "Consolas", "#FFFF00", 30, 20, true);
            this.score = new objects.Label("score: ", "30px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH / 2, config.Game.SCREEN_HEIGHT - 30, true);
            //  this._plane = new objects.Plane();
            this.master = new objects.Catsle();
            // create the cloud array
            this.enemy = new Array(); // empty container
            this.enemy2 = new Array(); // empty container
            var i = 1;
            var temp;
            // instantiating CLOUD_NUM clouds
            for (var index = 0; index < config.Game.ENEMY_NUM2; index++) {
                temp = new objects.enemy();
                this.enemy.push(temp);
            }
            var temp2;
            for (var index = 0; index < config.Game.ENEMY_NUM; index++) {
                temp2 = new objects.enemy2();
                this.enemy2.push(temp2);
            }
            this.Main();
        };
        Play2.prototype.Update = function () {
            var _this = this;
            this.check = false;
            this.master.Update();
            this.bullet.Update();
            this.enemy.forEach(function (en) {
                en.Update();
            });
            this.enemy2.forEach(function (en) {
                en.Update();
            });
            if (this.bullet.x != 0 && this.bullet.y != 1000) {
                this.checkgun();
            }
            this.checkDamage();
            this.movingCheck(this.testing);
            var stopMoving = function (e) {
                _this.testing = 0;
            };
            var moving = function (e) {
                // PRESS LEFT ARROW
                if (e.keyCode == 37) {
                    _this.testing = 1;
                }
                // PRESS RIGHT ARROW
                else if (e.keyCode == 39) {
                    _this.testing = 2;
                }
            };
            // this.bullet.start=true;
            var onClick = function (e) {
                if (_this.bullet.position.y == 1000 && _this.bullet.position.x == 0) {
                    var x = _this.master.x - e.clientX;
                    var y = _this.master.y - e.clientY;
                    var l = Math.sqrt(x * x + y * y);
                    // objects.Vector2.angle(new objects.Vector2(this.master.x,this.master.y),new objects.Vector2(this.master.x,this.master.y))
                    _this.bullet.angle.x = x / l * -10;
                    _this.bullet.angle.y = y / l * -10;
                    var Sound = createjs.Sound.play("shooting");
                    Sound.volume = 0.2;
                    _this.bullet.StartRun(new objects.Vector2(_this.master.x, _this.master.y));
                }
            };
            //Score Board Label
            config.Game.CURRENT_LIVES = config.Game.DEATH_NUM2 - this.master.damage;
            this.status.text = "kill: " + this.master.score + "/" + config.Game.FINISH_NUM2;
            this.health.text = "Health: " + (config.Game.CURRENT_LIVES);
            this.score.text = "score:" + (config.Game.SCORE);
            if (this.bullet.start) {
                console.log("turn to true");
            }
            //checkhighscore
            if (config.Game.HIGH_SCORE < config.Game.SCORE)
                config.Game.HIGH_SCORE = config.Game.SCORE;
            //event for moving and shooting
            window.addEventListener('click', onClick);
            window.addEventListener('keydown', moving);
            window.addEventListener('keyup', stopMoving);
        };
        Play2.prototype.movingCheck = function (check) {
            if (check == 1) {
                if (this.bullet.position.y == this.master.position.y) {
                    this.bullet.position.x -= 3;
                }
                this.master.x -= 3;
            }
            else if (check == 2) {
                if (this.bullet.position.y == this.master.position.y) {
                    this.bullet.position.x += 3;
                }
                this.master.x += 3;
            }
        };
        // Check Conclission
        Play2.prototype.checkgun = function () {
            var _this = this;
            this.enemy.forEach(function (en) {
                if (managers.Collision.AABBCheck(_this.bullet, en)) {
                    en.Reset();
                    _this.master.score += 1;
                    config.Game.SCORE += 1 * 100;
                    console.log("shoot small: " + _this.master.score);
                    _this.bullet.Reset();
                }
            });
            this.enemy2.forEach(function (en) {
                if (managers.Collision.AABBCheck(en.enemyBullet, _this.bullet)) {
                    _this.removeChild(en.enemyBullet);
                }
                if (managers.Collision.AABBCheck(en, _this.bullet)) {
                    if (en.Health == 0) {
                        en.Reset();
                        _this.master.score += 5;
                        config.Game.SCORE += 1 * 250;
                        console.log("shoot big: " + _this.master.score);
                        _this.removeChild(en.enemyBullet);
                        _this.bullet.Reset();
                    }
                    else {
                        _this.bullet.Reset();
                        console.log(en.Health + " is health");
                        en.Health -= 1;
                    }
                }
            });
            if (this.master.score >= config.Game.FINISH_NUM2) {
                config.Game.SCENE = scenes.State.PLAY3;
            }
        };
        Play2.prototype.Main = function () {
            var _this = this;
            this.addChild(this.platform);
            //  this.addChild(this._plane);
            var i = 1;
            var _loop_1 = function (en) {
                setTimeout(function () {
                    en.StartRun();
                    _this.addChild(en);
                    console.log("enemy out");
                }, i * 5000);
                i++;
                var _loop_2 = function (en_1) {
                    setTimeout(function () {
                        en_1.StartRun();
                        _this.addChild(en_1);
                        console.log("enemy out");
                    }, i * 8000);
                    i++;
                    var _loop_3 = function (en_2) {
                        setTimeout(function () {
                            en_2.StartRun();
                            _this.addChild(en_2);
                            console.log("enemy out");
                        }, i * 10000);
                        i++;
                    };
                    for (var _i = 0, _a = this_1.enemy2; _i < _a.length; _i++) {
                        var en_2 = _a[_i];
                        _loop_3(en_2);
                    }
                };
                for (var _i = 0, _a = this_1.enemy2; _i < _a.length; _i++) {
                    var en_1 = _a[_i];
                    _loop_2(en_1);
                }
                this_1.addChild(this_1.master);
                this_1.addChild(this_1.bullet);
                this_1.addChild(this_1.status);
                this_1.addChild(this_1.score);
                this_1.addChild(this_1.health);
            };
            var this_1 = this;
            for (var _i = 0, _a = this.enemy; _i < _a.length; _i++) {
                var en = _a[_i];
                _loop_1(en);
            }
        };
        Play2.prototype.Kill = function (a) {
            if (a) {
                this.enemy.forEach(function (element) {
                    if (element.y > 400) {
                        element.Reset();
                        console.log("kill small");
                        return false;
                    }
                });
                this.enemy2.forEach(function (element) {
                    if (element.y > 400) {
                        element.Reset();
                        console.log("kill big");
                        return false;
                    }
                });
            }
            else {
                return true;
            }
        };
        Play2.prototype.checkDamage = function () {
            var _this = this;
            this.enemy.forEach(function (en) {
                if (managers.Collision.AABBCheck(_this.master, en)) {
                    _this.master.damage += 5;
                    console.log("damage :" + _this.master.damage);
                    en.Reset();
                }
            });
            this.enemy2.forEach(function (en) {
                if (managers.Collision.AABBCheck(_this.master, en)) {
                    _this.master.damage += 10;
                    console.log("damage :" + _this.master.damage);
                    en.Reset();
                }
            });
            if (this.master.damage >= config.Game.DEATH_NUM2) {
                config.Game.SCENE = scenes.State.END;
            }
        };
        return Play2;
    }(objects.Scene));
    scenes.Play2 = Play2;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play2.js.map