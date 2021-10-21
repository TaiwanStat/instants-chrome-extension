var storagePrfix = 'instants-';

export function saveToLocalStorage(key, value, saveTo) {
  if(typeof(Storage) === "undefined") {
    return;
  }
  var data = {};
  localStorage.setItem(storagePrfix+key, JSON.stringify(value));
}

export function getLocalStorage(key, cb, opts, from) {
  if(typeof(Storage) === "undefined") {
    return cb(null, opts)
  }
  var result = localStorage.getItem(storagePrfix+key)
  if (result)
    result = JSON.parse(result);
  cb(result, opts)
}

export function isValidLocation(loc) {
  return loc && !isNaN(loc.lat) && !isNaN(loc.lng);
}
