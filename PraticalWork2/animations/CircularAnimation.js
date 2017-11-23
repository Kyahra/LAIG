class CircularAnimation extends Animation {

    constructor(scene, id, speed, center, radius, startAng, rotAng) {
        super(scene, id, time);

        this.scene = scene;
		this.id = id;
		this.time = time;
		var c = center.match(/[^ ]+/g);
		this.center = center;
		this.initialAngle = initialAngle;
		this.rotAngle = rotAngle;
		this.radius = radius;
		
		this.time = this.rotAngle /this.velocity;
	
    }

    updateMatrix(node,deltaTime){ {
		
		this.scene.translate(this.center[0], this.center[1], this.center[2]);

		var angle = this.initialAngle + this.velocity * time;
		this.scene.rotate(angle, 0, 1, 0);

		this.scene.translate(this.radius, 0, 0);
	}
}