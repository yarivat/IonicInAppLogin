angular.module('starter.controllers')

  .controller('LoginCtrl', function (Backand, $state, $rootScope, LoginService, $FB) {

    var vm = this;

    function loginError(error) {
      console.error("LoginError", JSON.stringify(error));
    }

    function logIn() {

      var method = (!window.cordova) ? 'browserLogIn' : 'logIn';
      return $FB[method]()
        .then(
          function () {
            return onLogIn();
          })
        .catch(function (error) {
          loginError(JSON.stringify(error));
        });
    }


    function onLogIn() {
      $state.go('tab.dash');
      $rootScope.$broadcast('login');
    }

    vm.logIn = logIn;

  });
