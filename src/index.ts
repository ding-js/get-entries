import * as path from 'path';
import * as glob from 'glob';

export interface Option {
  glob?: glob.IOptions;
  commonModules?: string | string[];
  ext?: string;
  useDir?: boolean;
}

export interface Result {
  [key: string]: string[];
}

module.exports = (pattern: string, baseDir?: string, option?: Option) => {
  const defaultOption: Option = {
    glob: {},
    commonModules: [],
    useDir: false
  };

  const op = {
    ...defaultOption,
    ...option
  };

  const result: Result = {};

  try {
    glob.sync(pattern, op.glob).forEach((file) => {
      const fileName = path.basename(file);

      const fileExt = path.extname(fileName);

      const pathFromBase = baseDir ? path.relative(baseDir, file) : file.slice(2); // remove ./

      const modules = op.commonModules ? [].concat(op.commonModules, file) : [file];

      let moduleName = op.useDir ? path.join(pathFromBase, '..') : pathFromBase.slice(0, -fileExt.length);

      moduleName = moduleName.replace(/\\/g, '/');

      result[moduleName] = modules;
    });
  } catch (e) {
    console.error(e);
  }

  return result;
};
