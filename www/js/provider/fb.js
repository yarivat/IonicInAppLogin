angular.module('starter.services')

  .factory('$FB', function ($q, LoginService) {

    var provider = 'facebook';

    var fbLoginSuccess = function () {

      var deferred = $q.defer();

      facebookConnectPlugin.getAccessToken(
        function (token) {
          LoginService.socialSignInToken(provider, token).then(
            function (d) {
              deferred.resolve(d);
            },
            function (error) {
              console.error(JSON.stringify(error));
              if (typeof(error) === "object" && error['Message'].startsWith("The user is not signed up to")) {
                deferred.resolve(LoginService.socialSignUp(provider));
              } else {
                deferred.reject(error);
              }
            }
          );
        },
        function (error) {
          console.error("getAccessToken", error);
          deferred.reject(error);
        }
      );

      return deferred.promise;
    };

    var fbGetStatus = function () {

      var deferred = $q.defer();
      facebookConnectPlugin.getLoginStatus(
        function (response) {
          deferred.resolve(response);
        },
        function (error) {
          console.error("getLoginStatus", error);
          deferred.reject(error);
        }
      );

      return deferred.promise;
    };

    var fbLogin = function (response) {

      var deferred = $q.defer();

      if (response.status === 'connected') {
        deferred.resolve(response);
      } else {
        facebookConnectPlugin.login(
          ["public_profile", "email"],

          function (response) {

            if (!response.authResponse) {
              return deferred.reject("Cannot find the authResponse");
            }

            deferred.resolve(response);

          },
          function (error) {
            console.error("login", JSON.stringify(error));
            deferred.reject(error);
          }
        );
      }

      return deferred.promise;

    };


    return {

      logIn: function () {

        console.debug("LogIn");

        return fbGetStatus()
          .then(function (response) {

            return fbLogin(response);

          })
          .then(function () {

            return fbLoginSuccess();

          });

      },

      browserLogIn: function () {

        var deferred = $q.defer();

        LoginService.socialSignIn(provider).then(
          function (response) {
            deferred.resolve();
          },
          function (error) {
            console.error(JSON.stringify(error));
            if (typeof(error) === "object" && error['data'].startsWith("The user is not signed up to")) {
              deferred.resolve(LoginService.socialSignUp(provider));
            } else {
              deferred.reject(error);
            }
          }
        );

        return deferred.promise;

      },

      logOut: function () {

        var deferred = $q.defer();

        if (window.cordova) {
          facebookConnectPlugin.logout(
            function () {
              deferred.resolve();
            },
            function (error) {
              deferred.reject(error);
            }
          );
        } else {
          deferred.resolve();
        }

        return deferred.promise;

      }

    }

  });
