angular.module('starter.controllers')

  .controller('ProfileCtrl', function ($scope, $state, $rootScope, $FB, LoginService, Backand) {

    var profile = this;

    function onLogOut() {
      $state.go('login');
      $rootScope.$broadcast('logout');
    };

    function logOut() {
      $FB.logOut()
        .then(function() {
          return LoginService.signOut()
        })
        .then(function () {
          return onLogOut(); 
        });
    };

    profile.getUsername = function () {
      return Backand.getUsername();
    };

    profile.logOut = logOut;

    LoginService.loadUserDetails();

    profile.currentUser = LoginService.currentUser;



  });
