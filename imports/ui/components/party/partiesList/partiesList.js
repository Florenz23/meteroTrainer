import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import { Counts } from 'meteor/tmeasday:publish-counts';

import './partiesList.html';
import { Parties } from '../../../../api/parties';
import { name as PartyAdd } from '../partyAdd/partyAdd';
import { name as PartyRemove } from '../partyRemove/partyRemove';
import { name as PartiesSort } from '../partiesSort/partiesSort';
import { name as PartyAddButton } from '../partyAddButton/partyAddButton';

import { name as PartyCreator } from '../partyCreator/partyCreator';
import { name as PartyRsvp } from '../partyRsvp/partyRsvp';
import { name as PartyRsvpsList } from '../partyRsvpsList/partyRsvpsList';
import { name as PartyUnanswered } from '../partyUnanswered/partyUnanswered';

import { name as DisplayFlashCard } from '../../flashCard/displayFlashCard/displayFlashCard';

class PartiesList {
    constructor($scope, $reactive,$stateParams) {
        'ngInject';

        $reactive(this).attach($scope);
        this.perPage = 3;
        this.page = 1;
        this.sort = {
            name: 1
        };
        this.searchText = '';


        this.subscribe('parties', () => [{
            limit: parseInt(this.perPage),
            skip: parseInt((this.getReactively('page') - 1) * this.perPage),
            sort: this.getReactively('sort')
        }, this.getReactively('searchText')
        ]);
        this.subscribe('users');


        this.helpers({
            parties() {
                const selector = {
                };
                return Parties.find(selector, {
                    sort: this.getReactively('sort')
                });
            },
            partiesCount() {
                return Counts.get('numberOfParties');
            },
            isLoggedIn() {
                return !!Meteor.userId();
            },
            currentUserId() {
                return Meteor.userId();
            }
        });

    }
    isOwner(party) {
        return this.isLoggedIn && party.owner === this.currentUserId;
    }

    pageChanged(newPage) {
        this.page = newPage;
    }

    sortChanged(sort) {
        this.sort = sort;
    }
}

const name = 'partiesList';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    PartyAdd,
    utilsPagination,
    PartiesSort,
    PartyRemove,
    PartyCreator,
    PartyRsvp,
    PartyRsvpsList,
    PartyAddButton,
    DisplayFlashCard,

]).component(name, {
    templateUrl: `imports/ui/components/party/${name}/${name}.html`,
    controllerAs: name,
    controller: PartiesList
});
