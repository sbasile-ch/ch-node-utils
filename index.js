import { getSubDirs } from './utils/subDirs.js';
import { addData }    from './utils/i18nCh.js';
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
};

export default chNodeUtils;
