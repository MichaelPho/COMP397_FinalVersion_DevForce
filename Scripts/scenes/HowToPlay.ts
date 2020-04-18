module scenes
{
    export class HowToPlay extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _endLabel: objects.Label;
        private _backButton: objects.Button;
        private _nextButton: objects.Button;
        private _ocean: objects.background;
        private _background: objects.background;
        private _background2: objects.background;
        private _background3: objects.background;
        private _page:number;
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
             this._backButton = new objects.Button(config.Game.ASSETS.getResult("turnBack"),  config.Game.SCREEN_WIDTH/2-150,config.Game.SCREEN_HEIGHT-50, true);
             this._nextButton = new objects.Button(config.Game.ASSETS.getResult("nextButton"),  config.Game.SCREEN_WIDTH/2+150, config.Game.SCREEN_HEIGHT-50, true);
             this._background = new objects.background(config.Game.ASSETS.getResult("step1"));
             this._background2 = new objects.background(config.Game.ASSETS.getResult("step2"));
             this._background3 = new objects.background(config.Game.ASSETS.getResult("step3"));
             this._background.SetMiddle2();
             this._background2.SetMiddle2();
             this._background3.SetMiddle2();
             this._ocean = new objects.background();

             
             this._page=1;
             
             this._ocean = new objects.background();
           
             
             this.Main();
        }        
        
        public Update(): void 
        {
            this._ocean.Update();

            this._nextButton.on("click", ()=>{
                
                switch (this._page) {
                    case 1:
                        this.addChild(this._background);
                        this.removeChild(this._background2);
                        this.removeChild(this._background3);
                        this._page+=1;
                        break;
                    case 2:
                        this.addChild(this._background2);
                        this.removeChild(this._background);
                        this.removeChild(this._background3);
                       this._page+=1
                        break;
                     case 3:
                            this.addChild(this._background3);
                            this.removeChild(this._background);
                            this.removeChild(this._background2);
                            this._page=1;
                           
                            break;
                        }

                        this.addChild(this._nextButton);
                this.addChild(this._backButton);

            });
            if(this._page==3)
            {
                this._page=1;
            }
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
            this.addChild(this._nextButton);
           

        }

        
    }
}