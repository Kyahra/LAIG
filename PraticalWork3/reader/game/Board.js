class Board {

    constructor(scene,game) {
		this.scene = scene;
		this.game = game;
		this.matrix =[[[],[],[],[],[],[],[],[],[],[],[],[],[]],
					  [[],[],[],[],[],[],[],[],[],[],[],[],[]],
					  [[],[],[],[],[],[],[],[],[],[],[],[],[]],
					  [[],[],[],[],[],[],[],[],[],[],[],[],[]],
					  [[],[],[],[],[],[],[],[],[],[],[],[],[]],
					  [[],[],[],[],[],[],[],[],[],[],[],[],[]],
					  [[],[],[],[],[],[],[],[],[],[],[],[],[]],
					  [[],[],[],[],[],[],[],[],[],[],[],[],[]],
					  [[],[],[],[],[],[],[],[],[],[],[],[],[]],];

		this.translations = [[0,7.3],[-3.4,-5.6], [-1.2,-5.6], [1.2,-5.6], [3.4,-5.6], [-6.8,-3.7],
							[-4.6,-3.7], [-2.2,-3.7], [0,-3.7], [2.2,-3.7], [4.6,-3.7], [6.8,-3.7],
							[-5.6,-1.9], [-3.4,-1.9], [-1.2,-1.9], [1.2,-1.9], [3.4,-1.9], [5.6,-1.9],
							[-6.8,0], [-4.6,0], [-2.2,0], [0,0], [2.2,0], [4.6,0], [6.8,0], [-5.6,1.9],
							[-3.4,1.9], [-1.2,1.9], [1.2,1.9], [3.4,1.9], [5.6,1.9], [-6.8,3.7], [-4.6,3.7],
							[-2.2,3.7], [0,3.7], [2.2,3.7], [4.6,3.7], [6.8,3.7],[-3.4,5.6], [-1.2,5.6],
							[1.2,5.6], [3.4,5.6],[0,-7.3]
                    ];

		this.initBoard(this.game.board_aux);

    }

    initBoard(board_aux){
		let counter = 0;

		for(let i=0; i<board_aux.length; i++){
		  for(let j=0; j<board_aux[0].length; j++){

			let color = board_aux[i][j];

			if(color != "."){
			  let translation = this.translations[counter];
			  let x = translation[0];
			  let z = translation[1];

			  counter++;
			  let id = 'piece_' + counter;


			  let node = this.scene.graph.nodes[id];

			  node.textureID = color;

        let p1 =[0,0,0];
        let p2 =[0,0,0.3];


		mat4.translate(node.transformMatrix, node.transformMatrix, [x,z,0]);

        var anim = new LinearAnimation(this.scene, this.game.animationCounter,0.1, [p1,p2]);
        this.scene.graph.animations[this.game.animationCounter]= anim;
        node.addAnimation(this.game.animationCounter);
        this.game.animationCounter++;


        this.matrix[i][j][0] = node;
        node.board_position = [i,j];
		node.position = [x,0,z];

      }else
        this.matrix[i][j] =null;
			}
		}

	}

	insert(x,y,piece){
		this.matrix[x][y].push(piece);
	}

	getHight(final_pos){
		return this.matrix[final_pos[0]][final_pos[1]].length;
	}

	 clear(x,y){
		this.matrix[x][y] =[];
	 }

	 get(x,y){
		return this.matrix[x][y];
	 }


}
