(function(window) {

  var locationAlertName = 'locationAlert';
  var checkVersionAlertName = 'checkVersionAlert';

  var now = window.now = new Date();
  var storagePrfix = 'instants-';
  var versionUrl = 'https://s3-ap-northeast-1.amazonaws.com/now.instants.xyz/version.json';
  var versionStore = 'versionAvailable';

  checkVersionUpdate();
  updateLocation();

  chrome.alarms.create(locationAlertName, { periodInMinutes: 30 });
  chrome.alarms.create(checkVersionAlertName, { periodInMinutes: 60*12 });
  chrome.alarms.onAlarm.addListener(function(alarm) {
    var name = alarm.name;

    if (name === locationAlertName) {
      updateLocation();
    }
    else if (name === checkVersionAlertName) {
      checkVersionUpdate(); 
    }
  });

  // update current locaiton
  function updateLocation() {
    console.log('update...');
    getLocalStorage('isLocationManual', function(isManual) {
      if (isManual) {
        return;
      }
      if (navigator.geolocation) {
        // always update location info
        navigator.geolocation.getCurrentPosition(setNewLocation);
      }
    });
  }
  
  function setNewLocation(position, render) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var newLocation = {
      lat: lat,
      lng: lng,
      updateAt: +window.now
    };

    if (isValidLocation(newLocation)) {
      locationInfo = getLocationInfo(newLocation);
      // save new location
      saveToLocalStorage('location', newLocation);
    }
  }

  function saveToLocalStorage(key, value, saveTo) {
    if (!saveTo) saveTo = 'sync';

    var data = {};
    data[storagePrfix+key] = value;
    chrome.storage[saveTo].set(data, function() {
     if (chrome.runtime.error) 
       console.log("Runtime error.");
   });
  }

  function getLocalStorage(key, cb, opts, from) {
    if (!from) from = 'sync';
    chrome.storage[from].get(storagePrfix+key, function (result) {
      if (result) {
        cb(result[storagePrfix+key], opts);
      }
    });
  }

  function isValidLocation(loc) {
    return loc && !isNaN(loc.lat) && !isNaN(loc.lng);
  }


  function getLocationInfo(location) {
    var api = 'http://maps.googleapis.com/maps/api/geocode/json?sensor=false&latlng=' + 
      location.lat+','+location.lng;

    $.getJSON(api, function(res) {
      var data = res.results;
      if (data && data.length > 5) {
        city = data[5].address_components[0].long_name;
        saveToLocalStorage('city', city);
      }
    })
    .fail(function() { 
      console.log( "error" );
    });
  }

  function checkVersionUpdate() {
    var manifest = chrome.runtime.getManifest();
    var version = manifest.version;
    $.getJSON(versionUrl, function(data) {
      getLocalStorage(versionStore, function(availableVersion) {
        var serverVersion = data.version;

        if (data && serverVersion > version && serverVersion !== availableVersion) {
          pushVersionNotify(version, data);
        }
      });
    })
    .fail(function() { 
      console.log( "error" );
    });
  }

  function pushVersionNotify(oldVersion, data) {
    var opts = {
      type: "basic",
      title: "Instants 有重要的版本更新 ",
      message:  data.message,
      iconUrl: "./icons/icon128.png",
      isClickable: true,
      buttons: [
        {title: '立即更新'}
      ]
    };
    chrome.notifications.create("version", opts, function() {
      saveToLocalStorage(versionStore, data.version);
    });
  }

  chrome.notifications.onButtonClicked.addListener(function(notificationId) {
    if (notificationId === "version") {
       chrome.runtime.requestUpdateCheck(function(res) {
        chrome.runtime.reload();
      });
    }
  });

})(window);
