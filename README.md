# json-file-import

A simple way to import JSON files (or fragment of them) into a JSON, much like the @import directive in CSS..

## Installation

* Add the module to the dependencies listed in `package.json` (change the version as appropriate). 
` "json-file-import": "git+https://github.com/lmoran/json-file-import.git#vX.Y.Z"`
* Install the dependencies as usual with `npm install`.

## Usage

Load the package on your node.js  program with: `const jsonFileImport = require('json-file-import');`

Now you are ready to use it.

There is only one function in the package (`load`), which has one argument (the filename):
`const config= jsonFileImport.load('./test/test-import.json'));`

The loaded file can be a plain-vanilla one (without the `@import` token), or with this token, allowing the inclusion of other JSON files into the main one.
See the JSON files under the `test` directory for examples.

To import a JSON into the another one, you have to prefix the file name with a `@import!` token, as in:
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

## Installation for development

(Substitute `X.Y.Z` with the version of choice.)
```
  git clone git@github.com:lmoran/json-file-import.git#vX.Y.Z
  cd json/file-import
  npm install
```

## Test

```npm run```


