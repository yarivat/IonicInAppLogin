angular.module('starter.services')

  .service('QueryModel', function ($http, Backand) {

      var service = this,
        baseUrl = '/1/objects/',
        objectName = 'query/data/';

      function getUrl() {
        return Backand.getApiUrl() + baseUrl + objectName;
      }

      service.execute = function (queryName, params) {
        if (params === undefined) {
          params = {};
        }
        return $http({
          method: 'GET',
          url: getUrl() + queryName,
          params: params
        });
      };

    }
  );
