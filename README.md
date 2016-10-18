# Get-entries
Get entries for multiple pages;


## Usage

getEntries(options)

Project
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
    origin:"src/",
    target:"dist/",
    exts:[
        {origin:".ts",target:".js"},
        {origin:".js",target:".js"},
        {origin:".less",target:".css"},
    ]
});

module.exports={
    entries=entries
    //...
}
```

That will return
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

## options
* origin: string;
* target: string;
* exts: ext[];
* publicModule?: string[];
* glob?: [glob options](https://github.com/isaacs/node-glob);


#### ext 
* origin: string;
* target: string;


