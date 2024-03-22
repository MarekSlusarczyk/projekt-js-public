class Question {
    constructor(question, type, answers, correctAnswer, acceptedAnswers, additionalInformation) { // type - pytanie otwarte (do wpisania), pytanie zamknięte (wybór spośród odpowiedzi), acceptedAnswers - odpowiedzi akceptowane (literówki itp.), additionalInformation - informacje dodatkowe, np. 'Wpisz jedno słowo'
        this.question = question;
        this.type = type;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
        this.acceptedAnswers = acceptedAnswers;
        this.additionalInformation = additionalInformation;
    }

    showQuestion() {
        return this.question;
    }

    showAdditionalInformation() {
        return this.additionalInformation;
    }

    typeOfQuestion() {
        return this.type;
    }

    correct() {
        return this.correctAnswer;
    }

    accepted() {
        return this.acceptedAnswers;
    }

    showAnswers() {
        if (this.typeOfQuestion() === 'open-endedQuestion') {
            const html = `<div><input type="text" placeholder="Wpisz odpowiedź"></div><button>Potwierdź</button>`;
            const button = true;
            const data = {html: html, button: button}
            return data;
        }
        if (this.typeOfQuestion() === 'closed-endedQuestion') {
            let html = ``;
            let allAnswers = this.answers;
            for (let i = 0; i < allAnswers.length; i++) {
                html += `<button data-answer="${i}">${allAnswers[i]}</button>`
            }
            const button = false;
            const data = {html: html, button: button}
            return data;
        }
    }

    checkAnswer(answer) {
        let isAnswerCorrect = false;
        if (this.typeOfQuestion() === 'open-endedQuestion') {
            let answerLowerCase = answer.toLowerCase();
            if (answerLowerCase === this.correct().toLowerCase()) {
                isAnswerCorrect = true;
                return isAnswerCorrect;
            }

            this.accepted().forEach(element => {
                if (answerLowerCase === element.toLowerCase()) {
                    isAnswerCorrect = true;
                    return isAnswerCorrect;
                }
            });

            return isAnswerCorrect;
        }

        if (this.typeOfQuestion() === 'closed-endedQuestion') {
            let answerId = parseInt(answer)
            let correctAnswer = parseInt(this.correct())
            if (answerId === correctAnswer) {
                isAnswerCorrect = true;
            }
            return isAnswerCorrect;
        }
    }
}