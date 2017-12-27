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
        this.running = false;
        this.scene = scene;
        this.gameMode = gameMode;
        this.currentPlayer = 0;
        this.colors = ['ivory','blue','red','green','black'];
		this.player1=[0,1];
		this.palyer2=[0,2];
		this.board = board;
    }
	
	positionBoard(){
	
		let color = this.board[4][6];
		let id = "piece_1"
		
		let node = this.scene.graph.nodes[id];
		
		node.textureID = color;
		mat4.identity(node.transformMatrix);
		mat4.translate(node.transformMatrix, node.transformMatrix, [0,3,0]);
		
		

	}

}
