class GameCPU extends Game{

    constructor(scene,aux_board,level){
      super(scene,aux_board);
      this.running=false;
      this.gameOver=0;
      this.level = level;

      this.startGame();

    }

    startGame(){
      this.claimColor(1);
      this.claimColor(1);
      this.claimColor(2);
      this.claimColor(2);

    }

    newTurn(){

      if(this.gameOver){
        document.getElementById('info').innerText = 'Game Over ';
        return;
      }

      if(this.level != LEVEL.EASY)  sleep(3000);

      this.currentPlayer = 1-this.currentPlayer;
      getMove(this.board_aux,this.players[this.currentPlayer],this.players[1-this.currentPlayer],this.makeMove.bind(this));
	  document.getElementById('turn').innerText = 'Player ' + (this.currentPlayer + 1);
      document.getElementById('info').innerText = '';

    }


    claimColor(player){
      let idx = Math.floor(Math.random() * (this.colors.length-1));

      let color = this.colors[idx];
      let obj =  this.scene.graph.nodes[color];

      this.colors.splice(idx,1);

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

    makeMove(data){
      let response = JSON.parse(data.target.response);

      this.gameOver =response[0];

      if(!this.gameOver){
      let y1 = response[1];
      let x1 = response[2];
      let y2 = response[3];
      let x2 = response[4];

      updateBoard(this.board_aux,this.players[this.currentPlayer],y1,x1,y2,x2,this.updateAuxBoard.bind(this));

      let init_piece = this.board.get(x1,y1);
      let end_piece = this.board.get(x2,y2);
      let init_hight = this.board.getHight([x2,y2]);
      let final_hight = this.board.getHight([x1,y1]) + init_hight;

      this.board.clear(x1,y1);

      let pos1 = init_piece[0].position;
      let pos2 = end_piece[0].position;
      let delta_pos = subtractPoints(pos1,pos2);

      let p1 =[0,0,0];
      let p2 =[delta_pos[0],0,5];
      let p3 =[delta_pos[0],delta_pos[2],5];
      let p4 =[delta_pos[0],delta_pos[2],0.2*init_hight];


      for(let i =0; i <init_piece.length; i++){
        var anim = new BezierAnimation(this.scene, this.animationCounter, 10, [p1,p2,p3,p4]);
        this.scene.graph.animations[this.animationCounter]= anim;
        init_piece[i].addAnimation(this.animationCounter);
        this.animationCounter++;

        this.board.insert(x2,y2,init_piece[i]);
        init_piece[i].board_position = [x2,y2];
        init_piece[i].position = pos2;
    }

        if(final_hight == 5){

          let color = init_piece[init_piece.length-1].textureID[0];
          let player = this.players[this.currentPlayer];
          let duration = anim.duration;

          if(player.includes(color))
            this.updateScore(duration,[x2,y2],init_hight);
          }


  }

}

    updateAuxBoard(data){
      this.board_aux  = JSON.parse(data.target.response);
    }


  }
