module objects
{
    export class enemy2 extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalSpeed?:number;
        private _horizontalSpeed?:number;
        private _health?:number =3;
        private _enemybullet?: objects.bulletenemy;

        // PUBLIC PROPERTIES
        public get Health(): number {
            return this._health;
        }
        public set Health(value: number) {
            this._health = value;
        }
        public get enemyBullet(): objects.bulletenemy {
            return this._enemybullet;
        }
        public set enemyBullet(value: objects.bulletenemy) {
            this._enemybullet = value;
        }

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.ASSETS.getResult("island"), new Vector2(), true);
            this.Start();
        }

        // PRIVATE METHODS

        protected _checkBounds(): void 
        {
            if(this.y >= config.Game.SCREEN_HEIGHT + this.height)
            {
                this.Reset();
            }
        }       
     
        private _move():void
        {
            this.position = objects.Vector2.add(this.position, this.velocity);
        }
        public StartRun(): void{
           this._verticalSpeed = 4;
            this.velocity = new objects.Vector2(0, this._verticalSpeed);
            console.log("start run");
        }
        
        // PUBLIC METHODS
        public Start(): void 
        {
            this.enemyBullet= new objects.bulletenemy();
            
            this.type = enums.GameObjectType.ISLAND;
            this._verticalSpeed = 0;
            this.velocity = new objects.Vector2(0, this._verticalSpeed);
            this.Reset();
          
        }
        
        public Update(): void 
        { 
           
            this._move();
            this._checkBounds();
        }
        
        public Reset(): void 
        {
            
            this.Health=3;
            let randomX = util.Mathf.RandomRange(this.halfWidth, config.Game.SCREEN_WIDTH - this.halfWidth);
          //  let randomY = util.Mathf.RandomRange(-this.height * 3, -this.height);
            this.position = new Vector2(randomX,0);
        }

        
    }
}