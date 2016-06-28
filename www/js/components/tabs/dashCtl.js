angular.module('starter.controllers')

  .controller('DashCtrl', function ($rootScope, $scope, QuestModel) {

    var vm = this;

    function getAll() {
      QuestModel.all()
        .then(function (result) {
          vm.objects = result.data.data;
          console.debug(result.data);
        });
    }

    function block(id) {
      QuestModel.update(id, {'active': false}).then(getAll);
    }

    function activate(id) {
      QuestModel.update(id, {'active': true}).then(getAll);
    }

    function clearData() {
      vm.objects = [];
    }

    vm.objects = [];
    vm.getAll = getAll;
    vm.block = block;
    vm.activate = activate;
    vm.isAuthorized = false;

    $rootScope.$on('login', function () {
      vm.isAuthorized = true;
      getAll();
    });

    $rootScope.$on('logout', function () {
      vm.isAuthorized = false;
      clearData();
    });

    if (!vm.isAuthorized) {
      $rootScope.$broadcast('logout');
    }

    getAll();

  });
