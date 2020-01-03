(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Cic"] = factory();
	else
		root["Cic"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "tjUo");
/******/ })
/************************************************************************/
/******/ ({

/***/ "0sLt":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("Ejun");
var enumBugKeys = __webpack_require__("li+o");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "27hh":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2Irq":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("JD54");
var isArray = __webpack_require__("MSP0");
var wellKnownSymbol = __webpack_require__("aQwD");

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ "39ce":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ "4PXY":
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "4tLJ":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__("xOqd");

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "A71X":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("U1xW");
var toLength = __webpack_require__("rzr1");
var toAbsoluteIndex = __webpack_require__("Bt5z");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "Bt5z":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("YDew");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "CQSR":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("j0fE");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "Dm9E":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("x0Cr");
var getOwnPropertyDescriptor = __webpack_require__("kQe3").f;
var createNonEnumerableProperty = __webpack_require__("Gnjn");
var redefine = __webpack_require__("n3KG");
var setGlobal = __webpack_require__("QG+J");
var copyConstructorProperties = __webpack_require__("tdk/");
var isForced = __webpack_require__("h4kc");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "Ejun":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("oWMI");
var toIndexedObject = __webpack_require__("U1xW");
var indexOf = __webpack_require__("A71X").indexOf;
var hiddenKeys = __webpack_require__("WCtK");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "Gnjn":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("sEmX");
var definePropertyModule = __webpack_require__("SQpw");
var createPropertyDescriptor = __webpack_require__("X4oS");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "GzSk":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("n3KG");

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = DatePrototype[TO_STRING];
var getTime = DatePrototype.getTime;

// `Date.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tostring
if (new Date(NaN) + '' != INVALID_DATE) {
  redefine(DatePrototype, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
  });
}


/***/ }),

/***/ "JD54":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "Jg8x":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("jhOc");
var classof = __webpack_require__("27hh");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "KYMw":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("JD54");

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "MSP0":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("27hh");

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ "MbKD":
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__("WCMJ");
var IndexedObject = __webpack_require__("Jg8x");
var toObject = __webpack_require__("ckO5");
var toLength = __webpack_require__("rzr1");
var arraySpeciesCreate = __webpack_require__("2Irq");

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};


/***/ }),

/***/ "NQ+N":
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "NpPP":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("sEmX");
var fails = __webpack_require__("jhOc");
var createElement = __webpack_require__("fXPl");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "Nvt/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__("MbKD").forEach;
var sloppyArrayMethod = __webpack_require__("rQpp");

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = sloppyArrayMethod('forEach') ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;


/***/ }),

/***/ "QG+J":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("x0Cr");
var createNonEnumerableProperty = __webpack_require__("Gnjn");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "R6mi":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("x0Cr");

module.exports = global;


/***/ }),

/***/ "S8th":
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__("jf3w");
var store = __webpack_require__("WA4Y");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "SGGC":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("Dm9E");
var $filter = __webpack_require__("MbKD").filter;
var fails = __webpack_require__("jhOc");
var arrayMethodHasSpeciesSupport = __webpack_require__("nXJ7");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
// Edge 14- issue
var USES_TO_LENGTH = HAS_SPECIES_SUPPORT && !fails(function () {
  [].filter.call({ length: -1, 0: 1 }, function (it) { throw it; });
});

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "SQpw":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("sEmX");
var IE8_DOM_DEFINE = __webpack_require__("NpPP");
var anObject = __webpack_require__("kc9B");
var toPrimitive = __webpack_require__("KYMw");

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "U1xW":
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__("Jg8x");
var requireObjectCoercible = __webpack_require__("NQ+N");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "WA4Y":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("x0Cr");
var setGlobal = __webpack_require__("QG+J");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "WCMJ":
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__("slpu");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "WCtK":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "X4oS":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "YDew":
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "aQwD":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("x0Cr");
var shared = __webpack_require__("S8th");
var has = __webpack_require__("oWMI");
var uid = __webpack_require__("4PXY");
var NATIVE_SYMBOL = __webpack_require__("xOqd");
var USE_SYMBOL_AS_UID = __webpack_require__("4tLJ");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "aqbJ":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("WA4Y");

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "ckO5":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("NQ+N");

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "eHOh":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("j0fE");
var getOwnPropertyNamesModule = __webpack_require__("0sLt");
var getOwnPropertySymbolsModule = __webpack_require__("gFni");
var anObject = __webpack_require__("kc9B");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "fXPl":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("x0Cr");
var isObject = __webpack_require__("JD54");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "gFni":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "h4kc":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("jhOc");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "j0fE":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("R6mi");
var global = __webpack_require__("x0Cr");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "jf3w":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "jhOc":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "jhQz":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("x0Cr");
var inspectSource = __webpack_require__("aqbJ");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "kQe3":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("sEmX");
var propertyIsEnumerableModule = __webpack_require__("39ce");
var createPropertyDescriptor = __webpack_require__("X4oS");
var toIndexedObject = __webpack_require__("U1xW");
var toPrimitive = __webpack_require__("KYMw");
var has = __webpack_require__("oWMI");
var IE8_DOM_DEFINE = __webpack_require__("NpPP");

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "kc9B":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("JD54");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "li+o":
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "lzI5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("Dm9E");
var forEach = __webpack_require__("Nvt/");

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),

