module scenes
{
    export class End extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _endLabel: objects.Label;
        private _backButton: objects.Button;
        private _ocean: objects.background;
        private _score: objects.Label;
         private _lives: objects.Label;
        private _highScore: objects.Label;
        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        // Initializing and Instantiating
        public Start(): void 
        {
             //instantiate a new Text object
            this._endLabel = new objects.Label("Game Finish", "80px", "Consolas", "#FFFF00", config.Game.SCREEN_WIDTH/2, 180, true);
            // buttons
             this._backButton = new objects.Button(config.Game.ASSETS.getResult("backButton"),  config.Game.SCREEN_WIDTH/2, config.Game.SCREEN_HEIGHT/2 +120, true);
             this._highScore = new objects.Label("High Score: "+ config.Game.HIGH_SCORE, "50px", "Consolas", "#B53737", config.Game.SCREEN_WIDTH/2, config.Game.SCREEN_HEIGHT/2, true);
             this._score = new objects.Label("Curent Score: "+ config.Game.SCORE, "50px", "Consolas", "#1261A0", config.Game.SCREEN_WIDTH/2, config.Game.SCREEN_HEIGHT/2 -100, true);
             if(config.Game.CURRENT_LIVES>0)
             this._lives= new objects.Label("_lives: "+ config.Game.CURRENT_LIVES, "50px", "Consolas", "#1261A0", config.Game.SCREEN_WIDTH/2, config.Game.SCREEN_HEIGHT/2 -50, true);
             else
             this._lives= new objects.Label("Good Luck next time!", "50px", "Consolas", "#1261A0", config.Game.SCREEN_WIDTH/2, config.Game.SCREEN_HEIGHT/2 -50, true);
             this._ocean = new objects.background();
             config.Game.SCORE=0;
             config.Game.CURRENT_LIVES=100;
             
             this.Main();
        }        
        
        public Update(): void 
        {
            this._ocean.Update();
            
        }
        
        public Main(): void 
        {
            this.addChild(this._ocean);

            this.addChild(this._endLabel);

            this.addChild(this._lives);
            this.addChild(this._backButton);
            this.addChild(this._score);
            this.addChild(this._highScore);
            this._backButton.on("click", ()=>{
                config.Game.SCENE = scenes.State.START;
            });

        }

        
    }
}