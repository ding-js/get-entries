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
        sync(join(__dirname, options.origin, `**/*${ext.origin}`), options.glob)
            .forEach(v => {
                const filePath = resolve(v),
                    diffPath = relative(options.origin, filePath),
                    originBasename = basename(filePath, ext.origin),
                    currentDirname = dirname(diffPath),
                    pathName = resolve(options.target, currentDirname, originBasename + ext.target);
                entries[pathName] = filePath;
            });
    }
    console.log(entries);
    return entries;
};


/*getEntries({
    origin: "./test/src",
    target: "./test/dist",
    ext: [{
        origin: ".ts",
        target: ".js"
    },
    {
        origin: ".js",
        target: ".js"
    },
    {
        origin: ".css",
        target: ".css"
    }],
    glob: {}
});*/