class Result {
    constructor(quizName, points, maxPoints, date) {
        this.quizName = quizName;
        this.points = points;
        this.maxPoints = maxPoints;
        this.date = date;
    }

    getQuizName() {
        return this.quizName;
    }

    getDate() {
        return this.date;
    }

    getPoints() {
        return this.points;
    }

    getMaxPoints() {
        return this.maxPoints;
    }

    pointsWord() {
        let pointsWord = 'punkt';
        let lastCharOfPointsString = this.points.toString().slice(-1);
        if (this.points > 1) {
            if (lastCharOfPointsString === '2' || lastCharOfPointsString === '3' || lastCharOfPointsString === '4') {
                pointsWord += 'y';
            } else {
                pointsWord += 'ów';
            }
        } else if (this.points == 0) {
            pointsWord = 'punktów';
        }

        return pointsWord;
    }
}