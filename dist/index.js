"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path = require("path");
var glob = require("glob");
module.exports = function (pattern, baseDir, option) {
    var defaultOption = {
        glob: {},
        commonModules: [],
        useDir: false
    };
    var op = tslib_1.__assign({}, defaultOption, option);
    var result = {};
    try {
        glob.sync(pattern, op.glob).forEach(function (file) {
            var fileName = path.basename(file);
            var fileExt = path.extname(fileName);
            var pathFromBase = baseDir ? path.relative(baseDir, file) : file;
            var modules = op.commonModules ? [].concat(op.commonModules, file) : [file];
            var moduleName = op.useDir ? path.join(pathFromBase, '..') : pathFromBase.slice(0, -fileExt.length);
            moduleName = moduleName.replace(/\\/g, '/');
            result[moduleName] = modules;
        });
    }
    catch (e) {
        console.error(e);
    }
    return result;
};
