var DEGREE_TO_RAD = Math.PI / 180;

/**
 * XMLscene class, representing the scene that is to be rendered.
 * @constructor
 */
function XMLscene(interface) {
    CGFscene.call(this);
    this.CAMERA_ANIMATION_TIME = 1;

    this.interface = interface;
    this.lightValues = {};
    this.shaderObjects = {};

}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

/**
 * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
 */
XMLscene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);

    this.cameras = [];
    this.initCameras();

    this.currentCamera = 0;

    this.enableTextures(true);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

	  this.lastUpdateTime = (new Date()).getTime();

    this.axis = new CGFaxis(this);

	  this.setPickEnabled(true);
    this.game = new Game();
}

/**
 * Initializes the scene lights with the values read from the LSX file.
 */
XMLscene.prototype.initLights = function() {
    var i = 0;
    // Lights index.

    // Reads the lights from the scene graph.
    for (var key in this.graph.lights) {
        if (i >= 8)
            break;              // Only eight lights allowed by WebGL.

        if (this.graph.lights.hasOwnProperty(key)) {
            var light = this.graph.lights[key];

            this.lights[i].setPosition(light[1][0], light[1][1], light[1][2], light[1][3]);
            this.lights[i].setAmbient(light[2][0], light[2][1], light[2][2], light[2][3]);
            this.lights[i].setDiffuse(light[3][0], light[3][1], light[3][2], light[3][3]);
            this.lights[i].setSpecular(light[4][0], light[4][1], light[4][2], light[4][3]);

            this.lights[i].setVisible(true);
            if (light[0])
                this.lights[i].enable();
            else
                this.lights[i].disable();

            this.lights[i].update();

            i++;
        }
    }



}

/**
 * Initializes the scene cameras.
 */
XMLscene.prototype.initCameras = function() {
  //this.camera = new CGFcamera(0.4,0.1,500,vec3.fromValues(15, 15, 15),vec3.fromValues(0, 0, 0));

    this.cameras[0] = new CGFcamera(0.4,0.1,500,vec3.fromValues(15, 15, 15),vec3.fromValues(0, 0, 0));
    this.cameras[1] = new CGFcamera(0.4,0.1,500,vec3.fromValues(1, 25, 10),vec3.fromValues(0, 0, 0));

    this.camera = this.cameras[0];
}

/* Handler called when the graph is finally loaded.
 * As loading is asynchronous, this may be called already after the application has started the run loop
 */
XMLscene.prototype.onGraphLoaded = function()
{
    this.camera.near = this.graph.near;
    this.camera.far = this.graph.far;

    this.axis = new CGFaxis(this,this.graph.referenceLength);

    this.setGlobalAmbientLight(this.graph.ambientIllumination[0], this.graph.ambientIllumination[1],
    this.graph.ambientIllumination[2], this.graph.ambientIllumination[3]);

    this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);

    this.initLights();

	  this.interface.addLightsGroup(this.graph.lights);

  	this.setUpdatePeriod(1000/60);
    //this.setUpdatePeriod(20);
  	this.prevTime = -1;
}

/**
 * Displays the scene.
 */
XMLscene.prototype.display = function() {
	this.handlePicking();
	this.clearPickRegistration();
    // ---- BEGIN Background, camera and axis setup

    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();


    this.pushMatrix();

    if (this.graph.loadedOk)
    {
        // Applies initial transformations.
        this.multMatrix(this.graph.initialTransforms);

		// Draw axis
		this.axis.display();


		var i = 0;
        for (var key in this.lightValues) {
            if (this.lightValues.hasOwnProperty(key)) {
                if (this.lightValues[key]) {
                    this.lights[i].setVisible(true);
                    this.lights[i].enable();
                }
                else {
                    this.lights[i].setVisible(false);
                    this.lights[i].disable();
                }
                this.lights[i].update();
                i++;
            }
        }


        // Displays the scene.
        this.graph.displayScene();

    }
	else
	{
		// Draw axis
		this.axis.display();
	}


    this.popMatrix();


    // ---- END Background, camera and axis setup

}

