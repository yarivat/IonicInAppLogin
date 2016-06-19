angular.module('starter.controllers')

  .controller('LoginCtrl', function (Backand, $state, $rootScope, LoginService, $FB) {

    var login = this;

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
          console.debug("Main catch");
          loginError(JSON.stringify(error));
        });
    }


    function onLogIn() {
      $state.go('tab.dash');
      $rootScope.$broadcast('authorized');
    }

    login.logIn = logIn;

  });
