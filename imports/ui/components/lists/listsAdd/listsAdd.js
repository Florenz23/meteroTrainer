import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Lists } from '../../../../api/lists';

import './listsAdd.html';

class ListsAdd {
    constructor($stateParams) {
        'ngInject';
        this.list = {};
        this.listId = $stateParams.listId;
    }

    submit() {
        this.list.owner = Meteor.user()._id;
        this.list.listId = this.listId;
        Lists.insert(this.list);
        this.reset();
    }

    reset() {
        this.list = {};
    }
}



const name = 'listsAdd';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/lists/${name}/${name}.html`,
    controllerAs: name,
    controller: ListsAdd
});