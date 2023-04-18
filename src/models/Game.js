
class Game {

    constructor(data = {})  {
        this.numberOfRounds = null;
        this.currentRound = null;
        this.numberOfPlayers = null;
        this.players = null;
        this.itemList = null;
        this.pincode = null;
        this.questions = null;
        this.gameMode = null;
        this.category = null;
        Object.assign(this, data)
    }
}

export default Game;