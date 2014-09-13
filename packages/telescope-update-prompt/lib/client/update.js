compareVersions = function (v1, v2) { // return true if v2 is newer than v1
  var v1Array = v1.split('.');
  var v2Array = v2.split('.');
  // go through each segment of v2 and stop if we find one that's higher
  // than the equivalent segment of v1; else return false
  return v2Array.some( function (value, index) {
    return value > v1Array[index];
  });
  return false;
}

Meteor.startup(function () {
  if(Meteor.user() && isAdmin(Meteor.user())){
    var url = 'http://localhost:3000/';
    HTTP.get(url, {
      data: {
        currentVersion: telescopeVersion,
        siteTitle: getSetting('title'),
        siteUrl: getSiteUrl()
      }
    }, function (error, result) {
      if(result){
        var currentVersion = telescopeVersion;
        var newVersion = "0.9.5";
        var message = "";
        if (compareVersions(currentVersion, newVersion)){
          Session.set('updateVersion', newVersion);
        }
      }
    });
  }
});

heroModules.push({
  template: 'updateBanner'
});