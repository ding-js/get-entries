import { sync } from "glob";
import { resolve, join, relative, basename, extname, dirname } from "path";

interface ext {
    origin: string;
    target: string;
}

interface options {
    origin: string;
    target: string;
    exts: ext[];
    publicModule?: string[];
    glob?: any;
}

const getEntries = (options: options) => {
    const entries = {};
    for (let ext of options.exts) {
        sync(`${options.origin}/**/*${ext.origin}`, options.glob)
            .forEach(v => {
                const fileBaseName = basename(v, ext.origin),
                    targetName = v.replace(options.origin, options.target)
                        .replace(fileBaseName + ext.origin, fileBaseName + ext.target);
                entries[targetName] = options.publicModule ? [v].concat(options.publicModule) : [v];
            });
    }
    return entries;
};

export = getEntries;