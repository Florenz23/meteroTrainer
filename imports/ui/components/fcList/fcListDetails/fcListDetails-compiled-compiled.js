import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './fcListDetails.html';

class PartyDetails {
    constructor($stateParams) {
        'ngInject';

        this.fcListId = $stateParams.fcListId;
    }
}

const name = 'fcListDetails';

// create a module
export default angular.module(name, [angularMeteor, uiRouter]).component(name, {
    templateUrl: `imports/ui/components/${ name }/${ name }.html`,
    controllerAs: name,
    controller: PartyDetails
}).config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider.state('fcListDetails', {
        url: '/fcLists/:fcListId',
        template: '&lt;fcList-details&gt;&lt;/fcList-details&gt;'
    });
};

//# sourceMappingURL=fcListDetails-compiled.js.map

//# sourceMappingURL=fcListDetails-compiled-compiled.js.map