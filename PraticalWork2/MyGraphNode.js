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
	
	this.currentAnimation =-1;


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
	 this.currentAnimation =0;
	 this.animations.push(animation);
 }
 
/**
*  Gets the children from this node
*/
MyGraphNode.prototype.getChildren = function() {
    return this.children;
}


MyGraphNode.prototype.getCurrentAnimation = function(){
	if(this.currentAnimation == -1)
		return -1;
	
	return this.animations[this.currentAnimation];
}


MyGraphNode.prototype.updateCurrentAnimation = function(){
	if(this.currentAnimation == (this.animations.length -1))
		this.currentAnimation = -1;
	else
		this.currentAnimation++;

}




