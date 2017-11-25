class LinearAnimation extends Animation{

	constructor(scene, id, speed, points){

	  super(scene,id,speed);

		this.points = points;
		this.distance = 0;
		this.segmentDistances = [];

		for (var i = 0; i < this.points.length - 1; i++) {
			this.distance += distance(this.points[i],this.points[i+1]);
			this.segmentDistances.push(distance(this.points[i],this.points[i+1]));
		}

		console.log(this.speed);

		this.duration = this.distance / this.speed;


	}


	updateMatrix(node,deltaTime){

			mat4.identity(node.animMatrix);

			this.currentDistance = this.speed * deltaTime;

			// find current segment
			var i = 0;
			while (this.currentDistance > this.segmentDistances[i] && i < this.segmentDistances.length){
				this.currentDistance -= this.segmentDistances[i];
				mat4.translate(node.animMatrix,node.animMatrix,this.points[i+1]);
				i++;
			}

			// get control points from current segment
			var p1 = this.points[i];
			var p2 = this.points[i + 1];

			// calculate displacement and apply translation
			var relativeDistance = this.currentDistance/this.segmentDistances[i];


			mat4.translate(node.animMatrix, node.animMatrix, [(p2[0] - p1[0]) * relativeDistance , (p2[1] - p1[1]) * relativeDistance, (p2[2] - p1[2]) * relativeDistance ]);

			// calculate rotation angle and apply rotation


			var angle = angleBetween([0,0,1],subtractPoints(this.points[i],this.points[i+1]));
			mat4.rotate(node.animMatrix,node.animMatrix, angle,[0,1,0]);




			}

}
