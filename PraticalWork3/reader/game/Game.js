class Game {

    constructor() {
		this.running = false;
    }

    newGame(scene, gameMode,aux_board) {
		    this.running = true;
        this.scene = scene;
        this.gameMode = gameMode;
        this.currentPlayer = 0;
        this.colors = ['ivory','blue','red','green','black'];
    	this.players = [[0,1],[0,2]];
    	this.bases = [[[6,0,10.],[8,0,10]],[[6,0,-10],[8,0,-10]]];
    	this.board_aux= aux_board;
        this.animationCounter =0;
	    this.board = new Board(scene,this);
    }


	picked(obj){
		let color = obj.nodeID;

		if(this.colors.includes(color))
			claimColor(color,this.colors,this.players[this.currentPlayer],this.claimedColor.bind(this,obj));
		else{
		  if(this.moved_piece == null)
			this.moved_piece =obj;
		  else{

			let init_pos = this.moved_piece.board_position;
			let final_pos = obj.board_position;

			let player1 = this.players[this.currentPlayer];
			let player2 = this.players[1-this.currentPlayer];

			humanPlay(this.board_aux,init_pos,final_pos,player1,player2,this.humanPlayed.bind(this,obj,init_pos,final_pos));


		  }
       }
	}

	claimedColor(obj,data){
		let response = JSON.parse(data.target.response);

		let claimed = response[0];

		if(claimed){
			let colors = response[1];
			let player = response[2];
			this.colors = colors;
			this.players[this.currentPlayer] =player;

			let init_pos = obj.position;
			let final_pos = this.bases[this.currentPlayer][0];
			let delta_pos = subtractPoints(init_pos,final_pos);

			this.bases[this.currentPlayer].splice(0,1);

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

	humanPlayed(end_piece,init_pos,final_pos,data){

		this.aux_board  = JSON.parse(data.target.response);

		let init = this.aux_board[init_pos[0]][init_pos[1]];

		if(init == 'x'){

      let init_piece = this.board.get(init_pos[0],init_pos[1]);
      let final_hight = this.board.getHight(init_pos) + this.board.getHight(final_pos);

      this.board.clear(init_pos[0],init_pos[1]);


			let pos1 = this.moved_piece.position;
			let pos2 = end_piece.position;
			let delta_pos = subtractPoints(pos1,pos2);

      for(let i =0; i <init_piece.length; i++){

			let p1 =[0,0,0];
			let p2 =[delta_pos[0],0,5];
		  let p3 =[delta_pos[0],delta_pos[1],5];
			let p4 =[delta_pos[0],delta_pos[1],0.2];


			var anim = new BezierAnimation(this.scene, this.animationCounter, 10, [p1,p2,p3,p4]);
			this.scene.graph.animations[this.animationCounter]= anim;
			init_piece[i].addAnimation(this.animationCounter);
			this.animationCounter++;

      this.board.insert(final_pos[0],final_pos[1],init_piece[i]);
      init_piece[i].board_position = final_pos;
      init_piece[i].position = pos2;
      }

			this.currentPlayer = 1-this.currentPlayer;


		}
		this.moved_piece = null;
  }



}
