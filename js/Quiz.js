class Quiz {
    constructor(quizName) {
        this.quizName = quizName;
        this.questions = [];
    }

    addQuestion(questionContent) {
        this.questions.push(questionContent);
    }
}