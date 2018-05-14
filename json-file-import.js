/**
 * Loads a JSON file with the option of including other JSON files or
 * fragments of them.
 */
"use strict";

const _ = require('underscore');

/**
 * Cache of JSON files
 */
const jsonCache = new class {

  constructor() {
    this.cache = new Map();
  }

  get(jsonFile) {
    if (!this.cache.has(jsonFile)) {
      this.cache.set(jsonFile, require(jsonFile));
    }
    return this.cache.get(jsonFile);
  }
}();

// Directives used to imprt other JSON files
const importFileRE = /@import!(.+)/;
const importElemRE = /@import!(.+)#(.+)/;

/**
 * Loads a JSON file and returns it as an JavaScript object
 *
 * @param jsonFile {String} JSON file name to load
 */
module.exports.load = (jsonFile) => {

  const jsonMain = require(jsonFile);
  return _.mapObject(jsonMain, (v, k) => {
    return loadCollection(v, k);
  });
};

/**
 * Returns an object with key k and value given by:
 * - v itself (when v is a primitive type, or String without an import directive)
 * - the content of a another JSON file (when v is a String with import directive,
 * but no property specified)
 * - a property taken from another JSON file (when v is a String with import
 * directive and property specified)
 * - the result of applying this function to v (when v is an Array or an Object)
 *
 * @param v Value
 * @param k Key
 * @returns {Object}
 */
const loadCollection = (v, k) => {

  if (_.isNumber(v) || _.isBoolean(v)) {
    return v;
  }

  if (_.isString(v)) {
    if (importFileRE.test(v) && !importElemRE.test(v)) {
      return jsonCache.get(v.match(importFileRE)[1]);
    }

    if (importElemRE.test(v)) {
      var j = jsonCache.get(v.match(importElemRE)[1]);
      var s = v.match(importElemRE)[2];
      return v.match(importElemRE)[2]
        .split('.').reduce((o, i) => o[i], jsonCache.get(v.match(importElemRE)[1]))
    }

    return v;
  }

  if (_.isArray(v)) {
    return _.map(v, loadCollection);
  }

  if (_.isObject(v)) {
    return _.mapObject(v, loadCollection);
  }
};

