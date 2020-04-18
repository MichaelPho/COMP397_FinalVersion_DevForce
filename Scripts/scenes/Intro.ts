module scenes
{
    export class Intro extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _endLabel: objects.Label;
        private _backButton: objects.Button;
        private _ocean: objects.background;
        private _background: objects.background;
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
           
           
            // buttons
             this._backButton = new objects.Button(config.Game.ASSETS.getResult("turnBack"),  config.Game.SCREEN_WIDTH/2, config.Game.SCREEN_HEIGHT/2 +300, true);
             this._background = new objects.background(config.Game.ASSETS.getResult("intro"));
             this._background.SetMiddle();

             
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

            this.addChild(this._endLabel);
            this.addChild(this._background);
            this.addChild(this._backButton);
            this._backButton.on("click", ()=>{
                config.Game.SCENE = scenes.State.START;
            });

        }

        
    }
}