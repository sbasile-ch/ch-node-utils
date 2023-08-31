import iso6391 from 'iso-639-1';
import { getSubDirs } from "./subDirs.js";

class NamedIsoCode {
   constructor(public IsoCode: string, public Name: string) {
   }
}
function getNamesArray(isoCodes: string[]) {
    return isoCodes.map((isoCode) => iso6391.getName(isoCode));
}

function getNativeNamesArray(isoCodes: string[]) {
    return isoCodes.map((isoCode) => iso6391.getNativeName(isoCode));
}

function getNamesObjectArray(isoCodes: string[]) {
   // return isoCodes.map((isoCode) => ({ IsoCode: isoCode, Name: iso6391.getName(isoCode) }) );
   return isoCodes.map((isoCode) => (new NamedIsoCode(isoCode, iso6391.getName(isoCode))) );
}

function getNativeNamesObjectArray(isoCodes: string[]) {
   // return isoCodes.map((isoCode) => ({ IsoCode: isoCode, Name: iso6391.getNativeName(isoCode) }) );
   return isoCodes.map((isoCode) => (new NamedIsoCode(isoCode, iso6391.getNativeName(isoCode))) );
}



// custom sort to leave "en" always at 1st position
function _customSort(a: string, b: string): number {
  if (a === "en") { return -1; } // 'en' is considered smaller, so it will be placed at the beginning
  if (b === "en") { return  1; }

  return a.localeCompare(b); // Sort other elements in ascending order
}

function sourceLocales( localesDir: string ): NamedIsoCode[] {
    const  localesArray = getSubDirs (localesDir);
    return getNativeNamesObjectArray (localesArray.sort(_customSort));
}

function isSupportedLocale( localesDir: string, locale: string ): boolean {
    return getSubDirs (localesDir).includes (locale);
}

export {NamedIsoCode, getNamesArray, getNativeNamesArray, getNamesObjectArray, getNativeNamesObjectArray, sourceLocales, isSupportedLocale};