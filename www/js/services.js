angular.module('starter.services', [])

.service('LoginService', function(Backand) {
    var service = this;

    service.socialSignIn = function(provider) {
        return Backand.socialSignIn(provider);
    };

    service.socialSignUp = function(provider) {
        return Backand.socialSignUp(provider);

    };

    service.socialSignInToken = function(provider, token) {
        console.log("facebookToken", token);
        return Backand.socialSignInToken(provider, token);
    }

    service.signOut = function() {
        return Backand.signout();
    };

});
