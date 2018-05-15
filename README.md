# json-file-import

A simple way to import JSON files (or fragment of them) into a JSON, much like the @import directive in CSS..


## Installation

(Substitute `X.Y.Z` with the version of choice.)
```
git clone git@github.com:lmoran/json-file-import.git#vX.Y.Z
cd json/file-import
npm install
```

## Test

```npm run```


## Use

```
const jsonFileInclude = require('../json-file-import.js');
const json= jsonFileInclude.load('./test/test-import.json')
```

To import a JSON into another, you have to prefix the file name with a `@import!` token, as in:
```
  {
    "n1": 1,
    "n2": 2,
    "n3": "@import!./test/secrets.json",
  }
```

If you want to insert only a property of the imported JSON, postfix a `#` token followed by a property name to the file name, as in:
```
   {
      "os-username": "@import!./test/secrets.json#os-username"
    }

```

Properties can be specified using the dot-notation, as in:
```
{
  "c": "@import!./test/secrets.json#object.subobject.property"
}
```