import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Lists } from '../../../../api/lists';

import './listsAdd.html';

class ListsAdd {
    constructor() {
        this.list = {};
    }

    submit() {
        this.list.owner = Meteor.user()._id;
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
    angularMeteor
]).component(name, {
    templateUrl: `imports/ui/components/lists/${name}/${name}.html`,
    controllerAs: name,
    controller: ListsAdd
});