class GameCPU extends Game{

    constructor(scene,aux_board){
      super(scene,aux_board);
      this.running=false;

      this.startGame();

    }

    startGame(){
      this.claimColorCPU(1);
      this.claimColorCPU(1);
      this.claimColorCPU(2);
      this.claimColorCPU(2);

    }


    claimColorCPU(player){
      let idx = Math.floor(Math.random() * (this.colors.length-1));

      let color = this.colors[idx];
      let obj =  this.scene.graph.nodes[color];

        this.colors.splice(idx,1);

      console.log(color);
      console.log(this.colors);

      this.players[player -1].push(color);

      let init_pos = obj.position;
      let final_pos = this.color_bases[player -1][0];
      let delta_pos = subtractPoints(init_pos,final_pos);

      this.color_bases[player-1].splice(0,1);

      let p1 =[0,0,0];
      let p2 =[2,0,0];
        let p3 =[2,-delta_pos[2],0];
        let p4 =[-2+delta_pos[0],-delta_pos[2],0]

      var anim = new LinearAnimation(this.scene, this.animationCounter, 11, [p1,p2,p3,p4]);
      this.scene.graph.animations[this.animationCounter]= anim;
      obj.addAnimation(this.animationCounter);
      this.animationCounter++;
    }


  }
