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
         scene: this.scene
     };


     let configFolder = this.gui.addFolder('Configuration');
     configFolder.add(config, 'gameMode', {
         'Human vs Human': GAMEMODE.HUMAN_VS_HUMAN,
         'Human vs CPU': GAMEMODE.HUMAN_VS_CPU,
         'CPU vs CPU': GAMEMODE.CPU_VS_CPU,
     }).name('Game Mode');


     configFolder.add(config, 'newGame').name('New Game');
     configFolder.add(config, 'changeCamera').name('Change Camera');
     configFolder.open();

     return true;

};

MyInterface.prototype.requestNewConfig = function () {

	getPrologRequest('initialize', this.scene.newGame.bind(this.scene,this.gameMode));

};


MyInterface.prototype.addLightsGroup = function(lights) {

    var group = this.gui.addFolder("Lights");


    for (var key in lights) {
        if (lights.hasOwnProperty(key)) {
            this.scene.lightValues[key] = lights[key][0];
            group.add(this.scene.lightValues, key);
        }
    }

	group.close();
}


MyInterface.prototype.updateCamera = function(){

  if(this.scene.camera == this.scene.cameras[0])
    this.scene.camera = this.scene.cameras[1];
  else this.scene.camera = this.scene.cameras[0];
}
