"use strict";
var glob_1 = require("glob");
var path_1 = require("path");
var getEntries = function (options) {
    var entries = {};
    var _loop_1 = function(ext) {
        glob_1.sync(path_1.join(options.origin, "**/*" + ext.origin), options.glob)
            .forEach(function (v) {
            var filePath = path_1.resolve(v), diffPath = path_1.relative(options.origin, filePath), originBasename = path_1.basename(filePath, ext.origin), currentDirname = path_1.dirname(diffPath), pathName = path_1.resolve(options.target, currentDirname, originBasename + ext.target);
            entries[pathName] = filePath;
        });
    };
    for (var _i = 0, _a = options.ext; _i < _a.length; _i++) {
        var ext = _a[_i];
        _loop_1(ext);
    }
    return entries;
};
module.exports = getEntries;
