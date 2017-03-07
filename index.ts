import * as glob from 'glob';
import * as path from 'path';

interface IOptions {
    ext?: string;
    glob?: glob.IOptions;
    publicModule?: string | string[];
    dir?: boolean;
}

interface IResults {
    [key: string]: string[];
}

export = function (entry: string, options?: IOptions) {
    const _options: IOptions = {
        ext: '.js',
        dir: false
    },
        entryRoot = entry.split('/*')[0],
        entryPaths = glob.sync(entry, _options.glob),
        results: IResults = {};

    Object.assign(_options, options);

    entryPaths.forEach(entryPath => {
        const fileName = path.basename(entryPath),
            fileExt = path.extname(fileName);


        const resultFileName = fileName.replace(fileExt, _options.ext);

        let resultPath = entryPath.replace(entryRoot + '/', '')
            .replace(fileName, resultFileName);


        let entryPathArray = [entryPath];

        if (_options.publicModule) {
            const p = Array.isArray(_options.publicModule) ? _options.publicModule : [_options.publicModule];
            entryPathArray = p.concat(entryPathArray);
        }

        if (options.dir) {
            resultPath = resultPath.split('/').slice(0, -1).join('/');
        }

        results[resultPath] = entryPathArray;
    });

    return results;
};
