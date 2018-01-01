class GameMix extends GameCPU{

    constructor(scene,aux_board){
      super(scene,aux_board);
      this.running=true;

    }

    startGame(){
      this.claimColor(1);
      this.claimColor(1);

      console.log('yo');

      this.currentPlayer = 1;

    }

    picked(obj){
      if(this.currentPlayer ==1 && !this.gameOver)
        super.picked(obj);

    }

    newTurn(){

      if(this.gameOver){
        console.log('gameOver');
        this.running = false;
        return;
      }

      if(this.currentPlayer ==1) return;


      getMove(this.board_aux,this.players[this.currentPlayer],this.players[1-this.currentPlayer],this.makeMove.bind(this));

    }

    makeMove(data){
      super.makeMove(data);
      this.currentPlayer = 1;
    }



  }