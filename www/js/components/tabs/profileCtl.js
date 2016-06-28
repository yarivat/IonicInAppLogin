angular.module('starter.controllers')

  .controller('ProfileCtrl', function ($scope, $state, $rootScope, LoginService, Backand) {

    var profile = this;

    function onLogOut() {
      $state.go('login');
      $rootScope.$broadcast('logout');
    };

    function logOut(provider) {
      LoginService.logOut(provider)
        .then(function () {
          return onLogOut();
        });
    };

    profile.logOut = logOut;

  });
