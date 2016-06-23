angular.module('starter.services')

  .service('QuestModel', function ($http, Backand) {

      var service = this,
        baseUrl = '/1/objects/',
        objectName = 'quests/';

      function getUrl() {
        return Backand.getApiUrl() + baseUrl + objectName;
      }

      function getUrlForId(id) {
        return getUrl() + id;
      }

      service.all = function (params) {
        if (params === undefined) {
          params = {};
        }
        return $http({
          method: 'GET',
          url: getUrl(),
          params: params
        });
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

    }
  );
