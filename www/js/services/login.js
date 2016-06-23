angular.module('starter.services')
  .service('LoginService', function(Backand, UserModel) {
    var service = this;

    service.currentUser = {};

    service.loadUserDetails = function() {
      service.currentUser.name = Backand.getUsername();
      if (service.currentUser.name) {

        getCurrentUserInfo()
          .then(function (data) {
            service.currentUser.details = data;
          });

      }
    };

    function getCurrentUserInfo() {
      return UserModel.all({
        filter: JSON.stringify([{
          fieldName: "email",
          operator: "contains",
          value: service.currentUser.name
        }])
      }).then(function (response) {
        if (response.data && response.data.data && response.data.data.length == 1) {
          return response.data.data[0];
        }
      });
    }

    service.socialSignIn = function(provider) {
        return Backand.socialSignIn(provider).then(function (response) {
          service.loadUserDetails();
          return response;
        });
    };

    service.socialSignUp = function(provider) {
        return Backand.socialSignUp(provider).then(function (response) {
          service.loadUserDetails();
          return response;
        });

    };

    service.socialSignInToken = function(provider, token) {
        console.log("facebookToken", token);
        return Backand.socialSignInToken(provider, token).then(function (response) {
          service.loadUserDetails();
          return response;
        });
    };

    service.signOut = function() {
      Backand.signout().then(function () {
        angular.copy({}, self.currentUser);
      });
    }

  });
