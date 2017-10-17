function MyPatch(graph, xmlelem) {

		MyGraphLeaf.call(this,graph,xmlelem);
		
		var CPLINEIndex = xmlelem.children[0].nodeName.indexOf("CPLINE");
        if (CPLINEIndex == -1)
            return "a patch type leaf must have controlpoint line";

        var descendants = xmlelem.children[CPLINEIndex].children;
		
		for (var j = 0; j < descendants.length; j++) {
            
			if (descendants[j].nodeName == "CPOINT")
					
			var x = graph.reader.getFloat(descendants[j], 'xx');
            if (x == null ) {
                this.onXMLMinorError("unable to parse x component of control point");
				break;
            }
            else if (isNaN(x))
                return "non-numeric value for x component of control point (node ID = " + nodeID + ")";
					
			var y = graph.reader.getFloat(descendants[j], 'yy');
			if (y== null ) {
                this.onXMLMinorError("unable to parse y component of control point");
                break;
             }
            else if (isNaN(y))
                return "non-numeric value for y component of control point (node ID = " + nodeID + ")";
					
			var z = graph.reader.getFloat(descendants[j], 'zz');
            if (z == null ) {
                this.onXMLMinorError("unable to parse z component of control point");
                break;
            }
            else if (isNaN(z))
                return "non-numeric value for z component of control point (node ID = " + nodeID + ")";
					
			var w = graph.reader.getFloat(descendants[j], 'ww');
            if (w == null ) {
                this.onXMLMinorError("unable to parse w component of control point");
                break;
            }
            else if (isNaN(w))
                return "non-numeric value for w component of control point (node ID = " + nodeID + ")";
					
			console.log("Control point x: " + x);
			console.log("Control point y: " + y);
			console.log("Control point z: " + z);
			console.log("Control point w: " + w);
			
		}

	
	

	var knots1 = this.args[0];
	var knots2 = this.args[1];

	/*
	var controlPointsList = [];
	for (var i = 0; i <= orderU; i++) {
		var tmp = [];
		for (var j = 0; j <= orderV; j++)
			tmp.push(controlPoints.shift());
		controlPointsList.push(tmp);
	}

	var nurbsSurface = new CGFnurbsSurface(orderU, orderV, knots1, knots2, controlPointsList);

	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	this.surface = new CGFnurbsObject(scene, getSurfacePoint, uDivs, vDivs);
*/
}

MyPatch.prototype = Object.create(MyGraphLeaf.prototype);
MyPatch.prototype.constructor = MyPatch;


/*
MyPatch.prototype.display = function() {
	this.surface.display();
}

function getKnots(order) {
	if (order == 1)
		return [0, 0, 1, 1];
	else if (order == 2)
		return [0, 0, 0, 1, 1, 1];
	else if (order == 3)
		return [0, 0, 0, 0, 1, 1, 1, 1];
	else
		return [];
}

MyPatch.prototype.setAmpSAmpT = function (ampS, ampT) {}

*/