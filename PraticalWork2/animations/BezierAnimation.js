class LinearAnimation extends Animation{

	constructor(scene, id, speed, points){

	  super(scene,id,speed);

		this.points = points;
		this.calculateDistance();
		this.duration = this.distance / this.speed;
		this.previousAngle = 0;

		this.animTransforms = mat4.create();

	}
	
	calculateDistance(){
		var L2 = dividePoint(addPoints(points[0],points[1]),2);
		var H  = dividePoint(addPoints(points[1],poitns[2]),2);
		var L3 = dividePoint(addPoints(L2,H),2);
		var R3 = dividePoint(addPoints(points[2],points[3]),2);
		var R2 = dividePoint(addPoints(H,R3),2);
		var R1 = dividePoint(addPoints(L3,R2),2);
		
		this.distance = distance(points[0],L1) + distance(L1,L2) + distance(L2,L3) + 
		distance(L3,R1) + distance(R1,R2) + distance(R2,R3);
		
	}


	updateMatrix(node,deltaTime){

			

		}

}