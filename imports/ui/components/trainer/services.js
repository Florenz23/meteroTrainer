import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import { FlashCards } from '../../../api/flashCards';


class ClassFlashCard {
    constructor(flashCardObject) {
        this.id = flashCardObject._id;
        this.question = flashCardObject.question;
        this.answer = flashCardObject.answer;
        this.poolStatus = this.setStartPoolStatus(flashCardObject.poolStatus);
        this.setRight(flashCardObject);
        this.setWrong(flashCardObject);
        this.setRating(flashCardObject);
    }

    setRight = function (flashCardObject) {
        if (Number(flashCardObject.right) === flashCardObject.right && flashCardObject.right % 1 === 0) {
            this.right = flashCardObject.right;
        } else {
            this.right = 0;
        }
    }
    setWrong = function (flashCardObject) {
        if (Number(flashCardObject.wrong) === flashCardObject.wrong && flashCardObject.wrong % 1 === 0) {
            this.wrong = flashCardObject.wrong;
        } else {
            this.wrong = 0;
        }
    }
    setRating = function (flashCardObject) {
        if (Number(flashCardObject.rating) === flashCardObject.rating && flashCardObject.rating % 1 === 0) {
            this.rating = flashCardObject.rating;
        } else {
            this.rating = 0;
        }
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
        this.updateDbFlashCard();
        this.right++;
    }
    markAsWrongAnswered = function () {
        this.poolStatus = -1;
        this.updateDbFlashCard();
        this.wrong++;
    }
    updateDbFlashCard = function(){
        FlashCards.update({
            _id: this.id
        }, {
            $set: {
                right: this.right,
                wrong: this.wrong,
                rating: this.rating
            }
        }, (error) => {
            if (error) {
                console.log('Oops, unable to update the flashCard...');
            } else {
                console.log('Updated!');
            }
        });
    }
}

var pool_size = 4;
var review_interval = 4;

class ClassVocab {
    constructor() {
    }

    chargeVocs = function (dbFlashCards) {
        var flashCards = new Array();
        for (var i = 0; i < dbFlashCards.length; i++) {
            var obj = new ClassFlashCard(dbFlashCards[i]);
            flashCards.push(obj);
        }
        this.dbFlashCards = flashCards;
    }
    iniTrainer = function () {
        this.currentFlashCard = _.first(this.flashCards());
        this.poolSize = pool_size;
        this.reviewIntervall = review_interval;
        this.displayAnswer = false;
    }

    flashCards = function () {
        return this._flashCards || this.getFlashCards();
    }
    getFlashCards = function () {
        this._flashCards = this.dbFlashCards;
        return this._flashCards;
    }
    // grab the next flashCard in the list or wrap around to the start
    nextFlashCard = function () {
        if (_.last(this.flashCards()).question == this.currentFlashCard.question) {
            this.currentFlashCard = _.first(this.flashCards());
        } else {
            var currentIndex = _.indexOf(this.flashCards(), this.currentFlashCard);
            this.currentFlashCard = this.flashCards()[currentIndex + 1];
        }

        return this.currentFlashCard;
    }
    wordByName = function (name) {
        return _.detect(this.flashCards(), function (flashCard) {
            return flashCard.question == name;
        });
    }
    trashFlashCard = function () {
        var flashCard = this.currentFlashCard;
        this._flashCards.splice(_.indexOf(this._flashCards, flashCard), 1);
        this.currentFlashCard = _.first(this.flashCards());
    }
    // simply move flashCard to end of the list
    markForLater = function (flashCard) {
        var flashCards = this.flashCards();
        flashCards.splice(_.indexOf(flashCards, flashCard), 1);
        flashCards.push(flashCard);
    }
    // place the flashCard in the middle of the list
    markForSoon = function () {
        var flashCards = this.flashCards();
        var flashCard = this.currentFlashCard;
        flashCards.splice(_.indexOf(flashCards, flashCard), 1);
        flashCards.splice(parseInt(this.poolSize), 0, flashCard);
        this.currentFlashCard = _.first(this.flashCards());
    }
    markForReview = function () {
        var flashCard = this.currentFlashCard;
        var flashCards = this.flashCards();
        var reviewPosition = this.poolSize + this.reviewIntervall;
        flashCards.splice(_.indexOf(flashCards, flashCard), 1);
        flashCards.splice(parseInt(reviewPosition), 0, flashCard);
        this.currentFlashCard = _.first(this.flashCards());
    }
    checkAnswer = function (userAnswer) {
        var flashCard = this.currentFlashCard;
        var displayAnswer = false;
        if (flashCard.answer == userAnswer) {
            this.markAnswerAsCorrect();
        }
        if (flashCard.answer != userAnswer) {
            displayAnswer = true;
        }
        return displayAnswer;
    }
    markAnswerAsCorrect = function () {
        var flashCard = this.currentFlashCard;
        if (flashCard.poolStatus == 1) {
            this.trashFlashCard(flashCard)
            flashCard.markAsCorrectAnswered();
            console.log(flashCard);
        }
        if (flashCard.poolStatus == 0) {
            this.markForReview(flashCard)
            flashCard.markAsCorrectAnswered();
        }
        if (flashCard.poolStatus == -1) {
            this.markForSoon(flashCard)
            flashCard.markAsCorrectAnswered();
        }

    }
    markAnswerAsWrong = function () {
        var flashCard = this.currentFlashCard;
        flashCard.markAsWrongAnswered();
        this.markForSoon(flashCard);
    }
}

export const Vocab = new ClassVocab();



