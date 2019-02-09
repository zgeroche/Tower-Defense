// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/base64-js/index.js":[function(require,module,exports) {
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/ieee754/index.js":[function(require,module,exports) {
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/isarray/index.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/buffer/index.js":[function(require,module,exports) {

var global = arguments[3];
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

},{"base64-js":"../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/base64-js/index.js","ieee754":"../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/ieee754/index.js","isarray":"../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/isarray/index.js","buffer":"../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/buffer/index.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"js/bundle.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
var process = require("process");
var define;
var global = arguments[3];
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }

        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function (r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }

      return n[i].exports;
    }

    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
      o(t[i]);
    }

    return o;
  }

  return r;
})()({
  1: [function (require, module, exports) {
    'use strict';

    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
    var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    } // Support decoding URL-safe base64 strings, as Node.js does.
    // See: https://en.wikipedia.org/wiki/Base64#URL_applications


    revLookup['-'.charCodeAt(0)] = 62;
    revLookup['_'.charCodeAt(0)] = 63;

    function getLens(b64) {
      var len = b64.length;

      if (len % 4 > 0) {
        throw new Error('Invalid string. Length must be a multiple of 4');
      } // Trim off extra bytes after placeholder bytes are found
      // See: https://github.com/beatgammit/base64-js/issues/42


      var validLen = b64.indexOf('=');
      if (validLen === -1) validLen = len;
      var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    } // base64 is 4/3 + up to two characters of the original data


    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }

    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }

    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0; // if there are placeholders, only get up to the last complete 4 chars

      var len = placeHoldersLen > 0 ? validLen - 4 : validLen;

      for (var i = 0; i < len; i += 4) {
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = tmp >> 16 & 0xFF;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
      }

      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[curByte++] = tmp & 0xFF;
      }

      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
      }

      return arr;
    }

    function tripletToBase64(num) {
      return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
    }

    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];

      for (var i = start; i < end; i += 3) {
        tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
        output.push(tripletToBase64(tmp));
      }

      return output.join('');
    }

    function fromByteArray(uint8) {
      var tmp;
      var len = uint8.length;
      var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes

      var parts = [];
      var maxChunkLength = 16383; // must be multiple of 3
      // go through the array every three bytes, we'll deal with trailing stuff later

      for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
        parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
      } // pad the end with zeros, but make sure to not forget the extra bytes


      if (extraBytes === 1) {
        tmp = uint8[len - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
      } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
      }

      return parts.join('');
    }
  }, {}],
  2: [function (require, module, exports) {
    /*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */

    /* eslint-disable no-proto */
    'use strict';

    var base64 = require('base64-js');

    var ieee754 = require('ieee754');

    exports.Buffer = Buffer;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 0x7fffffff;
    exports.kMaxLength = K_MAX_LENGTH;
    /**
     * If `Buffer.TYPED_ARRAY_SUPPORT`:
     *   === true    Use Uint8Array implementation (fastest)
     *   === false   Print warning and recommend using `buffer` v4.x which has an Object
     *               implementation (most compatible, even IE6)
     *
     * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
     * Opera 11.6+, iOS 4.2+.
     *
     * We report that the browser does not support typed arrays if the are not subclassable
     * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
     * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
     * for __proto__ and has a buggy typed array implementation.
     */

    Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();

    if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error('This browser lacks typed array (Uint8Array) support which is required by ' + '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.');
    }

    function typedArraySupport() {
      // Can typed array instances can be augmented?
      try {
        var arr = new Uint8Array(1);
        arr.__proto__ = {
          __proto__: Uint8Array.prototype,
          foo: function foo() {
            return 42;
          }
        };
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }

    Object.defineProperty(Buffer.prototype, 'parent', {
      enumerable: true,
      get: function get() {
        if (!Buffer.isBuffer(this)) return undefined;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer.prototype, 'offset', {
      enumerable: true,
      get: function get() {
        if (!Buffer.isBuffer(this)) return undefined;
        return this.byteOffset;
      }
    });

    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      } // Return an augmented `Uint8Array` instance


      var buf = new Uint8Array(length);
      buf.__proto__ = Buffer.prototype;
      return buf;
    }
    /**
     * The Buffer constructor returns instances of `Uint8Array` that have their
     * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
     * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
     * and the `Uint8Array` methods. Square bracket notation works as expected -- it
     * returns a single octet.
     *
     * The `Uint8Array` prototype remains unmodified.
     */


    function Buffer(arg, encodingOrOffset, length) {
      // Common case.
      if (typeof arg === 'number') {
        if (typeof encodingOrOffset === 'string') {
          throw new TypeError('The "string" argument must be of type string. Received type number');
        }

        return allocUnsafe(arg);
      }

      return from(arg, encodingOrOffset, length);
    } // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97


    if (typeof Symbol !== 'undefined' && Symbol.species != null && Buffer[Symbol.species] === Buffer) {
      Object.defineProperty(Buffer, Symbol.species, {
        value: null,
        configurable: true,
        enumerable: false,
        writable: false
      });
    }

    Buffer.poolSize = 8192; // not used by this implementation

    function from(value, encodingOrOffset, length) {
      if (typeof value === 'string') {
        return fromString(value, encodingOrOffset);
      }

      if (ArrayBuffer.isView(value)) {
        return fromArrayLike(value);
      }

      if (value == null) {
        throw TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' + 'or Array-like Object. Received type ' + _typeof2(value));
      }

      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }

      if (typeof value === 'number') {
        throw new TypeError('The "value" argument must not be of type number. Received type number');
      }

      var valueOf = value.valueOf && value.valueOf();

      if (valueOf != null && valueOf !== value) {
        return Buffer.from(valueOf, encodingOrOffset, length);
      }

      var b = fromObject(value);
      if (b) return b;

      if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === 'function') {
        return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length);
      }

      throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' + 'or Array-like Object. Received type ' + _typeof2(value));
    }
    /**
     * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
     * if value is a number.
     * Buffer.from(str[, encoding])
     * Buffer.from(array)
     * Buffer.from(buffer)
     * Buffer.from(arrayBuffer[, byteOffset[, length]])
     **/


    Buffer.from = function (value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    }; // Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
    // https://github.com/feross/buffer/pull/148


    Buffer.prototype.__proto__ = Uint8Array.prototype;
    Buffer.__proto__ = Uint8Array;

    function assertSize(size) {
      if (typeof size !== 'number') {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }

    function alloc(size, fill, encoding) {
      assertSize(size);

      if (size <= 0) {
        return createBuffer(size);
      }

      if (fill !== undefined) {
        // Only pay attention to encoding if it's a string. This
        // prevents accidentally sending in a number that would
        // be interpretted as a start offset.
        return typeof encoding === 'string' ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }

      return createBuffer(size);
    }
    /**
     * Creates a new filled Buffer instance.
     * alloc(size[, fill[, encoding]])
     **/


    Buffer.alloc = function (size, fill, encoding) {
      return alloc(size, fill, encoding);
    };

    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    /**
     * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
     * */


    Buffer.allocUnsafe = function (size) {
      return allocUnsafe(size);
    };
    /**
     * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
     */


    Buffer.allocUnsafeSlow = function (size) {
      return allocUnsafe(size);
    };

    function fromString(string, encoding) {
      if (typeof encoding !== 'string' || encoding === '') {
        encoding = 'utf8';
      }

      if (!Buffer.isEncoding(encoding)) {
        throw new TypeError('Unknown encoding: ' + encoding);
      }

      var length = byteLength(string, encoding) | 0;
      var buf = createBuffer(length);
      var actual = buf.write(string, encoding);

      if (actual !== length) {
        // Writing a hex string, for example, that contains invalid characters will
        // cause everything after the first invalid character to be ignored. (e.g.
        // 'abxxcd' will be treated as 'ab')
        buf = buf.slice(0, actual);
      }

      return buf;
    }

    function fromArrayLike(array) {
      var length = array.length < 0 ? 0 : checked(array.length) | 0;
      var buf = createBuffer(length);

      for (var i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }

      return buf;
    }

    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }

      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }

      var buf;

      if (byteOffset === undefined && length === undefined) {
        buf = new Uint8Array(array);
      } else if (length === undefined) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      } // Return an augmented `Uint8Array` instance


      buf.__proto__ = Buffer.prototype;
      return buf;
    }

    function fromObject(obj) {
      if (Buffer.isBuffer(obj)) {
        var len = checked(obj.length) | 0;
        var buf = createBuffer(len);

        if (buf.length === 0) {
          return buf;
        }

        obj.copy(buf, 0, 0, len);
        return buf;
      }

      if (obj.length !== undefined) {
        if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }

        return fromArrayLike(obj);
      }

      if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }

    function checked(length) {
      // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
      // length is NaN (which is otherwise coerced to zero.)
      if (length >= K_MAX_LENGTH) {
        throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes');
      }

      return length | 0;
    }

    function SlowBuffer(length) {
      if (+length != length) {
        // eslint-disable-line eqeqeq
        length = 0;
      }

      return Buffer.alloc(+length);
    }

    Buffer.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer.prototype; // so Buffer.isBuffer(Buffer.prototype) will be false
    };

    Buffer.compare = function compare(a, b) {
      if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);

      if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
      }

      if (a === b) return 0;
      var x = a.length;
      var y = b.length;

      for (var i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }

      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };

    Buffer.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'latin1':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return true;

        default:
          return false;
      }
    };

    Buffer.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }

      if (list.length === 0) {
        return Buffer.alloc(0);
      }

      var i;

      if (length === undefined) {
        length = 0;

        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }

      var buffer = Buffer.allocUnsafe(length);
      var pos = 0;

      for (i = 0; i < list.length; ++i) {
        var buf = list[i];

        if (isInstance(buf, Uint8Array)) {
          buf = Buffer.from(buf);
        }

        if (!Buffer.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }

        buf.copy(buffer, pos);
        pos += buf.length;
      }

      return buffer;
    };

    function byteLength(string, encoding) {
      if (Buffer.isBuffer(string)) {
        return string.length;
      }

      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }

      if (typeof string !== 'string') {
        throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' + 'Received type ' + _typeof2(string));
      }

      var len = string.length;
      var mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0) return 0; // Use a for loop to avoid recursion

      var loweredCase = false;

      for (;;) {
        switch (encoding) {
          case 'ascii':
          case 'latin1':
          case 'binary':
            return len;

          case 'utf8':
          case 'utf-8':
            return utf8ToBytes(string).length;

          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return len * 2;

          case 'hex':
            return len >>> 1;

          case 'base64':
            return base64ToBytes(string).length;

          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length; // assume utf8
            }

            encoding = ('' + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }

    Buffer.byteLength = byteLength;

    function slowToString(encoding, start, end) {
      var loweredCase = false; // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
      // property of a typed array.
      // This behaves neither like String nor Uint8Array in that we set start/end
      // to their upper/lower bounds if the value passed is out of range.
      // undefined is handled specially as per ECMA-262 6th Edition,
      // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.

      if (start === undefined || start < 0) {
        start = 0;
      } // Return early if start > this.length. Done here to prevent potential uint32
      // coercion fail below.


      if (start > this.length) {
        return '';
      }

      if (end === undefined || end > this.length) {
        end = this.length;
      }

      if (end <= 0) {
        return '';
      } // Force coersion to uint32. This will also coerce falsey/NaN values to 0.


      end >>>= 0;
      start >>>= 0;

      if (end <= start) {
        return '';
      }

      if (!encoding) encoding = 'utf8';

      while (true) {
        switch (encoding) {
          case 'hex':
            return hexSlice(this, start, end);

          case 'utf8':
          case 'utf-8':
            return utf8Slice(this, start, end);

          case 'ascii':
            return asciiSlice(this, start, end);

          case 'latin1':
          case 'binary':
            return latin1Slice(this, start, end);

          case 'base64':
            return base64Slice(this, start, end);

          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return utf16leSlice(this, start, end);

          default:
            if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
            encoding = (encoding + '').toLowerCase();
            loweredCase = true;
        }
      }
    } // This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
    // to detect a Buffer instance. It's not possible to use `instanceof Buffer`
    // reliably in a browserify context because there could be multiple different
    // copies of the 'buffer' package in use. This method works even for Buffer
    // instances that were created from another copy of the `buffer` package.
    // See: https://github.com/feross/buffer/issues/154


    Buffer.prototype._isBuffer = true;

    function swap(b, n, m) {
      var i = b[n];
      b[n] = b[m];
      b[m] = i;
    }

    Buffer.prototype.swap16 = function swap16() {
      var len = this.length;

      if (len % 2 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 16-bits');
      }

      for (var i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }

      return this;
    };

    Buffer.prototype.swap32 = function swap32() {
      var len = this.length;

      if (len % 4 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 32-bits');
      }

      for (var i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }

      return this;
    };

    Buffer.prototype.swap64 = function swap64() {
      var len = this.length;

      if (len % 8 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 64-bits');
      }

      for (var i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }

      return this;
    };

    Buffer.prototype.toString = function toString() {
      var length = this.length;
      if (length === 0) return '';
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };

    Buffer.prototype.toLocaleString = Buffer.prototype.toString;

    Buffer.prototype.equals = function equals(b) {
      if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
      if (this === b) return true;
      return Buffer.compare(this, b) === 0;
    };

    Buffer.prototype.inspect = function inspect() {
      var str = '';
      var max = exports.INSPECT_MAX_BYTES;
      str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim();
      if (this.length > max) str += ' ... ';
      return '<Buffer ' + str + '>';
    };

    Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer.from(target, target.offset, target.byteLength);
      }

      if (!Buffer.isBuffer(target)) {
        throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. ' + 'Received type ' + _typeof2(target));
      }

      if (start === undefined) {
        start = 0;
      }

      if (end === undefined) {
        end = target ? target.length : 0;
      }

      if (thisStart === undefined) {
        thisStart = 0;
      }

      if (thisEnd === undefined) {
        thisEnd = this.length;
      }

      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError('out of range index');
      }

      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }

      if (thisStart >= thisEnd) {
        return -1;
      }

      if (start >= end) {
        return 1;
      }

      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      var x = thisEnd - thisStart;
      var y = end - start;
      var len = Math.min(x, y);
      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);

      for (var i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }

      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    }; // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
    // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
    //
    // Arguments:
    // - buffer - a Buffer to search
    // - val - a string, Buffer, or number
    // - byteOffset - an index into `buffer`; will be clamped to an int32
    // - encoding - an optional encoding, relevant is val is a string
    // - dir - true for indexOf, false for lastIndexOf


    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      // Empty buffer means no match
      if (buffer.length === 0) return -1; // Normalize byteOffset

      if (typeof byteOffset === 'string') {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 0x7fffffff) {
        byteOffset = 0x7fffffff;
      } else if (byteOffset < -0x80000000) {
        byteOffset = -0x80000000;
      }

      byteOffset = +byteOffset; // Coerce to Number.

      if (numberIsNaN(byteOffset)) {
        // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
        byteOffset = dir ? 0 : buffer.length - 1;
      } // Normalize byteOffset: negative offsets start from the end of the buffer


      if (byteOffset < 0) byteOffset = buffer.length + byteOffset;

      if (byteOffset >= buffer.length) {
        if (dir) return -1;else byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;else return -1;
      } // Normalize val


      if (typeof val === 'string') {
        val = Buffer.from(val, encoding);
      } // Finally, search either indexOf (if dir is true) or lastIndexOf


      if (Buffer.isBuffer(val)) {
        // Special case: looking for empty string/buffer always fails
        if (val.length === 0) {
          return -1;
        }

        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === 'number') {
        val = val & 0xFF; // Search for a byte value [0-255]

        if (typeof Uint8Array.prototype.indexOf === 'function') {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }

        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }

      throw new TypeError('val must be string, number or Buffer');
    }

    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      var indexSize = 1;
      var arrLength = arr.length;
      var valLength = val.length;

      if (encoding !== undefined) {
        encoding = String(encoding).toLowerCase();

        if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }

          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }

      function read(buf, i) {
        if (indexSize === 1) {
          return buf[i];
        } else {
          return buf.readUInt16BE(i * indexSize);
        }
      }

      var i;

      if (dir) {
        var foundIndex = -1;

        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;

        for (i = byteOffset; i >= 0; i--) {
          var found = true;

          for (var j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }

          if (found) return i;
        }
      }

      return -1;
    }

    Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };

    Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };

    Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };

    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      var remaining = buf.length - offset;

      if (!length) {
        length = remaining;
      } else {
        length = Number(length);

        if (length > remaining) {
          length = remaining;
        }
      }

      var strLen = string.length;

      if (length > strLen / 2) {
        length = strLen / 2;
      }

      for (var i = 0; i < length; ++i) {
        var parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
      }

      return i;
    }

    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }

    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }

    function latin1Write(buf, string, offset, length) {
      return asciiWrite(buf, string, offset, length);
    }

    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }

    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }

    Buffer.prototype.write = function write(string, offset, length, encoding) {
      // Buffer#write(string)
      if (offset === undefined) {
        encoding = 'utf8';
        length = this.length;
        offset = 0; // Buffer#write(string, encoding)
      } else if (length === undefined && typeof offset === 'string') {
        encoding = offset;
        length = this.length;
        offset = 0; // Buffer#write(string, offset[, length][, encoding])
      } else if (isFinite(offset)) {
        offset = offset >>> 0;

        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === undefined) encoding = 'utf8';
        } else {
          encoding = length;
          length = undefined;
        }
      } else {
        throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
      }

      var remaining = this.length - offset;
      if (length === undefined || length > remaining) length = remaining;

      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError('Attempt to write outside buffer bounds');
      }

      if (!encoding) encoding = 'utf8';
      var loweredCase = false;

      for (;;) {
        switch (encoding) {
          case 'hex':
            return hexWrite(this, string, offset, length);

          case 'utf8':
          case 'utf-8':
            return utf8Write(this, string, offset, length);

          case 'ascii':
            return asciiWrite(this, string, offset, length);

          case 'latin1':
          case 'binary':
            return latin1Write(this, string, offset, length);

          case 'base64':
            // Warning: maxLength not taken into account in base64Write
            return base64Write(this, string, offset, length);

          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return ucs2Write(this, string, offset, length);

          default:
            if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
            encoding = ('' + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };

    Buffer.prototype.toJSON = function toJSON() {
      return {
        type: 'Buffer',
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };

    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }

    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      var res = [];
      var i = start;

      while (i < end) {
        var firstByte = buf[i];
        var codePoint = null;
        var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

        if (i + bytesPerSequence <= end) {
          var secondByte, thirdByte, fourthByte, tempCodePoint;

          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 0x80) {
                codePoint = firstByte;
              }

              break;

            case 2:
              secondByte = buf[i + 1];

              if ((secondByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;

                if (tempCodePoint > 0x7F) {
                  codePoint = tempCodePoint;
                }
              }

              break;

            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];

              if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;

                if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                  codePoint = tempCodePoint;
                }
              }

              break;

            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];

              if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;

                if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                  codePoint = tempCodePoint;
                }
              }

          }
        }

        if (codePoint === null) {
          // we did not generate a valid codePoint so insert a
          // replacement char (U+FFFD) and advance only 1 byte
          codePoint = 0xFFFD;
          bytesPerSequence = 1;
        } else if (codePoint > 0xFFFF) {
          // encode to utf16 (surrogate pair dance)
          codePoint -= 0x10000;
          res.push(codePoint >>> 10 & 0x3FF | 0xD800);
          codePoint = 0xDC00 | codePoint & 0x3FF;
        }

        res.push(codePoint);
        i += bytesPerSequence;
      }

      return decodeCodePointsArray(res);
    } // Based on http://stackoverflow.com/a/22747272/680742, the browser with
    // the lowest limit is Chrome, with 0x10000 args.
    // We go 1 magnitude less, for safety


    var MAX_ARGUMENTS_LENGTH = 0x1000;

    function decodeCodePointsArray(codePoints) {
      var len = codePoints.length;

      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
      } // Decode in chunks to avoid "call stack size exceeded".


      var res = '';
      var i = 0;

      while (i < len) {
        res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
      }

      return res;
    }

    function asciiSlice(buf, start, end) {
      var ret = '';
      end = Math.min(buf.length, end);

      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 0x7F);
      }

      return ret;
    }

    function latin1Slice(buf, start, end) {
      var ret = '';
      end = Math.min(buf.length, end);

      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }

      return ret;
    }

    function hexSlice(buf, start, end) {
      var len = buf.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      var out = '';

      for (var i = start; i < end; ++i) {
        out += toHex(buf[i]);
      }

      return out;
    }

    function utf16leSlice(buf, start, end) {
      var bytes = buf.slice(start, end);
      var res = '';

      for (var i = 0; i < bytes.length; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }

      return res;
    }

    Buffer.prototype.slice = function slice(start, end) {
      var len = this.length;
      start = ~~start;
      end = end === undefined ? len : ~~end;

      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }

      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }

      if (end < start) end = start;
      var newBuf = this.subarray(start, end); // Return an augmented `Uint8Array` instance

      newBuf.__proto__ = Buffer.prototype;
      return newBuf;
    };
    /*
     * Need to make sure that buffer isn't trying to write out of bounds.
     */


    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
      if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
    }

    Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
      offset = offset >>> 0;
      byteLength = byteLength >>> 0;
      if (!noAssert) checkOffset(offset, byteLength, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;

      while (++i < byteLength && (mul *= 0x100)) {
        val += this[offset + i] * mul;
      }

      return val;
    };

    Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
      offset = offset >>> 0;
      byteLength = byteLength >>> 0;

      if (!noAssert) {
        checkOffset(offset, byteLength, this.length);
      }

      var val = this[offset + --byteLength];
      var mul = 1;

      while (byteLength > 0 && (mul *= 0x100)) {
        val += this[offset + --byteLength] * mul;
      }

      return val;
    };

    Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };

    Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };

    Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };

    Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
    };

    Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };

    Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
      offset = offset >>> 0;
      byteLength = byteLength >>> 0;
      if (!noAssert) checkOffset(offset, byteLength, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;

      while (++i < byteLength && (mul *= 0x100)) {
        val += this[offset + i] * mul;
      }

      mul *= 0x80;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength);
      return val;
    };

    Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
      offset = offset >>> 0;
      byteLength = byteLength >>> 0;
      if (!noAssert) checkOffset(offset, byteLength, this.length);
      var i = byteLength;
      var mul = 1;
      var val = this[offset + --i];

      while (i > 0 && (mul *= 0x100)) {
        val += this[offset + --i] * mul;
      }

      mul *= 0x80;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength);
      return val;
    };

    Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 0x80)) return this[offset];
      return (0xff - this[offset] + 1) * -1;
    };

    Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset] | this[offset + 1] << 8;
      return val & 0x8000 ? val | 0xFFFF0000 : val;
    };

    Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | this[offset] << 8;
      return val & 0x8000 ? val | 0xFFFF0000 : val;
    };

    Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };

    Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };

    Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };

    Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };

    Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };

    Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };

    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length) throw new RangeError('Index out of range');
    }

    Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength = byteLength >>> 0;

      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
      }

      var mul = 1;
      var i = 0;
      this[offset] = value & 0xFF;

      while (++i < byteLength && (mul *= 0x100)) {
        this[offset + i] = value / mul & 0xFF;
      }

      return offset + byteLength;
    };

    Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength = byteLength >>> 0;

      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
      }

      var i = byteLength - 1;
      var mul = 1;
      this[offset + i] = value & 0xFF;

      while (--i >= 0 && (mul *= 0x100)) {
        this[offset + i] = value / mul & 0xFF;
      }

      return offset + byteLength;
    };

    Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
      this[offset] = value & 0xff;
      return offset + 1;
    };

    Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
      this[offset] = value & 0xff;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };

    Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 0xff;
      return offset + 2;
    };

    Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 0xff;
      return offset + 4;
    };

    Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 0xff;
      return offset + 4;
    };

    Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
      value = +value;
      offset = offset >>> 0;

      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
      }

      var i = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value & 0xFF;

      while (++i < byteLength && (mul *= 0x100)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }

        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
      }

      return offset + byteLength;
    };

    Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
      value = +value;
      offset = offset >>> 0;

      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
      }

      var i = byteLength - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i] = value & 0xFF;

      while (--i >= 0 && (mul *= 0x100)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }

        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
      }

      return offset + byteLength;
    };

    Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
      if (value < 0) value = 0xff + value + 1;
      this[offset] = value & 0xff;
      return offset + 1;
    };

    Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
      this[offset] = value & 0xff;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };

    Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 0xff;
      return offset + 2;
    };

    Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
      this[offset] = value & 0xff;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };

    Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
      if (value < 0) value = 0xffffffff + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 0xff;
      return offset + 4;
    };

    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length) throw new RangeError('Index out of range');
      if (offset < 0) throw new RangeError('Index out of range');
    }

    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;

      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
      }

      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }

    Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };

    Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };

    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;

      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
      }

      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }

    Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };

    Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    }; // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)


    Buffer.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer');
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start; // Copy 0 bytes; we're done

      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0; // Fatal error conditions

      if (targetStart < 0) {
        throw new RangeError('targetStart out of bounds');
      }

      if (start < 0 || start >= this.length) throw new RangeError('Index out of range');
      if (end < 0) throw new RangeError('sourceEnd out of bounds'); // Are we oob?

      if (end > this.length) end = this.length;

      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }

      var len = end - start;

      if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
        // Use built-in when available, missing from IE11
        this.copyWithin(targetStart, start, end);
      } else if (this === target && start < targetStart && targetStart < end) {
        // descending copy from end
        for (var i = len - 1; i >= 0; --i) {
          target[i + targetStart] = this[i + start];
        }
      } else {
        Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
      }

      return len;
    }; // Usage:
    //    buffer.fill(number[, offset[, end]])
    //    buffer.fill(buffer[, offset[, end]])
    //    buffer.fill(string[, offset[, end]][, encoding])


    Buffer.prototype.fill = function fill(val, start, end, encoding) {
      // Handle string cases:
      if (typeof val === 'string') {
        if (typeof start === 'string') {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === 'string') {
          encoding = end;
          end = this.length;
        }

        if (encoding !== undefined && typeof encoding !== 'string') {
          throw new TypeError('encoding must be a string');
        }

        if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
          throw new TypeError('Unknown encoding: ' + encoding);
        }

        if (val.length === 1) {
          var code = val.charCodeAt(0);

          if (encoding === 'utf8' && code < 128 || encoding === 'latin1') {
            // Fast path: If `val` fits into a single byte, use that numeric value.
            val = code;
          }
        }
      } else if (typeof val === 'number') {
        val = val & 255;
      } // Invalid ranges are not set to a default, so can range check early.


      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError('Out of range index');
      }

      if (end <= start) {
        return this;
      }

      start = start >>> 0;
      end = end === undefined ? this.length : end >>> 0;
      if (!val) val = 0;
      var i;

      if (typeof val === 'number') {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        var bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
        var len = bytes.length;

        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }

        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }

      return this;
    }; // HELPER FUNCTIONS
    // ================


    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;

    function base64clean(str) {
      // Node takes equal signs as end of the Base64 encoding
      str = str.split('=')[0]; // Node strips out invalid characters like \n and \t from the string, base64-js does not

      str = str.trim().replace(INVALID_BASE64_RE, ''); // Node converts strings with length < 2 to ''

      if (str.length < 2) return ''; // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not

      while (str.length % 4 !== 0) {
        str = str + '=';
      }

      return str;
    }

    function toHex(n) {
      if (n < 16) return '0' + n.toString(16);
      return n.toString(16);
    }

    function utf8ToBytes(string, units) {
      units = units || Infinity;
      var codePoint;
      var length = string.length;
      var leadSurrogate = null;
      var bytes = [];

      for (var i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i); // is surrogate component

        if (codePoint > 0xD7FF && codePoint < 0xE000) {
          // last char was a lead
          if (!leadSurrogate) {
            // no lead yet
            if (codePoint > 0xDBFF) {
              // unexpected trail
              if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
              continue;
            } else if (i + 1 === length) {
              // unpaired lead
              if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
              continue;
            } // valid lead


            leadSurrogate = codePoint;
            continue;
          } // 2 leads in a row


          if (codePoint < 0xDC00) {
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
            leadSurrogate = codePoint;
            continue;
          } // valid surrogate pair


          codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
        } else if (leadSurrogate) {
          // valid bmp char, but last char was a lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        }

        leadSurrogate = null; // encode utf8

        if (codePoint < 0x80) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 0x800) {
          if ((units -= 2) < 0) break;
          bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x10000) {
          if ((units -= 3) < 0) break;
          bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x110000) {
          if ((units -= 4) < 0) break;
          bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else {
          throw new Error('Invalid code point');
        }
      }

      return bytes;
    }

    function asciiToBytes(str) {
      var byteArray = [];

      for (var i = 0; i < str.length; ++i) {
        // Node's code seems to be doing this and not & 0x7F..
        byteArray.push(str.charCodeAt(i) & 0xFF);
      }

      return byteArray;
    }

    function utf16leToBytes(str, units) {
      var c, hi, lo;
      var byteArray = [];

      for (var i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }

      return byteArray;
    }

    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }

    function blitBuffer(src, dst, offset, length) {
      for (var i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
      }

      return i;
    } // ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
    // the `instanceof` check but they should be treated as of that type.
    // See: https://github.com/feross/buffer/issues/166


    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }

    function numberIsNaN(obj) {
      // For IE11 support
      return obj !== obj; // eslint-disable-line no-self-compare
    }
  }, {
    "base64-js": 1,
    "ieee754": 3
  }],
  3: [function (require, module, exports) {
    exports.read = function (buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;

      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;

      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }

      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };

    exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);

      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);

        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }

        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }

        if (value * c >= 2) {
          e++;
          c /= 2;
        }

        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }

      for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

      e = e << mLen | m;
      eLen += mLen;

      for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

      buffer[offset + i - d] |= s * 128;
    };
  }, {}],
  4: [function (require, module, exports) {
    // shim for using process in browser
    var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
    // don't break things.  But we need to wrap it in a try catch in case it is
    // wrapped in strict mode code which doesn't define any globals.  It's inside a
    // function because try/catches deoptimize in certain engines.

    var cachedSetTimeout;
    var cachedClearTimeout;

    function defaultSetTimout() {
      throw new Error('setTimeout has not been defined');
    }

    function defaultClearTimeout() {
      throw new Error('clearTimeout has not been defined');
    }

    (function () {
      try {
        if (typeof setTimeout === 'function') {
          cachedSetTimeout = setTimeout;
        } else {
          cachedSetTimeout = defaultSetTimout;
        }
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }

      try {
        if (typeof clearTimeout === 'function') {
          cachedClearTimeout = clearTimeout;
        } else {
          cachedClearTimeout = defaultClearTimeout;
        }
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    })();

    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
      } // if setTimeout wasn't available but was latter defined


      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }

      try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
          // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }

    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
      } // if clearTimeout wasn't available but was latter defined


      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }

      try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
          return cachedClearTimeout.call(null, marker);
        } catch (e) {
          // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
          // Some versions of I.E. have different rules for clearTimeout vs setTimeout
          return cachedClearTimeout.call(this, marker);
        }
      }
    }

    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;

    function cleanUpNextTick() {
      if (!draining || !currentQueue) {
        return;
      }

      draining = false;

      if (currentQueue.length) {
        queue = currentQueue.concat(queue);
      } else {
        queueIndex = -1;
      }

      if (queue.length) {
        drainQueue();
      }
    }

    function drainQueue() {
      if (draining) {
        return;
      }

      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
      var len = queue.length;

      while (len) {
        currentQueue = queue;
        queue = [];

        while (++queueIndex < len) {
          if (currentQueue) {
            currentQueue[queueIndex].run();
          }
        }

        queueIndex = -1;
        len = queue.length;
      }

      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }

    process.nextTick = function (fun) {
      var args = new Array(arguments.length - 1);

      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i];
        }
      }

      queue.push(new Item(fun, args));

      if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
      }
    }; // v8 likes predictible objects


    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }

    Item.prototype.run = function () {
      this.fun.apply(null, this.array);
    };

    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = ''; // empty string to avoid regexp issues

    process.versions = {};

    function noop() {}

    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;

    process.listeners = function (name) {
      return [];
    };

    process.binding = function (name) {
      throw new Error('process.binding is not supported');
    };

    process.cwd = function () {
      return '/';
    };

    process.chdir = function (dir) {
      throw new Error('process.chdir is not supported');
    };

    process.umask = function () {
      return 0;
    };
  }, {}],
  5: [function (require, module, exports) {
    // Instantiate MongoDB instance
    var _require = require('mongodb-stitch-browser-sdk'),
        Stitch = _require.Stitch,
        RemoteMongoClient = _require.RemoteMongoClient;

    var client = Stitch.initializeDefaultAppClient('html-game-onuim');
    var db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');
    var collection = db.db('fantasyTD').collection('credentials'); //Login button with verification

    loginButton = document.getElementById('Login');
    loginButton.addEventListener('click', function (event) {
      var user = document.getElementById('username').value;
      var pass = document.getElementById('password').value;
      var query = {
        username: user,
        password: pass
      };
      console.log(query);
      var options = {
        limit: 1
      };
      return collection.find(query, options).first().then(function (result) {
        if (result) {
          console.log("Found document: ".concat(JSON.stringify(result)));
          document.getElementById('content').style.display = 'inline';
          document.getElementById('login').style.display = 'none';
        } else {
          console.log("nothing found for user:".concat(user, ", password:").concat(pass));
          alert('Incorrect Username or Password');
        }

        return result;
      }).catch(function (err) {
        return console.error("Failed to find document: ".concat(err));
      });
    }); //New user creation button

    newUserButton = document.getElementById('New User');
    newUserButton.addEventListener('click', function (event) {
      var user = document.getElementById('username').value;
      var pass = document.getElementById('password').value;
      var newItem = {
        username: user,
        password: pass,
        progress: {
          gold: 0,
          stage1: false,
          stage2: false,
          stage3: false,
          wave: 1
        }
      };
      collection.insertOne(newItem).then(function (result) {
        console.log("Successfully inserted item with _id: ".concat(result.insertedId));
      }).catch(function (err) {
        return console.error("Failed to insert item: ".concat(err));
      });
    });
  }, {
    "mongodb-stitch-browser-sdk": 33
  }],
  6: [function (require, module, exports) {
    'use strict';

    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
    var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    } // Support decoding URL-safe base64 strings, as Node.js does.
    // See: https://en.wikipedia.org/wiki/Base64#URL_applications


    revLookup['-'.charCodeAt(0)] = 62;
    revLookup['_'.charCodeAt(0)] = 63;

    function getLens(b64) {
      var len = b64.length;

      if (len % 4 > 0) {
        throw new Error('Invalid string. Length must be a multiple of 4');
      } // Trim off extra bytes after placeholder bytes are found
      // See: https://github.com/beatgammit/base64-js/issues/42


      var validLen = b64.indexOf('=');
      if (validLen === -1) validLen = len;
      var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    } // base64 is 4/3 + up to two characters of the original data


    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }

    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }

    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0; // if there are placeholders, only get up to the last complete 4 chars

      var len = placeHoldersLen > 0 ? validLen - 4 : validLen;

      for (var i = 0; i < len; i += 4) {
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = tmp >> 16 & 0xFF;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
      }

      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[curByte++] = tmp & 0xFF;
      }

      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
      }

      return arr;
    }

    function tripletToBase64(num) {
      return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
    }

    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];

      for (var i = start; i < end; i += 3) {
        tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
        output.push(tripletToBase64(tmp));
      }

      return output.join('');
    }

    function fromByteArray(uint8) {
      var tmp;
      var len = uint8.length;
      var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes

      var parts = [];
      var maxChunkLength = 16383; // must be multiple of 3
      // go through the array every three bytes, we'll deal with trailing stuff later

      for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
        parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
      } // pad the end with zeros, but make sure to not forget the extra bytes


      if (extraBytes === 1) {
        tmp = uint8[len - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
      } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
      }

      return parts.join('');
    }
  }, {}],
  7: [function (require, module, exports) {
    (function (self) {
      if (self.fetch) {
        return;
      }

      var support = {
        searchParams: 'URLSearchParams' in self,
        iterable: 'Symbol' in self && 'iterator' in Symbol,
        blob: 'FileReader' in self && 'Blob' in self && function () {
          try {
            new Blob();
            return true;
          } catch (e) {
            return false;
          }
        }(),
        formData: 'FormData' in self,
        arrayBuffer: 'ArrayBuffer' in self
      };

      if (support.arrayBuffer) {
        var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

        var isDataView = function isDataView(obj) {
          return obj && DataView.prototype.isPrototypeOf(obj);
        };

        var isArrayBufferView = ArrayBuffer.isView || function (obj) {
          return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
        };
      }

      function normalizeName(name) {
        if (typeof name !== 'string') {
          name = String(name);
        }

        if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
          throw new TypeError('Invalid character in header field name');
        }

        return name.toLowerCase();
      }

      function normalizeValue(value) {
        if (typeof value !== 'string') {
          value = String(value);
        }

        return value;
      } // Build a destructive iterator for the value list


      function iteratorFor(items) {
        var iterator = {
          next: function next() {
            var value = items.shift();
            return {
              done: value === undefined,
              value: value
            };
          }
        };

        if (support.iterable) {
          iterator[Symbol.iterator] = function () {
            return iterator;
          };
        }

        return iterator;
      }

      function Headers(headers) {
        this.map = {};

        if (headers instanceof Headers) {
          headers.forEach(function (value, name) {
            this.append(name, value);
          }, this);
        } else if (Array.isArray(headers)) {
          headers.forEach(function (header) {
            this.append(header[0], header[1]);
          }, this);
        } else if (headers) {
          Object.getOwnPropertyNames(headers).forEach(function (name) {
            this.append(name, headers[name]);
          }, this);
        }
      }

      Headers.prototype.append = function (name, value) {
        name = normalizeName(name);
        value = normalizeValue(value);
        var oldValue = this.map[name];
        this.map[name] = oldValue ? oldValue + ',' + value : value;
      };

      Headers.prototype['delete'] = function (name) {
        delete this.map[normalizeName(name)];
      };

      Headers.prototype.get = function (name) {
        name = normalizeName(name);
        return this.has(name) ? this.map[name] : null;
      };

      Headers.prototype.has = function (name) {
        return this.map.hasOwnProperty(normalizeName(name));
      };

      Headers.prototype.set = function (name, value) {
        this.map[normalizeName(name)] = normalizeValue(value);
      };

      Headers.prototype.forEach = function (callback, thisArg) {
        for (var name in this.map) {
          if (this.map.hasOwnProperty(name)) {
            callback.call(thisArg, this.map[name], name, this);
          }
        }
      };

      Headers.prototype.keys = function () {
        var items = [];
        this.forEach(function (value, name) {
          items.push(name);
        });
        return iteratorFor(items);
      };

      Headers.prototype.values = function () {
        var items = [];
        this.forEach(function (value) {
          items.push(value);
        });
        return iteratorFor(items);
      };

      Headers.prototype.entries = function () {
        var items = [];
        this.forEach(function (value, name) {
          items.push([name, value]);
        });
        return iteratorFor(items);
      };

      if (support.iterable) {
        Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
      }

      function consumed(body) {
        if (body.bodyUsed) {
          return Promise.reject(new TypeError('Already read'));
        }

        body.bodyUsed = true;
      }

      function fileReaderReady(reader) {
        return new Promise(function (resolve, reject) {
          reader.onload = function () {
            resolve(reader.result);
          };

          reader.onerror = function () {
            reject(reader.error);
          };
        });
      }

      function readBlobAsArrayBuffer(blob) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        reader.readAsArrayBuffer(blob);
        return promise;
      }

      function readBlobAsText(blob) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        reader.readAsText(blob);
        return promise;
      }

      function readArrayBufferAsText(buf) {
        var view = new Uint8Array(buf);
        var chars = new Array(view.length);

        for (var i = 0; i < view.length; i++) {
          chars[i] = String.fromCharCode(view[i]);
        }

        return chars.join('');
      }

      function bufferClone(buf) {
        if (buf.slice) {
          return buf.slice(0);
        } else {
          var view = new Uint8Array(buf.byteLength);
          view.set(new Uint8Array(buf));
          return view.buffer;
        }
      }

      function Body() {
        this.bodyUsed = false;

        this._initBody = function (body) {
          this._bodyInit = body;

          if (!body) {
            this._bodyText = '';
          } else if (typeof body === 'string') {
            this._bodyText = body;
          } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
            this._bodyBlob = body;
          } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
            this._bodyFormData = body;
          } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
            this._bodyText = body.toString();
          } else if (support.arrayBuffer && support.blob && isDataView(body)) {
            this._bodyArrayBuffer = bufferClone(body.buffer); // IE 10-11 can't handle a DataView body.

            this._bodyInit = new Blob([this._bodyArrayBuffer]);
          } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
            this._bodyArrayBuffer = bufferClone(body);
          } else {
            throw new Error('unsupported BodyInit type');
          }

          if (!this.headers.get('content-type')) {
            if (typeof body === 'string') {
              this.headers.set('content-type', 'text/plain;charset=UTF-8');
            } else if (this._bodyBlob && this._bodyBlob.type) {
              this.headers.set('content-type', this._bodyBlob.type);
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            }
          }
        };

        if (support.blob) {
          this.blob = function () {
            var rejected = consumed(this);

            if (rejected) {
              return rejected;
            }

            if (this._bodyBlob) {
              return Promise.resolve(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(new Blob([this._bodyArrayBuffer]));
            } else if (this._bodyFormData) {
              throw new Error('could not read FormData body as blob');
            } else {
              return Promise.resolve(new Blob([this._bodyText]));
            }
          };

          this.arrayBuffer = function () {
            if (this._bodyArrayBuffer) {
              return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
            } else {
              return this.blob().then(readBlobAsArrayBuffer);
            }
          };
        }

        this.text = function () {
          var rejected = consumed(this);

          if (rejected) {
            return rejected;
          }

          if (this._bodyBlob) {
            return readBlobAsText(this._bodyBlob);
          } else if (this._bodyArrayBuffer) {
            return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
          } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as text');
          } else {
            return Promise.resolve(this._bodyText);
          }
        };

        if (support.formData) {
          this.formData = function () {
            return this.text().then(decode);
          };
        }

        this.json = function () {
          return this.text().then(JSON.parse);
        };

        return this;
      } // HTTP methods whose capitalization should be normalized


      var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

      function normalizeMethod(method) {
        var upcased = method.toUpperCase();
        return methods.indexOf(upcased) > -1 ? upcased : method;
      }

      function Request(input, options) {
        options = options || {};
        var body = options.body;

        if (input instanceof Request) {
          if (input.bodyUsed) {
            throw new TypeError('Already read');
          }

          this.url = input.url;
          this.credentials = input.credentials;

          if (!options.headers) {
            this.headers = new Headers(input.headers);
          }

          this.method = input.method;
          this.mode = input.mode;

          if (!body && input._bodyInit != null) {
            body = input._bodyInit;
            input.bodyUsed = true;
          }
        } else {
          this.url = String(input);
        }

        this.credentials = options.credentials || this.credentials || 'omit';

        if (options.headers || !this.headers) {
          this.headers = new Headers(options.headers);
        }

        this.method = normalizeMethod(options.method || this.method || 'GET');
        this.mode = options.mode || this.mode || null;
        this.referrer = null;

        if ((this.method === 'GET' || this.method === 'HEAD') && body) {
          throw new TypeError('Body not allowed for GET or HEAD requests');
        }

        this._initBody(body);
      }

      Request.prototype.clone = function () {
        return new Request(this, {
          body: this._bodyInit
        });
      };

      function decode(body) {
        var form = new FormData();
        body.trim().split('&').forEach(function (bytes) {
          if (bytes) {
            var split = bytes.split('=');
            var name = split.shift().replace(/\+/g, ' ');
            var value = split.join('=').replace(/\+/g, ' ');
            form.append(decodeURIComponent(name), decodeURIComponent(value));
          }
        });
        return form;
      }

      function parseHeaders(rawHeaders) {
        var headers = new Headers(); // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
        // https://tools.ietf.org/html/rfc7230#section-3.2

        var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
        preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
          var parts = line.split(':');
          var key = parts.shift().trim();

          if (key) {
            var value = parts.join(':').trim();
            headers.append(key, value);
          }
        });
        return headers;
      }

      Body.call(Request.prototype);

      function Response(bodyInit, options) {
        if (!options) {
          options = {};
        }

        this.type = 'default';
        this.status = options.status === undefined ? 200 : options.status;
        this.ok = this.status >= 200 && this.status < 300;
        this.statusText = 'statusText' in options ? options.statusText : 'OK';
        this.headers = new Headers(options.headers);
        this.url = options.url || '';

        this._initBody(bodyInit);
      }

      Body.call(Response.prototype);

      Response.prototype.clone = function () {
        return new Response(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new Headers(this.headers),
          url: this.url
        });
      };

      Response.error = function () {
        var response = new Response(null, {
          status: 0,
          statusText: ''
        });
        response.type = 'error';
        return response;
      };

      var redirectStatuses = [301, 302, 303, 307, 308];

      Response.redirect = function (url, status) {
        if (redirectStatuses.indexOf(status) === -1) {
          throw new RangeError('Invalid status code');
        }

        return new Response(null, {
          status: status,
          headers: {
            location: url
          }
        });
      };

      self.Headers = Headers;
      self.Request = Request;
      self.Response = Response;

      self.fetch = function (input, init) {
        return new Promise(function (resolve, reject) {
          var request = new Request(input, init);
          var xhr = new XMLHttpRequest();

          xhr.onload = function () {
            var options = {
              status: xhr.status,
              statusText: xhr.statusText,
              headers: parseHeaders(xhr.getAllResponseHeaders() || '')
            };
            options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
            var body = 'response' in xhr ? xhr.response : xhr.responseText;
            resolve(new Response(body, options));
          };

          xhr.onerror = function () {
            reject(new TypeError('Network request failed'));
          };

          xhr.ontimeout = function () {
            reject(new TypeError('Network request failed'));
          };

          xhr.open(request.method, request.url, true);

          if (request.credentials === 'include') {
            xhr.withCredentials = true;
          } else if (request.credentials === 'omit') {
            xhr.withCredentials = false;
          }

          if ('responseType' in xhr && support.blob) {
            xhr.responseType = 'blob';
          }

          request.headers.forEach(function (value, name) {
            xhr.setRequestHeader(name, value);
          });
          xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
        });
      };

      self.fetch.polyfill = true;
    })(typeof self !== 'undefined' ? self : this);
  }, {}],
  8: [function (require, module, exports) {
    var __root__ = function (root) {
      function F() {
        this.fetch = false;
      }

      F.prototype = root;
      return new F();
    }(typeof self !== 'undefined' ? self : this);

    (function (self) {
      (function (self) {
        if (self.fetch) {
          return;
        }

        var support = {
          searchParams: 'URLSearchParams' in self,
          iterable: 'Symbol' in self && 'iterator' in Symbol,
          blob: 'FileReader' in self && 'Blob' in self && function () {
            try {
              new Blob();
              return true;
            } catch (e) {
              return false;
            }
          }(),
          formData: 'FormData' in self,
          arrayBuffer: 'ArrayBuffer' in self
        };

        if (support.arrayBuffer) {
          var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

          var isDataView = function isDataView(obj) {
            return obj && DataView.prototype.isPrototypeOf(obj);
          };

          var isArrayBufferView = ArrayBuffer.isView || function (obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
          };
        }

        function normalizeName(name) {
          if (typeof name !== 'string') {
            name = String(name);
          }

          if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
            throw new TypeError('Invalid character in header field name');
          }

          return name.toLowerCase();
        }

        function normalizeValue(value) {
          if (typeof value !== 'string') {
            value = String(value);
          }

          return value;
        } // Build a destructive iterator for the value list


        function iteratorFor(items) {
          var iterator = {
            next: function next() {
              var value = items.shift();
              return {
                done: value === undefined,
                value: value
              };
            }
          };

          if (support.iterable) {
            iterator[Symbol.iterator] = function () {
              return iterator;
            };
          }

          return iterator;
        }

        function Headers(headers) {
          this.map = {};

          if (headers instanceof Headers) {
            headers.forEach(function (value, name) {
              this.append(name, value);
            }, this);
          } else if (Array.isArray(headers)) {
            headers.forEach(function (header) {
              this.append(header[0], header[1]);
            }, this);
          } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function (name) {
              this.append(name, headers[name]);
            }, this);
          }
        }

        Headers.prototype.append = function (name, value) {
          name = normalizeName(name);
          value = normalizeValue(value);
          var oldValue = this.map[name];
          this.map[name] = oldValue ? oldValue + ',' + value : value;
        };

        Headers.prototype['delete'] = function (name) {
          delete this.map[normalizeName(name)];
        };

        Headers.prototype.get = function (name) {
          name = normalizeName(name);
          return this.has(name) ? this.map[name] : null;
        };

        Headers.prototype.has = function (name) {
          return this.map.hasOwnProperty(normalizeName(name));
        };

        Headers.prototype.set = function (name, value) {
          this.map[normalizeName(name)] = normalizeValue(value);
        };

        Headers.prototype.forEach = function (callback, thisArg) {
          for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
              callback.call(thisArg, this.map[name], name, this);
            }
          }
        };

        Headers.prototype.keys = function () {
          var items = [];
          this.forEach(function (value, name) {
            items.push(name);
          });
          return iteratorFor(items);
        };

        Headers.prototype.values = function () {
          var items = [];
          this.forEach(function (value) {
            items.push(value);
          });
          return iteratorFor(items);
        };

        Headers.prototype.entries = function () {
          var items = [];
          this.forEach(function (value, name) {
            items.push([name, value]);
          });
          return iteratorFor(items);
        };

        if (support.iterable) {
          Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
        }

        function consumed(body) {
          if (body.bodyUsed) {
            return Promise.reject(new TypeError('Already read'));
          }

          body.bodyUsed = true;
        }

        function fileReaderReady(reader) {
          return new Promise(function (resolve, reject) {
            reader.onload = function () {
              resolve(reader.result);
            };

            reader.onerror = function () {
              reject(reader.error);
            };
          });
        }

        function readBlobAsArrayBuffer(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsArrayBuffer(blob);
          return promise;
        }

        function readBlobAsText(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsText(blob);
          return promise;
        }

        function readArrayBufferAsText(buf) {
          var view = new Uint8Array(buf);
          var chars = new Array(view.length);

          for (var i = 0; i < view.length; i++) {
            chars[i] = String.fromCharCode(view[i]);
          }

          return chars.join('');
        }

        function bufferClone(buf) {
          if (buf.slice) {
            return buf.slice(0);
          } else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer;
          }
        }

        function Body() {
          this.bodyUsed = false;

          this._initBody = function (body) {
            this._bodyInit = body;

            if (!body) {
              this._bodyText = '';
            } else if (typeof body === 'string') {
              this._bodyText = body;
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
              this._bodyBlob = body;
            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
              this._bodyFormData = body;
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this._bodyText = body.toString();
            } else if (support.arrayBuffer && support.blob && isDataView(body)) {
              this._bodyArrayBuffer = bufferClone(body.buffer); // IE 10-11 can't handle a DataView body.

              this._bodyInit = new Blob([this._bodyArrayBuffer]);
            } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
              this._bodyArrayBuffer = bufferClone(body);
            } else {
              throw new Error('unsupported BodyInit type');
            }

            if (!this.headers.get('content-type')) {
              if (typeof body === 'string') {
                this.headers.set('content-type', 'text/plain;charset=UTF-8');
              } else if (this._bodyBlob && this._bodyBlob.type) {
                this.headers.set('content-type', this._bodyBlob.type);
              } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
              }
            }
          };

          if (support.blob) {
            this.blob = function () {
              var rejected = consumed(this);

              if (rejected) {
                return rejected;
              }

              if (this._bodyBlob) {
                return Promise.resolve(this._bodyBlob);
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              } else if (this._bodyFormData) {
                throw new Error('could not read FormData body as blob');
              } else {
                return Promise.resolve(new Blob([this._bodyText]));
              }
            };

            this.arrayBuffer = function () {
              if (this._bodyArrayBuffer) {
                return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
              } else {
                return this.blob().then(readBlobAsArrayBuffer);
              }
            };
          }

          this.text = function () {
            var rejected = consumed(this);

            if (rejected) {
              return rejected;
            }

            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
            } else if (this._bodyFormData) {
              throw new Error('could not read FormData body as text');
            } else {
              return Promise.resolve(this._bodyText);
            }
          };

          if (support.formData) {
            this.formData = function () {
              return this.text().then(decode);
            };
          }

          this.json = function () {
            return this.text().then(JSON.parse);
          };

          return this;
        } // HTTP methods whose capitalization should be normalized


        var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

        function normalizeMethod(method) {
          var upcased = method.toUpperCase();
          return methods.indexOf(upcased) > -1 ? upcased : method;
        }

        function Request(input, options) {
          options = options || {};
          var body = options.body;

          if (input instanceof Request) {
            if (input.bodyUsed) {
              throw new TypeError('Already read');
            }

            this.url = input.url;
            this.credentials = input.credentials;

            if (!options.headers) {
              this.headers = new Headers(input.headers);
            }

            this.method = input.method;
            this.mode = input.mode;

            if (!body && input._bodyInit != null) {
              body = input._bodyInit;
              input.bodyUsed = true;
            }
          } else {
            this.url = String(input);
          }

          this.credentials = options.credentials || this.credentials || 'omit';

          if (options.headers || !this.headers) {
            this.headers = new Headers(options.headers);
          }

          this.method = normalizeMethod(options.method || this.method || 'GET');
          this.mode = options.mode || this.mode || null;
          this.referrer = null;

          if ((this.method === 'GET' || this.method === 'HEAD') && body) {
            throw new TypeError('Body not allowed for GET or HEAD requests');
          }

          this._initBody(body);
        }

        Request.prototype.clone = function () {
          return new Request(this, {
            body: this._bodyInit
          });
        };

        function decode(body) {
          var form = new FormData();
          body.trim().split('&').forEach(function (bytes) {
            if (bytes) {
              var split = bytes.split('=');
              var name = split.shift().replace(/\+/g, ' ');
              var value = split.join('=').replace(/\+/g, ' ');
              form.append(decodeURIComponent(name), decodeURIComponent(value));
            }
          });
          return form;
        }

        function parseHeaders(rawHeaders) {
          var headers = new Headers(); // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
          // https://tools.ietf.org/html/rfc7230#section-3.2

          var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
          preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
            var parts = line.split(':');
            var key = parts.shift().trim();

            if (key) {
              var value = parts.join(':').trim();
              headers.append(key, value);
            }
          });
          return headers;
        }

        Body.call(Request.prototype);

        function Response(bodyInit, options) {
          if (!options) {
            options = {};
          }

          this.type = 'default';
          this.status = options.status === undefined ? 200 : options.status;
          this.ok = this.status >= 200 && this.status < 300;
          this.statusText = 'statusText' in options ? options.statusText : 'OK';
          this.headers = new Headers(options.headers);
          this.url = options.url || '';

          this._initBody(bodyInit);
        }

        Body.call(Response.prototype);

        Response.prototype.clone = function () {
          return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers(this.headers),
            url: this.url
          });
        };

        Response.error = function () {
          var response = new Response(null, {
            status: 0,
            statusText: ''
          });
          response.type = 'error';
          return response;
        };

        var redirectStatuses = [301, 302, 303, 307, 308];

        Response.redirect = function (url, status) {
          if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError('Invalid status code');
          }

          return new Response(null, {
            status: status,
            headers: {
              location: url
            }
          });
        };

        self.Headers = Headers;
        self.Request = Request;
        self.Response = Response;

        self.fetch = function (input, init) {
          return new Promise(function (resolve, reject) {
            var request = new Request(input, init);
            var xhr = new XMLHttpRequest();

            xhr.onload = function () {
              var options = {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || '')
              };
              options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
              var body = 'response' in xhr ? xhr.response : xhr.responseText;
              resolve(new Response(body, options));
            };

            xhr.onerror = function () {
              reject(new TypeError('Network request failed'));
            };

            xhr.ontimeout = function () {
              reject(new TypeError('Network request failed'));
            };

            xhr.open(request.method, request.url, true);

            if (request.credentials === 'include') {
              xhr.withCredentials = true;
            } else if (request.credentials === 'omit') {
              xhr.withCredentials = false;
            }

            if ('responseType' in xhr && support.blob) {
              xhr.responseType = 'blob';
            }

            request.headers.forEach(function (value, name) {
              xhr.setRequestHeader(name, value);
            });
            xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
          });
        };

        self.fetch.polyfill = true;
      })(typeof self !== 'undefined' ? self : this);
    }).call(__root__, void 0);
    var fetch = __root__.fetch;
    var Response = fetch.Response = __root__.Response;
    var Request = fetch.Request = __root__.Request;
    var Headers = fetch.Headers = __root__.Headers;

    if (_typeof2(module) === 'object' && module.exports) {
      module.exports = fetch; // Needed for TypeScript consumers without esModuleInterop.

      module.exports.default = fetch;
    }
  }, {}],
  9: [function (require, module, exports) {
    (function (process) {
      function detect() {
        if (typeof navigator !== 'undefined') {
          return parseUserAgent(navigator.userAgent);
        }

        return getNodeVersion();
      }

      function detectOS(userAgentString) {
        var rules = getOperatingSystemRules();
        var detected = rules.filter(function (os) {
          return os.rule && os.rule.test(userAgentString);
        })[0];
        return detected ? detected.name : null;
      }

      function getNodeVersion() {
        var isNode = typeof process !== 'undefined' && process.version;
        return isNode && {
          name: 'node',
          version: process.version.slice(1),
          os: process.platform
        };
      }

      function parseUserAgent(userAgentString) {
        var browsers = getBrowserRules();

        if (!userAgentString) {
          return null;
        }

        var detected = browsers.map(function (browser) {
          var match = browser.rule.exec(userAgentString);
          var version = match && match[1].split(/[._]/).slice(0, 3);

          if (version && version.length < 3) {
            version = version.concat(version.length == 1 ? [0, 0] : [0]);
          }

          return match && {
            name: browser.name,
            version: version.join('.')
          };
        }).filter(Boolean)[0] || null;

        if (detected) {
          detected.os = detectOS(userAgentString);
        }

        if (/alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/i.test(userAgentString)) {
          detected = detected || {};
          detected.bot = true;
        }

        return detected;
      }

      function getBrowserRules() {
        return buildRules([['aol', /AOLShield\/([0-9\._]+)/], ['edge', /Edge\/([0-9\._]+)/], ['yandexbrowser', /YaBrowser\/([0-9\._]+)/], ['vivaldi', /Vivaldi\/([0-9\.]+)/], ['kakaotalk', /KAKAOTALK\s([0-9\.]+)/], ['samsung', /SamsungBrowser\/([0-9\.]+)/], ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/], ['phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/], ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/], ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/], ['fxios', /FxiOS\/([0-9\.]+)/], ['opera', /Opera\/([0-9\.]+)(?:\s|$)/], ['opera', /OPR\/([0-9\.]+)(:?\s|$)$/], ['ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/], ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/], ['ie', /MSIE\s(7\.0)/], ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/], ['android', /Android\s([0-9\.]+)/], ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/], ['safari', /Version\/([0-9\._]+).*Safari/], ['facebook', /FBAV\/([0-9\.]+)/], ['instagram', /Instagram\s([0-9\.]+)/], ['ios-webview', /AppleWebKit\/([0-9\.]+).*Mobile/]]);
      }

      function getOperatingSystemRules() {
        return buildRules([['iOS', /iP(hone|od|ad)/], ['Android OS', /Android/], ['BlackBerry OS', /BlackBerry|BB10/], ['Windows Mobile', /IEMobile/], ['Amazon OS', /Kindle/], ['Windows 3.11', /Win16/], ['Windows 95', /(Windows 95)|(Win95)|(Windows_95)/], ['Windows 98', /(Windows 98)|(Win98)/], ['Windows 2000', /(Windows NT 5.0)|(Windows 2000)/], ['Windows XP', /(Windows NT 5.1)|(Windows XP)/], ['Windows Server 2003', /(Windows NT 5.2)/], ['Windows Vista', /(Windows NT 6.0)/], ['Windows 7', /(Windows NT 6.1)/], ['Windows 8', /(Windows NT 6.2)/], ['Windows 8.1', /(Windows NT 6.3)/], ['Windows 10', /(Windows NT 10.0)/], ['Windows ME', /Windows ME/], ['Open BSD', /OpenBSD/], ['Sun OS', /SunOS/], ['Linux', /(Linux)|(X11)/], ['Mac OS', /(Mac_PowerPC)|(Macintosh)/], ['QNX', /QNX/], ['BeOS', /BeOS/], ['OS/2', /OS\/2/], ['Search Bot', /(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves\/Teoma)|(ia_archiver)/]]);
      }

      function buildRules(ruleTuples) {
        return ruleTuples.map(function (tuple) {
          return {
            name: tuple[0],
            rule: tuple[1]
          };
        });
      }

      module.exports = {
        detect: detect,
        detectOS: detectOS,
        getNodeVersion: getNodeVersion,
        parseUserAgent: parseUserAgent
      };
    }).call(this, require('_process'));
  }, {
    "_process": 4
  }],
  10: [function (require, module, exports) {
    module.exports = Long;
    /**
     * wasm optimizations, to do native i64 multiplication and divide
     */

    var wasm = null;

    try {
      wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports;
    } catch (e) {} // no wasm support :(

    /**
     * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
     *  See the from* functions below for more convenient ways of constructing Longs.
     * @exports Long
     * @class A Long class for representing a 64 bit two's-complement integer value.
     * @param {number} low The low (signed) 32 bits of the long
     * @param {number} high The high (signed) 32 bits of the long
     * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
     * @constructor
     */


    function Long(low, high, unsigned) {
      /**
       * The low 32 bits as a signed value.
       * @type {number}
       */
      this.low = low | 0;
      /**
       * The high 32 bits as a signed value.
       * @type {number}
       */

      this.high = high | 0;
      /**
       * Whether unsigned or not.
       * @type {boolean}
       */

      this.unsigned = !!unsigned;
    } // The internal representation of a long is the two given signed, 32-bit values.
    // We use 32-bit pieces because these are the size of integers on which
    // Javascript performs bit-operations.  For operations like addition and
    // multiplication, we split each number into 16 bit pieces, which can easily be
    // multiplied within Javascript's floating-point representation without overflow
    // or change in sign.
    //
    // In the algorithms below, we frequently reduce the negative case to the
    // positive case by negating the input(s) and then post-processing the result.
    // Note that we must ALWAYS check specially whether those values are MIN_VALUE
    // (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
    // a positive number, it overflows back into a negative).  Not handling this
    // case would often result in infinite recursion.
    //
    // Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
    // methods on which they depend.

    /**
     * An indicator used to reliably determine if an object is a Long or not.
     * @type {boolean}
     * @const
     * @private
     */


    Long.prototype.__isLong__;
    Object.defineProperty(Long.prototype, "__isLong__", {
      value: true
    });
    /**
     * @function
     * @param {*} obj Object
     * @returns {boolean}
     * @inner
     */

    function isLong(obj) {
      return (obj && obj["__isLong__"]) === true;
    }
    /**
     * Tests if the specified object is a Long.
     * @function
     * @param {*} obj Object
     * @returns {boolean}
     */


    Long.isLong = isLong;
    /**
     * A cache of the Long representations of small integer values.
     * @type {!Object}
     * @inner
     */

    var INT_CACHE = {};
    /**
     * A cache of the Long representations of small unsigned integer values.
     * @type {!Object}
     * @inner
     */

    var UINT_CACHE = {};
    /**
     * @param {number} value
     * @param {boolean=} unsigned
     * @returns {!Long}
     * @inner
     */

    function fromInt(value, unsigned) {
      var obj, cachedObj, cache;

      if (unsigned) {
        value >>>= 0;

        if (cache = 0 <= value && value < 256) {
          cachedObj = UINT_CACHE[value];
          if (cachedObj) return cachedObj;
        }

        obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
        if (cache) UINT_CACHE[value] = obj;
        return obj;
      } else {
        value |= 0;

        if (cache = -128 <= value && value < 128) {
          cachedObj = INT_CACHE[value];
          if (cachedObj) return cachedObj;
        }

        obj = fromBits(value, value < 0 ? -1 : 0, false);
        if (cache) INT_CACHE[value] = obj;
        return obj;
      }
    }
    /**
     * Returns a Long representing the given 32 bit integer value.
     * @function
     * @param {number} value The 32 bit integer in question
     * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
     * @returns {!Long} The corresponding Long value
     */


    Long.fromInt = fromInt;
    /**
     * @param {number} value
     * @param {boolean=} unsigned
     * @returns {!Long}
     * @inner
     */

    function fromNumber(value, unsigned) {
      if (isNaN(value)) return unsigned ? UZERO : ZERO;

      if (unsigned) {
        if (value < 0) return UZERO;
        if (value >= TWO_PWR_64_DBL) return MAX_UNSIGNED_VALUE;
      } else {
        if (value <= -TWO_PWR_63_DBL) return MIN_VALUE;
        if (value + 1 >= TWO_PWR_63_DBL) return MAX_VALUE;
      }

      if (value < 0) return fromNumber(-value, unsigned).neg();
      return fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
    }
    /**
     * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
     * @function
     * @param {number} value The number in question
     * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
     * @returns {!Long} The corresponding Long value
     */


    Long.fromNumber = fromNumber;
    /**
     * @param {number} lowBits
     * @param {number} highBits
     * @param {boolean=} unsigned
     * @returns {!Long}
     * @inner
     */

    function fromBits(lowBits, highBits, unsigned) {
      return new Long(lowBits, highBits, unsigned);
    }
    /**
     * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
     *  assumed to use 32 bits.
     * @function
     * @param {number} lowBits The low 32 bits
     * @param {number} highBits The high 32 bits
     * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
     * @returns {!Long} The corresponding Long value
     */


    Long.fromBits = fromBits;
    /**
     * @function
     * @param {number} base
     * @param {number} exponent
     * @returns {number}
     * @inner
     */

    var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

    /**
     * @param {string} str
     * @param {(boolean|number)=} unsigned
     * @param {number=} radix
     * @returns {!Long}
     * @inner
     */

    function fromString(str, unsigned, radix) {
      if (str.length === 0) throw Error('empty string');
      if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity") return ZERO;

      if (typeof unsigned === 'number') {
        // For goog.math.long compatibility
        radix = unsigned, unsigned = false;
      } else {
        unsigned = !!unsigned;
      }

      radix = radix || 10;
      if (radix < 2 || 36 < radix) throw RangeError('radix');
      var p;
      if ((p = str.indexOf('-')) > 0) throw Error('interior hyphen');else if (p === 0) {
        return fromString(str.substring(1), unsigned, radix).neg();
      } // Do several (8) digits each time through the loop, so as to
      // minimize the calls to the very expensive emulated div.

      var radixToPower = fromNumber(pow_dbl(radix, 8));
      var result = ZERO;

      for (var i = 0; i < str.length; i += 8) {
        var size = Math.min(8, str.length - i),
            value = parseInt(str.substring(i, i + size), radix);

        if (size < 8) {
          var power = fromNumber(pow_dbl(radix, size));
          result = result.mul(power).add(fromNumber(value));
        } else {
          result = result.mul(radixToPower);
          result = result.add(fromNumber(value));
        }
      }

      result.unsigned = unsigned;
      return result;
    }
    /**
     * Returns a Long representation of the given string, written using the specified radix.
     * @function
     * @param {string} str The textual representation of the Long
     * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to signed
     * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
     * @returns {!Long} The corresponding Long value
     */


    Long.fromString = fromString;
    /**
     * @function
     * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
     * @param {boolean=} unsigned
     * @returns {!Long}
     * @inner
     */

    function fromValue(val, unsigned) {
      if (typeof val === 'number') return fromNumber(val, unsigned);
      if (typeof val === 'string') return fromString(val, unsigned); // Throws for non-objects, converts non-instanceof Long:

      return fromBits(val.low, val.high, typeof unsigned === 'boolean' ? unsigned : val.unsigned);
    }
    /**
     * Converts the specified value to a Long using the appropriate from* function for its type.
     * @function
     * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
     * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
     * @returns {!Long}
     */


    Long.fromValue = fromValue; // NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
    // no runtime penalty for these.

    /**
     * @type {number}
     * @const
     * @inner
     */

    var TWO_PWR_16_DBL = 1 << 16;
    /**
     * @type {number}
     * @const
     * @inner
     */

    var TWO_PWR_24_DBL = 1 << 24;
    /**
     * @type {number}
     * @const
     * @inner
     */

    var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
    /**
     * @type {number}
     * @const
     * @inner
     */

    var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
    /**
     * @type {number}
     * @const
     * @inner
     */

    var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
    /**
     * @type {!Long}
     * @const
     * @inner
     */

    var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
    /**
     * @type {!Long}
     * @inner
     */

    var ZERO = fromInt(0);
    /**
     * Signed zero.
     * @type {!Long}
     */

    Long.ZERO = ZERO;
    /**
     * @type {!Long}
     * @inner
     */

    var UZERO = fromInt(0, true);
    /**
     * Unsigned zero.
     * @type {!Long}
     */

    Long.UZERO = UZERO;
    /**
     * @type {!Long}
     * @inner
     */

    var ONE = fromInt(1);
    /**
     * Signed one.
     * @type {!Long}
     */

    Long.ONE = ONE;
    /**
     * @type {!Long}
     * @inner
     */

    var UONE = fromInt(1, true);
    /**
     * Unsigned one.
     * @type {!Long}
     */

    Long.UONE = UONE;
    /**
     * @type {!Long}
     * @inner
     */

    var NEG_ONE = fromInt(-1);
    /**
     * Signed negative one.
     * @type {!Long}
     */

    Long.NEG_ONE = NEG_ONE;
    /**
     * @type {!Long}
     * @inner
     */

    var MAX_VALUE = fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0, false);
    /**
     * Maximum signed value.
     * @type {!Long}
     */

    Long.MAX_VALUE = MAX_VALUE;
    /**
     * @type {!Long}
     * @inner
     */

    var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF | 0, 0xFFFFFFFF | 0, true);
    /**
     * Maximum unsigned value.
     * @type {!Long}
     */

    Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
    /**
     * @type {!Long}
     * @inner
     */

    var MIN_VALUE = fromBits(0, 0x80000000 | 0, false);
    /**
     * Minimum signed value.
     * @type {!Long}
     */

    Long.MIN_VALUE = MIN_VALUE;
    /**
     * @alias Long.prototype
     * @inner
     */

    var LongPrototype = Long.prototype;
    /**
     * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
     * @returns {number}
     */

    LongPrototype.toInt = function toInt() {
      return this.unsigned ? this.low >>> 0 : this.low;
    };
    /**
     * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
     * @returns {number}
     */


    LongPrototype.toNumber = function toNumber() {
      if (this.unsigned) return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
      return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
    };
    /**
     * Converts the Long to a string written in the specified radix.
     * @param {number=} radix Radix (2-36), defaults to 10
     * @returns {string}
     * @override
     * @throws {RangeError} If `radix` is out of range
     */


    LongPrototype.toString = function toString(radix) {
      radix = radix || 10;
      if (radix < 2 || 36 < radix) throw RangeError('radix');
      if (this.isZero()) return '0';

      if (this.isNegative()) {
        // Unsigned Longs are never negative
        if (this.eq(MIN_VALUE)) {
          // We need to change the Long value before it can be negated, so we remove
          // the bottom-most digit in this base and then recurse to do the rest.
          var radixLong = fromNumber(radix),
              div = this.div(radixLong),
              rem1 = div.mul(radixLong).sub(this);
          return div.toString(radix) + rem1.toInt().toString(radix);
        } else return '-' + this.neg().toString(radix);
      } // Do several (6) digits each time through the loop, so as to
      // minimize the calls to the very expensive emulated div.


      var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
          rem = this;
      var result = '';

      while (true) {
        var remDiv = rem.div(radixToPower),
            intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
            digits = intval.toString(radix);
        rem = remDiv;
        if (rem.isZero()) return digits + result;else {
          while (digits.length < 6) {
            digits = '0' + digits;
          }

          result = '' + digits + result;
        }
      }
    };
    /**
     * Gets the high 32 bits as a signed integer.
     * @returns {number} Signed high bits
     */


    LongPrototype.getHighBits = function getHighBits() {
      return this.high;
    };
    /**
     * Gets the high 32 bits as an unsigned integer.
     * @returns {number} Unsigned high bits
     */


    LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
      return this.high >>> 0;
    };
    /**
     * Gets the low 32 bits as a signed integer.
     * @returns {number} Signed low bits
     */


    LongPrototype.getLowBits = function getLowBits() {
      return this.low;
    };
    /**
     * Gets the low 32 bits as an unsigned integer.
     * @returns {number} Unsigned low bits
     */


    LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
      return this.low >>> 0;
    };
    /**
     * Gets the number of bits needed to represent the absolute value of this Long.
     * @returns {number}
     */


    LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
      if (this.isNegative()) // Unsigned Longs are never negative
        return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
      var val = this.high != 0 ? this.high : this.low;

      for (var bit = 31; bit > 0; bit--) {
        if ((val & 1 << bit) != 0) break;
      }

      return this.high != 0 ? bit + 33 : bit + 1;
    };
    /**
     * Tests if this Long's value equals zero.
     * @returns {boolean}
     */


    LongPrototype.isZero = function isZero() {
      return this.high === 0 && this.low === 0;
    };
    /**
     * Tests if this Long's value equals zero. This is an alias of {@link Long#isZero}.
     * @returns {boolean}
     */


    LongPrototype.eqz = LongPrototype.isZero;
    /**
     * Tests if this Long's value is negative.
     * @returns {boolean}
     */

    LongPrototype.isNegative = function isNegative() {
      return !this.unsigned && this.high < 0;
    };
    /**
     * Tests if this Long's value is positive.
     * @returns {boolean}
     */


    LongPrototype.isPositive = function isPositive() {
      return this.unsigned || this.high >= 0;
    };
    /**
     * Tests if this Long's value is odd.
     * @returns {boolean}
     */


    LongPrototype.isOdd = function isOdd() {
      return (this.low & 1) === 1;
    };
    /**
     * Tests if this Long's value is even.
     * @returns {boolean}
     */


    LongPrototype.isEven = function isEven() {
      return (this.low & 1) === 0;
    };
    /**
     * Tests if this Long's value equals the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */


    LongPrototype.equals = function equals(other) {
      if (!isLong(other)) other = fromValue(other);
      if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1) return false;
      return this.high === other.high && this.low === other.low;
    };
    /**
     * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */


    LongPrototype.eq = LongPrototype.equals;
    /**
     * Tests if this Long's value differs from the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */

    LongPrototype.notEquals = function notEquals(other) {
      return !this.eq(
      /* validates */
      other);
    };
    /**
     * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */


    LongPrototype.neq = LongPrototype.notEquals;
    /**
     * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */

    LongPrototype.ne = LongPrototype.notEquals;
    /**
     * Tests if this Long's value is less than the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */

    LongPrototype.lessThan = function lessThan(other) {
      return this.comp(
      /* validates */
      other) < 0;
    };
    /**
     * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */


    LongPrototype.lt = LongPrototype.lessThan;
    /**
     * Tests if this Long's value is less than or equal the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */

    LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
      return this.comp(
      /* validates */
      other) <= 0;
    };
    /**
     * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */


    LongPrototype.lte = LongPrototype.lessThanOrEqual;
    /**
     * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */

    LongPrototype.le = LongPrototype.lessThanOrEqual;
    /**
     * Tests if this Long's value is greater than the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */

    LongPrototype.greaterThan = function greaterThan(other) {
      return this.comp(
      /* validates */
      other) > 0;
    };
    /**
     * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */


    LongPrototype.gt = LongPrototype.greaterThan;
    /**
     * Tests if this Long's value is greater than or equal the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */

    LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
      return this.comp(
      /* validates */
      other) >= 0;
    };
    /**
     * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */


    LongPrototype.gte = LongPrototype.greaterThanOrEqual;
    /**
     * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */

    LongPrototype.ge = LongPrototype.greaterThanOrEqual;
    /**
     * Compares this Long's value with the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {number} 0 if they are the same, 1 if the this is greater and -1
     *  if the given one is greater
     */

    LongPrototype.compare = function compare(other) {
      if (!isLong(other)) other = fromValue(other);
      if (this.eq(other)) return 0;
      var thisNeg = this.isNegative(),
          otherNeg = other.isNegative();
      if (thisNeg && !otherNeg) return -1;
      if (!thisNeg && otherNeg) return 1; // At this point the sign bits are the same

      if (!this.unsigned) return this.sub(other).isNegative() ? -1 : 1; // Both are positive if at least one is unsigned

      return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
    };
    /**
     * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {number} 0 if they are the same, 1 if the this is greater and -1
     *  if the given one is greater
     */


    LongPrototype.comp = LongPrototype.compare;
    /**
     * Negates this Long's value.
     * @returns {!Long} Negated Long
     */

    LongPrototype.negate = function negate() {
      if (!this.unsigned && this.eq(MIN_VALUE)) return MIN_VALUE;
      return this.not().add(ONE);
    };
    /**
     * Negates this Long's value. This is an alias of {@link Long#negate}.
     * @function
     * @returns {!Long} Negated Long
     */


    LongPrototype.neg = LongPrototype.negate;
    /**
     * Returns the sum of this and the specified Long.
     * @param {!Long|number|string} addend Addend
     * @returns {!Long} Sum
     */

    LongPrototype.add = function add(addend) {
      if (!isLong(addend)) addend = fromValue(addend); // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

      var a48 = this.high >>> 16;
      var a32 = this.high & 0xFFFF;
      var a16 = this.low >>> 16;
      var a00 = this.low & 0xFFFF;
      var b48 = addend.high >>> 16;
      var b32 = addend.high & 0xFFFF;
      var b16 = addend.low >>> 16;
      var b00 = addend.low & 0xFFFF;
      var c48 = 0,
          c32 = 0,
          c16 = 0,
          c00 = 0;
      c00 += a00 + b00;
      c16 += c00 >>> 16;
      c00 &= 0xFFFF;
      c16 += a16 + b16;
      c32 += c16 >>> 16;
      c16 &= 0xFFFF;
      c32 += a32 + b32;
      c48 += c32 >>> 16;
      c32 &= 0xFFFF;
      c48 += a48 + b48;
      c48 &= 0xFFFF;
      return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
    };
    /**
     * Returns the difference of this and the specified Long.
     * @param {!Long|number|string} subtrahend Subtrahend
     * @returns {!Long} Difference
     */


    LongPrototype.subtract = function subtract(subtrahend) {
      if (!isLong(subtrahend)) subtrahend = fromValue(subtrahend);
      return this.add(subtrahend.neg());
    };
    /**
     * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
     * @function
     * @param {!Long|number|string} subtrahend Subtrahend
     * @returns {!Long} Difference
     */


    LongPrototype.sub = LongPrototype.subtract;
    /**
     * Returns the product of this and the specified Long.
     * @param {!Long|number|string} multiplier Multiplier
     * @returns {!Long} Product
     */

    LongPrototype.multiply = function multiply(multiplier) {
      if (this.isZero()) return ZERO;
      if (!isLong(multiplier)) multiplier = fromValue(multiplier); // use wasm support if present

      if (wasm) {
        var low = wasm.mul(this.low, this.high, multiplier.low, multiplier.high);
        return fromBits(low, wasm.get_high(), this.unsigned);
      }

      if (multiplier.isZero()) return ZERO;
      if (this.eq(MIN_VALUE)) return multiplier.isOdd() ? MIN_VALUE : ZERO;
      if (multiplier.eq(MIN_VALUE)) return this.isOdd() ? MIN_VALUE : ZERO;

      if (this.isNegative()) {
        if (multiplier.isNegative()) return this.neg().mul(multiplier.neg());else return this.neg().mul(multiplier).neg();
      } else if (multiplier.isNegative()) return this.mul(multiplier.neg()).neg(); // If both longs are small, use float multiplication


      if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24)) return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned); // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
      // We can skip products that would overflow.

      var a48 = this.high >>> 16;
      var a32 = this.high & 0xFFFF;
      var a16 = this.low >>> 16;
      var a00 = this.low & 0xFFFF;
      var b48 = multiplier.high >>> 16;
      var b32 = multiplier.high & 0xFFFF;
      var b16 = multiplier.low >>> 16;
      var b00 = multiplier.low & 0xFFFF;
      var c48 = 0,
          c32 = 0,
          c16 = 0,
          c00 = 0;
      c00 += a00 * b00;
      c16 += c00 >>> 16;
      c00 &= 0xFFFF;
      c16 += a16 * b00;
      c32 += c16 >>> 16;
      c16 &= 0xFFFF;
      c16 += a00 * b16;
      c32 += c16 >>> 16;
      c16 &= 0xFFFF;
      c32 += a32 * b00;
      c48 += c32 >>> 16;
      c32 &= 0xFFFF;
      c32 += a16 * b16;
      c48 += c32 >>> 16;
      c32 &= 0xFFFF;
      c32 += a00 * b32;
      c48 += c32 >>> 16;
      c32 &= 0xFFFF;
      c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
      c48 &= 0xFFFF;
      return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
    };
    /**
     * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
     * @function
     * @param {!Long|number|string} multiplier Multiplier
     * @returns {!Long} Product
     */


    LongPrototype.mul = LongPrototype.multiply;
    /**
     * Returns this Long divided by the specified. The result is signed if this Long is signed or
     *  unsigned if this Long is unsigned.
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Quotient
     */

    LongPrototype.divide = function divide(divisor) {
      if (!isLong(divisor)) divisor = fromValue(divisor);
      if (divisor.isZero()) throw Error('division by zero'); // use wasm support if present

      if (wasm) {
        // guard against signed division overflow: the largest
        // negative number / -1 would be 1 larger than the largest
        // positive number, due to two's complement.
        if (!this.unsigned && this.high === -0x80000000 && divisor.low === -1 && divisor.high === -1) {
          // be consistent with non-wasm code path
          return this;
        }

        var low = (this.unsigned ? wasm.div_u : wasm.div_s)(this.low, this.high, divisor.low, divisor.high);
        return fromBits(low, wasm.get_high(), this.unsigned);
      }

      if (this.isZero()) return this.unsigned ? UZERO : ZERO;
      var approx, rem, res;

      if (!this.unsigned) {
        // This section is only relevant for signed longs and is derived from the
        // closure library as a whole.
        if (this.eq(MIN_VALUE)) {
          if (divisor.eq(ONE) || divisor.eq(NEG_ONE)) return MIN_VALUE; // recall that -MIN_VALUE == MIN_VALUE
          else if (divisor.eq(MIN_VALUE)) return ONE;else {
              // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
              var halfThis = this.shr(1);
              approx = halfThis.div(divisor).shl(1);

              if (approx.eq(ZERO)) {
                return divisor.isNegative() ? ONE : NEG_ONE;
              } else {
                rem = this.sub(divisor.mul(approx));
                res = approx.add(rem.div(divisor));
                return res;
              }
            }
        } else if (divisor.eq(MIN_VALUE)) return this.unsigned ? UZERO : ZERO;

        if (this.isNegative()) {
          if (divisor.isNegative()) return this.neg().div(divisor.neg());
          return this.neg().div(divisor).neg();
        } else if (divisor.isNegative()) return this.div(divisor.neg()).neg();

        res = ZERO;
      } else {
        // The algorithm below has not been made for unsigned longs. It's therefore
        // required to take special care of the MSB prior to running it.
        if (!divisor.unsigned) divisor = divisor.toUnsigned();
        if (divisor.gt(this)) return UZERO;
        if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
          return UONE;
        res = UZERO;
      } // Repeat the following until the remainder is less than other:  find a
      // floating-point that approximates remainder / other *from below*, add this
      // into the result, and subtract it from the remainder.  It is critical that
      // the approximate value is less than or equal to the real value so that the
      // remainder never becomes negative.


      rem = this;

      while (rem.gte(divisor)) {
        // Approximate the result of division. This may be a little greater or
        // smaller than the actual value.
        approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber())); // We will tweak the approximate result by changing it in the 48-th digit or
        // the smallest non-fractional digit, whichever is larger.

        var log2 = Math.ceil(Math.log(approx) / Math.LN2),
            delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48),
            // Decrease the approximation until it is smaller than the remainder.  Note
        // that if it is too large, the product overflows and is negative.
        approxRes = fromNumber(approx),
            approxRem = approxRes.mul(divisor);

        while (approxRem.isNegative() || approxRem.gt(rem)) {
          approx -= delta;
          approxRes = fromNumber(approx, this.unsigned);
          approxRem = approxRes.mul(divisor);
        } // We know the answer can't be zero... and actually, zero would cause
        // infinite recursion since we would make no progress.


        if (approxRes.isZero()) approxRes = ONE;
        res = res.add(approxRes);
        rem = rem.sub(approxRem);
      }

      return res;
    };
    /**
     * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
     * @function
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Quotient
     */


    LongPrototype.div = LongPrototype.divide;
    /**
     * Returns this Long modulo the specified.
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Remainder
     */

    LongPrototype.modulo = function modulo(divisor) {
      if (!isLong(divisor)) divisor = fromValue(divisor); // use wasm support if present

      if (wasm) {
        var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(this.low, this.high, divisor.low, divisor.high);
        return fromBits(low, wasm.get_high(), this.unsigned);
      }

      return this.sub(this.div(divisor).mul(divisor));
    };
    /**
     * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
     * @function
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Remainder
     */


    LongPrototype.mod = LongPrototype.modulo;
    /**
     * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
     * @function
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Remainder
     */

    LongPrototype.rem = LongPrototype.modulo;
    /**
     * Returns the bitwise NOT of this Long.
     * @returns {!Long}
     */

    LongPrototype.not = function not() {
      return fromBits(~this.low, ~this.high, this.unsigned);
    };
    /**
     * Returns the bitwise AND of this Long and the specified.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     */


    LongPrototype.and = function and(other) {
      if (!isLong(other)) other = fromValue(other);
      return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
    };
    /**
     * Returns the bitwise OR of this Long and the specified.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     */


    LongPrototype.or = function or(other) {
      if (!isLong(other)) other = fromValue(other);
      return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
    };
    /**
     * Returns the bitwise XOR of this Long and the given one.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     */


    LongPrototype.xor = function xor(other) {
      if (!isLong(other)) other = fromValue(other);
      return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
    };
    /**
     * Returns this Long with bits shifted to the left by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */


    LongPrototype.shiftLeft = function shiftLeft(numBits) {
      if (isLong(numBits)) numBits = numBits.toInt();
      if ((numBits &= 63) === 0) return this;else if (numBits < 32) return fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned);else return fromBits(0, this.low << numBits - 32, this.unsigned);
    };
    /**
     * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
     * @function
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */


    LongPrototype.shl = LongPrototype.shiftLeft;
    /**
     * Returns this Long with bits arithmetically shifted to the right by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */

    LongPrototype.shiftRight = function shiftRight(numBits) {
      if (isLong(numBits)) numBits = numBits.toInt();
      if ((numBits &= 63) === 0) return this;else if (numBits < 32) return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned);else return fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
    };
    /**
     * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
     * @function
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */


    LongPrototype.shr = LongPrototype.shiftRight;
    /**
     * Returns this Long with bits logically shifted to the right by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */

    LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
      if (isLong(numBits)) numBits = numBits.toInt();
      numBits &= 63;
      if (numBits === 0) return this;else {
        var high = this.high;

        if (numBits < 32) {
          var low = this.low;
          return fromBits(low >>> numBits | high << 32 - numBits, high >>> numBits, this.unsigned);
        } else if (numBits === 32) return fromBits(high, 0, this.unsigned);else return fromBits(high >>> numBits - 32, 0, this.unsigned);
      }
    };
    /**
     * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
     * @function
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */


    LongPrototype.shru = LongPrototype.shiftRightUnsigned;
    /**
     * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
     * @function
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */

    LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;
    /**
     * Converts this Long to signed.
     * @returns {!Long} Signed long
     */

    LongPrototype.toSigned = function toSigned() {
      if (!this.unsigned) return this;
      return fromBits(this.low, this.high, false);
    };
    /**
     * Converts this Long to unsigned.
     * @returns {!Long} Unsigned long
     */


    LongPrototype.toUnsigned = function toUnsigned() {
      if (this.unsigned) return this;
      return fromBits(this.low, this.high, true);
    };
    /**
     * Converts this Long to its byte representation.
     * @param {boolean=} le Whether little or big endian, defaults to big endian
     * @returns {!Array.<number>} Byte representation
     */


    LongPrototype.toBytes = function toBytes(le) {
      return le ? this.toBytesLE() : this.toBytesBE();
    };
    /**
     * Converts this Long to its little endian byte representation.
     * @returns {!Array.<number>} Little endian byte representation
     */


    LongPrototype.toBytesLE = function toBytesLE() {
      var hi = this.high,
          lo = this.low;
      return [lo & 0xff, lo >>> 8 & 0xff, lo >>> 16 & 0xff, lo >>> 24, hi & 0xff, hi >>> 8 & 0xff, hi >>> 16 & 0xff, hi >>> 24];
    };
    /**
     * Converts this Long to its big endian byte representation.
     * @returns {!Array.<number>} Big endian byte representation
     */


    LongPrototype.toBytesBE = function toBytesBE() {
      var hi = this.high,
          lo = this.low;
      return [hi >>> 24, hi >>> 16 & 0xff, hi >>> 8 & 0xff, hi & 0xff, lo >>> 24, lo >>> 16 & 0xff, lo >>> 8 & 0xff, lo & 0xff];
    };
    /**
     * Creates a Long from its byte representation.
     * @param {!Array.<number>} bytes Byte representation
     * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
     * @param {boolean=} le Whether little or big endian, defaults to big endian
     * @returns {Long} The corresponding Long value
     */


    Long.fromBytes = function fromBytes(bytes, unsigned, le) {
      return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
    };
    /**
     * Creates a Long from its little endian byte representation.
     * @param {!Array.<number>} bytes Little endian byte representation
     * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
     * @returns {Long} The corresponding Long value
     */


    Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
      return new Long(bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24, bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24, unsigned);
    };
    /**
     * Creates a Long from its big endian byte representation.
     * @param {!Array.<number>} bytes Big endian byte representation
     * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
     * @returns {Long} The corresponding Long value
     */


    Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
      return new Long(bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7], bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], unsigned);
    };
  }, {}],
  11: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");

    var LocalStorage_1 = __importDefault(require("./internal/common/LocalStorage"));

    var BrowserFetchStreamTransport_1 = __importDefault(require("./internal/net/BrowserFetchStreamTransport"));

    var StitchAppClientImpl_1 = __importDefault(require("./internal/StitchAppClientImpl"));

    var DEFAULT_BASE_URL = "https://stitch.mongodb.com";
    var appClients = {};

    var Stitch = function () {
      function Stitch() {}

      Object.defineProperty(Stitch, "defaultAppClient", {
        get: function get() {
          if (Stitch.defaultClientAppId === undefined) {
            throw new Error("default app client has not yet been initialized/set");
          }

          return appClients[Stitch.defaultClientAppId];
        },
        enumerable: true,
        configurable: true
      });

      Stitch.getAppClient = function (clientAppId) {
        if (appClients[clientAppId] === undefined) {
          throw new Error("client for app '" + clientAppId + "' has not yet been initialized");
        }

        return appClients[clientAppId];
      };

      Stitch.hasAppClient = function (clientAppId) {
        return appClients[clientAppId] !== undefined;
      };

      Stitch.initializeDefaultAppClient = function (clientAppId, config) {
        if (config === void 0) {
          config = new mongodb_stitch_core_sdk_1.StitchAppClientConfiguration.Builder().build();
        }

        if (clientAppId === undefined || clientAppId === "") {
          throw new Error("clientAppId must be set to a non-empty string");
        }

        if (Stitch.defaultClientAppId !== undefined) {
          throw new Error("default app can only be set once; currently set to '" + Stitch.defaultClientAppId + "'");
        }

        var client = Stitch.initializeAppClient(clientAppId, config);
        Stitch.defaultClientAppId = clientAppId;
        return client;
      };

      Stitch.initializeAppClient = function (clientAppId, config) {
        if (config === void 0) {
          config = new mongodb_stitch_core_sdk_1.StitchAppClientConfiguration.Builder().build();
        }

        if (clientAppId === undefined || clientAppId === "") {
          throw new Error("clientAppId must be set to a non-empty string");
        }

        if (appClients[clientAppId] !== undefined) {
          throw new Error("client for app '" + clientAppId + "' has already been initialized");
        }

        var builder = config.builder ? config.builder() : new mongodb_stitch_core_sdk_1.StitchAppClientConfiguration.Builder(config);

        if (builder.storage === undefined) {
          builder.withStorage(new LocalStorage_1.default(clientAppId));
        }

        if (builder.transport === undefined) {
          if (window["EventSource"]) {
            builder.withTransport(new BrowserFetchStreamTransport_1.default());
          } else {
            builder.withTransport(new mongodb_stitch_core_sdk_1.FetchTransport());
          }
        }

        if (builder.baseUrl === undefined || builder.baseUrl === "") {
          builder.withBaseUrl(DEFAULT_BASE_URL);
        }

        if (builder.localAppName === undefined || builder.localAppName === "") {
          builder.withLocalAppName(Stitch.localAppName);
        }

        if (builder.localAppVersion === undefined || builder.localAppVersion === "") {
          builder.withLocalAppVersion(Stitch.localAppVersion);
        }

        var client = new StitchAppClientImpl_1.default(clientAppId, builder.build());
        appClients[clientAppId] = client;
        return client;
      };

      return Stitch;
    }();

    exports.default = Stitch;
  }, {
    "./internal/StitchAppClientImpl": 26,
    "./internal/common/LocalStorage": 27,
    "./internal/net/BrowserFetchStreamTransport": 29,
    "mongodb-stitch-core-sdk": 87
  }],
  12: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var RedirectFragmentFields;

    (function (RedirectFragmentFields) {
      RedirectFragmentFields["StitchError"] = "_stitch_error";
      RedirectFragmentFields["State"] = "_stitch_state";
      RedirectFragmentFields["UserAuth"] = "_stitch_ua";
      RedirectFragmentFields["LinkUser"] = "_stitch_link_user";
      RedirectFragmentFields["StitchLink"] = "_stitch_link";
      RedirectFragmentFields["ClientAppId"] = "_stitch_client_app_id";
    })(RedirectFragmentFields || (RedirectFragmentFields = {}));

    exports.default = RedirectFragmentFields;
  }, {}],
  13: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var RedirectKeys;

    (function (RedirectKeys) {
      RedirectKeys["ProviderName"] = "_stitch_redirect_provider_name";
      RedirectKeys["ProviderType"] = "_stitch_redirect_provider_type";
      RedirectKeys["State"] = "_stitch_redirect_state";
    })(RedirectKeys || (RedirectKeys = {}));

    exports.default = RedirectKeys;
  }, {}],
  14: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var detect_browser_1 = require("detect-browser");

    require("cross-fetch/polyfill");

    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");

    var Version_1 = __importDefault(require("../../internal/common/Version"));

    var RedirectFragmentFields_1 = __importDefault(require("./RedirectFragmentFields"));

    var RedirectKeys_1 = __importDefault(require("./RedirectKeys"));

    var StitchRedirectError_1 = __importDefault(require("./StitchRedirectError"));

    var StitchUserFactoryImpl_1 = __importDefault(require("./StitchUserFactoryImpl"));

    var alphaNumericCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    var StitchAuthImpl = function (_super) {
      __extends(StitchAuthImpl, _super);

      function StitchAuthImpl(requestClient, browserAuthRoutes, authStorage, appInfo, jsdomWindow) {
        if (jsdomWindow === void 0) {
          jsdomWindow = window;
        }

        var _this = _super.call(this, requestClient, browserAuthRoutes, authStorage) || this;

        _this.browserAuthRoutes = browserAuthRoutes;
        _this.authStorage = authStorage;
        _this.appInfo = appInfo;
        _this.jsdomWindow = jsdomWindow;
        _this.listeners = new Set();
        return _this;
      }

      Object.defineProperty(StitchAuthImpl.prototype, "userFactory", {
        get: function get() {
          return new StitchUserFactoryImpl_1.default(this);
        },
        enumerable: true,
        configurable: true
      });

      StitchAuthImpl.prototype.getProviderClient = function (factory, providerName) {
        if (isAuthProviderClientFactory(factory)) {
          return factory.getClient(this, this.requestClient, this.authRoutes);
        } else {
          return factory.getNamedClient(providerName, this.requestClient, this.authRoutes);
        }
      };

      StitchAuthImpl.prototype.loginWithCredential = function (credential) {
        return _super.prototype.loginWithCredentialInternal.call(this, credential);
      };

      StitchAuthImpl.prototype.loginWithRedirect = function (credential) {
        var _this = this;

        var _a = this.prepareRedirect(credential),
            redirectUrl = _a.redirectUrl,
            state = _a.state;

        this.requestClient.getBaseURL().then(function (baseUrl) {
          _this.jsdomWindow.location.replace(baseUrl + _this.browserAuthRoutes.getAuthProviderRedirectRoute(credential, redirectUrl, state, _this.deviceInfo));
        });
      };

      StitchAuthImpl.prototype.linkWithRedirectInternal = function (user, credential) {
        var _this = this;

        if (this.user !== undefined && user.id !== this.user.id) {
          return Promise.reject(new mongodb_stitch_core_sdk_1.StitchClientError(mongodb_stitch_core_sdk_1.StitchClientErrorCode.UserNoLongerValid));
        }

        var _a = this.prepareRedirect(credential),
            redirectUrl = _a.redirectUrl,
            state = _a.state;

        return this.requestClient.getBaseURL().then(function (baseUrl) {
          var link = baseUrl + _this.browserAuthRoutes.getAuthProviderLinkRedirectRoute(credential, redirectUrl, state, _this.deviceInfo);

          return (StitchAuthImpl.injectedFetch ? StitchAuthImpl.injectedFetch : fetch)(new Request(link, {
            credentials: "include",
            headers: {
              Authorization: "Bearer " + _this.authInfo.accessToken
            },
            mode: 'cors'
          }));
        }).then(function (response) {
          _this.jsdomWindow.location.replace(response.headers.get("X-Stitch-Location"));
        });
      };

      StitchAuthImpl.prototype.hasRedirectResult = function () {
        var isValid = false;

        try {
          isValid = this.parseRedirect().isValid;
          return isValid;
        } catch (_) {
          return false;
        } finally {
          if (!isValid) {
            this.cleanupRedirect();
          }
        }
      };

      StitchAuthImpl.prototype.handleRedirectResult = function () {
        try {
          var providerName = this.authStorage.get(RedirectKeys_1.default.ProviderName);
          var providerType = this.authStorage.get(RedirectKeys_1.default.ProviderType);
          var redirectFragment = this.parseRedirect();
          return this.loginWithCredentialInternal(new mongodb_stitch_core_sdk_1.StitchAuthResponseCredential(this.processRedirectResult(redirectFragment), providerType, providerName, redirectFragment.asLink)).then(function (user) {
            return user;
          });
        } catch (err) {
          return Promise.reject(err);
        }
      };

      StitchAuthImpl.prototype.linkWithCredential = function (user, credential) {
        return _super.prototype.linkUserWithCredentialInternal.call(this, user, credential);
      };

      StitchAuthImpl.prototype.logout = function () {
        return Promise.resolve(_super.prototype.logoutInternal.call(this));
      };

      Object.defineProperty(StitchAuthImpl.prototype, "deviceInfo", {
        get: function get() {
          var info = {};

          if (this.hasDeviceId) {
            info[mongodb_stitch_core_sdk_1.DeviceFields.DEVICE_ID] = this.deviceId;
          }

          if (this.appInfo.localAppName !== undefined) {
            info[mongodb_stitch_core_sdk_1.DeviceFields.APP_ID] = this.appInfo.localAppName;
          }

          if (this.appInfo.localAppVersion !== undefined) {
            info[mongodb_stitch_core_sdk_1.DeviceFields.APP_VERSION] = this.appInfo.localAppVersion;
          }

          var browser = detect_browser_1.detect();

          if (browser) {
            info[mongodb_stitch_core_sdk_1.DeviceFields.PLATFORM] = browser.name;
            info[mongodb_stitch_core_sdk_1.DeviceFields.PLATFORM_VERSION] = browser.version;
          } else {
            info[mongodb_stitch_core_sdk_1.DeviceFields.PLATFORM] = "web";
            info[mongodb_stitch_core_sdk_1.DeviceFields.PLATFORM_VERSION] = "0.0.0";
          }

          info[mongodb_stitch_core_sdk_1.DeviceFields.SDK_VERSION] = Version_1.default;
          return info;
        },
        enumerable: true,
        configurable: true
      });

      StitchAuthImpl.prototype.addAuthListener = function (listener) {
        this.listeners.add(listener);
        this.onAuthEvent(listener);
      };

      StitchAuthImpl.prototype.removeAuthListener = function (listener) {
        this.listeners.delete(listener);
      };

      StitchAuthImpl.prototype.onAuthEvent = function (listener) {
        var _this = this;

        if (listener) {
          var auth_1 = this;

          var _1 = new Promise(function (resolve) {
            listener.onAuthEvent(auth_1);
            resolve(undefined);
          });
        } else {
          this.listeners.forEach(function (one) {
            _this.onAuthEvent(one);
          });
        }
      };

      StitchAuthImpl.prototype.cleanupRedirect = function () {
        this.jsdomWindow.history.replaceState(null, "", this.pageRootUrl());
        this.authStorage.remove(RedirectKeys_1.default.State);
        this.authStorage.remove(RedirectKeys_1.default.ProviderName);
        this.authStorage.remove(RedirectKeys_1.default.ProviderType);
      };

      StitchAuthImpl.prototype.parseRedirect = function () {
        if (typeof this.jsdomWindow === "undefined") {
          throw new StitchRedirectError_1.default("running in a non-browser environment");
        }

        if (!this.jsdomWindow.location || !this.jsdomWindow.location.hash) {
          throw new StitchRedirectError_1.default("window location hash was undefined");
        }

        var ourState = this.authStorage.get(RedirectKeys_1.default.State);
        var redirectFragment = this.jsdomWindow.location.hash.substring(1);
        return parseRedirectFragment(redirectFragment, ourState, this.appInfo.clientAppId);
      };

      StitchAuthImpl.prototype.processRedirectResult = function (redirectFragment) {
        try {
          if (!redirectFragment.isValid) {
            throw new StitchRedirectError_1.default("invalid redirect result");
          }

          if (redirectFragment.lastError) {
            throw new StitchRedirectError_1.default("error handling redirect: " + redirectFragment.lastError);
          }

          if (!redirectFragment.authInfo) {
            throw new StitchRedirectError_1.default("no user auth value was found: it could not be decoded from fragment");
          }
        } catch (err) {
          throw err;
        } finally {
          this.cleanupRedirect();
        }

        return redirectFragment.authInfo;
      };

      StitchAuthImpl.prototype.prepareRedirect = function (credential) {
        this.authStorage.set(RedirectKeys_1.default.ProviderName, credential.providerName);
        this.authStorage.set(RedirectKeys_1.default.ProviderType, credential.providerType);
        var redirectUrl = credential.redirectUrl;

        if (redirectUrl === undefined) {
          redirectUrl = this.pageRootUrl();
        }

        var state = generateState();
        this.authStorage.set(RedirectKeys_1.default.State, state);
        return {
          redirectUrl: redirectUrl,
          state: state
        };
      };

      StitchAuthImpl.prototype.pageRootUrl = function () {
        return [this.jsdomWindow.location.protocol, "//", this.jsdomWindow.location.host, this.jsdomWindow.location.pathname].join("");
      };

      return StitchAuthImpl;
    }(mongodb_stitch_core_sdk_1.CoreStitchAuth);

    exports.default = StitchAuthImpl;

    function generateState() {
      var state = "";

      for (var i = 0; i < 64; ++i) {
        state += alphaNumericCharacters.charAt(Math.floor(Math.random() * alphaNumericCharacters.length));
      }

      return state;
    }

    function unmarshallUserAuth(data) {
      var parts = data.split("$");

      if (parts.length !== 4) {
        throw new StitchRedirectError_1.default("invalid user auth data provided while " + "marshalling user authentication data: " + data);
      }

      var accessToken = parts[0],
          refreshToken = parts[1],
          userId = parts[2],
          deviceId = parts[3];
      return new mongodb_stitch_core_sdk_1.AuthInfo(userId, deviceId, accessToken, refreshToken);
    }

    var ParsedRedirectFragment = function () {
      function ParsedRedirectFragment() {
        this.stateValid = false;
        this.clientAppIdValid = false;
        this.asLink = false;
      }

      Object.defineProperty(ParsedRedirectFragment.prototype, "isValid", {
        get: function get() {
          return this.stateValid && this.clientAppIdValid;
        },
        enumerable: true,
        configurable: true
      });
      return ParsedRedirectFragment;
    }();

    function parseRedirectFragment(fragment, ourState, ourClientAppId) {
      var vars = fragment.split("&");
      var result = new ParsedRedirectFragment();
      vars.forEach(function (kvp) {
        var pairParts = kvp.split("=");
        var pairKey = decodeURIComponent(pairParts[0]);

        switch (pairKey) {
          case RedirectFragmentFields_1.default.StitchError:
            result.lastError = decodeURIComponent(pairParts[1]);
            break;

          case RedirectFragmentFields_1.default.UserAuth:
            try {
              result.authInfo = unmarshallUserAuth(decodeURIComponent(pairParts[1]));
            } catch (e) {
              result.lastError = e;
            }

            break;

          case RedirectFragmentFields_1.default.StitchLink:
            if (pairParts[1] == "ok") {
              result.asLink = true;
            }

            break;

          case RedirectFragmentFields_1.default.State:
            var theirState = decodeURIComponent(pairParts[1]);

            if (ourState === theirState) {
              result.stateValid = true;
            }

            break;

          case RedirectFragmentFields_1.default.ClientAppId:
            var clientAppId = decodeURIComponent(pairParts[1]);

            if (ourClientAppId === clientAppId) {
              result.clientAppIdValid = true;
            }

            break;

          default:
            break;
        }
      });
      return result;
    }

    function isAuthProviderClientFactory(factory) {
      return factory.getClient !== undefined;
    }
  }, {
    "../../internal/common/Version": 28,
    "./RedirectFragmentFields": 12,
    "./RedirectKeys": 13,
    "./StitchRedirectError": 17,
    "./StitchUserFactoryImpl": 18,
    "cross-fetch/polyfill": 7,
    "detect-browser": 9,
    "mongodb-stitch-core-sdk": 87
  }],
  15: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");

    var StitchBrowserAppAuthRoutes = function (_super) {
      __extends(StitchBrowserAppAuthRoutes, _super);

      function StitchBrowserAppAuthRoutes(clientAppId) {
        return _super.call(this, clientAppId) || this;
      }

      StitchBrowserAppAuthRoutes.prototype.getAuthProviderRedirectRoute = function (credential, redirectUrl, state, deviceInfo) {
        return this.getAuthProviderLoginRoute(credential.providerName) + "?redirect=" + encodeURI(redirectUrl) + "&state=" + state + "&device=" + this.uriEncodeObject(deviceInfo);
      };

      StitchBrowserAppAuthRoutes.prototype.getAuthProviderLinkRedirectRoute = function (credential, redirectUrl, state, deviceInfo) {
        return this.getAuthProviderLoginRoute(credential.providerName) + "?redirect=" + encodeURI(redirectUrl) + "&state=" + state + "&device=" + this.uriEncodeObject(deviceInfo) + "&link=true&providerRedirectHeader=true";
      };

      StitchBrowserAppAuthRoutes.prototype.uriEncodeObject = function (obj) {
        return encodeURIComponent(mongodb_stitch_core_sdk_1.base64Encode(JSON.stringify(obj)));
      };

      return StitchBrowserAppAuthRoutes;
    }(mongodb_stitch_core_sdk_1.StitchAppAuthRoutes);

    exports.default = StitchBrowserAppAuthRoutes;
  }, {
    "mongodb-stitch-core-sdk": 87
  }],
  16: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");

    var StitchBrowserAppAuthRoutes_1 = __importDefault(require("./StitchBrowserAppAuthRoutes"));

    var StitchBrowserAppRoutes = function (_super) {
      __extends(StitchBrowserAppRoutes, _super);

      function StitchBrowserAppRoutes(clientAppId) {
        var _this = _super.call(this, clientAppId) || this;

        _this.authRoutes = new StitchBrowserAppAuthRoutes_1.default(clientAppId);
        return _this;
      }

      return StitchBrowserAppRoutes;
    }(mongodb_stitch_core_sdk_1.StitchAppRoutes);

    exports.default = StitchBrowserAppRoutes;
  }, {
    "./StitchBrowserAppAuthRoutes": 15,
    "mongodb-stitch-core-sdk": 87
  }],
  17: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");

    var StitchRedirectError = function (_super) {
      __extends(StitchRedirectError, _super);

      function StitchRedirectError(msg) {
        return _super.call(this, msg) || this;
      }

      return StitchRedirectError;
    }(mongodb_stitch_core_sdk_1.StitchError);

    exports.default = StitchRedirectError;
  }, {
    "mongodb-stitch-core-sdk": 87
  }],
  18: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var StitchUserImpl_1 = __importDefault(require("./StitchUserImpl"));

    var StitchUserFactoryImpl = function () {
      function StitchUserFactoryImpl(auth) {
        this.auth = auth;
      }

      StitchUserFactoryImpl.prototype.makeUser = function (id, loggedInProviderType, loggedInProviderName, userProfile) {
        return new StitchUserImpl_1.default(id, loggedInProviderType, loggedInProviderName, userProfile, this.auth);
      };

      return StitchUserFactoryImpl;
    }();

    exports.default = StitchUserFactoryImpl;
  }, {
    "./StitchUserImpl": 19
  }],
  19: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");

    var StitchUserImpl = function (_super) {
      __extends(StitchUserImpl, _super);

      function StitchUserImpl(id, loggedInProviderType, loggedInProviderName, profile, auth) {
        var _this = _super.call(this, id, loggedInProviderType, loggedInProviderName, profile) || this;

        _this.auth = auth;
        return _this;
      }

      StitchUserImpl.prototype.linkWithCredential = function (credential) {
        return this.auth.linkWithCredential(this, credential);
      };

      StitchUserImpl.prototype.linkUserWithRedirect = function (credential) {
        return this.auth.linkWithRedirectInternal(this, credential);
      };

      return StitchUserImpl;
    }(mongodb_stitch_core_sdk_1.CoreStitchUserImpl);

    exports.default = StitchUserImpl;
  }, {
    "mongodb-stitch-core-sdk": 87
  }],
  20: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");

    var FacebookRedirectCredential = function () {
      function FacebookRedirectCredential(redirectUrl, providerName, providerType) {
        if (providerName === void 0) {
          providerName = mongodb_stitch_core_sdk_1.FacebookAuthProvider.DEFAULT_NAME;
        }

        if (providerType === void 0) {
          providerType = mongodb_stitch_core_sdk_1.FacebookAuthProvider.TYPE;
        }

        this.redirectUrl = redirectUrl;
        this.providerName = providerName;
        this.providerType = providerType;
      }

      return FacebookRedirectCredential;
    }();

    exports.default = FacebookRedirectCredential;
  }, {
    "mongodb-stitch-core-sdk": 87
  }],
  21: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");

    var GoogleRedirectCredential = function () {
      function GoogleRedirectCredential(redirectUrl, providerName, providerType) {
        if (providerName === void 0) {
          providerName = mongodb_stitch_core_sdk_1.GoogleAuthProvider.DEFAULT_NAME;
        }

        if (providerType === void 0) {
          providerType = mongodb_stitch_core_sdk_1.GoogleAuthProvider.TYPE;
        }

        this.redirectUrl = redirectUrl;
        this.providerName = providerName;
        this.providerType = providerType;
      }

      return GoogleRedirectCredential;
    }();

    exports.default = GoogleRedirectCredential;
  }, {
    "mongodb-stitch-core-sdk": 87
  }],
  22: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var UserApiKeyAuthProviderClientImpl_1 = __importDefault(require("./internal/UserApiKeyAuthProviderClientImpl"));

    var UserApiKeyAuthProviderClient;

    (function (UserApiKeyAuthProviderClient) {
      UserApiKeyAuthProviderClient.factory = new (function () {
        function class_1() {}

        class_1.prototype.getClient = function (authRequestClient, requestClient, routes) {
          return new UserApiKeyAuthProviderClientImpl_1.default(authRequestClient, routes);
        };

        return class_1;
      }())();
    })(UserApiKeyAuthProviderClient = exports.UserApiKeyAuthProviderClient || (exports.UserApiKeyAuthProviderClient = {}));
  }, {
    "./internal/UserApiKeyAuthProviderClientImpl": 23
  }],
  23: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");

    var UserApiKeyAuthProviderClientImpl = function (_super) {
      __extends(UserApiKeyAuthProviderClientImpl, _super);

      function UserApiKeyAuthProviderClientImpl(requestClient, routes) {
        return _super.call(this, requestClient, routes) || this;
      }

      UserApiKeyAuthProviderClientImpl.prototype.createApiKey = function (name) {
        return _super.prototype.createApiKey.call(this, name);
      };

      UserApiKeyAuthProviderClientImpl.prototype.fetchApiKey = function (keyId) {
        return _super.prototype.fetchApiKey.call(this, keyId);
      };

      UserApiKeyAuthProviderClientImpl.prototype.fetchApiKeys = function () {
        return _super.prototype.fetchApiKeys.call(this);
      };

      UserApiKeyAuthProviderClientImpl.prototype.deleteApiKey = function (keyId) {
        return _super.prototype.deleteApiKey.call(this, keyId);
      };

      UserApiKeyAuthProviderClientImpl.prototype.enableApiKey = function (keyId) {
        return _super.prototype.enableApiKey.call(this, keyId);
      };

      UserApiKeyAuthProviderClientImpl.prototype.disableApiKey = function (keyId) {
        return _super.prototype.disableApiKey.call(this, keyId);
      };

      return UserApiKeyAuthProviderClientImpl;
    }(mongodb_stitch_core_sdk_1.CoreUserApiKeyAuthProviderClient);

    exports.default = UserApiKeyAuthProviderClientImpl;
  }, {
    "mongodb-stitch-core-sdk": 87
  }],
  24: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var UserPasswordAuthProviderClientImpl_1 = __importDefault(require("./internal/UserPasswordAuthProviderClientImpl"));

    var UserPasswordAuthProviderClient;

    (function (UserPasswordAuthProviderClient) {
      UserPasswordAuthProviderClient.factory = new (function () {
        function class_1() {}

        class_1.prototype.getClient = function (authRequestClient, requestClient, routes) {
          return new UserPasswordAuthProviderClientImpl_1.default(requestClient, routes);
        };

        return class_1;
      }())();
    })(UserPasswordAuthProviderClient = exports.UserPasswordAuthProviderClient || (exports.UserPasswordAuthProviderClient = {}));
  }, {
    "./internal/UserPasswordAuthProviderClientImpl": 25
  }],
  25: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");

    var UserPasswordAuthProviderClientImpl = function (_super) {
      __extends(UserPasswordAuthProviderClientImpl, _super);

      function UserPasswordAuthProviderClientImpl(requestClient, routes) {
        return _super.call(this, mongodb_stitch_core_sdk_1.UserPasswordAuthProvider.DEFAULT_NAME, requestClient, routes) || this;
      }

      UserPasswordAuthProviderClientImpl.prototype.registerWithEmail = function (email, password) {
        return _super.prototype.registerWithEmailInternal.call(this, email, password);
      };

      UserPasswordAuthProviderClientImpl.prototype.confirmUser = function (token, tokenId) {
        return _super.prototype.confirmUserInternal.call(this, token, tokenId);
      };

      UserPasswordAuthProviderClientImpl.prototype.resendConfirmationEmail = function (email) {
        return _super.prototype.resendConfirmationEmailInternal.call(this, email);
      };

      UserPasswordAuthProviderClientImpl.prototype.resetPassword = function (token, tokenId, password) {
        return _super.prototype.resetPasswordInternal.call(this, token, tokenId, password);
      };

      UserPasswordAuthProviderClientImpl.prototype.sendResetPasswordEmail = function (email) {
        return _super.prototype.sendResetPasswordEmailInternal.call(this, email);
      };

      return UserPasswordAuthProviderClientImpl;
    }(mongodb_stitch_core_sdk_1.CoreUserPassAuthProviderClient);

    exports.default = UserPasswordAuthProviderClientImpl;
  }, {
    "mongodb-stitch-core-sdk": 87
  }],
  26: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");

    var StitchAuthImpl_1 = __importDefault(require("../auth/internal/StitchAuthImpl"));

    var StitchBrowserAppRoutes_1 = __importDefault(require("../auth/internal/StitchBrowserAppRoutes"));

    var StitchServiceClientImpl_1 = __importDefault(require("../../services/internal/StitchServiceClientImpl"));

    var StitchAppClientImpl = function () {
      function StitchAppClientImpl(clientAppId, config) {
        this.info = new mongodb_stitch_core_sdk_1.StitchAppClientInfo(clientAppId, config.dataDirectory, config.localAppName, config.localAppVersion);
        this.routes = new StitchBrowserAppRoutes_1.default(this.info.clientAppId);
        var requestClient = new mongodb_stitch_core_sdk_1.StitchAppRequestClient(clientAppId, config.baseUrl, config.transport);
        this.auth = new StitchAuthImpl_1.default(requestClient, this.routes.authRoutes, config.storage, this.info);
        this.coreClient = new mongodb_stitch_core_sdk_1.CoreStitchAppClient(this.auth, this.routes);
      }

      StitchAppClientImpl.prototype.getServiceClient = function (factory, serviceName) {
        if (isServiceClientFactory(factory)) {
          return factory.getClient(new mongodb_stitch_core_sdk_1.CoreStitchServiceClientImpl(this.auth, this.routes.serviceRoutes, ""), this.info);
        } else {
          return factory.getNamedClient(new mongodb_stitch_core_sdk_1.CoreStitchServiceClientImpl(this.auth, this.routes.serviceRoutes, serviceName), this.info);
        }
      };

      StitchAppClientImpl.prototype.getGeneralServiceClient = function (serviceName) {
        return new StitchServiceClientImpl_1.default(new mongodb_stitch_core_sdk_1.CoreStitchServiceClientImpl(this.auth, this.routes.serviceRoutes, serviceName));
      };

      StitchAppClientImpl.prototype.callFunction = function (name, args) {
        return this.coreClient.callFunction(name, args);
      };

      return StitchAppClientImpl;
    }();

    exports.default = StitchAppClientImpl;

    function isServiceClientFactory(factory) {
      return factory.getClient !== undefined;
    }
  }, {
    "../../services/internal/StitchServiceClientImpl": 32,
    "../auth/internal/StitchAuthImpl": 14,
    "../auth/internal/StitchBrowserAppRoutes": 16,
    "mongodb-stitch-core-sdk": 87
  }],
  27: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var stitchPrefixKey = "__stitch.client";

    var LocalStorage = function () {
      function LocalStorage(suiteName) {
        this.suiteName = suiteName;
      }

      LocalStorage.prototype.getKey = function (forKey) {
        return stitchPrefixKey + "." + this.suiteName + "." + forKey;
      };

      LocalStorage.prototype.get = function (key) {
        return localStorage.getItem(this.getKey(key));
      };

      LocalStorage.prototype.set = function (key, value) {
        localStorage.setItem(this.getKey(key), value);
      };

      LocalStorage.prototype.remove = function (key) {
        localStorage.removeItem(this.getKey(key));
      };

      return LocalStorage;
    }();

    exports.default = LocalStorage;
  }, {}],
  28: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var version = "4.2.0";
    exports.default = version;
  }, {}],
  29: [function (require, module, exports) {
    "use strict";

    var __assign = this && this.__assign || Object.assign || function (t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];

        for (var p in s) {
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
      }

      return t;
    };

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");

    var EventSourceEventStream_1 = __importDefault(require("./EventSourceEventStream"));

    var cross_fetch_1 = __importDefault(require("cross-fetch"));

    var BrowserFetchStreamTransport = function () {
      function BrowserFetchStreamTransport() {}

      BrowserFetchStreamTransport.prototype.roundTrip = function (request) {
        var responsePromise = cross_fetch_1.default(request.url, {
          body: request.body,
          headers: request.headers,
          method: request.method,
          mode: 'cors'
        });
        var responseTextPromise = responsePromise.then(function (response) {
          return response.text();
        });
        return Promise.all([responsePromise, responseTextPromise]).then(function (values) {
          var response = values[0];
          var body = values[1];
          var headers = {};
          response.headers.forEach(function (value, key) {
            headers[key] = value;
          });
          return new mongodb_stitch_core_sdk_1.Response(headers, response.status, body);
        });
      };

      BrowserFetchStreamTransport.prototype.stream = function (request, open, retryRequest) {
        if (open === void 0) {
          open = true;
        }

        var headers = __assign({}, request.headers);

        headers[mongodb_stitch_core_sdk_1.Headers.ACCEPT] = mongodb_stitch_core_sdk_1.ContentTypes.TEXT_EVENT_STREAM;
        headers[mongodb_stitch_core_sdk_1.Headers.CONTENT_TYPE] = mongodb_stitch_core_sdk_1.ContentTypes.TEXT_EVENT_STREAM;
        return cross_fetch_1.default(request.url + "&stitch_validate=true", {
          body: request.body,
          headers: headers,
          method: request.method,
          mode: 'cors'
        }).then(function (response) {
          var headers = {};
          response.headers.forEach(function (value, key) {
            headers[key] = value;
          });

          if (response.status < 200 || response.status >= 300) {
            return response.text().then(function (body) {
              return mongodb_stitch_core_sdk_1.handleRequestError(new mongodb_stitch_core_sdk_1.Response(headers, response.status, body));
            });
          }

          return new Promise(function (resolve, reject) {
            new EventSourceEventStream_1.default(new EventSource(request.url), function (stream) {
              return resolve(stream);
            }, function (error) {
              return reject(error);
            }, retryRequest ? function () {
              return retryRequest().then(function (es) {
                return es;
              });
            } : undefined);
          });
        });
      };

      return BrowserFetchStreamTransport;
    }();

    exports.default = BrowserFetchStreamTransport;
  }, {
    "./EventSourceEventStream": 30,
    "cross-fetch": 8,
    "mongodb-stitch-core-sdk": 87
  }],
  30: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");

    var EventSourceEventStream = function (_super) {
      __extends(EventSourceEventStream, _super);

      function EventSourceEventStream(evtSrc, onOpen, onOpenError, reconnecter) {
        var _this = _super.call(this, reconnecter) || this;

        _this.evtSrc = evtSrc;
        _this.onOpenError = onOpenError;
        _this.openedOnce = false;

        _this.evtSrc.onopen = function (e) {
          onOpen(_this);
          _this.openedOnce = true;
        };

        _this.reset();

        return _this;
      }

      EventSourceEventStream.prototype.open = function () {
        if (this.closed) {
          throw new mongodb_stitch_core_sdk_1.StitchClientError(mongodb_stitch_core_sdk_1.StitchClientErrorCode.StreamClosed);
        }
      };

      EventSourceEventStream.prototype.reset = function () {
        var _this = this;

        this.evtSrc.onmessage = function (e) {
          _this.events.push(new mongodb_stitch_core_sdk_1.Event(mongodb_stitch_core_sdk_1.Event.MESSAGE_EVENT, e.data));

          _this.poll();
        };

        this.evtSrc.onerror = function (e) {
          if (e instanceof MessageEvent) {
            _this.lastErr = e.data;

            _this.events.push(new mongodb_stitch_core_sdk_1.Event(mongodb_stitch_core_sdk_1.StitchEvent.ERROR_EVENT_NAME, _this.lastErr));

            _this.close();

            _this.poll();

            return;
          }

          if (!_this.openedOnce) {
            _this.close();

            _this.onOpenError(new Error("event source failed to open and will not reconnect; check network log for more details"));

            return;
          }

          _this.evtSrc.close();

          _this.reconnect();
        };
      };

      EventSourceEventStream.prototype.onReconnect = function (next) {
        this.evtSrc = next.evtSrc;
        this.reset();
        this.events = next.events.concat(this.events);
      };

      EventSourceEventStream.prototype.afterClose = function () {
        this.evtSrc.close();
      };

      return EventSourceEventStream;
    }(mongodb_stitch_core_sdk_1.BaseEventStream);

    exports.default = EventSourceEventStream;
  }, {
    "mongodb-stitch-core-sdk": 87
  }],
  31: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");

    exports.AnonymousAuthProvider = mongodb_stitch_core_sdk_1.AnonymousAuthProvider;
    exports.AnonymousCredential = mongodb_stitch_core_sdk_1.AnonymousCredential;
    exports.BSON = mongodb_stitch_core_sdk_1.BSON;
    exports.CustomAuthProvider = mongodb_stitch_core_sdk_1.CustomAuthProvider;
    exports.CustomCredential = mongodb_stitch_core_sdk_1.CustomCredential;
    exports.FacebookAuthProvider = mongodb_stitch_core_sdk_1.FacebookAuthProvider;
    exports.FacebookCredential = mongodb_stitch_core_sdk_1.FacebookCredential;
    exports.GoogleAuthProvider = mongodb_stitch_core_sdk_1.GoogleAuthProvider;
    exports.GoogleCredential = mongodb_stitch_core_sdk_1.GoogleCredential;
    exports.MemoryStorage = mongodb_stitch_core_sdk_1.MemoryStorage;
    exports.ServerApiKeyAuthProvider = mongodb_stitch_core_sdk_1.ServerApiKeyAuthProvider;
    exports.ServerApiKeyCredential = mongodb_stitch_core_sdk_1.ServerApiKeyCredential;
    exports.StitchAppClientConfiguration = mongodb_stitch_core_sdk_1.StitchAppClientConfiguration;
    exports.StitchAppClientInfo = mongodb_stitch_core_sdk_1.StitchAppClientInfo;
    exports.StitchClientError = mongodb_stitch_core_sdk_1.StitchClientError;
    exports.StitchClientErrorCode = mongodb_stitch_core_sdk_1.StitchClientErrorCode;
    exports.StitchRequestError = mongodb_stitch_core_sdk_1.StitchRequestError;
    exports.StitchRequestErrorCode = mongodb_stitch_core_sdk_1.StitchRequestErrorCode;
    exports.StitchServiceError = mongodb_stitch_core_sdk_1.StitchServiceError;
    exports.StitchServiceErrorCode = mongodb_stitch_core_sdk_1.StitchServiceErrorCode;
    exports.StitchUserIdentity = mongodb_stitch_core_sdk_1.StitchUserIdentity;
    exports.Stream = mongodb_stitch_core_sdk_1.Stream;
    exports.UserApiKey = mongodb_stitch_core_sdk_1.UserApiKey;
    exports.UserApiKeyAuthProvider = mongodb_stitch_core_sdk_1.UserApiKeyAuthProvider;
    exports.UserApiKeyCredential = mongodb_stitch_core_sdk_1.UserApiKeyCredential;
    exports.UserPasswordAuthProvider = mongodb_stitch_core_sdk_1.UserPasswordAuthProvider;
    exports.UserPasswordCredential = mongodb_stitch_core_sdk_1.UserPasswordCredential;
    exports.UserType = mongodb_stitch_core_sdk_1.UserType;

    var FacebookRedirectCredential_1 = __importDefault(require("./core/auth/providers/facebook/FacebookRedirectCredential"));

    exports.FacebookRedirectCredential = FacebookRedirectCredential_1.default;

    var GoogleRedirectCredential_1 = __importDefault(require("./core/auth/providers/google/GoogleRedirectCredential"));

    exports.GoogleRedirectCredential = GoogleRedirectCredential_1.default;

    var UserApiKeyAuthProviderClient_1 = require("./core/auth/providers/userapikey/UserApiKeyAuthProviderClient");

    exports.UserApiKeyAuthProviderClient = UserApiKeyAuthProviderClient_1.UserApiKeyAuthProviderClient;

    var UserPasswordAuthProviderClient_1 = require("./core/auth/providers/userpassword/UserPasswordAuthProviderClient");

    exports.UserPasswordAuthProviderClient = UserPasswordAuthProviderClient_1.UserPasswordAuthProviderClient;

    var Stitch_1 = __importDefault(require("./core/Stitch"));

    exports.Stitch = Stitch_1.default;
  }, {
    "./core/Stitch": 11,
    "./core/auth/providers/facebook/FacebookRedirectCredential": 20,
    "./core/auth/providers/google/GoogleRedirectCredential": 21,
    "./core/auth/providers/userapikey/UserApiKeyAuthProviderClient": 22,
    "./core/auth/providers/userpassword/UserPasswordAuthProviderClient": 24,
    "mongodb-stitch-core-sdk": 87
  }],
  32: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var StitchServiceClientImpl = function () {
      function StitchServiceClientImpl(proxy) {
        this.proxy = proxy;
      }

      StitchServiceClientImpl.prototype.callFunction = function (name, args, codec) {
        return this.proxy.callFunction(name, args, codec);
      };

      StitchServiceClientImpl.prototype.streamFunction = function (name, args, codec) {
        return this.proxy.streamFunction(name, args, codec);
      };

      return StitchServiceClientImpl;
    }();

    exports.default = StitchServiceClientImpl;
  }, {}],
  33: [function (require, module, exports) {
    "use strict";

    function __export(m) {
      for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
      }
    }

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    __export(require("mongodb-stitch-browser-core"));

    __export(require("mongodb-stitch-browser-services-mongodb-remote"));
  }, {
    "mongodb-stitch-browser-core": 31,
    "mongodb-stitch-browser-services-mongodb-remote": 37
  }],
  34: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var mongodb_stitch_core_services_mongodb_remote_1 = require("mongodb-stitch-core-services-mongodb-remote");

    var RemoteMongoClientImpl_1 = __importDefault(require("./internal/RemoteMongoClientImpl"));

    var RemoteMongoClient;

    (function (RemoteMongoClient) {
      RemoteMongoClient.factory = new (function () {
        function class_1() {}

        class_1.prototype.getNamedClient = function (service, client) {
          return new RemoteMongoClientImpl_1.default(new mongodb_stitch_core_services_mongodb_remote_1.CoreRemoteMongoClientImpl(service));
        };

        return class_1;
      }())();
    })(RemoteMongoClient = exports.RemoteMongoClient || (exports.RemoteMongoClient = {}));
  }, {
    "./internal/RemoteMongoClientImpl": 38,
    "mongodb-stitch-core-services-mongodb-remote": 118
  }],
  35: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var RemoteMongoCursor = function () {
      function RemoteMongoCursor(proxy) {
        this.proxy = proxy;
      }

      RemoteMongoCursor.prototype.next = function () {
        return Promise.resolve(this.proxy.next().value);
      };

      return RemoteMongoCursor;
    }();

    exports.default = RemoteMongoCursor;
  }, {}],
  36: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var RemoteMongoCursor_1 = __importDefault(require("./RemoteMongoCursor"));

    var RemoteMongoReadOperation = function () {
      function RemoteMongoReadOperation(proxy) {
        this.proxy = proxy;
      }

      RemoteMongoReadOperation.prototype.first = function () {
        return this.proxy.first();
      };

      RemoteMongoReadOperation.prototype.toArray = function () {
        return this.proxy.toArray();
      };

      RemoteMongoReadOperation.prototype.asArray = function () {
        return this.toArray();
      };

      RemoteMongoReadOperation.prototype.iterator = function () {
        return this.proxy.iterator().then(function (res) {
          return new RemoteMongoCursor_1.default(res);
        });
      };

      return RemoteMongoReadOperation;
    }();

    exports.default = RemoteMongoReadOperation;
  }, {
    "./RemoteMongoCursor": 35
  }],
  37: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var mongodb_stitch_core_services_mongodb_remote_1 = require("mongodb-stitch-core-services-mongodb-remote");

    exports.RemoteInsertManyResult = mongodb_stitch_core_services_mongodb_remote_1.RemoteInsertManyResult;

    var RemoteMongoReadOperation_1 = __importDefault(require("./RemoteMongoReadOperation"));

    exports.RemoteMongoReadOperation = RemoteMongoReadOperation_1.default;

    var RemoteMongoClient_1 = require("./RemoteMongoClient");

    exports.RemoteMongoClient = RemoteMongoClient_1.RemoteMongoClient;
  }, {
    "./RemoteMongoClient": 34,
    "./RemoteMongoReadOperation": 36,
    "mongodb-stitch-core-services-mongodb-remote": 118
  }],
  38: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var RemoteMongoDatabaseImpl_1 = __importDefault(require("./RemoteMongoDatabaseImpl"));

    var RemoteMongoClientImpl = function () {
      function RemoteMongoClientImpl(proxy) {
        this.proxy = proxy;
      }

      RemoteMongoClientImpl.prototype.db = function (name) {
        return new RemoteMongoDatabaseImpl_1.default(this.proxy.db(name));
      };

      return RemoteMongoClientImpl;
    }();

    exports.default = RemoteMongoClientImpl;
  }, {
    "./RemoteMongoDatabaseImpl": 40
  }],
  39: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var RemoteMongoReadOperation_1 = __importDefault(require("../RemoteMongoReadOperation"));

    var RemoteMongoCollectionImpl = function () {
      function RemoteMongoCollectionImpl(proxy) {
        this.proxy = proxy;
        this.namespace = this.proxy.namespace;
      }

      RemoteMongoCollectionImpl.prototype.withCollectionType = function (codec) {
        return new RemoteMongoCollectionImpl(this.proxy.withCollectionType(codec));
      };

      RemoteMongoCollectionImpl.prototype.count = function (query, options) {
        return this.proxy.count(query, options);
      };

      RemoteMongoCollectionImpl.prototype.find = function (query, options) {
        return new RemoteMongoReadOperation_1.default(this.proxy.find(query, options));
      };

      RemoteMongoCollectionImpl.prototype.aggregate = function (pipeline) {
        return new RemoteMongoReadOperation_1.default(this.proxy.aggregate(pipeline));
      };

      RemoteMongoCollectionImpl.prototype.insertOne = function (doc) {
        return this.proxy.insertOne(doc);
      };

      RemoteMongoCollectionImpl.prototype.insertMany = function (docs) {
        return this.proxy.insertMany(docs);
      };

      RemoteMongoCollectionImpl.prototype.deleteOne = function (query) {
        return this.proxy.deleteOne(query);
      };

      RemoteMongoCollectionImpl.prototype.deleteMany = function (query) {
        return this.proxy.deleteMany(query);
      };

      RemoteMongoCollectionImpl.prototype.updateOne = function (query, update, updateOptions) {
        return this.proxy.updateOne(query, update, updateOptions);
      };

      RemoteMongoCollectionImpl.prototype.updateMany = function (query, update, updateOptions) {
        return this.proxy.updateMany(query, update, updateOptions);
      };

      RemoteMongoCollectionImpl.prototype.watch = function (ids) {
        return this.proxy.watch(ids);
      };

      return RemoteMongoCollectionImpl;
    }();

    exports.default = RemoteMongoCollectionImpl;
  }, {
    "../RemoteMongoReadOperation": 36
  }],
  40: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var RemoteMongoCollectionImpl_1 = __importDefault(require("./RemoteMongoCollectionImpl"));

    var RemoteMongoDatabaseImpl = function () {
      function RemoteMongoDatabaseImpl(proxy) {
        this.proxy = proxy;
        this.name = this.proxy.name;
      }

      RemoteMongoDatabaseImpl.prototype.collection = function (name, codec) {
        return new RemoteMongoCollectionImpl_1.default(this.proxy.collection(name, codec));
      };

      return RemoteMongoDatabaseImpl;
    }();

    exports.default = RemoteMongoDatabaseImpl;
  }, {
    "./RemoteMongoCollectionImpl": 39
  }],
  41: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var StitchClientConfiguration_1 = require("./StitchClientConfiguration");

    var StitchAppClientConfiguration = function (_super) {
      __extends(StitchAppClientConfiguration, _super);

      function StitchAppClientConfiguration(config, localAppName, localAppVersion) {
        var _this = _super.call(this, config.baseUrl, config.storage, config.dataDirectory, config.transport) || this;

        _this.localAppVersion = localAppVersion;
        _this.localAppName = localAppName;
        return _this;
      }

      StitchAppClientConfiguration.prototype.builder = function () {
        return new StitchAppClientConfiguration.Builder(this);
      };

      return StitchAppClientConfiguration;
    }(StitchClientConfiguration_1.StitchClientConfiguration);

    exports.StitchAppClientConfiguration = StitchAppClientConfiguration;

    (function (StitchAppClientConfiguration) {
      var Builder = function (_super) {
        __extends(Builder, _super);

        function Builder(config) {
          var _this = _super.call(this, config) || this;

          if (config) {
            _this.localAppVersion = config.localAppVersion;
            _this.localAppName = config.localAppName;
          }

          return _this;
        }

        Builder.prototype.withLocalAppName = function (localAppName) {
          this.localAppName = localAppName;
          return this;
        };

        Builder.prototype.withLocalAppVersion = function (localAppVersion) {
          this.localAppVersion = localAppVersion;
          return this;
        };

        Builder.prototype.build = function () {
          var config = _super.prototype.build.call(this);

          return new StitchAppClientConfiguration(config, this.localAppName, this.localAppVersion);
        };

        return Builder;
      }(StitchClientConfiguration_1.StitchClientConfiguration.Builder);

      StitchAppClientConfiguration.Builder = Builder;
    })(StitchAppClientConfiguration = exports.StitchAppClientConfiguration || (exports.StitchAppClientConfiguration = {}));

    exports.StitchAppClientConfiguration = StitchAppClientConfiguration;
  }, {
    "./StitchClientConfiguration": 43
  }],
  42: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var StitchAppClientInfo = function () {
      function StitchAppClientInfo(clientAppId, dataDirectory, localAppName, localAppVersion) {
        this.clientAppId = clientAppId;
        this.dataDirectory = dataDirectory;
        this.localAppName = localAppName;
        this.localAppVersion = localAppVersion;
      }

      return StitchAppClientInfo;
    }();

    exports.default = StitchAppClientInfo;
  }, {}],
  43: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var StitchClientConfiguration = function () {
      function StitchClientConfiguration(baseUrl, storage, dataDirectory, transport) {
        this.baseUrl = baseUrl;
        this.storage = storage;
        this.dataDirectory = dataDirectory;
        this.transport = transport;
      }

      StitchClientConfiguration.prototype.builder = function () {
        return new StitchClientConfiguration.Builder(this);
      };

      return StitchClientConfiguration;
    }();

    exports.StitchClientConfiguration = StitchClientConfiguration;

    (function (StitchClientConfiguration) {
      var Builder = function () {
        function Builder(config) {
          if (config) {
            this.baseUrl = config.baseUrl;
            this.storage = config.storage;
            this.dataDirectory = config.dataDirectory;
            this.transport = config.transport;
          }
        }

        Builder.prototype.withBaseUrl = function (baseUrl) {
          this.baseUrl = baseUrl;
          return this;
        };

        Builder.prototype.withStorage = function (storage) {
          this.storage = storage;
          return this;
        };

        Builder.prototype.withDataDirectory = function (dataDirectory) {
          this.dataDirectory = dataDirectory;
          return this;
        };

        Builder.prototype.withTransport = function (transport) {
          this.transport = transport;
          return this;
        };

        Builder.prototype.build = function () {
          return new StitchClientConfiguration(this.baseUrl, this.storage, this.dataDirectory, this.transport);
        };

        return Builder;
      }();

      StitchClientConfiguration.Builder = Builder;
    })(StitchClientConfiguration = exports.StitchClientConfiguration || (exports.StitchClientConfiguration = {}));

    exports.StitchClientConfiguration = StitchClientConfiguration;
  }, {}],
  44: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var StitchClientErrorCode_1 = require("./StitchClientErrorCode");

    var StitchError_1 = __importDefault(require("./StitchError"));

    var StitchClientError = function (_super) {
      __extends(StitchClientError, _super);

      function StitchClientError(errorCode) {
        var _this = this;

        var message = "(" + StitchClientErrorCode_1.StitchClientErrorCode[errorCode] + "): " + StitchClientErrorCode_1.clientErrorCodeDescs[errorCode];
        _this = _super.call(this, message) || this;
        _this.errorCode = errorCode;
        _this.errorCodeName = StitchClientErrorCode_1.StitchClientErrorCode[errorCode];
        return _this;
      }

      return StitchClientError;
    }(StitchError_1.default);

    exports.default = StitchClientError;
  }, {
    "./StitchClientErrorCode": 45,
    "./StitchError": 46
  }],
  45: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _a;

    var StitchClientErrorCode;

    (function (StitchClientErrorCode) {
      StitchClientErrorCode[StitchClientErrorCode["LoggedOutDuringRequest"] = 0] = "LoggedOutDuringRequest";
      StitchClientErrorCode[StitchClientErrorCode["MustAuthenticateFirst"] = 1] = "MustAuthenticateFirst";
      StitchClientErrorCode[StitchClientErrorCode["UserNoLongerValid"] = 2] = "UserNoLongerValid";
      StitchClientErrorCode[StitchClientErrorCode["CouldNotLoadPersistedAuthInfo"] = 3] = "CouldNotLoadPersistedAuthInfo";
      StitchClientErrorCode[StitchClientErrorCode["CouldNotPersistAuthInfo"] = 4] = "CouldNotPersistAuthInfo";
      StitchClientErrorCode[StitchClientErrorCode["StreamingNotSupported"] = 5] = "StreamingNotSupported";
      StitchClientErrorCode[StitchClientErrorCode["StreamClosed"] = 6] = "StreamClosed";
    })(StitchClientErrorCode = exports.StitchClientErrorCode || (exports.StitchClientErrorCode = {}));

    exports.clientErrorCodeDescs = (_a = {}, _a[StitchClientErrorCode.LoggedOutDuringRequest] = "logged out while making a request to Stitch", _a[StitchClientErrorCode.MustAuthenticateFirst] = "method called requires being authenticated", _a[StitchClientErrorCode.UserNoLongerValid] = "user instance being accessed is no longer valid; please get a new user with auth.getUser()", _a[StitchClientErrorCode.CouldNotLoadPersistedAuthInfo] = "failed to load stored auth information for Stitch", _a[StitchClientErrorCode.CouldNotPersistAuthInfo] = "failed to save auth information for Stitch", _a[StitchClientErrorCode.StreamingNotSupported] = "streaming not supported in this SDK", _a[StitchClientErrorCode.StreamClosed] = "stream is closed", _a);
  }, {}],
  46: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _Error = function _Error(message) {
      Error.call(this, message);

      if (Error.captureStackTrace) {
        Error.captureStackTrace(this);
      }

      this.message = message;
      this.name = this.constructor.name;
    };

    _Error.prototype = Object.create(Error.prototype);

    var StitchError = function (_super) {
      __extends(StitchError, _super);

      function StitchError() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      return StitchError;
    }(_Error);

    exports.default = StitchError;
  }, {}],
  47: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var StitchError_1 = __importDefault(require("./StitchError"));

    var StitchRequestErrorCode_1 = require("./StitchRequestErrorCode");

    var StitchRequestError = function (_super) {
      __extends(StitchRequestError, _super);

      function StitchRequestError(underlyingError, errorCode) {
        var _this = this;

        var message = "(" + StitchRequestErrorCode_1.StitchRequestErrorCode[errorCode] + "): " + StitchRequestErrorCode_1.requestErrorCodeDescs[errorCode] + ": " + underlyingError.message;
        _this = _super.call(this, message) || this;
        _this.underlyingError = underlyingError;
        _this.errorCode = errorCode;
        _this.errorCodeName = StitchRequestErrorCode_1.StitchRequestErrorCode[errorCode];
        return _this;
      }

      return StitchRequestError;
    }(StitchError_1.default);

    exports.default = StitchRequestError;
  }, {
    "./StitchError": 46,
    "./StitchRequestErrorCode": 48
  }],
  48: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _a;

    var StitchRequestErrorCode;

    (function (StitchRequestErrorCode) {
      StitchRequestErrorCode[StitchRequestErrorCode["TRANSPORT_ERROR"] = 0] = "TRANSPORT_ERROR";
      StitchRequestErrorCode[StitchRequestErrorCode["DECODING_ERROR"] = 1] = "DECODING_ERROR";
      StitchRequestErrorCode[StitchRequestErrorCode["ENCODING_ERROR"] = 2] = "ENCODING_ERROR";
    })(StitchRequestErrorCode = exports.StitchRequestErrorCode || (exports.StitchRequestErrorCode = {}));

    exports.requestErrorCodeDescs = (_a = {}, _a[StitchRequestErrorCode.TRANSPORT_ERROR] = "the request transport encountered an error communicating with Stitch", _a[StitchRequestErrorCode.DECODING_ERROR] = "an error occurred while decoding a response from Stitch", _a[StitchRequestErrorCode.ENCODING_ERROR] = "an error occurred while encoding a request for Stitch", _a);
  }, {}],
  49: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var StitchError_1 = __importDefault(require("./StitchError"));

    var StitchServiceErrorCode_1 = require("./StitchServiceErrorCode");

    var StitchServiceError = function (_super) {
      __extends(StitchServiceError, _super);

      function StitchServiceError(message, errorCode) {
        if (errorCode === void 0) {
          errorCode = StitchServiceErrorCode_1.StitchServiceErrorCode.Unknown;
        }

        var _this = _super.call(this, message) || this;

        _this.message = message;
        _this.errorCode = errorCode;
        _this.errorCodeName = StitchServiceErrorCode_1.StitchServiceErrorCode[errorCode];
        return _this;
      }

      return StitchServiceError;
    }(StitchError_1.default);

    exports.default = StitchServiceError;
  }, {
    "./StitchError": 46,
    "./StitchServiceErrorCode": 50
  }],
  50: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var StitchServiceErrorCode;

    (function (StitchServiceErrorCode) {
      StitchServiceErrorCode[StitchServiceErrorCode["MissingAuthReq"] = 0] = "MissingAuthReq";
      StitchServiceErrorCode[StitchServiceErrorCode["InvalidSession"] = 1] = "InvalidSession";
      StitchServiceErrorCode[StitchServiceErrorCode["UserAppDomainMismatch"] = 2] = "UserAppDomainMismatch";
      StitchServiceErrorCode[StitchServiceErrorCode["DomainNotAllowed"] = 3] = "DomainNotAllowed";
      StitchServiceErrorCode[StitchServiceErrorCode["ReadSizeLimitExceeded"] = 4] = "ReadSizeLimitExceeded";
      StitchServiceErrorCode[StitchServiceErrorCode["InvalidParameter"] = 5] = "InvalidParameter";
      StitchServiceErrorCode[StitchServiceErrorCode["MissingParameter"] = 6] = "MissingParameter";
      StitchServiceErrorCode[StitchServiceErrorCode["TwilioError"] = 7] = "TwilioError";
      StitchServiceErrorCode[StitchServiceErrorCode["GCMError"] = 8] = "GCMError";
      StitchServiceErrorCode[StitchServiceErrorCode["HTTPError"] = 9] = "HTTPError";
      StitchServiceErrorCode[StitchServiceErrorCode["AWSError"] = 10] = "AWSError";
      StitchServiceErrorCode[StitchServiceErrorCode["MongoDBError"] = 11] = "MongoDBError";
      StitchServiceErrorCode[StitchServiceErrorCode["ArgumentsNotAllowed"] = 12] = "ArgumentsNotAllowed";
      StitchServiceErrorCode[StitchServiceErrorCode["FunctionExecutionError"] = 13] = "FunctionExecutionError";
      StitchServiceErrorCode[StitchServiceErrorCode["NoMatchingRuleFound"] = 14] = "NoMatchingRuleFound";
      StitchServiceErrorCode[StitchServiceErrorCode["InternalServerError"] = 15] = "InternalServerError";
      StitchServiceErrorCode[StitchServiceErrorCode["AuthProviderNotFound"] = 16] = "AuthProviderNotFound";
      StitchServiceErrorCode[StitchServiceErrorCode["AuthProviderAlreadyExists"] = 17] = "AuthProviderAlreadyExists";
      StitchServiceErrorCode[StitchServiceErrorCode["ServiceNotFound"] = 18] = "ServiceNotFound";
      StitchServiceErrorCode[StitchServiceErrorCode["ServiceTypeNotFound"] = 19] = "ServiceTypeNotFound";
      StitchServiceErrorCode[StitchServiceErrorCode["ServiceAlreadyExists"] = 20] = "ServiceAlreadyExists";
      StitchServiceErrorCode[StitchServiceErrorCode["ServiceCommandNotFound"] = 21] = "ServiceCommandNotFound";
      StitchServiceErrorCode[StitchServiceErrorCode["ValueNotFound"] = 22] = "ValueNotFound";
      StitchServiceErrorCode[StitchServiceErrorCode["ValueAlreadyExists"] = 23] = "ValueAlreadyExists";
      StitchServiceErrorCode[StitchServiceErrorCode["ValueDuplicateName"] = 24] = "ValueDuplicateName";
      StitchServiceErrorCode[StitchServiceErrorCode["FunctionNotFound"] = 25] = "FunctionNotFound";
      StitchServiceErrorCode[StitchServiceErrorCode["FunctionAlreadyExists"] = 26] = "FunctionAlreadyExists";
      StitchServiceErrorCode[StitchServiceErrorCode["FunctionDuplicateName"] = 27] = "FunctionDuplicateName";
      StitchServiceErrorCode[StitchServiceErrorCode["FunctionSyntaxError"] = 28] = "FunctionSyntaxError";
      StitchServiceErrorCode[StitchServiceErrorCode["FunctionInvalid"] = 29] = "FunctionInvalid";
      StitchServiceErrorCode[StitchServiceErrorCode["IncomingWebhookNotFound"] = 30] = "IncomingWebhookNotFound";
      StitchServiceErrorCode[StitchServiceErrorCode["IncomingWebhookAlreadyExists"] = 31] = "IncomingWebhookAlreadyExists";
      StitchServiceErrorCode[StitchServiceErrorCode["IncomingWebhookDuplicateName"] = 32] = "IncomingWebhookDuplicateName";
      StitchServiceErrorCode[StitchServiceErrorCode["RuleNotFound"] = 33] = "RuleNotFound";
      StitchServiceErrorCode[StitchServiceErrorCode["ApiKeyNotFound"] = 34] = "ApiKeyNotFound";
      StitchServiceErrorCode[StitchServiceErrorCode["RuleAlreadyExists"] = 35] = "RuleAlreadyExists";
      StitchServiceErrorCode[StitchServiceErrorCode["RuleDuplicateName"] = 36] = "RuleDuplicateName";
      StitchServiceErrorCode[StitchServiceErrorCode["AuthProviderDuplicateName"] = 37] = "AuthProviderDuplicateName";
      StitchServiceErrorCode[StitchServiceErrorCode["RestrictedHost"] = 38] = "RestrictedHost";
      StitchServiceErrorCode[StitchServiceErrorCode["ApiKeyAlreadyExists"] = 39] = "ApiKeyAlreadyExists";
      StitchServiceErrorCode[StitchServiceErrorCode["IncomingWebhookAuthFailed"] = 40] = "IncomingWebhookAuthFailed";
      StitchServiceErrorCode[StitchServiceErrorCode["ExecutionTimeLimitExceeded"] = 41] = "ExecutionTimeLimitExceeded";
      StitchServiceErrorCode[StitchServiceErrorCode["FunctionNotCallable"] = 42] = "FunctionNotCallable";
      StitchServiceErrorCode[StitchServiceErrorCode["UserAlreadyConfirmed"] = 43] = "UserAlreadyConfirmed";
      StitchServiceErrorCode[StitchServiceErrorCode["UserNotFound"] = 44] = "UserNotFound";
      StitchServiceErrorCode[StitchServiceErrorCode["UserDisabled"] = 45] = "UserDisabled";
      StitchServiceErrorCode[StitchServiceErrorCode["Unknown"] = 46] = "Unknown";
    })(StitchServiceErrorCode = exports.StitchServiceErrorCode || (exports.StitchServiceErrorCode = {}));

    var apiErrorCodes = {
      MissingAuthReq: StitchServiceErrorCode.MissingAuthReq,
      InvalidSession: StitchServiceErrorCode.InvalidSession,
      UserAppDomainMismatch: StitchServiceErrorCode.UserAppDomainMismatch,
      DomainNotAllowed: StitchServiceErrorCode.DomainNotAllowed,
      ReadSizeLimitExceeded: StitchServiceErrorCode.ReadSizeLimitExceeded,
      InvalidParameter: StitchServiceErrorCode.InvalidParameter,
      MissingParameter: StitchServiceErrorCode.MissingParameter,
      TwilioError: StitchServiceErrorCode.TwilioError,
      GCMError: StitchServiceErrorCode.GCMError,
      HTTPError: StitchServiceErrorCode.HTTPError,
      AWSError: StitchServiceErrorCode.AWSError,
      MongoDBError: StitchServiceErrorCode.MongoDBError,
      ArgumentsNotAllowed: StitchServiceErrorCode.ArgumentsNotAllowed,
      FunctionExecutionError: StitchServiceErrorCode.FunctionExecutionError,
      NoMatchingRuleFound: StitchServiceErrorCode.NoMatchingRuleFound,
      InternalServerError: StitchServiceErrorCode.InternalServerError,
      AuthProviderNotFound: StitchServiceErrorCode.AuthProviderNotFound,
      AuthProviderAlreadyExists: StitchServiceErrorCode.AuthProviderAlreadyExists,
      ServiceNotFound: StitchServiceErrorCode.ServiceNotFound,
      ServiceTypeNotFound: StitchServiceErrorCode.ServiceTypeNotFound,
      ServiceAlreadyExists: StitchServiceErrorCode.ServiceAlreadyExists,
      ServiceCommandNotFound: StitchServiceErrorCode.ServiceCommandNotFound,
      ValueNotFound: StitchServiceErrorCode.ValueNotFound,
      ValueAlreadyExists: StitchServiceErrorCode.ValueAlreadyExists,
      ValueDuplicateName: StitchServiceErrorCode.ValueDuplicateName,
      FunctionNotFound: StitchServiceErrorCode.FunctionNotFound,
      FunctionAlreadyExists: StitchServiceErrorCode.FunctionAlreadyExists,
      FunctionDuplicateName: StitchServiceErrorCode.FunctionDuplicateName,
      FunctionSyntaxError: StitchServiceErrorCode.FunctionSyntaxError,
      FunctionInvalid: StitchServiceErrorCode.FunctionInvalid,
      IncomingWebhookNotFound: StitchServiceErrorCode.IncomingWebhookNotFound,
      IncomingWebhookAlreadyExists: StitchServiceErrorCode.IncomingWebhookAlreadyExists,
      IncomingWebhookDuplicateName: StitchServiceErrorCode.IncomingWebhookDuplicateName,
      RuleNotFound: StitchServiceErrorCode.RuleNotFound,
      APIKeyNotFound: StitchServiceErrorCode.ApiKeyNotFound,
      RuleAlreadyExists: StitchServiceErrorCode.RuleAlreadyExists,
      RuleDuplicateName: StitchServiceErrorCode.RuleDuplicateName,
      AuthProviderDuplicateName: StitchServiceErrorCode.AuthProviderDuplicateName,
      RestrictedHost: StitchServiceErrorCode.RestrictedHost,
      APIKeyAlreadyExists: StitchServiceErrorCode.ApiKeyAlreadyExists,
      IncomingWebhookAuthFailed: StitchServiceErrorCode.IncomingWebhookAuthFailed,
      ExecutionTimeLimitExceeded: StitchServiceErrorCode.ExecutionTimeLimitExceeded,
      FunctionNotCallable: StitchServiceErrorCode.FunctionNotCallable,
      UserAlreadyConfirmed: StitchServiceErrorCode.UserAlreadyConfirmed,
      UserNotFound: StitchServiceErrorCode.UserNotFound,
      UserDisabled: StitchServiceErrorCode.UserDisabled
    };

    function stitchServiceErrorCodeFromApi(code) {
      if (!(code in apiErrorCodes)) {
        return StitchServiceErrorCode.Unknown;
      }

      return apiErrorCodes[code];
    }

    exports.stitchServiceErrorCodeFromApi = stitchServiceErrorCodeFromApi;
  }, {}],
  51: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var Event_1 = __importDefault(require("./internal/net/Event"));

    var StitchEvent_1 = __importDefault(require("./internal/net/StitchEvent"));

    var Stream = function () {
      function Stream(eventStream, decoder) {
        this.eventStream = eventStream;
        this.decoder = decoder;
        this.listeners = [];
      }

      Stream.prototype.next = function () {
        var _this = this;

        return this.eventStream.nextEvent().then(function (event) {
          var se = StitchEvent_1.default.fromEvent(event, _this.decoder);

          if (se.eventName === StitchEvent_1.default.ERROR_EVENT_NAME) {
            throw se.error;
          }

          if (se.eventName === Event_1.default.MESSAGE_EVENT) {
            return se.data;
          }

          return _this.next();
        });
      };

      Stream.prototype.onNext = function (callback) {
        var _this = this;

        var wrapper = {
          onEvent: function onEvent(e) {
            var se = StitchEvent_1.default.fromEvent(e, _this.decoder);

            if (se.eventName !== Event_1.default.MESSAGE_EVENT) {
              return;
            }

            callback(se.data);
          }
        };
        this.eventStream.addListener(wrapper);
      };

      Stream.prototype.onError = function (callback) {
        var _this = this;

        var wrapper = {
          onEvent: function onEvent(e) {
            var se = StitchEvent_1.default.fromEvent(e, _this.decoder);

            if (se.eventName === StitchEvent_1.default.ERROR_EVENT_NAME) {
              callback(se.error);
            }
          }
        };
        this.eventStream.addListener(wrapper);
      };

      Stream.prototype.addListener = function (listener) {
        var _this = this;

        var wrapper = {
          onEvent: function onEvent(e) {
            var se = StitchEvent_1.default.fromEvent(e, _this.decoder);

            if (se.eventName === StitchEvent_1.default.ERROR_EVENT_NAME) {
              if (listener.onError) {
                listener.onError(se.error);
              }
            } else {
              if (listener.onNext) {
                listener.onNext(se.data);
              }
            }
          }
        };
        this.listeners.push([listener, wrapper]);
        this.eventStream.addListener(wrapper);
      };

      Stream.prototype.removeListener = function (listener) {
        var index = -1;

        for (var i = 0; i < this.listeners.length; i++) {
          if (this.listeners[i][0] === listener) {
            index = i;
            break;
          }
        }

        if (index === -1) {
          return;
        }

        var wrapper = this.listeners[index][1];
        this.listeners.splice(index, 1);
        this.eventStream.removeListener(wrapper);
      };

      Stream.prototype.close = function () {
        this.eventStream.close();
      };

      return Stream;
    }();

    exports.default = Stream;
  }, {
    "./internal/net/Event": 98,
    "./internal/net/StitchEvent": 109
  }],
  52: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var ProviderCapabilities = function () {
      function ProviderCapabilities(reusesExistingSession) {
        if (reusesExistingSession === void 0) {
          reusesExistingSession = false;
        }

        this.reusesExistingSession = reusesExistingSession;
      }

      return ProviderCapabilities;
    }();

    exports.default = ProviderCapabilities;
  }, {}],
  53: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var StitchUserIdentity = function () {
      function StitchUserIdentity(id, providerType) {
        this.id = id;
        this.providerType = providerType;
      }

      return StitchUserIdentity;
    }();

    exports.default = StitchUserIdentity;
  }, {}],
  54: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UserType;

    (function (UserType) {
      UserType["Normal"] = "normal";
      UserType["Server"] = "server";
      UserType["Unknown"] = "unknown";
    })(UserType || (UserType = {}));

    exports.default = UserType;
  }, {}],
  55: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var JWT_1 = __importDefault(require("./JWT"));

    var SLEEP_MILLIS = 60000;
    var EXPIRATION_WINDOW_SECS = 300;

    var AccessTokenRefresher = function () {
      function AccessTokenRefresher(auth) {
        this.auth = auth;
      }

      AccessTokenRefresher.prototype.shouldRefresh = function () {
        var auth = this.auth;

        if (auth === undefined) {
          return false;
        }

        if (!auth.isLoggedIn) {
          return false;
        }

        var info = auth.authInfo;

        if (info === undefined) {
          return false;
        }

        var jwt;

        try {
          jwt = JWT_1.default.fromEncoded(info.accessToken);
        } catch (e) {
          console.log(e);
          return false;
        }

        if (Date.now() / 1000 < jwt.expires - EXPIRATION_WINDOW_SECS) {
          return false;
        }

        return true;
      };

      AccessTokenRefresher.prototype.run = function () {
        var _this = this;

        if (!this.shouldRefresh()) {
          this.nextTimeout = setTimeout(function () {
            return _this.run();
          }, SLEEP_MILLIS);
        } else {
          this.auth.refreshAccessToken().then(function () {
            _this.nextTimeout = setTimeout(function () {
              return _this.run();
            }, SLEEP_MILLIS);
          }).catch(function () {
            _this.nextTimeout = setTimeout(function () {
              return _this.run();
            }, SLEEP_MILLIS);
          });
        }
      };

      AccessTokenRefresher.prototype.stop = function () {
        clearTimeout(this.nextTimeout);
      };

      return AccessTokenRefresher;
    }();

    exports.default = AccessTokenRefresher;
  }, {
    "./JWT": 60
  }],
  56: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var AuthInfo = function () {
      function AuthInfo(userId, deviceId, accessToken, refreshToken, loggedInProviderType, loggedInProviderName, userProfile) {
        this.userId = userId;
        this.deviceId = deviceId;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.loggedInProviderType = loggedInProviderType;
        this.loggedInProviderName = loggedInProviderName;
        this.userProfile = userProfile;
      }

      AuthInfo.empty = function () {
        return new AuthInfo(undefined, undefined, undefined, undefined, undefined, undefined, undefined);
      };

      AuthInfo.prototype.loggedOut = function () {
        return new AuthInfo(undefined, this.deviceId, undefined, undefined, undefined, undefined, undefined);
      };

      AuthInfo.prototype.merge = function (newInfo) {
        return new AuthInfo(newInfo.userId === undefined ? this.userId : newInfo.userId, newInfo.deviceId === undefined ? this.deviceId : newInfo.deviceId, newInfo.accessToken === undefined ? this.accessToken : newInfo.accessToken, newInfo.refreshToken === undefined ? this.refreshToken : newInfo.refreshToken, newInfo.loggedInProviderType === undefined ? this.loggedInProviderType : newInfo.loggedInProviderType, newInfo.loggedInProviderName === undefined ? this.loggedInProviderName : newInfo.loggedInProviderName, newInfo.userProfile === undefined ? this.userProfile : newInfo.userProfile);
      };

      return AuthInfo;
    }();

    exports.default = AuthInfo;
  }, {}],
  57: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var bson_1 = require("bson");

    var StitchErrorUtils_1 = require("../../internal/common/StitchErrorUtils");

    var Headers_1 = __importDefault(require("../../internal/net/Headers"));

    var Method_1 = __importDefault(require("../../internal/net/Method"));

    var Stream_1 = __importDefault(require("../../Stream"));

    var StitchAuthDocRequest_1 = require("../../internal/net/StitchAuthDocRequest");

    var StitchAuthRequest_1 = require("../../internal/net/StitchAuthRequest");

    var StitchDocRequest_1 = require("../../internal/net/StitchDocRequest");

    var StitchClientError_1 = __importDefault(require("../../StitchClientError"));

    var StitchClientErrorCode_1 = require("../../StitchClientErrorCode");

    var StitchError_1 = __importDefault(require("../../StitchError"));

    var StitchRequestError_1 = __importDefault(require("../../StitchRequestError"));

    var StitchRequestErrorCode_1 = require("../../StitchRequestErrorCode");

    var StitchServiceError_1 = __importDefault(require("../../StitchServiceError"));

    var StitchServiceErrorCode_1 = require("../../StitchServiceErrorCode");

    var StitchAuthResponseCredential_1 = __importDefault(require("../providers/internal/StitchAuthResponseCredential"));

    var AccessTokenRefresher_1 = __importDefault(require("./AccessTokenRefresher"));

    var AuthInfo_1 = __importDefault(require("./AuthInfo"));

    var JWT_1 = __importDefault(require("./JWT"));

    var ApiAuthInfo_1 = __importDefault(require("./models/ApiAuthInfo"));

    var ApiCoreUserProfile_1 = __importDefault(require("./models/ApiCoreUserProfile"));

    var StoreAuthInfo_1 = require("./models/StoreAuthInfo");

    var OPTIONS = "options";
    var DEVICE = "device";

    var CoreStitchAuth = function () {
      function CoreStitchAuth(requestClient, authRoutes, storage, useTokenRefresher) {
        if (useTokenRefresher === void 0) {
          useTokenRefresher = true;
        }

        this.requestClient = requestClient;
        this.authRoutes = authRoutes;
        this.storage = storage;
        var info;

        try {
          info = StoreAuthInfo_1.readFromStorage(storage);
        } catch (e) {
          throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.CouldNotLoadPersistedAuthInfo);
        }

        if (info === undefined) {
          this.authInfo = AuthInfo_1.default.empty();
        } else {
          this.authInfo = info;
        }

        this.prepUser();

        if (useTokenRefresher) {
          this.accessTokenRefresher = new AccessTokenRefresher_1.default(this);
          this.accessTokenRefresher.run();
        }
      }

      Object.defineProperty(CoreStitchAuth.prototype, "isLoggedIn", {
        get: function get() {
          return this.currentUser !== undefined;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(CoreStitchAuth.prototype, "user", {
        get: function get() {
          return this.currentUser;
        },
        enumerable: true,
        configurable: true
      });

      CoreStitchAuth.prototype.doAuthenticatedRequest = function (stitchReq) {
        var _this = this;

        return this.requestClient.doRequest(this.prepareAuthRequest(stitchReq)).catch(function (err) {
          return _this.handleAuthFailure(err, stitchReq);
        });
      };

      CoreStitchAuth.prototype.doAuthenticatedRequestWithDecoder = function (stitchReq, decoder) {
        return this.doAuthenticatedRequest(stitchReq).then(function (response) {
          var obj = bson_1.EJSON.parse(response.body, {
            strict: false
          });

          if (decoder) {
            return decoder.decode(obj);
          }

          return obj;
        }).catch(function (err) {
          throw StitchErrorUtils_1.wrapDecodingError(err);
        });
      };

      CoreStitchAuth.prototype.openAuthenticatedEventStream = function (stitchReq, open) {
        var _this = this;

        if (open === void 0) {
          open = true;
        }

        if (!this.isLoggedIn) {
          throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.MustAuthenticateFirst);
        }

        var authToken;

        if (stitchReq.useRefreshToken) {
          authToken = this.authInfo.refreshToken;
        } else {
          authToken = this.authInfo.accessToken;
        }

        return this.requestClient.doStreamRequest(stitchReq.builder.withPath(stitchReq.path + "&stitch_at=" + authToken).build(), open, function () {
          return _this.openAuthenticatedEventStream(stitchReq, false);
        }).catch(function (err) {
          return _this.handleAuthFailureForEventStream(err, stitchReq, open);
        });
      };

      CoreStitchAuth.prototype.openAuthenticatedStreamWithDecoder = function (stitchReq, decoder) {
        return this.openAuthenticatedEventStream(stitchReq).then(function (eventStream) {
          return new Stream_1.default(eventStream, decoder);
        });
      };

      CoreStitchAuth.prototype.refreshAccessToken = function () {
        var _this = this;

        var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder().withRefreshToken().withPath(this.authRoutes.sessionRoute).withMethod(Method_1.default.POST);
        return this.doAuthenticatedRequest(reqBuilder.build()).then(function (response) {
          try {
            var partialInfo = ApiAuthInfo_1.default.fromJSON(JSON.parse(response.body));
            _this.authInfo = _this.authInfo.merge(partialInfo);
          } catch (err) {
            throw new StitchRequestError_1.default(err, StitchRequestErrorCode_1.StitchRequestErrorCode.DECODING_ERROR);
          }

          try {
            StoreAuthInfo_1.writeToStorage(_this.authInfo, _this.storage);
          } catch (err) {
            throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.CouldNotPersistAuthInfo);
          }
        });
      };

      CoreStitchAuth.prototype.loginWithCredentialInternal = function (credential) {
        if (credential instanceof StitchAuthResponseCredential_1.default) {
          return this.processLogin(credential, credential.authInfo, credential.asLink);
        }

        if (!this.isLoggedIn) {
          return this.doLogin(credential, false);
        }

        if (credential.providerCapabilities.reusesExistingSession) {
          if (credential.providerType === this.currentUser.loggedInProviderType) {
            return Promise.resolve(this.currentUser);
          }
        }

        this.logoutInternal();
        return this.doLogin(credential, false);
      };

      CoreStitchAuth.prototype.linkUserWithCredentialInternal = function (user, credential) {
        if (this.currentUser !== undefined && user.id !== this.currentUser.id) {
          return Promise.reject(new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.UserNoLongerValid));
        }

        return this.doLogin(credential, true);
      };

      CoreStitchAuth.prototype.logoutInternal = function () {
        var _this = this;

        if (!this.isLoggedIn) {
          return Promise.resolve();
        }

        return this.doLogout().then(function () {
          _this.clearAuth();
        }).catch(function () {
          _this.clearAuth();
        });
      };

      Object.defineProperty(CoreStitchAuth.prototype, "hasDeviceId", {
        get: function get() {
          return this.authInfo.deviceId !== undefined && this.authInfo.deviceId !== "" && this.authInfo.deviceId !== "000000000000000000000000";
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(CoreStitchAuth.prototype, "deviceId", {
        get: function get() {
          if (!this.hasDeviceId) {
            return undefined;
          }

          return this.authInfo.deviceId;
        },
        enumerable: true,
        configurable: true
      });

      CoreStitchAuth.prototype.prepareAuthRequest = function (stitchReq) {
        if (!this.isLoggedIn) {
          throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.MustAuthenticateFirst);
        }

        var newReq = stitchReq.builder;
        var newHeaders = newReq.headers || {};

        if (stitchReq.useRefreshToken) {
          newHeaders[Headers_1.default.AUTHORIZATION] = Headers_1.default.getAuthorizationBearer(this.authInfo.refreshToken);
        } else {
          newHeaders[Headers_1.default.AUTHORIZATION] = Headers_1.default.getAuthorizationBearer(this.authInfo.accessToken);
        }

        newReq.withHeaders(newHeaders);
        return newReq.build();
      };

      CoreStitchAuth.prototype.handleAuthFailureForEventStream = function (ex, req, open) {
        var _this = this;

        if (open === void 0) {
          open = true;
        }

        if (!(ex instanceof StitchServiceError_1.default) || ex.errorCode !== StitchServiceErrorCode_1.StitchServiceErrorCode.InvalidSession) {
          throw ex;
        }

        if (req.useRefreshToken || !req.shouldRefreshOnFailure) {
          this.clearAuth();
          throw ex;
        }

        return this.tryRefreshAccessToken(req.startedAt).then(function () {
          return _this.openAuthenticatedEventStream(req.builder.withShouldRefreshOnFailure(false).build(), open);
        });
      };

      CoreStitchAuth.prototype.handleAuthFailure = function (ex, req) {
        var _this = this;

        if (!(ex instanceof StitchServiceError_1.default) || ex.errorCode !== StitchServiceErrorCode_1.StitchServiceErrorCode.InvalidSession) {
          throw ex;
        }

        if (req.useRefreshToken || !req.shouldRefreshOnFailure) {
          this.clearAuth();
          throw ex;
        }

        return this.tryRefreshAccessToken(req.startedAt).then(function () {
          return _this.doAuthenticatedRequest(req.builder.withShouldRefreshOnFailure(false).build());
        });
      };

      CoreStitchAuth.prototype.tryRefreshAccessToken = function (reqStartedAt) {
        if (!this.isLoggedIn) {
          throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.LoggedOutDuringRequest);
        }

        try {
          var jwt = JWT_1.default.fromEncoded(this.authInfo.accessToken);

          if (jwt.issuedAt >= reqStartedAt) {
            return Promise.resolve();
          }
        } catch (e) {}

        return this.refreshAccessToken();
      };

      CoreStitchAuth.prototype.prepUser = function () {
        if (this.authInfo.userId !== undefined) {
          this.currentUser = this.userFactory.makeUser(this.authInfo.userId, this.authInfo.loggedInProviderType, this.authInfo.loggedInProviderName, this.authInfo.userProfile);
        }
      };

      CoreStitchAuth.prototype.attachAuthOptions = function (authBody) {
        var options = {};
        options[DEVICE] = this.deviceInfo;
        authBody[OPTIONS] = options;
      };

      CoreStitchAuth.prototype.doLogin = function (credential, asLinkRequest) {
        var _this = this;

        return this.doLoginRequest(credential, asLinkRequest).then(function (response) {
          return _this.processLoginResponse(credential, response, asLinkRequest);
        }).then(function (user) {
          _this.onAuthEvent();

          return user;
        });
      };

      CoreStitchAuth.prototype.doLoginRequest = function (credential, asLinkRequest) {
        var reqBuilder = new StitchDocRequest_1.StitchDocRequest.Builder();
        reqBuilder.withMethod(Method_1.default.POST);

        if (asLinkRequest) {
          reqBuilder.withPath(this.authRoutes.getAuthProviderLinkRoute(credential.providerName));
        } else {
          reqBuilder.withPath(this.authRoutes.getAuthProviderLoginRoute(credential.providerName));
        }

        var material = credential.material;
        this.attachAuthOptions(material);
        reqBuilder.withDocument(material);

        if (!asLinkRequest) {
          return this.requestClient.doRequest(reqBuilder.build());
        }

        var linkRequest = new StitchAuthDocRequest_1.StitchAuthDocRequest(reqBuilder.build(), reqBuilder.document);
        return this.doAuthenticatedRequest(linkRequest);
      };

      CoreStitchAuth.prototype.processLogin = function (credential, newAuthInfo, asLinkRequest) {
        var _this = this;

        var oldInfo = this.authInfo;
        var oldUser = this.currentUser;
        newAuthInfo = this.authInfo.merge(new AuthInfo_1.default(newAuthInfo.userId, newAuthInfo.deviceId, newAuthInfo.accessToken, newAuthInfo.refreshToken, credential.providerType, credential.providerName, undefined));
        this.authInfo = newAuthInfo;
        this.currentUser = this.userFactory.makeUser(this.authInfo.userId, credential.providerType, credential.providerName, undefined);
        return this.doGetUserProfile().then(function (profile) {
          newAuthInfo = newAuthInfo.merge(new AuthInfo_1.default(newAuthInfo.userId, newAuthInfo.deviceId, newAuthInfo.accessToken, newAuthInfo.refreshToken, credential.providerType, credential.providerName, profile));

          try {
            StoreAuthInfo_1.writeToStorage(newAuthInfo, _this.storage);
          } catch (err) {
            throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.CouldNotPersistAuthInfo);
          }

          _this.authInfo = newAuthInfo;
          _this.currentUser = _this.userFactory.makeUser(_this.authInfo.userId, credential.providerType, credential.providerName, profile);
          return _this.currentUser;
        }).catch(function (err) {
          if (asLinkRequest) {
            _this.authInfo = oldInfo;
            _this.currentUser = oldUser;
          } else {
            _this.clearAuth();
          }

          throw err;
        });
      };

      CoreStitchAuth.prototype.processLoginResponse = function (credential, response, asLinkRequest) {
        try {
          if (!response) {
            throw new StitchServiceError_1.default("the login response could not be processed for credential: " + credential + ";" + "response was undefined");
          }

          if (!response.body) {
            throw new StitchServiceError_1.default("response with status code " + response.statusCode + " has empty body");
          }

          return this.processLogin(credential, ApiAuthInfo_1.default.fromJSON(JSON.parse(response.body)), asLinkRequest);
        } catch (err) {
          throw new StitchRequestError_1.default(err, StitchRequestErrorCode_1.StitchRequestErrorCode.DECODING_ERROR);
        }
      };

      CoreStitchAuth.prototype.doGetUserProfile = function () {
        var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder();
        reqBuilder.withMethod(Method_1.default.GET).withPath(this.authRoutes.profileRoute);
        return this.doAuthenticatedRequest(reqBuilder.build()).then(function (response) {
          return ApiCoreUserProfile_1.default.fromJSON(JSON.parse(response.body));
        }).catch(function (err) {
          if (err instanceof StitchError_1.default) {
            throw err;
          } else {
            throw new StitchRequestError_1.default(err, StitchRequestErrorCode_1.StitchRequestErrorCode.DECODING_ERROR);
          }
        });
      };

      CoreStitchAuth.prototype.doLogout = function () {
        var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder();
        reqBuilder.withRefreshToken().withPath(this.authRoutes.sessionRoute).withMethod(Method_1.default.DELETE);
        return this.doAuthenticatedRequest(reqBuilder.build()).then(function () {
          return;
        });
      };

      CoreStitchAuth.prototype.clearAuth = function () {
        if (!this.isLoggedIn) {
          return;
        }

        this.authInfo = this.authInfo.loggedOut();

        try {
          StoreAuthInfo_1.writeToStorage(this.authInfo, this.storage);
        } catch (e) {
          throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.CouldNotPersistAuthInfo);
        }

        this.currentUser = undefined;
        this.onAuthEvent();
      };

      CoreStitchAuth.prototype.close = function () {
        if (this.accessTokenRefresher) {
          this.accessTokenRefresher.stop();
        }
      };

      return CoreStitchAuth;
    }();

    exports.default = CoreStitchAuth;
  }, {
    "../../StitchClientError": 44,
    "../../StitchClientErrorCode": 45,
    "../../StitchError": 46,
    "../../StitchRequestError": 47,
    "../../StitchRequestErrorCode": 48,
    "../../StitchServiceError": 49,
    "../../StitchServiceErrorCode": 50,
    "../../Stream": 51,
    "../../internal/common/StitchErrorUtils": 91,
    "../../internal/net/Headers": 100,
    "../../internal/net/Method": 101,
    "../../internal/net/StitchAuthDocRequest": 106,
    "../../internal/net/StitchAuthRequest": 107,
    "../../internal/net/StitchDocRequest": 108,
    "../providers/internal/StitchAuthResponseCredential": 77,
    "./AccessTokenRefresher": 55,
    "./AuthInfo": 56,
    "./JWT": 60,
    "./models/ApiAuthInfo": 62,
    "./models/ApiCoreUserProfile": 63,
    "./models/StoreAuthInfo": 65,
    "bson": 115
  }],
  58: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var StitchUserProfileImpl_1 = __importDefault(require("./StitchUserProfileImpl"));

    var CoreStitchUserImpl = function () {
      function CoreStitchUserImpl(id, loggedInProviderType, loggedInProviderName, profile) {
        this.id = id;
        this.loggedInProviderType = loggedInProviderType;
        this.loggedInProviderName = loggedInProviderName;
        this.profile = profile === undefined ? StitchUserProfileImpl_1.default.empty() : profile;
      }

      Object.defineProperty(CoreStitchUserImpl.prototype, "userType", {
        get: function get() {
          return this.profile.userType;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(CoreStitchUserImpl.prototype, "identities", {
        get: function get() {
          return this.profile.identities;
        },
        enumerable: true,
        configurable: true
      });
      return CoreStitchUserImpl;
    }();

    exports.default = CoreStitchUserImpl;
  }, {
    "./StitchUserProfileImpl": 61
  }],
  59: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DeviceFields;

    (function (DeviceFields) {
      DeviceFields["DEVICE_ID"] = "deviceId";
      DeviceFields["APP_ID"] = "appId";
      DeviceFields["APP_VERSION"] = "appVersion";
      DeviceFields["PLATFORM"] = "platform";
      DeviceFields["PLATFORM_VERSION"] = "platformVersion";
      DeviceFields["SDK_VERSION"] = "sdkVersion";
    })(DeviceFields || (DeviceFields = {}));

    exports.default = DeviceFields;
  }, {}],
  60: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var Base64_1 = require("../../internal/common/Base64");

    var EXPIRES = "exp";
    var ISSUED_AT = "iat";

    var JWT = function () {
      function JWT(expires, issuedAt) {
        this.expires = expires;
        this.issuedAt = issuedAt;
      }

      JWT.fromEncoded = function (encodedJWT) {
        var parts = JWT.splitToken(encodedJWT);
        var json = JSON.parse(Base64_1.base64Decode(parts[1]));
        var expires = json[EXPIRES];
        var iat = json[ISSUED_AT];
        return new JWT(expires, iat);
      };

      JWT.splitToken = function (jwt) {
        var parts = jwt.split(".");

        if (parts.length !== 3) {
          throw new Error("Malformed JWT token. The string " + jwt + " should have 3 parts.");
        }

        return parts;
      };

      return JWT;
    }();

    exports.default = JWT;
  }, {
    "../../internal/common/Base64": 90
  }],
  61: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NAME = "name";
    var EMAIL = "email";
    var PICTURE_Url = "picture";
    var FIRST_NAME = "first_name";
    var LAST_NAME = "last_name";
    var GENDER = "gender";
    var BIRTHDAY = "birthday";
    var MIN_AGE = "min_age";
    var MAX_AGE = "max_age";

    var StitchUserProfileImpl = function () {
      function StitchUserProfileImpl(userType, data, identities) {
        if (data === void 0) {
          data = {};
        }

        if (identities === void 0) {
          identities = [];
        }

        this.userType = userType;
        this.data = data;
        this.identities = identities;
      }

      StitchUserProfileImpl.empty = function () {
        return new StitchUserProfileImpl();
      };

      Object.defineProperty(StitchUserProfileImpl.prototype, "name", {
        get: function get() {
          return this.data[NAME];
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(StitchUserProfileImpl.prototype, "email", {
        get: function get() {
          return this.data[EMAIL];
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(StitchUserProfileImpl.prototype, "pictureUrl", {
        get: function get() {
          return this.data[PICTURE_Url];
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(StitchUserProfileImpl.prototype, "firstName", {
        get: function get() {
          return this.data[FIRST_NAME];
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(StitchUserProfileImpl.prototype, "lastName", {
        get: function get() {
          return this.data[LAST_NAME];
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(StitchUserProfileImpl.prototype, "gender", {
        get: function get() {
          return this.data[GENDER];
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(StitchUserProfileImpl.prototype, "birthday", {
        get: function get() {
          return this.data[BIRTHDAY];
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(StitchUserProfileImpl.prototype, "minAge", {
        get: function get() {
          var age = this.data[MIN_AGE];

          if (age === undefined) {
            return undefined;
          }

          return age;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(StitchUserProfileImpl.prototype, "maxAge", {
        get: function get() {
          var age = this.data[MAX_AGE];

          if (age === undefined) {
            return undefined;
          }

          return age;
        },
        enumerable: true,
        configurable: true
      });
      return StitchUserProfileImpl;
    }();

    exports.default = StitchUserProfileImpl;
  }, {}],
  62: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var AuthInfo_1 = __importDefault(require("../AuthInfo"));

    var Fields;

    (function (Fields) {
      Fields["USER_ID"] = "user_id";
      Fields["DEVICE_ID"] = "device_id";
      Fields["ACCESS_TOKEN"] = "access_token";
      Fields["REFRESH_TOKEN"] = "refresh_token";
    })(Fields || (Fields = {}));

    var ApiAuthInfo = function (_super) {
      __extends(ApiAuthInfo, _super);

      function ApiAuthInfo(userId, deviceId, accessToken, refreshToken) {
        return _super.call(this, userId, deviceId, accessToken, refreshToken) || this;
      }

      ApiAuthInfo.fromJSON = function (json) {
        return new ApiAuthInfo(json[Fields.USER_ID], json[Fields.DEVICE_ID], json[Fields.ACCESS_TOKEN], json[Fields.REFRESH_TOKEN]);
      };

      ApiAuthInfo.prototype.toJSON = function () {
        var _a;

        return _a = {}, _a[Fields.USER_ID] = this.userId, _a[Fields.DEVICE_ID] = this.deviceId, _a[Fields.ACCESS_TOKEN] = this.accessToken, _a[Fields.REFRESH_TOKEN] = this.refreshToken, _a;
      };

      return ApiAuthInfo;
    }(AuthInfo_1.default);

    exports.default = ApiAuthInfo;
  }, {
    "../AuthInfo": 56
  }],
  63: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var Assertions_1 = __importDefault(require("../../../internal/common/Assertions"));

    var StitchUserProfileImpl_1 = __importDefault(require("../StitchUserProfileImpl"));

    var ApiStitchUserIdentity_1 = __importDefault(require("./ApiStitchUserIdentity"));

    var Fields;

    (function (Fields) {
      Fields["DATA"] = "data";
      Fields["USER_TYPE"] = "type";
      Fields["IDENTITIES"] = "identities";
    })(Fields || (Fields = {}));

    var ApiCoreUserProfile = function (_super) {
      __extends(ApiCoreUserProfile, _super);

      function ApiCoreUserProfile(userType, data, identities) {
        return _super.call(this, userType, data, identities) || this;
      }

      ApiCoreUserProfile.fromJSON = function (json) {
        Assertions_1.default.keyPresent(Fields.USER_TYPE, json);
        Assertions_1.default.keyPresent(Fields.DATA, json);
        Assertions_1.default.keyPresent(Fields.IDENTITIES, json);
        return new ApiCoreUserProfile(json[Fields.USER_TYPE], json[Fields.DATA], json[Fields.IDENTITIES].map(ApiStitchUserIdentity_1.default.fromJSON));
      };

      ApiCoreUserProfile.prototype.toJSON = function () {
        var _a;

        return _a = {}, _a[Fields.DATA] = this.data, _a[Fields.USER_TYPE] = this.userType, _a[Fields.IDENTITIES] = this.identities, _a;
      };

      return ApiCoreUserProfile;
    }(StitchUserProfileImpl_1.default);

    exports.default = ApiCoreUserProfile;
  }, {
    "../../../internal/common/Assertions": 89,
    "../StitchUserProfileImpl": 61,
    "./ApiStitchUserIdentity": 64
  }],
  64: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var StitchUserIdentity_1 = __importDefault(require("../../StitchUserIdentity"));

    var Fields;

    (function (Fields) {
      Fields["ID"] = "id";
      Fields["PROVIDER_TYPE"] = "provider_type";
    })(Fields || (Fields = {}));

    var ApiStitchUserIdentity = function (_super) {
      __extends(ApiStitchUserIdentity, _super);

      function ApiStitchUserIdentity(id, providerType) {
        return _super.call(this, id, providerType) || this;
      }

      ApiStitchUserIdentity.fromJSON = function (json) {
        return new ApiStitchUserIdentity(json[Fields.ID], json[Fields.PROVIDER_TYPE]);
      };

      ApiStitchUserIdentity.prototype.toJSON = function () {
        var _a;

        return _a = {}, _a[Fields.ID] = this.id, _a[Fields.PROVIDER_TYPE] = this.providerType, _a;
      };

      return ApiStitchUserIdentity;
    }(StitchUserIdentity_1.default);

    exports.default = ApiStitchUserIdentity;
  }, {
    "../../StitchUserIdentity": 53
  }],
  65: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var AuthInfo_1 = __importDefault(require("../AuthInfo"));

    var StoreCoreUserProfile_1 = __importDefault(require("./StoreCoreUserProfile"));

    var StoreStitchUserIdentity_1 = __importDefault(require("./StoreStitchUserIdentity"));

    var Fields;

    (function (Fields) {
      Fields["USER_ID"] = "user_id";
      Fields["DEVICE_ID"] = "device_id";
      Fields["ACCESS_TOKEN"] = "access_token";
      Fields["REFRESH_TOKEN"] = "refresh_token";
      Fields["LOGGED_IN_PROVIDER_TYPE"] = "logged_in_provider_type";
      Fields["LOGGED_IN_PROVIDER_NAME"] = "logged_in_provider_name";
      Fields["USER_PROFILE"] = "user_profile";
    })(Fields || (Fields = {}));

    function readFromStorage(storage) {
      var rawInfo = storage.get(StoreAuthInfo.STORAGE_NAME);

      if (!rawInfo) {
        return undefined;
      }

      return StoreAuthInfo.decode(JSON.parse(rawInfo));
    }

    exports.readFromStorage = readFromStorage;

    function writeToStorage(authInfo, storage) {
      var info = new StoreAuthInfo(authInfo.userId, authInfo.deviceId, authInfo.accessToken, authInfo.refreshToken, authInfo.loggedInProviderType, authInfo.loggedInProviderName, authInfo.userProfile ? new StoreCoreUserProfile_1.default(authInfo.userProfile.userType, authInfo.userProfile.data, authInfo.userProfile.identities.map(function (identity) {
        return new StoreStitchUserIdentity_1.default(identity.id, identity.providerType);
      })) : undefined);
      storage.set(StoreAuthInfo.STORAGE_NAME, JSON.stringify(info.encode()));
    }

    exports.writeToStorage = writeToStorage;

    var StoreAuthInfo = function (_super) {
      __extends(StoreAuthInfo, _super);

      function StoreAuthInfo(userId, deviceId, accessToken, refreshToken, loggedInProviderType, loggedInProviderName, userProfile) {
        var _this = _super.call(this, userId, deviceId, accessToken, refreshToken, loggedInProviderType, loggedInProviderName, userProfile) || this;

        _this.userProfile = userProfile;
        return _this;
      }

      StoreAuthInfo.decode = function (from) {
        var userId = from[Fields.USER_ID];
        var deviceId = from[Fields.DEVICE_ID];
        var accessToken = from[Fields.ACCESS_TOKEN];
        var refreshToken = from[Fields.REFRESH_TOKEN];
        var loggedInProviderType = from[Fields.LOGGED_IN_PROVIDER_TYPE];
        var loggedInProviderName = from[Fields.LOGGED_IN_PROVIDER_NAME];
        var userProfile = from[Fields.USER_PROFILE];
        return new StoreAuthInfo(userId, deviceId, accessToken, refreshToken, loggedInProviderType, loggedInProviderName, StoreCoreUserProfile_1.default.decode(userProfile));
      };

      StoreAuthInfo.prototype.encode = function () {
        var to = {};
        to[Fields.USER_ID] = this.userId;
        to[Fields.ACCESS_TOKEN] = this.accessToken;
        to[Fields.REFRESH_TOKEN] = this.refreshToken;
        to[Fields.DEVICE_ID] = this.deviceId;
        to[Fields.LOGGED_IN_PROVIDER_NAME] = this.loggedInProviderName;
        to[Fields.LOGGED_IN_PROVIDER_TYPE] = this.loggedInProviderType;
        to[Fields.USER_PROFILE] = this.userProfile ? this.userProfile.encode() : undefined;
        return to;
      };

      StoreAuthInfo.STORAGE_NAME = "auth_info";
      return StoreAuthInfo;
    }(AuthInfo_1.default);

    exports.StoreAuthInfo = StoreAuthInfo;
  }, {
    "../AuthInfo": 56,
    "./StoreCoreUserProfile": 66,
    "./StoreStitchUserIdentity": 67
  }],
  66: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var StitchUserProfileImpl_1 = __importDefault(require("../StitchUserProfileImpl"));

    var StoreStitchUserIdentity_1 = __importDefault(require("./StoreStitchUserIdentity"));

    var Fields;

    (function (Fields) {
      Fields["DATA"] = "data";
      Fields["USER_TYPE"] = "type";
      Fields["IDENTITIES"] = "identities";
    })(Fields || (Fields = {}));

    var StoreCoreUserProfile = function (_super) {
      __extends(StoreCoreUserProfile, _super);

      function StoreCoreUserProfile(userType, data, identities) {
        var _this = _super.call(this, userType, data, identities) || this;

        _this.userType = userType;
        _this.data = data;
        _this.identities = identities;
        return _this;
      }

      StoreCoreUserProfile.decode = function (from) {
        return from ? new StoreCoreUserProfile(from[Fields.USER_TYPE], from[Fields.DATA], from[Fields.IDENTITIES].map(function (identity) {
          return StoreStitchUserIdentity_1.default.decode(identity);
        })) : undefined;
      };

      StoreCoreUserProfile.prototype.encode = function () {
        var _a;

        return _a = {}, _a[Fields.DATA] = this.data, _a[Fields.USER_TYPE] = this.userType, _a[Fields.IDENTITIES] = this.identities.map(function (identity) {
          return identity.encode();
        }), _a;
      };

      return StoreCoreUserProfile;
    }(StitchUserProfileImpl_1.default);

    exports.default = StoreCoreUserProfile;
  }, {
    "../StitchUserProfileImpl": 61,
    "./StoreStitchUserIdentity": 67
  }],
  67: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var StitchUserIdentity_1 = __importDefault(require("../../StitchUserIdentity"));

    var Fields;

    (function (Fields) {
      Fields["ID"] = "id";
      Fields["PROVIDER_TYPE"] = "provider_type";
    })(Fields || (Fields = {}));

    var StoreStitchUserIdentity = function (_super) {
      __extends(StoreStitchUserIdentity, _super);

      function StoreStitchUserIdentity(id, providerType) {
        return _super.call(this, id, providerType) || this;
      }

      StoreStitchUserIdentity.decode = function (from) {
        return new StoreStitchUserIdentity(from[Fields.ID], from[Fields.PROVIDER_TYPE]);
      };

      StoreStitchUserIdentity.prototype.encode = function () {
        var _a;

        return _a = {}, _a[Fields.ID] = this.id, _a[Fields.PROVIDER_TYPE] = this.providerType, _a;
      };

      return StoreStitchUserIdentity;
    }(StitchUserIdentity_1.default);

    exports.default = StoreStitchUserIdentity;
  }, {
    "../../StitchUserIdentity": 53
  }],
  68: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var AnonymousAuthProvider = function () {
      function AnonymousAuthProvider() {}

      AnonymousAuthProvider.TYPE = "anon-user";
      AnonymousAuthProvider.DEFAULT_NAME = "anon-user";
      return AnonymousAuthProvider;
    }();

    exports.default = AnonymousAuthProvider;
  }, {}],
  69: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var ProviderCapabilities_1 = __importDefault(require("../../ProviderCapabilities"));

    var AnonymousAuthProvider_1 = __importDefault(require("./AnonymousAuthProvider"));

    var AnonymousCredential = function () {
      function AnonymousCredential(providerName) {
        if (providerName === void 0) {
          providerName = AnonymousAuthProvider_1.default.DEFAULT_NAME;
        }

        this.providerType = AnonymousAuthProvider_1.default.TYPE;
        this.material = {};
        this.providerCapabilities = new ProviderCapabilities_1.default(true);
        this.providerName = providerName;
      }

      return AnonymousCredential;
    }();

    exports.default = AnonymousCredential;
  }, {
    "../../ProviderCapabilities": 52,
    "./AnonymousAuthProvider": 68
  }],
  70: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var CustomAuthProvider = function () {
      function CustomAuthProvider() {}

      CustomAuthProvider.TYPE = "custom-token";
      CustomAuthProvider.DEFAULT_NAME = "custom-token";
      return CustomAuthProvider;
    }();

    exports.default = CustomAuthProvider;
  }, {}],
  71: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var ProviderCapabilities_1 = __importDefault(require("../../ProviderCapabilities"));

    var CustomAuthProvider_1 = __importDefault(require("./CustomAuthProvider"));

    var Fields;

    (function (Fields) {
      Fields["TOKEN"] = "token";
    })(Fields || (Fields = {}));

    var CustomCredential = function () {
      function CustomCredential(token, providerName) {
        var _a;

        if (providerName === void 0) {
          providerName = CustomAuthProvider_1.default.DEFAULT_NAME;
        }

        this.providerType = CustomAuthProvider_1.default.TYPE;
        this.providerCapabilities = new ProviderCapabilities_1.default(false);
        this.providerName = providerName;
        this.token = token;
        this.material = (_a = {}, _a[Fields.TOKEN] = this.token, _a);
      }

      return CustomCredential;
    }();

    exports.default = CustomCredential;
  }, {
    "../../ProviderCapabilities": 52,
    "./CustomAuthProvider": 70
  }],
  72: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var FacebookAuthProvider = function () {
      function FacebookAuthProvider() {}

      FacebookAuthProvider.TYPE = "oauth2-facebook";
      FacebookAuthProvider.DEFAULT_NAME = "oauth2-facebook";
      return FacebookAuthProvider;
    }();

    exports.default = FacebookAuthProvider;
  }, {}],
  73: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var ProviderCapabilities_1 = __importDefault(require("../../ProviderCapabilities"));

    var FacebookAuthProvider_1 = __importDefault(require("./FacebookAuthProvider"));

    var Fields;

    (function (Fields) {
      Fields["ACCESS_TOKEN"] = "accessToken";
    })(Fields || (Fields = {}));

    var FacebookCredential = function () {
      function FacebookCredential(accessToken, providerName) {
        var _a;

        if (providerName === void 0) {
          providerName = FacebookAuthProvider_1.default.DEFAULT_NAME;
        }

        this.providerType = FacebookAuthProvider_1.default.TYPE;
        this.providerName = providerName;
        this.accessToken = accessToken;
        this.material = (_a = {}, _a[Fields.ACCESS_TOKEN] = this.accessToken, _a);
      }

      Object.defineProperty(FacebookCredential.prototype, "providerCapabilities", {
        get: function get() {
          return new ProviderCapabilities_1.default(false);
        },
        enumerable: true,
        configurable: true
      });
      return FacebookCredential;
    }();

    exports.default = FacebookCredential;
  }, {
    "../../ProviderCapabilities": 52,
    "./FacebookAuthProvider": 72
  }],
  74: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var GoogleAuthProvider = function () {
      function GoogleAuthProvider() {}

      GoogleAuthProvider.TYPE = "oauth2-google";
      GoogleAuthProvider.DEFAULT_NAME = "oauth2-google";
      return GoogleAuthProvider;
    }();

    exports.default = GoogleAuthProvider;
  }, {}],
  75: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var ProviderCapabilities_1 = __importDefault(require("../../ProviderCapabilities"));

    var GoogleAuthProvider_1 = __importDefault(require("./GoogleAuthProvider"));

    var Fields;

    (function (Fields) {
      Fields["AUTH_CODE"] = "authCode";
    })(Fields || (Fields = {}));

    var GoogleCredential = function () {
      function GoogleCredential(authCode, providerName) {
        var _a;

        if (providerName === void 0) {
          providerName = GoogleAuthProvider_1.default.DEFAULT_NAME;
        }

        this.providerType = GoogleAuthProvider_1.default.TYPE;
        this.providerCapabilities = new ProviderCapabilities_1.default(false);
        this.providerName = providerName;
        this.authCode = authCode;
        this.material = (_a = {}, _a[Fields.AUTH_CODE] = this.authCode, _a);
      }

      return GoogleCredential;
    }();

    exports.default = GoogleCredential;
  }, {
    "../../ProviderCapabilities": 52,
    "./GoogleAuthProvider": 74
  }],
  76: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var CoreAuthProviderClient = function () {
      function CoreAuthProviderClient(providerName, requestClient, baseRoute) {
        this.providerName = providerName;
        this.requestClient = requestClient;
        this.baseRoute = baseRoute;
      }

      return CoreAuthProviderClient;
    }();

    exports.default = CoreAuthProviderClient;
  }, {}],
  77: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var StitchAuthResponseCredential = function () {
      function StitchAuthResponseCredential(authInfo, providerType, providerName, asLink) {
        this.authInfo = authInfo;
        this.providerType = providerType;
        this.providerName = providerName;
        this.asLink = asLink;
      }

      return StitchAuthResponseCredential;
    }();

    exports.default = StitchAuthResponseCredential;
  }, {}],
  78: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var ServerApiKeyAuthProvider = function () {
      function ServerApiKeyAuthProvider() {}

      ServerApiKeyAuthProvider.TYPE = "api-key";
      ServerApiKeyAuthProvider.DEFAULT_NAME = "api-key";
      return ServerApiKeyAuthProvider;
    }();

    exports.default = ServerApiKeyAuthProvider;
  }, {}],
  79: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var ProviderCapabilities_1 = __importDefault(require("../../ProviderCapabilities"));

    var ServerApiKeyAuthProvider_1 = __importDefault(require("./ServerApiKeyAuthProvider"));

    var Fields;

    (function (Fields) {
      Fields["KEY"] = "key";
    })(Fields || (Fields = {}));

    var ServerApiKeyCredential = function () {
      function ServerApiKeyCredential(key, providerName) {
        var _a;

        if (providerName === void 0) {
          providerName = ServerApiKeyAuthProvider_1.default.DEFAULT_NAME;
        }

        this.providerType = ServerApiKeyAuthProvider_1.default.TYPE;
        this.providerCapabilities = new ProviderCapabilities_1.default(false);
        this.providerName = providerName;
        this.key = key;
        this.material = (_a = {}, _a[Fields.KEY] = this.key, _a);
      }

      return ServerApiKeyCredential;
    }();

    exports.default = ServerApiKeyCredential;
  }, {
    "../../ProviderCapabilities": 52,
    "./ServerApiKeyAuthProvider": 78
  }],
  80: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var Method_1 = __importDefault(require("../../../internal/net/Method"));

    var StitchAuthDocRequest_1 = require("../../../internal/net/StitchAuthDocRequest");

    var StitchAuthRequest_1 = require("../../../internal/net/StitchAuthRequest");

    var StitchErrorUtils_1 = require("../../../internal/common/StitchErrorUtils");

    var StitchRequestErrorCode_1 = require("../../../StitchRequestErrorCode");

    var StitchRequestError_1 = __importDefault(require("../../../StitchRequestError"));

    var CoreAuthProviderClient_1 = __importDefault(require("../internal/CoreAuthProviderClient"));

    var UserApiKey_1 = __importDefault(require("./models/UserApiKey"));

    var UserApiKeyAuthProvider_1 = __importDefault(require("./UserApiKeyAuthProvider"));

    var ApiKeyFields;

    (function (ApiKeyFields) {
      ApiKeyFields["NAME"] = "name";
    })(ApiKeyFields || (ApiKeyFields = {}));

    var CoreUserApiKeyAuthProviderClient = function (_super) {
      __extends(CoreUserApiKeyAuthProviderClient, _super);

      function CoreUserApiKeyAuthProviderClient(requestClient, authRoutes) {
        var _this = this;

        var baseRoute = authRoutes.baseAuthRoute + "/api_keys";
        var name = UserApiKeyAuthProvider_1.default.DEFAULT_NAME;
        _this = _super.call(this, name, requestClient, baseRoute) || this;
        return _this;
      }

      CoreUserApiKeyAuthProviderClient.prototype.createApiKey = function (name) {
        var _a;

        var reqBuilder = new StitchAuthDocRequest_1.StitchAuthDocRequest.Builder();
        reqBuilder.withMethod(Method_1.default.POST).withPath(this.baseRoute).withDocument((_a = {}, _a[ApiKeyFields.NAME] = name, _a)).withRefreshToken();
        return this.requestClient.doAuthenticatedRequest(reqBuilder.build()).then(function (response) {
          return UserApiKey_1.default.readFromApi(response.body);
        }).catch(function (err) {
          throw StitchErrorUtils_1.wrapDecodingError(err);
        });
      };

      CoreUserApiKeyAuthProviderClient.prototype.fetchApiKey = function (keyId) {
        var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder();
        reqBuilder.withMethod(Method_1.default.GET).withPath(this.getApiKeyRoute(keyId.toHexString()));
        reqBuilder.withRefreshToken();
        return this.requestClient.doAuthenticatedRequest(reqBuilder.build()).then(function (response) {
          return UserApiKey_1.default.readFromApi(response.body);
        }).catch(function (err) {
          throw StitchErrorUtils_1.wrapDecodingError(err);
        });
      };

      CoreUserApiKeyAuthProviderClient.prototype.fetchApiKeys = function () {
        var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder();
        reqBuilder.withMethod(Method_1.default.GET).withPath(this.baseRoute);
        reqBuilder.withRefreshToken();
        return this.requestClient.doAuthenticatedRequest(reqBuilder.build()).then(function (response) {
          var json = JSON.parse(response.body);

          if (Array.isArray(json)) {
            return json.map(function (value) {
              return UserApiKey_1.default.readFromApi(value);
            });
          }

          throw new StitchRequestError_1.default(new Error("unexpected non-array response from server"), StitchRequestErrorCode_1.StitchRequestErrorCode.DECODING_ERROR);
        }).catch(function (err) {
          throw StitchErrorUtils_1.wrapDecodingError(err);
        });
      };

      CoreUserApiKeyAuthProviderClient.prototype.deleteApiKey = function (keyId) {
        var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder();
        reqBuilder.withMethod(Method_1.default.DELETE).withPath(this.getApiKeyRoute(keyId.toHexString()));
        reqBuilder.withRefreshToken();
        return this.requestClient.doAuthenticatedRequest(reqBuilder.build()).then(function () {});
      };

      CoreUserApiKeyAuthProviderClient.prototype.enableApiKey = function (keyId) {
        var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder();
        reqBuilder.withMethod(Method_1.default.PUT).withPath(this.getApiKeyEnableRoute(keyId.toHexString()));
        reqBuilder.withRefreshToken();
        return this.requestClient.doAuthenticatedRequest(reqBuilder.build()).then(function () {});
      };

      CoreUserApiKeyAuthProviderClient.prototype.disableApiKey = function (keyId) {
        var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder();
        reqBuilder.withMethod(Method_1.default.PUT).withPath(this.getApiKeyDisableRoute(keyId.toHexString()));
        reqBuilder.withRefreshToken();
        return this.requestClient.doAuthenticatedRequest(reqBuilder.build()).then(function () {});
      };

      CoreUserApiKeyAuthProviderClient.prototype.getApiKeyRoute = function (keyId) {
        return this.baseRoute + "/" + keyId;
      };

      CoreUserApiKeyAuthProviderClient.prototype.getApiKeyEnableRoute = function (keyId) {
        return this.getApiKeyRoute(keyId) + "/enable";
      };

      CoreUserApiKeyAuthProviderClient.prototype.getApiKeyDisableRoute = function (keyId) {
        return this.getApiKeyRoute(keyId) + "/disable";
      };

      return CoreUserApiKeyAuthProviderClient;
    }(CoreAuthProviderClient_1.default);

    exports.default = CoreUserApiKeyAuthProviderClient;
  }, {
    "../../../StitchRequestError": 47,
    "../../../StitchRequestErrorCode": 48,
    "../../../internal/common/StitchErrorUtils": 91,
    "../../../internal/net/Method": 101,
    "../../../internal/net/StitchAuthDocRequest": 106,
    "../../../internal/net/StitchAuthRequest": 107,
    "../internal/CoreAuthProviderClient": 76,
    "./UserApiKeyAuthProvider": 81,
    "./models/UserApiKey": 83
  }],
  81: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var UserApiKeyAuthProvider = function () {
      function UserApiKeyAuthProvider() {}

      UserApiKeyAuthProvider.TYPE = "api-key";
      UserApiKeyAuthProvider.DEFAULT_NAME = "api-key";
      return UserApiKeyAuthProvider;
    }();

    exports.default = UserApiKeyAuthProvider;
  }, {}],
  82: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var ProviderCapabilities_1 = __importDefault(require("../../ProviderCapabilities"));

    var UserApiKeyAuthProvider_1 = __importDefault(require("./UserApiKeyAuthProvider"));

    var Fields;

    (function (Fields) {
      Fields["KEY"] = "key";
    })(Fields || (Fields = {}));

    var UserApiKeyCredential = function () {
      function UserApiKeyCredential(key, providerName) {
        var _a;

        if (providerName === void 0) {
          providerName = UserApiKeyAuthProvider_1.default.DEFAULT_NAME;
        }

        this.providerType = UserApiKeyAuthProvider_1.default.TYPE;
        this.providerCapabilities = new ProviderCapabilities_1.default(false);
        this.providerName = providerName;
        this.key = key;
        this.material = (_a = {}, _a[Fields.KEY] = this.key, _a);
      }

      return UserApiKeyCredential;
    }();

    exports.default = UserApiKeyCredential;
  }, {
    "../../ProviderCapabilities": 52,
    "./UserApiKeyAuthProvider": 81
  }],
  83: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var bson_1 = __importDefault(require("bson"));

    var Assertions_1 = __importDefault(require("../../../../internal/common/Assertions"));

    var Fields;

    (function (Fields) {
      Fields["ID"] = "_id";
      Fields["KEY"] = "key";
      Fields["NAME"] = "name";
      Fields["DISABLED"] = "disabled";
    })(Fields || (Fields = {}));

    var UserApiKey = function () {
      function UserApiKey(id, key, name, disabled) {
        this.id = bson_1.default.ObjectID.createFromHexString(id);
        this.key = key;
        this.name = name;
        this.disabled = disabled;
      }

      UserApiKey.readFromApi = function (json) {
        var body = typeof json === "string" ? JSON.parse(json) : json;
        Assertions_1.default.keyPresent(Fields.ID, body);
        Assertions_1.default.keyPresent(Fields.NAME, body);
        Assertions_1.default.keyPresent(Fields.DISABLED, body);
        return new UserApiKey(body[Fields.ID], body[Fields.KEY], body[Fields.NAME], body[Fields.DISABLED]);
      };

      UserApiKey.prototype.toJSON = function () {
        var _a;

        return _a = {}, _a[Fields.ID] = this.id, _a[Fields.KEY] = this.key, _a[Fields.NAME] = this.name, _a[Fields.DISABLED] = this.disabled, _a;
      };

      return UserApiKey;
    }();

    exports.default = UserApiKey;
  }, {
    "../../../../internal/common/Assertions": 89,
    "bson": 115
  }],
  84: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var Method_1 = __importDefault(require("../../../internal/net/Method"));

    var StitchDocRequest_1 = require("../../../internal/net/StitchDocRequest");

    var CoreAuthProviderClient_1 = __importDefault(require("../internal/CoreAuthProviderClient"));

    var UserPasswordAuthProvider_1 = __importDefault(require("./UserPasswordAuthProvider"));

    var RegistrationFields;

    (function (RegistrationFields) {
      RegistrationFields["EMAIL"] = "email";
      RegistrationFields["PASSWORD"] = "password";
    })(RegistrationFields || (RegistrationFields = {}));

    var ActionFields;

    (function (ActionFields) {
      ActionFields["EMAIL"] = "email";
      ActionFields["PASSWORD"] = "password";
      ActionFields["TOKEN"] = "token";
      ActionFields["TOKEN_ID"] = "tokenId";
    })(ActionFields || (ActionFields = {}));

    var CoreUserPasswordAuthProviderClient = function (_super) {
      __extends(CoreUserPasswordAuthProviderClient, _super);

      function CoreUserPasswordAuthProviderClient(providerName, requestClient, authRoutes) {
        if (providerName === void 0) {
          providerName = UserPasswordAuthProvider_1.default.DEFAULT_NAME;
        }

        var _this = this;

        var baseRoute = authRoutes.getAuthProviderRoute(providerName);
        _this = _super.call(this, providerName, requestClient, baseRoute) || this;
        return _this;
      }

      CoreUserPasswordAuthProviderClient.prototype.registerWithEmailInternal = function (email, password) {
        var _a;

        var reqBuilder = new StitchDocRequest_1.StitchDocRequest.Builder();
        reqBuilder.withMethod(Method_1.default.POST).withPath(this.getRegisterWithEmailRoute());
        reqBuilder.withDocument((_a = {}, _a[RegistrationFields.EMAIL] = email, _a[RegistrationFields.PASSWORD] = password, _a));
        return this.requestClient.doRequest(reqBuilder.build()).then(function () {});
      };

      CoreUserPasswordAuthProviderClient.prototype.confirmUserInternal = function (token, tokenId) {
        var _a;

        var reqBuilder = new StitchDocRequest_1.StitchDocRequest.Builder();
        reqBuilder.withMethod(Method_1.default.POST).withPath(this.getConfirmUserRoute());
        reqBuilder.withDocument((_a = {}, _a[ActionFields.TOKEN] = token, _a[ActionFields.TOKEN_ID] = tokenId, _a));
        return this.requestClient.doRequest(reqBuilder.build()).then(function () {});
      };

      CoreUserPasswordAuthProviderClient.prototype.resendConfirmationEmailInternal = function (email) {
        var _a;

        var reqBuilder = new StitchDocRequest_1.StitchDocRequest.Builder();
        reqBuilder.withMethod(Method_1.default.POST).withPath(this.getResendConfirmationEmailRoute());
        reqBuilder.withDocument((_a = {}, _a[ActionFields.EMAIL] = email, _a));
        return this.requestClient.doRequest(reqBuilder.build()).then(function () {});
      };

      CoreUserPasswordAuthProviderClient.prototype.resetPasswordInternal = function (token, tokenId, password) {
        var _a;

        var reqBuilder = new StitchDocRequest_1.StitchDocRequest.Builder();
        reqBuilder.withMethod(Method_1.default.POST).withPath(this.getResetPasswordRoute());
        reqBuilder.withDocument((_a = {}, _a[ActionFields.TOKEN] = token, _a[ActionFields.TOKEN_ID] = tokenId, _a[ActionFields.PASSWORD] = password, _a));
        return this.requestClient.doRequest(reqBuilder.build()).then(function () {});
      };

      CoreUserPasswordAuthProviderClient.prototype.sendResetPasswordEmailInternal = function (email) {
        var _a;

        var reqBuilder = new StitchDocRequest_1.StitchDocRequest.Builder();
        reqBuilder.withMethod(Method_1.default.POST).withPath(this.getSendResetPasswordEmailRoute());
        reqBuilder.withDocument((_a = {}, _a[ActionFields.EMAIL] = email, _a));
        return this.requestClient.doRequest(reqBuilder.build()).then(function () {});
      };

      CoreUserPasswordAuthProviderClient.prototype.getRegisterWithEmailRoute = function () {
        return this.getExtensionRoute("register");
      };

      CoreUserPasswordAuthProviderClient.prototype.getConfirmUserRoute = function () {
        return this.getExtensionRoute("confirm");
      };

      CoreUserPasswordAuthProviderClient.prototype.getResendConfirmationEmailRoute = function () {
        return this.getExtensionRoute("confirm/send");
      };

      CoreUserPasswordAuthProviderClient.prototype.getResetPasswordRoute = function () {
        return this.getExtensionRoute("reset");
      };

      CoreUserPasswordAuthProviderClient.prototype.getSendResetPasswordEmailRoute = function () {
        return this.getExtensionRoute("reset/send");
      };

      CoreUserPasswordAuthProviderClient.prototype.getExtensionRoute = function (path) {
        return this.baseRoute + "/" + path;
      };

      return CoreUserPasswordAuthProviderClient;
    }(CoreAuthProviderClient_1.default);

    exports.default = CoreUserPasswordAuthProviderClient;
  }, {
    "../../../internal/net/Method": 101,
    "../../../internal/net/StitchDocRequest": 108,
    "../internal/CoreAuthProviderClient": 76,
    "./UserPasswordAuthProvider": 85
  }],
  85: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var UserPasswordAuthProvider = function () {
      function UserPasswordAuthProvider() {}

      UserPasswordAuthProvider.TYPE = "local-userpass";
      UserPasswordAuthProvider.DEFAULT_NAME = "local-userpass";
      return UserPasswordAuthProvider;
    }();

    exports.default = UserPasswordAuthProvider;
  }, {}],
  86: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var ProviderCapabilities_1 = __importDefault(require("../../ProviderCapabilities"));

    var UserPasswordAuthProvider_1 = __importDefault(require("./UserPasswordAuthProvider"));

    var Fields;

    (function (Fields) {
      Fields["USERNAME"] = "username";
      Fields["PASSWORD"] = "password";
    })(Fields || (Fields = {}));

    var UserPasswordCredential = function () {
      function UserPasswordCredential(username, password, providerName) {
        var _a;

        if (providerName === void 0) {
          providerName = UserPasswordAuthProvider_1.default.DEFAULT_NAME;
        }

        this.username = username;
        this.password = password;
        this.providerName = providerName;
        this.providerType = UserPasswordAuthProvider_1.default.TYPE;
        this.providerCapabilities = new ProviderCapabilities_1.default(false);
        this.material = (_a = {}, _a[Fields.USERNAME] = this.username, _a[Fields.PASSWORD] = this.password, _a);
      }

      return UserPasswordCredential;
    }();

    exports.default = UserPasswordCredential;
  }, {
    "../../ProviderCapabilities": 52,
    "./UserPasswordAuthProvider": 85
  }],
  87: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var bson_1 = __importDefault(require("bson"));

    exports.BSON = bson_1.default;

    var AuthInfo_1 = __importDefault(require("./auth/internal/AuthInfo"));

    exports.AuthInfo = AuthInfo_1.default;

    var CoreStitchAuth_1 = __importDefault(require("./auth/internal/CoreStitchAuth"));

    exports.CoreStitchAuth = CoreStitchAuth_1.default;

    var CoreStitchUserImpl_1 = __importDefault(require("./auth/internal/CoreStitchUserImpl"));

    exports.CoreStitchUserImpl = CoreStitchUserImpl_1.default;

    var DeviceFields_1 = __importDefault(require("./auth/internal/DeviceFields"));

    exports.DeviceFields = DeviceFields_1.default;

    var ApiStitchUserIdentity_1 = __importDefault(require("./auth/internal/models/ApiStitchUserIdentity"));

    exports.ApiStitchUserIdentity = ApiStitchUserIdentity_1.default;

    var StitchUserProfileImpl_1 = __importDefault(require("./auth/internal/StitchUserProfileImpl"));

    exports.StitchUserProfileImpl = StitchUserProfileImpl_1.default;

    var AnonymousAuthProvider_1 = __importDefault(require("./auth/providers/anonymous/AnonymousAuthProvider"));

    exports.AnonymousAuthProvider = AnonymousAuthProvider_1.default;

    var AnonymousCredential_1 = __importDefault(require("./auth/providers/anonymous/AnonymousCredential"));

    exports.AnonymousCredential = AnonymousCredential_1.default;

    var CustomAuthProvider_1 = __importDefault(require("./auth/providers/custom/CustomAuthProvider"));

    exports.CustomAuthProvider = CustomAuthProvider_1.default;

    var CustomCredential_1 = __importDefault(require("./auth/providers/custom/CustomCredential"));

    exports.CustomCredential = CustomCredential_1.default;

    var FacebookAuthProvider_1 = __importDefault(require("./auth/providers/facebook/FacebookAuthProvider"));

    exports.FacebookAuthProvider = FacebookAuthProvider_1.default;

    var FacebookCredential_1 = __importDefault(require("./auth/providers/facebook/FacebookCredential"));

    exports.FacebookCredential = FacebookCredential_1.default;

    var GoogleAuthProvider_1 = __importDefault(require("./auth/providers/google/GoogleAuthProvider"));

    exports.GoogleAuthProvider = GoogleAuthProvider_1.default;

    var GoogleCredential_1 = __importDefault(require("./auth/providers/google/GoogleCredential"));

    exports.GoogleCredential = GoogleCredential_1.default;

    var StitchAuthResponseCredential_1 = __importDefault(require("./auth/providers/internal/StitchAuthResponseCredential"));

    exports.StitchAuthCredential = StitchAuthResponseCredential_1.default;

    var StitchAuthResponseCredential_2 = __importDefault(require("./auth/providers/internal/StitchAuthResponseCredential"));

    exports.StitchAuthResponseCredential = StitchAuthResponseCredential_2.default;

    var ServerApiKeyAuthProvider_1 = __importDefault(require("./auth/providers/serverapikey/ServerApiKeyAuthProvider"));

    exports.ServerApiKeyAuthProvider = ServerApiKeyAuthProvider_1.default;

    var ServerApiKeyCredential_1 = __importDefault(require("./auth/providers/serverapikey/ServerApiKeyCredential"));

    exports.ServerApiKeyCredential = ServerApiKeyCredential_1.default;

    var CoreUserApiKeyAuthProviderClient_1 = __importDefault(require("./auth/providers/userapikey/CoreUserApiKeyAuthProviderClient"));

    exports.CoreUserApiKeyAuthProviderClient = CoreUserApiKeyAuthProviderClient_1.default;

    var UserApiKey_1 = __importDefault(require("./auth/providers/userapikey/models/UserApiKey"));

    exports.UserApiKey = UserApiKey_1.default;

    var UserApiKeyAuthProvider_1 = __importDefault(require("./auth/providers/userapikey/UserApiKeyAuthProvider"));

    exports.UserApiKeyAuthProvider = UserApiKeyAuthProvider_1.default;

    var UserApiKeyCredential_1 = __importDefault(require("./auth/providers/userapikey/UserApiKeyCredential"));

    exports.UserApiKeyCredential = UserApiKeyCredential_1.default;

    var CoreUserPasswordAuthProviderClient_1 = __importDefault(require("./auth/providers/userpass/CoreUserPasswordAuthProviderClient"));

    exports.CoreUserPassAuthProviderClient = CoreUserPasswordAuthProviderClient_1.default;

    var UserPasswordAuthProvider_1 = __importDefault(require("./auth/providers/userpass/UserPasswordAuthProvider"));

    exports.UserPasswordAuthProvider = UserPasswordAuthProvider_1.default;

    var UserPasswordCredential_1 = __importDefault(require("./auth/providers/userpass/UserPasswordCredential"));

    exports.UserPasswordCredential = UserPasswordCredential_1.default;

    var StitchUserIdentity_1 = __importDefault(require("./auth/StitchUserIdentity"));

    exports.StitchUserIdentity = StitchUserIdentity_1.default;

    var UserType_1 = __importDefault(require("./auth/UserType"));

    exports.UserType = UserType_1.default;

    var Assertions_1 = __importDefault(require("./internal/common/Assertions"));

    exports.Assertions = Assertions_1.default;

    var Base64_1 = require("./internal/common/Base64");

    exports.base64Decode = Base64_1.base64Decode;
    exports.base64Encode = Base64_1.base64Encode;
    exports.utf8Slice = Base64_1.utf8Slice;

    var Storage_1 = require("./internal/common/Storage");

    exports.MemoryStorage = Storage_1.MemoryStorage;

    var StitchErrorUtils_1 = require("./internal/common/StitchErrorUtils");

    exports.handleRequestError = StitchErrorUtils_1.handleRequestError;

    var CoreStitchAppClient_1 = __importDefault(require("./internal/CoreStitchAppClient"));

    exports.CoreStitchAppClient = CoreStitchAppClient_1.default;

    var BasicRequest_1 = require("./internal/net/BasicRequest");

    exports.BasicRequest = BasicRequest_1.BasicRequest;

    var ContentTypes_1 = __importDefault(require("./internal/net/ContentTypes"));

    exports.ContentTypes = ContentTypes_1.default;

    var Event_1 = __importDefault(require("./internal/net/Event"));

    exports.Event = Event_1.default;

    var BaseEventStream_1 = __importDefault(require("./internal/net/BaseEventStream"));

    exports.BaseEventStream = BaseEventStream_1.default;

    var StitchEvent_1 = __importDefault(require("./internal/net/StitchEvent"));

    exports.StitchEvent = StitchEvent_1.default;

    var FetchTransport_1 = __importDefault(require("./internal/net/FetchTransport"));

    exports.FetchTransport = FetchTransport_1.default;

    var Headers_1 = __importDefault(require("./internal/net/Headers"));

    exports.Headers = Headers_1.default;

    var Method_1 = __importDefault(require("./internal/net/Method"));

    exports.Method = Method_1.default;

    var Response_1 = __importDefault(require("./internal/net/Response"));

    exports.Response = Response_1.default;

    var Stream_1 = __importDefault(require("./Stream"));

    exports.Stream = Stream_1.default;

    var StitchAppAuthRoutes_1 = __importDefault(require("./internal/net/StitchAppAuthRoutes"));

    exports.StitchAppAuthRoutes = StitchAppAuthRoutes_1.default;

    var StitchAppRequestClient_1 = __importDefault(require("./internal/net/StitchAppRequestClient"));

    exports.StitchAppRequestClient = StitchAppRequestClient_1.default;

    var StitchAppRoutes_1 = __importDefault(require("./internal/net/StitchAppRoutes"));

    exports.StitchAppRoutes = StitchAppRoutes_1.default;

    var StitchAuthRequest_1 = require("./internal/net/StitchAuthRequest");

    exports.StitchAuthRequest = StitchAuthRequest_1.StitchAuthRequest;

    var StitchRequestClient_1 = __importDefault(require("./internal/net/StitchRequestClient"));

    exports.StitchRequestClient = StitchRequestClient_1.default;

    var CoreStitchServiceClientImpl_1 = __importDefault(require("./services/internal/CoreStitchServiceClientImpl"));

    exports.CoreStitchServiceClientImpl = CoreStitchServiceClientImpl_1.default;

    var StitchServiceRoutes_1 = __importDefault(require("./services/internal/StitchServiceRoutes"));

    exports.StitchServiceRoutes = StitchServiceRoutes_1.default;

    var StitchAppClientConfiguration_1 = require("./StitchAppClientConfiguration");

    exports.StitchAppClientConfiguration = StitchAppClientConfiguration_1.StitchAppClientConfiguration;

    var StitchAppClientInfo_1 = __importDefault(require("./StitchAppClientInfo"));

    exports.StitchAppClientInfo = StitchAppClientInfo_1.default;

    var StitchClientError_1 = __importDefault(require("./StitchClientError"));

    exports.StitchClientError = StitchClientError_1.default;

    var StitchClientErrorCode_1 = require("./StitchClientErrorCode");

    exports.StitchClientErrorCode = StitchClientErrorCode_1.StitchClientErrorCode;

    var StitchError_1 = __importDefault(require("./StitchError"));

    exports.StitchError = StitchError_1.default;

    var StitchRequestError_1 = __importDefault(require("./StitchRequestError"));

    exports.StitchRequestError = StitchRequestError_1.default;

    var StitchRequestErrorCode_1 = require("./StitchRequestErrorCode");

    exports.StitchRequestErrorCode = StitchRequestErrorCode_1.StitchRequestErrorCode;

    var StitchServiceError_1 = __importDefault(require("./StitchServiceError"));

    exports.StitchServiceError = StitchServiceError_1.default;

    var StitchServiceErrorCode_1 = require("./StitchServiceErrorCode");

    exports.StitchServiceErrorCode = StitchServiceErrorCode_1.StitchServiceErrorCode;
  }, {
    "./StitchAppClientConfiguration": 41,
    "./StitchAppClientInfo": 42,
    "./StitchClientError": 44,
    "./StitchClientErrorCode": 45,
    "./StitchError": 46,
    "./StitchRequestError": 47,
    "./StitchRequestErrorCode": 48,
    "./StitchServiceError": 49,
    "./StitchServiceErrorCode": 50,
    "./Stream": 51,
    "./auth/StitchUserIdentity": 53,
    "./auth/UserType": 54,
    "./auth/internal/AuthInfo": 56,
    "./auth/internal/CoreStitchAuth": 57,
    "./auth/internal/CoreStitchUserImpl": 58,
    "./auth/internal/DeviceFields": 59,
    "./auth/internal/StitchUserProfileImpl": 61,
    "./auth/internal/models/ApiStitchUserIdentity": 64,
    "./auth/providers/anonymous/AnonymousAuthProvider": 68,
    "./auth/providers/anonymous/AnonymousCredential": 69,
    "./auth/providers/custom/CustomAuthProvider": 70,
    "./auth/providers/custom/CustomCredential": 71,
    "./auth/providers/facebook/FacebookAuthProvider": 72,
    "./auth/providers/facebook/FacebookCredential": 73,
    "./auth/providers/google/GoogleAuthProvider": 74,
    "./auth/providers/google/GoogleCredential": 75,
    "./auth/providers/internal/StitchAuthResponseCredential": 77,
    "./auth/providers/serverapikey/ServerApiKeyAuthProvider": 78,
    "./auth/providers/serverapikey/ServerApiKeyCredential": 79,
    "./auth/providers/userapikey/CoreUserApiKeyAuthProviderClient": 80,
    "./auth/providers/userapikey/UserApiKeyAuthProvider": 81,
    "./auth/providers/userapikey/UserApiKeyCredential": 82,
    "./auth/providers/userapikey/models/UserApiKey": 83,
    "./auth/providers/userpass/CoreUserPasswordAuthProviderClient": 84,
    "./auth/providers/userpass/UserPasswordAuthProvider": 85,
    "./auth/providers/userpass/UserPasswordCredential": 86,
    "./internal/CoreStitchAppClient": 88,
    "./internal/common/Assertions": 89,
    "./internal/common/Base64": 90,
    "./internal/common/StitchErrorUtils": 91,
    "./internal/common/Storage": 92,
    "./internal/net/BaseEventStream": 94,
    "./internal/net/BasicRequest": 96,
    "./internal/net/ContentTypes": 97,
    "./internal/net/Event": 98,
    "./internal/net/FetchTransport": 99,
    "./internal/net/Headers": 100,
    "./internal/net/Method": 101,
    "./internal/net/Response": 102,
    "./internal/net/StitchAppAuthRoutes": 103,
    "./internal/net/StitchAppRequestClient": 104,
    "./internal/net/StitchAppRoutes": 105,
    "./internal/net/StitchAuthRequest": 107,
    "./internal/net/StitchEvent": 109,
    "./internal/net/StitchRequestClient": 111,
    "./services/internal/CoreStitchServiceClientImpl": 113,
    "./services/internal/StitchServiceRoutes": 114,
    "bson": 115
  }],
  88: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var CoreStitchServiceClientImpl_1 = __importDefault(require("../services/internal/CoreStitchServiceClientImpl"));

    var CoreStitchAppClient = function () {
      function CoreStitchAppClient(authRequestClient, routes) {
        this.functionService = new CoreStitchServiceClientImpl_1.default(authRequestClient, routes.serviceRoutes);
      }

      CoreStitchAppClient.prototype.callFunction = function (name, args, decoder) {
        return this.functionService.callFunction(name, args, decoder);
      };

      return CoreStitchAppClient;
    }();

    exports.default = CoreStitchAppClient;
  }, {
    "../services/internal/CoreStitchServiceClientImpl": 113
  }],
  89: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var Assertions = function () {
      function Assertions() {}

      Assertions.keyPresent = function (key, object) {
        if (object[key] === undefined) {
          throw new Error("expected " + key + " to be present");
        }
      };

      return Assertions;
    }();

    exports.default = Assertions;
  }, {}],
  90: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var base64_js_1 = require("base64-js");

    function base64Decode(str) {
      var unevenBytes = str.length % 4;
      var strToDecode;

      if (unevenBytes != 0) {
        var paddingNeeded = 4 - unevenBytes;
        strToDecode = str + "=".repeat(paddingNeeded);
      } else {
        strToDecode = str;
      }

      var bytes = base64_js_1.toByteArray(strToDecode);
      return utf8Slice(bytes, 0, bytes.length);
    }

    exports.base64Decode = base64Decode;

    function base64Encode(str) {
      var result;

      if ("undefined" === typeof Uint8Array) {
        result = utf8ToBytes(str);
      }

      result = new Uint8Array(utf8ToBytes(str));
      return base64_js_1.fromByteArray(result);
    }

    exports.base64Encode = base64Encode;

    function utf8ToBytes(string) {
      var units = Infinity;
      var codePoint;
      var length = string.length;
      var leadSurrogate = null;
      var bytes = [];
      var i = 0;

      for (; i < length; i++) {
        codePoint = string.charCodeAt(i);

        if (codePoint > 0xd7ff && codePoint < 0xe000) {
          if (leadSurrogate) {
            if (codePoint < 0xdc00) {
              if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
              leadSurrogate = codePoint;
              continue;
            } else {
              codePoint = leadSurrogate - 0xd800 << 10 | codePoint - 0xdc00 | 0x10000;
              leadSurrogate = null;
            }
          } else {
            if (codePoint > 0xdbff) {
              if ((units -= 3) > -1) {
                bytes.push(0xef, 0xbf, 0xbd);
              }

              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1) {
                bytes.push(0xef, 0xbf, 0xbd);
              }

              continue;
            } else {
              leadSurrogate = codePoint;
              continue;
            }
          }
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) {
            bytes.push(0xef, 0xbf, 0xbd);
          }

          leadSurrogate = null;
        }

        if (codePoint < 0x80) {
          if ((units -= 1) < 0) {
            break;
          }

          bytes.push(codePoint);
        } else if (codePoint < 0x800) {
          if ((units -= 2) < 0) {
            break;
          }

          bytes.push(codePoint >> 0x6 | 0xc0, codePoint & 0x3f | 0x80);
        } else if (codePoint < 0x10000) {
          if ((units -= 3) < 0) {
            break;
          }

          bytes.push(codePoint >> 0xc | 0xe0, codePoint >> 0x6 & 0x3f | 0x80, codePoint & 0x3f | 0x80);
        } else if (codePoint < 0x200000) {
          if ((units -= 4) < 0) {
            break;
          }

          bytes.push(codePoint >> 0x12 | 0xf0, codePoint >> 0xc & 0x3f | 0x80, codePoint >> 0x6 & 0x3f | 0x80, codePoint & 0x3f | 0x80);
        } else {
          throw new Error("Invalid code point");
        }
      }

      return bytes;
    }

    function utf8Slice(buf, start, end) {
      var res = "";
      var tmp = "";
      end = Math.min(buf.length, end || Infinity);
      start = start || 0;

      for (var i = start; i < end; i++) {
        if (buf[i] <= 0x7f) {
          res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i]);
          tmp = "";
        } else {
          tmp += "%" + buf[i].toString(16);
        }
      }

      return res + decodeUtf8Char(tmp);
    }

    exports.utf8Slice = utf8Slice;

    function decodeUtf8Char(str) {
      try {
        return decodeURIComponent(str);
      } catch (err) {
        return String.fromCharCode(0xfffd);
      }
    }
  }, {
    "base64-js": 6
  }],
  91: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var ContentTypes_1 = __importDefault(require("../net/ContentTypes"));

    var Headers_1 = __importDefault(require("../net/Headers"));

    var StitchError_1 = __importDefault(require("../../StitchError"));

    var StitchRequestErrorCode_1 = require("../../StitchRequestErrorCode");

    var StitchRequestError_1 = __importDefault(require("../../StitchRequestError"));

    var StitchServiceErrorCode_1 = require("../../StitchServiceErrorCode");

    var StitchServiceError_1 = __importDefault(require("../../StitchServiceError"));

    var Fields;

    (function (Fields) {
      Fields["ERROR"] = "error";
      Fields["ERROR_CODE"] = "error_code";
    })(Fields || (Fields = {}));

    function wrapDecodingError(err) {
      if (err instanceof StitchError_1.default) {
        return err;
      }

      return new StitchRequestError_1.default(err, StitchRequestErrorCode_1.StitchRequestErrorCode.DECODING_ERROR);
    }

    exports.wrapDecodingError = wrapDecodingError;

    function handleRequestError(response) {
      if (response.body === undefined) {
        throw new StitchServiceError_1.default("received unexpected status code " + response.statusCode, StitchServiceErrorCode_1.StitchServiceErrorCode.Unknown);
      }

      var body;

      try {
        body = response.body;
      } catch (e) {
        throw new StitchServiceError_1.default("received unexpected status code " + response.statusCode, StitchServiceErrorCode_1.StitchServiceErrorCode.Unknown);
      }

      var errorMsg = handleRichError(response, body);
      throw new StitchServiceError_1.default(errorMsg, StitchServiceErrorCode_1.StitchServiceErrorCode.Unknown);
    }

    exports.handleRequestError = handleRequestError;

    function handleRichError(response, body) {
      if (response.headers[Headers_1.default.CONTENT_TYPE] === undefined || response.headers[Headers_1.default.CONTENT_TYPE] !== undefined && response.headers[Headers_1.default.CONTENT_TYPE] !== ContentTypes_1.default.APPLICATION_JSON) {
        return body;
      }

      var bsonObj = JSON.parse(body);

      if (!(bsonObj instanceof Object)) {
        return body;
      }

      var doc = bsonObj;

      if (doc[Fields.ERROR] === undefined) {
        return body;
      }

      var errorMsg = doc[Fields.ERROR];

      if (doc[Fields.ERROR_CODE] === undefined) {
        return errorMsg;
      }

      var errorCode = doc[Fields.ERROR_CODE];
      throw new StitchServiceError_1.default(errorMsg, StitchServiceErrorCode_1.stitchServiceErrorCodeFromApi(errorCode));
    }
  }, {
    "../../StitchError": 46,
    "../../StitchRequestError": 47,
    "../../StitchRequestErrorCode": 48,
    "../../StitchServiceError": 49,
    "../../StitchServiceErrorCode": 50,
    "../net/ContentTypes": 97,
    "../net/Headers": 100
  }],
  92: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var MemoryStorage = function () {
      function MemoryStorage(suiteName) {
        this.suiteName = suiteName;
        this.storage = {};
      }

      MemoryStorage.prototype.get = function (key) {
        return this.storage[this.suiteName + "." + key];
      };

      MemoryStorage.prototype.set = function (key, value) {
        this.storage[this.suiteName + "." + key] = value;
      };

      MemoryStorage.prototype.remove = function (key) {
        delete this.storage[this.suiteName + "." + key];
      };

      return MemoryStorage;
    }();

    exports.MemoryStorage = MemoryStorage;
  }, {}],
  93: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Fields;

    (function (Fields) {
      Fields["DEPLOYMENT_MODEL"] = "deployment_model";
      Fields["LOCATION"] = "location";
      Fields["HOSTNAME"] = "hostname";
    })(Fields || (Fields = {}));

    var ApiAppMetadata = function () {
      function ApiAppMetadata(deploymentModel, location, hostname) {
        this.deploymentModel = deploymentModel;
        this.location = location;
        this.hostname = hostname;
      }

      ApiAppMetadata.fromJSON = function (json) {
        return new ApiAppMetadata(json[Fields.DEPLOYMENT_MODEL], json[Fields.LOCATION], json[Fields.HOSTNAME]);
      };

      ApiAppMetadata.prototype.toJSON = function () {
        var _a;

        return _a = {}, _a[Fields.DEPLOYMENT_MODEL] = this.deploymentModel, _a[Fields.LOCATION] = this.location, _a[Fields.HOSTNAME] = this.hostname, _a;
      };

      return ApiAppMetadata;
    }();

    exports.default = ApiAppMetadata;
  }, {}],
  94: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var Event_1 = __importDefault(require("./Event"));

    var StitchEvent_1 = __importDefault(require("./StitchEvent"));

    var StitchError_1 = __importDefault(require("../../StitchError"));

    var StitchRequestError_1 = __importDefault(require("../../StitchRequestError"));

    var BaseEventStream = function () {
      function BaseEventStream(reconnecter) {
        this.reconnecter = reconnecter;
        this.closed = false;
        this.events = [];
        this.listeners = [];
        this.lastErr = undefined;
      }

      BaseEventStream.prototype.reconnect = function (error) {
        var _this = this;

        if (!this.reconnecter) {
          if (!this.closed) {
            this.closed = true;
            this.events.push(new Event_1.default(StitchEvent_1.default.ERROR_EVENT_NAME, "stream closed: " + error));
            this.poll();
          }

          return;
        }

        this.reconnecter().then(function (next) {
          _this.onReconnect(next);
        }).catch(function (e) {
          if (!(e instanceof StitchError_1.default) || !(e instanceof StitchRequestError_1.default)) {
            _this.closed = true;

            _this.events.push(new Event_1.default(StitchEvent_1.default.ERROR_EVENT_NAME, "stream closed: " + error));

            _this.poll();

            return;
          }

          setTimeout(function () {
            return _this.reconnect(e);
          }, BaseEventStream.RETRY_TIMEOUT_MILLIS);
        });
      };

      BaseEventStream.prototype.poll = function () {
        while (this.events.length !== 0) {
          var event_1 = this.events.pop();

          for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];

            if (listener.onEvent) {
              listener.onEvent(event_1);
            }
          }
        }
      };

      BaseEventStream.prototype.addListener = function (listener) {
        var _this = this;

        if (this.closed) {
          setTimeout(function () {
            return listener.onEvent(new Event_1.default(StitchEvent_1.default.ERROR_EVENT_NAME, "stream closed"));
          }, 0);
          return;
        }

        if (this.lastErr !== undefined) {
          setTimeout(function () {
            return listener.onEvent(new Event_1.default(StitchEvent_1.default.ERROR_EVENT_NAME, _this.lastErr));
          }, 0);
          return;
        }

        this.listeners.push(listener);
        this.poll();
      };

      BaseEventStream.prototype.removeListener = function (listener) {
        var index = this.listeners.indexOf(listener);

        if (index === -1) {
          return;
        }

        this.listeners.splice(index, 1);
      };

      BaseEventStream.prototype.listenOnce = function (listener) {
        var _this = this;

        if (this.closed) {
          setTimeout(function () {
            return listener.onEvent(new Event_1.default(StitchEvent_1.default.ERROR_EVENT_NAME, "stream closed"));
          }, 0);
          return;
        }

        if (this.lastErr !== undefined) {
          setTimeout(function () {
            return listener.onEvent(new Event_1.default(StitchEvent_1.default.ERROR_EVENT_NAME, _this.lastErr));
          }, 0);
          return;
        }

        var wrapper = {
          onEvent: function onEvent(e) {
            _this.removeListener(wrapper);

            listener.onEvent(e);
          }
        };
        this.addListener(wrapper);
      };

      BaseEventStream.prototype.nextEvent = function () {
        var _this = this;

        if (this.closed) {
          return Promise.reject(new Event_1.default(StitchEvent_1.default.ERROR_EVENT_NAME, "stream closed"));
        }

        if (this.lastErr !== undefined) {
          return Promise.reject(new Event_1.default(StitchEvent_1.default.ERROR_EVENT_NAME, this.lastErr));
        }

        return new Promise(function (resolve, reject) {
          _this.listenOnce({
            onEvent: function onEvent(e) {
              resolve(e);
            }
          });
        });
      };

      BaseEventStream.prototype.close = function () {
        if (this.closed) {
          return;
        }

        this.closed = true;
        this.afterClose();
      };

      BaseEventStream.RETRY_TIMEOUT_MILLIS = 5000;
      return BaseEventStream;
    }();

    exports.default = BaseEventStream;
  }, {
    "../../StitchError": 46,
    "../../StitchRequestError": 47,
    "./Event": 98,
    "./StitchEvent": 109
  }],
  95: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var StitchErrorUtils_1 = require("../../internal/common/StitchErrorUtils");

    var StitchRequestErrorCode_1 = require("../../StitchRequestErrorCode");

    var StitchError_1 = __importDefault(require("../../StitchError"));

    var StitchRequestError_1 = __importDefault(require("../../StitchRequestError"));

    var BasicRequest_1 = require("./BasicRequest");

    function inspectResponse(request, url, response) {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        return response;
      }

      return StitchErrorUtils_1.handleRequestError(response);
    }

    var BaseStitchRequestClient = function () {
      function BaseStitchRequestClient(baseUrl, transport) {
        this.baseUrl = baseUrl;
        this.transport = transport;
      }

      BaseStitchRequestClient.prototype.doRequestToURL = function (stitchReq, url) {
        return this.transport.roundTrip(this.buildRequest(stitchReq, url)).catch(function (error) {
          throw new StitchRequestError_1.default(error, StitchRequestErrorCode_1.StitchRequestErrorCode.TRANSPORT_ERROR);
        }).then(function (resp) {
          return inspectResponse(stitchReq, url, resp);
        });
      };

      BaseStitchRequestClient.prototype.doStreamRequestToURL = function (stitchReq, url, open, retryRequest) {
        if (open === void 0) {
          open = true;
        }

        return this.transport.stream(this.buildRequest(stitchReq, url), open, retryRequest).catch(function (error) {
          if (error instanceof StitchError_1.default) {
            throw error;
          }

          throw new StitchRequestError_1.default(error, StitchRequestErrorCode_1.StitchRequestErrorCode.TRANSPORT_ERROR);
        });
      };

      BaseStitchRequestClient.prototype.buildRequest = function (stitchReq, url) {
        return new BasicRequest_1.BasicRequest.Builder().withMethod(stitchReq.method).withUrl("" + url + stitchReq.path).withHeaders(stitchReq.headers).withBody(stitchReq.body).build();
      };

      return BaseStitchRequestClient;
    }();

    exports.default = BaseStitchRequestClient;
  }, {
    "../../StitchError": 46,
    "../../StitchRequestError": 47,
    "../../StitchRequestErrorCode": 48,
    "../../internal/common/StitchErrorUtils": 91,
    "./BasicRequest": 96
  }],
  96: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var BasicRequest = function () {
      function BasicRequest(method, url, headers, body) {
        this.method = method;
        this.url = url;
        this.headers = headers;
        this.body = body;
      }

      return BasicRequest;
    }();

    exports.BasicRequest = BasicRequest;

    (function (BasicRequest) {
      var Builder = function () {
        function Builder(request) {
          if (!request) {
            return;
          }

          this.method = request.method;
          this.url = request.url;
          this.headers = request.headers;
          this.body = request.body;
        }

        Builder.prototype.withMethod = function (method) {
          this.method = method;
          return this;
        };

        Builder.prototype.withUrl = function (url) {
          this.url = url;
          return this;
        };

        Builder.prototype.withHeaders = function (headers) {
          this.headers = headers;
          return this;
        };

        Builder.prototype.withBody = function (body) {
          this.body = body;
          return this;
        };

        Builder.prototype.build = function () {
          if (this.method === undefined) {
            throw new Error("must set method");
          }

          if (this.url === undefined) {
            throw new Error("must set non-empty url");
          }

          return new BasicRequest(this.method, this.url, this.headers === undefined ? {} : this.headers, this.body);
        };

        return Builder;
      }();

      BasicRequest.Builder = Builder;
    })(BasicRequest = exports.BasicRequest || (exports.BasicRequest = {}));

    exports.BasicRequest = BasicRequest;
  }, {}],
  97: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var ContentTypes = function () {
      function ContentTypes() {}

      ContentTypes.APPLICATION_JSON = "application/json";
      ContentTypes.TEXT_EVENT_STREAM = "text/event-stream";
      return ContentTypes;
    }();

    exports.default = ContentTypes;
  }, {}],
  98: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var Event = function () {
      function Event(eventName, data) {
        this.eventName = eventName;
        this.data = data;
      }

      Event.MESSAGE_EVENT = "message";
      return Event;
    }();

    exports.default = Event;
  }, {}],
  99: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var Response_1 = __importDefault(require("./Response"));

    var StitchClientError_1 = __importDefault(require("../../StitchClientError"));

    var StitchClientErrorCode_1 = require("../../StitchClientErrorCode");

    var cross_fetch_1 = __importDefault(require("cross-fetch"));

    var FetchTransport = function () {
      function FetchTransport() {}

      FetchTransport.prototype.roundTrip = function (request) {
        var responsePromise = cross_fetch_1.default(request.url, {
          body: request.body,
          headers: request.headers,
          method: request.method,
          mode: 'cors'
        });
        var responseTextPromise = responsePromise.then(function (response) {
          return response.text();
        });
        return Promise.all([responsePromise, responseTextPromise]).then(function (values) {
          var response = values[0];
          var body = values[1];
          var headers = {};
          response.headers.forEach(function (value, key) {
            headers[key] = value;
          });
          return new Response_1.default(headers, response.status, body);
        });
      };

      FetchTransport.prototype.stream = function (request, open, retryRequest) {
        if (open === void 0) {
          open = true;
        }

        throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.StreamingNotSupported);
      };

      return FetchTransport;
    }();

    exports.default = FetchTransport;
  }, {
    "../../StitchClientError": 44,
    "../../StitchClientErrorCode": 45,
    "./Response": 102,
    "cross-fetch": 8
  }],
  100: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var Headers = function () {
      function Headers() {}

      Headers.getAuthorizationBearer = function (value) {
        return Headers.AUTHORIZATION_BEARER + " " + value;
      };

      Headers.CONTENT_TYPE_CANON = "Content-Type";
      Headers.CONTENT_TYPE = Headers.CONTENT_TYPE_CANON.toLocaleLowerCase();
      Headers.AUTHORIZATION_CANON = "Authorization";
      Headers.AUTHORIZATION = Headers.AUTHORIZATION_CANON.toLocaleLowerCase();
      Headers.ACCEPT_CANON = "Accept";
      Headers.ACCEPT = Headers.ACCEPT_CANON.toLocaleLowerCase();
      Headers.AUTHORIZATION_BEARER = "Bearer";
      return Headers;
    }();

    exports.default = Headers;
  }, {}],
  101: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Method;

    (function (Method) {
      Method["GET"] = "GET";
      Method["POST"] = "POST";
      Method["PUT"] = "PUT";
      Method["DELETE"] = "DELETE";
      Method["HEAD"] = "HEAD";
      Method["OPTIONS"] = "OPTIONS";
      Method["TRACE"] = "TRACE";
      Method["PATCH"] = "PATCH";
    })(Method || (Method = {}));

    exports.default = Method;
  }, {}],
  102: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var Response = function () {
      function Response(headers, statusCode, body) {
        var _this = this;

        this.statusCode = statusCode;
        this.body = body;
        this.headers = {};
        Object.keys(headers).map(function (key, index) {
          _this.headers[key.toLocaleLowerCase()] = headers[key];
        });
      }

      return Response;
    }();

    exports.default = Response;
  }, {}],
  103: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var StitchRoutes_1 = require("./StitchRoutes");

    function getAuthProviderRoute(clientAppId, providerName) {
      return StitchRoutes_1.getAppRoute(clientAppId) + ("/auth/providers/" + providerName);
    }

    function getAuthProviderLoginRoute(clientAppId, providerName) {
      return getAuthProviderRoute(clientAppId, providerName) + "/login";
    }

    function getAuthProviderLinkRoute(clientAppId, providerName) {
      return getAuthProviderLoginRoute(clientAppId, providerName) + "?link=true";
    }

    var StitchAppAuthRoutes = function () {
      function StitchAppAuthRoutes(clientAppId) {
        var _this = this;

        this.baseAuthRoute = StitchRoutes_1.BASE_ROUTE + "/auth";

        this.sessionRoute = function () {
          return _this.baseAuthRoute + "/session";
        }();

        this.profileRoute = function () {
          return _this.baseAuthRoute + "/profile";
        }();

        this.clientAppId = clientAppId;
      }

      StitchAppAuthRoutes.prototype.getAuthProviderRoute = function (providerName) {
        return getAuthProviderRoute(this.clientAppId, providerName);
      };

      StitchAppAuthRoutes.prototype.getAuthProviderLoginRoute = function (providerName) {
        return getAuthProviderLoginRoute(this.clientAppId, providerName);
      };

      StitchAppAuthRoutes.prototype.getAuthProviderLinkRoute = function (providerName) {
        return getAuthProviderLinkRoute(this.clientAppId, providerName);
      };

      StitchAppAuthRoutes.prototype.getAuthProviderExtensionRoute = function (providerName, path) {
        return this.getAuthProviderRoute(providerName) + "/" + path;
      };

      return StitchAppAuthRoutes;
    }();

    exports.default = StitchAppAuthRoutes;
  }, {
    "./StitchRoutes": 112
  }],
  104: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }

        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }

        function step(result) {
          result.done ? resolve(result.value) : new P(function (resolve) {
            resolve(result.value);
          }).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };

    var __generator = this && this.__generator || function (thisArg, body) {
      var _ = {
        label: 0,
        sent: function sent() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
          f,
          y,
          t,
          g;
      return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
      }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;

      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }

      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");

        while (_) {
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];

            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;

              case 4:
                _.label++;
                return {
                  value: op[1],
                  done: false
                };

              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;

              case 7:
                op = _.ops.pop();

                _.trys.pop();

                continue;

              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }

                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }

                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }

                if (t && _.label < t[2]) {
                  _.label = t[2];

                  _.ops.push(op);

                  break;
                }

                if (t[2]) _.ops.pop();

                _.trys.pop();

                continue;
            }

            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        }

        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var bson_1 = require("bson");

    var ApiAppMetadata_1 = __importDefault(require("./ApiAppMetadata"));

    var BaseStitchRequestClient_1 = __importDefault(require("./BaseStitchRequestClient"));

    var Method_1 = __importDefault(require("./Method"));

    var StitchAppRoutes_1 = __importDefault(require("./StitchAppRoutes"));

    var StitchRequest_1 = require("./StitchRequest");

    var StitchAppRequestClient = function (_super) {
      __extends(StitchAppRequestClient, _super);

      function StitchAppRequestClient(clientAppId, baseUrl, transport) {
        var _this = _super.call(this, baseUrl, transport) || this;

        _this.clientAppId = clientAppId;
        _this.routes = new StitchAppRoutes_1.default(clientAppId);
        return _this;
      }

      StitchAppRequestClient.prototype.doRequest = function (stitchReq) {
        var _this = this;

        return this.initAppMetadata().then(function (metadata) {
          return _super.prototype.doRequestToURL.call(_this, stitchReq, metadata.hostname);
        });
      };

      StitchAppRequestClient.prototype.doStreamRequest = function (stitchReq, open, retryRequest) {
        var _this = this;

        if (open === void 0) {
          open = true;
        }

        return this.initAppMetadata().then(function (metadata) {
          return _super.prototype.doStreamRequestToURL.call(_this, stitchReq, metadata.hostname, open, retryRequest);
        });
      };

      StitchAppRequestClient.prototype.getBaseURL = function () {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [2, this.initAppMetadata().then(function (metadata) {
              return metadata.hostname;
            })];
          });
        });
      };

      StitchAppRequestClient.prototype.initAppMetadata = function () {
        var _this = this;

        if (this.appMetadata) {
          return Promise.resolve(this.appMetadata);
        }

        var request = new StitchRequest_1.StitchRequest.Builder().withMethod(Method_1.default.GET).withPath(this.routes.appMetadataRoute).build();
        return _super.prototype.doRequestToURL.call(this, request, this.baseUrl).then(function (resp) {
          _this.appMetadata = ApiAppMetadata_1.default.fromJSON(bson_1.EJSON.parse(resp.body));
          return _this.appMetadata;
        });
      };

      return StitchAppRequestClient;
    }(BaseStitchRequestClient_1.default);

    exports.default = StitchAppRequestClient;
  }, {
    "./ApiAppMetadata": 93,
    "./BaseStitchRequestClient": 95,
    "./Method": 101,
    "./StitchAppRoutes": 105,
    "./StitchRequest": 110,
    "bson": 115
  }],
  105: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var StitchServiceRoutes_1 = __importDefault(require("../../services/internal/StitchServiceRoutes"));

    var StitchAppAuthRoutes_1 = __importDefault(require("./StitchAppAuthRoutes"));

    var StitchRoutes_1 = require("./StitchRoutes");

    var StitchAppRoutes = function () {
      function StitchAppRoutes(clientAppId) {
        this.clientAppId = clientAppId;
        this.authRoutes = new StitchAppAuthRoutes_1.default(clientAppId);
        this.serviceRoutes = new StitchServiceRoutes_1.default(clientAppId);
        this.appMetadataRoute = StitchRoutes_1.getAppMetadataRoute(clientAppId);
        this.functionCallRoute = StitchRoutes_1.getFunctionCallRoute(clientAppId);
      }

      return StitchAppRoutes;
    }();

    exports.default = StitchAppRoutes;
  }, {
    "../../services/internal/StitchServiceRoutes": 114,
    "./StitchAppAuthRoutes": 103,
    "./StitchRoutes": 112
  }],
  106: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var bson_1 = require("bson");

    var ContentTypes_1 = __importDefault(require("./ContentTypes"));

    var Headers_1 = __importDefault(require("./Headers"));

    var StitchAuthRequest_1 = require("./StitchAuthRequest");

    var StitchAuthDocRequest = function (_super) {
      __extends(StitchAuthDocRequest, _super);

      function StitchAuthDocRequest(request, document) {
        var _this = this;

        request instanceof StitchAuthRequest_1.StitchAuthRequest ? _this = _super.call(this, request, request.useRefreshToken, request.shouldRefreshOnFailure) || this : _this = _super.call(this, request) || this;
        _this.document = document;
        return _this;
      }

      Object.defineProperty(StitchAuthDocRequest.prototype, "builder", {
        get: function get() {
          return new StitchAuthDocRequest.Builder(this);
        },
        enumerable: true,
        configurable: true
      });
      return StitchAuthDocRequest;
    }(StitchAuthRequest_1.StitchAuthRequest);

    exports.StitchAuthDocRequest = StitchAuthDocRequest;

    (function (StitchAuthDocRequest) {
      var Builder = function (_super) {
        __extends(Builder, _super);

        function Builder(request) {
          var _this = _super.call(this, request) || this;

          if (request !== undefined) {
            _this.document = request.document;
            _this.useRefreshToken = request.useRefreshToken;
          }

          return _this;
        }

        Builder.prototype.withDocument = function (document) {
          this.document = document;
          return this;
        };

        Builder.prototype.withAccessToken = function () {
          this.useRefreshToken = false;
          return this;
        };

        Builder.prototype.build = function () {
          if (this.document === undefined || !(this.document instanceof Object)) {
            throw new Error("document must be set: " + this.document);
          }

          if (this.headers === undefined) {
            this.withHeaders({});
          }

          this.headers[Headers_1.default.CONTENT_TYPE] = ContentTypes_1.default.APPLICATION_JSON;
          this.withBody(bson_1.EJSON.stringify(this.document, {
            relaxed: false
          }));
          return new StitchAuthDocRequest(_super.prototype.build.call(this), this.document);
        };

        return Builder;
      }(StitchAuthRequest_1.StitchAuthRequest.Builder);

      StitchAuthDocRequest.Builder = Builder;
    })(StitchAuthDocRequest = exports.StitchAuthDocRequest || (exports.StitchAuthDocRequest = {}));

    exports.StitchAuthDocRequest = StitchAuthDocRequest;
  }, {
    "./ContentTypes": 97,
    "./Headers": 100,
    "./StitchAuthRequest": 107,
    "bson": 115
  }],
  107: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var StitchRequest_1 = require("./StitchRequest");

    var StitchAuthRequest = function (_super) {
      __extends(StitchAuthRequest, _super);

      function StitchAuthRequest(request, useRefreshToken, shouldRefreshOnFailure) {
        if (useRefreshToken === void 0) {
          useRefreshToken = false;
        }

        if (shouldRefreshOnFailure === void 0) {
          shouldRefreshOnFailure = true;
        }

        var _this = _super.call(this, request.method, request.path, request.headers, request.startedAt, request.body) || this;

        _this.useRefreshToken = useRefreshToken;
        _this.shouldRefreshOnFailure = shouldRefreshOnFailure;
        return _this;
      }

      Object.defineProperty(StitchAuthRequest.prototype, "builder", {
        get: function get() {
          return new StitchAuthRequest.Builder(this);
        },
        enumerable: true,
        configurable: true
      });
      return StitchAuthRequest;
    }(StitchRequest_1.StitchRequest);

    exports.StitchAuthRequest = StitchAuthRequest;

    (function (StitchAuthRequest) {
      var Builder = function (_super) {
        __extends(Builder, _super);

        function Builder(request) {
          return _super.call(this, request) || this;
        }

        Builder.prototype.withAccessToken = function () {
          this.useRefreshToken = false;
          return this;
        };

        Builder.prototype.withRefreshToken = function () {
          this.useRefreshToken = true;
          return this;
        };

        Builder.prototype.withShouldRefreshOnFailure = function (shouldRefreshOnFailure) {
          this.shouldRefreshOnFailure = shouldRefreshOnFailure;
          return this;
        };

        Builder.prototype.build = function () {
          if (this.useRefreshToken) {
            this.shouldRefreshOnFailure = false;
          }

          return new StitchAuthRequest(_super.prototype.build.call(this), this.useRefreshToken, this.shouldRefreshOnFailure);
        };

        return Builder;
      }(StitchRequest_1.StitchRequest.Builder);

      StitchAuthRequest.Builder = Builder;
    })(StitchAuthRequest = exports.StitchAuthRequest || (exports.StitchAuthRequest = {}));

    exports.StitchAuthRequest = StitchAuthRequest;
  }, {
    "./StitchRequest": 110
  }],
  108: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var StitchRequest_1 = require("./StitchRequest");

    var Headers_1 = __importDefault(require("./Headers"));

    var ContentTypes_1 = __importDefault(require("./ContentTypes"));

    var bson_1 = require("bson");

    var StitchDocRequest = function (_super) {
      __extends(StitchDocRequest, _super);

      function StitchDocRequest(request, document) {
        var _this = _super.call(this, request.method, request.path, request.headers, request.startedAt, request.body) || this;

        _this.document = document;
        return _this;
      }

      Object.defineProperty(StitchDocRequest.prototype, "builder", {
        get: function get() {
          return new StitchDocRequest.Builder(this);
        },
        enumerable: true,
        configurable: true
      });
      return StitchDocRequest;
    }(StitchRequest_1.StitchRequest);

    exports.StitchDocRequest = StitchDocRequest;

    (function (StitchDocRequest) {
      var Builder = function (_super) {
        __extends(Builder, _super);

        function Builder(request) {
          var _this = _super.call(this, request) || this;

          if (request !== undefined) {
            _this.document = request.document;
          }

          return _this;
        }

        Builder.prototype.withDocument = function (document) {
          this.document = document;
          return this;
        };

        Builder.prototype.build = function () {
          if (this.document === undefined || !(this.document instanceof Object)) {
            throw new Error("document must be set");
          }

          if (this.headers === undefined) {
            this.withHeaders({});
          }

          this.headers[Headers_1.default.CONTENT_TYPE] = ContentTypes_1.default.APPLICATION_JSON;
          this.withBody(bson_1.EJSON.stringify(this.document, {
            relaxed: false
          }));
          return new StitchDocRequest(_super.prototype.build.call(this), this.document);
        };

        return Builder;
      }(StitchRequest_1.StitchRequest.Builder);

      StitchDocRequest.Builder = Builder;
    })(StitchDocRequest = exports.StitchDocRequest || (exports.StitchDocRequest = {}));

    exports.StitchDocRequest = StitchDocRequest;
  }, {
    "./ContentTypes": 97,
    "./Headers": 100,
    "./StitchRequest": 110,
    "bson": 115
  }],
  109: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var bson_1 = require("bson");

    var Event_1 = __importDefault(require("./Event"));

    var StitchServiceError_1 = __importDefault(require("../../StitchServiceError"));

    var StitchServiceErrorCode_1 = require("../../StitchServiceErrorCode");

    var StitchEvent = function () {
      function StitchEvent(eventName, data, decoder) {
        this.eventName = eventName;
        data = data ? data : "";
        var decodedStringBuffer = [];

        for (var chIdx = 0; chIdx < data.length; chIdx++) {
          var c = data[chIdx];

          switch (c) {
            case '%':
              if (chIdx + 2 >= data.length) {
                break;
              }

              var code = data.substring(chIdx + 1, chIdx + 3);
              var found = void 0;

              switch (code) {
                case "25":
                  found = true;
                  decodedStringBuffer.push("%");
                  break;

                case "0A":
                  found = true;
                  decodedStringBuffer.push("\n");
                  break;

                case "0D":
                  found = true;
                  decodedStringBuffer.push("\r");
                  break;

                default:
                  found = false;
              }

              if (found) {
                chIdx += 2;
                continue;
              }

              break;

            default:
              break;
          }

          decodedStringBuffer.push(c);
        }

        var decodedData = decodedStringBuffer.join('');

        switch (this.eventName) {
          case StitchEvent.ERROR_EVENT_NAME:
            var errorMsg = void 0;
            var errorCode = void 0;

            try {
              var errorDoc = bson_1.EJSON.parse(decodedData, {
                strict: false
              });
              errorMsg = errorDoc[ErrorFields.Error];
              errorCode = StitchServiceErrorCode_1.stitchServiceErrorCodeFromApi(errorDoc[ErrorFields.ErrorCode]);
            } catch (error) {
              errorMsg = decodedData;
              errorCode = StitchServiceErrorCode_1.StitchServiceErrorCode.Unknown;
            }

            this.error = new StitchServiceError_1.default(errorMsg, errorCode);
            break;

          case Event_1.default.MESSAGE_EVENT:
            this.data = bson_1.EJSON.parse(decodedData, {
              strict: false
            });

            if (decoder) {
              this.data = decoder.decode(this.data);
            }

            break;
        }
      }

      StitchEvent.fromEvent = function (event, decoder) {
        return new StitchEvent(event.eventName, event.data, decoder);
      };

      StitchEvent.ERROR_EVENT_NAME = "error";
      return StitchEvent;
    }();

    exports.default = StitchEvent;
    var ErrorFields;

    (function (ErrorFields) {
      ErrorFields["Error"] = "error";
      ErrorFields["ErrorCode"] = "error_code";
    })(ErrorFields || (ErrorFields = {}));
  }, {
    "../../StitchServiceError": 49,
    "../../StitchServiceErrorCode": 50,
    "./Event": 98,
    "bson": 115
  }],
  110: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var StitchRequest = function () {
      function StitchRequest(method, path, headers, startedAt, body) {
        this.method = method;
        this.path = path;
        this.headers = headers;
        this.body = body;
        this.startedAt = startedAt;
      }

      Object.defineProperty(StitchRequest.prototype, "builder", {
        get: function get() {
          return new StitchRequest.Builder(this);
        },
        enumerable: true,
        configurable: true
      });
      return StitchRequest;
    }();

    exports.StitchRequest = StitchRequest;

    (function (StitchRequest) {
      var Builder = function () {
        function Builder(request) {
          if (request !== undefined) {
            this.method = request.method;
            this.path = request.path;
            this.headers = request.headers;
            this.body = request.body;
            this.startedAt = request.startedAt;
          }
        }

        Builder.prototype.withMethod = function (method) {
          this.method = method;
          return this;
        };

        Builder.prototype.withPath = function (path) {
          this.path = path;
          return this;
        };

        Builder.prototype.withHeaders = function (headers) {
          this.headers = headers;
          return this;
        };

        Builder.prototype.withBody = function (body) {
          this.body = body;
          return this;
        };

        Builder.prototype.build = function () {
          if (this.method === undefined) {
            throw Error("must set method");
          }

          if (this.path === undefined) {
            throw Error("must set non-empty path");
          }

          if (this.startedAt === undefined) {
            this.startedAt = Date.now() / 1000;
          }

          return new StitchRequest(this.method, this.path, this.headers === undefined ? {} : this.headers, this.startedAt, this.body);
        };

        return Builder;
      }();

      StitchRequest.Builder = Builder;
    })(StitchRequest = exports.StitchRequest || (exports.StitchRequest = {}));

    exports.StitchRequest = StitchRequest;
  }, {}],
  111: [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var BaseStitchRequestClient_1 = __importDefault(require("./BaseStitchRequestClient"));

    var StitchRequestClient = function (_super) {
      __extends(StitchRequestClient, _super);

      function StitchRequestClient(baseUrl, transport) {
        return _super.call(this, baseUrl, transport) || this;
      }

      StitchRequestClient.prototype.doRequest = function (stitchReq) {
        return _super.prototype.doRequestToURL.call(this, stitchReq, this.baseUrl);
      };

      StitchRequestClient.prototype.doStreamRequest = function (stitchReq, open, retryRequest) {
        if (open === void 0) {
          open = true;
        }

        return _super.prototype.doStreamRequestToURL.call(this, stitchReq, this.baseUrl, open, retryRequest);
      };

      StitchRequestClient.prototype.getBaseURL = function () {
        return Promise.resolve(this.baseUrl);
      };

      return StitchRequestClient;
    }(BaseStitchRequestClient_1.default);

    exports.default = StitchRequestClient;
  }, {
    "./BaseStitchRequestClient": 95
  }],
  112: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BASE_ROUTE = "/api/client/v2.0";
    exports.BASE_ROUTE = BASE_ROUTE;

    function getAppRoute(clientAppId) {
      return BASE_ROUTE + ("/app/" + clientAppId);
    }

    exports.getAppRoute = getAppRoute;

    function getFunctionCallRoute(clientAppId) {
      return getAppRoute(clientAppId) + "/functions/call";
    }

    exports.getFunctionCallRoute = getFunctionCallRoute;

    function getAppMetadataRoute(clientAppId) {
      return getAppRoute(clientAppId) + "/location";
    }

    exports.getAppMetadataRoute = getAppMetadataRoute;
  }, {}],
  113: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var bson_1 = require("bson");

    var Base64_1 = require("../../internal/common/Base64");

    var Method_1 = __importDefault(require("../../internal/net/Method"));

    var StitchAuthDocRequest_1 = require("../../internal/net/StitchAuthDocRequest");

    var StitchAuthRequest_1 = require("../../internal/net/StitchAuthRequest");

    var CoreStitchServiceClientImpl = function () {
      function CoreStitchServiceClientImpl(requestClient, routes, name) {
        this.requestClient = requestClient;
        this.serviceRoutes = routes;
        this.serviceName = name;
      }

      CoreStitchServiceClientImpl.prototype.callFunction = function (name, args, decoder) {
        return this.requestClient.doAuthenticatedRequestWithDecoder(this.getCallServiceFunctionRequest(name, args), decoder);
      };

      CoreStitchServiceClientImpl.prototype.streamFunction = function (name, args, decoder) {
        return this.requestClient.openAuthenticatedStreamWithDecoder(this.getStreamServiceFunctionRequest(name, args), decoder);
      };

      CoreStitchServiceClientImpl.prototype.getStreamServiceFunctionRequest = function (name, args) {
        var body = {
          name: name
        };

        if (this.serviceName !== undefined) {
          body["service"] = this.serviceName;
        }

        body["arguments"] = args;
        var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder();
        reqBuilder.withMethod(Method_1.default.GET).withPath(this.serviceRoutes.functionCallRoute + ("?stitch_request=" + encodeURIComponent(Base64_1.base64Encode(bson_1.EJSON.stringify(body)))));
        return reqBuilder.build();
      };

      CoreStitchServiceClientImpl.prototype.getCallServiceFunctionRequest = function (name, args) {
        var body = {
          name: name
        };

        if (this.serviceName !== undefined) {
          body["service"] = this.serviceName;
        }

        body["arguments"] = args;
        var reqBuilder = new StitchAuthDocRequest_1.StitchAuthDocRequest.Builder();
        reqBuilder.withMethod(Method_1.default.POST).withPath(this.serviceRoutes.functionCallRoute);
        reqBuilder.withDocument(body);
        return reqBuilder.build();
      };

      return CoreStitchServiceClientImpl;
    }();

    exports.default = CoreStitchServiceClientImpl;
  }, {
    "../../internal/common/Base64": 90,
    "../../internal/net/Method": 101,
    "../../internal/net/StitchAuthDocRequest": 106,
    "../../internal/net/StitchAuthRequest": 107,
    "bson": 115
  }],
  114: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var StitchRoutes_1 = require("../../internal/net/StitchRoutes");

    var StitchServiceRoutes = function () {
      function StitchServiceRoutes(clientAppId) {
        this.clientAppId = clientAppId;
        this.functionCallRoute = StitchRoutes_1.getFunctionCallRoute(clientAppId);
      }

      return StitchServiceRoutes;
    }();

    exports.default = StitchServiceRoutes;
  }, {
    "../../internal/net/StitchRoutes": 112
  }],
  115: [function (require, module, exports) {
    (function (global, Buffer) {
      (function (global, factory) {
        _typeof2(exports) === 'object' && typeof module !== 'undefined' ? factory(exports, require('long'), require('buffer')) : typeof define === 'function' && define.amd ? define(['exports', 'long', 'buffer'], factory) : factory(global.BSON = {}, global.long, global.Buffer);
      })(this, function (exports, long, buffer) {
        'use strict';

        long = long && long.hasOwnProperty('default') ? long['default'] : long;
        buffer = buffer && buffer.hasOwnProperty('default') ? buffer['default'] : buffer;
        var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

        function createCommonjsModule(fn, module) {
          return module = {
            exports: {}
          }, fn(module, module.exports), module.exports;
        }

        function getCjsExportFromNamespace(n) {
          return n && n.default || n;
        }

        var map = createCommonjsModule(function (module) {
          if (typeof commonjsGlobal.Map !== 'undefined') {
            module.exports = commonjsGlobal.Map;
            module.exports.Map = commonjsGlobal.Map;
          } else {
            // We will return a polyfill
            var Map = function Map(array) {
              this._keys = [];
              this._values = {};

              for (var i = 0; i < array.length; i++) {
                if (array[i] == null) continue; // skip null and undefined

                var entry = array[i];
                var key = entry[0];
                var value = entry[1]; // Add the key to the list of keys in order

                this._keys.push(key); // Add the key and value to the values dictionary with a point
                // to the location in the ordered keys list


                this._values[key] = {
                  v: value,
                  i: this._keys.length - 1
                };
              }
            };

            Map.prototype.clear = function () {
              this._keys = [];
              this._values = {};
            };

            Map.prototype.delete = function (key) {
              var value = this._values[key];
              if (value == null) return false; // Delete entry

              delete this._values[key]; // Remove the key from the ordered keys list

              this._keys.splice(value.i, 1);

              return true;
            };

            Map.prototype.entries = function () {
              var self = this;
              var index = 0;
              return {
                next: function next() {
                  var key = self._keys[index++];
                  return {
                    value: key !== undefined ? [key, self._values[key].v] : undefined,
                    done: key !== undefined ? false : true
                  };
                }
              };
            };

            Map.prototype.forEach = function (callback, self) {
              self = self || this;

              for (var i = 0; i < this._keys.length; i++) {
                var key = this._keys[i]; // Call the forEach callback

                callback.call(self, this._values[key].v, key, self);
              }
            };

            Map.prototype.get = function (key) {
              return this._values[key] ? this._values[key].v : undefined;
            };

            Map.prototype.has = function (key) {
              return this._values[key] != null;
            };

            Map.prototype.keys = function () {
              var self = this;
              var index = 0;
              return {
                next: function next() {
                  var key = self._keys[index++];
                  return {
                    value: key !== undefined ? key : undefined,
                    done: key !== undefined ? false : true
                  };
                }
              };
            };

            Map.prototype.set = function (key, value) {
              if (this._values[key]) {
                this._values[key].v = value;
                return this;
              } // Add the key to the list of keys in order


              this._keys.push(key); // Add the key and value to the values dictionary with a point
              // to the location in the ordered keys list


              this._values[key] = {
                v: value,
                i: this._keys.length - 1
              };
              return this;
            };

            Map.prototype.values = function () {
              var self = this;
              var index = 0;
              return {
                next: function next() {
                  var key = self._keys[index++];
                  return {
                    value: key !== undefined ? self._values[key].v : undefined,
                    done: key !== undefined ? false : true
                  };
                }
              };
            }; // Last ismaster


            Object.defineProperty(Map.prototype, 'size', {
              enumerable: true,
              get: function get() {
                return this._keys.length;
              }
            });
            module.exports = Map;
          }
        });
        var map_1 = map.Map;
        /**
         * @ignore
         */

        long.prototype.toExtendedJSON = function (options) {
          if (options && options.relaxed) return this.toNumber();
          return {
            $numberLong: this.toString()
          };
        };
        /**
         * @ignore
         */


        long.fromExtendedJSON = function (doc, options) {
          var result = long.fromString(doc.$numberLong);
          return options && options.relaxed ? result.toNumber() : result;
        };

        Object.defineProperty(long.prototype, '_bsontype', {
          value: 'Long'
        });
        var long_1 = long;

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof2(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        var Double =
        /*#__PURE__*/
        function () {
          /**
           * Create a Double type
           *
           * @param {number} value the number we want to represent as a double.
           * @return {Double}
           */
          function Double(value) {
            _classCallCheck(this, Double);

            this.value = value;
          }
          /**
           * Access the number value.
           *
           * @method
           * @return {number} returns the wrapped double number.
           */


          _createClass(Double, [{
            key: "valueOf",
            value: function valueOf() {
              return this.value;
            }
            /**
             * @ignore
             */

          }, {
            key: "toJSON",
            value: function toJSON() {
              return this.value;
            }
            /**
             * @ignore
             */

          }, {
            key: "toExtendedJSON",
            value: function toExtendedJSON(options) {
              if (options && options.relaxed && isFinite(this.value)) return this.value;
              return {
                $numberDouble: this.value.toString()
              };
            }
            /**
             * @ignore
             */

          }], [{
            key: "fromExtendedJSON",
            value: function fromExtendedJSON(doc, options) {
              return options && options.relaxed ? parseFloat(doc.$numberDouble) : new Double(parseFloat(doc.$numberDouble));
            }
          }]);

          return Double;
        }();

        Object.defineProperty(Double.prototype, '_bsontype', {
          value: 'Double'
        });
        var double_1 = Double;
        /**
         * @class
         * @param {number} low  the low (signed) 32 bits of the Timestamp.
         * @param {number} high the high (signed) 32 bits of the Timestamp.
         * @return {Timestamp}
         */

        var Timestamp =
        /*#__PURE__*/
        function (_Long) {
          _inherits(Timestamp, _Long);

          function Timestamp(low, high) {
            var _this;

            _classCallCheck(this, Timestamp);

            if (low instanceof long_1) {
              _this = _possibleConstructorReturn(this, _getPrototypeOf(Timestamp).call(this, low.low, low.high));
            } else {
              _this = _possibleConstructorReturn(this, _getPrototypeOf(Timestamp).call(this, low, high));
            }

            return _possibleConstructorReturn(_this);
          }
          /**
           * Return the JSON value.
           *
           * @method
           * @return {String} the JSON representation.
           */


          _createClass(Timestamp, [{
            key: "toJSON",
            value: function toJSON() {
              return {
                $timestamp: this.toString()
              };
            }
            /**
             * Returns a Timestamp represented by the given (32-bit) integer value.
             *
             * @method
             * @param {number} value the 32-bit integer in question.
             * @return {Timestamp} the timestamp.
             */

          }, {
            key: "toExtendedJSON",

            /**
             * @ignore
             */
            value: function toExtendedJSON() {
              return {
                $timestamp: {
                  t: this.high,
                  i: this.low
                }
              };
            }
            /**
             * @ignore
             */

          }], [{
            key: "fromInt",
            value: function fromInt(value) {
              return new Timestamp(long_1.fromInt(value));
            }
            /**
             * Returns a Timestamp representing the given number value, provided that it is a finite number. Otherwise, zero is returned.
             *
             * @method
             * @param {number} value the number in question.
             * @return {Timestamp} the timestamp.
             */

          }, {
            key: "fromNumber",
            value: function fromNumber(value) {
              return new Timestamp(long_1.fromNumber(value));
            }
            /**
             * Returns a Timestamp for the given high and low bits. Each is assumed to use 32 bits.
             *
             * @method
             * @param {number} lowBits the low 32-bits.
             * @param {number} highBits the high 32-bits.
             * @return {Timestamp} the timestamp.
             */

          }, {
            key: "fromBits",
            value: function fromBits(lowBits, highBits) {
              return new Timestamp(lowBits, highBits);
            }
            /**
             * Returns a Timestamp from the given string, optionally using the given radix.
             *
             * @method
             * @param {String} str the textual representation of the Timestamp.
             * @param {number} [opt_radix] the radix in which the text is written.
             * @return {Timestamp} the timestamp.
             */

          }, {
            key: "fromString",
            value: function fromString(str, opt_radix) {
              return new Timestamp(long_1.fromString(str, opt_radix));
            }
          }, {
            key: "fromExtendedJSON",
            value: function fromExtendedJSON(doc) {
              return new Timestamp(doc.$timestamp.i, doc.$timestamp.t);
            }
          }]);

          return Timestamp;
        }(long_1);

        Object.defineProperty(Timestamp.prototype, '_bsontype', {
          value: 'Timestamp'
        });
        var timestamp = Timestamp;
        var empty = {};
        var empty$1 =
        /*#__PURE__*/
        Object.freeze({
          default: empty
        });
        var require$$0 = getCjsExportFromNamespace(empty$1);
        /* global window */

        /**
         * Normalizes our expected stringified form of a function across versions of node
         * @param {Function} fn The function to stringify
         */

        function normalizedFunctionString(fn) {
          return fn.toString().replace('function(', 'function (');
        }

        function insecureRandomBytes(size) {
          var result = new Uint8Array(size);

          for (var i = 0; i < size; ++i) {
            result[i] = Math.floor(Math.random() * 256);
          }

          return result;
        }

        var randomBytes = insecureRandomBytes;

        if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
          randomBytes = function randomBytes(size) {
            return window.crypto.getRandomValues(new Uint8Array(size));
          };
        } else {
          try {
            randomBytes = require$$0.randomBytes;
          } catch (e) {} // keep the fallback
          // NOTE: in transpiled cases the above require might return null/undefined


          if (randomBytes == null) {
            randomBytes = insecureRandomBytes;
          }
        }

        var utils = {
          normalizedFunctionString: normalizedFunctionString,
          randomBytes: randomBytes
        };
        var Buffer$1 = buffer.Buffer;
        var randomBytes$1 = utils.randomBytes; // constants

        var PROCESS_UNIQUE = randomBytes$1(5); // Regular expression that checks for hex value

        var checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
        var hasBufferType = false; // Check if buffer exists

        try {
          if (Buffer$1 && Buffer$1.from) hasBufferType = true;
        } catch (err) {
          hasBufferType = false;
        } // Precomputed hex table enables speedy hex string conversion


        var hexTable = [];

        for (var _i = 0; _i < 256; _i++) {
          hexTable[_i] = (_i <= 15 ? '0' : '') + _i.toString(16);
        } // Lookup tables


        var decodeLookup = [];
        var i = 0;

        while (i < 10) {
          decodeLookup[0x30 + i] = i++;
        }

        while (i < 16) {
          decodeLookup[0x41 - 10 + i] = decodeLookup[0x61 - 10 + i] = i++;
        }

        var _Buffer = Buffer$1;

        function convertToHex(bytes) {
          return bytes.toString('hex');
        }

        function makeObjectIdError(invalidString, index) {
          var invalidCharacter = invalidString[index];
          return new TypeError("ObjectId string \"".concat(invalidString, "\" contains invalid character \"").concat(invalidCharacter, "\" with character code (").concat(invalidString.charCodeAt(index), "). All character codes for a non-hex string must be less than 256."));
        }
        /**
         * A class representation of the BSON ObjectId type.
         */


        var ObjectId =
        /*#__PURE__*/
        function () {
          /**
           * Create an ObjectId type
           *
           * @param {(string|number)} id Can be a 24 byte hex string, 12 byte binary string or a Number.
           * @property {number} generationTime The generation time of this ObjectId instance
           * @return {ObjectId} instance of ObjectId.
           */
          function ObjectId(id) {
            _classCallCheck(this, ObjectId); // Duck-typing to support ObjectId from different npm packages


            if (id instanceof ObjectId) return id; // The most common usecase (blank id, new objectId instance)

            if (id == null || typeof id === 'number') {
              // Generate a new id
              this.id = this.generate(id); // If we are caching the hex string

              if (ObjectId.cacheHexString) this.__id = this.toString('hex'); // Return the object

              return;
            } // Check if the passed in id is valid


            var valid = ObjectId.isValid(id); // Throw an error if it's not a valid setup

            if (!valid && id != null) {
              throw new TypeError('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters');
            } else if (valid && typeof id === 'string' && id.length === 24 && hasBufferType) {
              return new ObjectId(Buffer$1.from(id, 'hex'));
            } else if (valid && typeof id === 'string' && id.length === 24) {
              return ObjectId.createFromHexString(id);
            } else if (id != null && id.length === 12) {
              // assume 12 byte string
              this.id = id;
            } else if (id != null && id.toHexString) {
              // Duck-typing to support ObjectId from different npm packages
              return id;
            } else {
              throw new TypeError('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters');
            }

            if (ObjectId.cacheHexString) this.__id = this.toString('hex');
          }
          /**
           * Return the ObjectId id as a 24 byte hex string representation
           *
           * @method
           * @return {string} return the 24 byte hex string representation.
           */


          _createClass(ObjectId, [{
            key: "toHexString",
            value: function toHexString() {
              if (ObjectId.cacheHexString && this.__id) return this.__id;
              var hexString = '';

              if (!this.id || !this.id.length) {
                throw new TypeError('invalid ObjectId, ObjectId.id must be either a string or a Buffer, but is [' + JSON.stringify(this.id) + ']');
              }

              if (this.id instanceof _Buffer) {
                hexString = convertToHex(this.id);
                if (ObjectId.cacheHexString) this.__id = hexString;
                return hexString;
              }

              for (var _i2 = 0; _i2 < this.id.length; _i2++) {
                var hexChar = hexTable[this.id.charCodeAt(_i2)];

                if (typeof hexChar !== 'string') {
                  throw makeObjectIdError(this.id, _i2);
                }

                hexString += hexChar;
              }

              if (ObjectId.cacheHexString) this.__id = hexString;
              return hexString;
            }
            /**
             * Update the ObjectId index used in generating new ObjectId's on the driver
             *
             * @method
             * @return {number} returns next index value.
             * @ignore
             */

          }, {
            key: "get_inc",
            value: function get_inc() {
              return ObjectId.index = (ObjectId.index + 1) % 0xffffff;
            }
            /**
             * Update the ObjectId index used in generating new ObjectId's on the driver
             *
             * @method
             * @return {number} returns next index value.
             * @ignore
             */

          }, {
            key: "getInc",
            value: function getInc() {
              return this.get_inc();
            }
            /**
             * Generate a 12 byte id buffer used in ObjectId's
             *
             * @method
             * @param {number} [time] optional parameter allowing to pass in a second based timestamp.
             * @return {Buffer} return the 12 byte id buffer string.
             */

          }, {
            key: "generate",
            value: function generate(time) {
              if ('number' !== typeof time) {
                time = ~~(Date.now() / 1000);
              }

              var inc = this.get_inc();
              var buffer$$1 = Buffer$1.alloc(12); // 4-byte timestamp

              buffer$$1[3] = time & 0xff;
              buffer$$1[2] = time >> 8 & 0xff;
              buffer$$1[1] = time >> 16 & 0xff;
              buffer$$1[0] = time >> 24 & 0xff; // 5-byte process unique

              buffer$$1[4] = PROCESS_UNIQUE[0];
              buffer$$1[5] = PROCESS_UNIQUE[1];
              buffer$$1[6] = PROCESS_UNIQUE[2];
              buffer$$1[7] = PROCESS_UNIQUE[3];
              buffer$$1[8] = PROCESS_UNIQUE[4]; // 3-byte counter

              buffer$$1[11] = inc & 0xff;
              buffer$$1[10] = inc >> 8 & 0xff;
              buffer$$1[9] = inc >> 16 & 0xff;
              return buffer$$1;
            }
            /**
             * Converts the id into a 24 byte hex string for printing
             *
             * @param {String} format The Buffer toString format parameter.
             * @return {String} return the 24 byte hex string representation.
             * @ignore
             */

          }, {
            key: "toString",
            value: function toString(format) {
              // Is the id a buffer then use the buffer toString method to return the format
              if (this.id && this.id.copy) {
                return this.id.toString(typeof format === 'string' ? format : 'hex');
              }

              return this.toHexString();
            }
            /**
             * Converts to its JSON representation.
             *
             * @return {String} return the 24 byte hex string representation.
             * @ignore
             */

          }, {
            key: "toJSON",
            value: function toJSON() {
              return this.toHexString();
            }
            /**
             * Compares the equality of this ObjectId with `otherID`.
             *
             * @method
             * @param {object} otherID ObjectId instance to compare against.
             * @return {boolean} the result of comparing two ObjectId's
             */

          }, {
            key: "equals",
            value: function equals(otherId) {
              if (otherId instanceof ObjectId) {
                return this.toString() === otherId.toString();
              }

              if (typeof otherId === 'string' && ObjectId.isValid(otherId) && otherId.length === 12 && this.id instanceof _Buffer) {
                return otherId === this.id.toString('binary');
              }

              if (typeof otherId === 'string' && ObjectId.isValid(otherId) && otherId.length === 24) {
                return otherId.toLowerCase() === this.toHexString();
              }

              if (typeof otherId === 'string' && ObjectId.isValid(otherId) && otherId.length === 12) {
                return otherId === this.id;
              }

              if (otherId != null && (otherId instanceof ObjectId || otherId.toHexString)) {
                return otherId.toHexString() === this.toHexString();
              }

              return false;
            }
            /**
             * Returns the generation date (accurate up to the second) that this ID was generated.
             *
             * @method
             * @return {date} the generation date
             */

          }, {
            key: "getTimestamp",
            value: function getTimestamp() {
              var timestamp = new Date();
              var time = this.id[3] | this.id[2] << 8 | this.id[1] << 16 | this.id[0] << 24;
              timestamp.setTime(Math.floor(time) * 1000);
              return timestamp;
            }
            /**
             * @ignore
             */

          }, {
            key: "toExtendedJSON",

            /**
             * @ignore
             */
            value: function toExtendedJSON() {
              if (this.toHexString) return {
                $oid: this.toHexString()
              };
              return {
                $oid: this.toString('hex')
              };
            }
            /**
             * @ignore
             */

          }], [{
            key: "createPk",
            value: function createPk() {
              return new ObjectId();
            }
            /**
             * Creates an ObjectId from a second based number, with the rest of the ObjectId zeroed out. Used for comparisons or sorting the ObjectId.
             *
             * @method
             * @param {number} time an integer number representing a number of seconds.
             * @return {ObjectId} return the created ObjectId
             */

          }, {
            key: "createFromTime",
            value: function createFromTime(time) {
              var buffer$$1 = Buffer$1.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // Encode time into first 4 bytes

              buffer$$1[3] = time & 0xff;
              buffer$$1[2] = time >> 8 & 0xff;
              buffer$$1[1] = time >> 16 & 0xff;
              buffer$$1[0] = time >> 24 & 0xff; // Return the new objectId

              return new ObjectId(buffer$$1);
            }
            /**
             * Creates an ObjectId from a hex string representation of an ObjectId.
             *
             * @method
             * @param {string} hexString create a ObjectId from a passed in 24 byte hexstring.
             * @return {ObjectId} return the created ObjectId
             */

          }, {
            key: "createFromHexString",
            value: function createFromHexString(string) {
              // Throw an error if it's not a valid setup
              if (typeof string === 'undefined' || string != null && string.length !== 24) {
                throw new TypeError('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters');
              } // Use Buffer.from method if available


              if (hasBufferType) return new ObjectId(Buffer$1.from(string, 'hex')); // Calculate lengths

              var array = new _Buffer(12);
              var n = 0;
              var i = 0;

              while (i < 24) {
                array[n++] = decodeLookup[string.charCodeAt(i++)] << 4 | decodeLookup[string.charCodeAt(i++)];
              }

              return new ObjectId(array);
            }
            /**
             * Checks if a value is a valid bson ObjectId
             *
             * @method
             * @return {boolean} return true if the value is a valid bson ObjectId, return false otherwise.
             */

          }, {
            key: "isValid",
            value: function isValid(id) {
              if (id == null) return false;

              if (typeof id === 'number') {
                return true;
              }

              if (typeof id === 'string') {
                return id.length === 12 || id.length === 24 && checkForHexRegExp.test(id);
              }

              if (id instanceof ObjectId) {
                return true;
              }

              if (id instanceof _Buffer && id.length === 12) {
                return true;
              } // Duck-Typing detection of ObjectId like objects


              if (id.toHexString) {
                return id.id.length === 12 || id.id.length === 24 && checkForHexRegExp.test(id.id);
              }

              return false;
            }
          }, {
            key: "fromExtendedJSON",
            value: function fromExtendedJSON(doc) {
              return new ObjectId(doc.$oid);
            }
          }]);

          return ObjectId;
        }();
        /**
         * @ignore
         */


        Object.defineProperty(ObjectId.prototype, 'generationTime', {
          enumerable: true,
          get: function get() {
            return this.id[3] | this.id[2] << 8 | this.id[1] << 16 | this.id[0] << 24;
          },
          set: function set(value) {
            // Encode time into first 4 bytes
            this.id[3] = value & 0xff;
            this.id[2] = value >> 8 & 0xff;
            this.id[1] = value >> 16 & 0xff;
            this.id[0] = value >> 24 & 0xff;
          }
        });
        /**
         * Converts to a string representation of this Id.
         *
         * @return {String} return the 24 byte hex string representation.
         * @ignore
         */

        ObjectId.prototype.inspect = ObjectId.prototype.toString;
        /**
         * @ignore
         */

        ObjectId.index = ~~(Math.random() * 0xffffff);
        Object.defineProperty(ObjectId.prototype, '_bsontype', {
          value: 'ObjectId'
        });
        var objectid = ObjectId;

        function alphabetize(str) {
          return str.split('').sort().join('');
        }
        /**
         * A class representation of the BSON RegExp type.
         */


        var BSONRegExp =
        /*#__PURE__*/
        function () {
          /**
           * Create a RegExp type
           *
           * @param {string} pattern The regular expression pattern to match
           * @param {string} options The regular expression options
           */
          function BSONRegExp(pattern, options) {
            _classCallCheck(this, BSONRegExp); // Execute


            this.pattern = pattern || '';
            this.options = options ? alphabetize(options) : ''; // Validate options

            for (var i = 0; i < this.options.length; i++) {
              if (!(this.options[i] === 'i' || this.options[i] === 'm' || this.options[i] === 'x' || this.options[i] === 'l' || this.options[i] === 's' || this.options[i] === 'u')) {
                throw new Error("The regular expression option [".concat(this.options[i], "] is not supported"));
              }
            }
          }
          /**
           * @ignore
           */


          _createClass(BSONRegExp, [{
            key: "toExtendedJSON",
            value: function toExtendedJSON() {
              return {
                $regularExpression: {
                  pattern: this.pattern,
                  options: this.options
                }
              };
            }
            /**
             * @ignore
             */

          }], [{
            key: "fromExtendedJSON",
            value: function fromExtendedJSON(doc) {
              return new BSONRegExp(doc.$regularExpression.pattern, doc.$regularExpression.options.split('').sort().join(''));
            }
          }]);

          return BSONRegExp;
        }();

        Object.defineProperty(BSONRegExp.prototype, '_bsontype', {
          value: 'BSONRegExp'
        });
        var regexp = BSONRegExp;

        var BSONSymbol =
        /*#__PURE__*/
        function () {
          /**
           * Create a Symbol type
           *
           * @param {string} value the string representing the symbol.
           */
          function BSONSymbol(value) {
            _classCallCheck(this, BSONSymbol);

            this.value = value;
          }
          /**
           * Access the wrapped string value.
           *
           * @method
           * @return {String} returns the wrapped string.
           */


          _createClass(BSONSymbol, [{
            key: "valueOf",
            value: function valueOf() {
              return this.value;
            }
            /**
             * @ignore
             */

          }, {
            key: "toString",
            value: function toString() {
              return this.value;
            }
            /**
             * @ignore
             */

          }, {
            key: "inspect",
            value: function inspect() {
              return this.value;
            }
            /**
             * @ignore
             */

          }, {
            key: "toJSON",
            value: function toJSON() {
              return this.value;
            }
            /**
             * @ignore
             */

          }, {
            key: "toExtendedJSON",
            value: function toExtendedJSON() {
              return {
                $symbol: this.value
              };
            }
            /**
             * @ignore
             */

          }], [{
            key: "fromExtendedJSON",
            value: function fromExtendedJSON(doc) {
              return new BSONSymbol(doc.$symbol);
            }
          }]);

          return BSONSymbol;
        }();

        Object.defineProperty(BSONSymbol.prototype, '_bsontype', {
          value: 'Symbol'
        });
        var symbol = BSONSymbol;

        var Int32 =
        /*#__PURE__*/
        function () {
          /**
           * Create an Int32 type
           *
           * @param {number} value the number we want to represent as an int32.
           * @return {Int32}
           */
          function Int32(value) {
            _classCallCheck(this, Int32);

            this.value = value;
          }
          /**
           * Access the number value.
           *
           * @method
           * @return {number} returns the wrapped int32 number.
           */


          _createClass(Int32, [{
            key: "valueOf",
            value: function valueOf() {
              return this.value;
            }
            /**
             * @ignore
             */

          }, {
            key: "toJSON",
            value: function toJSON() {
              return this.value;
            }
            /**
             * @ignore
             */

          }, {
            key: "toExtendedJSON",
            value: function toExtendedJSON(options) {
              if (options && options.relaxed) return this.value;
              return {
                $numberInt: this.value.toString()
              };
            }
            /**
             * @ignore
             */

          }], [{
            key: "fromExtendedJSON",
            value: function fromExtendedJSON(doc, options) {
              return options && options.relaxed ? parseInt(doc.$numberInt, 10) : new Int32(doc.$numberInt);
            }
          }]);

          return Int32;
        }();

        Object.defineProperty(Int32.prototype, '_bsontype', {
          value: 'Int32'
        });
        var int_32 = Int32;

        var Code =
        /*#__PURE__*/
        function () {
          /**
           * Create a Code type
           *
           * @param {(string|function)} code a string or function.
           * @param {Object} [scope] an optional scope for the function.
           * @return {Code}
           */
          function Code(code, scope) {
            _classCallCheck(this, Code);

            this.code = code;
            this.scope = scope;
          }
          /**
           * @ignore
           */


          _createClass(Code, [{
            key: "toJSON",
            value: function toJSON() {
              return {
                scope: this.scope,
                code: this.code
              };
            }
            /**
             * @ignore
             */

          }, {
            key: "toExtendedJSON",
            value: function toExtendedJSON() {
              if (this.scope) {
                return {
                  $code: this.code,
                  $scope: this.scope
                };
              }

              return {
                $code: this.code
              };
            }
            /**
             * @ignore
             */

          }], [{
            key: "fromExtendedJSON",
            value: function fromExtendedJSON(doc) {
              return new Code(doc.$code, doc.$scope);
            }
          }]);

          return Code;
        }();

        Object.defineProperty(Code.prototype, '_bsontype', {
          value: 'Code'
        });
        var code = Code;
        var PARSE_STRING_REGEXP = /^(\+|-)?(\d+|(\d*\.\d*))?(E|e)?([-+])?(\d+)?$/;
        var PARSE_INF_REGEXP = /^(\+|-)?(Infinity|inf)$/i;
        var PARSE_NAN_REGEXP = /^(\+|-)?NaN$/i;
        var EXPONENT_MAX = 6111;
        var EXPONENT_MIN = -6176;
        var EXPONENT_BIAS = 6176;
        var MAX_DIGITS = 34; // Nan value bits as 32 bit values (due to lack of longs)

        var NAN_BUFFER = [0x7c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00].reverse(); // Infinity value bits 32 bit values (due to lack of longs)

        var INF_NEGATIVE_BUFFER = [0xf8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00].reverse();
        var INF_POSITIVE_BUFFER = [0x78, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00].reverse();
        var EXPONENT_REGEX = /^([-+])?(\d+)?$/; // Detect if the value is a digit

        function isDigit(value) {
          return !isNaN(parseInt(value, 10));
        } // Divide two uint128 values


        function divideu128(value) {
          var DIVISOR = long_1.fromNumber(1000 * 1000 * 1000);

          var _rem = long_1.fromNumber(0);

          if (!value.parts[0] && !value.parts[1] && !value.parts[2] && !value.parts[3]) {
            return {
              quotient: value,
              rem: _rem
            };
          }

          for (var i = 0; i <= 3; i++) {
            // Adjust remainder to match value of next dividend
            _rem = _rem.shiftLeft(32); // Add the divided to _rem

            _rem = _rem.add(new long_1(value.parts[i], 0));
            value.parts[i] = _rem.div(DIVISOR).low;
            _rem = _rem.modulo(DIVISOR);
          }

          return {
            quotient: value,
            rem: _rem
          };
        } // Multiply two Long values and return the 128 bit value


        function multiply64x2(left, right) {
          if (!left && !right) {
            return {
              high: long_1.fromNumber(0),
              low: long_1.fromNumber(0)
            };
          }

          var leftHigh = left.shiftRightUnsigned(32);
          var leftLow = new long_1(left.getLowBits(), 0);
          var rightHigh = right.shiftRightUnsigned(32);
          var rightLow = new long_1(right.getLowBits(), 0);
          var productHigh = leftHigh.multiply(rightHigh);
          var productMid = leftHigh.multiply(rightLow);
          var productMid2 = leftLow.multiply(rightHigh);
          var productLow = leftLow.multiply(rightLow);
          productHigh = productHigh.add(productMid.shiftRightUnsigned(32));
          productMid = new long_1(productMid.getLowBits(), 0).add(productMid2).add(productLow.shiftRightUnsigned(32));
          productHigh = productHigh.add(productMid.shiftRightUnsigned(32));
          productLow = productMid.shiftLeft(32).add(new long_1(productLow.getLowBits(), 0)); // Return the 128 bit result

          return {
            high: productHigh,
            low: productLow
          };
        }

        function lessThan(left, right) {
          // Make values unsigned
          var uhleft = left.high >>> 0;
          var uhright = right.high >>> 0; // Compare high bits first

          if (uhleft < uhright) {
            return true;
          } else if (uhleft === uhright) {
            var ulleft = left.low >>> 0;
            var ulright = right.low >>> 0;
            if (ulleft < ulright) return true;
          }

          return false;
        }

        function invalidErr(string, message) {
          throw new TypeError("\"".concat(string, "\" is not a valid Decimal128 string - ").concat(message));
        }
        /**
         * A class representation of the BSON Decimal128 type.
         *
         * @class
         * @param {Buffer} bytes a buffer containing the raw Decimal128 bytes.
         * @return {Double}
         */


        function Decimal128(bytes) {
          this.bytes = bytes;
        }
        /**
         * Create a Decimal128 instance from a string representation
         *
         * @method
         * @param {string} string a numeric string representation.
         * @return {Decimal128} returns a Decimal128 instance.
         */


        Decimal128.fromString = function (string) {
          // Parse state tracking
          var isNegative = false;
          var sawRadix = false;
          var foundNonZero = false; // Total number of significant digits (no leading or trailing zero)

          var significantDigits = 0; // Total number of significand digits read

          var nDigitsRead = 0; // Total number of digits (no leading zeros)

          var nDigits = 0; // The number of the digits after radix

          var radixPosition = 0; // The index of the first non-zero in *str*

          var firstNonZero = 0; // Digits Array

          var digits = [0]; // The number of digits in digits

          var nDigitsStored = 0; // Insertion pointer for digits

          var digitsInsert = 0; // The index of the first non-zero digit

          var firstDigit = 0; // The index of the last digit

          var lastDigit = 0; // Exponent

          var exponent = 0; // loop index over array

          var i = 0; // The high 17 digits of the significand

          var significandHigh = [0, 0]; // The low 17 digits of the significand

          var significandLow = [0, 0]; // The biased exponent

          var biasedExponent = 0; // Read index

          var index = 0; // Naively prevent against REDOS attacks.
          // TODO: implementing a custom parsing for this, or refactoring the regex would yield
          //       further gains.

          if (string.length >= 7000) {
            throw new TypeError('' + string + ' not a valid Decimal128 string');
          } // Results


          var stringMatch = string.match(PARSE_STRING_REGEXP);
          var infMatch = string.match(PARSE_INF_REGEXP);
          var nanMatch = string.match(PARSE_NAN_REGEXP); // Validate the string

          if (!stringMatch && !infMatch && !nanMatch || string.length === 0) {
            throw new TypeError('' + string + ' not a valid Decimal128 string');
          }

          if (stringMatch) {
            // full_match = stringMatch[0]
            // sign = stringMatch[1]
            var unsignedNumber = stringMatch[2]; // stringMatch[3] is undefined if a whole number (ex "1", 12")
            // but defined if a number w/ decimal in it (ex "1.0, 12.2")

            var e = stringMatch[4];
            var expSign = stringMatch[5];
            var expNumber = stringMatch[6]; // they provided e, but didn't give an exponent number. for ex "1e"

            if (e && expNumber === undefined) invalidErr(string, 'missing exponent power'); // they provided e, but didn't give a number before it. for ex "e1"

            if (e && unsignedNumber === undefined) invalidErr(string, 'missing exponent base');

            if (e === undefined && (expSign || expNumber)) {
              invalidErr(string, 'missing e before exponent');
            }
          } // Get the negative or positive sign


          if (string[index] === '+' || string[index] === '-') {
            isNegative = string[index++] === '-';
          } // Check if user passed Infinity or NaN


          if (!isDigit(string[index]) && string[index] !== '.') {
            if (string[index] === 'i' || string[index] === 'I') {
              return new Decimal128(Buffer.from(isNegative ? INF_NEGATIVE_BUFFER : INF_POSITIVE_BUFFER));
            } else if (string[index] === 'N') {
              return new Decimal128(Buffer.from(NAN_BUFFER));
            }
          } // Read all the digits


          while (isDigit(string[index]) || string[index] === '.') {
            if (string[index] === '.') {
              if (sawRadix) invalidErr(string, 'contains multiple periods');
              sawRadix = true;
              index = index + 1;
              continue;
            }

            if (nDigitsStored < 34) {
              if (string[index] !== '0' || foundNonZero) {
                if (!foundNonZero) {
                  firstNonZero = nDigitsRead;
                }

                foundNonZero = true; // Only store 34 digits

                digits[digitsInsert++] = parseInt(string[index], 10);
                nDigitsStored = nDigitsStored + 1;
              }
            }

            if (foundNonZero) nDigits = nDigits + 1;
            if (sawRadix) radixPosition = radixPosition + 1;
            nDigitsRead = nDigitsRead + 1;
            index = index + 1;
          }

          if (sawRadix && !nDigitsRead) throw new TypeError('' + string + ' not a valid Decimal128 string'); // Read exponent if exists

          if (string[index] === 'e' || string[index] === 'E') {
            // Read exponent digits
            var match = string.substr(++index).match(EXPONENT_REGEX); // No digits read

            if (!match || !match[2]) return new Decimal128(Buffer.from(NAN_BUFFER)); // Get exponent

            exponent = parseInt(match[0], 10); // Adjust the index

            index = index + match[0].length;
          } // Return not a number


          if (string[index]) return new Decimal128(Buffer.from(NAN_BUFFER)); // Done reading input
          // Find first non-zero digit in digits

          firstDigit = 0;

          if (!nDigitsStored) {
            firstDigit = 0;
            lastDigit = 0;
            digits[0] = 0;
            nDigits = 1;
            nDigitsStored = 1;
            significantDigits = 0;
          } else {
            lastDigit = nDigitsStored - 1;
            significantDigits = nDigits;

            if (significantDigits !== 1) {
              while (string[firstNonZero + significantDigits - 1] === '0') {
                significantDigits = significantDigits - 1;
              }
            }
          } // Normalization of exponent
          // Correct exponent based on radix position, and shift significand as needed
          // to represent user input
          // Overflow prevention


          if (exponent <= radixPosition && radixPosition - exponent > 1 << 14) {
            exponent = EXPONENT_MIN;
          } else {
            exponent = exponent - radixPosition;
          } // Attempt to normalize the exponent


          while (exponent > EXPONENT_MAX) {
            // Shift exponent to significand and decrease
            lastDigit = lastDigit + 1;

            if (lastDigit - firstDigit > MAX_DIGITS) {
              // Check if we have a zero then just hard clamp, otherwise fail
              var digitsString = digits.join('');

              if (digitsString.match(/^0+$/)) {
                exponent = EXPONENT_MAX;
                break;
              }

              invalidErr(string, 'overflow');
            }

            exponent = exponent - 1;
          }

          while (exponent < EXPONENT_MIN || nDigitsStored < nDigits) {
            // Shift last digit. can only do this if < significant digits than # stored.
            if (lastDigit === 0 && significantDigits < nDigitsStored) {
              exponent = EXPONENT_MIN;
              significantDigits = 0;
              break;
            }

            if (nDigitsStored < nDigits) {
              // adjust to match digits not stored
              nDigits = nDigits - 1;
            } else {
              // adjust to round
              lastDigit = lastDigit - 1;
            }

            if (exponent < EXPONENT_MAX) {
              exponent = exponent + 1;
            } else {
              // Check if we have a zero then just hard clamp, otherwise fail
              var _digitsString = digits.join('');

              if (_digitsString.match(/^0+$/)) {
                exponent = EXPONENT_MAX;
                break;
              }

              invalidErr(string, 'overflow');
            }
          } // Round
          // We've normalized the exponent, but might still need to round.


          if (lastDigit - firstDigit + 1 < significantDigits) {
            var endOfString = nDigitsRead; // If we have seen a radix point, 'string' is 1 longer than we have
            // documented with ndigits_read, so inc the position of the first nonzero
            // digit and the position that digits are read to.

            if (sawRadix) {
              firstNonZero = firstNonZero + 1;
              endOfString = endOfString + 1;
            } // if negative, we need to increment again to account for - sign at start.


            if (isNegative) {
              firstNonZero = firstNonZero + 1;
              endOfString = endOfString + 1;
            }

            var roundDigit = parseInt(string[firstNonZero + lastDigit + 1], 10);
            var roundBit = 0;

            if (roundDigit >= 5) {
              roundBit = 1;

              if (roundDigit === 5) {
                roundBit = digits[lastDigit] % 2 === 1;

                for (i = firstNonZero + lastDigit + 2; i < endOfString; i++) {
                  if (parseInt(string[i], 10)) {
                    roundBit = 1;
                    break;
                  }
                }
              }
            }

            if (roundBit) {
              var dIdx = lastDigit;

              for (; dIdx >= 0; dIdx--) {
                if (++digits[dIdx] > 9) {
                  digits[dIdx] = 0; // overflowed most significant digit

                  if (dIdx === 0) {
                    if (exponent < EXPONENT_MAX) {
                      exponent = exponent + 1;
                      digits[dIdx] = 1;
                    } else {
                      return new Decimal128(Buffer.from(isNegative ? INF_NEGATIVE_BUFFER : INF_POSITIVE_BUFFER));
                    }
                  }
                }
              }
            }
          } // Encode significand
          // The high 17 digits of the significand


          significandHigh = long_1.fromNumber(0); // The low 17 digits of the significand

          significandLow = long_1.fromNumber(0); // read a zero

          if (significantDigits === 0) {
            significandHigh = long_1.fromNumber(0);
            significandLow = long_1.fromNumber(0);
          } else if (lastDigit - firstDigit < 17) {
            var _dIdx = firstDigit;
            significandLow = long_1.fromNumber(digits[_dIdx++]);
            significandHigh = new long_1(0, 0);

            for (; _dIdx <= lastDigit; _dIdx++) {
              significandLow = significandLow.multiply(long_1.fromNumber(10));
              significandLow = significandLow.add(long_1.fromNumber(digits[_dIdx]));
            }
          } else {
            var _dIdx2 = firstDigit;
            significandHigh = long_1.fromNumber(digits[_dIdx2++]);

            for (; _dIdx2 <= lastDigit - 17; _dIdx2++) {
              significandHigh = significandHigh.multiply(long_1.fromNumber(10));
              significandHigh = significandHigh.add(long_1.fromNumber(digits[_dIdx2]));
            }

            significandLow = long_1.fromNumber(digits[_dIdx2++]);

            for (; _dIdx2 <= lastDigit; _dIdx2++) {
              significandLow = significandLow.multiply(long_1.fromNumber(10));
              significandLow = significandLow.add(long_1.fromNumber(digits[_dIdx2]));
            }
          }

          var significand = multiply64x2(significandHigh, long_1.fromString('100000000000000000'));
          significand.low = significand.low.add(significandLow);

          if (lessThan(significand.low, significandLow)) {
            significand.high = significand.high.add(long_1.fromNumber(1));
          } // Biased exponent


          biasedExponent = exponent + EXPONENT_BIAS;
          var dec = {
            low: long_1.fromNumber(0),
            high: long_1.fromNumber(0)
          }; // Encode combination, exponent, and significand.

          if (significand.high.shiftRightUnsigned(49).and(long_1.fromNumber(1)).equals(long_1.fromNumber(1))) {
            // Encode '11' into bits 1 to 3
            dec.high = dec.high.or(long_1.fromNumber(0x3).shiftLeft(61));
            dec.high = dec.high.or(long_1.fromNumber(biasedExponent).and(long_1.fromNumber(0x3fff).shiftLeft(47)));
            dec.high = dec.high.or(significand.high.and(long_1.fromNumber(0x7fffffffffff)));
          } else {
            dec.high = dec.high.or(long_1.fromNumber(biasedExponent & 0x3fff).shiftLeft(49));
            dec.high = dec.high.or(significand.high.and(long_1.fromNumber(0x1ffffffffffff)));
          }

          dec.low = significand.low; // Encode sign

          if (isNegative) {
            dec.high = dec.high.or(long_1.fromString('9223372036854775808'));
          } // Encode into a buffer


          var buffer$$1 = Buffer.alloc(16);
          index = 0; // Encode the low 64 bits of the decimal
          // Encode low bits

          buffer$$1[index++] = dec.low.low & 0xff;
          buffer$$1[index++] = dec.low.low >> 8 & 0xff;
          buffer$$1[index++] = dec.low.low >> 16 & 0xff;
          buffer$$1[index++] = dec.low.low >> 24 & 0xff; // Encode high bits

          buffer$$1[index++] = dec.low.high & 0xff;
          buffer$$1[index++] = dec.low.high >> 8 & 0xff;
          buffer$$1[index++] = dec.low.high >> 16 & 0xff;
          buffer$$1[index++] = dec.low.high >> 24 & 0xff; // Encode the high 64 bits of the decimal
          // Encode low bits

          buffer$$1[index++] = dec.high.low & 0xff;
          buffer$$1[index++] = dec.high.low >> 8 & 0xff;
          buffer$$1[index++] = dec.high.low >> 16 & 0xff;
          buffer$$1[index++] = dec.high.low >> 24 & 0xff; // Encode high bits

          buffer$$1[index++] = dec.high.high & 0xff;
          buffer$$1[index++] = dec.high.high >> 8 & 0xff;
          buffer$$1[index++] = dec.high.high >> 16 & 0xff;
          buffer$$1[index++] = dec.high.high >> 24 & 0xff; // Return the new Decimal128

          return new Decimal128(buffer$$1);
        }; // Extract least significant 5 bits


        var COMBINATION_MASK = 0x1f; // Extract least significant 14 bits

        var EXPONENT_MASK = 0x3fff; // Value of combination field for Inf

        var COMBINATION_INFINITY = 30; // Value of combination field for NaN

        var COMBINATION_NAN = 31;
        /**
         * Create a string representation of the raw Decimal128 value
         *
         * @method
         * @return {string} returns a Decimal128 string representation.
         */

        Decimal128.prototype.toString = function () {
          // Note: bits in this routine are referred to starting at 0,
          // from the sign bit, towards the coefficient.
          // bits 0 - 31
          var high; // bits 32 - 63

          var midh; // bits 64 - 95

          var midl; // bits 96 - 127

          var low; // bits 1 - 5

          var combination; // decoded biased exponent (14 bits)

          var biased_exponent; // the number of significand digits

          var significand_digits = 0; // the base-10 digits in the significand

          var significand = new Array(36);

          for (var i = 0; i < significand.length; i++) {
            significand[i] = 0;
          } // read pointer into significand


          var index = 0; // unbiased exponent

          var exponent; // the exponent if scientific notation is used

          var scientific_exponent; // true if the number is zero

          var is_zero = false; // the most signifcant significand bits (50-46)

          var significand_msb; // temporary storage for significand decoding

          var significand128 = {
            parts: new Array(4)
          }; // indexing variables

          var j, k; // Output string

          var string = []; // Unpack index

          index = 0; // Buffer reference

          var buffer$$1 = this.bytes; // Unpack the low 64bits into a long

          low = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;
          midl = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24; // Unpack the high 64bits into a long

          midh = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;
          high = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24; // Unpack index

          index = 0; // Create the state of the decimal

          var dec = {
            low: new long_1(low, midl),
            high: new long_1(midh, high)
          };

          if (dec.high.lessThan(long_1.ZERO)) {
            string.push('-');
          } // Decode combination field and exponent


          combination = high >> 26 & COMBINATION_MASK;

          if (combination >> 3 === 3) {
            // Check for 'special' values
            if (combination === COMBINATION_INFINITY) {
              return string.join('') + 'Infinity';
            } else if (combination === COMBINATION_NAN) {
              return 'NaN';
            } else {
              biased_exponent = high >> 15 & EXPONENT_MASK;
              significand_msb = 0x08 + (high >> 14 & 0x01);
            }
          } else {
            significand_msb = high >> 14 & 0x07;
            biased_exponent = high >> 17 & EXPONENT_MASK;
          }

          exponent = biased_exponent - EXPONENT_BIAS; // Create string of significand digits
          // Convert the 114-bit binary number represented by
          // (significand_high, significand_low) to at most 34 decimal
          // digits through modulo and division.

          significand128.parts[0] = (high & 0x3fff) + ((significand_msb & 0xf) << 14);
          significand128.parts[1] = midh;
          significand128.parts[2] = midl;
          significand128.parts[3] = low;

          if (significand128.parts[0] === 0 && significand128.parts[1] === 0 && significand128.parts[2] === 0 && significand128.parts[3] === 0) {
            is_zero = true;
          } else {
            for (k = 3; k >= 0; k--) {
              var least_digits = 0; // Peform the divide

              var result = divideu128(significand128);
              significand128 = result.quotient;
              least_digits = result.rem.low; // We now have the 9 least significant digits (in base 2).
              // Convert and output to string.

              if (!least_digits) continue;

              for (j = 8; j >= 0; j--) {
                // significand[k * 9 + j] = Math.round(least_digits % 10);
                significand[k * 9 + j] = least_digits % 10; // least_digits = Math.round(least_digits / 10);

                least_digits = Math.floor(least_digits / 10);
              }
            }
          } // Output format options:
          // Scientific - [-]d.dddE(+/-)dd or [-]dE(+/-)dd
          // Regular    - ddd.ddd


          if (is_zero) {
            significand_digits = 1;
            significand[index] = 0;
          } else {
            significand_digits = 36;

            while (!significand[index]) {
              significand_digits = significand_digits - 1;
              index = index + 1;
            }
          }

          scientific_exponent = significand_digits - 1 + exponent; // The scientific exponent checks are dictated by the string conversion
          // specification and are somewhat arbitrary cutoffs.
          //
          // We must check exponent > 0, because if this is the case, the number
          // has trailing zeros.  However, we *cannot* output these trailing zeros,
          // because doing so would change the precision of the value, and would
          // change stored data if the string converted number is round tripped.

          if (scientific_exponent >= 34 || scientific_exponent <= -7 || exponent > 0) {
            // Scientific format
            // if there are too many significant digits, we should just be treating numbers
            // as + or - 0 and using the non-scientific exponent (this is for the "invalid
            // representation should be treated as 0/-0" spec cases in decimal128-1.json)
            if (significand_digits > 34) {
              string.push(0);
              if (exponent > 0) string.push('E+' + exponent);else if (exponent < 0) string.push('E' + exponent);
              return string.join('');
            }

            string.push(significand[index++]);
            significand_digits = significand_digits - 1;

            if (significand_digits) {
              string.push('.');
            }

            for (var _i = 0; _i < significand_digits; _i++) {
              string.push(significand[index++]);
            } // Exponent


            string.push('E');

            if (scientific_exponent > 0) {
              string.push('+' + scientific_exponent);
            } else {
              string.push(scientific_exponent);
            }
          } else {
            // Regular format with no decimal place
            if (exponent >= 0) {
              for (var _i2 = 0; _i2 < significand_digits; _i2++) {
                string.push(significand[index++]);
              }
            } else {
              var radix_position = significand_digits + exponent; // non-zero digits before radix

              if (radix_position > 0) {
                for (var _i3 = 0; _i3 < radix_position; _i3++) {
                  string.push(significand[index++]);
                }
              } else {
                string.push('0');
              }

              string.push('.'); // add leading zeros after radix

              while (radix_position++ < 0) {
                string.push('0');
              }

              for (var _i4 = 0; _i4 < significand_digits - Math.max(radix_position - 1, 0); _i4++) {
                string.push(significand[index++]);
              }
            }
          }

          return string.join('');
        };

        Decimal128.prototype.toJSON = function () {
          return {
            $numberDecimal: this.toString()
          };
        };
        /**
         * @ignore
         */


        Decimal128.prototype.toExtendedJSON = function () {
          return {
            $numberDecimal: this.toString()
          };
        };
        /**
         * @ignore
         */


        Decimal128.fromExtendedJSON = function (doc) {
          return Decimal128.fromString(doc.$numberDecimal);
        };

        Object.defineProperty(Decimal128.prototype, '_bsontype', {
          value: 'Decimal128'
        });
        var decimal128 = Decimal128;

        var MinKey =
        /*#__PURE__*/
        function () {
          /**
           * Create a MinKey type
           *
           * @return {MinKey} A MinKey instance
           */
          function MinKey() {
            _classCallCheck(this, MinKey);
          }
          /**
           * @ignore
           */


          _createClass(MinKey, [{
            key: "toExtendedJSON",
            value: function toExtendedJSON() {
              return {
                $minKey: 1
              };
            }
            /**
             * @ignore
             */

          }], [{
            key: "fromExtendedJSON",
            value: function fromExtendedJSON() {
              return new MinKey();
            }
          }]);

          return MinKey;
        }();

        Object.defineProperty(MinKey.prototype, '_bsontype', {
          value: 'MinKey'
        });
        var min_key = MinKey;

        var MaxKey =
        /*#__PURE__*/
        function () {
          /**
           * Create a MaxKey type
           *
           * @return {MaxKey} A MaxKey instance
           */
          function MaxKey() {
            _classCallCheck(this, MaxKey);
          }
          /**
           * @ignore
           */


          _createClass(MaxKey, [{
            key: "toExtendedJSON",
            value: function toExtendedJSON() {
              return {
                $maxKey: 1
              };
            }
            /**
             * @ignore
             */

          }], [{
            key: "fromExtendedJSON",
            value: function fromExtendedJSON() {
              return new MaxKey();
            }
          }]);

          return MaxKey;
        }();

        Object.defineProperty(MaxKey.prototype, '_bsontype', {
          value: 'MaxKey'
        });
        var max_key = MaxKey;

        var DBRef =
        /*#__PURE__*/
        function () {
          /**
           * Create a DBRef type
           *
           * @param {string} collection the collection name.
           * @param {ObjectId} oid the reference ObjectId.
           * @param {string} [db] optional db name, if omitted the reference is local to the current db.
           * @return {DBRef}
           */
          function DBRef(collection, oid, db, fields) {
            _classCallCheck(this, DBRef); // check if namespace has been provided


            var parts = collection.split('.');

            if (parts.length === 2) {
              db = parts.shift();
              collection = parts.shift();
            }

            this.collection = collection;
            this.oid = oid;
            this.db = db;
            this.fields = fields || {};
          }
          /**
           * @ignore
           * @api private
           */


          _createClass(DBRef, [{
            key: "toJSON",
            value: function toJSON() {
              var o = Object.assign({
                $ref: this.collection,
                $id: this.oid
              }, this.fields);
              if (this.db != null) o.$db = this.db;
              return o;
            }
            /**
             * @ignore
             */

          }, {
            key: "toExtendedJSON",
            value: function toExtendedJSON() {
              var o = {
                $ref: this.collection,
                $id: this.oid
              };
              if (this.db) o.$db = this.db;
              o = Object.assign(o, this.fields);
              return o;
            }
            /**
             * @ignore
             */

          }], [{
            key: "fromExtendedJSON",
            value: function fromExtendedJSON(doc) {
              var copy = Object.assign({}, doc);
              ['$ref', '$id', '$db'].forEach(function (k) {
                return delete copy[k];
              });
              return new DBRef(doc.$ref, doc.$id, doc.$db, copy);
            }
          }]);

          return DBRef;
        }();

        Object.defineProperty(DBRef.prototype, '_bsontype', {
          value: 'DBRef'
        });
        var db_ref = DBRef;

        var Binary =
        /*#__PURE__*/
        function () {
          /**
           * Create a Binary type
           *
           * Sub types
           *  - **BSON.BSON_BINARY_SUBTYPE_DEFAULT**, default BSON type.
           *  - **BSON.BSON_BINARY_SUBTYPE_FUNCTION**, BSON function type.
           *  - **BSON.BSON_BINARY_SUBTYPE_BYTE_ARRAY**, BSON byte array type.
           *  - **BSON.BSON_BINARY_SUBTYPE_UUID**, BSON uuid type.
           *  - **BSON.BSON_BINARY_SUBTYPE_MD5**, BSON md5 type.
           *  - **BSON.BSON_BINARY_SUBTYPE_USER_DEFINED**, BSON user defined type.
           *
           * @param {Buffer} buffer a buffer object containing the binary data.
           * @param {Number} [subType] the option binary type.
           * @return {Binary}
           */
          function Binary(buffer$$1, subType) {
            _classCallCheck(this, Binary);

            if (buffer$$1 != null && !(typeof buffer$$1 === 'string') && !Buffer.isBuffer(buffer$$1) && !(buffer$$1 instanceof Uint8Array) && !Array.isArray(buffer$$1)) {
              throw new TypeError('only String, Buffer, Uint8Array or Array accepted');
            }

            this.sub_type = subType == null ? BSON_BINARY_SUBTYPE_DEFAULT : subType;
            this.position = 0;

            if (buffer$$1 != null && !(buffer$$1 instanceof Number)) {
              // Only accept Buffer, Uint8Array or Arrays
              if (typeof buffer$$1 === 'string') {
                // Different ways of writing the length of the string for the different types
                if (typeof Buffer !== 'undefined') {
                  this.buffer = Buffer.from(buffer$$1);
                } else if (typeof Uint8Array !== 'undefined' || Array.isArray(buffer$$1)) {
                  this.buffer = writeStringToArray(buffer$$1);
                } else {
                  throw new TypeError('only String, Buffer, Uint8Array or Array accepted');
                }
              } else {
                this.buffer = buffer$$1;
              }

              this.position = buffer$$1.length;
            } else {
              if (typeof Buffer !== 'undefined') {
                this.buffer = Buffer.alloc(Binary.BUFFER_SIZE);
              } else if (typeof Uint8Array !== 'undefined') {
                this.buffer = new Uint8Array(new ArrayBuffer(Binary.BUFFER_SIZE));
              } else {
                this.buffer = new Array(Binary.BUFFER_SIZE);
              }
            }
          }
          /**
           * Updates this binary with byte_value.
           *
           * @method
           * @param {string} byte_value a single byte we wish to write.
           */


          _createClass(Binary, [{
            key: "put",
            value: function put(byte_value) {
              // If it's a string and a has more than one character throw an error
              if (byte_value['length'] != null && typeof byte_value !== 'number' && byte_value.length !== 1) throw new TypeError('only accepts single character String, Uint8Array or Array');
              if (typeof byte_value !== 'number' && byte_value < 0 || byte_value > 255) throw new TypeError('only accepts number in a valid unsigned byte range 0-255'); // Decode the byte value once

              var decoded_byte = null;

              if (typeof byte_value === 'string') {
                decoded_byte = byte_value.charCodeAt(0);
              } else if (byte_value['length'] != null) {
                decoded_byte = byte_value[0];
              } else {
                decoded_byte = byte_value;
              }

              if (this.buffer.length > this.position) {
                this.buffer[this.position++] = decoded_byte;
              } else {
                if (typeof Buffer !== 'undefined' && Buffer.isBuffer(this.buffer)) {
                  // Create additional overflow buffer
                  var buffer$$1 = Buffer.alloc(Binary.BUFFER_SIZE + this.buffer.length); // Combine the two buffers together

                  this.buffer.copy(buffer$$1, 0, 0, this.buffer.length);
                  this.buffer = buffer$$1;
                  this.buffer[this.position++] = decoded_byte;
                } else {
                  var _buffer = null; // Create a new buffer (typed or normal array)

                  if (isUint8Array(this.buffer)) {
                    _buffer = new Uint8Array(new ArrayBuffer(Binary.BUFFER_SIZE + this.buffer.length));
                  } else {
                    _buffer = new Array(Binary.BUFFER_SIZE + this.buffer.length);
                  } // We need to copy all the content to the new array


                  for (var i = 0; i < this.buffer.length; i++) {
                    _buffer[i] = this.buffer[i];
                  } // Reassign the buffer


                  this.buffer = _buffer; // Write the byte

                  this.buffer[this.position++] = decoded_byte;
                }
              }
            }
            /**
             * Writes a buffer or string to the binary.
             *
             * @method
             * @param {(Buffer|string)} string a string or buffer to be written to the Binary BSON object.
             * @param {number} offset specify the binary of where to write the content.
             * @return {null}
             */

          }, {
            key: "write",
            value: function write(string, offset) {
              offset = typeof offset === 'number' ? offset : this.position; // If the buffer is to small let's extend the buffer

              if (this.buffer.length < offset + string.length) {
                var buffer$$1 = null; // If we are in node.js

                if (typeof Buffer !== 'undefined' && Buffer.isBuffer(this.buffer)) {
                  buffer$$1 = Buffer.alloc(this.buffer.length + string.length);
                  this.buffer.copy(buffer$$1, 0, 0, this.buffer.length);
                } else if (isUint8Array(this.buffer)) {
                  // Create a new buffer
                  buffer$$1 = new Uint8Array(new ArrayBuffer(this.buffer.length + string.length)); // Copy the content

                  for (var i = 0; i < this.position; i++) {
                    buffer$$1[i] = this.buffer[i];
                  }
                } // Assign the new buffer


                this.buffer = buffer$$1;
              }

              if (typeof Buffer !== 'undefined' && Buffer.isBuffer(string) && Buffer.isBuffer(this.buffer)) {
                string.copy(this.buffer, offset, 0, string.length);
                this.position = offset + string.length > this.position ? offset + string.length : this.position; // offset = string.length
              } else if (typeof Buffer !== 'undefined' && typeof string === 'string' && Buffer.isBuffer(this.buffer)) {
                this.buffer.write(string, offset, 'binary');
                this.position = offset + string.length > this.position ? offset + string.length : this.position; // offset = string.length;
              } else if (isUint8Array(string) || Array.isArray(string) && typeof string !== 'string') {
                for (var _i = 0; _i < string.length; _i++) {
                  this.buffer[offset++] = string[_i];
                }

                this.position = offset > this.position ? offset : this.position;
              } else if (typeof string === 'string') {
                for (var _i2 = 0; _i2 < string.length; _i2++) {
                  this.buffer[offset++] = string.charCodeAt(_i2);
                }

                this.position = offset > this.position ? offset : this.position;
              }
            }
            /**
             * Reads **length** bytes starting at **position**.
             *
             * @method
             * @param {number} position read from the given position in the Binary.
             * @param {number} length the number of bytes to read.
             * @return {Buffer}
             */

          }, {
            key: "read",
            value: function read(position, length) {
              length = length && length > 0 ? length : this.position; // Let's return the data based on the type we have

              if (this.buffer['slice']) {
                return this.buffer.slice(position, position + length);
              } // Create a buffer to keep the result


              var buffer$$1 = typeof Uint8Array !== 'undefined' ? new Uint8Array(new ArrayBuffer(length)) : new Array(length);

              for (var i = 0; i < length; i++) {
                buffer$$1[i] = this.buffer[position++];
              } // Return the buffer


              return buffer$$1;
            }
            /**
             * Returns the value of this binary as a string.
             *
             * @method
             * @return {string}
             */

          }, {
            key: "value",
            value: function value(asRaw) {
              asRaw = asRaw == null ? false : asRaw; // Optimize to serialize for the situation where the data == size of buffer

              if (asRaw && typeof Buffer !== 'undefined' && Buffer.isBuffer(this.buffer) && this.buffer.length === this.position) return this.buffer; // If it's a node.js buffer object

              if (typeof Buffer !== 'undefined' && Buffer.isBuffer(this.buffer)) {
                return asRaw ? this.buffer.slice(0, this.position) : this.buffer.toString('binary', 0, this.position);
              } else {
                if (asRaw) {
                  // we support the slice command use it
                  if (this.buffer['slice'] != null) {
                    return this.buffer.slice(0, this.position);
                  } else {
                    // Create a new buffer to copy content to
                    var newBuffer = isUint8Array(this.buffer) ? new Uint8Array(new ArrayBuffer(this.position)) : new Array(this.position); // Copy content

                    for (var i = 0; i < this.position; i++) {
                      newBuffer[i] = this.buffer[i];
                    } // Return the buffer


                    return newBuffer;
                  }
                } else {
                  return convertArraytoUtf8BinaryString(this.buffer, 0, this.position);
                }
              }
            }
            /**
             * Length.
             *
             * @method
             * @return {number} the length of the binary.
             */

          }, {
            key: "length",
            value: function length() {
              return this.position;
            }
            /**
             * @ignore
             */

          }, {
            key: "toJSON",
            value: function toJSON() {
              return this.buffer != null ? this.buffer.toString('base64') : '';
            }
            /**
             * @ignore
             */

          }, {
            key: "toString",
            value: function toString(format) {
              return this.buffer != null ? this.buffer.slice(0, this.position).toString(format) : '';
            }
            /**
             * @ignore
             */

          }, {
            key: "toExtendedJSON",
            value: function toExtendedJSON() {
              var base64String = Buffer.isBuffer(this.buffer) ? this.buffer.toString('base64') : Buffer.from(this.buffer).toString('base64');
              var subType = Number(this.sub_type).toString(16);
              return {
                $binary: {
                  base64: base64String,
                  subType: subType.length === 1 ? '0' + subType : subType
                }
              };
            }
            /**
             * @ignore
             */

          }], [{
            key: "fromExtendedJSON",
            value: function fromExtendedJSON(doc) {
              var type = doc.$binary.subType ? parseInt(doc.$binary.subType, 16) : 0;
              var data = new Buffer(doc.$binary.base64, 'base64');
              return new Binary(data, type);
            }
          }]);

          return Binary;
        }();
        /**
         * Binary default subtype
         * @ignore
         */


        var BSON_BINARY_SUBTYPE_DEFAULT = 0;

        function isUint8Array(obj) {
          return Object.prototype.toString.call(obj) === '[object Uint8Array]';
        }
        /**
         * @ignore
         */


        function writeStringToArray(data) {
          // Create a buffer
          var buffer$$1 = typeof Uint8Array !== 'undefined' ? new Uint8Array(new ArrayBuffer(data.length)) : new Array(data.length); // Write the content to the buffer

          for (var i = 0; i < data.length; i++) {
            buffer$$1[i] = data.charCodeAt(i);
          } // Write the string to the buffer


          return buffer$$1;
        }
        /**
         * Convert Array ot Uint8Array to Binary String
         *
         * @ignore
         */


        function convertArraytoUtf8BinaryString(byteArray, startIndex, endIndex) {
          var result = '';

          for (var i = startIndex; i < endIndex; i++) {
            result = result + String.fromCharCode(byteArray[i]);
          }

          return result;
        }

        Binary.BUFFER_SIZE = 256;
        /**
         * Default BSON type
         *
         * @classconstant SUBTYPE_DEFAULT
         **/

        Binary.SUBTYPE_DEFAULT = 0;
        /**
         * Function BSON type
         *
         * @classconstant SUBTYPE_DEFAULT
         **/

        Binary.SUBTYPE_FUNCTION = 1;
        /**
         * Byte Array BSON type
         *
         * @classconstant SUBTYPE_DEFAULT
         **/

        Binary.SUBTYPE_BYTE_ARRAY = 2;
        /**
         * OLD UUID BSON type
         *
         * @classconstant SUBTYPE_DEFAULT
         **/

        Binary.SUBTYPE_UUID_OLD = 3;
        /**
         * UUID BSON type
         *
         * @classconstant SUBTYPE_DEFAULT
         **/

        Binary.SUBTYPE_UUID = 4;
        /**
         * MD5 BSON type
         *
         * @classconstant SUBTYPE_DEFAULT
         **/

        Binary.SUBTYPE_MD5 = 5;
        /**
         * User BSON type
         *
         * @classconstant SUBTYPE_DEFAULT
         **/

        Binary.SUBTYPE_USER_DEFINED = 128;
        Object.defineProperty(Binary.prototype, '_bsontype', {
          value: 'Binary'
        });
        var binary = Binary;
        var constants = {
          // BSON MAX VALUES
          BSON_INT32_MAX: 0x7fffffff,
          BSON_INT32_MIN: -0x80000000,
          BSON_INT64_MAX: Math.pow(2, 63) - 1,
          BSON_INT64_MIN: -Math.pow(2, 63),
          // JS MAX PRECISE VALUES
          JS_INT_MAX: 0x20000000000000,
          // Any integer up to 2^53 can be precisely represented by a double.
          JS_INT_MIN: -0x20000000000000,
          // Any integer down to -2^53 can be precisely represented by a double.

          /**
           * Number BSON Type
           *
           * @classconstant BSON_DATA_NUMBER
           **/
          BSON_DATA_NUMBER: 1,

          /**
           * String BSON Type
           *
           * @classconstant BSON_DATA_STRING
           **/
          BSON_DATA_STRING: 2,

          /**
           * Object BSON Type
           *
           * @classconstant BSON_DATA_OBJECT
           **/
          BSON_DATA_OBJECT: 3,

          /**
           * Array BSON Type
           *
           * @classconstant BSON_DATA_ARRAY
           **/
          BSON_DATA_ARRAY: 4,

          /**
           * Binary BSON Type
           *
           * @classconstant BSON_DATA_BINARY
           **/
          BSON_DATA_BINARY: 5,

          /**
           * Binary BSON Type
           *
           * @classconstant BSON_DATA_UNDEFINED
           **/
          BSON_DATA_UNDEFINED: 6,

          /**
           * ObjectId BSON Type
           *
           * @classconstant BSON_DATA_OID
           **/
          BSON_DATA_OID: 7,

          /**
           * Boolean BSON Type
           *
           * @classconstant BSON_DATA_BOOLEAN
           **/
          BSON_DATA_BOOLEAN: 8,

          /**
           * Date BSON Type
           *
           * @classconstant BSON_DATA_DATE
           **/
          BSON_DATA_DATE: 9,

          /**
           * null BSON Type
           *
           * @classconstant BSON_DATA_NULL
           **/
          BSON_DATA_NULL: 10,

          /**
           * RegExp BSON Type
           *
           * @classconstant BSON_DATA_REGEXP
           **/
          BSON_DATA_REGEXP: 11,

          /**
           * Code BSON Type
           *
           * @classconstant BSON_DATA_DBPOINTER
           **/
          BSON_DATA_DBPOINTER: 12,

          /**
           * Code BSON Type
           *
           * @classconstant BSON_DATA_CODE
           **/
          BSON_DATA_CODE: 13,

          /**
           * Symbol BSON Type
           *
           * @classconstant BSON_DATA_SYMBOL
           **/
          BSON_DATA_SYMBOL: 14,

          /**
           * Code with Scope BSON Type
           *
           * @classconstant BSON_DATA_CODE_W_SCOPE
           **/
          BSON_DATA_CODE_W_SCOPE: 15,

          /**
           * 32 bit Integer BSON Type
           *
           * @classconstant BSON_DATA_INT
           **/
          BSON_DATA_INT: 16,

          /**
           * Timestamp BSON Type
           *
           * @classconstant BSON_DATA_TIMESTAMP
           **/
          BSON_DATA_TIMESTAMP: 17,

          /**
           * Long BSON Type
           *
           * @classconstant BSON_DATA_LONG
           **/
          BSON_DATA_LONG: 18,

          /**
           * Long BSON Type
           *
           * @classconstant BSON_DATA_DECIMAL128
           **/
          BSON_DATA_DECIMAL128: 19,

          /**
           * MinKey BSON Type
           *
           * @classconstant BSON_DATA_MIN_KEY
           **/
          BSON_DATA_MIN_KEY: 0xff,

          /**
           * MaxKey BSON Type
           *
           * @classconstant BSON_DATA_MAX_KEY
           **/
          BSON_DATA_MAX_KEY: 0x7f,

          /**
           * Binary Default Type
           *
           * @classconstant BSON_BINARY_SUBTYPE_DEFAULT
           **/
          BSON_BINARY_SUBTYPE_DEFAULT: 0,

          /**
           * Binary Function Type
           *
           * @classconstant BSON_BINARY_SUBTYPE_FUNCTION
           **/
          BSON_BINARY_SUBTYPE_FUNCTION: 1,

          /**
           * Binary Byte Array Type
           *
           * @classconstant BSON_BINARY_SUBTYPE_BYTE_ARRAY
           **/
          BSON_BINARY_SUBTYPE_BYTE_ARRAY: 2,

          /**
           * Binary UUID Type
           *
           * @classconstant BSON_BINARY_SUBTYPE_UUID
           **/
          BSON_BINARY_SUBTYPE_UUID: 3,

          /**
           * Binary MD5 Type
           *
           * @classconstant BSON_BINARY_SUBTYPE_MD5
           **/
          BSON_BINARY_SUBTYPE_MD5: 4,

          /**
           * Binary User Defined Type
           *
           * @classconstant BSON_BINARY_SUBTYPE_USER_DEFINED
           **/
          BSON_BINARY_SUBTYPE_USER_DEFINED: 128
        }; // const Map = require('./map');

        /**
         * @namespace EJSON
         */
        // all the types where we don't need to do any special processing and can just pass the EJSON
        //straight to type.fromExtendedJSON

        var keysToCodecs = {
          $oid: objectid,
          $binary: binary,
          $symbol: symbol,
          $numberInt: int_32,
          $numberDecimal: decimal128,
          $numberDouble: double_1,
          $numberLong: long_1,
          $minKey: min_key,
          $maxKey: max_key,
          $regularExpression: regexp,
          $timestamp: timestamp
        };

        function deserializeValue(self, key, value, options) {
          if (typeof value === 'number') {
            if (options.relaxed) {
              return value;
            } // if it's an integer, should interpret as smallest BSON integer
            // that can represent it exactly. (if out of range, interpret as double.)


            if (Math.floor(value) === value) {
              if (value >= BSON_INT32_MIN && value <= BSON_INT32_MAX) return new int_32(value);
              if (value >= BSON_INT64_MIN && value <= BSON_INT64_MAX) return new long_1.fromNumber(value);
            } // If the number is a non-integer or out of integer range, should interpret as BSON Double.


            return new double_1(value);
          } // from here on out we're looking for bson types, so bail if its not an object


          if (value == null || _typeof(value) !== 'object') return value; // upgrade deprecated undefined to null

          if (value.$undefined) return null;
          var keys = Object.keys(value).filter(function (k) {
            return k.startsWith('$') && value[k] != null;
          });

          for (var i = 0; i < keys.length; i++) {
            var c = keysToCodecs[keys[i]];
            if (c) return c.fromExtendedJSON(value, options);
          }

          if (value.$date != null) {
            var d = value.$date;
            var date = new Date();
            if (typeof d === 'string') date.setTime(Date.parse(d));else if (d instanceof long_1) date.setTime(d.toNumber());else if (typeof d === 'number' && options.relaxed) date.setTime(d);
            return date;
          }

          if (value.$code != null) {
            var copy = Object.assign({}, value);

            if (value.$scope) {
              copy.$scope = deserializeValue(self, null, value.$scope);
            }

            return code.fromExtendedJSON(value);
          }

          if (value.$ref != null || value.$dbPointer != null) {
            var v = value.$ref ? value : value.$dbPointer; // we run into this in a "degenerate EJSON" case (with $id and $ref order flipped)
            // because of the order JSON.parse goes through the document

            if (v instanceof db_ref) return v;
            var dollarKeys = Object.keys(v).filter(function (k) {
              return k.startsWith('$');
            });
            var valid = true;
            dollarKeys.forEach(function (k) {
              if (['$ref', '$id', '$db'].indexOf(k) === -1) valid = false;
            }); // only make DBRef if $ keys are all valid

            if (valid) return db_ref.fromExtendedJSON(v);
          }

          return value;
        }
        /**
         * Parse an Extended JSON string, constructing the JavaScript value or object described by that
         * string.
         *
         * @memberof EJSON
         * @param {string} text
         * @param {object} [options] Optional settings
         * @param {boolean} [options.relaxed=true] Attempt to return native JS types where possible, rather than BSON types (if true)
         * @return {object}
         *
         * @example
         * const { EJSON } = require('bson');
         * const text = '{ "int32": { "$numberInt": "10" } }';
         *
         * // prints { int32: { [String: '10'] _bsontype: 'Int32', value: '10' } }
         * console.log(EJSON.parse(text, { relaxed: false }));
         *
         * // prints { int32: 10 }
         * console.log(EJSON.parse(text));
         */


        function parse(text, options) {
          var _this = this;

          options = Object.assign({}, {
            relaxed: true
          }, options); // relaxed implies not strict

          if (typeof options.relaxed === 'boolean') options.strict = !options.relaxed;
          if (typeof options.strict === 'boolean') options.relaxed = !options.strict;
          return JSON.parse(text, function (key, value) {
            return deserializeValue(_this, key, value, options);
          });
        } //
        // Serializer
        //
        // MAX INT32 boundaries


        var BSON_INT32_MAX = 0x7fffffff,
            BSON_INT32_MIN = -0x80000000,
            BSON_INT64_MAX = 0x7fffffffffffffff,
            BSON_INT64_MIN = -0x8000000000000000;
        /**
         * Converts a BSON document to an Extended JSON string, optionally replacing values if a replacer
         * function is specified or optionally including only the specified properties if a replacer array
         * is specified.
         *
         * @memberof EJSON
         * @param {object} value The value to convert to extended JSON
         * @param {function|array} [replacer] A function that alters the behavior of the stringification process, or an array of String and Number objects that serve as a whitelist for selecting/filtering the properties of the value object to be included in the JSON string. If this value is null or not provided, all properties of the object are included in the resulting JSON string
         * @param {string|number} [space] A String or Number object that's used to insert white space into the output JSON string for readability purposes.
         * @param {object} [options] Optional settings
         * @param {boolean} [options.relaxed=true] Enabled Extended JSON's `relaxed` mode
         * @returns {string}
         *
         * @example
         * const { EJSON } = require('bson');
         * const Int32 = require('mongodb').Int32;
         * const doc = { int32: new Int32(10) };
         *
         * // prints '{"int32":{"$numberInt":"10"}}'
         * console.log(EJSON.stringify(doc, { relaxed: false }));
         *
         * // prints '{"int32":10}'
         * console.log(EJSON.stringify(doc));
         */

        function stringify(value, replacer, space, options) {
          if (space != null && _typeof(space) === 'object') options = space, space = 0;
          if (replacer != null && _typeof(replacer) === 'object') options = replacer, replacer = null, space = 0;
          options = Object.assign({}, {
            relaxed: true
          }, options);
          var doc = Array.isArray(value) ? serializeArray(value, options) : serializeDocument(value, options);
          return JSON.stringify(doc, replacer, space);
        }
        /**
         * Serializes an object to an Extended JSON string, and reparse it as a JavaScript object.
         *
         * @memberof EJSON
         * @param {object} bson The object to serialize
         * @param {object} [options] Optional settings passed to the `stringify` function
         * @return {object}
         */


        function serialize(bson, options) {
          options = options || {};
          return JSON.parse(stringify(bson, options));
        }
        /**
         * Deserializes an Extended JSON object into a plain JavaScript object with native/BSON types
         *
         * @memberof EJSON
         * @param {object} ejson The Extended JSON object to deserialize
         * @param {object} [options] Optional settings passed to the parse method
         * @return {object}
         */


        function deserialize(ejson, options) {
          options = options || {};
          return parse(JSON.stringify(ejson), options);
        }

        function serializeArray(array, options) {
          return array.map(function (v) {
            return serializeValue(v, options);
          });
        }

        function getISOString(date) {
          var isoStr = date.toISOString(); // we should only show milliseconds in timestamp if they're non-zero

          return date.getUTCMilliseconds() !== 0 ? isoStr : isoStr.slice(0, -5) + 'Z';
        }

        function serializeValue(value, options) {
          if (Array.isArray(value)) return serializeArray(value, options);
          if (value === undefined) return null;

          if (value instanceof Date) {
            var dateNum = value.getTime(),
                // is it in year range 1970-9999?
            inRange = dateNum > -1 && dateNum < 253402318800000;
            return options.relaxed && inRange ? {
              $date: getISOString(value)
            } : {
              $date: {
                $numberLong: value.getTime().toString()
              }
            };
          }

          if (typeof value === 'number' && !options.relaxed) {
            // it's an integer
            if (Math.floor(value) === value) {
              var int32Range = value >= BSON_INT32_MIN && value <= BSON_INT32_MAX,
                  int64Range = value >= BSON_INT64_MIN && value <= BSON_INT64_MAX; // interpret as being of the smallest BSON integer type that can represent the number exactly

              if (int32Range) return {
                $numberInt: value.toString()
              };
              if (int64Range) return {
                $numberLong: value.toString()
              };
            }

            return {
              $numberDouble: value.toString()
            };
          }

          if (value != null && _typeof(value) === 'object') return serializeDocument(value, options);
          return value;
        }

        function serializeDocument(doc, options) {
          if (doc == null || _typeof(doc) !== 'object') throw new Error('not an object instance'); // the document itself is a BSON type

          if (doc._bsontype && typeof doc.toExtendedJSON === 'function') {
            if (doc._bsontype === 'Code' && doc.scope) {
              doc.scope = serializeDocument(doc.scope, options);
            } else if (doc._bsontype === 'DBRef' && doc.oid) {
              doc.oid = serializeDocument(doc.oid, options);
            }

            return doc.toExtendedJSON(options);
          } // the document is an object with nested BSON types


          var _doc = {};

          for (var name in doc) {
            var val = doc[name];

            if (Array.isArray(val)) {
              _doc[name] = serializeArray(val, options);
            } else if (val != null && typeof val.toExtendedJSON === 'function') {
              if (val._bsontype === 'Code' && val.scope) {
                val.scope = serializeDocument(val.scope, options);
              } else if (val._bsontype === 'DBRef' && val.oid) {
                val.oid = serializeDocument(val.oid, options);
              }

              _doc[name] = val.toExtendedJSON(options);
            } else if (val instanceof Date) {
              _doc[name] = serializeValue(val, options);
            } else if (val != null && _typeof(val) === 'object') {
              _doc[name] = serializeDocument(val, options);
            }

            _doc[name] = serializeValue(val, options);

            if (val instanceof RegExp) {
              var flags = val.flags;

              if (flags === undefined) {
                flags = val.toString().match(/[gimuy]*$/)[0];
              }

              var rx = new regexp(val.source, flags);
              _doc[name] = rx.toExtendedJSON();
            }
          }

          return _doc;
        }

        var extended_json = {
          parse: parse,
          deserialize: deserialize,
          serialize: serialize,
          stringify: stringify
        };
        var FIRST_BIT = 0x80;
        var FIRST_TWO_BITS = 0xc0;
        var FIRST_THREE_BITS = 0xe0;
        var FIRST_FOUR_BITS = 0xf0;
        var FIRST_FIVE_BITS = 0xf8;
        var TWO_BIT_CHAR = 0xc0;
        var THREE_BIT_CHAR = 0xe0;
        var FOUR_BIT_CHAR = 0xf0;
        var CONTINUING_CHAR = 0x80;
        /**
         * Determines if the passed in bytes are valid utf8
         * @param {Buffer|Uint8Array} bytes An array of 8-bit bytes. Must be indexable and have length property
         * @param {Number} start The index to start validating
         * @param {Number} end The index to end validating
         * @returns {boolean} True if valid utf8
         */

        function validateUtf8(bytes, start, end) {
          var continuation = 0;

          for (var i = start; i < end; i += 1) {
            var byte = bytes[i];

            if (continuation) {
              if ((byte & FIRST_TWO_BITS) !== CONTINUING_CHAR) {
                return false;
              }

              continuation -= 1;
            } else if (byte & FIRST_BIT) {
              if ((byte & FIRST_THREE_BITS) === TWO_BIT_CHAR) {
                continuation = 1;
              } else if ((byte & FIRST_FOUR_BITS) === THREE_BIT_CHAR) {
                continuation = 2;
              } else if ((byte & FIRST_FIVE_BITS) === FOUR_BIT_CHAR) {
                continuation = 3;
              } else {
                return false;
              }
            }
          }

          return !continuation;
        }

        var validateUtf8_1 = validateUtf8;
        var validate_utf8 = {
          validateUtf8: validateUtf8_1
        };
        var Buffer$2 = buffer.Buffer;
        var validateUtf8$1 = validate_utf8.validateUtf8; // Internal long versions

        var JS_INT_MAX_LONG = long_1.fromNumber(constants.JS_INT_MAX);
        var JS_INT_MIN_LONG = long_1.fromNumber(constants.JS_INT_MIN);
        var functionCache = {};

        function deserialize$1(buffer$$1, options, isArray) {
          options = options == null ? {} : options;
          var index = options && options.index ? options.index : 0; // Read the document size

          var size = buffer$$1[index] | buffer$$1[index + 1] << 8 | buffer$$1[index + 2] << 16 | buffer$$1[index + 3] << 24;

          if (size < 5) {
            throw new Error("bson size must be >= 5, is ".concat(size));
          }

          if (options.allowObjectSmallerThanBufferSize && buffer$$1.length < size) {
            throw new Error("buffer length ".concat(buffer$$1.length, " must be >= bson size ").concat(size));
          }

          if (!options.allowObjectSmallerThanBufferSize && buffer$$1.length !== size) {
            throw new Error("buffer length ".concat(buffer$$1.length, " must === bson size ").concat(size));
          }

          if (size + index > buffer$$1.length) {
            throw new Error("(bson size ".concat(size, " + options.index ").concat(index, " must be <= buffer length ").concat(Buffer$2.byteLength(buffer$$1), ")"));
          } // Illegal end value


          if (buffer$$1[index + size - 1] !== 0) {
            throw new Error("One object, sized correctly, with a spot for an EOO, but the EOO isn't 0x00");
          } // Start deserializtion


          return deserializeObject(buffer$$1, index, options, isArray);
        }

        function deserializeObject(buffer$$1, index, options, isArray) {
          var evalFunctions = options['evalFunctions'] == null ? false : options['evalFunctions'];
          var cacheFunctions = options['cacheFunctions'] == null ? false : options['cacheFunctions'];
          var cacheFunctionsCrc32 = options['cacheFunctionsCrc32'] == null ? false : options['cacheFunctionsCrc32'];
          if (!cacheFunctionsCrc32) var crc32 = null;
          var fieldsAsRaw = options['fieldsAsRaw'] == null ? null : options['fieldsAsRaw']; // Return raw bson buffer instead of parsing it

          var raw = options['raw'] == null ? false : options['raw']; // Return BSONRegExp objects instead of native regular expressions

          var bsonRegExp = typeof options['bsonRegExp'] === 'boolean' ? options['bsonRegExp'] : false; // Controls the promotion of values vs wrapper classes

          var promoteBuffers = options['promoteBuffers'] == null ? false : options['promoteBuffers'];
          var promoteLongs = options['promoteLongs'] == null ? true : options['promoteLongs'];
          var promoteValues = options['promoteValues'] == null ? true : options['promoteValues']; // Set the start index

          var startIndex = index; // Validate that we have at least 4 bytes of buffer

          if (buffer$$1.length < 5) throw new Error('corrupt bson message < 5 bytes long'); // Read the document size

          var size = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24; // Ensure buffer is valid size

          if (size < 5 || size > buffer$$1.length) throw new Error('corrupt bson message'); // Create holding object

          var object = isArray ? [] : {}; // Used for arrays to skip having to perform utf8 decoding

          var arrayIndex = 0;
          var done = false; // While we have more left data left keep parsing

          while (!done) {
            // Read the type
            var elementType = buffer$$1[index++]; // If we get a zero it's the last byte, exit

            if (elementType === 0) break; // Get the start search index

            var i = index; // Locate the end of the c string

            while (buffer$$1[i] !== 0x00 && i < buffer$$1.length) {
              i++;
            } // If are at the end of the buffer there is a problem with the document


            if (i >= Buffer$2.byteLength(buffer$$1)) throw new Error('Bad BSON Document: illegal CString');
            var name = isArray ? arrayIndex++ : buffer$$1.toString('utf8', index, i);
            index = i + 1;

            if (elementType === constants.BSON_DATA_STRING) {
              var stringSize = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;
              if (stringSize <= 0 || stringSize > buffer$$1.length - index || buffer$$1[index + stringSize - 1] !== 0) throw new Error('bad string length in bson');

              if (!validateUtf8$1(buffer$$1, index, index + stringSize - 1)) {
                throw new Error('Invalid UTF-8 string in BSON document');
              }

              var s = buffer$$1.toString('utf8', index, index + stringSize - 1);
              object[name] = s;
              index = index + stringSize;
            } else if (elementType === constants.BSON_DATA_OID) {
              var oid = Buffer$2.alloc(12);
              buffer$$1.copy(oid, 0, index, index + 12);
              object[name] = new objectid(oid);
              index = index + 12;
            } else if (elementType === constants.BSON_DATA_INT && promoteValues === false) {
              object[name] = new int_32(buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24);
            } else if (elementType === constants.BSON_DATA_INT) {
              object[name] = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;
            } else if (elementType === constants.BSON_DATA_NUMBER && promoteValues === false) {
              object[name] = new double_1(buffer$$1.readDoubleLE(index));
              index = index + 8;
            } else if (elementType === constants.BSON_DATA_NUMBER) {
              object[name] = buffer$$1.readDoubleLE(index);
              index = index + 8;
            } else if (elementType === constants.BSON_DATA_DATE) {
              var lowBits = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;
              var highBits = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;
              object[name] = new Date(new long_1(lowBits, highBits).toNumber());
            } else if (elementType === constants.BSON_DATA_BOOLEAN) {
              if (buffer$$1[index] !== 0 && buffer$$1[index] !== 1) throw new Error('illegal boolean type value');
              object[name] = buffer$$1[index++] === 1;
            } else if (elementType === constants.BSON_DATA_OBJECT) {
              var _index = index;
              var objectSize = buffer$$1[index] | buffer$$1[index + 1] << 8 | buffer$$1[index + 2] << 16 | buffer$$1[index + 3] << 24;
              if (objectSize <= 0 || objectSize > buffer$$1.length - index) throw new Error('bad embedded document length in bson'); // We have a raw value

              if (raw) {
                object[name] = buffer$$1.slice(index, index + objectSize);
              } else {
                object[name] = deserializeObject(buffer$$1, _index, options, false);
              }

              index = index + objectSize;
            } else if (elementType === constants.BSON_DATA_ARRAY) {
              var _index2 = index;

              var _objectSize = buffer$$1[index] | buffer$$1[index + 1] << 8 | buffer$$1[index + 2] << 16 | buffer$$1[index + 3] << 24;

              var arrayOptions = options; // Stop index

              var stopIndex = index + _objectSize; // All elements of array to be returned as raw bson

              if (fieldsAsRaw && fieldsAsRaw[name]) {
                arrayOptions = {};

                for (var n in options) {
                  arrayOptions[n] = options[n];
                }

                arrayOptions['raw'] = true;
              }

              object[name] = deserializeObject(buffer$$1, _index2, arrayOptions, true);
              index = index + _objectSize;
              if (buffer$$1[index - 1] !== 0) throw new Error('invalid array terminator byte');
              if (index !== stopIndex) throw new Error('corrupted array bson');
            } else if (elementType === constants.BSON_DATA_UNDEFINED) {
              object[name] = undefined;
            } else if (elementType === constants.BSON_DATA_NULL) {
              object[name] = null;
            } else if (elementType === constants.BSON_DATA_LONG) {
              // Unpack the low and high bits
              var _lowBits = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;

              var _highBits = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;

              var long$$1 = new long_1(_lowBits, _highBits); // Promote the long if possible

              if (promoteLongs && promoteValues === true) {
                object[name] = long$$1.lessThanOrEqual(JS_INT_MAX_LONG) && long$$1.greaterThanOrEqual(JS_INT_MIN_LONG) ? long$$1.toNumber() : long$$1;
              } else {
                object[name] = long$$1;
              }
            } else if (elementType === constants.BSON_DATA_DECIMAL128) {
              // Buffer to contain the decimal bytes
              var bytes = Buffer$2.alloc(16); // Copy the next 16 bytes into the bytes buffer

              buffer$$1.copy(bytes, 0, index, index + 16); // Update index

              index = index + 16; // Assign the new Decimal128 value

              var decimal128$$1 = new decimal128(bytes); // If we have an alternative mapper use that

              object[name] = decimal128$$1.toObject ? decimal128$$1.toObject() : decimal128$$1;
            } else if (elementType === constants.BSON_DATA_BINARY) {
              var binarySize = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;
              var totalBinarySize = binarySize;
              var subType = buffer$$1[index++]; // Did we have a negative binary size, throw

              if (binarySize < 0) throw new Error('Negative binary type element size found'); // Is the length longer than the document

              if (binarySize > Buffer$2.byteLength(buffer$$1)) throw new Error('Binary type size larger than document size'); // Decode as raw Buffer object if options specifies it

              if (buffer$$1['slice'] != null) {
                // If we have subtype 2 skip the 4 bytes for the size
                if (subType === binary.SUBTYPE_BYTE_ARRAY) {
                  binarySize = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;
                  if (binarySize < 0) throw new Error('Negative binary type element size found for subtype 0x02');
                  if (binarySize > totalBinarySize - 4) throw new Error('Binary type with subtype 0x02 contains to long binary size');
                  if (binarySize < totalBinarySize - 4) throw new Error('Binary type with subtype 0x02 contains to short binary size');
                }

                if (promoteBuffers && promoteValues) {
                  object[name] = buffer$$1.slice(index, index + binarySize);
                } else {
                  object[name] = new binary(buffer$$1.slice(index, index + binarySize), subType);
                }
              } else {
                var _buffer = typeof Uint8Array !== 'undefined' ? new Uint8Array(new ArrayBuffer(binarySize)) : new Array(binarySize); // If we have subtype 2 skip the 4 bytes for the size


                if (subType === binary.SUBTYPE_BYTE_ARRAY) {
                  binarySize = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;
                  if (binarySize < 0) throw new Error('Negative binary type element size found for subtype 0x02');
                  if (binarySize > totalBinarySize - 4) throw new Error('Binary type with subtype 0x02 contains to long binary size');
                  if (binarySize < totalBinarySize - 4) throw new Error('Binary type with subtype 0x02 contains to short binary size');
                } // Copy the data


                for (i = 0; i < binarySize; i++) {
                  _buffer[i] = buffer$$1[index + i];
                }

                if (promoteBuffers && promoteValues) {
                  object[name] = _buffer;
                } else {
                  object[name] = new binary(_buffer, subType);
                }
              } // Update the index


              index = index + binarySize;
            } else if (elementType === constants.BSON_DATA_REGEXP && bsonRegExp === false) {
              // Get the start search index
              i = index; // Locate the end of the c string

              while (buffer$$1[i] !== 0x00 && i < buffer$$1.length) {
                i++;
              } // If are at the end of the buffer there is a problem with the document


              if (i >= buffer$$1.length) throw new Error('Bad BSON Document: illegal CString'); // Return the C string

              var source = buffer$$1.toString('utf8', index, i); // Create the regexp

              index = i + 1; // Get the start search index

              i = index; // Locate the end of the c string

              while (buffer$$1[i] !== 0x00 && i < buffer$$1.length) {
                i++;
              } // If are at the end of the buffer there is a problem with the document


              if (i >= buffer$$1.length) throw new Error('Bad BSON Document: illegal CString'); // Return the C string

              var regExpOptions = buffer$$1.toString('utf8', index, i);
              index = i + 1; // For each option add the corresponding one for javascript

              var optionsArray = new Array(regExpOptions.length); // Parse options

              for (i = 0; i < regExpOptions.length; i++) {
                switch (regExpOptions[i]) {
                  case 'm':
                    optionsArray[i] = 'm';
                    break;

                  case 's':
                    optionsArray[i] = 'g';
                    break;

                  case 'i':
                    optionsArray[i] = 'i';
                    break;
                }
              }

              object[name] = new RegExp(source, optionsArray.join(''));
            } else if (elementType === constants.BSON_DATA_REGEXP && bsonRegExp === true) {
              // Get the start search index
              i = index; // Locate the end of the c string

              while (buffer$$1[i] !== 0x00 && i < buffer$$1.length) {
                i++;
              } // If are at the end of the buffer there is a problem with the document


              if (i >= buffer$$1.length) throw new Error('Bad BSON Document: illegal CString'); // Return the C string

              var _source = buffer$$1.toString('utf8', index, i);

              index = i + 1; // Get the start search index

              i = index; // Locate the end of the c string

              while (buffer$$1[i] !== 0x00 && i < buffer$$1.length) {
                i++;
              } // If are at the end of the buffer there is a problem with the document


              if (i >= buffer$$1.length) throw new Error('Bad BSON Document: illegal CString'); // Return the C string

              var _regExpOptions = buffer$$1.toString('utf8', index, i);

              index = i + 1; // Set the object

              object[name] = new regexp(_source, _regExpOptions);
            } else if (elementType === constants.BSON_DATA_SYMBOL) {
              var _stringSize = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;

              if (_stringSize <= 0 || _stringSize > buffer$$1.length - index || buffer$$1[index + _stringSize - 1] !== 0) throw new Error('bad string length in bson'); // symbol is deprecated - upgrade to string.

              object[name] = buffer$$1.toString('utf8', index, index + _stringSize - 1);
              index = index + _stringSize;
            } else if (elementType === constants.BSON_DATA_TIMESTAMP) {
              var _lowBits2 = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;

              var _highBits2 = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;

              object[name] = new timestamp(_lowBits2, _highBits2);
            } else if (elementType === constants.BSON_DATA_MIN_KEY) {
              object[name] = new min_key();
            } else if (elementType === constants.BSON_DATA_MAX_KEY) {
              object[name] = new max_key();
            } else if (elementType === constants.BSON_DATA_CODE) {
              var _stringSize2 = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24;

              if (_stringSize2 <= 0 || _stringSize2 > buffer$$1.length - index || buffer$$1[index + _stringSize2 - 1] !== 0) throw new Error('bad string length in bson');
              var functionString = buffer$$1.toString('utf8', index, index + _stringSize2 - 1); // If we are evaluating the functions

              if (evalFunctions) {
                // If we have cache enabled let's look for the md5 of the function in the cache
                if (cacheFunctions) {
                  var hash = cacheFunctionsCrc32 ? crc32(functionString) : functionString; // Got to do this to avoid V8 deoptimizing the call due to finding eval

                  object[name] = isolateEvalWithHash(functionCache, hash, functionString, object);
                } else {
                  object[name] = isolateEval(functionString);
                }
              } else {
                object[name] = new code(functionString);
              } // Update parse index position


              index = index + _stringSize2;
            } else if (elementType === constants.BSON_DATA_CODE_W_SCOPE) {
              var totalSize = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24; // Element cannot be shorter than totalSize + stringSize + documentSize + terminator

              if (totalSize < 4 + 4 + 4 + 1) {
                throw new Error('code_w_scope total size shorter minimum expected length');
              } // Get the code string size


              var _stringSize3 = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24; // Check if we have a valid string


              if (_stringSize3 <= 0 || _stringSize3 > buffer$$1.length - index || buffer$$1[index + _stringSize3 - 1] !== 0) throw new Error('bad string length in bson'); // Javascript function

              var _functionString = buffer$$1.toString('utf8', index, index + _stringSize3 - 1); // Update parse index position


              index = index + _stringSize3; // Parse the element

              var _index3 = index; // Decode the size of the object document

              var _objectSize2 = buffer$$1[index] | buffer$$1[index + 1] << 8 | buffer$$1[index + 2] << 16 | buffer$$1[index + 3] << 24; // Decode the scope object


              var scopeObject = deserializeObject(buffer$$1, _index3, options, false); // Adjust the index

              index = index + _objectSize2; // Check if field length is to short

              if (totalSize < 4 + 4 + _objectSize2 + _stringSize3) {
                throw new Error('code_w_scope total size is to short, truncating scope');
              } // Check if totalSize field is to long


              if (totalSize > 4 + 4 + _objectSize2 + _stringSize3) {
                throw new Error('code_w_scope total size is to long, clips outer document');
              } // If we are evaluating the functions


              if (evalFunctions) {
                // If we have cache enabled let's look for the md5 of the function in the cache
                if (cacheFunctions) {
                  var _hash = cacheFunctionsCrc32 ? crc32(_functionString) : _functionString; // Got to do this to avoid V8 deoptimizing the call due to finding eval


                  object[name] = isolateEvalWithHash(functionCache, _hash, _functionString, object);
                } else {
                  object[name] = isolateEval(_functionString);
                }

                object[name].scope = scopeObject;
              } else {
                object[name] = new code(_functionString, scopeObject);
              }
            } else if (elementType === constants.BSON_DATA_DBPOINTER) {
              // Get the code string size
              var _stringSize4 = buffer$$1[index++] | buffer$$1[index++] << 8 | buffer$$1[index++] << 16 | buffer$$1[index++] << 24; // Check if we have a valid string


              if (_stringSize4 <= 0 || _stringSize4 > buffer$$1.length - index || buffer$$1[index + _stringSize4 - 1] !== 0) throw new Error('bad string length in bson'); // Namespace

              if (!validateUtf8$1(buffer$$1, index, index + _stringSize4 - 1)) {
                throw new Error('Invalid UTF-8 string in BSON document');
              }

              var namespace = buffer$$1.toString('utf8', index, index + _stringSize4 - 1); // Update parse index position

              index = index + _stringSize4; // Read the oid

              var oidBuffer = Buffer$2.alloc(12);
              buffer$$1.copy(oidBuffer, 0, index, index + 12);

              var _oid = new objectid(oidBuffer); // Update the index


              index = index + 12; // Upgrade to DBRef type

              object[name] = new db_ref(namespace, _oid);
            } else {
              throw new Error('Detected unknown BSON type ' + elementType.toString(16) + ' for fieldname "' + name + '", are you using the latest BSON parser?');
            }
          } // Check if the deserialization was against a valid array/object


          if (size !== index - startIndex) {
            if (isArray) throw new Error('corrupt array bson');
            throw new Error('corrupt object bson');
          } // check if object's $ keys are those of a DBRef


          var dollarKeys = Object.keys(object).filter(function (k) {
            return k.startsWith('$');
          });
          var valid = true;
          dollarKeys.forEach(function (k) {
            if (['$ref', '$id', '$db'].indexOf(k) === -1) valid = false;
          }); // if a $key not in "$ref", "$id", "$db", don't make a DBRef

          if (!valid) return object;

          if (object['$id'] != null && object['$ref'] != null) {
            var copy = Object.assign({}, object);
            delete copy.$ref;
            delete copy.$id;
            delete copy.$db;
            return new db_ref(object.$ref, object.$id, object.$db || null, copy);
          }

          return object;
        }
        /**
         * Ensure eval is isolated.
         *
         * @ignore
         * @api private
         */


        function isolateEvalWithHash(functionCache, hash, functionString, object) {
          // Contains the value we are going to set
          var value = null; // Check for cache hit, eval if missing and return cached function

          if (functionCache[hash] == null) {
            eval('value = ' + functionString);
            functionCache[hash] = value;
          } // Set the object


          return functionCache[hash].bind(object);
        }
        /**
         * Ensure eval is isolated.
         *
         * @ignore
         * @api private
         */


        function isolateEval(functionString) {
          // Contains the value we are going to set
          var value = null; // Eval the function

          eval('value = ' + functionString);
          return value;
        }

        var deserializer = deserialize$1; // All rights reserved.
        //
        // Redistribution and use in source and binary forms, with or without
        // modification, are permitted provided that the following conditions are met:
        //
        //  * Redistributions of source code must retain the above copyright notice,
        //    this list of conditions and the following disclaimer.
        //
        //  * Redistributions in binary form must reproduce the above copyright notice,
        //    this list of conditions and the following disclaimer in the documentation
        //    and/or other materials provided with the distribution.
        //
        //  * Neither the name of Fair Oaks Labs, Inc. nor the names of its contributors
        //    may be used to endorse or promote products derived from this software
        //    without specific prior written permission.
        //
        // THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
        // AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
        // IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
        // ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
        // LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
        // CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
        // SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
        // INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
        // CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
        // ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
        // POSSIBILITY OF SUCH DAMAGE.
        //
        //
        // Modifications to writeIEEE754 to support negative zeroes made by Brian White

        function readIEEE754(buffer$$1, offset, endian, mLen, nBytes) {
          var e,
              m,
              bBE = endian === 'big',
              eLen = nBytes * 8 - mLen - 1,
              eMax = (1 << eLen) - 1,
              eBias = eMax >> 1,
              nBits = -7,
              i = bBE ? 0 : nBytes - 1,
              d = bBE ? 1 : -1,
              s = buffer$$1[offset + i];
          i += d;
          e = s & (1 << -nBits) - 1;
          s >>= -nBits;
          nBits += eLen;

          for (; nBits > 0; e = e * 256 + buffer$$1[offset + i], i += d, nBits -= 8) {}

          m = e & (1 << -nBits) - 1;
          e >>= -nBits;
          nBits += mLen;

          for (; nBits > 0; m = m * 256 + buffer$$1[offset + i], i += d, nBits -= 8) {}

          if (e === 0) {
            e = 1 - eBias;
          } else if (e === eMax) {
            return m ? NaN : (s ? -1 : 1) * Infinity;
          } else {
            m = m + Math.pow(2, mLen);
            e = e - eBias;
          }

          return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
        }

        function writeIEEE754(buffer$$1, value, offset, endian, mLen, nBytes) {
          var e,
              m,
              c,
              bBE = endian === 'big',
              eLen = nBytes * 8 - mLen - 1,
              eMax = (1 << eLen) - 1,
              eBias = eMax >> 1,
              rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
              i = bBE ? nBytes - 1 : 0,
              d = bBE ? -1 : 1,
              s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
          value = Math.abs(value);

          if (isNaN(value) || value === Infinity) {
            m = isNaN(value) ? 1 : 0;
            e = eMax;
          } else {
            e = Math.floor(Math.log(value) / Math.LN2);

            if (value * (c = Math.pow(2, -e)) < 1) {
              e--;
              c *= 2;
            }

            if (e + eBias >= 1) {
              value += rt / c;
            } else {
              value += rt * Math.pow(2, 1 - eBias);
            }

            if (value * c >= 2) {
              e++;
              c /= 2;
            }

            if (e + eBias >= eMax) {
              m = 0;
              e = eMax;
            } else if (e + eBias >= 1) {
              m = (value * c - 1) * Math.pow(2, mLen);
              e = e + eBias;
            } else {
              m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
              e = 0;
            }
          }

          if (isNaN(value)) m = 0;

          while (mLen >= 8) {
            buffer$$1[offset + i] = m & 0xff;
            i += d;
            m /= 256;
            mLen -= 8;
          }

          e = e << mLen | m;
          if (isNaN(value)) e += 8;
          eLen += mLen;

          while (eLen > 0) {
            buffer$$1[offset + i] = e & 0xff;
            i += d;
            e /= 256;
            eLen -= 8;
          }

          buffer$$1[offset + i - d] |= s * 128;
        }

        var float_parser = {
          readIEEE754: readIEEE754,
          writeIEEE754: writeIEEE754
        };
        var Buffer$3 = buffer.Buffer;
        var writeIEEE754$1 = float_parser.writeIEEE754;
        var normalizedFunctionString$1 = utils.normalizedFunctionString;
        var regexp$1 = /\x00/; // eslint-disable-line no-control-regex

        var ignoreKeys = new Set(['$db', '$ref', '$id', '$clusterTime']); // To ensure that 0.4 of node works correctly

        var isDate = function isDate(d) {
          return _typeof(d) === 'object' && Object.prototype.toString.call(d) === '[object Date]';
        };

        var isRegExp = function isRegExp(d) {
          return Object.prototype.toString.call(d) === '[object RegExp]';
        };

        function serializeString(buffer$$1, key, value, index, isArray) {
          // Encode String type
          buffer$$1[index++] = constants.BSON_DATA_STRING; // Number of written bytes

          var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

          index = index + numberOfWrittenBytes + 1;
          buffer$$1[index - 1] = 0; // Write the string

          var size = buffer$$1.write(value, index + 4, 'utf8'); // Write the size of the string to buffer

          buffer$$1[index + 3] = size + 1 >> 24 & 0xff;
          buffer$$1[index + 2] = size + 1 >> 16 & 0xff;
          buffer$$1[index + 1] = size + 1 >> 8 & 0xff;
          buffer$$1[index] = size + 1 & 0xff; // Update index

          index = index + 4 + size; // Write zero

          buffer$$1[index++] = 0;
          return index;
        }

        function serializeNumber(buffer$$1, key, value, index, isArray) {
          // We have an integer value
          if (Math.floor(value) === value && value >= constants.JS_INT_MIN && value <= constants.JS_INT_MAX) {
            // If the value fits in 32 bits encode as int, if it fits in a double
            // encode it as a double, otherwise long
            if (value >= constants.BSON_INT32_MIN && value <= constants.BSON_INT32_MAX) {
              // Set int type 32 bits or less
              buffer$$1[index++] = constants.BSON_DATA_INT; // Number of written bytes

              var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

              index = index + numberOfWrittenBytes;
              buffer$$1[index++] = 0; // Write the int value

              buffer$$1[index++] = value & 0xff;
              buffer$$1[index++] = value >> 8 & 0xff;
              buffer$$1[index++] = value >> 16 & 0xff;
              buffer$$1[index++] = value >> 24 & 0xff;
            } else if (value >= constants.JS_INT_MIN && value <= constants.JS_INT_MAX) {
              // Encode as double
              buffer$$1[index++] = constants.BSON_DATA_NUMBER; // Number of written bytes

              var _numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name


              index = index + _numberOfWrittenBytes;
              buffer$$1[index++] = 0; // Write float

              writeIEEE754$1(buffer$$1, value, index, 'little', 52, 8); // Ajust index

              index = index + 8;
            } else {
              // Set long type
              buffer$$1[index++] = constants.BSON_DATA_LONG; // Number of written bytes

              var _numberOfWrittenBytes2 = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name


              index = index + _numberOfWrittenBytes2;
              buffer$$1[index++] = 0;
              var longVal = long_1.fromNumber(value);
              var lowBits = longVal.getLowBits();
              var highBits = longVal.getHighBits(); // Encode low bits

              buffer$$1[index++] = lowBits & 0xff;
              buffer$$1[index++] = lowBits >> 8 & 0xff;
              buffer$$1[index++] = lowBits >> 16 & 0xff;
              buffer$$1[index++] = lowBits >> 24 & 0xff; // Encode high bits

              buffer$$1[index++] = highBits & 0xff;
              buffer$$1[index++] = highBits >> 8 & 0xff;
              buffer$$1[index++] = highBits >> 16 & 0xff;
              buffer$$1[index++] = highBits >> 24 & 0xff;
            }
          } else {
            // Encode as double
            buffer$$1[index++] = constants.BSON_DATA_NUMBER; // Number of written bytes

            var _numberOfWrittenBytes3 = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name


            index = index + _numberOfWrittenBytes3;
            buffer$$1[index++] = 0; // Write float

            writeIEEE754$1(buffer$$1, value, index, 'little', 52, 8); // Ajust index

            index = index + 8;
          }

          return index;
        }

        function serializeNull(buffer$$1, key, value, index, isArray) {
          // Set long type
          buffer$$1[index++] = constants.BSON_DATA_NULL; // Number of written bytes

          var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

          index = index + numberOfWrittenBytes;
          buffer$$1[index++] = 0;
          return index;
        }

        function serializeBoolean(buffer$$1, key, value, index, isArray) {
          // Write the type
          buffer$$1[index++] = constants.BSON_DATA_BOOLEAN; // Number of written bytes

          var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

          index = index + numberOfWrittenBytes;
          buffer$$1[index++] = 0; // Encode the boolean value

          buffer$$1[index++] = value ? 1 : 0;
          return index;
        }

        function serializeDate(buffer$$1, key, value, index, isArray) {
          // Write the type
          buffer$$1[index++] = constants.BSON_DATA_DATE; // Number of written bytes

          var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

          index = index + numberOfWrittenBytes;
          buffer$$1[index++] = 0; // Write the date

          var dateInMilis = long_1.fromNumber(value.getTime());
          var lowBits = dateInMilis.getLowBits();
          var highBits = dateInMilis.getHighBits(); // Encode low bits

          buffer$$1[index++] = lowBits & 0xff;
          buffer$$1[index++] = lowBits >> 8 & 0xff;
          buffer$$1[index++] = lowBits >> 16 & 0xff;
          buffer$$1[index++] = lowBits >> 24 & 0xff; // Encode high bits

          buffer$$1[index++] = highBits & 0xff;
          buffer$$1[index++] = highBits >> 8 & 0xff;
          buffer$$1[index++] = highBits >> 16 & 0xff;
          buffer$$1[index++] = highBits >> 24 & 0xff;
          return index;
        }

        function serializeRegExp(buffer$$1, key, value, index, isArray) {
          // Write the type
          buffer$$1[index++] = constants.BSON_DATA_REGEXP; // Number of written bytes

          var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

          index = index + numberOfWrittenBytes;
          buffer$$1[index++] = 0;

          if (value.source && value.source.match(regexp$1) != null) {
            throw Error('value ' + value.source + ' must not contain null bytes');
          } // Adjust the index


          index = index + buffer$$1.write(value.source, index, 'utf8'); // Write zero

          buffer$$1[index++] = 0x00; // Write the parameters

          if (value.ignoreCase) buffer$$1[index++] = 0x69; // i

          if (value.global) buffer$$1[index++] = 0x73; // s

          if (value.multiline) buffer$$1[index++] = 0x6d; // m
          // Add ending zero

          buffer$$1[index++] = 0x00;
          return index;
        }

        function serializeBSONRegExp(buffer$$1, key, value, index, isArray) {
          // Write the type
          buffer$$1[index++] = constants.BSON_DATA_REGEXP; // Number of written bytes

          var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

          index = index + numberOfWrittenBytes;
          buffer$$1[index++] = 0; // Check the pattern for 0 bytes

          if (value.pattern.match(regexp$1) != null) {
            // The BSON spec doesn't allow keys with null bytes because keys are
            // null-terminated.
            throw Error('pattern ' + value.pattern + ' must not contain null bytes');
          } // Adjust the index


          index = index + buffer$$1.write(value.pattern, index, 'utf8'); // Write zero

          buffer$$1[index++] = 0x00; // Write the options

          index = index + buffer$$1.write(value.options.split('').sort().join(''), index, 'utf8'); // Add ending zero

          buffer$$1[index++] = 0x00;
          return index;
        }

        function serializeMinMax(buffer$$1, key, value, index, isArray) {
          console.log({
            value: value,
            MinKey: min_key,
            isMinKey: value instanceof min_key
          }); // Write the type of either min or max key

          if (value === null) {
            buffer$$1[index++] = constants.BSON_DATA_NULL;
          } else if (value instanceof min_key) {
            buffer$$1[index++] = constants.BSON_DATA_MIN_KEY;
          } else {
            buffer$$1[index++] = constants.BSON_DATA_MAX_KEY;
          } // Number of written bytes


          var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

          index = index + numberOfWrittenBytes;
          buffer$$1[index++] = 0;
          return index;
        }

        function serializeObjectId(buffer$$1, key, value, index, isArray) {
          // Write the type
          buffer$$1[index++] = constants.BSON_DATA_OID; // Number of written bytes

          var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

          index = index + numberOfWrittenBytes;
          buffer$$1[index++] = 0; // Write the objectId into the shared buffer

          if (typeof value.id === 'string') {
            buffer$$1.write(value.id, index, 'binary');
          } else if (value.id && value.id.copy) {
            value.id.copy(buffer$$1, index, 0, 12);
          } else {
            throw new TypeError('object [' + JSON.stringify(value) + '] is not a valid ObjectId');
          } // Ajust index


          return index + 12;
        }

        function serializeBuffer(buffer$$1, key, value, index, isArray) {
          // Write the type
          buffer$$1[index++] = constants.BSON_DATA_BINARY; // Number of written bytes

          var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

          index = index + numberOfWrittenBytes;
          buffer$$1[index++] = 0; // Get size of the buffer (current write point)

          var size = value.length; // Write the size of the string to buffer

          buffer$$1[index++] = size & 0xff;
          buffer$$1[index++] = size >> 8 & 0xff;
          buffer$$1[index++] = size >> 16 & 0xff;
          buffer$$1[index++] = size >> 24 & 0xff; // Write the default subtype

          buffer$$1[index++] = constants.BSON_BINARY_SUBTYPE_DEFAULT; // Copy the content form the binary field to the buffer

          value.copy(buffer$$1, index, 0, size); // Adjust the index

          index = index + size;
          return index;
        }

        function serializeObject(buffer$$1, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined, isArray, path) {
          for (var i = 0; i < path.length; i++) {
            if (path[i] === value) throw new Error('cyclic dependency detected');
          } // Push value to stack


          path.push(value); // Write the type

          buffer$$1[index++] = Array.isArray(value) ? constants.BSON_DATA_ARRAY : constants.BSON_DATA_OBJECT; // Number of written bytes

          var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

          index = index + numberOfWrittenBytes;
          buffer$$1[index++] = 0;
          var endIndex = serializeInto(buffer$$1, value, checkKeys, index, depth + 1, serializeFunctions, ignoreUndefined, path); // Pop stack

          path.pop();
          return endIndex;
        }

        function serializeDecimal128(buffer$$1, key, value, index, isArray) {
          buffer$$1[index++] = constants.BSON_DATA_DECIMAL128; // Number of written bytes

          var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

          index = index + numberOfWrittenBytes;
          buffer$$1[index++] = 0; // Write the data from the value

          value.bytes.copy(buffer$$1, index, 0, 16);
          return index + 16;
        }

        function serializeLong(buffer$$1, key, value, index, isArray) {
          // Write the type
          buffer$$1[index++] = value._bsontype === 'Long' ? constants.BSON_DATA_LONG : constants.BSON_DATA_TIMESTAMP; // Number of written bytes

          var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

          index = index + numberOfWrittenBytes;
          buffer$$1[index++] = 0; // Write the date

          var lowBits = value.getLowBits();
          var highBits = value.getHighBits(); // Encode low bits

          buffer$$1[index++] = lowBits & 0xff;
          buffer$$1[index++] = lowBits >> 8 & 0xff;
          buffer$$1[index++] = lowBits >> 16 & 0xff;
          buffer$$1[index++] = lowBits >> 24 & 0xff; // Encode high bits

          buffer$$1[index++] = highBits & 0xff;
          buffer$$1[index++] = highBits >> 8 & 0xff;
          buffer$$1[index++] = highBits >> 16 & 0xff;
          buffer$$1[index++] = highBits >> 24 & 0xff;
          return index;
        }

        function serializeInt32(buffer$$1, key, value, index, isArray) {
          // Set int type 32 bits or less
          buffer$$1[index++] = constants.BSON_DATA_INT; // Number of written bytes

          var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

          index = index + numberOfWrittenBytes;
          buffer$$1[index++] = 0; // Write the int value

          buffer$$1[index++] = value & 0xff;
          buffer$$1[index++] = value >> 8 & 0xff;
          buffer$$1[index++] = value >> 16 & 0xff;
          buffer$$1[index++] = value >> 24 & 0xff;
          return index;
        }

        function serializeDouble(buffer$$1, key, value, index, isArray) {
          // Encode as double
          buffer$$1[index++] = constants.BSON_DATA_NUMBER; // Number of written bytes

          var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

          index = index + numberOfWrittenBytes;
          buffer$$1[index++] = 0; // Write float

          writeIEEE754$1(buffer$$1, value.value, index, 'little', 52, 8); // Adjust index

          index = index + 8;
          return index;
        }

        function serializeFunction(buffer$$1, key, value, index, checkKeys, depth, isArray) {
          buffer$$1[index++] = constants.BSON_DATA_CODE; // Number of written bytes

          var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

          index = index + numberOfWrittenBytes;
          buffer$$1[index++] = 0; // Function string

          var functionString = normalizedFunctionString$1(value); // Write the string

          var size = buffer$$1.write(functionString, index + 4, 'utf8') + 1; // Write the size of the string to buffer

          buffer$$1[index] = size & 0xff;
          buffer$$1[index + 1] = size >> 8 & 0xff;
          buffer$$1[index + 2] = size >> 16 & 0xff;
          buffer$$1[index + 3] = size >> 24 & 0xff; // Update index

          index = index + 4 + size - 1; // Write zero

          buffer$$1[index++] = 0;
          return index;
        }

        function serializeCode(buffer$$1, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined, isArray) {
          if (value.scope && _typeof(value.scope) === 'object') {
            // Write the type
            buffer$$1[index++] = constants.BSON_DATA_CODE_W_SCOPE; // Number of written bytes

            var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

            index = index + numberOfWrittenBytes;
            buffer$$1[index++] = 0; // Starting index

            var startIndex = index; // Serialize the function
            // Get the function string

            var functionString = typeof value.code === 'string' ? value.code : value.code.toString(); // Index adjustment

            index = index + 4; // Write string into buffer

            var codeSize = buffer$$1.write(functionString, index + 4, 'utf8') + 1; // Write the size of the string to buffer

            buffer$$1[index] = codeSize & 0xff;
            buffer$$1[index + 1] = codeSize >> 8 & 0xff;
            buffer$$1[index + 2] = codeSize >> 16 & 0xff;
            buffer$$1[index + 3] = codeSize >> 24 & 0xff; // Write end 0

            buffer$$1[index + 4 + codeSize - 1] = 0; // Write the

            index = index + codeSize + 4; //
            // Serialize the scope value

            var endIndex = serializeInto(buffer$$1, value.scope, checkKeys, index, depth + 1, serializeFunctions, ignoreUndefined);
            index = endIndex - 1; // Writ the total

            var totalSize = endIndex - startIndex; // Write the total size of the object

            buffer$$1[startIndex++] = totalSize & 0xff;
            buffer$$1[startIndex++] = totalSize >> 8 & 0xff;
            buffer$$1[startIndex++] = totalSize >> 16 & 0xff;
            buffer$$1[startIndex++] = totalSize >> 24 & 0xff; // Write trailing zero

            buffer$$1[index++] = 0;
          } else {
            buffer$$1[index++] = constants.BSON_DATA_CODE; // Number of written bytes

            var _numberOfWrittenBytes4 = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name


            index = index + _numberOfWrittenBytes4;
            buffer$$1[index++] = 0; // Function string

            var _functionString = value.code.toString(); // Write the string


            var size = buffer$$1.write(_functionString, index + 4, 'utf8') + 1; // Write the size of the string to buffer

            buffer$$1[index] = size & 0xff;
            buffer$$1[index + 1] = size >> 8 & 0xff;
            buffer$$1[index + 2] = size >> 16 & 0xff;
            buffer$$1[index + 3] = size >> 24 & 0xff; // Update index

            index = index + 4 + size - 1; // Write zero

            buffer$$1[index++] = 0;
          }

          return index;
        }

        function serializeBinary(buffer$$1, key, value, index, isArray) {
          // Write the type
          buffer$$1[index++] = constants.BSON_DATA_BINARY; // Number of written bytes

          var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

          index = index + numberOfWrittenBytes;
          buffer$$1[index++] = 0; // Extract the buffer

          var data = value.value(true); // Calculate size

          var size = value.position; // Add the deprecated 02 type 4 bytes of size to total

          if (value.sub_type === binary.SUBTYPE_BYTE_ARRAY) size = size + 4; // Write the size of the string to buffer

          buffer$$1[index++] = size & 0xff;
          buffer$$1[index++] = size >> 8 & 0xff;
          buffer$$1[index++] = size >> 16 & 0xff;
          buffer$$1[index++] = size >> 24 & 0xff; // Write the subtype to the buffer

          buffer$$1[index++] = value.sub_type; // If we have binary type 2 the 4 first bytes are the size

          if (value.sub_type === binary.SUBTYPE_BYTE_ARRAY) {
            size = size - 4;
            buffer$$1[index++] = size & 0xff;
            buffer$$1[index++] = size >> 8 & 0xff;
            buffer$$1[index++] = size >> 16 & 0xff;
            buffer$$1[index++] = size >> 24 & 0xff;
          } // Write the data to the object


          data.copy(buffer$$1, index, 0, value.position); // Adjust the index

          index = index + value.position;
          return index;
        }

        function serializeSymbol(buffer$$1, key, value, index, isArray) {
          // Write the type
          buffer$$1[index++] = constants.BSON_DATA_SYMBOL; // Number of written bytes

          var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

          index = index + numberOfWrittenBytes;
          buffer$$1[index++] = 0; // Write the string

          var size = buffer$$1.write(value.value, index + 4, 'utf8') + 1; // Write the size of the string to buffer

          buffer$$1[index] = size & 0xff;
          buffer$$1[index + 1] = size >> 8 & 0xff;
          buffer$$1[index + 2] = size >> 16 & 0xff;
          buffer$$1[index + 3] = size >> 24 & 0xff; // Update index

          index = index + 4 + size - 1; // Write zero

          buffer$$1[index++] = 0x00;
          return index;
        }

        function serializeDBRef(buffer$$1, key, value, index, depth, serializeFunctions, isArray) {
          // Write the type
          buffer$$1[index++] = constants.BSON_DATA_OBJECT; // Number of written bytes

          var numberOfWrittenBytes = !isArray ? buffer$$1.write(key, index, 'utf8') : buffer$$1.write(key, index, 'ascii'); // Encode the name

          index = index + numberOfWrittenBytes;
          buffer$$1[index++] = 0;
          var startIndex = index;
          var endIndex;
          var output = {
            $ref: value.collection,
            $id: value.oid
          };
          if (value.db != null) output.$db = value.db;
          output = Object.assign(output, value.fields);
          endIndex = serializeInto(buffer$$1, output, false, index, depth + 1, serializeFunctions); // Calculate object size

          var size = endIndex - startIndex; // Write the size

          buffer$$1[startIndex++] = size & 0xff;
          buffer$$1[startIndex++] = size >> 8 & 0xff;
          buffer$$1[startIndex++] = size >> 16 & 0xff;
          buffer$$1[startIndex++] = size >> 24 & 0xff; // Set index

          return endIndex;
        }

        function serializeInto(buffer$$1, object, checkKeys, startingIndex, depth, serializeFunctions, ignoreUndefined, path) {
          startingIndex = startingIndex || 0;
          path = path || []; // Push the object to the path

          path.push(object); // Start place to serialize into

          var index = startingIndex + 4; // Special case isArray

          if (Array.isArray(object)) {
            // Get object keys
            for (var i = 0; i < object.length; i++) {
              var key = '' + i;
              var value = object[i]; // Is there an override value

              if (value && value.toBSON) {
                if (typeof value.toBSON !== 'function') throw new TypeError('toBSON is not a function');
                value = value.toBSON();
              }

              var type = _typeof(value);

              if (type === 'string') {
                index = serializeString(buffer$$1, key, value, index, true);
              } else if (type === 'number') {
                index = serializeNumber(buffer$$1, key, value, index, true);
              } else if (type === 'boolean') {
                index = serializeBoolean(buffer$$1, key, value, index, true);
              } else if (value instanceof Date || isDate(value)) {
                index = serializeDate(buffer$$1, key, value, index, true);
              } else if (value === undefined) {
                index = serializeNull(buffer$$1, key, value, index, true);
              } else if (value === null) {
                index = serializeNull(buffer$$1, key, value, index, true);
              } else if (value['_bsontype'] === 'ObjectId') {
                index = serializeObjectId(buffer$$1, key, value, index, true);
              } else if (Buffer$3.isBuffer(value)) {
                index = serializeBuffer(buffer$$1, key, value, index, true);
              } else if (value instanceof RegExp || isRegExp(value)) {
                index = serializeRegExp(buffer$$1, key, value, index, true);
              } else if (type === 'object' && value['_bsontype'] == null) {
                index = serializeObject(buffer$$1, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined, true, path);
              } else if (type === 'object' && value['_bsontype'] === 'Decimal128') {
                index = serializeDecimal128(buffer$$1, key, value, index, true);
              } else if (value['_bsontype'] === 'Long' || value['_bsontype'] === 'Timestamp') {
                index = serializeLong(buffer$$1, key, value, index, true);
              } else if (value['_bsontype'] === 'Double') {
                index = serializeDouble(buffer$$1, key, value, index, true);
              } else if (typeof value === 'function' && serializeFunctions) {
                index = serializeFunction(buffer$$1, key, value, index, checkKeys, depth, serializeFunctions, true);
              } else if (value['_bsontype'] === 'Code') {
                index = serializeCode(buffer$$1, key, value, index, checkKeys, depth, serializeFunctions, ignoreUndefined, true);
              } else if (value['_bsontype'] === 'Binary') {
                index = serializeBinary(buffer$$1, key, value, index, true);
              } else if (value['_bsontype'] === 'Symbol') {
                index = serializeSymbol(buffer$$1, key, value, index, true);
              } else if (value['_bsontype'] === 'DBRef') {
                index = serializeDBRef(buffer$$1, key, value, index, depth, serializeFunctions, true);
              } else if (value['_bsontype'] === 'BSONRegExp') {
                index = serializeBSONRegExp(buffer$$1, key, value, index, true);
              } else if (value['_bsontype'] === 'Int32') {
                index = serializeInt32(buffer$$1, key, value, index, true);
              } else if (value['_bsontype'] === 'MinKey' || value['_bsontype'] === 'MaxKey') {
                index = serializeMinMax(buffer$$1, key, value, index, true);
              }
            }
          } else if (object instanceof map) {
            var iterator = object.entries();
            var done = false;

            while (!done) {
              // Unpack the next entry
              var entry = iterator.next();
              done = entry.done; // Are we done, then skip and terminate

              if (done) continue; // Get the entry values

              var _key = entry.value[0];
              var _value = entry.value[1]; // Check the type of the value

              var _type = _typeof(_value); // Check the key and throw error if it's illegal


              if (typeof _key === 'string' && !ignoreKeys.has(_key)) {
                if (_key.match(regexp$1) != null) {
                  // The BSON spec doesn't allow keys with null bytes because keys are
                  // null-terminated.
                  throw Error('key ' + _key + ' must not contain null bytes');
                }

                if (checkKeys) {
                  if ('$' === _key[0]) {
                    throw Error('key ' + _key + " must not start with '$'");
                  } else if (~_key.indexOf('.')) {
                    throw Error('key ' + _key + " must not contain '.'");
                  }
                }
              }

              if (_type === 'string') {
                index = serializeString(buffer$$1, _key, _value, index);
              } else if (_type === 'number') {
                index = serializeNumber(buffer$$1, _key, _value, index);
              } else if (_type === 'boolean') {
                index = serializeBoolean(buffer$$1, _key, _value, index);
              } else if (_value instanceof Date || isDate(_value)) {
                index = serializeDate(buffer$$1, _key, _value, index);
              } else if (_value === null || _value === undefined && ignoreUndefined === false) {
                index = serializeNull(buffer$$1, _key, _value, index);
              } else if (_value['_bsontype'] === 'ObjectId') {
                index = serializeObjectId(buffer$$1, _key, _value, index);
              } else if (Buffer$3.isBuffer(_value)) {
                index = serializeBuffer(buffer$$1, _key, _value, index);
              } else if (_value instanceof RegExp || isRegExp(_value)) {
                index = serializeRegExp(buffer$$1, _key, _value, index);
              } else if (_type === 'object' && _value['_bsontype'] == null) {
                index = serializeObject(buffer$$1, _key, _value, index, checkKeys, depth, serializeFunctions, ignoreUndefined, false, path);
              } else if (_type === 'object' && _value['_bsontype'] === 'Decimal128') {
                index = serializeDecimal128(buffer$$1, _key, _value, index);
              } else if (_value['_bsontype'] === 'Long' || _value['_bsontype'] === 'Timestamp') {
                index = serializeLong(buffer$$1, _key, _value, index);
              } else if (_value['_bsontype'] === 'Double') {
                index = serializeDouble(buffer$$1, _key, _value, index);
              } else if (_value['_bsontype'] === 'Code') {
                index = serializeCode(buffer$$1, _key, _value, index, checkKeys, depth, serializeFunctions, ignoreUndefined);
              } else if (typeof _value === 'function' && serializeFunctions) {
                index = serializeFunction(buffer$$1, _key, _value, index, checkKeys, depth, serializeFunctions);
              } else if (_value['_bsontype'] === 'Binary') {
                index = serializeBinary(buffer$$1, _key, _value, index);
              } else if (_value['_bsontype'] === 'Symbol') {
                index = serializeSymbol(buffer$$1, _key, _value, index);
              } else if (_value['_bsontype'] === 'DBRef') {
                index = serializeDBRef(buffer$$1, _key, _value, index, depth, serializeFunctions);
              } else if (_value['_bsontype'] === 'BSONRegExp') {
                index = serializeBSONRegExp(buffer$$1, _key, _value, index);
              } else if (_value['_bsontype'] === 'Int32') {
                index = serializeInt32(buffer$$1, _key, _value, index);
              } else if (_value['_bsontype'] === 'MinKey' || _value['_bsontype'] === 'MaxKey') {
                index = serializeMinMax(buffer$$1, _key, _value, index);
              }
            }
          } else {
            // Did we provide a custom serialization method
            if (object.toBSON) {
              if (typeof object.toBSON !== 'function') throw new TypeError('toBSON is not a function');
              object = object.toBSON();
              if (object != null && _typeof(object) !== 'object') throw new TypeError('toBSON function did not return an object');
            } // Iterate over all the keys


            for (var _key2 in object) {
              var _value2 = object[_key2]; // Is there an override value

              if (_value2 && _value2.toBSON) {
                if (typeof _value2.toBSON !== 'function') throw new TypeError('toBSON is not a function');
                _value2 = _value2.toBSON();
              } // Check the type of the value


              var _type2 = _typeof(_value2); // Check the key and throw error if it's illegal


              if (typeof _key2 === 'string' && !ignoreKeys.has(_key2)) {
                if (_key2.match(regexp$1) != null) {
                  // The BSON spec doesn't allow keys with null bytes because keys are
                  // null-terminated.
                  throw Error('key ' + _key2 + ' must not contain null bytes');
                }

                if (checkKeys) {
                  if ('$' === _key2[0]) {
                    throw Error('key ' + _key2 + " must not start with '$'");
                  } else if (~_key2.indexOf('.')) {
                    throw Error('key ' + _key2 + " must not contain '.'");
                  }
                }
              }

              if (_type2 === 'string') {
                index = serializeString(buffer$$1, _key2, _value2, index);
              } else if (_type2 === 'number') {
                index = serializeNumber(buffer$$1, _key2, _value2, index);
              } else if (_type2 === 'boolean') {
                index = serializeBoolean(buffer$$1, _key2, _value2, index);
              } else if (_value2 instanceof Date || isDate(_value2)) {
                index = serializeDate(buffer$$1, _key2, _value2, index);
              } else if (_value2 === undefined) {
                if (ignoreUndefined === false) index = serializeNull(buffer$$1, _key2, _value2, index);
              } else if (_value2 === null) {
                index = serializeNull(buffer$$1, _key2, _value2, index);
              } else if (_value2['_bsontype'] === 'ObjectId') {
                index = serializeObjectId(buffer$$1, _key2, _value2, index);
              } else if (Buffer$3.isBuffer(_value2)) {
                index = serializeBuffer(buffer$$1, _key2, _value2, index);
              } else if (_value2 instanceof RegExp || isRegExp(_value2)) {
                index = serializeRegExp(buffer$$1, _key2, _value2, index);
              } else if (_type2 === 'object' && _value2['_bsontype'] == null) {
                index = serializeObject(buffer$$1, _key2, _value2, index, checkKeys, depth, serializeFunctions, ignoreUndefined, false, path);
              } else if (_type2 === 'object' && _value2['_bsontype'] === 'Decimal128') {
                index = serializeDecimal128(buffer$$1, _key2, _value2, index);
              } else if (_value2['_bsontype'] === 'Long' || _value2['_bsontype'] === 'Timestamp') {
                index = serializeLong(buffer$$1, _key2, _value2, index);
              } else if (_value2['_bsontype'] === 'Double') {
                index = serializeDouble(buffer$$1, _key2, _value2, index);
              } else if (_value2['_bsontype'] === 'Code') {
                index = serializeCode(buffer$$1, _key2, _value2, index, checkKeys, depth, serializeFunctions, ignoreUndefined);
              } else if (typeof _value2 === 'function' && serializeFunctions) {
                index = serializeFunction(buffer$$1, _key2, _value2, index, checkKeys, depth, serializeFunctions);
              } else if (_value2['_bsontype'] === 'Binary') {
                index = serializeBinary(buffer$$1, _key2, _value2, index);
              } else if (_value2['_bsontype'] === 'Symbol') {
                index = serializeSymbol(buffer$$1, _key2, _value2, index);
              } else if (_value2['_bsontype'] === 'DBRef') {
                index = serializeDBRef(buffer$$1, _key2, _value2, index, depth, serializeFunctions);
              } else if (_value2['_bsontype'] === 'BSONRegExp') {
                index = serializeBSONRegExp(buffer$$1, _key2, _value2, index);
              } else if (_value2['_bsontype'] === 'Int32') {
                index = serializeInt32(buffer$$1, _key2, _value2, index);
              } else if (_value2['_bsontype'] === 'MinKey' || _value2['_bsontype'] === 'MaxKey') {
                index = serializeMinMax(buffer$$1, _key2, _value2, index);
              }
            }
          } // Remove the path


          path.pop(); // Final padding byte for object

          buffer$$1[index++] = 0x00; // Final size

          var size = index - startingIndex; // Write the size of the object

          buffer$$1[startingIndex++] = size & 0xff;
          buffer$$1[startingIndex++] = size >> 8 & 0xff;
          buffer$$1[startingIndex++] = size >> 16 & 0xff;
          buffer$$1[startingIndex++] = size >> 24 & 0xff;
          return index;
        }

        var serializer = serializeInto;
        var Buffer$4 = buffer.Buffer;
        var normalizedFunctionString$2 = utils.normalizedFunctionString; // To ensure that 0.4 of node works correctly

        function isDate$1(d) {
          return _typeof(d) === 'object' && Object.prototype.toString.call(d) === '[object Date]';
        }

        function calculateObjectSize(object, serializeFunctions, ignoreUndefined) {
          var totalLength = 4 + 1;

          if (Array.isArray(object)) {
            for (var i = 0; i < object.length; i++) {
              totalLength += calculateElement(i.toString(), object[i], serializeFunctions, true, ignoreUndefined);
            }
          } else {
            // If we have toBSON defined, override the current object
            if (object.toBSON) {
              object = object.toBSON();
            } // Calculate size


            for (var key in object) {
              totalLength += calculateElement(key, object[key], serializeFunctions, false, ignoreUndefined);
            }
          }

          return totalLength;
        }
        /**
         * @ignore
         * @api private
         */


        function calculateElement(name, value, serializeFunctions, isArray, ignoreUndefined) {
          // If we have toBSON defined, override the current object
          if (value && value.toBSON) {
            value = value.toBSON();
          }

          switch (_typeof(value)) {
            case 'string':
              return 1 + Buffer$4.byteLength(name, 'utf8') + 1 + 4 + Buffer$4.byteLength(value, 'utf8') + 1;

            case 'number':
              if (Math.floor(value) === value && value >= constants.JS_INT_MIN && value <= constants.JS_INT_MAX) {
                if (value >= constants.BSON_INT32_MIN && value <= constants.BSON_INT32_MAX) {
                  // 32 bit
                  return (name != null ? Buffer$4.byteLength(name, 'utf8') + 1 : 0) + (4 + 1);
                } else {
                  return (name != null ? Buffer$4.byteLength(name, 'utf8') + 1 : 0) + (8 + 1);
                }
              } else {
                // 64 bit
                return (name != null ? Buffer$4.byteLength(name, 'utf8') + 1 : 0) + (8 + 1);
              }

            case 'undefined':
              if (isArray || !ignoreUndefined) return (name != null ? Buffer$4.byteLength(name, 'utf8') + 1 : 0) + 1;
              return 0;

            case 'boolean':
              return (name != null ? Buffer$4.byteLength(name, 'utf8') + 1 : 0) + (1 + 1);

            case 'object':
              if (value == null || value instanceof min_key || value instanceof max_key || value['_bsontype'] === 'MinKey' || value['_bsontype'] === 'MaxKey') {
                return (name != null ? Buffer$4.byteLength(name, 'utf8') + 1 : 0) + 1;
              } else if (value instanceof objectid || value['_bsontype'] === 'ObjectId') {
                return (name != null ? Buffer$4.byteLength(name, 'utf8') + 1 : 0) + (12 + 1);
              } else if (value instanceof Date || isDate$1(value)) {
                return (name != null ? Buffer$4.byteLength(name, 'utf8') + 1 : 0) + (8 + 1);
              } else if (typeof Buffer$4 !== 'undefined' && Buffer$4.isBuffer(value)) {
                return (name != null ? Buffer$4.byteLength(name, 'utf8') + 1 : 0) + (1 + 4 + 1) + value.length;
              } else if (value instanceof long_1 || value instanceof double_1 || value instanceof timestamp || value['_bsontype'] === 'Long' || value['_bsontype'] === 'Double' || value['_bsontype'] === 'Timestamp') {
                return (name != null ? Buffer$4.byteLength(name, 'utf8') + 1 : 0) + (8 + 1);
              } else if (value instanceof decimal128 || value['_bsontype'] === 'Decimal128') {
                return (name != null ? Buffer$4.byteLength(name, 'utf8') + 1 : 0) + (16 + 1);
              } else if (value instanceof code || value['_bsontype'] === 'Code') {
                // Calculate size depending on the availability of a scope
                if (value.scope != null && Object.keys(value.scope).length > 0) {
                  return (name != null ? Buffer$4.byteLength(name, 'utf8') + 1 : 0) + 1 + 4 + 4 + Buffer$4.byteLength(value.code.toString(), 'utf8') + 1 + calculateObjectSize(value.scope, serializeFunctions, ignoreUndefined);
                } else {
                  return (name != null ? Buffer$4.byteLength(name, 'utf8') + 1 : 0) + 1 + 4 + Buffer$4.byteLength(value.code.toString(), 'utf8') + 1;
                }
              } else if (value instanceof binary || value['_bsontype'] === 'Binary') {
                // Check what kind of subtype we have
                if (value.sub_type === binary.SUBTYPE_BYTE_ARRAY) {
                  return (name != null ? Buffer$4.byteLength(name, 'utf8') + 1 : 0) + (value.position + 1 + 4 + 1 + 4);
                } else {
                  return (name != null ? Buffer$4.byteLength(name, 'utf8') + 1 : 0) + (value.position + 1 + 4 + 1);
                }
              } else if (value instanceof symbol || value['_bsontype'] === 'Symbol') {
                return (name != null ? Buffer$4.byteLength(name, 'utf8') + 1 : 0) + Buffer$4.byteLength(value.value, 'utf8') + 4 + 1 + 1;
              } else if (value instanceof db_ref || value['_bsontype'] === 'DBRef') {
                // Set up correct object for serialization
                var ordered_values = Object.assign({
                  $ref: value.collection,
                  $id: value.oid
                }, value.fields); // Add db reference if it exists

                if (value.db != null) {
                  ordered_values['$db'] = value.db;
                }

                return (name != null ? Buffer$4.byteLength(name, 'utf8') + 1 : 0) + 1 + calculateObjectSize(ordered_values, serializeFunctions, ignoreUndefined);
              } else if (value instanceof RegExp || Object.prototype.toString.call(value) === '[object RegExp]') {
                return (name != null ? Buffer$4.byteLength(name, 'utf8') + 1 : 0) + 1 + Buffer$4.byteLength(value.source, 'utf8') + 1 + (value.global ? 1 : 0) + (value.ignoreCase ? 1 : 0) + (value.multiline ? 1 : 0) + 1;
              } else if (value instanceof regexp || value['_bsontype'] === 'BSONRegExp') {
                return (name != null ? Buffer$4.byteLength(name, 'utf8') + 1 : 0) + 1 + Buffer$4.byteLength(value.pattern, 'utf8') + 1 + Buffer$4.byteLength(value.options, 'utf8') + 1;
              } else {
                return (name != null ? Buffer$4.byteLength(name, 'utf8') + 1 : 0) + calculateObjectSize(value, serializeFunctions, ignoreUndefined) + 1;
              }

            case 'function':
              // WTF for 0.4.X where typeof /someregexp/ === 'function'
              if (value instanceof RegExp || Object.prototype.toString.call(value) === '[object RegExp]' || String.call(value) === '[object RegExp]') {
                return (name != null ? Buffer$4.byteLength(name, 'utf8') + 1 : 0) + 1 + Buffer$4.byteLength(value.source, 'utf8') + 1 + (value.global ? 1 : 0) + (value.ignoreCase ? 1 : 0) + (value.multiline ? 1 : 0) + 1;
              } else {
                if (serializeFunctions && value.scope != null && Object.keys(value.scope).length > 0) {
                  return (name != null ? Buffer$4.byteLength(name, 'utf8') + 1 : 0) + 1 + 4 + 4 + Buffer$4.byteLength(normalizedFunctionString$2(value), 'utf8') + 1 + calculateObjectSize(value.scope, serializeFunctions, ignoreUndefined);
                } else if (serializeFunctions) {
                  return (name != null ? Buffer$4.byteLength(name, 'utf8') + 1 : 0) + 1 + 4 + Buffer$4.byteLength(normalizedFunctionString$2(value), 'utf8') + 1;
                }
              }

          }

          return 0;
        }

        var calculate_size = calculateObjectSize;
        var Buffer$5 = buffer.Buffer;
        /**
         * Makes sure that, if a Uint8Array is passed in, it is wrapped in a Buffer.
         *
         * @param {Buffer|Uint8Array} potentialBuffer The potential buffer
         * @returns {Buffer} the input if potentialBuffer is a buffer, or a buffer that
         * wraps a passed in Uint8Array
         * @throws {TypeError} If anything other than a Buffer or Uint8Array is passed in
         */

        var ensure_buffer = function ensureBuffer(potentialBuffer) {
          if (potentialBuffer instanceof Buffer$5) {
            return potentialBuffer;
          }

          if (potentialBuffer instanceof Uint8Array) {
            return Buffer$5.from(potentialBuffer.buffer);
          }

          throw new TypeError('Must use either Buffer or Uint8Array');
        };

        var Buffer$6 = buffer.Buffer; // Parts of the parser

        /**
         * @ignore
         */
        // Default Max Size

        var MAXSIZE = 1024 * 1024 * 17; // Current Internal Temporary Serialization Buffer

        var buffer$1 = Buffer$6.alloc(MAXSIZE);
        /**
         * Sets the size of the internal serialization buffer.
         *
         * @method
         * @param {number} size The desired size for the internal serialization buffer
         */

        function setInternalBufferSize(size) {
          // Resize the internal serialization buffer if needed
          if (buffer$1.length < size) {
            buffer$1 = Buffer$6.alloc(size);
          }
        }
        /**
         * Serialize a Javascript object.
         *
         * @param {Object} object the Javascript object to serialize.
         * @param {Boolean} [options.checkKeys] the serializer will check if keys are valid.
         * @param {Boolean} [options.serializeFunctions=false] serialize the javascript functions **(default:false)**.
         * @param {Boolean} [options.ignoreUndefined=true] ignore undefined fields **(default:true)**.
         * @return {Buffer} returns the Buffer object containing the serialized object.
         */


        function serialize$1(object, options) {
          options = options || {}; // Unpack the options

          var checkKeys = typeof options.checkKeys === 'boolean' ? options.checkKeys : false;
          var serializeFunctions = typeof options.serializeFunctions === 'boolean' ? options.serializeFunctions : false;
          var ignoreUndefined = typeof options.ignoreUndefined === 'boolean' ? options.ignoreUndefined : true;
          var minInternalBufferSize = typeof options.minInternalBufferSize === 'number' ? options.minInternalBufferSize : MAXSIZE; // Resize the internal serialization buffer if needed

          if (buffer$1.length < minInternalBufferSize) {
            buffer$1 = Buffer$6.alloc(minInternalBufferSize);
          } // Attempt to serialize


          var serializationIndex = serializer(buffer$1, object, checkKeys, 0, 0, serializeFunctions, ignoreUndefined, []); // Create the final buffer

          var finishedBuffer = Buffer$6.alloc(serializationIndex); // Copy into the finished buffer

          buffer$1.copy(finishedBuffer, 0, 0, finishedBuffer.length); // Return the buffer

          return finishedBuffer;
        }
        /**
         * Serialize a Javascript object using a predefined Buffer and index into the buffer, useful when pre-allocating the space for serialization.
         *
         * @param {Object} object the Javascript object to serialize.
         * @param {Buffer} buffer the Buffer you pre-allocated to store the serialized BSON object.
         * @param {Boolean} [options.checkKeys] the serializer will check if keys are valid.
         * @param {Boolean} [options.serializeFunctions=false] serialize the javascript functions **(default:false)**.
         * @param {Boolean} [options.ignoreUndefined=true] ignore undefined fields **(default:true)**.
         * @param {Number} [options.index] the index in the buffer where we wish to start serializing into.
         * @return {Number} returns the index pointing to the last written byte in the buffer.
         */


        function serializeWithBufferAndIndex(object, finalBuffer, options) {
          options = options || {}; // Unpack the options

          var checkKeys = typeof options.checkKeys === 'boolean' ? options.checkKeys : false;
          var serializeFunctions = typeof options.serializeFunctions === 'boolean' ? options.serializeFunctions : false;
          var ignoreUndefined = typeof options.ignoreUndefined === 'boolean' ? options.ignoreUndefined : true;
          var startIndex = typeof options.index === 'number' ? options.index : 0; // Attempt to serialize

          var serializationIndex = serializer(buffer$1, object, checkKeys, 0, 0, serializeFunctions, ignoreUndefined);
          buffer$1.copy(finalBuffer, startIndex, 0, serializationIndex); // Return the index

          return startIndex + serializationIndex - 1;
        }
        /**
         * Deserialize data as BSON.
         *
         * @param {Buffer} buffer the buffer containing the serialized set of BSON documents.
         * @param {Object} [options.evalFunctions=false] evaluate functions in the BSON document scoped to the object deserialized.
         * @param {Object} [options.cacheFunctions=false] cache evaluated functions for reuse.
         * @param {Object} [options.cacheFunctionsCrc32=false] use a crc32 code for caching, otherwise use the string of the function.
         * @param {Object} [options.promoteLongs=true] when deserializing a Long will fit it into a Number if it's smaller than 53 bits
         * @param {Object} [options.promoteBuffers=false] when deserializing a Binary will return it as a node.js Buffer instance.
         * @param {Object} [options.promoteValues=false] when deserializing will promote BSON values to their Node.js closest equivalent types.
         * @param {Object} [options.fieldsAsRaw=null] allow to specify if there what fields we wish to return as unserialized raw buffer.
         * @param {Object} [options.bsonRegExp=false] return BSON regular expressions as BSONRegExp instances.
         * @param {boolean} [options.allowObjectSmallerThanBufferSize=false] allows the buffer to be larger than the parsed BSON object
         * @return {Object} returns the deserialized Javascript Object.
         */


        function deserialize$2(buffer$$1, options) {
          buffer$$1 = ensure_buffer(buffer$$1);
          return deserializer(buffer$$1, options);
        }
        /**
         * Calculate the bson size for a passed in Javascript object.
         *
         * @param {Object} object the Javascript object to calculate the BSON byte size for.
         * @param {Boolean} [options.serializeFunctions=false] serialize the javascript functions **(default:false)**.
         * @param {Boolean} [options.ignoreUndefined=true] ignore undefined fields **(default:true)**.
         * @return {Number} returns the number of bytes the BSON object will take up.
         */


        function calculateObjectSize$1(object, options) {
          options = options || {};
          var serializeFunctions = typeof options.serializeFunctions === 'boolean' ? options.serializeFunctions : false;
          var ignoreUndefined = typeof options.ignoreUndefined === 'boolean' ? options.ignoreUndefined : true;
          return calculate_size(object, serializeFunctions, ignoreUndefined);
        }
        /**
         * Deserialize stream data as BSON documents.
         *
         * @param {Buffer} data the buffer containing the serialized set of BSON documents.
         * @param {Number} startIndex the start index in the data Buffer where the deserialization is to start.
         * @param {Number} numberOfDocuments number of documents to deserialize.
         * @param {Array} documents an array where to store the deserialized documents.
         * @param {Number} docStartIndex the index in the documents array from where to start inserting documents.
         * @param {Object} [options] additional options used for the deserialization.
         * @param {Object} [options.evalFunctions=false] evaluate functions in the BSON document scoped to the object deserialized.
         * @param {Object} [options.cacheFunctions=false] cache evaluated functions for reuse.
         * @param {Object} [options.cacheFunctionsCrc32=false] use a crc32 code for caching, otherwise use the string of the function.
         * @param {Object} [options.promoteLongs=true] when deserializing a Long will fit it into a Number if it's smaller than 53 bits
         * @param {Object} [options.promoteBuffers=false] when deserializing a Binary will return it as a node.js Buffer instance.
         * @param {Object} [options.promoteValues=false] when deserializing will promote BSON values to their Node.js closest equivalent types.
         * @param {Object} [options.fieldsAsRaw=null] allow to specify if there what fields we wish to return as unserialized raw buffer.
         * @param {Object} [options.bsonRegExp=false] return BSON regular expressions as BSONRegExp instances.
         * @return {Number} returns the next index in the buffer after deserialization **x** numbers of documents.
         */


        function deserializeStream(data, startIndex, numberOfDocuments, documents, docStartIndex, options) {
          options = Object.assign({
            allowObjectSmallerThanBufferSize: true
          }, options);
          data = ensure_buffer(data);
          var index = startIndex; // Loop over all documents

          for (var i = 0; i < numberOfDocuments; i++) {
            // Find size of the document
            var size = data[index] | data[index + 1] << 8 | data[index + 2] << 16 | data[index + 3] << 24; // Update options with index

            options.index = index; // Parse the document at this point

            documents[docStartIndex + i] = deserializer(data, options); // Adjust index by the document size

            index = index + size;
          } // Return object containing end index of parsing and list of documents


          return index;
        }

        var bson = {
          // constants
          // NOTE: this is done this way because rollup can't resolve an `Object.assign`ed export
          BSON_INT32_MAX: constants.BSON_INT32_MAX,
          BSON_INT32_MIN: constants.BSON_INT32_MIN,
          BSON_INT64_MAX: constants.BSON_INT64_MAX,
          BSON_INT64_MIN: constants.BSON_INT64_MIN,
          JS_INT_MAX: constants.JS_INT_MAX,
          JS_INT_MIN: constants.JS_INT_MIN,
          BSON_DATA_NUMBER: constants.BSON_DATA_NUMBER,
          BSON_DATA_STRING: constants.BSON_DATA_STRING,
          BSON_DATA_OBJECT: constants.BSON_DATA_OBJECT,
          BSON_DATA_ARRAY: constants.BSON_DATA_ARRAY,
          BSON_DATA_BINARY: constants.BSON_DATA_BINARY,
          BSON_DATA_UNDEFINED: constants.BSON_DATA_UNDEFINED,
          BSON_DATA_OID: constants.BSON_DATA_OID,
          BSON_DATA_BOOLEAN: constants.BSON_DATA_BOOLEAN,
          BSON_DATA_DATE: constants.BSON_DATA_DATE,
          BSON_DATA_NULL: constants.BSON_DATA_NULL,
          BSON_DATA_REGEXP: constants.BSON_DATA_REGEXP,
          BSON_DATA_DBPOINTER: constants.BSON_DATA_DBPOINTER,
          BSON_DATA_CODE: constants.BSON_DATA_CODE,
          BSON_DATA_SYMBOL: constants.BSON_DATA_SYMBOL,
          BSON_DATA_CODE_W_SCOPE: constants.BSON_DATA_CODE_W_SCOPE,
          BSON_DATA_INT: constants.BSON_DATA_INT,
          BSON_DATA_TIMESTAMP: constants.BSON_DATA_TIMESTAMP,
          BSON_DATA_LONG: constants.BSON_DATA_LONG,
          BSON_DATA_DECIMAL128: constants.BSON_DATA_DECIMAL128,
          BSON_DATA_MIN_KEY: constants.BSON_DATA_MIN_KEY,
          BSON_DATA_MAX_KEY: constants.BSON_DATA_MAX_KEY,
          BSON_BINARY_SUBTYPE_DEFAULT: constants.BSON_BINARY_SUBTYPE_DEFAULT,
          BSON_BINARY_SUBTYPE_FUNCTION: constants.BSON_BINARY_SUBTYPE_FUNCTION,
          BSON_BINARY_SUBTYPE_BYTE_ARRAY: constants.BSON_BINARY_SUBTYPE_BYTE_ARRAY,
          BSON_BINARY_SUBTYPE_UUID: constants.BSON_BINARY_SUBTYPE_UUID,
          BSON_BINARY_SUBTYPE_MD5: constants.BSON_BINARY_SUBTYPE_MD5,
          BSON_BINARY_SUBTYPE_USER_DEFINED: constants.BSON_BINARY_SUBTYPE_USER_DEFINED,
          // wrapped types
          Code: code,
          Map: map,
          BSONSymbol: symbol,
          DBRef: db_ref,
          Binary: binary,
          ObjectId: objectid,
          Long: long_1,
          Timestamp: timestamp,
          Double: double_1,
          Int32: int_32,
          MinKey: min_key,
          MaxKey: max_key,
          BSONRegExp: regexp,
          Decimal128: decimal128,
          // methods
          serialize: serialize$1,
          serializeWithBufferAndIndex: serializeWithBufferAndIndex,
          deserialize: deserialize$2,
          calculateObjectSize: calculateObjectSize$1,
          deserializeStream: deserializeStream,
          setInternalBufferSize: setInternalBufferSize,
          // legacy support
          ObjectID: objectid,
          // Extended JSON
          EJSON: extended_json
        };
        var bson_1 = bson.BSON_INT32_MAX;
        var bson_2 = bson.BSON_INT32_MIN;
        var bson_3 = bson.BSON_INT64_MAX;
        var bson_4 = bson.BSON_INT64_MIN;
        var bson_5 = bson.JS_INT_MAX;
        var bson_6 = bson.JS_INT_MIN;
        var bson_7 = bson.BSON_DATA_NUMBER;
        var bson_8 = bson.BSON_DATA_STRING;
        var bson_9 = bson.BSON_DATA_OBJECT;
        var bson_10 = bson.BSON_DATA_ARRAY;
        var bson_11 = bson.BSON_DATA_BINARY;
        var bson_12 = bson.BSON_DATA_UNDEFINED;
        var bson_13 = bson.BSON_DATA_OID;
        var bson_14 = bson.BSON_DATA_BOOLEAN;
        var bson_15 = bson.BSON_DATA_DATE;
        var bson_16 = bson.BSON_DATA_NULL;
        var bson_17 = bson.BSON_DATA_REGEXP;
        var bson_18 = bson.BSON_DATA_DBPOINTER;
        var bson_19 = bson.BSON_DATA_CODE;
        var bson_20 = bson.BSON_DATA_SYMBOL;
        var bson_21 = bson.BSON_DATA_CODE_W_SCOPE;
        var bson_22 = bson.BSON_DATA_INT;
        var bson_23 = bson.BSON_DATA_TIMESTAMP;
        var bson_24 = bson.BSON_DATA_LONG;
        var bson_25 = bson.BSON_DATA_DECIMAL128;
        var bson_26 = bson.BSON_DATA_MIN_KEY;
        var bson_27 = bson.BSON_DATA_MAX_KEY;
        var bson_28 = bson.BSON_BINARY_SUBTYPE_DEFAULT;
        var bson_29 = bson.BSON_BINARY_SUBTYPE_FUNCTION;
        var bson_30 = bson.BSON_BINARY_SUBTYPE_BYTE_ARRAY;
        var bson_31 = bson.BSON_BINARY_SUBTYPE_UUID;
        var bson_32 = bson.BSON_BINARY_SUBTYPE_MD5;
        var bson_33 = bson.BSON_BINARY_SUBTYPE_USER_DEFINED;
        var bson_34 = bson.Code;
        var bson_35 = bson.BSONSymbol;
        var bson_36 = bson.DBRef;
        var bson_37 = bson.Binary;
        var bson_38 = bson.ObjectId;
        var bson_39 = bson.Long;
        var bson_40 = bson.Timestamp;
        var bson_41 = bson.Double;
        var bson_42 = bson.Int32;
        var bson_43 = bson.MinKey;
        var bson_44 = bson.MaxKey;
        var bson_45 = bson.BSONRegExp;
        var bson_46 = bson.Decimal128;
        var bson_47 = bson.serialize;
        var bson_48 = bson.serializeWithBufferAndIndex;
        var bson_49 = bson.deserialize;
        var bson_50 = bson.calculateObjectSize;
        var bson_51 = bson.deserializeStream;
        var bson_52 = bson.setInternalBufferSize;
        var bson_53 = bson.ObjectID;
        var bson_54 = bson.EJSON;
        exports.default = bson;
        exports.BSON_INT32_MAX = bson_1;
        exports.BSON_INT32_MIN = bson_2;
        exports.BSON_INT64_MAX = bson_3;
        exports.BSON_INT64_MIN = bson_4;
        exports.JS_INT_MAX = bson_5;
        exports.JS_INT_MIN = bson_6;
        exports.BSON_DATA_NUMBER = bson_7;
        exports.BSON_DATA_STRING = bson_8;
        exports.BSON_DATA_OBJECT = bson_9;
        exports.BSON_DATA_ARRAY = bson_10;
        exports.BSON_DATA_BINARY = bson_11;
        exports.BSON_DATA_UNDEFINED = bson_12;
        exports.BSON_DATA_OID = bson_13;
        exports.BSON_DATA_BOOLEAN = bson_14;
        exports.BSON_DATA_DATE = bson_15;
        exports.BSON_DATA_NULL = bson_16;
        exports.BSON_DATA_REGEXP = bson_17;
        exports.BSON_DATA_DBPOINTER = bson_18;
        exports.BSON_DATA_CODE = bson_19;
        exports.BSON_DATA_SYMBOL = bson_20;
        exports.BSON_DATA_CODE_W_SCOPE = bson_21;
        exports.BSON_DATA_INT = bson_22;
        exports.BSON_DATA_TIMESTAMP = bson_23;
        exports.BSON_DATA_LONG = bson_24;
        exports.BSON_DATA_DECIMAL128 = bson_25;
        exports.BSON_DATA_MIN_KEY = bson_26;
        exports.BSON_DATA_MAX_KEY = bson_27;
        exports.BSON_BINARY_SUBTYPE_DEFAULT = bson_28;
        exports.BSON_BINARY_SUBTYPE_FUNCTION = bson_29;
        exports.BSON_BINARY_SUBTYPE_BYTE_ARRAY = bson_30;
        exports.BSON_BINARY_SUBTYPE_UUID = bson_31;
        exports.BSON_BINARY_SUBTYPE_MD5 = bson_32;
        exports.BSON_BINARY_SUBTYPE_USER_DEFINED = bson_33;
        exports.Code = bson_34;
        exports.BSONSymbol = bson_35;
        exports.DBRef = bson_36;
        exports.Binary = bson_37;
        exports.ObjectId = bson_38;
        exports.Long = bson_39;
        exports.Timestamp = bson_40;
        exports.Double = bson_41;
        exports.Int32 = bson_42;
        exports.MinKey = bson_43;
        exports.MaxKey = bson_44;
        exports.BSONRegExp = bson_45;
        exports.Decimal128 = bson_46;
        exports.serialize = bson_47;
        exports.serializeWithBufferAndIndex = bson_48;
        exports.deserialize = bson_49;
        exports.calculateObjectSize = bson_50;
        exports.deserializeStream = bson_51;
        exports.setInternalBufferSize = bson_52;
        exports.ObjectID = bson_53;
        exports.EJSON = bson_54;
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
      });
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer);
  }, {
    "buffer": 2,
    "long": 10
  }],
  116: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var OperationType;

    (function (OperationType) {
      OperationType["Insert"] = "insert";
      OperationType["Delete"] = "delete";
      OperationType["Replace"] = "replace";
      OperationType["Update"] = "update";
      OperationType["Unknown"] = "unknown";
    })(OperationType = exports.OperationType || (exports.OperationType = {}));

    function operationTypeFromRemote(type) {
      switch (type) {
        case "insert":
          return OperationType.Insert;

        case "delete":
          return OperationType.Delete;

        case "replace":
          return OperationType.Replace;

        case "update":
          return OperationType.Update;

        default:
          return OperationType.Unknown;
      }
    }

    exports.operationTypeFromRemote = operationTypeFromRemote;
  }, {}],
  117: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var RemoteInsertManyResult = function () {
      function RemoteInsertManyResult(arr) {
        var inserted = {};
        arr.forEach(function (value, index) {
          inserted[index] = value;
        });
        this.insertedIds = inserted;
      }

      return RemoteInsertManyResult;
    }();

    exports.default = RemoteInsertManyResult;
  }, {}],
  118: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var CoreRemoteMongoClientImpl_1 = __importDefault(require("./internal/CoreRemoteMongoClientImpl"));

    exports.CoreRemoteMongoClientImpl = CoreRemoteMongoClientImpl_1.default;

    var CoreRemoteMongoCollectionImpl_1 = __importDefault(require("./internal/CoreRemoteMongoCollectionImpl"));

    exports.CoreRemoteMongoCollectionImpl = CoreRemoteMongoCollectionImpl_1.default;

    var CoreRemoteMongoDatabaseImpl_1 = __importDefault(require("./internal/CoreRemoteMongoDatabaseImpl"));

    exports.CoreRemoteMongoDatabaseImpl = CoreRemoteMongoDatabaseImpl_1.default;

    var CoreRemoteMongoReadOperation_1 = __importDefault(require("./internal/CoreRemoteMongoReadOperation"));

    exports.CoreRemoteMongoReadOperation = CoreRemoteMongoReadOperation_1.default;

    var RemoteInsertManyResult_1 = __importDefault(require("./RemoteInsertManyResult"));

    exports.RemoteInsertManyResult = RemoteInsertManyResult_1.default;

    var OperationType_1 = require("./OperationType");

    exports.OperationType = OperationType_1.OperationType;
  }, {
    "./OperationType": 116,
    "./RemoteInsertManyResult": 117,
    "./internal/CoreRemoteMongoClientImpl": 119,
    "./internal/CoreRemoteMongoCollectionImpl": 120,
    "./internal/CoreRemoteMongoDatabaseImpl": 121,
    "./internal/CoreRemoteMongoReadOperation": 122
  }],
  119: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var CoreRemoteMongoDatabaseImpl_1 = __importDefault(require("./CoreRemoteMongoDatabaseImpl"));

    var CoreRemoteMongoClientImpl = function () {
      function CoreRemoteMongoClientImpl(service) {
        this.service = service;
      }

      CoreRemoteMongoClientImpl.prototype.db = function (name) {
        return new CoreRemoteMongoDatabaseImpl_1.default(name, this.service);
      };

      return CoreRemoteMongoClientImpl;
    }();

    exports.default = CoreRemoteMongoClientImpl;
  }, {
    "./CoreRemoteMongoDatabaseImpl": 121
  }],
  120: [function (require, module, exports) {
    "use strict";

    var __assign = this && this.__assign || Object.assign || function (t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];

        for (var p in s) {
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
      }

      return t;
    };

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var bson_1 = __importDefault(require("bson"));

    var CoreRemoteMongoReadOperation_1 = __importDefault(require("./CoreRemoteMongoReadOperation"));

    var ResultDecoders_1 = __importDefault(require("./ResultDecoders"));

    var CoreRemoteMongoCollectionImpl = function () {
      function CoreRemoteMongoCollectionImpl(name, databaseName, service, codec) {
        var _this = this;

        this.name = name;
        this.databaseName = databaseName;
        this.service = service;
        this.codec = codec;
        this.namespace = this.databaseName + "." + this.name;

        this.baseOperationArgs = function () {
          return {
            collection: _this.name,
            database: _this.databaseName
          };
        }();
      }

      CoreRemoteMongoCollectionImpl.prototype.withCollectionType = function (codec) {
        return new CoreRemoteMongoCollectionImpl(this.name, this.databaseName, this.service, codec);
      };

      CoreRemoteMongoCollectionImpl.prototype.find = function (filter, options) {
        if (filter === void 0) {
          filter = {};
        }

        var args = __assign({}, this.baseOperationArgs);

        args.query = filter;

        if (options) {
          if (options.limit) {
            args.limit = options.limit;
          }

          if (options.projection) {
            args.project = options.projection;
          }

          if (options.sort) {
            args.sort = options.sort;
          }
        }

        return new CoreRemoteMongoReadOperation_1.default("find", args, this.service, this.codec);
      };

      CoreRemoteMongoCollectionImpl.prototype.aggregate = function (pipeline) {
        var args = __assign({}, this.baseOperationArgs);

        args.pipeline = pipeline;
        return new CoreRemoteMongoReadOperation_1.default("aggregate", args, this.service, this.codec);
      };

      CoreRemoteMongoCollectionImpl.prototype.count = function (query, options) {
        if (query === void 0) {
          query = {};
        }

        var args = __assign({}, this.baseOperationArgs);

        args.query = query;

        if (options && options.limit) {
          args.limit = options.limit;
        }

        return this.service.callFunction("count", [args]);
      };

      CoreRemoteMongoCollectionImpl.prototype.insertOne = function (value) {
        var args = __assign({}, this.baseOperationArgs);

        args.document = this.generateObjectIdIfMissing(this.codec ? this.codec.encode(value) : value);
        return this.service.callFunction("insertOne", [args], ResultDecoders_1.default.remoteInsertOneResultDecoder);
      };

      CoreRemoteMongoCollectionImpl.prototype.insertMany = function (docs) {
        var _this = this;

        var args = __assign({}, this.baseOperationArgs);

        args.documents = docs.map(function (doc) {
          return _this.generateObjectIdIfMissing(_this.codec ? _this.codec.encode(doc) : doc);
        });
        return this.service.callFunction("insertMany", [args], ResultDecoders_1.default.remoteInsertManyResultDecoder);
      };

      CoreRemoteMongoCollectionImpl.prototype.deleteOne = function (query) {
        return this.executeDelete(query, false);
      };

      CoreRemoteMongoCollectionImpl.prototype.deleteMany = function (query) {
        return this.executeDelete(query, true);
      };

      CoreRemoteMongoCollectionImpl.prototype.updateOne = function (query, update, options) {
        return this.executeUpdate(query, update, options, false);
      };

      CoreRemoteMongoCollectionImpl.prototype.updateMany = function (query, update, options) {
        return this.executeUpdate(query, update, options, true);
      };

      CoreRemoteMongoCollectionImpl.prototype.watch = function (ids) {
        var args = __assign({}, this.baseOperationArgs);

        args.ids = ids;
        return this.service.streamFunction("watch", [args], new ResultDecoders_1.default.ChangeEventDecoder(this.codec));
      };

      CoreRemoteMongoCollectionImpl.prototype.executeDelete = function (query, multi) {
        var args = __assign({}, this.baseOperationArgs);

        args.query = query;
        return this.service.callFunction(multi ? "deleteMany" : "deleteOne", [args], ResultDecoders_1.default.remoteDeleteResultDecoder);
      };

      CoreRemoteMongoCollectionImpl.prototype.executeUpdate = function (query, update, options, multi) {
        if (multi === void 0) {
          multi = false;
        }

        var args = __assign({}, this.baseOperationArgs);

        args.query = query;
        args.update = update;

        if (options && options.upsert) {
          args.upsert = options.upsert;
        }

        return this.service.callFunction(multi ? "updateMany" : "updateOne", [args], ResultDecoders_1.default.remoteUpdateResultDecoder);
      };

      CoreRemoteMongoCollectionImpl.prototype.generateObjectIdIfMissing = function (doc) {
        if (!doc._id) {
          var newDoc = doc;
          newDoc._id = new bson_1.default.ObjectID();
          return newDoc;
        }

        return doc;
      };

      return CoreRemoteMongoCollectionImpl;
    }();

    exports.default = CoreRemoteMongoCollectionImpl;
  }, {
    "./CoreRemoteMongoReadOperation": 122,
    "./ResultDecoders": 123,
    "bson": 124
  }],
  121: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var CoreRemoteMongoCollectionImpl_1 = __importDefault(require("./CoreRemoteMongoCollectionImpl"));

    var CoreRemoteMongoDatabaseImpl = function () {
      function CoreRemoteMongoDatabaseImpl(name, service) {
        this.name = name;
        this.service = service;
      }

      CoreRemoteMongoDatabaseImpl.prototype.collection = function (name, codec) {
        return new CoreRemoteMongoCollectionImpl_1.default(name, this.name, this.service, codec);
      };

      return CoreRemoteMongoDatabaseImpl;
    }();

    exports.default = CoreRemoteMongoDatabaseImpl;
  }, {
    "./CoreRemoteMongoCollectionImpl": 120
  }],
  122: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var CoreRemoteMongoReadOperation = function () {
      function CoreRemoteMongoReadOperation(command, args, service, decoder) {
        this.command = command;
        this.args = args;
        this.service = service;

        if (decoder) {
          this.collectionDecoder = new (function () {
            function class_1() {}

            class_1.prototype.decode = function (from) {
              if (from instanceof Array) {
                return from.map(function (t) {
                  return decoder.decode(t);
                });
              }

              return [decoder.decode(from)];
            };

            return class_1;
          }())();
        }
      }

      CoreRemoteMongoReadOperation.prototype.iterator = function () {
        return this.executeRead().then(function (res) {
          return res[Symbol.iterator]();
        });
      };

      CoreRemoteMongoReadOperation.prototype.first = function () {
        return this.executeRead().then(function (res) {
          return res[0];
        });
      };

      CoreRemoteMongoReadOperation.prototype.toArray = function () {
        return this.executeRead();
      };

      CoreRemoteMongoReadOperation.prototype.asArray = function () {
        return this.toArray();
      };

      CoreRemoteMongoReadOperation.prototype.executeRead = function () {
        return this.service.callFunction(this.command, [this.args], this.collectionDecoder);
      };

      return CoreRemoteMongoReadOperation;
    }();

    exports.default = CoreRemoteMongoReadOperation;
  }, {}],
  123: [function (require, module, exports) {
    "use strict";

    var __importDefault = this && this.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");

    var OperationType_1 = require("../OperationType");

    var RemoteInsertManyResult_1 = __importDefault(require("../RemoteInsertManyResult"));

    var RemoteInsertManyResultFields;

    (function (RemoteInsertManyResultFields) {
      RemoteInsertManyResultFields["InsertedIds"] = "insertedIds";
    })(RemoteInsertManyResultFields || (RemoteInsertManyResultFields = {}));

    var RemoteInsertOneResultFields;

    (function (RemoteInsertOneResultFields) {
      RemoteInsertOneResultFields["InsertedId"] = "insertedId";
    })(RemoteInsertOneResultFields || (RemoteInsertOneResultFields = {}));

    var RemoteUpdateResultFields;

    (function (RemoteUpdateResultFields) {
      RemoteUpdateResultFields["MatchedCount"] = "matchedCount";
      RemoteUpdateResultFields["ModifiedCount"] = "modifiedCount";
      RemoteUpdateResultFields["UpsertedId"] = "upsertedId";
    })(RemoteUpdateResultFields || (RemoteUpdateResultFields = {}));

    var RemoteDeleteResultFields;

    (function (RemoteDeleteResultFields) {
      RemoteDeleteResultFields["DeletedCount"] = "deletedCount";
    })(RemoteDeleteResultFields || (RemoteDeleteResultFields = {}));

    var ChangeEventFields;

    (function (ChangeEventFields) {
      ChangeEventFields["Id"] = "_id";
      ChangeEventFields["OperationType"] = "operationType";
      ChangeEventFields["FullDocument"] = "fullDocument";
      ChangeEventFields["DocumentKey"] = "documentKey";
      ChangeEventFields["Namespace"] = "ns";
      ChangeEventFields["NamespaceDb"] = "db";
      ChangeEventFields["NamespaceColl"] = "coll";
      ChangeEventFields["UpdateDescription"] = "updateDescription";
      ChangeEventFields["UpdateDescriptionUpdatedFields"] = "updatedFields";
      ChangeEventFields["UpdateDescriptionRemovedFields"] = "removedFields";
    })(ChangeEventFields || (ChangeEventFields = {}));

    var RemoteInsertManyResultDecoder = function () {
      function RemoteInsertManyResultDecoder() {}

      RemoteInsertManyResultDecoder.prototype.decode = function (from) {
        return new RemoteInsertManyResult_1.default(from[RemoteInsertManyResultFields.InsertedIds]);
      };

      return RemoteInsertManyResultDecoder;
    }();

    var RemoteInsertOneResultDecoder = function () {
      function RemoteInsertOneResultDecoder() {}

      RemoteInsertOneResultDecoder.prototype.decode = function (from) {
        return {
          insertedId: from[RemoteInsertOneResultFields.InsertedId]
        };
      };

      return RemoteInsertOneResultDecoder;
    }();

    var RemoteUpdateResultDecoder = function () {
      function RemoteUpdateResultDecoder() {}

      RemoteUpdateResultDecoder.prototype.decode = function (from) {
        return {
          matchedCount: from[RemoteUpdateResultFields.MatchedCount],
          modifiedCount: from[RemoteUpdateResultFields.ModifiedCount],
          upsertedId: from[RemoteUpdateResultFields.UpsertedId]
        };
      };

      return RemoteUpdateResultDecoder;
    }();

    var RemoteDeleteResultDecoder = function () {
      function RemoteDeleteResultDecoder() {}

      RemoteDeleteResultDecoder.prototype.decode = function (from) {
        return {
          deletedCount: from[RemoteDeleteResultFields.DeletedCount]
        };
      };

      return RemoteDeleteResultDecoder;
    }();

    var ChangeEventDecoder = function () {
      function ChangeEventDecoder(decoder) {
        this.decoder = decoder;
      }

      ChangeEventDecoder.prototype.decode = function (from) {
        mongodb_stitch_core_sdk_1.Assertions.keyPresent(ChangeEventFields.Id, from);
        mongodb_stitch_core_sdk_1.Assertions.keyPresent(ChangeEventFields.OperationType, from);
        mongodb_stitch_core_sdk_1.Assertions.keyPresent(ChangeEventFields.Namespace, from);
        mongodb_stitch_core_sdk_1.Assertions.keyPresent(ChangeEventFields.DocumentKey, from);
        var nsDoc = from[ChangeEventFields.Namespace];
        var updateDescription;

        if (ChangeEventFields.UpdateDescription in from) {
          var updateDescDoc = from[ChangeEventFields.UpdateDescription];
          mongodb_stitch_core_sdk_1.Assertions.keyPresent(ChangeEventFields.UpdateDescriptionUpdatedFields, updateDescDoc);
          mongodb_stitch_core_sdk_1.Assertions.keyPresent(ChangeEventFields.UpdateDescriptionRemovedFields, updateDescDoc);
          updateDescription = {
            removedFields: updateDescDoc[ChangeEventFields.UpdateDescriptionRemovedFields],
            updatedFields: updateDescDoc[ChangeEventFields.UpdateDescriptionUpdatedFields]
          };
        } else {
          updateDescription = undefined;
        }

        var fullDocument;

        if (ChangeEventFields.FullDocument in from) {
          fullDocument = from[ChangeEventFields.FullDocument];

          if (this.decoder) {
            fullDocument = this.decoder.decode(fullDocument);
          }
        } else {
          fullDocument = undefined;
        }

        return {
          documentKey: from[ChangeEventFields.DocumentKey],
          fullDocument: fullDocument,
          id: from[ChangeEventFields.Id],
          namespace: {
            collection: nsDoc[ChangeEventFields.NamespaceColl],
            database: nsDoc[ChangeEventFields.NamespaceDb]
          },
          operationType: OperationType_1.operationTypeFromRemote(from[ChangeEventFields.OperationType]),
          updateDescription: updateDescription
        };
      };

      return ChangeEventDecoder;
    }();

    var ResultDecoders = function () {
      function ResultDecoders() {}

      ResultDecoders.remoteInsertManyResultDecoder = new RemoteInsertManyResultDecoder();
      ResultDecoders.remoteInsertOneResultDecoder = new RemoteInsertOneResultDecoder();
      ResultDecoders.remoteUpdateResultDecoder = new RemoteUpdateResultDecoder();
      ResultDecoders.remoteDeleteResultDecoder = new RemoteDeleteResultDecoder();
      ResultDecoders.ChangeEventDecoder = ChangeEventDecoder;
      return ResultDecoders;
    }();

    exports.default = ResultDecoders;
  }, {
    "../OperationType": 116,
    "../RemoteInsertManyResult": 117,
    "mongodb-stitch-core-sdk": 87
  }],
  124: [function (require, module, exports) {
    arguments[4][115][0].apply(exports, arguments);
  }, {
    "buffer": 2,
    "dup": 115,
    "long": 10
  }]
}, {}, [5]);
},{"buffer":"../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/buffer/index.js","process":"../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/process/browser.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61600" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/bundle.js"], null)
//# sourceMappingURL=/bundle.281cdbd8.map