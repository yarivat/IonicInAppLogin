angular.module('starter.services')

  .service('UserModel', function ($http, Backand) {

      var service = this,
        baseUrl = '/1/objects/',
        objectName = 'users/';

      function getUrl() {
        return Backand.getApiUrl() + baseUrl + objectName;
      }

      function getUrlForId(id) {
        return getUrl() + id;
      }

      function all(params) {
        if (params === undefined) {
          params = {};
        }
        return $http({
          method: 'GET',
          url: getUrl(),
          params: params
        });
      };

      function fetch(id) {
        return $http.get(getUrlForId(id));
      };

      function update(id, object) {
        return $http.put(getUrlForId(id), object);
      };


      service.all = all;

      service.fetch = fetch;

      service.update = update;

    }
  );
