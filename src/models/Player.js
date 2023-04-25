class Player {

    constructor(data = {})  {
        this.username = null;
        this.points = null;
        this.rank = null;
        this.isGameMaster = false;
        Object.assign(this, data)
    }
}

export default Player;