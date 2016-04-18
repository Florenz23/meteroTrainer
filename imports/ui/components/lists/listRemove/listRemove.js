import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './listRemove.html';
import { Lists } from '../../../../api/lists';

class ListRemove {
    remove() {
        if (this.list) {
            Lists.remove(this.list._id);
        }
    }
}

const name = 'listRemove';

// create a module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    templateUrl: `imports/ui/components/lists/${name}/${name}.html`,
    bindings: {
        list: '<'
    },
    controllerAs: name,
    controller: ListRemove
});