 /**
  * MyInterface class, creating a GUI interface.
  * @constructor
  */
function MyInterface() {
    //call CGFinterface constructor
    CGFinterface.call(this);
}
;

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * Initializes the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);

    this.gui = new dat.GUI();

     let config = {
         newGame: this.requestNewConfig,
         gameMode: GAMEMODE.HUMAN_VS_HUMAN,
         changeCamera: this.updateCamera,
         quitServer: this.quitServer,
         theme: THEME.LEGACY,
         scene: this.scene
     };


     let configFolder = this.gui.addFolder('Configuration');
     configFolder.add(config, 'gameMode', {
         'Human vs Human': GAMEMODE.HUMAN_VS_HUMAN,
         'Human vs CPU': GAMEMODE.HUMAN_VS_CPU,
         'CPU vs CPU': GAMEMODE.CPU_VS_CPU
     }).name('Game Mode');


     configFolder.add(config, 'newGame').name('New Game');
     configFolder.add(config, 'changeCamera').name('Change Camera');
     configFolder.add(config, 'quitServer').name('Quit Server');
     configFolder.open();

     configFolder.add(this.scene, 'currentScene', {
          'Normal': 1,
          'Trippy': 2
     }).name('Theme');

     return true;

};

MyInterface.prototype.requestNewConfig = function () {

	getPrologRequest('initialize', this.scene.newGame.bind(this.scene,this.gameMode));

};


MyInterface.prototype.addLightsGroup = function(lights) {

    if(this.gui.__folders.Lights == null){

        var group = this.gui.addFolder("Lights");


        for (var key in lights) {
            if (lights.hasOwnProperty(key)) {
                this.scene.lightValues[key] = lights[key][0];
                group.add(this.scene.lightValues, key);
            }
        }
    	group.close();
    }
}


MyInterface.prototype.updateCamera = function(){
   this.scene.nextCamera();
   //this.scene.cameraChange();
}

MyInterface.prototype.quitServer = function(){
  getPrologRequest('quit');
}

MyInterface.prototype.processKeyboard = function(event) {

	var x = event.which || event.keyCode;             // Get the Unicode value


	if (x == 32)
		if(this.scene.game instanceof GameCPU)
      this.scene.game.newTurn();




};
