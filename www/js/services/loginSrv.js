angular.module('starter.services')
  .service('LoginService', function ($q, $rootScope, Backand, UserModel, $FB) {

    var service = this;

    service.provider = undefined;
    $rootScope.currentUser = {};


    function getCurrentUserInfo() {
      return UserModel.all({
        filter: JSON.stringify([{
          fieldName: "email",
          operator: "contains",
          value: $rootScope.currentUser.name
        }])
      }).then(function (response) {
        if (response.data && response.data.data && response.data.data.length == 1) {
          return response.data.data[0];
        }
      });
    }

    function setProvider(provider) {
      switch (provider) {
        case 'facebook':
          service.provider = $FB;
          break;
        default:
          throw ("Provider `{0}` is not implemented yet!".format(provider));
      }
    }

    service.logIn = function (provider) {
      setProvider(provider);

      var deferred = $q.defer();

      service.provider.logIn()
        .then(function () {
          return service.loadUserDetails();
        })
        .then(function () {
          deferred.resolve();
        });

      return deferred.promise;

    };

    service.logOut = function (provider) {

      setProvider(provider);

      var deferred = $q.defer();

      service.provider.logOut()
        .then(function () {
          return Backand.signout();
        })
        .then(function () {
          angular.copy({}, $rootScope.currentUser);
          deferred.resolve();
        });

      return deferred.promise;
    };


    service.loadUserDetails = function () {
      $rootScope.currentUser.name = Backand.getUsername();
      if ($rootScope.currentUser.name) {

        getCurrentUserInfo()
          .then(function (data) {
            $rootScope.currentUser.details = data;
          });
      }
    };


  });
