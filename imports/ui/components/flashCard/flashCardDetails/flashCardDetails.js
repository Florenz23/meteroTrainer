import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './flashCardDetails.html';

class ListDetails {
    constructor($stateParams) {
        'ngInject';

        this.listId = $stateParams.listId;
    }
}

const name = 'flashCardDetails';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/flashCard/${name}/${name}.html`,
    controllerAs: name,
    controller: ListDetails
})
.config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider.state('flashCardDetails', {
        url: '/lists/:listId',
        template: '<flashCardDetails></flashCardDetails>'
    });
}
