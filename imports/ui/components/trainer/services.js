
var dbFlashCardss = [
    {
        question: 'one',
        answer: 'eins',
        type: 'noun'
    },
    {
        question: 'two',
        answer: 'zwei',
        type: 'adjective'
    },
    {
        question: 'three',
        answer: 'drei',
        type: 'Adjective'
    },
    {
        question: 'four',
        answer: 'vier',
        type: 'Adjective'
    },
    {
        question: 'five',
        answer: 'fünf',
        type: 'Adjective'
    },
    {
        question: 'a',
        answer: 'a',
        type: 'Adjective'
    },
    {
        question: 'b',
        answer: 'b',
        type: 'Adjective'
    },
    {
        question: 'c',
        answer: 'c',
        type: 'Adjective'
    }
];

class ClassFlashCard {
    constructor(flashCardObject) {
        this.question = flashCardObject.question;
        this.answer = flashCardObject.answer;
        this.poolStatus = this.setStartPoolStatus(flashCardObject.poolStatus);
    }

    setStartPoolStatus = function (poolStatus) {
        var start_pool_status = 1;
        var newPoolStatus;
        if (poolStatus == undefined) {
            newPoolStatus = start_pool_status;
        } else {
            newPoolStatus = poolStatus;
        }
        return newPoolStatus;
    }

    markAsCorrectAnswered = function () {
        if (this.poolStatus <= 0) {
            this.poolStatus++;
        }
    }
    markAsWrongAnswered = function () {
        this.poolStatus = -1;
    }
}

var pool_size = 4;
var review_interval = 4;

export const Vocab = {
    init: function (dbFlashCards) {
        var flashCards = new Array();
        for (var i = 0; i < dbFlashCards.length; i++) {
            var obj = new ClassFlashCard(dbFlashCards[i]);
            flashCards.push(obj);
        }
        this.dbFlashCards = flashCards;
        console.log("after for"+this.dbFlashCards);
        this.currentFlashCard = _.first(this.flashCards());
        console.log("current"+this.currentFlashCard);
        this.poolSize = pool_size;
        this.reviewIntervall = review_interval;
        this.displayAnswer = false;
    },
    flashCards: function () {
        return this._flashCards || this.getFlashCards();
    },
    getFlashCards: function () {
        this._flashCards = this.dbFlashCards;
        console.log("getFlashCards"+this._flashCards);
        console.log("db in get flash"+this.dbFlashCards);
        return this._flashCards;
    },
    // grab the next flashCard in the list or wrap around to the start
    nextFlashCard: function () {
        if (_.last(this.flashCards()).question == this.currentFlashCard.question) {
            this.currentFlashCard = _.first(this.flashCards());
        } else {
            var currentIndex = _.indexOf(this.flashCards(), this.currentFlashCard);
            this.currentFlashCard = this.flashCards()[currentIndex + 1];
        }

        return this.currentFlashCard;
    },
    wordByName: function (name) {
        return _.detect(this.flashCards(), function (flashCard) {
            return flashCard.question == name;
        });
    },
    trashFlashCard: function () {
        var flashCard = this.currentFlashCard;
        this._flashCards.splice(_.indexOf(this._flashCards, flashCard), 1);
        this.currentFlashCard = _.first(this.flashCards());
    },
    // simply move flashCard to end of the list
    markForLater: function (flashCard) {
        var flashCards = this.flashCards();
        flashCards.splice(_.indexOf(flashCards, flashCard), 1);
        flashCards.push(flashCard);
    },
    // place the flashCard in the middle of the list
    markForSoon: function () {
        var flashCards = this.flashCards();
        var flashCard = this.currentFlashCard;
        flashCards.splice(_.indexOf(flashCards, flashCard), 1);
        flashCards.splice(parseInt(this.poolSize), 0, flashCard);
        this.currentFlashCard = _.first(this.flashCards());
    },
    markForReview: function () {
        var flashCard = this.currentFlashCard;
        var flashCards = this.flashCards();
        var reviewPosition = this.poolSize + this.reviewIntervall;
        flashCards.splice(_.indexOf(flashCards, flashCard), 1);
        flashCards.splice(parseInt(reviewPosition), 0, flashCard);
        this.currentFlashCard = _.first(this.flashCards());
    },
    checkAnswer: function (userAnswer) {
        var flashCard = this.currentFlashCard;
        var displayAnswer = false;
        if (flashCard.answer == userAnswer) {
            this.markAnswerAsCorrect();
        }
        if (flashCard.answer != userAnswer) {
            displayAnswer = true;
        }
        return displayAnswer;
    },
    markAnswerAsCorrect: function () {
        var flashCard = this.currentFlashCard;
        if (flashCard.poolStatus == 1) {
            this.trashFlashCard(flashCard)
            flashCard.markAsCorrectAnswered();
        }
        if (flashCard.poolStatus == 0) {
            this.markForReview(flashCard)
            flashCard.markAsCorrectAnswered();
        }
        if (flashCard.poolStatus == -1) {
            this.markForSoon(flashCard)
            flashCard.markAsCorrectAnswered();
        }

    },
    markAnswerAsWrong: function () {
        var flashCard = this.currentFlashCard;
        flashCard.markAsWrongAnswered();
        this.markForSoon(flashCard);
    }
};




