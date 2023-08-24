
const path    = require('path');
const iso6391 = require('iso-639-1');
const dirs    = require("./subDirs");

function getNamesArray(isoCodes) {
    return isoCodes.map((isoCode) => iso6391.getName(isoCode));
}

function getNativeNamesArray(isoCodes) {
    return isoCodes.map((isoCode) => iso6391.getNativeName(isoCode));
}

function getNamesObjectArray(isoCodes) {
    return isoCodes.map((isoCode) => ({ IsoCode: isoCode, Name: iso6391.getName(isoCode) }) );
}

function getNativeNamesObjectArray(isoCodes) {
    return isoCodes.map((isoCode) => ({ IsoCode: isoCode, Name: iso6391.getNativeName(isoCode) }) );
}



// custom sort to leave "en" always at 1st position
function _customSort(a, b) {
  if (a === "en") { return -1; } // 'en' is considered smaller, so it will be placed at the beginning
  if (b === "en") { return  1; }

  return a.localeCompare(b); // Sort other elements in ascending order
}

function sourceLocales( localesDir ) {
    const  localesArray = dirs.get (localesDir);
    return getNativeNamesObjectArray (localesArray.sort(_customSort));
}

function isSupportedLocale( localesDir, locale ) {
    return locale ? dirs.get (localesDir).includes (locale) : false;
}

module.exports = {
     getNamesArray,
     getNativeNamesArray,
     getNamesObjectArray,
     getNativeNamesObjectArray,
     sourceLocales,
     isSupportedLocale
};
