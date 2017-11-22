class LinearAnimation extends Animation{

	constructor(scene, id, speed, points){

    super(scene, id, speed);

    this.points = points;
	this.speed= speed;
    this.resetAnimation();

	}
  
	resetAnimation() {
        this.angleXZ = 0;
        this.angleYZ = 0;
        this.currentPoint = this.points;
        this.position = this.points.value;
        this.done = false;
        //this.seqNum = 0;
        this.updateAnimation();
    }
	
	
    updateAnimation() {
        this.timeElapsed = 0;
        this.timeExpected = 1 / (this.speed / distance(this.currentPoint.value, this.currentPoint.next.value));
        this.currentDirection = normalizeVector(subtractPoints(this.currentPoint.value, this.currentPoint.next.value));

        /* Updates rotation angle in order to align the object with the direction of animation */
        this.angleXZ = Math.atan2(this.currentDirection[0], this.currentDirection[2]);
        this.angleYZ = -Math.atan2(this.currentDirection[1], this.currentDirection[2]);
    }

 

	update(deltaTime) {
        /* If the animation seqNum is different from the update seqNum, it means the animation
         * has already been updated this update path. 
        if (this.seqNum !== seqNum || this.done)
            return;
		*/
		
        this.position = addPoints(this.position, multVector(this.currentDirection, this.speed * deltaTime / 1000));
        this.timeElapsed += deltaTime / 1000;

        /* Number used to know if a animation is updated twice in the same update path
         * If it is, it means there is a component with more than one parent and must only
         * be updated once. 
        this.seqNum = (this.seqNum + 1) % 2;
		*/

        if (this.timeElapsed >= this.timeExpected) {
            this.updateState();
        }
    }

    updateState() {
        if (this.currentPoint.next.next === this.points) {
            this.done = true;
            return;
        }

        this.currentPoint = this.currentPoint.next;
        this.updateAnimation();
    }
	
	
    aplly() {
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(this.angleXZ, 0, 1, 0);
        this.scene.rotate(this.angleYZ, 1, 0, 0);
    }

}
