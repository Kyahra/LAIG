class ComboAnimation extends Animation {

    constructor(scene, id, spanRefs) {
    super(scene, id, 0);

    this.scene = scene;
		this.id = id;
    this.duration =0;
    this.spanRefs = spanRefs;

    var animations = this.scene.graph.animations;

    for(var i =0; i < spanRefs.length; i++)
      this.duration += animations[spanRefs[i]].duration;


    }

    updateMatrix(node,deltaTime){
        var animations = this.scene.graph.animations;

        for(var i=0; i<this.spanRefs.length;i++){
      		var animation = animations[this.spanRefs[i]];

            

      		if(animation.duration >= deltaTime){
      			animation.updateMatrix(node,deltaTime);
            break;
          }
      		else
      			deltaTime = deltaTime - animation.duration;


      	}
	}
}
