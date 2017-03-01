## Usage
```
npm i -D get-entries
```

My project
```
┌── src/
│   ├── folder/
│   │   └── c.ts
│   ├── a.ts
│   └── b.ts
├── dist/
└── webpack.config.json
```


```javascript
//webpack.config.js
const webpack=require('webpack');
const getEntries=require('get-entries');

const entries=getEntries('./src/**/*.ts','./dist',{
    publicModule:[
        'jquery'
    ]
});

//If 'publicModule' was defined,all the files will include the 'publicModule',you can use CommonsChunkPlugin with webpack.
//That will return
// [
//     './dist/a.js':[
//         './src/a.ts',
//         'jquery
//     ],
//     './dist/b.js':[
//         './src/b.js',
//         'jquery
//     ],
//     './dist/folder/c.js':[
//         './src/folder/c.ts',
//         'jquery
//     ]
// ]

module.exports={
    entries:entries,
    output:{
        name:'[name]'   // name must be '[name]'
    }
    //...
}
```

## getentries(glob,outputDir,[options])
* `glob` `{String}`  Files to be matched
* `outputDir` `{String}`
* `options` `{Object}`
    * `ext` `String` ext of output files 
    * `publicModule?` `String[]`
    * `glob` `{Object}` [glob options](https://github.com/isaacs/node-glob)

