import angular from 'angular';
import angularMeteor from 'angular-meteor';
import _ from 'underscore';

import { Meteor } from 'meteor/meteor';

import './fcListRsvp.html';

class PartyRsvp {
    yes() {
        this.answer('yes');
    }

    isYes() {
        return this.isAnswer('yes');
    }

    maybe() {
        this.answer('maybe');
    }

    isMaybe() {
        return this.isAnswer('maybe');
    }

    no() {
        this.answer('no');
    }

    isNo() {
        return this.isAnswer('no');
    }


    answer(answer) {
        Meteor.call('rsvp', this.fcList._id, answer, (error) => {
            if (error) {
                console.error('Oops, unable to rsvp!');
            } else {
                console.log('RSVP done!')
            }
        });

    }

    isAnswer(answer) {
        if (this.fcList) {
            return !!_.findWhere(this.fcList.rsvps, {
                user: Meteor.userId(),
                rsvp: answer
            });
        }
    }
}

const name = 'fcListRsvp';

// create a module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    templateUrl: `imports/ui/components/fcList/${name}/${name}.html`,
    controllerAs: name,
    bindings: {
        fcList: '<'
    },
    controller: PartyRsvp
});