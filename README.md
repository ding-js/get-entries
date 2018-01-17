## Usage

```
npm i -D get-entries
```

```
┌── src/
│   ├── folder/
│   │   └── c.js
│   ├── a.js
│   └── b.js
├── dist/
└── webpack.config.json
```

```javascript
//webpack.config.js
const getEntries = require('get-entries');

const entries = getEntries('./src/**/*.js', './src/', {
  commonModules: ['jquery']
});

//If 'commonModules' was defined,all the files will include the 'commonModules',you can use CommonsChunkPlugin with webpack.
//That will return
// [
//     'a':[
//         'jquery,
//         './src/a.js'
//     ],
//     'b':[
//         'jquery,
//         './src/b.js'
//     ],
//     'folder/c':[
//         'jquery,
//         './src/folder/c.js'
//     ]
// ]

module.exports = {
  entries: entries,
  output: {
    name: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
  //...
};
```

## getEntries(pattern, baseDir:string, [options])

* pattern {string} glob path string
* baseDir {string} path you want to remove in entries' key
* options
  * glob? {Object}
  * commonModules? {Array<string> | string}
  * useDir? {boolean}
