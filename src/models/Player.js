class Player {

    constructor(data = {})  {
        this.playerId = null;
        this.playerName = null;
        this.userId = null;
        this.gameId = null;
        this.totalScore = null;
        this.roundScore = null;
        this.profilePicture = null;
        this.answers = null;
        this.isGameMaster = false;

        Object.assign(this, data)
    }

    static fromJson(json) {
        const playerData = json.data;
        return new Player(playerData);
    }

}

export default Player;