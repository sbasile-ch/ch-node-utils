"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSupportedLocale = exports.sourceLocales = exports.getNativeNamesObjectArray = exports.getNamesObjectArray = exports.getNativeNamesArray = exports.getNamesArray = exports.NamedIsoCode = void 0;
const tslib_1 = require("tslib");
const iso_639_1_1 = tslib_1.__importDefault(require("iso-639-1"));
const subDirs_js_1 = require("./subDirs.js");
class NamedIsoCode {
    constructor(IsoCode, Name) {
        this.IsoCode = IsoCode;
        this.Name = Name;
    }
}
exports.NamedIsoCode = NamedIsoCode;
function getNamesArray(isoCodes) {
    return isoCodes.map((isoCode) => iso_639_1_1.default.getName(isoCode));
}
exports.getNamesArray = getNamesArray;
function getNativeNamesArray(isoCodes) {
    return isoCodes.map((isoCode) => iso_639_1_1.default.getNativeName(isoCode));
}
exports.getNativeNamesArray = getNativeNamesArray;
function getNamesObjectArray(isoCodes) {
    return isoCodes.map((isoCode) => (new NamedIsoCode(isoCode, iso_639_1_1.default.getName(isoCode))));
}
exports.getNamesObjectArray = getNamesObjectArray;
function getNativeNamesObjectArray(isoCodes) {
    return isoCodes.map((isoCode) => (new NamedIsoCode(isoCode, iso_639_1_1.default.getNativeName(isoCode))));
}
exports.getNativeNamesObjectArray = getNativeNamesObjectArray;
function _customSort(a, b) {
    if (a === "en") {
        return -1;
    }
    if (b === "en") {
        return 1;
    }
    return a.localeCompare(b);
}
function sourceLocales(localesDir) {
    const localesArray = (0, subDirs_js_1.getSubDirs)(localesDir);
    return getNativeNamesObjectArray(localesArray.sort(_customSort));
}
exports.sourceLocales = sourceLocales;
function isSupportedLocale(localesDir, locale) {
    return (0, subDirs_js_1.getSubDirs)(localesDir).includes(locale);
}
exports.isSupportedLocale = isSupportedLocale;
//# sourceMappingURL=languageNames.js.map