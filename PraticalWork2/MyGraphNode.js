/**
 * MyGraphNode class, representing an intermediate node in the scene graph.
 * @constructor
**/
function MyGraphNode(graph, nodeID) {
    this.graph = graph;

    this.nodeID = nodeID;

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
	
  
	for(var i; i=0; i <this.animations.length){
		var animation = this.graph.animations[animations[i]];
		
		if(animation.time <= deltaTime){
			animation.getMatrix(deltaTime);
			
		}
	}
}







