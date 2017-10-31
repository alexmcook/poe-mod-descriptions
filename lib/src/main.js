"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var translations_json_1 = require("../data/translations.json");
var translations = JSON.parse(translations_json_1.default);
function getTranslation() {
    var ids = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ids[_i] = arguments[_i];
    }
}
exports.getTranslation = getTranslation;
function translationN(n) {
    return translations[n];
}
exports.translationN = translationN;
