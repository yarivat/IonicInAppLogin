angular.module('starter.services', [])

  .service('APIInterceptor', function ($rootScope, $q) {
    var service = this;

    service.responseError = function (response) {
      if (response.status === 401) {
        $rootScope.$broadcast('logout');
      }
      return $q.reject(response);
    };
  });
