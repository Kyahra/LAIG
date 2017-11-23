class LinearAnimation extends Animation{

	constructor(scene, id, speed, points){

	  super(scene,id,speed);

		this.points = points;
		this.distance = 0;
		this.segmentDistances = [];
		for (var i = 0; i < points.length - 1; i++) {
			this.distance += vec3.dist(vec3.fromValues(points[i][0], points[i][1], points[i][2]), vec3.fromValues(points[i + 1][0], points[i + 1][1], points[i + 1][2]));
			this.segmentDistances.push(this.distance);
		}

		this.duration = this.distance / this.speed;
		this.previousAngle = 0;

		this.animTransforms = mat4.create();

	}


	updateMatrix(node,deltaTime){

			this.currentDistance = this.speed * deltaTime;

			// find current segment
			var i = 0;
			while (this.currentDistance > this.segmentDistances[i] && i < this.segmentDistances.length)
				i++;

			// get control points from current segment
			var p1 = this.points[i];
			var p2 = this.points[i + 1];

			// calculate displacement and apply translation
			var lastSegDist;
			if (i == 0)
				lastSegDist = 0;
			else
				lastSegDist = this.segmentDistances[i - 1];

			var displacement = (this.currentDistance - lastSegDist) / (this.segmentDistances[i] - lastSegDist);
			mat4.translate(node.animMatrix, node.animMatrix, [(p2[0] - p1[0]) * displacement + p1[0], (p2[1] - p1[1]) * displacement + p1[1], (p2[2] - p1[2]) * displacement + p1[2]]);

			// calculate rotation angle and apply rotation
			
			}
			
}
