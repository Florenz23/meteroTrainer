import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './displayLists.html';
import { Lists } from '../../../../api/lists';
import { name as ListsAdd } from '../listsAdd/listsAdd';
import { name as ListRemove } from '../listRemove/listRemove';


class DisplayLists {
    constructor($scope, $reactive,$stateParams) {
        'ngInject';

        this.listId = $stateParams.listId;
        console.log(this.listId);
        $reactive(this).attach($scope);
        this.subscribe('lists');

        this.helpers({
            lists() {
                const selector = {
                    listId : $stateParams.listId
                };
                console.log(selector);
                return Lists.find(selector);
            }
        });
    }
}

const name = 'displayLists';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    ListsAdd,
    ListRemove,
]).component(name, {
    templateUrl: `imports/ui/components/lists/${name}/${name}.html`,
    controllerAs: name,
    controller: DisplayLists
})
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('partiesList', {
            url: '/lists/:listId',
            template: '<display-lists></display-lists>'
        });
}
