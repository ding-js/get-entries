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

export = function (entry: string, outputRoot: string, options?: IOptions) {
    const _options: IOptions = {
        ext: '.js'
    },
        entryRoot = entry.split('/*')[0] + (outputRoot.charAt(outputRoot.length - 1) === '/' ? '/' : ''),
        entryPaths = glob.sync(entry, _options.glob),
        results: IResults = {};

    Object.assign(_options, options);

    entryPaths.forEach(entryPath => {
        const fileName = path.basename(entryPath),
            fileExt = path.extname(fileName);

        const resultFileName = fileName.replace(fileExt, _options.ext);

        let resultPath = entryPath.replace(entryRoot, outputRoot)
            .replace(fileName, resultFileName);

        let entryPathArray = [entryPath];

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
