/// <reference types="glob" />
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
