class BezierAnimation extends Animation{

	constructor(scene, id, speed, points){

	  super(scene,id,speed);

		this.points = points;
		this.calculateDistance();
		console.log(this.distance);
		console.log(this.speed);
		this.duration = this.distance / this.speed;
		console.log(this.duration);

		this.position= this.points[0];
		this.direction = [];

	}

	calculateDistance(){
		var L2 = dividePoint(addPoints(this.points[0],this.points[1]),2);
		var H  = dividePoint(addPoints(this.points[1],this.points[2]),2);
		var L3 = dividePoint(addPoints(L2,H),2);
		var R3 = dividePoint(addPoints(this.points[2],this.points[3]),2);
		var R2 = dividePoint(addPoints(H,R3),2);
		var R1 = dividePoint(addPoints(L3,R2),2);

		this.distance = distance(this.points[0],L2) + distance(L2,L3) + distance(L3,R1) + distance(R1,R2) + distance(R2,R3) + distance(R3,this.points[3]);

	}


	updateMatrix(node,deltaTime){

		deltaTime = deltaTime /this.duration;

		mat4.identity(node.animMatrix);

        this.position[0] =
            Math.pow((1 - deltaTime), 3) * this.points[0][0] +
            3 * deltaTime * Math.pow((1 - deltaTime), 2) * this.points[1][0] +
            3 * Math.pow(deltaTime, 2) * (1 - deltaTime) * this.points[2][0] +
            Math.pow(deltaTime, 3) * this.points[3][0];

        this.position[1] =
            Math.pow((1 - deltaTime), 3) * this.points[0][1] +
            3 * deltaTime * Math.pow((1 - deltaTime), 2) * this.points[1][1] +
            3 * Math.pow(deltaTime, 2) * (1 - deltaTime) * this.points[2][1] +
            Math.pow(deltaTime, 3) * this.points[3][1];

        this.position[2] =
            Math.pow((1 - deltaTime), 3) * this.points[0][2] +
            3 * deltaTime * Math.pow((1 - deltaTime), 2) * this.points[1][2] +
            3 * Math.pow(deltaTime, 2) * (1 - deltaTime) * this.points[2][2] +
            Math.pow(deltaTime, 3) * this.points[3][2];

		mat4.translate(node.animMatrix, node.animMatrix, [this.position[0], this.position[1], this.position[2]]);


			this.direction[0] = -3 * (this.points[1][0] * Math.pow(deltaTime - 1, 2) +
					 this.points[1][0] * (-3 * Math.pow(deltaTime, 2) + 4 * deltaTime - 1) +
					 deltaTime * (3 * this.points[2][0] * deltaTime - 2 * this.points[2][0] -
					 this.points[3][0] * deltaTime));

			this.direction[1] = -3 * (this.points[0][1] * Math.pow(deltaTime - 1, 2) +
				   this.points[1][1] * (-3 * Math.pow(deltaTime, 2) + 4 * deltaTime - 1) +
				   deltaTime * (3 * this.points[2][1] * deltaTime - 2 * this.points[2][1] -
				   this.points[3][1] * deltaTime));

		 this.direction[2] = -3 * (this.points[0][2] * Math.pow(deltaTime - 1, 2) +
				   this.points[1][2] * (-3 * Math.pow(deltaTime, 2) + 4 * deltaTime - 1) +
				   deltaTime * (3 * this.points[2][2] *deltaTime - 2 * this.points[2][2] -
				   this.points[3][2] * deltaTime));


			 //console.log("New direction: ", this.direction);
			 var angle;
			 if (this.direction[0] > 0)
					 angle = Math.atan(this.direction[2] / -this.direction[0]) + Math.PI / 2;
			 else if (this.direction[0] < 0)
					 angle = -(Math.atan(this.direction[2] / this.direction[0]) + Math.PI / 2);
			 else if (this.direction[0] == 0)
					 angle = 0;

				//	mat4.rotate(node.animMatrix, node.animMatrix,angle, [0,1,0]);

		}





}
