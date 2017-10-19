function MyPatch(graph, xmlelem,degree1,degree2,controlVertexes) {

		CGFobject.call(this,graph.scene);

		this.args = graph.reader.getString(xmlelem,'args');
		this.args = this.args.match(/[^ ]+/g);

		var knots1 = this.getKnotsVector(degree1);
		var knots2 = this.getKnotsVector(degree2);

		var controlPointsList = [];
		for (var i = 0; i <= degree1; i++) {
		var tmp = [];
		for (var j = 0; j <= degree2; j++)
			tmp.push(controlVertexes.shift());
		controlPointsList.push(tmp);
}

		console.log(controlPointsList);

	var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlPointsList);

	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	console.log(this.args[0]);
		console.log(this.args[1]);

	this.primitive = new CGFnurbsObject(graph.scene, getSurfacePoint,20 ,20);


	}


MyPatch.prototype = Object.create(CGFobject.prototype);
MyPatch.prototype.constructor = MyPatch;


MyPatch.prototype.display = function() {
	this.primitive.display();

}

MyPatch.prototype.getKnotsVector = function(degree) { // TODO (CGF 0.19.3): add to CGFnurbsSurface

	 var v = new Array();
	 for (var i=0; i<=degree; i++) {
	 		v.push(0);
	 }

	 for (var i=0; i<=degree; i++) {
 			v.push(1);
	 }
	 return v;
}




MyPatch.prototype.setAmpSAmpT = function (ampS, ampT) {
}
