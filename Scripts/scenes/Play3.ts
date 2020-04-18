module scenes {
    export class Play3 extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private platform?: objects.platform;
        //private _plane?: objects.Plane;
        private enemy2?: Array<objects.enemy2>;
        private master?: objects.Catsle;
        private bullet?: objects.bullet;
        private check?: boolean = true;
        private status: objects.Label;
        private health: objects.Label;
        private score: objects.Label;
        private enemy: Array<objects.enemy3>;
        private testing: number;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor() {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void {

            this.platform = new objects.platform(config.Game.ASSETS.getResult("background3"));

            this.bullet = new objects.bullet();


            this.status = new objects.Label("kill: 0/" + config.Game.FINISH_NUM3, "30px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH -100, 20, true);
            this.health = new objects.Label(" ", "30px", "Consolas", "#FFFF00", 30, 20, true);
            this.score = new objects.Label("score: ", "30px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH/2, config.Game.SCREEN_HEIGHT-30, true);
          
          
            //player
            this.master = new objects.Catsle();

            // create the enemy array
            this.enemy = new Array<objects.enemy3>(); // empty container
            this.enemy2 = new Array<objects.enemy2>(); // empty container
            let i: number = 1;
            let temp: objects.enemy3;
            // instantiating enemy_NUM enemys
            for (let index = 0; index < config.Game.ENEMY_NUM2; index++) {
                temp = new objects.enemy3();

                this.enemy.push(temp);


            }
            let temp2: objects.enemy2;
            for (let index = 0; index < config.Game.ENEMY_NUM; index++) {
                temp2 = new objects.enemy2();

                this.enemy2.push(temp2);


            }




            this.Main();
        }

        public Update(): void {
            // setTimeout(() => {
            //     console.log("tesr 3 second");  
            //   },1000 );
            //     setTimeout(() => { alert('Hello') }, 2000);
            //    this.platform.Update();
            //    let smallestDistance:number=0;

            //   this._plane.Update();




            //this.Kill(this.check);
            this.check = false;

            this.master.Update();
            this.bullet.Update();
            this.enemy.forEach((en) => {
                en.Update();
                if (en.CheckBounds()) {

                    en.enemyBullet.Update();
                    //console.log("bullet with"+ en.enemyBullet.x+ " y" + en.enemyBullet.y)   ;
                    // console.log("enemy with"+ en.x+ " y" + en.y)   ;
                    if (en.enemyBullet.y == 0) {
                        console.log("success");
                        let x = en.x - this.master.x;
                        let y = en.y - this.master.y;
                        let l = Math.sqrt(x * x + y * y);

                        // objects.Vector2.angle(new objects.Vector2(this.master.x,this.master.y),new objects.Vector2(this.master.x,this.master.y))
                        en.enemyBullet.angle.x = x / l * -2;
                        en.enemyBullet.angle.y = y / l * -2;
                        this.addChild(en.enemyBullet);
                        en.enemyBullet.StartRun(new objects.Vector2(en.x, en.y));




                    }
                    else if (en.enemyBullet.CheckBounds()) {
                        console.log("enemy bullet gone");
                        this.removeChild(en.enemyBullet);
                    }
                }

                // managers.Collision.squaredRadiusCheck(this.master, en);
            });
            this.enemy2.forEach((en) => {
                en.Update();



                // managers.Collision.squaredRadiusCheck(this.master, en);
            });




            if (this.bullet.x != 0 && this.bullet.y != 1000) {
                this.checkgun();
            }

            this.checkDamage();


            this.movingCheck(this.testing);

            const stopMoving = (e: KeyboardEvent) => {

                this.testing = 0
            }
            
            
            const moving = (e: KeyboardEvent) => {
                // PRESS LEFT ARROW
                if (e.keyCode == 37) {
                    this.testing = 1;

                }
                // PRESS RIGHT ARROW
                else if (e.keyCode == 39) {
                    this.testing = 2;
                }
            
            };

            // this.bullet.start=true;
            const onClick = (e: MouseEvent) => {

                if (this.bullet.position.y == 1000 && this.bullet.position.x == 0) {
                    let x = this.master.x - e.clientX;
                    let y = this.master.y - e.clientY;
                    let l = Math.sqrt(x * x + y * y);

                    // objects.Vector2.angle(new objects.Vector2(this.master.x,this.master.y),new objects.Vector2(this.master.x,this.master.y))
                    this.bullet.angle.x = x / l * -10;
                    this.bullet.angle.y = y / l * -10
                        ;
                        let Sound = createjs.Sound.play("shooting");
                        Sound.volume = 0.2;
                    this.bullet.StartRun(new objects.Vector2(this.master.x, this.master.y));


                }


            };

            //Score Board Label
            
            this.status.text = "kill: "+ this.master.score + "/" + config.Game.FINISH_NUM3;
            this.health.text = "Health: "+ (config.Game.CURRENT_LIVES) ;
            this.score.text = "score:"+ (config.Game.SCORE)  ;
            if(config.Game.HIGH_SCORE<config.Game.SCORE)
            config.Game.HIGH_SCORE= config.Game.SCORE




            if (this.bullet.start) {
                console.log("turn to true");
            }

            //event for moving and shooting
            window.addEventListener('click', onClick);
            window.addEventListener('keydown', moving);
            window.addEventListener('keyup', stopMoving);


        }


        movingCheck(check: number) {
            if (check == 1) {
                if (this.bullet.position.y == this.master.position.y) { this.bullet.position.x -= 3; }
                this.master.x -= 3;
            }
            else if (check == 2) {
                if (this.bullet.position.y == this.master.position.y) { this.bullet.position.x += 3; }
                this.master.x += 3;
            }

        }

        checkgun() {
            this.enemy.forEach((en) => {
                if (managers.Collision.AABBCheck(en.enemyBullet, this.bullet)) {
                    this.removeChild(en.enemyBullet);
                }
                if (managers.Collision.AABBCheck(en, this.bullet)) {
                    if (en.Health == 0) {
                        en.Reset();
                        config.Game.SCORE+=1*150;
                        this.master.score += 1;
                        console.log("shoot shooter: " + this.master.score);
                        
                        this.removeChild(en.enemyBullet)
                        en.enemyBullet.Reset();
                        this.bullet.Reset();
                    }
                    else {
                        this.removeChild(en.enemyBullet);
                        this.bullet.Reset();
                        console.log(en.Health + " is health")
                        en.Health -= 1;
                    }
                }
            });
            this.enemy2.forEach((en) => {
               
                if (managers.Collision.AABBCheck(en.enemyBullet, this.bullet)) {
                    this.removeChild(en.enemyBullet);
                }
                if (managers.Collision.AABBCheck(en, this.bullet)) {
                    if (en.Health == 0) {
                        en.Reset();
                        this.master.score += 5;
                        config.Game.SCORE+=1*250;
                        console.log("shoot big: " + this.master.score);
                        this.removeChild(en.enemyBullet)
                        this.bullet.Reset();
                    }
                    else {
                        this.bullet.Reset();
                        console.log(en.Health + " is health")
                        en.Health -= 1;
                    }
                }
            });
            



            if (this.master.score >= config.Game.FINISH_NUM3) {
                config.Game.SCENE = scenes.State.END;
              
            }

        }


        public Main(): void {

            this.addChild(this.platform);


            if (config.Game.CURRENT_LIVES==0)
            {
                config.Game.CURRENT_LIVES=100;
            }
            //  this.addChild(this._plane);
            let i: number = 1;
            for (const en of this.enemy) {
                setTimeout(() => {

                    en.StartRun();
                    this.addChild(en);
                    console.log("enemy shooting out");
                }, i * 5000);
                i++;
                for (const en of this.enemy2) {
                    setTimeout(() => {

                        en.StartRun();
                        this.addChild(en);
                        console.log("enemy out");
                    }, i * 8000);
                    i++;

                }
                this.addChild(this.master);
                this.addChild(this.bullet);
                this.addChild(this.status);
                this.addChild(this.score);
                this.addChild(this.health);
            }
        }
              private checkDamage(): void {

            this.enemy.forEach((en) => {

                if (managers.Collision.AABBCheck(this.master, en)) {
                    this.master.damage += 5;
                    config.Game.CURRENT_LIVES-=5;
                    console.log("damage :" + this.master.damage);
                    en.Reset();
                }
                if (managers.Collision.AABBCheck(this.master, en.enemyBullet)) {
                    this.removeChild(en.enemyBullet);
                    this.master.damage += 2;
                    config.Game.CURRENT_LIVES-=2;
                    console.log("damage from enemy bullet :" + this.master.damage);
                }
            });
            this.enemy2.forEach((en) => {
                if (managers.Collision.AABBCheck(this.master, en)) {
                    this.master.damage += 10;
                    config.Game.CURRENT_LIVES-=10;
                    console.log("damage :" + this.master.damage);
                    en.Reset();
                }
            });


            if (config.Game.CURRENT_LIVES <=0) {
                config.Game.SCENE = scenes.State.END;
            }
        }
    }


}
