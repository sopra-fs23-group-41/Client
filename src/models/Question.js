
class Question {

    constructor(data = {}) {
        this.items = null;
        this.picUrls = null;
        this.trueAnswer = null;
        this.falseAnswers = null;
        Object.assign(this, data);
    }
}

export default Question;