/**
 * MyGraphNode class, representing an intermediate node in the scene graph.
 * @constructor
**/
function MyGraphNode(graph, nodeID, nodeSelectable) {
    this.graph = graph;

    this.nodeID = nodeID;
	this.nodeSelectable = nodeSelectable;
	
    // IDs of child nodes.
    this.children = [];

    // IDs of aniamtions.
    this.animations = [];

    // The material ID.
    this.materialID = null ;

    // The texture ID.
    this.textureID = null ;

    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);

	  this.animMatrix = mat4.create();
    mat4.identity(this.animMatrix);

}

/**
 * Adds the reference (ID) of another node to this node's children array.
 */
MyGraphNode.prototype.addChild = function(nodeID) {
    this.children.push(nodeID);
}

/**
 * Adds a leaf to this node's leaves array.
 */
 MyGraphNode.prototype.addLeaf = function(leaf) {
	 this.children.push(leaf);
 }

 /**
 * Adds a aniamtion to this node's aniamtions array.
 */
 MyGraphNode.prototype.addAnimation = function(animation) {
	 this.animations.push(animation);
 }

/**
*  Gets the children from this node
*/
MyGraphNode.prototype.getChildren = function() {
    return this.children;
}

MyGraphNode.prototype.updateAnimations = function(deltaTime) {

  deltaTime=deltaTime/1000;

	for(var i=0; i<this.animations.length;i++){
		var animation = this.graph.animations[this.animations[i]];

		if(animation.duration >= deltaTime){
			animation.updateMatrix(this,deltaTime);
      break;
    }
		else
			deltaTime = deltaTime - animation.duration;
	}


}
