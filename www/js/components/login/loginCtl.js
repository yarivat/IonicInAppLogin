angular.module('starter.controllers')

  .controller('LoginCtrl', function (Backand, $state, $rootScope, LoginService) {

    var vm = this;

    function loginError(error) {
      console.error("LoginError", JSON.stringify(error));
    }

    function logIn(provider) {

      return LoginService.logIn(provider)
        .then(
          function () {
            return onLogIn();
          })
        .catch(function (error) {
          loginError(error);
        });
    }

    function onLogIn() {
      $state.go('tab.dash');
      $rootScope.$broadcast('login');

    }

    vm.logIn = logIn;

  });
