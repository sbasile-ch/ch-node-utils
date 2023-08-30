import i18next from "i18next"
import Backend from 'i18next-fs-backend'
import path from 'path';
import fs, { readdirSync, lstatSync } from 'fs'

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
export function addData (localesFolder, lang, nameSpaces, vars) {
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
