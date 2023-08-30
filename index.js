import { getSubDirs } from './utils/subDirs.js';
import { _loadAllNamespaces, addData } from './utils/Locales.js';
import {
     getNamesArray,
     getNativeNamesArray,
     getNamesObjectArray,
     getNativeNamesObjectArray,
     sourceLocales,
     isSupportedLocale } from './utils/languageNames.js';

const chNodeUtils = {
    getSubDirs,
    getNamesArray,
    getNativeNamesArray,
    getNamesObjectArray,
    getNativeNamesObjectArray,
    sourceLocales,
    isSupportedLocale,
    addData,
    _loadAllNamespaces,
};

export default chNodeUtils;
