class CircularAnimation extends Animation {

    constructor(scene, id, speed, center, radius, startAng, rotAng) {
    super(scene, id, speed);

    this.scene = scene;
		this.id = id;
		this.center = center;
		this.startAngle = startAng;
		this.rotAngle = rotAng;
		this.radius = radius;

		this.duration = this.rotAngle /this.speed;

    }

    updateMatrix(node,deltaTime){

		mat4.identity(node.animMatrix);
		mat4.translate(node.animMatrix, node.animMatrix, [this.center[0],this.center[1],this.center[2]]);

		var angle =this.startAngle + ( deltaTime /this.duration) * this.rotAngle;
    //angle= radians(angle);
		mat4.rotate(node.animMatrix, node.animMatrix, angle*DEGREE_TO_RAD,[0,1,0]);

		mat4.translate(node.animMatrix, node.animMatrix, [this.radius,0,0]);

	}
}
