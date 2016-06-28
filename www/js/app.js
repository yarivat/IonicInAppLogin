angular.module('starter', ['ionic', 'backand', 'starter.config', 'starter.services', 'starter.controllers'])

.run(function($ionicPlatform, $rootScope, $state, Backand, LoginService) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }

    var isMobile = ionic.Platform.isIOS() || ionic.Platform.isAndroid();
    Backand.setIsMobile(isMobile);
    Backand.setRunSignupAfterErrorInSigninSocial(false);

    LoginService.loadUserDetails();

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {

      if (toState.name != 'login' && Backand.getToken() === undefined) {
        $state.go('login');
      }

      else if (toState.name == 'login' && Backand.getToken()) {
        $state.go(fromState.name);
      }

    });

  });
});
