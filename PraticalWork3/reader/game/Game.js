class Game {
    /**
     * Constructor for the Game class.
     * @param scene Scene.
     */
    constructor() {
		this.running = false;
    }

    /**
     * Sets new game scene and resets game state. Should be called after initialization of all variables.
     * @param scene
     * @param gameMode
     */
    newGame(scene, gameMode,board) {
		    this.running = true;
        this.scene = scene;
        this.gameMode = gameMode;
        this.currentPlayer = 0;
        this.colors = ['ivory','blue','red','green','black'];
    		this.players = [[0,1],[0,2]];
    		this.bases = [[[6,0,10.],[8,0,10]],[[6,0,-10],[8,0,-10]]];
    	  this.board = board;

        this.translations = [              [0,7.3],
                      [-3.4,-5.6], [-1.2,-5.6], [1.2,-5.6], [3.4,-5.6],
    [-6.8,-3.7], [-4.6,-3.7], [-2.2,-3.7], [0,-3.7], [2.2,-3.7], [4.6,-3.7], [6.8,-3.7],
        [-5.6,-1.9], [-3.4,-1.9], [-1.2,-1.9], [1.2,-1.9], [3.4,-1.9], [5.6,-1.9],
            [-6.8,0], [-4.6,0], [-2.2,0], [0,0], [2.2,0], [4.6,0], [6.8,0],
          [-5.6,1.9], [-3.4,1.9], [-1.2,1.9], [1.2,1.9], [3.4,1.9], [5.6,1.9],
      [-6.8,3.7], [-4.6,3.7], [-2.2,3.7], [0,3.7], [2.2,3.7], [4.6,3.7], [6.8,3.7],
                    [-3.4,5.6], [-1.2,5.6], [1.2,5.6], [3.4,5.6],
                                         [0,-7.3]
                    ];
        this.animationCounter =0;
    }

	positionBoard(){
		let counter = 0;

		for(let i=0; i<this.board.length; i++){
		  for(let j=0; j<this.board[0].length; j++){

			let color = this.board[i][j];

			if(color != "."){
			  let translation = this.translations[counter];
			  let x = translation[0];
			  let z = translation[1];

			  counter++;
			  let id = 'piece_' + counter;


			  let node = this.scene.graph.nodes[id];

			  node.textureID = color;

        let p1 =[0,0,0];
        let p2 =[x,0,0];
        let p3 =[x,z,0];
        let p4 =[x,z,-19]

        var anim = new LinearAnimation(this.scene, this.animationCounter,11, [p1,p2,p3,p4]);
        this.scene.graph.animations[this.animationCounter]= anim;
        node.addAnimation(this.animationCounter);
        this.animationCounter++;


				}
			}
		}
	}

	picked(obj){
		let color = obj.nodeID;

		if(this.colors.includes(color))
			claimColor(color,this.colors,this.players[this.currentPlayer],this.claimedColor.bind(this,obj));
    else{
      if(this.init_piece == null)
        this.init_piece =obj;
      else{

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

			var anim = new LinearAnimation(this.scene, "Base", 11, [p1,p2,p3,p4]);
			this.scene.graph.animations["Base"]= anim;

			obj.addAnimation("Base");

		}
	}

}
