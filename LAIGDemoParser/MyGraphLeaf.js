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


}
