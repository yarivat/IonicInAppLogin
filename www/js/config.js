angular.module('starter.config', ['starter.controllers'])

  .config(function (BackandProvider, $stateProvider, $ionicConfigProvider, $urlRouterProvider) {

    BackandProvider.setAppName('socialtest1');
    BackandProvider.setSignUpToken('cf37b110-88ed-4e40-a143-ef9234c37737');
    BackandProvider.setAnonymousToken('74f10962-053a-11e6-b112-0ed7053426cb');

    $ionicConfigProvider.tabs.position('bottom');

    $stateProvider

      .state('login', {
        url: '/login',
        templateUrl: 'js/components/login/login.html',
        controller: 'LoginCtrl as login'
      })


      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'js/components/tabs/tabs.html'
      })

      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'js/components/tabs/tab-dash.html',
            controller: 'DashCtrl as vm'
          }
        }
      })

      .state('tab.wall', {
        url: '/wall',
        views: {
          'tab-wall': {
            templateUrl: 'js/components/tabs/tab-wall.html',
            controller: 'WallCtrl'
          }
        }
      })

      .state('tab.profile', {
        url: '/profile',
        views: {
          'tab-profile': {
            templateUrl: 'js/components/tabs/tab-profile.html',
            controller: 'ProfileCtrl as profile'
          }
        }
      })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

  });
