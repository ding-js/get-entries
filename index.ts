import * as glob from 'glob';
import * as path from 'path';

interface IOptions {
    ext?: string;
    glob?: glob.IOptions;
    publicModule?: string | string[];
}

interface IResults {
    [key: string]: string[];
}

export = function (entry: string, outputRoot: string, options?: IOptions) {
    const _options: IOptions = {
        ext: '.js'
    },
        entryRoot = entry.split('/*')[0] + (outputRoot.charAt(outputRoot.length - 1) === '/' ? '/' : ''),
        entryPaths = glob.sync(entry),
        results: IResults = {};

    Object.assign(_options, options);

    entryPaths.forEach(entryPath => {
        const fileName = path.basename(entryPath),
            fileExt = path.extname(fileName);

        const resultFileName = fileName.replace(fileExt, _options.ext),
            resultPath = entryPath.replace(entryRoot, outputRoot)
                .replace(fileName, resultFileName);

        let resultPathArray = [resultPath];

        if (_options.publicModule) {
            resultPathArray = resultPathArray.concat(_options.publicModule);
        }

        results[resultPath] = [entryPath];
    });

    return results;
};
