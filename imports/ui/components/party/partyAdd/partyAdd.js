import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';

import './partyAdd.html';
import { Parties } from '../../../../api/parties';

class PartyAdd {
    constructor($stateParams) {
        this.party = {};
        this.listId = $stateParams.listId;
    }

    submit() {
        this.party.owner = Meteor.user()._id;
        this.party.listId = this.listId;
        console.log(this.party);
        Parties.insert(this.party);
        this.reset();

        if(this.done) {
            this.done();
        }

    }


    reset() {
        this.party = {};
    }
}

const name = 'partyAdd';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
]).component(name, {
    templateUrl: `imports/ui/components/party/${name}/${name}.html`,
    bindings: {
        done: '&?'
    },
    controllerAs: name,
    controller: PartyAdd
})
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('partyAdd', {
            url: '/addParty',
            template: '<party-add></party-add>'
        });
}

