import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './flashCardRemove.html';
import { Lists } from '../../../../api/lists';

class FlashCardRemove {
    remove() {
        if (this.flash) {
            console.log(this.flash);
            Lists.remove(this.flash._id);
        }
    }
}

const name = 'flashCardRemove';

// create a module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    templateUrl: `imports/ui/components/flashCard/${name}/${name}.html`,
    bindings: {
        flash: '<'

    },
    controllerAs: name,
    controller: FlashCardRemove
});