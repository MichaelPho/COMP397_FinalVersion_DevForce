module scenes {
    export class Play extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private platform?: objects.platform;
        
        private enemy2?: objects.enemy2;
        private master?: objects.Catsle;
        private bullet?: objects.bullet;
        private check?: boolean = true;
        private status: objects.Label;
        private health: objects.Label;
        private score: objects.Label;
        private enemy: Array<objects.enemy>;

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


            this.platform = new objects.platform();
            this.bullet = new objects.bullet();
            this.status = new objects.Label("kill: 0/" + config.Game.FINISH_NUM, "30px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH -100, 20, true);
            this.health = new objects.Label(" ", "30px", "Consolas", "#FFFF00", 30, 20, true);
            this.score = new objects.Label("score: ", "30px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH/2, config.Game.SCREEN_HEIGHT-30, true);
          
            this.enemy2 = new objects.enemy2();
            this.master = new objects.Catsle();

            // create the cloud array
            this.enemy = new Array<objects.enemy>(); // empty container
            let i: number = 1;
            let temp: objects.enemy;
            // instantiating ENEMY_NUM 
            for (let index = 0; index < config.Game.ENEMY_NUM; index++) {
                temp = new objects.enemy();

                this.enemy.push(temp);


            }




            this.Main();
        }

        public Update(): void {


            this.check = false;

            this.master.Update();
            this.bullet.Update();



            this.enemy.forEach((en) => {
                en.Update();

            });

            let locationX = this.bullet.x;
            if (this.bullet.x != 0 && this.bullet.y != 1000) {
                this.checkgun();
            }
            this.checkDamage();
            //locaction check

            const onClick = (e: MouseEvent) => {
                if (this.bullet.position.y == 1000 && this.bullet.position.x == 0) {
                    

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
                let x = this.master.x - sessionStorage.X;
                let y = this.master.y - sessionStorage.Y;
                let l = Math.sqrt(x * x + y * y);
                this.bullet.angle.x = x / l * -10;
                this.bullet.angle.y = y / l * -10;

                let Sound = createjs.Sound.play("shooting");
                Sound.volume = 0.2;
                this.bullet.StartRun();


                sessionStorage.clear();
            }
            //console.log("changed x: "+this.bullet.x +" y: "+this.bullet.y);
            this.status.text = "kill: "+ this.master.score + "/" + config.Game.FINISH_NUM;
            this.health.text = "Health: "+ (config.Game.DEATH_NUM -this.master.damage)  ;
           
            this.score.text = "score:"+ (config.Game.SCORE)  ;
            if(config.Game.HIGH_SCORE<config.Game.SCORE)
            config.Game.HIGH_SCORE= config.Game.SCORE
            window.addEventListener('click', onClick);


        }
        checkgun() {
            //  console.log("changed x: "+this.bullet.x +" y: "+this.bullet.y);

            this.enemy.forEach((en) => {
                if (managers.Collision.AABBCheck(this.bullet, en)) {
                    en.Reset();
                    this.master.score += 1;
                    config.Game.SCORE+=1*100;
                    console.log("shoot small: " + this.master.score);
                    console.log("changed x: " + this.bullet.x + " y: " + this.bullet.y);
                    this.bullet.Reset();

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

        }


        public Main(): void {

            this.addChild(this.platform);

            this.addChild(this.enemy2);

           
            let i: number = 1;
            for (const en of this.enemy) {
                setTimeout(() => {

                    en.StartRun();
                    this.addChild(en);
                    console.log("enemy out");
                }, i * 5000);
                i++;
            }
            this.addChild(this.master);
            this.addChild(this.health);
            this.addChild(this.score);
            this.addChild(this.status);
        
        }
       
        private checkDamage(): void {
            
            this.enemy.forEach((en) => {
                if (en.y == 680) {
                    en.Reset();
                    this.master.damage += 1;
                    
                    console.log("damage :" + this.master.damage);

                }
            });
            if (managers.Collision.AABBCheck(this.master, this.enemy2)) {
              
                this.master.damage += 2;
                console.log("damage :" + this.master.damage);

            }

            if (this.master.damage >= config.Game.DEATH_NUM) {
                config.Game.SCENE = scenes.State.END;
            }
        }
    }


}
