import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './fcListRemove.html';
import { Parties } from '../../../../api/fcLists';

class PartyRemove {
  remove() {
    if (this.fcList) {
      Parties.remove(this.fcList._id);
    }
  }
}

const name = 'fcListRemove';

// create a module
export default angular.module(name, [angularMeteor]).component(name, {
  templateUrl: `imports/ui/components/fcList/${ name }/${ name }.html`,
  bindings: {
    fcList: '<'
  },
  controllerAs: name,
  controller: PartyRemove
});

//# sourceMappingURL=fcListRemove-compiled.js.map