/***/ "n3KG":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("x0Cr");
var createNonEnumerableProperty = __webpack_require__("Gnjn");
var has = __webpack_require__("oWMI");
var setGlobal = __webpack_require__("QG+J");
var inspectSource = __webpack_require__("aqbJ");
var InternalStateModule = __webpack_require__("oohu");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "nWM9":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("x0Cr");
var userAgent = __webpack_require__("CQSR");

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),

/***/ "nXJ7":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("jhOc");
var wellKnownSymbol = __webpack_require__("aQwD");
var V8_VERSION = __webpack_require__("nWM9");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ "oWMI":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "oohu":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__("jhQz");
var global = __webpack_require__("x0Cr");
var isObject = __webpack_require__("JD54");
var createNonEnumerableProperty = __webpack_require__("Gnjn");
var objectHas = __webpack_require__("oWMI");
var sharedKey = __webpack_require__("x83m");
var hiddenKeys = __webpack_require__("WCtK");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "rQpp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("jhOc");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !method || !fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "rzr1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("YDew");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "sEmX":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("jhOc");

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "slpu":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "tc/l":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("x0Cr");
var DOMIterables = __webpack_require__("xSDe");
var forEach = __webpack_require__("Nvt/");
var createNonEnumerableProperty = __webpack_require__("Gnjn");

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}


/***/ }),

/***/ "tdk/":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("oWMI");
var ownKeys = __webpack_require__("eHOh");
var getOwnPropertyDescriptorModule = __webpack_require__("kQe3");
var definePropertyModule = __webpack_require__("SQpw");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "tjUo":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Connection = __webpack_require__("tuwQ");

module.exports = {
  createConnection: function createConnection() {
    return new Connection();
  }
};

/***/ }),

/***/ "tuwQ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__("SGGC");

__webpack_require__("lzI5");

__webpack_require__("GzSk");

__webpack_require__("tc/l");

var log = function log(msg) {
  console && console.log && console.log('< ' + msg);
};

function addMsgListener(msgType, callback) {
  if ('addEventListener' in document) {
    window.addEventListener(msgType, callback, false);
  } else if ('attachEvent' in document) {
    window.attachEvent("on".concat(msgType), callback);
  }
}

function removeMsgListener(msgType, callback) {
  if ('addEventListener' in document) {
    window.removeEventListener(msgType, callback, false);
  } else if ('attachEvent' in document) {
    window.dettachEvent("on".concat(msgType), callback);
  }
}

function Connection(source) {
  this.connected = false;
  this.destroyed = false;
  this._disconnectListeners = [];
  this._connectListeners = [];
  this._messageListeners = [];
  this._connecting = false;
  this._timeoutId = null;
  this._cicId = null;
  this._source = source || null;
  this._origin = '*';
  this._timeoutId = null;
  this.__onMessage = this._onMessage.bind(this);
  this.__onBeforeUnload = this._onBeforeUnload.bind(this);
  addMsgListener('message', this.__onMessage);
  addMsgListener('beforeunload', this.__onBeforeUnload);
}

