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

    function deleteId(id) {
      QuestModel.delete(id).then(getActive);

    }

    function clearData() {
      vm.objects = [];
    }

    vm.objects = [];
    vm.getAll = getAll;
    vm.deleteId = deleteId;
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
