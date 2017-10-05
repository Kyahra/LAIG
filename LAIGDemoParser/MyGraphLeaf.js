/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, xmlelem) {
	this.graph = graph;

	//  this.id = graph.reader.getString(xmlelem,'id');
	this.type = graph.reader.getString(xmlelem,'type');
	this.args = graph.reader.getString(xmlelem,'args');

	this.args = this.args.match(/[^ ]+/g);


	if(this.type == 'rectangle')
			this.primitive = new MyRectangle(graph.scene,this.args[0],this.args[1],this.args[2],this.args[3]);

	if(this.type == 'triangle')
			this.primitive = new MyTriangle(graph.scene,this.args[0],this.args[1],this.args[2],this.args[3],this.args[4],this.args[5],this.args[6],this.args[7],this.args[8]);

	if(this.type == 'sphere')
			this.primitive = new MySphere(graph.scene,this.args[0],this.args[1],this.args[2]);

	if(this.type == 'cylinder')
			this.primitive = new MyCylinder(graph.scene,this.args[0],this.args[1],this.args[2],this.args[3],this.args[4]);


}


MyGraphLeaf.prototype.display = function(){
	this.primitive.display();
}


MyGraphLeaf.prototype.setAmpSAmpT = function(amplifFactorS,amplifFactorT){

	if(this.type == 'rectangle' || this.type == 'triangle')
		this.primitive.setAmpSAmpT(amplifFactorS,amplifFactorT);
}
