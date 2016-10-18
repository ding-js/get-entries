"use strict";
var glob_1 = require("glob");
var path_1 = require("path");
var getEntries = function (options) {
    var entries = {};
    var _loop_1 = function(ext) {
        glob_1.sync(options.origin + "/**/*" + ext.origin, options.glob)
            .forEach(function (v) {
            var fileBaseName = path_1.basename(v, ext.origin), targetName = v.replace(options.target, options.origin)
                .replace(fileBaseName + ext.target, fileBaseName + ext.origin);
            entries[targetName] = options.publicModule ? [v].concat(options.publicModule) : [v];
        });
    };
    for (var _i = 0, _a = options.exts; _i < _a.length; _i++) {
        var ext = _a[_i];
        _loop_1(ext);
    }
    return entries;
};
module.exports = getEntries;
