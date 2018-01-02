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

    this.gameCameraAnimation = null;

    this.currentScene = 1;
    this.currentCamera = 0;

    this.enableTextures(true);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

	  this.lastUpdateTime = (new Date()).getTime();

    this.axis = new CGFaxis(this);

	  this.setPickEnabled(true);


    this.shader = new CGFshader(this.gl,"shaders/MyShader.vert","shaders/MyShader.frag");
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


    if(this.prevTime == -1){
      this.animateCamera(0);
      this.graph.update(0);
    }
    else {
      this.animateCamera(currTime-this.prevTime);
      this.graph.update(currTime-this.prevTime);
    }

    this.time = (Math.cos(currTime/200))/ 2 + 0.5;

    this.shader.setUniformsValues({timeFactor:this.time});

    if(typeof this.game != "undefined")
      this.updateTime(currTime);

    this.prevTime = currTime;
};

XMLscene.prototype.updateTime = function(currTime){

  if(this.game.over){
    document.getElementById('time').innerText = (this.hours) + ' : ' + this.minutes + " : " + this.seconds;
    document.getElementById('game_time').innerText = (this.gameHours) + ' : ' + this.gameMinutes + " : " + this.gameSeconds;
  } else {

      this.roundTime +=  currTime-this.prevTime;
      this.getTime(this.roundTime/1000);

      this.gameTime +=  currTime-this.prevTime;
      this.getGameTime(this.gameTime/1000);



      if(this.seconds >= 30){
        this.game.currentPlayer = 1-this.game.currentPlayer;

        if(this.gameMode == GAMEMODE.HUMAN_VS_HUMAN)
          document.getElementById('turn').innerText = 'Player ' + (this.game.currentPlayer + 1);
        document.getElementById('info').innerText = 'You have lost your turn';
        this.roundTime = 0;
      }

      if(this.gameSeconds >= 5){
        this.game.gameOver();
        this.game.over = true;
        document.getElementById('info').innerText = 'Game Over';
      }

      document.getElementById('time').innerText = (this.hours) + ' : ' + this.minutes + " : " + this.seconds;
      document.getElementById('game_time').innerText = (this.gameHours) + ' : ' + this.gameMinutes + " : " + this.gameSeconds;
    }

}


XMLscene.prototype.getTime = function(secs) {
   secs = Math.round(secs);
   var hours = Math.floor(secs / (60 * 60));

   var divisor_for_minutes = secs % (60 * 60);
   var minutes = Math.floor(divisor_for_minutes / 60);

   var divisor_for_seconds = divisor_for_minutes % 60;
   var seconds = Math.ceil(divisor_for_seconds);

   if (hours < 10) {
       this.hours = "0" + hours;
   } else {
       this.hours = hours;
   }

   if (minutes < 10) {
       this.minutes = "0" + minutes;
   } else {
       this.minutes = minutes;
   }

   if (seconds < 10) {
       this.seconds = "0" + seconds;
   } else {
       this.seconds = seconds;
   }
}


XMLscene.prototype.getGameTime = function(secs) {
   secs = Math.round(secs);
   var hours = Math.floor(secs / (60 * 60));

   var divisor_for_minutes = secs % (60 * 60);
   var minutes = Math.floor(divisor_for_minutes / 60);

   var divisor_for_seconds = divisor_for_minutes % 60;
   var seconds = Math.ceil(divisor_for_seconds);

   if (hours < 10) {
       this.gameHours = "0" + hours;
   } else {
       this.gameHours = hours;
   }

   if (minutes < 10) {
       this.gameMinutes = "0" + minutes;
   } else {
       this.gameMinutes = minutes;
   }

   if (seconds < 10) {
       this.gameSeconds = "0" + seconds;
   } else {
       this.gameSeconds = seconds;
   }
}


XMLscene.prototype.handlePicking = function (){
	if (this.pickMode == false) {
		if (this.pickResults != null && this.pickResults.length > 0) {
			for (var i=0; i< this.pickResults.length; i++) {
				var obj = this.pickResults[i][0];

        if(obj != null)
          obj.pickedShader = 1;
				if (obj)
				{
					var customId = this.pickResults[i][1];

          if(this.game != null)
					     if(this.game.running)
						         this.game.picked(obj);


				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}
	}
}


XMLscene.prototype.newGame = function (gameMode,gameLevel,data){

	let board = JSON.parse(data.target.response);

  if(gameMode == GAMEMODE.HUMAN_VS_HUMAN) this.game = new Game(this,board);
  if(gameMode == GAMEMODE.CPU_VS_CPU) this.game = new GameCPU(this,board,gameLevel);
  if(gameMode == GAMEMODE.HUMAN_VS_CPU) this.game = new GameMix(this,board,gameLevel);

  this.gameMode = gameMode;

  this.gameTime = 0;
  this.roundTime = 0;

	document.getElementById('overlay').style.display = 'block';

	let scores = document.getElementsByClassName('score');
    for (let score of scores)
		score.innerHTML = '0';

  if(this.gameMode == GAMEMODE.HUMAN_VS_HUMAN)
      document.getElementById('turn').innerText = 'Player ' + (this.game.currentPlayer + 1);
  //document.getElementById('turn').innerText = 'Player ' + (this.game.currentPlayer + 1);
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
    if (this.timeElapsed > this.CAMERA_ANIMATION_TIME * 0.7) {
        this.changingCamera = false;
        this.currentCamera = (this.currentCamera + 1) % this.cameras.length;
        //this.camera = this.cameras[this.currentCamera];
        return;
    }

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
