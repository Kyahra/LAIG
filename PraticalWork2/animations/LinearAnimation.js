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


	}


	updateMatrix(node,deltaTime){

			this.currentDistance = this.speed * deltaTime;

			// find current segment
			var i = 0;
			while (this.currentDistance > this.segmentDistances[i] && i < this.segmentDistances.length){
				this.currentDistance-this.segmentDistances[i];
				i++;
			}

			// get control points from current segment
			var p1 = this.points[i];
			var p2 = this.points[i + 1];

			// calculate displacement and apply translation
			var relativeDistance = this.currentDistance/this.segmentDistances[i];
			mat4.translate(node.animMatrix, node.animMatrix, [(p2[0] - p1[0]) * relativeDistance , (p2[1] - p1[1]) * relativeDistance, (p2[2] - p1[2]) * relativeDistance ]);

			// calculate rotation angle and apply rotation

			}

}
