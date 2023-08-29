
import path    from 'path';
import iso6391 from 'iso-639-1';
import { getSubDirs } from "./subDirs.js";

export function getNamesArray(isoCodes) {
    return isoCodes.map((isoCode) => iso6391.getName(isoCode));
}

export function getNativeNamesArray(isoCodes) {
    return isoCodes.map((isoCode) => iso6391.getNativeName(isoCode));
}

export function getNamesObjectArray(isoCodes) {
    return isoCodes.map((isoCode) => ({ IsoCode: isoCode, Name: iso6391.getName(isoCode) }) );
}

export function getNativeNamesObjectArray(isoCodes) {
    return isoCodes.map((isoCode) => ({ IsoCode: isoCode, Name: iso6391.getNativeName(isoCode) }) );
}



// custom sort to leave "en" always at 1st position
function _customSort(a, b) {
  if (a === "en") { return -1; } // 'en' is considered smaller, so it will be placed at the beginning
  if (b === "en") { return  1; }

  return a.localeCompare(b); // Sort other elements in ascending order
}

export function sourceLocales( localesDir ) {
    const  localesArray = getSubDirs (localesDir);
    return getNativeNamesObjectArray (localesArray.sort(_customSort));
}

export function isSupportedLocale( localesDir, locale ) {
    return locale ? getSubDirs (localesDir).includes (locale) : false;
}
