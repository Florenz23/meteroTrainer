import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './listDetails.html';

class ListDetails {
    constructor($stateParams) {
        'ngInject';

        this.listId = $stateParams.listId;
    }
}

const name = 'listDetails';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/lists/${name}/${name}.html`,
    controllerAs: name,
    controller: ListDetails
})
.config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider.state('listDetails', {
        url: '/lists/:listId',
        template: '<listDetails></listDetails>'
    });
}