Connection.prototype._onMessage = function (evt) {
  var _this = this;

  if (!evt.data || !evt.data.cicId) {
    return;
  }

  var origin = evt.origin,
      source = evt.source,
      _evt$data = evt.data,
      cicId = _evt$data.cicId,
      msgType = _evt$data.msgType,
      data = _evt$data.data;

  if (msgType == 'ping') {
    if (this._cicId || this._connecting || this.connected) {
      return;
    }

    this._cicId = cicId;
    this._connecting = true;
    this._source = source;
    this._origin = origin;
    source.postMessage({
      cicId: cicId,
      msgType: 'pong'
    }, '*');
  } else if (msgType == 'pong' && this._connecting && !this.connected && this._cicId == cicId) {
    clearTimeout(this._timeoutId);
    this._source = source;
    this._origin = origin;
    this.connected = true;
    this._connecting = false;
    source.postMessage({
      cicId: cicId,
      msgType: 'pong_confirm'
    }, '*');
    setTimeout(function () {
      _this._connectListeners.forEach(function (fn) {
        fn();
      });
    }, 0);
  } else if (msgType == 'pong_confirm' && this._connecting && cicId == this._cicId) {
    this._connecting = false;
    this.connected = true;
    setTimeout(function () {
      _this._connectListeners.forEach(function (fn) {
        fn();
      });
    }, 0);
  } else if (msgType == 'disconnect' && cicId == this._cicId) {
    this.connected = false;
    this._connecting = false;

    this._disconnectListeners.forEach(function (fn) {
      fn();
    });
  } else if (msgType == 'message' && this.connected && cicId == this._cicId) {
    this._messageListeners.forEach(function (fn) {
      fn(data);
    });
  }
};

Connection.prototype.onConnect = function (fn) {
  if (this.destroyed) {
    throw new Error('当前Connection已销毁');
  }

  this._connectListeners.push(fn);

  if (this.connected) {
    fn(this);
  }
};

Connection.prototype.offConnect = function (fn) {
  this._connectListeners = this._connectListeners.filter(function (f) {
    return f != fn;
  });
};

Connection.prototype.onDisconnect = function (fn) {
  if (this.destroyed) {
    throw new Error('当前Connection已销毁');
  }

  this._disconnectListeners.push(fn);
};

Connection.prototype.offDisconnect = function (fn) {
  this._disconnectListeners = this._disconnectListeners.filter(function (f) {
    return f != fn;
  });
};

Connection.prototype.onMessage = function (fn) {
  if (this.destroyed) {
    throw new Error('当前Connection已销毁');
  }

  this._messageListeners.push(fn);
};

Connection.prototype.offMessage = function (fn) {
  this._messageListeners = this._messageListeners.filter(function (f) {
    return f != fn;
  });
};

Connection.prototype._onBeforeUnload = function () {
  this.disconnect();
};

Connection.prototype.disconnect = function () {
  clearTimeout(this._timeoutId);
  this.connected = false;
  this._connecting = false;
  this._source && this._source.postMessage({
    cicId: this._cicId,
    msgType: 'disconnect'
  }, '*');
};

Connection.prototype.destroy = function () {
  this.disconnect();
  this._disconnectListeners.length = 0;
  this._connectListeners.length = 0;
  this._messageListeners.length = 0;
  this.destroyed = true;
  this._cicId = null;
  this._source = null;
  this._origin = null;
  this._timeoutId = null;
  removeMsgListener('message', this.__onMessage);
  removeMsgListener('beforeunload', this.__onBeforeUnload);
};

Connection.prototype.connect = function (domWindow) {
  var _this2 = this;

  if (!domWindow) {
    throw new Error('connect方法需要传入参数domWindow');
  }

  if (this.connected) {
    throw new Error('当前Connection对象已建立连接');
  }

  if (domWindow.postMessage) {
    this._source = domWindow;
  } else if (domWindow.contentWindow.postMessage) {
    this._source = domWindow.contentWindow;
  }

  if (this._source) {
    this._cicId = 'cic_' + new Date().getTime();
    this._connecting = true;

    this._source.postMessage({
      cicId: this._cicId,
      msgType: 'ping'
    }, '*');
  } else {
    throw new Error('参数对象 domWindow 不可用，无法发送消息到该窗口对象。postMessage方法不存在');
  }

  this._timeoutId = setTimeout(function () {
    log('正在尝试建立连接');
    _this2._connecting = false;

    _this2.connect(domWindow);
  }, 1000);
};

Connection.prototype.sendMsg = function (data) {
  if (!this.connected) {
    throw new Error('连接尚未建立，请添加 onConnect 回调，确定建立连接后才可发送消息');
  }

  this._source.postMessage({
    cicId: this._cicId,
    msgType: 'message',
    data: data
  }, '*');
};

module.exports = Connection;

/***/ }),

/***/ "x0Cr":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj")))

/***/ }),

/***/ "x83m":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("S8th");
var uid = __webpack_require__("4PXY");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "xOqd":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("jhOc");

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ "xSDe":
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "yLpj":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

/******/ });
});