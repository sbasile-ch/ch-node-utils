import { getSubDirs as getSubDirs} from './utils/subDirs.js';
import { addData as addData}       from './utils/Locales.js';
import { getNamesArray             as getNamesArray             } from './utils/languageNames.js';
import { getNativeNamesArray       as getNativeNamesArray       } from './utils/languageNames.js';
import { getNamesObjectArray       as getNamesObjectArray       } from './utils/languageNames.js';
import { getNativeNamesObjectArray as getNativeNamesObjectArray } from './utils/languageNames.js';
import { sourceLocales             as sourceLocales             } from './utils/languageNames.js';
import { isSupportedLocale         as isSupportedLocale         } from './utils/languageNames.js';

const chNodeUtils = {
    getSubDirs,
    getNamesArray,
    getNativeNamesArray,
    getNamesObjectArray,
    getNativeNamesObjectArray,
    sourceLocales,
    isSupportedLocale,
    addData
};

export default chNodeUtils;
