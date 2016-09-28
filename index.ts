import { sync } from "glob";
import { resolve, join, relative, basename, extname, dirname } from "path";

interface ext {
    origin: string;
    target: string;
}

interface options {
    origin: string;
    target: string;
    ext: ext[];
    glob: any;
}

const getEntries = (options: options) => {
    const entries = {};
    for (let ext of options.ext) {
        sync(join(options.origin, `**/*${ext.origin}`), options.glob)
            .forEach(v => {
                const filePath = resolve(v),
                    diffPath = relative(options.origin, filePath),
                    originBasename = basename(filePath, ext.origin),
                    currentDirname = dirname(diffPath),
                    fileName = originBasename + ext.target,
                    pathName = resolve(options.target, currentDirname, fileName);
                entries[pathName] = filePath;
            });
    }
    return entries;
};


module.exports = getEntries;