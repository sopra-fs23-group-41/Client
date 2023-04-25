
class Game {

    constructor(data = {})  {
        this.rounds = null;
        this.currentRound = null;
        this.numOfPlayers = null;
        this.players = null;
        this.gamePIN = null;
        this.gameMode = null;
        this.category = null;
        this.gameId = null;
        this.gameType = null;
        Object.assign(this, data)
    }
}

export default Game;