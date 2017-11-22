class LinearAnimation extends Animation{

	constructor(scene, id, speed, points){

    super(scene, id, speed);

    this.points = points;
	this.speed= speed;
  
	this.angleXZ = 0;
    this.angleYZ = 0;
    this.currentPoint = 0;
    this.position = this.points[0];
    this.done = false;
    this.updateAnimation();

	}
 

    updateAnimation() {
		console.log(this.points.length);
		console.log(this.currentPoint)
        this.timeElapsed = 0;
		
        this.timeExpected = 1 / (this.speed / distance(this.points[this.currentPoint], this.points[this.currentPoint+1]));
        this.currentDirection = normalizeVector(subtractPoints(this.points[this.currentPoint], this.points[this.currentPoint+1]));

        /* Updates rotation angle in order to align the object with the direction of animation */
        this.angleXZ = Math.atan2(this.currentDirection[0], this.currentDirection[2]);
        this.angleYZ = -Math.atan2(this.currentDirection[1], this.currentDirection[2]);
    }

 

	update(deltaTime) {
   
		console.log('update');
		
        this.position = addPoints(this.position, multVector(this.currentDirection, this.speed * deltaTime / 1000));
        this.timeElapsed += deltaTime / 1000;


        if (this.timeElapsed >= this.timeExpected) {
            this.updateState();
        }
    }

    updateState() {
		
		
		 if (this.currentPoint <(this.points.length-1)) {
			 this.currentPoint++;
			 this.updateAnimation();
        }
		
		
    }
	
	
    apply() {
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(this.angleXZ, 0, 1, 0);
        this.scene.rotate(this.angleYZ, 1, 0, 0);
    }

}
