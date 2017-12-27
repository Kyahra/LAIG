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
    newGame(scene, gameMode) {
        this.running = false;
        this.scene = scene;
        this.gameMode = gameMode;
        this.currentPlayer = 0;
        this.botIsPlaying = false;
        this.lastMoves = [];
        this.botDifficulty = [BOT_DIFFICULTY.EASY, BOT_DIFFICULTY.EASY];
    }

}
