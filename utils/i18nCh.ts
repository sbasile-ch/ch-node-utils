import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import path    from 'path';
import fs, { readdirSync, lstatSync } from 'fs'

// load all the file names (excluded .json) present in a certain dir
function _loadAllNamespaces (localesFolder: string): string[] {
    const jsonFiles: string[] = [];

    fs.readdirSync(localesFolder).forEach((file) => {
          if (path.extname(file) === '.json') {
              jsonFiles.push (path.basename(file, '.json'));
          }
    });
    return jsonFiles;
}

// load all the file names (excluded extension: .json) present in a certain dir
function addTranslations2 (localesFolder: string, lang: string, nameSpaces: string[], vars: any = {}) {
   // let data: keyPairs = {}; 
   let data: any = {}; 

    if (nameSpaces.length === 0) {
        nameSpaces =  _loadAllNamespaces(path.join(localesFolder, 'en'));
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

    const keysValuesList = i18next.getDataByLanguage('en');
    if ( keysValuesList !== undefined) {
      for (const [ns, value] of Object.entries(keysValuesList)) {
         console.log(`${ns}: ${nameSpaces}`);
         if (nameSpaces.includes(ns)) {
            console.log(`${ns}`);
            for (const [key] of Object.entries(value)) {
               console.log(`${key}`);
               data[key] = i18next.t(key, {ns: ns, vars});
            }
         }
      }
   }

    return data;
}

export {addTranslations2};