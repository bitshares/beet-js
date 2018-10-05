var Beet = (function (crypto) {
	'use strict';

	crypto = crypto && crypto.hasOwnProperty('default') ? crypto['default'] : crypto;

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var otpauth = createCommonjsModule(function (module, exports) {
	/*! otpauth v3.2.1 | (c) Héctor Molinero Fernández <hector@molinero.xyz> | https://github.com/hectorm/otpauth | MIT */
	(function() {
	 var $jscomp = $jscomp || {};
	 $jscomp.scope = {};
	 $jscomp.getGlobal = function(maybeGlobal) {
	  return "undefined" != typeof window && window === maybeGlobal ? maybeGlobal : "undefined" != typeof commonjsGlobal && null != commonjsGlobal ? commonjsGlobal : maybeGlobal;
	 };
	 $jscomp.global = $jscomp.getGlobal(this);
	 $jscomp.ASSUME_ES5 = !1;
	 $jscomp.ASSUME_NO_NATIVE_MAP = !1;
	 $jscomp.ASSUME_NO_NATIVE_SET = !1;
	 $jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(target, property, descriptor) {
	  target != Array.prototype && target != Object.prototype && (target[property] = descriptor.value);
	 };
	 $jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
	 $jscomp.initSymbol = function() {
	  $jscomp.initSymbol = function() {};
	  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
	 };
	 $jscomp.Symbol = function() {
	  var counter = 0;
	  return function(opt_description) {
	   return $jscomp.SYMBOL_PREFIX + (opt_description || "") + counter++;
	  };
	 }();
	 $jscomp.initSymbolIterator = function() {
	  $jscomp.initSymbol();
	  var symbolIterator = $jscomp.global.Symbol.iterator;
	  symbolIterator || (symbolIterator = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
	  "function" != typeof Array.prototype[symbolIterator] && $jscomp.defineProperty(Array.prototype, symbolIterator, {
	   configurable: !0,
	   writable: !0,
	   value: function() {
	    return $jscomp.arrayIterator(this);
	   }
	  });
	  $jscomp.initSymbolIterator = function() {};
	 };
	 $jscomp.arrayIterator = function(array) {
	  var index = 0;
	  return $jscomp.iteratorPrototype(function() {
	   return index < array.length ? {
	    done: !1,
	    value: array[index++]
	   } : {
	    done: !0
	   };
	  });
	 };
	 $jscomp.iteratorPrototype = function(next) {
	  $jscomp.initSymbolIterator();
	  next = {
	   next: next
	  };
	  next[$jscomp.global.Symbol.iterator] = function() {
	   return this;
	  };
	  return next;
	 };
	 function factory$jscomp$inline_1() {
	  return function(modules) {
	   function __webpack_require__(moduleId) {
	    if (installedModules[moduleId]) return installedModules[moduleId].exports;
	    var module = installedModules[moduleId] = {
	     i: moduleId,
	     l: !1,
	     exports: {}
	    };
	    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	    module.l = !0;
	    return module.exports;
	   }
	   var installedModules = {};
	   __webpack_require__.m = modules;
	   __webpack_require__.c = installedModules;
	   __webpack_require__.d = function(exports, name, getter) {
	    __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
	     enumerable: !0,
	     get: getter
	    });
	   };
	   __webpack_require__.r = function(exports) {
	    $jscomp.initSymbol();
	    $jscomp.initSymbol();
	    "undefined" !== typeof Symbol && Symbol.toStringTag && ($jscomp.initSymbol(), Object.defineProperty(exports, Symbol.toStringTag, {
	     value: "Module"
	    }));
	    Object.defineProperty(exports, "__esModule", {
	     value: !0
	    });
	   };
	   __webpack_require__.t = function(value, mode) {
	    mode & 1 && (value = __webpack_require__(value));
	    if (mode & 8 || mode & 4 && "object" === typeof value && value && value.__esModule) return value;
	    var ns = Object.create(null);
	    __webpack_require__.r(ns);
	    Object.defineProperty(ns, "default", {
	     enumerable: !0,
	     value: value
	    });
	    if (mode & 2 && "string" != typeof value) for (var key$jscomp$0 in value) __webpack_require__.d(ns, key$jscomp$0, function(key) {
	     return value[key];
	    }.bind(null, key$jscomp$0));
	    return ns;
	   };
	   __webpack_require__.n = function(module) {
	    var getter = module && module.__esModule ? function() {
	     return module["default"];
	    } : function() {
	     return module;
	    };
	    __webpack_require__.d(getter, "a", getter);
	    return getter;
	   };
	   __webpack_require__.o = function(object, property) {
	    return Object.prototype.hasOwnProperty.call(object, property);
	   };
	   __webpack_require__.p = "";
	   return __webpack_require__(__webpack_require__.s = 4);
	  }([ function(module, __webpack_exports__, __webpack_require__) {
	   (function(global) {
	    __webpack_require__.d(__webpack_exports__, "b", function() {
	     return Utils;
	    });
	    __webpack_require__.d(__webpack_exports__, "a", function() {
	     return InternalUtils;
	    });
	    var Utils = {
	     uint: {}
	    };
	    Utils.uint.decode = function(buf) {
	     buf = new Uint8Array(buf);
	     for (var num = 0, i = 0; i < buf.length; i++) 0 !== buf[i] && (num *= 256, num += buf[i]);
	     return num;
	    };
	    Utils.uint.encode = function(num) {
	     for (var buf = new ArrayBuffer(8), arr = new Uint8Array(buf), i = 7; 0 <= i && 0 !== num; i--) arr[i] = num & 255, 
	     num -= arr[i], num /= 256;
	     return buf;
	    };
	    Utils.raw = {};
	    Utils.raw.decode = function(buf) {
	     buf = new Uint8Array(buf);
	     for (var str = "", i = 0; i < buf.length; i++) str += String.fromCharCode(buf[i]);
	     return str;
	    };
	    Utils.raw.encode = function(str) {
	     for (var buf = new ArrayBuffer(str.length), arr = new Uint8Array(buf), i = 0; i < str.length; i++) arr[i] = str.charCodeAt(i);
	     return buf;
	    };
	    Utils.b32 = {};
	    Utils.b32.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
	    Utils.b32.decode = function(buf) {
	     buf = new Uint8Array(buf);
	     for (var bits = 0, value = 0, str = "", i = 0; i < buf.length; i++) for (value = value << 8 | buf[i], 
	     bits += 8; 5 <= bits; ) str += Utils.b32.alphabet[value >>> bits - 5 & 31], bits -= 5;
	     0 < bits && (str += Utils.b32.alphabet[value << 5 - bits & 31]);
	     return str;
	    };
	    Utils.b32.encode = function(str) {
	     var strUpp = str.toUpperCase();
	     str = new ArrayBuffer(5 * str.length / 8 | 0);
	     for (var arr = new Uint8Array(str), bits = 0, value = 0, index = 0, i = 0; i < strUpp.length; i++) {
	      var idx = Utils.b32.alphabet.indexOf(strUpp[i]);
	      if (-1 === idx) throw new TypeError("Invalid character found: " + strUpp[i]);
	      value = value << 5 | idx;
	      bits += 5;
	      8 <= bits && (arr[index++] = value >>> bits - 8 & 255, bits -= 8);
	     }
	     return str;
	    };
	    Utils.hex = {};
	    Utils.hex.decode = function(buf) {
	     buf = new Uint8Array(buf);
	     for (var str = "", i = 0; i < buf.length; i++) {
	      var hexByte = buf[i].toString(16);
	      str += 1 === hexByte.length ? "0" + hexByte : hexByte;
	     }
	     return str.toUpperCase();
	    };
	    Utils.hex.encode = function(str) {
	     for (var buf = new ArrayBuffer(str.length / 2), arr = new Uint8Array(buf), i = 0; i < arr.length; i++) arr[i] = parseInt(str.substr(2 * i, 2), 16);
	     return buf;
	    };
	    var InternalUtils = {};
	    InternalUtils.isNode = "[object process]" === Object.prototype.toString.call(global.process);
	    InternalUtils.require = function(name) {
	     return InternalUtils.isNode ? eval("require")(name) : null;
	    };
	   }).call(this, __webpack_require__(3));
	  }, function(module, __webpack_exports__) {
	   var sjcl = {
	    cipher: {},
	    hash: {},
	    keyexchange: {},
	    mode: {},
	    misc: {},
	    codec: {},
	    exception: {
	     corrupt: function(message) {
	      this.toString = function() {
	       return "CORRUPT: " + this.message;
	      };
	      this.message = message;
	     },
	     invalid: function(message) {
	      this.toString = function() {
	       return "INVALID: " + this.message;
	      };
	      this.message = message;
	     },
	     bug: function(message) {
	      this.toString = function() {
	       return "BUG: " + this.message;
	      };
	      this.message = message;
	     },
	     notReady: function(message) {
	      this.toString = function() {
	       return "NOT READY: " + this.message;
	      };
	      this.message = message;
	     }
	    },
	    bitArray: {
	     bitSlice: function(a, bstart, bend) {
	      a = sjcl.bitArray._shiftRight(a.slice(bstart / 32), 32 - (bstart & 31)).slice(1);
	      return void 0 === bend ? a : sjcl.bitArray.clamp(a, bend - bstart);
	     },
	     extract: function(a, bstart, blength) {
	      var sh = Math.floor(-bstart - blength & 31);
	      return ((bstart + blength - 1 ^ bstart) & -32 ? a[bstart / 32 | 0] << 32 - sh ^ a[bstart / 32 + 1 | 0] >>> sh : a[bstart / 32 | 0] >>> sh) & (1 << blength) - 1;
	     },
	     concat: function(a1, a2) {
	      if (0 === a1.length || 0 === a2.length) return a1.concat(a2);
	      var last = a1[a1.length - 1], shift = sjcl.bitArray.getPartial(last);
	      return 32 === shift ? a1.concat(a2) : sjcl.bitArray._shiftRight(a2, shift, last | 0, a1.slice(0, a1.length - 1));
	     },
	     bitLength: function(a) {
	      var l = a.length;
	      return 0 === l ? 0 : 32 * (l - 1) + sjcl.bitArray.getPartial(a[l - 1]);
	     },
	     clamp: function(a, len) {
	      if (32 * a.length < len) return a;
	      a = a.slice(0, Math.ceil(len / 32));
	      var l = a.length;
	      len &= 31;
	      0 < l && len && (a[l - 1] = sjcl.bitArray.partial(len, a[l - 1] & 2147483648 >> len - 1, 1));
	      return a;
	     },
	     partial: function(len, x, _end) {
	      return 32 === len ? x : (_end ? x | 0 : x << 32 - len) + 1099511627776 * len;
	     },
	     getPartial: function(x) {
	      return Math.round(x / 1099511627776) || 32;
	     },
	     equal: function(a, b) {
	      if (sjcl.bitArray.bitLength(a) !== sjcl.bitArray.bitLength(b)) return !1;
	      var x = 0, i;
	      for (i = 0; i < a.length; i++) x |= a[i] ^ b[i];
	      return 0 === x;
	     },
	     _shiftRight: function(a, shift, carry, out) {
	      var i;
	      for (void 0 === out && (out = []); 32 <= shift; shift -= 32) out.push(carry), carry = 0;
	      if (0 === shift) return out.concat(a);
	      for (i = 0; i < a.length; i++) out.push(carry | a[i] >>> shift), carry = a[i] << 32 - shift;
	      a = sjcl.bitArray.getPartial(a.length ? a[a.length - 1] : 0);
	      out.push(sjcl.bitArray.partial(shift + a & 31, 32 < shift + a ? carry : out.pop(), 1));
	      return out;
	     },
	     _xor4: function(x, y) {
	      return [ x[0] ^ y[0], x[1] ^ y[1], x[2] ^ y[2], x[3] ^ y[3] ];
	     },
	     byteswapM: function(a) {
	      var i;
	      for (i = 0; i < a.length; ++i) {
	       var v = a[i];
	       a[i] = v >>> 24 | v >>> 8 & 65280 | (v & 65280) << 8 | v << 24;
	      }
	      return a;
	     }
	    }
	   };
	   "undefined" === typeof ArrayBuffer && function(globals) {
	    globals.ArrayBuffer = function() {};
	    globals.DataView = function() {};
	   }(void 0);
	   sjcl.codec.arrayBuffer = {
	    fromBits: function(arr, padding, padding_count) {
	     padding = void 0 == padding ? !0 : padding;
	     padding_count = padding_count || 8;
	     if (0 === arr.length) return new ArrayBuffer(0);
	     var ol = sjcl.bitArray.bitLength(arr) / 8;
	     if (0 !== sjcl.bitArray.bitLength(arr) % 8) throw new sjcl.exception.invalid("Invalid bit size, must be divisble by 8 to fit in an arraybuffer correctly");
	     padding && 0 !== ol % padding_count && (ol += padding_count - ol % padding_count);
	     padding_count = new DataView(new ArrayBuffer(4 * arr.length));
	     for (padding = 0; padding < arr.length; padding++) padding_count.setUint32(4 * padding, arr[padding] << 32);
	     arr = new DataView(new ArrayBuffer(ol));
	     if (arr.byteLength === padding_count.byteLength) return padding_count.buffer;
	     ol = padding_count.byteLength < arr.byteLength ? padding_count.byteLength : arr.byteLength;
	     for (padding = 0; padding < ol; padding++) arr.setUint8(padding, padding_count.getUint8(padding));
	     return arr.buffer;
	    },
	    toBits: function(buffer) {
	     var out = [];
	     if (0 === buffer.byteLength) return [];
	     var inView = new DataView(buffer);
	     var len = inView.byteLength - inView.byteLength % 4;
	     for (buffer = 0; buffer < len; buffer += 4) out.push(inView.getUint32(buffer));
	     if (0 != inView.byteLength % 4) {
	      var tmp = new DataView(new ArrayBuffer(4));
	      buffer = 0;
	      for (var l = inView.byteLength % 4; buffer < l; buffer++) tmp.setUint8(buffer + 4 - l, inView.getUint8(len + buffer));
	      out.push(sjcl.bitArray.partial(inView.byteLength % 4 * 8, tmp.getUint32(0)));
	     }
	     return out;
	    },
	    hexDumpBuffer: function(buffer) {
	     buffer = new DataView(buffer);
	     for (var string = "", i = 0; i < buffer.byteLength; i += 2) {
	      0 == i % 16 && (string += "\n" + i.toString(16) + "\t");
	      var JSCompiler_inline_result = buffer.getUint16(i).toString(16);
	      JSCompiler_inline_result += "";
	      JSCompiler_inline_result = 4 <= JSCompiler_inline_result.length ? JSCompiler_inline_result : Array(4 - JSCompiler_inline_result.length + 1).join("0") + JSCompiler_inline_result;
	      string += JSCompiler_inline_result + " ";
	     }
	     console.log(string.toUpperCase());
	    }
	   };
	   sjcl.hash.sha1 = function(hash) {
	    hash ? (this._h = hash._h.slice(0), this._buffer = hash._buffer.slice(0), this._length = hash._length) : this.reset();
	   };
	   sjcl.hash.sha1.hash = function(data) {
	    return new sjcl.hash.sha1().update(data).finalize();
	   };
	   sjcl.hash.sha1.prototype = {
	    blockSize: 512,
	    reset: function() {
	     this._h = this._init.slice(0);
	     this._buffer = [];
	     this._length = 0;
	     return this;
	    },
	    update: function(data) {
	     "string" === typeof data && (data = sjcl.codec.utf8String.toBits(data));
	     var b = this._buffer = sjcl.bitArray.concat(this._buffer, data);
	     var i = this._length;
	     data = this._length = i + sjcl.bitArray.bitLength(data);
	     if (9007199254740991 < data) throw new sjcl.exception.invalid("Cannot hash more than 2^53 - 1 bits");
	     if ("undefined" !== typeof Uint32Array) {
	      var c = new Uint32Array(b), j = 0;
	      for (i = this.blockSize + i - (this.blockSize + i & this.blockSize - 1); i <= data; i += this.blockSize) this._block(c.subarray(16 * j, 16 * (j + 1))), 
	      j += 1;
	      b.splice(0, 16 * j);
	     } else for (i = this.blockSize + i - (this.blockSize + i & this.blockSize - 1); i <= data; i += this.blockSize) this._block(b.splice(0, 16));
	     return this;
	    },
	    finalize: function() {
	     var i, b = this._buffer, h = this._h;
	     b = sjcl.bitArray.concat(b, [ sjcl.bitArray.partial(1, 1) ]);
	     for (i = b.length + 2; i & 15; i++) b.push(0);
	     b.push(Math.floor(this._length / 4294967296));
	     for (b.push(this._length | 0); b.length; ) this._block(b.splice(0, 16));
	     this.reset();
	     return h;
	    },
	    _init: [ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ],
	    _key: [ 1518500249, 1859775393, 2400959708, 3395469782 ],
	    _f: function(t, b, c, d) {
	     if (19 >= t) return b & c | ~b & d;
	     if (39 >= t) return b ^ c ^ d;
	     if (59 >= t) return b & c | b & d | c & d;
	     if (79 >= t) return b ^ c ^ d;
	    },
	    _S: function(n, x) {
	     return x << n | x >>> 32 - n;
	    },
	    _block: function(words) {
	     var tmp, h = this._h;
	     if ("undefined" !== typeof Uint32Array) {
	      var w = Array(80);
	      for (tmp = 0; 16 > tmp; tmp++) w[tmp] = words[tmp];
	     } else w = words;
	     var a = h[0];
	     var b = h[1];
	     var c = h[2];
	     var d = h[3];
	     var e = h[4];
	     for (words = 0; 79 >= words; words++) 16 <= words && (w[words] = this._S(1, w[words - 3] ^ w[words - 8] ^ w[words - 14] ^ w[words - 16])), 
	     tmp = this._S(5, a) + this._f(words, b, c, d) + e + w[words] + this._key[Math.floor(words / 20)] | 0, 
	     e = d, d = c, c = this._S(30, b), b = a, a = tmp;
	     h[0] = h[0] + a | 0;
	     h[1] = h[1] + b | 0;
	     h[2] = h[2] + c | 0;
	     h[3] = h[3] + d | 0;
	     h[4] = h[4] + e | 0;
	    }
	   };
	   sjcl.hash.sha256 = function(hash) {
	    this._key[0] || this._precompute();
	    hash ? (this._h = hash._h.slice(0), this._buffer = hash._buffer.slice(0), this._length = hash._length) : this.reset();
	   };
	   sjcl.hash.sha256.hash = function(data) {
	    return new sjcl.hash.sha256().update(data).finalize();
	   };
	   sjcl.hash.sha256.prototype = {
	    blockSize: 512,
	    reset: function() {
	     this._h = this._init.slice(0);
	     this._buffer = [];
	     this._length = 0;
	     return this;
	    },
	    update: function(data) {
	     "string" === typeof data && (data = sjcl.codec.utf8String.toBits(data));
	     var b = this._buffer = sjcl.bitArray.concat(this._buffer, data);
	     var i = this._length;
	     data = this._length = i + sjcl.bitArray.bitLength(data);
	     if (9007199254740991 < data) throw new sjcl.exception.invalid("Cannot hash more than 2^53 - 1 bits");
	     if ("undefined" !== typeof Uint32Array) {
	      var c = new Uint32Array(b), j = 0;
	      for (i = 512 + i - (512 + i & 511); i <= data; i += 512) this._block(c.subarray(16 * j, 16 * (j + 1))), 
	      j += 1;
	      b.splice(0, 16 * j);
	     } else for (i = 512 + i - (512 + i & 511); i <= data; i += 512) this._block(b.splice(0, 16));
	     return this;
	    },
	    finalize: function() {
	     var i, b = this._buffer, h = this._h;
	     b = sjcl.bitArray.concat(b, [ sjcl.bitArray.partial(1, 1) ]);
	     for (i = b.length + 2; i & 15; i++) b.push(0);
	     b.push(Math.floor(this._length / 4294967296));
	     for (b.push(this._length | 0); b.length; ) this._block(b.splice(0, 16));
	     this.reset();
	     return h;
	    },
	    _init: [],
	    _key: [],
	    _precompute: function() {
	     function frac(x) {
	      return 4294967296 * (x - Math.floor(x)) | 0;
	     }
	     for (var i = 0, prime = 2, factor, isPrime; 64 > i; prime++) {
	      isPrime = !0;
	      for (factor = 2; factor * factor <= prime; factor++) if (0 === prime % factor) {
	       isPrime = !1;
	       break;
	      }
	      isPrime && (8 > i && (this._init[i] = frac(Math.pow(prime, .5))), this._key[i] = frac(Math.pow(prime, 1 / 3)), 
	      i++);
	     }
	    },
	    _block: function(w) {
	     var i, h = this._h, k = this._key, h0 = h[0], h1 = h[1], h2 = h[2], h3 = h[3], h4 = h[4], h5 = h[5], h6 = h[6], h7 = h[7];
	     for (i = 0; 64 > i; i++) {
	      if (16 > i) var tmp = w[i]; else {
	       tmp = w[i + 1 & 15];
	       var b = w[i + 14 & 15];
	       tmp = w[i & 15] = (tmp >>> 7 ^ tmp >>> 18 ^ tmp >>> 3 ^ tmp << 25 ^ tmp << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i & 15] + w[i + 9 & 15] | 0;
	      }
	      tmp = tmp + h7 + (h4 >>> 6 ^ h4 >>> 11 ^ h4 >>> 25 ^ h4 << 26 ^ h4 << 21 ^ h4 << 7) + (h6 ^ h4 & (h5 ^ h6)) + k[i];
	      h7 = h6;
	      h6 = h5;
	      h5 = h4;
	      h4 = h3 + tmp | 0;
	      h3 = h2;
	      h2 = h1;
	      h1 = h0;
	      h0 = tmp + (h1 & h2 ^ h3 & (h1 ^ h2)) + (h1 >>> 2 ^ h1 >>> 13 ^ h1 >>> 22 ^ h1 << 30 ^ h1 << 19 ^ h1 << 10) | 0;
	     }
	     h[0] = h[0] + h0 | 0;
	     h[1] = h[1] + h1 | 0;
	     h[2] = h[2] + h2 | 0;
	     h[3] = h[3] + h3 | 0;
	     h[4] = h[4] + h4 | 0;
	     h[5] = h[5] + h5 | 0;
	     h[6] = h[6] + h6 | 0;
	     h[7] = h[7] + h7 | 0;
	    }
	   };
	   sjcl.hash.sha512 = function(hash) {
	    this._key[0] || this._precompute();
	    hash ? (this._h = hash._h.slice(0), this._buffer = hash._buffer.slice(0), this._length = hash._length) : this.reset();
	   };
	   sjcl.hash.sha512.hash = function(data) {
	    return new sjcl.hash.sha512().update(data).finalize();
	   };
	   sjcl.hash.sha512.prototype = {
	    blockSize: 1024,
	    reset: function() {
	     this._h = this._init.slice(0);
	     this._buffer = [];
	     this._length = 0;
	     return this;
	    },
	    update: function(data) {
	     "string" === typeof data && (data = sjcl.codec.utf8String.toBits(data));
	     var b = this._buffer = sjcl.bitArray.concat(this._buffer, data);
	     var i = this._length;
	     data = this._length = i + sjcl.bitArray.bitLength(data);
	     if (9007199254740991 < data) throw new sjcl.exception.invalid("Cannot hash more than 2^53 - 1 bits");
	     if ("undefined" !== typeof Uint32Array) {
	      var c = new Uint32Array(b), j = 0;
	      for (i = 1024 + i - (1024 + i & 1023); i <= data; i += 1024) this._block(c.subarray(32 * j, 32 * (j + 1))), 
	      j += 1;
	      b.splice(0, 32 * j);
	     } else for (i = 1024 + i - (1024 + i & 1023); i <= data; i += 1024) this._block(b.splice(0, 32));
	     return this;
	    },
	    finalize: function() {
	     var i, b = this._buffer, h = this._h;
	     b = sjcl.bitArray.concat(b, [ sjcl.bitArray.partial(1, 1) ]);
	     for (i = b.length + 4; i & 31; i++) b.push(0);
	     b.push(0);
	     b.push(0);
	     b.push(Math.floor(this._length / 4294967296));
	     for (b.push(this._length | 0); b.length; ) this._block(b.splice(0, 32));
	     this.reset();
	     return h;
	    },
	    _init: [],
	    _initr: [ 12372232, 13281083, 9762859, 1914609, 15106769, 4090911, 4308331, 8266105 ],
	    _key: [],
	    _keyr: [ 2666018, 15689165, 5061423, 9034684, 4764984, 380953, 1658779, 7176472, 197186, 7368638, 14987916, 16757986, 8096111, 1480369, 13046325, 6891156, 15813330, 5187043, 9229749, 11312229, 2818677, 10937475, 4324308, 1135541, 6741931, 11809296, 16458047, 15666916, 11046850, 698149, 229999, 945776, 13774844, 2541862, 12856045, 9810911, 11494366, 7844520, 15576806, 8533307, 15795044, 4337665, 16291729, 5553712, 15684120, 6662416, 7413802, 12308920, 13816008, 4303699, 9366425, 10176680, 13195875, 4295371, 6546291, 11712675, 15708924, 1519456, 15772530, 6568428, 6495784, 8568297, 13007125, 7492395, 2515356, 12632583, 14740254, 7262584, 1535930, 13146278, 16321966, 1853211, 294276, 13051027, 13221564, 1051980, 4080310, 6651434, 14088940, 4675607 ],
	    _precompute: function() {
	     function frac(x) {
	      return 4294967296 * (x - Math.floor(x)) | 0;
	     }
	     function frac2(x) {
	      return 1099511627776 * (x - Math.floor(x)) & 255;
	     }
	     for (var i = 0, prime = 2, factor, isPrime; 80 > i; prime++) {
	      isPrime = !0;
	      for (factor = 2; factor * factor <= prime; factor++) if (0 === prime % factor) {
	       isPrime = !1;
	       break;
	      }
	      isPrime && (8 > i && (this._init[2 * i] = frac(Math.pow(prime, .5)), this._init[2 * i + 1] = frac2(Math.pow(prime, .5)) << 24 | this._initr[i]), 
	      this._key[2 * i] = frac(Math.pow(prime, 1 / 3)), this._key[2 * i + 1] = frac2(Math.pow(prime, 1 / 3)) << 24 | this._keyr[i], 
	      i++);
	     }
	    },
	    _block: function(words) {
	     var h = this._h, k = this._key, h0h = h[0], h0l = h[1], h1h = h[2], h1l = h[3], h2h = h[4], h2l = h[5], h3h = h[6], h3l = h[7], h4h = h[8], h4l = h[9], h5h = h[10], h5l = h[11], h6h = h[12], h6l = h[13], h7h = h[14], h7l = h[15];
	     if ("undefined" !== typeof Uint32Array) {
	      var w = Array(160);
	      for (var j = 0; 32 > j; j++) w[j] = words[j];
	     } else w = words;
	     j = h0h;
	     var al = h0l, bh = h1h, bl = h1l, ch = h2h, cl = h2l, dh = h3h, dl = h3l, eh = h4h, el = h4l, fh = h5h, fl = h5l, gh = h6h, gl = h6l, hh = h7h, hl = h7l;
	     for (words = 0; 80 > words; words++) {
	      if (16 > words) {
	       var wrh = w[2 * words];
	       var wrl = w[2 * words + 1];
	      } else {
	       wrl = w[2 * (words - 15)];
	       var gamma0xl = w[2 * (words - 15) + 1];
	       wrh = (gamma0xl << 31 | wrl >>> 1) ^ (gamma0xl << 24 | wrl >>> 8) ^ wrl >>> 7;
	       var gamma0l = (wrl << 31 | gamma0xl >>> 1) ^ (wrl << 24 | gamma0xl >>> 8) ^ (wrl << 25 | gamma0xl >>> 7);
	       wrl = w[2 * (words - 2)];
	       var gamma1xl = w[2 * (words - 2) + 1];
	       gamma0xl = (gamma1xl << 13 | wrl >>> 19) ^ (wrl << 3 | gamma1xl >>> 29) ^ wrl >>> 6;
	       gamma1xl = (wrl << 13 | gamma1xl >>> 19) ^ (gamma1xl << 3 | wrl >>> 29) ^ (wrl << 26 | gamma1xl >>> 6);
	       var wr7h = w[2 * (words - 7)], wr16h = w[2 * (words - 16)], wr16l = w[2 * (words - 16) + 1];
	       wrl = gamma0l + w[2 * (words - 7) + 1];
	       wrh = wrh + wr7h + (wrl >>> 0 < gamma0l >>> 0 ? 1 : 0);
	       wrl += gamma1xl;
	       wrh += gamma0xl + (wrl >>> 0 < gamma1xl >>> 0 ? 1 : 0);
	       wrl += wr16l;
	       wrh += wr16h + (wrl >>> 0 < wr16l >>> 0 ? 1 : 0);
	      }
	      w[2 * words] = wrh |= 0;
	      w[2 * words + 1] = wrl |= 0;
	      wr7h = eh & fh ^ ~eh & gh;
	      var chl = el & fl ^ ~el & gl;
	      gamma1xl = j & bh ^ j & ch ^ bh & ch;
	      var majl = al & bl ^ al & cl ^ bl & cl;
	      wr16h = (al << 4 | j >>> 28) ^ (j << 30 | al >>> 2) ^ (j << 25 | al >>> 7);
	      wr16l = (j << 4 | al >>> 28) ^ (al << 30 | j >>> 2) ^ (al << 25 | j >>> 7);
	      var krh = k[2 * words], krl = k[2 * words + 1];
	      gamma0xl = hl + ((eh << 18 | el >>> 14) ^ (eh << 14 | el >>> 18) ^ (el << 23 | eh >>> 9));
	      gamma0l = hh + ((el << 18 | eh >>> 14) ^ (el << 14 | eh >>> 18) ^ (eh << 23 | el >>> 9)) + (gamma0xl >>> 0 < hl >>> 0 ? 1 : 0);
	      gamma0xl += chl;
	      gamma0l += wr7h + (gamma0xl >>> 0 < chl >>> 0 ? 1 : 0);
	      gamma0xl += krl;
	      gamma0l += krh + (gamma0xl >>> 0 < krl >>> 0 ? 1 : 0);
	      gamma0xl = gamma0xl + wrl | 0;
	      gamma0l += wrh + (gamma0xl >>> 0 < wrl >>> 0 ? 1 : 0);
	      wrl = wr16l + majl;
	      wrh = wr16h + gamma1xl + (wrl >>> 0 < wr16l >>> 0 ? 1 : 0);
	      hh = gh;
	      hl = gl;
	      gh = fh;
	      gl = fl;
	      fh = eh;
	      fl = el;
	      el = dl + gamma0xl | 0;
	      eh = dh + gamma0l + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
	      dh = ch;
	      dl = cl;
	      ch = bh;
	      cl = bl;
	      bh = j;
	      bl = al;
	      al = gamma0xl + wrl | 0;
	      j = gamma0l + wrh + (al >>> 0 < gamma0xl >>> 0 ? 1 : 0) | 0;
	     }
	     h0l = h[1] = h0l + al | 0;
	     h[0] = h0h + j + (h0l >>> 0 < al >>> 0 ? 1 : 0) | 0;
	     h1l = h[3] = h1l + bl | 0;
	     h[2] = h1h + bh + (h1l >>> 0 < bl >>> 0 ? 1 : 0) | 0;
	     h2l = h[5] = h2l + cl | 0;
	     h[4] = h2h + ch + (h2l >>> 0 < cl >>> 0 ? 1 : 0) | 0;
	     h3l = h[7] = h3l + dl | 0;
	     h[6] = h3h + dh + (h3l >>> 0 < dl >>> 0 ? 1 : 0) | 0;
	     h4l = h[9] = h4l + el | 0;
	     h[8] = h4h + eh + (h4l >>> 0 < el >>> 0 ? 1 : 0) | 0;
	     h5l = h[11] = h5l + fl | 0;
	     h[10] = h5h + fh + (h5l >>> 0 < fl >>> 0 ? 1 : 0) | 0;
	     h6l = h[13] = h6l + gl | 0;
	     h[12] = h6h + gh + (h6l >>> 0 < gl >>> 0 ? 1 : 0) | 0;
	     h7l = h[15] = h7l + hl | 0;
	     h[14] = h7h + hh + (h7l >>> 0 < hl >>> 0 ? 1 : 0) | 0;
	    }
	   };
	   sjcl.misc.hmac = function(key, Hash) {
	    this._hash = Hash = Hash || sjcl.hash.sha256;
	    var exKey = [ [], [] ], i, bs = Hash.prototype.blockSize / 32;
	    this._baseHash = [ new Hash(), new Hash() ];
	    key.length > bs && (key = Hash.hash(key));
	    for (i = 0; i < bs; i++) exKey[0][i] = key[i] ^ 909522486, exKey[1][i] = key[i] ^ 1549556828;
	    this._baseHash[0].update(exKey[0]);
	    this._baseHash[1].update(exKey[1]);
	    this._resultHash = new Hash(this._baseHash[0]);
	   };
	   sjcl.misc.hmac.prototype.encrypt = sjcl.misc.hmac.prototype.mac = function(data) {
	    if (this._updated) throw new sjcl.exception.invalid("encrypt on already updated hmac called!");
	    this.update(data);
	    return this.digest(data);
	   };
	   sjcl.misc.hmac.prototype.reset = function() {
	    this._resultHash = new this._hash(this._baseHash[0]);
	    this._updated = !1;
	   };
	   sjcl.misc.hmac.prototype.update = function(data) {
	    this._updated = !0;
	    this._resultHash.update(data);
	   };
	   sjcl.misc.hmac.prototype.digest = function() {
	    var w = this._resultHash.finalize();
	    w = new this._hash(this._baseHash[1]).update(w).finalize();
	    this.reset();
	    return w;
	   };
	   __webpack_exports__.a = sjcl;
	  }, function(module, __webpack_exports__, __webpack_require__) {
	   (function(global) {
	    __webpack_require__.d(__webpack_exports__, "a", function() {
	     return Crypto;
	    });
	    var sjcl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1), NodeCrypto = __webpack_require__(0).a.require("crypto"), Crypto = {};
	    if (NodeCrypto) {
	     var bufferFrom = "function" === typeof Buffer.from ? Buffer.from : function(arrbuf) {
	      var nodeBuf = new Buffer(arrbuf.byteLength);
	      arrbuf = new Uint8Array(arrbuf);
	      for (var i = 0; i < arrbuf.length; i++) nodeBuf[i] = arrbuf[i];
	      return nodeBuf;
	     };
	     var bufferTo = Buffer.prototype instanceof Uint8Array ? function(nodeBuf) {
	      return nodeBuf;
	     } : function(nodeBuf) {
	      for (var arr = new Uint8Array(nodeBuf.length), i = 0; i < arr.length; i++) arr[i] = nodeBuf[i];
	      return arr;
	     };
	     Crypto.randomBytes = function(size) {
	      return bufferTo(NodeCrypto.randomBytes(size));
	     };
	     Crypto.hmacDigest = function(algorithm, key, message) {
	      return bufferTo(NodeCrypto.createHmac(algorithm, bufferFrom(key)).update(bufferFrom(message)).digest());
	     };
	    } else {
	     if ("undefined" !== typeof global.crypto && "function" === typeof global.crypto.getRandomValues) var getRandomValues = function(arr) {
	      global.crypto.getRandomValues(arr);
	     }; else "undefined" !== typeof global.msCrypto && "function" === typeof global.msCrypto.getRandomValues ? getRandomValues = function(arr) {
	      global.msCrypto.getRandomValues(arr);
	     } : (console.warn("Cryptography API not available, falling back to 'Math.random'..."), 
	     getRandomValues = function(arr) {
	      for (var i = 0; i < arr.length; i++) arr[i] = Math.floor(256 * Math.random());
	     });
	     Crypto.randomBytes = function(size) {
	      size = new Uint8Array(size);
	      getRandomValues(size);
	      return size;
	     };
	     Crypto.hmacDigest = function(algorithm, key, message) {
	      algorithm = sjcl__WEBPACK_IMPORTED_MODULE_0__.a.hash[algorithm.toLowerCase()];
	      if ("undefined" === typeof algorithm) throw new TypeError("Unknown hash function");
	      key = new sjcl__WEBPACK_IMPORTED_MODULE_0__.a.misc.hmac(sjcl__WEBPACK_IMPORTED_MODULE_0__.a.codec.arrayBuffer.toBits(key), algorithm);
	      key.update(sjcl__WEBPACK_IMPORTED_MODULE_0__.a.codec.arrayBuffer.toBits(message));
	      return sjcl__WEBPACK_IMPORTED_MODULE_0__.a.codec.arrayBuffer.fromBits(key.digest(), !1);
	     };
	    }
	   }).call(this, __webpack_require__(3));
	  }, function(module) {
	   var g = function() {
	    return this;
	   }();
	   try {
	    g = g || Function("return this")() || (0, eval)("this");
	   } catch (e) {
	    "object" === typeof window && (g = window);
	   }
	   module.exports = g;
	  }, function(module, __webpack_exports__, __webpack_require__) {
	   function otp_TOTP(config) {
	    var $jscomp$destructuring$var7 = void 0 === config ? {} : config;
	    config = void 0 === $jscomp$destructuring$var7.issuer ? "" : $jscomp$destructuring$var7.issuer;
	    var label = void 0 === $jscomp$destructuring$var7.label ? "OTPAuth" : $jscomp$destructuring$var7.label, secret = void 0 === $jscomp$destructuring$var7.secret ? new secret_Secret() : $jscomp$destructuring$var7.secret, algorithm = void 0 === $jscomp$destructuring$var7.algorithm ? "SHA1" : $jscomp$destructuring$var7.algorithm, digits = void 0 === $jscomp$destructuring$var7.digits ? 6 : $jscomp$destructuring$var7.digits;
	    $jscomp$destructuring$var7 = void 0 === $jscomp$destructuring$var7.period ? 30 : $jscomp$destructuring$var7.period;
	    this.issuer = config;
	    this.label = label;
	    this.secret = secret;
	    this.algorithm = algorithm;
	    this.digits = digits;
	    this.period = $jscomp$destructuring$var7;
	   }
	   function otp_HOTP(config) {
	    var $jscomp$destructuring$var2 = void 0 === config ? {} : config;
	    config = void 0 === $jscomp$destructuring$var2.issuer ? "" : $jscomp$destructuring$var2.issuer;
	    var label = void 0 === $jscomp$destructuring$var2.label ? "OTPAuth" : $jscomp$destructuring$var2.label, secret = void 0 === $jscomp$destructuring$var2.secret ? new secret_Secret() : $jscomp$destructuring$var2.secret, algorithm = void 0 === $jscomp$destructuring$var2.algorithm ? "SHA1" : $jscomp$destructuring$var2.algorithm, digits = void 0 === $jscomp$destructuring$var2.digits ? 6 : $jscomp$destructuring$var2.digits;
	    $jscomp$destructuring$var2 = void 0 === $jscomp$destructuring$var2.counter ? 0 : $jscomp$destructuring$var2.counter;
	    this.issuer = config;
	    this.label = label;
	    this.secret = secret;
	    this.algorithm = algorithm;
	    this.digits = digits;
	    this.counter = $jscomp$destructuring$var2;
	   }
	   function uri_URI() {}
	   function secret_Secret(config) {
	    var $jscomp$destructuring$var0 = void 0 === config ? {} : config;
	    config = $jscomp$destructuring$var0.buffer;
	    $jscomp$destructuring$var0 = void 0 === $jscomp$destructuring$var0.size ? 20 : $jscomp$destructuring$var0.size;
	    this.buffer = "undefined" === typeof config ? src_crypto.a.randomBytes($jscomp$destructuring$var0).buffer : config;
	   }
	   __webpack_require__.r(__webpack_exports__);
	   var utils = __webpack_require__(0), src_crypto = __webpack_require__(2);
	   secret_Secret.fromRaw = function(str) {
	    return new this({
	     buffer: utils.b.raw.encode(str)
	    });
	   };
	   secret_Secret.fromB32 = function(str) {
	    return new this({
	     buffer: utils.b.b32.encode(str)
	    });
	   };
	   secret_Secret.fromHex = function(str) {
	    return new this({
	     buffer: utils.b.hex.encode(str)
	    });
	   };
	   $jscomp.global.Object.defineProperties(secret_Secret.prototype, {
	    raw: {
	     configurable: !0,
	     enumerable: !0,
	     get: function() {
	      Object.defineProperty(this, "raw", {
	       enumerable: !0,
	       configurable: !0,
	       writable: !0,
	       value: utils.b.raw.decode(this.buffer)
	      });
	      return this.raw;
	     }
	    },
	    b32: {
	     configurable: !0,
	     enumerable: !0,
	     get: function() {
	      Object.defineProperty(this, "b32", {
	       enumerable: !0,
	       configurable: !0,
	       writable: !0,
	       value: utils.b.b32.decode(this.buffer)
	      });
	      return this.b32;
	     }
	    },
	    hex: {
	     configurable: !0,
	     enumerable: !0,
	     get: function() {
	      Object.defineProperty(this, "hex", {
	       enumerable: !0,
	       configurable: !0,
	       writable: !0,
	       value: utils.b.hex.decode(this.buffer)
	      });
	      return this.hex;
	     }
	    }
	   });
	   var OTPURI_REGEX = /^otpauth:\/\/([ht]otp)\/(.+)\?((?:&?(?:issuer|label|secret|algorithm|digits|counter|period)=[^&]+)+)$/i, SECRET_REGEX = /^[2-7A-Z]+$/i, ALGORITHM_REGEX = /^SHA(?:1|256|512)$/i, INTEGER_REGEX = /^[+-]?\d+$/, POSITIVE_INTEGER_REGEX = /^\+?[1-9]\d*$/;
	   uri_URI.parse = function(uri) {
	    try {
	     var uriGroups = decodeURIComponent(uri).match(OTPURI_REGEX);
	    } catch (err) {}
	    if (!Array.isArray(uriGroups)) throw new URIError("Invalid URI format");
	    var uriType = uriGroups[1].toLowerCase();
	    uri = uriGroups[2].split(/:(.+)/, 2);
	    uriGroups = uriGroups[3].split("&").reduce(function(acc, cur) {
	     cur = cur.split(/=(.+)/, 2);
	     var pairKey = cur[0].toLowerCase();
	     acc[pairKey] = cur[1];
	     return acc;
	    }, {});
	    var config = {};
	    if ("hotp" === uriType) if (uriType = otp_HOTP, "undefined" !== typeof uriGroups.counter && INTEGER_REGEX.test(uriGroups.counter)) config.counter = parseInt(uriGroups.counter, 10); else throw new TypeError("Missing or invalid 'counter' parameter"); else if ("totp" === uriType) {
	     if (uriType = otp_TOTP, "undefined" !== typeof uriGroups.period) if (POSITIVE_INTEGER_REGEX.test(uriGroups.period)) config.period = parseInt(uriGroups.period, 10); else throw new TypeError("Invalid 'period' parameter");
	    } else throw new TypeError("Unknown OTP type");
	    if (2 === uri.length) if (config.label = uri[1], "undefined" === typeof uriGroups.issuer) config.issuer = uri[0]; else if (uriGroups.issuer === uri[0]) config.issuer = uriGroups.issuer; else throw new TypeError("Invalid 'issuer' parameter"); else config.label = uri[0], 
	    "undefined" !== typeof uriGroups.issuer && (config.issuer = uriGroups.issuer);
	    if ("undefined" !== typeof uriGroups.secret && SECRET_REGEX.test(uriGroups.secret)) config.secret = new secret_Secret({
	     buffer: utils.b.b32.encode(uriGroups.secret)
	    }); else throw new TypeError("Missing or invalid 'secret' parameter");
	    if ("undefined" !== typeof uriGroups.algorithm) if (ALGORITHM_REGEX.test(uriGroups.algorithm)) config.algorithm = uriGroups.algorithm; else throw new TypeError("Invalid 'algorithm' parameter");
	    if ("undefined" !== typeof uriGroups.digits) if (POSITIVE_INTEGER_REGEX.test(uriGroups.digits)) config.digits = parseInt(uriGroups.digits, 10); else throw new TypeError("Invalid 'digits' parameter");
	    return new uriType(config);
	   };
	   uri_URI.stringify = function(otp, config) {
	    config = void 0 === config ? {} : config;
	    config = void 0 === config.legacyIssuer ? !0 : config.legacyIssuer;
	    var isTOTP = otp instanceof otp_TOTP;
	    if (!(otp instanceof otp_HOTP || isTOTP)) throw new TypeError("Invalid 'HOTP/TOTP' object");
	    var uri = "otpauth://" + ((isTOTP ? "totp" : "hotp") + "/");
	    0 < otp.issuer.length ? (config && (uri += otp.issuer + ":"), uri += otp.label + "?issuer=" + otp.issuer + "&") : uri += otp.label + "?";
	    uri += "secret=" + otp.secret.b32 + ("&algorithm=" + otp.algorithm) + ("&digits=" + otp.digits);
	    uri = isTOTP ? uri + ("&period=" + otp.period) : uri + ("&counter=" + otp.counter);
	    return encodeURI(uri);
	   };
	   otp_HOTP.generate = function(config) {
	    var digits = void 0 === config.digits ? 6 : config.digits, pad = void 0 === config.pad ? !0 : config.pad;
	    config = new Uint8Array(src_crypto.a.hmacDigest(void 0 === config.algorithm ? "SHA1" : config.algorithm, config.secret.buffer, utils.b.uint.encode(void 0 === config.counter ? 0 : config.counter)));
	    var offset = config[config.byteLength - 1] & 15;
	    config = ((config[offset] & 127) << 24 | (config[offset + 1] & 255) << 16 | (config[offset + 2] & 255) << 8 | config[offset + 3] & 255) % Math.pow(10, digits);
	    return pad ? Array(1 + digits - String(config).length).join("0") + config : config;
	   };
	   otp_HOTP.prototype.generate = function(config) {
	    config = void 0 === config ? {} : config;
	    var counter = void 0 === config.counter ? this.counter++ : config.counter;
	    return otp_HOTP.generate({
	     secret: this.secret,
	     algorithm: this.algorithm,
	     digits: this.digits,
	     counter: counter,
	     pad: config.pad
	    });
	   };
	   otp_HOTP.validate = function(config) {
	    var token = config.token, secret = config.secret, algorithm = config.algorithm, counter = void 0 === config.counter ? 0 : config.counter;
	    config = void 0 === config.window ? 50 : config.window;
	    for (var searchToken = parseInt(token, 10), i = counter - config; i <= counter + config; ++i) {
	     var generatedToken = otp_HOTP.generate({
	      secret: secret,
	      algorithm: algorithm,
	      counter: i,
	      digits: token.length,
	      pad: !1
	     });
	     if (searchToken === generatedToken) return i - counter;
	    }
	    return null;
	   };
	   otp_HOTP.prototype.validate = function(config) {
	    return otp_HOTP.validate({
	     token: config.token,
	     secret: this.secret,
	     algorithm: this.algorithm,
	     counter: void 0 === config.counter ? this.counter : config.counter,
	     window: config.window
	    });
	   };
	   otp_HOTP.prototype.toString = function() {
	    return uri_URI.stringify(this);
	   };
	   otp_TOTP.generate = function(config) {
	    var secret = config.secret, algorithm = config.algorithm, digits = config.digits, period = void 0 === config.period ? 30 : config.period, timestamp = void 0 === config.timestamp ? Date.now() : config.timestamp;
	    return otp_HOTP.generate({
	     secret: secret,
	     algorithm: algorithm,
	     digits: digits,
	     counter: Math.floor(timestamp / 1e3 / period),
	     pad: config.pad
	    });
	   };
	   otp_TOTP.prototype.generate = function(config) {
	    config = void 0 === config ? {} : config;
	    var timestamp = void 0 === config.timestamp ? Date.now() : config.timestamp;
	    return otp_TOTP.generate({
	     secret: this.secret,
	     algorithm: this.algorithm,
	     digits: this.digits,
	     period: this.period,
	     timestamp: timestamp,
	     pad: config.pad
	    });
	   };
	   otp_TOTP.validate = function(config) {
	    var token = config.token, secret = config.secret, algorithm = config.algorithm, period = void 0 === config.period ? 30 : config.period, timestamp = void 0 === config.timestamp ? Date.now() : config.timestamp;
	    return otp_HOTP.validate({
	     token: token,
	     secret: secret,
	     algorithm: algorithm,
	     counter: Math.floor(timestamp / 1e3 / period),
	     window: config.window
	    });
	   };
	   otp_TOTP.prototype.validate = function(config) {
	    return otp_TOTP.validate({
	     token: config.token,
	     secret: this.secret,
	     algorithm: this.algorithm,
	     period: this.period,
	     timestamp: config.timestamp,
	     window: config.window
	    });
	   };
	   otp_TOTP.prototype.toString = function() {
	    return uri_URI.stringify(this);
	   };
	   __webpack_require__.d(__webpack_exports__, "version", function() {
	    return "3.2.1";
	   });
	   __webpack_require__.d(__webpack_exports__, "HOTP", function() {
	    return otp_HOTP;
	   });
	   __webpack_require__.d(__webpack_exports__, "TOTP", function() {
	    return otp_TOTP;
	   });
	   __webpack_require__.d(__webpack_exports__, "URI", function() {
	    return uri_URI;
	   });
	   __webpack_require__.d(__webpack_exports__, "Secret", function() {
	    return secret_Secret;
	   });
	   __webpack_require__.d(__webpack_exports__, "Utils", function() {
	    return utils.b;
	   });
	  } ]);
	 }
	 module.exports = factory$jscomp$inline_1();
	}).call(commonjsGlobal);

	});

	var OTPAuth = unwrapExports(otpauth);
	var otpauth_1 = otpauth.OTPAuth;

	var core = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory();
		}
	}(commonjsGlobal, function () {

		/**
		 * CryptoJS core components.
		 */
		var CryptoJS = CryptoJS || (function (Math, undefined) {
		    /*
		     * Local polyfil of Object.create
		     */
		    var create = Object.create || (function () {
		        function F() {}
		        return function (obj) {
		            var subtype;

		            F.prototype = obj;

		            subtype = new F();

		            F.prototype = null;

		            return subtype;
		        };
		    }());

		    /**
		     * CryptoJS namespace.
		     */
		    var C = {};

		    /**
		     * Library namespace.
		     */
		    var C_lib = C.lib = {};

		    /**
		     * Base object for prototypal inheritance.
		     */
		    var Base = C_lib.Base = (function () {


		        return {
		            /**
		             * Creates a new object that inherits from this object.
		             *
		             * @param {Object} overrides Properties to copy into the new object.
		             *
		             * @return {Object} The new object.
		             *
		             * @static
		             *
		             * @example
		             *
		             *     var MyType = CryptoJS.lib.Base.extend({
		             *         field: 'value',
		             *
		             *         method: function () {
		             *         }
		             *     });
		             */
		            extend: function (overrides) {
		                // Spawn
		                var subtype = create(this);

		                // Augment
		                if (overrides) {
		                    subtype.mixIn(overrides);
		                }

		                // Create default initializer
		                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
		                    subtype.init = function () {
		                        subtype.$super.init.apply(this, arguments);
		                    };
		                }

		                // Initializer's prototype is the subtype object
		                subtype.init.prototype = subtype;

		                // Reference supertype
		                subtype.$super = this;

		                return subtype;
		            },

		            /**
		             * Extends this object and runs the init method.
		             * Arguments to create() will be passed to init().
		             *
		             * @return {Object} The new object.
		             *
		             * @static
		             *
		             * @example
		             *
		             *     var instance = MyType.create();
		             */
		            create: function () {
		                var instance = this.extend();
		                instance.init.apply(instance, arguments);

		                return instance;
		            },

		            /**
		             * Initializes a newly created object.
		             * Override this method to add some logic when your objects are created.
		             *
		             * @example
		             *
		             *     var MyType = CryptoJS.lib.Base.extend({
		             *         init: function () {
		             *             // ...
		             *         }
		             *     });
		             */
		            init: function () {
		            },

		            /**
		             * Copies properties into this object.
		             *
		             * @param {Object} properties The properties to mix in.
		             *
		             * @example
		             *
		             *     MyType.mixIn({
		             *         field: 'value'
		             *     });
		             */
		            mixIn: function (properties) {
		                for (var propertyName in properties) {
		                    if (properties.hasOwnProperty(propertyName)) {
		                        this[propertyName] = properties[propertyName];
		                    }
		                }

		                // IE won't copy toString using the loop above
		                if (properties.hasOwnProperty('toString')) {
		                    this.toString = properties.toString;
		                }
		            },

		            /**
		             * Creates a copy of this object.
		             *
		             * @return {Object} The clone.
		             *
		             * @example
		             *
		             *     var clone = instance.clone();
		             */
		            clone: function () {
		                return this.init.prototype.extend(this);
		            }
		        };
		    }());

		    /**
		     * An array of 32-bit words.
		     *
		     * @property {Array} words The array of 32-bit words.
		     * @property {number} sigBytes The number of significant bytes in this word array.
		     */
		    var WordArray = C_lib.WordArray = Base.extend({
		        /**
		         * Initializes a newly created word array.
		         *
		         * @param {Array} words (Optional) An array of 32-bit words.
		         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.lib.WordArray.create();
		         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
		         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
		         */
		        init: function (words, sigBytes) {
		            words = this.words = words || [];

		            if (sigBytes != undefined) {
		                this.sigBytes = sigBytes;
		            } else {
		                this.sigBytes = words.length * 4;
		            }
		        },

		        /**
		         * Converts this word array to a string.
		         *
		         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
		         *
		         * @return {string} The stringified word array.
		         *
		         * @example
		         *
		         *     var string = wordArray + '';
		         *     var string = wordArray.toString();
		         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
		         */
		        toString: function (encoder) {
		            return (encoder || Hex).stringify(this);
		        },

		        /**
		         * Concatenates a word array to this word array.
		         *
		         * @param {WordArray} wordArray The word array to append.
		         *
		         * @return {WordArray} This word array.
		         *
		         * @example
		         *
		         *     wordArray1.concat(wordArray2);
		         */
		        concat: function (wordArray) {
		            // Shortcuts
		            var thisWords = this.words;
		            var thatWords = wordArray.words;
		            var thisSigBytes = this.sigBytes;
		            var thatSigBytes = wordArray.sigBytes;

		            // Clamp excess bits
		            this.clamp();

		            // Concat
		            if (thisSigBytes % 4) {
		                // Copy one byte at a time
		                for (var i = 0; i < thatSigBytes; i++) {
		                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
		                }
		            } else {
		                // Copy one word at a time
		                for (var i = 0; i < thatSigBytes; i += 4) {
		                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
		                }
		            }
		            this.sigBytes += thatSigBytes;

		            // Chainable
		            return this;
		        },

		        /**
		         * Removes insignificant bits.
		         *
		         * @example
		         *
		         *     wordArray.clamp();
		         */
		        clamp: function () {
		            // Shortcuts
		            var words = this.words;
		            var sigBytes = this.sigBytes;

		            // Clamp
		            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
		            words.length = Math.ceil(sigBytes / 4);
		        },

		        /**
		         * Creates a copy of this word array.
		         *
		         * @return {WordArray} The clone.
		         *
		         * @example
		         *
		         *     var clone = wordArray.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);
		            clone.words = this.words.slice(0);

		            return clone;
		        },

		        /**
		         * Creates a word array filled with random bytes.
		         *
		         * @param {number} nBytes The number of random bytes to generate.
		         *
		         * @return {WordArray} The random word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.lib.WordArray.random(16);
		         */
		        random: function (nBytes) {
		            var words = [];

		            var r = (function (m_w) {
		                var m_w = m_w;
		                var m_z = 0x3ade68b1;
		                var mask = 0xffffffff;

		                return function () {
		                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
		                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
		                    var result = ((m_z << 0x10) + m_w) & mask;
		                    result /= 0x100000000;
		                    result += 0.5;
		                    return result * (Math.random() > .5 ? 1 : -1);
		                }
		            });

		            for (var i = 0, rcache; i < nBytes; i += 4) {
		                var _r = r((rcache || Math.random()) * 0x100000000);

		                rcache = _r() * 0x3ade67b7;
		                words.push((_r() * 0x100000000) | 0);
		            }

		            return new WordArray.init(words, nBytes);
		        }
		    });

		    /**
		     * Encoder namespace.
		     */
		    var C_enc = C.enc = {};

		    /**
		     * Hex encoding strategy.
		     */
		    var Hex = C_enc.Hex = {
		        /**
		         * Converts a word array to a hex string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The hex string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;

		            // Convert
		            var hexChars = [];
		            for (var i = 0; i < sigBytes; i++) {
		                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                hexChars.push((bite >>> 4).toString(16));
		                hexChars.push((bite & 0x0f).toString(16));
		            }

		            return hexChars.join('');
		        },

		        /**
		         * Converts a hex string to a word array.
		         *
		         * @param {string} hexStr The hex string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
		         */
		        parse: function (hexStr) {
		            // Shortcut
		            var hexStrLength = hexStr.length;

		            // Convert
		            var words = [];
		            for (var i = 0; i < hexStrLength; i += 2) {
		                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
		            }

		            return new WordArray.init(words, hexStrLength / 2);
		        }
		    };

		    /**
		     * Latin1 encoding strategy.
		     */
		    var Latin1 = C_enc.Latin1 = {
		        /**
		         * Converts a word array to a Latin1 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The Latin1 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;

		            // Convert
		            var latin1Chars = [];
		            for (var i = 0; i < sigBytes; i++) {
		                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                latin1Chars.push(String.fromCharCode(bite));
		            }

		            return latin1Chars.join('');
		        },

		        /**
		         * Converts a Latin1 string to a word array.
		         *
		         * @param {string} latin1Str The Latin1 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
		         */
		        parse: function (latin1Str) {
		            // Shortcut
		            var latin1StrLength = latin1Str.length;

		            // Convert
		            var words = [];
		            for (var i = 0; i < latin1StrLength; i++) {
		                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
		            }

		            return new WordArray.init(words, latin1StrLength);
		        }
		    };

		    /**
		     * UTF-8 encoding strategy.
		     */
		    var Utf8 = C_enc.Utf8 = {
		        /**
		         * Converts a word array to a UTF-8 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The UTF-8 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            try {
		                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
		            } catch (e) {
		                throw new Error('Malformed UTF-8 data');
		            }
		        },

		        /**
		         * Converts a UTF-8 string to a word array.
		         *
		         * @param {string} utf8Str The UTF-8 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
		         */
		        parse: function (utf8Str) {
		            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
		        }
		    };

		    /**
		     * Abstract buffered block algorithm template.
		     *
		     * The property blockSize must be implemented in a concrete subtype.
		     *
		     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
		     */
		    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
		        /**
		         * Resets this block algorithm's data buffer to its initial state.
		         *
		         * @example
		         *
		         *     bufferedBlockAlgorithm.reset();
		         */
		        reset: function () {
		            // Initial values
		            this._data = new WordArray.init();
		            this._nDataBytes = 0;
		        },

		        /**
		         * Adds new data to this block algorithm's buffer.
		         *
		         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
		         *
		         * @example
		         *
		         *     bufferedBlockAlgorithm._append('data');
		         *     bufferedBlockAlgorithm._append(wordArray);
		         */
		        _append: function (data) {
		            // Convert string to WordArray, else assume WordArray already
		            if (typeof data == 'string') {
		                data = Utf8.parse(data);
		            }

		            // Append
		            this._data.concat(data);
		            this._nDataBytes += data.sigBytes;
		        },

		        /**
		         * Processes available data blocks.
		         *
		         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
		         *
		         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
		         *
		         * @return {WordArray} The processed data.
		         *
		         * @example
		         *
		         *     var processedData = bufferedBlockAlgorithm._process();
		         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
		         */
		        _process: function (doFlush) {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;
		            var dataSigBytes = data.sigBytes;
		            var blockSize = this.blockSize;
		            var blockSizeBytes = blockSize * 4;

		            // Count blocks ready
		            var nBlocksReady = dataSigBytes / blockSizeBytes;
		            if (doFlush) {
		                // Round up to include partial blocks
		                nBlocksReady = Math.ceil(nBlocksReady);
		            } else {
		                // Round down to include only full blocks,
		                // less the number of blocks that must remain in the buffer
		                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
		            }

		            // Count words ready
		            var nWordsReady = nBlocksReady * blockSize;

		            // Count bytes ready
		            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

		            // Process blocks
		            if (nWordsReady) {
		                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
		                    // Perform concrete-algorithm logic
		                    this._doProcessBlock(dataWords, offset);
		                }

		                // Remove processed words
		                var processedWords = dataWords.splice(0, nWordsReady);
		                data.sigBytes -= nBytesReady;
		            }

		            // Return processed words
		            return new WordArray.init(processedWords, nBytesReady);
		        },

		        /**
		         * Creates a copy of this object.
		         *
		         * @return {Object} The clone.
		         *
		         * @example
		         *
		         *     var clone = bufferedBlockAlgorithm.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);
		            clone._data = this._data.clone();

		            return clone;
		        },

		        _minBufferSize: 0
		    });

		    /**
		     * Abstract hasher template.
		     *
		     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
		     */
		    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
		        /**
		         * Configuration options.
		         */
		        cfg: Base.extend(),

		        /**
		         * Initializes a newly created hasher.
		         *
		         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
		         *
		         * @example
		         *
		         *     var hasher = CryptoJS.algo.SHA256.create();
		         */
		        init: function (cfg) {
		            // Apply config defaults
		            this.cfg = this.cfg.extend(cfg);

		            // Set initial values
		            this.reset();
		        },

		        /**
		         * Resets this hasher to its initial state.
		         *
		         * @example
		         *
		         *     hasher.reset();
		         */
		        reset: function () {
		            // Reset data buffer
		            BufferedBlockAlgorithm.reset.call(this);

		            // Perform concrete-hasher logic
		            this._doReset();
		        },

		        /**
		         * Updates this hasher with a message.
		         *
		         * @param {WordArray|string} messageUpdate The message to append.
		         *
		         * @return {Hasher} This hasher.
		         *
		         * @example
		         *
		         *     hasher.update('message');
		         *     hasher.update(wordArray);
		         */
		        update: function (messageUpdate) {
		            // Append
		            this._append(messageUpdate);

		            // Update the hash
		            this._process();

		            // Chainable
		            return this;
		        },

		        /**
		         * Finalizes the hash computation.
		         * Note that the finalize operation is effectively a destructive, read-once operation.
		         *
		         * @param {WordArray|string} messageUpdate (Optional) A final message update.
		         *
		         * @return {WordArray} The hash.
		         *
		         * @example
		         *
		         *     var hash = hasher.finalize();
		         *     var hash = hasher.finalize('message');
		         *     var hash = hasher.finalize(wordArray);
		         */
		        finalize: function (messageUpdate) {
		            // Final message update
		            if (messageUpdate) {
		                this._append(messageUpdate);
		            }

		            // Perform concrete-hasher logic
		            var hash = this._doFinalize();

		            return hash;
		        },

		        blockSize: 512/32,

		        /**
		         * Creates a shortcut function to a hasher's object interface.
		         *
		         * @param {Hasher} hasher The hasher to create a helper for.
		         *
		         * @return {Function} The shortcut function.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
		         */
		        _createHelper: function (hasher) {
		            return function (message, cfg) {
		                return new hasher.init(cfg).finalize(message);
		            };
		        },

		        /**
		         * Creates a shortcut function to the HMAC's object interface.
		         *
		         * @param {Hasher} hasher The hasher to use in this HMAC helper.
		         *
		         * @return {Function} The shortcut function.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
		         */
		        _createHmacHelper: function (hasher) {
		            return function (message, key) {
		                return new C_algo.HMAC.init(hasher, key).finalize(message);
		            };
		        }
		    });

		    /**
		     * Algorithm namespace.
		     */
		    var C_algo = C.algo = {};

		    return C;
		}(Math));


		return CryptoJS;

	}));
	});

	var x64Core = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function (undefined) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Base = C_lib.Base;
		    var X32WordArray = C_lib.WordArray;

		    /**
		     * x64 namespace.
		     */
		    var C_x64 = C.x64 = {};

		    /**
		     * A 64-bit word.
		     */
		    var X64Word = C_x64.Word = Base.extend({
		        /**
		         * Initializes a newly created 64-bit word.
		         *
		         * @param {number} high The high 32 bits.
		         * @param {number} low The low 32 bits.
		         *
		         * @example
		         *
		         *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
		         */
		        init: function (high, low) {
		            this.high = high;
		            this.low = low;
		        }

		        /**
		         * Bitwise NOTs this word.
		         *
		         * @return {X64Word} A new x64-Word object after negating.
		         *
		         * @example
		         *
		         *     var negated = x64Word.not();
		         */
		        // not: function () {
		            // var high = ~this.high;
		            // var low = ~this.low;

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Bitwise ANDs this word with the passed word.
		         *
		         * @param {X64Word} word The x64-Word to AND with this word.
		         *
		         * @return {X64Word} A new x64-Word object after ANDing.
		         *
		         * @example
		         *
		         *     var anded = x64Word.and(anotherX64Word);
		         */
		        // and: function (word) {
		            // var high = this.high & word.high;
		            // var low = this.low & word.low;

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Bitwise ORs this word with the passed word.
		         *
		         * @param {X64Word} word The x64-Word to OR with this word.
		         *
		         * @return {X64Word} A new x64-Word object after ORing.
		         *
		         * @example
		         *
		         *     var ored = x64Word.or(anotherX64Word);
		         */
		        // or: function (word) {
		            // var high = this.high | word.high;
		            // var low = this.low | word.low;

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Bitwise XORs this word with the passed word.
		         *
		         * @param {X64Word} word The x64-Word to XOR with this word.
		         *
		         * @return {X64Word} A new x64-Word object after XORing.
		         *
		         * @example
		         *
		         *     var xored = x64Word.xor(anotherX64Word);
		         */
		        // xor: function (word) {
		            // var high = this.high ^ word.high;
		            // var low = this.low ^ word.low;

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Shifts this word n bits to the left.
		         *
		         * @param {number} n The number of bits to shift.
		         *
		         * @return {X64Word} A new x64-Word object after shifting.
		         *
		         * @example
		         *
		         *     var shifted = x64Word.shiftL(25);
		         */
		        // shiftL: function (n) {
		            // if (n < 32) {
		                // var high = (this.high << n) | (this.low >>> (32 - n));
		                // var low = this.low << n;
		            // } else {
		                // var high = this.low << (n - 32);
		                // var low = 0;
		            // }

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Shifts this word n bits to the right.
		         *
		         * @param {number} n The number of bits to shift.
		         *
		         * @return {X64Word} A new x64-Word object after shifting.
		         *
		         * @example
		         *
		         *     var shifted = x64Word.shiftR(7);
		         */
		        // shiftR: function (n) {
		            // if (n < 32) {
		                // var low = (this.low >>> n) | (this.high << (32 - n));
		                // var high = this.high >>> n;
		            // } else {
		                // var low = this.high >>> (n - 32);
		                // var high = 0;
		            // }

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Rotates this word n bits to the left.
		         *
		         * @param {number} n The number of bits to rotate.
		         *
		         * @return {X64Word} A new x64-Word object after rotating.
		         *
		         * @example
		         *
		         *     var rotated = x64Word.rotL(25);
		         */
		        // rotL: function (n) {
		            // return this.shiftL(n).or(this.shiftR(64 - n));
		        // },

		        /**
		         * Rotates this word n bits to the right.
		         *
		         * @param {number} n The number of bits to rotate.
		         *
		         * @return {X64Word} A new x64-Word object after rotating.
		         *
		         * @example
		         *
		         *     var rotated = x64Word.rotR(7);
		         */
		        // rotR: function (n) {
		            // return this.shiftR(n).or(this.shiftL(64 - n));
		        // },

		        /**
		         * Adds this word with the passed word.
		         *
		         * @param {X64Word} word The x64-Word to add with this word.
		         *
		         * @return {X64Word} A new x64-Word object after adding.
		         *
		         * @example
		         *
		         *     var added = x64Word.add(anotherX64Word);
		         */
		        // add: function (word) {
		            // var low = (this.low + word.low) | 0;
		            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
		            // var high = (this.high + word.high + carry) | 0;

		            // return X64Word.create(high, low);
		        // }
		    });

		    /**
		     * An array of 64-bit words.
		     *
		     * @property {Array} words The array of CryptoJS.x64.Word objects.
		     * @property {number} sigBytes The number of significant bytes in this word array.
		     */
		    var X64WordArray = C_x64.WordArray = Base.extend({
		        /**
		         * Initializes a newly created word array.
		         *
		         * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
		         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.x64.WordArray.create();
		         *
		         *     var wordArray = CryptoJS.x64.WordArray.create([
		         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
		         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
		         *     ]);
		         *
		         *     var wordArray = CryptoJS.x64.WordArray.create([
		         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
		         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
		         *     ], 10);
		         */
		        init: function (words, sigBytes) {
		            words = this.words = words || [];

		            if (sigBytes != undefined) {
		                this.sigBytes = sigBytes;
		            } else {
		                this.sigBytes = words.length * 8;
		            }
		        },

		        /**
		         * Converts this 64-bit word array to a 32-bit word array.
		         *
		         * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
		         *
		         * @example
		         *
		         *     var x32WordArray = x64WordArray.toX32();
		         */
		        toX32: function () {
		            // Shortcuts
		            var x64Words = this.words;
		            var x64WordsLength = x64Words.length;

		            // Convert
		            var x32Words = [];
		            for (var i = 0; i < x64WordsLength; i++) {
		                var x64Word = x64Words[i];
		                x32Words.push(x64Word.high);
		                x32Words.push(x64Word.low);
		            }

		            return X32WordArray.create(x32Words, this.sigBytes);
		        },

		        /**
		         * Creates a copy of this word array.
		         *
		         * @return {X64WordArray} The clone.
		         *
		         * @example
		         *
		         *     var clone = x64WordArray.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);

		            // Clone "words" array
		            var words = clone.words = this.words.slice(0);

		            // Clone each X64Word object
		            var wordsLength = words.length;
		            for (var i = 0; i < wordsLength; i++) {
		                words[i] = words[i].clone();
		            }

		            return clone;
		        }
		    });
		}());


		return CryptoJS;

	}));
	});

	var libTypedarrays = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Check if typed arrays are supported
		    if (typeof ArrayBuffer != 'function') {
		        return;
		    }

		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;

		    // Reference original init
		    var superInit = WordArray.init;

		    // Augment WordArray.init to handle typed arrays
		    var subInit = WordArray.init = function (typedArray) {
		        // Convert buffers to uint8
		        if (typedArray instanceof ArrayBuffer) {
		            typedArray = new Uint8Array(typedArray);
		        }

		        // Convert other array views to uint8
		        if (
		            typedArray instanceof Int8Array ||
		            (typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray) ||
		            typedArray instanceof Int16Array ||
		            typedArray instanceof Uint16Array ||
		            typedArray instanceof Int32Array ||
		            typedArray instanceof Uint32Array ||
		            typedArray instanceof Float32Array ||
		            typedArray instanceof Float64Array
		        ) {
		            typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
		        }

		        // Handle Uint8Array
		        if (typedArray instanceof Uint8Array) {
		            // Shortcut
		            var typedArrayByteLength = typedArray.byteLength;

		            // Extract bytes
		            var words = [];
		            for (var i = 0; i < typedArrayByteLength; i++) {
		                words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
		            }

		            // Initialize this word array
		            superInit.call(this, words, typedArrayByteLength);
		        } else {
		            // Else call normal init
		            superInit.apply(this, arguments);
		        }
		    };

		    subInit.prototype = WordArray;
		}());


		return CryptoJS.lib.WordArray;

	}));
	});

	var encUtf16 = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var C_enc = C.enc;

		    /**
		     * UTF-16 BE encoding strategy.
		     */
		    var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
		        /**
		         * Converts a word array to a UTF-16 BE string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The UTF-16 BE string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;

		            // Convert
		            var utf16Chars = [];
		            for (var i = 0; i < sigBytes; i += 2) {
		                var codePoint = (words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff;
		                utf16Chars.push(String.fromCharCode(codePoint));
		            }

		            return utf16Chars.join('');
		        },

		        /**
		         * Converts a UTF-16 BE string to a word array.
		         *
		         * @param {string} utf16Str The UTF-16 BE string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
		         */
		        parse: function (utf16Str) {
		            // Shortcut
		            var utf16StrLength = utf16Str.length;

		            // Convert
		            var words = [];
		            for (var i = 0; i < utf16StrLength; i++) {
		                words[i >>> 1] |= utf16Str.charCodeAt(i) << (16 - (i % 2) * 16);
		            }

		            return WordArray.create(words, utf16StrLength * 2);
		        }
		    };

		    /**
		     * UTF-16 LE encoding strategy.
		     */
		    C_enc.Utf16LE = {
		        /**
		         * Converts a word array to a UTF-16 LE string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The UTF-16 LE string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;

		            // Convert
		            var utf16Chars = [];
		            for (var i = 0; i < sigBytes; i += 2) {
		                var codePoint = swapEndian((words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff);
		                utf16Chars.push(String.fromCharCode(codePoint));
		            }

		            return utf16Chars.join('');
		        },

		        /**
		         * Converts a UTF-16 LE string to a word array.
		         *
		         * @param {string} utf16Str The UTF-16 LE string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
		         */
		        parse: function (utf16Str) {
		            // Shortcut
		            var utf16StrLength = utf16Str.length;

		            // Convert
		            var words = [];
		            for (var i = 0; i < utf16StrLength; i++) {
		                words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << (16 - (i % 2) * 16));
		            }

		            return WordArray.create(words, utf16StrLength * 2);
		        }
		    };

		    function swapEndian(word) {
		        return ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);
		    }
		}());


		return CryptoJS.enc.Utf16;

	}));
	});

	var encBase64 = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var C_enc = C.enc;

		    /**
		     * Base64 encoding strategy.
		     */
		    var Base64 = C_enc.Base64 = {
		        /**
		         * Converts a word array to a Base64 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The Base64 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;
		            var map = this._map;

		            // Clamp excess bits
		            wordArray.clamp();

		            // Convert
		            var base64Chars = [];
		            for (var i = 0; i < sigBytes; i += 3) {
		                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
		                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
		                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

		                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

		                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
		                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
		                }
		            }

		            // Add padding
		            var paddingChar = map.charAt(64);
		            if (paddingChar) {
		                while (base64Chars.length % 4) {
		                    base64Chars.push(paddingChar);
		                }
		            }

		            return base64Chars.join('');
		        },

		        /**
		         * Converts a Base64 string to a word array.
		         *
		         * @param {string} base64Str The Base64 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
		         */
		        parse: function (base64Str) {
		            // Shortcuts
		            var base64StrLength = base64Str.length;
		            var map = this._map;
		            var reverseMap = this._reverseMap;

		            if (!reverseMap) {
		                    reverseMap = this._reverseMap = [];
		                    for (var j = 0; j < map.length; j++) {
		                        reverseMap[map.charCodeAt(j)] = j;
		                    }
		            }

		            // Ignore padding
		            var paddingChar = map.charAt(64);
		            if (paddingChar) {
		                var paddingIndex = base64Str.indexOf(paddingChar);
		                if (paddingIndex !== -1) {
		                    base64StrLength = paddingIndex;
		                }
		            }

		            // Convert
		            return parseLoop(base64Str, base64StrLength, reverseMap);

		        },

		        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
		    };

		    function parseLoop(base64Str, base64StrLength, reverseMap) {
		      var words = [];
		      var nBytes = 0;
		      for (var i = 0; i < base64StrLength; i++) {
		          if (i % 4) {
		              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
		              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
		              words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);
		              nBytes++;
		          }
		      }
		      return WordArray.create(words, nBytes);
		    }
		}());


		return CryptoJS.enc.Base64;

	}));
	});

	var md5 = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_algo = C.algo;

		    // Constants table
		    var T = [];

		    // Compute constants
		    (function () {
		        for (var i = 0; i < 64; i++) {
		            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
		        }
		    }());

		    /**
		     * MD5 hash algorithm.
		     */
		    var MD5 = C_algo.MD5 = Hasher.extend({
		        _doReset: function () {
		            this._hash = new WordArray.init([
		                0x67452301, 0xefcdab89,
		                0x98badcfe, 0x10325476
		            ]);
		        },

		        _doProcessBlock: function (M, offset) {
		            // Swap endian
		            for (var i = 0; i < 16; i++) {
		                // Shortcuts
		                var offset_i = offset + i;
		                var M_offset_i = M[offset_i];

		                M[offset_i] = (
		                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
		                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
		                );
		            }

		            // Shortcuts
		            var H = this._hash.words;

		            var M_offset_0  = M[offset + 0];
		            var M_offset_1  = M[offset + 1];
		            var M_offset_2  = M[offset + 2];
		            var M_offset_3  = M[offset + 3];
		            var M_offset_4  = M[offset + 4];
		            var M_offset_5  = M[offset + 5];
		            var M_offset_6  = M[offset + 6];
		            var M_offset_7  = M[offset + 7];
		            var M_offset_8  = M[offset + 8];
		            var M_offset_9  = M[offset + 9];
		            var M_offset_10 = M[offset + 10];
		            var M_offset_11 = M[offset + 11];
		            var M_offset_12 = M[offset + 12];
		            var M_offset_13 = M[offset + 13];
		            var M_offset_14 = M[offset + 14];
		            var M_offset_15 = M[offset + 15];

		            // Working varialbes
		            var a = H[0];
		            var b = H[1];
		            var c = H[2];
		            var d = H[3];

		            // Computation
		            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
		            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
		            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
		            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
		            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
		            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
		            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
		            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
		            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
		            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
		            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
		            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
		            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
		            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
		            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
		            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

		            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
		            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
		            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
		            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
		            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
		            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
		            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
		            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
		            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
		            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
		            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
		            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
		            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
		            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
		            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
		            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

		            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
		            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
		            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
		            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
		            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
		            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
		            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
		            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
		            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
		            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
		            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
		            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
		            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
		            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
		            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
		            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

		            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
		            d = II(d, a, b, c, M_offset_7,  10, T[49]);
		            c = II(c, d, a, b, M_offset_14, 15, T[50]);
		            b = II(b, c, d, a, M_offset_5,  21, T[51]);
		            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
		            d = II(d, a, b, c, M_offset_3,  10, T[53]);
		            c = II(c, d, a, b, M_offset_10, 15, T[54]);
		            b = II(b, c, d, a, M_offset_1,  21, T[55]);
		            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
		            d = II(d, a, b, c, M_offset_15, 10, T[57]);
		            c = II(c, d, a, b, M_offset_6,  15, T[58]);
		            b = II(b, c, d, a, M_offset_13, 21, T[59]);
		            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
		            d = II(d, a, b, c, M_offset_11, 10, T[61]);
		            c = II(c, d, a, b, M_offset_2,  15, T[62]);
		            b = II(b, c, d, a, M_offset_9,  21, T[63]);

		            // Intermediate hash value
		            H[0] = (H[0] + a) | 0;
		            H[1] = (H[1] + b) | 0;
		            H[2] = (H[2] + c) | 0;
		            H[3] = (H[3] + d) | 0;
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;

		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

		            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
		            var nBitsTotalL = nBitsTotal;
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
		                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
		            );
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
		                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
		            );

		            data.sigBytes = (dataWords.length + 1) * 4;

		            // Hash final blocks
		            this._process();

		            // Shortcuts
		            var hash = this._hash;
		            var H = hash.words;

		            // Swap endian
		            for (var i = 0; i < 4; i++) {
		                // Shortcut
		                var H_i = H[i];

		                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
		                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
		            }

		            // Return final computed hash
		            return hash;
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();

		            return clone;
		        }
		    });

		    function FF(a, b, c, d, x, s, t) {
		        var n = a + ((b & c) | (~b & d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function GG(a, b, c, d, x, s, t) {
		        var n = a + ((b & d) | (c & ~d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function HH(a, b, c, d, x, s, t) {
		        var n = a + (b ^ c ^ d) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function II(a, b, c, d, x, s, t) {
		        var n = a + (c ^ (b | ~d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.MD5('message');
		     *     var hash = CryptoJS.MD5(wordArray);
		     */
		    C.MD5 = Hasher._createHelper(MD5);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacMD5(message, key);
		     */
		    C.HmacMD5 = Hasher._createHmacHelper(MD5);
		}(Math));


		return CryptoJS.MD5;

	}));
	});

	var sha1 = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_algo = C.algo;

		    // Reusable object
		    var W = [];

		    /**
		     * SHA-1 hash algorithm.
		     */
		    var SHA1 = C_algo.SHA1 = Hasher.extend({
		        _doReset: function () {
		            this._hash = new WordArray.init([
		                0x67452301, 0xefcdab89,
		                0x98badcfe, 0x10325476,
		                0xc3d2e1f0
		            ]);
		        },

		        _doProcessBlock: function (M, offset) {
		            // Shortcut
		            var H = this._hash.words;

		            // Working variables
		            var a = H[0];
		            var b = H[1];
		            var c = H[2];
		            var d = H[3];
		            var e = H[4];

		            // Computation
		            for (var i = 0; i < 80; i++) {
		                if (i < 16) {
		                    W[i] = M[offset + i] | 0;
		                } else {
		                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
		                    W[i] = (n << 1) | (n >>> 31);
		                }

		                var t = ((a << 5) | (a >>> 27)) + e + W[i];
		                if (i < 20) {
		                    t += ((b & c) | (~b & d)) + 0x5a827999;
		                } else if (i < 40) {
		                    t += (b ^ c ^ d) + 0x6ed9eba1;
		                } else if (i < 60) {
		                    t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
		                } else /* if (i < 80) */ {
		                    t += (b ^ c ^ d) - 0x359d3e2a;
		                }

		                e = d;
		                d = c;
		                c = (b << 30) | (b >>> 2);
		                b = a;
		                a = t;
		            }

		            // Intermediate hash value
		            H[0] = (H[0] + a) | 0;
		            H[1] = (H[1] + b) | 0;
		            H[2] = (H[2] + c) | 0;
		            H[3] = (H[3] + d) | 0;
		            H[4] = (H[4] + e) | 0;
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;

		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
		            data.sigBytes = dataWords.length * 4;

		            // Hash final blocks
		            this._process();

		            // Return final computed hash
		            return this._hash;
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();

		            return clone;
		        }
		    });

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA1('message');
		     *     var hash = CryptoJS.SHA1(wordArray);
		     */
		    C.SHA1 = Hasher._createHelper(SHA1);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA1(message, key);
		     */
		    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
		}());


		return CryptoJS.SHA1;

	}));
	});

	var sha256 = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_algo = C.algo;

		    // Initialization and round constants tables
		    var H = [];
		    var K = [];

		    // Compute constants
		    (function () {
		        function isPrime(n) {
		            var sqrtN = Math.sqrt(n);
		            for (var factor = 2; factor <= sqrtN; factor++) {
		                if (!(n % factor)) {
		                    return false;
		                }
		            }

		            return true;
		        }

		        function getFractionalBits(n) {
		            return ((n - (n | 0)) * 0x100000000) | 0;
		        }

		        var n = 2;
		        var nPrime = 0;
		        while (nPrime < 64) {
		            if (isPrime(n)) {
		                if (nPrime < 8) {
		                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
		                }
		                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

		                nPrime++;
		            }

		            n++;
		        }
		    }());

		    // Reusable object
		    var W = [];

		    /**
		     * SHA-256 hash algorithm.
		     */
		    var SHA256 = C_algo.SHA256 = Hasher.extend({
		        _doReset: function () {
		            this._hash = new WordArray.init(H.slice(0));
		        },

		        _doProcessBlock: function (M, offset) {
		            // Shortcut
		            var H = this._hash.words;

		            // Working variables
		            var a = H[0];
		            var b = H[1];
		            var c = H[2];
		            var d = H[3];
		            var e = H[4];
		            var f = H[5];
		            var g = H[6];
		            var h = H[7];

		            // Computation
		            for (var i = 0; i < 64; i++) {
		                if (i < 16) {
		                    W[i] = M[offset + i] | 0;
		                } else {
		                    var gamma0x = W[i - 15];
		                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
		                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
		                                   (gamma0x >>> 3);

		                    var gamma1x = W[i - 2];
		                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
		                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
		                                   (gamma1x >>> 10);

		                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
		                }

		                var ch  = (e & f) ^ (~e & g);
		                var maj = (a & b) ^ (a & c) ^ (b & c);

		                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
		                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

		                var t1 = h + sigma1 + ch + K[i] + W[i];
		                var t2 = sigma0 + maj;

		                h = g;
		                g = f;
		                f = e;
		                e = (d + t1) | 0;
		                d = c;
		                c = b;
		                b = a;
		                a = (t1 + t2) | 0;
		            }

		            // Intermediate hash value
		            H[0] = (H[0] + a) | 0;
		            H[1] = (H[1] + b) | 0;
		            H[2] = (H[2] + c) | 0;
		            H[3] = (H[3] + d) | 0;
		            H[4] = (H[4] + e) | 0;
		            H[5] = (H[5] + f) | 0;
		            H[6] = (H[6] + g) | 0;
		            H[7] = (H[7] + h) | 0;
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;

		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
		            data.sigBytes = dataWords.length * 4;

		            // Hash final blocks
		            this._process();

		            // Return final computed hash
		            return this._hash;
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();

		            return clone;
		        }
		    });

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA256('message');
		     *     var hash = CryptoJS.SHA256(wordArray);
		     */
		    C.SHA256 = Hasher._createHelper(SHA256);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA256(message, key);
		     */
		    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
		}(Math));


		return CryptoJS.SHA256;

	}));
	});

	var sha224 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, sha256);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var C_algo = C.algo;
		    var SHA256 = C_algo.SHA256;

		    /**
		     * SHA-224 hash algorithm.
		     */
		    var SHA224 = C_algo.SHA224 = SHA256.extend({
		        _doReset: function () {
		            this._hash = new WordArray.init([
		                0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
		                0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
		            ]);
		        },

		        _doFinalize: function () {
		            var hash = SHA256._doFinalize.call(this);

		            hash.sigBytes -= 4;

		            return hash;
		        }
		    });

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA224('message');
		     *     var hash = CryptoJS.SHA224(wordArray);
		     */
		    C.SHA224 = SHA256._createHelper(SHA224);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA224(message, key);
		     */
		    C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
		}());


		return CryptoJS.SHA224;

	}));
	});

	var sha512 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, x64Core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Hasher = C_lib.Hasher;
		    var C_x64 = C.x64;
		    var X64Word = C_x64.Word;
		    var X64WordArray = C_x64.WordArray;
		    var C_algo = C.algo;

		    function X64Word_create() {
		        return X64Word.create.apply(X64Word, arguments);
		    }

		    // Constants
		    var K = [
		        X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd),
		        X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc),
		        X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019),
		        X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118),
		        X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe),
		        X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2),
		        X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1),
		        X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694),
		        X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3),
		        X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65),
		        X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483),
		        X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5),
		        X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210),
		        X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4),
		        X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725),
		        X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70),
		        X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926),
		        X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df),
		        X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8),
		        X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b),
		        X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001),
		        X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30),
		        X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910),
		        X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8),
		        X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53),
		        X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8),
		        X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb),
		        X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3),
		        X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60),
		        X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec),
		        X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9),
		        X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b),
		        X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207),
		        X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178),
		        X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6),
		        X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b),
		        X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493),
		        X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c),
		        X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a),
		        X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)
		    ];

		    // Reusable objects
		    var W = [];
		    (function () {
		        for (var i = 0; i < 80; i++) {
		            W[i] = X64Word_create();
		        }
		    }());

		    /**
		     * SHA-512 hash algorithm.
		     */
		    var SHA512 = C_algo.SHA512 = Hasher.extend({
		        _doReset: function () {
		            this._hash = new X64WordArray.init([
		                new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b),
		                new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1),
		                new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f),
		                new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)
		            ]);
		        },

		        _doProcessBlock: function (M, offset) {
		            // Shortcuts
		            var H = this._hash.words;

		            var H0 = H[0];
		            var H1 = H[1];
		            var H2 = H[2];
		            var H3 = H[3];
		            var H4 = H[4];
		            var H5 = H[5];
		            var H6 = H[6];
		            var H7 = H[7];

		            var H0h = H0.high;
		            var H0l = H0.low;
		            var H1h = H1.high;
		            var H1l = H1.low;
		            var H2h = H2.high;
		            var H2l = H2.low;
		            var H3h = H3.high;
		            var H3l = H3.low;
		            var H4h = H4.high;
		            var H4l = H4.low;
		            var H5h = H5.high;
		            var H5l = H5.low;
		            var H6h = H6.high;
		            var H6l = H6.low;
		            var H7h = H7.high;
		            var H7l = H7.low;

		            // Working variables
		            var ah = H0h;
		            var al = H0l;
		            var bh = H1h;
		            var bl = H1l;
		            var ch = H2h;
		            var cl = H2l;
		            var dh = H3h;
		            var dl = H3l;
		            var eh = H4h;
		            var el = H4l;
		            var fh = H5h;
		            var fl = H5l;
		            var gh = H6h;
		            var gl = H6l;
		            var hh = H7h;
		            var hl = H7l;

		            // Rounds
		            for (var i = 0; i < 80; i++) {
		                // Shortcut
		                var Wi = W[i];

		                // Extend message
		                if (i < 16) {
		                    var Wih = Wi.high = M[offset + i * 2]     | 0;
		                    var Wil = Wi.low  = M[offset + i * 2 + 1] | 0;
		                } else {
		                    // Gamma0
		                    var gamma0x  = W[i - 15];
		                    var gamma0xh = gamma0x.high;
		                    var gamma0xl = gamma0x.low;
		                    var gamma0h  = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
		                    var gamma0l  = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));

		                    // Gamma1
		                    var gamma1x  = W[i - 2];
		                    var gamma1xh = gamma1x.high;
		                    var gamma1xl = gamma1x.low;
		                    var gamma1h  = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
		                    var gamma1l  = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));

		                    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
		                    var Wi7  = W[i - 7];
		                    var Wi7h = Wi7.high;
		                    var Wi7l = Wi7.low;

		                    var Wi16  = W[i - 16];
		                    var Wi16h = Wi16.high;
		                    var Wi16l = Wi16.low;

		                    var Wil = gamma0l + Wi7l;
		                    var Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
		                    var Wil = Wil + gamma1l;
		                    var Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
		                    var Wil = Wil + Wi16l;
		                    var Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);

		                    Wi.high = Wih;
		                    Wi.low  = Wil;
		                }

		                var chh  = (eh & fh) ^ (~eh & gh);
		                var chl  = (el & fl) ^ (~el & gl);
		                var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
		                var majl = (al & bl) ^ (al & cl) ^ (bl & cl);

		                var sigma0h = ((ah >>> 28) | (al << 4))  ^ ((ah << 30)  | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
		                var sigma0l = ((al >>> 28) | (ah << 4))  ^ ((al << 30)  | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
		                var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
		                var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));

		                // t1 = h + sigma1 + ch + K[i] + W[i]
		                var Ki  = K[i];
		                var Kih = Ki.high;
		                var Kil = Ki.low;

		                var t1l = hl + sigma1l;
		                var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
		                var t1l = t1l + chl;
		                var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
		                var t1l = t1l + Kil;
		                var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
		                var t1l = t1l + Wil;
		                var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);

		                // t2 = sigma0 + maj
		                var t2l = sigma0l + majl;
		                var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);

		                // Update working variables
		                hh = gh;
		                hl = gl;
		                gh = fh;
		                gl = fl;
		                fh = eh;
		                fl = el;
		                el = (dl + t1l) | 0;
		                eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
		                dh = ch;
		                dl = cl;
		                ch = bh;
		                cl = bl;
		                bh = ah;
		                bl = al;
		                al = (t1l + t2l) | 0;
		                ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
		            }

		            // Intermediate hash value
		            H0l = H0.low  = (H0l + al);
		            H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
		            H1l = H1.low  = (H1l + bl);
		            H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
		            H2l = H2.low  = (H2l + cl);
		            H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
		            H3l = H3.low  = (H3l + dl);
		            H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
		            H4l = H4.low  = (H4l + el);
		            H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
		            H5l = H5.low  = (H5l + fl);
		            H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
		            H6l = H6.low  = (H6l + gl);
		            H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
		            H7l = H7.low  = (H7l + hl);
		            H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;

		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
		            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
		            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
		            data.sigBytes = dataWords.length * 4;

		            // Hash final blocks
		            this._process();

		            // Convert hash to 32-bit word array before returning
		            var hash = this._hash.toX32();

		            // Return final computed hash
		            return hash;
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();

		            return clone;
		        },

		        blockSize: 1024/32
		    });

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA512('message');
		     *     var hash = CryptoJS.SHA512(wordArray);
		     */
		    C.SHA512 = Hasher._createHelper(SHA512);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA512(message, key);
		     */
		    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
		}());


		return CryptoJS.SHA512;

	}));
	});

	var sha384 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, x64Core, sha512);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_x64 = C.x64;
		    var X64Word = C_x64.Word;
		    var X64WordArray = C_x64.WordArray;
		    var C_algo = C.algo;
		    var SHA512 = C_algo.SHA512;

		    /**
		     * SHA-384 hash algorithm.
		     */
		    var SHA384 = C_algo.SHA384 = SHA512.extend({
		        _doReset: function () {
		            this._hash = new X64WordArray.init([
		                new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507),
		                new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939),
		                new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511),
		                new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)
		            ]);
		        },

		        _doFinalize: function () {
		            var hash = SHA512._doFinalize.call(this);

		            hash.sigBytes -= 16;

		            return hash;
		        }
		    });

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA384('message');
		     *     var hash = CryptoJS.SHA384(wordArray);
		     */
		    C.SHA384 = SHA512._createHelper(SHA384);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA384(message, key);
		     */
		    C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
		}());


		return CryptoJS.SHA384;

	}));
	});

	var sha3 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, x64Core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_x64 = C.x64;
		    var X64Word = C_x64.Word;
		    var C_algo = C.algo;

		    // Constants tables
		    var RHO_OFFSETS = [];
		    var PI_INDEXES  = [];
		    var ROUND_CONSTANTS = [];

		    // Compute Constants
		    (function () {
		        // Compute rho offset constants
		        var x = 1, y = 0;
		        for (var t = 0; t < 24; t++) {
		            RHO_OFFSETS[x + 5 * y] = ((t + 1) * (t + 2) / 2) % 64;

		            var newX = y % 5;
		            var newY = (2 * x + 3 * y) % 5;
		            x = newX;
		            y = newY;
		        }

		        // Compute pi index constants
		        for (var x = 0; x < 5; x++) {
		            for (var y = 0; y < 5; y++) {
		                PI_INDEXES[x + 5 * y] = y + ((2 * x + 3 * y) % 5) * 5;
		            }
		        }

		        // Compute round constants
		        var LFSR = 0x01;
		        for (var i = 0; i < 24; i++) {
		            var roundConstantMsw = 0;
		            var roundConstantLsw = 0;

		            for (var j = 0; j < 7; j++) {
		                if (LFSR & 0x01) {
		                    var bitPosition = (1 << j) - 1;
		                    if (bitPosition < 32) {
		                        roundConstantLsw ^= 1 << bitPosition;
		                    } else /* if (bitPosition >= 32) */ {
		                        roundConstantMsw ^= 1 << (bitPosition - 32);
		                    }
		                }

		                // Compute next LFSR
		                if (LFSR & 0x80) {
		                    // Primitive polynomial over GF(2): x^8 + x^6 + x^5 + x^4 + 1
		                    LFSR = (LFSR << 1) ^ 0x71;
		                } else {
		                    LFSR <<= 1;
		                }
		            }

		            ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
		        }
		    }());

		    // Reusable objects for temporary values
		    var T = [];
		    (function () {
		        for (var i = 0; i < 25; i++) {
		            T[i] = X64Word.create();
		        }
		    }());

		    /**
		     * SHA-3 hash algorithm.
		     */
		    var SHA3 = C_algo.SHA3 = Hasher.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {number} outputLength
		         *   The desired number of bits in the output hash.
		         *   Only values permitted are: 224, 256, 384, 512.
		         *   Default: 512
		         */
		        cfg: Hasher.cfg.extend({
		            outputLength: 512
		        }),

		        _doReset: function () {
		            var state = this._state = [];
		            for (var i = 0; i < 25; i++) {
		                state[i] = new X64Word.init();
		            }

		            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
		        },

		        _doProcessBlock: function (M, offset) {
		            // Shortcuts
		            var state = this._state;
		            var nBlockSizeLanes = this.blockSize / 2;

		            // Absorb
		            for (var i = 0; i < nBlockSizeLanes; i++) {
		                // Shortcuts
		                var M2i  = M[offset + 2 * i];
		                var M2i1 = M[offset + 2 * i + 1];

		                // Swap endian
		                M2i = (
		                    (((M2i << 8)  | (M2i >>> 24)) & 0x00ff00ff) |
		                    (((M2i << 24) | (M2i >>> 8))  & 0xff00ff00)
		                );
		                M2i1 = (
		                    (((M2i1 << 8)  | (M2i1 >>> 24)) & 0x00ff00ff) |
		                    (((M2i1 << 24) | (M2i1 >>> 8))  & 0xff00ff00)
		                );

		                // Absorb message into state
		                var lane = state[i];
		                lane.high ^= M2i1;
		                lane.low  ^= M2i;
		            }

		            // Rounds
		            for (var round = 0; round < 24; round++) {
		                // Theta
		                for (var x = 0; x < 5; x++) {
		                    // Mix column lanes
		                    var tMsw = 0, tLsw = 0;
		                    for (var y = 0; y < 5; y++) {
		                        var lane = state[x + 5 * y];
		                        tMsw ^= lane.high;
		                        tLsw ^= lane.low;
		                    }

		                    // Temporary values
		                    var Tx = T[x];
		                    Tx.high = tMsw;
		                    Tx.low  = tLsw;
		                }
		                for (var x = 0; x < 5; x++) {
		                    // Shortcuts
		                    var Tx4 = T[(x + 4) % 5];
		                    var Tx1 = T[(x + 1) % 5];
		                    var Tx1Msw = Tx1.high;
		                    var Tx1Lsw = Tx1.low;

		                    // Mix surrounding columns
		                    var tMsw = Tx4.high ^ ((Tx1Msw << 1) | (Tx1Lsw >>> 31));
		                    var tLsw = Tx4.low  ^ ((Tx1Lsw << 1) | (Tx1Msw >>> 31));
		                    for (var y = 0; y < 5; y++) {
		                        var lane = state[x + 5 * y];
		                        lane.high ^= tMsw;
		                        lane.low  ^= tLsw;
		                    }
		                }

		                // Rho Pi
		                for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
		                    // Shortcuts
		                    var lane = state[laneIndex];
		                    var laneMsw = lane.high;
		                    var laneLsw = lane.low;
		                    var rhoOffset = RHO_OFFSETS[laneIndex];

		                    // Rotate lanes
		                    if (rhoOffset < 32) {
		                        var tMsw = (laneMsw << rhoOffset) | (laneLsw >>> (32 - rhoOffset));
		                        var tLsw = (laneLsw << rhoOffset) | (laneMsw >>> (32 - rhoOffset));
		                    } else /* if (rhoOffset >= 32) */ {
		                        var tMsw = (laneLsw << (rhoOffset - 32)) | (laneMsw >>> (64 - rhoOffset));
		                        var tLsw = (laneMsw << (rhoOffset - 32)) | (laneLsw >>> (64 - rhoOffset));
		                    }

		                    // Transpose lanes
		                    var TPiLane = T[PI_INDEXES[laneIndex]];
		                    TPiLane.high = tMsw;
		                    TPiLane.low  = tLsw;
		                }

		                // Rho pi at x = y = 0
		                var T0 = T[0];
		                var state0 = state[0];
		                T0.high = state0.high;
		                T0.low  = state0.low;

		                // Chi
		                for (var x = 0; x < 5; x++) {
		                    for (var y = 0; y < 5; y++) {
		                        // Shortcuts
		                        var laneIndex = x + 5 * y;
		                        var lane = state[laneIndex];
		                        var TLane = T[laneIndex];
		                        var Tx1Lane = T[((x + 1) % 5) + 5 * y];
		                        var Tx2Lane = T[((x + 2) % 5) + 5 * y];

		                        // Mix rows
		                        lane.high = TLane.high ^ (~Tx1Lane.high & Tx2Lane.high);
		                        lane.low  = TLane.low  ^ (~Tx1Lane.low  & Tx2Lane.low);
		                    }
		                }

		                // Iota
		                var lane = state[0];
		                var roundConstant = ROUND_CONSTANTS[round];
		                lane.high ^= roundConstant.high;
		                lane.low  ^= roundConstant.low;	            }
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;
		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;
		            var blockSizeBits = this.blockSize * 32;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x1 << (24 - nBitsLeft % 32);
		            dataWords[((Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits) >>> 5) - 1] |= 0x80;
		            data.sigBytes = dataWords.length * 4;

		            // Hash final blocks
		            this._process();

		            // Shortcuts
		            var state = this._state;
		            var outputLengthBytes = this.cfg.outputLength / 8;
		            var outputLengthLanes = outputLengthBytes / 8;

		            // Squeeze
		            var hashWords = [];
		            for (var i = 0; i < outputLengthLanes; i++) {
		                // Shortcuts
		                var lane = state[i];
		                var laneMsw = lane.high;
		                var laneLsw = lane.low;

		                // Swap endian
		                laneMsw = (
		                    (((laneMsw << 8)  | (laneMsw >>> 24)) & 0x00ff00ff) |
		                    (((laneMsw << 24) | (laneMsw >>> 8))  & 0xff00ff00)
		                );
		                laneLsw = (
		                    (((laneLsw << 8)  | (laneLsw >>> 24)) & 0x00ff00ff) |
		                    (((laneLsw << 24) | (laneLsw >>> 8))  & 0xff00ff00)
		                );

		                // Squeeze state to retrieve hash
		                hashWords.push(laneLsw);
		                hashWords.push(laneMsw);
		            }

		            // Return final computed hash
		            return new WordArray.init(hashWords, outputLengthBytes);
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);

		            var state = clone._state = this._state.slice(0);
		            for (var i = 0; i < 25; i++) {
		                state[i] = state[i].clone();
		            }

		            return clone;
		        }
		    });

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA3('message');
		     *     var hash = CryptoJS.SHA3(wordArray);
		     */
		    C.SHA3 = Hasher._createHelper(SHA3);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA3(message, key);
		     */
		    C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
		}(Math));


		return CryptoJS.SHA3;

	}));
	});

	var ripemd160 = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/** @preserve
		(c) 2012 by Cédric Mesnil. All rights reserved.

		Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

		    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
		    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

		THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
		*/

		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_algo = C.algo;

		    // Constants table
		    var _zl = WordArray.create([
		        0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
		        7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
		        3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
		        1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
		        4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13]);
		    var _zr = WordArray.create([
		        5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
		        6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
		        15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
		        8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
		        12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11]);
		    var _sl = WordArray.create([
		         11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
		        7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
		        11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
		          11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
		        9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ]);
		    var _sr = WordArray.create([
		        8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
		        9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
		        9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
		        15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
		        8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ]);

		    var _hl =  WordArray.create([ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);
		    var _hr =  WordArray.create([ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);

		    /**
		     * RIPEMD160 hash algorithm.
		     */
		    var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
		        _doReset: function () {
		            this._hash  = WordArray.create([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
		        },

		        _doProcessBlock: function (M, offset) {

		            // Swap endian
		            for (var i = 0; i < 16; i++) {
		                // Shortcuts
		                var offset_i = offset + i;
		                var M_offset_i = M[offset_i];

		                // Swap
		                M[offset_i] = (
		                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
		                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
		                );
		            }
		            // Shortcut
		            var H  = this._hash.words;
		            var hl = _hl.words;
		            var hr = _hr.words;
		            var zl = _zl.words;
		            var zr = _zr.words;
		            var sl = _sl.words;
		            var sr = _sr.words;

		            // Working variables
		            var al, bl, cl, dl, el;
		            var ar, br, cr, dr, er;

		            ar = al = H[0];
		            br = bl = H[1];
		            cr = cl = H[2];
		            dr = dl = H[3];
		            er = el = H[4];
		            // Computation
		            var t;
		            for (var i = 0; i < 80; i += 1) {
		                t = (al +  M[offset+zl[i]])|0;
		                if (i<16){
			            t +=  f1(bl,cl,dl) + hl[0];
		                } else if (i<32) {
			            t +=  f2(bl,cl,dl) + hl[1];
		                } else if (i<48) {
			            t +=  f3(bl,cl,dl) + hl[2];
		                } else if (i<64) {
			            t +=  f4(bl,cl,dl) + hl[3];
		                } else {// if (i<80) {
			            t +=  f5(bl,cl,dl) + hl[4];
		                }
		                t = t|0;
		                t =  rotl(t,sl[i]);
		                t = (t+el)|0;
		                al = el;
		                el = dl;
		                dl = rotl(cl, 10);
		                cl = bl;
		                bl = t;

		                t = (ar + M[offset+zr[i]])|0;
		                if (i<16){
			            t +=  f5(br,cr,dr) + hr[0];
		                } else if (i<32) {
			            t +=  f4(br,cr,dr) + hr[1];
		                } else if (i<48) {
			            t +=  f3(br,cr,dr) + hr[2];
		                } else if (i<64) {
			            t +=  f2(br,cr,dr) + hr[3];
		                } else {// if (i<80) {
			            t +=  f1(br,cr,dr) + hr[4];
		                }
		                t = t|0;
		                t =  rotl(t,sr[i]) ;
		                t = (t+er)|0;
		                ar = er;
		                er = dr;
		                dr = rotl(cr, 10);
		                cr = br;
		                br = t;
		            }
		            // Intermediate hash value
		            t    = (H[1] + cl + dr)|0;
		            H[1] = (H[2] + dl + er)|0;
		            H[2] = (H[3] + el + ar)|0;
		            H[3] = (H[4] + al + br)|0;
		            H[4] = (H[0] + bl + cr)|0;
		            H[0] =  t;
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;

		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
		                (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
		            );
		            data.sigBytes = (dataWords.length + 1) * 4;

		            // Hash final blocks
		            this._process();

		            // Shortcuts
		            var hash = this._hash;
		            var H = hash.words;

		            // Swap endian
		            for (var i = 0; i < 5; i++) {
		                // Shortcut
		                var H_i = H[i];

		                // Swap
		                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
		                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
		            }

		            // Return final computed hash
		            return hash;
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();

		            return clone;
		        }
		    });


		    function f1(x, y, z) {
		        return ((x) ^ (y) ^ (z));

		    }

		    function f2(x, y, z) {
		        return (((x)&(y)) | ((~x)&(z)));
		    }

		    function f3(x, y, z) {
		        return (((x) | (~(y))) ^ (z));
		    }

		    function f4(x, y, z) {
		        return (((x) & (z)) | ((y)&(~(z))));
		    }

		    function f5(x, y, z) {
		        return ((x) ^ ((y) |(~(z))));

		    }

		    function rotl(x,n) {
		        return (x<<n) | (x>>>(32-n));
		    }


		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.RIPEMD160('message');
		     *     var hash = CryptoJS.RIPEMD160(wordArray);
		     */
		    C.RIPEMD160 = Hasher._createHelper(RIPEMD160);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacRIPEMD160(message, key);
		     */
		    C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
		}(Math));


		return CryptoJS.RIPEMD160;

	}));
	});

	var hmac = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Base = C_lib.Base;
		    var C_enc = C.enc;
		    var Utf8 = C_enc.Utf8;
		    var C_algo = C.algo;

		    /**
		     * HMAC algorithm.
		     */
		    var HMAC = C_algo.HMAC = Base.extend({
		        /**
		         * Initializes a newly created HMAC.
		         *
		         * @param {Hasher} hasher The hash algorithm to use.
		         * @param {WordArray|string} key The secret key.
		         *
		         * @example
		         *
		         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
		         */
		        init: function (hasher, key) {
		            // Init hasher
		            hasher = this._hasher = new hasher.init();

		            // Convert string to WordArray, else assume WordArray already
		            if (typeof key == 'string') {
		                key = Utf8.parse(key);
		            }

		            // Shortcuts
		            var hasherBlockSize = hasher.blockSize;
		            var hasherBlockSizeBytes = hasherBlockSize * 4;

		            // Allow arbitrary length keys
		            if (key.sigBytes > hasherBlockSizeBytes) {
		                key = hasher.finalize(key);
		            }

		            // Clamp excess bits
		            key.clamp();

		            // Clone key for inner and outer pads
		            var oKey = this._oKey = key.clone();
		            var iKey = this._iKey = key.clone();

		            // Shortcuts
		            var oKeyWords = oKey.words;
		            var iKeyWords = iKey.words;

		            // XOR keys with pad constants
		            for (var i = 0; i < hasherBlockSize; i++) {
		                oKeyWords[i] ^= 0x5c5c5c5c;
		                iKeyWords[i] ^= 0x36363636;
		            }
		            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

		            // Set initial values
		            this.reset();
		        },

		        /**
		         * Resets this HMAC to its initial state.
		         *
		         * @example
		         *
		         *     hmacHasher.reset();
		         */
		        reset: function () {
		            // Shortcut
		            var hasher = this._hasher;

		            // Reset
		            hasher.reset();
		            hasher.update(this._iKey);
		        },

		        /**
		         * Updates this HMAC with a message.
		         *
		         * @param {WordArray|string} messageUpdate The message to append.
		         *
		         * @return {HMAC} This HMAC instance.
		         *
		         * @example
		         *
		         *     hmacHasher.update('message');
		         *     hmacHasher.update(wordArray);
		         */
		        update: function (messageUpdate) {
		            this._hasher.update(messageUpdate);

		            // Chainable
		            return this;
		        },

		        /**
		         * Finalizes the HMAC computation.
		         * Note that the finalize operation is effectively a destructive, read-once operation.
		         *
		         * @param {WordArray|string} messageUpdate (Optional) A final message update.
		         *
		         * @return {WordArray} The HMAC.
		         *
		         * @example
		         *
		         *     var hmac = hmacHasher.finalize();
		         *     var hmac = hmacHasher.finalize('message');
		         *     var hmac = hmacHasher.finalize(wordArray);
		         */
		        finalize: function (messageUpdate) {
		            // Shortcut
		            var hasher = this._hasher;

		            // Compute HMAC
		            var innerHash = hasher.finalize(messageUpdate);
		            hasher.reset();
		            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

		            return hmac;
		        }
		    });
		}());


	}));
	});

	var pbkdf2 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, sha1, hmac);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Base = C_lib.Base;
		    var WordArray = C_lib.WordArray;
		    var C_algo = C.algo;
		    var SHA1 = C_algo.SHA1;
		    var HMAC = C_algo.HMAC;

		    /**
		     * Password-Based Key Derivation Function 2 algorithm.
		     */
		    var PBKDF2 = C_algo.PBKDF2 = Base.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
		         * @property {Hasher} hasher The hasher to use. Default: SHA1
		         * @property {number} iterations The number of iterations to perform. Default: 1
		         */
		        cfg: Base.extend({
		            keySize: 128/32,
		            hasher: SHA1,
		            iterations: 1
		        }),

		        /**
		         * Initializes a newly created key derivation function.
		         *
		         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
		         *
		         * @example
		         *
		         *     var kdf = CryptoJS.algo.PBKDF2.create();
		         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
		         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
		         */
		        init: function (cfg) {
		            this.cfg = this.cfg.extend(cfg);
		        },

		        /**
		         * Computes the Password-Based Key Derivation Function 2.
		         *
		         * @param {WordArray|string} password The password.
		         * @param {WordArray|string} salt A salt.
		         *
		         * @return {WordArray} The derived key.
		         *
		         * @example
		         *
		         *     var key = kdf.compute(password, salt);
		         */
		        compute: function (password, salt) {
		            // Shortcut
		            var cfg = this.cfg;

		            // Init HMAC
		            var hmac$$1 = HMAC.create(cfg.hasher, password);

		            // Initial values
		            var derivedKey = WordArray.create();
		            var blockIndex = WordArray.create([0x00000001]);

		            // Shortcuts
		            var derivedKeyWords = derivedKey.words;
		            var blockIndexWords = blockIndex.words;
		            var keySize = cfg.keySize;
		            var iterations = cfg.iterations;

		            // Generate key
		            while (derivedKeyWords.length < keySize) {
		                var block = hmac$$1.update(salt).finalize(blockIndex);
		                hmac$$1.reset();

		                // Shortcuts
		                var blockWords = block.words;
		                var blockWordsLength = blockWords.length;

		                // Iterations
		                var intermediate = block;
		                for (var i = 1; i < iterations; i++) {
		                    intermediate = hmac$$1.finalize(intermediate);
		                    hmac$$1.reset();

		                    // Shortcut
		                    var intermediateWords = intermediate.words;

		                    // XOR intermediate with block
		                    for (var j = 0; j < blockWordsLength; j++) {
		                        blockWords[j] ^= intermediateWords[j];
		                    }
		                }

		                derivedKey.concat(block);
		                blockIndexWords[0]++;
		            }
		            derivedKey.sigBytes = keySize * 4;

		            return derivedKey;
		        }
		    });

		    /**
		     * Computes the Password-Based Key Derivation Function 2.
		     *
		     * @param {WordArray|string} password The password.
		     * @param {WordArray|string} salt A salt.
		     * @param {Object} cfg (Optional) The configuration options to use for this computation.
		     *
		     * @return {WordArray} The derived key.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var key = CryptoJS.PBKDF2(password, salt);
		     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
		     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
		     */
		    C.PBKDF2 = function (password, salt, cfg) {
		        return PBKDF2.create(cfg).compute(password, salt);
		    };
		}());


		return CryptoJS.PBKDF2;

	}));
	});

	var evpkdf = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, sha1, hmac);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Base = C_lib.Base;
		    var WordArray = C_lib.WordArray;
		    var C_algo = C.algo;
		    var MD5 = C_algo.MD5;

		    /**
		     * This key derivation function is meant to conform with EVP_BytesToKey.
		     * www.openssl.org/docs/crypto/EVP_BytesToKey.html
		     */
		    var EvpKDF = C_algo.EvpKDF = Base.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
		         * @property {Hasher} hasher The hash algorithm to use. Default: MD5
		         * @property {number} iterations The number of iterations to perform. Default: 1
		         */
		        cfg: Base.extend({
		            keySize: 128/32,
		            hasher: MD5,
		            iterations: 1
		        }),

		        /**
		         * Initializes a newly created key derivation function.
		         *
		         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
		         *
		         * @example
		         *
		         *     var kdf = CryptoJS.algo.EvpKDF.create();
		         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
		         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
		         */
		        init: function (cfg) {
		            this.cfg = this.cfg.extend(cfg);
		        },

		        /**
		         * Derives a key from a password.
		         *
		         * @param {WordArray|string} password The password.
		         * @param {WordArray|string} salt A salt.
		         *
		         * @return {WordArray} The derived key.
		         *
		         * @example
		         *
		         *     var key = kdf.compute(password, salt);
		         */
		        compute: function (password, salt) {
		            // Shortcut
		            var cfg = this.cfg;

		            // Init hasher
		            var hasher = cfg.hasher.create();

		            // Initial values
		            var derivedKey = WordArray.create();

		            // Shortcuts
		            var derivedKeyWords = derivedKey.words;
		            var keySize = cfg.keySize;
		            var iterations = cfg.iterations;

		            // Generate key
		            while (derivedKeyWords.length < keySize) {
		                if (block) {
		                    hasher.update(block);
		                }
		                var block = hasher.update(password).finalize(salt);
		                hasher.reset();

		                // Iterations
		                for (var i = 1; i < iterations; i++) {
		                    block = hasher.finalize(block);
		                    hasher.reset();
		                }

		                derivedKey.concat(block);
		            }
		            derivedKey.sigBytes = keySize * 4;

		            return derivedKey;
		        }
		    });

		    /**
		     * Derives a key from a password.
		     *
		     * @param {WordArray|string} password The password.
		     * @param {WordArray|string} salt A salt.
		     * @param {Object} cfg (Optional) The configuration options to use for this computation.
		     *
		     * @return {WordArray} The derived key.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var key = CryptoJS.EvpKDF(password, salt);
		     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
		     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
		     */
		    C.EvpKDF = function (password, salt, cfg) {
		        return EvpKDF.create(cfg).compute(password, salt);
		    };
		}());


		return CryptoJS.EvpKDF;

	}));
	});

	var cipherCore = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, evpkdf);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * Cipher core components.
		 */
		CryptoJS.lib.Cipher || (function (undefined) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Base = C_lib.Base;
		    var WordArray = C_lib.WordArray;
		    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
		    var C_enc = C.enc;
		    var Utf8 = C_enc.Utf8;
		    var Base64 = C_enc.Base64;
		    var C_algo = C.algo;
		    var EvpKDF = C_algo.EvpKDF;

		    /**
		     * Abstract base cipher template.
		     *
		     * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
		     * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
		     * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
		     * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
		     */
		    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {WordArray} iv The IV to use for this operation.
		         */
		        cfg: Base.extend(),

		        /**
		         * Creates this cipher in encryption mode.
		         *
		         * @param {WordArray} key The key.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {Cipher} A cipher instance.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
		         */
		        createEncryptor: function (key, cfg) {
		            return this.create(this._ENC_XFORM_MODE, key, cfg);
		        },

		        /**
		         * Creates this cipher in decryption mode.
		         *
		         * @param {WordArray} key The key.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {Cipher} A cipher instance.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
		         */
		        createDecryptor: function (key, cfg) {
		            return this.create(this._DEC_XFORM_MODE, key, cfg);
		        },

		        /**
		         * Initializes a newly created cipher.
		         *
		         * @param {number} xformMode Either the encryption or decryption transormation mode constant.
		         * @param {WordArray} key The key.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @example
		         *
		         *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
		         */
		        init: function (xformMode, key, cfg) {
		            // Apply config defaults
		            this.cfg = this.cfg.extend(cfg);

		            // Store transform mode and key
		            this._xformMode = xformMode;
		            this._key = key;

		            // Set initial values
		            this.reset();
		        },

		        /**
		         * Resets this cipher to its initial state.
		         *
		         * @example
		         *
		         *     cipher.reset();
		         */
		        reset: function () {
		            // Reset data buffer
		            BufferedBlockAlgorithm.reset.call(this);

		            // Perform concrete-cipher logic
		            this._doReset();
		        },

		        /**
		         * Adds data to be encrypted or decrypted.
		         *
		         * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
		         *
		         * @return {WordArray} The data after processing.
		         *
		         * @example
		         *
		         *     var encrypted = cipher.process('data');
		         *     var encrypted = cipher.process(wordArray);
		         */
		        process: function (dataUpdate) {
		            // Append
		            this._append(dataUpdate);

		            // Process available blocks
		            return this._process();
		        },

		        /**
		         * Finalizes the encryption or decryption process.
		         * Note that the finalize operation is effectively a destructive, read-once operation.
		         *
		         * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
		         *
		         * @return {WordArray} The data after final processing.
		         *
		         * @example
		         *
		         *     var encrypted = cipher.finalize();
		         *     var encrypted = cipher.finalize('data');
		         *     var encrypted = cipher.finalize(wordArray);
		         */
		        finalize: function (dataUpdate) {
		            // Final data update
		            if (dataUpdate) {
		                this._append(dataUpdate);
		            }

		            // Perform concrete-cipher logic
		            var finalProcessedData = this._doFinalize();

		            return finalProcessedData;
		        },

		        keySize: 128/32,

		        ivSize: 128/32,

		        _ENC_XFORM_MODE: 1,

		        _DEC_XFORM_MODE: 2,

		        /**
		         * Creates shortcut functions to a cipher's object interface.
		         *
		         * @param {Cipher} cipher The cipher to create a helper for.
		         *
		         * @return {Object} An object with encrypt and decrypt shortcut functions.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
		         */
		        _createHelper: (function () {
		            function selectCipherStrategy(key) {
		                if (typeof key == 'string') {
		                    return PasswordBasedCipher;
		                } else {
		                    return SerializableCipher;
		                }
		            }

		            return function (cipher) {
		                return {
		                    encrypt: function (message, key, cfg) {
		                        return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
		                    },

		                    decrypt: function (ciphertext, key, cfg) {
		                        return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
		                    }
		                };
		            };
		        }())
		    });

		    /**
		     * Abstract base stream cipher template.
		     *
		     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
		     */
		    var StreamCipher = C_lib.StreamCipher = Cipher.extend({
		        _doFinalize: function () {
		            // Process partial blocks
		            var finalProcessedBlocks = this._process(!!'flush');

		            return finalProcessedBlocks;
		        },

		        blockSize: 1
		    });

		    /**
		     * Mode namespace.
		     */
		    var C_mode = C.mode = {};

		    /**
		     * Abstract base block cipher mode template.
		     */
		    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
		        /**
		         * Creates this mode for encryption.
		         *
		         * @param {Cipher} cipher A block cipher instance.
		         * @param {Array} iv The IV words.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
		         */
		        createEncryptor: function (cipher, iv) {
		            return this.Encryptor.create(cipher, iv);
		        },

		        /**
		         * Creates this mode for decryption.
		         *
		         * @param {Cipher} cipher A block cipher instance.
		         * @param {Array} iv The IV words.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
		         */
		        createDecryptor: function (cipher, iv) {
		            return this.Decryptor.create(cipher, iv);
		        },

		        /**
		         * Initializes a newly created mode.
		         *
		         * @param {Cipher} cipher A block cipher instance.
		         * @param {Array} iv The IV words.
		         *
		         * @example
		         *
		         *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
		         */
		        init: function (cipher, iv) {
		            this._cipher = cipher;
		            this._iv = iv;
		        }
		    });

		    /**
		     * Cipher Block Chaining mode.
		     */
		    var CBC = C_mode.CBC = (function () {
		        /**
		         * Abstract base CBC mode.
		         */
		        var CBC = BlockCipherMode.extend();

		        /**
		         * CBC encryptor.
		         */
		        CBC.Encryptor = CBC.extend({
		            /**
		             * Processes the data block at offset.
		             *
		             * @param {Array} words The data words to operate on.
		             * @param {number} offset The offset where the block starts.
		             *
		             * @example
		             *
		             *     mode.processBlock(data.words, offset);
		             */
		            processBlock: function (words, offset) {
		                // Shortcuts
		                var cipher = this._cipher;
		                var blockSize = cipher.blockSize;

		                // XOR and encrypt
		                xorBlock.call(this, words, offset, blockSize);
		                cipher.encryptBlock(words, offset);

		                // Remember this block to use with next block
		                this._prevBlock = words.slice(offset, offset + blockSize);
		            }
		        });

		        /**
		         * CBC decryptor.
		         */
		        CBC.Decryptor = CBC.extend({
		            /**
		             * Processes the data block at offset.
		             *
		             * @param {Array} words The data words to operate on.
		             * @param {number} offset The offset where the block starts.
		             *
		             * @example
		             *
		             *     mode.processBlock(data.words, offset);
		             */
		            processBlock: function (words, offset) {
		                // Shortcuts
		                var cipher = this._cipher;
		                var blockSize = cipher.blockSize;

		                // Remember this block to use with next block
		                var thisBlock = words.slice(offset, offset + blockSize);

		                // Decrypt and XOR
		                cipher.decryptBlock(words, offset);
		                xorBlock.call(this, words, offset, blockSize);

		                // This block becomes the previous block
		                this._prevBlock = thisBlock;
		            }
		        });

		        function xorBlock(words, offset, blockSize) {
		            // Shortcut
		            var iv = this._iv;

		            // Choose mixing block
		            if (iv) {
		                var block = iv;

		                // Remove IV for subsequent blocks
		                this._iv = undefined;
		            } else {
		                var block = this._prevBlock;
		            }

		            // XOR blocks
		            for (var i = 0; i < blockSize; i++) {
		                words[offset + i] ^= block[i];
		            }
		        }

		        return CBC;
		    }());

		    /**
		     * Padding namespace.
		     */
		    var C_pad = C.pad = {};

		    /**
		     * PKCS #5/7 padding strategy.
		     */
		    var Pkcs7 = C_pad.Pkcs7 = {
		        /**
		         * Pads data using the algorithm defined in PKCS #5/7.
		         *
		         * @param {WordArray} data The data to pad.
		         * @param {number} blockSize The multiple that the data should be padded to.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
		         */
		        pad: function (data, blockSize) {
		            // Shortcut
		            var blockSizeBytes = blockSize * 4;

		            // Count padding bytes
		            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

		            // Create padding word
		            var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;

		            // Create padding
		            var paddingWords = [];
		            for (var i = 0; i < nPaddingBytes; i += 4) {
		                paddingWords.push(paddingWord);
		            }
		            var padding = WordArray.create(paddingWords, nPaddingBytes);

		            // Add padding
		            data.concat(padding);
		        },

		        /**
		         * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
		         *
		         * @param {WordArray} data The data to unpad.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     CryptoJS.pad.Pkcs7.unpad(wordArray);
		         */
		        unpad: function (data) {
		            // Get number of padding bytes from last byte
		            var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

		            // Remove padding
		            data.sigBytes -= nPaddingBytes;
		        }
		    };

		    /**
		     * Abstract base block cipher template.
		     *
		     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
		     */
		    var BlockCipher = C_lib.BlockCipher = Cipher.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {Mode} mode The block mode to use. Default: CBC
		         * @property {Padding} padding The padding strategy to use. Default: Pkcs7
		         */
		        cfg: Cipher.cfg.extend({
		            mode: CBC,
		            padding: Pkcs7
		        }),

		        reset: function () {
		            // Reset cipher
		            Cipher.reset.call(this);

		            // Shortcuts
		            var cfg = this.cfg;
		            var iv = cfg.iv;
		            var mode = cfg.mode;

		            // Reset block mode
		            if (this._xformMode == this._ENC_XFORM_MODE) {
		                var modeCreator = mode.createEncryptor;
		            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
		                var modeCreator = mode.createDecryptor;
		                // Keep at least one block in the buffer for unpadding
		                this._minBufferSize = 1;
		            }

		            if (this._mode && this._mode.__creator == modeCreator) {
		                this._mode.init(this, iv && iv.words);
		            } else {
		                this._mode = modeCreator.call(mode, this, iv && iv.words);
		                this._mode.__creator = modeCreator;
		            }
		        },

		        _doProcessBlock: function (words, offset) {
		            this._mode.processBlock(words, offset);
		        },

		        _doFinalize: function () {
		            // Shortcut
		            var padding = this.cfg.padding;

		            // Finalize
		            if (this._xformMode == this._ENC_XFORM_MODE) {
		                // Pad data
		                padding.pad(this._data, this.blockSize);

		                // Process final blocks
		                var finalProcessedBlocks = this._process(!!'flush');
		            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
		                // Process final blocks
		                var finalProcessedBlocks = this._process(!!'flush');

		                // Unpad data
		                padding.unpad(finalProcessedBlocks);
		            }

		            return finalProcessedBlocks;
		        },

		        blockSize: 128/32
		    });

		    /**
		     * A collection of cipher parameters.
		     *
		     * @property {WordArray} ciphertext The raw ciphertext.
		     * @property {WordArray} key The key to this ciphertext.
		     * @property {WordArray} iv The IV used in the ciphering operation.
		     * @property {WordArray} salt The salt used with a key derivation function.
		     * @property {Cipher} algorithm The cipher algorithm.
		     * @property {Mode} mode The block mode used in the ciphering operation.
		     * @property {Padding} padding The padding scheme used in the ciphering operation.
		     * @property {number} blockSize The block size of the cipher.
		     * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
		     */
		    var CipherParams = C_lib.CipherParams = Base.extend({
		        /**
		         * Initializes a newly created cipher params object.
		         *
		         * @param {Object} cipherParams An object with any of the possible cipher parameters.
		         *
		         * @example
		         *
		         *     var cipherParams = CryptoJS.lib.CipherParams.create({
		         *         ciphertext: ciphertextWordArray,
		         *         key: keyWordArray,
		         *         iv: ivWordArray,
		         *         salt: saltWordArray,
		         *         algorithm: CryptoJS.algo.AES,
		         *         mode: CryptoJS.mode.CBC,
		         *         padding: CryptoJS.pad.PKCS7,
		         *         blockSize: 4,
		         *         formatter: CryptoJS.format.OpenSSL
		         *     });
		         */
		        init: function (cipherParams) {
		            this.mixIn(cipherParams);
		        },

		        /**
		         * Converts this cipher params object to a string.
		         *
		         * @param {Format} formatter (Optional) The formatting strategy to use.
		         *
		         * @return {string} The stringified cipher params.
		         *
		         * @throws Error If neither the formatter nor the default formatter is set.
		         *
		         * @example
		         *
		         *     var string = cipherParams + '';
		         *     var string = cipherParams.toString();
		         *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
		         */
		        toString: function (formatter) {
		            return (formatter || this.formatter).stringify(this);
		        }
		    });

		    /**
		     * Format namespace.
		     */
		    var C_format = C.format = {};

		    /**
		     * OpenSSL formatting strategy.
		     */
		    var OpenSSLFormatter = C_format.OpenSSL = {
		        /**
		         * Converts a cipher params object to an OpenSSL-compatible string.
		         *
		         * @param {CipherParams} cipherParams The cipher params object.
		         *
		         * @return {string} The OpenSSL-compatible string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
		         */
		        stringify: function (cipherParams) {
		            // Shortcuts
		            var ciphertext = cipherParams.ciphertext;
		            var salt = cipherParams.salt;

		            // Format
		            if (salt) {
		                var wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
		            } else {
		                var wordArray = ciphertext;
		            }

		            return wordArray.toString(Base64);
		        },

		        /**
		         * Converts an OpenSSL-compatible string to a cipher params object.
		         *
		         * @param {string} openSSLStr The OpenSSL-compatible string.
		         *
		         * @return {CipherParams} The cipher params object.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
		         */
		        parse: function (openSSLStr) {
		            // Parse base64
		            var ciphertext = Base64.parse(openSSLStr);

		            // Shortcut
		            var ciphertextWords = ciphertext.words;

		            // Test for salt
		            if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
		                // Extract salt
		                var salt = WordArray.create(ciphertextWords.slice(2, 4));

		                // Remove salt from ciphertext
		                ciphertextWords.splice(0, 4);
		                ciphertext.sigBytes -= 16;
		            }

		            return CipherParams.create({ ciphertext: ciphertext, salt: salt });
		        }
		    };

		    /**
		     * A cipher wrapper that returns ciphertext as a serializable cipher params object.
		     */
		    var SerializableCipher = C_lib.SerializableCipher = Base.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
		         */
		        cfg: Base.extend({
		            format: OpenSSLFormatter
		        }),

		        /**
		         * Encrypts a message.
		         *
		         * @param {Cipher} cipher The cipher algorithm to use.
		         * @param {WordArray|string} message The message to encrypt.
		         * @param {WordArray} key The key.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {CipherParams} A cipher params object.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
		         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
		         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
		         */
		        encrypt: function (cipher, message, key, cfg) {
		            // Apply config defaults
		            cfg = this.cfg.extend(cfg);

		            // Encrypt
		            var encryptor = cipher.createEncryptor(key, cfg);
		            var ciphertext = encryptor.finalize(message);

		            // Shortcut
		            var cipherCfg = encryptor.cfg;

		            // Create and return serializable cipher params
		            return CipherParams.create({
		                ciphertext: ciphertext,
		                key: key,
		                iv: cipherCfg.iv,
		                algorithm: cipher,
		                mode: cipherCfg.mode,
		                padding: cipherCfg.padding,
		                blockSize: cipher.blockSize,
		                formatter: cfg.format
		            });
		        },

		        /**
		         * Decrypts serialized ciphertext.
		         *
		         * @param {Cipher} cipher The cipher algorithm to use.
		         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
		         * @param {WordArray} key The key.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {WordArray} The plaintext.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
		         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
		         */
		        decrypt: function (cipher, ciphertext, key, cfg) {
		            // Apply config defaults
		            cfg = this.cfg.extend(cfg);

		            // Convert string to CipherParams
		            ciphertext = this._parse(ciphertext, cfg.format);

		            // Decrypt
		            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

		            return plaintext;
		        },

		        /**
		         * Converts serialized ciphertext to CipherParams,
		         * else assumed CipherParams already and returns ciphertext unchanged.
		         *
		         * @param {CipherParams|string} ciphertext The ciphertext.
		         * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
		         *
		         * @return {CipherParams} The unserialized ciphertext.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
		         */
		        _parse: function (ciphertext, format) {
		            if (typeof ciphertext == 'string') {
		                return format.parse(ciphertext, this);
		            } else {
		                return ciphertext;
		            }
		        }
		    });

		    /**
		     * Key derivation function namespace.
		     */
		    var C_kdf = C.kdf = {};

		    /**
		     * OpenSSL key derivation function.
		     */
		    var OpenSSLKdf = C_kdf.OpenSSL = {
		        /**
		         * Derives a key and IV from a password.
		         *
		         * @param {string} password The password to derive from.
		         * @param {number} keySize The size in words of the key to generate.
		         * @param {number} ivSize The size in words of the IV to generate.
		         * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
		         *
		         * @return {CipherParams} A cipher params object with the key, IV, and salt.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
		         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
		         */
		        execute: function (password, keySize, ivSize, salt) {
		            // Generate random salt
		            if (!salt) {
		                salt = WordArray.random(64/8);
		            }

		            // Derive key and IV
		            var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);

		            // Separate key and IV
		            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
		            key.sigBytes = keySize * 4;

		            // Return params
		            return CipherParams.create({ key: key, iv: iv, salt: salt });
		        }
		    };

		    /**
		     * A serializable cipher wrapper that derives the key from a password,
		     * and returns ciphertext as a serializable cipher params object.
		     */
		    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
		         */
		        cfg: SerializableCipher.cfg.extend({
		            kdf: OpenSSLKdf
		        }),

		        /**
		         * Encrypts a message using a password.
		         *
		         * @param {Cipher} cipher The cipher algorithm to use.
		         * @param {WordArray|string} message The message to encrypt.
		         * @param {string} password The password.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {CipherParams} A cipher params object.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
		         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
		         */
		        encrypt: function (cipher, message, password, cfg) {
		            // Apply config defaults
		            cfg = this.cfg.extend(cfg);

		            // Derive key and other params
		            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

		            // Add IV to config
		            cfg.iv = derivedParams.iv;

		            // Encrypt
		            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

		            // Mix in derived params
		            ciphertext.mixIn(derivedParams);

		            return ciphertext;
		        },

		        /**
		         * Decrypts serialized ciphertext using a password.
		         *
		         * @param {Cipher} cipher The cipher algorithm to use.
		         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
		         * @param {string} password The password.
		         * @param {Object} cfg (Optional) The configuration options to use for this operation.
		         *
		         * @return {WordArray} The plaintext.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
		         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
		         */
		        decrypt: function (cipher, ciphertext, password, cfg) {
		            // Apply config defaults
		            cfg = this.cfg.extend(cfg);

		            // Convert string to CipherParams
		            ciphertext = this._parse(ciphertext, cfg.format);

		            // Derive key and other params
		            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);

		            // Add IV to config
		            cfg.iv = derivedParams.iv;

		            // Decrypt
		            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);

		            return plaintext;
		        }
		    });
		}());


	}));
	});

	var modeCfb = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * Cipher Feedback block mode.
		 */
		CryptoJS.mode.CFB = (function () {
		    var CFB = CryptoJS.lib.BlockCipherMode.extend();

		    CFB.Encryptor = CFB.extend({
		        processBlock: function (words, offset) {
		            // Shortcuts
		            var cipher = this._cipher;
		            var blockSize = cipher.blockSize;

		            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

		            // Remember this block to use with next block
		            this._prevBlock = words.slice(offset, offset + blockSize);
		        }
		    });

		    CFB.Decryptor = CFB.extend({
		        processBlock: function (words, offset) {
		            // Shortcuts
		            var cipher = this._cipher;
		            var blockSize = cipher.blockSize;

		            // Remember this block to use with next block
		            var thisBlock = words.slice(offset, offset + blockSize);

		            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

		            // This block becomes the previous block
		            this._prevBlock = thisBlock;
		        }
		    });

		    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
		        // Shortcut
		        var iv = this._iv;

		        // Generate keystream
		        if (iv) {
		            var keystream = iv.slice(0);

		            // Remove IV for subsequent blocks
		            this._iv = undefined;
		        } else {
		            var keystream = this._prevBlock;
		        }
		        cipher.encryptBlock(keystream, 0);

		        // Encrypt
		        for (var i = 0; i < blockSize; i++) {
		            words[offset + i] ^= keystream[i];
		        }
		    }

		    return CFB;
		}());


		return CryptoJS.mode.CFB;

	}));
	});

	var modeCtr = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * Counter block mode.
		 */
		CryptoJS.mode.CTR = (function () {
		    var CTR = CryptoJS.lib.BlockCipherMode.extend();

		    var Encryptor = CTR.Encryptor = CTR.extend({
		        processBlock: function (words, offset) {
		            // Shortcuts
		            var cipher = this._cipher;
		            var blockSize = cipher.blockSize;
		            var iv = this._iv;
		            var counter = this._counter;

		            // Generate keystream
		            if (iv) {
		                counter = this._counter = iv.slice(0);

		                // Remove IV for subsequent blocks
		                this._iv = undefined;
		            }
		            var keystream = counter.slice(0);
		            cipher.encryptBlock(keystream, 0);

		            // Increment counter
		            counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0;

		            // Encrypt
		            for (var i = 0; i < blockSize; i++) {
		                words[offset + i] ^= keystream[i];
		            }
		        }
		    });

		    CTR.Decryptor = Encryptor;

		    return CTR;
		}());


		return CryptoJS.mode.CTR;

	}));
	});

	var modeCtrGladman = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/** @preserve
		 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
		 * derived from CryptoJS.mode.CTR
		 * Jan Hruby jhruby.web@gmail.com
		 */
		CryptoJS.mode.CTRGladman = (function () {
		    var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();

			function incWord(word)
			{
				if (((word >> 24) & 0xff) === 0xff) { //overflow
				var b1 = (word >> 16)&0xff;
				var b2 = (word >> 8)&0xff;
				var b3 = word & 0xff;

				if (b1 === 0xff) // overflow b1
				{
				b1 = 0;
				if (b2 === 0xff)
				{
					b2 = 0;
					if (b3 === 0xff)
					{
						b3 = 0;
					}
					else
					{
						++b3;
					}
				}
				else
				{
					++b2;
				}
				}
				else
				{
				++b1;
				}

				word = 0;
				word += (b1 << 16);
				word += (b2 << 8);
				word += b3;
				}
				else
				{
				word += (0x01 << 24);
				}
				return word;
			}

			function incCounter(counter)
			{
				if ((counter[0] = incWord(counter[0])) === 0)
				{
					// encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
					counter[1] = incWord(counter[1]);
				}
				return counter;
			}

		    var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
		        processBlock: function (words, offset) {
		            // Shortcuts
		            var cipher = this._cipher;
		            var blockSize = cipher.blockSize;
		            var iv = this._iv;
		            var counter = this._counter;

		            // Generate keystream
		            if (iv) {
		                counter = this._counter = iv.slice(0);

		                // Remove IV for subsequent blocks
		                this._iv = undefined;
		            }

					incCounter(counter);

					var keystream = counter.slice(0);
		            cipher.encryptBlock(keystream, 0);

		            // Encrypt
		            for (var i = 0; i < blockSize; i++) {
		                words[offset + i] ^= keystream[i];
		            }
		        }
		    });

		    CTRGladman.Decryptor = Encryptor;

		    return CTRGladman;
		}());




		return CryptoJS.mode.CTRGladman;

	}));
	});

	var modeOfb = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * Output Feedback block mode.
		 */
		CryptoJS.mode.OFB = (function () {
		    var OFB = CryptoJS.lib.BlockCipherMode.extend();

		    var Encryptor = OFB.Encryptor = OFB.extend({
		        processBlock: function (words, offset) {
		            // Shortcuts
		            var cipher = this._cipher;
		            var blockSize = cipher.blockSize;
		            var iv = this._iv;
		            var keystream = this._keystream;

		            // Generate keystream
		            if (iv) {
		                keystream = this._keystream = iv.slice(0);

		                // Remove IV for subsequent blocks
		                this._iv = undefined;
		            }
		            cipher.encryptBlock(keystream, 0);

		            // Encrypt
		            for (var i = 0; i < blockSize; i++) {
		                words[offset + i] ^= keystream[i];
		            }
		        }
		    });

		    OFB.Decryptor = Encryptor;

		    return OFB;
		}());


		return CryptoJS.mode.OFB;

	}));
	});

	var modeEcb = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * Electronic Codebook block mode.
		 */
		CryptoJS.mode.ECB = (function () {
		    var ECB = CryptoJS.lib.BlockCipherMode.extend();

		    ECB.Encryptor = ECB.extend({
		        processBlock: function (words, offset) {
		            this._cipher.encryptBlock(words, offset);
		        }
		    });

		    ECB.Decryptor = ECB.extend({
		        processBlock: function (words, offset) {
		            this._cipher.decryptBlock(words, offset);
		        }
		    });

		    return ECB;
		}());


		return CryptoJS.mode.ECB;

	}));
	});

	var padAnsix923 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * ANSI X.923 padding strategy.
		 */
		CryptoJS.pad.AnsiX923 = {
		    pad: function (data, blockSize) {
		        // Shortcuts
		        var dataSigBytes = data.sigBytes;
		        var blockSizeBytes = blockSize * 4;

		        // Count padding bytes
		        var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;

		        // Compute last byte position
		        var lastBytePos = dataSigBytes + nPaddingBytes - 1;

		        // Pad
		        data.clamp();
		        data.words[lastBytePos >>> 2] |= nPaddingBytes << (24 - (lastBytePos % 4) * 8);
		        data.sigBytes += nPaddingBytes;
		    },

		    unpad: function (data) {
		        // Get number of padding bytes from last byte
		        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

		        // Remove padding
		        data.sigBytes -= nPaddingBytes;
		    }
		};


		return CryptoJS.pad.Ansix923;

	}));
	});

	var padIso10126 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * ISO 10126 padding strategy.
		 */
		CryptoJS.pad.Iso10126 = {
		    pad: function (data, blockSize) {
		        // Shortcut
		        var blockSizeBytes = blockSize * 4;

		        // Count padding bytes
		        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

		        // Pad
		        data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).
		             concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
		    },

		    unpad: function (data) {
		        // Get number of padding bytes from last byte
		        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

		        // Remove padding
		        data.sigBytes -= nPaddingBytes;
		    }
		};


		return CryptoJS.pad.Iso10126;

	}));
	});

	var padIso97971 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * ISO/IEC 9797-1 Padding Method 2.
		 */
		CryptoJS.pad.Iso97971 = {
		    pad: function (data, blockSize) {
		        // Add 0x80 byte
		        data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));

		        // Zero pad the rest
		        CryptoJS.pad.ZeroPadding.pad(data, blockSize);
		    },

		    unpad: function (data) {
		        // Remove zero padding
		        CryptoJS.pad.ZeroPadding.unpad(data);

		        // Remove one more byte -- the 0x80 byte
		        data.sigBytes--;
		    }
		};


		return CryptoJS.pad.Iso97971;

	}));
	});

	var padZeropadding = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * Zero padding strategy.
		 */
		CryptoJS.pad.ZeroPadding = {
		    pad: function (data, blockSize) {
		        // Shortcut
		        var blockSizeBytes = blockSize * 4;

		        // Pad
		        data.clamp();
		        data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes);
		    },

		    unpad: function (data) {
		        // Shortcut
		        var dataWords = data.words;

		        // Unpad
		        var i = data.sigBytes - 1;
		        while (!((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
		            i--;
		        }
		        data.sigBytes = i + 1;
		    }
		};


		return CryptoJS.pad.ZeroPadding;

	}));
	});

	var padNopadding = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		/**
		 * A noop padding strategy.
		 */
		CryptoJS.pad.NoPadding = {
		    pad: function () {
		    },

		    unpad: function () {
		    }
		};


		return CryptoJS.pad.NoPadding;

	}));
	});

	var formatHex = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function (undefined) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var CipherParams = C_lib.CipherParams;
		    var C_enc = C.enc;
		    var Hex = C_enc.Hex;
		    var C_format = C.format;

		    var HexFormatter = C_format.Hex = {
		        /**
		         * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
		         *
		         * @param {CipherParams} cipherParams The cipher params object.
		         *
		         * @return {string} The hexadecimally encoded string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
		         */
		        stringify: function (cipherParams) {
		            return cipherParams.ciphertext.toString(Hex);
		        },

		        /**
		         * Converts a hexadecimally encoded ciphertext string to a cipher params object.
		         *
		         * @param {string} input The hexadecimally encoded string.
		         *
		         * @return {CipherParams} The cipher params object.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
		         */
		        parse: function (input) {
		            var ciphertext = Hex.parse(input);
		            return CipherParams.create({ ciphertext: ciphertext });
		        }
		    };
		}());


		return CryptoJS.format.Hex;

	}));
	});

	var aes = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, encBase64, md5, evpkdf, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var BlockCipher = C_lib.BlockCipher;
		    var C_algo = C.algo;

		    // Lookup tables
		    var SBOX = [];
		    var INV_SBOX = [];
		    var SUB_MIX_0 = [];
		    var SUB_MIX_1 = [];
		    var SUB_MIX_2 = [];
		    var SUB_MIX_3 = [];
		    var INV_SUB_MIX_0 = [];
		    var INV_SUB_MIX_1 = [];
		    var INV_SUB_MIX_2 = [];
		    var INV_SUB_MIX_3 = [];

		    // Compute lookup tables
		    (function () {
		        // Compute double table
		        var d = [];
		        for (var i = 0; i < 256; i++) {
		            if (i < 128) {
		                d[i] = i << 1;
		            } else {
		                d[i] = (i << 1) ^ 0x11b;
		            }
		        }

		        // Walk GF(2^8)
		        var x = 0;
		        var xi = 0;
		        for (var i = 0; i < 256; i++) {
		            // Compute sbox
		            var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
		            sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
		            SBOX[x] = sx;
		            INV_SBOX[sx] = x;

		            // Compute multiplication
		            var x2 = d[x];
		            var x4 = d[x2];
		            var x8 = d[x4];

		            // Compute sub bytes, mix columns tables
		            var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
		            SUB_MIX_0[x] = (t << 24) | (t >>> 8);
		            SUB_MIX_1[x] = (t << 16) | (t >>> 16);
		            SUB_MIX_2[x] = (t << 8)  | (t >>> 24);
		            SUB_MIX_3[x] = t;

		            // Compute inv sub bytes, inv mix columns tables
		            var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
		            INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
		            INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
		            INV_SUB_MIX_2[sx] = (t << 8)  | (t >>> 24);
		            INV_SUB_MIX_3[sx] = t;

		            // Compute next counter
		            if (!x) {
		                x = xi = 1;
		            } else {
		                x = x2 ^ d[d[d[x8 ^ x2]]];
		                xi ^= d[d[xi]];
		            }
		        }
		    }());

		    // Precomputed Rcon lookup
		    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

		    /**
		     * AES block cipher algorithm.
		     */
		    var AES = C_algo.AES = BlockCipher.extend({
		        _doReset: function () {
		            // Skip reset of nRounds has been set before and key did not change
		            if (this._nRounds && this._keyPriorReset === this._key) {
		                return;
		            }

		            // Shortcuts
		            var key = this._keyPriorReset = this._key;
		            var keyWords = key.words;
		            var keySize = key.sigBytes / 4;

		            // Compute number of rounds
		            var nRounds = this._nRounds = keySize + 6;

		            // Compute number of key schedule rows
		            var ksRows = (nRounds + 1) * 4;

		            // Compute key schedule
		            var keySchedule = this._keySchedule = [];
		            for (var ksRow = 0; ksRow < ksRows; ksRow++) {
		                if (ksRow < keySize) {
		                    keySchedule[ksRow] = keyWords[ksRow];
		                } else {
		                    var t = keySchedule[ksRow - 1];

		                    if (!(ksRow % keySize)) {
		                        // Rot word
		                        t = (t << 8) | (t >>> 24);

		                        // Sub word
		                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];

		                        // Mix Rcon
		                        t ^= RCON[(ksRow / keySize) | 0] << 24;
		                    } else if (keySize > 6 && ksRow % keySize == 4) {
		                        // Sub word
		                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
		                    }

		                    keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
		                }
		            }

		            // Compute inv key schedule
		            var invKeySchedule = this._invKeySchedule = [];
		            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
		                var ksRow = ksRows - invKsRow;

		                if (invKsRow % 4) {
		                    var t = keySchedule[ksRow];
		                } else {
		                    var t = keySchedule[ksRow - 4];
		                }

		                if (invKsRow < 4 || ksRow <= 4) {
		                    invKeySchedule[invKsRow] = t;
		                } else {
		                    invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
		                                               INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
		                }
		            }
		        },

		        encryptBlock: function (M, offset) {
		            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
		        },

		        decryptBlock: function (M, offset) {
		            // Swap 2nd and 4th rows
		            var t = M[offset + 1];
		            M[offset + 1] = M[offset + 3];
		            M[offset + 3] = t;

		            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

		            // Inv swap 2nd and 4th rows
		            var t = M[offset + 1];
		            M[offset + 1] = M[offset + 3];
		            M[offset + 3] = t;
		        },

		        _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
		            // Shortcut
		            var nRounds = this._nRounds;

		            // Get input, add round key
		            var s0 = M[offset]     ^ keySchedule[0];
		            var s1 = M[offset + 1] ^ keySchedule[1];
		            var s2 = M[offset + 2] ^ keySchedule[2];
		            var s3 = M[offset + 3] ^ keySchedule[3];

		            // Key schedule row counter
		            var ksRow = 4;

		            // Rounds
		            for (var round = 1; round < nRounds; round++) {
		                // Shift rows, sub bytes, mix columns, add round key
		                var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
		                var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
		                var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
		                var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

		                // Update state
		                s0 = t0;
		                s1 = t1;
		                s2 = t2;
		                s3 = t3;
		            }

		            // Shift rows, sub bytes, add round key
		            var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
		            var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
		            var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
		            var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

		            // Set output
		            M[offset]     = t0;
		            M[offset + 1] = t1;
		            M[offset + 2] = t2;
		            M[offset + 3] = t3;
		        },

		        keySize: 256/32
		    });

		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
		     */
		    C.AES = BlockCipher._createHelper(AES);
		}());


		return CryptoJS.AES;

	}));
	});

	var tripledes = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, encBase64, md5, evpkdf, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var BlockCipher = C_lib.BlockCipher;
		    var C_algo = C.algo;

		    // Permuted Choice 1 constants
		    var PC1 = [
		        57, 49, 41, 33, 25, 17, 9,  1,
		        58, 50, 42, 34, 26, 18, 10, 2,
		        59, 51, 43, 35, 27, 19, 11, 3,
		        60, 52, 44, 36, 63, 55, 47, 39,
		        31, 23, 15, 7,  62, 54, 46, 38,
		        30, 22, 14, 6,  61, 53, 45, 37,
		        29, 21, 13, 5,  28, 20, 12, 4
		    ];

		    // Permuted Choice 2 constants
		    var PC2 = [
		        14, 17, 11, 24, 1,  5,
		        3,  28, 15, 6,  21, 10,
		        23, 19, 12, 4,  26, 8,
		        16, 7,  27, 20, 13, 2,
		        41, 52, 31, 37, 47, 55,
		        30, 40, 51, 45, 33, 48,
		        44, 49, 39, 56, 34, 53,
		        46, 42, 50, 36, 29, 32
		    ];

		    // Cumulative bit shift constants
		    var BIT_SHIFTS = [1,  2,  4,  6,  8,  10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];

		    // SBOXes and round permutation constants
		    var SBOX_P = [
		        {
		            0x0: 0x808200,
		            0x10000000: 0x8000,
		            0x20000000: 0x808002,
		            0x30000000: 0x2,
		            0x40000000: 0x200,
		            0x50000000: 0x808202,
		            0x60000000: 0x800202,
		            0x70000000: 0x800000,
		            0x80000000: 0x202,
		            0x90000000: 0x800200,
		            0xa0000000: 0x8200,
		            0xb0000000: 0x808000,
		            0xc0000000: 0x8002,
		            0xd0000000: 0x800002,
		            0xe0000000: 0x0,
		            0xf0000000: 0x8202,
		            0x8000000: 0x0,
		            0x18000000: 0x808202,
		            0x28000000: 0x8202,
		            0x38000000: 0x8000,
		            0x48000000: 0x808200,
		            0x58000000: 0x200,
		            0x68000000: 0x808002,
		            0x78000000: 0x2,
		            0x88000000: 0x800200,
		            0x98000000: 0x8200,
		            0xa8000000: 0x808000,
		            0xb8000000: 0x800202,
		            0xc8000000: 0x800002,
		            0xd8000000: 0x8002,
		            0xe8000000: 0x202,
		            0xf8000000: 0x800000,
		            0x1: 0x8000,
		            0x10000001: 0x2,
		            0x20000001: 0x808200,
		            0x30000001: 0x800000,
		            0x40000001: 0x808002,
		            0x50000001: 0x8200,
		            0x60000001: 0x200,
		            0x70000001: 0x800202,
		            0x80000001: 0x808202,
		            0x90000001: 0x808000,
		            0xa0000001: 0x800002,
		            0xb0000001: 0x8202,
		            0xc0000001: 0x202,
		            0xd0000001: 0x800200,
		            0xe0000001: 0x8002,
		            0xf0000001: 0x0,
		            0x8000001: 0x808202,
		            0x18000001: 0x808000,
		            0x28000001: 0x800000,
		            0x38000001: 0x200,
		            0x48000001: 0x8000,
		            0x58000001: 0x800002,
		            0x68000001: 0x2,
		            0x78000001: 0x8202,
		            0x88000001: 0x8002,
		            0x98000001: 0x800202,
		            0xa8000001: 0x202,
		            0xb8000001: 0x808200,
		            0xc8000001: 0x800200,
		            0xd8000001: 0x0,
		            0xe8000001: 0x8200,
		            0xf8000001: 0x808002
		        },
		        {
		            0x0: 0x40084010,
		            0x1000000: 0x4000,
		            0x2000000: 0x80000,
		            0x3000000: 0x40080010,
		            0x4000000: 0x40000010,
		            0x5000000: 0x40084000,
		            0x6000000: 0x40004000,
		            0x7000000: 0x10,
		            0x8000000: 0x84000,
		            0x9000000: 0x40004010,
		            0xa000000: 0x40000000,
		            0xb000000: 0x84010,
		            0xc000000: 0x80010,
		            0xd000000: 0x0,
		            0xe000000: 0x4010,
		            0xf000000: 0x40080000,
		            0x800000: 0x40004000,
		            0x1800000: 0x84010,
		            0x2800000: 0x10,
		            0x3800000: 0x40004010,
		            0x4800000: 0x40084010,
		            0x5800000: 0x40000000,
		            0x6800000: 0x80000,
		            0x7800000: 0x40080010,
		            0x8800000: 0x80010,
		            0x9800000: 0x0,
		            0xa800000: 0x4000,
		            0xb800000: 0x40080000,
		            0xc800000: 0x40000010,
		            0xd800000: 0x84000,
		            0xe800000: 0x40084000,
		            0xf800000: 0x4010,
		            0x10000000: 0x0,
		            0x11000000: 0x40080010,
		            0x12000000: 0x40004010,
		            0x13000000: 0x40084000,
		            0x14000000: 0x40080000,
		            0x15000000: 0x10,
		            0x16000000: 0x84010,
		            0x17000000: 0x4000,
		            0x18000000: 0x4010,
		            0x19000000: 0x80000,
		            0x1a000000: 0x80010,
		            0x1b000000: 0x40000010,
		            0x1c000000: 0x84000,
		            0x1d000000: 0x40004000,
		            0x1e000000: 0x40000000,
		            0x1f000000: 0x40084010,
		            0x10800000: 0x84010,
		            0x11800000: 0x80000,
		            0x12800000: 0x40080000,
		            0x13800000: 0x4000,
		            0x14800000: 0x40004000,
		            0x15800000: 0x40084010,
		            0x16800000: 0x10,
		            0x17800000: 0x40000000,
		            0x18800000: 0x40084000,
		            0x19800000: 0x40000010,
		            0x1a800000: 0x40004010,
		            0x1b800000: 0x80010,
		            0x1c800000: 0x0,
		            0x1d800000: 0x4010,
		            0x1e800000: 0x40080010,
		            0x1f800000: 0x84000
		        },
		        {
		            0x0: 0x104,
		            0x100000: 0x0,
		            0x200000: 0x4000100,
		            0x300000: 0x10104,
		            0x400000: 0x10004,
		            0x500000: 0x4000004,
		            0x600000: 0x4010104,
		            0x700000: 0x4010000,
		            0x800000: 0x4000000,
		            0x900000: 0x4010100,
		            0xa00000: 0x10100,
		            0xb00000: 0x4010004,
		            0xc00000: 0x4000104,
		            0xd00000: 0x10000,
		            0xe00000: 0x4,
		            0xf00000: 0x100,
		            0x80000: 0x4010100,
		            0x180000: 0x4010004,
		            0x280000: 0x0,
		            0x380000: 0x4000100,
		            0x480000: 0x4000004,
		            0x580000: 0x10000,
		            0x680000: 0x10004,
		            0x780000: 0x104,
		            0x880000: 0x4,
		            0x980000: 0x100,
		            0xa80000: 0x4010000,
		            0xb80000: 0x10104,
		            0xc80000: 0x10100,
		            0xd80000: 0x4000104,
		            0xe80000: 0x4010104,
		            0xf80000: 0x4000000,
		            0x1000000: 0x4010100,
		            0x1100000: 0x10004,
		            0x1200000: 0x10000,
		            0x1300000: 0x4000100,
		            0x1400000: 0x100,
		            0x1500000: 0x4010104,
		            0x1600000: 0x4000004,
		            0x1700000: 0x0,
		            0x1800000: 0x4000104,
		            0x1900000: 0x4000000,
		            0x1a00000: 0x4,
		            0x1b00000: 0x10100,
		            0x1c00000: 0x4010000,
		            0x1d00000: 0x104,
		            0x1e00000: 0x10104,
		            0x1f00000: 0x4010004,
		            0x1080000: 0x4000000,
		            0x1180000: 0x104,
		            0x1280000: 0x4010100,
		            0x1380000: 0x0,
		            0x1480000: 0x10004,
		            0x1580000: 0x4000100,
		            0x1680000: 0x100,
		            0x1780000: 0x4010004,
		            0x1880000: 0x10000,
		            0x1980000: 0x4010104,
		            0x1a80000: 0x10104,
		            0x1b80000: 0x4000004,
		            0x1c80000: 0x4000104,
		            0x1d80000: 0x4010000,
		            0x1e80000: 0x4,
		            0x1f80000: 0x10100
		        },
		        {
		            0x0: 0x80401000,
		            0x10000: 0x80001040,
		            0x20000: 0x401040,
		            0x30000: 0x80400000,
		            0x40000: 0x0,
		            0x50000: 0x401000,
		            0x60000: 0x80000040,
		            0x70000: 0x400040,
		            0x80000: 0x80000000,
		            0x90000: 0x400000,
		            0xa0000: 0x40,
		            0xb0000: 0x80001000,
		            0xc0000: 0x80400040,
		            0xd0000: 0x1040,
		            0xe0000: 0x1000,
		            0xf0000: 0x80401040,
		            0x8000: 0x80001040,
		            0x18000: 0x40,
		            0x28000: 0x80400040,
		            0x38000: 0x80001000,
		            0x48000: 0x401000,
		            0x58000: 0x80401040,
		            0x68000: 0x0,
		            0x78000: 0x80400000,
		            0x88000: 0x1000,
		            0x98000: 0x80401000,
		            0xa8000: 0x400000,
		            0xb8000: 0x1040,
		            0xc8000: 0x80000000,
		            0xd8000: 0x400040,
		            0xe8000: 0x401040,
		            0xf8000: 0x80000040,
		            0x100000: 0x400040,
		            0x110000: 0x401000,
		            0x120000: 0x80000040,
		            0x130000: 0x0,
		            0x140000: 0x1040,
		            0x150000: 0x80400040,
		            0x160000: 0x80401000,
		            0x170000: 0x80001040,
		            0x180000: 0x80401040,
		            0x190000: 0x80000000,
		            0x1a0000: 0x80400000,
		            0x1b0000: 0x401040,
		            0x1c0000: 0x80001000,
		            0x1d0000: 0x400000,
		            0x1e0000: 0x40,
		            0x1f0000: 0x1000,
		            0x108000: 0x80400000,
		            0x118000: 0x80401040,
		            0x128000: 0x0,
		            0x138000: 0x401000,
		            0x148000: 0x400040,
		            0x158000: 0x80000000,
		            0x168000: 0x80001040,
		            0x178000: 0x40,
		            0x188000: 0x80000040,
		            0x198000: 0x1000,
		            0x1a8000: 0x80001000,
		            0x1b8000: 0x80400040,
		            0x1c8000: 0x1040,
		            0x1d8000: 0x80401000,
		            0x1e8000: 0x400000,
		            0x1f8000: 0x401040
		        },
		        {
		            0x0: 0x80,
		            0x1000: 0x1040000,
		            0x2000: 0x40000,
		            0x3000: 0x20000000,
		            0x4000: 0x20040080,
		            0x5000: 0x1000080,
		            0x6000: 0x21000080,
		            0x7000: 0x40080,
		            0x8000: 0x1000000,
		            0x9000: 0x20040000,
		            0xa000: 0x20000080,
		            0xb000: 0x21040080,
		            0xc000: 0x21040000,
		            0xd000: 0x0,
		            0xe000: 0x1040080,
		            0xf000: 0x21000000,
		            0x800: 0x1040080,
		            0x1800: 0x21000080,
		            0x2800: 0x80,
		            0x3800: 0x1040000,
		            0x4800: 0x40000,
		            0x5800: 0x20040080,
		            0x6800: 0x21040000,
		            0x7800: 0x20000000,
		            0x8800: 0x20040000,
		            0x9800: 0x0,
		            0xa800: 0x21040080,
		            0xb800: 0x1000080,
		            0xc800: 0x20000080,
		            0xd800: 0x21000000,
		            0xe800: 0x1000000,
		            0xf800: 0x40080,
		            0x10000: 0x40000,
		            0x11000: 0x80,
		            0x12000: 0x20000000,
		            0x13000: 0x21000080,
		            0x14000: 0x1000080,
		            0x15000: 0x21040000,
		            0x16000: 0x20040080,
		            0x17000: 0x1000000,
		            0x18000: 0x21040080,
		            0x19000: 0x21000000,
		            0x1a000: 0x1040000,
		            0x1b000: 0x20040000,
		            0x1c000: 0x40080,
		            0x1d000: 0x20000080,
		            0x1e000: 0x0,
		            0x1f000: 0x1040080,
		            0x10800: 0x21000080,
		            0x11800: 0x1000000,
		            0x12800: 0x1040000,
		            0x13800: 0x20040080,
		            0x14800: 0x20000000,
		            0x15800: 0x1040080,
		            0x16800: 0x80,
		            0x17800: 0x21040000,
		            0x18800: 0x40080,
		            0x19800: 0x21040080,
		            0x1a800: 0x0,
		            0x1b800: 0x21000000,
		            0x1c800: 0x1000080,
		            0x1d800: 0x40000,
		            0x1e800: 0x20040000,
		            0x1f800: 0x20000080
		        },
		        {
		            0x0: 0x10000008,
		            0x100: 0x2000,
		            0x200: 0x10200000,
		            0x300: 0x10202008,
		            0x400: 0x10002000,
		            0x500: 0x200000,
		            0x600: 0x200008,
		            0x700: 0x10000000,
		            0x800: 0x0,
		            0x900: 0x10002008,
		            0xa00: 0x202000,
		            0xb00: 0x8,
		            0xc00: 0x10200008,
		            0xd00: 0x202008,
		            0xe00: 0x2008,
		            0xf00: 0x10202000,
		            0x80: 0x10200000,
		            0x180: 0x10202008,
		            0x280: 0x8,
		            0x380: 0x200000,
		            0x480: 0x202008,
		            0x580: 0x10000008,
		            0x680: 0x10002000,
		            0x780: 0x2008,
		            0x880: 0x200008,
		            0x980: 0x2000,
		            0xa80: 0x10002008,
		            0xb80: 0x10200008,
		            0xc80: 0x0,
		            0xd80: 0x10202000,
		            0xe80: 0x202000,
		            0xf80: 0x10000000,
		            0x1000: 0x10002000,
		            0x1100: 0x10200008,
		            0x1200: 0x10202008,
		            0x1300: 0x2008,
		            0x1400: 0x200000,
		            0x1500: 0x10000000,
		            0x1600: 0x10000008,
		            0x1700: 0x202000,
		            0x1800: 0x202008,
		            0x1900: 0x0,
		            0x1a00: 0x8,
		            0x1b00: 0x10200000,
		            0x1c00: 0x2000,
		            0x1d00: 0x10002008,
		            0x1e00: 0x10202000,
		            0x1f00: 0x200008,
		            0x1080: 0x8,
		            0x1180: 0x202000,
		            0x1280: 0x200000,
		            0x1380: 0x10000008,
		            0x1480: 0x10002000,
		            0x1580: 0x2008,
		            0x1680: 0x10202008,
		            0x1780: 0x10200000,
		            0x1880: 0x10202000,
		            0x1980: 0x10200008,
		            0x1a80: 0x2000,
		            0x1b80: 0x202008,
		            0x1c80: 0x200008,
		            0x1d80: 0x0,
		            0x1e80: 0x10000000,
		            0x1f80: 0x10002008
		        },
		        {
		            0x0: 0x100000,
		            0x10: 0x2000401,
		            0x20: 0x400,
		            0x30: 0x100401,
		            0x40: 0x2100401,
		            0x50: 0x0,
		            0x60: 0x1,
		            0x70: 0x2100001,
		            0x80: 0x2000400,
		            0x90: 0x100001,
		            0xa0: 0x2000001,
		            0xb0: 0x2100400,
		            0xc0: 0x2100000,
		            0xd0: 0x401,
		            0xe0: 0x100400,
		            0xf0: 0x2000000,
		            0x8: 0x2100001,
		            0x18: 0x0,
		            0x28: 0x2000401,
		            0x38: 0x2100400,
		            0x48: 0x100000,
		            0x58: 0x2000001,
		            0x68: 0x2000000,
		            0x78: 0x401,
		            0x88: 0x100401,
		            0x98: 0x2000400,
		            0xa8: 0x2100000,
		            0xb8: 0x100001,
		            0xc8: 0x400,
		            0xd8: 0x2100401,
		            0xe8: 0x1,
		            0xf8: 0x100400,
		            0x100: 0x2000000,
		            0x110: 0x100000,
		            0x120: 0x2000401,
		            0x130: 0x2100001,
		            0x140: 0x100001,
		            0x150: 0x2000400,
		            0x160: 0x2100400,
		            0x170: 0x100401,
		            0x180: 0x401,
		            0x190: 0x2100401,
		            0x1a0: 0x100400,
		            0x1b0: 0x1,
		            0x1c0: 0x0,
		            0x1d0: 0x2100000,
		            0x1e0: 0x2000001,
		            0x1f0: 0x400,
		            0x108: 0x100400,
		            0x118: 0x2000401,
		            0x128: 0x2100001,
		            0x138: 0x1,
		            0x148: 0x2000000,
		            0x158: 0x100000,
		            0x168: 0x401,
		            0x178: 0x2100400,
		            0x188: 0x2000001,
		            0x198: 0x2100000,
		            0x1a8: 0x0,
		            0x1b8: 0x2100401,
		            0x1c8: 0x100401,
		            0x1d8: 0x400,
		            0x1e8: 0x2000400,
		            0x1f8: 0x100001
		        },
		        {
		            0x0: 0x8000820,
		            0x1: 0x20000,
		            0x2: 0x8000000,
		            0x3: 0x20,
		            0x4: 0x20020,
		            0x5: 0x8020820,
		            0x6: 0x8020800,
		            0x7: 0x800,
		            0x8: 0x8020000,
		            0x9: 0x8000800,
		            0xa: 0x20800,
		            0xb: 0x8020020,
		            0xc: 0x820,
		            0xd: 0x0,
		            0xe: 0x8000020,
		            0xf: 0x20820,
		            0x80000000: 0x800,
		            0x80000001: 0x8020820,
		            0x80000002: 0x8000820,
		            0x80000003: 0x8000000,
		            0x80000004: 0x8020000,
		            0x80000005: 0x20800,
		            0x80000006: 0x20820,
		            0x80000007: 0x20,
		            0x80000008: 0x8000020,
		            0x80000009: 0x820,
		            0x8000000a: 0x20020,
		            0x8000000b: 0x8020800,
		            0x8000000c: 0x0,
		            0x8000000d: 0x8020020,
		            0x8000000e: 0x8000800,
		            0x8000000f: 0x20000,
		            0x10: 0x20820,
		            0x11: 0x8020800,
		            0x12: 0x20,
		            0x13: 0x800,
		            0x14: 0x8000800,
		            0x15: 0x8000020,
		            0x16: 0x8020020,
		            0x17: 0x20000,
		            0x18: 0x0,
		            0x19: 0x20020,
		            0x1a: 0x8020000,
		            0x1b: 0x8000820,
		            0x1c: 0x8020820,
		            0x1d: 0x20800,
		            0x1e: 0x820,
		            0x1f: 0x8000000,
		            0x80000010: 0x20000,
		            0x80000011: 0x800,
		            0x80000012: 0x8020020,
		            0x80000013: 0x20820,
		            0x80000014: 0x20,
		            0x80000015: 0x8020000,
		            0x80000016: 0x8000000,
		            0x80000017: 0x8000820,
		            0x80000018: 0x8020820,
		            0x80000019: 0x8000020,
		            0x8000001a: 0x8000800,
		            0x8000001b: 0x0,
		            0x8000001c: 0x20800,
		            0x8000001d: 0x820,
		            0x8000001e: 0x20020,
		            0x8000001f: 0x8020800
		        }
		    ];

		    // Masks that select the SBOX input
		    var SBOX_MASK = [
		        0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000,
		        0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f
		    ];

		    /**
		     * DES block cipher algorithm.
		     */
		    var DES = C_algo.DES = BlockCipher.extend({
		        _doReset: function () {
		            // Shortcuts
		            var key = this._key;
		            var keyWords = key.words;

		            // Select 56 bits according to PC1
		            var keyBits = [];
		            for (var i = 0; i < 56; i++) {
		                var keyBitPos = PC1[i] - 1;
		                keyBits[i] = (keyWords[keyBitPos >>> 5] >>> (31 - keyBitPos % 32)) & 1;
		            }

		            // Assemble 16 subkeys
		            var subKeys = this._subKeys = [];
		            for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
		                // Create subkey
		                var subKey = subKeys[nSubKey] = [];

		                // Shortcut
		                var bitShift = BIT_SHIFTS[nSubKey];

		                // Select 48 bits according to PC2
		                for (var i = 0; i < 24; i++) {
		                    // Select from the left 28 key bits
		                    subKey[(i / 6) | 0] |= keyBits[((PC2[i] - 1) + bitShift) % 28] << (31 - i % 6);

		                    // Select from the right 28 key bits
		                    subKey[4 + ((i / 6) | 0)] |= keyBits[28 + (((PC2[i + 24] - 1) + bitShift) % 28)] << (31 - i % 6);
		                }

		                // Since each subkey is applied to an expanded 32-bit input,
		                // the subkey can be broken into 8 values scaled to 32-bits,
		                // which allows the key to be used without expansion
		                subKey[0] = (subKey[0] << 1) | (subKey[0] >>> 31);
		                for (var i = 1; i < 7; i++) {
		                    subKey[i] = subKey[i] >>> ((i - 1) * 4 + 3);
		                }
		                subKey[7] = (subKey[7] << 5) | (subKey[7] >>> 27);
		            }

		            // Compute inverse subkeys
		            var invSubKeys = this._invSubKeys = [];
		            for (var i = 0; i < 16; i++) {
		                invSubKeys[i] = subKeys[15 - i];
		            }
		        },

		        encryptBlock: function (M, offset) {
		            this._doCryptBlock(M, offset, this._subKeys);
		        },

		        decryptBlock: function (M, offset) {
		            this._doCryptBlock(M, offset, this._invSubKeys);
		        },

		        _doCryptBlock: function (M, offset, subKeys) {
		            // Get input
		            this._lBlock = M[offset];
		            this._rBlock = M[offset + 1];

		            // Initial permutation
		            exchangeLR.call(this, 4,  0x0f0f0f0f);
		            exchangeLR.call(this, 16, 0x0000ffff);
		            exchangeRL.call(this, 2,  0x33333333);
		            exchangeRL.call(this, 8,  0x00ff00ff);
		            exchangeLR.call(this, 1,  0x55555555);

		            // Rounds
		            for (var round = 0; round < 16; round++) {
		                // Shortcuts
		                var subKey = subKeys[round];
		                var lBlock = this._lBlock;
		                var rBlock = this._rBlock;

		                // Feistel function
		                var f = 0;
		                for (var i = 0; i < 8; i++) {
		                    f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
		                }
		                this._lBlock = rBlock;
		                this._rBlock = lBlock ^ f;
		            }

		            // Undo swap from last round
		            var t = this._lBlock;
		            this._lBlock = this._rBlock;
		            this._rBlock = t;

		            // Final permutation
		            exchangeLR.call(this, 1,  0x55555555);
		            exchangeRL.call(this, 8,  0x00ff00ff);
		            exchangeRL.call(this, 2,  0x33333333);
		            exchangeLR.call(this, 16, 0x0000ffff);
		            exchangeLR.call(this, 4,  0x0f0f0f0f);

		            // Set output
		            M[offset] = this._lBlock;
		            M[offset + 1] = this._rBlock;
		        },

		        keySize: 64/32,

		        ivSize: 64/32,

		        blockSize: 64/32
		    });

		    // Swap bits across the left and right words
		    function exchangeLR(offset, mask) {
		        var t = ((this._lBlock >>> offset) ^ this._rBlock) & mask;
		        this._rBlock ^= t;
		        this._lBlock ^= t << offset;
		    }

		    function exchangeRL(offset, mask) {
		        var t = ((this._rBlock >>> offset) ^ this._lBlock) & mask;
		        this._lBlock ^= t;
		        this._rBlock ^= t << offset;
		    }

		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);
		     */
		    C.DES = BlockCipher._createHelper(DES);

		    /**
		     * Triple-DES block cipher algorithm.
		     */
		    var TripleDES = C_algo.TripleDES = BlockCipher.extend({
		        _doReset: function () {
		            // Shortcuts
		            var key = this._key;
		            var keyWords = key.words;

		            // Create DES instances
		            this._des1 = DES.createEncryptor(WordArray.create(keyWords.slice(0, 2)));
		            this._des2 = DES.createEncryptor(WordArray.create(keyWords.slice(2, 4)));
		            this._des3 = DES.createEncryptor(WordArray.create(keyWords.slice(4, 6)));
		        },

		        encryptBlock: function (M, offset) {
		            this._des1.encryptBlock(M, offset);
		            this._des2.decryptBlock(M, offset);
		            this._des3.encryptBlock(M, offset);
		        },

		        decryptBlock: function (M, offset) {
		            this._des3.decryptBlock(M, offset);
		            this._des2.encryptBlock(M, offset);
		            this._des1.decryptBlock(M, offset);
		        },

		        keySize: 192/32,

		        ivSize: 64/32,

		        blockSize: 64/32
		    });

		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
		     */
		    C.TripleDES = BlockCipher._createHelper(TripleDES);
		}());


		return CryptoJS.TripleDES;

	}));
	});

	var rc4 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, encBase64, md5, evpkdf, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var StreamCipher = C_lib.StreamCipher;
		    var C_algo = C.algo;

		    /**
		     * RC4 stream cipher algorithm.
		     */
		    var RC4 = C_algo.RC4 = StreamCipher.extend({
		        _doReset: function () {
		            // Shortcuts
		            var key = this._key;
		            var keyWords = key.words;
		            var keySigBytes = key.sigBytes;

		            // Init sbox
		            var S = this._S = [];
		            for (var i = 0; i < 256; i++) {
		                S[i] = i;
		            }

		            // Key setup
		            for (var i = 0, j = 0; i < 256; i++) {
		                var keyByteIndex = i % keySigBytes;
		                var keyByte = (keyWords[keyByteIndex >>> 2] >>> (24 - (keyByteIndex % 4) * 8)) & 0xff;

		                j = (j + S[i] + keyByte) % 256;

		                // Swap
		                var t = S[i];
		                S[i] = S[j];
		                S[j] = t;
		            }

		            // Counters
		            this._i = this._j = 0;
		        },

		        _doProcessBlock: function (M, offset) {
		            M[offset] ^= generateKeystreamWord.call(this);
		        },

		        keySize: 256/32,

		        ivSize: 0
		    });

		    function generateKeystreamWord() {
		        // Shortcuts
		        var S = this._S;
		        var i = this._i;
		        var j = this._j;

		        // Generate keystream word
		        var keystreamWord = 0;
		        for (var n = 0; n < 4; n++) {
		            i = (i + 1) % 256;
		            j = (j + S[i]) % 256;

		            // Swap
		            var t = S[i];
		            S[i] = S[j];
		            S[j] = t;

		            keystreamWord |= S[(S[i] + S[j]) % 256] << (24 - n * 8);
		        }

		        // Update counters
		        this._i = i;
		        this._j = j;

		        return keystreamWord;
		    }

		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);
		     */
		    C.RC4 = StreamCipher._createHelper(RC4);

		    /**
		     * Modified RC4 stream cipher algorithm.
		     */
		    var RC4Drop = C_algo.RC4Drop = RC4.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {number} drop The number of keystream words to drop. Default 192
		         */
		        cfg: RC4.cfg.extend({
		            drop: 192
		        }),

		        _doReset: function () {
		            RC4._doReset.call(this);

		            // Drop
		            for (var i = this.cfg.drop; i > 0; i--) {
		                generateKeystreamWord.call(this);
		            }
		        }
		    });

		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);
		     */
		    C.RC4Drop = StreamCipher._createHelper(RC4Drop);
		}());


		return CryptoJS.RC4;

	}));
	});

	var rabbit = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, encBase64, md5, evpkdf, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var StreamCipher = C_lib.StreamCipher;
		    var C_algo = C.algo;

		    // Reusable objects
		    var S  = [];
		    var C_ = [];
		    var G  = [];

		    /**
		     * Rabbit stream cipher algorithm
		     */
		    var Rabbit = C_algo.Rabbit = StreamCipher.extend({
		        _doReset: function () {
		            // Shortcuts
		            var K = this._key.words;
		            var iv = this.cfg.iv;

		            // Swap endian
		            for (var i = 0; i < 4; i++) {
		                K[i] = (((K[i] << 8)  | (K[i] >>> 24)) & 0x00ff00ff) |
		                       (((K[i] << 24) | (K[i] >>> 8))  & 0xff00ff00);
		            }

		            // Generate initial state values
		            var X = this._X = [
		                K[0], (K[3] << 16) | (K[2] >>> 16),
		                K[1], (K[0] << 16) | (K[3] >>> 16),
		                K[2], (K[1] << 16) | (K[0] >>> 16),
		                K[3], (K[2] << 16) | (K[1] >>> 16)
		            ];

		            // Generate initial counter values
		            var C = this._C = [
		                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
		                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
		                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
		                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
		            ];

		            // Carry bit
		            this._b = 0;

		            // Iterate the system four times
		            for (var i = 0; i < 4; i++) {
		                nextState.call(this);
		            }

		            // Modify the counters
		            for (var i = 0; i < 8; i++) {
		                C[i] ^= X[(i + 4) & 7];
		            }

		            // IV setup
		            if (iv) {
		                // Shortcuts
		                var IV = iv.words;
		                var IV_0 = IV[0];
		                var IV_1 = IV[1];

		                // Generate four subvectors
		                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
		                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
		                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
		                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);

		                // Modify counter values
		                C[0] ^= i0;
		                C[1] ^= i1;
		                C[2] ^= i2;
		                C[3] ^= i3;
		                C[4] ^= i0;
		                C[5] ^= i1;
		                C[6] ^= i2;
		                C[7] ^= i3;

		                // Iterate the system four times
		                for (var i = 0; i < 4; i++) {
		                    nextState.call(this);
		                }
		            }
		        },

		        _doProcessBlock: function (M, offset) {
		            // Shortcut
		            var X = this._X;

		            // Iterate the system
		            nextState.call(this);

		            // Generate four keystream words
		            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
		            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
		            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
		            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

		            for (var i = 0; i < 4; i++) {
		                // Swap endian
		                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
		                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);

		                // Encrypt
		                M[offset + i] ^= S[i];
		            }
		        },

		        blockSize: 128/32,

		        ivSize: 64/32
		    });

		    function nextState() {
		        // Shortcuts
		        var X = this._X;
		        var C = this._C;

		        // Save old counter values
		        for (var i = 0; i < 8; i++) {
		            C_[i] = C[i];
		        }

		        // Calculate new counter values
		        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
		        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
		        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
		        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
		        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
		        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
		        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
		        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
		        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

		        // Calculate the g-values
		        for (var i = 0; i < 8; i++) {
		            var gx = X[i] + C[i];

		            // Construct high and low argument for squaring
		            var ga = gx & 0xffff;
		            var gb = gx >>> 16;

		            // Calculate high and low result of squaring
		            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
		            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

		            // High XOR low
		            G[i] = gh ^ gl;
		        }

		        // Calculate new state values
		        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
		        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
		        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
		        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
		        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
		        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
		        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
		        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
		    }

		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);
		     */
		    C.Rabbit = StreamCipher._createHelper(Rabbit);
		}());


		return CryptoJS.Rabbit;

	}));
	});

	var rabbitLegacy = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, encBase64, md5, evpkdf, cipherCore);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function () {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var StreamCipher = C_lib.StreamCipher;
		    var C_algo = C.algo;

		    // Reusable objects
		    var S  = [];
		    var C_ = [];
		    var G  = [];

		    /**
		     * Rabbit stream cipher algorithm.
		     *
		     * This is a legacy version that neglected to convert the key to little-endian.
		     * This error doesn't affect the cipher's security,
		     * but it does affect its compatibility with other implementations.
		     */
		    var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
		        _doReset: function () {
		            // Shortcuts
		            var K = this._key.words;
		            var iv = this.cfg.iv;

		            // Generate initial state values
		            var X = this._X = [
		                K[0], (K[3] << 16) | (K[2] >>> 16),
		                K[1], (K[0] << 16) | (K[3] >>> 16),
		                K[2], (K[1] << 16) | (K[0] >>> 16),
		                K[3], (K[2] << 16) | (K[1] >>> 16)
		            ];

		            // Generate initial counter values
		            var C = this._C = [
		                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
		                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
		                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
		                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
		            ];

		            // Carry bit
		            this._b = 0;

		            // Iterate the system four times
		            for (var i = 0; i < 4; i++) {
		                nextState.call(this);
		            }

		            // Modify the counters
		            for (var i = 0; i < 8; i++) {
		                C[i] ^= X[(i + 4) & 7];
		            }

		            // IV setup
		            if (iv) {
		                // Shortcuts
		                var IV = iv.words;
		                var IV_0 = IV[0];
		                var IV_1 = IV[1];

		                // Generate four subvectors
		                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
		                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
		                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
		                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);

		                // Modify counter values
		                C[0] ^= i0;
		                C[1] ^= i1;
		                C[2] ^= i2;
		                C[3] ^= i3;
		                C[4] ^= i0;
		                C[5] ^= i1;
		                C[6] ^= i2;
		                C[7] ^= i3;

		                // Iterate the system four times
		                for (var i = 0; i < 4; i++) {
		                    nextState.call(this);
		                }
		            }
		        },

		        _doProcessBlock: function (M, offset) {
		            // Shortcut
		            var X = this._X;

		            // Iterate the system
		            nextState.call(this);

		            // Generate four keystream words
		            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
		            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
		            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
		            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

		            for (var i = 0; i < 4; i++) {
		                // Swap endian
		                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
		                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);

		                // Encrypt
		                M[offset + i] ^= S[i];
		            }
		        },

		        blockSize: 128/32,

		        ivSize: 64/32
		    });

		    function nextState() {
		        // Shortcuts
		        var X = this._X;
		        var C = this._C;

		        // Save old counter values
		        for (var i = 0; i < 8; i++) {
		            C_[i] = C[i];
		        }

		        // Calculate new counter values
		        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
		        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
		        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
		        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
		        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
		        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
		        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
		        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
		        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

		        // Calculate the g-values
		        for (var i = 0; i < 8; i++) {
		            var gx = X[i] + C[i];

		            // Construct high and low argument for squaring
		            var ga = gx & 0xffff;
		            var gb = gx >>> 16;

		            // Calculate high and low result of squaring
		            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
		            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

		            // High XOR low
		            G[i] = gh ^ gl;
		        }

		        // Calculate new state values
		        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
		        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
		        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
		        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
		        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
		        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
		        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
		        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
		    }

		    /**
		     * Shortcut functions to the cipher's object interface.
		     *
		     * @example
		     *
		     *     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);
		     *     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);
		     */
		    C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
		}());


		return CryptoJS.RabbitLegacy;

	}));
	});

	var cryptoJs = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, x64Core, libTypedarrays, encUtf16, encBase64, md5, sha1, sha256, sha224, sha512, sha384, sha3, ripemd160, hmac, pbkdf2, evpkdf, cipherCore, modeCfb, modeCtr, modeCtrGladman, modeOfb, modeEcb, padAnsix923, padIso10126, padIso97971, padZeropadding, padNopadding, formatHex, aes, tripledes, rc4, rabbit, rabbitLegacy);
		}
	}(commonjsGlobal, function (CryptoJS) {

		return CryptoJS;

	}));
	});

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */

	var __assign = Object.assign || function __assign(t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	        s = arguments[i];
	        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	    }
	    return t;
	};

	var browsers = [
	    ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
	    ['opera', /Opera\/([0-9\.]+)(?:\s|$)/],
	    ['opera', /OPR\/([0-9\.]+)(:?\s|$)$/],
	    ['edge', /Edge\/([0-9\._]+)/],
	    ['ie', /Trident\/7\.0.*rv\:([0-9\.]+)\).*Gecko$/],
	    ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
	    ['ie', /MSIE\s(7\.0)/],
	    ['safari', /Version\/([0-9\._]+).*Safari/],
	    ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
	    ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/],
	    ['android', /Android\s([0-9\.]+)/],
	    ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/],
	    ['yandexbrowser', /YaBrowser\/([0-9\._]+)/],
	    ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/]
	];
	var os = [
	    'Windows Phone',
	    'Android',
	    'CentOS',
	    { name: 'Chrome OS', pattern: 'CrOS' },
	    'Debian',
	    'Fedora',
	    'FreeBSD',
	    'Gentoo',
	    'Haiku',
	    'Kubuntu',
	    'Linux Mint',
	    'OpenBSD',
	    'Red Hat',
	    'SuSE',
	    'Ubuntu',
	    'Xubuntu',
	    'Cygwin',
	    'Symbian OS',
	    'hpwOS',
	    'webOS ',
	    'webOS',
	    'Tablet OS',
	    'Tizen',
	    'Linux',
	    'Mac OS X',
	    'Macintosh',
	    'Mac',
	    'Windows 98;',
	    'Windows '
	];
	var osVersions = {
	    '10.0': '10',
	    '6.4': '10 Technical Preview',
	    '6.3': '8.1',
	    '6.2': '8',
	    '6.1': 'Server 2008 R2 / 7',
	    '6.0': 'Server 2008 / Vista',
	    '5.2': 'Server 2003 / XP 64-bit',
	    '5.1': 'XP',
	    '5.01': '2000 SP1',
	    '5.0': '2000',
	    '4.0': 'NT',
	    '4.90': 'ME'
	};

	var mobileRegExp = new RegExp(['(android|bb\\d+|meego).+mobile|avantgo|bada\\/|blackberry|blazer|',
	    'compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|',
	    'midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)',
	    '\\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\\.(browser|link)|vodafone|',
	    'wap|windows ce|xda|xiino'].join(''), 'i');
	var mobilePrefixRegExp = new RegExp(['1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\\-)|',
	    'ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\\-m|r |s )|',
	    'avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\\-(n|u)|c55\\/|capi|ccwa|cdm\\-|',
	    'cell|chtm|cldc|cmd\\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\\-s|devi|dica|dmob|do(c|p)o|',
	    'ds(12|\\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\\-|_)|',
	    'g1 u|g560|gene|gf\\-5|g\\-mo|go(\\.w|od)|gr(ad|un)|haie|hcit|hd\\-(m|p|t)|hei\\-|',
	    'hi(pt|ta)|hp( i|ip)|hs\\-c|ht(c(\\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\\-(20|go|ma)|',
	    'i230|iac( |\\-|\\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|',
	    'kddi|keji|kgt( |\\/)|klon|kpt |kwc\\-|kyo(c|k)|le(no|xi)|lg( g|\\/(k|l|u)|50|54|\\-[a-w])',
	    '|libw|lynx|m1\\-w|m3ga|m50\\/|ma(te|ui|xo)|mc(01|21|ca)|m\\-cr|me(rc|ri)|mi(o8|oa|ts)|',
	    'mmef|mo(01|02|bi|de|do|t(\\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|',
	    'n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|',
	    'op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\\-2|',
	    'po(ck|rt|se)|prox|psio|pt\\-g|qa\\-a|qc(07|12|21|32|60|\\-[2-7]|i\\-)|qtek|r380|r600|',
	    'raks|rim9|ro(ve|zo)|s55\\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\\-|oo|p\\-)|sdk\\/|',
	    'se(c(\\-|0|1)|47|mc|nd|ri)|sgh\\-|shar|sie(\\-|m)|k\\-0|sl(45|id)|sm(al|ar|b3|it|t5)|',
	    'so(ft|ny)|sp(01|h\\-|v\\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\\-|tdg\\-|',
	    'tel(i|m)|tim\\-|t\\-mo|to(pl|sh)|ts(70|m\\-|m3|m5)|tx\\-9|up(\\.b|g1|si)|utst|v400|v750|',
	    'veri|vi(rg|te)|vk(40|5[0-3]|\\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|',
	    'w3c(\\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\\-|your|zeto|zte\\-'].join(''), 'i');

	var Detector = /** @class */ (function () {
	    function Detector(userAgent, navigator, process) {
	        this.navigator = navigator;
	        this.process = process;
	        this.userAgent = userAgent
	            ? userAgent
	            : this.navigator ? (navigator.userAgent || navigator.vendor) : '';
	    }
	    Detector.prototype.detect = function () {
	        if (this.process && !this.userAgent) {
	            var version = this.process.version.slice(1).split('.').slice(0, 3);
	            var versionTail = Array.prototype.slice.call(version, 1).join('') || '0';
	            return {
	                name: 'node',
	                version: version.join('.'),
	                versionNumber: parseFloat(version[0] + "." + versionTail),
	                mobile: false,
	                os: this.process.platform
	            };
	        }
	        if (!this.userAgent)
	            this.handleMissingError();
	        return __assign({}, this.checkBrowser(), this.checkMobile(), this.checkOs());
	    };
	    Detector.prototype.checkBrowser = function () {
	        var _this = this;
	        return browsers
	            .filter(function (definition) { return definition[1].test(_this.userAgent); })
	            .map(function (definition) {
	            var match = definition[1].exec(_this.userAgent);
	            var version = match && match[1].split(/[._]/).slice(0, 3);
	            var versionTails = Array.prototype.slice.call(version, 1).join('') || '0';
	            if (version && version.length < 3)
	                Array.prototype.push.apply(version, version.length === 1 ? [0, 0] : [0]);
	            return {
	                name: String(definition[0]),
	                version: version.join('.'),
	                versionNumber: Number(version[0] + "." + versionTails)
	            };
	        })
	            .shift();
	    };
	    Detector.prototype.checkMobile = function () {
	        var agentPrefix = this.userAgent.substr(0, 4);
	        var mobile = mobileRegExp.test(this.userAgent) || mobilePrefixRegExp.test(agentPrefix);
	        return { mobile: mobile };
	    };
	    Detector.prototype.checkOs = function () {
	        var _this = this;
	        return os
	            .map(function (definition) {
	            var name = definition.name || definition;
	            var pattern = _this.getOsPattern(definition);
	            return {
	                name: name,
	                pattern: pattern,
	                value: RegExp("\\b" + pattern.replace(/([ -])(?!$)/g, '$1?') + "(?:x?[\\d._]+|[ \\w.]*)", 'i').exec(_this.userAgent)
	            };
	        })
	            .filter(function (definition) { return definition.value; })
	            .map(function (definition) {
	            var os$$1 = definition.value[0] || '';
	            var osSuffix;
	            if (definition.pattern &&
	                definition.name &&
	                /^Win/i.test(os$$1) &&
	                !/^Windows Phone /i.test(os$$1) &&
	                (osSuffix = osVersions[os$$1.replace(/[^\d.]/g, '')]))
	                os$$1 = "Windows " + osSuffix;
	            if (definition.pattern && definition.name)
	                os$$1 = os$$1.replace(RegExp(definition.pattern, 'i'), definition.name);
	            os$$1 = os$$1
	                .replace(/ ce$/i, ' CE')
	                .replace(/\bhpw/i, 'web')
	                .replace(/\bMacintosh\b/, 'Mac OS')
	                .replace(/_PowerPC\b/i, ' OS')
	                .replace(/\b(OS X) [^ \d]+/i, '$1')
	                .replace(/\bMac (OS X)\b/, '$1')
	                .replace(/\/(\d)/, ' $1')
	                .replace(/_/g, '.')
	                .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '')
	                .replace(/\bx86\.64\b/gi, 'x86_64')
	                .replace(/\b(Windows Phone) OS\b/, '$1')
	                .replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1')
	                .split(' on ')[0]
	                .trim();
	            os$$1 = /^(?:webOS|i(?:OS|P))/.test(os$$1)
	                ? os$$1
	                : (os$$1.charAt(0).toUpperCase() + os$$1.slice(1));
	            return { os: os$$1 };
	        })
	            .shift();
	    };
	    Detector.prototype.getOsPattern = function (definition) {
	        var definitionInterface = definition;
	        return (typeof definition === 'string'
	            ? definition
	            : undefined) ||
	            definitionInterface.pattern ||
	            definitionInterface.name;
	    };
	    Detector.prototype.handleMissingError = function () {
	        throw new Error('Please give user-agent.\n> browser(navigator.userAgent or res.headers[\'user-agent\']).');
	    };
	    return Detector;
	}());

	function createCommonjsModule$1(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule$1(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule$1(function (module) {
	var core = module.exports = { version: '2.5.7' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var id$1 = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$1 + px).toString(36));
	};

	var _redefine = createCommonjsModule$1(function (module) {
	var SRC = _uid('src');
	var TO_STRING = 'toString';
	var $toString = Function[TO_STRING];
	var TPL = ('' + $toString).split(TO_STRING);

	_core.inspectSource = function (it) {
	  return $toString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === _global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
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

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // extend global
	    if (target) _redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) _hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	_global.core = _core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	var _shared = createCommonjsModule$1(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: 'global',
	  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
	});
	});

	var _wks = createCommonjsModule$1(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var SPECIES = _wks('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (_isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
	    if (_isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


	var _arraySpeciesCreate = function (original, length) {
	  return new (_arraySpeciesConstructor(original))(length);
	};

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex





	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || _arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = _toObject($this);
	    var self = _iobject(O);
	    var f = _ctx(callbackfn, that, 3);
	    var length = _toLength(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res;   // map
	        else if (res) switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	var _strictMethod = function (method, arg) {
	  return !!method && _fails(function () {
	    // eslint-disable-next-line no-useless-call
	    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
	  });
	};

	var $filter = _arrayMethods(2);

	_export(_export.P + _export.F * !_strictMethod([].filter, true), 'Array', {
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});

	var filter = _core.Array.filter;

	var $map = _arrayMethods(1);

	_export(_export.P + _export.F * !_strictMethod([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments[1]);
	  }
	});

	var map = _core.Array.map;

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var space = '[' + _stringWs + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = _fails(function () {
	    return !!_stringWs[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  _export(_export.P + _export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(_defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	var _stringTrim = exporter;

	// 21.1.3.25 String.prototype.trim()
	_stringTrim('trim', function ($trim) {
	  return function trim() {
	    return $trim(this, 3);
	  };
	});

	var trim$1 = _core.String.trim;

	var injectableNavigator = typeof window !== 'undefined'
	    ? window.navigator
	    : undefined;
	var injectableProcess = typeof process !== 'undefined'
	    ? process
	    : undefined;
	function browserDetect (userAgent) {
	    var detector = new Detector(userAgent, injectableNavigator, injectableProcess);
	    return detector.detect();
	}

	var _from="elliptic@^6.0.2";var _id="elliptic@6.4.1";var _inBundle=false;var _integrity="sha512-BsXLz5sqX8OHcsh7CqBMztyXARmGQ3LWPtGjJi6DiJHq5C/qvi9P3OqgswKSDftbu8+IoI/QDTAm2fFnQ9SZSQ==";var _location="/elliptic";var _phantomChildren={};var _requested={type:"range",registry:true,raw:"elliptic@^6.0.2",name:"elliptic",escapedName:"elliptic",rawSpec:"^6.0.2",saveSpec:null,fetchSpec:"^6.0.2"};var _requiredBy=["/eccrypto","/secp256k1"];var _resolved="https://registry.npmjs.org/elliptic/-/elliptic-6.4.1.tgz";var _shasum="c2d0b7776911b86722c632c3c06c60f2f819939a";var _spec="elliptic@^6.0.2";var _where="C:\\Users\\sagge\\OneDrive\\Documents\\GitHub\\beet-js\\node_modules\\eccrypto";var author={name:"Fedor Indutny",email:"fedor@indutny.com"};var bugs={url:"https://github.com/indutny/elliptic/issues"};var bundleDependencies=false;var dependencies={"bn.js":"^4.4.0",brorand:"^1.0.1","hash.js":"^1.0.0","hmac-drbg":"^1.0.0",inherits:"^2.0.1","minimalistic-assert":"^1.0.0","minimalistic-crypto-utils":"^1.0.0"};var deprecated=false;var description="EC cryptography";var devDependencies={brfs:"^1.4.3",coveralls:"^2.11.3",grunt:"^0.4.5","grunt-browserify":"^5.0.0","grunt-cli":"^1.2.0","grunt-contrib-connect":"^1.0.0","grunt-contrib-copy":"^1.0.0","grunt-contrib-uglify":"^1.0.1","grunt-mocha-istanbul":"^3.0.1","grunt-saucelabs":"^8.6.2",istanbul:"^0.4.2",jscs:"^2.9.0",jshint:"^2.6.0",mocha:"^2.1.0"};var files=["lib"];var homepage="https://github.com/indutny/elliptic";var keywords=["EC","Elliptic","curve","Cryptography"];var license="MIT";var main="lib/elliptic.js";var name="elliptic";var repository={type:"git",url:"git+ssh://git@github.com/indutny/elliptic.git"};var scripts={jscs:"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",jshint:"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",lint:"npm run jscs && npm run jshint",test:"npm run lint && npm run unit",unit:"istanbul test _mocha --reporter=spec test/index.js",version:"grunt dist && git add dist/"};var version="6.4.1";var _package = {_from:_from,_id:_id,_inBundle:_inBundle,_integrity:_integrity,_location:_location,_phantomChildren:_phantomChildren,_requested:_requested,_requiredBy:_requiredBy,_resolved:_resolved,_shasum:_shasum,_spec:_spec,_where:_where,author:author,bugs:bugs,bundleDependencies:bundleDependencies,dependencies:dependencies,deprecated:deprecated,description:description,devDependencies:devDependencies,files:files,homepage:homepage,keywords:keywords,license:license,main:main,name:name,repository:repository,scripts:scripts,version:version};

	var _package$1 = /*#__PURE__*/Object.freeze({
		_from: _from,
		_id: _id,
		_inBundle: _inBundle,
		_integrity: _integrity,
		_location: _location,
		_phantomChildren: _phantomChildren,
		_requested: _requested,
		_requiredBy: _requiredBy,
		_resolved: _resolved,
		_shasum: _shasum,
		_spec: _spec,
		_where: _where,
		author: author,
		bugs: bugs,
		bundleDependencies: bundleDependencies,
		dependencies: dependencies,
		deprecated: deprecated,
		description: description,
		devDependencies: devDependencies,
		files: files,
		homepage: homepage,
		keywords: keywords,
		license: license,
		main: main,
		name: name,
		repository: repository,
		scripts: scripts,
		version: version,
		default: _package
	});

	var empty = {};

	var empty$1 = /*#__PURE__*/Object.freeze({
		default: empty
	});

	var require$$0 = ( empty$1 && empty ) || empty$1;

	var bn = createCommonjsModule(function (module) {
	(function (module, exports) {

	  // Utils
	  function assert (val, msg) {
	    if (!val) throw new Error(msg || 'Assertion failed');
	  }

	  // Could use `inherits` module, but don't want to move from single file
	  // architecture yet.
	  function inherits (ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function () {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  }

	  // BN

	  function BN (number, base, endian) {
	    if (BN.isBN(number)) {
	      return number;
	    }

	    this.negative = 0;
	    this.words = null;
	    this.length = 0;

	    // Reduction context
	    this.red = null;

	    if (number !== null) {
	      if (base === 'le' || base === 'be') {
	        endian = base;
	        base = 10;
	      }

	      this._init(number || 0, base || 10, endian || 'be');
	    }
	  }
	  if (typeof module === 'object') {
	    module.exports = BN;
	  } else {
	    exports.BN = BN;
	  }

	  BN.BN = BN;
	  BN.wordSize = 26;

	  var Buffer;
	  try {
	    Buffer = require$$0.Buffer;
	  } catch (e) {
	  }

	  BN.isBN = function isBN (num) {
	    if (num instanceof BN) {
	      return true;
	    }

	    return num !== null && typeof num === 'object' &&
	      num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
	  };

	  BN.max = function max (left, right) {
	    if (left.cmp(right) > 0) return left;
	    return right;
	  };

	  BN.min = function min (left, right) {
	    if (left.cmp(right) < 0) return left;
	    return right;
	  };

	  BN.prototype._init = function init (number, base, endian) {
	    if (typeof number === 'number') {
	      return this._initNumber(number, base, endian);
	    }

	    if (typeof number === 'object') {
	      return this._initArray(number, base, endian);
	    }

	    if (base === 'hex') {
	      base = 16;
	    }
	    assert(base === (base | 0) && base >= 2 && base <= 36);

	    number = number.toString().replace(/\s+/g, '');
	    var start = 0;
	    if (number[0] === '-') {
	      start++;
	    }

	    if (base === 16) {
	      this._parseHex(number, start);
	    } else {
	      this._parseBase(number, base, start);
	    }

	    if (number[0] === '-') {
	      this.negative = 1;
	    }

	    this.strip();

	    if (endian !== 'le') return;

	    this._initArray(this.toArray(), base, endian);
	  };

	  BN.prototype._initNumber = function _initNumber (number, base, endian) {
	    if (number < 0) {
	      this.negative = 1;
	      number = -number;
	    }
	    if (number < 0x4000000) {
	      this.words = [ number & 0x3ffffff ];
	      this.length = 1;
	    } else if (number < 0x10000000000000) {
	      this.words = [
	        number & 0x3ffffff,
	        (number / 0x4000000) & 0x3ffffff
	      ];
	      this.length = 2;
	    } else {
	      assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
	      this.words = [
	        number & 0x3ffffff,
	        (number / 0x4000000) & 0x3ffffff,
	        1
	      ];
	      this.length = 3;
	    }

	    if (endian !== 'le') return;

	    // Reverse the bytes
	    this._initArray(this.toArray(), base, endian);
	  };

	  BN.prototype._initArray = function _initArray (number, base, endian) {
	    // Perhaps a Uint8Array
	    assert(typeof number.length === 'number');
	    if (number.length <= 0) {
	      this.words = [ 0 ];
	      this.length = 1;
	      return this;
	    }

	    this.length = Math.ceil(number.length / 3);
	    this.words = new Array(this.length);
	    for (var i = 0; i < this.length; i++) {
	      this.words[i] = 0;
	    }

	    var j, w;
	    var off = 0;
	    if (endian === 'be') {
	      for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
	        w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
	        this.words[j] |= (w << off) & 0x3ffffff;
	        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
	        off += 24;
	        if (off >= 26) {
	          off -= 26;
	          j++;
	        }
	      }
	    } else if (endian === 'le') {
	      for (i = 0, j = 0; i < number.length; i += 3) {
	        w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
	        this.words[j] |= (w << off) & 0x3ffffff;
	        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
	        off += 24;
	        if (off >= 26) {
	          off -= 26;
	          j++;
	        }
	      }
	    }
	    return this.strip();
	  };

	  function parseHex (str, start, end) {
	    var r = 0;
	    var len = Math.min(str.length, end);
	    for (var i = start; i < len; i++) {
	      var c = str.charCodeAt(i) - 48;

	      r <<= 4;

	      // 'a' - 'f'
	      if (c >= 49 && c <= 54) {
	        r |= c - 49 + 0xa;

	      // 'A' - 'F'
	      } else if (c >= 17 && c <= 22) {
	        r |= c - 17 + 0xa;

	      // '0' - '9'
	      } else {
	        r |= c & 0xf;
	      }
	    }
	    return r;
	  }

	  BN.prototype._parseHex = function _parseHex (number, start) {
	    // Create possibly bigger array to ensure that it fits the number
	    this.length = Math.ceil((number.length - start) / 6);
	    this.words = new Array(this.length);
	    for (var i = 0; i < this.length; i++) {
	      this.words[i] = 0;
	    }

	    var j, w;
	    // Scan 24-bit chunks and add them to the number
	    var off = 0;
	    for (i = number.length - 6, j = 0; i >= start; i -= 6) {
	      w = parseHex(number, i, i + 6);
	      this.words[j] |= (w << off) & 0x3ffffff;
	      // NOTE: `0x3fffff` is intentional here, 26bits max shift + 24bit hex limb
	      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
	      off += 24;
	      if (off >= 26) {
	        off -= 26;
	        j++;
	      }
	    }
	    if (i + 6 !== start) {
	      w = parseHex(number, start, i + 6);
	      this.words[j] |= (w << off) & 0x3ffffff;
	      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
	    }
	    this.strip();
	  };

	  function parseBase (str, start, end, mul) {
	    var r = 0;
	    var len = Math.min(str.length, end);
	    for (var i = start; i < len; i++) {
	      var c = str.charCodeAt(i) - 48;

	      r *= mul;

	      // 'a'
	      if (c >= 49) {
	        r += c - 49 + 0xa;

	      // 'A'
	      } else if (c >= 17) {
	        r += c - 17 + 0xa;

	      // '0' - '9'
	      } else {
	        r += c;
	      }
	    }
	    return r;
	  }

	  BN.prototype._parseBase = function _parseBase (number, base, start) {
	    // Initialize as zero
	    this.words = [ 0 ];
	    this.length = 1;

	    // Find length of limb in base
	    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
	      limbLen++;
	    }
	    limbLen--;
	    limbPow = (limbPow / base) | 0;

	    var total = number.length - start;
	    var mod = total % limbLen;
	    var end = Math.min(total, total - mod) + start;

	    var word = 0;
	    for (var i = start; i < end; i += limbLen) {
	      word = parseBase(number, i, i + limbLen, base);

	      this.imuln(limbPow);
	      if (this.words[0] + word < 0x4000000) {
	        this.words[0] += word;
	      } else {
	        this._iaddn(word);
	      }
	    }

	    if (mod !== 0) {
	      var pow = 1;
	      word = parseBase(number, i, number.length, base);

	      for (i = 0; i < mod; i++) {
	        pow *= base;
	      }

	      this.imuln(pow);
	      if (this.words[0] + word < 0x4000000) {
	        this.words[0] += word;
	      } else {
	        this._iaddn(word);
	      }
	    }
	  };

	  BN.prototype.copy = function copy (dest) {
	    dest.words = new Array(this.length);
	    for (var i = 0; i < this.length; i++) {
	      dest.words[i] = this.words[i];
	    }
	    dest.length = this.length;
	    dest.negative = this.negative;
	    dest.red = this.red;
	  };

	  BN.prototype.clone = function clone () {
	    var r = new BN(null);
	    this.copy(r);
	    return r;
	  };

	  BN.prototype._expand = function _expand (size) {
	    while (this.length < size) {
	      this.words[this.length++] = 0;
	    }
	    return this;
	  };

	  // Remove leading `0` from `this`
	  BN.prototype.strip = function strip () {
	    while (this.length > 1 && this.words[this.length - 1] === 0) {
	      this.length--;
	    }
	    return this._normSign();
	  };

	  BN.prototype._normSign = function _normSign () {
	    // -0 = 0
	    if (this.length === 1 && this.words[0] === 0) {
	      this.negative = 0;
	    }
	    return this;
	  };

	  BN.prototype.inspect = function inspect () {
	    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
	  };

	  /*

	  var zeros = [];
	  var groupSizes = [];
	  var groupBases = [];

	  var s = '';
	  var i = -1;
	  while (++i < BN.wordSize) {
	    zeros[i] = s;
	    s += '0';
	  }
	  groupSizes[0] = 0;
	  groupSizes[1] = 0;
	  groupBases[0] = 0;
	  groupBases[1] = 0;
	  var base = 2 - 1;
	  while (++base < 36 + 1) {
	    var groupSize = 0;
	    var groupBase = 1;
	    while (groupBase < (1 << BN.wordSize) / base) {
	      groupBase *= base;
	      groupSize += 1;
	    }
	    groupSizes[base] = groupSize;
	    groupBases[base] = groupBase;
	  }

	  */

	  var zeros = [
	    '',
	    '0',
	    '00',
	    '000',
	    '0000',
	    '00000',
	    '000000',
	    '0000000',
	    '00000000',
	    '000000000',
	    '0000000000',
	    '00000000000',
	    '000000000000',
	    '0000000000000',
	    '00000000000000',
	    '000000000000000',
	    '0000000000000000',
	    '00000000000000000',
	    '000000000000000000',
	    '0000000000000000000',
	    '00000000000000000000',
	    '000000000000000000000',
	    '0000000000000000000000',
	    '00000000000000000000000',
	    '000000000000000000000000',
	    '0000000000000000000000000'
	  ];

	  var groupSizes = [
	    0, 0,
	    25, 16, 12, 11, 10, 9, 8,
	    8, 7, 7, 7, 7, 6, 6,
	    6, 6, 6, 6, 6, 5, 5,
	    5, 5, 5, 5, 5, 5, 5,
	    5, 5, 5, 5, 5, 5, 5
	  ];

	  var groupBases = [
	    0, 0,
	    33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
	    43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
	    16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
	    6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
	    24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
	  ];

	  BN.prototype.toString = function toString (base, padding) {
	    base = base || 10;
	    padding = padding | 0 || 1;

	    var out;
	    if (base === 16 || base === 'hex') {
	      out = '';
	      var off = 0;
	      var carry = 0;
	      for (var i = 0; i < this.length; i++) {
	        var w = this.words[i];
	        var word = (((w << off) | carry) & 0xffffff).toString(16);
	        carry = (w >>> (24 - off)) & 0xffffff;
	        if (carry !== 0 || i !== this.length - 1) {
	          out = zeros[6 - word.length] + word + out;
	        } else {
	          out = word + out;
	        }
	        off += 2;
	        if (off >= 26) {
	          off -= 26;
	          i--;
	        }
	      }
	      if (carry !== 0) {
	        out = carry.toString(16) + out;
	      }
	      while (out.length % padding !== 0) {
	        out = '0' + out;
	      }
	      if (this.negative !== 0) {
	        out = '-' + out;
	      }
	      return out;
	    }

	    if (base === (base | 0) && base >= 2 && base <= 36) {
	      // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
	      var groupSize = groupSizes[base];
	      // var groupBase = Math.pow(base, groupSize);
	      var groupBase = groupBases[base];
	      out = '';
	      var c = this.clone();
	      c.negative = 0;
	      while (!c.isZero()) {
	        var r = c.modn(groupBase).toString(base);
	        c = c.idivn(groupBase);

	        if (!c.isZero()) {
	          out = zeros[groupSize - r.length] + r + out;
	        } else {
	          out = r + out;
	        }
	      }
	      if (this.isZero()) {
	        out = '0' + out;
	      }
	      while (out.length % padding !== 0) {
	        out = '0' + out;
	      }
	      if (this.negative !== 0) {
	        out = '-' + out;
	      }
	      return out;
	    }

	    assert(false, 'Base should be between 2 and 36');
	  };

	  BN.prototype.toNumber = function toNumber () {
	    var ret = this.words[0];
	    if (this.length === 2) {
	      ret += this.words[1] * 0x4000000;
	    } else if (this.length === 3 && this.words[2] === 0x01) {
	      // NOTE: at this stage it is known that the top bit is set
	      ret += 0x10000000000000 + (this.words[1] * 0x4000000);
	    } else if (this.length > 2) {
	      assert(false, 'Number can only safely store up to 53 bits');
	    }
	    return (this.negative !== 0) ? -ret : ret;
	  };

	  BN.prototype.toJSON = function toJSON () {
	    return this.toString(16);
	  };

	  BN.prototype.toBuffer = function toBuffer (endian, length) {
	    assert(typeof Buffer !== 'undefined');
	    return this.toArrayLike(Buffer, endian, length);
	  };

	  BN.prototype.toArray = function toArray (endian, length) {
	    return this.toArrayLike(Array, endian, length);
	  };

	  BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
	    var byteLength = this.byteLength();
	    var reqLength = length || Math.max(1, byteLength);
	    assert(byteLength <= reqLength, 'byte array longer than desired length');
	    assert(reqLength > 0, 'Requested array length <= 0');

	    this.strip();
	    var littleEndian = endian === 'le';
	    var res = new ArrayType(reqLength);

	    var b, i;
	    var q = this.clone();
	    if (!littleEndian) {
	      // Assume big-endian
	      for (i = 0; i < reqLength - byteLength; i++) {
	        res[i] = 0;
	      }

	      for (i = 0; !q.isZero(); i++) {
	        b = q.andln(0xff);
	        q.iushrn(8);

	        res[reqLength - i - 1] = b;
	      }
	    } else {
	      for (i = 0; !q.isZero(); i++) {
	        b = q.andln(0xff);
	        q.iushrn(8);

	        res[i] = b;
	      }

	      for (; i < reqLength; i++) {
	        res[i] = 0;
	      }
	    }

	    return res;
	  };

	  if (Math.clz32) {
	    BN.prototype._countBits = function _countBits (w) {
	      return 32 - Math.clz32(w);
	    };
	  } else {
	    BN.prototype._countBits = function _countBits (w) {
	      var t = w;
	      var r = 0;
	      if (t >= 0x1000) {
	        r += 13;
	        t >>>= 13;
	      }
	      if (t >= 0x40) {
	        r += 7;
	        t >>>= 7;
	      }
	      if (t >= 0x8) {
	        r += 4;
	        t >>>= 4;
	      }
	      if (t >= 0x02) {
	        r += 2;
	        t >>>= 2;
	      }
	      return r + t;
	    };
	  }

	  BN.prototype._zeroBits = function _zeroBits (w) {
	    // Short-cut
	    if (w === 0) return 26;

	    var t = w;
	    var r = 0;
	    if ((t & 0x1fff) === 0) {
	      r += 13;
	      t >>>= 13;
	    }
	    if ((t & 0x7f) === 0) {
	      r += 7;
	      t >>>= 7;
	    }
	    if ((t & 0xf) === 0) {
	      r += 4;
	      t >>>= 4;
	    }
	    if ((t & 0x3) === 0) {
	      r += 2;
	      t >>>= 2;
	    }
	    if ((t & 0x1) === 0) {
	      r++;
	    }
	    return r;
	  };

	  // Return number of used bits in a BN
	  BN.prototype.bitLength = function bitLength () {
	    var w = this.words[this.length - 1];
	    var hi = this._countBits(w);
	    return (this.length - 1) * 26 + hi;
	  };

	  function toBitArray (num) {
	    var w = new Array(num.bitLength());

	    for (var bit = 0; bit < w.length; bit++) {
	      var off = (bit / 26) | 0;
	      var wbit = bit % 26;

	      w[bit] = (num.words[off] & (1 << wbit)) >>> wbit;
	    }

	    return w;
	  }

	  // Number of trailing zero bits
	  BN.prototype.zeroBits = function zeroBits () {
	    if (this.isZero()) return 0;

	    var r = 0;
	    for (var i = 0; i < this.length; i++) {
	      var b = this._zeroBits(this.words[i]);
	      r += b;
	      if (b !== 26) break;
	    }
	    return r;
	  };

	  BN.prototype.byteLength = function byteLength () {
	    return Math.ceil(this.bitLength() / 8);
	  };

	  BN.prototype.toTwos = function toTwos (width) {
	    if (this.negative !== 0) {
	      return this.abs().inotn(width).iaddn(1);
	    }
	    return this.clone();
	  };

	  BN.prototype.fromTwos = function fromTwos (width) {
	    if (this.testn(width - 1)) {
	      return this.notn(width).iaddn(1).ineg();
	    }
	    return this.clone();
	  };

	  BN.prototype.isNeg = function isNeg () {
	    return this.negative !== 0;
	  };

	  // Return negative clone of `this`
	  BN.prototype.neg = function neg () {
	    return this.clone().ineg();
	  };

	  BN.prototype.ineg = function ineg () {
	    if (!this.isZero()) {
	      this.negative ^= 1;
	    }

	    return this;
	  };

	  // Or `num` with `this` in-place
	  BN.prototype.iuor = function iuor (num) {
	    while (this.length < num.length) {
	      this.words[this.length++] = 0;
	    }

	    for (var i = 0; i < num.length; i++) {
	      this.words[i] = this.words[i] | num.words[i];
	    }

	    return this.strip();
	  };

	  BN.prototype.ior = function ior (num) {
	    assert((this.negative | num.negative) === 0);
	    return this.iuor(num);
	  };

	  // Or `num` with `this`
	  BN.prototype.or = function or (num) {
	    if (this.length > num.length) return this.clone().ior(num);
	    return num.clone().ior(this);
	  };

	  BN.prototype.uor = function uor (num) {
	    if (this.length > num.length) return this.clone().iuor(num);
	    return num.clone().iuor(this);
	  };

	  // And `num` with `this` in-place
	  BN.prototype.iuand = function iuand (num) {
	    // b = min-length(num, this)
	    var b;
	    if (this.length > num.length) {
	      b = num;
	    } else {
	      b = this;
	    }

	    for (var i = 0; i < b.length; i++) {
	      this.words[i] = this.words[i] & num.words[i];
	    }

	    this.length = b.length;

	    return this.strip();
	  };

	  BN.prototype.iand = function iand (num) {
	    assert((this.negative | num.negative) === 0);
	    return this.iuand(num);
	  };

	  // And `num` with `this`
	  BN.prototype.and = function and (num) {
	    if (this.length > num.length) return this.clone().iand(num);
	    return num.clone().iand(this);
	  };

	  BN.prototype.uand = function uand (num) {
	    if (this.length > num.length) return this.clone().iuand(num);
	    return num.clone().iuand(this);
	  };

	  // Xor `num` with `this` in-place
	  BN.prototype.iuxor = function iuxor (num) {
	    // a.length > b.length
	    var a;
	    var b;
	    if (this.length > num.length) {
	      a = this;
	      b = num;
	    } else {
	      a = num;
	      b = this;
	    }

	    for (var i = 0; i < b.length; i++) {
	      this.words[i] = a.words[i] ^ b.words[i];
	    }

	    if (this !== a) {
	      for (; i < a.length; i++) {
	        this.words[i] = a.words[i];
	      }
	    }

	    this.length = a.length;

	    return this.strip();
	  };

	  BN.prototype.ixor = function ixor (num) {
	    assert((this.negative | num.negative) === 0);
	    return this.iuxor(num);
	  };

	  // Xor `num` with `this`
	  BN.prototype.xor = function xor (num) {
	    if (this.length > num.length) return this.clone().ixor(num);
	    return num.clone().ixor(this);
	  };

	  BN.prototype.uxor = function uxor (num) {
	    if (this.length > num.length) return this.clone().iuxor(num);
	    return num.clone().iuxor(this);
	  };

	  // Not ``this`` with ``width`` bitwidth
	  BN.prototype.inotn = function inotn (width) {
	    assert(typeof width === 'number' && width >= 0);

	    var bytesNeeded = Math.ceil(width / 26) | 0;
	    var bitsLeft = width % 26;

	    // Extend the buffer with leading zeroes
	    this._expand(bytesNeeded);

	    if (bitsLeft > 0) {
	      bytesNeeded--;
	    }

	    // Handle complete words
	    for (var i = 0; i < bytesNeeded; i++) {
	      this.words[i] = ~this.words[i] & 0x3ffffff;
	    }

	    // Handle the residue
	    if (bitsLeft > 0) {
	      this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
	    }

	    // And remove leading zeroes
	    return this.strip();
	  };

	  BN.prototype.notn = function notn (width) {
	    return this.clone().inotn(width);
	  };

	  // Set `bit` of `this`
	  BN.prototype.setn = function setn (bit, val) {
	    assert(typeof bit === 'number' && bit >= 0);

	    var off = (bit / 26) | 0;
	    var wbit = bit % 26;

	    this._expand(off + 1);

	    if (val) {
	      this.words[off] = this.words[off] | (1 << wbit);
	    } else {
	      this.words[off] = this.words[off] & ~(1 << wbit);
	    }

	    return this.strip();
	  };

	  // Add `num` to `this` in-place
	  BN.prototype.iadd = function iadd (num) {
	    var r;

	    // negative + positive
	    if (this.negative !== 0 && num.negative === 0) {
	      this.negative = 0;
	      r = this.isub(num);
	      this.negative ^= 1;
	      return this._normSign();

	    // positive + negative
	    } else if (this.negative === 0 && num.negative !== 0) {
	      num.negative = 0;
	      r = this.isub(num);
	      num.negative = 1;
	      return r._normSign();
	    }

	    // a.length > b.length
	    var a, b;
	    if (this.length > num.length) {
	      a = this;
	      b = num;
	    } else {
	      a = num;
	      b = this;
	    }

	    var carry = 0;
	    for (var i = 0; i < b.length; i++) {
	      r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
	      this.words[i] = r & 0x3ffffff;
	      carry = r >>> 26;
	    }
	    for (; carry !== 0 && i < a.length; i++) {
	      r = (a.words[i] | 0) + carry;
	      this.words[i] = r & 0x3ffffff;
	      carry = r >>> 26;
	    }

	    this.length = a.length;
	    if (carry !== 0) {
	      this.words[this.length] = carry;
	      this.length++;
	    // Copy the rest of the words
	    } else if (a !== this) {
	      for (; i < a.length; i++) {
	        this.words[i] = a.words[i];
	      }
	    }

	    return this;
	  };

	  // Add `num` to `this`
	  BN.prototype.add = function add (num) {
	    var res;
	    if (num.negative !== 0 && this.negative === 0) {
	      num.negative = 0;
	      res = this.sub(num);
	      num.negative ^= 1;
	      return res;
	    } else if (num.negative === 0 && this.negative !== 0) {
	      this.negative = 0;
	      res = num.sub(this);
	      this.negative = 1;
	      return res;
	    }

	    if (this.length > num.length) return this.clone().iadd(num);

	    return num.clone().iadd(this);
	  };

	  // Subtract `num` from `this` in-place
	  BN.prototype.isub = function isub (num) {
	    // this - (-num) = this + num
	    if (num.negative !== 0) {
	      num.negative = 0;
	      var r = this.iadd(num);
	      num.negative = 1;
	      return r._normSign();

	    // -this - num = -(this + num)
	    } else if (this.negative !== 0) {
	      this.negative = 0;
	      this.iadd(num);
	      this.negative = 1;
	      return this._normSign();
	    }

	    // At this point both numbers are positive
	    var cmp = this.cmp(num);

	    // Optimization - zeroify
	    if (cmp === 0) {
	      this.negative = 0;
	      this.length = 1;
	      this.words[0] = 0;
	      return this;
	    }

	    // a > b
	    var a, b;
	    if (cmp > 0) {
	      a = this;
	      b = num;
	    } else {
	      a = num;
	      b = this;
	    }

	    var carry = 0;
	    for (var i = 0; i < b.length; i++) {
	      r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
	      carry = r >> 26;
	      this.words[i] = r & 0x3ffffff;
	    }
	    for (; carry !== 0 && i < a.length; i++) {
	      r = (a.words[i] | 0) + carry;
	      carry = r >> 26;
	      this.words[i] = r & 0x3ffffff;
	    }

	    // Copy rest of the words
	    if (carry === 0 && i < a.length && a !== this) {
	      for (; i < a.length; i++) {
	        this.words[i] = a.words[i];
	      }
	    }

	    this.length = Math.max(this.length, i);

	    if (a !== this) {
	      this.negative = 1;
	    }

	    return this.strip();
	  };

	  // Subtract `num` from `this`
	  BN.prototype.sub = function sub (num) {
	    return this.clone().isub(num);
	  };

	  function smallMulTo (self, num, out) {
	    out.negative = num.negative ^ self.negative;
	    var len = (self.length + num.length) | 0;
	    out.length = len;
	    len = (len - 1) | 0;

	    // Peel one iteration (compiler can't do it, because of code complexity)
	    var a = self.words[0] | 0;
	    var b = num.words[0] | 0;
	    var r = a * b;

	    var lo = r & 0x3ffffff;
	    var carry = (r / 0x4000000) | 0;
	    out.words[0] = lo;

	    for (var k = 1; k < len; k++) {
	      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
	      // note that ncarry could be >= 0x3ffffff
	      var ncarry = carry >>> 26;
	      var rword = carry & 0x3ffffff;
	      var maxJ = Math.min(k, num.length - 1);
	      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
	        var i = (k - j) | 0;
	        a = self.words[i] | 0;
	        b = num.words[j] | 0;
	        r = a * b + rword;
	        ncarry += (r / 0x4000000) | 0;
	        rword = r & 0x3ffffff;
	      }
	      out.words[k] = rword | 0;
	      carry = ncarry | 0;
	    }
	    if (carry !== 0) {
	      out.words[k] = carry | 0;
	    } else {
	      out.length--;
	    }

	    return out.strip();
	  }

	  // TODO(indutny): it may be reasonable to omit it for users who don't need
	  // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
	  // multiplication (like elliptic secp256k1).
	  var comb10MulTo = function comb10MulTo (self, num, out) {
	    var a = self.words;
	    var b = num.words;
	    var o = out.words;
	    var c = 0;
	    var lo;
	    var mid;
	    var hi;
	    var a0 = a[0] | 0;
	    var al0 = a0 & 0x1fff;
	    var ah0 = a0 >>> 13;
	    var a1 = a[1] | 0;
	    var al1 = a1 & 0x1fff;
	    var ah1 = a1 >>> 13;
	    var a2 = a[2] | 0;
	    var al2 = a2 & 0x1fff;
	    var ah2 = a2 >>> 13;
	    var a3 = a[3] | 0;
	    var al3 = a3 & 0x1fff;
	    var ah3 = a3 >>> 13;
	    var a4 = a[4] | 0;
	    var al4 = a4 & 0x1fff;
	    var ah4 = a4 >>> 13;
	    var a5 = a[5] | 0;
	    var al5 = a5 & 0x1fff;
	    var ah5 = a5 >>> 13;
	    var a6 = a[6] | 0;
	    var al6 = a6 & 0x1fff;
	    var ah6 = a6 >>> 13;
	    var a7 = a[7] | 0;
	    var al7 = a7 & 0x1fff;
	    var ah7 = a7 >>> 13;
	    var a8 = a[8] | 0;
	    var al8 = a8 & 0x1fff;
	    var ah8 = a8 >>> 13;
	    var a9 = a[9] | 0;
	    var al9 = a9 & 0x1fff;
	    var ah9 = a9 >>> 13;
	    var b0 = b[0] | 0;
	    var bl0 = b0 & 0x1fff;
	    var bh0 = b0 >>> 13;
	    var b1 = b[1] | 0;
	    var bl1 = b1 & 0x1fff;
	    var bh1 = b1 >>> 13;
	    var b2 = b[2] | 0;
	    var bl2 = b2 & 0x1fff;
	    var bh2 = b2 >>> 13;
	    var b3 = b[3] | 0;
	    var bl3 = b3 & 0x1fff;
	    var bh3 = b3 >>> 13;
	    var b4 = b[4] | 0;
	    var bl4 = b4 & 0x1fff;
	    var bh4 = b4 >>> 13;
	    var b5 = b[5] | 0;
	    var bl5 = b5 & 0x1fff;
	    var bh5 = b5 >>> 13;
	    var b6 = b[6] | 0;
	    var bl6 = b6 & 0x1fff;
	    var bh6 = b6 >>> 13;
	    var b7 = b[7] | 0;
	    var bl7 = b7 & 0x1fff;
	    var bh7 = b7 >>> 13;
	    var b8 = b[8] | 0;
	    var bl8 = b8 & 0x1fff;
	    var bh8 = b8 >>> 13;
	    var b9 = b[9] | 0;
	    var bl9 = b9 & 0x1fff;
	    var bh9 = b9 >>> 13;

	    out.negative = self.negative ^ num.negative;
	    out.length = 19;
	    /* k = 0 */
	    lo = Math.imul(al0, bl0);
	    mid = Math.imul(al0, bh0);
	    mid = (mid + Math.imul(ah0, bl0)) | 0;
	    hi = Math.imul(ah0, bh0);
	    var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
	    w0 &= 0x3ffffff;
	    /* k = 1 */
	    lo = Math.imul(al1, bl0);
	    mid = Math.imul(al1, bh0);
	    mid = (mid + Math.imul(ah1, bl0)) | 0;
	    hi = Math.imul(ah1, bh0);
	    lo = (lo + Math.imul(al0, bl1)) | 0;
	    mid = (mid + Math.imul(al0, bh1)) | 0;
	    mid = (mid + Math.imul(ah0, bl1)) | 0;
	    hi = (hi + Math.imul(ah0, bh1)) | 0;
	    var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
	    w1 &= 0x3ffffff;
	    /* k = 2 */
	    lo = Math.imul(al2, bl0);
	    mid = Math.imul(al2, bh0);
	    mid = (mid + Math.imul(ah2, bl0)) | 0;
	    hi = Math.imul(ah2, bh0);
	    lo = (lo + Math.imul(al1, bl1)) | 0;
	    mid = (mid + Math.imul(al1, bh1)) | 0;
	    mid = (mid + Math.imul(ah1, bl1)) | 0;
	    hi = (hi + Math.imul(ah1, bh1)) | 0;
	    lo = (lo + Math.imul(al0, bl2)) | 0;
	    mid = (mid + Math.imul(al0, bh2)) | 0;
	    mid = (mid + Math.imul(ah0, bl2)) | 0;
	    hi = (hi + Math.imul(ah0, bh2)) | 0;
	    var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
	    w2 &= 0x3ffffff;
	    /* k = 3 */
	    lo = Math.imul(al3, bl0);
	    mid = Math.imul(al3, bh0);
	    mid = (mid + Math.imul(ah3, bl0)) | 0;
	    hi = Math.imul(ah3, bh0);
	    lo = (lo + Math.imul(al2, bl1)) | 0;
	    mid = (mid + Math.imul(al2, bh1)) | 0;
	    mid = (mid + Math.imul(ah2, bl1)) | 0;
	    hi = (hi + Math.imul(ah2, bh1)) | 0;
	    lo = (lo + Math.imul(al1, bl2)) | 0;
	    mid = (mid + Math.imul(al1, bh2)) | 0;
	    mid = (mid + Math.imul(ah1, bl2)) | 0;
	    hi = (hi + Math.imul(ah1, bh2)) | 0;
	    lo = (lo + Math.imul(al0, bl3)) | 0;
	    mid = (mid + Math.imul(al0, bh3)) | 0;
	    mid = (mid + Math.imul(ah0, bl3)) | 0;
	    hi = (hi + Math.imul(ah0, bh3)) | 0;
	    var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
	    w3 &= 0x3ffffff;
	    /* k = 4 */
	    lo = Math.imul(al4, bl0);
	    mid = Math.imul(al4, bh0);
	    mid = (mid + Math.imul(ah4, bl0)) | 0;
	    hi = Math.imul(ah4, bh0);
	    lo = (lo + Math.imul(al3, bl1)) | 0;
	    mid = (mid + Math.imul(al3, bh1)) | 0;
	    mid = (mid + Math.imul(ah3, bl1)) | 0;
	    hi = (hi + Math.imul(ah3, bh1)) | 0;
	    lo = (lo + Math.imul(al2, bl2)) | 0;
	    mid = (mid + Math.imul(al2, bh2)) | 0;
	    mid = (mid + Math.imul(ah2, bl2)) | 0;
	    hi = (hi + Math.imul(ah2, bh2)) | 0;
	    lo = (lo + Math.imul(al1, bl3)) | 0;
	    mid = (mid + Math.imul(al1, bh3)) | 0;
	    mid = (mid + Math.imul(ah1, bl3)) | 0;
	    hi = (hi + Math.imul(ah1, bh3)) | 0;
	    lo = (lo + Math.imul(al0, bl4)) | 0;
	    mid = (mid + Math.imul(al0, bh4)) | 0;
	    mid = (mid + Math.imul(ah0, bl4)) | 0;
	    hi = (hi + Math.imul(ah0, bh4)) | 0;
	    var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
	    w4 &= 0x3ffffff;
	    /* k = 5 */
	    lo = Math.imul(al5, bl0);
	    mid = Math.imul(al5, bh0);
	    mid = (mid + Math.imul(ah5, bl0)) | 0;
	    hi = Math.imul(ah5, bh0);
	    lo = (lo + Math.imul(al4, bl1)) | 0;
	    mid = (mid + Math.imul(al4, bh1)) | 0;
	    mid = (mid + Math.imul(ah4, bl1)) | 0;
	    hi = (hi + Math.imul(ah4, bh1)) | 0;
	    lo = (lo + Math.imul(al3, bl2)) | 0;
	    mid = (mid + Math.imul(al3, bh2)) | 0;
	    mid = (mid + Math.imul(ah3, bl2)) | 0;
	    hi = (hi + Math.imul(ah3, bh2)) | 0;
	    lo = (lo + Math.imul(al2, bl3)) | 0;
	    mid = (mid + Math.imul(al2, bh3)) | 0;
	    mid = (mid + Math.imul(ah2, bl3)) | 0;
	    hi = (hi + Math.imul(ah2, bh3)) | 0;
	    lo = (lo + Math.imul(al1, bl4)) | 0;
	    mid = (mid + Math.imul(al1, bh4)) | 0;
	    mid = (mid + Math.imul(ah1, bl4)) | 0;
	    hi = (hi + Math.imul(ah1, bh4)) | 0;
	    lo = (lo + Math.imul(al0, bl5)) | 0;
	    mid = (mid + Math.imul(al0, bh5)) | 0;
	    mid = (mid + Math.imul(ah0, bl5)) | 0;
	    hi = (hi + Math.imul(ah0, bh5)) | 0;
	    var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
	    w5 &= 0x3ffffff;
	    /* k = 6 */
	    lo = Math.imul(al6, bl0);
	    mid = Math.imul(al6, bh0);
	    mid = (mid + Math.imul(ah6, bl0)) | 0;
	    hi = Math.imul(ah6, bh0);
	    lo = (lo + Math.imul(al5, bl1)) | 0;
	    mid = (mid + Math.imul(al5, bh1)) | 0;
	    mid = (mid + Math.imul(ah5, bl1)) | 0;
	    hi = (hi + Math.imul(ah5, bh1)) | 0;
	    lo = (lo + Math.imul(al4, bl2)) | 0;
	    mid = (mid + Math.imul(al4, bh2)) | 0;
	    mid = (mid + Math.imul(ah4, bl2)) | 0;
	    hi = (hi + Math.imul(ah4, bh2)) | 0;
	    lo = (lo + Math.imul(al3, bl3)) | 0;
	    mid = (mid + Math.imul(al3, bh3)) | 0;
	    mid = (mid + Math.imul(ah3, bl3)) | 0;
	    hi = (hi + Math.imul(ah3, bh3)) | 0;
	    lo = (lo + Math.imul(al2, bl4)) | 0;
	    mid = (mid + Math.imul(al2, bh4)) | 0;
	    mid = (mid + Math.imul(ah2, bl4)) | 0;
	    hi = (hi + Math.imul(ah2, bh4)) | 0;
	    lo = (lo + Math.imul(al1, bl5)) | 0;
	    mid = (mid + Math.imul(al1, bh5)) | 0;
	    mid = (mid + Math.imul(ah1, bl5)) | 0;
	    hi = (hi + Math.imul(ah1, bh5)) | 0;
	    lo = (lo + Math.imul(al0, bl6)) | 0;
	    mid = (mid + Math.imul(al0, bh6)) | 0;
	    mid = (mid + Math.imul(ah0, bl6)) | 0;
	    hi = (hi + Math.imul(ah0, bh6)) | 0;
	    var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
	    w6 &= 0x3ffffff;
	    /* k = 7 */
	    lo = Math.imul(al7, bl0);
	    mid = Math.imul(al7, bh0);
	    mid = (mid + Math.imul(ah7, bl0)) | 0;
	    hi = Math.imul(ah7, bh0);
	    lo = (lo + Math.imul(al6, bl1)) | 0;
	    mid = (mid + Math.imul(al6, bh1)) | 0;
	    mid = (mid + Math.imul(ah6, bl1)) | 0;
	    hi = (hi + Math.imul(ah6, bh1)) | 0;
	    lo = (lo + Math.imul(al5, bl2)) | 0;
	    mid = (mid + Math.imul(al5, bh2)) | 0;
	    mid = (mid + Math.imul(ah5, bl2)) | 0;
	    hi = (hi + Math.imul(ah5, bh2)) | 0;
	    lo = (lo + Math.imul(al4, bl3)) | 0;
	    mid = (mid + Math.imul(al4, bh3)) | 0;
	    mid = (mid + Math.imul(ah4, bl3)) | 0;
	    hi = (hi + Math.imul(ah4, bh3)) | 0;
	    lo = (lo + Math.imul(al3, bl4)) | 0;
	    mid = (mid + Math.imul(al3, bh4)) | 0;
	    mid = (mid + Math.imul(ah3, bl4)) | 0;
	    hi = (hi + Math.imul(ah3, bh4)) | 0;
	    lo = (lo + Math.imul(al2, bl5)) | 0;
	    mid = (mid + Math.imul(al2, bh5)) | 0;
	    mid = (mid + Math.imul(ah2, bl5)) | 0;
	    hi = (hi + Math.imul(ah2, bh5)) | 0;
	    lo = (lo + Math.imul(al1, bl6)) | 0;
	    mid = (mid + Math.imul(al1, bh6)) | 0;
	    mid = (mid + Math.imul(ah1, bl6)) | 0;
	    hi = (hi + Math.imul(ah1, bh6)) | 0;
	    lo = (lo + Math.imul(al0, bl7)) | 0;
	    mid = (mid + Math.imul(al0, bh7)) | 0;
	    mid = (mid + Math.imul(ah0, bl7)) | 0;
	    hi = (hi + Math.imul(ah0, bh7)) | 0;
	    var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
	    w7 &= 0x3ffffff;
	    /* k = 8 */
	    lo = Math.imul(al8, bl0);
	    mid = Math.imul(al8, bh0);
	    mid = (mid + Math.imul(ah8, bl0)) | 0;
	    hi = Math.imul(ah8, bh0);
	    lo = (lo + Math.imul(al7, bl1)) | 0;
	    mid = (mid + Math.imul(al7, bh1)) | 0;
	    mid = (mid + Math.imul(ah7, bl1)) | 0;
	    hi = (hi + Math.imul(ah7, bh1)) | 0;
	    lo = (lo + Math.imul(al6, bl2)) | 0;
	    mid = (mid + Math.imul(al6, bh2)) | 0;
	    mid = (mid + Math.imul(ah6, bl2)) | 0;
	    hi = (hi + Math.imul(ah6, bh2)) | 0;
	    lo = (lo + Math.imul(al5, bl3)) | 0;
	    mid = (mid + Math.imul(al5, bh3)) | 0;
	    mid = (mid + Math.imul(ah5, bl3)) | 0;
	    hi = (hi + Math.imul(ah5, bh3)) | 0;
	    lo = (lo + Math.imul(al4, bl4)) | 0;
	    mid = (mid + Math.imul(al4, bh4)) | 0;
	    mid = (mid + Math.imul(ah4, bl4)) | 0;
	    hi = (hi + Math.imul(ah4, bh4)) | 0;
	    lo = (lo + Math.imul(al3, bl5)) | 0;
	    mid = (mid + Math.imul(al3, bh5)) | 0;
	    mid = (mid + Math.imul(ah3, bl5)) | 0;
	    hi = (hi + Math.imul(ah3, bh5)) | 0;
	    lo = (lo + Math.imul(al2, bl6)) | 0;
	    mid = (mid + Math.imul(al2, bh6)) | 0;
	    mid = (mid + Math.imul(ah2, bl6)) | 0;
	    hi = (hi + Math.imul(ah2, bh6)) | 0;
	    lo = (lo + Math.imul(al1, bl7)) | 0;
	    mid = (mid + Math.imul(al1, bh7)) | 0;
	    mid = (mid + Math.imul(ah1, bl7)) | 0;
	    hi = (hi + Math.imul(ah1, bh7)) | 0;
	    lo = (lo + Math.imul(al0, bl8)) | 0;
	    mid = (mid + Math.imul(al0, bh8)) | 0;
	    mid = (mid + Math.imul(ah0, bl8)) | 0;
	    hi = (hi + Math.imul(ah0, bh8)) | 0;
	    var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
	    w8 &= 0x3ffffff;
	    /* k = 9 */
	    lo = Math.imul(al9, bl0);
	    mid = Math.imul(al9, bh0);
	    mid = (mid + Math.imul(ah9, bl0)) | 0;
	    hi = Math.imul(ah9, bh0);
	    lo = (lo + Math.imul(al8, bl1)) | 0;
	    mid = (mid + Math.imul(al8, bh1)) | 0;
	    mid = (mid + Math.imul(ah8, bl1)) | 0;
	    hi = (hi + Math.imul(ah8, bh1)) | 0;
	    lo = (lo + Math.imul(al7, bl2)) | 0;
	    mid = (mid + Math.imul(al7, bh2)) | 0;
	    mid = (mid + Math.imul(ah7, bl2)) | 0;
	    hi = (hi + Math.imul(ah7, bh2)) | 0;
	    lo = (lo + Math.imul(al6, bl3)) | 0;
	    mid = (mid + Math.imul(al6, bh3)) | 0;
	    mid = (mid + Math.imul(ah6, bl3)) | 0;
	    hi = (hi + Math.imul(ah6, bh3)) | 0;
	    lo = (lo + Math.imul(al5, bl4)) | 0;
	    mid = (mid + Math.imul(al5, bh4)) | 0;
	    mid = (mid + Math.imul(ah5, bl4)) | 0;
	    hi = (hi + Math.imul(ah5, bh4)) | 0;
	    lo = (lo + Math.imul(al4, bl5)) | 0;
	    mid = (mid + Math.imul(al4, bh5)) | 0;
	    mid = (mid + Math.imul(ah4, bl5)) | 0;
	    hi = (hi + Math.imul(ah4, bh5)) | 0;
	    lo = (lo + Math.imul(al3, bl6)) | 0;
	    mid = (mid + Math.imul(al3, bh6)) | 0;
	    mid = (mid + Math.imul(ah3, bl6)) | 0;
	    hi = (hi + Math.imul(ah3, bh6)) | 0;
	    lo = (lo + Math.imul(al2, bl7)) | 0;
	    mid = (mid + Math.imul(al2, bh7)) | 0;
	    mid = (mid + Math.imul(ah2, bl7)) | 0;
	    hi = (hi + Math.imul(ah2, bh7)) | 0;
	    lo = (lo + Math.imul(al1, bl8)) | 0;
	    mid = (mid + Math.imul(al1, bh8)) | 0;
	    mid = (mid + Math.imul(ah1, bl8)) | 0;
	    hi = (hi + Math.imul(ah1, bh8)) | 0;
	    lo = (lo + Math.imul(al0, bl9)) | 0;
	    mid = (mid + Math.imul(al0, bh9)) | 0;
	    mid = (mid + Math.imul(ah0, bl9)) | 0;
	    hi = (hi + Math.imul(ah0, bh9)) | 0;
	    var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
	    w9 &= 0x3ffffff;
	    /* k = 10 */
	    lo = Math.imul(al9, bl1);
	    mid = Math.imul(al9, bh1);
	    mid = (mid + Math.imul(ah9, bl1)) | 0;
	    hi = Math.imul(ah9, bh1);
	    lo = (lo + Math.imul(al8, bl2)) | 0;
	    mid = (mid + Math.imul(al8, bh2)) | 0;
	    mid = (mid + Math.imul(ah8, bl2)) | 0;
	    hi = (hi + Math.imul(ah8, bh2)) | 0;
	    lo = (lo + Math.imul(al7, bl3)) | 0;
	    mid = (mid + Math.imul(al7, bh3)) | 0;
	    mid = (mid + Math.imul(ah7, bl3)) | 0;
	    hi = (hi + Math.imul(ah7, bh3)) | 0;
	    lo = (lo + Math.imul(al6, bl4)) | 0;
	    mid = (mid + Math.imul(al6, bh4)) | 0;
	    mid = (mid + Math.imul(ah6, bl4)) | 0;
	    hi = (hi + Math.imul(ah6, bh4)) | 0;
	    lo = (lo + Math.imul(al5, bl5)) | 0;
	    mid = (mid + Math.imul(al5, bh5)) | 0;
	    mid = (mid + Math.imul(ah5, bl5)) | 0;
	    hi = (hi + Math.imul(ah5, bh5)) | 0;
	    lo = (lo + Math.imul(al4, bl6)) | 0;
	    mid = (mid + Math.imul(al4, bh6)) | 0;
	    mid = (mid + Math.imul(ah4, bl6)) | 0;
	    hi = (hi + Math.imul(ah4, bh6)) | 0;
	    lo = (lo + Math.imul(al3, bl7)) | 0;
	    mid = (mid + Math.imul(al3, bh7)) | 0;
	    mid = (mid + Math.imul(ah3, bl7)) | 0;
	    hi = (hi + Math.imul(ah3, bh7)) | 0;
	    lo = (lo + Math.imul(al2, bl8)) | 0;
	    mid = (mid + Math.imul(al2, bh8)) | 0;
	    mid = (mid + Math.imul(ah2, bl8)) | 0;
	    hi = (hi + Math.imul(ah2, bh8)) | 0;
	    lo = (lo + Math.imul(al1, bl9)) | 0;
	    mid = (mid + Math.imul(al1, bh9)) | 0;
	    mid = (mid + Math.imul(ah1, bl9)) | 0;
	    hi = (hi + Math.imul(ah1, bh9)) | 0;
	    var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
	    w10 &= 0x3ffffff;
	    /* k = 11 */
	    lo = Math.imul(al9, bl2);
	    mid = Math.imul(al9, bh2);
	    mid = (mid + Math.imul(ah9, bl2)) | 0;
	    hi = Math.imul(ah9, bh2);
	    lo = (lo + Math.imul(al8, bl3)) | 0;
	    mid = (mid + Math.imul(al8, bh3)) | 0;
	    mid = (mid + Math.imul(ah8, bl3)) | 0;
	    hi = (hi + Math.imul(ah8, bh3)) | 0;
	    lo = (lo + Math.imul(al7, bl4)) | 0;
	    mid = (mid + Math.imul(al7, bh4)) | 0;
	    mid = (mid + Math.imul(ah7, bl4)) | 0;
	    hi = (hi + Math.imul(ah7, bh4)) | 0;
	    lo = (lo + Math.imul(al6, bl5)) | 0;
	    mid = (mid + Math.imul(al6, bh5)) | 0;
	    mid = (mid + Math.imul(ah6, bl5)) | 0;
	    hi = (hi + Math.imul(ah6, bh5)) | 0;
	    lo = (lo + Math.imul(al5, bl6)) | 0;
	    mid = (mid + Math.imul(al5, bh6)) | 0;
	    mid = (mid + Math.imul(ah5, bl6)) | 0;
	    hi = (hi + Math.imul(ah5, bh6)) | 0;
	    lo = (lo + Math.imul(al4, bl7)) | 0;
	    mid = (mid + Math.imul(al4, bh7)) | 0;
	    mid = (mid + Math.imul(ah4, bl7)) | 0;
	    hi = (hi + Math.imul(ah4, bh7)) | 0;
	    lo = (lo + Math.imul(al3, bl8)) | 0;
	    mid = (mid + Math.imul(al3, bh8)) | 0;
	    mid = (mid + Math.imul(ah3, bl8)) | 0;
	    hi = (hi + Math.imul(ah3, bh8)) | 0;
	    lo = (lo + Math.imul(al2, bl9)) | 0;
	    mid = (mid + Math.imul(al2, bh9)) | 0;
	    mid = (mid + Math.imul(ah2, bl9)) | 0;
	    hi = (hi + Math.imul(ah2, bh9)) | 0;
	    var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
	    w11 &= 0x3ffffff;
	    /* k = 12 */
	    lo = Math.imul(al9, bl3);
	    mid = Math.imul(al9, bh3);
	    mid = (mid + Math.imul(ah9, bl3)) | 0;
	    hi = Math.imul(ah9, bh3);
	    lo = (lo + Math.imul(al8, bl4)) | 0;
	    mid = (mid + Math.imul(al8, bh4)) | 0;
	    mid = (mid + Math.imul(ah8, bl4)) | 0;
	    hi = (hi + Math.imul(ah8, bh4)) | 0;
	    lo = (lo + Math.imul(al7, bl5)) | 0;
	    mid = (mid + Math.imul(al7, bh5)) | 0;
	    mid = (mid + Math.imul(ah7, bl5)) | 0;
	    hi = (hi + Math.imul(ah7, bh5)) | 0;
	    lo = (lo + Math.imul(al6, bl6)) | 0;
	    mid = (mid + Math.imul(al6, bh6)) | 0;
	    mid = (mid + Math.imul(ah6, bl6)) | 0;
	    hi = (hi + Math.imul(ah6, bh6)) | 0;
	    lo = (lo + Math.imul(al5, bl7)) | 0;
	    mid = (mid + Math.imul(al5, bh7)) | 0;
	    mid = (mid + Math.imul(ah5, bl7)) | 0;
	    hi = (hi + Math.imul(ah5, bh7)) | 0;
	    lo = (lo + Math.imul(al4, bl8)) | 0;
	    mid = (mid + Math.imul(al4, bh8)) | 0;
	    mid = (mid + Math.imul(ah4, bl8)) | 0;
	    hi = (hi + Math.imul(ah4, bh8)) | 0;
	    lo = (lo + Math.imul(al3, bl9)) | 0;
	    mid = (mid + Math.imul(al3, bh9)) | 0;
	    mid = (mid + Math.imul(ah3, bl9)) | 0;
	    hi = (hi + Math.imul(ah3, bh9)) | 0;
	    var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
	    w12 &= 0x3ffffff;
	    /* k = 13 */
	    lo = Math.imul(al9, bl4);
	    mid = Math.imul(al9, bh4);
	    mid = (mid + Math.imul(ah9, bl4)) | 0;
	    hi = Math.imul(ah9, bh4);
	    lo = (lo + Math.imul(al8, bl5)) | 0;
	    mid = (mid + Math.imul(al8, bh5)) | 0;
	    mid = (mid + Math.imul(ah8, bl5)) | 0;
	    hi = (hi + Math.imul(ah8, bh5)) | 0;
	    lo = (lo + Math.imul(al7, bl6)) | 0;
	    mid = (mid + Math.imul(al7, bh6)) | 0;
	    mid = (mid + Math.imul(ah7, bl6)) | 0;
	    hi = (hi + Math.imul(ah7, bh6)) | 0;
	    lo = (lo + Math.imul(al6, bl7)) | 0;
	    mid = (mid + Math.imul(al6, bh7)) | 0;
	    mid = (mid + Math.imul(ah6, bl7)) | 0;
	    hi = (hi + Math.imul(ah6, bh7)) | 0;
	    lo = (lo + Math.imul(al5, bl8)) | 0;
	    mid = (mid + Math.imul(al5, bh8)) | 0;
	    mid = (mid + Math.imul(ah5, bl8)) | 0;
	    hi = (hi + Math.imul(ah5, bh8)) | 0;
	    lo = (lo + Math.imul(al4, bl9)) | 0;
	    mid = (mid + Math.imul(al4, bh9)) | 0;
	    mid = (mid + Math.imul(ah4, bl9)) | 0;
	    hi = (hi + Math.imul(ah4, bh9)) | 0;
	    var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
	    w13 &= 0x3ffffff;
	    /* k = 14 */
	    lo = Math.imul(al9, bl5);
	    mid = Math.imul(al9, bh5);
	    mid = (mid + Math.imul(ah9, bl5)) | 0;
	    hi = Math.imul(ah9, bh5);
	    lo = (lo + Math.imul(al8, bl6)) | 0;
	    mid = (mid + Math.imul(al8, bh6)) | 0;
	    mid = (mid + Math.imul(ah8, bl6)) | 0;
	    hi = (hi + Math.imul(ah8, bh6)) | 0;
	    lo = (lo + Math.imul(al7, bl7)) | 0;
	    mid = (mid + Math.imul(al7, bh7)) | 0;
	    mid = (mid + Math.imul(ah7, bl7)) | 0;
	    hi = (hi + Math.imul(ah7, bh7)) | 0;
	    lo = (lo + Math.imul(al6, bl8)) | 0;
	    mid = (mid + Math.imul(al6, bh8)) | 0;
	    mid = (mid + Math.imul(ah6, bl8)) | 0;
	    hi = (hi + Math.imul(ah6, bh8)) | 0;
	    lo = (lo + Math.imul(al5, bl9)) | 0;
	    mid = (mid + Math.imul(al5, bh9)) | 0;
	    mid = (mid + Math.imul(ah5, bl9)) | 0;
	    hi = (hi + Math.imul(ah5, bh9)) | 0;
	    var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
	    w14 &= 0x3ffffff;
	    /* k = 15 */
	    lo = Math.imul(al9, bl6);
	    mid = Math.imul(al9, bh6);
	    mid = (mid + Math.imul(ah9, bl6)) | 0;
	    hi = Math.imul(ah9, bh6);
	    lo = (lo + Math.imul(al8, bl7)) | 0;
	    mid = (mid + Math.imul(al8, bh7)) | 0;
	    mid = (mid + Math.imul(ah8, bl7)) | 0;
	    hi = (hi + Math.imul(ah8, bh7)) | 0;
	    lo = (lo + Math.imul(al7, bl8)) | 0;
	    mid = (mid + Math.imul(al7, bh8)) | 0;
	    mid = (mid + Math.imul(ah7, bl8)) | 0;
	    hi = (hi + Math.imul(ah7, bh8)) | 0;
	    lo = (lo + Math.imul(al6, bl9)) | 0;
	    mid = (mid + Math.imul(al6, bh9)) | 0;
	    mid = (mid + Math.imul(ah6, bl9)) | 0;
	    hi = (hi + Math.imul(ah6, bh9)) | 0;
	    var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
	    w15 &= 0x3ffffff;
	    /* k = 16 */
	    lo = Math.imul(al9, bl7);
	    mid = Math.imul(al9, bh7);
	    mid = (mid + Math.imul(ah9, bl7)) | 0;
	    hi = Math.imul(ah9, bh7);
	    lo = (lo + Math.imul(al8, bl8)) | 0;
	    mid = (mid + Math.imul(al8, bh8)) | 0;
	    mid = (mid + Math.imul(ah8, bl8)) | 0;
	    hi = (hi + Math.imul(ah8, bh8)) | 0;
	    lo = (lo + Math.imul(al7, bl9)) | 0;
	    mid = (mid + Math.imul(al7, bh9)) | 0;
	    mid = (mid + Math.imul(ah7, bl9)) | 0;
	    hi = (hi + Math.imul(ah7, bh9)) | 0;
	    var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
	    w16 &= 0x3ffffff;
	    /* k = 17 */
	    lo = Math.imul(al9, bl8);
	    mid = Math.imul(al9, bh8);
	    mid = (mid + Math.imul(ah9, bl8)) | 0;
	    hi = Math.imul(ah9, bh8);
	    lo = (lo + Math.imul(al8, bl9)) | 0;
	    mid = (mid + Math.imul(al8, bh9)) | 0;
	    mid = (mid + Math.imul(ah8, bl9)) | 0;
	    hi = (hi + Math.imul(ah8, bh9)) | 0;
	    var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
	    w17 &= 0x3ffffff;
	    /* k = 18 */
	    lo = Math.imul(al9, bl9);
	    mid = Math.imul(al9, bh9);
	    mid = (mid + Math.imul(ah9, bl9)) | 0;
	    hi = Math.imul(ah9, bh9);
	    var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
	    w18 &= 0x3ffffff;
	    o[0] = w0;
	    o[1] = w1;
	    o[2] = w2;
	    o[3] = w3;
	    o[4] = w4;
	    o[5] = w5;
	    o[6] = w6;
	    o[7] = w7;
	    o[8] = w8;
	    o[9] = w9;
	    o[10] = w10;
	    o[11] = w11;
	    o[12] = w12;
	    o[13] = w13;
	    o[14] = w14;
	    o[15] = w15;
	    o[16] = w16;
	    o[17] = w17;
	    o[18] = w18;
	    if (c !== 0) {
	      o[19] = c;
	      out.length++;
	    }
	    return out;
	  };

	  // Polyfill comb
	  if (!Math.imul) {
	    comb10MulTo = smallMulTo;
	  }

	  function bigMulTo (self, num, out) {
	    out.negative = num.negative ^ self.negative;
	    out.length = self.length + num.length;

	    var carry = 0;
	    var hncarry = 0;
	    for (var k = 0; k < out.length - 1; k++) {
	      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
	      // note that ncarry could be >= 0x3ffffff
	      var ncarry = hncarry;
	      hncarry = 0;
	      var rword = carry & 0x3ffffff;
	      var maxJ = Math.min(k, num.length - 1);
	      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
	        var i = k - j;
	        var a = self.words[i] | 0;
	        var b = num.words[j] | 0;
	        var r = a * b;

	        var lo = r & 0x3ffffff;
	        ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
	        lo = (lo + rword) | 0;
	        rword = lo & 0x3ffffff;
	        ncarry = (ncarry + (lo >>> 26)) | 0;

	        hncarry += ncarry >>> 26;
	        ncarry &= 0x3ffffff;
	      }
	      out.words[k] = rword;
	      carry = ncarry;
	      ncarry = hncarry;
	    }
	    if (carry !== 0) {
	      out.words[k] = carry;
	    } else {
	      out.length--;
	    }

	    return out.strip();
	  }

	  function jumboMulTo (self, num, out) {
	    var fftm = new FFTM();
	    return fftm.mulp(self, num, out);
	  }

	  BN.prototype.mulTo = function mulTo (num, out) {
	    var res;
	    var len = this.length + num.length;
	    if (this.length === 10 && num.length === 10) {
	      res = comb10MulTo(this, num, out);
	    } else if (len < 63) {
	      res = smallMulTo(this, num, out);
	    } else if (len < 1024) {
	      res = bigMulTo(this, num, out);
	    } else {
	      res = jumboMulTo(this, num, out);
	    }

	    return res;
	  };

	  // Cooley-Tukey algorithm for FFT
	  // slightly revisited to rely on looping instead of recursion

	  function FFTM (x, y) {
	    this.x = x;
	    this.y = y;
	  }

	  FFTM.prototype.makeRBT = function makeRBT (N) {
	    var t = new Array(N);
	    var l = BN.prototype._countBits(N) - 1;
	    for (var i = 0; i < N; i++) {
	      t[i] = this.revBin(i, l, N);
	    }

	    return t;
	  };

	  // Returns binary-reversed representation of `x`
	  FFTM.prototype.revBin = function revBin (x, l, N) {
	    if (x === 0 || x === N - 1) return x;

	    var rb = 0;
	    for (var i = 0; i < l; i++) {
	      rb |= (x & 1) << (l - i - 1);
	      x >>= 1;
	    }

	    return rb;
	  };

	  // Performs "tweedling" phase, therefore 'emulating'
	  // behaviour of the recursive algorithm
	  FFTM.prototype.permute = function permute (rbt, rws, iws, rtws, itws, N) {
	    for (var i = 0; i < N; i++) {
	      rtws[i] = rws[rbt[i]];
	      itws[i] = iws[rbt[i]];
	    }
	  };

	  FFTM.prototype.transform = function transform (rws, iws, rtws, itws, N, rbt) {
	    this.permute(rbt, rws, iws, rtws, itws, N);

	    for (var s = 1; s < N; s <<= 1) {
	      var l = s << 1;

	      var rtwdf = Math.cos(2 * Math.PI / l);
	      var itwdf = Math.sin(2 * Math.PI / l);

	      for (var p = 0; p < N; p += l) {
	        var rtwdf_ = rtwdf;
	        var itwdf_ = itwdf;

	        for (var j = 0; j < s; j++) {
	          var re = rtws[p + j];
	          var ie = itws[p + j];

	          var ro = rtws[p + j + s];
	          var io = itws[p + j + s];

	          var rx = rtwdf_ * ro - itwdf_ * io;

	          io = rtwdf_ * io + itwdf_ * ro;
	          ro = rx;

	          rtws[p + j] = re + ro;
	          itws[p + j] = ie + io;

	          rtws[p + j + s] = re - ro;
	          itws[p + j + s] = ie - io;

	          /* jshint maxdepth : false */
	          if (j !== l) {
	            rx = rtwdf * rtwdf_ - itwdf * itwdf_;

	            itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
	            rtwdf_ = rx;
	          }
	        }
	      }
	    }
	  };

	  FFTM.prototype.guessLen13b = function guessLen13b (n, m) {
	    var N = Math.max(m, n) | 1;
	    var odd = N & 1;
	    var i = 0;
	    for (N = N / 2 | 0; N; N = N >>> 1) {
	      i++;
	    }

	    return 1 << i + 1 + odd;
	  };

	  FFTM.prototype.conjugate = function conjugate (rws, iws, N) {
	    if (N <= 1) return;

	    for (var i = 0; i < N / 2; i++) {
	      var t = rws[i];

	      rws[i] = rws[N - i - 1];
	      rws[N - i - 1] = t;

	      t = iws[i];

	      iws[i] = -iws[N - i - 1];
	      iws[N - i - 1] = -t;
	    }
	  };

	  FFTM.prototype.normalize13b = function normalize13b (ws, N) {
	    var carry = 0;
	    for (var i = 0; i < N / 2; i++) {
	      var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +
	        Math.round(ws[2 * i] / N) +
	        carry;

	      ws[i] = w & 0x3ffffff;

	      if (w < 0x4000000) {
	        carry = 0;
	      } else {
	        carry = w / 0x4000000 | 0;
	      }
	    }

	    return ws;
	  };

	  FFTM.prototype.convert13b = function convert13b (ws, len, rws, N) {
	    var carry = 0;
	    for (var i = 0; i < len; i++) {
	      carry = carry + (ws[i] | 0);

	      rws[2 * i] = carry & 0x1fff; carry = carry >>> 13;
	      rws[2 * i + 1] = carry & 0x1fff; carry = carry >>> 13;
	    }

	    // Pad with zeroes
	    for (i = 2 * len; i < N; ++i) {
	      rws[i] = 0;
	    }

	    assert(carry === 0);
	    assert((carry & ~0x1fff) === 0);
	  };

	  FFTM.prototype.stub = function stub (N) {
	    var ph = new Array(N);
	    for (var i = 0; i < N; i++) {
	      ph[i] = 0;
	    }

	    return ph;
	  };

	  FFTM.prototype.mulp = function mulp (x, y, out) {
	    var N = 2 * this.guessLen13b(x.length, y.length);

	    var rbt = this.makeRBT(N);

	    var _ = this.stub(N);

	    var rws = new Array(N);
	    var rwst = new Array(N);
	    var iwst = new Array(N);

	    var nrws = new Array(N);
	    var nrwst = new Array(N);
	    var niwst = new Array(N);

	    var rmws = out.words;
	    rmws.length = N;

	    this.convert13b(x.words, x.length, rws, N);
	    this.convert13b(y.words, y.length, nrws, N);

	    this.transform(rws, _, rwst, iwst, N, rbt);
	    this.transform(nrws, _, nrwst, niwst, N, rbt);

	    for (var i = 0; i < N; i++) {
	      var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
	      iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
	      rwst[i] = rx;
	    }

	    this.conjugate(rwst, iwst, N);
	    this.transform(rwst, iwst, rmws, _, N, rbt);
	    this.conjugate(rmws, _, N);
	    this.normalize13b(rmws, N);

	    out.negative = x.negative ^ y.negative;
	    out.length = x.length + y.length;
	    return out.strip();
	  };

	  // Multiply `this` by `num`
	  BN.prototype.mul = function mul (num) {
	    var out = new BN(null);
	    out.words = new Array(this.length + num.length);
	    return this.mulTo(num, out);
	  };

	  // Multiply employing FFT
	  BN.prototype.mulf = function mulf (num) {
	    var out = new BN(null);
	    out.words = new Array(this.length + num.length);
	    return jumboMulTo(this, num, out);
	  };

	  // In-place Multiplication
	  BN.prototype.imul = function imul (num) {
	    return this.clone().mulTo(num, this);
	  };

	  BN.prototype.imuln = function imuln (num) {
	    assert(typeof num === 'number');
	    assert(num < 0x4000000);

	    // Carry
	    var carry = 0;
	    for (var i = 0; i < this.length; i++) {
	      var w = (this.words[i] | 0) * num;
	      var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
	      carry >>= 26;
	      carry += (w / 0x4000000) | 0;
	      // NOTE: lo is 27bit maximum
	      carry += lo >>> 26;
	      this.words[i] = lo & 0x3ffffff;
	    }

	    if (carry !== 0) {
	      this.words[i] = carry;
	      this.length++;
	    }

	    return this;
	  };

	  BN.prototype.muln = function muln (num) {
	    return this.clone().imuln(num);
	  };

	  // `this` * `this`
	  BN.prototype.sqr = function sqr () {
	    return this.mul(this);
	  };

	  // `this` * `this` in-place
	  BN.prototype.isqr = function isqr () {
	    return this.imul(this.clone());
	  };

	  // Math.pow(`this`, `num`)
	  BN.prototype.pow = function pow (num) {
	    var w = toBitArray(num);
	    if (w.length === 0) return new BN(1);

	    // Skip leading zeroes
	    var res = this;
	    for (var i = 0; i < w.length; i++, res = res.sqr()) {
	      if (w[i] !== 0) break;
	    }

	    if (++i < w.length) {
	      for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
	        if (w[i] === 0) continue;

	        res = res.mul(q);
	      }
	    }

	    return res;
	  };

	  // Shift-left in-place
	  BN.prototype.iushln = function iushln (bits) {
	    assert(typeof bits === 'number' && bits >= 0);
	    var r = bits % 26;
	    var s = (bits - r) / 26;
	    var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
	    var i;

	    if (r !== 0) {
	      var carry = 0;

	      for (i = 0; i < this.length; i++) {
	        var newCarry = this.words[i] & carryMask;
	        var c = ((this.words[i] | 0) - newCarry) << r;
	        this.words[i] = c | carry;
	        carry = newCarry >>> (26 - r);
	      }

	      if (carry) {
	        this.words[i] = carry;
	        this.length++;
	      }
	    }

	    if (s !== 0) {
	      for (i = this.length - 1; i >= 0; i--) {
	        this.words[i + s] = this.words[i];
	      }

	      for (i = 0; i < s; i++) {
	        this.words[i] = 0;
	      }

	      this.length += s;
	    }

	    return this.strip();
	  };

	  BN.prototype.ishln = function ishln (bits) {
	    // TODO(indutny): implement me
	    assert(this.negative === 0);
	    return this.iushln(bits);
	  };

	  // Shift-right in-place
	  // NOTE: `hint` is a lowest bit before trailing zeroes
	  // NOTE: if `extended` is present - it will be filled with destroyed bits
	  BN.prototype.iushrn = function iushrn (bits, hint, extended) {
	    assert(typeof bits === 'number' && bits >= 0);
	    var h;
	    if (hint) {
	      h = (hint - (hint % 26)) / 26;
	    } else {
	      h = 0;
	    }

	    var r = bits % 26;
	    var s = Math.min((bits - r) / 26, this.length);
	    var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
	    var maskedWords = extended;

	    h -= s;
	    h = Math.max(0, h);

	    // Extended mode, copy masked part
	    if (maskedWords) {
	      for (var i = 0; i < s; i++) {
	        maskedWords.words[i] = this.words[i];
	      }
	      maskedWords.length = s;
	    }

	    if (s === 0) ; else if (this.length > s) {
	      this.length -= s;
	      for (i = 0; i < this.length; i++) {
	        this.words[i] = this.words[i + s];
	      }
	    } else {
	      this.words[0] = 0;
	      this.length = 1;
	    }

	    var carry = 0;
	    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
	      var word = this.words[i] | 0;
	      this.words[i] = (carry << (26 - r)) | (word >>> r);
	      carry = word & mask;
	    }

	    // Push carried bits as a mask
	    if (maskedWords && carry !== 0) {
	      maskedWords.words[maskedWords.length++] = carry;
	    }

	    if (this.length === 0) {
	      this.words[0] = 0;
	      this.length = 1;
	    }

	    return this.strip();
	  };

	  BN.prototype.ishrn = function ishrn (bits, hint, extended) {
	    // TODO(indutny): implement me
	    assert(this.negative === 0);
	    return this.iushrn(bits, hint, extended);
	  };

	  // Shift-left
	  BN.prototype.shln = function shln (bits) {
	    return this.clone().ishln(bits);
	  };

	  BN.prototype.ushln = function ushln (bits) {
	    return this.clone().iushln(bits);
	  };

	  // Shift-right
	  BN.prototype.shrn = function shrn (bits) {
	    return this.clone().ishrn(bits);
	  };

	  BN.prototype.ushrn = function ushrn (bits) {
	    return this.clone().iushrn(bits);
	  };

	  // Test if n bit is set
	  BN.prototype.testn = function testn (bit) {
	    assert(typeof bit === 'number' && bit >= 0);
	    var r = bit % 26;
	    var s = (bit - r) / 26;
	    var q = 1 << r;

	    // Fast case: bit is much higher than all existing words
	    if (this.length <= s) return false;

	    // Check bit and return
	    var w = this.words[s];

	    return !!(w & q);
	  };

	  // Return only lowers bits of number (in-place)
	  BN.prototype.imaskn = function imaskn (bits) {
	    assert(typeof bits === 'number' && bits >= 0);
	    var r = bits % 26;
	    var s = (bits - r) / 26;

	    assert(this.negative === 0, 'imaskn works only with positive numbers');

	    if (this.length <= s) {
	      return this;
	    }

	    if (r !== 0) {
	      s++;
	    }
	    this.length = Math.min(s, this.length);

	    if (r !== 0) {
	      var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
	      this.words[this.length - 1] &= mask;
	    }

	    return this.strip();
	  };

	  // Return only lowers bits of number
	  BN.prototype.maskn = function maskn (bits) {
	    return this.clone().imaskn(bits);
	  };

	  // Add plain number `num` to `this`
	  BN.prototype.iaddn = function iaddn (num) {
	    assert(typeof num === 'number');
	    assert(num < 0x4000000);
	    if (num < 0) return this.isubn(-num);

	    // Possible sign change
	    if (this.negative !== 0) {
	      if (this.length === 1 && (this.words[0] | 0) < num) {
	        this.words[0] = num - (this.words[0] | 0);
	        this.negative = 0;
	        return this;
	      }

	      this.negative = 0;
	      this.isubn(num);
	      this.negative = 1;
	      return this;
	    }

	    // Add without checks
	    return this._iaddn(num);
	  };

	  BN.prototype._iaddn = function _iaddn (num) {
	    this.words[0] += num;

	    // Carry
	    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
	      this.words[i] -= 0x4000000;
	      if (i === this.length - 1) {
	        this.words[i + 1] = 1;
	      } else {
	        this.words[i + 1]++;
	      }
	    }
	    this.length = Math.max(this.length, i + 1);

	    return this;
	  };

	  // Subtract plain number `num` from `this`
	  BN.prototype.isubn = function isubn (num) {
	    assert(typeof num === 'number');
	    assert(num < 0x4000000);
	    if (num < 0) return this.iaddn(-num);

	    if (this.negative !== 0) {
	      this.negative = 0;
	      this.iaddn(num);
	      this.negative = 1;
	      return this;
	    }

	    this.words[0] -= num;

	    if (this.length === 1 && this.words[0] < 0) {
	      this.words[0] = -this.words[0];
	      this.negative = 1;
	    } else {
	      // Carry
	      for (var i = 0; i < this.length && this.words[i] < 0; i++) {
	        this.words[i] += 0x4000000;
	        this.words[i + 1] -= 1;
	      }
	    }

	    return this.strip();
	  };

	  BN.prototype.addn = function addn (num) {
	    return this.clone().iaddn(num);
	  };

	  BN.prototype.subn = function subn (num) {
	    return this.clone().isubn(num);
	  };

	  BN.prototype.iabs = function iabs () {
	    this.negative = 0;

	    return this;
	  };

	  BN.prototype.abs = function abs () {
	    return this.clone().iabs();
	  };

	  BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
	    var len = num.length + shift;
	    var i;

	    this._expand(len);

	    var w;
	    var carry = 0;
	    for (i = 0; i < num.length; i++) {
	      w = (this.words[i + shift] | 0) + carry;
	      var right = (num.words[i] | 0) * mul;
	      w -= right & 0x3ffffff;
	      carry = (w >> 26) - ((right / 0x4000000) | 0);
	      this.words[i + shift] = w & 0x3ffffff;
	    }
	    for (; i < this.length - shift; i++) {
	      w = (this.words[i + shift] | 0) + carry;
	      carry = w >> 26;
	      this.words[i + shift] = w & 0x3ffffff;
	    }

	    if (carry === 0) return this.strip();

	    // Subtraction overflow
	    assert(carry === -1);
	    carry = 0;
	    for (i = 0; i < this.length; i++) {
	      w = -(this.words[i] | 0) + carry;
	      carry = w >> 26;
	      this.words[i] = w & 0x3ffffff;
	    }
	    this.negative = 1;

	    return this.strip();
	  };

	  BN.prototype._wordDiv = function _wordDiv (num, mode) {
	    var shift = this.length - num.length;

	    var a = this.clone();
	    var b = num;

	    // Normalize
	    var bhi = b.words[b.length - 1] | 0;
	    var bhiBits = this._countBits(bhi);
	    shift = 26 - bhiBits;
	    if (shift !== 0) {
	      b = b.ushln(shift);
	      a.iushln(shift);
	      bhi = b.words[b.length - 1] | 0;
	    }

	    // Initialize quotient
	    var m = a.length - b.length;
	    var q;

	    if (mode !== 'mod') {
	      q = new BN(null);
	      q.length = m + 1;
	      q.words = new Array(q.length);
	      for (var i = 0; i < q.length; i++) {
	        q.words[i] = 0;
	      }
	    }

	    var diff = a.clone()._ishlnsubmul(b, 1, m);
	    if (diff.negative === 0) {
	      a = diff;
	      if (q) {
	        q.words[m] = 1;
	      }
	    }

	    for (var j = m - 1; j >= 0; j--) {
	      var qj = (a.words[b.length + j] | 0) * 0x4000000 +
	        (a.words[b.length + j - 1] | 0);

	      // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
	      // (0x7ffffff)
	      qj = Math.min((qj / bhi) | 0, 0x3ffffff);

	      a._ishlnsubmul(b, qj, j);
	      while (a.negative !== 0) {
	        qj--;
	        a.negative = 0;
	        a._ishlnsubmul(b, 1, j);
	        if (!a.isZero()) {
	          a.negative ^= 1;
	        }
	      }
	      if (q) {
	        q.words[j] = qj;
	      }
	    }
	    if (q) {
	      q.strip();
	    }
	    a.strip();

	    // Denormalize
	    if (mode !== 'div' && shift !== 0) {
	      a.iushrn(shift);
	    }

	    return {
	      div: q || null,
	      mod: a
	    };
	  };

	  // NOTE: 1) `mode` can be set to `mod` to request mod only,
	  //       to `div` to request div only, or be absent to
	  //       request both div & mod
	  //       2) `positive` is true if unsigned mod is requested
	  BN.prototype.divmod = function divmod (num, mode, positive) {
	    assert(!num.isZero());

	    if (this.isZero()) {
	      return {
	        div: new BN(0),
	        mod: new BN(0)
	      };
	    }

	    var div, mod, res;
	    if (this.negative !== 0 && num.negative === 0) {
	      res = this.neg().divmod(num, mode);

	      if (mode !== 'mod') {
	        div = res.div.neg();
	      }

	      if (mode !== 'div') {
	        mod = res.mod.neg();
	        if (positive && mod.negative !== 0) {
	          mod.iadd(num);
	        }
	      }

	      return {
	        div: div,
	        mod: mod
	      };
	    }

	    if (this.negative === 0 && num.negative !== 0) {
	      res = this.divmod(num.neg(), mode);

	      if (mode !== 'mod') {
	        div = res.div.neg();
	      }

	      return {
	        div: div,
	        mod: res.mod
	      };
	    }

	    if ((this.negative & num.negative) !== 0) {
	      res = this.neg().divmod(num.neg(), mode);

	      if (mode !== 'div') {
	        mod = res.mod.neg();
	        if (positive && mod.negative !== 0) {
	          mod.isub(num);
	        }
	      }

	      return {
	        div: res.div,
	        mod: mod
	      };
	    }

	    // Both numbers are positive at this point

	    // Strip both numbers to approximate shift value
	    if (num.length > this.length || this.cmp(num) < 0) {
	      return {
	        div: new BN(0),
	        mod: this
	      };
	    }

	    // Very short reduction
	    if (num.length === 1) {
	      if (mode === 'div') {
	        return {
	          div: this.divn(num.words[0]),
	          mod: null
	        };
	      }

	      if (mode === 'mod') {
	        return {
	          div: null,
	          mod: new BN(this.modn(num.words[0]))
	        };
	      }

	      return {
	        div: this.divn(num.words[0]),
	        mod: new BN(this.modn(num.words[0]))
	      };
	    }

	    return this._wordDiv(num, mode);
	  };

	  // Find `this` / `num`
	  BN.prototype.div = function div (num) {
	    return this.divmod(num, 'div', false).div;
	  };

	  // Find `this` % `num`
	  BN.prototype.mod = function mod (num) {
	    return this.divmod(num, 'mod', false).mod;
	  };

	  BN.prototype.umod = function umod (num) {
	    return this.divmod(num, 'mod', true).mod;
	  };

	  // Find Round(`this` / `num`)
	  BN.prototype.divRound = function divRound (num) {
	    var dm = this.divmod(num);

	    // Fast case - exact division
	    if (dm.mod.isZero()) return dm.div;

	    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

	    var half = num.ushrn(1);
	    var r2 = num.andln(1);
	    var cmp = mod.cmp(half);

	    // Round down
	    if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;

	    // Round up
	    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
	  };

	  BN.prototype.modn = function modn (num) {
	    assert(num <= 0x3ffffff);
	    var p = (1 << 26) % num;

	    var acc = 0;
	    for (var i = this.length - 1; i >= 0; i--) {
	      acc = (p * acc + (this.words[i] | 0)) % num;
	    }

	    return acc;
	  };

	  // In-place division by number
	  BN.prototype.idivn = function idivn (num) {
	    assert(num <= 0x3ffffff);

	    var carry = 0;
	    for (var i = this.length - 1; i >= 0; i--) {
	      var w = (this.words[i] | 0) + carry * 0x4000000;
	      this.words[i] = (w / num) | 0;
	      carry = w % num;
	    }

	    return this.strip();
	  };

	  BN.prototype.divn = function divn (num) {
	    return this.clone().idivn(num);
	  };

	  BN.prototype.egcd = function egcd (p) {
	    assert(p.negative === 0);
	    assert(!p.isZero());

	    var x = this;
	    var y = p.clone();

	    if (x.negative !== 0) {
	      x = x.umod(p);
	    } else {
	      x = x.clone();
	    }

	    // A * x + B * y = x
	    var A = new BN(1);
	    var B = new BN(0);

	    // C * x + D * y = y
	    var C = new BN(0);
	    var D = new BN(1);

	    var g = 0;

	    while (x.isEven() && y.isEven()) {
	      x.iushrn(1);
	      y.iushrn(1);
	      ++g;
	    }

	    var yp = y.clone();
	    var xp = x.clone();

	    while (!x.isZero()) {
	      for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
	      if (i > 0) {
	        x.iushrn(i);
	        while (i-- > 0) {
	          if (A.isOdd() || B.isOdd()) {
	            A.iadd(yp);
	            B.isub(xp);
	          }

	          A.iushrn(1);
	          B.iushrn(1);
	        }
	      }

	      for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
	      if (j > 0) {
	        y.iushrn(j);
	        while (j-- > 0) {
	          if (C.isOdd() || D.isOdd()) {
	            C.iadd(yp);
	            D.isub(xp);
	          }

	          C.iushrn(1);
	          D.iushrn(1);
	        }
	      }

	      if (x.cmp(y) >= 0) {
	        x.isub(y);
	        A.isub(C);
	        B.isub(D);
	      } else {
	        y.isub(x);
	        C.isub(A);
	        D.isub(B);
	      }
	    }

	    return {
	      a: C,
	      b: D,
	      gcd: y.iushln(g)
	    };
	  };

	  // This is reduced incarnation of the binary EEA
	  // above, designated to invert members of the
	  // _prime_ fields F(p) at a maximal speed
	  BN.prototype._invmp = function _invmp (p) {
	    assert(p.negative === 0);
	    assert(!p.isZero());

	    var a = this;
	    var b = p.clone();

	    if (a.negative !== 0) {
	      a = a.umod(p);
	    } else {
	      a = a.clone();
	    }

	    var x1 = new BN(1);
	    var x2 = new BN(0);

	    var delta = b.clone();

	    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
	      for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
	      if (i > 0) {
	        a.iushrn(i);
	        while (i-- > 0) {
	          if (x1.isOdd()) {
	            x1.iadd(delta);
	          }

	          x1.iushrn(1);
	        }
	      }

	      for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
	      if (j > 0) {
	        b.iushrn(j);
	        while (j-- > 0) {
	          if (x2.isOdd()) {
	            x2.iadd(delta);
	          }

	          x2.iushrn(1);
	        }
	      }

	      if (a.cmp(b) >= 0) {
	        a.isub(b);
	        x1.isub(x2);
	      } else {
	        b.isub(a);
	        x2.isub(x1);
	      }
	    }

	    var res;
	    if (a.cmpn(1) === 0) {
	      res = x1;
	    } else {
	      res = x2;
	    }

	    if (res.cmpn(0) < 0) {
	      res.iadd(p);
	    }

	    return res;
	  };

	  BN.prototype.gcd = function gcd (num) {
	    if (this.isZero()) return num.abs();
	    if (num.isZero()) return this.abs();

	    var a = this.clone();
	    var b = num.clone();
	    a.negative = 0;
	    b.negative = 0;

	    // Remove common factor of two
	    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
	      a.iushrn(1);
	      b.iushrn(1);
	    }

	    do {
	      while (a.isEven()) {
	        a.iushrn(1);
	      }
	      while (b.isEven()) {
	        b.iushrn(1);
	      }

	      var r = a.cmp(b);
	      if (r < 0) {
	        // Swap `a` and `b` to make `a` always bigger than `b`
	        var t = a;
	        a = b;
	        b = t;
	      } else if (r === 0 || b.cmpn(1) === 0) {
	        break;
	      }

	      a.isub(b);
	    } while (true);

	    return b.iushln(shift);
	  };

	  // Invert number in the field F(num)
	  BN.prototype.invm = function invm (num) {
	    return this.egcd(num).a.umod(num);
	  };

	  BN.prototype.isEven = function isEven () {
	    return (this.words[0] & 1) === 0;
	  };

	  BN.prototype.isOdd = function isOdd () {
	    return (this.words[0] & 1) === 1;
	  };

	  // And first word and num
	  BN.prototype.andln = function andln (num) {
	    return this.words[0] & num;
	  };

	  // Increment at the bit position in-line
	  BN.prototype.bincn = function bincn (bit) {
	    assert(typeof bit === 'number');
	    var r = bit % 26;
	    var s = (bit - r) / 26;
	    var q = 1 << r;

	    // Fast case: bit is much higher than all existing words
	    if (this.length <= s) {
	      this._expand(s + 1);
	      this.words[s] |= q;
	      return this;
	    }

	    // Add bit and propagate, if needed
	    var carry = q;
	    for (var i = s; carry !== 0 && i < this.length; i++) {
	      var w = this.words[i] | 0;
	      w += carry;
	      carry = w >>> 26;
	      w &= 0x3ffffff;
	      this.words[i] = w;
	    }
	    if (carry !== 0) {
	      this.words[i] = carry;
	      this.length++;
	    }
	    return this;
	  };

	  BN.prototype.isZero = function isZero () {
	    return this.length === 1 && this.words[0] === 0;
	  };

	  BN.prototype.cmpn = function cmpn (num) {
	    var negative = num < 0;

	    if (this.negative !== 0 && !negative) return -1;
	    if (this.negative === 0 && negative) return 1;

	    this.strip();

	    var res;
	    if (this.length > 1) {
	      res = 1;
	    } else {
	      if (negative) {
	        num = -num;
	      }

	      assert(num <= 0x3ffffff, 'Number is too big');

	      var w = this.words[0] | 0;
	      res = w === num ? 0 : w < num ? -1 : 1;
	    }
	    if (this.negative !== 0) return -res | 0;
	    return res;
	  };

	  // Compare two numbers and return:
	  // 1 - if `this` > `num`
	  // 0 - if `this` == `num`
	  // -1 - if `this` < `num`
	  BN.prototype.cmp = function cmp (num) {
	    if (this.negative !== 0 && num.negative === 0) return -1;
	    if (this.negative === 0 && num.negative !== 0) return 1;

	    var res = this.ucmp(num);
	    if (this.negative !== 0) return -res | 0;
	    return res;
	  };

	  // Unsigned comparison
	  BN.prototype.ucmp = function ucmp (num) {
	    // At this point both numbers have the same sign
	    if (this.length > num.length) return 1;
	    if (this.length < num.length) return -1;

	    var res = 0;
	    for (var i = this.length - 1; i >= 0; i--) {
	      var a = this.words[i] | 0;
	      var b = num.words[i] | 0;

	      if (a === b) continue;
	      if (a < b) {
	        res = -1;
	      } else if (a > b) {
	        res = 1;
	      }
	      break;
	    }
	    return res;
	  };

	  BN.prototype.gtn = function gtn (num) {
	    return this.cmpn(num) === 1;
	  };

	  BN.prototype.gt = function gt (num) {
	    return this.cmp(num) === 1;
	  };

	  BN.prototype.gten = function gten (num) {
	    return this.cmpn(num) >= 0;
	  };

	  BN.prototype.gte = function gte (num) {
	    return this.cmp(num) >= 0;
	  };

	  BN.prototype.ltn = function ltn (num) {
	    return this.cmpn(num) === -1;
	  };

	  BN.prototype.lt = function lt (num) {
	    return this.cmp(num) === -1;
	  };

	  BN.prototype.lten = function lten (num) {
	    return this.cmpn(num) <= 0;
	  };

	  BN.prototype.lte = function lte (num) {
	    return this.cmp(num) <= 0;
	  };

	  BN.prototype.eqn = function eqn (num) {
	    return this.cmpn(num) === 0;
	  };

	  BN.prototype.eq = function eq (num) {
	    return this.cmp(num) === 0;
	  };

	  //
	  // A reduce context, could be using montgomery or something better, depending
	  // on the `m` itself.
	  //
	  BN.red = function red (num) {
	    return new Red(num);
	  };

	  BN.prototype.toRed = function toRed (ctx) {
	    assert(!this.red, 'Already a number in reduction context');
	    assert(this.negative === 0, 'red works only with positives');
	    return ctx.convertTo(this)._forceRed(ctx);
	  };

	  BN.prototype.fromRed = function fromRed () {
	    assert(this.red, 'fromRed works only with numbers in reduction context');
	    return this.red.convertFrom(this);
	  };

	  BN.prototype._forceRed = function _forceRed (ctx) {
	    this.red = ctx;
	    return this;
	  };

	  BN.prototype.forceRed = function forceRed (ctx) {
	    assert(!this.red, 'Already a number in reduction context');
	    return this._forceRed(ctx);
	  };

	  BN.prototype.redAdd = function redAdd (num) {
	    assert(this.red, 'redAdd works only with red numbers');
	    return this.red.add(this, num);
	  };

	  BN.prototype.redIAdd = function redIAdd (num) {
	    assert(this.red, 'redIAdd works only with red numbers');
	    return this.red.iadd(this, num);
	  };

	  BN.prototype.redSub = function redSub (num) {
	    assert(this.red, 'redSub works only with red numbers');
	    return this.red.sub(this, num);
	  };

	  BN.prototype.redISub = function redISub (num) {
	    assert(this.red, 'redISub works only with red numbers');
	    return this.red.isub(this, num);
	  };

	  BN.prototype.redShl = function redShl (num) {
	    assert(this.red, 'redShl works only with red numbers');
	    return this.red.shl(this, num);
	  };

	  BN.prototype.redMul = function redMul (num) {
	    assert(this.red, 'redMul works only with red numbers');
	    this.red._verify2(this, num);
	    return this.red.mul(this, num);
	  };

	  BN.prototype.redIMul = function redIMul (num) {
	    assert(this.red, 'redMul works only with red numbers');
	    this.red._verify2(this, num);
	    return this.red.imul(this, num);
	  };

	  BN.prototype.redSqr = function redSqr () {
	    assert(this.red, 'redSqr works only with red numbers');
	    this.red._verify1(this);
	    return this.red.sqr(this);
	  };

	  BN.prototype.redISqr = function redISqr () {
	    assert(this.red, 'redISqr works only with red numbers');
	    this.red._verify1(this);
	    return this.red.isqr(this);
	  };

	  // Square root over p
	  BN.prototype.redSqrt = function redSqrt () {
	    assert(this.red, 'redSqrt works only with red numbers');
	    this.red._verify1(this);
	    return this.red.sqrt(this);
	  };

	  BN.prototype.redInvm = function redInvm () {
	    assert(this.red, 'redInvm works only with red numbers');
	    this.red._verify1(this);
	    return this.red.invm(this);
	  };

	  // Return negative clone of `this` % `red modulo`
	  BN.prototype.redNeg = function redNeg () {
	    assert(this.red, 'redNeg works only with red numbers');
	    this.red._verify1(this);
	    return this.red.neg(this);
	  };

	  BN.prototype.redPow = function redPow (num) {
	    assert(this.red && !num.red, 'redPow(normalNum)');
	    this.red._verify1(this);
	    return this.red.pow(this, num);
	  };

	  // Prime numbers with efficient reduction
	  var primes = {
	    k256: null,
	    p224: null,
	    p192: null,
	    p25519: null
	  };

	  // Pseudo-Mersenne prime
	  function MPrime (name, p) {
	    // P = 2 ^ N - K
	    this.name = name;
	    this.p = new BN(p, 16);
	    this.n = this.p.bitLength();
	    this.k = new BN(1).iushln(this.n).isub(this.p);

	    this.tmp = this._tmp();
	  }

	  MPrime.prototype._tmp = function _tmp () {
	    var tmp = new BN(null);
	    tmp.words = new Array(Math.ceil(this.n / 13));
	    return tmp;
	  };

	  MPrime.prototype.ireduce = function ireduce (num) {
	    // Assumes that `num` is less than `P^2`
	    // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
	    var r = num;
	    var rlen;

	    do {
	      this.split(r, this.tmp);
	      r = this.imulK(r);
	      r = r.iadd(this.tmp);
	      rlen = r.bitLength();
	    } while (rlen > this.n);

	    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
	    if (cmp === 0) {
	      r.words[0] = 0;
	      r.length = 1;
	    } else if (cmp > 0) {
	      r.isub(this.p);
	    } else {
	      r.strip();
	    }

	    return r;
	  };

	  MPrime.prototype.split = function split (input, out) {
	    input.iushrn(this.n, 0, out);
	  };

	  MPrime.prototype.imulK = function imulK (num) {
	    return num.imul(this.k);
	  };

	  function K256 () {
	    MPrime.call(
	      this,
	      'k256',
	      'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
	  }
	  inherits(K256, MPrime);

	  K256.prototype.split = function split (input, output) {
	    // 256 = 9 * 26 + 22
	    var mask = 0x3fffff;

	    var outLen = Math.min(input.length, 9);
	    for (var i = 0; i < outLen; i++) {
	      output.words[i] = input.words[i];
	    }
	    output.length = outLen;

	    if (input.length <= 9) {
	      input.words[0] = 0;
	      input.length = 1;
	      return;
	    }

	    // Shift by 9 limbs
	    var prev = input.words[9];
	    output.words[output.length++] = prev & mask;

	    for (i = 10; i < input.length; i++) {
	      var next = input.words[i] | 0;
	      input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
	      prev = next;
	    }
	    prev >>>= 22;
	    input.words[i - 10] = prev;
	    if (prev === 0 && input.length > 10) {
	      input.length -= 10;
	    } else {
	      input.length -= 9;
	    }
	  };

	  K256.prototype.imulK = function imulK (num) {
	    // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
	    num.words[num.length] = 0;
	    num.words[num.length + 1] = 0;
	    num.length += 2;

	    // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
	    var lo = 0;
	    for (var i = 0; i < num.length; i++) {
	      var w = num.words[i] | 0;
	      lo += w * 0x3d1;
	      num.words[i] = lo & 0x3ffffff;
	      lo = w * 0x40 + ((lo / 0x4000000) | 0);
	    }

	    // Fast length reduction
	    if (num.words[num.length - 1] === 0) {
	      num.length--;
	      if (num.words[num.length - 1] === 0) {
	        num.length--;
	      }
	    }
	    return num;
	  };

	  function P224 () {
	    MPrime.call(
	      this,
	      'p224',
	      'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
	  }
	  inherits(P224, MPrime);

	  function P192 () {
	    MPrime.call(
	      this,
	      'p192',
	      'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
	  }
	  inherits(P192, MPrime);

	  function P25519 () {
	    // 2 ^ 255 - 19
	    MPrime.call(
	      this,
	      '25519',
	      '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
	  }
	  inherits(P25519, MPrime);

	  P25519.prototype.imulK = function imulK (num) {
	    // K = 0x13
	    var carry = 0;
	    for (var i = 0; i < num.length; i++) {
	      var hi = (num.words[i] | 0) * 0x13 + carry;
	      var lo = hi & 0x3ffffff;
	      hi >>>= 26;

	      num.words[i] = lo;
	      carry = hi;
	    }
	    if (carry !== 0) {
	      num.words[num.length++] = carry;
	    }
	    return num;
	  };

	  // Exported mostly for testing purposes, use plain name instead
	  BN._prime = function prime (name) {
	    // Cached version of prime
	    if (primes[name]) return primes[name];

	    var prime;
	    if (name === 'k256') {
	      prime = new K256();
	    } else if (name === 'p224') {
	      prime = new P224();
	    } else if (name === 'p192') {
	      prime = new P192();
	    } else if (name === 'p25519') {
	      prime = new P25519();
	    } else {
	      throw new Error('Unknown prime ' + name);
	    }
	    primes[name] = prime;

	    return prime;
	  };

	  //
	  // Base reduction engine
	  //
	  function Red (m) {
	    if (typeof m === 'string') {
	      var prime = BN._prime(m);
	      this.m = prime.p;
	      this.prime = prime;
	    } else {
	      assert(m.gtn(1), 'modulus must be greater than 1');
	      this.m = m;
	      this.prime = null;
	    }
	  }

	  Red.prototype._verify1 = function _verify1 (a) {
	    assert(a.negative === 0, 'red works only with positives');
	    assert(a.red, 'red works only with red numbers');
	  };

	  Red.prototype._verify2 = function _verify2 (a, b) {
	    assert((a.negative | b.negative) === 0, 'red works only with positives');
	    assert(a.red && a.red === b.red,
	      'red works only with red numbers');
	  };

	  Red.prototype.imod = function imod (a) {
	    if (this.prime) return this.prime.ireduce(a)._forceRed(this);
	    return a.umod(this.m)._forceRed(this);
	  };

	  Red.prototype.neg = function neg (a) {
	    if (a.isZero()) {
	      return a.clone();
	    }

	    return this.m.sub(a)._forceRed(this);
	  };

	  Red.prototype.add = function add (a, b) {
	    this._verify2(a, b);

	    var res = a.add(b);
	    if (res.cmp(this.m) >= 0) {
	      res.isub(this.m);
	    }
	    return res._forceRed(this);
	  };

	  Red.prototype.iadd = function iadd (a, b) {
	    this._verify2(a, b);

	    var res = a.iadd(b);
	    if (res.cmp(this.m) >= 0) {
	      res.isub(this.m);
	    }
	    return res;
	  };

	  Red.prototype.sub = function sub (a, b) {
	    this._verify2(a, b);

	    var res = a.sub(b);
	    if (res.cmpn(0) < 0) {
	      res.iadd(this.m);
	    }
	    return res._forceRed(this);
	  };

	  Red.prototype.isub = function isub (a, b) {
	    this._verify2(a, b);

	    var res = a.isub(b);
	    if (res.cmpn(0) < 0) {
	      res.iadd(this.m);
	    }
	    return res;
	  };

	  Red.prototype.shl = function shl (a, num) {
	    this._verify1(a);
	    return this.imod(a.ushln(num));
	  };

	  Red.prototype.imul = function imul (a, b) {
	    this._verify2(a, b);
	    return this.imod(a.imul(b));
	  };

	  Red.prototype.mul = function mul (a, b) {
	    this._verify2(a, b);
	    return this.imod(a.mul(b));
	  };

	  Red.prototype.isqr = function isqr (a) {
	    return this.imul(a, a.clone());
	  };

	  Red.prototype.sqr = function sqr (a) {
	    return this.mul(a, a);
	  };

	  Red.prototype.sqrt = function sqrt (a) {
	    if (a.isZero()) return a.clone();

	    var mod3 = this.m.andln(3);
	    assert(mod3 % 2 === 1);

	    // Fast case
	    if (mod3 === 3) {
	      var pow = this.m.add(new BN(1)).iushrn(2);
	      return this.pow(a, pow);
	    }

	    // Tonelli-Shanks algorithm (Totally unoptimized and slow)
	    //
	    // Find Q and S, that Q * 2 ^ S = (P - 1)
	    var q = this.m.subn(1);
	    var s = 0;
	    while (!q.isZero() && q.andln(1) === 0) {
	      s++;
	      q.iushrn(1);
	    }
	    assert(!q.isZero());

	    var one = new BN(1).toRed(this);
	    var nOne = one.redNeg();

	    // Find quadratic non-residue
	    // NOTE: Max is such because of generalized Riemann hypothesis.
	    var lpow = this.m.subn(1).iushrn(1);
	    var z = this.m.bitLength();
	    z = new BN(2 * z * z).toRed(this);

	    while (this.pow(z, lpow).cmp(nOne) !== 0) {
	      z.redIAdd(nOne);
	    }

	    var c = this.pow(z, q);
	    var r = this.pow(a, q.addn(1).iushrn(1));
	    var t = this.pow(a, q);
	    var m = s;
	    while (t.cmp(one) !== 0) {
	      var tmp = t;
	      for (var i = 0; tmp.cmp(one) !== 0; i++) {
	        tmp = tmp.redSqr();
	      }
	      assert(i < m);
	      var b = this.pow(c, new BN(1).iushln(m - i - 1));

	      r = r.redMul(b);
	      c = b.redSqr();
	      t = t.redMul(c);
	      m = i;
	    }

	    return r;
	  };

	  Red.prototype.invm = function invm (a) {
	    var inv = a._invmp(this.m);
	    if (inv.negative !== 0) {
	      inv.negative = 0;
	      return this.imod(inv).redNeg();
	    } else {
	      return this.imod(inv);
	    }
	  };

	  Red.prototype.pow = function pow (a, num) {
	    if (num.isZero()) return new BN(1).toRed(this);
	    if (num.cmpn(1) === 0) return a.clone();

	    var windowSize = 4;
	    var wnd = new Array(1 << windowSize);
	    wnd[0] = new BN(1).toRed(this);
	    wnd[1] = a;
	    for (var i = 2; i < wnd.length; i++) {
	      wnd[i] = this.mul(wnd[i - 1], a);
	    }

	    var res = wnd[0];
	    var current = 0;
	    var currentLen = 0;
	    var start = num.bitLength() % 26;
	    if (start === 0) {
	      start = 26;
	    }

	    for (i = num.length - 1; i >= 0; i--) {
	      var word = num.words[i];
	      for (var j = start - 1; j >= 0; j--) {
	        var bit = (word >> j) & 1;
	        if (res !== wnd[0]) {
	          res = this.sqr(res);
	        }

	        if (bit === 0 && current === 0) {
	          currentLen = 0;
	          continue;
	        }

	        current <<= 1;
	        current |= bit;
	        currentLen++;
	        if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

	        res = this.mul(res, wnd[current]);
	        currentLen = 0;
	        current = 0;
	      }
	      start = 26;
	    }

	    return res;
	  };

	  Red.prototype.convertTo = function convertTo (num) {
	    var r = num.umod(this.m);

	    return r === num ? r.clone() : r;
	  };

	  Red.prototype.convertFrom = function convertFrom (num) {
	    var res = num.clone();
	    res.red = null;
	    return res;
	  };

	  //
	  // Montgomery method engine
	  //

	  BN.mont = function mont (num) {
	    return new Mont(num);
	  };

	  function Mont (m) {
	    Red.call(this, m);

	    this.shift = this.m.bitLength();
	    if (this.shift % 26 !== 0) {
	      this.shift += 26 - (this.shift % 26);
	    }

	    this.r = new BN(1).iushln(this.shift);
	    this.r2 = this.imod(this.r.sqr());
	    this.rinv = this.r._invmp(this.m);

	    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
	    this.minv = this.minv.umod(this.r);
	    this.minv = this.r.sub(this.minv);
	  }
	  inherits(Mont, Red);

	  Mont.prototype.convertTo = function convertTo (num) {
	    return this.imod(num.ushln(this.shift));
	  };

	  Mont.prototype.convertFrom = function convertFrom (num) {
	    var r = this.imod(num.mul(this.rinv));
	    r.red = null;
	    return r;
	  };

	  Mont.prototype.imul = function imul (a, b) {
	    if (a.isZero() || b.isZero()) {
	      a.words[0] = 0;
	      a.length = 1;
	      return a;
	    }

	    var t = a.imul(b);
	    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
	    var u = t.isub(c).iushrn(this.shift);
	    var res = u;

	    if (u.cmp(this.m) >= 0) {
	      res = u.isub(this.m);
	    } else if (u.cmpn(0) < 0) {
	      res = u.iadd(this.m);
	    }

	    return res._forceRed(this);
	  };

	  Mont.prototype.mul = function mul (a, b) {
	    if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

	    var t = a.mul(b);
	    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
	    var u = t.isub(c).iushrn(this.shift);
	    var res = u;
	    if (u.cmp(this.m) >= 0) {
	      res = u.isub(this.m);
	    } else if (u.cmpn(0) < 0) {
	      res = u.iadd(this.m);
	    }

	    return res._forceRed(this);
	  };

	  Mont.prototype.invm = function invm (a) {
	    // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
	    var res = this.imod(a._invmp(this.m).mul(this.r2));
	    return res._forceRed(this);
	  };
	})(module, commonjsGlobal);
	});

	var minimalisticAssert = assert;

	function assert(val, msg) {
	  if (!val)
	    throw new Error(msg || 'Assertion failed');
	}

	assert.equal = function assertEqual(l, r, msg) {
	  if (l != r)
	    throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
	};

	var utils_1 = createCommonjsModule(function (module, exports) {

	var utils = exports;

	function toArray(msg, enc) {
	  if (Array.isArray(msg))
	    return msg.slice();
	  if (!msg)
	    return [];
	  var res = [];
	  if (typeof msg !== 'string') {
	    for (var i = 0; i < msg.length; i++)
	      res[i] = msg[i] | 0;
	    return res;
	  }
	  if (enc === 'hex') {
	    msg = msg.replace(/[^a-z0-9]+/ig, '');
	    if (msg.length % 2 !== 0)
	      msg = '0' + msg;
	    for (var i = 0; i < msg.length; i += 2)
	      res.push(parseInt(msg[i] + msg[i + 1], 16));
	  } else {
	    for (var i = 0; i < msg.length; i++) {
	      var c = msg.charCodeAt(i);
	      var hi = c >> 8;
	      var lo = c & 0xff;
	      if (hi)
	        res.push(hi, lo);
	      else
	        res.push(lo);
	    }
	  }
	  return res;
	}
	utils.toArray = toArray;

	function zero2(word) {
	  if (word.length === 1)
	    return '0' + word;
	  else
	    return word;
	}
	utils.zero2 = zero2;

	function toHex(msg) {
	  var res = '';
	  for (var i = 0; i < msg.length; i++)
	    res += zero2(msg[i].toString(16));
	  return res;
	}
	utils.toHex = toHex;

	utils.encode = function encode(arr, enc) {
	  if (enc === 'hex')
	    return toHex(arr);
	  else
	    return arr;
	};
	});

	var utils_1$1 = createCommonjsModule(function (module, exports) {

	var utils = exports;




	utils.assert = minimalisticAssert;
	utils.toArray = utils_1.toArray;
	utils.zero2 = utils_1.zero2;
	utils.toHex = utils_1.toHex;
	utils.encode = utils_1.encode;

	// Represent num in a w-NAF form
	function getNAF(num, w) {
	  var naf = [];
	  var ws = 1 << (w + 1);
	  var k = num.clone();
	  while (k.cmpn(1) >= 0) {
	    var z;
	    if (k.isOdd()) {
	      var mod = k.andln(ws - 1);
	      if (mod > (ws >> 1) - 1)
	        z = (ws >> 1) - mod;
	      else
	        z = mod;
	      k.isubn(z);
	    } else {
	      z = 0;
	    }
	    naf.push(z);

	    // Optimization, shift by word if possible
	    var shift = (k.cmpn(0) !== 0 && k.andln(ws - 1) === 0) ? (w + 1) : 1;
	    for (var i = 1; i < shift; i++)
	      naf.push(0);
	    k.iushrn(shift);
	  }

	  return naf;
	}
	utils.getNAF = getNAF;

	// Represent k1, k2 in a Joint Sparse Form
	function getJSF(k1, k2) {
	  var jsf = [
	    [],
	    []
	  ];

	  k1 = k1.clone();
	  k2 = k2.clone();
	  var d1 = 0;
	  var d2 = 0;
	  while (k1.cmpn(-d1) > 0 || k2.cmpn(-d2) > 0) {

	    // First phase
	    var m14 = (k1.andln(3) + d1) & 3;
	    var m24 = (k2.andln(3) + d2) & 3;
	    if (m14 === 3)
	      m14 = -1;
	    if (m24 === 3)
	      m24 = -1;
	    var u1;
	    if ((m14 & 1) === 0) {
	      u1 = 0;
	    } else {
	      var m8 = (k1.andln(7) + d1) & 7;
	      if ((m8 === 3 || m8 === 5) && m24 === 2)
	        u1 = -m14;
	      else
	        u1 = m14;
	    }
	    jsf[0].push(u1);

	    var u2;
	    if ((m24 & 1) === 0) {
	      u2 = 0;
	    } else {
	      var m8 = (k2.andln(7) + d2) & 7;
	      if ((m8 === 3 || m8 === 5) && m14 === 2)
	        u2 = -m24;
	      else
	        u2 = m24;
	    }
	    jsf[1].push(u2);

	    // Second phase
	    if (2 * d1 === u1 + 1)
	      d1 = 1 - d1;
	    if (2 * d2 === u2 + 1)
	      d2 = 1 - d2;
	    k1.iushrn(1);
	    k2.iushrn(1);
	  }

	  return jsf;
	}
	utils.getJSF = getJSF;

	function cachedProperty(obj, name, computer) {
	  var key = '_' + name;
	  obj.prototype[name] = function cachedProperty() {
	    return this[key] !== undefined ? this[key] :
	           this[key] = computer.call(this);
	  };
	}
	utils.cachedProperty = cachedProperty;

	function parseBytes(bytes) {
	  return typeof bytes === 'string' ? utils.toArray(bytes, 'hex') :
	                                     bytes;
	}
	utils.parseBytes = parseBytes;

	function intFromLE(bytes) {
	  return new bn(bytes, 'hex', 'le');
	}
	utils.intFromLE = intFromLE;
	});

	var r;

	var brorand = function rand(len) {
	  if (!r)
	    r = new Rand(null);

	  return r.generate(len);
	};

	function Rand(rand) {
	  this.rand = rand;
	}
	var Rand_1 = Rand;

	Rand.prototype.generate = function generate(len) {
	  return this._rand(len);
	};

	// Emulate crypto API using randy
	Rand.prototype._rand = function _rand(n) {
	  if (this.rand.getBytes)
	    return this.rand.getBytes(n);

	  var res = new Uint8Array(n);
	  for (var i = 0; i < res.length; i++)
	    res[i] = this.rand.getByte();
	  return res;
	};

	if (typeof self === 'object') {
	  if (self.crypto && self.crypto.getRandomValues) {
	    // Modern browsers
	    Rand.prototype._rand = function _rand(n) {
	      var arr = new Uint8Array(n);
	      self.crypto.getRandomValues(arr);
	      return arr;
	    };
	  } else if (self.msCrypto && self.msCrypto.getRandomValues) {
	    // IE
	    Rand.prototype._rand = function _rand(n) {
	      var arr = new Uint8Array(n);
	      self.msCrypto.getRandomValues(arr);
	      return arr;
	    };

	  // Safari's WebWorkers do not have `crypto`
	  } else if (typeof window === 'object') {
	    // Old junk
	    Rand.prototype._rand = function() {
	      throw new Error('Not implemented yet');
	    };
	  }
	} else {
	  // Node.js or Web worker with no crypto support
	  try {
	    var crypto$1 = require$$0;
	    if (typeof crypto$1.randomBytes !== 'function')
	      throw new Error('Not supported');

	    Rand.prototype._rand = function _rand(n) {
	      return crypto$1.randomBytes(n);
	    };
	  } catch (e) {
	  }
	}
	brorand.Rand = Rand_1;

	var utils = elliptic_1.utils;
	var getNAF = utils.getNAF;
	var getJSF = utils.getJSF;
	var assert$1 = utils.assert;

	function BaseCurve(type, conf) {
	  this.type = type;
	  this.p = new bn(conf.p, 16);

	  // Use Montgomery, when there is no fast reduction for the prime
	  this.red = conf.prime ? bn.red(conf.prime) : bn.mont(this.p);

	  // Useful for many curves
	  this.zero = new bn(0).toRed(this.red);
	  this.one = new bn(1).toRed(this.red);
	  this.two = new bn(2).toRed(this.red);

	  // Curve configuration, optional
	  this.n = conf.n && new bn(conf.n, 16);
	  this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);

	  // Temporary arrays
	  this._wnafT1 = new Array(4);
	  this._wnafT2 = new Array(4);
	  this._wnafT3 = new Array(4);
	  this._wnafT4 = new Array(4);

	  // Generalized Greg Maxwell's trick
	  var adjustCount = this.n && this.p.div(this.n);
	  if (!adjustCount || adjustCount.cmpn(100) > 0) {
	    this.redN = null;
	  } else {
	    this._maxwellTrick = true;
	    this.redN = this.n.toRed(this.red);
	  }
	}
	var base = BaseCurve;

	BaseCurve.prototype.point = function point() {
	  throw new Error('Not implemented');
	};

	BaseCurve.prototype.validate = function validate() {
	  throw new Error('Not implemented');
	};

	BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p, k) {
	  assert$1(p.precomputed);
	  var doubles = p._getDoubles();

	  var naf = getNAF(k, 1);
	  var I = (1 << (doubles.step + 1)) - (doubles.step % 2 === 0 ? 2 : 1);
	  I /= 3;

	  // Translate into more windowed form
	  var repr = [];
	  for (var j = 0; j < naf.length; j += doubles.step) {
	    var nafW = 0;
	    for (var k = j + doubles.step - 1; k >= j; k--)
	      nafW = (nafW << 1) + naf[k];
	    repr.push(nafW);
	  }

	  var a = this.jpoint(null, null, null);
	  var b = this.jpoint(null, null, null);
	  for (var i = I; i > 0; i--) {
	    for (var j = 0; j < repr.length; j++) {
	      var nafW = repr[j];
	      if (nafW === i)
	        b = b.mixedAdd(doubles.points[j]);
	      else if (nafW === -i)
	        b = b.mixedAdd(doubles.points[j].neg());
	    }
	    a = a.add(b);
	  }
	  return a.toP();
	};

	BaseCurve.prototype._wnafMul = function _wnafMul(p, k) {
	  var w = 4;

	  // Precompute window
	  var nafPoints = p._getNAFPoints(w);
	  w = nafPoints.wnd;
	  var wnd = nafPoints.points;

	  // Get NAF form
	  var naf = getNAF(k, w);

	  // Add `this`*(N+1) for every w-NAF index
	  var acc = this.jpoint(null, null, null);
	  for (var i = naf.length - 1; i >= 0; i--) {
	    // Count zeroes
	    for (var k = 0; i >= 0 && naf[i] === 0; i--)
	      k++;
	    if (i >= 0)
	      k++;
	    acc = acc.dblp(k);

	    if (i < 0)
	      break;
	    var z = naf[i];
	    assert$1(z !== 0);
	    if (p.type === 'affine') {
	      // J +- P
	      if (z > 0)
	        acc = acc.mixedAdd(wnd[(z - 1) >> 1]);
	      else
	        acc = acc.mixedAdd(wnd[(-z - 1) >> 1].neg());
	    } else {
	      // J +- J
	      if (z > 0)
	        acc = acc.add(wnd[(z - 1) >> 1]);
	      else
	        acc = acc.add(wnd[(-z - 1) >> 1].neg());
	    }
	  }
	  return p.type === 'affine' ? acc.toP() : acc;
	};

	BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW,
	                                                       points,
	                                                       coeffs,
	                                                       len,
	                                                       jacobianResult) {
	  var wndWidth = this._wnafT1;
	  var wnd = this._wnafT2;
	  var naf = this._wnafT3;

	  // Fill all arrays
	  var max = 0;
	  for (var i = 0; i < len; i++) {
	    var p = points[i];
	    var nafPoints = p._getNAFPoints(defW);
	    wndWidth[i] = nafPoints.wnd;
	    wnd[i] = nafPoints.points;
	  }

	  // Comb small window NAFs
	  for (var i = len - 1; i >= 1; i -= 2) {
	    var a = i - 1;
	    var b = i;
	    if (wndWidth[a] !== 1 || wndWidth[b] !== 1) {
	      naf[a] = getNAF(coeffs[a], wndWidth[a]);
	      naf[b] = getNAF(coeffs[b], wndWidth[b]);
	      max = Math.max(naf[a].length, max);
	      max = Math.max(naf[b].length, max);
	      continue;
	    }

	    var comb = [
	      points[a], /* 1 */
	      null, /* 3 */
	      null, /* 5 */
	      points[b] /* 7 */
	    ];

	    // Try to avoid Projective points, if possible
	    if (points[a].y.cmp(points[b].y) === 0) {
	      comb[1] = points[a].add(points[b]);
	      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
	    } else if (points[a].y.cmp(points[b].y.redNeg()) === 0) {
	      comb[1] = points[a].toJ().mixedAdd(points[b]);
	      comb[2] = points[a].add(points[b].neg());
	    } else {
	      comb[1] = points[a].toJ().mixedAdd(points[b]);
	      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
	    }

	    var index = [
	      -3, /* -1 -1 */
	      -1, /* -1 0 */
	      -5, /* -1 1 */
	      -7, /* 0 -1 */
	      0, /* 0 0 */
	      7, /* 0 1 */
	      5, /* 1 -1 */
	      1, /* 1 0 */
	      3  /* 1 1 */
	    ];

	    var jsf = getJSF(coeffs[a], coeffs[b]);
	    max = Math.max(jsf[0].length, max);
	    naf[a] = new Array(max);
	    naf[b] = new Array(max);
	    for (var j = 0; j < max; j++) {
	      var ja = jsf[0][j] | 0;
	      var jb = jsf[1][j] | 0;

	      naf[a][j] = index[(ja + 1) * 3 + (jb + 1)];
	      naf[b][j] = 0;
	      wnd[a] = comb;
	    }
	  }

	  var acc = this.jpoint(null, null, null);
	  var tmp = this._wnafT4;
	  for (var i = max; i >= 0; i--) {
	    var k = 0;

	    while (i >= 0) {
	      var zero = true;
	      for (var j = 0; j < len; j++) {
	        tmp[j] = naf[j][i] | 0;
	        if (tmp[j] !== 0)
	          zero = false;
	      }
	      if (!zero)
	        break;
	      k++;
	      i--;
	    }
	    if (i >= 0)
	      k++;
	    acc = acc.dblp(k);
	    if (i < 0)
	      break;

	    for (var j = 0; j < len; j++) {
	      var z = tmp[j];
	      var p;
	      if (z === 0)
	        continue;
	      else if (z > 0)
	        p = wnd[j][(z - 1) >> 1];
	      else if (z < 0)
	        p = wnd[j][(-z - 1) >> 1].neg();

	      if (p.type === 'affine')
	        acc = acc.mixedAdd(p);
	      else
	        acc = acc.add(p);
	    }
	  }
	  // Zeroify references
	  for (var i = 0; i < len; i++)
	    wnd[i] = null;

	  if (jacobianResult)
	    return acc;
	  else
	    return acc.toP();
	};

	function BasePoint(curve, type) {
	  this.curve = curve;
	  this.type = type;
	  this.precomputed = null;
	}
	BaseCurve.BasePoint = BasePoint;

	BasePoint.prototype.eq = function eq(/*other*/) {
	  throw new Error('Not implemented');
	};

	BasePoint.prototype.validate = function validate() {
	  return this.curve.validate(this);
	};

	BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
	  bytes = utils.toArray(bytes, enc);

	  var len = this.p.byteLength();

	  // uncompressed, hybrid-odd, hybrid-even
	  if ((bytes[0] === 0x04 || bytes[0] === 0x06 || bytes[0] === 0x07) &&
	      bytes.length - 1 === 2 * len) {
	    if (bytes[0] === 0x06)
	      assert$1(bytes[bytes.length - 1] % 2 === 0);
	    else if (bytes[0] === 0x07)
	      assert$1(bytes[bytes.length - 1] % 2 === 1);

	    var res =  this.point(bytes.slice(1, 1 + len),
	                          bytes.slice(1 + len, 1 + 2 * len));

	    return res;
	  } else if ((bytes[0] === 0x02 || bytes[0] === 0x03) &&
	              bytes.length - 1 === len) {
	    return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 0x03);
	  }
	  throw new Error('Unknown point format');
	};

	BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
	  return this.encode(enc, true);
	};

	BasePoint.prototype._encode = function _encode(compact) {
	  var len = this.curve.p.byteLength();
	  var x = this.getX().toArray('be', len);

	  if (compact)
	    return [ this.getY().isEven() ? 0x02 : 0x03 ].concat(x);

	  return [ 0x04 ].concat(x, this.getY().toArray('be', len)) ;
	};

	BasePoint.prototype.encode = function encode(enc, compact) {
	  return utils.encode(this._encode(compact), enc);
	};

	BasePoint.prototype.precompute = function precompute(power) {
	  if (this.precomputed)
	    return this;

	  var precomputed = {
	    doubles: null,
	    naf: null,
	    beta: null
	  };
	  precomputed.naf = this._getNAFPoints(8);
	  precomputed.doubles = this._getDoubles(4, power);
	  precomputed.beta = this._getBeta();
	  this.precomputed = precomputed;

	  return this;
	};

	BasePoint.prototype._hasDoubles = function _hasDoubles(k) {
	  if (!this.precomputed)
	    return false;

	  var doubles = this.precomputed.doubles;
	  if (!doubles)
	    return false;

	  return doubles.points.length >= Math.ceil((k.bitLength() + 1) / doubles.step);
	};

	BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
	  if (this.precomputed && this.precomputed.doubles)
	    return this.precomputed.doubles;

	  var doubles = [ this ];
	  var acc = this;
	  for (var i = 0; i < power; i += step) {
	    for (var j = 0; j < step; j++)
	      acc = acc.dbl();
	    doubles.push(acc);
	  }
	  return {
	    step: step,
	    points: doubles
	  };
	};

	BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
	  if (this.precomputed && this.precomputed.naf)
	    return this.precomputed.naf;

	  var res = [ this ];
	  var max = (1 << wnd) - 1;
	  var dbl = max === 1 ? null : this.dbl();
	  for (var i = 1; i < max; i++)
	    res[i] = res[i - 1].add(dbl);
	  return {
	    wnd: wnd,
	    points: res
	  };
	};

	BasePoint.prototype._getBeta = function _getBeta() {
	  return null;
	};

	BasePoint.prototype.dblp = function dblp(k) {
	  var r = this;
	  for (var i = 0; i < k; i++)
	    r = r.dbl();
	  return r;
	};

	var inherits_browser = createCommonjsModule(function (module) {
	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function () {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}
	});

	var Base = curve_1.base;

	var assert$2 = elliptic_1.utils.assert;

	function ShortCurve(conf) {
	  Base.call(this, 'short', conf);

	  this.a = new bn(conf.a, 16).toRed(this.red);
	  this.b = new bn(conf.b, 16).toRed(this.red);
	  this.tinv = this.two.redInvm();

	  this.zeroA = this.a.fromRed().cmpn(0) === 0;
	  this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;

	  // If the curve is endomorphic, precalculate beta and lambda
	  this.endo = this._getEndomorphism(conf);
	  this._endoWnafT1 = new Array(4);
	  this._endoWnafT2 = new Array(4);
	}
	inherits_browser(ShortCurve, Base);
	var short_1 = ShortCurve;

	ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
	  // No efficient endomorphism
	  if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
	    return;

	  // Compute beta and lambda, that lambda * P = (beta * Px; Py)
	  var beta;
	  var lambda;
	  if (conf.beta) {
	    beta = new bn(conf.beta, 16).toRed(this.red);
	  } else {
	    var betas = this._getEndoRoots(this.p);
	    // Choose the smallest beta
	    beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
	    beta = beta.toRed(this.red);
	  }
	  if (conf.lambda) {
	    lambda = new bn(conf.lambda, 16);
	  } else {
	    // Choose the lambda that is matching selected beta
	    var lambdas = this._getEndoRoots(this.n);
	    if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
	      lambda = lambdas[0];
	    } else {
	      lambda = lambdas[1];
	      assert$2(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
	    }
	  }

	  // Get basis vectors, used for balanced length-two representation
	  var basis;
	  if (conf.basis) {
	    basis = conf.basis.map(function(vec) {
	      return {
	        a: new bn(vec.a, 16),
	        b: new bn(vec.b, 16)
	      };
	    });
	  } else {
	    basis = this._getEndoBasis(lambda);
	  }

	  return {
	    beta: beta,
	    lambda: lambda,
	    basis: basis
	  };
	};

	ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
	  // Find roots of for x^2 + x + 1 in F
	  // Root = (-1 +- Sqrt(-3)) / 2
	  //
	  var red = num === this.p ? this.red : bn.mont(num);
	  var tinv = new bn(2).toRed(red).redInvm();
	  var ntinv = tinv.redNeg();

	  var s = new bn(3).toRed(red).redNeg().redSqrt().redMul(tinv);

	  var l1 = ntinv.redAdd(s).fromRed();
	  var l2 = ntinv.redSub(s).fromRed();
	  return [ l1, l2 ];
	};

	ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
	  // aprxSqrt >= sqrt(this.n)
	  var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));

	  // 3.74
	  // Run EGCD, until r(L + 1) < aprxSqrt
	  var u = lambda;
	  var v = this.n.clone();
	  var x1 = new bn(1);
	  var y1 = new bn(0);
	  var x2 = new bn(0);
	  var y2 = new bn(1);

	  // NOTE: all vectors are roots of: a + b * lambda = 0 (mod n)
	  var a0;
	  var b0;
	  // First vector
	  var a1;
	  var b1;
	  // Second vector
	  var a2;
	  var b2;

	  var prevR;
	  var i = 0;
	  var r;
	  var x;
	  while (u.cmpn(0) !== 0) {
	    var q = v.div(u);
	    r = v.sub(q.mul(u));
	    x = x2.sub(q.mul(x1));
	    var y = y2.sub(q.mul(y1));

	    if (!a1 && r.cmp(aprxSqrt) < 0) {
	      a0 = prevR.neg();
	      b0 = x1;
	      a1 = r.neg();
	      b1 = x;
	    } else if (a1 && ++i === 2) {
	      break;
	    }
	    prevR = r;

	    v = u;
	    u = r;
	    x2 = x1;
	    x1 = x;
	    y2 = y1;
	    y1 = y;
	  }
	  a2 = r.neg();
	  b2 = x;

	  var len1 = a1.sqr().add(b1.sqr());
	  var len2 = a2.sqr().add(b2.sqr());
	  if (len2.cmp(len1) >= 0) {
	    a2 = a0;
	    b2 = b0;
	  }

	  // Normalize signs
	  if (a1.negative) {
	    a1 = a1.neg();
	    b1 = b1.neg();
	  }
	  if (a2.negative) {
	    a2 = a2.neg();
	    b2 = b2.neg();
	  }

	  return [
	    { a: a1, b: b1 },
	    { a: a2, b: b2 }
	  ];
	};

	ShortCurve.prototype._endoSplit = function _endoSplit(k) {
	  var basis = this.endo.basis;
	  var v1 = basis[0];
	  var v2 = basis[1];

	  var c1 = v2.b.mul(k).divRound(this.n);
	  var c2 = v1.b.neg().mul(k).divRound(this.n);

	  var p1 = c1.mul(v1.a);
	  var p2 = c2.mul(v2.a);
	  var q1 = c1.mul(v1.b);
	  var q2 = c2.mul(v2.b);

	  // Calculate answer
	  var k1 = k.sub(p1).sub(p2);
	  var k2 = q1.add(q2).neg();
	  return { k1: k1, k2: k2 };
	};

	ShortCurve.prototype.pointFromX = function pointFromX(x, odd) {
	  x = new bn(x, 16);
	  if (!x.red)
	    x = x.toRed(this.red);

	  var y2 = x.redSqr().redMul(x).redIAdd(x.redMul(this.a)).redIAdd(this.b);
	  var y = y2.redSqrt();
	  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
	    throw new Error('invalid point');

	  // XXX Is there any way to tell if the number is odd without converting it
	  // to non-red form?
	  var isOdd = y.fromRed().isOdd();
	  if (odd && !isOdd || !odd && isOdd)
	    y = y.redNeg();

	  return this.point(x, y);
	};

	ShortCurve.prototype.validate = function validate(point) {
	  if (point.inf)
	    return true;

	  var x = point.x;
	  var y = point.y;

	  var ax = this.a.redMul(x);
	  var rhs = x.redSqr().redMul(x).redIAdd(ax).redIAdd(this.b);
	  return y.redSqr().redISub(rhs).cmpn(0) === 0;
	};

	ShortCurve.prototype._endoWnafMulAdd =
	    function _endoWnafMulAdd(points, coeffs, jacobianResult) {
	  var npoints = this._endoWnafT1;
	  var ncoeffs = this._endoWnafT2;
	  for (var i = 0; i < points.length; i++) {
	    var split = this._endoSplit(coeffs[i]);
	    var p = points[i];
	    var beta = p._getBeta();

	    if (split.k1.negative) {
	      split.k1.ineg();
	      p = p.neg(true);
	    }
	    if (split.k2.negative) {
	      split.k2.ineg();
	      beta = beta.neg(true);
	    }

	    npoints[i * 2] = p;
	    npoints[i * 2 + 1] = beta;
	    ncoeffs[i * 2] = split.k1;
	    ncoeffs[i * 2 + 1] = split.k2;
	  }
	  var res = this._wnafMulAdd(1, npoints, ncoeffs, i * 2, jacobianResult);

	  // Clean-up references to points and coefficients
	  for (var j = 0; j < i * 2; j++) {
	    npoints[j] = null;
	    ncoeffs[j] = null;
	  }
	  return res;
	};

	function Point(curve, x, y, isRed) {
	  Base.BasePoint.call(this, curve, 'affine');
	  if (x === null && y === null) {
	    this.x = null;
	    this.y = null;
	    this.inf = true;
	  } else {
	    this.x = new bn(x, 16);
	    this.y = new bn(y, 16);
	    // Force redgomery representation when loading from JSON
	    if (isRed) {
	      this.x.forceRed(this.curve.red);
	      this.y.forceRed(this.curve.red);
	    }
	    if (!this.x.red)
	      this.x = this.x.toRed(this.curve.red);
	    if (!this.y.red)
	      this.y = this.y.toRed(this.curve.red);
	    this.inf = false;
	  }
	}
	inherits_browser(Point, Base.BasePoint);

	ShortCurve.prototype.point = function point(x, y, isRed) {
	  return new Point(this, x, y, isRed);
	};

	ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
	  return Point.fromJSON(this, obj, red);
	};

	Point.prototype._getBeta = function _getBeta() {
	  if (!this.curve.endo)
	    return;

	  var pre = this.precomputed;
	  if (pre && pre.beta)
	    return pre.beta;

	  var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
	  if (pre) {
	    var curve = this.curve;
	    var endoMul = function(p) {
	      return curve.point(p.x.redMul(curve.endo.beta), p.y);
	    };
	    pre.beta = beta;
	    beta.precomputed = {
	      beta: null,
	      naf: pre.naf && {
	        wnd: pre.naf.wnd,
	        points: pre.naf.points.map(endoMul)
	      },
	      doubles: pre.doubles && {
	        step: pre.doubles.step,
	        points: pre.doubles.points.map(endoMul)
	      }
	    };
	  }
	  return beta;
	};

	Point.prototype.toJSON = function toJSON() {
	  if (!this.precomputed)
	    return [ this.x, this.y ];

	  return [ this.x, this.y, this.precomputed && {
	    doubles: this.precomputed.doubles && {
	      step: this.precomputed.doubles.step,
	      points: this.precomputed.doubles.points.slice(1)
	    },
	    naf: this.precomputed.naf && {
	      wnd: this.precomputed.naf.wnd,
	      points: this.precomputed.naf.points.slice(1)
	    }
	  } ];
	};

	Point.fromJSON = function fromJSON(curve, obj, red) {
	  if (typeof obj === 'string')
	    obj = JSON.parse(obj);
	  var res = curve.point(obj[0], obj[1], red);
	  if (!obj[2])
	    return res;

	  function obj2point(obj) {
	    return curve.point(obj[0], obj[1], red);
	  }

	  var pre = obj[2];
	  res.precomputed = {
	    beta: null,
	    doubles: pre.doubles && {
	      step: pre.doubles.step,
	      points: [ res ].concat(pre.doubles.points.map(obj2point))
	    },
	    naf: pre.naf && {
	      wnd: pre.naf.wnd,
	      points: [ res ].concat(pre.naf.points.map(obj2point))
	    }
	  };
	  return res;
	};

	Point.prototype.inspect = function inspect() {
	  if (this.isInfinity())
	    return '<EC Point Infinity>';
	  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
	      ' y: ' + this.y.fromRed().toString(16, 2) + '>';
	};

	Point.prototype.isInfinity = function isInfinity() {
	  return this.inf;
	};

	Point.prototype.add = function add(p) {
	  // O + P = P
	  if (this.inf)
	    return p;

	  // P + O = P
	  if (p.inf)
	    return this;

	  // P + P = 2P
	  if (this.eq(p))
	    return this.dbl();

	  // P + (-P) = O
	  if (this.neg().eq(p))
	    return this.curve.point(null, null);

	  // P + Q = O
	  if (this.x.cmp(p.x) === 0)
	    return this.curve.point(null, null);

	  var c = this.y.redSub(p.y);
	  if (c.cmpn(0) !== 0)
	    c = c.redMul(this.x.redSub(p.x).redInvm());
	  var nx = c.redSqr().redISub(this.x).redISub(p.x);
	  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
	  return this.curve.point(nx, ny);
	};

	Point.prototype.dbl = function dbl() {
	  if (this.inf)
	    return this;

	  // 2P = O
	  var ys1 = this.y.redAdd(this.y);
	  if (ys1.cmpn(0) === 0)
	    return this.curve.point(null, null);

	  var a = this.curve.a;

	  var x2 = this.x.redSqr();
	  var dyinv = ys1.redInvm();
	  var c = x2.redAdd(x2).redIAdd(x2).redIAdd(a).redMul(dyinv);

	  var nx = c.redSqr().redISub(this.x.redAdd(this.x));
	  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
	  return this.curve.point(nx, ny);
	};

	Point.prototype.getX = function getX() {
	  return this.x.fromRed();
	};

	Point.prototype.getY = function getY() {
	  return this.y.fromRed();
	};

	Point.prototype.mul = function mul(k) {
	  k = new bn(k, 16);

	  if (this._hasDoubles(k))
	    return this.curve._fixedNafMul(this, k);
	  else if (this.curve.endo)
	    return this.curve._endoWnafMulAdd([ this ], [ k ]);
	  else
	    return this.curve._wnafMul(this, k);
	};

	Point.prototype.mulAdd = function mulAdd(k1, p2, k2) {
	  var points = [ this, p2 ];
	  var coeffs = [ k1, k2 ];
	  if (this.curve.endo)
	    return this.curve._endoWnafMulAdd(points, coeffs);
	  else
	    return this.curve._wnafMulAdd(1, points, coeffs, 2);
	};

	Point.prototype.jmulAdd = function jmulAdd(k1, p2, k2) {
	  var points = [ this, p2 ];
	  var coeffs = [ k1, k2 ];
	  if (this.curve.endo)
	    return this.curve._endoWnafMulAdd(points, coeffs, true);
	  else
	    return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
	};

	Point.prototype.eq = function eq(p) {
	  return this === p ||
	         this.inf === p.inf &&
	             (this.inf || this.x.cmp(p.x) === 0 && this.y.cmp(p.y) === 0);
	};

	Point.prototype.neg = function neg(_precompute) {
	  if (this.inf)
	    return this;

	  var res = this.curve.point(this.x, this.y.redNeg());
	  if (_precompute && this.precomputed) {
	    var pre = this.precomputed;
	    var negate = function(p) {
	      return p.neg();
	    };
	    res.precomputed = {
	      naf: pre.naf && {
	        wnd: pre.naf.wnd,
	        points: pre.naf.points.map(negate)
	      },
	      doubles: pre.doubles && {
	        step: pre.doubles.step,
	        points: pre.doubles.points.map(negate)
	      }
	    };
	  }
	  return res;
	};

	Point.prototype.toJ = function toJ() {
	  if (this.inf)
	    return this.curve.jpoint(null, null, null);

	  var res = this.curve.jpoint(this.x, this.y, this.curve.one);
	  return res;
	};

	function JPoint(curve, x, y, z) {
	  Base.BasePoint.call(this, curve, 'jacobian');
	  if (x === null && y === null && z === null) {
	    this.x = this.curve.one;
	    this.y = this.curve.one;
	    this.z = new bn(0);
	  } else {
	    this.x = new bn(x, 16);
	    this.y = new bn(y, 16);
	    this.z = new bn(z, 16);
	  }
	  if (!this.x.red)
	    this.x = this.x.toRed(this.curve.red);
	  if (!this.y.red)
	    this.y = this.y.toRed(this.curve.red);
	  if (!this.z.red)
	    this.z = this.z.toRed(this.curve.red);

	  this.zOne = this.z === this.curve.one;
	}
	inherits_browser(JPoint, Base.BasePoint);

	ShortCurve.prototype.jpoint = function jpoint(x, y, z) {
	  return new JPoint(this, x, y, z);
	};

	JPoint.prototype.toP = function toP() {
	  if (this.isInfinity())
	    return this.curve.point(null, null);

	  var zinv = this.z.redInvm();
	  var zinv2 = zinv.redSqr();
	  var ax = this.x.redMul(zinv2);
	  var ay = this.y.redMul(zinv2).redMul(zinv);

	  return this.curve.point(ax, ay);
	};

	JPoint.prototype.neg = function neg() {
	  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
	};

	JPoint.prototype.add = function add(p) {
	  // O + P = P
	  if (this.isInfinity())
	    return p;

	  // P + O = P
	  if (p.isInfinity())
	    return this;

	  // 12M + 4S + 7A
	  var pz2 = p.z.redSqr();
	  var z2 = this.z.redSqr();
	  var u1 = this.x.redMul(pz2);
	  var u2 = p.x.redMul(z2);
	  var s1 = this.y.redMul(pz2.redMul(p.z));
	  var s2 = p.y.redMul(z2.redMul(this.z));

	  var h = u1.redSub(u2);
	  var r = s1.redSub(s2);
	  if (h.cmpn(0) === 0) {
	    if (r.cmpn(0) !== 0)
	      return this.curve.jpoint(null, null, null);
	    else
	      return this.dbl();
	  }

	  var h2 = h.redSqr();
	  var h3 = h2.redMul(h);
	  var v = u1.redMul(h2);

	  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
	  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
	  var nz = this.z.redMul(p.z).redMul(h);

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype.mixedAdd = function mixedAdd(p) {
	  // O + P = P
	  if (this.isInfinity())
	    return p.toJ();

	  // P + O = P
	  if (p.isInfinity())
	    return this;

	  // 8M + 3S + 7A
	  var z2 = this.z.redSqr();
	  var u1 = this.x;
	  var u2 = p.x.redMul(z2);
	  var s1 = this.y;
	  var s2 = p.y.redMul(z2).redMul(this.z);

	  var h = u1.redSub(u2);
	  var r = s1.redSub(s2);
	  if (h.cmpn(0) === 0) {
	    if (r.cmpn(0) !== 0)
	      return this.curve.jpoint(null, null, null);
	    else
	      return this.dbl();
	  }

	  var h2 = h.redSqr();
	  var h3 = h2.redMul(h);
	  var v = u1.redMul(h2);

	  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
	  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
	  var nz = this.z.redMul(h);

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype.dblp = function dblp(pow) {
	  if (pow === 0)
	    return this;
	  if (this.isInfinity())
	    return this;
	  if (!pow)
	    return this.dbl();

	  if (this.curve.zeroA || this.curve.threeA) {
	    var r = this;
	    for (var i = 0; i < pow; i++)
	      r = r.dbl();
	    return r;
	  }

	  // 1M + 2S + 1A + N * (4S + 5M + 8A)
	  // N = 1 => 6M + 6S + 9A
	  var a = this.curve.a;
	  var tinv = this.curve.tinv;

	  var jx = this.x;
	  var jy = this.y;
	  var jz = this.z;
	  var jz4 = jz.redSqr().redSqr();

	  // Reuse results
	  var jyd = jy.redAdd(jy);
	  for (var i = 0; i < pow; i++) {
	    var jx2 = jx.redSqr();
	    var jyd2 = jyd.redSqr();
	    var jyd4 = jyd2.redSqr();
	    var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

	    var t1 = jx.redMul(jyd2);
	    var nx = c.redSqr().redISub(t1.redAdd(t1));
	    var t2 = t1.redISub(nx);
	    var dny = c.redMul(t2);
	    dny = dny.redIAdd(dny).redISub(jyd4);
	    var nz = jyd.redMul(jz);
	    if (i + 1 < pow)
	      jz4 = jz4.redMul(jyd4);

	    jx = nx;
	    jz = nz;
	    jyd = dny;
	  }

	  return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
	};

	JPoint.prototype.dbl = function dbl() {
	  if (this.isInfinity())
	    return this;

	  if (this.curve.zeroA)
	    return this._zeroDbl();
	  else if (this.curve.threeA)
	    return this._threeDbl();
	  else
	    return this._dbl();
	};

	JPoint.prototype._zeroDbl = function _zeroDbl() {
	  var nx;
	  var ny;
	  var nz;
	  // Z = 1
	  if (this.zOne) {
	    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
	    //     #doubling-mdbl-2007-bl
	    // 1M + 5S + 14A

	    // XX = X1^2
	    var xx = this.x.redSqr();
	    // YY = Y1^2
	    var yy = this.y.redSqr();
	    // YYYY = YY^2
	    var yyyy = yy.redSqr();
	    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
	    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
	    s = s.redIAdd(s);
	    // M = 3 * XX + a; a = 0
	    var m = xx.redAdd(xx).redIAdd(xx);
	    // T = M ^ 2 - 2*S
	    var t = m.redSqr().redISub(s).redISub(s);

	    // 8 * YYYY
	    var yyyy8 = yyyy.redIAdd(yyyy);
	    yyyy8 = yyyy8.redIAdd(yyyy8);
	    yyyy8 = yyyy8.redIAdd(yyyy8);

	    // X3 = T
	    nx = t;
	    // Y3 = M * (S - T) - 8 * YYYY
	    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
	    // Z3 = 2*Y1
	    nz = this.y.redAdd(this.y);
	  } else {
	    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
	    //     #doubling-dbl-2009-l
	    // 2M + 5S + 13A

	    // A = X1^2
	    var a = this.x.redSqr();
	    // B = Y1^2
	    var b = this.y.redSqr();
	    // C = B^2
	    var c = b.redSqr();
	    // D = 2 * ((X1 + B)^2 - A - C)
	    var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c);
	    d = d.redIAdd(d);
	    // E = 3 * A
	    var e = a.redAdd(a).redIAdd(a);
	    // F = E^2
	    var f = e.redSqr();

	    // 8 * C
	    var c8 = c.redIAdd(c);
	    c8 = c8.redIAdd(c8);
	    c8 = c8.redIAdd(c8);

	    // X3 = F - 2 * D
	    nx = f.redISub(d).redISub(d);
	    // Y3 = E * (D - X3) - 8 * C
	    ny = e.redMul(d.redISub(nx)).redISub(c8);
	    // Z3 = 2 * Y1 * Z1
	    nz = this.y.redMul(this.z);
	    nz = nz.redIAdd(nz);
	  }

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype._threeDbl = function _threeDbl() {
	  var nx;
	  var ny;
	  var nz;
	  // Z = 1
	  if (this.zOne) {
	    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html
	    //     #doubling-mdbl-2007-bl
	    // 1M + 5S + 15A

	    // XX = X1^2
	    var xx = this.x.redSqr();
	    // YY = Y1^2
	    var yy = this.y.redSqr();
	    // YYYY = YY^2
	    var yyyy = yy.redSqr();
	    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
	    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
	    s = s.redIAdd(s);
	    // M = 3 * XX + a
	    var m = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
	    // T = M^2 - 2 * S
	    var t = m.redSqr().redISub(s).redISub(s);
	    // X3 = T
	    nx = t;
	    // Y3 = M * (S - T) - 8 * YYYY
	    var yyyy8 = yyyy.redIAdd(yyyy);
	    yyyy8 = yyyy8.redIAdd(yyyy8);
	    yyyy8 = yyyy8.redIAdd(yyyy8);
	    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
	    // Z3 = 2 * Y1
	    nz = this.y.redAdd(this.y);
	  } else {
	    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html#doubling-dbl-2001-b
	    // 3M + 5S

	    // delta = Z1^2
	    var delta = this.z.redSqr();
	    // gamma = Y1^2
	    var gamma = this.y.redSqr();
	    // beta = X1 * gamma
	    var beta = this.x.redMul(gamma);
	    // alpha = 3 * (X1 - delta) * (X1 + delta)
	    var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
	    alpha = alpha.redAdd(alpha).redIAdd(alpha);
	    // X3 = alpha^2 - 8 * beta
	    var beta4 = beta.redIAdd(beta);
	    beta4 = beta4.redIAdd(beta4);
	    var beta8 = beta4.redAdd(beta4);
	    nx = alpha.redSqr().redISub(beta8);
	    // Z3 = (Y1 + Z1)^2 - gamma - delta
	    nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
	    // Y3 = alpha * (4 * beta - X3) - 8 * gamma^2
	    var ggamma8 = gamma.redSqr();
	    ggamma8 = ggamma8.redIAdd(ggamma8);
	    ggamma8 = ggamma8.redIAdd(ggamma8);
	    ggamma8 = ggamma8.redIAdd(ggamma8);
	    ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
	  }

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype._dbl = function _dbl() {
	  var a = this.curve.a;

	  // 4M + 6S + 10A
	  var jx = this.x;
	  var jy = this.y;
	  var jz = this.z;
	  var jz4 = jz.redSqr().redSqr();

	  var jx2 = jx.redSqr();
	  var jy2 = jy.redSqr();

	  var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

	  var jxd4 = jx.redAdd(jx);
	  jxd4 = jxd4.redIAdd(jxd4);
	  var t1 = jxd4.redMul(jy2);
	  var nx = c.redSqr().redISub(t1.redAdd(t1));
	  var t2 = t1.redISub(nx);

	  var jyd8 = jy2.redSqr();
	  jyd8 = jyd8.redIAdd(jyd8);
	  jyd8 = jyd8.redIAdd(jyd8);
	  jyd8 = jyd8.redIAdd(jyd8);
	  var ny = c.redMul(t2).redISub(jyd8);
	  var nz = jy.redAdd(jy).redMul(jz);

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype.trpl = function trpl() {
	  if (!this.curve.zeroA)
	    return this.dbl().add(this);

	  // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#tripling-tpl-2007-bl
	  // 5M + 10S + ...

	  // XX = X1^2
	  var xx = this.x.redSqr();
	  // YY = Y1^2
	  var yy = this.y.redSqr();
	  // ZZ = Z1^2
	  var zz = this.z.redSqr();
	  // YYYY = YY^2
	  var yyyy = yy.redSqr();
	  // M = 3 * XX + a * ZZ2; a = 0
	  var m = xx.redAdd(xx).redIAdd(xx);
	  // MM = M^2
	  var mm = m.redSqr();
	  // E = 6 * ((X1 + YY)^2 - XX - YYYY) - MM
	  var e = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
	  e = e.redIAdd(e);
	  e = e.redAdd(e).redIAdd(e);
	  e = e.redISub(mm);
	  // EE = E^2
	  var ee = e.redSqr();
	  // T = 16*YYYY
	  var t = yyyy.redIAdd(yyyy);
	  t = t.redIAdd(t);
	  t = t.redIAdd(t);
	  t = t.redIAdd(t);
	  // U = (M + E)^2 - MM - EE - T
	  var u = m.redIAdd(e).redSqr().redISub(mm).redISub(ee).redISub(t);
	  // X3 = 4 * (X1 * EE - 4 * YY * U)
	  var yyu4 = yy.redMul(u);
	  yyu4 = yyu4.redIAdd(yyu4);
	  yyu4 = yyu4.redIAdd(yyu4);
	  var nx = this.x.redMul(ee).redISub(yyu4);
	  nx = nx.redIAdd(nx);
	  nx = nx.redIAdd(nx);
	  // Y3 = 8 * Y1 * (U * (T - U) - E * EE)
	  var ny = this.y.redMul(u.redMul(t.redISub(u)).redISub(e.redMul(ee)));
	  ny = ny.redIAdd(ny);
	  ny = ny.redIAdd(ny);
	  ny = ny.redIAdd(ny);
	  // Z3 = (Z1 + E)^2 - ZZ - EE
	  var nz = this.z.redAdd(e).redSqr().redISub(zz).redISub(ee);

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype.mul = function mul(k, kbase) {
	  k = new bn(k, kbase);

	  return this.curve._wnafMul(this, k);
	};

	JPoint.prototype.eq = function eq(p) {
	  if (p.type === 'affine')
	    return this.eq(p.toJ());

	  if (this === p)
	    return true;

	  // x1 * z2^2 == x2 * z1^2
	  var z2 = this.z.redSqr();
	  var pz2 = p.z.redSqr();
	  if (this.x.redMul(pz2).redISub(p.x.redMul(z2)).cmpn(0) !== 0)
	    return false;

	  // y1 * z2^3 == y2 * z1^3
	  var z3 = z2.redMul(this.z);
	  var pz3 = pz2.redMul(p.z);
	  return this.y.redMul(pz3).redISub(p.y.redMul(z3)).cmpn(0) === 0;
	};

	JPoint.prototype.eqXToP = function eqXToP(x) {
	  var zs = this.z.redSqr();
	  var rx = x.toRed(this.curve.red).redMul(zs);
	  if (this.x.cmp(rx) === 0)
	    return true;

	  var xc = x.clone();
	  var t = this.curve.redN.redMul(zs);
	  for (;;) {
	    xc.iadd(this.curve.n);
	    if (xc.cmp(this.curve.p) >= 0)
	      return false;

	    rx.redIAdd(t);
	    if (this.x.cmp(rx) === 0)
	      return true;
	  }
	};

	JPoint.prototype.inspect = function inspect() {
	  if (this.isInfinity())
	    return '<EC JPoint Infinity>';
	  return '<EC JPoint x: ' + this.x.toString(16, 2) +
	      ' y: ' + this.y.toString(16, 2) +
	      ' z: ' + this.z.toString(16, 2) + '>';
	};

	JPoint.prototype.isInfinity = function isInfinity() {
	  // XXX This code assumes that zero is always zero in red
	  return this.z.cmpn(0) === 0;
	};

	var Base$1 = curve_1.base;


	var utils$1 = elliptic_1.utils;

	function MontCurve(conf) {
	  Base$1.call(this, 'mont', conf);

	  this.a = new bn(conf.a, 16).toRed(this.red);
	  this.b = new bn(conf.b, 16).toRed(this.red);
	  this.i4 = new bn(4).toRed(this.red).redInvm();
	  this.two = new bn(2).toRed(this.red);
	  this.a24 = this.i4.redMul(this.a.redAdd(this.two));
	}
	inherits_browser(MontCurve, Base$1);
	var mont = MontCurve;

	MontCurve.prototype.validate = function validate(point) {
	  var x = point.normalize().x;
	  var x2 = x.redSqr();
	  var rhs = x2.redMul(x).redAdd(x2.redMul(this.a)).redAdd(x);
	  var y = rhs.redSqrt();

	  return y.redSqr().cmp(rhs) === 0;
	};

	function Point$1(curve, x, z) {
	  Base$1.BasePoint.call(this, curve, 'projective');
	  if (x === null && z === null) {
	    this.x = this.curve.one;
	    this.z = this.curve.zero;
	  } else {
	    this.x = new bn(x, 16);
	    this.z = new bn(z, 16);
	    if (!this.x.red)
	      this.x = this.x.toRed(this.curve.red);
	    if (!this.z.red)
	      this.z = this.z.toRed(this.curve.red);
	  }
	}
	inherits_browser(Point$1, Base$1.BasePoint);

	MontCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
	  return this.point(utils$1.toArray(bytes, enc), 1);
	};

	MontCurve.prototype.point = function point(x, z) {
	  return new Point$1(this, x, z);
	};

	MontCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
	  return Point$1.fromJSON(this, obj);
	};

	Point$1.prototype.precompute = function precompute() {
	  // No-op
	};

	Point$1.prototype._encode = function _encode() {
	  return this.getX().toArray('be', this.curve.p.byteLength());
	};

	Point$1.fromJSON = function fromJSON(curve, obj) {
	  return new Point$1(curve, obj[0], obj[1] || curve.one);
	};

	Point$1.prototype.inspect = function inspect() {
	  if (this.isInfinity())
	    return '<EC Point Infinity>';
	  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
	      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
	};

	Point$1.prototype.isInfinity = function isInfinity() {
	  // XXX This code assumes that zero is always zero in red
	  return this.z.cmpn(0) === 0;
	};

	Point$1.prototype.dbl = function dbl() {
	  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#doubling-dbl-1987-m-3
	  // 2M + 2S + 4A

	  // A = X1 + Z1
	  var a = this.x.redAdd(this.z);
	  // AA = A^2
	  var aa = a.redSqr();
	  // B = X1 - Z1
	  var b = this.x.redSub(this.z);
	  // BB = B^2
	  var bb = b.redSqr();
	  // C = AA - BB
	  var c = aa.redSub(bb);
	  // X3 = AA * BB
	  var nx = aa.redMul(bb);
	  // Z3 = C * (BB + A24 * C)
	  var nz = c.redMul(bb.redAdd(this.curve.a24.redMul(c)));
	  return this.curve.point(nx, nz);
	};

	Point$1.prototype.add = function add() {
	  throw new Error('Not supported on Montgomery curve');
	};

	Point$1.prototype.diffAdd = function diffAdd(p, diff) {
	  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#diffadd-dadd-1987-m-3
	  // 4M + 2S + 6A

	  // A = X2 + Z2
	  var a = this.x.redAdd(this.z);
	  // B = X2 - Z2
	  var b = this.x.redSub(this.z);
	  // C = X3 + Z3
	  var c = p.x.redAdd(p.z);
	  // D = X3 - Z3
	  var d = p.x.redSub(p.z);
	  // DA = D * A
	  var da = d.redMul(a);
	  // CB = C * B
	  var cb = c.redMul(b);
	  // X5 = Z1 * (DA + CB)^2
	  var nx = diff.z.redMul(da.redAdd(cb).redSqr());
	  // Z5 = X1 * (DA - CB)^2
	  var nz = diff.x.redMul(da.redISub(cb).redSqr());
	  return this.curve.point(nx, nz);
	};

	Point$1.prototype.mul = function mul(k) {
	  var t = k.clone();
	  var a = this; // (N / 2) * Q + Q
	  var b = this.curve.point(null, null); // (N / 2) * Q
	  var c = this; // Q

	  for (var bits = []; t.cmpn(0) !== 0; t.iushrn(1))
	    bits.push(t.andln(1));

	  for (var i = bits.length - 1; i >= 0; i--) {
	    if (bits[i] === 0) {
	      // N * Q + Q = ((N / 2) * Q + Q)) + (N / 2) * Q
	      a = a.diffAdd(b, c);
	      // N * Q = 2 * ((N / 2) * Q + Q))
	      b = b.dbl();
	    } else {
	      // N * Q = ((N / 2) * Q + Q) + ((N / 2) * Q)
	      b = a.diffAdd(b, c);
	      // N * Q + Q = 2 * ((N / 2) * Q + Q)
	      a = a.dbl();
	    }
	  }
	  return b;
	};

	Point$1.prototype.mulAdd = function mulAdd() {
	  throw new Error('Not supported on Montgomery curve');
	};

	Point$1.prototype.jumlAdd = function jumlAdd() {
	  throw new Error('Not supported on Montgomery curve');
	};

	Point$1.prototype.eq = function eq(other) {
	  return this.getX().cmp(other.getX()) === 0;
	};

	Point$1.prototype.normalize = function normalize() {
	  this.x = this.x.redMul(this.z.redInvm());
	  this.z = this.curve.one;
	  return this;
	};

	Point$1.prototype.getX = function getX() {
	  // Normalize coordinates
	  this.normalize();

	  return this.x.fromRed();
	};

	var Base$2 = curve_1.base;

	var assert$3 = elliptic_1.utils.assert;

	function EdwardsCurve(conf) {
	  // NOTE: Important as we are creating point in Base.call()
	  this.twisted = (conf.a | 0) !== 1;
	  this.mOneA = this.twisted && (conf.a | 0) === -1;
	  this.extended = this.mOneA;

	  Base$2.call(this, 'edwards', conf);

	  this.a = new bn(conf.a, 16).umod(this.red.m);
	  this.a = this.a.toRed(this.red);
	  this.c = new bn(conf.c, 16).toRed(this.red);
	  this.c2 = this.c.redSqr();
	  this.d = new bn(conf.d, 16).toRed(this.red);
	  this.dd = this.d.redAdd(this.d);

	  assert$3(!this.twisted || this.c.fromRed().cmpn(1) === 0);
	  this.oneC = (conf.c | 0) === 1;
	}
	inherits_browser(EdwardsCurve, Base$2);
	var edwards = EdwardsCurve;

	EdwardsCurve.prototype._mulA = function _mulA(num) {
	  if (this.mOneA)
	    return num.redNeg();
	  else
	    return this.a.redMul(num);
	};

	EdwardsCurve.prototype._mulC = function _mulC(num) {
	  if (this.oneC)
	    return num;
	  else
	    return this.c.redMul(num);
	};

	// Just for compatibility with Short curve
	EdwardsCurve.prototype.jpoint = function jpoint(x, y, z, t) {
	  return this.point(x, y, z, t);
	};

	EdwardsCurve.prototype.pointFromX = function pointFromX(x, odd) {
	  x = new bn(x, 16);
	  if (!x.red)
	    x = x.toRed(this.red);

	  var x2 = x.redSqr();
	  var rhs = this.c2.redSub(this.a.redMul(x2));
	  var lhs = this.one.redSub(this.c2.redMul(this.d).redMul(x2));

	  var y2 = rhs.redMul(lhs.redInvm());
	  var y = y2.redSqrt();
	  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
	    throw new Error('invalid point');

	  var isOdd = y.fromRed().isOdd();
	  if (odd && !isOdd || !odd && isOdd)
	    y = y.redNeg();

	  return this.point(x, y);
	};

	EdwardsCurve.prototype.pointFromY = function pointFromY(y, odd) {
	  y = new bn(y, 16);
	  if (!y.red)
	    y = y.toRed(this.red);

	  // x^2 = (y^2 - c^2) / (c^2 d y^2 - a)
	  var y2 = y.redSqr();
	  var lhs = y2.redSub(this.c2);
	  var rhs = y2.redMul(this.d).redMul(this.c2).redSub(this.a);
	  var x2 = lhs.redMul(rhs.redInvm());

	  if (x2.cmp(this.zero) === 0) {
	    if (odd)
	      throw new Error('invalid point');
	    else
	      return this.point(this.zero, y);
	  }

	  var x = x2.redSqrt();
	  if (x.redSqr().redSub(x2).cmp(this.zero) !== 0)
	    throw new Error('invalid point');

	  if (x.fromRed().isOdd() !== odd)
	    x = x.redNeg();

	  return this.point(x, y);
	};

	EdwardsCurve.prototype.validate = function validate(point) {
	  if (point.isInfinity())
	    return true;

	  // Curve: A * X^2 + Y^2 = C^2 * (1 + D * X^2 * Y^2)
	  point.normalize();

	  var x2 = point.x.redSqr();
	  var y2 = point.y.redSqr();
	  var lhs = x2.redMul(this.a).redAdd(y2);
	  var rhs = this.c2.redMul(this.one.redAdd(this.d.redMul(x2).redMul(y2)));

	  return lhs.cmp(rhs) === 0;
	};

	function Point$2(curve, x, y, z, t) {
	  Base$2.BasePoint.call(this, curve, 'projective');
	  if (x === null && y === null && z === null) {
	    this.x = this.curve.zero;
	    this.y = this.curve.one;
	    this.z = this.curve.one;
	    this.t = this.curve.zero;
	    this.zOne = true;
	  } else {
	    this.x = new bn(x, 16);
	    this.y = new bn(y, 16);
	    this.z = z ? new bn(z, 16) : this.curve.one;
	    this.t = t && new bn(t, 16);
	    if (!this.x.red)
	      this.x = this.x.toRed(this.curve.red);
	    if (!this.y.red)
	      this.y = this.y.toRed(this.curve.red);
	    if (!this.z.red)
	      this.z = this.z.toRed(this.curve.red);
	    if (this.t && !this.t.red)
	      this.t = this.t.toRed(this.curve.red);
	    this.zOne = this.z === this.curve.one;

	    // Use extended coordinates
	    if (this.curve.extended && !this.t) {
	      this.t = this.x.redMul(this.y);
	      if (!this.zOne)
	        this.t = this.t.redMul(this.z.redInvm());
	    }
	  }
	}
	inherits_browser(Point$2, Base$2.BasePoint);

	EdwardsCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
	  return Point$2.fromJSON(this, obj);
	};

	EdwardsCurve.prototype.point = function point(x, y, z, t) {
	  return new Point$2(this, x, y, z, t);
	};

	Point$2.fromJSON = function fromJSON(curve, obj) {
	  return new Point$2(curve, obj[0], obj[1], obj[2]);
	};

	Point$2.prototype.inspect = function inspect() {
	  if (this.isInfinity())
	    return '<EC Point Infinity>';
	  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
	      ' y: ' + this.y.fromRed().toString(16, 2) +
	      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
	};

	Point$2.prototype.isInfinity = function isInfinity() {
	  // XXX This code assumes that zero is always zero in red
	  return this.x.cmpn(0) === 0 &&
	    (this.y.cmp(this.z) === 0 ||
	    (this.zOne && this.y.cmp(this.curve.c) === 0));
	};

	Point$2.prototype._extDbl = function _extDbl() {
	  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
	  //     #doubling-dbl-2008-hwcd
	  // 4M + 4S

	  // A = X1^2
	  var a = this.x.redSqr();
	  // B = Y1^2
	  var b = this.y.redSqr();
	  // C = 2 * Z1^2
	  var c = this.z.redSqr();
	  c = c.redIAdd(c);
	  // D = a * A
	  var d = this.curve._mulA(a);
	  // E = (X1 + Y1)^2 - A - B
	  var e = this.x.redAdd(this.y).redSqr().redISub(a).redISub(b);
	  // G = D + B
	  var g = d.redAdd(b);
	  // F = G - C
	  var f = g.redSub(c);
	  // H = D - B
	  var h = d.redSub(b);
	  // X3 = E * F
	  var nx = e.redMul(f);
	  // Y3 = G * H
	  var ny = g.redMul(h);
	  // T3 = E * H
	  var nt = e.redMul(h);
	  // Z3 = F * G
	  var nz = f.redMul(g);
	  return this.curve.point(nx, ny, nz, nt);
	};

	Point$2.prototype._projDbl = function _projDbl() {
	  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
	  //     #doubling-dbl-2008-bbjlp
	  //     #doubling-dbl-2007-bl
	  // and others
	  // Generally 3M + 4S or 2M + 4S

	  // B = (X1 + Y1)^2
	  var b = this.x.redAdd(this.y).redSqr();
	  // C = X1^2
	  var c = this.x.redSqr();
	  // D = Y1^2
	  var d = this.y.redSqr();

	  var nx;
	  var ny;
	  var nz;
	  if (this.curve.twisted) {
	    // E = a * C
	    var e = this.curve._mulA(c);
	    // F = E + D
	    var f = e.redAdd(d);
	    if (this.zOne) {
	      // X3 = (B - C - D) * (F - 2)
	      nx = b.redSub(c).redSub(d).redMul(f.redSub(this.curve.two));
	      // Y3 = F * (E - D)
	      ny = f.redMul(e.redSub(d));
	      // Z3 = F^2 - 2 * F
	      nz = f.redSqr().redSub(f).redSub(f);
	    } else {
	      // H = Z1^2
	      var h = this.z.redSqr();
	      // J = F - 2 * H
	      var j = f.redSub(h).redISub(h);
	      // X3 = (B-C-D)*J
	      nx = b.redSub(c).redISub(d).redMul(j);
	      // Y3 = F * (E - D)
	      ny = f.redMul(e.redSub(d));
	      // Z3 = F * J
	      nz = f.redMul(j);
	    }
	  } else {
	    // E = C + D
	    var e = c.redAdd(d);
	    // H = (c * Z1)^2
	    var h = this.curve._mulC(this.z).redSqr();
	    // J = E - 2 * H
	    var j = e.redSub(h).redSub(h);
	    // X3 = c * (B - E) * J
	    nx = this.curve._mulC(b.redISub(e)).redMul(j);
	    // Y3 = c * E * (C - D)
	    ny = this.curve._mulC(e).redMul(c.redISub(d));
	    // Z3 = E * J
	    nz = e.redMul(j);
	  }
	  return this.curve.point(nx, ny, nz);
	};

	Point$2.prototype.dbl = function dbl() {
	  if (this.isInfinity())
	    return this;

	  // Double in extended coordinates
	  if (this.curve.extended)
	    return this._extDbl();
	  else
	    return this._projDbl();
	};

	Point$2.prototype._extAdd = function _extAdd(p) {
	  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
	  //     #addition-add-2008-hwcd-3
	  // 8M

	  // A = (Y1 - X1) * (Y2 - X2)
	  var a = this.y.redSub(this.x).redMul(p.y.redSub(p.x));
	  // B = (Y1 + X1) * (Y2 + X2)
	  var b = this.y.redAdd(this.x).redMul(p.y.redAdd(p.x));
	  // C = T1 * k * T2
	  var c = this.t.redMul(this.curve.dd).redMul(p.t);
	  // D = Z1 * 2 * Z2
	  var d = this.z.redMul(p.z.redAdd(p.z));
	  // E = B - A
	  var e = b.redSub(a);
	  // F = D - C
	  var f = d.redSub(c);
	  // G = D + C
	  var g = d.redAdd(c);
	  // H = B + A
	  var h = b.redAdd(a);
	  // X3 = E * F
	  var nx = e.redMul(f);
	  // Y3 = G * H
	  var ny = g.redMul(h);
	  // T3 = E * H
	  var nt = e.redMul(h);
	  // Z3 = F * G
	  var nz = f.redMul(g);
	  return this.curve.point(nx, ny, nz, nt);
	};

	Point$2.prototype._projAdd = function _projAdd(p) {
	  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
	  //     #addition-add-2008-bbjlp
	  //     #addition-add-2007-bl
	  // 10M + 1S

	  // A = Z1 * Z2
	  var a = this.z.redMul(p.z);
	  // B = A^2
	  var b = a.redSqr();
	  // C = X1 * X2
	  var c = this.x.redMul(p.x);
	  // D = Y1 * Y2
	  var d = this.y.redMul(p.y);
	  // E = d * C * D
	  var e = this.curve.d.redMul(c).redMul(d);
	  // F = B - E
	  var f = b.redSub(e);
	  // G = B + E
	  var g = b.redAdd(e);
	  // X3 = A * F * ((X1 + Y1) * (X2 + Y2) - C - D)
	  var tmp = this.x.redAdd(this.y).redMul(p.x.redAdd(p.y)).redISub(c).redISub(d);
	  var nx = a.redMul(f).redMul(tmp);
	  var ny;
	  var nz;
	  if (this.curve.twisted) {
	    // Y3 = A * G * (D - a * C)
	    ny = a.redMul(g).redMul(d.redSub(this.curve._mulA(c)));
	    // Z3 = F * G
	    nz = f.redMul(g);
	  } else {
	    // Y3 = A * G * (D - C)
	    ny = a.redMul(g).redMul(d.redSub(c));
	    // Z3 = c * F * G
	    nz = this.curve._mulC(f).redMul(g);
	  }
	  return this.curve.point(nx, ny, nz);
	};

	Point$2.prototype.add = function add(p) {
	  if (this.isInfinity())
	    return p;
	  if (p.isInfinity())
	    return this;

	  if (this.curve.extended)
	    return this._extAdd(p);
	  else
	    return this._projAdd(p);
	};

	Point$2.prototype.mul = function mul(k) {
	  if (this._hasDoubles(k))
	    return this.curve._fixedNafMul(this, k);
	  else
	    return this.curve._wnafMul(this, k);
	};

	Point$2.prototype.mulAdd = function mulAdd(k1, p, k2) {
	  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, false);
	};

	Point$2.prototype.jmulAdd = function jmulAdd(k1, p, k2) {
	  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, true);
	};

	Point$2.prototype.normalize = function normalize() {
	  if (this.zOne)
	    return this;

	  // Normalize coordinates
	  var zi = this.z.redInvm();
	  this.x = this.x.redMul(zi);
	  this.y = this.y.redMul(zi);
	  if (this.t)
	    this.t = this.t.redMul(zi);
	  this.z = this.curve.one;
	  this.zOne = true;
	  return this;
	};

	Point$2.prototype.neg = function neg() {
	  return this.curve.point(this.x.redNeg(),
	                          this.y,
	                          this.z,
	                          this.t && this.t.redNeg());
	};

	Point$2.prototype.getX = function getX() {
	  this.normalize();
	  return this.x.fromRed();
	};

	Point$2.prototype.getY = function getY() {
	  this.normalize();
	  return this.y.fromRed();
	};

	Point$2.prototype.eq = function eq(other) {
	  return this === other ||
	         this.getX().cmp(other.getX()) === 0 &&
	         this.getY().cmp(other.getY()) === 0;
	};

	Point$2.prototype.eqXToP = function eqXToP(x) {
	  var rx = x.toRed(this.curve.red).redMul(this.z);
	  if (this.x.cmp(rx) === 0)
	    return true;

	  var xc = x.clone();
	  var t = this.curve.redN.redMul(this.z);
	  for (;;) {
	    xc.iadd(this.curve.n);
	    if (xc.cmp(this.curve.p) >= 0)
	      return false;

	    rx.redIAdd(t);
	    if (this.x.cmp(rx) === 0)
	      return true;
	  }
	};

	// Compatibility with BaseCurve
	Point$2.prototype.toP = Point$2.prototype.normalize;
	Point$2.prototype.mixedAdd = Point$2.prototype.add;

	var curve_1 = createCommonjsModule(function (module, exports) {

	var curve = exports;

	curve.base = base;
	curve.short = short_1;
	curve.mont = mont;
	curve.edwards = edwards;
	});

	var inherits_1 = inherits_browser;

	function toArray(msg, enc) {
	  if (Array.isArray(msg))
	    return msg.slice();
	  if (!msg)
	    return [];
	  var res = [];
	  if (typeof msg === 'string') {
	    if (!enc) {
	      for (var i = 0; i < msg.length; i++) {
	        var c = msg.charCodeAt(i);
	        var hi = c >> 8;
	        var lo = c & 0xff;
	        if (hi)
	          res.push(hi, lo);
	        else
	          res.push(lo);
	      }
	    } else if (enc === 'hex') {
	      msg = msg.replace(/[^a-z0-9]+/ig, '');
	      if (msg.length % 2 !== 0)
	        msg = '0' + msg;
	      for (i = 0; i < msg.length; i += 2)
	        res.push(parseInt(msg[i] + msg[i + 1], 16));
	    }
	  } else {
	    for (i = 0; i < msg.length; i++)
	      res[i] = msg[i] | 0;
	  }
	  return res;
	}
	var toArray_1 = toArray;

	function toHex(msg) {
	  var res = '';
	  for (var i = 0; i < msg.length; i++)
	    res += zero2(msg[i].toString(16));
	  return res;
	}
	var toHex_1 = toHex;

	function htonl(w) {
	  var res = (w >>> 24) |
	            ((w >>> 8) & 0xff00) |
	            ((w << 8) & 0xff0000) |
	            ((w & 0xff) << 24);
	  return res >>> 0;
	}
	var htonl_1 = htonl;

	function toHex32(msg, endian) {
	  var res = '';
	  for (var i = 0; i < msg.length; i++) {
	    var w = msg[i];
	    if (endian === 'little')
	      w = htonl(w);
	    res += zero8(w.toString(16));
	  }
	  return res;
	}
	var toHex32_1 = toHex32;

	function zero2(word) {
	  if (word.length === 1)
	    return '0' + word;
	  else
	    return word;
	}
	var zero2_1 = zero2;

	function zero8(word) {
	  if (word.length === 7)
	    return '0' + word;
	  else if (word.length === 6)
	    return '00' + word;
	  else if (word.length === 5)
	    return '000' + word;
	  else if (word.length === 4)
	    return '0000' + word;
	  else if (word.length === 3)
	    return '00000' + word;
	  else if (word.length === 2)
	    return '000000' + word;
	  else if (word.length === 1)
	    return '0000000' + word;
	  else
	    return word;
	}
	var zero8_1 = zero8;

	function join32(msg, start, end, endian) {
	  var len = end - start;
	  minimalisticAssert(len % 4 === 0);
	  var res = new Array(len / 4);
	  for (var i = 0, k = start; i < res.length; i++, k += 4) {
	    var w;
	    if (endian === 'big')
	      w = (msg[k] << 24) | (msg[k + 1] << 16) | (msg[k + 2] << 8) | msg[k + 3];
	    else
	      w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k];
	    res[i] = w >>> 0;
	  }
	  return res;
	}
	var join32_1 = join32;

	function split32(msg, endian) {
	  var res = new Array(msg.length * 4);
	  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
	    var m = msg[i];
	    if (endian === 'big') {
	      res[k] = m >>> 24;
	      res[k + 1] = (m >>> 16) & 0xff;
	      res[k + 2] = (m >>> 8) & 0xff;
	      res[k + 3] = m & 0xff;
	    } else {
	      res[k + 3] = m >>> 24;
	      res[k + 2] = (m >>> 16) & 0xff;
	      res[k + 1] = (m >>> 8) & 0xff;
	      res[k] = m & 0xff;
	    }
	  }
	  return res;
	}
	var split32_1 = split32;

	function rotr32(w, b) {
	  return (w >>> b) | (w << (32 - b));
	}
	var rotr32_1 = rotr32;

	function rotl32(w, b) {
	  return (w << b) | (w >>> (32 - b));
	}
	var rotl32_1 = rotl32;

	function sum32(a, b) {
	  return (a + b) >>> 0;
	}
	var sum32_1 = sum32;

	function sum32_3(a, b, c) {
	  return (a + b + c) >>> 0;
	}
	var sum32_3_1 = sum32_3;

	function sum32_4(a, b, c, d) {
	  return (a + b + c + d) >>> 0;
	}
	var sum32_4_1 = sum32_4;

	function sum32_5(a, b, c, d, e) {
	  return (a + b + c + d + e) >>> 0;
	}
	var sum32_5_1 = sum32_5;

	function sum64(buf, pos, ah, al) {
	  var bh = buf[pos];
	  var bl = buf[pos + 1];

	  var lo = (al + bl) >>> 0;
	  var hi = (lo < al ? 1 : 0) + ah + bh;
	  buf[pos] = hi >>> 0;
	  buf[pos + 1] = lo;
	}
	var sum64_1 = sum64;

	function sum64_hi(ah, al, bh, bl) {
	  var lo = (al + bl) >>> 0;
	  var hi = (lo < al ? 1 : 0) + ah + bh;
	  return hi >>> 0;
	}
	var sum64_hi_1 = sum64_hi;

	function sum64_lo(ah, al, bh, bl) {
	  var lo = al + bl;
	  return lo >>> 0;
	}
	var sum64_lo_1 = sum64_lo;

	function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
	  var carry = 0;
	  var lo = al;
	  lo = (lo + bl) >>> 0;
	  carry += lo < al ? 1 : 0;
	  lo = (lo + cl) >>> 0;
	  carry += lo < cl ? 1 : 0;
	  lo = (lo + dl) >>> 0;
	  carry += lo < dl ? 1 : 0;

	  var hi = ah + bh + ch + dh + carry;
	  return hi >>> 0;
	}
	var sum64_4_hi_1 = sum64_4_hi;

	function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
	  var lo = al + bl + cl + dl;
	  return lo >>> 0;
	}
	var sum64_4_lo_1 = sum64_4_lo;

	function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
	  var carry = 0;
	  var lo = al;
	  lo = (lo + bl) >>> 0;
	  carry += lo < al ? 1 : 0;
	  lo = (lo + cl) >>> 0;
	  carry += lo < cl ? 1 : 0;
	  lo = (lo + dl) >>> 0;
	  carry += lo < dl ? 1 : 0;
	  lo = (lo + el) >>> 0;
	  carry += lo < el ? 1 : 0;

	  var hi = ah + bh + ch + dh + eh + carry;
	  return hi >>> 0;
	}
	var sum64_5_hi_1 = sum64_5_hi;

	function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
	  var lo = al + bl + cl + dl + el;

	  return lo >>> 0;
	}
	var sum64_5_lo_1 = sum64_5_lo;

	function rotr64_hi(ah, al, num) {
	  var r = (al << (32 - num)) | (ah >>> num);
	  return r >>> 0;
	}
	var rotr64_hi_1 = rotr64_hi;

	function rotr64_lo(ah, al, num) {
	  var r = (ah << (32 - num)) | (al >>> num);
	  return r >>> 0;
	}
	var rotr64_lo_1 = rotr64_lo;

	function shr64_hi(ah, al, num) {
	  return ah >>> num;
	}
	var shr64_hi_1 = shr64_hi;

	function shr64_lo(ah, al, num) {
	  var r = (ah << (32 - num)) | (al >>> num);
	  return r >>> 0;
	}
	var shr64_lo_1 = shr64_lo;

	var utils$2 = {
		inherits: inherits_1,
		toArray: toArray_1,
		toHex: toHex_1,
		htonl: htonl_1,
		toHex32: toHex32_1,
		zero2: zero2_1,
		zero8: zero8_1,
		join32: join32_1,
		split32: split32_1,
		rotr32: rotr32_1,
		rotl32: rotl32_1,
		sum32: sum32_1,
		sum32_3: sum32_3_1,
		sum32_4: sum32_4_1,
		sum32_5: sum32_5_1,
		sum64: sum64_1,
		sum64_hi: sum64_hi_1,
		sum64_lo: sum64_lo_1,
		sum64_4_hi: sum64_4_hi_1,
		sum64_4_lo: sum64_4_lo_1,
		sum64_5_hi: sum64_5_hi_1,
		sum64_5_lo: sum64_5_lo_1,
		rotr64_hi: rotr64_hi_1,
		rotr64_lo: rotr64_lo_1,
		shr64_hi: shr64_hi_1,
		shr64_lo: shr64_lo_1
	};

	function BlockHash() {
	  this.pending = null;
	  this.pendingTotal = 0;
	  this.blockSize = this.constructor.blockSize;
	  this.outSize = this.constructor.outSize;
	  this.hmacStrength = this.constructor.hmacStrength;
	  this.padLength = this.constructor.padLength / 8;
	  this.endian = 'big';

	  this._delta8 = this.blockSize / 8;
	  this._delta32 = this.blockSize / 32;
	}
	var BlockHash_1 = BlockHash;

	BlockHash.prototype.update = function update(msg, enc) {
	  // Convert message to array, pad it, and join into 32bit blocks
	  msg = utils$2.toArray(msg, enc);
	  if (!this.pending)
	    this.pending = msg;
	  else
	    this.pending = this.pending.concat(msg);
	  this.pendingTotal += msg.length;

	  // Enough data, try updating
	  if (this.pending.length >= this._delta8) {
	    msg = this.pending;

	    // Process pending data in blocks
	    var r = msg.length % this._delta8;
	    this.pending = msg.slice(msg.length - r, msg.length);
	    if (this.pending.length === 0)
	      this.pending = null;

	    msg = utils$2.join32(msg, 0, msg.length - r, this.endian);
	    for (var i = 0; i < msg.length; i += this._delta32)
	      this._update(msg, i, i + this._delta32);
	  }

	  return this;
	};

	BlockHash.prototype.digest = function digest(enc) {
	  this.update(this._pad());
	  minimalisticAssert(this.pending === null);

	  return this._digest(enc);
	};

	BlockHash.prototype._pad = function pad() {
	  var len = this.pendingTotal;
	  var bytes = this._delta8;
	  var k = bytes - ((len + this.padLength) % bytes);
	  var res = new Array(k + this.padLength);
	  res[0] = 0x80;
	  for (var i = 1; i < k; i++)
	    res[i] = 0;

	  // Append length
	  len <<= 3;
	  if (this.endian === 'big') {
	    for (var t = 8; t < this.padLength; t++)
	      res[i++] = 0;

	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = (len >>> 24) & 0xff;
	    res[i++] = (len >>> 16) & 0xff;
	    res[i++] = (len >>> 8) & 0xff;
	    res[i++] = len & 0xff;
	  } else {
	    res[i++] = len & 0xff;
	    res[i++] = (len >>> 8) & 0xff;
	    res[i++] = (len >>> 16) & 0xff;
	    res[i++] = (len >>> 24) & 0xff;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;

	    for (t = 8; t < this.padLength; t++)
	      res[i++] = 0;
	  }

	  return res;
	};

	var common = {
		BlockHash: BlockHash_1
	};

	var rotr32$1 = utils$2.rotr32;

	function ft_1(s, x, y, z) {
	  if (s === 0)
	    return ch32(x, y, z);
	  if (s === 1 || s === 3)
	    return p32(x, y, z);
	  if (s === 2)
	    return maj32(x, y, z);
	}
	var ft_1_1 = ft_1;

	function ch32(x, y, z) {
	  return (x & y) ^ ((~x) & z);
	}
	var ch32_1 = ch32;

	function maj32(x, y, z) {
	  return (x & y) ^ (x & z) ^ (y & z);
	}
	var maj32_1 = maj32;

	function p32(x, y, z) {
	  return x ^ y ^ z;
	}
	var p32_1 = p32;

	function s0_256(x) {
	  return rotr32$1(x, 2) ^ rotr32$1(x, 13) ^ rotr32$1(x, 22);
	}
	var s0_256_1 = s0_256;

	function s1_256(x) {
	  return rotr32$1(x, 6) ^ rotr32$1(x, 11) ^ rotr32$1(x, 25);
	}
	var s1_256_1 = s1_256;

	function g0_256(x) {
	  return rotr32$1(x, 7) ^ rotr32$1(x, 18) ^ (x >>> 3);
	}
	var g0_256_1 = g0_256;

	function g1_256(x) {
	  return rotr32$1(x, 17) ^ rotr32$1(x, 19) ^ (x >>> 10);
	}
	var g1_256_1 = g1_256;

	var common$1 = {
		ft_1: ft_1_1,
		ch32: ch32_1,
		maj32: maj32_1,
		p32: p32_1,
		s0_256: s0_256_1,
		s1_256: s1_256_1,
		g0_256: g0_256_1,
		g1_256: g1_256_1
	};

	var rotl32$1 = utils$2.rotl32;
	var sum32$1 = utils$2.sum32;
	var sum32_5$1 = utils$2.sum32_5;
	var ft_1$1 = common$1.ft_1;
	var BlockHash$1 = common.BlockHash;

	var sha1_K = [
	  0x5A827999, 0x6ED9EBA1,
	  0x8F1BBCDC, 0xCA62C1D6
	];

	function SHA1() {
	  if (!(this instanceof SHA1))
	    return new SHA1();

	  BlockHash$1.call(this);
	  this.h = [
	    0x67452301, 0xefcdab89, 0x98badcfe,
	    0x10325476, 0xc3d2e1f0 ];
	  this.W = new Array(80);
	}

	utils$2.inherits(SHA1, BlockHash$1);
	var _1 = SHA1;

	SHA1.blockSize = 512;
	SHA1.outSize = 160;
	SHA1.hmacStrength = 80;
	SHA1.padLength = 64;

	SHA1.prototype._update = function _update(msg, start) {
	  var W = this.W;

	  for (var i = 0; i < 16; i++)
	    W[i] = msg[start + i];

	  for(; i < W.length; i++)
	    W[i] = rotl32$1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

	  var a = this.h[0];
	  var b = this.h[1];
	  var c = this.h[2];
	  var d = this.h[3];
	  var e = this.h[4];

	  for (i = 0; i < W.length; i++) {
	    var s = ~~(i / 20);
	    var t = sum32_5$1(rotl32$1(a, 5), ft_1$1(s, b, c, d), e, W[i], sha1_K[s]);
	    e = d;
	    d = c;
	    c = rotl32$1(b, 30);
	    b = a;
	    a = t;
	  }

	  this.h[0] = sum32$1(this.h[0], a);
	  this.h[1] = sum32$1(this.h[1], b);
	  this.h[2] = sum32$1(this.h[2], c);
	  this.h[3] = sum32$1(this.h[3], d);
	  this.h[4] = sum32$1(this.h[4], e);
	};

	SHA1.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils$2.toHex32(this.h, 'big');
	  else
	    return utils$2.split32(this.h, 'big');
	};

	var sum32$2 = utils$2.sum32;
	var sum32_4$1 = utils$2.sum32_4;
	var sum32_5$2 = utils$2.sum32_5;
	var ch32$1 = common$1.ch32;
	var maj32$1 = common$1.maj32;
	var s0_256$1 = common$1.s0_256;
	var s1_256$1 = common$1.s1_256;
	var g0_256$1 = common$1.g0_256;
	var g1_256$1 = common$1.g1_256;

	var BlockHash$2 = common.BlockHash;

	var sha256_K = [
	  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
	  0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
	  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
	  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
	  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
	  0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
	  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
	  0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
	  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
	  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
	  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
	  0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
	  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
	  0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
	  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
	  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
	];

	function SHA256() {
	  if (!(this instanceof SHA256))
	    return new SHA256();

	  BlockHash$2.call(this);
	  this.h = [
	    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
	    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
	  ];
	  this.k = sha256_K;
	  this.W = new Array(64);
	}
	utils$2.inherits(SHA256, BlockHash$2);
	var _256 = SHA256;

	SHA256.blockSize = 512;
	SHA256.outSize = 256;
	SHA256.hmacStrength = 192;
	SHA256.padLength = 64;

	SHA256.prototype._update = function _update(msg, start) {
	  var W = this.W;

	  for (var i = 0; i < 16; i++)
	    W[i] = msg[start + i];
	  for (; i < W.length; i++)
	    W[i] = sum32_4$1(g1_256$1(W[i - 2]), W[i - 7], g0_256$1(W[i - 15]), W[i - 16]);

	  var a = this.h[0];
	  var b = this.h[1];
	  var c = this.h[2];
	  var d = this.h[3];
	  var e = this.h[4];
	  var f = this.h[5];
	  var g = this.h[6];
	  var h = this.h[7];

	  minimalisticAssert(this.k.length === W.length);
	  for (i = 0; i < W.length; i++) {
	    var T1 = sum32_5$2(h, s1_256$1(e), ch32$1(e, f, g), this.k[i], W[i]);
	    var T2 = sum32$2(s0_256$1(a), maj32$1(a, b, c));
	    h = g;
	    g = f;
	    f = e;
	    e = sum32$2(d, T1);
	    d = c;
	    c = b;
	    b = a;
	    a = sum32$2(T1, T2);
	  }

	  this.h[0] = sum32$2(this.h[0], a);
	  this.h[1] = sum32$2(this.h[1], b);
	  this.h[2] = sum32$2(this.h[2], c);
	  this.h[3] = sum32$2(this.h[3], d);
	  this.h[4] = sum32$2(this.h[4], e);
	  this.h[5] = sum32$2(this.h[5], f);
	  this.h[6] = sum32$2(this.h[6], g);
	  this.h[7] = sum32$2(this.h[7], h);
	};

	SHA256.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils$2.toHex32(this.h, 'big');
	  else
	    return utils$2.split32(this.h, 'big');
	};

	function SHA224() {
	  if (!(this instanceof SHA224))
	    return new SHA224();

	  _256.call(this);
	  this.h = [
	    0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
	    0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4 ];
	}
	utils$2.inherits(SHA224, _256);
	var _224 = SHA224;

	SHA224.blockSize = 512;
	SHA224.outSize = 224;
	SHA224.hmacStrength = 192;
	SHA224.padLength = 64;

	SHA224.prototype._digest = function digest(enc) {
	  // Just truncate output
	  if (enc === 'hex')
	    return utils$2.toHex32(this.h.slice(0, 7), 'big');
	  else
	    return utils$2.split32(this.h.slice(0, 7), 'big');
	};

	var rotr64_hi$1 = utils$2.rotr64_hi;
	var rotr64_lo$1 = utils$2.rotr64_lo;
	var shr64_hi$1 = utils$2.shr64_hi;
	var shr64_lo$1 = utils$2.shr64_lo;
	var sum64$1 = utils$2.sum64;
	var sum64_hi$1 = utils$2.sum64_hi;
	var sum64_lo$1 = utils$2.sum64_lo;
	var sum64_4_hi$1 = utils$2.sum64_4_hi;
	var sum64_4_lo$1 = utils$2.sum64_4_lo;
	var sum64_5_hi$1 = utils$2.sum64_5_hi;
	var sum64_5_lo$1 = utils$2.sum64_5_lo;

	var BlockHash$3 = common.BlockHash;

	var sha512_K = [
	  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
	  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
	  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
	  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
	  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
	  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
	  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
	  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
	  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
	  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
	  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
	  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
	  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
	  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
	  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
	  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
	  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
	  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
	  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
	  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
	  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
	  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
	  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
	  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
	  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
	  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
	  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
	  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
	  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
	  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
	  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
	  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
	  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
	  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
	  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
	  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
	  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
	  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
	  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
	  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
	];

	function SHA512() {
	  if (!(this instanceof SHA512))
	    return new SHA512();

	  BlockHash$3.call(this);
	  this.h = [
	    0x6a09e667, 0xf3bcc908,
	    0xbb67ae85, 0x84caa73b,
	    0x3c6ef372, 0xfe94f82b,
	    0xa54ff53a, 0x5f1d36f1,
	    0x510e527f, 0xade682d1,
	    0x9b05688c, 0x2b3e6c1f,
	    0x1f83d9ab, 0xfb41bd6b,
	    0x5be0cd19, 0x137e2179 ];
	  this.k = sha512_K;
	  this.W = new Array(160);
	}
	utils$2.inherits(SHA512, BlockHash$3);
	var _512 = SHA512;

	SHA512.blockSize = 1024;
	SHA512.outSize = 512;
	SHA512.hmacStrength = 192;
	SHA512.padLength = 128;

	SHA512.prototype._prepareBlock = function _prepareBlock(msg, start) {
	  var W = this.W;

	  // 32 x 32bit words
	  for (var i = 0; i < 32; i++)
	    W[i] = msg[start + i];
	  for (; i < W.length; i += 2) {
	    var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);  // i - 2
	    var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
	    var c1_hi = W[i - 14];  // i - 7
	    var c1_lo = W[i - 13];
	    var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);  // i - 15
	    var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
	    var c3_hi = W[i - 32];  // i - 16
	    var c3_lo = W[i - 31];

	    W[i] = sum64_4_hi$1(
	      c0_hi, c0_lo,
	      c1_hi, c1_lo,
	      c2_hi, c2_lo,
	      c3_hi, c3_lo);
	    W[i + 1] = sum64_4_lo$1(
	      c0_hi, c0_lo,
	      c1_hi, c1_lo,
	      c2_hi, c2_lo,
	      c3_hi, c3_lo);
	  }
	};

	SHA512.prototype._update = function _update(msg, start) {
	  this._prepareBlock(msg, start);

	  var W = this.W;

	  var ah = this.h[0];
	  var al = this.h[1];
	  var bh = this.h[2];
	  var bl = this.h[3];
	  var ch = this.h[4];
	  var cl = this.h[5];
	  var dh = this.h[6];
	  var dl = this.h[7];
	  var eh = this.h[8];
	  var el = this.h[9];
	  var fh = this.h[10];
	  var fl = this.h[11];
	  var gh = this.h[12];
	  var gl = this.h[13];
	  var hh = this.h[14];
	  var hl = this.h[15];

	  minimalisticAssert(this.k.length === W.length);
	  for (var i = 0; i < W.length; i += 2) {
	    var c0_hi = hh;
	    var c0_lo = hl;
	    var c1_hi = s1_512_hi(eh, el);
	    var c1_lo = s1_512_lo(eh, el);
	    var c2_hi = ch64_hi(eh, el, fh, fl, gh, gl);
	    var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
	    var c3_hi = this.k[i];
	    var c3_lo = this.k[i + 1];
	    var c4_hi = W[i];
	    var c4_lo = W[i + 1];

	    var T1_hi = sum64_5_hi$1(
	      c0_hi, c0_lo,
	      c1_hi, c1_lo,
	      c2_hi, c2_lo,
	      c3_hi, c3_lo,
	      c4_hi, c4_lo);
	    var T1_lo = sum64_5_lo$1(
	      c0_hi, c0_lo,
	      c1_hi, c1_lo,
	      c2_hi, c2_lo,
	      c3_hi, c3_lo,
	      c4_hi, c4_lo);

	    c0_hi = s0_512_hi(ah, al);
	    c0_lo = s0_512_lo(ah, al);
	    c1_hi = maj64_hi(ah, al, bh, bl, ch, cl);
	    c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);

	    var T2_hi = sum64_hi$1(c0_hi, c0_lo, c1_hi, c1_lo);
	    var T2_lo = sum64_lo$1(c0_hi, c0_lo, c1_hi, c1_lo);

	    hh = gh;
	    hl = gl;

	    gh = fh;
	    gl = fl;

	    fh = eh;
	    fl = el;

	    eh = sum64_hi$1(dh, dl, T1_hi, T1_lo);
	    el = sum64_lo$1(dl, dl, T1_hi, T1_lo);

	    dh = ch;
	    dl = cl;

	    ch = bh;
	    cl = bl;

	    bh = ah;
	    bl = al;

	    ah = sum64_hi$1(T1_hi, T1_lo, T2_hi, T2_lo);
	    al = sum64_lo$1(T1_hi, T1_lo, T2_hi, T2_lo);
	  }

	  sum64$1(this.h, 0, ah, al);
	  sum64$1(this.h, 2, bh, bl);
	  sum64$1(this.h, 4, ch, cl);
	  sum64$1(this.h, 6, dh, dl);
	  sum64$1(this.h, 8, eh, el);
	  sum64$1(this.h, 10, fh, fl);
	  sum64$1(this.h, 12, gh, gl);
	  sum64$1(this.h, 14, hh, hl);
	};

	SHA512.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils$2.toHex32(this.h, 'big');
	  else
	    return utils$2.split32(this.h, 'big');
	};

	function ch64_hi(xh, xl, yh, yl, zh) {
	  var r = (xh & yh) ^ ((~xh) & zh);
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function ch64_lo(xh, xl, yh, yl, zh, zl) {
	  var r = (xl & yl) ^ ((~xl) & zl);
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function maj64_hi(xh, xl, yh, yl, zh) {
	  var r = (xh & yh) ^ (xh & zh) ^ (yh & zh);
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function maj64_lo(xh, xl, yh, yl, zh, zl) {
	  var r = (xl & yl) ^ (xl & zl) ^ (yl & zl);
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function s0_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi$1(xh, xl, 28);
	  var c1_hi = rotr64_hi$1(xl, xh, 2);  // 34
	  var c2_hi = rotr64_hi$1(xl, xh, 7);  // 39

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function s0_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo$1(xh, xl, 28);
	  var c1_lo = rotr64_lo$1(xl, xh, 2);  // 34
	  var c2_lo = rotr64_lo$1(xl, xh, 7);  // 39

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function s1_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi$1(xh, xl, 14);
	  var c1_hi = rotr64_hi$1(xh, xl, 18);
	  var c2_hi = rotr64_hi$1(xl, xh, 9);  // 41

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function s1_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo$1(xh, xl, 14);
	  var c1_lo = rotr64_lo$1(xh, xl, 18);
	  var c2_lo = rotr64_lo$1(xl, xh, 9);  // 41

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function g0_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi$1(xh, xl, 1);
	  var c1_hi = rotr64_hi$1(xh, xl, 8);
	  var c2_hi = shr64_hi$1(xh, xl, 7);

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function g0_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo$1(xh, xl, 1);
	  var c1_lo = rotr64_lo$1(xh, xl, 8);
	  var c2_lo = shr64_lo$1(xh, xl, 7);

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function g1_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi$1(xh, xl, 19);
	  var c1_hi = rotr64_hi$1(xl, xh, 29);  // 61
	  var c2_hi = shr64_hi$1(xh, xl, 6);

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function g1_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo$1(xh, xl, 19);
	  var c1_lo = rotr64_lo$1(xl, xh, 29);  // 61
	  var c2_lo = shr64_lo$1(xh, xl, 6);

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function SHA384() {
	  if (!(this instanceof SHA384))
	    return new SHA384();

	  _512.call(this);
	  this.h = [
	    0xcbbb9d5d, 0xc1059ed8,
	    0x629a292a, 0x367cd507,
	    0x9159015a, 0x3070dd17,
	    0x152fecd8, 0xf70e5939,
	    0x67332667, 0xffc00b31,
	    0x8eb44a87, 0x68581511,
	    0xdb0c2e0d, 0x64f98fa7,
	    0x47b5481d, 0xbefa4fa4 ];
	}
	utils$2.inherits(SHA384, _512);
	var _384 = SHA384;

	SHA384.blockSize = 1024;
	SHA384.outSize = 384;
	SHA384.hmacStrength = 192;
	SHA384.padLength = 128;

	SHA384.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils$2.toHex32(this.h.slice(0, 12), 'big');
	  else
	    return utils$2.split32(this.h.slice(0, 12), 'big');
	};

	var sha1$1 = _1;
	var sha224$1 = _224;
	var sha256$1 = _256;
	var sha384$1 = _384;
	var sha512$1 = _512;

	var sha = {
		sha1: sha1$1,
		sha224: sha224$1,
		sha256: sha256$1,
		sha384: sha384$1,
		sha512: sha512$1
	};

	var rotl32$2 = utils$2.rotl32;
	var sum32$3 = utils$2.sum32;
	var sum32_3$1 = utils$2.sum32_3;
	var sum32_4$2 = utils$2.sum32_4;
	var BlockHash$4 = common.BlockHash;

	function RIPEMD160() {
	  if (!(this instanceof RIPEMD160))
	    return new RIPEMD160();

	  BlockHash$4.call(this);

	  this.h = [ 0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0 ];
	  this.endian = 'little';
	}
	utils$2.inherits(RIPEMD160, BlockHash$4);
	var ripemd160$1 = RIPEMD160;

	RIPEMD160.blockSize = 512;
	RIPEMD160.outSize = 160;
	RIPEMD160.hmacStrength = 192;
	RIPEMD160.padLength = 64;

	RIPEMD160.prototype._update = function update(msg, start) {
	  var A = this.h[0];
	  var B = this.h[1];
	  var C = this.h[2];
	  var D = this.h[3];
	  var E = this.h[4];
	  var Ah = A;
	  var Bh = B;
	  var Ch = C;
	  var Dh = D;
	  var Eh = E;
	  for (var j = 0; j < 80; j++) {
	    var T = sum32$3(
	      rotl32$2(
	        sum32_4$2(A, f$1(j, B, C, D), msg[r$1[j] + start], K(j)),
	        s[j]),
	      E);
	    A = E;
	    E = D;
	    D = rotl32$2(C, 10);
	    C = B;
	    B = T;
	    T = sum32$3(
	      rotl32$2(
	        sum32_4$2(Ah, f$1(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)),
	        sh[j]),
	      Eh);
	    Ah = Eh;
	    Eh = Dh;
	    Dh = rotl32$2(Ch, 10);
	    Ch = Bh;
	    Bh = T;
	  }
	  T = sum32_3$1(this.h[1], C, Dh);
	  this.h[1] = sum32_3$1(this.h[2], D, Eh);
	  this.h[2] = sum32_3$1(this.h[3], E, Ah);
	  this.h[3] = sum32_3$1(this.h[4], A, Bh);
	  this.h[4] = sum32_3$1(this.h[0], B, Ch);
	  this.h[0] = T;
	};

	RIPEMD160.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils$2.toHex32(this.h, 'little');
	  else
	    return utils$2.split32(this.h, 'little');
	};

	function f$1(j, x, y, z) {
	  if (j <= 15)
	    return x ^ y ^ z;
	  else if (j <= 31)
	    return (x & y) | ((~x) & z);
	  else if (j <= 47)
	    return (x | (~y)) ^ z;
	  else if (j <= 63)
	    return (x & z) | (y & (~z));
	  else
	    return x ^ (y | (~z));
	}

	function K(j) {
	  if (j <= 15)
	    return 0x00000000;
	  else if (j <= 31)
	    return 0x5a827999;
	  else if (j <= 47)
	    return 0x6ed9eba1;
	  else if (j <= 63)
	    return 0x8f1bbcdc;
	  else
	    return 0xa953fd4e;
	}

	function Kh(j) {
	  if (j <= 15)
	    return 0x50a28be6;
	  else if (j <= 31)
	    return 0x5c4dd124;
	  else if (j <= 47)
	    return 0x6d703ef3;
	  else if (j <= 63)
	    return 0x7a6d76e9;
	  else
	    return 0x00000000;
	}

	var r$1 = [
	  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
	  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
	  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
	  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
	  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
	];

	var rh = [
	  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
	  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
	  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
	  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
	  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
	];

	var s = [
	  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
	  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
	  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
	  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
	  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
	];

	var sh = [
	  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
	  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
	  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
	  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
	  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
	];

	var ripemd = {
		ripemd160: ripemd160$1
	};

	function Hmac(hash, key, enc) {
	  if (!(this instanceof Hmac))
	    return new Hmac(hash, key, enc);
	  this.Hash = hash;
	  this.blockSize = hash.blockSize / 8;
	  this.outSize = hash.outSize / 8;
	  this.inner = null;
	  this.outer = null;

	  this._init(utils$2.toArray(key, enc));
	}
	var hmac$1 = Hmac;

	Hmac.prototype._init = function init(key) {
	  // Shorten key, if needed
	  if (key.length > this.blockSize)
	    key = new this.Hash().update(key).digest();
	  minimalisticAssert(key.length <= this.blockSize);

	  // Add padding to key
	  for (var i = key.length; i < this.blockSize; i++)
	    key.push(0);

	  for (i = 0; i < key.length; i++)
	    key[i] ^= 0x36;
	  this.inner = new this.Hash().update(key);

	  // 0x36 ^ 0x5c = 0x6a
	  for (i = 0; i < key.length; i++)
	    key[i] ^= 0x6a;
	  this.outer = new this.Hash().update(key);
	};

	Hmac.prototype.update = function update(msg, enc) {
	  this.inner.update(msg, enc);
	  return this;
	};

	Hmac.prototype.digest = function digest(enc) {
	  this.outer.update(this.inner.digest());
	  return this.outer.digest(enc);
	};

	var hash_1 = createCommonjsModule(function (module, exports) {
	var hash = exports;

	hash.utils = utils$2;
	hash.common = common;
	hash.sha = sha;
	hash.ripemd = ripemd;
	hash.hmac = hmac$1;

	// Proxy hash functions to the main object
	hash.sha1 = hash.sha.sha1;
	hash.sha256 = hash.sha.sha256;
	hash.sha224 = hash.sha.sha224;
	hash.sha384 = hash.sha.sha384;
	hash.sha512 = hash.sha.sha512;
	hash.ripemd160 = hash.ripemd.ripemd160;
	});

	var secp256k1 = {
	  doubles: {
	    step: 4,
	    points: [
	      [
	        'e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a',
	        'f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821'
	      ],
	      [
	        '8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508',
	        '11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf'
	      ],
	      [
	        '175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739',
	        'd3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695'
	      ],
	      [
	        '363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640',
	        '4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9'
	      ],
	      [
	        '8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c',
	        '4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36'
	      ],
	      [
	        '723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda',
	        '96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f'
	      ],
	      [
	        'eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa',
	        '5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999'
	      ],
	      [
	        '100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0',
	        'cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09'
	      ],
	      [
	        'e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d',
	        '9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d'
	      ],
	      [
	        'feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d',
	        'e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088'
	      ],
	      [
	        'da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1',
	        '9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d'
	      ],
	      [
	        '53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0',
	        '5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8'
	      ],
	      [
	        '8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047',
	        '10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a'
	      ],
	      [
	        '385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862',
	        '283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453'
	      ],
	      [
	        '6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7',
	        '7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160'
	      ],
	      [
	        '3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd',
	        '56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0'
	      ],
	      [
	        '85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83',
	        '7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6'
	      ],
	      [
	        '948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a',
	        '53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589'
	      ],
	      [
	        '6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8',
	        'bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17'
	      ],
	      [
	        'e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d',
	        '4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda'
	      ],
	      [
	        'e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725',
	        '7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd'
	      ],
	      [
	        '213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754',
	        '4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2'
	      ],
	      [
	        '4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c',
	        '17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6'
	      ],
	      [
	        'fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6',
	        '6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f'
	      ],
	      [
	        '76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39',
	        'c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01'
	      ],
	      [
	        'c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891',
	        '893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3'
	      ],
	      [
	        'd895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b',
	        'febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f'
	      ],
	      [
	        'b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03',
	        '2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7'
	      ],
	      [
	        'e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d',
	        'eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78'
	      ],
	      [
	        'a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070',
	        '7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1'
	      ],
	      [
	        '90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4',
	        'e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150'
	      ],
	      [
	        '8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da',
	        '662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82'
	      ],
	      [
	        'e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11',
	        '1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc'
	      ],
	      [
	        '8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e',
	        'efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b'
	      ],
	      [
	        'e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41',
	        '2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51'
	      ],
	      [
	        'b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef',
	        '67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45'
	      ],
	      [
	        'd68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8',
	        'db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120'
	      ],
	      [
	        '324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d',
	        '648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84'
	      ],
	      [
	        '4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96',
	        '35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d'
	      ],
	      [
	        '9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd',
	        'ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d'
	      ],
	      [
	        '6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5',
	        '9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8'
	      ],
	      [
	        'a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266',
	        '40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8'
	      ],
	      [
	        '7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71',
	        '34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac'
	      ],
	      [
	        '928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac',
	        'c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f'
	      ],
	      [
	        '85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751',
	        '1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962'
	      ],
	      [
	        'ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e',
	        '493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907'
	      ],
	      [
	        '827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241',
	        'c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec'
	      ],
	      [
	        'eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3',
	        'be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d'
	      ],
	      [
	        'e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f',
	        '4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414'
	      ],
	      [
	        '1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19',
	        'aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd'
	      ],
	      [
	        '146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be',
	        'b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0'
	      ],
	      [
	        'fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9',
	        '6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811'
	      ],
	      [
	        'da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2',
	        '8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1'
	      ],
	      [
	        'a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13',
	        '7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c'
	      ],
	      [
	        '174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c',
	        'ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73'
	      ],
	      [
	        '959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba',
	        '2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd'
	      ],
	      [
	        'd2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151',
	        'e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405'
	      ],
	      [
	        '64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073',
	        'd99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589'
	      ],
	      [
	        '8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458',
	        '38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e'
	      ],
	      [
	        '13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b',
	        '69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27'
	      ],
	      [
	        'bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366',
	        'd3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1'
	      ],
	      [
	        '8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa',
	        '40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482'
	      ],
	      [
	        '8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0',
	        '620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945'
	      ],
	      [
	        'dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787',
	        '7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573'
	      ],
	      [
	        'f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e',
	        'ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82'
	      ]
	    ]
	  },
	  naf: {
	    wnd: 7,
	    points: [
	      [
	        'f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9',
	        '388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672'
	      ],
	      [
	        '2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4',
	        'd8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6'
	      ],
	      [
	        '5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc',
	        '6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da'
	      ],
	      [
	        'acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe',
	        'cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37'
	      ],
	      [
	        '774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb',
	        'd984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b'
	      ],
	      [
	        'f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8',
	        'ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81'
	      ],
	      [
	        'd7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e',
	        '581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58'
	      ],
	      [
	        'defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34',
	        '4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77'
	      ],
	      [
	        '2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c',
	        '85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a'
	      ],
	      [
	        '352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5',
	        '321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c'
	      ],
	      [
	        '2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f',
	        '2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67'
	      ],
	      [
	        '9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714',
	        '73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402'
	      ],
	      [
	        'daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729',
	        'a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55'
	      ],
	      [
	        'c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db',
	        '2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482'
	      ],
	      [
	        '6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4',
	        'e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82'
	      ],
	      [
	        '1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5',
	        'b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396'
	      ],
	      [
	        '605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479',
	        '2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49'
	      ],
	      [
	        '62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d',
	        '80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf'
	      ],
	      [
	        '80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f',
	        '1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a'
	      ],
	      [
	        '7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb',
	        'd0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7'
	      ],
	      [
	        'd528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9',
	        'eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933'
	      ],
	      [
	        '49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963',
	        '758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a'
	      ],
	      [
	        '77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74',
	        '958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6'
	      ],
	      [
	        'f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530',
	        'e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37'
	      ],
	      [
	        '463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b',
	        '5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e'
	      ],
	      [
	        'f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247',
	        'cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6'
	      ],
	      [
	        'caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1',
	        'cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476'
	      ],
	      [
	        '2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120',
	        '4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40'
	      ],
	      [
	        '7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435',
	        '91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61'
	      ],
	      [
	        '754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18',
	        '673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683'
	      ],
	      [
	        'e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8',
	        '59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5'
	      ],
	      [
	        '186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb',
	        '3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b'
	      ],
	      [
	        'df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f',
	        '55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417'
	      ],
	      [
	        '5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143',
	        'efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868'
	      ],
	      [
	        '290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba',
	        'e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a'
	      ],
	      [
	        'af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45',
	        'f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6'
	      ],
	      [
	        '766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a',
	        '744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996'
	      ],
	      [
	        '59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e',
	        'c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e'
	      ],
	      [
	        'f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8',
	        'e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d'
	      ],
	      [
	        '7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c',
	        '30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2'
	      ],
	      [
	        '948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519',
	        'e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e'
	      ],
	      [
	        '7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab',
	        '100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437'
	      ],
	      [
	        '3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca',
	        'ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311'
	      ],
	      [
	        'd3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf',
	        '8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4'
	      ],
	      [
	        '1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610',
	        '68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575'
	      ],
	      [
	        '733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4',
	        'f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d'
	      ],
	      [
	        '15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c',
	        'd56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d'
	      ],
	      [
	        'a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940',
	        'edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629'
	      ],
	      [
	        'e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980',
	        'a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06'
	      ],
	      [
	        '311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3',
	        '66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374'
	      ],
	      [
	        '34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf',
	        '9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee'
	      ],
	      [
	        'f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63',
	        '4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1'
	      ],
	      [
	        'd7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448',
	        'fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b'
	      ],
	      [
	        '32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf',
	        '5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661'
	      ],
	      [
	        '7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5',
	        '8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6'
	      ],
	      [
	        'ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6',
	        '8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e'
	      ],
	      [
	        '16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5',
	        '5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d'
	      ],
	      [
	        'eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99',
	        'f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc'
	      ],
	      [
	        '78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51',
	        'f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4'
	      ],
	      [
	        '494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5',
	        '42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c'
	      ],
	      [
	        'a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5',
	        '204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b'
	      ],
	      [
	        'c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997',
	        '4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913'
	      ],
	      [
	        '841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881',
	        '73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154'
	      ],
	      [
	        '5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5',
	        '39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865'
	      ],
	      [
	        '36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66',
	        'd2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc'
	      ],
	      [
	        '336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726',
	        'ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224'
	      ],
	      [
	        '8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede',
	        '6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e'
	      ],
	      [
	        '1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94',
	        '60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6'
	      ],
	      [
	        '85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31',
	        '3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511'
	      ],
	      [
	        '29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51',
	        'b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b'
	      ],
	      [
	        'a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252',
	        'ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2'
	      ],
	      [
	        '4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5',
	        'cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c'
	      ],
	      [
	        'd24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b',
	        '6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3'
	      ],
	      [
	        'ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4',
	        '322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d'
	      ],
	      [
	        'af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f',
	        '6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700'
	      ],
	      [
	        'e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889',
	        '2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4'
	      ],
	      [
	        '591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246',
	        'b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196'
	      ],
	      [
	        '11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984',
	        '998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4'
	      ],
	      [
	        '3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a',
	        'b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257'
	      ],
	      [
	        'cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030',
	        'bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13'
	      ],
	      [
	        'c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197',
	        '6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096'
	      ],
	      [
	        'c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593',
	        'c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38'
	      ],
	      [
	        'a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef',
	        '21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f'
	      ],
	      [
	        '347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38',
	        '60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448'
	      ],
	      [
	        'da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a',
	        '49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a'
	      ],
	      [
	        'c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111',
	        '5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4'
	      ],
	      [
	        '4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502',
	        '7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437'
	      ],
	      [
	        '3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea',
	        'be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7'
	      ],
	      [
	        'cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26',
	        '8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d'
	      ],
	      [
	        'b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986',
	        '39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a'
	      ],
	      [
	        'd4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e',
	        '62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54'
	      ],
	      [
	        '48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4',
	        '25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77'
	      ],
	      [
	        'dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda',
	        'ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517'
	      ],
	      [
	        '6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859',
	        'cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10'
	      ],
	      [
	        'e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f',
	        'f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125'
	      ],
	      [
	        'eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c',
	        '6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e'
	      ],
	      [
	        '13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942',
	        'fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1'
	      ],
	      [
	        'ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a',
	        '1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2'
	      ],
	      [
	        'b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80',
	        '5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423'
	      ],
	      [
	        'ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d',
	        '438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8'
	      ],
	      [
	        '8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1',
	        'cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758'
	      ],
	      [
	        '52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63',
	        'c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375'
	      ],
	      [
	        'e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352',
	        '6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d'
	      ],
	      [
	        '7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193',
	        'ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec'
	      ],
	      [
	        '5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00',
	        '9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0'
	      ],
	      [
	        '32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58',
	        'ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c'
	      ],
	      [
	        'e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7',
	        'd3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4'
	      ],
	      [
	        '8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8',
	        'c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f'
	      ],
	      [
	        '4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e',
	        '67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649'
	      ],
	      [
	        '3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d',
	        'cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826'
	      ],
	      [
	        '674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b',
	        '299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5'
	      ],
	      [
	        'd32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f',
	        'f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87'
	      ],
	      [
	        '30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6',
	        '462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b'
	      ],
	      [
	        'be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297',
	        '62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc'
	      ],
	      [
	        '93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a',
	        '7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c'
	      ],
	      [
	        'b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c',
	        'ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f'
	      ],
	      [
	        'd5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52',
	        '4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a'
	      ],
	      [
	        'd3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb',
	        'bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46'
	      ],
	      [
	        '463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065',
	        'bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f'
	      ],
	      [
	        '7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917',
	        '603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03'
	      ],
	      [
	        '74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9',
	        'cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08'
	      ],
	      [
	        '30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3',
	        '553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8'
	      ],
	      [
	        '9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57',
	        '712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373'
	      ],
	      [
	        '176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66',
	        'ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3'
	      ],
	      [
	        '75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8',
	        '9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8'
	      ],
	      [
	        '809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721',
	        '9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1'
	      ],
	      [
	        '1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180',
	        '4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9'
	      ]
	    ]
	  }
	};

	var curves_1 = createCommonjsModule(function (module, exports) {

	var curves = exports;




	var assert = elliptic_1.utils.assert;

	function PresetCurve(options) {
	  if (options.type === 'short')
	    this.curve = new elliptic_1.curve.short(options);
	  else if (options.type === 'edwards')
	    this.curve = new elliptic_1.curve.edwards(options);
	  else
	    this.curve = new elliptic_1.curve.mont(options);
	  this.g = this.curve.g;
	  this.n = this.curve.n;
	  this.hash = options.hash;

	  assert(this.g.validate(), 'Invalid curve');
	  assert(this.g.mul(this.n).isInfinity(), 'Invalid curve, G*N != O');
	}
	curves.PresetCurve = PresetCurve;

	function defineCurve(name, options) {
	  Object.defineProperty(curves, name, {
	    configurable: true,
	    enumerable: true,
	    get: function() {
	      var curve = new PresetCurve(options);
	      Object.defineProperty(curves, name, {
	        configurable: true,
	        enumerable: true,
	        value: curve
	      });
	      return curve;
	    }
	  });
	}

	defineCurve('p192', {
	  type: 'short',
	  prime: 'p192',
	  p: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff',
	  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc',
	  b: '64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1',
	  n: 'ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831',
	  hash: hash_1.sha256,
	  gRed: false,
	  g: [
	    '188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012',
	    '07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811'
	  ]
	});

	defineCurve('p224', {
	  type: 'short',
	  prime: 'p224',
	  p: 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001',
	  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe',
	  b: 'b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4',
	  n: 'ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d',
	  hash: hash_1.sha256,
	  gRed: false,
	  g: [
	    'b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21',
	    'bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34'
	  ]
	});

	defineCurve('p256', {
	  type: 'short',
	  prime: null,
	  p: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff',
	  a: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc',
	  b: '5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b',
	  n: 'ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551',
	  hash: hash_1.sha256,
	  gRed: false,
	  g: [
	    '6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296',
	    '4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5'
	  ]
	});

	defineCurve('p384', {
	  type: 'short',
	  prime: null,
	  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'fffffffe ffffffff 00000000 00000000 ffffffff',
	  a: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'fffffffe ffffffff 00000000 00000000 fffffffc',
	  b: 'b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f ' +
	     '5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef',
	  n: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 ' +
	     'f4372ddf 581a0db2 48b0a77a ecec196a ccc52973',
	  hash: hash_1.sha384,
	  gRed: false,
	  g: [
	    'aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 ' +
	    '5502f25d bf55296c 3a545e38 72760ab7',
	    '3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 ' +
	    '0a60b1ce 1d7e819d 7a431d7c 90ea0e5f'
	  ]
	});

	defineCurve('p521', {
	  type: 'short',
	  prime: null,
	  p: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'ffffffff ffffffff ffffffff ffffffff ffffffff',
	  a: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'ffffffff ffffffff ffffffff ffffffff fffffffc',
	  b: '00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b ' +
	     '99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd ' +
	     '3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00',
	  n: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 ' +
	     'f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409',
	  hash: hash_1.sha512,
	  gRed: false,
	  g: [
	    '000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 ' +
	    '053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 ' +
	    'a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66',
	    '00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 ' +
	    '579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 ' +
	    '3fad0761 353c7086 a272c240 88be9476 9fd16650'
	  ]
	});

	defineCurve('curve25519', {
	  type: 'mont',
	  prime: 'p25519',
	  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
	  a: '76d06',
	  b: '1',
	  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
	  hash: hash_1.sha256,
	  gRed: false,
	  g: [
	    '9'
	  ]
	});

	defineCurve('ed25519', {
	  type: 'edwards',
	  prime: 'p25519',
	  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
	  a: '-1',
	  c: '1',
	  // -121665 * (121666^(-1)) (mod P)
	  d: '52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3',
	  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
	  hash: hash_1.sha256,
	  gRed: false,
	  g: [
	    '216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a',

	    // 4/5
	    '6666666666666666666666666666666666666666666666666666666666666658'
	  ]
	});

	var pre;
	try {
	  pre = secp256k1;
	} catch (e) {
	  pre = undefined;
	}

	defineCurve('secp256k1', {
	  type: 'short',
	  prime: 'k256',
	  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f',
	  a: '0',
	  b: '7',
	  n: 'ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141',
	  h: '1',
	  hash: hash_1.sha256,

	  // Precomputed endomorphism
	  beta: '7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee',
	  lambda: '5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72',
	  basis: [
	    {
	      a: '3086d221a7d46bcde86c90e49284eb15',
	      b: '-e4437ed6010e88286f547fa90abfe4c3'
	    },
	    {
	      a: '114ca50f7a8e2f3f657c1108d9d44cfd8',
	      b: '3086d221a7d46bcde86c90e49284eb15'
	    }
	  ],

	  gRed: false,
	  g: [
	    '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
	    '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8',
	    pre
	  ]
	});
	});

	function HmacDRBG(options) {
	  if (!(this instanceof HmacDRBG))
	    return new HmacDRBG(options);
	  this.hash = options.hash;
	  this.predResist = !!options.predResist;

	  this.outLen = this.hash.outSize;
	  this.minEntropy = options.minEntropy || this.hash.hmacStrength;

	  this._reseed = null;
	  this.reseedInterval = null;
	  this.K = null;
	  this.V = null;

	  var entropy = utils_1.toArray(options.entropy, options.entropyEnc || 'hex');
	  var nonce = utils_1.toArray(options.nonce, options.nonceEnc || 'hex');
	  var pers = utils_1.toArray(options.pers, options.persEnc || 'hex');
	  minimalisticAssert(entropy.length >= (this.minEntropy / 8),
	         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');
	  this._init(entropy, nonce, pers);
	}
	var hmacDrbg = HmacDRBG;

	HmacDRBG.prototype._init = function init(entropy, nonce, pers) {
	  var seed = entropy.concat(nonce).concat(pers);

	  this.K = new Array(this.outLen / 8);
	  this.V = new Array(this.outLen / 8);
	  for (var i = 0; i < this.V.length; i++) {
	    this.K[i] = 0x00;
	    this.V[i] = 0x01;
	  }

	  this._update(seed);
	  this._reseed = 1;
	  this.reseedInterval = 0x1000000000000;  // 2^48
	};

	HmacDRBG.prototype._hmac = function hmac() {
	  return new hash_1.hmac(this.hash, this.K);
	};

	HmacDRBG.prototype._update = function update(seed) {
	  var kmac = this._hmac()
	                 .update(this.V)
	                 .update([ 0x00 ]);
	  if (seed)
	    kmac = kmac.update(seed);
	  this.K = kmac.digest();
	  this.V = this._hmac().update(this.V).digest();
	  if (!seed)
	    return;

	  this.K = this._hmac()
	               .update(this.V)
	               .update([ 0x01 ])
	               .update(seed)
	               .digest();
	  this.V = this._hmac().update(this.V).digest();
	};

	HmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add, addEnc) {
	  // Optional entropy enc
	  if (typeof entropyEnc !== 'string') {
	    addEnc = add;
	    add = entropyEnc;
	    entropyEnc = null;
	  }

	  entropy = utils_1.toArray(entropy, entropyEnc);
	  add = utils_1.toArray(add, addEnc);

	  minimalisticAssert(entropy.length >= (this.minEntropy / 8),
	         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');

	  this._update(entropy.concat(add || []));
	  this._reseed = 1;
	};

	HmacDRBG.prototype.generate = function generate(len, enc, add, addEnc) {
	  if (this._reseed > this.reseedInterval)
	    throw new Error('Reseed is required');

	  // Optional encoding
	  if (typeof enc !== 'string') {
	    addEnc = add;
	    add = enc;
	    enc = null;
	  }

	  // Optional additional data
	  if (add) {
	    add = utils_1.toArray(add, addEnc || 'hex');
	    this._update(add);
	  }

	  var temp = [];
	  while (temp.length < len) {
	    this.V = this._hmac().update(this.V).digest();
	    temp = temp.concat(this.V);
	  }

	  var res = temp.slice(0, len);
	  this._update(add);
	  this._reseed++;
	  return utils_1.encode(res, enc);
	};

	var utils$3 = elliptic_1.utils;
	var assert$4 = utils$3.assert;

	function KeyPair(ec, options) {
	  this.ec = ec;
	  this.priv = null;
	  this.pub = null;

	  // KeyPair(ec, { priv: ..., pub: ... })
	  if (options.priv)
	    this._importPrivate(options.priv, options.privEnc);
	  if (options.pub)
	    this._importPublic(options.pub, options.pubEnc);
	}
	var key = KeyPair;

	KeyPair.fromPublic = function fromPublic(ec, pub, enc) {
	  if (pub instanceof KeyPair)
	    return pub;

	  return new KeyPair(ec, {
	    pub: pub,
	    pubEnc: enc
	  });
	};

	KeyPair.fromPrivate = function fromPrivate(ec, priv, enc) {
	  if (priv instanceof KeyPair)
	    return priv;

	  return new KeyPair(ec, {
	    priv: priv,
	    privEnc: enc
	  });
	};

	KeyPair.prototype.validate = function validate() {
	  var pub = this.getPublic();

	  if (pub.isInfinity())
	    return { result: false, reason: 'Invalid public key' };
	  if (!pub.validate())
	    return { result: false, reason: 'Public key is not a point' };
	  if (!pub.mul(this.ec.curve.n).isInfinity())
	    return { result: false, reason: 'Public key * N != O' };

	  return { result: true, reason: null };
	};

	KeyPair.prototype.getPublic = function getPublic(compact, enc) {
	  // compact is optional argument
	  if (typeof compact === 'string') {
	    enc = compact;
	    compact = null;
	  }

	  if (!this.pub)
	    this.pub = this.ec.g.mul(this.priv);

	  if (!enc)
	    return this.pub;

	  return this.pub.encode(enc, compact);
	};

	KeyPair.prototype.getPrivate = function getPrivate(enc) {
	  if (enc === 'hex')
	    return this.priv.toString(16, 2);
	  else
	    return this.priv;
	};

	KeyPair.prototype._importPrivate = function _importPrivate(key, enc) {
	  this.priv = new bn(key, enc || 16);

	  // Ensure that the priv won't be bigger than n, otherwise we may fail
	  // in fixed multiplication method
	  this.priv = this.priv.umod(this.ec.curve.n);
	};

	KeyPair.prototype._importPublic = function _importPublic(key, enc) {
	  if (key.x || key.y) {
	    // Montgomery points only have an `x` coordinate.
	    // Weierstrass/Edwards points on the other hand have both `x` and
	    // `y` coordinates.
	    if (this.ec.curve.type === 'mont') {
	      assert$4(key.x, 'Need x coordinate');
	    } else if (this.ec.curve.type === 'short' ||
	               this.ec.curve.type === 'edwards') {
	      assert$4(key.x && key.y, 'Need both x and y coordinate');
	    }
	    this.pub = this.ec.curve.point(key.x, key.y);
	    return;
	  }
	  this.pub = this.ec.curve.decodePoint(key, enc);
	};

	// ECDH
	KeyPair.prototype.derive = function derive(pub) {
	  return pub.mul(this.priv).getX();
	};

	// ECDSA
	KeyPair.prototype.sign = function sign(msg, enc, options) {
	  return this.ec.sign(msg, this, enc, options);
	};

	KeyPair.prototype.verify = function verify(msg, signature) {
	  return this.ec.verify(msg, signature, this);
	};

	KeyPair.prototype.inspect = function inspect() {
	  return '<Key priv: ' + (this.priv && this.priv.toString(16, 2)) +
	         ' pub: ' + (this.pub && this.pub.inspect()) + ' >';
	};

	var utils$4 = elliptic_1.utils;
	var assert$5 = utils$4.assert;

	function Signature(options, enc) {
	  if (options instanceof Signature)
	    return options;

	  if (this._importDER(options, enc))
	    return;

	  assert$5(options.r && options.s, 'Signature without r or s');
	  this.r = new bn(options.r, 16);
	  this.s = new bn(options.s, 16);
	  if (options.recoveryParam === undefined)
	    this.recoveryParam = null;
	  else
	    this.recoveryParam = options.recoveryParam;
	}
	var signature = Signature;

	function Position() {
	  this.place = 0;
	}

	function getLength(buf, p) {
	  var initial = buf[p.place++];
	  if (!(initial & 0x80)) {
	    return initial;
	  }
	  var octetLen = initial & 0xf;
	  var val = 0;
	  for (var i = 0, off = p.place; i < octetLen; i++, off++) {
	    val <<= 8;
	    val |= buf[off];
	  }
	  p.place = off;
	  return val;
	}

	function rmPadding(buf) {
	  var i = 0;
	  var len = buf.length - 1;
	  while (!buf[i] && !(buf[i + 1] & 0x80) && i < len) {
	    i++;
	  }
	  if (i === 0) {
	    return buf;
	  }
	  return buf.slice(i);
	}

	Signature.prototype._importDER = function _importDER(data, enc) {
	  data = utils$4.toArray(data, enc);
	  var p = new Position();
	  if (data[p.place++] !== 0x30) {
	    return false;
	  }
	  var len = getLength(data, p);
	  if ((len + p.place) !== data.length) {
	    return false;
	  }
	  if (data[p.place++] !== 0x02) {
	    return false;
	  }
	  var rlen = getLength(data, p);
	  var r = data.slice(p.place, rlen + p.place);
	  p.place += rlen;
	  if (data[p.place++] !== 0x02) {
	    return false;
	  }
	  var slen = getLength(data, p);
	  if (data.length !== slen + p.place) {
	    return false;
	  }
	  var s = data.slice(p.place, slen + p.place);
	  if (r[0] === 0 && (r[1] & 0x80)) {
	    r = r.slice(1);
	  }
	  if (s[0] === 0 && (s[1] & 0x80)) {
	    s = s.slice(1);
	  }

	  this.r = new bn(r);
	  this.s = new bn(s);
	  this.recoveryParam = null;

	  return true;
	};

	function constructLength(arr, len) {
	  if (len < 0x80) {
	    arr.push(len);
	    return;
	  }
	  var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
	  arr.push(octets | 0x80);
	  while (--octets) {
	    arr.push((len >>> (octets << 3)) & 0xff);
	  }
	  arr.push(len);
	}

	Signature.prototype.toDER = function toDER(enc) {
	  var r = this.r.toArray();
	  var s = this.s.toArray();

	  // Pad values
	  if (r[0] & 0x80)
	    r = [ 0 ].concat(r);
	  // Pad values
	  if (s[0] & 0x80)
	    s = [ 0 ].concat(s);

	  r = rmPadding(r);
	  s = rmPadding(s);

	  while (!s[0] && !(s[1] & 0x80)) {
	    s = s.slice(1);
	  }
	  var arr = [ 0x02 ];
	  constructLength(arr, r.length);
	  arr = arr.concat(r);
	  arr.push(0x02);
	  constructLength(arr, s.length);
	  var backHalf = arr.concat(s);
	  var res = [ 0x30 ];
	  constructLength(res, backHalf.length);
	  res = res.concat(backHalf);
	  return utils$4.encode(res, enc);
	};

	var utils$5 = elliptic_1.utils;
	var assert$6 = utils$5.assert;




	function EC(options) {
	  if (!(this instanceof EC))
	    return new EC(options);

	  // Shortcut `elliptic.ec(curve-name)`
	  if (typeof options === 'string') {
	    assert$6(elliptic_1.curves.hasOwnProperty(options), 'Unknown curve ' + options);

	    options = elliptic_1.curves[options];
	  }

	  // Shortcut for `elliptic.ec(elliptic.curves.curveName)`
	  if (options instanceof elliptic_1.curves.PresetCurve)
	    options = { curve: options };

	  this.curve = options.curve.curve;
	  this.n = this.curve.n;
	  this.nh = this.n.ushrn(1);
	  this.g = this.curve.g;

	  // Point on curve
	  this.g = options.curve.g;
	  this.g.precompute(options.curve.n.bitLength() + 1);

	  // Hash for function for DRBG
	  this.hash = options.hash || options.curve.hash;
	}
	var ec = EC;

	EC.prototype.keyPair = function keyPair(options) {
	  return new key(this, options);
	};

	EC.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
	  return key.fromPrivate(this, priv, enc);
	};

	EC.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
	  return key.fromPublic(this, pub, enc);
	};

	EC.prototype.genKeyPair = function genKeyPair(options) {
	  if (!options)
	    options = {};

	  // Instantiate Hmac_DRBG
	  var drbg = new hmacDrbg({
	    hash: this.hash,
	    pers: options.pers,
	    persEnc: options.persEnc || 'utf8',
	    entropy: options.entropy || elliptic_1.rand(this.hash.hmacStrength),
	    entropyEnc: options.entropy && options.entropyEnc || 'utf8',
	    nonce: this.n.toArray()
	  });

	  var bytes = this.n.byteLength();
	  var ns2 = this.n.sub(new bn(2));
	  do {
	    var priv = new bn(drbg.generate(bytes));
	    if (priv.cmp(ns2) > 0)
	      continue;

	    priv.iaddn(1);
	    return this.keyFromPrivate(priv);
	  } while (true);
	};

	EC.prototype._truncateToN = function truncateToN(msg, truncOnly) {
	  var delta = msg.byteLength() * 8 - this.n.bitLength();
	  if (delta > 0)
	    msg = msg.ushrn(delta);
	  if (!truncOnly && msg.cmp(this.n) >= 0)
	    return msg.sub(this.n);
	  else
	    return msg;
	};

	EC.prototype.sign = function sign(msg, key$$1, enc, options) {
	  if (typeof enc === 'object') {
	    options = enc;
	    enc = null;
	  }
	  if (!options)
	    options = {};

	  key$$1 = this.keyFromPrivate(key$$1, enc);
	  msg = this._truncateToN(new bn(msg, 16));

	  // Zero-extend key to provide enough entropy
	  var bytes = this.n.byteLength();
	  var bkey = key$$1.getPrivate().toArray('be', bytes);

	  // Zero-extend nonce to have the same byte size as N
	  var nonce = msg.toArray('be', bytes);

	  // Instantiate Hmac_DRBG
	  var drbg = new hmacDrbg({
	    hash: this.hash,
	    entropy: bkey,
	    nonce: nonce,
	    pers: options.pers,
	    persEnc: options.persEnc || 'utf8'
	  });

	  // Number of bytes to generate
	  var ns1 = this.n.sub(new bn(1));

	  for (var iter = 0; true; iter++) {
	    var k = options.k ?
	        options.k(iter) :
	        new bn(drbg.generate(this.n.byteLength()));
	    k = this._truncateToN(k, true);
	    if (k.cmpn(1) <= 0 || k.cmp(ns1) >= 0)
	      continue;

	    var kp = this.g.mul(k);
	    if (kp.isInfinity())
	      continue;

	    var kpX = kp.getX();
	    var r = kpX.umod(this.n);
	    if (r.cmpn(0) === 0)
	      continue;

	    var s = k.invm(this.n).mul(r.mul(key$$1.getPrivate()).iadd(msg));
	    s = s.umod(this.n);
	    if (s.cmpn(0) === 0)
	      continue;

	    var recoveryParam = (kp.getY().isOdd() ? 1 : 0) |
	                        (kpX.cmp(r) !== 0 ? 2 : 0);

	    // Use complement of `s`, if it is > `n / 2`
	    if (options.canonical && s.cmp(this.nh) > 0) {
	      s = this.n.sub(s);
	      recoveryParam ^= 1;
	    }

	    return new signature({ r: r, s: s, recoveryParam: recoveryParam });
	  }
	};

	EC.prototype.verify = function verify(msg, signature$$1, key$$1, enc) {
	  msg = this._truncateToN(new bn(msg, 16));
	  key$$1 = this.keyFromPublic(key$$1, enc);
	  signature$$1 = new signature(signature$$1, 'hex');

	  // Perform primitive values validation
	  var r = signature$$1.r;
	  var s = signature$$1.s;
	  if (r.cmpn(1) < 0 || r.cmp(this.n) >= 0)
	    return false;
	  if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0)
	    return false;

	  // Validate signature
	  var sinv = s.invm(this.n);
	  var u1 = sinv.mul(msg).umod(this.n);
	  var u2 = sinv.mul(r).umod(this.n);

	  if (!this.curve._maxwellTrick) {
	    var p = this.g.mulAdd(u1, key$$1.getPublic(), u2);
	    if (p.isInfinity())
	      return false;

	    return p.getX().umod(this.n).cmp(r) === 0;
	  }

	  // NOTE: Greg Maxwell's trick, inspired by:
	  // https://git.io/vad3K

	  var p = this.g.jmulAdd(u1, key$$1.getPublic(), u2);
	  if (p.isInfinity())
	    return false;

	  // Compare `p.x` of Jacobian point with `r`,
	  // this will do `p.x == r * p.z^2` instead of multiplying `p.x` by the
	  // inverse of `p.z^2`
	  return p.eqXToP(r);
	};

	EC.prototype.recoverPubKey = function(msg, signature$$1, j, enc) {
	  assert$6((3 & j) === j, 'The recovery param is more than two bits');
	  signature$$1 = new signature(signature$$1, enc);

	  var n = this.n;
	  var e = new bn(msg);
	  var r = signature$$1.r;
	  var s = signature$$1.s;

	  // A set LSB signifies that the y-coordinate is odd
	  var isYOdd = j & 1;
	  var isSecondKey = j >> 1;
	  if (r.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
	    throw new Error('Unable to find sencond key candinate');

	  // 1.1. Let x = r + jn.
	  if (isSecondKey)
	    r = this.curve.pointFromX(r.add(this.curve.n), isYOdd);
	  else
	    r = this.curve.pointFromX(r, isYOdd);

	  var rInv = signature$$1.r.invm(n);
	  var s1 = n.sub(e).mul(rInv).umod(n);
	  var s2 = s.mul(rInv).umod(n);

	  // 1.6.1 Compute Q = r^-1 (sR -  eG)
	  //               Q = r^-1 (sR + -eG)
	  return this.g.mulAdd(s1, r, s2);
	};

	EC.prototype.getKeyRecoveryParam = function(e, signature$$1, Q, enc) {
	  signature$$1 = new signature(signature$$1, enc);
	  if (signature$$1.recoveryParam !== null)
	    return signature$$1.recoveryParam;

	  for (var i = 0; i < 4; i++) {
	    var Qprime;
	    try {
	      Qprime = this.recoverPubKey(e, signature$$1, i);
	    } catch (e) {
	      continue;
	    }

	    if (Qprime.eq(Q))
	      return i;
	  }
	  throw new Error('Unable to find valid recovery factor');
	};

	var utils$6 = elliptic_1.utils;
	var assert$7 = utils$6.assert;
	var parseBytes = utils$6.parseBytes;
	var cachedProperty = utils$6.cachedProperty;

	/**
	* @param {EDDSA} eddsa - instance
	* @param {Object} params - public/private key parameters
	*
	* @param {Array<Byte>} [params.secret] - secret seed bytes
	* @param {Point} [params.pub] - public key point (aka `A` in eddsa terms)
	* @param {Array<Byte>} [params.pub] - public key point encoded as bytes
	*
	*/
	function KeyPair$1(eddsa, params) {
	  this.eddsa = eddsa;
	  this._secret = parseBytes(params.secret);
	  if (eddsa.isPoint(params.pub))
	    this._pub = params.pub;
	  else
	    this._pubBytes = parseBytes(params.pub);
	}

	KeyPair$1.fromPublic = function fromPublic(eddsa, pub) {
	  if (pub instanceof KeyPair$1)
	    return pub;
	  return new KeyPair$1(eddsa, { pub: pub });
	};

	KeyPair$1.fromSecret = function fromSecret(eddsa, secret) {
	  if (secret instanceof KeyPair$1)
	    return secret;
	  return new KeyPair$1(eddsa, { secret: secret });
	};

	KeyPair$1.prototype.secret = function secret() {
	  return this._secret;
	};

	cachedProperty(KeyPair$1, 'pubBytes', function pubBytes() {
	  return this.eddsa.encodePoint(this.pub());
	});

	cachedProperty(KeyPair$1, 'pub', function pub() {
	  if (this._pubBytes)
	    return this.eddsa.decodePoint(this._pubBytes);
	  return this.eddsa.g.mul(this.priv());
	});

	cachedProperty(KeyPair$1, 'privBytes', function privBytes() {
	  var eddsa = this.eddsa;
	  var hash = this.hash();
	  var lastIx = eddsa.encodingLength - 1;

	  var a = hash.slice(0, eddsa.encodingLength);
	  a[0] &= 248;
	  a[lastIx] &= 127;
	  a[lastIx] |= 64;

	  return a;
	});

	cachedProperty(KeyPair$1, 'priv', function priv() {
	  return this.eddsa.decodeInt(this.privBytes());
	});

	cachedProperty(KeyPair$1, 'hash', function hash() {
	  return this.eddsa.hash().update(this.secret()).digest();
	});

	cachedProperty(KeyPair$1, 'messagePrefix', function messagePrefix() {
	  return this.hash().slice(this.eddsa.encodingLength);
	});

	KeyPair$1.prototype.sign = function sign(message) {
	  assert$7(this._secret, 'KeyPair can only verify');
	  return this.eddsa.sign(message, this);
	};

	KeyPair$1.prototype.verify = function verify(message, sig) {
	  return this.eddsa.verify(message, sig, this);
	};

	KeyPair$1.prototype.getSecret = function getSecret(enc) {
	  assert$7(this._secret, 'KeyPair is public only');
	  return utils$6.encode(this.secret(), enc);
	};

	KeyPair$1.prototype.getPublic = function getPublic(enc) {
	  return utils$6.encode(this.pubBytes(), enc);
	};

	var key$1 = KeyPair$1;

	var utils$7 = elliptic_1.utils;
	var assert$8 = utils$7.assert;
	var cachedProperty$1 = utils$7.cachedProperty;
	var parseBytes$1 = utils$7.parseBytes;

	/**
	* @param {EDDSA} eddsa - eddsa instance
	* @param {Array<Bytes>|Object} sig -
	* @param {Array<Bytes>|Point} [sig.R] - R point as Point or bytes
	* @param {Array<Bytes>|bn} [sig.S] - S scalar as bn or bytes
	* @param {Array<Bytes>} [sig.Rencoded] - R point encoded
	* @param {Array<Bytes>} [sig.Sencoded] - S scalar encoded
	*/
	function Signature$1(eddsa, sig) {
	  this.eddsa = eddsa;

	  if (typeof sig !== 'object')
	    sig = parseBytes$1(sig);

	  if (Array.isArray(sig)) {
	    sig = {
	      R: sig.slice(0, eddsa.encodingLength),
	      S: sig.slice(eddsa.encodingLength)
	    };
	  }

	  assert$8(sig.R && sig.S, 'Signature without R or S');

	  if (eddsa.isPoint(sig.R))
	    this._R = sig.R;
	  if (sig.S instanceof bn)
	    this._S = sig.S;

	  this._Rencoded = Array.isArray(sig.R) ? sig.R : sig.Rencoded;
	  this._Sencoded = Array.isArray(sig.S) ? sig.S : sig.Sencoded;
	}

	cachedProperty$1(Signature$1, 'S', function S() {
	  return this.eddsa.decodeInt(this.Sencoded());
	});

	cachedProperty$1(Signature$1, 'R', function R() {
	  return this.eddsa.decodePoint(this.Rencoded());
	});

	cachedProperty$1(Signature$1, 'Rencoded', function Rencoded() {
	  return this.eddsa.encodePoint(this.R());
	});

	cachedProperty$1(Signature$1, 'Sencoded', function Sencoded() {
	  return this.eddsa.encodeInt(this.S());
	});

	Signature$1.prototype.toBytes = function toBytes() {
	  return this.Rencoded().concat(this.Sencoded());
	};

	Signature$1.prototype.toHex = function toHex() {
	  return utils$7.encode(this.toBytes(), 'hex').toUpperCase();
	};

	var signature$1 = Signature$1;

	var utils$8 = elliptic_1.utils;
	var assert$9 = utils$8.assert;
	var parseBytes$2 = utils$8.parseBytes;



	function EDDSA(curve) {
	  assert$9(curve === 'ed25519', 'only tested with ed25519 so far');

	  if (!(this instanceof EDDSA))
	    return new EDDSA(curve);

	  var curve = elliptic_1.curves[curve].curve;
	  this.curve = curve;
	  this.g = curve.g;
	  this.g.precompute(curve.n.bitLength() + 1);

	  this.pointClass = curve.point().constructor;
	  this.encodingLength = Math.ceil(curve.n.bitLength() / 8);
	  this.hash = hash_1.sha512;
	}

	var eddsa = EDDSA;

	/**
	* @param {Array|String} message - message bytes
	* @param {Array|String|KeyPair} secret - secret bytes or a keypair
	* @returns {Signature} - signature
	*/
	EDDSA.prototype.sign = function sign(message, secret) {
	  message = parseBytes$2(message);
	  var key = this.keyFromSecret(secret);
	  var r = this.hashInt(key.messagePrefix(), message);
	  var R = this.g.mul(r);
	  var Rencoded = this.encodePoint(R);
	  var s_ = this.hashInt(Rencoded, key.pubBytes(), message)
	               .mul(key.priv());
	  var S = r.add(s_).umod(this.curve.n);
	  return this.makeSignature({ R: R, S: S, Rencoded: Rencoded });
	};

	/**
	* @param {Array} message - message bytes
	* @param {Array|String|Signature} sig - sig bytes
	* @param {Array|String|Point|KeyPair} pub - public key
	* @returns {Boolean} - true if public key matches sig of message
	*/
	EDDSA.prototype.verify = function verify(message, sig, pub) {
	  message = parseBytes$2(message);
	  sig = this.makeSignature(sig);
	  var key = this.keyFromPublic(pub);
	  var h = this.hashInt(sig.Rencoded(), key.pubBytes(), message);
	  var SG = this.g.mul(sig.S());
	  var RplusAh = sig.R().add(key.pub().mul(h));
	  return RplusAh.eq(SG);
	};

	EDDSA.prototype.hashInt = function hashInt() {
	  var hash = this.hash();
	  for (var i = 0; i < arguments.length; i++)
	    hash.update(arguments[i]);
	  return utils$8.intFromLE(hash.digest()).umod(this.curve.n);
	};

	EDDSA.prototype.keyFromPublic = function keyFromPublic(pub) {
	  return key$1.fromPublic(this, pub);
	};

	EDDSA.prototype.keyFromSecret = function keyFromSecret(secret) {
	  return key$1.fromSecret(this, secret);
	};

	EDDSA.prototype.makeSignature = function makeSignature(sig) {
	  if (sig instanceof signature$1)
	    return sig;
	  return new signature$1(this, sig);
	};

	/**
	* * https://tools.ietf.org/html/draft-josefsson-eddsa-ed25519-03#section-5.2
	*
	* EDDSA defines methods for encoding and decoding points and integers. These are
	* helper convenience methods, that pass along to utility functions implied
	* parameters.
	*
	*/
	EDDSA.prototype.encodePoint = function encodePoint(point) {
	  var enc = point.getY().toArray('le', this.encodingLength);
	  enc[this.encodingLength - 1] |= point.getX().isOdd() ? 0x80 : 0;
	  return enc;
	};

	EDDSA.prototype.decodePoint = function decodePoint(bytes) {
	  bytes = utils$8.parseBytes(bytes);

	  var lastIx = bytes.length - 1;
	  var normed = bytes.slice(0, lastIx).concat(bytes[lastIx] & ~0x80);
	  var xIsOdd = (bytes[lastIx] & 0x80) !== 0;

	  var y = utils$8.intFromLE(normed);
	  return this.curve.pointFromY(y, xIsOdd);
	};

	EDDSA.prototype.encodeInt = function encodeInt(num) {
	  return num.toArray('le', this.encodingLength);
	};

	EDDSA.prototype.decodeInt = function decodeInt(bytes) {
	  return utils$8.intFromLE(bytes);
	};

	EDDSA.prototype.isPoint = function isPoint(val) {
	  return val instanceof this.pointClass;
	};

	var require$$0$1 = ( _package$1 && _package ) || _package$1;

	var elliptic_1 = createCommonjsModule(function (module, exports) {

	var elliptic = exports;

	elliptic.version = require$$0$1.version;
	elliptic.utils = utils_1$1;
	elliptic.rand = brorand;
	elliptic.curve = curve_1;
	elliptic.curves = curves_1;

	// Protocols
	elliptic.ec = ec;
	elliptic.eddsa = eddsa;
	});

	var browser = createCommonjsModule(function (module, exports) {

	var EC = elliptic_1.ec;

	var ec = new EC("secp256k1");
	var cryptoObj = commonjsGlobal.crypto || commonjsGlobal.msCrypto || {};
	var subtle = cryptoObj.subtle || cryptoObj.webkitSubtle;

	function assert(condition, message) {
	  if (!condition) {
	    throw new Error(message || "Assertion failed");
	  }
	}

	function randomBytes(size) {
	  var arr = new Uint8Array(size);
	  commonjsGlobal.crypto.getRandomValues(arr);
	  return new Buffer(arr);
	}

	function sha512(msg) {
	  return subtle.digest({name: "SHA-512"}, msg).then(function(hash) {
	    return new Buffer(new Uint8Array(hash));
	  });
	}

	function getAes(op) {
	  return function(iv, key, data) {
	    var importAlgorithm = {name: "AES-CBC"};
	    var keyp = subtle.importKey("raw", key, importAlgorithm, false, [op]);
	    return keyp.then(function(cryptoKey) {
	      var encAlgorithm = {name: "AES-CBC", iv: iv};
	      return subtle[op](encAlgorithm, cryptoKey, data);
	    }).then(function(result) {
	      return new Buffer(new Uint8Array(result));
	    });
	  };
	}

	var aesCbcEncrypt = getAes("encrypt");
	var aesCbcDecrypt = getAes("decrypt");

	function hmacSha256Sign(key, msg) {
	  var algorithm = {name: "HMAC", hash: {name: "SHA-256"}};
	  var keyp = subtle.importKey("raw", key, algorithm, false, ["sign"]);
	  return keyp.then(function(cryptoKey) {
	    return subtle.sign(algorithm, cryptoKey, msg);
	  }).then(function(sig) {
	    return new Buffer(new Uint8Array(sig));
	  });
	}

	function hmacSha256Verify(key, msg, sig) {
	  var algorithm = {name: "HMAC", hash: {name: "SHA-256"}};
	  var keyp = subtle.importKey("raw", key, algorithm, false, ["verify"]);
	  return keyp.then(function(cryptoKey) {
	    return subtle.verify(algorithm, cryptoKey, sig, msg);
	  });
	}

	var getPublic = exports.getPublic = function(privateKey) {
	  // This function has sync API so we throw an error immediately.
	  assert(privateKey.length === 32, "Bad private key");
	  // XXX(Kagami): `elliptic.utils.encode` returns array for every
	  // encoding except `hex`.
	  return new Buffer(ec.keyFromPrivate(privateKey).getPublic("arr"));
	};

	// NOTE(Kagami): We don't use promise shim in Browser implementation
	// because it's supported natively in new browsers (see
	// <http://caniuse.com/#feat=promises>) and we can use only new browsers
	// because of the WebCryptoAPI (see
	// <http://caniuse.com/#feat=cryptography>).
	exports.sign = function(privateKey, msg) {
	  return new Promise(function(resolve) {
	    assert(privateKey.length === 32, "Bad private key");
	    assert(msg.length > 0, "Message should not be empty");
	    assert(msg.length <= 32, "Message is too long");
	    resolve(new Buffer(ec.sign(msg, privateKey, {canonical: true}).toDER()));
	  });
	};

	exports.verify = function(publicKey, msg, sig) {
	  return new Promise(function(resolve, reject) {
	    assert(publicKey.length === 65, "Bad public key");
	    assert(publicKey[0] === 4, "Bad public key");
	    assert(msg.length > 0, "Message should not be empty");
	    assert(msg.length <= 32, "Message is too long");
	    if (ec.verify(msg, sig, publicKey)) {
	      resolve(null);
	    } else {
	      reject(new Error("Bad signature"));
	    }
	  });
	};

	var derive = exports.derive = function(privateKeyA, publicKeyB) {
	  return new Promise(function(resolve) {
	    assert(Buffer.isBuffer(privateKeyA), "Bad input");
	    assert(Buffer.isBuffer(publicKeyB), "Bad input");
	    assert(privateKeyA.length === 32, "Bad private key");
	    assert(publicKeyB.length === 65, "Bad public key");
	    assert(publicKeyB[0] === 4, "Bad public key");
	    var keyA = ec.keyFromPrivate(privateKeyA);
	    var keyB = ec.keyFromPublic(publicKeyB);
	    var Px = keyA.derive(keyB.getPublic());  // BN instance
	    resolve(new Buffer(Px.toArray()));
	  });
	};

	exports.encrypt = function(publicKeyTo, msg, opts) {
	  assert(subtle, "WebCryptoAPI is not available");
	  opts = opts || {};
	  // Tmp variables to save context from flat promises;
	  var iv, ephemPublicKey, ciphertext, macKey;
	  return new Promise(function(resolve) {
	    var ephemPrivateKey = opts.ephemPrivateKey || randomBytes(32);
	    ephemPublicKey = getPublic(ephemPrivateKey);
	    resolve(derive(ephemPrivateKey, publicKeyTo));
	  }).then(function(Px) {
	    return sha512(Px);
	  }).then(function(hash) {
	    iv = opts.iv || randomBytes(16);
	    var encryptionKey = hash.slice(0, 32);
	    macKey = hash.slice(32);
	    return aesCbcEncrypt(iv, encryptionKey, msg);
	  }).then(function(data) {
	    ciphertext = data;
	    var dataToMac = Buffer.concat([iv, ephemPublicKey, ciphertext]);
	    return hmacSha256Sign(macKey, dataToMac);
	  }).then(function(mac) {
	    return {
	      iv: iv,
	      ephemPublicKey: ephemPublicKey,
	      ciphertext: ciphertext,
	      mac: mac,
	    };
	  });
	};

	exports.decrypt = function(privateKey, opts) {
	  assert(subtle, "WebCryptoAPI is not available");
	  // Tmp variable to save context from flat promises;
	  var encryptionKey;
	  return derive(privateKey, opts.ephemPublicKey).then(function(Px) {
	    return sha512(Px);
	  }).then(function(hash) {
	    encryptionKey = hash.slice(0, 32);
	    var macKey = hash.slice(32);
	    var dataToMac = Buffer.concat([
	      opts.iv,
	      opts.ephemPublicKey,
	      opts.ciphertext
	    ]);
	    return hmacSha256Verify(macKey, dataToMac, opts.mac);
	  }).then(function(macGood) {
	    assert(macGood, "Bad MAC");
	    return aesCbcDecrypt(opts.iv, encryptionKey, opts.ciphertext);
	  }).then(function(msg) {
	    return new Buffer(new Uint8Array(msg));
	  });
	};
	});
	var browser_1 = browser.getPublic;
	var browser_2 = browser.sign;
	var browser_3 = browser.verify;
	var browser_4 = browser.derive;
	var browser_5 = browser.encrypt;
	var browser_6 = browser.decrypt;

	/*
	 * Dexie.js - a minimalistic wrapper for IndexedDB
	 * ===============================================
	 *
	 * By David Fahlander, david.fahlander@gmail.com
	 *
	 * Version {version}, {date}
	 *
	 * http://dexie.org
	 *
	 * Apache License Version 2.0, January 2004, http://www.apache.org/licenses/
	 */
	 
	var keys = Object.keys;
	var isArray = Array.isArray;
	var _global$1 = typeof self !== 'undefined' ? self :
	    typeof window !== 'undefined' ? window :
	        global;
	function extend(obj, extension) {
	    if (typeof extension !== 'object')
	        return obj;
	    keys(extension).forEach(function (key) {
	        obj[key] = extension[key];
	    });
	    return obj;
	}
	var getProto = Object.getPrototypeOf;
	var _hasOwn = {}.hasOwnProperty;
	function hasOwn(obj, prop) {
	    return _hasOwn.call(obj, prop);
	}
	function props(proto, extension) {
	    if (typeof extension === 'function')
	        extension = extension(getProto(proto));
	    keys(extension).forEach(function (key) {
	        setProp(proto, key, extension[key]);
	    });
	}
	var defineProperty = Object.defineProperty;
	function setProp(obj, prop, functionOrGetSet, options) {
	    defineProperty(obj, prop, extend(functionOrGetSet && hasOwn(functionOrGetSet, "get") && typeof functionOrGetSet.get === 'function' ?
	        { get: functionOrGetSet.get, set: functionOrGetSet.set, configurable: true } :
	        { value: functionOrGetSet, configurable: true, writable: true }, options));
	}
	function derive(Child) {
	    return {
	        from: function (Parent) {
	            Child.prototype = Object.create(Parent.prototype);
	            setProp(Child.prototype, "constructor", Child);
	            return {
	                extend: props.bind(null, Child.prototype)
	            };
	        }
	    };
	}
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	function getPropertyDescriptor(obj, prop) {
	    var pd = getOwnPropertyDescriptor(obj, prop), proto;
	    return pd || (proto = getProto(obj)) && getPropertyDescriptor(proto, prop);
	}
	var _slice = [].slice;
	function slice(args, start, end) {
	    return _slice.call(args, start, end);
	}
	function override(origFunc, overridedFactory) {
	    return overridedFactory(origFunc);
	}
	function assert$a(b) {
	    if (!b)
	        throw new Error("Assertion Failed");
	}
	function asap(fn) {
	    if (_global$1.setImmediate)
	        setImmediate(fn);
	    else
	        setTimeout(fn, 0);
	}

	/** Generate an object (hash map) based on given array.
	 * @param extractor Function taking an array item and its index and returning an array of 2 items ([key, value]) to
	 *        instert on the resulting object for each item in the array. If this function returns a falsy value, the
	 *        current item wont affect the resulting object.
	 */
	function arrayToObject(array, extractor) {
	    return array.reduce(function (result, item, i) {
	        var nameAndValue = extractor(item, i);
	        if (nameAndValue)
	            result[nameAndValue[0]] = nameAndValue[1];
	        return result;
	    }, {});
	}
	function trycatcher(fn, reject) {
	    return function () {
	        try {
	            fn.apply(this, arguments);
	        }
	        catch (e) {
	            reject(e);
	        }
	    };
	}
	function tryCatch(fn, onerror, args) {
	    try {
	        fn.apply(null, args);
	    }
	    catch (ex) {
	        onerror && onerror(ex);
	    }
	}
	function getByKeyPath(obj, keyPath) {
	    // http://www.w3.org/TR/IndexedDB/#steps-for-extracting-a-key-from-a-value-using-a-key-path
	    if (hasOwn(obj, keyPath))
	        return obj[keyPath]; // This line is moved from last to first for optimization purpose.
	    if (!keyPath)
	        return obj;
	    if (typeof keyPath !== 'string') {
	        var rv = [];
	        for (var i = 0, l = keyPath.length; i < l; ++i) {
	            var val = getByKeyPath(obj, keyPath[i]);
	            rv.push(val);
	        }
	        return rv;
	    }
	    var period = keyPath.indexOf('.');
	    if (period !== -1) {
	        var innerObj = obj[keyPath.substr(0, period)];
	        return innerObj === undefined ? undefined : getByKeyPath(innerObj, keyPath.substr(period + 1));
	    }
	    return undefined;
	}
	function setByKeyPath(obj, keyPath, value) {
	    if (!obj || keyPath === undefined)
	        return;
	    if ('isFrozen' in Object && Object.isFrozen(obj))
	        return;
	    if (typeof keyPath !== 'string' && 'length' in keyPath) {
	        assert$a(typeof value !== 'string' && 'length' in value);
	        for (var i = 0, l = keyPath.length; i < l; ++i) {
	            setByKeyPath(obj, keyPath[i], value[i]);
	        }
	    }
	    else {
	        var period = keyPath.indexOf('.');
	        if (period !== -1) {
	            var currentKeyPath = keyPath.substr(0, period);
	            var remainingKeyPath = keyPath.substr(period + 1);
	            if (remainingKeyPath === "")
	                if (value === undefined)
	                    delete obj[currentKeyPath];
	                else
	                    obj[currentKeyPath] = value;
	            else {
	                var innerObj = obj[currentKeyPath];
	                if (!innerObj)
	                    innerObj = (obj[currentKeyPath] = {});
	                setByKeyPath(innerObj, remainingKeyPath, value);
	            }
	        }
	        else {
	            if (value === undefined)
	                delete obj[keyPath];
	            else
	                obj[keyPath] = value;
	        }
	    }
	}
	function delByKeyPath(obj, keyPath) {
	    if (typeof keyPath === 'string')
	        setByKeyPath(obj, keyPath, undefined);
	    else if ('length' in keyPath)
	        [].map.call(keyPath, function (kp) {
	            setByKeyPath(obj, kp, undefined);
	        });
	}
	function shallowClone(obj) {
	    var rv = {};
	    for (var m in obj) {
	        if (hasOwn(obj, m))
	            rv[m] = obj[m];
	    }
	    return rv;
	}
	var concat = [].concat;
	function flatten(a) {
	    return concat.apply([], a);
	}
	//https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
	var intrinsicTypes = "Boolean,String,Date,RegExp,Blob,File,FileList,ArrayBuffer,DataView,Uint8ClampedArray,ImageData,Map,Set"
	    .split(',').concat(flatten([8, 16, 32, 64].map(function (num) { return ["Int", "Uint", "Float"].map(function (t) { return t + num + "Array"; }); }))).filter(function (t) { return _global$1[t]; }).map(function (t) { return _global$1[t]; });
	function deepClone(any) {
	    if (!any || typeof any !== 'object')
	        return any;
	    var rv;
	    if (isArray(any)) {
	        rv = [];
	        for (var i = 0, l = any.length; i < l; ++i) {
	            rv.push(deepClone(any[i]));
	        }
	    }
	    else if (intrinsicTypes.indexOf(any.constructor) >= 0) {
	        rv = any;
	    }
	    else {
	        rv = any.constructor ? Object.create(any.constructor.prototype) : {};
	        for (var prop in any) {
	            if (hasOwn(any, prop)) {
	                rv[prop] = deepClone(any[prop]);
	            }
	        }
	    }
	    return rv;
	}
	function getObjectDiff(a, b, rv, prfx) {
	    // Compares objects a and b and produces a diff object.
	    rv = rv || {};
	    prfx = prfx || '';
	    keys(a).forEach(function (prop) {
	        if (!hasOwn(b, prop))
	            rv[prfx + prop] = undefined; // Property removed
	        else {
	            var ap = a[prop], bp = b[prop];
	            if (typeof ap === 'object' && typeof bp === 'object' &&
	                ap && bp &&
	                // Now compare constructors are same (not equal because wont work in Safari)
	                ('' + ap.constructor) === ('' + bp.constructor))
	                // Same type of object but its properties may have changed
	                getObjectDiff(ap, bp, rv, prfx + prop + ".");
	            else if (ap !== bp)
	                rv[prfx + prop] = b[prop]; // Primitive value changed
	        }
	    });
	    keys(b).forEach(function (prop) {
	        if (!hasOwn(a, prop)) {
	            rv[prfx + prop] = b[prop]; // Property added
	        }
	    });
	    return rv;
	}
	// If first argument is iterable or array-like, return it as an array
	var iteratorSymbol = typeof Symbol !== 'undefined' && Symbol.iterator;
	var getIteratorOf = iteratorSymbol ? function (x) {
	    var i;
	    return x != null && (i = x[iteratorSymbol]) && i.apply(x);
	} : function () { return null; };
	var NO_CHAR_ARRAY = {};
	// Takes one or several arguments and returns an array based on the following criteras:
	// * If several arguments provided, return arguments converted to an array in a way that
	//   still allows javascript engine to optimize the code.
	// * If single argument is an array, return a clone of it.
	// * If this-pointer equals NO_CHAR_ARRAY, don't accept strings as valid iterables as a special
	//   case to the two bullets below.
	// * If single argument is an iterable, convert it to an array and return the resulting array.
	// * If single argument is array-like (has length of type number), convert it to an array.
	function getArrayOf(arrayLike) {
	    var i, a, x, it;
	    if (arguments.length === 1) {
	        if (isArray(arrayLike))
	            return arrayLike.slice();
	        if (this === NO_CHAR_ARRAY && typeof arrayLike === 'string')
	            return [arrayLike];
	        if ((it = getIteratorOf(arrayLike))) {
	            a = [];
	            while ((x = it.next()), !x.done)
	                a.push(x.value);
	            return a;
	        }
	        if (arrayLike == null)
	            return [arrayLike];
	        i = arrayLike.length;
	        if (typeof i === 'number') {
	            a = new Array(i);
	            while (i--)
	                a[i] = arrayLike[i];
	            return a;
	        }
	        return [arrayLike];
	    }
	    i = arguments.length;
	    a = new Array(i);
	    while (i--)
	        a[i] = arguments[i];
	    return a;
	}

	// By default, debug will be true only if platform is a web platform and its page is served from localhost.
	// When debug = true, error's stacks will contain asyncronic long stacks.
	var debug = typeof location !== 'undefined' &&
	    // By default, use debug mode if served from localhost.
	    /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
	function setDebug(value, filter) {
	    debug = value;
	    libraryFilter = filter;
	}
	var libraryFilter = function () { return true; };
	var NEEDS_THROW_FOR_STACK = !new Error("").stack;
	function getErrorWithStack() {
	    if (NEEDS_THROW_FOR_STACK)
	        try {
	            throw new Error(); // Fallback if above line don't throw.
	        }
	        catch (e) {
	            return e;
	        }
	    return new Error();
	}
	function prettyStack(exception, numIgnoredFrames) {
	    var stack = exception.stack;
	    if (!stack)
	        return "";
	    numIgnoredFrames = (numIgnoredFrames || 0);
	    if (stack.indexOf(exception.name) === 0)
	        numIgnoredFrames += (exception.name + exception.message).split('\n').length;
	    return stack.split('\n')
	        .slice(numIgnoredFrames)
	        .filter(libraryFilter)
	        .map(function (frame) { return "\n" + frame; })
	        .join('');
	}
	function deprecated$1(what, fn) {
	    return function () {
	        console.warn(what + " is deprecated. See https://github.com/dfahlander/Dexie.js/wiki/Deprecations. " + prettyStack(getErrorWithStack(), 1));
	        return fn.apply(this, arguments);
	    };
	}

	var dexieErrorNames = [
	    'Modify',
	    'Bulk',
	    'OpenFailed',
	    'VersionChange',
	    'Schema',
	    'Upgrade',
	    'InvalidTable',
	    'MissingAPI',
	    'NoSuchDatabase',
	    'InvalidArgument',
	    'SubTransaction',
	    'Unsupported',
	    'Internal',
	    'DatabaseClosed',
	    'PrematureCommit',
	    'ForeignAwait'
	];
	var idbDomErrorNames = [
	    'Unknown',
	    'Constraint',
	    'Data',
	    'TransactionInactive',
	    'ReadOnly',
	    'Version',
	    'NotFound',
	    'InvalidState',
	    'InvalidAccess',
	    'Abort',
	    'Timeout',
	    'QuotaExceeded',
	    'Syntax',
	    'DataClone'
	];
	var errorList = dexieErrorNames.concat(idbDomErrorNames);
	var defaultTexts = {
	    VersionChanged: "Database version changed by other database connection",
	    DatabaseClosed: "Database has been closed",
	    Abort: "Transaction aborted",
	    TransactionInactive: "Transaction has already completed or failed"
	};
	//
	// DexieError - base class of all out exceptions.
	//
	function DexieError(name, msg) {
	    // Reason we don't use ES6 classes is because:
	    // 1. It bloats transpiled code and increases size of minified code.
	    // 2. It doesn't give us much in this case.
	    // 3. It would require sub classes to call super(), which
	    //    is not needed when deriving from Error.
	    this._e = getErrorWithStack();
	    this.name = name;
	    this.message = msg;
	}
	derive(DexieError).from(Error).extend({
	    stack: {
	        get: function () {
	            return this._stack ||
	                (this._stack = this.name + ": " + this.message + prettyStack(this._e, 2));
	        }
	    },
	    toString: function () { return this.name + ": " + this.message; }
	});
	function getMultiErrorMessage(msg, failures) {
	    return msg + ". Errors: " + failures
	        .map(function (f) { return f.toString(); })
	        .filter(function (v, i, s) { return s.indexOf(v) === i; }) // Only unique error strings
	        .join('\n');
	}
	//
	// ModifyError - thrown in Collection.modify()
	// Specific constructor because it contains members failures and failedKeys.
	//
	function ModifyError(msg, failures, successCount, failedKeys) {
	    this._e = getErrorWithStack();
	    this.failures = failures;
	    this.failedKeys = failedKeys;
	    this.successCount = successCount;
	}
	derive(ModifyError).from(DexieError);
	function BulkError(msg, failures) {
	    this._e = getErrorWithStack();
	    this.name = "BulkError";
	    this.failures = failures;
	    this.message = getMultiErrorMessage(msg, failures);
	}
	derive(BulkError).from(DexieError);
	//
	//
	// Dynamically generate error names and exception classes based
	// on the names in errorList.
	//
	//
	// Map of {ErrorName -> ErrorName + "Error"}
	var errnames = errorList.reduce(function (obj, name) { return (obj[name] = name + "Error", obj); }, {});
	// Need an alias for DexieError because we're gonna create subclasses with the same name.
	var BaseException = DexieError;
	// Map of {ErrorName -> exception constructor}
	var exceptions = errorList.reduce(function (obj, name) {
	    // Let the name be "DexieError" because this name may
	    // be shown in call stack and when debugging. DexieError is
	    // the most true name because it derives from DexieError,
	    // and we cannot change Function.name programatically without
	    // dynamically create a Function object, which would be considered
	    // 'eval-evil'.
	    var fullName = name + "Error";
	    function DexieError(msgOrInner, inner) {
	        this._e = getErrorWithStack();
	        this.name = fullName;
	        if (!msgOrInner) {
	            this.message = defaultTexts[name] || fullName;
	            this.inner = null;
	        }
	        else if (typeof msgOrInner === 'string') {
	            this.message = msgOrInner;
	            this.inner = inner || null;
	        }
	        else if (typeof msgOrInner === 'object') {
	            this.message = msgOrInner.name + " " + msgOrInner.message;
	            this.inner = msgOrInner;
	        }
	    }
	    derive(DexieError).from(BaseException);
	    obj[name] = DexieError;
	    return obj;
	}, {});
	// Use ECMASCRIPT standard exceptions where applicable:
	exceptions.Syntax = SyntaxError;
	exceptions.Type = TypeError;
	exceptions.Range = RangeError;
	var exceptionMap = idbDomErrorNames.reduce(function (obj, name) {
	    obj[name + "Error"] = exceptions[name];
	    return obj;
	}, {});
	function mapError(domError, message) {
	    if (!domError || domError instanceof DexieError || domError instanceof TypeError || domError instanceof SyntaxError || !domError.name || !exceptionMap[domError.name])
	        return domError;
	    var rv = new exceptionMap[domError.name](message || domError.message, domError);
	    if ("stack" in domError) {
	        // Derive stack from inner exception if it has a stack
	        setProp(rv, "stack", { get: function () {
	                return this.inner.stack;
	            } });
	    }
	    return rv;
	}
	var fullNameExceptions = errorList.reduce(function (obj, name) {
	    if (["Syntax", "Type", "Range"].indexOf(name) === -1)
	        obj[name + "Error"] = exceptions[name];
	    return obj;
	}, {});
	fullNameExceptions.ModifyError = ModifyError;
	fullNameExceptions.DexieError = DexieError;
	fullNameExceptions.BulkError = BulkError;

	function nop() { }
	function mirror(val) { return val; }
	function pureFunctionChain(f1, f2) {
	    // Enables chained events that takes ONE argument and returns it to the next function in chain.
	    // This pattern is used in the hook("reading") event.
	    if (f1 == null || f1 === mirror)
	        return f2;
	    return function (val) {
	        return f2(f1(val));
	    };
	}
	function callBoth(on1, on2) {
	    return function () {
	        on1.apply(this, arguments);
	        on2.apply(this, arguments);
	    };
	}
	function hookCreatingChain(f1, f2) {
	    // Enables chained events that takes several arguments and may modify first argument by making a modification and then returning the same instance.
	    // This pattern is used in the hook("creating") event.
	    if (f1 === nop)
	        return f2;
	    return function () {
	        var res = f1.apply(this, arguments);
	        if (res !== undefined)
	            arguments[0] = res;
	        var onsuccess = this.onsuccess, // In case event listener has set this.onsuccess
	        onerror = this.onerror; // In case event listener has set this.onerror
	        this.onsuccess = null;
	        this.onerror = null;
	        var res2 = f2.apply(this, arguments);
	        if (onsuccess)
	            this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
	        if (onerror)
	            this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
	        return res2 !== undefined ? res2 : res;
	    };
	}
	function hookDeletingChain(f1, f2) {
	    if (f1 === nop)
	        return f2;
	    return function () {
	        f1.apply(this, arguments);
	        var onsuccess = this.onsuccess, // In case event listener has set this.onsuccess
	        onerror = this.onerror; // In case event listener has set this.onerror
	        this.onsuccess = this.onerror = null;
	        f2.apply(this, arguments);
	        if (onsuccess)
	            this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
	        if (onerror)
	            this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
	    };
	}
	function hookUpdatingChain(f1, f2) {
	    if (f1 === nop)
	        return f2;
	    return function (modifications) {
	        var res = f1.apply(this, arguments);
	        extend(modifications, res); // If f1 returns new modifications, extend caller's modifications with the result before calling next in chain.
	        var onsuccess = this.onsuccess, // In case event listener has set this.onsuccess
	        onerror = this.onerror; // In case event listener has set this.onerror
	        this.onsuccess = null;
	        this.onerror = null;
	        var res2 = f2.apply(this, arguments);
	        if (onsuccess)
	            this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
	        if (onerror)
	            this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
	        return res === undefined ?
	            (res2 === undefined ? undefined : res2) :
	            (extend(res, res2));
	    };
	}
	function reverseStoppableEventChain(f1, f2) {
	    if (f1 === nop)
	        return f2;
	    return function () {
	        if (f2.apply(this, arguments) === false)
	            return false;
	        return f1.apply(this, arguments);
	    };
	}

	function promisableChain(f1, f2) {
	    if (f1 === nop)
	        return f2;
	    return function () {
	        var res = f1.apply(this, arguments);
	        if (res && typeof res.then === 'function') {
	            var thiz = this, i = arguments.length, args = new Array(i);
	            while (i--)
	                args[i] = arguments[i];
	            return res.then(function () {
	                return f2.apply(thiz, args);
	            });
	        }
	        return f2.apply(this, arguments);
	    };
	}

	/*
	 * Copyright (c) 2014-2017 David Fahlander
	 * Apache License Version 2.0, January 2004, http://www.apache.org/licenses/LICENSE-2.0
	 */
	//
	// Promise and Zone (PSD) for Dexie library
	//
	// I started out writing this Promise class by copying promise-light (https://github.com/taylorhakes/promise-light) by
	// https://github.com/taylorhakes - an A+ and ECMASCRIPT 6 compliant Promise implementation.
	//
	// In previous versions this was fixed by not calling setTimeout when knowing that the resolve() or reject() came from another
	// tick. In Dexie v1.4.0, I've rewritten the Promise class entirely. Just some fragments of promise-light is left. I use
	// another strategy now that simplifies everything a lot: to always execute callbacks in a new micro-task, but have an own micro-task
	// engine that is indexedDB compliant across all browsers.
	// Promise class has also been optimized a lot with inspiration from bluebird - to avoid closures as much as possible.
	// Also with inspiration from bluebird, asyncronic stacks in debug mode.
	//
	// Specific non-standard features of this Promise class:
	// * Custom zone support (a.k.a. PSD) with ability to keep zones also when using native promises as well as
	//   native async / await.
	// * Promise.follow() method built upon the custom zone engine, that allows user to track all promises created from current stack frame
	//   and below + all promises that those promises creates or awaits.
	// * Detect any unhandled promise in a PSD-scope (PSD.onunhandled). 
	//
	// David Fahlander, https://github.com/dfahlander
	//
	// Just a pointer that only this module knows about.
	// Used in Promise constructor to emulate a private constructor.
	var INTERNAL = {};
	// Async stacks (long stacks) must not grow infinitely.
	var LONG_STACKS_CLIP_LIMIT = 100;
	var MAX_LONG_STACKS = 20;
	var ZONE_ECHO_LIMIT = 7;
	var nativePromiseInstanceAndProto = (function () {
	    try {
	        // Be able to patch native async functions
	        return new Function("let F=async ()=>{},p=F();return [p,Object.getPrototypeOf(p),Promise.resolve(),F.constructor];")();
	    }
	    catch (e) {
	        var P = _global$1.Promise;
	        return P ?
	            [P.resolve(), P.prototype, P.resolve()] :
	            [];
	    }
	})();
	var resolvedNativePromise = nativePromiseInstanceAndProto[0];
	var nativePromiseProto = nativePromiseInstanceAndProto[1];
	var resolvedGlobalPromise = nativePromiseInstanceAndProto[2];
	var nativePromiseThen = nativePromiseProto && nativePromiseProto.then;
	var NativePromise = resolvedNativePromise && resolvedNativePromise.constructor;
	var AsyncFunction = nativePromiseInstanceAndProto[3];
	var patchGlobalPromise = !!resolvedGlobalPromise;
	var stack_being_generated = false;
	/* The default function used only for the very first promise in a promise chain.
	   As soon as then promise is resolved or rejected, all next tasks will be executed in micro ticks
	   emulated in this module. For indexedDB compatibility, this means that every method needs to
	   execute at least one promise before doing an indexedDB operation. Dexie will always call
	   db.ready().then() for every operation to make sure the indexedDB event is started in an
	   indexedDB-compatible emulated micro task loop.
	*/
	var schedulePhysicalTick = resolvedGlobalPromise ?
	    function () { resolvedGlobalPromise.then(physicalTick); }
	    :
	        _global$1.setImmediate ?
	            // setImmediate supported. Those modern platforms also supports Function.bind().
	            setImmediate.bind(null, physicalTick) :
	            _global$1.MutationObserver ?
	                // MutationObserver supported
	                function () {
	                    var hiddenDiv = document.createElement("div");
	                    (new MutationObserver(function () {
	                        physicalTick();
	                        hiddenDiv = null;
	                    })).observe(hiddenDiv, { attributes: true });
	                    hiddenDiv.setAttribute('i', '1');
	                } :
	                // No support for setImmediate or MutationObserver. No worry, setTimeout is only called
	                // once time. Every tick that follows will be our emulated micro tick.
	                // Could have uses setTimeout.bind(null, 0, physicalTick) if it wasnt for that FF13 and below has a bug 
	                function () { setTimeout(physicalTick, 0); };
	// Configurable through Promise.scheduler.
	// Don't export because it would be unsafe to let unknown
	// code call it unless they do try..catch within their callback.
	// This function can be retrieved through getter of Promise.scheduler though,
	// but users must not do Promise.scheduler = myFuncThatThrowsException
	var asap$1 = function (callback, args) {
	    microtickQueue.push([callback, args]);
	    if (needsNewPhysicalTick) {
	        schedulePhysicalTick();
	        needsNewPhysicalTick = false;
	    }
	};
	var isOutsideMicroTick = true;
	var needsNewPhysicalTick = true;
	var unhandledErrors = [];
	var rejectingErrors = [];
	var currentFulfiller = null;
	var rejectionMapper = mirror; // Remove in next major when removing error mapping of DOMErrors and DOMExceptions
	var globalPSD = {
	    id: 'global',
	    global: true,
	    ref: 0,
	    unhandleds: [],
	    onunhandled: globalError,
	    pgp: false,
	    env: {},
	    finalize: function () {
	        this.unhandleds.forEach(function (uh) {
	            try {
	                globalError(uh[0], uh[1]);
	            }
	            catch (e) { }
	        });
	    }
	};
	var PSD = globalPSD;
	var microtickQueue = []; // Callbacks to call in this or next physical tick.
	var numScheduledCalls = 0; // Number of listener-calls left to do in this physical tick.
	var tickFinalizers = []; // Finalizers to call when there are no more async calls scheduled within current physical tick.
	function Promise$1(fn) {
	    if (typeof this !== 'object')
	        throw new TypeError('Promises must be constructed via new');
	    this._listeners = [];
	    this.onuncatched = nop; // Deprecate in next major. Not needed. Better to use global error handler.
	    // A library may set `promise._lib = true;` after promise is created to make resolve() or reject()
	    // execute the microtask engine implicitely within the call to resolve() or reject().
	    // To remain A+ compliant, a library must only set `_lib=true` if it can guarantee that the stack
	    // only contains library code when calling resolve() or reject().
	    // RULE OF THUMB: ONLY set _lib = true for promises explicitely resolving/rejecting directly from
	    // global scope (event handler, timer etc)!
	    this._lib = false;
	    // Current async scope
	    var psd = (this._PSD = PSD);
	    if (debug) {
	        this._stackHolder = getErrorWithStack();
	        this._prev = null;
	        this._numPrev = 0; // Number of previous promises (for long stacks)
	    }
	    if (typeof fn !== 'function') {
	        if (fn !== INTERNAL)
	            throw new TypeError('Not a function');
	        // Private constructor (INTERNAL, state, value).
	        // Used internally by Promise.resolve() and Promise.reject().
	        this._state = arguments[1];
	        this._value = arguments[2];
	        if (this._state === false)
	            handleRejection(this, this._value); // Map error, set stack and addPossiblyUnhandledError().
	        return;
	    }
	    this._state = null; // null (=pending), false (=rejected) or true (=resolved)
	    this._value = null; // error or result
	    ++psd.ref; // Refcounting current scope
	    executePromiseTask(this, fn);
	}
	// Prepare a property descriptor to put onto Promise.prototype.then
	var thenProp = {
	    get: function () {
	        var psd = PSD, microTaskId = totalEchoes;
	        function then(onFulfilled, onRejected) {
	            var _this = this;
	            var possibleAwait = !psd.global && (psd !== PSD || microTaskId !== totalEchoes);
	            if (possibleAwait)
	                decrementExpectedAwaits();
	            var rv = new Promise$1(function (resolve, reject) {
	                propagateToListener(_this, new Listener(nativeAwaitCompatibleWrap(onFulfilled, psd, possibleAwait), nativeAwaitCompatibleWrap(onRejected, psd, possibleAwait), resolve, reject, psd));
	            });
	            debug && linkToPreviousPromise(rv, this);
	            return rv;
	        }
	        then.prototype = INTERNAL; // For idempotense, see setter below.
	        return then;
	    },
	    // Be idempotent and allow another framework (such as zone.js or another instance of a Dexie.Promise module) to replace Promise.prototype.then
	    // and when that framework wants to restore the original property, we must identify that and restore the original property descriptor.
	    set: function (value) {
	        setProp(this, 'then', value && value.prototype === INTERNAL ?
	            thenProp : // Restore to original property descriptor.
	            {
	                get: function () {
	                    return value; // Getter returning provided value (behaves like value is just changed)
	                },
	                set: thenProp.set // Keep a setter that is prepared to restore original.
	            });
	    }
	};
	props(Promise$1.prototype, {
	    then: thenProp,
	    _then: function (onFulfilled, onRejected) {
	        // A little tinier version of then() that don't have to create a resulting promise.
	        propagateToListener(this, new Listener(null, null, onFulfilled, onRejected, PSD));
	    },
	    catch: function (onRejected) {
	        if (arguments.length === 1)
	            return this.then(null, onRejected);
	        // First argument is the Error type to catch
	        var type = arguments[0], handler = arguments[1];
	        return typeof type === 'function' ? this.then(null, function (err) {
	            // Catching errors by its constructor type (similar to java / c++ / c#)
	            // Sample: promise.catch(TypeError, function (e) { ... });
	            return err instanceof type ? handler(err) : PromiseReject(err);
	        })
	            : this.then(null, function (err) {
	                // Catching errors by the error.name property. Makes sense for indexedDB where error type
	                // is always DOMError but where e.name tells the actual error type.
	                // Sample: promise.catch('ConstraintError', function (e) { ... });
	                return err && err.name === type ? handler(err) : PromiseReject(err);
	            });
	    },
	    finally: function (onFinally) {
	        return this.then(function (value) {
	            onFinally();
	            return value;
	        }, function (err) {
	            onFinally();
	            return PromiseReject(err);
	        });
	    },
	    stack: {
	        get: function () {
	            if (this._stack)
	                return this._stack;
	            try {
	                stack_being_generated = true;
	                var stacks = getStack(this, [], MAX_LONG_STACKS);
	                var stack = stacks.join("\nFrom previous: ");
	                if (this._state !== null)
	                    this._stack = stack; // Stack may be updated on reject.
	                return stack;
	            }
	            finally {
	                stack_being_generated = false;
	            }
	        }
	    },
	    timeout: function (ms, msg) {
	        var _this = this;
	        return ms < Infinity ?
	            new Promise$1(function (resolve, reject) {
	                var handle = setTimeout(function () { return reject(new exceptions.Timeout(msg)); }, ms);
	                _this.then(resolve, reject).finally(clearTimeout.bind(null, handle));
	            }) : this;
	    }
	});
	if (typeof Symbol !== 'undefined' && Symbol.toStringTag)
	    setProp(Promise$1.prototype, Symbol.toStringTag, 'Promise');
	// Now that Promise.prototype is defined, we have all it takes to set globalPSD.env.
	// Environment globals snapshotted on leaving global zone
	globalPSD.env = snapShot();
	function Listener(onFulfilled, onRejected, resolve, reject, zone) {
	    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
	    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
	    this.resolve = resolve;
	    this.reject = reject;
	    this.psd = zone;
	}
	// Promise Static Properties
	props(Promise$1, {
	    all: function () {
	        var values = getArrayOf.apply(null, arguments) // Supports iterables, implicit arguments and array-like.
	            .map(onPossibleParallellAsync); // Handle parallell async/awaits 
	        return new Promise$1(function (resolve, reject) {
	            if (values.length === 0)
	                resolve([]);
	            var remaining = values.length;
	            values.forEach(function (a, i) { return Promise$1.resolve(a).then(function (x) {
	                values[i] = x;
	                if (!--remaining)
	                    resolve(values);
	            }, reject); });
	        });
	    },
	    resolve: function (value) {
	        if (value instanceof Promise$1)
	            return value;
	        if (value && typeof value.then === 'function')
	            return new Promise$1(function (resolve, reject) {
	                value.then(resolve, reject);
	            });
	        var rv = new Promise$1(INTERNAL, true, value);
	        linkToPreviousPromise(rv, currentFulfiller);
	        return rv;
	    },
	    reject: PromiseReject,
	    race: function () {
	        var values = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
	        return new Promise$1(function (resolve, reject) {
	            values.map(function (value) { return Promise$1.resolve(value).then(resolve, reject); });
	        });
	    },
	    PSD: {
	        get: function () { return PSD; },
	        set: function (value) { return PSD = value; }
	    },
	    //totalEchoes: {get: ()=>totalEchoes},
	    //task: {get: ()=>task},
	    newPSD: newScope,
	    usePSD: usePSD,
	    scheduler: {
	        get: function () { return asap$1; },
	        set: function (value) { asap$1 = value; }
	    },
	    rejectionMapper: {
	        get: function () { return rejectionMapper; },
	        set: function (value) { rejectionMapper = value; } // Map reject failures
	    },
	    follow: function (fn, zoneProps) {
	        return new Promise$1(function (resolve, reject) {
	            return newScope(function (resolve, reject) {
	                var psd = PSD;
	                psd.unhandleds = []; // For unhandled standard- or 3rd party Promises. Checked at psd.finalize()
	                psd.onunhandled = reject; // Triggered directly on unhandled promises of this library.
	                psd.finalize = callBoth(function () {
	                    var _this = this;
	                    // Unhandled standard or 3rd part promises are put in PSD.unhandleds and
	                    // examined upon scope completion while unhandled rejections in this Promise
	                    // will trigger directly through psd.onunhandled
	                    run_at_end_of_this_or_next_physical_tick(function () {
	                        _this.unhandleds.length === 0 ? resolve() : reject(_this.unhandleds[0]);
	                    });
	                }, psd.finalize);
	                fn();
	            }, zoneProps, resolve, reject);
	        });
	    }
	});
	/**
	* Take a potentially misbehaving resolver function and make sure
	* onFulfilled and onRejected are only called once.
	*
	* Makes no guarantees about asynchrony.
	*/
	function executePromiseTask(promise, fn) {
	    // Promise Resolution Procedure:
	    // https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
	    try {
	        fn(function (value) {
	            if (promise._state !== null)
	                return; // Already settled
	            if (value === promise)
	                throw new TypeError('A promise cannot be resolved with itself.');
	            var shouldExecuteTick = promise._lib && beginMicroTickScope();
	            if (value && typeof value.then === 'function') {
	                executePromiseTask(promise, function (resolve, reject) {
	                    value instanceof Promise$1 ?
	                        value._then(resolve, reject) :
	                        value.then(resolve, reject);
	                });
	            }
	            else {
	                promise._state = true;
	                promise._value = value;
	                propagateAllListeners(promise);
	            }
	            if (shouldExecuteTick)
	                endMicroTickScope();
	        }, handleRejection.bind(null, promise)); // If Function.bind is not supported. Exception is handled in catch below
	    }
	    catch (ex) {
	        handleRejection(promise, ex);
	    }
	}
	function handleRejection(promise, reason) {
	    rejectingErrors.push(reason);
	    if (promise._state !== null)
	        return;
	    var shouldExecuteTick = promise._lib && beginMicroTickScope();
	    reason = rejectionMapper(reason);
	    promise._state = false;
	    promise._value = reason;
	    debug && reason !== null && typeof reason === 'object' && !reason._promise && tryCatch(function () {
	        var origProp = getPropertyDescriptor(reason, "stack");
	        reason._promise = promise;
	        setProp(reason, "stack", {
	            get: function () {
	                return stack_being_generated ?
	                    origProp && (origProp.get ?
	                        origProp.get.apply(reason) :
	                        origProp.value) :
	                    promise.stack;
	            }
	        });
	    });
	    // Add the failure to a list of possibly uncaught errors
	    addPossiblyUnhandledError(promise);
	    propagateAllListeners(promise);
	    if (shouldExecuteTick)
	        endMicroTickScope();
	}
	function propagateAllListeners(promise) {
	    //debug && linkToPreviousPromise(promise);
	    var listeners = promise._listeners;
	    promise._listeners = [];
	    for (var i = 0, len = listeners.length; i < len; ++i) {
	        propagateToListener(promise, listeners[i]);
	    }
	    var psd = promise._PSD;
	    --psd.ref || psd.finalize(); // if psd.ref reaches zero, call psd.finalize();
	    if (numScheduledCalls === 0) {
	        // If numScheduledCalls is 0, it means that our stack is not in a callback of a scheduled call,
	        // and that no deferreds where listening to this rejection or success.
	        // Since there is a risk that our stack can contain application code that may
	        // do stuff after this code is finished that may generate new calls, we cannot
	        // call finalizers here.
	        ++numScheduledCalls;
	        asap$1(function () {
	            if (--numScheduledCalls === 0)
	                finalizePhysicalTick(); // Will detect unhandled errors
	        }, []);
	    }
	}
	function propagateToListener(promise, listener) {
	    if (promise._state === null) {
	        promise._listeners.push(listener);
	        return;
	    }
	    var cb = promise._state ? listener.onFulfilled : listener.onRejected;
	    if (cb === null) {
	        // This Listener doesnt have a listener for the event being triggered (onFulfilled or onReject) so lets forward the event to any eventual listeners on the Promise instance returned by then() or catch()
	        return (promise._state ? listener.resolve : listener.reject)(promise._value);
	    }
	    ++listener.psd.ref;
	    ++numScheduledCalls;
	    asap$1(callListener, [cb, promise, listener]);
	}
	function callListener(cb, promise, listener) {
	    try {
	        // Set static variable currentFulfiller to the promise that is being fullfilled,
	        // so that we connect the chain of promises (for long stacks support)
	        currentFulfiller = promise;
	        // Call callback and resolve our listener with it's return value.
	        var ret, value = promise._value;
	        if (promise._state) {
	            // cb is onResolved
	            ret = cb(value);
	        }
	        else {
	            // cb is onRejected
	            if (rejectingErrors.length)
	                rejectingErrors = [];
	            ret = cb(value);
	            if (rejectingErrors.indexOf(value) === -1)
	                markErrorAsHandled(promise); // Callback didnt do Promise.reject(err) nor reject(err) onto another promise.
	        }
	        listener.resolve(ret);
	    }
	    catch (e) {
	        // Exception thrown in callback. Reject our listener.
	        listener.reject(e);
	    }
	    finally {
	        // Restore env and currentFulfiller.
	        currentFulfiller = null;
	        if (--numScheduledCalls === 0)
	            finalizePhysicalTick();
	        --listener.psd.ref || listener.psd.finalize();
	    }
	}
	function getStack(promise, stacks, limit) {
	    if (stacks.length === limit)
	        return stacks;
	    var stack = "";
	    if (promise._state === false) {
	        var failure = promise._value, errorName, message;
	        if (failure != null) {
	            errorName = failure.name || "Error";
	            message = failure.message || failure;
	            stack = prettyStack(failure, 0);
	        }
	        else {
	            errorName = failure; // If error is undefined or null, show that.
	            message = "";
	        }
	        stacks.push(errorName + (message ? ": " + message : "") + stack);
	    }
	    if (debug) {
	        stack = prettyStack(promise._stackHolder, 2);
	        if (stack && stacks.indexOf(stack) === -1)
	            stacks.push(stack);
	        if (promise._prev)
	            getStack(promise._prev, stacks, limit);
	    }
	    return stacks;
	}
	function linkToPreviousPromise(promise, prev) {
	    // Support long stacks by linking to previous completed promise.
	    var numPrev = prev ? prev._numPrev + 1 : 0;
	    if (numPrev < LONG_STACKS_CLIP_LIMIT) {
	        promise._prev = prev;
	        promise._numPrev = numPrev;
	    }
	}
	/* The callback to schedule with setImmediate() or setTimeout().
	   It runs a virtual microtick and executes any callback registered in microtickQueue.
	 */
	function physicalTick() {
	    beginMicroTickScope() && endMicroTickScope();
	}
	function beginMicroTickScope() {
	    var wasRootExec = isOutsideMicroTick;
	    isOutsideMicroTick = false;
	    needsNewPhysicalTick = false;
	    return wasRootExec;
	}
	/* Executes micro-ticks without doing try..catch.
	   This can be possible because we only use this internally and
	   the registered functions are exception-safe (they do try..catch
	   internally before calling any external method). If registering
	   functions in the microtickQueue that are not exception-safe, this
	   would destroy the framework and make it instable. So we don't export
	   our asap method.
	*/
	function endMicroTickScope() {
	    var callbacks, i, l;
	    do {
	        while (microtickQueue.length > 0) {
	            callbacks = microtickQueue;
	            microtickQueue = [];
	            l = callbacks.length;
	            for (i = 0; i < l; ++i) {
	                var item = callbacks[i];
	                item[0].apply(null, item[1]);
	            }
	        }
	    } while (microtickQueue.length > 0);
	    isOutsideMicroTick = true;
	    needsNewPhysicalTick = true;
	}
	function finalizePhysicalTick() {
	    var unhandledErrs = unhandledErrors;
	    unhandledErrors = [];
	    unhandledErrs.forEach(function (p) {
	        p._PSD.onunhandled.call(null, p._value, p);
	    });
	    var finalizers = tickFinalizers.slice(0); // Clone first because finalizer may remove itself from list.
	    var i = finalizers.length;
	    while (i)
	        finalizers[--i]();
	}
	function run_at_end_of_this_or_next_physical_tick(fn) {
	    function finalizer() {
	        fn();
	        tickFinalizers.splice(tickFinalizers.indexOf(finalizer), 1);
	    }
	    tickFinalizers.push(finalizer);
	    ++numScheduledCalls;
	    asap$1(function () {
	        if (--numScheduledCalls === 0)
	            finalizePhysicalTick();
	    }, []);
	}
	function addPossiblyUnhandledError(promise) {
	    // Only add to unhandledErrors if not already there. The first one to add to this list
	    // will be upon the first rejection so that the root cause (first promise in the
	    // rejection chain) is the one listed.
	    if (!unhandledErrors.some(function (p) { return p._value === promise._value; }))
	        unhandledErrors.push(promise);
	}
	function markErrorAsHandled(promise) {
	    // Called when a reject handled is actually being called.
	    // Search in unhandledErrors for any promise whos _value is this promise_value (list
	    // contains only rejected promises, and only one item per error)
	    var i = unhandledErrors.length;
	    while (i)
	        if (unhandledErrors[--i]._value === promise._value) {
	            // Found a promise that failed with this same error object pointer,
	            // Remove that since there is a listener that actually takes care of it.
	            unhandledErrors.splice(i, 1);
	            return;
	        }
	}
	function PromiseReject(reason) {
	    return new Promise$1(INTERNAL, false, reason);
	}
	function wrap(fn, errorCatcher) {
	    var psd = PSD;
	    return function () {
	        var wasRootExec = beginMicroTickScope(), outerScope = PSD;
	        try {
	            switchToZone(psd, true);
	            return fn.apply(this, arguments);
	        }
	        catch (e) {
	            errorCatcher && errorCatcher(e);
	        }
	        finally {
	            switchToZone(outerScope, false);
	            if (wasRootExec)
	                endMicroTickScope();
	        }
	    };
	}
	//
	// variables used for native await support
	//
	var task = { awaits: 0, echoes: 0, id: 0 }; // The ongoing macro-task when using zone-echoing.
	var taskCounter = 0; // ID counter for macro tasks.
	var zoneStack = []; // Stack of left zones to restore asynchronically.
	var zoneEchoes = 0; // zoneEchoes is a must in order to persist zones between native await expressions.
	var totalEchoes = 0; // ID counter for micro-tasks. Used to detect possible native await in our Promise.prototype.then.
	var zone_id_counter = 0;
	function newScope(fn, props$$1, a1, a2) {
	    var parent = PSD, psd = Object.create(parent);
	    psd.parent = parent;
	    psd.ref = 0;
	    psd.global = false;
	    psd.id = ++zone_id_counter;
	    // Prepare for promise patching (done in usePSD):
	    var globalEnv = globalPSD.env;
	    psd.env = patchGlobalPromise ? {
	        Promise: Promise$1,
	        PromiseProp: { value: Promise$1, configurable: true, writable: true },
	        all: Promise$1.all,
	        race: Promise$1.race,
	        resolve: Promise$1.resolve,
	        reject: Promise$1.reject,
	        nthen: getPatchedPromiseThen(globalEnv.nthen, psd),
	        gthen: getPatchedPromiseThen(globalEnv.gthen, psd) // global then
	    } : {};
	    if (props$$1)
	        extend(psd, props$$1);
	    // unhandleds and onunhandled should not be specifically set here.
	    // Leave them on parent prototype.
	    // unhandleds.push(err) will push to parent's prototype
	    // onunhandled() will call parents onunhandled (with this scope's this-pointer though!)
	    ++parent.ref;
	    psd.finalize = function () {
	        --this.parent.ref || this.parent.finalize();
	    };
	    var rv = usePSD(psd, fn, a1, a2);
	    if (psd.ref === 0)
	        psd.finalize();
	    return rv;
	}
	// Function to call if scopeFunc returns NativePromise
	// Also for each NativePromise in the arguments to Promise.all()
	function incrementExpectedAwaits() {
	    if (!task.id)
	        task.id = ++taskCounter;
	    ++task.awaits;
	    task.echoes += ZONE_ECHO_LIMIT;
	    return task.id;
	}
	// Function to call when 'then' calls back on a native promise where onAwaitExpected() had been called.
	// Also call this when a native await calls then method on a promise. In that case, don't supply
	// sourceTaskId because we already know it refers to current task.
	function decrementExpectedAwaits(sourceTaskId) {
	    if (!task.awaits || (sourceTaskId && sourceTaskId !== task.id))
	        return;
	    if (--task.awaits === 0)
	        task.id = 0;
	    task.echoes = task.awaits * ZONE_ECHO_LIMIT; // Will reset echoes to 0 if awaits is 0.
	}
	// Call from Promise.all() and Promise.race()
	function onPossibleParallellAsync(possiblePromise) {
	    if (task.echoes && possiblePromise && possiblePromise.constructor === NativePromise) {
	        incrementExpectedAwaits();
	        return possiblePromise.then(function (x) {
	            decrementExpectedAwaits();
	            return x;
	        }, function (e) {
	            decrementExpectedAwaits();
	            return rejection(e);
	        });
	    }
	    return possiblePromise;
	}
	function zoneEnterEcho(targetZone) {
	    ++totalEchoes;
	    if (!task.echoes || --task.echoes === 0) {
	        task.echoes = task.id = 0; // Cancel zone echoing.
	    }
	    zoneStack.push(PSD);
	    switchToZone(targetZone, true);
	}
	function zoneLeaveEcho() {
	    var zone = zoneStack[zoneStack.length - 1];
	    zoneStack.pop();
	    switchToZone(zone, false);
	}
	function switchToZone(targetZone, bEnteringZone) {
	    var currentZone = PSD;
	    if (bEnteringZone ? task.echoes && (!zoneEchoes++ || targetZone !== PSD) : zoneEchoes && (!--zoneEchoes || targetZone !== PSD)) {
	        // Enter or leave zone asynchronically as well, so that tasks initiated during current tick
	        // will be surrounded by the zone when they are invoked.
	        enqueueNativeMicroTask(bEnteringZone ? zoneEnterEcho.bind(null, targetZone) : zoneLeaveEcho);
	    }
	    if (targetZone === PSD)
	        return;
	    PSD = targetZone; // The actual zone switch occurs at this line.
	    // Snapshot on every leave from global zone.
	    if (currentZone === globalPSD)
	        globalPSD.env = snapShot();
	    if (patchGlobalPromise) {
	        // Let's patch the global and native Promises (may be same or may be different)
	        var GlobalPromise = globalPSD.env.Promise;
	        // Swich environments (may be PSD-zone or the global zone. Both apply.)
	        var targetEnv = targetZone.env;
	        // Change Promise.prototype.then for native and global Promise (they MAY differ on polyfilled environments, but both can be accessed)
	        // Must be done on each zone change because the patched method contains targetZone in its closure.
	        nativePromiseProto.then = targetEnv.nthen;
	        GlobalPromise.prototype.then = targetEnv.gthen;
	        if (currentZone.global || targetZone.global) {
	            // Leaving or entering global zone. It's time to patch / restore global Promise.
	            // Set this Promise to window.Promise so that transiled async functions will work on Firefox, Safari and IE, as well as with Zonejs and angular.
	            Object.defineProperty(_global$1, 'Promise', targetEnv.PromiseProp);
	            // Support Promise.all() etc to work indexedDB-safe also when people are including es6-promise as a module (they might
	            // not be accessing global.Promise but a local reference to it)
	            GlobalPromise.all = targetEnv.all;
	            GlobalPromise.race = targetEnv.race;
	            GlobalPromise.resolve = targetEnv.resolve;
	            GlobalPromise.reject = targetEnv.reject;
	        }
	    }
	}
	function snapShot() {
	    var GlobalPromise = _global$1.Promise;
	    return patchGlobalPromise ? {
	        Promise: GlobalPromise,
	        PromiseProp: Object.getOwnPropertyDescriptor(_global$1, "Promise"),
	        all: GlobalPromise.all,
	        race: GlobalPromise.race,
	        resolve: GlobalPromise.resolve,
	        reject: GlobalPromise.reject,
	        nthen: nativePromiseProto.then,
	        gthen: GlobalPromise.prototype.then
	    } : {};
	}
	function usePSD(psd, fn, a1, a2, a3) {
	    var outerScope = PSD;
	    try {
	        switchToZone(psd, true);
	        return fn(a1, a2, a3);
	    }
	    finally {
	        switchToZone(outerScope, false);
	    }
	}
	function enqueueNativeMicroTask(job) {
	    //
	    // Precondition: nativePromiseThen !== undefined
	    //
	    nativePromiseThen.call(resolvedNativePromise, job);
	}
	function nativeAwaitCompatibleWrap(fn, zone, possibleAwait) {
	    return typeof fn !== 'function' ? fn : function () {
	        var outerZone = PSD;
	        if (possibleAwait)
	            incrementExpectedAwaits();
	        switchToZone(zone, true);
	        try {
	            return fn.apply(this, arguments);
	        }
	        finally {
	            switchToZone(outerZone, false);
	        }
	    };
	}
	function getPatchedPromiseThen(origThen, zone) {
	    return function (onResolved, onRejected) {
	        return origThen.call(this, nativeAwaitCompatibleWrap(onResolved, zone, false), nativeAwaitCompatibleWrap(onRejected, zone, false));
	    };
	}
	var UNHANDLEDREJECTION = "unhandledrejection";
	function globalError(err, promise) {
	    var rv;
	    try {
	        rv = promise.onuncatched(err);
	    }
	    catch (e) { }
	    if (rv !== false)
	        try {
	            var event, eventData = { promise: promise, reason: err };
	            if (_global$1.document && document.createEvent) {
	                event = document.createEvent('Event');
	                event.initEvent(UNHANDLEDREJECTION, true, true);
	                extend(event, eventData);
	            }
	            else if (_global$1.CustomEvent) {
	                event = new CustomEvent(UNHANDLEDREJECTION, { detail: eventData });
	                extend(event, eventData);
	            }
	            if (event && _global$1.dispatchEvent) {
	                dispatchEvent(event);
	                if (!_global$1.PromiseRejectionEvent && _global$1.onunhandledrejection)
	                    // No native support for PromiseRejectionEvent but user has set window.onunhandledrejection. Manually call it.
	                    try {
	                        _global$1.onunhandledrejection(event);
	                    }
	                    catch (_) { }
	            }
	            if (!event.defaultPrevented) {
	                console.warn("Unhandled rejection: " + (err.stack || err));
	            }
	        }
	        catch (e) { }
	}
	var rejection = Promise$1.reject;

	function Events(ctx) {
	    var evs = {};
	    var rv = function (eventName, subscriber) {
	        if (subscriber) {
	            // Subscribe. If additional arguments than just the subscriber was provided, forward them as well.
	            var i = arguments.length, args = new Array(i - 1);
	            while (--i)
	                args[i - 1] = arguments[i];
	            evs[eventName].subscribe.apply(null, args);
	            return ctx;
	        }
	        else if (typeof (eventName) === 'string') {
	            // Return interface allowing to fire or unsubscribe from event
	            return evs[eventName];
	        }
	    };
	    rv.addEventType = add;
	    for (var i = 1, l = arguments.length; i < l; ++i) {
	        add(arguments[i]);
	    }
	    return rv;
	    function add(eventName, chainFunction, defaultFunction) {
	        if (typeof eventName === 'object')
	            return addConfiguredEvents(eventName);
	        if (!chainFunction)
	            chainFunction = reverseStoppableEventChain;
	        if (!defaultFunction)
	            defaultFunction = nop;
	        var context = {
	            subscribers: [],
	            fire: defaultFunction,
	            subscribe: function (cb) {
	                if (context.subscribers.indexOf(cb) === -1) {
	                    context.subscribers.push(cb);
	                    context.fire = chainFunction(context.fire, cb);
	                }
	            },
	            unsubscribe: function (cb) {
	                context.subscribers = context.subscribers.filter(function (fn) { return fn !== cb; });
	                context.fire = context.subscribers.reduce(chainFunction, defaultFunction);
	            }
	        };
	        evs[eventName] = rv[eventName] = context;
	        return context;
	    }
	    function addConfiguredEvents(cfg) {
	        // events(this, {reading: [functionChain, nop]});
	        keys(cfg).forEach(function (eventName) {
	            var args = cfg[eventName];
	            if (isArray(args)) {
	                add(eventName, cfg[eventName][0], cfg[eventName][1]);
	            }
	            else if (args === 'asap') {
	                // Rather than approaching event subscription using a functional approach, we here do it in a for-loop where subscriber is executed in its own stack
	                // enabling that any exception that occur wont disturb the initiator and also not nescessary be catched and forgotten.
	                var context = add(eventName, mirror, function fire() {
	                    // Optimazation-safe cloning of arguments into args.
	                    var i = arguments.length, args = new Array(i);
	                    while (i--)
	                        args[i] = arguments[i];
	                    // All each subscriber:
	                    context.subscribers.forEach(function (fn) {
	                        asap(function fireEvent() {
	                            fn.apply(null, args);
	                        });
	                    });
	                });
	            }
	            else
	                throw new exceptions.InvalidArgument("Invalid event config");
	        });
	    }
	}

	/*
	 * Dexie.js - a minimalistic wrapper for IndexedDB
	 * ===============================================
	 *
	 * Copyright (c) 2014-2017 David Fahlander
	 *
	 * Version {version}, {date}
	 *
	 * http://dexie.org
	 *
	 * Apache License Version 2.0, January 2004, http://www.apache.org/licenses/LICENSE-2.0
	 *
	 */
	var DEXIE_VERSION = '{version}';
	var maxString = String.fromCharCode(65535);
	var maxKey = (function () { try {
	    IDBKeyRange.only([[]]);
	    return [[]];
	}
	catch (e) {
	    return maxString;
	} })();
	var minKey = -Infinity;
	var INVALID_KEY_ARGUMENT = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.";
	var STRING_EXPECTED = "String expected.";
	var connections = [];
	var isIEOrEdge = typeof navigator !== 'undefined' && /(MSIE|Trident|Edge)/.test(navigator.userAgent);
	var hasIEDeleteObjectStoreBug = isIEOrEdge;
	var hangsOnDeleteLargeKeyRange = isIEOrEdge;
	var dexieStackFrameFilter = function (frame) { return !/(dexie\.js|dexie\.min\.js)/.test(frame); };
	var dbNamesDB; // Global database for backing Dexie.getDatabaseNames() on browser without indexedDB.webkitGetDatabaseNames() 
	// Init debug
	setDebug(debug, dexieStackFrameFilter);
	function Dexie(dbName, options) {
	    /// <param name="options" type="Object" optional="true">Specify only if you wich to control which addons that should run on this instance</param>
	    var deps = Dexie.dependencies;
	    var opts = extend({
	        // Default Options
	        addons: Dexie.addons,
	        autoOpen: true,
	        indexedDB: deps.indexedDB,
	        IDBKeyRange: deps.IDBKeyRange // Backend IDBKeyRange api. Default to browser env.
	    }, options);
	    var addons = opts.addons, autoOpen = opts.autoOpen, indexedDB = opts.indexedDB, IDBKeyRange = opts.IDBKeyRange;
	    var globalSchema = this._dbSchema = {};
	    var versions = [];
	    var dbStoreNames = [];
	    var allTables = {};
	    ///<var type="IDBDatabase" />
	    var idbdb = null; // Instance of IDBDatabase
	    var dbOpenError = null;
	    var isBeingOpened = false;
	    var onReadyBeingFired = null;
	    var openComplete = false;
	    var READONLY = "readonly", READWRITE = "readwrite";
	    var db = this;
	    var dbReadyResolve, dbReadyPromise = new Promise$1(function (resolve) {
	        dbReadyResolve = resolve;
	    }), cancelOpen, openCanceller = new Promise$1(function (_, reject) {
	        cancelOpen = reject;
	    });
	    var autoSchema = true;
	    var hasNativeGetDatabaseNames = !!getNativeGetDatabaseNamesFn(indexedDB), hasGetAll;
	    function init() {
	        // Default subscribers to "versionchange" and "blocked".
	        // Can be overridden by custom handlers. If custom handlers return false, these default
	        // behaviours will be prevented.
	        db.on("versionchange", function (ev) {
	            // Default behavior for versionchange event is to close database connection.
	            // Caller can override this behavior by doing db.on("versionchange", function(){ return false; });
	            // Let's not block the other window from making it's delete() or open() call.
	            // NOTE! This event is never fired in IE,Edge or Safari.
	            if (ev.newVersion > 0)
	                console.warn("Another connection wants to upgrade database '" + db.name + "'. Closing db now to resume the upgrade.");
	            else
	                console.warn("Another connection wants to delete database '" + db.name + "'. Closing db now to resume the delete request.");
	            db.close();
	            // In many web applications, it would be recommended to force window.reload()
	            // when this event occurs. To do that, subscribe to the versionchange event
	            // and call window.location.reload(true) if ev.newVersion > 0 (not a deletion)
	            // The reason for this is that your current web app obviously has old schema code that needs
	            // to be updated. Another window got a newer version of the app and needs to upgrade DB but
	            // your window is blocking it unless we close it here.
	        });
	        db.on("blocked", function (ev) {
	            if (!ev.newVersion || ev.newVersion < ev.oldVersion)
	                console.warn("Dexie.delete('" + db.name + "') was blocked");
	            else
	                console.warn("Upgrade '" + db.name + "' blocked by other connection holding version " + ev.oldVersion / 10);
	        });
	    }
	    //
	    //
	    //
	    // ------------------------- Versioning Framework---------------------------
	    //
	    //
	    //
	    this.version = function (versionNumber) {
	        /// <param name="versionNumber" type="Number"></param>
	        /// <returns type="Version"></returns>
	        if (idbdb || isBeingOpened)
	            throw new exceptions.Schema("Cannot add version when database is open");
	        this.verno = Math.max(this.verno, versionNumber);
	        var versionInstance = versions.filter(function (v) { return v._cfg.version === versionNumber; })[0];
	        if (versionInstance)
	            return versionInstance;
	        versionInstance = new Version(versionNumber);
	        versions.push(versionInstance);
	        versions.sort(lowerVersionFirst);
	        // Disable autoschema mode, as at least one version is specified.
	        autoSchema = false;
	        return versionInstance;
	    };
	    function Version(versionNumber) {
	        this._cfg = {
	            version: versionNumber,
	            storesSource: null,
	            dbschema: {},
	            tables: {},
	            contentUpgrade: null
	        };
	        this.stores({}); // Derive earlier schemas by default.
	    }
	    extend(Version.prototype, {
	        stores: function (stores) {
	            /// <summary>
	            ///   Defines the schema for a particular version
	            /// </summary>
	            /// <param name="stores" type="Object">
	            /// Example: <br/>
	            ///   {users: "id++,first,last,&amp;username,*email", <br/>
	            ///   passwords: "id++,&amp;username"}<br/>
	            /// <br/>
	            /// Syntax: {Table: "[primaryKey][++],[&amp;][*]index1,[&amp;][*]index2,..."}<br/><br/>
	            /// Special characters:<br/>
	            ///  "&amp;"  means unique key, <br/>
	            ///  "*"  means value is multiEntry, <br/>
	            ///  "++" means auto-increment and only applicable for primary key <br/>
	            /// </param>
	            this._cfg.storesSource = this._cfg.storesSource ? extend(this._cfg.storesSource, stores) : stores;
	            // Derive stores from earlier versions if they are not explicitely specified as null or a new syntax.
	            var storesSpec = {};
	            versions.forEach(function (version) {
	                extend(storesSpec, version._cfg.storesSource);
	            });
	            var dbschema = (this._cfg.dbschema = {});
	            this._parseStoresSpec(storesSpec, dbschema);
	            // Update the latest schema to this version
	            // Update API
	            globalSchema = db._dbSchema = dbschema;
	            removeTablesApi([allTables, db, Transaction.prototype]); // Keep Transaction.prototype even though it should be depr.
	            setApiOnPlace([allTables, db, Transaction.prototype, this._cfg.tables], keys(dbschema), dbschema);
	            dbStoreNames = keys(dbschema);
	            return this;
	        },
	        upgrade: function (upgradeFunction) {
	            this._cfg.contentUpgrade = upgradeFunction;
	            return this;
	        },
	        _parseStoresSpec: function (stores, outSchema) {
	            keys(stores).forEach(function (tableName) {
	                if (stores[tableName] !== null) {
	                    var instanceTemplate = {};
	                    var indexes = parseIndexSyntax(stores[tableName]);
	                    var primKey = indexes.shift();
	                    if (primKey.multi)
	                        throw new exceptions.Schema("Primary key cannot be multi-valued");
	                    if (primKey.keyPath)
	                        setByKeyPath(instanceTemplate, primKey.keyPath, primKey.auto ? 0 : primKey.keyPath);
	                    indexes.forEach(function (idx) {
	                        if (idx.auto)
	                            throw new exceptions.Schema("Only primary key can be marked as autoIncrement (++)");
	                        if (!idx.keyPath)
	                            throw new exceptions.Schema("Index must have a name and cannot be an empty string");
	                        setByKeyPath(instanceTemplate, idx.keyPath, idx.compound ? idx.keyPath.map(function () { return ""; }) : "");
	                    });
	                    outSchema[tableName] = new TableSchema(tableName, primKey, indexes, instanceTemplate);
	                }
	            });
	        }
	    });
	    function runUpgraders(oldVersion, idbtrans, reject) {
	        var trans = db._createTransaction(READWRITE, dbStoreNames, globalSchema);
	        trans.create(idbtrans);
	        trans._completion.catch(reject);
	        var rejectTransaction = trans._reject.bind(trans);
	        newScope(function () {
	            PSD.trans = trans;
	            if (oldVersion === 0) {
	                // Create tables:
	                keys(globalSchema).forEach(function (tableName) {
	                    createTable(idbtrans, tableName, globalSchema[tableName].primKey, globalSchema[tableName].indexes);
	                });
	                Promise$1.follow(function () { return db.on.populate.fire(trans); }).catch(rejectTransaction);
	            }
	            else
	                updateTablesAndIndexes(oldVersion, trans, idbtrans).catch(rejectTransaction);
	        });
	    }
	    function updateTablesAndIndexes(oldVersion, trans, idbtrans) {
	        // Upgrade version to version, step-by-step from oldest to newest version.
	        // Each transaction object will contain the table set that was current in that version (but also not-yet-deleted tables from its previous version)
	        var queue = [];
	        var oldVersionStruct = versions.filter(function (version) { return version._cfg.version === oldVersion; })[0];
	        if (!oldVersionStruct)
	            throw new exceptions.Upgrade("Dexie specification of currently installed DB version is missing");
	        globalSchema = db._dbSchema = oldVersionStruct._cfg.dbschema;
	        var anyContentUpgraderHasRun = false;
	        var versToRun = versions.filter(function (v) { return v._cfg.version > oldVersion; });
	        versToRun.forEach(function (version) {
	            /// <param name="version" type="Version"></param>
	            queue.push(function () {
	                var oldSchema = globalSchema;
	                var newSchema = version._cfg.dbschema;
	                adjustToExistingIndexNames(oldSchema, idbtrans);
	                adjustToExistingIndexNames(newSchema, idbtrans);
	                globalSchema = db._dbSchema = newSchema;
	                var diff = getSchemaDiff(oldSchema, newSchema);
	                // Add tables           
	                diff.add.forEach(function (tuple) {
	                    createTable(idbtrans, tuple[0], tuple[1].primKey, tuple[1].indexes);
	                });
	                // Change tables
	                diff.change.forEach(function (change) {
	                    if (change.recreate) {
	                        throw new exceptions.Upgrade("Not yet support for changing primary key");
	                    }
	                    else {
	                        var store = idbtrans.objectStore(change.name);
	                        // Add indexes
	                        change.add.forEach(function (idx) {
	                            addIndex(store, idx);
	                        });
	                        // Update indexes
	                        change.change.forEach(function (idx) {
	                            store.deleteIndex(idx.name);
	                            addIndex(store, idx);
	                        });
	                        // Delete indexes
	                        change.del.forEach(function (idxName) {
	                            store.deleteIndex(idxName);
	                        });
	                    }
	                });
	                if (version._cfg.contentUpgrade) {
	                    anyContentUpgraderHasRun = true;
	                    return Promise$1.follow(function () {
	                        version._cfg.contentUpgrade(trans);
	                    });
	                }
	            });
	            queue.push(function (idbtrans) {
	                if (!anyContentUpgraderHasRun || !hasIEDeleteObjectStoreBug) {
	                    var newSchema = version._cfg.dbschema;
	                    // Delete old tables
	                    deleteRemovedTables(newSchema, idbtrans);
	                }
	            });
	        });
	        // Now, create a queue execution engine
	        function runQueue() {
	            return queue.length ? Promise$1.resolve(queue.shift()(trans.idbtrans)).then(runQueue) :
	                Promise$1.resolve();
	        }
	        return runQueue().then(function () {
	            createMissingTables(globalSchema, idbtrans); // At last, make sure to create any missing tables. (Needed by addons that add stores to DB without specifying version)
	        });
	    }
	    function getSchemaDiff(oldSchema, newSchema) {
	        var diff = {
	            del: [],
	            add: [],
	            change: [] // Array of {name: tableName, recreate: newDefinition, del: delIndexNames, add: newIndexDefs, change: changedIndexDefs}
	        };
	        for (var table in oldSchema) {
	            if (!newSchema[table])
	                diff.del.push(table);
	        }
	        for (table in newSchema) {
	            var oldDef = oldSchema[table], newDef = newSchema[table];
	            if (!oldDef) {
	                diff.add.push([table, newDef]);
	            }
	            else {
	                var change = {
	                    name: table,
	                    def: newDef,
	                    recreate: false,
	                    del: [],
	                    add: [],
	                    change: []
	                };
	                if (oldDef.primKey.src !== newDef.primKey.src) {
	                    // Primary key has changed. Remove and re-add table.
	                    change.recreate = true;
	                    diff.change.push(change);
	                }
	                else {
	                    // Same primary key. Just find out what differs:
	                    var oldIndexes = oldDef.idxByName;
	                    var newIndexes = newDef.idxByName;
	                    for (var idxName in oldIndexes) {
	                        if (!newIndexes[idxName])
	                            change.del.push(idxName);
	                    }
	                    for (idxName in newIndexes) {
	                        var oldIdx = oldIndexes[idxName], newIdx = newIndexes[idxName];
	                        if (!oldIdx)
	                            change.add.push(newIdx);
	                        else if (oldIdx.src !== newIdx.src)
	                            change.change.push(newIdx);
	                    }
	                    if (change.del.length > 0 || change.add.length > 0 || change.change.length > 0) {
	                        diff.change.push(change);
	                    }
	                }
	            }
	        }
	        return diff;
	    }
	    function createTable(idbtrans, tableName, primKey, indexes) {
	        /// <param name="idbtrans" type="IDBTransaction"></param>
	        var store = idbtrans.db.createObjectStore(tableName, primKey.keyPath ? { keyPath: primKey.keyPath, autoIncrement: primKey.auto } : { autoIncrement: primKey.auto });
	        indexes.forEach(function (idx) { addIndex(store, idx); });
	        return store;
	    }
	    function createMissingTables(newSchema, idbtrans) {
	        keys(newSchema).forEach(function (tableName) {
	            if (!idbtrans.db.objectStoreNames.contains(tableName)) {
	                createTable(idbtrans, tableName, newSchema[tableName].primKey, newSchema[tableName].indexes);
	            }
	        });
	    }
	    function deleteRemovedTables(newSchema, idbtrans) {
	        for (var i = 0; i < idbtrans.db.objectStoreNames.length; ++i) {
	            var storeName = idbtrans.db.objectStoreNames[i];
	            if (newSchema[storeName] == null) {
	                idbtrans.db.deleteObjectStore(storeName);
	            }
	        }
	    }
	    function addIndex(store, idx) {
	        store.createIndex(idx.name, idx.keyPath, { unique: idx.unique, multiEntry: idx.multi });
	    }
	    //
	    //
	    //      Dexie Protected API
	    //
	    //
	    this._allTables = allTables;
	    this._createTransaction = function (mode, storeNames, dbschema, parentTransaction) {
	        return new Transaction(mode, storeNames, dbschema, parentTransaction);
	    };
	    /* Generate a temporary transaction when db operations are done outside a transaction scope.
	    */
	    function tempTransaction(mode, storeNames, fn) {
	        if (!openComplete && (!PSD.letThrough)) {
	            if (!isBeingOpened) {
	                if (!autoOpen)
	                    return rejection(new exceptions.DatabaseClosed());
	                db.open().catch(nop); // Open in background. If if fails, it will be catched by the final promise anyway.
	            }
	            return dbReadyPromise.then(function () { return tempTransaction(mode, storeNames, fn); });
	        }
	        else {
	            var trans = db._createTransaction(mode, storeNames, globalSchema);
	            try {
	                trans.create();
	            }
	            catch (ex) {
	                return rejection(ex);
	            }
	            return trans._promise(mode, function (resolve, reject) {
	                return newScope(function () {
	                    PSD.trans = trans;
	                    return fn(resolve, reject, trans);
	                });
	            }).then(function (result) {
	                // Instead of resolving value directly, wait with resolving it until transaction has completed.
	                // Otherwise the data would not be in the DB if requesting it in the then() operation.
	                // Specifically, to ensure that the following expression will work:
	                //
	                //   db.friends.put({name: "Arne"}).then(function () {
	                //       db.friends.where("name").equals("Arne").count(function(count) {
	                //           assert (count === 1);
	                //       });
	                //   });
	                //
	                return trans._completion.then(function () { return result; });
	            }); /*.catch(err => { // Don't do this as of now. If would affect bulk- and modify methods in a way that could be more intuitive. But wait! Maybe change in next major.
	                trans._reject(err);
	                return rejection(err);
	            });*/
	        }
	    }
	    this._whenReady = function (fn) {
	        return openComplete || PSD.letThrough ? fn() : new Promise$1(function (resolve, reject) {
	            if (!isBeingOpened) {
	                if (!autoOpen) {
	                    reject(new exceptions.DatabaseClosed());
	                    return;
	                }
	                db.open().catch(nop); // Open in background. If if fails, it will be catched by the final promise anyway.
	            }
	            dbReadyPromise.then(resolve, reject);
	        }).then(fn);
	    };
	    //
	    //
	    //
	    //
	    //      Dexie API
	    //
	    //
	    //
	    this.verno = 0;
	    this.open = function () {
	        if (isBeingOpened || idbdb)
	            return dbReadyPromise.then(function () { return dbOpenError ? rejection(dbOpenError) : db; });
	        debug && (openCanceller._stackHolder = getErrorWithStack()); // Let stacks point to when open() was called rather than where new Dexie() was called.
	        isBeingOpened = true;
	        dbOpenError = null;
	        openComplete = false;
	        // Function pointers to call when the core opening process completes.
	        var resolveDbReady = dbReadyResolve, 
	        // upgradeTransaction to abort on failure.
	        upgradeTransaction = null;
	        return Promise$1.race([openCanceller, new Promise$1(function (resolve, reject) {
	                // Multiply db.verno with 10 will be needed to workaround upgrading bug in IE:
	                // IE fails when deleting objectStore after reading from it.
	                // A future version of Dexie.js will stopover an intermediate version to workaround this.
	                // At that point, we want to be backward compatible. Could have been multiplied with 2, but by using 10, it is easier to map the number to the real version number.
	                // If no API, throw!
	                if (!indexedDB)
	                    throw new exceptions.MissingAPI("indexedDB API not found. If using IE10+, make sure to run your code on a server URL " +
	                        "(not locally). If using old Safari versions, make sure to include indexedDB polyfill.");
	                var req = autoSchema ? indexedDB.open(dbName) : indexedDB.open(dbName, Math.round(db.verno * 10));
	                if (!req)
	                    throw new exceptions.MissingAPI("IndexedDB API not available"); // May happen in Safari private mode, see https://github.com/dfahlander/Dexie.js/issues/134
	                req.onerror = eventRejectHandler(reject);
	                req.onblocked = wrap(fireOnBlocked);
	                req.onupgradeneeded = wrap(function (e) {
	                    upgradeTransaction = req.transaction;
	                    if (autoSchema && !db._allowEmptyDB) {
	                        // Caller did not specify a version or schema. Doing that is only acceptable for opening alread existing databases.
	                        // If onupgradeneeded is called it means database did not exist. Reject the open() promise and make sure that we
	                        // do not create a new database by accident here.
	                        req.onerror = preventDefault; // Prohibit onabort error from firing before we're done!
	                        upgradeTransaction.abort(); // Abort transaction (would hope that this would make DB disappear but it doesnt.)
	                        // Close database and delete it.
	                        req.result.close();
	                        var delreq = indexedDB.deleteDatabase(dbName); // The upgrade transaction is atomic, and javascript is single threaded - meaning that there is no risk that we delete someone elses database here!
	                        delreq.onsuccess = delreq.onerror = wrap(function () {
	                            reject(new exceptions.NoSuchDatabase("Database " + dbName + " doesnt exist"));
	                        });
	                    }
	                    else {
	                        upgradeTransaction.onerror = eventRejectHandler(reject);
	                        var oldVer = e.oldVersion > Math.pow(2, 62) ? 0 : e.oldVersion; // Safari 8 fix.
	                        runUpgraders(oldVer / 10, upgradeTransaction, reject, req);
	                    }
	                }, reject);
	                req.onsuccess = wrap(function () {
	                    // Core opening procedure complete. Now let's just record some stuff.
	                    upgradeTransaction = null;
	                    idbdb = req.result;
	                    connections.push(db); // Used for emulating versionchange event on IE/Edge/Safari.
	                    if (autoSchema)
	                        readGlobalSchema();
	                    else if (idbdb.objectStoreNames.length > 0) {
	                        try {
	                            adjustToExistingIndexNames(globalSchema, idbdb.transaction(safariMultiStoreFix(idbdb.objectStoreNames), READONLY));
	                        }
	                        catch (e) {
	                            // Safari may bail out if > 1 store names. However, this shouldnt be a showstopper. Issue #120.
	                        }
	                    }
	                    idbdb.onversionchange = wrap(function (ev) {
	                        db._vcFired = true; // detect implementations that not support versionchange (IE/Edge/Safari)
	                        db.on("versionchange").fire(ev);
	                    });
	                    if (!hasNativeGetDatabaseNames && dbName !== '__dbnames') {
	                        dbNamesDB.dbnames.put({ name: dbName }).catch(nop);
	                    }
	                    resolve();
	                }, reject);
	            })]).then(function () {
	            // Before finally resolving the dbReadyPromise and this promise,
	            // call and await all on('ready') subscribers:
	            // Dexie.vip() makes subscribers able to use the database while being opened.
	            // This is a must since these subscribers take part of the opening procedure.
	            onReadyBeingFired = [];
	            return Promise$1.resolve(Dexie.vip(db.on.ready.fire)).then(function fireRemainders() {
	                if (onReadyBeingFired.length > 0) {
	                    // In case additional subscribers to db.on('ready') were added during the time db.on.ready.fire was executed.
	                    var remainders = onReadyBeingFired.reduce(promisableChain, nop);
	                    onReadyBeingFired = [];
	                    return Promise$1.resolve(Dexie.vip(remainders)).then(fireRemainders);
	                }
	            });
	        }).finally(function () {
	            onReadyBeingFired = null;
	        }).then(function () {
	            // Resolve the db.open() with the db instance.
	            isBeingOpened = false;
	            return db;
	        }).catch(function (err) {
	            try {
	                // Did we fail within onupgradeneeded? Make sure to abort the upgrade transaction so it doesnt commit.
	                upgradeTransaction && upgradeTransaction.abort();
	            }
	            catch (e) { }
	            isBeingOpened = false; // Set before calling db.close() so that it doesnt reject openCanceller again (leads to unhandled rejection event).
	            db.close(); // Closes and resets idbdb, removes connections, resets dbReadyPromise and openCanceller so that a later db.open() is fresh.
	            // A call to db.close() may have made on-ready subscribers fail. Use dbOpenError if set, since err could be a follow-up error on that.
	            dbOpenError = err; // Record the error. It will be used to reject further promises of db operations.
	            return rejection(dbOpenError);
	        }).finally(function () {
	            openComplete = true;
	            resolveDbReady(); // dbReadyPromise is resolved no matter if open() rejects or resolved. It's just to wake up waiters.
	        });
	    };
	    this.close = function () {
	        var idx = connections.indexOf(db);
	        if (idx >= 0)
	            connections.splice(idx, 1);
	        if (idbdb) {
	            try {
	                idbdb.close();
	            }
	            catch (e) { }
	            idbdb = null;
	        }
	        autoOpen = false;
	        dbOpenError = new exceptions.DatabaseClosed();
	        if (isBeingOpened)
	            cancelOpen(dbOpenError);
	        // Reset dbReadyPromise promise:
	        dbReadyPromise = new Promise$1(function (resolve) {
	            dbReadyResolve = resolve;
	        });
	        openCanceller = new Promise$1(function (_, reject) {
	            cancelOpen = reject;
	        });
	    };
	    this.delete = function () {
	        var hasArguments = arguments.length > 0;
	        return new Promise$1(function (resolve, reject) {
	            if (hasArguments)
	                throw new exceptions.InvalidArgument("Arguments not allowed in db.delete()");
	            if (isBeingOpened) {
	                dbReadyPromise.then(doDelete);
	            }
	            else {
	                doDelete();
	            }
	            function doDelete() {
	                db.close();
	                var req = indexedDB.deleteDatabase(dbName);
	                req.onsuccess = wrap(function () {
	                    if (!hasNativeGetDatabaseNames) {
	                        dbNamesDB.dbnames.delete(dbName).catch(nop);
	                    }
	                    resolve();
	                });
	                req.onerror = eventRejectHandler(reject);
	                req.onblocked = fireOnBlocked;
	            }
	        });
	    };
	    this.backendDB = function () {
	        return idbdb;
	    };
	    this.isOpen = function () {
	        return idbdb !== null;
	    };
	    this.hasBeenClosed = function () {
	        return dbOpenError && (dbOpenError instanceof exceptions.DatabaseClosed);
	    };
	    this.hasFailed = function () {
	        return dbOpenError !== null;
	    };
	    this.dynamicallyOpened = function () {
	        return autoSchema;
	    };
	    //
	    // Properties
	    //
	    this.name = dbName;
	    // db.tables - an array of all Table instances.
	    props(this, {
	        tables: {
	            get: function () {
	                /// <returns type="Array" elementType="Table" />
	                return keys(allTables).map(function (name) { return allTables[name]; });
	            }
	        }
	    });
	    //
	    // Events
	    //
	    this.on = Events(this, "populate", "blocked", "versionchange", { ready: [promisableChain, nop] });
	    this.on.ready.subscribe = override(this.on.ready.subscribe, function (subscribe) {
	        return function (subscriber, bSticky) {
	            Dexie.vip(function () {
	                if (openComplete) {
	                    // Database already open. Call subscriber asap.
	                    if (!dbOpenError)
	                        Promise$1.resolve().then(subscriber);
	                    // bSticky: Also subscribe to future open sucesses (after close / reopen) 
	                    if (bSticky)
	                        subscribe(subscriber);
	                }
	                else if (onReadyBeingFired) {
	                    // db.on('ready') subscribers are currently being executed and have not yet resolved or rejected
	                    onReadyBeingFired.push(subscriber);
	                    if (bSticky)
	                        subscribe(subscriber);
	                }
	                else {
	                    // Database not yet open. Subscribe to it.
	                    subscribe(subscriber);
	                    // If bSticky is falsy, make sure to unsubscribe subscriber when fired once.
	                    if (!bSticky)
	                        subscribe(function unsubscribe() {
	                            db.on.ready.unsubscribe(subscriber);
	                            db.on.ready.unsubscribe(unsubscribe);
	                        });
	                }
	            });
	        };
	    });
	    this.transaction = function () {
	        /// <summary>
	        ///
	        /// </summary>
	        /// <param name="mode" type="String">"r" for readonly, or "rw" for readwrite</param>
	        /// <param name="tableInstances">Table instance, Array of Table instances, String or String Array of object stores to include in the transaction</param>
	        /// <param name="scopeFunc" type="Function">Function to execute with transaction</param>
	        var args = extractTransactionArgs.apply(this, arguments);
	        return this._transaction.apply(this, args);
	    };
	    function extractTransactionArgs(mode, _tableArgs_, scopeFunc) {
	        // Let table arguments be all arguments between mode and last argument.
	        var i = arguments.length;
	        if (i < 2)
	            throw new exceptions.InvalidArgument("Too few arguments");
	        // Prevent optimzation killer (https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments)
	        // and clone arguments except the first one into local var 'args'.
	        var args = new Array(i - 1);
	        while (--i)
	            args[i - 1] = arguments[i];
	        // Let scopeFunc be the last argument and pop it so that args now only contain the table arguments.
	        scopeFunc = args.pop();
	        var tables = flatten(args); // Support using array as middle argument, or a mix of arrays and non-arrays.
	        return [mode, tables, scopeFunc];
	    }
	    this._transaction = function (mode, tables, scopeFunc) {
	        var parentTransaction = PSD.trans;
	        // Check if parent transactions is bound to this db instance, and if caller wants to reuse it
	        if (!parentTransaction || parentTransaction.db !== db || mode.indexOf('!') !== -1)
	            parentTransaction = null;
	        var onlyIfCompatible = mode.indexOf('?') !== -1;
	        mode = mode.replace('!', '').replace('?', ''); // Ok. Will change arguments[0] as well but we wont touch arguments henceforth.
	        try {
	            //
	            // Get storeNames from arguments. Either through given table instances, or through given table names.
	            //
	            var storeNames = tables.map(function (table) {
	                var storeName = table instanceof Table ? table.name : table;
	                if (typeof storeName !== 'string')
	                    throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
	                return storeName;
	            });
	            //
	            // Resolve mode. Allow shortcuts "r" and "rw".
	            //
	            if (mode == "r" || mode == READONLY)
	                mode = READONLY;
	            else if (mode == "rw" || mode == READWRITE)
	                mode = READWRITE;
	            else
	                throw new exceptions.InvalidArgument("Invalid transaction mode: " + mode);
	            if (parentTransaction) {
	                // Basic checks
	                if (parentTransaction.mode === READONLY && mode === READWRITE) {
	                    if (onlyIfCompatible) {
	                        // Spawn new transaction instead.
	                        parentTransaction = null;
	                    }
	                    else
	                        throw new exceptions.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
	                }
	                if (parentTransaction) {
	                    storeNames.forEach(function (storeName) {
	                        if (parentTransaction && parentTransaction.storeNames.indexOf(storeName) === -1) {
	                            if (onlyIfCompatible) {
	                                // Spawn new transaction instead.
	                                parentTransaction = null;
	                            }
	                            else
	                                throw new exceptions.SubTransaction("Table " + storeName +
	                                    " not included in parent transaction.");
	                        }
	                    });
	                }
	                if (onlyIfCompatible && parentTransaction && !parentTransaction.active) {
	                    // '?' mode should not keep using an inactive transaction.
	                    parentTransaction = null;
	                }
	            }
	        }
	        catch (e) {
	            return parentTransaction ?
	                parentTransaction._promise(null, function (_, reject) { reject(e); }) :
	                rejection(e);
	        }
	        // If this is a sub-transaction, lock the parent and then launch the sub-transaction.
	        return (parentTransaction ?
	            parentTransaction._promise(mode, enterTransactionScope, "lock") :
	            PSD.trans ?
	                // no parent transaction despite PSD.trans exists. Make sure also
	                // that the zone we create is not a sub-zone of current, because
	                // Promise.follow() should not wait for it if so.
	                usePSD(PSD.transless, function () { return db._whenReady(enterTransactionScope); }) :
	                db._whenReady(enterTransactionScope));
	        function enterTransactionScope() {
	            return Promise$1.resolve().then(function () {
	                // Keep a pointer to last non-transactional PSD to use if someone calls Dexie.ignoreTransaction().
	                var transless = PSD.transless || PSD;
	                // Our transaction.
	                //return new Promise((resolve, reject) => {
	                var trans = db._createTransaction(mode, storeNames, globalSchema, parentTransaction);
	                // Let the transaction instance be part of a Promise-specific data (PSD) value.
	                var zoneProps = {
	                    trans: trans,
	                    transless: transless
	                };
	                if (parentTransaction) {
	                    // Emulate transaction commit awareness for inner transaction (must 'commit' when the inner transaction has no more operations ongoing)
	                    trans.idbtrans = parentTransaction.idbtrans;
	                }
	                else {
	                    trans.create(); // Create the backend transaction so that complete() or error() will trigger even if no operation is made upon it.
	                }
	                // Support for native async await.
	                if (scopeFunc.constructor === AsyncFunction) {
	                    incrementExpectedAwaits();
	                }
	                var returnValue;
	                var promiseFollowed = Promise$1.follow(function () {
	                    // Finally, call the scope function with our table and transaction arguments.
	                    returnValue = scopeFunc.call(trans, trans);
	                    if (returnValue) {
	                        if (returnValue.constructor === NativePromise) {
	                            var decrementor = decrementExpectedAwaits.bind(null, null);
	                            returnValue.then(decrementor, decrementor);
	                        }
	                        else if (typeof returnValue.next === 'function' && typeof returnValue.throw === 'function') {
	                            // scopeFunc returned an iterator with throw-support. Handle yield as await.
	                            returnValue = awaitIterator(returnValue);
	                        }
	                    }
	                }, zoneProps);
	                return (returnValue && typeof returnValue.then === 'function' ?
	                    // Promise returned. User uses promise-style transactions.
	                    Promise$1.resolve(returnValue).then(function (x) { return trans.active ?
	                        x // Transaction still active. Continue.
	                        : rejection(new exceptions.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn")); })
	                    // No promise returned. Wait for all outstanding promises before continuing. 
	                    : promiseFollowed.then(function () { return returnValue; })).then(function (x) {
	                    // sub transactions don't react to idbtrans.oncomplete. We must trigger a completion:
	                    if (parentTransaction)
	                        trans._resolve();
	                    // wait for trans._completion
	                    // (if root transaction, this means 'complete' event. If sub-transaction, we've just fired it ourselves)
	                    return trans._completion.then(function () { return x; });
	                }).catch(function (e) {
	                    trans._reject(e); // Yes, above then-handler were maybe not called because of an unhandled rejection in scopeFunc!
	                    return rejection(e);
	                });
	            });
	        }
	    };
	    this.table = function (tableName) {
	        /// <returns type="Table"></returns>
	        if (!hasOwn(allTables, tableName)) {
	            throw new exceptions.InvalidTable("Table " + tableName + " does not exist");
	        }
	        return allTables[tableName];
	    };
	    //
	    //
	    //
	    // Table Class
	    //
	    //
	    //
	    function Table(name, tableSchema, optionalTrans) {
	        /// <param name="name" type="String"></param>
	        this.name = name;
	        this.schema = tableSchema;
	        this._tx = optionalTrans;
	        this.hook = allTables[name] ? allTables[name].hook : Events(null, {
	            "creating": [hookCreatingChain, nop],
	            "reading": [pureFunctionChain, mirror],
	            "updating": [hookUpdatingChain, nop],
	            "deleting": [hookDeletingChain, nop]
	        });
	    }
	    function BulkErrorHandlerCatchAll(errorList, done, supportHooks) {
	        return (supportHooks ? hookedEventRejectHandler : eventRejectHandler)(function (e) {
	            errorList.push(e);
	            done && done();
	        });
	    }
	    function bulkDelete(idbstore, trans, keysOrTuples, hasDeleteHook, deletingHook) {
	        // If hasDeleteHook, keysOrTuples must be an array of tuples: [[key1, value2],[key2,value2],...],
	        // else keysOrTuples must be just an array of keys: [key1, key2, ...].
	        return new Promise$1(function (resolve, reject) {
	            var len = keysOrTuples.length, lastItem = len - 1;
	            if (len === 0)
	                return resolve();
	            if (!hasDeleteHook) {
	                for (var i = 0; i < len; ++i) {
	                    var req = idbstore.delete(keysOrTuples[i]);
	                    req.onerror = eventRejectHandler(reject);
	                    if (i === lastItem)
	                        req.onsuccess = wrap(function () { return resolve(); });
	                }
	            }
	            else {
	                var hookCtx, errorHandler = hookedEventRejectHandler(reject), successHandler = hookedEventSuccessHandler(null);
	                tryCatch(function () {
	                    for (var i = 0; i < len; ++i) {
	                        hookCtx = { onsuccess: null, onerror: null };
	                        var tuple = keysOrTuples[i];
	                        deletingHook.call(hookCtx, tuple[0], tuple[1], trans);
	                        var req = idbstore.delete(tuple[0]);
	                        req._hookCtx = hookCtx;
	                        req.onerror = errorHandler;
	                        if (i === lastItem)
	                            req.onsuccess = hookedEventSuccessHandler(resolve);
	                        else
	                            req.onsuccess = successHandler;
	                    }
	                }, function (err) {
	                    hookCtx.onerror && hookCtx.onerror(err);
	                    throw err;
	                });
	            }
	        });
	    }
	    props(Table.prototype, {
	        //
	        // Table Protected Methods
	        //
	        _trans: function getTransaction(mode, fn, writeLocked) {
	            var trans = this._tx || PSD.trans;
	            return trans && trans.db === db ?
	                trans === PSD.trans ?
	                    trans._promise(mode, fn, writeLocked) :
	                    newScope(function () { return trans._promise(mode, fn, writeLocked); }, { trans: trans, transless: PSD.transless || PSD }) :
	                tempTransaction(mode, [this.name], fn);
	        },
	        _idbstore: function getIDBObjectStore(mode, fn, writeLocked) {
	            var tableName = this.name;
	            function supplyIdbStore(resolve, reject, trans) {
	                if (trans.storeNames.indexOf(tableName) === -1)
	                    throw new exceptions.NotFound("Table" + tableName + " not part of transaction");
	                return fn(resolve, reject, trans.idbtrans.objectStore(tableName), trans);
	            }
	            return this._trans(mode, supplyIdbStore, writeLocked);
	        },
	        //
	        // Table Public Methods
	        //
	        get: function (keyOrCrit, cb) {
	            if (keyOrCrit && keyOrCrit.constructor === Object)
	                return this.where(keyOrCrit).first(cb);
	            var self = this;
	            return this._idbstore(READONLY, function (resolve, reject, idbstore) {
	                var req = idbstore.get(keyOrCrit);
	                req.onerror = eventRejectHandler(reject);
	                req.onsuccess = wrap(function () {
	                    resolve(self.hook.reading.fire(req.result));
	                }, reject);
	            }).then(cb);
	        },
	        where: function (indexOrCrit) {
	            if (typeof indexOrCrit === 'string')
	                return new WhereClause(this, indexOrCrit);
	            if (isArray(indexOrCrit))
	                return new WhereClause(this, "[" + indexOrCrit.join('+') + "]");
	            // indexOrCrit is an object map of {[keyPath]:value} 
	            var keyPaths = keys(indexOrCrit);
	            if (keyPaths.length === 1)
	                // Only one critera. This was the easy case:
	                return this
	                    .where(keyPaths[0])
	                    .equals(indexOrCrit[keyPaths[0]]);
	            // Multiple criterias.
	            // Let's try finding a compound index that matches all keyPaths in
	            // arbritary order:
	            var compoundIndex = this.schema.indexes.concat(this.schema.primKey).filter(function (ix) {
	                return ix.compound &&
	                    keyPaths.every(function (keyPath) { return ix.keyPath.indexOf(keyPath) >= 0; }) &&
	                    ix.keyPath.every(function (keyPath) { return keyPaths.indexOf(keyPath) >= 0; });
	            })[0];
	            if (compoundIndex && maxKey !== maxString)
	                // Cool! We found such compound index
	                // and this browser supports compound indexes (maxKey !== maxString)!
	                return this
	                    .where(compoundIndex.name)
	                    .equals(compoundIndex.keyPath.map(function (kp) { return indexOrCrit[kp]; }));
	            if (!compoundIndex)
	                console.warn("The query " + JSON.stringify(indexOrCrit) + " on " + this.name + " would benefit of a " +
	                    ("compound index [" + keyPaths.join('+') + "]"));
	            // Ok, now let's fallback to finding at least one matching index
	            // and filter the rest.
	            var idxByName = this.schema.idxByName;
	            var simpleIndex = keyPaths.reduce(function (r, keyPath) { return [
	                r[0] || idxByName[keyPath],
	                r[0] || !idxByName[keyPath] ?
	                    combine(r[1], function (x) { return '' + getByKeyPath(x, keyPath) ==
	                        '' + indexOrCrit[keyPath]; })
	                    : r[1]
	            ]; }, [null, null]);
	            var idx = simpleIndex[0];
	            return idx ?
	                this.where(idx.name).equals(indexOrCrit[idx.keyPath])
	                    .filter(simpleIndex[1]) :
	                compoundIndex ?
	                    this.filter(simpleIndex[1]) : // Has compound but browser bad. Allow filter.
	                    this.where(keyPaths).equals(''); // No index at all. Fail lazily.
	        },
	        count: function (cb) {
	            return this.toCollection().count(cb);
	        },
	        offset: function (offset) {
	            return this.toCollection().offset(offset);
	        },
	        limit: function (numRows) {
	            return this.toCollection().limit(numRows);
	        },
	        reverse: function () {
	            return this.toCollection().reverse();
	        },
	        filter: function (filterFunction) {
	            return this.toCollection().and(filterFunction);
	        },
	        each: function (fn) {
	            return this.toCollection().each(fn);
	        },
	        toArray: function (cb) {
	            return this.toCollection().toArray(cb);
	        },
	        orderBy: function (index) {
	            return new Collection(new WhereClause(this, isArray(index) ?
	                "[" + index.join('+') + "]" :
	                index));
	        },
	        toCollection: function () {
	            return new Collection(new WhereClause(this));
	        },
	        mapToClass: function (constructor, structure) {
	            /// <summary>
	            ///     Map table to a javascript constructor function. Objects returned from the database will be instances of this class, making
	            ///     it possible to the instanceOf operator as well as extending the class using constructor.prototype.method = function(){...}.
	            /// </summary>
	            /// <param name="constructor">Constructor function representing the class.</param>
	            /// <param name="structure" optional="true">Helps IDE code completion by knowing the members that objects contain and not just the indexes. Also
	            /// know what type each member has. Example: {name: String, emailAddresses: [String], password}</param>
	            this.schema.mappedClass = constructor;
	            var instanceTemplate = Object.create(constructor.prototype);
	            if (structure) {
	                // structure and instanceTemplate is for IDE code competion only while constructor.prototype is for actual inheritance.
	                applyStructure(instanceTemplate, structure);
	            }
	            this.schema.instanceTemplate = instanceTemplate;
	            // Now, subscribe to the when("reading") event to make all objects that come out from this table inherit from given class
	            // no matter which method to use for reading (Table.get() or Table.where(...)... )
	            var readHook = function (obj) {
	                if (!obj)
	                    return obj; // No valid object. (Value is null). Return as is.
	                // Create a new object that derives from constructor:
	                var res = Object.create(constructor.prototype);
	                // Clone members:
	                for (var m in obj)
	                    if (hasOwn(obj, m))
	                        try {
	                            res[m] = obj[m];
	                        }
	                        catch (_) { }
	                return res;
	            };
	            if (this.schema.readHook) {
	                this.hook.reading.unsubscribe(this.schema.readHook);
	            }
	            this.schema.readHook = readHook;
	            this.hook("reading", readHook);
	            return constructor;
	        },
	        defineClass: function (structure) {
	            /// <summary>
	            ///     Define all members of the class that represents the table. This will help code completion of when objects are read from the database
	            ///     as well as making it possible to extend the prototype of the returned constructor function.
	            /// </summary>
	            /// <param name="structure">Helps IDE code completion by knowing the members that objects contain and not just the indexes. Also
	            /// know what type each member has. Example: {name: String, emailAddresses: [String], properties: {shoeSize: Number}}</param>
	            return this.mapToClass(Dexie.defineClass(structure), structure);
	        },
	        bulkDelete: function (keys$$1) {
	            if (this.hook.deleting.fire === nop) {
	                return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
	                    resolve(bulkDelete(idbstore, trans, keys$$1, false, nop));
	                });
	            }
	            else {
	                return this
	                    .where(':id')
	                    .anyOf(keys$$1)
	                    .delete()
	                    .then(function () { }); // Resolve with undefined.
	            }
	        },
	        bulkPut: function (objects, keys$$1) {
	            var _this = this;
	            return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
	                if (!idbstore.keyPath && !_this.schema.primKey.auto && !keys$$1)
	                    throw new exceptions.InvalidArgument("bulkPut() with non-inbound keys requires keys array in second argument");
	                if (idbstore.keyPath && keys$$1)
	                    throw new exceptions.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
	                if (keys$$1 && keys$$1.length !== objects.length)
	                    throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
	                if (objects.length === 0)
	                    return resolve(); // Caller provided empty list.
	                var done = function (result) {
	                    if (errorList.length === 0)
	                        resolve(result);
	                    else
	                        reject(new BulkError(_this.name + ".bulkPut(): " + errorList.length + " of " + numObjs + " operations failed", errorList));
	                };
	                var req, errorList = [], errorHandler, numObjs = objects.length, table = _this;
	                if (_this.hook.creating.fire === nop && _this.hook.updating.fire === nop) {
	                    //
	                    // Standard Bulk (no 'creating' or 'updating' hooks to care about)
	                    //
	                    errorHandler = BulkErrorHandlerCatchAll(errorList);
	                    for (var i = 0, l = objects.length; i < l; ++i) {
	                        req = keys$$1 ? idbstore.put(objects[i], keys$$1[i]) : idbstore.put(objects[i]);
	                        req.onerror = errorHandler;
	                    }
	                    // Only need to catch success or error on the last operation
	                    // according to the IDB spec.
	                    req.onerror = BulkErrorHandlerCatchAll(errorList, done);
	                    req.onsuccess = eventSuccessHandler(done);
	                }
	                else {
	                    var effectiveKeys = keys$$1 || idbstore.keyPath && objects.map(function (o) { return getByKeyPath(o, idbstore.keyPath); });
	                    // Generate map of {[key]: object}
	                    var objectLookup = effectiveKeys && arrayToObject(effectiveKeys, function (key, i) { return key != null && [key, objects[i]]; });
	                    var promise = !effectiveKeys ?
	                        // Auto-incremented key-less objects only without any keys argument.
	                        table.bulkAdd(objects) :
	                        // Keys provided. Either as inbound in provided objects, or as a keys argument.
	                        // Begin with updating those that exists in DB:
	                        table.where(':id').anyOf(effectiveKeys.filter(function (key) { return key != null; })).modify(function () {
	                            this.value = objectLookup[this.primKey];
	                            objectLookup[this.primKey] = null; // Mark as "don't add this"
	                        }).catch(ModifyError, function (e) {
	                            errorList = e.failures; // No need to concat here. These are the first errors added.
	                        }).then(function () {
	                            // Now, let's examine which items didnt exist so we can add them:
	                            var objsToAdd = [], keysToAdd = keys$$1 && [];
	                            // Iterate backwards. Why? Because if same key was used twice, just add the last one.
	                            for (var i = effectiveKeys.length - 1; i >= 0; --i) {
	                                var key = effectiveKeys[i];
	                                if (key == null || objectLookup[key]) {
	                                    objsToAdd.push(objects[i]);
	                                    keys$$1 && keysToAdd.push(key);
	                                    if (key != null)
	                                        objectLookup[key] = null; // Mark as "dont add again"
	                                }
	                            }
	                            // The items are in reverse order so reverse them before adding.
	                            // Could be important in order to get auto-incremented keys the way the caller
	                            // would expect. Could have used unshift instead of push()/reverse(),
	                            // but: http://jsperf.com/unshift-vs-reverse
	                            objsToAdd.reverse();
	                            keys$$1 && keysToAdd.reverse();
	                            return table.bulkAdd(objsToAdd, keysToAdd);
	                        }).then(function (lastAddedKey) {
	                            // Resolve with key of the last object in given arguments to bulkPut():
	                            var lastEffectiveKey = effectiveKeys[effectiveKeys.length - 1]; // Key was provided.
	                            return lastEffectiveKey != null ? lastEffectiveKey : lastAddedKey;
	                        });
	                    promise.then(done).catch(BulkError, function (e) {
	                        // Concat failure from ModifyError and reject using our 'done' method.
	                        errorList = errorList.concat(e.failures);
	                        done();
	                    }).catch(reject);
	                }
	            }, "locked"); // If called from transaction scope, lock transaction til all steps are done.
	        },
	        bulkAdd: function (objects, keys$$1) {
	            var self = this, creatingHook = this.hook.creating.fire;
	            return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
	                if (!idbstore.keyPath && !self.schema.primKey.auto && !keys$$1)
	                    throw new exceptions.InvalidArgument("bulkAdd() with non-inbound keys requires keys array in second argument");
	                if (idbstore.keyPath && keys$$1)
	                    throw new exceptions.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
	                if (keys$$1 && keys$$1.length !== objects.length)
	                    throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
	                if (objects.length === 0)
	                    return resolve(); // Caller provided empty list.
	                function done(result) {
	                    if (errorList.length === 0)
	                        resolve(result);
	                    else
	                        reject(new BulkError(self.name + ".bulkAdd(): " + errorList.length + " of " + numObjs + " operations failed", errorList));
	                }
	                var req, errorList = [], errorHandler, successHandler, numObjs = objects.length;
	                if (creatingHook !== nop) {
	                    //
	                    // There are subscribers to hook('creating')
	                    // Must behave as documented.
	                    //
	                    var keyPath = idbstore.keyPath, hookCtx;
	                    errorHandler = BulkErrorHandlerCatchAll(errorList, null, true);
	                    successHandler = hookedEventSuccessHandler(null);
	                    tryCatch(function () {
	                        for (var i = 0, l = objects.length; i < l; ++i) {
	                            hookCtx = { onerror: null, onsuccess: null };
	                            var key = keys$$1 && keys$$1[i];
	                            var obj = objects[i], effectiveKey = keys$$1 ? key : keyPath ? getByKeyPath(obj, keyPath) : undefined, keyToUse = creatingHook.call(hookCtx, effectiveKey, obj, trans);
	                            if (effectiveKey == null && keyToUse != null) {
	                                if (keyPath) {
	                                    obj = deepClone(obj);
	                                    setByKeyPath(obj, keyPath, keyToUse);
	                                }
	                                else {
	                                    key = keyToUse;
	                                }
	                            }
	                            req = key != null ? idbstore.add(obj, key) : idbstore.add(obj);
	                            req._hookCtx = hookCtx;
	                            if (i < l - 1) {
	                                req.onerror = errorHandler;
	                                if (hookCtx.onsuccess)
	                                    req.onsuccess = successHandler;
	                            }
	                        }
	                    }, function (err) {
	                        hookCtx.onerror && hookCtx.onerror(err);
	                        throw err;
	                    });
	                    req.onerror = BulkErrorHandlerCatchAll(errorList, done, true);
	                    req.onsuccess = hookedEventSuccessHandler(done);
	                }
	                else {
	                    //
	                    // Standard Bulk (no 'creating' hook to care about)
	                    //
	                    errorHandler = BulkErrorHandlerCatchAll(errorList);
	                    for (var i = 0, l = objects.length; i < l; ++i) {
	                        req = keys$$1 ? idbstore.add(objects[i], keys$$1[i]) : idbstore.add(objects[i]);
	                        req.onerror = errorHandler;
	                    }
	                    // Only need to catch success or error on the last operation
	                    // according to the IDB spec.
	                    req.onerror = BulkErrorHandlerCatchAll(errorList, done);
	                    req.onsuccess = eventSuccessHandler(done);
	                }
	            });
	        },
	        add: function (obj, key) {
	            /// <summary>
	            ///   Add an object to the database. In case an object with same primary key already exists, the object will not be added.
	            /// </summary>
	            /// <param name="obj" type="Object">A javascript object to insert</param>
	            /// <param name="key" optional="true">Primary key</param>
	            var creatingHook = this.hook.creating.fire;
	            return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
	                var hookCtx = { onsuccess: null, onerror: null };
	                if (creatingHook !== nop) {
	                    var effectiveKey = (key != null) ? key : (idbstore.keyPath ? getByKeyPath(obj, idbstore.keyPath) : undefined);
	                    var keyToUse = creatingHook.call(hookCtx, effectiveKey, obj, trans); // Allow subscribers to when("creating") to generate the key.
	                    if (effectiveKey == null && keyToUse != null) {
	                        if (idbstore.keyPath)
	                            setByKeyPath(obj, idbstore.keyPath, keyToUse);
	                        else
	                            key = keyToUse;
	                    }
	                }
	                try {
	                    var req = key != null ? idbstore.add(obj, key) : idbstore.add(obj);
	                    req._hookCtx = hookCtx;
	                    req.onerror = hookedEventRejectHandler(reject);
	                    req.onsuccess = hookedEventSuccessHandler(function (result) {
	                        // TODO: Remove these two lines in next major release (2.0?)
	                        // It's no good practice to have side effects on provided parameters
	                        var keyPath = idbstore.keyPath;
	                        if (keyPath)
	                            setByKeyPath(obj, keyPath, result);
	                        resolve(result);
	                    });
	                }
	                catch (e) {
	                    if (hookCtx.onerror)
	                        hookCtx.onerror(e);
	                    throw e;
	                }
	            });
	        },
	        put: function (obj, key) {
	            var _this = this;
	            /// <summary>
	            ///   Add an object to the database but in case an object with same primary key alread exists, the existing one will get updated.
	            /// </summary>
	            /// <param name="obj" type="Object">A javascript object to insert or update</param>
	            /// <param name="key" optional="true">Primary key</param>
	            var creatingHook = this.hook.creating.fire, updatingHook = this.hook.updating.fire;
	            if (creatingHook !== nop || updatingHook !== nop) {
	                //
	                // People listens to when("creating") or when("updating") events!
	                // We must know whether the put operation results in an CREATE or UPDATE.
	                //
	                var keyPath = this.schema.primKey.keyPath;
	                var effectiveKey = (key !== undefined) ? key : (keyPath && getByKeyPath(obj, keyPath));
	                if (effectiveKey == null)
	                    return this.add(obj);
	                // Since key is optional, make sure we get it from obj if not provided
	                // Primary key exist. Lock transaction and try modifying existing. If nothing modified, call add().
	                // clone obj before this async call. If caller modifies obj the line after put(), the IDB spec requires that it should not affect operation.
	                obj = deepClone(obj);
	                return this._trans(READWRITE, function () {
	                    return _this.where(":id").equals(effectiveKey).modify(function () {
	                        // Replace extisting value with our object
	                        // CRUD event firing handled in Collection.modify()
	                        this.value = obj;
	                    }).then(function (count) { return count === 0 ? _this.add(obj, key) : effectiveKey; });
	                }, "locked"); // Lock needed because operation is splitted into modify() and add().
	            }
	            else {
	                // Use the standard IDB put() method.
	                return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
	                    var req = key !== undefined ? idbstore.put(obj, key) : idbstore.put(obj);
	                    req.onerror = eventRejectHandler(reject);
	                    req.onsuccess = wrap(function (ev) {
	                        var keyPath = idbstore.keyPath;
	                        if (keyPath)
	                            setByKeyPath(obj, keyPath, ev.target.result);
	                        resolve(req.result);
	                    });
	                });
	            }
	        },
	        'delete': function (key) {
	            /// <param name="key">Primary key of the object to delete</param>
	            if (this.hook.deleting.subscribers.length) {
	                // People listens to when("deleting") event. Must implement delete using Collection.delete() that will
	                // call the CRUD event. Only Collection.delete() will know whether an object was actually deleted.
	                return this.where(":id").equals(key).delete();
	            }
	            else {
	                // No one listens. Use standard IDB delete() method.
	                return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
	                    var req = idbstore.delete(key);
	                    req.onerror = eventRejectHandler(reject);
	                    req.onsuccess = wrap(function () {
	                        resolve(req.result);
	                    });
	                });
	            }
	        },
	        clear: function () {
	            if (this.hook.deleting.subscribers.length) {
	                // People listens to when("deleting") event. Must implement delete using Collection.delete() that will
	                // call the CRUD event. Only Collection.delete() will knows which objects that are actually deleted.
	                return this.toCollection().delete();
	            }
	            else {
	                return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
	                    var req = idbstore.clear();
	                    req.onerror = eventRejectHandler(reject);
	                    req.onsuccess = wrap(function () {
	                        resolve(req.result);
	                    });
	                });
	            }
	        },
	        update: function (keyOrObject, modifications) {
	            if (typeof modifications !== 'object' || isArray(modifications))
	                throw new exceptions.InvalidArgument("Modifications must be an object.");
	            if (typeof keyOrObject === 'object' && !isArray(keyOrObject)) {
	                // object to modify. Also modify given object with the modifications:
	                keys(modifications).forEach(function (keyPath) {
	                    setByKeyPath(keyOrObject, keyPath, modifications[keyPath]);
	                });
	                var key = getByKeyPath(keyOrObject, this.schema.primKey.keyPath);
	                if (key === undefined)
	                    return rejection(new exceptions.InvalidArgument("Given object does not contain its primary key"));
	                return this.where(":id").equals(key).modify(modifications);
	            }
	            else {
	                // key to modify
	                return this.where(":id").equals(keyOrObject).modify(modifications);
	            }
	        }
	    });
	    //
	    //
	    //
	    // Transaction Class
	    //
	    //
	    //
	    function Transaction(mode, storeNames, dbschema, parent) {
	        var _this = this;
	        /// <summary>
	        ///    Transaction class. Represents a database transaction. All operations on db goes through a Transaction.
	        /// </summary>
	        /// <param name="mode" type="String">Any of "readwrite" or "readonly"</param>
	        /// <param name="storeNames" type="Array">Array of table names to operate on</param>
	        this.db = db;
	        this.mode = mode;
	        this.storeNames = storeNames;
	        this.idbtrans = null;
	        this.on = Events(this, "complete", "error", "abort");
	        this.parent = parent || null;
	        this.active = true;
	        this._reculock = 0;
	        this._blockedFuncs = [];
	        this._resolve = null;
	        this._reject = null;
	        this._waitingFor = null;
	        this._waitingQueue = null;
	        this._spinCount = 0; // Just for debugging waitFor()
	        this._completion = new Promise$1(function (resolve, reject) {
	            _this._resolve = resolve;
	            _this._reject = reject;
	        });
	        this._completion.then(function () {
	            _this.active = false;
	            _this.on.complete.fire();
	        }, function (e) {
	            var wasActive = _this.active;
	            _this.active = false;
	            _this.on.error.fire(e);
	            _this.parent ?
	                _this.parent._reject(e) :
	                wasActive && _this.idbtrans && _this.idbtrans.abort();
	            return rejection(e); // Indicate we actually DO NOT catch this error.
	        });
	    }
	    props(Transaction.prototype, {
	        //
	        // Transaction Protected Methods (not required by API users, but needed internally and eventually by dexie extensions)
	        //
	        _lock: function () {
	            assert$a(!PSD.global); // Locking and unlocking reuires to be within a PSD scope.
	            // Temporary set all requests into a pending queue if they are called before database is ready.
	            ++this._reculock; // Recursive read/write lock pattern using PSD (Promise Specific Data) instead of TLS (Thread Local Storage)
	            if (this._reculock === 1 && !PSD.global)
	                PSD.lockOwnerFor = this;
	            return this;
	        },
	        _unlock: function () {
	            assert$a(!PSD.global); // Locking and unlocking reuires to be within a PSD scope.
	            if (--this._reculock === 0) {
	                if (!PSD.global)
	                    PSD.lockOwnerFor = null;
	                while (this._blockedFuncs.length > 0 && !this._locked()) {
	                    var fnAndPSD = this._blockedFuncs.shift();
	                    try {
	                        usePSD(fnAndPSD[1], fnAndPSD[0]);
	                    }
	                    catch (e) { }
	                }
	            }
	            return this;
	        },
	        _locked: function () {
	            // Checks if any write-lock is applied on this transaction.
	            // To simplify the Dexie API for extension implementations, we support recursive locks.
	            // This is accomplished by using "Promise Specific Data" (PSD).
	            // PSD data is bound to a Promise and any child Promise emitted through then() or resolve( new Promise() ).
	            // PSD is local to code executing on top of the call stacks of any of any code executed by Promise():
	            //         * callback given to the Promise() constructor  (function (resolve, reject){...})
	            //         * callbacks given to then()/catch()/finally() methods (function (value){...})
	            // If creating a new independant Promise instance from within a Promise call stack, the new Promise will derive the PSD from the call stack of the parent Promise.
	            // Derivation is done so that the inner PSD __proto__ points to the outer PSD.
	            // PSD.lockOwnerFor will point to current transaction object if the currently executing PSD scope owns the lock.
	            return this._reculock && PSD.lockOwnerFor !== this;
	        },
	        create: function (idbtrans) {
	            var _this = this;
	            if (!this.mode)
	                return this;
	            assert$a(!this.idbtrans);
	            if (!idbtrans && !idbdb) {
	                switch (dbOpenError && dbOpenError.name) {
	                    case "DatabaseClosedError":
	                        // Errors where it is no difference whether it was caused by the user operation or an earlier call to db.open()
	                        throw new exceptions.DatabaseClosed(dbOpenError);
	                    case "MissingAPIError":
	                        // Errors where it is no difference whether it was caused by the user operation or an earlier call to db.open()
	                        throw new exceptions.MissingAPI(dbOpenError.message, dbOpenError);
	                    default:
	                        // Make it clear that the user operation was not what caused the error - the error had occurred earlier on db.open()!
	                        throw new exceptions.OpenFailed(dbOpenError);
	                }
	            }
	            if (!this.active)
	                throw new exceptions.TransactionInactive();
	            assert$a(this._completion._state === null);
	            idbtrans = this.idbtrans = idbtrans || idbdb.transaction(safariMultiStoreFix(this.storeNames), this.mode);
	            idbtrans.onerror = wrap(function (ev) {
	                preventDefault(ev); // Prohibit default bubbling to window.error
	                _this._reject(idbtrans.error);
	            });
	            idbtrans.onabort = wrap(function (ev) {
	                preventDefault(ev);
	                _this.active && _this._reject(new exceptions.Abort(idbtrans.error));
	                _this.active = false;
	                _this.on("abort").fire(ev);
	            });
	            idbtrans.oncomplete = wrap(function () {
	                _this.active = false;
	                _this._resolve();
	            });
	            return this;
	        },
	        _promise: function (mode, fn, bWriteLock) {
	            var _this = this;
	            if (mode === READWRITE && this.mode !== READWRITE)
	                return rejection(new exceptions.ReadOnly("Transaction is readonly"));
	            if (!this.active)
	                return rejection(new exceptions.TransactionInactive());
	            if (this._locked()) {
	                return new Promise$1(function (resolve, reject) {
	                    _this._blockedFuncs.push([function () {
	                            _this._promise(mode, fn, bWriteLock).then(resolve, reject);
	                        }, PSD]);
	                });
	            }
	            else if (bWriteLock) {
	                return newScope(function () {
	                    var p = new Promise$1(function (resolve, reject) {
	                        _this._lock();
	                        var rv = fn(resolve, reject, _this);
	                        if (rv && rv.then)
	                            rv.then(resolve, reject);
	                    });
	                    p.finally(function () { return _this._unlock(); });
	                    p._lib = true;
	                    return p;
	                });
	            }
	            else {
	                var p = new Promise$1(function (resolve, reject) {
	                    var rv = fn(resolve, reject, _this);
	                    if (rv && rv.then)
	                        rv.then(resolve, reject);
	                });
	                p._lib = true;
	                return p;
	            }
	        },
	        _root: function () {
	            return this.parent ? this.parent._root() : this;
	        },
	        waitFor: function (promise) {
	            // Always operate on the root transaction (in case this is a sub stransaction)
	            var root = this._root();
	            // For stability reasons, convert parameter to promise no matter what type is passed to waitFor().
	            // (We must be able to call .then() on it.)
	            promise = Promise$1.resolve(promise);
	            if (root._waitingFor) {
	                // Already called waitFor(). Wait for both to complete.
	                root._waitingFor = root._waitingFor.then(function () { return promise; });
	            }
	            else {
	                // We're not in waiting state. Start waiting state.
	                root._waitingFor = promise;
	                root._waitingQueue = [];
	                // Start interacting with indexedDB until promise completes:
	                var store = root.idbtrans.objectStore(root.storeNames[0]);
	                (function spin() {
	                    ++root._spinCount; // For debugging only
	                    while (root._waitingQueue.length)
	                        (root._waitingQueue.shift())();
	                    if (root._waitingFor)
	                        store.get(-Infinity).onsuccess = spin;
	                }());
	            }
	            var currentWaitPromise = root._waitingFor;
	            return new Promise$1(function (resolve, reject) {
	                promise.then(function (res) { return root._waitingQueue.push(wrap(resolve.bind(null, res))); }, function (err) { return root._waitingQueue.push(wrap(reject.bind(null, err))); }).finally(function () {
	                    if (root._waitingFor === currentWaitPromise) {
	                        // No one added a wait after us. Safe to stop the spinning.
	                        root._waitingFor = null;
	                    }
	                });
	            });
	        },
	        //
	        // Transaction Public Properties and Methods
	        //
	        abort: function () {
	            this.active && this._reject(new exceptions.Abort());
	            this.active = false;
	        },
	        tables: {
	            get: deprecated$1("Transaction.tables", function () { return allTables; })
	        },
	        table: function (name) {
	            var table = db.table(name); // Don't check that table is part of transaction. It must fail lazily!
	            return new Table(name, table.schema, this);
	        }
	    });
	    //
	    //
	    //
	    // WhereClause
	    //
	    //
	    //
	    function WhereClause(table, index, orCollection) {
	        /// <param name="table" type="Table"></param>
	        /// <param name="index" type="String" optional="true"></param>
	        /// <param name="orCollection" type="Collection" optional="true"></param>
	        this._ctx = {
	            table: table,
	            index: index === ":id" ? null : index,
	            or: orCollection
	        };
	    }
	    props(WhereClause.prototype, function () {
	        // WhereClause private methods
	        function fail(collectionOrWhereClause, err, T) {
	            var collection = collectionOrWhereClause instanceof WhereClause ?
	                new Collection(collectionOrWhereClause) :
	                collectionOrWhereClause;
	            collection._ctx.error = T ? new T(err) : new TypeError(err);
	            return collection;
	        }
	        function emptyCollection(whereClause) {
	            return new Collection(whereClause, function () { return IDBKeyRange.only(""); }).limit(0);
	        }
	        function upperFactory(dir) {
	            return dir === "next" ? function (s) { return s.toUpperCase(); } : function (s) { return s.toLowerCase(); };
	        }
	        function lowerFactory(dir) {
	            return dir === "next" ? function (s) { return s.toLowerCase(); } : function (s) { return s.toUpperCase(); };
	        }
	        function nextCasing(key, lowerKey, upperNeedle, lowerNeedle, cmp, dir) {
	            var length = Math.min(key.length, lowerNeedle.length);
	            var llp = -1;
	            for (var i = 0; i < length; ++i) {
	                var lwrKeyChar = lowerKey[i];
	                if (lwrKeyChar !== lowerNeedle[i]) {
	                    if (cmp(key[i], upperNeedle[i]) < 0)
	                        return key.substr(0, i) + upperNeedle[i] + upperNeedle.substr(i + 1);
	                    if (cmp(key[i], lowerNeedle[i]) < 0)
	                        return key.substr(0, i) + lowerNeedle[i] + upperNeedle.substr(i + 1);
	                    if (llp >= 0)
	                        return key.substr(0, llp) + lowerKey[llp] + upperNeedle.substr(llp + 1);
	                    return null;
	                }
	                if (cmp(key[i], lwrKeyChar) < 0)
	                    llp = i;
	            }
	            if (length < lowerNeedle.length && dir === "next")
	                return key + upperNeedle.substr(key.length);
	            if (length < key.length && dir === "prev")
	                return key.substr(0, upperNeedle.length);
	            return (llp < 0 ? null : key.substr(0, llp) + lowerNeedle[llp] + upperNeedle.substr(llp + 1));
	        }
	        function addIgnoreCaseAlgorithm(whereClause, match, needles, suffix) {
	            /// <param name="needles" type="Array" elementType="String"></param>
	            var upper, lower, compare, upperNeedles, lowerNeedles, direction, nextKeySuffix, needlesLen = needles.length;
	            if (!needles.every(function (s) { return typeof s === 'string'; })) {
	                return fail(whereClause, STRING_EXPECTED);
	            }
	            function initDirection(dir) {
	                upper = upperFactory(dir);
	                lower = lowerFactory(dir);
	                compare = (dir === "next" ? simpleCompare : simpleCompareReverse);
	                var needleBounds = needles.map(function (needle) {
	                    return { lower: lower(needle), upper: upper(needle) };
	                }).sort(function (a, b) {
	                    return compare(a.lower, b.lower);
	                });
	                upperNeedles = needleBounds.map(function (nb) { return nb.upper; });
	                lowerNeedles = needleBounds.map(function (nb) { return nb.lower; });
	                direction = dir;
	                nextKeySuffix = (dir === "next" ? "" : suffix);
	            }
	            initDirection("next");
	            var c = new Collection(whereClause, function () {
	                return IDBKeyRange.bound(upperNeedles[0], lowerNeedles[needlesLen - 1] + suffix);
	            });
	            c._ondirectionchange = function (direction) {
	                // This event onlys occur before filter is called the first time.
	                initDirection(direction);
	            };
	            var firstPossibleNeedle = 0;
	            c._addAlgorithm(function (cursor, advance, resolve) {
	                /// <param name="cursor" type="IDBCursor"></param>
	                /// <param name="advance" type="Function"></param>
	                /// <param name="resolve" type="Function"></param>
	                var key = cursor.key;
	                if (typeof key !== 'string')
	                    return false;
	                var lowerKey = lower(key);
	                if (match(lowerKey, lowerNeedles, firstPossibleNeedle)) {
	                    return true;
	                }
	                else {
	                    var lowestPossibleCasing = null;
	                    for (var i = firstPossibleNeedle; i < needlesLen; ++i) {
	                        var casing = nextCasing(key, lowerKey, upperNeedles[i], lowerNeedles[i], compare, direction);
	                        if (casing === null && lowestPossibleCasing === null)
	                            firstPossibleNeedle = i + 1;
	                        else if (lowestPossibleCasing === null || compare(lowestPossibleCasing, casing) > 0) {
	                            lowestPossibleCasing = casing;
	                        }
	                    }
	                    if (lowestPossibleCasing !== null) {
	                        advance(function () { cursor.continue(lowestPossibleCasing + nextKeySuffix); });
	                    }
	                    else {
	                        advance(resolve);
	                    }
	                    return false;
	                }
	            });
	            return c;
	        }
	        //
	        // WhereClause public methods
	        //
	        return {
	            between: function (lower, upper, includeLower, includeUpper) {
	                /// <summary>
	                ///     Filter out records whose where-field lays between given lower and upper values. Applies to Strings, Numbers and Dates.
	                /// </summary>
	                /// <param name="lower"></param>
	                /// <param name="upper"></param>
	                /// <param name="includeLower" optional="true">Whether items that equals lower should be included. Default true.</param>
	                /// <param name="includeUpper" optional="true">Whether items that equals upper should be included. Default false.</param>
	                /// <returns type="Collection"></returns>
	                includeLower = includeLower !== false; // Default to true
	                includeUpper = includeUpper === true; // Default to false
	                try {
	                    if ((cmp(lower, upper) > 0) ||
	                        (cmp(lower, upper) === 0 && (includeLower || includeUpper) && !(includeLower && includeUpper)))
	                        return emptyCollection(this); // Workaround for idiotic W3C Specification that DataError must be thrown if lower > upper. The natural result would be to return an empty collection.
	                    return new Collection(this, function () { return IDBKeyRange.bound(lower, upper, !includeLower, !includeUpper); });
	                }
	                catch (e) {
	                    return fail(this, INVALID_KEY_ARGUMENT);
	                }
	            },
	            equals: function (value) {
	                return new Collection(this, function () { return IDBKeyRange.only(value); });
	            },
	            above: function (value) {
	                return new Collection(this, function () { return IDBKeyRange.lowerBound(value, true); });
	            },
	            aboveOrEqual: function (value) {
	                return new Collection(this, function () { return IDBKeyRange.lowerBound(value); });
	            },
	            below: function (value) {
	                return new Collection(this, function () { return IDBKeyRange.upperBound(value, true); });
	            },
	            belowOrEqual: function (value) {
	                return new Collection(this, function () { return IDBKeyRange.upperBound(value); });
	            },
	            startsWith: function (str) {
	                /// <param name="str" type="String"></param>
	                if (typeof str !== 'string')
	                    return fail(this, STRING_EXPECTED);
	                return this.between(str, str + maxString, true, true);
	            },
	            startsWithIgnoreCase: function (str) {
	                /// <param name="str" type="String"></param>
	                if (str === "")
	                    return this.startsWith(str);
	                return addIgnoreCaseAlgorithm(this, function (x, a) { return x.indexOf(a[0]) === 0; }, [str], maxString);
	            },
	            equalsIgnoreCase: function (str) {
	                /// <param name="str" type="String"></param>
	                return addIgnoreCaseAlgorithm(this, function (x, a) { return x === a[0]; }, [str], "");
	            },
	            anyOfIgnoreCase: function () {
	                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
	                if (set.length === 0)
	                    return emptyCollection(this);
	                return addIgnoreCaseAlgorithm(this, function (x, a) { return a.indexOf(x) !== -1; }, set, "");
	            },
	            startsWithAnyOfIgnoreCase: function () {
	                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
	                if (set.length === 0)
	                    return emptyCollection(this);
	                return addIgnoreCaseAlgorithm(this, function (x, a) {
	                    return a.some(function (n) {
	                        return x.indexOf(n) === 0;
	                    });
	                }, set, maxString);
	            },
	            anyOf: function () {
	                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
	                var compare = ascending;
	                try {
	                    set.sort(compare);
	                }
	                catch (e) {
	                    return fail(this, INVALID_KEY_ARGUMENT);
	                }
	                if (set.length === 0)
	                    return emptyCollection(this);
	                var c = new Collection(this, function () { return IDBKeyRange.bound(set[0], set[set.length - 1]); });
	                c._ondirectionchange = function (direction) {
	                    compare = (direction === "next" ? ascending : descending);
	                    set.sort(compare);
	                };
	                var i = 0;
	                c._addAlgorithm(function (cursor, advance, resolve) {
	                    var key = cursor.key;
	                    while (compare(key, set[i]) > 0) {
	                        // The cursor has passed beyond this key. Check next.
	                        ++i;
	                        if (i === set.length) {
	                            // There is no next. Stop searching.
	                            advance(resolve);
	                            return false;
	                        }
	                    }
	                    if (compare(key, set[i]) === 0) {
	                        // The current cursor value should be included and we should continue a single step in case next item has the same key or possibly our next key in set.
	                        return true;
	                    }
	                    else {
	                        // cursor.key not yet at set[i]. Forward cursor to the next key to hunt for.
	                        advance(function () { cursor.continue(set[i]); });
	                        return false;
	                    }
	                });
	                return c;
	            },
	            notEqual: function (value) {
	                return this.inAnyRange([[minKey, value], [value, maxKey]], { includeLowers: false, includeUppers: false });
	            },
	            noneOf: function () {
	                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
	                if (set.length === 0)
	                    return new Collection(this); // Return entire collection.
	                try {
	                    set.sort(ascending);
	                }
	                catch (e) {
	                    return fail(this, INVALID_KEY_ARGUMENT);
	                }
	                // Transform ["a","b","c"] to a set of ranges for between/above/below: [[minKey,"a"], ["a","b"], ["b","c"], ["c",maxKey]]
	                var ranges = set.reduce(function (res, val) { return res ? res.concat([[res[res.length - 1][1], val]]) : [[minKey, val]]; }, null);
	                ranges.push([set[set.length - 1], maxKey]);
	                return this.inAnyRange(ranges, { includeLowers: false, includeUppers: false });
	            },
	            /** Filter out values withing given set of ranges.
	            * Example, give children and elders a rebate of 50%:
	            *
	            *   db.friends.where('age').inAnyRange([[0,18],[65,Infinity]]).modify({Rebate: 1/2});
	            *
	            * @param {(string|number|Date|Array)[][]} ranges
	            * @param {{includeLowers: boolean, includeUppers: boolean}} options
	            */
	            inAnyRange: function (ranges, options) {
	                if (ranges.length === 0)
	                    return emptyCollection(this);
	                if (!ranges.every(function (range) { return range[0] !== undefined && range[1] !== undefined && ascending(range[0], range[1]) <= 0; })) {
	                    return fail(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", exceptions.InvalidArgument);
	                }
	                var includeLowers = !options || options.includeLowers !== false; // Default to true
	                var includeUppers = options && options.includeUppers === true; // Default to false
	                function addRange(ranges, newRange) {
	                    for (var i = 0, l = ranges.length; i < l; ++i) {
	                        var range = ranges[i];
	                        if (cmp(newRange[0], range[1]) < 0 && cmp(newRange[1], range[0]) > 0) {
	                            range[0] = min(range[0], newRange[0]);
	                            range[1] = max(range[1], newRange[1]);
	                            break;
	                        }
	                    }
	                    if (i === l)
	                        ranges.push(newRange);
	                    return ranges;
	                }
	                var sortDirection = ascending;
	                function rangeSorter(a, b) { return sortDirection(a[0], b[0]); }
	                // Join overlapping ranges
	                var set;
	                try {
	                    set = ranges.reduce(addRange, []);
	                    set.sort(rangeSorter);
	                }
	                catch (ex) {
	                    return fail(this, INVALID_KEY_ARGUMENT);
	                }
	                var i = 0;
	                var keyIsBeyondCurrentEntry = includeUppers ?
	                    function (key) { return ascending(key, set[i][1]) > 0; } :
	                    function (key) { return ascending(key, set[i][1]) >= 0; };
	                var keyIsBeforeCurrentEntry = includeLowers ?
	                    function (key) { return descending(key, set[i][0]) > 0; } :
	                    function (key) { return descending(key, set[i][0]) >= 0; };
	                function keyWithinCurrentRange(key) {
	                    return !keyIsBeyondCurrentEntry(key) && !keyIsBeforeCurrentEntry(key);
	                }
	                var checkKey = keyIsBeyondCurrentEntry;
	                var c = new Collection(this, function () {
	                    return IDBKeyRange.bound(set[0][0], set[set.length - 1][1], !includeLowers, !includeUppers);
	                });
	                c._ondirectionchange = function (direction) {
	                    if (direction === "next") {
	                        checkKey = keyIsBeyondCurrentEntry;
	                        sortDirection = ascending;
	                    }
	                    else {
	                        checkKey = keyIsBeforeCurrentEntry;
	                        sortDirection = descending;
	                    }
	                    set.sort(rangeSorter);
	                };
	                c._addAlgorithm(function (cursor, advance, resolve) {
	                    var key = cursor.key;
	                    while (checkKey(key)) {
	                        // The cursor has passed beyond this key. Check next.
	                        ++i;
	                        if (i === set.length) {
	                            // There is no next. Stop searching.
	                            advance(resolve);
	                            return false;
	                        }
	                    }
	                    if (keyWithinCurrentRange(key)) {
	                        // The current cursor value should be included and we should continue a single step in case next item has the same key or possibly our next key in set.
	                        return true;
	                    }
	                    else if (cmp(key, set[i][1]) === 0 || cmp(key, set[i][0]) === 0) {
	                        // includeUpper or includeLower is false so keyWithinCurrentRange() returns false even though we are at range border.
	                        // Continue to next key but don't include this one.
	                        return false;
	                    }
	                    else {
	                        // cursor.key not yet at set[i]. Forward cursor to the next key to hunt for.
	                        advance(function () {
	                            if (sortDirection === ascending)
	                                cursor.continue(set[i][0]);
	                            else
	                                cursor.continue(set[i][1]);
	                        });
	                        return false;
	                    }
	                });
	                return c;
	            },
	            startsWithAnyOf: function () {
	                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
	                if (!set.every(function (s) { return typeof s === 'string'; })) {
	                    return fail(this, "startsWithAnyOf() only works with strings");
	                }
	                if (set.length === 0)
	                    return emptyCollection(this);
	                return this.inAnyRange(set.map(function (str) {
	                    return [str, str + maxString];
	                }));
	            }
	        };
	    });
	    //
	    //
	    //
	    // Collection Class
	    //
	    //
	    //
	    function Collection(whereClause, keyRangeGenerator) {
	        /// <summary>
	        ///
	        /// </summary>
	        /// <param name="whereClause" type="WhereClause">Where clause instance</param>
	        /// <param name="keyRangeGenerator" value="function(){ return IDBKeyRange.bound(0,1);}" optional="true"></param>
	        var keyRange = null, error = null;
	        if (keyRangeGenerator)
	            try {
	                keyRange = keyRangeGenerator();
	            }
	            catch (ex) {
	                error = ex;
	            }
	        var whereCtx = whereClause._ctx, table = whereCtx.table;
	        this._ctx = {
	            table: table,
	            index: whereCtx.index,
	            isPrimKey: (!whereCtx.index || (table.schema.primKey.keyPath && whereCtx.index === table.schema.primKey.name)),
	            range: keyRange,
	            keysOnly: false,
	            dir: "next",
	            unique: "",
	            algorithm: null,
	            filter: null,
	            replayFilter: null,
	            justLimit: true,
	            isMatch: null,
	            offset: 0,
	            limit: Infinity,
	            error: error,
	            or: whereCtx.or,
	            valueMapper: table.hook.reading.fire
	        };
	    }
	    function isPlainKeyRange(ctx, ignoreLimitFilter) {
	        return !(ctx.filter || ctx.algorithm || ctx.or) &&
	            (ignoreLimitFilter ? ctx.justLimit : !ctx.replayFilter);
	    }
	    props(Collection.prototype, function () {
	        //
	        // Collection Private Functions
	        //
	        function addFilter(ctx, fn) {
	            ctx.filter = combine(ctx.filter, fn);
	        }
	        function addReplayFilter(ctx, factory, isLimitFilter) {
	            var curr = ctx.replayFilter;
	            ctx.replayFilter = curr ? function () { return combine(curr(), factory()); } : factory;
	            ctx.justLimit = isLimitFilter && !curr;
	        }
	        function addMatchFilter(ctx, fn) {
	            ctx.isMatch = combine(ctx.isMatch, fn);
	        }
	        /** @param ctx {
	         *      isPrimKey: boolean,
	         *      table: Table,
	         *      index: string
	         * }
	         * @param store IDBObjectStore
	         **/
	        function getIndexOrStore(ctx, store) {
	            if (ctx.isPrimKey)
	                return store;
	            var indexSpec = ctx.table.schema.idxByName[ctx.index];
	            if (!indexSpec)
	                throw new exceptions.Schema("KeyPath " + ctx.index + " on object store " + store.name + " is not indexed");
	            return store.index(indexSpec.name);
	        }
	        /** @param ctx {
	         *      isPrimKey: boolean,
	         *      table: Table,
	         *      index: string,
	         *      keysOnly: boolean,
	         *      range?: IDBKeyRange,
	         *      dir: "next" | "prev"
	         * }
	         */
	        function openCursor(ctx, store) {
	            var idxOrStore = getIndexOrStore(ctx, store);
	            return ctx.keysOnly && 'openKeyCursor' in idxOrStore ?
	                idxOrStore.openKeyCursor(ctx.range || null, ctx.dir + ctx.unique) :
	                idxOrStore.openCursor(ctx.range || null, ctx.dir + ctx.unique);
	        }
	        function iter(ctx, fn, resolve, reject, idbstore) {
	            var filter = ctx.replayFilter ? combine(ctx.filter, ctx.replayFilter()) : ctx.filter;
	            if (!ctx.or) {
	                iterate(openCursor(ctx, idbstore), combine(ctx.algorithm, filter), fn, resolve, reject, !ctx.keysOnly && ctx.valueMapper);
	            }
	            else
	                (function () {
	                    var set = {};
	                    var resolved = 0;
	                    function resolveboth() {
	                        if (++resolved === 2)
	                            resolve(); // Seems like we just support or btwn max 2 expressions, but there are no limit because we do recursion.
	                    }
	                    function union(item, cursor, advance) {
	                        if (!filter || filter(cursor, advance, resolveboth, reject)) {
	                            var primaryKey = cursor.primaryKey;
	                            var key = '' + primaryKey;
	                            if (key === '[object ArrayBuffer]')
	                                key = '' + new Uint8Array(primaryKey);
	                            if (!hasOwn(set, key)) {
	                                set[key] = true;
	                                fn(item, cursor, advance);
	                            }
	                        }
	                    }
	                    ctx.or._iterate(union, resolveboth, reject, idbstore);
	                    iterate(openCursor(ctx, idbstore), ctx.algorithm, union, resolveboth, reject, !ctx.keysOnly && ctx.valueMapper);
	                })();
	        }
	        return {
	            //
	            // Collection Protected Functions
	            //
	            _read: function (fn, cb) {
	                var ctx = this._ctx;
	                return ctx.error ?
	                    ctx.table._trans(null, rejection.bind(null, ctx.error)) :
	                    ctx.table._idbstore(READONLY, fn).then(cb);
	            },
	            _write: function (fn) {
	                var ctx = this._ctx;
	                return ctx.error ?
	                    ctx.table._trans(null, rejection.bind(null, ctx.error)) :
	                    ctx.table._idbstore(READWRITE, fn, "locked"); // When doing write operations on collections, always lock the operation so that upcoming operations gets queued.
	            },
	            _addAlgorithm: function (fn) {
	                var ctx = this._ctx;
	                ctx.algorithm = combine(ctx.algorithm, fn);
	            },
	            _iterate: function (fn, resolve, reject, idbstore) {
	                return iter(this._ctx, fn, resolve, reject, idbstore);
	            },
	            clone: function (props$$1) {
	                var rv = Object.create(this.constructor.prototype), ctx = Object.create(this._ctx);
	                if (props$$1)
	                    extend(ctx, props$$1);
	                rv._ctx = ctx;
	                return rv;
	            },
	            raw: function () {
	                this._ctx.valueMapper = null;
	                return this;
	            },
	            //
	            // Collection Public methods
	            //
	            each: function (fn) {
	                var ctx = this._ctx;
	                return this._read(function (resolve, reject, idbstore) {
	                    iter(ctx, fn, resolve, reject, idbstore);
	                });
	            },
	            count: function (cb) {
	                var ctx = this._ctx;
	                if (isPlainKeyRange(ctx, true)) {
	                    // This is a plain key range. We can use the count() method if the index.
	                    return this._read(function (resolve, reject, idbstore) {
	                        var idx = getIndexOrStore(ctx, idbstore);
	                        var req = (ctx.range ? idx.count(ctx.range) : idx.count());
	                        req.onerror = eventRejectHandler(reject);
	                        req.onsuccess = function (e) {
	                            resolve(Math.min(e.target.result, ctx.limit));
	                        };
	                    }, cb);
	                }
	                else {
	                    // Algorithms, filters or expressions are applied. Need to count manually.
	                    var count = 0;
	                    return this._read(function (resolve, reject, idbstore) {
	                        iter(ctx, function () { ++count; return false; }, function () { resolve(count); }, reject, idbstore);
	                    }, cb);
	                }
	            },
	            sortBy: function (keyPath, cb) {
	                /// <param name="keyPath" type="String"></param>
	                var parts = keyPath.split('.').reverse(), lastPart = parts[0], lastIndex = parts.length - 1;
	                function getval(obj, i) {
	                    if (i)
	                        return getval(obj[parts[i]], i - 1);
	                    return obj[lastPart];
	                }
	                var order = this._ctx.dir === "next" ? 1 : -1;
	                function sorter(a, b) {
	                    var aVal = getval(a, lastIndex), bVal = getval(b, lastIndex);
	                    return aVal < bVal ? -order : aVal > bVal ? order : 0;
	                }
	                return this.toArray(function (a) {
	                    return a.sort(sorter);
	                }).then(cb);
	            },
	            toArray: function (cb) {
	                var ctx = this._ctx;
	                return this._read(function (resolve, reject, idbstore) {
	                    if (hasGetAll && ctx.dir === 'next' && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
	                        // Special optimation if we could use IDBObjectStore.getAll() or
	                        // IDBKeyRange.getAll():
	                        var readingHook = ctx.table.hook.reading.fire;
	                        var idxOrStore = getIndexOrStore(ctx, idbstore);
	                        var req = ctx.limit < Infinity ?
	                            idxOrStore.getAll(ctx.range, ctx.limit) :
	                            idxOrStore.getAll(ctx.range);
	                        req.onerror = eventRejectHandler(reject);
	                        req.onsuccess = readingHook === mirror ?
	                            eventSuccessHandler(resolve) :
	                            eventSuccessHandler(function (res) {
	                                try {
	                                    resolve(res.map(readingHook));
	                                }
	                                catch (e) {
	                                    reject(e);
	                                }
	                            });
	                    }
	                    else {
	                        // Getting array through a cursor.
	                        var a = [];
	                        iter(ctx, function (item) { a.push(item); }, function arrayComplete() {
	                            resolve(a);
	                        }, reject, idbstore);
	                    }
	                }, cb);
	            },
	            offset: function (offset) {
	                var ctx = this._ctx;
	                if (offset <= 0)
	                    return this;
	                ctx.offset += offset; // For count()
	                if (isPlainKeyRange(ctx)) {
	                    addReplayFilter(ctx, function () {
	                        var offsetLeft = offset;
	                        return function (cursor, advance) {
	                            if (offsetLeft === 0)
	                                return true;
	                            if (offsetLeft === 1) {
	                                --offsetLeft;
	                                return false;
	                            }
	                            advance(function () {
	                                cursor.advance(offsetLeft);
	                                offsetLeft = 0;
	                            });
	                            return false;
	                        };
	                    });
	                }
	                else {
	                    addReplayFilter(ctx, function () {
	                        var offsetLeft = offset;
	                        return function () { return (--offsetLeft < 0); };
	                    });
	                }
	                return this;
	            },
	            limit: function (numRows) {
	                this._ctx.limit = Math.min(this._ctx.limit, numRows); // For count()
	                addReplayFilter(this._ctx, function () {
	                    var rowsLeft = numRows;
	                    return function (cursor, advance, resolve) {
	                        if (--rowsLeft <= 0)
	                            advance(resolve); // Stop after this item has been included
	                        return rowsLeft >= 0; // If numRows is already below 0, return false because then 0 was passed to numRows initially. Otherwise we wouldnt come here.
	                    };
	                }, true);
	                return this;
	            },
	            until: function (filterFunction, bIncludeStopEntry) {
	                addFilter(this._ctx, function (cursor, advance, resolve) {
	                    if (filterFunction(cursor.value)) {
	                        advance(resolve);
	                        return bIncludeStopEntry;
	                    }
	                    else {
	                        return true;
	                    }
	                });
	                return this;
	            },
	            first: function (cb) {
	                return this.limit(1).toArray(function (a) { return a[0]; }).then(cb);
	            },
	            last: function (cb) {
	                return this.reverse().first(cb);
	            },
	            filter: function (filterFunction) {
	                /// <param name="jsFunctionFilter" type="Function">function(val){return true/false}</param>
	                addFilter(this._ctx, function (cursor) {
	                    return filterFunction(cursor.value);
	                });
	                // match filters not used in Dexie.js but can be used by 3rd part libraries to test a
	                // collection for a match without querying DB. Used by Dexie.Observable.
	                addMatchFilter(this._ctx, filterFunction);
	                return this;
	            },
	            and: function (filterFunction) {
	                return this.filter(filterFunction);
	            },
	            or: function (indexName) {
	                return new WhereClause(this._ctx.table, indexName, this);
	            },
	            reverse: function () {
	                this._ctx.dir = (this._ctx.dir === "prev" ? "next" : "prev");
	                if (this._ondirectionchange)
	                    this._ondirectionchange(this._ctx.dir);
	                return this;
	            },
	            desc: function () {
	                return this.reverse();
	            },
	            eachKey: function (cb) {
	                var ctx = this._ctx;
	                ctx.keysOnly = !ctx.isMatch;
	                return this.each(function (val, cursor) { cb(cursor.key, cursor); });
	            },
	            eachUniqueKey: function (cb) {
	                this._ctx.unique = "unique";
	                return this.eachKey(cb);
	            },
	            eachPrimaryKey: function (cb) {
	                var ctx = this._ctx;
	                ctx.keysOnly = !ctx.isMatch;
	                return this.each(function (val, cursor) { cb(cursor.primaryKey, cursor); });
	            },
	            keys: function (cb) {
	                var ctx = this._ctx;
	                ctx.keysOnly = !ctx.isMatch;
	                var a = [];
	                return this.each(function (item, cursor) {
	                    a.push(cursor.key);
	                }).then(function () {
	                    return a;
	                }).then(cb);
	            },
	            primaryKeys: function (cb) {
	                var ctx = this._ctx;
	                if (hasGetAll && ctx.dir === 'next' && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
	                    // Special optimation if we could use IDBObjectStore.getAllKeys() or
	                    // IDBKeyRange.getAllKeys():
	                    return this._read(function (resolve, reject, idbstore) {
	                        var idxOrStore = getIndexOrStore(ctx, idbstore);
	                        var req = ctx.limit < Infinity ?
	                            idxOrStore.getAllKeys(ctx.range, ctx.limit) :
	                            idxOrStore.getAllKeys(ctx.range);
	                        req.onerror = eventRejectHandler(reject);
	                        req.onsuccess = eventSuccessHandler(resolve);
	                    }).then(cb);
	                }
	                ctx.keysOnly = !ctx.isMatch;
	                var a = [];
	                return this.each(function (item, cursor) {
	                    a.push(cursor.primaryKey);
	                }).then(function () {
	                    return a;
	                }).then(cb);
	            },
	            uniqueKeys: function (cb) {
	                this._ctx.unique = "unique";
	                return this.keys(cb);
	            },
	            firstKey: function (cb) {
	                return this.limit(1).keys(function (a) { return a[0]; }).then(cb);
	            },
	            lastKey: function (cb) {
	                return this.reverse().firstKey(cb);
	            },
	            distinct: function () {
	                var ctx = this._ctx, idx = ctx.index && ctx.table.schema.idxByName[ctx.index];
	                if (!idx || !idx.multi)
	                    return this; // distinct() only makes differencies on multiEntry indexes.
	                var set = {};
	                addFilter(this._ctx, function (cursor) {
	                    var strKey = cursor.primaryKey.toString(); // Converts any Date to String, String to String, Number to String and Array to comma-separated string
	                    var found = hasOwn(set, strKey);
	                    set[strKey] = true;
	                    return !found;
	                });
	                return this;
	            },
	            //
	            // Methods that mutate storage
	            //
	            modify: function (changes) {
	                var self = this, ctx = this._ctx, hook = ctx.table.hook, updatingHook = hook.updating.fire, deletingHook = hook.deleting.fire;
	                return this._write(function (resolve, reject, idbstore, trans) {
	                    var modifyer;
	                    if (typeof changes === 'function') {
	                        // Changes is a function that may update, add or delete propterties or even require a deletion the object itself (delete this.item)
	                        if (updatingHook === nop && deletingHook === nop) {
	                            // Noone cares about what is being changed. Just let the modifier function be the given argument as is.
	                            modifyer = changes;
	                        }
	                        else {
	                            // People want to know exactly what is being modified or deleted.
	                            // Let modifyer be a proxy function that finds out what changes the caller is actually doing
	                            // and call the hooks accordingly!
	                            modifyer = function (item) {
	                                var origItem = deepClone(item); // Clone the item first so we can compare laters.
	                                if (changes.call(this, item, this) === false)
	                                    return false; // Call the real modifyer function (If it returns false explicitely, it means it dont want to modify anyting on this object)
	                                if (!hasOwn(this, "value")) {
	                                    // The real modifyer function requests a deletion of the object. Inform the deletingHook that a deletion is taking place.
	                                    deletingHook.call(this, this.primKey, item, trans);
	                                }
	                                else {
	                                    // No deletion. Check what was changed
	                                    var objectDiff = getObjectDiff(origItem, this.value);
	                                    var additionalChanges = updatingHook.call(this, objectDiff, this.primKey, origItem, trans);
	                                    if (additionalChanges) {
	                                        // Hook want to apply additional modifications. Make sure to fullfill the will of the hook.
	                                        item = this.value;
	                                        keys(additionalChanges).forEach(function (keyPath) {
	                                            setByKeyPath(item, keyPath, additionalChanges[keyPath]); // Adding {keyPath: undefined} means that the keyPath should be deleted. Handled by setByKeyPath
	                                        });
	                                    }
	                                }
	                            };
	                        }
	                    }
	                    else if (updatingHook === nop) {
	                        // changes is a set of {keyPath: value} and no one is listening to the updating hook.
	                        var keyPaths = keys(changes);
	                        var numKeys = keyPaths.length;
	                        modifyer = function (item) {
	                            var anythingModified = false;
	                            for (var i = 0; i < numKeys; ++i) {
	                                var keyPath = keyPaths[i], val = changes[keyPath];
	                                if (getByKeyPath(item, keyPath) !== val) {
	                                    setByKeyPath(item, keyPath, val); // Adding {keyPath: undefined} means that the keyPath should be deleted. Handled by setByKeyPath
	                                    anythingModified = true;
	                                }
	                            }
	                            return anythingModified;
	                        };
	                    }
	                    else {
	                        // changes is a set of {keyPath: value} and people are listening to the updating hook so we need to call it and
	                        // allow it to add additional modifications to make.
	                        var origChanges = changes;
	                        changes = shallowClone(origChanges); // Let's work with a clone of the changes keyPath/value set so that we can restore it in case a hook extends it.
	                        modifyer = function (item) {
	                            var anythingModified = false;
	                            var additionalChanges = updatingHook.call(this, changes, this.primKey, deepClone(item), trans);
	                            if (additionalChanges)
	                                extend(changes, additionalChanges);
	                            keys(changes).forEach(function (keyPath) {
	                                var val = changes[keyPath];
	                                if (getByKeyPath(item, keyPath) !== val) {
	                                    setByKeyPath(item, keyPath, val);
	                                    anythingModified = true;
	                                }
	                            });
	                            if (additionalChanges)
	                                changes = shallowClone(origChanges); // Restore original changes for next iteration
	                            return anythingModified;
	                        };
	                    }
	                    var count = 0;
	                    var successCount = 0;
	                    var iterationComplete = false;
	                    var failures = [];
	                    var failKeys = [];
	                    var currentKey = null;
	                    function modifyItem(item, cursor) {
	                        currentKey = cursor.primaryKey;
	                        var thisContext = {
	                            primKey: cursor.primaryKey,
	                            value: item,
	                            onsuccess: null,
	                            onerror: null
	                        };
	                        function onerror(e) {
	                            failures.push(e);
	                            failKeys.push(thisContext.primKey);
	                            checkFinished();
	                            return true; // Catch these errors and let a final rejection decide whether or not to abort entire transaction
	                        }
	                        if (modifyer.call(thisContext, item, thisContext) !== false) {
	                            var bDelete = !hasOwn(thisContext, "value");
	                            ++count;
	                            tryCatch(function () {
	                                var req = (bDelete ? cursor.delete() : cursor.update(thisContext.value));
	                                req._hookCtx = thisContext;
	                                req.onerror = hookedEventRejectHandler(onerror);
	                                req.onsuccess = hookedEventSuccessHandler(function () {
	                                    ++successCount;
	                                    checkFinished();
	                                });
	                            }, onerror);
	                        }
	                        else if (thisContext.onsuccess) {
	                            // Hook will expect either onerror or onsuccess to always be called!
	                            thisContext.onsuccess(thisContext.value);
	                        }
	                    }
	                    function doReject(e) {
	                        if (e) {
	                            failures.push(e);
	                            failKeys.push(currentKey);
	                        }
	                        return reject(new ModifyError("Error modifying one or more objects", failures, successCount, failKeys));
	                    }
	                    function checkFinished() {
	                        if (iterationComplete && successCount + failures.length === count) {
	                            if (failures.length > 0)
	                                doReject();
	                            else
	                                resolve(successCount);
	                        }
	                    }
	                    self.clone().raw()._iterate(modifyItem, function () {
	                        iterationComplete = true;
	                        checkFinished();
	                    }, doReject, idbstore);
	                });
	            },
	            'delete': function () {
	                var _this = this;
	                var ctx = this._ctx, range = ctx.range, deletingHook = ctx.table.hook.deleting.fire, hasDeleteHook = deletingHook !== nop;
	                if (!hasDeleteHook &&
	                    isPlainKeyRange(ctx) &&
	                    ((ctx.isPrimKey && !hangsOnDeleteLargeKeyRange) || !range)) {
	                    // May use IDBObjectStore.delete(IDBKeyRange) in this case (Issue #208)
	                    // For chromium, this is the way most optimized version.
	                    // For IE/Edge, this could hang the indexedDB engine and make operating system instable
	                    // (https://gist.github.com/dfahlander/5a39328f029de18222cf2125d56c38f7)
	                    return this._write(function (resolve, reject, idbstore) {
	                        // Our API contract is to return a count of deleted items, so we have to count() before delete().
	                        var onerror = eventRejectHandler(reject), countReq = (range ? idbstore.count(range) : idbstore.count());
	                        countReq.onerror = onerror;
	                        countReq.onsuccess = function () {
	                            var count = countReq.result;
	                            tryCatch(function () {
	                                var delReq = (range ? idbstore.delete(range) : idbstore.clear());
	                                delReq.onerror = onerror;
	                                delReq.onsuccess = function () { return resolve(count); };
	                            }, function (err) { return reject(err); });
	                        };
	                    });
	                }
	                // Default version to use when collection is not a vanilla IDBKeyRange on the primary key.
	                // Divide into chunks to not starve RAM.
	                // If has delete hook, we will have to collect not just keys but also objects, so it will use
	                // more memory and need lower chunk size.
	                var CHUNKSIZE = hasDeleteHook ? 2000 : 10000;
	                return this._write(function (resolve, reject, idbstore, trans) {
	                    var totalCount = 0;
	                    // Clone collection and change its table and set a limit of CHUNKSIZE on the cloned Collection instance.
	                    var collection = _this
	                        .clone({
	                        keysOnly: !ctx.isMatch && !hasDeleteHook
	                    }) // load just keys (unless filter() or and() or deleteHook has subscribers)
	                        .distinct() // In case multiEntry is used, never delete same key twice because resulting count
	                        .limit(CHUNKSIZE)
	                        .raw(); // Don't filter through reading-hooks (like mapped classes etc)
	                    var keysOrTuples = [];
	                    // We're gonna do things on as many chunks that are needed.
	                    // Use recursion of nextChunk function:
	                    var nextChunk = function () { return collection.each(hasDeleteHook ? function (val, cursor) {
	                        // Somebody subscribes to hook('deleting'). Collect all primary keys and their values,
	                        // so that the hook can be called with its values in bulkDelete().
	                        keysOrTuples.push([cursor.primaryKey, cursor.value]);
	                    } : function (val, cursor) {
	                        // No one subscribes to hook('deleting'). Collect only primary keys:
	                        keysOrTuples.push(cursor.primaryKey);
	                    }).then(function () {
	                        // Chromium deletes faster when doing it in sort order.
	                        hasDeleteHook ?
	                            keysOrTuples.sort(function (a, b) { return ascending(a[0], b[0]); }) :
	                            keysOrTuples.sort(ascending);
	                        return bulkDelete(idbstore, trans, keysOrTuples, hasDeleteHook, deletingHook);
	                    }).then(function () {
	                        var count = keysOrTuples.length;
	                        totalCount += count;
	                        keysOrTuples = [];
	                        return count < CHUNKSIZE ? totalCount : nextChunk();
	                    }); };
	                    resolve(nextChunk());
	                });
	            }
	        };
	    });
	    //
	    //
	    //
	    // ------------------------- Help functions ---------------------------
	    //
	    //
	    //
	    function lowerVersionFirst(a, b) {
	        return a._cfg.version - b._cfg.version;
	    }
	    function setApiOnPlace(objs, tableNames, dbschema) {
	        tableNames.forEach(function (tableName) {
	            var schema = dbschema[tableName];
	            objs.forEach(function (obj) {
	                if (!(tableName in obj)) {
	                    if (obj === Transaction.prototype || obj instanceof Transaction) {
	                        // obj is a Transaction prototype (or prototype of a subclass to Transaction)
	                        // Make the API a getter that returns this.table(tableName)
	                        setProp(obj, tableName, { get: function () { return this.table(tableName); } });
	                    }
	                    else {
	                        // Table will not be bound to a transaction (will use Dexie.currentTransaction)
	                        obj[tableName] = new Table(tableName, schema);
	                    }
	                }
	            });
	        });
	    }
	    function removeTablesApi(objs) {
	        objs.forEach(function (obj) {
	            for (var key in obj) {
	                if (obj[key] instanceof Table)
	                    delete obj[key];
	            }
	        });
	    }
	    function iterate(req, filter, fn, resolve, reject, valueMapper) {
	        // Apply valueMapper (hook('reading') or mappped class)
	        var mappedFn = valueMapper ? function (x, c, a) { return fn(valueMapper(x), c, a); } : fn;
	        // Wrap fn with PSD and microtick stuff from Promise.
	        var wrappedFn = wrap(mappedFn, reject);
	        if (!req.onerror)
	            req.onerror = eventRejectHandler(reject);
	        if (filter) {
	            req.onsuccess = trycatcher(function filter_record() {
	                var cursor = req.result;
	                if (cursor) {
	                    var c = function () { cursor.continue(); };
	                    if (filter(cursor, function (advancer) { c = advancer; }, resolve, reject))
	                        wrappedFn(cursor.value, cursor, function (advancer) { c = advancer; });
	                    c();
	                }
	                else {
	                    resolve();
	                }
	            }, reject);
	        }
	        else {
	            req.onsuccess = trycatcher(function filter_record() {
	                var cursor = req.result;
	                if (cursor) {
	                    var c = function () { cursor.continue(); };
	                    wrappedFn(cursor.value, cursor, function (advancer) { c = advancer; });
	                    c();
	                }
	                else {
	                    resolve();
	                }
	            }, reject);
	        }
	    }
	    function parseIndexSyntax(indexes) {
	        /// <param name="indexes" type="String"></param>
	        /// <returns type="Array" elementType="IndexSpec"></returns>
	        var rv = [];
	        indexes.split(',').forEach(function (index) {
	            index = index.trim();
	            var name = index.replace(/([&*]|\+\+)/g, ""); // Remove "&", "++" and "*"
	            // Let keyPath of "[a+b]" be ["a","b"]:
	            var keyPath = /^\[/.test(name) ? name.match(/^\[(.*)\]$/)[1].split('+') : name;
	            rv.push(new IndexSpec(name, keyPath || null, /\&/.test(index), /\*/.test(index), /\+\+/.test(index), isArray(keyPath), /\./.test(index)));
	        });
	        return rv;
	    }
	    function cmp(key1, key2) {
	        return indexedDB.cmp(key1, key2);
	    }
	    function min(a, b) {
	        return cmp(a, b) < 0 ? a : b;
	    }
	    function max(a, b) {
	        return cmp(a, b) > 0 ? a : b;
	    }
	    function ascending(a, b) {
	        return indexedDB.cmp(a, b);
	    }
	    function descending(a, b) {
	        return indexedDB.cmp(b, a);
	    }
	    function simpleCompare(a, b) {
	        return a < b ? -1 : a === b ? 0 : 1;
	    }
	    function simpleCompareReverse(a, b) {
	        return a > b ? -1 : a === b ? 0 : 1;
	    }
	    function combine(filter1, filter2) {
	        return filter1 ?
	            filter2 ?
	                function () { return filter1.apply(this, arguments) && filter2.apply(this, arguments); } :
	                filter1 :
	            filter2;
	    }
	    function readGlobalSchema() {
	        db.verno = idbdb.version / 10;
	        db._dbSchema = globalSchema = {};
	        dbStoreNames = slice(idbdb.objectStoreNames, 0);
	        if (dbStoreNames.length === 0)
	            return; // Database contains no stores.
	        var trans = idbdb.transaction(safariMultiStoreFix(dbStoreNames), 'readonly');
	        dbStoreNames.forEach(function (storeName) {
	            var store = trans.objectStore(storeName), keyPath = store.keyPath, dotted = keyPath && typeof keyPath === 'string' && keyPath.indexOf('.') !== -1;
	            var primKey = new IndexSpec(keyPath, keyPath || "", false, false, !!store.autoIncrement, keyPath && typeof keyPath !== 'string', dotted);
	            var indexes = [];
	            for (var j = 0; j < store.indexNames.length; ++j) {
	                var idbindex = store.index(store.indexNames[j]);
	                keyPath = idbindex.keyPath;
	                dotted = keyPath && typeof keyPath === 'string' && keyPath.indexOf('.') !== -1;
	                var index = new IndexSpec(idbindex.name, keyPath, !!idbindex.unique, !!idbindex.multiEntry, false, keyPath && typeof keyPath !== 'string', dotted);
	                indexes.push(index);
	            }
	            globalSchema[storeName] = new TableSchema(storeName, primKey, indexes, {});
	        });
	        setApiOnPlace([allTables], keys(globalSchema), globalSchema);
	    }
	    function adjustToExistingIndexNames(schema, idbtrans) {
	        /// <summary>
	        /// Issue #30 Problem with existing db - adjust to existing index names when migrating from non-dexie db
	        /// </summary>
	        /// <param name="schema" type="Object">Map between name and TableSchema</param>
	        /// <param name="idbtrans" type="IDBTransaction"></param>
	        var storeNames = idbtrans.db.objectStoreNames;
	        for (var i = 0; i < storeNames.length; ++i) {
	            var storeName = storeNames[i];
	            var store = idbtrans.objectStore(storeName);
	            hasGetAll = 'getAll' in store;
	            for (var j = 0; j < store.indexNames.length; ++j) {
	                var indexName = store.indexNames[j];
	                var keyPath = store.index(indexName).keyPath;
	                var dexieName = typeof keyPath === 'string' ? keyPath : "[" + slice(keyPath).join('+') + "]";
	                if (schema[storeName]) {
	                    var indexSpec = schema[storeName].idxByName[dexieName];
	                    if (indexSpec)
	                        indexSpec.name = indexName;
	                }
	            }
	        }
	        // Bug with getAll() on Safari ver<604 on Workers only, see discussion following PR #579
	        if (/Safari/.test(navigator.userAgent) &&
	            !/(Chrome\/|Edge\/)/.test(navigator.userAgent) &&
	            _global$1.WorkerGlobalScope && _global$1 instanceof _global$1.WorkerGlobalScope &&
	            [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604) {
	            hasGetAll = false;
	        }
	    }
	    function fireOnBlocked(ev) {
	        db.on("blocked").fire(ev);
	        // Workaround (not fully*) for missing "versionchange" event in IE,Edge and Safari:
	        connections
	            .filter(function (c) { return c.name === db.name && c !== db && !c._vcFired; })
	            .map(function (c) { return c.on("versionchange").fire(ev); });
	    }
	    extend(this, {
	        Collection: Collection,
	        Table: Table,
	        Transaction: Transaction,
	        Version: Version,
	        WhereClause: WhereClause
	    });
	    init();
	    addons.forEach(function (fn) {
	        fn(db);
	    });
	}
	function parseType(type) {
	    if (typeof type === 'function') {
	        return new type();
	    }
	    else if (isArray(type)) {
	        return [parseType(type[0])];
	    }
	    else if (type && typeof type === 'object') {
	        var rv = {};
	        applyStructure(rv, type);
	        return rv;
	    }
	    else {
	        return type;
	    }
	}
	function applyStructure(obj, structure) {
	    keys(structure).forEach(function (member) {
	        var value = parseType(structure[member]);
	        obj[member] = value;
	    });
	    return obj;
	}
	function hookedEventSuccessHandler(resolve) {
	    // wrap() is needed when calling hooks because the rare scenario of:
	    //  * hook does a db operation that fails immediately (IDB throws exception)
	    //    For calling db operations on correct transaction, wrap makes sure to set PSD correctly.
	    //    wrap() will also execute in a virtual tick.
	    //  * If not wrapped in a virtual tick, direct exception will launch a new physical tick.
	    //  * If this was the last event in the bulk, the promise will resolve after a physical tick
	    //    and the transaction will have committed already.
	    // If no hook, the virtual tick will be executed in the reject()/resolve of the final promise,
	    // because it is always marked with _lib = true when created using Transaction._promise().
	    return wrap(function (event) {
	        var req = event.target, ctx = req._hookCtx, // Contains the hook error handler. Put here instead of closure to boost performance.
	        result = ctx.value || req.result, // Pass the object value on updates. The result from IDB is the primary key.
	        hookSuccessHandler = ctx && ctx.onsuccess;
	        hookSuccessHandler && hookSuccessHandler(result);
	        resolve && resolve(result);
	    }, resolve);
	}
	function eventRejectHandler(reject) {
	    return wrap(function (event) {
	        preventDefault(event);
	        reject(event.target.error);
	        return false;
	    });
	}
	function eventSuccessHandler(resolve) {
	    return wrap(function (event) {
	        resolve(event.target.result);
	    });
	}
	function hookedEventRejectHandler(reject) {
	    return wrap(function (event) {
	        // See comment on hookedEventSuccessHandler() why wrap() is needed only when supporting hooks.
	        var req = event.target, err = req.error, ctx = req._hookCtx, // Contains the hook error handler. Put here instead of closure to boost performance.
	        hookErrorHandler = ctx && ctx.onerror;
	        hookErrorHandler && hookErrorHandler(err);
	        preventDefault(event);
	        reject(err);
	        return false;
	    });
	}
	function preventDefault(event) {
	    if (event.stopPropagation)
	        event.stopPropagation();
	    if (event.preventDefault)
	        event.preventDefault();
	}
	function awaitIterator(iterator) {
	    var callNext = function (result) { return iterator.next(result); }, doThrow = function (error) { return iterator.throw(error); }, onSuccess = step(callNext), onError = step(doThrow);
	    function step(getNext) {
	        return function (val) {
	            var next = getNext(val), value = next.value;
	            return next.done ? value :
	                (!value || typeof value.then !== 'function' ?
	                    isArray(value) ? Promise$1.all(value).then(onSuccess, onError) : onSuccess(value) :
	                    value.then(onSuccess, onError));
	        };
	    }
	    return step(callNext)();
	}
	//
	// IndexSpec struct
	//
	function IndexSpec(name, keyPath, unique, multi, auto, compound, dotted) {
	    /// <param name="name" type="String"></param>
	    /// <param name="keyPath" type="String"></param>
	    /// <param name="unique" type="Boolean"></param>
	    /// <param name="multi" type="Boolean"></param>
	    /// <param name="auto" type="Boolean"></param>
	    /// <param name="compound" type="Boolean"></param>
	    /// <param name="dotted" type="Boolean"></param>
	    this.name = name;
	    this.keyPath = keyPath;
	    this.unique = unique;
	    this.multi = multi;
	    this.auto = auto;
	    this.compound = compound;
	    this.dotted = dotted;
	    var keyPathSrc = typeof keyPath === 'string' ? keyPath : keyPath && ('[' + [].join.call(keyPath, '+') + ']');
	    this.src = (unique ? '&' : '') + (multi ? '*' : '') + (auto ? "++" : "") + keyPathSrc;
	}
	//
	// TableSchema struct
	//
	function TableSchema(name, primKey, indexes, instanceTemplate) {
	    /// <param name="name" type="String"></param>
	    /// <param name="primKey" type="IndexSpec"></param>
	    /// <param name="indexes" type="Array" elementType="IndexSpec"></param>
	    /// <param name="instanceTemplate" type="Object"></param>
	    this.name = name;
	    this.primKey = primKey || new IndexSpec();
	    this.indexes = indexes || [new IndexSpec()];
	    this.instanceTemplate = instanceTemplate;
	    this.mappedClass = null;
	    this.idxByName = arrayToObject(indexes, function (index) { return [index.name, index]; });
	}
	function safariMultiStoreFix(storeNames) {
	    return storeNames.length === 1 ? storeNames[0] : storeNames;
	}
	function getNativeGetDatabaseNamesFn(indexedDB) {
	    var fn = indexedDB && (indexedDB.getDatabaseNames || indexedDB.webkitGetDatabaseNames);
	    return fn && fn.bind(indexedDB);
	}
	// Export Error classes
	props(Dexie, fullNameExceptions); // Dexie.XXXError = class XXXError {...};
	//
	// Static methods and properties
	// 
	props(Dexie, {
	    //
	    // Static delete() method.
	    //
	    delete: function (databaseName) {
	        var db = new Dexie(databaseName), promise = db.delete();
	        promise.onblocked = function (fn) {
	            db.on("blocked", fn);
	            return this;
	        };
	        return promise;
	    },
	    //
	    // Static exists() method.
	    //
	    exists: function (name) {
	        return new Dexie(name).open().then(function (db) {
	            db.close();
	            return true;
	        }).catch(Dexie.NoSuchDatabaseError, function () { return false; });
	    },
	    //
	    // Static method for retrieving a list of all existing databases at current host.
	    //
	    getDatabaseNames: function (cb) {
	        var getDatabaseNames = getNativeGetDatabaseNamesFn(Dexie.dependencies.indexedDB);
	        return getDatabaseNames ? new Promise$1(function (resolve, reject) {
	            var req = getDatabaseNames();
	            req.onsuccess = function (event) {
	                resolve(slice(event.target.result, 0)); // Converst DOMStringList to Array<String>
	            };
	            req.onerror = eventRejectHandler(reject);
	        }).then(cb) : dbNamesDB.dbnames.toCollection().primaryKeys(cb);
	    },
	    defineClass: function () {
	        // Default constructor able to copy given properties into this object.
	        function Class(properties) {
	            /// <param name="properties" type="Object" optional="true">Properties to initialize object with.
	            /// </param>
	            if (properties)
	                extend(this, properties);
	        }
	        return Class;
	    },
	    applyStructure: applyStructure,
	    ignoreTransaction: function (scopeFunc) {
	        // In case caller is within a transaction but needs to create a separate transaction.
	        // Example of usage:
	        //
	        // Let's say we have a logger function in our app. Other application-logic should be unaware of the
	        // logger function and not need to include the 'logentries' table in all transaction it performs.
	        // The logging should always be done in a separate transaction and not be dependant on the current
	        // running transaction context. Then you could use Dexie.ignoreTransaction() to run code that starts a new transaction.
	        //
	        //     Dexie.ignoreTransaction(function() {
	        //         db.logentries.add(newLogEntry);
	        //     });
	        //
	        // Unless using Dexie.ignoreTransaction(), the above example would try to reuse the current transaction
	        // in current Promise-scope.
	        //
	        // An alternative to Dexie.ignoreTransaction() would be setImmediate() or setTimeout(). The reason we still provide an
	        // API for this because
	        //  1) The intention of writing the statement could be unclear if using setImmediate() or setTimeout().
	        //  2) setTimeout() would wait unnescessary until firing. This is however not the case with setImmediate().
	        //  3) setImmediate() is not supported in the ES standard.
	        //  4) You might want to keep other PSD state that was set in a parent PSD, such as PSD.letThrough.
	        return PSD.trans ?
	            usePSD(PSD.transless, scopeFunc) : // Use the closest parent that was non-transactional.
	            scopeFunc(); // No need to change scope because there is no ongoing transaction.
	    },
	    vip: function (fn) {
	        // To be used by subscribers to the on('ready') event.
	        // This will let caller through to access DB even when it is blocked while the db.ready() subscribers are firing.
	        // This would have worked automatically if we were certain that the Provider was using Dexie.Promise for all asyncronic operations. The promise PSD
	        // from the provider.connect() call would then be derived all the way to when provider would call localDatabase.applyChanges(). But since
	        // the provider more likely is using non-promise async APIs or other thenable implementations, we cannot assume that.
	        // Note that this method is only useful for on('ready') subscribers that is returning a Promise from the event. If not using vip()
	        // the database could deadlock since it wont open until the returned Promise is resolved, and any non-VIPed operation started by
	        // the caller will not resolve until database is opened.
	        return newScope(function () {
	            PSD.letThrough = true; // Make sure we are let through if still blocking db due to onready is firing.
	            return fn();
	        });
	    },
	    async: function (generatorFn) {
	        return function () {
	            try {
	                var rv = awaitIterator(generatorFn.apply(this, arguments));
	                if (!rv || typeof rv.then !== 'function')
	                    return Promise$1.resolve(rv);
	                return rv;
	            }
	            catch (e) {
	                return rejection(e);
	            }
	        };
	    },
	    spawn: function (generatorFn, args, thiz) {
	        try {
	            var rv = awaitIterator(generatorFn.apply(thiz, args || []));
	            if (!rv || typeof rv.then !== 'function')
	                return Promise$1.resolve(rv);
	            return rv;
	        }
	        catch (e) {
	            return rejection(e);
	        }
	    },
	    // Dexie.currentTransaction property
	    currentTransaction: {
	        get: function () { return PSD.trans || null; }
	    },
	    waitFor: function (promiseOrFunction, optionalTimeout) {
	        // If a function is provided, invoke it and pass the returning value to Transaction.waitFor()
	        var promise = Promise$1.resolve(typeof promiseOrFunction === 'function' ? Dexie.ignoreTransaction(promiseOrFunction) : promiseOrFunction)
	            .timeout(optionalTimeout || 60000); // Default the timeout to one minute. Caller may specify Infinity if required.       
	        // Run given promise on current transaction. If no current transaction, just return a Dexie promise based
	        // on given value.
	        return PSD.trans ? PSD.trans.waitFor(promise) : promise;
	    },
	    // Export our Promise implementation since it can be handy as a standalone Promise implementation
	    Promise: Promise$1,
	    // Dexie.debug proptery:
	    // Dexie.debug = false
	    // Dexie.debug = true
	    // Dexie.debug = "dexie" - don't hide dexie's stack frames.
	    debug: {
	        get: function () { return debug; },
	        set: function (value) {
	            setDebug(value, value === 'dexie' ? function () { return true; } : dexieStackFrameFilter);
	        }
	    },
	    // Export our derive/extend/override methodology
	    derive: derive,
	    extend: extend,
	    props: props,
	    override: override,
	    // Export our Events() function - can be handy as a toolkit
	    Events: Events,
	    // Utilities
	    getByKeyPath: getByKeyPath,
	    setByKeyPath: setByKeyPath,
	    delByKeyPath: delByKeyPath,
	    shallowClone: shallowClone,
	    deepClone: deepClone,
	    getObjectDiff: getObjectDiff,
	    asap: asap,
	    maxKey: maxKey,
	    minKey: minKey,
	    // Addon registry
	    addons: [],
	    // Global DB connection list
	    connections: connections,
	    MultiModifyError: exceptions.Modify,
	    errnames: errnames,
	    // Export other static classes
	    IndexSpec: IndexSpec,
	    TableSchema: TableSchema,
	    //
	    // Dependencies
	    //
	    // These will automatically work in browsers with indexedDB support, or where an indexedDB polyfill has been included.
	    //
	    // In node.js, however, these properties must be set "manually" before instansiating a new Dexie().
	    // For node.js, you need to require indexeddb-js or similar and then set these deps.
	    //
	    dependencies: (function () {
	        try {
	            return {
	                // Required:
	                indexedDB: _global$1.indexedDB || _global$1.mozIndexedDB || _global$1.webkitIndexedDB || _global$1.msIndexedDB,
	                IDBKeyRange: _global$1.IDBKeyRange || _global$1.webkitIDBKeyRange
	            };
	        }
	        catch (e) {
	            return {
	                indexedDB: null,
	                IDBKeyRange: null
	            };
	        }
	    })(),
	    // API Version Number: Type Number, make sure to always set a version number that can be comparable correctly. Example: 0.9, 0.91, 0.92, 1.0, 1.01, 1.1, 1.2, 1.21, etc.
	    semVer: DEXIE_VERSION,
	    version: DEXIE_VERSION.split('.')
	        .map(function (n) { return parseInt(n); })
	        .reduce(function (p, c, i) { return p + (c / Math.pow(10, i * 2)); }),
	    // https://github.com/dfahlander/Dexie.js/issues/186
	    // typescript compiler tsc in mode ts-->es5 & commonJS, will expect require() to return
	    // x.default. Workaround: Set Dexie.default = Dexie.
	    default: Dexie,
	    // Make it possible to import {Dexie} (non-default import)
	    // Reason 1: May switch to that in future.
	    // Reason 2: We declare it both default and named exported in d.ts to make it possible
	    // to let addons extend the Dexie interface with Typescript 2.1 (works only when explicitely
	    // exporting the symbol, not just default exporting)
	    Dexie: Dexie
	});
	// Map DOMErrors and DOMExceptions to corresponding Dexie errors. May change in Dexie v2.0.
	Promise$1.rejectionMapper = mapError;
	// Initialize dbNamesDB (won't ever be opened on chromium browsers')
	dbNamesDB = new Dexie('__dbnames');
	dbNamesDB.version(1).stores({ dbnames: 'name' });
	(function () {
	    // Migrate from Dexie 1.x database names stored in localStorage:
	    var DBNAMES = 'Dexie.DatabaseNames';
	    try {
	        if (typeof localStorage !== undefined && _global$1.document !== undefined) {
	            // Have localStorage and is not executing in a worker. Lets migrate from Dexie 1.x.
	            JSON.parse(localStorage.getItem(DBNAMES) || "[]")
	                .forEach(function (name) { return dbNamesDB.dbnames.put({ name: name }).catch(nop); });
	            localStorage.removeItem(DBNAMES);
	        }
	    }
	    catch (_e) { }
	})();

	const BeetClientDB = new Dexie('BeetClientDB');

	BeetClientDB.version(1).stores({
	    apps: `++id,&keyhash,&apphash,account_id,appName,secret,next_id`
	}); 
	BeetClientDB.open();

	(function(self) {

	  if (self.fetch) {
	    return
	  }

	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob();
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  };

	  if (support.arrayBuffer) {
	    var viewClasses = [
	      '[object Int8Array]',
	      '[object Uint8Array]',
	      '[object Uint8ClampedArray]',
	      '[object Int16Array]',
	      '[object Uint16Array]',
	      '[object Int32Array]',
	      '[object Uint32Array]',
	      '[object Float32Array]',
	      '[object Float64Array]'
	    ];

	    var isDataView = function(obj) {
	      return obj && DataView.prototype.isPrototypeOf(obj)
	    };

	    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
	      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
	    };
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name);
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value);
	    }
	    return value
	  }

	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift();
	        return {done: value === undefined, value: value}
	      }
	    };

	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      };
	    }

	    return iterator
	  }

	  function Headers(headers) {
	    this.map = {};

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value);
	      }, this);
	    } else if (Array.isArray(headers)) {
	      headers.forEach(function(header) {
	        this.append(header[0], header[1]);
	      }, this);
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name]);
	      }, this);
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name);
	    value = normalizeValue(value);
	    var oldValue = this.map[name];
	    this.map[name] = oldValue ? oldValue+','+value : value;
	  };

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)];
	  };

	  Headers.prototype.get = function(name) {
	    name = normalizeName(name);
	    return this.has(name) ? this.map[name] : null
	  };

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  };

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = normalizeValue(value);
	  };

	  Headers.prototype.forEach = function(callback, thisArg) {
	    for (var name in this.map) {
	      if (this.map.hasOwnProperty(name)) {
	        callback.call(thisArg, this.map[name], name, this);
	      }
	    }
	  };

	  Headers.prototype.keys = function() {
	    var items = [];
	    this.forEach(function(value, name) { items.push(name); });
	    return iteratorFor(items)
	  };

	  Headers.prototype.values = function() {
	    var items = [];
	    this.forEach(function(value) { items.push(value); });
	    return iteratorFor(items)
	  };

	  Headers.prototype.entries = function() {
	    var items = [];
	    this.forEach(function(value, name) { items.push([name, value]); });
	    return iteratorFor(items)
	  };

	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true;
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result);
	      };
	      reader.onerror = function() {
	        reject(reader.error);
	      };
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader();
	    var promise = fileReaderReady(reader);
	    reader.readAsArrayBuffer(blob);
	    return promise
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader();
	    var promise = fileReaderReady(reader);
	    reader.readAsText(blob);
	    return promise
	  }

	  function readArrayBufferAsText(buf) {
	    var view = new Uint8Array(buf);
	    var chars = new Array(view.length);

	    for (var i = 0; i < view.length; i++) {
	      chars[i] = String.fromCharCode(view[i]);
	    }
	    return chars.join('')
	  }

	  function bufferClone(buf) {
	    if (buf.slice) {
	      return buf.slice(0)
	    } else {
	      var view = new Uint8Array(buf.byteLength);
	      view.set(new Uint8Array(buf));
	      return view.buffer
	    }
	  }

	  function Body() {
	    this.bodyUsed = false;

	    this._initBody = function(body) {
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
	        this._bodyArrayBuffer = bufferClone(body.buffer);
	        // IE 10-11 can't handle a DataView body.
	        this._bodyInit = new Blob([this._bodyArrayBuffer]);
	      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
	        this._bodyArrayBuffer = bufferClone(body);
	      } else {
	        throw new Error('unsupported BodyInit type')
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
	      this.blob = function() {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyArrayBuffer) {
	          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      };

	      this.arrayBuffer = function() {
	        if (this._bodyArrayBuffer) {
	          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
	        } else {
	          return this.blob().then(readBlobAsArrayBuffer)
	        }
	      };
	    }

	    this.text = function() {
	      var rejected = consumed(this);
	      if (rejected) {
	        return rejected
	      }

	      if (this._bodyBlob) {
	        return readBlobAsText(this._bodyBlob)
	      } else if (this._bodyArrayBuffer) {
	        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
	      } else if (this._bodyFormData) {
	        throw new Error('could not read FormData body as text')
	      } else {
	        return Promise.resolve(this._bodyText)
	      }
	    };

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      };
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    };

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase();
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {};
	    var body = options.body;

	    if (input instanceof Request) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
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
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body);
	  }

	  Request.prototype.clone = function() {
	    return new Request(this, { body: this._bodyInit })
	  };

	  function decode(body) {
	    var form = new FormData();
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=');
	        var name = split.shift().replace(/\+/g, ' ');
	        var value = split.join('=').replace(/\+/g, ' ');
	        form.append(decodeURIComponent(name), decodeURIComponent(value));
	      }
	    });
	    return form
	  }

	  function parseHeaders(rawHeaders) {
	    var headers = new Headers();
	    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
	    // https://tools.ietf.org/html/rfc7230#section-3.2
	    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
	    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
	      var parts = line.split(':');
	      var key = parts.shift().trim();
	      if (key) {
	        var value = parts.join(':').trim();
	        headers.append(key, value);
	      }
	    });
	    return headers
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

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  };

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''});
	    response.type = 'error';
	    return response
	  };

	  var redirectStatuses = [301, 302, 303, 307, 308];

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  };

	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;

	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request = new Request(input, init);
	      var xhr = new XMLHttpRequest();

	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
	        };
	        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options));
	      };

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'));
	      };

	      xhr.ontimeout = function() {
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

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value);
	      });

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
	    })
	  };
	  self.fetch.polyfill = true;
	})(typeof self !== 'undefined' ? self : window);

	// the whatwg-fetch polyfill installs the fetch() function
	// on the global object (window or self)
	//
	// Return that as the export for use in Webpack, Browserify etc.

	var fetchNpmBrowserify = self.fetch.bind(self);

	//import BeetClient from './lib/BeetClient';


	const host = 'ws://127.0.0.1:60556';






	class Beet {

	    constructor() {
	        this.host = 'ws://127.0.0.1:60556';
	        this.connected = false;
	        this.initialised = false;
	        this.socket = null;
	        this.appName = null;
	        this.otp = null;
	        this.openRequests = [];
	        this.origin = null;
	        this.socket=null;
	    }
	    async init(app) {
	        if (this.initialised === false) {
	            this.appName = app;
	            this.origin = app;
	            if (typeof location !== 'undefined') {
	                if (location.hasOwnProperty('hostname') && location.hostname.length && location.hostname !== 'localhost') {
	                    this.origin = location.hostname;
	                }
	            }
	        }
	        this.detected = browserDetect();
	        this.keyhash = cryptoJs.SHA256(this.detected.name + ' ' + this.origin + ' ' + this.appName).toString();
	        let appstore;
	        appstore = await BeetClientDB.apps.where("keyhash").equals(this.keyhash).toArray();
	        this.initialised = true;
	        return appstore;
	    }
	    ping() {
	        let ping;
	        return new Promise(async (resolve, reject) => {
	            try {
	                ping = new WebSocket(host);
	                ping.onopen = function (evt) {
	                    ping.send('{ "type" : "version"}');
	                };
	                ping.onmessage = function (evt) {
	                    let msg = JSON.parse(evt.data);
	                    if (msg.type == "version") {
	                        resolve(msg.result);
	                    } else {
	                        reject(false);
	                    }
	                    ping.close();
	                };
	            } catch (e) {
	                reject(false);
	            }
	        });
	    }
	    isInstalled() {
	        return new Promise(resolve => {
	            setTimeout(() => {
	                resolve(false);
	            }, 3000);
	            this.ping().then(found => {
	                if (found) resolve(found);
	            });

	        })
	    }
	    async get_id() {
	        return Math.round(Math.random() * 100000000 + 1);
	    }
	    async next_id() {
	        if (this.connected && this.authorised && this.linked) {
	            let next_id = Math.round(Math.random() * 100000000 + 1);
	            await BeetClientDB.apps.where("apphash").equals(this.apphash).modify({
	                next_id: next_id
	            });
	            return next_id;
	        } else {
	            throw new Error("You must be connected, authorised and linked.");
	        }
	    }
	    async link(chain='BTS') {
	        return new Promise(async resolve => {
	            if (!this.connected) throw new Error("You must connect to Beet first.");            
	            if (!this.initialised) throw new Error("You must initialise the Beet Client first via init(appName).");
	            setTimeout(() => {
	                resolve(false);
	            }, this.options.linkTimeout);
	            this.privk = crypto.randomBytes(32);
	            let pubkey = browser.getPublic(this.privk).toString('hex');
	            this.secret= await browser.derive(this.privk, this.beetkey);
	            console.log(secret);
	            let linkobj= {
	                chain: "BTS",
	                pubkey: pubkey,
	                next_hash:  cryptoJs.SHA256(this.next_id())
	            };
	            var link = this.sendRequest('link', linkobj);
	            link.then(res => {
	                resolve(res);
	            }).catch(rej =>{
	                reject(rej);
	            });
	        });

	    }
	    async connect(identity = null, options) {
	        return new Promise(resolve => {
	            if (!this.initialised) throw new Error("You must initialise the Beet Client first via init(appName).");

	            // Setting options defaults
	            this.options = Object.assign({
	                initTimeout: 10000,
	                linkTimeout: 30000
	            }, options);

	            // Auto failer
	            setTimeout(() => {
	                resolve(false);
	            }, options.initTimeout);

	            let authobj;
	            if (identity != null) {
	                this.identity = identity;
	                authobj = {
	                    origin: this.origin,
	                    appName: this.appName,
	                    browser: this.detected.name,
	                    apphash: this.identity.apphash
	                };
	            } else {
	                authobj = {
	                    origin: this.origin,
	                    appName: this.appName,
	                    browser: this.detected.name,
	                };
	            }
	            this.socket = new WebSocket(host);
	            this.socket.onopen = async (evt) => {
	                console.log('Connected');
	                this.connected = true;
	                var auth = this.sendRequest('authenticate', authobj);

	                auth.then(res => {
	                        console.log(res);
	                        this.authenticated = res.authenticate;
	                        this.linked = res.link;
	                        if (this.linked) {
	                            this.otp=new OTPAuth.HOTP({
	                                issuer: "Beet",
	                                label: "BeetAuth",
	                                algorithm: "SHA1",
	                                digits: 32,
	                                counter: 0,
	                                secret: OTPAuth.Secret.fromHex(this.identity.secret)
	                              });
	                        }else{
	                            this.beetkey= res.pub_key;
	                        }
	                        resolve(res);
	                    
	                }).catch(rej => {
	                    reject(rej);
	                });
	            };
	            this.socket.onclose = function (evt) {
	                console.log('Disconnected');
	                connected = false;
	                this.socket = null;
	            };
	            this.socket.onmessage =  (evt)=> {
	                console.log('received');
	                let msg = JSON.parse(evt.data);
	                const openRequest = this.openRequests.find(x => x.id === msg.id);
	                if (!openRequest) return;
	                if (msg.error) {
	                    openRequest.reject(msg.payload.message);
	                } else {
	                    if (msg.encrypted) {
	                        this.otp.counter = id;
	                        let key = this.otp.generate();
	                        var response = cryptoJs.AES.decrypt(msg.payload, key).toString(cryptoJs.enc.Utf8);
	                        openRequest.resolve(response);
	                    } else {
	                        openRequest.resolve(msg.payload);
	                    }
	                }
	            };

	        })
	    }
	    async sendRequest(type, payload) {
	        return new Promise(async (resolve, reject) => {
	            let request = {};
	            request.id =await this.get_id();
	            request.type = type;
	            if (type == 'api') {
	                payload.next_hash = cryptoJs.SHA256(this.next_id());
	               this.otp.counter = id;
	                let key = this.otp.generate();
	                request.payload = cryptoJs.AES.encrypt(JSON.stringify(payload), key).toString();
	            } else {
	                request.payload = payload;
	            }
	            this.openRequests.push(Object.assign(request, {
	                resolve,
	                reject
	            }));
	            this.socket.send(JSON.stringify(request));
	            console.log('sent');
	        });
	    }
	    disconnect() {
	        return BeetClient.disconnect();
	    }

	    isConnected() {
	        return BeetClient.isConnected();
	    }


	    getAccount() {
	        //throwNoAuth();
	        return BeetClient.sendApiRequest({
	            type: 'getAccount',
	            payload: {
	                //        fields:requiredFields
	            }
	        }).then(id => {
	            if (id) this.identity = id;
	            return id;
	        });
	    }


	    requestSignature(payload) {
	        //throwNoAuth();
	        return BeetClient.sendApiRequest({
	            type: 'requestSignature',
	            payload: payload
	        });
	    }

	    voteFor(payload) {
	        //throwNoAuth();
	        return BeetClient.sendApiRequest({
	            type: 'voteFor',
	            payload: payload
	        });
	    }

	}


	class Holder {
	    constructor(_companion) {
	        this.beet = _companion;
	    }
	}


	let holder = new Holder(new Beet());
	if (typeof window !== 'undefined') window.beet = holder.beet;

	return holder;

}(crypto));
