angular.module('SimpleRESTIonic.services', [])

  .service('APIInterceptor', function ($rootScope, $q) {
    var service = this;

    service.responseError = function (response) {
      if (response.status === 401) {
        $rootScope.$broadcast('unauthorized');
      }
      return $q.reject(response);
    };
  })

  .service('ItemsModel', function ($http, Backand) {
    var service = this,
      baseUrl = '/1/objects/',
      objectName = 'items/';

    function getUrl() {
      return Backand.getApiUrl() + baseUrl + objectName;
    }

    function getUrlForId(id) {
      return getUrl() + id;
    }

    service.all = function () {
      return $http.get(getUrl());
    };

    service.fetch = function (id) {
      return $http.get(getUrlForId(id));
    };

    service.create = function (object) {
      return $http.post(getUrl(), object);
    };

    service.update = function (id, object) {
      return $http.put(getUrlForId(id), object);
    };

    service.delete = function (id) {
      return $http.delete(getUrlForId(id));
    };
  })

  .service('LoginService', function (Backand) {
    var service = this;

    service.socialSignIn = function (provider) {
      return Backand.socialSignIn(provider);
    };

    service.socialSignUp = function (provider) {
      return Backand.socialSignUp(provider);

    };

    service.facebookToken = function(token){
      console.log("facebookToken",token);
      return Backand.socialSignInToken('facebook', token);
    }

    service.signout = function () {
      return Backand.signout();
    };
    
  });
