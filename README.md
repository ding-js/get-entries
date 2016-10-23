# Get-entries
Get entries for application with multiple page


## Usage
```
npm install get-entries --save-dev
```

My project
```
┌── src/
│   ├── folder/
│   │   └── d.ts
│   ├── a.ts
│   ├── b.less
│   └── c.js
├── dist/
└── webpack.config.json
```


```javascript
//webpack.config.js
const webpack=require("webpack");
const getEntries=require("get-entries");
const entries=getEntries({
    origin:"./src/",
    target:"./dist/",
    exts:[
        {origin:".ts",target:".js"},
        {origin:".js",target:".js"},
        {origin:".less",target:".css"},
    ],
    publicModule:[
        "jquery"
    ]
});
//If use publicModule,all the target will include them,you can use CommonsChunkPlugin with webpack.
//That will return
// [
//     "./dist/a.js":[
//         "./src/a.ts",
//         "jquery
//     ],
//     "./dist/b.less":[
//         "./src/b.css",
//         "jquery
//     ],
//     "./dist/c.js":[
//         "./src/c.js",
//         "jquery
//     ],
//     "./dist/folder/d.js":[
//         "./src/folder/d.ts",
//         "jquery
//     ]
// ]

module.exports={
    entries:entries,
    output:{
        name:"[name]"
    }
    //...
}
```

Now my project
```
┌── src/
│   ├── folder/
│   │   └── d.ts
│   ├── a.ts
│   ├── b.less
│   └── c.js
├── dist/
│   ├── folder/
│   │   └── d.js
│   ├── a.js
│   ├── b.css
│   └── c.js
└── webpack.config.json
```

## getentries([options])
* `options`: `{Object}`


### options
* `origin`: `string`
* `target`: `string`
* `exts`: `ext[]`
* `publicModule?`: `string[]`
* `glob?`: `[glob options](https://github.com/isaacs/node-glob)`


### ext 
* `origin`: `string`
* `target`: `string`


