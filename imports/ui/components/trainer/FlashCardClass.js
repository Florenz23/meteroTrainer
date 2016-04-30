/**
 * Created by Florenz on 17.03.16.
 */

import angular from 'angular';

export function ClassFlashCard(flashCardObject) {
    this.question = flashCardObject.question;
    this.answer = flashCardObject.answer;
    this.poolStatus = this.setStartPoolStatus(flashCardObject.poolStatus);
}
ClassFlashCard.prototype.setStartPoolStatus = function (poolStatus) {
    var start_pool_status = 1;
    var newPoolStatus;
    if (poolStatus == undefined) {
        newPoolStatus = start_pool_status;
    } else {
        newPoolStatus = poolStatus;
    }
    return newPoolStatus;
}

ClassFlashCard.prototype.markAsCorrectAnswered = function () {
    if (this.poolStatus <= 0) {
        this.poolStatus++;
    }
}
ClassFlashCard.prototype.markAsWrongAnswered = function () {
    this.poolStatus = -1;
}


ClassFlashCard.$inject = ['flashCardObject'];

function config() {
    'ngInject';
}

