"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTranslations2 = void 0;
const tslib_1 = require("tslib");
const i18next_1 = tslib_1.__importDefault(require("i18next"));
const i18next_fs_backend_1 = tslib_1.__importDefault(require("i18next-fs-backend"));
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importStar(require("fs"));
function _loadAllNamespaces(localesFolder) {
    const jsonFiles = [];
    fs_1.default.readdirSync(localesFolder).forEach((file) => {
        if (path_1.default.extname(file) === '.json') {
            jsonFiles.push(path_1.default.basename(file, '.json'));
        }
    });
    return jsonFiles;
}
function addTranslations2(localesFolder, lang, nameSpaces, vars = {}) {
    let data = {};
    if (nameSpaces.length === 0) {
        nameSpaces = _loadAllNamespaces(path_1.default.join(localesFolder, 'en'));
    }
    i18next_1.default
        .use(i18next_fs_backend_1.default)
        .init({
        initImmediate: false,
        ns: nameSpaces,
        lng: lang,
        fallbackLng: 'en',
        preload: (0, fs_1.readdirSync)(localesFolder).filter((fileName) => {
            const joinedPath = path_1.default.join(localesFolder, fileName);
            return (0, fs_1.lstatSync)(joinedPath).isDirectory();
        }),
        backend: {
            loadPath: path_1.default.join(localesFolder, `{{lng}}/{{ns}}.json`)
        }
    });
    const keysValuesList = i18next_1.default.getDataByLanguage('en');
    if (keysValuesList !== undefined) {
        for (const [ns, value] of Object.entries(keysValuesList)) {
            console.log(`${ns}: ${nameSpaces}`);
            if (nameSpaces.includes(ns)) {
                console.log(`${ns}`);
                for (const [key] of Object.entries(value)) {
                    console.log(`${key}`);
                    data[key] = i18next_1.default.t(key, { ns: ns, vars });
                }
            }
        }
    }
    return data;
}
exports.addTranslations2 = addTranslations2;
//# sourceMappingURL=i18nCh.js.map