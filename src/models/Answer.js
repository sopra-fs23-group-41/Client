
class Answer {

    constructor(data = {}) {
        this.playerAnswer = null;
        this.timeUsed = null;
        this.playerId = null;
        this.question = null;
        Object.assign(this, data);
    }
}

export default Answer;