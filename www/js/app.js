angular.module('PhotoQuestApp', ['ionic', 'backand', 'SimpleRESTIonic.services', 'SimpleRESTIonic.controllers'])
  .run(function ($ionicPlatform, Backand) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }

      var isMobile = ionic.Platform.isIOS() || ionic.Platform.isAndroid();
      Backand.setIsMobile(isMobile);
      Backand.setRunSignupAfterErrorInSigninSocial(true);


    });
  })
  .config(function (BackandProvider, $stateProvider, $urlRouterProvider) {
    BackandProvider.setAppName('socialtest1');
    BackandProvider.setSignUpToken('cf37b110-88ed-4e40-a143-ef9234c37737');
    BackandProvider.setAnonymousToken('74f10962-053a-11e6-b112-0ed7053426cb');

    $urlRouterProvider.otherwise('/tabs/dashboard');

    $stateProvider
      .state('tabs.login', {
        url: '/login',
        views: {
          'tab-login': {
            templateUrl: 'templates/tab-login.html',
            controller: 'LoginCtrl as login'
          }
        }
      })
      .state('tabs.dashboard', {
        url: '/dashboard',
        views: {
          'tab-dashboard': {
            templateUrl: 'templates/tab-dashboard.html',
            controller: 'DashboardCtrl as vm'
          }
        }
      })
      .state('tabs.signup', {
        url: '/signup',
        views: {
          'tab-signup': {
            templateUrl: 'templates/tab-signup.html',
            controller: 'SignUpCtrl as vm'
          }
        }
      })
      .state('tabs', {
        url: "/tab",
        abstract: true,
        //templateUrl: "tabs.html"
        templateUrl: 'templates/tabs.html'
      })
      .state('tabs.home', {
        url: "/home",
        views: {
          'home-tab': {
            templateUrl: "home.html",
            controller: 'HomeTabCtrl'
          }
        }
      })
    $urlRouterProvider.otherwise("/tab/home");

  })
