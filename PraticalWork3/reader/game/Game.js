class Game {

    constructor(scene,aux_board) {
      this.scene = scene;
      this.currentPlayer = 0;
      this.colors = ['ivory','blue','red','green','black'];
      this.players = [[0,1],[0,2]];
      this.color_bases = [[[8,0,10],[8,0,12]],[[8,0,-10],[8,0,-12]]];
      this.piece_bases = [[[-8,0,-10],[-6,0,-10],[-4,0,-10],[-2,0,-10]],[[-8,0,10],[-6,0,10],[-4,0,10],[-2,0,10]]];
      this.board_aux= aux_board;
      this.initial_board=aux_board;
      this.animationCounter =0;
      this.board = new Board(scene,this);
      this.running = true;
      this.over = false;

      for(let i=0; i <this.colors.length; i++){
         let color_node = this.scene.graph.nodes[this.colors[i]];
         mat4.identity(color_node.transformMatrix);
         mat4.translate(color_node.transformMatrix,color_node.transformMatrix, color_node.position);
         mat4.rotate(color_node.transformMatrix,color_node.transformMatrix,-Math.PI/2,[1,0,0]);
      }
  }

	picked(obj){

		let color = obj.nodeID;


		if(this.colors.includes(color)){
      obj.pickedShader = 0;
			claimColor(color,this.colors,this.players[this.currentPlayer],this.claimedColor.bind(this,obj));
    }
		else{
		  if(this.moved_piece == null)
			this.moved_piece =obj;
		  else{

      this.moved_piece.pickedShader = 0;
      obj.pickedShader = 0;

			let init_pos = this.moved_piece.board_position;
			let final_pos = obj.board_position;

			let player1 = this.players[this.currentPlayer];
			let player2 = this.players[1-this.currentPlayer];

      if(init_pos != null && final_pos !=null){
			   humanPlay(this.board_aux,init_pos,final_pos,player1,player2,this.humanPlayed.bind(this,obj,init_pos,final_pos));
         //isGameOver(this.board_aux,player1,player2,this.checkMoves1.bind(this));
       }
      else
        this.moved_piece = null;
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
			let final_pos = this.color_bases[this.currentPlayer][0];
			let delta_pos = subtractPoints(init_pos,final_pos);

			this.color_bases[this.currentPlayer].splice(0,1);

			let p1 =[0,0,0];
			let p2 =[2,0,0];
		    let p3 =[2,-delta_pos[2],0];
		    let p4 =[-2+delta_pos[0],-delta_pos[2],0]

			var anim = new LinearAnimation(this.scene, this.animationCounter, 11, [p1,p2,p3,p4]);
			this.scene.graph.animations[this.animationCounter]= anim;
			obj.addAnimation(this.animationCounter);
			this.animationCounter++;

      console.log('Player ' + (this.currentPlayer +1) +' claimed ' + obj.nodeID + ' pieces.');
		}


	}

	humanPlayed(end_piece,init_pos,final_pos,data){

		this.board_aux  = JSON.parse(data.target.response);

		let init = this.board_aux[init_pos[0]][init_pos[1]];

		if(init == 'x'){

			let init_piece = this.board.get(init_pos[0],init_pos[1]);
			let init_hight = this.board.getHight(final_pos);
			let final_hight = this.board.getHight(init_pos) + this.board.getHight(final_pos);

			this.board.clear(init_pos[0],init_pos[1]);

			let pos1 = this.moved_piece.position;
			let pos2 = end_piece.position;
			let delta_pos = subtractPoints(pos1,pos2);

      let p1 =[0,0,0];
      let p2 =[delta_pos[0],0,5];
      let p3 =[delta_pos[0],delta_pos[2],5];
      let p4 =[delta_pos[0],delta_pos[2],0.2*init_hight];


      	var anim = new BezierAnimation(this.scene, this.animationCounter, 10, [p1,p2,p3,p4]);
          let duration = anim.duration;
      this.board.pause(init_pos,final_pos,duration);


		  for(let i =0; i <init_piece.length; i++){
  			var anim = new BezierAnimation(this.scene, this.animationCounter, 10, [p1,p2,p3,p4]);
  			this.scene.graph.animations[this.animationCounter]= anim;
  			init_piece[i].addAnimation(this.animationCounter);
  			this.animationCounter++;

  		  this.board.insert(final_pos[0],final_pos[1],init_piece[i]);
  		  init_piece[i].board_position = final_pos;
  		  init_piece[i].position = pos2;
		}



		if(final_hight == 5){

      let color = init_piece[init_piece.length-1].textureID[0];
      let player = this.players[this.currentPlayer];

      if(player.includes(color))
        this.updateScore(duration,final_pos,init_hight);
		}



		this.currentPlayer = 1-this.currentPlayer;
    this.scene.roundTime = 0;
    document.getElementById('turn').innerText = 'Player ' + (this.currentPlayer + 1);
    document.getElementById('info').innerText = '';

  }else {
    document.getElementById('info').innerText = 'Invalid Move ... Try again ';
  }
		this.moved_piece = null;
  }


	updateScore(duration,position,init_hight){

        console.log('Player ' + (this.currentPlayer +1) +' scored a point!');

		    let score = ++this.players[this.currentPlayer][0];
		    document.getElementsByClassName('score')[this.currentPlayer].innerHTML = score;

    		let final_piece = this.board.get(position[0],position[1]);



    		let init_pos = final_piece[0].position;
    		let final_pos = this.piece_bases[this.currentPlayer][0];
    		let delta_pos = subtractPoints(init_pos,final_pos);

    		this.piece_bases[this.currentPlayer].splice(0,1);

    		for(let i =0; i <init_hight;i++){
          final_piece[i].animations.pop();

    			var anim = new PauseAnimation(this.scene, this.animationCounter, duration);
    			this.scene.graph.animations[this.animationCounter]= anim;
    			final_piece[i].addAnimation(this.animationCounter);
    			this.animationCounter++;

    		}

        let p1 =[0,0,0];
        let p2 =[0,0,5];
        let p3 =[delta_pos[0],delta_pos[2],5];
        let p4 =[delta_pos[0],delta_pos[2],-1.1];

    		for(let i =0;i <final_piece.length; i++){

    			var anim = new BezierAnimation(this.scene, this.animationCounter, 15, [p1,p2,p3,p4]);
    			this.scene.graph.animations[this.animationCounter]= anim;
    			final_piece[i].addAnimation(this.animationCounter);
    			this.animationCounter++;

          }

    	   this.board.clear(position[0],position[1]);

	  }

  playFilm(){
      this.board.initBoard(this.initial_board);
      this.board.playFilm();

  }




}
