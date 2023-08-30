import iso6391 from 'iso-639-1';
import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import path    from 'path';
import fs, { readdirSync, lstatSync } from 'fs'

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





// load all the file names (excluded .json) present in a certain dir
function _loadAllNamespaces (localesFolder) {
    const jsonFiles = [];

    fs.readdirSync(localesFolder).forEach((file) => {
          if (path.extname(file) === '.json') {
              jsonFiles.push (path.basename(file, '.json'));
          }
    });
    return jsonFiles;
}

// load all the file names (excluded extension: .json) present in a certain dir
export function addTranslations (localesFolder, lang, nameSpaces, vars) {
    var data = {}

    if (nameSpaces.length === 0) {
        nameSpaces =  this._loadAllNamespaces(path.join(localesFolder, 'en'));
    }
    i18next
    .use(Backend)
    .init({
     initImmediate: false, // setting initImediate to false, will load the resources synchronously
     ns: nameSpaces,
     lng: lang,
     fallbackLng: 'en',
     preload: readdirSync(localesFolder).filter((fileName) => {
        const joinedPath = path.join(localesFolder, fileName)
        return lstatSync(joinedPath).isDirectory()
     }),
     backend: {
        loadPath: path.join(localesFolder, `{{lng}}/{{ns}}.json`)
     }
    })

    for (const [ns, value] of Object.entries(i18next.getDataByLanguage('en'))) {
        console.log(`${ns}: ${nameSpaces}`);
        if (nameSpaces.includes(ns)) {
            console.log(`${ns}`);
            for (const [key] of Object.entries(value)) {
               console.log(`${key}`);
               data[key] = i18next.t(key, {ns: ns, vars});
            }
        }
    }

    return data;
}
