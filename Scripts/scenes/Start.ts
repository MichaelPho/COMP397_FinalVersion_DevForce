module scenes
{
    export class Start extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _welcomeLabel: objects.Label;
        private _startButton: objects.Button;
        private _startButton2: objects.Button;
        private _startButton3: objects.Button;
        private _ocean: objects.background;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS
        public Start(): void 
        {
             //instantiate a new Text object
            this._welcomeLabel = new objects.Label("Metal Force", "80px", "Consolas", "#FFFF00", 370, 180, true);
            // buttons
             this._startButton = new objects.Button(config.Game.ASSETS.getResult("startButton"), 370, 430, true);
             this._startButton2 = new objects.Button(config.Game.ASSETS.getResult("instruction"), 370, 530, true);
             this._startButton3 = new objects.Button(config.Game.ASSETS.getResult("credit"), 370, 630, true);
             this._ocean = new objects.background();
            this.Main();
        }        
        
        public Update(): void 
        {
           this._ocean.Update();
        }
        
        public Main(): void 
        {
            this.addChild(this._ocean);
       
            this.addChild(this._welcomeLabel);

        
            this.addChild(this._startButton);
            this.addChild(this._startButton2);
           this.addChild(this._startButton3);

            this._startButton.on("click", ()=>{
                config.Game.SCENE = scenes.State.LEVEL;
            });
            this._startButton2.on("click", ()=>{
               config.Game.SCENE = scenes.State.HOWTOPLAY;
            });
            this._startButton3.on("click", ()=>{
                config.Game.SCENE = scenes.State.INTRO;
            });

        }

        
    }
}