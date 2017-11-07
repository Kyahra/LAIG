function MyCylinder(scene, height,  base, top, stacks, slices, tcap, bcap) {
    CGFobject.call(this, scene);
    this.scene = scene;
    this.slices = slices;
    this.stacks = stacks;
    this.height = height;
    this.trad = top;
    this.brad = base;



    this.baselessCylinder = new MyBaselessCylinder(scene, base, top, height, slices, stacks);

    if(tcap == 1)
    this.top = new MyCircle(scene, slices);

    if(bcap == 1)
    this.bottom = new MyCircle(scene, slices);
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.display = function() {
    this.baselessCylinder.display();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, this.height);

    if(this.top !=null){
      this.scene.pushMatrix();
      this.scene.scale(this.trad,this.trad,1);
      this.top.display();
      this.scene.popMatrix();
    }

    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.scale(-1, -1, 1);


    if(this.bottom !=null){
      this.scene.pushMatrix();
      this.scene.scale(this.brad,this.brad,1);
      this.bottom.display();
      this.scene.popMatrix();
    }


    this.scene.popMatrix();
}
