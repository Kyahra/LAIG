class LinearAnimation extends Animation{

  constructor(scene, id, speed, points){

    super(scene, id, speed);

    this.points = points;

    if (!this.points || !this.points.next)
        throw new Error('Control points have invalid length.');

    let point = this.points;
    this.totalDistance = 0;
    while (point.next !== this.listRoot) {
        this.totalDistance += distance(point.value, point.next.value);
        point = point.next;
     }

    this.time = this.speed * this.totalDistance;

    this.resetAnimation();

  }

  update(){

  }

  apply(){

    this.scene.translate(this.position[0], this.position[1], this.position[2]);
    this.scene.rotate(this.angleXZ, 0, 1, 0);
    this.scene.rotate(this.angleYZ, 1, 0, 0);
  }
}
