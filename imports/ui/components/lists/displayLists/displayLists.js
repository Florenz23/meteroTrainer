import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './displayLists.html';
import { Lists } from '../../../../api/lists';
import { name as ListsAdd } from '../listsAdd/listsAdd';
import { name as ListRemove } from '../listRemove/listRemove';
import { name as PartiesList } from '../../party/partiesList/partiesList';

class DisplayLists {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);
        this.subscribe('lists');

        this.helpers({
            lists() {
                return Lists.find({});
            }
        });
    }
}

const name = 'displayLists';

// create a module
export default angular.module(name, [
    angularMeteor,
    ListsAdd,
    ListRemove,
    PartiesList
]).component(name, {
    templateUrl: `imports/ui/components/lists/${name}/${name}.html`,
    controllerAs: name,
    controller: DisplayLists
});
