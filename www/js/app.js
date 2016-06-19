angular.module('starter', ['ionic', 'backand', 'starter.config', 'starter.services', 'starter.controllers'])

  .run(function ($ionicPlatform, Backand) {

    $ionicPlatform.ready(function () {
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

      // UI Router Authentication Check
//      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
//
//        if (!Parse.User.current() && toState.name !== 'login') {
//          console.log('User isn’t authenticated!!!');
//          // User isn’t authenticated
//          $state.transitionTo('login');
//          event.preventDefault();
//        }
//      });

    });
  });


