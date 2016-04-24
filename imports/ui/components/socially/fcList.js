import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

import './fcList.html';
import { name as FcListsList } from '../fcList/fcListsList/fcListsList';
import { name as FcListDetails } from '../fcList/fcListDetails/fcListDetails';
import { name as FcListUserInvite } from '../fcList/fcListUserInvite/fcListUserInvite';

class FcList {
}

const name = 'fcList';

// create a module
export default angular.module(name, [
    angularMeteor,
    ngMaterial,
    FcListsList,
    uiRouter,
    FcListsList,
    FcListDetails,
    FcListUserInvite,
    'accounts.ui'
]).component(name, {
    templateUrl: `imports/ui/components/socially/${name}.html`,
    controllerAs: name,
    controller: FcList
})
    .config(config)
    //redirect not authorized user
    .run(run);

function config($locationProvider, $urlRouterProvider, $mdIconProvider) {

    'ngInject';

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/fcLists');
    const iconPath =  '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/';

    $mdIconProvider
        .iconSet('social',
        iconPath + 'svg-sprite-social.svg')
        .iconSet('action',
        iconPath + 'svg-sprite-action.svg')
        .iconSet('communication',
        iconPath + 'svg-sprite-communication.svg')
        .iconSet('content',
        iconPath + 'svg-sprite-content.svg')
        .iconSet('toggle',
        iconPath + 'svg-sprite-toggle.svg')
        .iconSet('navigation',
        iconPath + 'svg-sprite-navigation.svg')
        .iconSet('image',
        iconPath + 'svg-sprite-image.svg');

}

// redirect no authorised user
function run($rootScope, $state) {
    'ngInject';

    $rootScope.$on('$stateChangeError',
        (event, toState, toParams, fromState, fromParams, error) => {
            if (error === 'AUTH_REQUIRED') {
                $state.go('fcLists');
            }
        }
    );
}