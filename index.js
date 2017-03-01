"use strict";
var glob = require("glob");
var path = require("path");
module.exports = function (entry, options) {
    var _options = {
        ext: '.js'
    }, entryRoot = entry.split('/*')[0], entryPaths = glob.sync(entry, _options.glob), results = {};
    Object.assign(_options, options);
    entryPaths.forEach(function (entryPath) {
        var fileName = path.basename(entryPath), fileExt = path.extname(fileName);
        var resultFileName = fileName.replace(fileExt, _options.ext);
        var resultPath = entryPath.replace(entryRoot + '/', '')
            .replace(fileName, resultFileName);
        var entryPathArray = [entryPath];
        if (_options.publicModule) {
            entryPathArray = entryPathArray.concat(_options.publicModule);
        }
        if (options.dir) {
            resultPath = resultPath.split('/').slice(0, -1).join('/');
        }
        results[resultPath] = entryPathArray;
    });
    return results;
};
