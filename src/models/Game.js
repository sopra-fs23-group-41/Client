
class Game {

    constructor(data = {})  {
        this.rounds = null;
        this.numOfPlayer = null;
        this.gameType = null;
        this.category = null;
        Object.assign(this, data)
    }
}

export default Game;