XMLscene.prototype.update = function (currTime) {


    if(this.prevTime == -1)
  		this.graph.update(0);
  	else
  		this.graph.update(currTime-this.prevTime);

   if(this.prevTime == -1)
    this.animateCamera(0);
   else {
     this.animateCamera(currTime-this.prevTime);
   }

   this.prevTime = currTime;


};

XMLscene.prototype.handlePicking = function (){
	if (this.pickMode == false) {
		if (this.pickResults != null && this.pickResults.length > 0) {
			for (var i=0; i< this.pickResults.length; i++) {
				var obj = this.pickResults[i][0];
				if (obj)
				{
					var customId = this.pickResults[i][1];
					console.log(obj.nodeID);
					console.log("Picked object: " + obj + ", with pick id " + customId);
					if(this.game.running)
						this.game.picked(obj);
				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}
	}
}


XMLscene.prototype.newGame = function (gameMode,data){

	let board = JSON.parse(data.target.response);

	this.game.newGame(this,gameMode,board);

	document.getElementById('overlay').style.display = 'block';

	let scores = document.getElementsByClassName('score');
    for (let score of scores)
		score.innerHTML = '0';
};



XMLscene.prototype.loadTheme = function (theme) {
    if (theme == THEME.NORMAL) {
        let filename = getUrlVars()['file'] || "game.lsx";
        //this.lights = [];
        this.cameras = [];
        this.graph = new MySceneGraph(filename, this);
    }
    else {
        let filename = getUrlVars()['file'] || "game2.lsx";
        this.cameras = [];
        //this.lights = [];
        this.graph = new MySceneGraph(filename, this);
    }
};

XMLscene.prototype.nextCamera = function () {
    //this.currentCamera = (this.currentCamera + 1) % this.cameras.length;

    this.changingCamera = true;
    this.timeElapsed = 0;
};

/**
 * Animates the camera transition
 * @param deltaTime Delta time
 */
XMLscene.prototype.animateCamera = function (deltaTime) {
    if (!this.changingCamera)
        return;

    // *0.95 is to avoid flickering when the animation surpasses the expected camera position
    if (this.timeElapsed > this.CAMERA_ANIMATION_TIME * 0.6) {
        this.changingCamera = false;
        this.currentCamera = (this.currentCamera + 1) % this.cameras.length;
        //this.camera = this.cameras[this.currentCamera];
        return;
    }

  /*  let cameraNext = (this.currentCamera + 1) % this.cameras.length;

    if(cameraNext.position == this.cameras[this.currentCamera].position){
      this.changingCamera = false;
      this.currentCamera = (this.currentCamera + 1) % this.cameras.length;
      this.camera = this.cameras[this.currentCamera];
      return;

    }*/



    let currCamera = this.cameras[this.currentCamera];
    let nextCamera = this.cameras[(this.currentCamera + 1) % this.cameras.length];

    let targetCenter = midPoint(currCamera.target, nextCamera.target);
    let positionCenter = midPoint(currCamera.position, nextCamera.position);

    let targetRadius = distance(targetCenter, nextCamera.target);
    let positionRadius = distance(positionCenter, nextCamera.position);

    this.timeElapsed += deltaTime / 2000;
    let cameraAngle = Math.PI * this.timeElapsed / this.CAMERA_ANIMATION_TIME;
    let multiplier = this.currentCamera ? 1 : -1;

    let targetPosition = [
        targetCenter[0] + multiplier * targetRadius * Math.sin(cameraAngle),
        targetCenter[1],
        targetCenter[2] + multiplier * targetRadius * Math.cos(cameraAngle),
        1
    ];

    let positionPosition = [
        positionCenter[0] + multiplier * positionRadius * Math.sin(cameraAngle),
        positionCenter[1],
        positionCenter[2] + multiplier * positionRadius * Math.cos(cameraAngle),
        1
    ];

    this.camera = new CGFcamera(currCamera.fov, currCamera.near, currCamera.far,
        positionPosition, targetPosition);
};
