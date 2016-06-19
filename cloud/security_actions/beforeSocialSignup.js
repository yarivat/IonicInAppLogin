'use strict';

function backandCallback(userInput, dbRow, parameters, userProfile) {


  if (parameters.socialProfile.Provider == "facebook") {
    userInput.fuid = parameters.socialProfile.additionalValues.id;
    userInput.avatar = "https://graph.facebook.com/" + userInput.fuid + "/picture?type=large";
  }
  userInput.signupDate = new Date().toISOString();

}
