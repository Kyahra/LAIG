class CircularAnimation extends Animation {

    constructor(scene, id, speed, center, radius, startAng, rotAng) {
        super(scene, id, time);

        this.scene = scene;
		this.id = id;
		this.center = center;
		this.initialAngle = initialAngle;
		this.rotAngle = rotAngle;
		this.radius = radius;
		
		this.duration = this.rotAngle /this.velocity;
	
    }

    updateMatrix(node,deltaTime){ {
		
		mat4.translate(node.animMatrix, node.animMatrix, [this.center[0],this.center[1],this.center[2]]);

		var angle = this.initialAngle + this.velocity * deltaTime;
		mat4.rotate(node.animMatrix, node.animMatrix, angle,[0,1,0]);
		mat4.translate(node.animMatrix, node.animMatrix, [this.radius,0,0]);

	}
}