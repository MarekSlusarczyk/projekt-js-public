class Results {
    constructor() {
        this.results = [];
    }

    pushNewResult(result) {
        this.results.push(result);
    }

    getAllResults() {
        return this.results;
    }
}