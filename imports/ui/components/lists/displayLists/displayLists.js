import angular from 'angular';
import angularMeteor from 'angular-meteor';
import './displayLists.html';
import { Lists } from '../../../../api/lists';

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
    //Lists
]).component(name, {
    templateUrl: `imports/ui/components/lists/${name}/${name}.html`,
    controllerAs: name,
    controller: DisplayLists
});