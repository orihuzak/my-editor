/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ "./node_modules/uuid/index.js":
/*!************************************!*\
  !*** ./node_modules/uuid/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(/*! ./v1 */ "./node_modules/uuid/v1.js");
var v4 = __webpack_require__(/*! ./v4 */ "./node_modules/uuid/v4.js");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "./node_modules/uuid/v1.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "./src/components/cursor/cursor.css":
/*!******************************************!*\
  !*** ./src/components/cursor/cursor.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".rod {\n  display: inline-block;\n  border-left: 1px solid #000;\n  height: inherit;\n}\n\n.input {\n  resize: none;\n  overflow: hidden;\n  outline: 0;\n\n  display: inline-block;\n  line-height: 100%;\n  width: 0;\n  height: inherit;\n  border: 0;\n  padding: 0;\n  font: inherit;\n  color: inherit;\n  /* opacity: 0; */\n  /* background: transparent; */\n  /* cursor: text; */\n  /* カーソルを非表示にするcss\n  text-shadow : 0 0 0 #000;\n  */ \n}", ""]);



/***/ }),

/***/ "./src/components/cursor/cursor.ts":
/*!*****************************************!*\
  !*** ./src/components/cursor/cursor.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Cursor; });
const css = __webpack_require__(/*! ./cursor.css */ "./src/components/cursor/cursor.css").toString();
const returnCodes = /\r|\n|\r\n/;
class Cursor extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        // パーツを生成
        this.rod = document.createElement('div');
        this.rod.className = 'rod';
        this.input = document.createElement('textarea');
        this.input.className = 'input';
        this.input.wrap = 'soft';
        this.input.rows = 1;
        this.input.autofocus = true; // ページロードされた時にフォーカスを当てるかどうか
        this.input.onblur = (e) => {
            this.style.display = 'none';
        };
        // スタイルを追加
        const style = document.createElement('style');
        style.textContent = css;
        this.shadow.appendChild(style);
        // html要素を追加
        this.shadow.appendChild(this.input);
        this.shadow.appendChild(this.rod);
    }
    resetValue() {
        this.input.value = '';
    }
    getValue() {
        return this.input.value;
    }
    getValueExcludedReturnCodes() {
        return this.input.value.replace(returnCodes, '');
    }
}
customElements.define('my-cursor', Cursor);


/***/ }),

/***/ "./src/components/editor/editor.css":
/*!******************************************!*\
  !*** ./src/components/editor/editor.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".editor {\n  width: 100%;\n  height: 100%;\n}\n\n.line {\n  display: flex;\n  height: 1.5em;\n  background-color: lightblue;\n  border-bottom: 1px dotted gray;\n}\n\n.indent {\n  display: flex;\n}\n\n.text {\n  display: flex;\n  align-items: center;\n}\n\n.char {\n  white-space: pre;\n}\n\n.space {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  width: 1.5em;\n  margin: 0;\n  padding: 0;\n  white-space: pre;\n  pointer-events: none; /* クリックを透過する */\n  /* background-color: red; */\n}\n\n.indent-mark {\n  width: 6px;\n  height: 3px;\n  margin-right: 0.2em; /* テキストにくっつきすぎないように配慮 */\n  background-color: #bbbbbb;\n}\n\n.raw-string {\n  height: 1em;\n}\n\nmy-cursor {\n  position: absolute;\n  height: 1em;\n}", ""]);



/***/ }),

/***/ "./src/components/editor/editor.ts":
/*!*****************************************!*\
  !*** ./src/components/editor/editor.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Editor; });
/* harmony import */ var components_cursor_cursor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! components/cursor/cursor */ "./src/components/cursor/cursor.ts");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_1__);
const css = __webpack_require__(/*! ./editor.css */ "./src/components/editor/editor.css").toString();


const print = console.log;
var Key;
(function (Key) {
    Key["tab"] = "Tab";
    Key["delete"] = "Backspace";
    Key["enter"] = "Enter";
    Key["space"] = " ";
    Key["left"] = "ArrowLeft";
    Key["right"] = "ArrowRight";
    Key["up"] = "ArrowUp";
    Key["down"] = "ArrowDown";
})(Key || (Key = {}));
class Editor extends HTMLElement {
    constructor() {
        super();
        // コンストラクターの中でシャドウルートをつくる必要があるらしい
        this.shadow = this.attachShadow({ mode: 'open' });
        this.lines = document.createElement('div');
        this.lines.className = 'lines';
        // カーソルを設定
        this.cursor = new components_cursor_cursor__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.cursor.className = 'cursor';
        this.cursor.input.oninput = (e) => this.onInput(e);
        this.cursor.input.onkeydown = (e) => this.keyDown(e);
        this.cursor.input.onkeypress = (e) => this.keyPress(e);
        this.cursor.input.onkeyup = (e) => this.keyUp(e);
        this.cursor.input.addEventListener('compositionend', (e) => this.writeToLine());
        this.shadow.appendChild(this.cursor);
        // 入力された文字列の幅を取得するためのspan
        this.rawStr = document.createElement('span');
        this.rawStr.className = 'raw-string';
        // スタイルを設定
        const style = document.createElement('style');
        style.textContent = css;
        this.shadow.appendChild(style);
        this.shadow.appendChild(this.lines);
        // 最初の行を追加
        const newLine = this.makeNewLine();
        this.lines.appendChild(newLine);
        // 画面読み込み時の処理
        window.onload = () => {
            const text = this.lines.firstElementChild.getElementsByClassName('text')[0];
            text.insertBefore(this.rawStr, text.firstChild);
            this.drawCursor();
        };
    }
    keyDown(e) {
        const curText = this.rawStr.parentNode;
        print(`${e.type}: ${e.key}`);
        if (!e.isComposing) { // 非IME入力
            switch (e.key) {
                case 'Tab': {
                    if (e.shiftKey) {
                        this.unindent();
                    }
                    else if (curText.firstChild === this.rawStr) {
                        this.indent();
                    }
                    e.preventDefault();
                    break;
                }
                case 'Backspace': {
                    if (this.rawStr.previousSibling) {
                        this.deleteLeft();
                    }
                    else {
                        const indent = this.rawStr.parentNode.previousSibling;
                        if (indent.firstChild) {
                            this.unindent();
                        }
                        else {
                            this.joinPrevLine();
                        }
                    }
                    break;
                }
                case 'Enter': {
                    this.insertNewLine();
                    break;
                }
                case ' ': {
                    if (curText.firstChild === this.rawStr) {
                        this.indent();
                    }
                    break;
                }
                case 'ArrowLeft': {
                    if (e.ctrlKey) {
                        this.unindent();
                    }
                    else if (e.metaKey) {
                        this.moveToLineStart();
                    }
                    else { // 左入力のみ
                        this.cursorLeft();
                    }
                    break;
                }
                case 'ArrowRight': {
                    if (e.ctrlKey) {
                        this.indent();
                    }
                    else if (e.metaKey) {
                        this.moveToLineEnd();
                    }
                    else {
                        this.cursorRight();
                    }
                    break;
                }
                case 'ArrowUp': {
                    if (e.metaKey) {
                        this.moveToPageStart();
                    }
                    else {
                        this.cursorUp();
                    }
                    break;
                }
                case 'ArrowDown': {
                    if (e.metaKey) {
                        this.moveToPageEnd();
                    }
                    else {
                        this.cursorDown();
                    }
                    break;
                }
                case 'a': {
                    if (e.ctrlKey) {
                        this.moveToLineStart();
                    }
                    break;
                }
                case 'e': {
                    if (e.ctrlKey) {
                        this.moveToLineEnd();
                    }
                    break;
                }
            }
        }
    }
    keyPress(e) {
        // print(`${e.type}: ${e.key}: ${e.which}`)
    }
    keyUp(e) {
        print(`${e.type}: ${e.key}`);
    }
    onInput(e) {
        print(`${e.type}: ${e.inputType}: ${e.dataTransfer}: ${e.data}: ${e.isComposing}`);
        if (!e.isComposing) {
            print('非IME入力');
            const text = this.rawStr.parentElement;
            switch (e.data) {
                case ' ':
                case '\u3000': {
                    if (text.firstChild === this.rawStr) {
                        // 行の先頭に半角/全角スペースが入らないようにする措置
                        this.cursor.resetValue();
                    }
                    else {
                        this.writeToLine();
                        return;
                    }
                    break;
                }
                default: {
                    this.writeToLine();
                    return;
                }
            }
        }
        this.resizeInput();
    }
    onClick(e) {
        this.insertRawStr(e);
        if (this.cursor.style.display === 'none') {
            this.cursor.style.display = 'inline-block';
        }
        this.drawCursor();
    }
    writeToLine() {
        this.insertTextToLine();
        this.cursor.resetValue(); // valueを初期化
        this.resizeInput();
        this.drawCursor();
    }
    /** カーソルを左に動かす */
    cursorLeft() {
        const text = this.rawStr.parentNode;
        const prevChar = this.rawStr.previousSibling;
        if (prevChar) {
            text.insertBefore(this.rawStr, prevChar);
        }
        else {
            const prevLine = text.parentNode.previousSibling;
            if (prevLine) {
                prevLine.lastChild.appendChild(this.rawStr);
            }
        }
        this.drawCursor();
    }
    /** カーソルを右に動かす */
    cursorRight() {
        const text = this.rawStr.parentNode;
        const nextChar = this.rawStr.nextSibling;
        if (nextChar) {
            text.insertBefore(this.rawStr, nextChar.nextSibling);
        }
        else {
            const nextLine = text.parentNode.nextSibling;
            if (nextLine) {
                const nextText = nextLine.lastChild;
                nextText.insertBefore(this.rawStr, nextText.firstChild);
            }
        }
        this.drawCursor();
    }
    /** カーソルを上に動かします */
    cursorUp() {
        const text = this.rawStr.parentNode;
        const curLine = text.parentNode;
        const preLine = curLine.previousSibling;
        if (preLine) {
            const preText = preLine.lastChild;
            const preChars = preText.childNodes;
            if (preChars) {
                const index = [...text.childNodes].indexOf(this.rawStr);
                const tgt = preChars.item(index);
                preText.insertBefore(this.rawStr, tgt);
            }
            else {
                preText.appendChild(this.rawStr);
            }
        }
        else {
            this.moveToLineStart();
        }
        this.drawCursor();
    }
    cursorDown() {
        const curText = this.rawStr.parentNode;
        const curLine = curText.parentNode;
        const nextLine = curLine.nextSibling;
        if (nextLine) {
            const nextText = nextLine.lastChild;
            const nextChars = nextText.childNodes;
            if (nextChars) {
                const curLoc = [...curText.childNodes].indexOf(this.rawStr);
                const tgt = nextChars.item(curLoc);
                nextText.insertBefore(this.rawStr, tgt);
            }
            else {
                nextText.appendChild(this.rawStr);
            }
        }
        else {
            this.moveToLineEnd();
        }
        this.drawCursor();
    }
    /* 現在の行を前の行と連結する */
    joinPrevLine() {
        const text = this.rawStr.parentNode;
        const curLine = text.parentElement;
        if (curLine !== this.lines.firstChild) {
            const curChars = [...text.children]; // コピーする
            const prevLine = curLine.previousSibling;
            const prevText = prevLine.lastChild;
            for (const char of curChars) {
                prevText.appendChild(char);
            }
            this.lines.removeChild(curLine);
            this.drawCursor();
        }
    }
    /** 左の文字を削除 */
    deleteLeft() {
        const text = this.rawStr.parentElement;
        text.removeChild(this.rawStr.previousSibling);
        this.drawCursor();
    }
    indent() {
        const indent = this.rawStr.parentElement.previousSibling;
        const space = document.createElement('span');
        space.className = 'space';
        space.innerText = ' ';
        if (!indent.firstChild) {
            const mark = document.createElement('span');
            mark.className = 'indent-mark';
            space.appendChild(mark);
        }
        indent.insertBefore(space, indent.firstChild);
        this.drawCursor();
    }
    /** インデント部に子要素があればアンインデント */
    unindent() {
        const indent = this.rawStr.parentNode.previousSibling;
        if (indent.firstChild) {
            indent.removeChild(indent.firstChild);
            this.drawCursor();
            return true;
        }
        return false;
    }
    /** ページ頭へ移動 */
    moveToPageStart() {
        const firstLine = this.lines.firstChild;
        const firstLineText = firstLine.lastChild;
        if (firstLineText.firstChild !== this.rawStr) {
            firstLineText.insertBefore(this.rawStr, firstLineText.firstChild);
            this.drawCursor();
        }
    }
    /** ページ末へ移動 */
    moveToPageEnd() {
        const lastLine = this.lines.lastChild;
        const lastLineText = lastLine.lastChild;
        if (lastLineText.lastChild !== this.rawStr) {
            lastLineText.appendChild(this.rawStr);
            this.drawCursor();
        }
    }
    moveToLineStart() {
        const curText = this.rawStr.parentNode;
        if (curText.firstChild !== this.rawStr) {
            curText.insertBefore(this.rawStr, curText.firstChild);
            this.drawCursor();
        }
    }
    moveToLineEnd() {
        const curText = this.rawStr.parentNode;
        if (curText.lastChild !== this.rawStr) {
            curText.appendChild(this.rawStr);
            this.drawCursor();
        }
    }
    /**
     * 現在のlineのtext部に入力が決定した文字列を1文字ずつ分割したspan要素にして入れる
     */
    insertTextToLine() {
        const chars = [...this.cursor.getValueExcludedReturnCodes()];
        const lastIndex = chars.length - 1;
        const currentTextPart = this.rawStr.parentElement;
        const nextChar = this.rawStr.nextSibling;
        for (const [i, char] of chars.entries()) {
            const span = document.createElement('span');
            span.className = 'char';
            span.innerText = char;
            if (nextChar) {
                currentTextPart.insertBefore(span, nextChar);
                if (i === lastIndex) {
                    currentTextPart.insertBefore(this.rawStr, nextChar);
                }
            }
            else {
                currentTextPart.appendChild(span);
                if (i === lastIndex) {
                    currentTextPart.appendChild(this.rawStr);
                }
            }
        }
    }
    /** textareaの幅と高さを入力された文字列に応じて変化させる */
    resizeInput() {
        this.rawStr.innerText = this.cursor.getValueExcludedReturnCodes();
        this.cursor.input.style.width = this.rawStr.offsetWidth + 'px';
    }
    /** 新しいlineを現在カーソルがある行の次の要素として挿入しつつ、カーソルより後にあるspan.charを全て新しい行に挿入する */
    insertNewLine() {
        const newLine = this.makeNewLine();
        const currentLine = this.rawStr.parentElement.parentElement;
        const text = this.rawStr.parentElement;
        const chars = [...text.children];
        const index = chars.indexOf(this.rawStr);
        const newChildren = chars.slice(index);
        const newText = newLine.getElementsByClassName('text')[0];
        for (const child of newChildren) {
            newText.appendChild(child);
        }
        this.lines.insertBefore(newLine, currentLine.nextSibling);
        const indent = text.previousSibling;
        for (const child of indent.childNodes) {
            this.indent();
        }
        this.drawCursor();
    }
    makeNewLine() {
        const newLine = document.createElement('div');
        newLine.className = 'line';
        newLine.onclick = (e) => this.onClick(e);
        // line.idに重複がないか確認する
        let bool;
        let uuid;
        do {
            bool = false;
            uuid = Object(uuid__WEBPACK_IMPORTED_MODULE_1__["v4"])();
            for (const line of this.lines.children) {
                if (line.id === uuid) {
                    bool = true;
                }
            }
        } while (bool);
        newLine.setAttribute('id', uuid);
        // lineにindent部とtext部を追加
        const indent = document.createElement('span');
        indent.className = 'indent';
        const text = document.createElement('span');
        text.className = 'text';
        newLine.appendChild(indent);
        newLine.appendChild(text);
        return newLine;
    }
    /** クリックされた位置にspan.rawStrを挿入し、カーソルの移動位置が文字の上に重ならないように配置する */
    insertRawStr(e) {
        const clickedElem = this.shadow.elementFromPoint(e.x, e.y);
        const objL = clickedElem.getBoundingClientRect().left;
        const objR = clickedElem.getBoundingClientRect().right;
        if (clickedElem.className === 'char') {
            const diffL = e.x - objL;
            const diffR = objR - e.x;
            if (diffR <= diffL) {
                clickedElem.parentNode.insertBefore(this.rawStr, clickedElem.nextSibling); // rawStrを追加
            }
            else {
                clickedElem.parentNode.insertBefore(this.rawStr, clickedElem); // rawStrを追加
            }
        }
        else if (clickedElem.className === 'indent') {
            const text = clickedElem.nextSibling;
            text.insertBefore(this.rawStr, text.firstChild);
        }
        else if (clickedElem.className === 'line') {
            const text = clickedElem.getElementsByClassName('text')[0];
            text.appendChild(this.rawStr); // rawStrを挿入
        }
    }
    /** span.rawStrの右端の位置にcursorを表示する */
    drawCursor() {
        const rawStrRect = this.rawStr.getBoundingClientRect();
        this.cursor.style.left = rawStrRect.right + 'px';
        this.cursor.style.top = rawStrRect.top + 'px';
        this.cursor.input.focus();
    }
}
// 登録
customElements.define('my-editor', Editor);


/***/ }),

/***/ "./src/components/page/page.ts":
/*!*************************************!*\
  !*** ./src/components/page/page.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Page; });
/* harmony import */ var components_editor_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! components/editor/editor */ "./src/components/editor/editor.ts");

class Page extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.editor = new components_editor_editor__WEBPACK_IMPORTED_MODULE_0__["default"]();
        // ルートを追加
        this.shadow.appendChild(this.editor);
    }
}
customElements.define('my-page', Page);


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_page_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/page/page */ "./src/components/page/page.ts");

const css = __webpack_require__(/*! ./style.css */ "./src/style.css").toString();
function main() {
    const body = document.body;
    const page = new _components_page_page__WEBPACK_IMPORTED_MODULE_0__["default"]();
    const style = document.createElement('style');
    style.textContent = css;
    body.appendChild(style);
    body.appendChild(page);
}
main();


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "body {\n  font-size: 1em;\n}\n\nmy-page {\n  display: block;\n  width: auto;\n  height: auto;\n  padding: 1em;\n  box-shadow: 0 3px 5px darkgrey;\n}", ""]);



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXVpZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXVpZC9saWIvYnl0ZXNUb1V1aWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL3JuZy1icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL3YxLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL3Y0LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2N1cnNvci9jdXJzb3IuY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2N1cnNvci9jdXJzb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZWRpdG9yL2VkaXRvci5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZWRpdG9yL2VkaXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wYWdlL3BhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFF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QUE2QztBQUU5QixNQUFNLElBQUssU0FBUSxXQUFXO0lBSTNDO1FBQ0UsS0FBSyxFQUFFO1FBQ1AsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBQ2pELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxnRUFBTSxFQUFFO1FBRTFCLFNBQVM7UUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3RDLENBQUM7Q0FDRjtBQUVELGNBQWMsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7OztBQ2hCdEM7QUFBQTtBQUF5QztBQUN6QyxNQUFNLEdBQUcsR0FBRyxtQkFBTyxDQUFDLG9DQUFhLENBQUMsQ0FBQyxRQUFRLEVBQUU7QUFFN0MsU0FBUyxJQUFJO0lBQ1gsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUk7SUFDMUIsTUFBTSxJQUFJLEdBQUcsSUFBSSw2REFBSSxFQUFFO0lBRXZCLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO0lBQzdDLEtBQUssQ0FBQyxXQUFXLEdBQUcsR0FBRztJQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztJQUV2QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztBQUN4QixDQUFDO0FBRUQsSUFBSSxFQUFFOzs7Ozs7Ozs7Ozs7QUNkTiwyQkFBMkIsbUJBQU8sQ0FBQyxxR0FBZ0Q7QUFDbkY7QUFDQSxjQUFjLFFBQVMsU0FBUyxtQkFBbUIsR0FBRyxhQUFhLG1CQUFtQixnQkFBZ0IsaUJBQWlCLGlCQUFpQixtQ0FBbUMsR0FBRyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVzZVNvdXJjZU1hcCkge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiAnQG1lZGlhICcgKyBpdGVtWzJdICsgJ3snICsgY29udGVudCArICd9JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgfVxuICAgIH0pLmpvaW4oJycpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCAnJ11dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBtb2R1bGVzW2ldOyAvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG4gICAgICAvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuICAgICAgLy8gd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuICAgICAgLy8gSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXG4gICAgICBpZiAoaXRlbVswXSA9PSBudWxsIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGlmIChtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSAnKCcgKyBpdGVtWzJdICsgJykgYW5kICgnICsgbWVkaWFRdWVyeSArICcpJztcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJztcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59IC8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcblxuXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcbiAgdmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcbiAgcmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn0iLCJ2YXIgdjEgPSByZXF1aXJlKCcuL3YxJyk7XG52YXIgdjQgPSByZXF1aXJlKCcuL3Y0Jyk7XG5cbnZhciB1dWlkID0gdjQ7XG51dWlkLnYxID0gdjE7XG51dWlkLnY0ID0gdjQ7XG5cbm1vZHVsZS5leHBvcnRzID0gdXVpZDtcbiIsIi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xudmFyIGJ5dGVUb0hleCA9IFtdO1xuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xufVxuXG5mdW5jdGlvbiBieXRlc1RvVXVpZChidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IG9mZnNldCB8fCAwO1xuICB2YXIgYnRoID0gYnl0ZVRvSGV4O1xuICAvLyBqb2luIHVzZWQgdG8gZml4IG1lbW9yeSBpc3N1ZSBjYXVzZWQgYnkgY29uY2F0ZW5hdGlvbjogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzE3NSNjNFxuICByZXR1cm4gKFtidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCBcblx0YnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuXHRidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG5cdGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcblx0YnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuXHRidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLFxuXHRidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLFxuXHRidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dXSkuam9pbignJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnl0ZXNUb1V1aWQ7XG4iLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgSW4gdGhlXG4vLyBicm93c2VyIHRoaXMgaXMgYSBsaXR0bGUgY29tcGxpY2F0ZWQgZHVlIHRvIHVua25vd24gcXVhbGl0eSBvZiBNYXRoLnJhbmRvbSgpXG4vLyBhbmQgaW5jb25zaXN0ZW50IHN1cHBvcnQgZm9yIHRoZSBgY3J5cHRvYCBBUEkuICBXZSBkbyB0aGUgYmVzdCB3ZSBjYW4gdmlhXG4vLyBmZWF0dXJlLWRldGVjdGlvblxuXG4vLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG9cbi8vIGltcGxlbWVudGF0aW9uLiBBbHNvLCBmaW5kIHRoZSBjb21wbGV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBjcnlwdG8gb24gSUUxMS5cbnZhciBnZXRSYW5kb21WYWx1ZXMgPSAodHlwZW9mKGNyeXB0bykgIT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mKG1zQ3J5cHRvKSAhPSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93Lm1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyA9PSAnZnVuY3Rpb24nICYmIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKG1zQ3J5cHRvKSk7XG5cbmlmIChnZXRSYW5kb21WYWx1ZXMpIHtcbiAgLy8gV0hBVFdHIGNyeXB0byBSTkcgLSBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvQ3J5cHRvXG4gIHZhciBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd2hhdHdnUk5HKCkge1xuICAgIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG4gICAgcmV0dXJuIHJuZHM4O1xuICB9O1xufSBlbHNlIHtcbiAgLy8gTWF0aC5yYW5kb20oKS1iYXNlZCAoUk5HKVxuICAvL1xuICAvLyBJZiBhbGwgZWxzZSBmYWlscywgdXNlIE1hdGgucmFuZG9tKCkuICBJdCdzIGZhc3QsIGJ1dCBpcyBvZiB1bnNwZWNpZmllZFxuICAvLyBxdWFsaXR5LlxuICB2YXIgcm5kcyA9IG5ldyBBcnJheSgxNik7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtYXRoUk5HKCkge1xuICAgIGZvciAodmFyIGkgPSAwLCByOyBpIDwgMTY7IGkrKykge1xuICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XG4gICAgICBybmRzW2ldID0gciA+Pj4gKChpICYgMHgwMykgPDwgMykgJiAweGZmO1xuICAgIH1cblxuICAgIHJldHVybiBybmRzO1xuICB9O1xufVxuIiwidmFyIHJuZyA9IHJlcXVpcmUoJy4vbGliL3JuZycpO1xudmFyIGJ5dGVzVG9VdWlkID0gcmVxdWlyZSgnLi9saWIvYnl0ZXNUb1V1aWQnKTtcblxuLy8gKipgdjEoKWAgLSBHZW5lcmF0ZSB0aW1lLWJhc2VkIFVVSUQqKlxuLy9cbi8vIEluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9MaW9zSy9VVUlELmpzXG4vLyBhbmQgaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L3V1aWQuaHRtbFxuXG52YXIgX25vZGVJZDtcbnZhciBfY2xvY2tzZXE7XG5cbi8vIFByZXZpb3VzIHV1aWQgY3JlYXRpb24gdGltZVxudmFyIF9sYXN0TVNlY3MgPSAwO1xudmFyIF9sYXN0TlNlY3MgPSAwO1xuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG5mdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgdmFyIGIgPSBidWYgfHwgW107XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXEgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7XG5cbiAgLy8gbm9kZSBhbmQgY2xvY2tzZXEgbmVlZCB0byBiZSBpbml0aWFsaXplZCB0byByYW5kb20gdmFsdWVzIGlmIHRoZXkncmUgbm90XG4gIC8vIHNwZWNpZmllZC4gIFdlIGRvIHRoaXMgbGF6aWx5IHRvIG1pbmltaXplIGlzc3VlcyByZWxhdGVkIHRvIGluc3VmZmljaWVudFxuICAvLyBzeXN0ZW0gZW50cm9weS4gIFNlZSAjMTg5XG4gIGlmIChub2RlID09IG51bGwgfHwgY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgIHZhciBzZWVkQnl0ZXMgPSBybmcoKTtcbiAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbiAgICAgIG5vZGUgPSBfbm9kZUlkID0gW1xuICAgICAgICBzZWVkQnl0ZXNbMF0gfCAweDAxLFxuICAgICAgICBzZWVkQnl0ZXNbMV0sIHNlZWRCeXRlc1syXSwgc2VlZEJ5dGVzWzNdLCBzZWVkQnl0ZXNbNF0sIHNlZWRCeXRlc1s1XVxuICAgICAgXTtcbiAgICB9XG4gICAgaWYgKGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG4gICAgICBjbG9ja3NlcSA9IF9jbG9ja3NlcSA9IChzZWVkQnl0ZXNbNl0gPDwgOCB8IHNlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG4gICAgfVxuICB9XG5cbiAgLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG4gIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG4gIHZhciBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTtcblxuICAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG4gIHZhciBkdCA9IChtc2VjcyAtIF9sYXN0TVNlY3MpICsgKG5zZWNzIC0gX2xhc3ROU2VjcykvMTAwMDA7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT09IHVuZGVmaW5lZCkge1xuICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICB9XG5cbiAgLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgLy8gdGltZSBpbnRlcnZhbFxuICBpZiAoKGR0IDwgMCB8fCBtc2VjcyA+IF9sYXN0TVNlY3MpICYmIG9wdGlvbnMubnNlY3MgPT09IHVuZGVmaW5lZCkge1xuICAgIG5zZWNzID0gMDtcbiAgfVxuXG4gIC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcbiAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1dWlkLnYxKCk6IENhblxcJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjJyk7XG4gIH1cblxuICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7XG5cbiAgLy8gUGVyIDQuMS40IC0gQ29udmVydCBmcm9tIHVuaXggZXBvY2ggdG8gR3JlZ29yaWFuIGVwb2NoXG4gIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwO1xuXG4gIC8vIGB0aW1lX2xvd2BcbiAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjtcblxuICAvLyBgdGltZV9taWRgXG4gIHZhciB0bWggPSAobXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwKSAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjtcblxuICAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmO1xuXG4gIC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7XG5cbiAgLy8gYGNsb2NrX3NlcV9sb3dgXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjtcblxuICAvLyBgbm9kZWBcbiAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyArK24pIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cblxuICByZXR1cm4gYnVmID8gYnVmIDogYnl0ZXNUb1V1aWQoYik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjE7XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICBpZiAodHlwZW9mKG9wdGlvbnMpID09ICdzdHJpbmcnKSB7XG4gICAgYnVmID0gb3B0aW9ucyA9PT0gJ2JpbmFyeScgPyBuZXcgQXJyYXkoMTYpIDogbnVsbDtcbiAgICBvcHRpb25zID0gbnVsbDtcbiAgfVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7XG5cbiAgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XG4gIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcblxuICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgaWYgKGJ1Zikge1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCAxNjsgKytpaSkge1xuICAgICAgYnVmW2kgKyBpaV0gPSBybmRzW2lpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmIHx8IGJ5dGVzVG9VdWlkKHJuZHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHY0O1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIucm9kIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgIzAwMDtcXG4gIGhlaWdodDogaW5oZXJpdDtcXG59XFxuXFxuLmlucHV0IHtcXG4gIHJlc2l6ZTogbm9uZTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBvdXRsaW5lOiAwO1xcblxcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbGluZS1oZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMDtcXG4gIGhlaWdodDogaW5oZXJpdDtcXG4gIGJvcmRlcjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBmb250OiBpbmhlcml0O1xcbiAgY29sb3I6IGluaGVyaXQ7XFxuICAvKiBvcGFjaXR5OiAwOyAqL1xcbiAgLyogYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7ICovXFxuICAvKiBjdXJzb3I6IHRleHQ7ICovXFxuICAvKiDjgqvjg7zjgr3jg6vjgpLpnZ7ooajnpLrjgavjgZnjgotjc3NcXG4gIHRleHQtc2hhZG93IDogMCAwIDAgIzAwMDtcXG4gICovIFxcbn1cIiwgXCJcIl0pO1xuXG4iLCJjb25zdCBjc3MgPSByZXF1aXJlKCcuL2N1cnNvci5jc3MnKS50b1N0cmluZygpXG5cbmNvbnN0IHJldHVybkNvZGVzOiBSZWdFeHAgPSAvXFxyfFxcbnxcXHJcXG4vXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1cnNvciBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgcHVibGljIGlucHV0OiBIVE1MVGV4dEFyZWFFbGVtZW50XG4gIHB1YmxpYyByb2Q6IEhUTUxEaXZFbGVtZW50XG4gIHByaXZhdGUgc2hhZG93OiBTaGFkb3dSb290XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnNoYWRvdyA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pXG5cbiAgICAvLyDjg5Hjg7zjg4TjgpLnlJ/miJBcbiAgICB0aGlzLnJvZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgdGhpcy5yb2QuY2xhc3NOYW1lID0gJ3JvZCdcbiAgICB0aGlzLmlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKVxuICAgIHRoaXMuaW5wdXQuY2xhc3NOYW1lID0gJ2lucHV0J1xuICAgIHRoaXMuaW5wdXQud3JhcCA9ICdzb2Z0J1xuICAgIHRoaXMuaW5wdXQucm93cyA9IDFcbiAgICB0aGlzLmlucHV0LmF1dG9mb2N1cyA9IHRydWUgLy8g44Oa44O844K444Ot44O844OJ44GV44KM44Gf5pmC44Gr44OV44Kp44O844Kr44K544KS5b2T44Gm44KL44GL44Gp44GG44GLXG4gICAgdGhpcy5pbnB1dC5vbmJsdXIgPSAoZTogRm9jdXNFdmVudCkgPT4ge1xuICAgICAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgfVxuXG4gICAgLy8g44K544K/44Kk44Or44KS6L+95YqgXG4gICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gICAgc3R5bGUudGV4dENvbnRlbnQgPSBjc3NcbiAgICB0aGlzLnNoYWRvdy5hcHBlbmRDaGlsZChzdHlsZSlcblxuICAgIC8vIGh0bWzopoHntKDjgpLov73liqBcbiAgICB0aGlzLnNoYWRvdy5hcHBlbmRDaGlsZCh0aGlzLmlucHV0KVxuICAgIHRoaXMuc2hhZG93LmFwcGVuZENoaWxkKHRoaXMucm9kKVxuICB9XG5cbiAgcHVibGljIHJlc2V0VmFsdWUoKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dC52YWx1ZSA9ICcnXG4gIH1cblxuICBwdWJsaWMgZ2V0VmFsdWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dC52YWx1ZVxuICB9XG5cbiAgcHVibGljIGdldFZhbHVlRXhjbHVkZWRSZXR1cm5Db2RlcygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmlucHV0LnZhbHVlLnJlcGxhY2UocmV0dXJuQ29kZXMsICcnKVxuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbXktY3Vyc29yJywgQ3Vyc29yKVxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuZWRpdG9yIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4ubGluZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgaGVpZ2h0OiAxLjVlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcXG4gIGJvcmRlci1ib3R0b206IDFweCBkb3R0ZWQgZ3JheTtcXG59XFxuXFxuLmluZGVudCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4udGV4dCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmNoYXIge1xcbiAgd2hpdGUtc3BhY2U6IHByZTtcXG59XFxuXFxuLnNwYWNlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHdpZHRoOiAxLjVlbTtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICB3aGl0ZS1zcGFjZTogcHJlO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7IC8qIOOCr+ODquODg+OCr+OCkumAj+mBjuOBmeOCiyAqL1xcbiAgLyogYmFja2dyb3VuZC1jb2xvcjogcmVkOyAqL1xcbn1cXG5cXG4uaW5kZW50LW1hcmsge1xcbiAgd2lkdGg6IDZweDtcXG4gIGhlaWdodDogM3B4O1xcbiAgbWFyZ2luLXJpZ2h0OiAwLjJlbTsgLyog44OG44Kt44K544OI44Gr44GP44Gj44Gk44GN44GZ44GO44Gq44GE44KI44GG44Gr6YWN5oWuICovXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYmJiYmJiO1xcbn1cXG5cXG4ucmF3LXN0cmluZyB7XFxuICBoZWlnaHQ6IDFlbTtcXG59XFxuXFxubXktY3Vyc29yIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGhlaWdodDogMWVtO1xcbn1cIiwgXCJcIl0pO1xuXG4iLCJjb25zdCBjc3MgPSByZXF1aXJlKCcuL2VkaXRvci5jc3MnKS50b1N0cmluZygpXG5pbXBvcnQgQ3Vyc29yIGZyb20gJ2NvbXBvbmVudHMvY3Vyc29yL2N1cnNvcidcbmltcG9ydCBMaW5lIGZyb20gJ2NvbXBvbmVudHMvbGluZS9saW5lJ1xuaW1wb3J0IHsgdjQgfSBmcm9tICd1dWlkJ1xuXG5jb25zdCBwcmludCA9IGNvbnNvbGUubG9nXG5cbmVudW0gS2V5IHtcbiAgdGFiID0gJ1RhYicsXG4gIGRlbGV0ZSA9ICdCYWNrc3BhY2UnLFxuICBlbnRlciA9ICdFbnRlcicsXG4gIHNwYWNlID0gJyAnLFxuICBsZWZ0ID0gJ0Fycm93TGVmdCcsXG4gIHJpZ2h0ID0gJ0Fycm93UmlnaHQnLFxuICB1cCA9ICdBcnJvd1VwJyxcbiAgZG93biA9ICdBcnJvd0Rvd24nLFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3IgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHByaXZhdGUgbGluZXM6IEhUTUxEaXZFbGVtZW50XG4gIHByaXZhdGUgc2hhZG93OiBTaGFkb3dSb290XG4gIHByaXZhdGUgY3Vyc29yOiBDdXJzb3JcbiAgcHJpdmF0ZSByYXdTdHI6IEhUTUxTcGFuRWxlbWVudCAvLyDlhaXlipvjgZXjgozjgZ/nlJ/jga7mloflrZfliJfjga7luYXjgpLlj5blvpfjgZnjgovjgZ/jgoHjga5zcGFuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKClcbiAgICAvLyDjgrPjg7Pjgrnjg4jjg6njgq/jgr/jg7zjga7kuK3jgafjgrfjg6Pjg4njgqbjg6vjg7zjg4jjgpLjgaTjgY/jgovlv4XopoHjgYzjgYLjgovjgonjgZfjgYRcbiAgICB0aGlzLnNoYWRvdyA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pXG5cbiAgICB0aGlzLmxpbmVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB0aGlzLmxpbmVzLmNsYXNzTmFtZSA9ICdsaW5lcydcblxuICAgIC8vIOOCq+ODvOOCveODq+OCkuioreWumlxuICAgIHRoaXMuY3Vyc29yID0gbmV3IEN1cnNvcigpXG4gICAgdGhpcy5jdXJzb3IuY2xhc3NOYW1lID0gJ2N1cnNvcidcbiAgICB0aGlzLmN1cnNvci5pbnB1dC5vbmlucHV0ID0gKGUpID0+IHRoaXMub25JbnB1dChlKVxuICAgIHRoaXMuY3Vyc29yLmlucHV0Lm9ua2V5ZG93biA9IChlKSA9PiB0aGlzLmtleURvd24oZSlcbiAgICB0aGlzLmN1cnNvci5pbnB1dC5vbmtleXByZXNzID0gKGUpID0+IHRoaXMua2V5UHJlc3MoZSlcbiAgICB0aGlzLmN1cnNvci5pbnB1dC5vbmtleXVwID0gKGUpID0+IHRoaXMua2V5VXAoZSlcbiAgICB0aGlzLmN1cnNvci5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjb21wb3NpdGlvbmVuZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGUpID0+IHRoaXMud3JpdGVUb0xpbmUoKSlcblxuICAgIHRoaXMuc2hhZG93LmFwcGVuZENoaWxkKHRoaXMuY3Vyc29yKVxuXG4gICAgLy8g5YWl5Yqb44GV44KM44Gf5paH5a2X5YiX44Gu5bmF44KS5Y+W5b6X44GZ44KL44Gf44KB44Guc3BhblxuICAgIHRoaXMucmF3U3RyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgdGhpcy5yYXdTdHIuY2xhc3NOYW1lID0gJ3Jhdy1zdHJpbmcnXG5cbiAgICAvLyDjgrnjgr/jgqTjg6vjgpLoqK3lrppcbiAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgICBzdHlsZS50ZXh0Q29udGVudCA9IGNzc1xuICAgIHRoaXMuc2hhZG93LmFwcGVuZENoaWxkKHN0eWxlKVxuICAgIHRoaXMuc2hhZG93LmFwcGVuZENoaWxkKHRoaXMubGluZXMpXG5cbiAgICAvLyDmnIDliJ3jga7ooYzjgpLov73liqBcbiAgICBjb25zdCBuZXdMaW5lID0gdGhpcy5tYWtlTmV3TGluZSgpXG4gICAgdGhpcy5saW5lcy5hcHBlbmRDaGlsZChuZXdMaW5lKVxuXG4gICAgLy8g55S76Z2i6Kqt44G/6L6844G/5pmC44Gu5Yem55CGXG4gICAgd2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHRleHQgPSB0aGlzLmxpbmVzLmZpcnN0RWxlbWVudENoaWxkLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RleHQnKVswXVxuICAgICAgdGV4dC5pbnNlcnRCZWZvcmUodGhpcy5yYXdTdHIsIHRleHQuZmlyc3RDaGlsZClcbiAgICAgIHRoaXMuZHJhd0N1cnNvcigpXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBrZXlEb3duKGUpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJUZXh0ID0gdGhpcy5yYXdTdHIucGFyZW50Tm9kZVxuICAgIHByaW50KGAke2UudHlwZX06ICR7ZS5rZXl9YClcbiAgICBpZiAoIWUuaXNDb21wb3NpbmcpIHsgLy8g6Z2eSU1F5YWl5YqbXG4gICAgICBzd2l0Y2ggKGUua2V5KSB7XG4gICAgICAgIGNhc2UgJ1RhYic6IHtcbiAgICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICAgICAgdGhpcy51bmluZGVudCgpXG4gICAgICAgICAgfSBlbHNlIGlmIChjdXJUZXh0LmZpcnN0Q2hpbGQgPT09IHRoaXMucmF3U3RyKSB7XG4gICAgICAgICAgICB0aGlzLmluZGVudCgpXG4gICAgICAgICAgfVxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH0gY2FzZSAnQmFja3NwYWNlJzoge1xuICAgICAgICAgIGlmICh0aGlzLnJhd1N0ci5wcmV2aW91c1NpYmxpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlTGVmdCgpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGVudCA9IHRoaXMucmF3U3RyLnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nXG4gICAgICAgICAgICBpZiAoaW5kZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgICAgdGhpcy51bmluZGVudCgpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmpvaW5QcmV2TGluZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH0gY2FzZSAnRW50ZXInOiB7XG4gICAgICAgICAgdGhpcy5pbnNlcnROZXdMaW5lKClcbiAgICAgICAgICBicmVha1xuICAgICAgICB9IGNhc2UgJyAnOiB7XG4gICAgICAgICAgaWYgKGN1clRleHQuZmlyc3RDaGlsZCA9PT0gdGhpcy5yYXdTdHIpIHtcbiAgICAgICAgICAgIHRoaXMuaW5kZW50KClcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfSBjYXNlICdBcnJvd0xlZnQnOiB7XG4gICAgICAgICAgaWYgKGUuY3RybEtleSkge1xuICAgICAgICAgICAgdGhpcy51bmluZGVudCgpXG4gICAgICAgICAgfSBlbHNlIGlmIChlLm1ldGFLZXkpIHtcbiAgICAgICAgICAgIHRoaXMubW92ZVRvTGluZVN0YXJ0KClcbiAgICAgICAgICB9IGVsc2UgeyAvLyDlt6blhaXlipvjga7jgb9cbiAgICAgICAgICAgIHRoaXMuY3Vyc29yTGVmdCgpXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH0gY2FzZSAnQXJyb3dSaWdodCc6IHtcbiAgICAgICAgICBpZiAoZS5jdHJsS2V5KSB7XG4gICAgICAgICAgICB0aGlzLmluZGVudCgpXG4gICAgICAgICAgfSBlbHNlIGlmIChlLm1ldGFLZXkpIHtcbiAgICAgICAgICAgIHRoaXMubW92ZVRvTGluZUVuZCgpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3Vyc29yUmlnaHQoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICB9IGNhc2UgJ0Fycm93VXAnOiB7XG4gICAgICAgICAgaWYgKGUubWV0YUtleSkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlVG9QYWdlU3RhcnQoKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN1cnNvclVwKClcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfSBjYXNlICdBcnJvd0Rvd24nOiB7XG4gICAgICAgICAgaWYgKGUubWV0YUtleSkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlVG9QYWdlRW5kKClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jdXJzb3JEb3duKClcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfSBjYXNlICdhJzoge1xuICAgICAgICAgIGlmIChlLmN0cmxLZXkpIHtcbiAgICAgICAgICAgIHRoaXMubW92ZVRvTGluZVN0YXJ0KClcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfSBjYXNlICdlJzoge1xuICAgICAgICAgIGlmIChlLmN0cmxLZXkpIHtcbiAgICAgICAgICAgIHRoaXMubW92ZVRvTGluZUVuZCgpXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGtleVByZXNzKGUpOiB2b2lkIHtcbiAgICAvLyBwcmludChgJHtlLnR5cGV9OiAke2Uua2V5fTogJHtlLndoaWNofWApXG4gIH1cblxuICBwcml2YXRlIGtleVVwKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBwcmludChgJHtlLnR5cGV9OiAke2Uua2V5fWApXG4gIH1cblxuICBwcml2YXRlIG9uSW5wdXQoZSk6IHZvaWQge1xuICAgIHByaW50KGAke2UudHlwZX06ICR7ZS5pbnB1dFR5cGV9OiAke2UuZGF0YVRyYW5zZmVyfTogJHtlLmRhdGF9OiAke2UuaXNDb21wb3Npbmd9YClcbiAgICBpZiAoIWUuaXNDb21wb3NpbmcpIHtcbiAgICAgIHByaW50KCfpnZ5JTUXlhaXlipsnKVxuICAgICAgY29uc3QgdGV4dCA9IHRoaXMucmF3U3RyLnBhcmVudEVsZW1lbnRcbiAgICAgIHN3aXRjaCAoZS5kYXRhKSB7XG4gICAgICAgIGNhc2UgJyAnOlxuICAgICAgICBjYXNlICdcXHUzMDAwJzoge1xuICAgICAgICAgIGlmICh0ZXh0LmZpcnN0Q2hpbGQgPT09IHRoaXMucmF3U3RyKSB7XG4gICAgICAgICAgICAvLyDooYzjga7lhYjpoK3jgavljYrop5Iv5YWo6KeS44K544Oa44O844K544GM5YWl44KJ44Gq44GE44KI44GG44Gr44GZ44KL5o6q572uXG4gICAgICAgICAgICB0aGlzLmN1cnNvci5yZXNldFZhbHVlKClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy53cml0ZVRvTGluZSgpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfSBkZWZhdWx0OiB7XG4gICAgICAgICAgdGhpcy53cml0ZVRvTGluZSgpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5yZXNpemVJbnB1dCgpXG4gIH1cblxuICBwcml2YXRlIG9uQ2xpY2soZSk6IHZvaWQge1xuICAgIHRoaXMuaW5zZXJ0UmF3U3RyKGUpXG4gICAgaWYgKHRoaXMuY3Vyc29yLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJykge1xuICAgICAgdGhpcy5jdXJzb3Iuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snXG4gICAgfVxuICAgIHRoaXMuZHJhd0N1cnNvcigpXG4gIH1cblxuICBwcml2YXRlIHdyaXRlVG9MaW5lKCk6IHZvaWQge1xuICAgIHRoaXMuaW5zZXJ0VGV4dFRvTGluZSgpXG4gICAgdGhpcy5jdXJzb3IucmVzZXRWYWx1ZSgpIC8vIHZhbHVl44KS5Yid5pyf5YyWXG4gICAgdGhpcy5yZXNpemVJbnB1dCgpXG4gICAgdGhpcy5kcmF3Q3Vyc29yKClcbiAgfVxuXG4gIC8qKiDjgqvjg7zjgr3jg6vjgpLlt6bjgavli5XjgYvjgZkgKi9cbiAgcHJpdmF0ZSBjdXJzb3JMZWZ0KCk6IHZvaWQge1xuICAgIGNvbnN0IHRleHQgPSB0aGlzLnJhd1N0ci5wYXJlbnROb2RlXG4gICAgY29uc3QgcHJldkNoYXIgPSB0aGlzLnJhd1N0ci5wcmV2aW91c1NpYmxpbmdcbiAgICBpZiAocHJldkNoYXIpIHtcbiAgICAgIHRleHQuaW5zZXJ0QmVmb3JlKHRoaXMucmF3U3RyLCBwcmV2Q2hhcilcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHJldkxpbmUgPSB0ZXh0LnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nXG4gICAgICBpZiAocHJldkxpbmUpIHtcbiAgICAgICAgcHJldkxpbmUubGFzdENoaWxkLmFwcGVuZENoaWxkKHRoaXMucmF3U3RyKVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmRyYXdDdXJzb3IoKVxuICB9XG5cbiAgLyoqIOOCq+ODvOOCveODq+OCkuWPs+OBq+WLleOBi+OBmSAqL1xuICBwcml2YXRlIGN1cnNvclJpZ2h0KCk6IHZvaWQge1xuICAgIGNvbnN0IHRleHQgPSB0aGlzLnJhd1N0ci5wYXJlbnROb2RlXG4gICAgY29uc3QgbmV4dENoYXIgPSB0aGlzLnJhd1N0ci5uZXh0U2libGluZ1xuICAgIGlmIChuZXh0Q2hhcikge1xuICAgICAgdGV4dC5pbnNlcnRCZWZvcmUodGhpcy5yYXdTdHIsIG5leHRDaGFyLm5leHRTaWJsaW5nKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXh0TGluZSA9IHRleHQucGFyZW50Tm9kZS5uZXh0U2libGluZ1xuICAgICAgaWYgKG5leHRMaW5lKSB7XG4gICAgICAgIGNvbnN0IG5leHRUZXh0ID0gbmV4dExpbmUubGFzdENoaWxkXG4gICAgICAgIG5leHRUZXh0Lmluc2VydEJlZm9yZSh0aGlzLnJhd1N0ciwgbmV4dFRleHQuZmlyc3RDaGlsZClcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5kcmF3Q3Vyc29yKClcbiAgfVxuXG4gIC8qKiDjgqvjg7zjgr3jg6vjgpLkuIrjgavli5XjgYvjgZfjgb7jgZkgKi9cbiAgcHJpdmF0ZSBjdXJzb3JVcCgpOiB2b2lkIHtcbiAgICBjb25zdCB0ZXh0ID0gdGhpcy5yYXdTdHIucGFyZW50Tm9kZVxuICAgIGNvbnN0IGN1ckxpbmUgPSB0ZXh0LnBhcmVudE5vZGVcbiAgICBjb25zdCBwcmVMaW5lID0gY3VyTGluZS5wcmV2aW91c1NpYmxpbmdcbiAgICBpZiAocHJlTGluZSkge1xuICAgICAgY29uc3QgcHJlVGV4dCA9IHByZUxpbmUubGFzdENoaWxkXG4gICAgICBjb25zdCBwcmVDaGFycyA9IHByZVRleHQuY2hpbGROb2Rlc1xuICAgICAgaWYgKHByZUNoYXJzKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gWy4uLnRleHQuY2hpbGROb2Rlc10uaW5kZXhPZih0aGlzLnJhd1N0cilcbiAgICAgICAgY29uc3QgdGd0ID0gcHJlQ2hhcnMuaXRlbShpbmRleClcbiAgICAgICAgcHJlVGV4dC5pbnNlcnRCZWZvcmUodGhpcy5yYXdTdHIsIHRndClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByZVRleHQuYXBwZW5kQ2hpbGQodGhpcy5yYXdTdHIpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW92ZVRvTGluZVN0YXJ0KClcbiAgICB9XG4gICAgdGhpcy5kcmF3Q3Vyc29yKClcbiAgfVxuXG4gIHByaXZhdGUgY3Vyc29yRG93bigpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJUZXh0ID0gdGhpcy5yYXdTdHIucGFyZW50Tm9kZVxuICAgIGNvbnN0IGN1ckxpbmUgPSBjdXJUZXh0LnBhcmVudE5vZGVcbiAgICBjb25zdCBuZXh0TGluZSA9IGN1ckxpbmUubmV4dFNpYmxpbmdcbiAgICBpZiAobmV4dExpbmUpIHtcbiAgICAgIGNvbnN0IG5leHRUZXh0ID0gbmV4dExpbmUubGFzdENoaWxkXG4gICAgICBjb25zdCBuZXh0Q2hhcnMgPSBuZXh0VGV4dC5jaGlsZE5vZGVzXG4gICAgICBpZiAobmV4dENoYXJzKSB7XG4gICAgICAgIGNvbnN0IGN1ckxvYyA9IFsuLi5jdXJUZXh0LmNoaWxkTm9kZXNdLmluZGV4T2YodGhpcy5yYXdTdHIpXG4gICAgICAgIGNvbnN0IHRndCA9IG5leHRDaGFycy5pdGVtKGN1ckxvYylcbiAgICAgICAgbmV4dFRleHQuaW5zZXJ0QmVmb3JlKHRoaXMucmF3U3RyLCB0Z3QpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0VGV4dC5hcHBlbmRDaGlsZCh0aGlzLnJhd1N0cilcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb3ZlVG9MaW5lRW5kKClcbiAgICB9XG4gICAgdGhpcy5kcmF3Q3Vyc29yKClcbiAgfVxuXG4gIC8qIOePvuWcqOOBruihjOOCkuWJjeOBruihjOOBqOmAo+e1kOOBmeOCiyAqL1xuICBwcml2YXRlIGpvaW5QcmV2TGluZSgpOiB2b2lkIHtcbiAgICBjb25zdCB0ZXh0ID0gdGhpcy5yYXdTdHIucGFyZW50Tm9kZVxuICAgIGNvbnN0IGN1ckxpbmUgPSB0ZXh0LnBhcmVudEVsZW1lbnRcbiAgICBpZiAoY3VyTGluZSAhPT0gdGhpcy5saW5lcy5maXJzdENoaWxkKSB7XG4gICAgICBjb25zdCBjdXJDaGFycyA9IFsuLi50ZXh0LmNoaWxkcmVuXSAvLyDjgrPjg5Tjg7zjgZnjgotcbiAgICAgIGNvbnN0IHByZXZMaW5lID0gY3VyTGluZS5wcmV2aW91c1NpYmxpbmdcbiAgICAgIGNvbnN0IHByZXZUZXh0ID0gcHJldkxpbmUubGFzdENoaWxkXG4gICAgICBmb3IgKGNvbnN0IGNoYXIgb2YgY3VyQ2hhcnMpIHtcbiAgICAgICAgcHJldlRleHQuYXBwZW5kQ2hpbGQoY2hhcilcbiAgICAgIH1cbiAgICAgIHRoaXMubGluZXMucmVtb3ZlQ2hpbGQoY3VyTGluZSlcbiAgICAgIHRoaXMuZHJhd0N1cnNvcigpXG4gICAgfVxuICB9XG5cbiAgLyoqIOW3puOBruaWh+Wtl+OCkuWJiumZpCAqL1xuICBwcml2YXRlIGRlbGV0ZUxlZnQoKTogdm9pZCB7XG4gICAgY29uc3QgdGV4dCA9IHRoaXMucmF3U3RyLnBhcmVudEVsZW1lbnRcbiAgICB0ZXh0LnJlbW92ZUNoaWxkKHRoaXMucmF3U3RyLnByZXZpb3VzU2libGluZylcbiAgICB0aGlzLmRyYXdDdXJzb3IoKVxuICB9XG5cbiAgcHJpdmF0ZSBpbmRlbnQoKTogdm9pZCB7XG4gICAgY29uc3QgaW5kZW50ID0gdGhpcy5yYXdTdHIucGFyZW50RWxlbWVudC5wcmV2aW91c1NpYmxpbmdcbiAgICBjb25zdCBzcGFjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHNwYWNlLmNsYXNzTmFtZSA9ICdzcGFjZSdcbiAgICBzcGFjZS5pbm5lclRleHQgPSAnICdcbiAgICBpZiAoIWluZGVudC5maXJzdENoaWxkKSB7XG4gICAgICBjb25zdCBtYXJrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICBtYXJrLmNsYXNzTmFtZSA9ICdpbmRlbnQtbWFyaydcbiAgICAgIHNwYWNlLmFwcGVuZENoaWxkKG1hcmspXG4gICAgfVxuICAgIGluZGVudC5pbnNlcnRCZWZvcmUoc3BhY2UsIGluZGVudC5maXJzdENoaWxkKVxuICAgIHRoaXMuZHJhd0N1cnNvcigpXG4gIH1cblxuICAvKiog44Kk44Oz44OH44Oz44OI6YOo44Gr5a2Q6KaB57Sg44GM44GC44KM44Gw44Ki44Oz44Kk44Oz44OH44Oz44OIICovXG4gIHByaXZhdGUgdW5pbmRlbnQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgaW5kZW50ID0gdGhpcy5yYXdTdHIucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmdcbiAgICBpZiAoaW5kZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIGluZGVudC5yZW1vdmVDaGlsZChpbmRlbnQuZmlyc3RDaGlsZClcbiAgICAgIHRoaXMuZHJhd0N1cnNvcigpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8qKiDjg5rjg7zjgrjpoK3jgbjnp7vli5UgKi9cbiAgcHJpdmF0ZSBtb3ZlVG9QYWdlU3RhcnQoKTogdm9pZCB7XG4gICAgY29uc3QgZmlyc3RMaW5lID0gdGhpcy5saW5lcy5maXJzdENoaWxkXG4gICAgY29uc3QgZmlyc3RMaW5lVGV4dCA9IGZpcnN0TGluZS5sYXN0Q2hpbGRcbiAgICBpZiAoZmlyc3RMaW5lVGV4dC5maXJzdENoaWxkICE9PSB0aGlzLnJhd1N0cikge1xuICAgICAgZmlyc3RMaW5lVGV4dC5pbnNlcnRCZWZvcmUodGhpcy5yYXdTdHIsIGZpcnN0TGluZVRleHQuZmlyc3RDaGlsZClcbiAgICAgIHRoaXMuZHJhd0N1cnNvcigpXG4gICAgfVxuICB9XG5cbiAgLyoqIOODmuODvOOCuOacq+OBuOenu+WLlSAqL1xuICBwcml2YXRlIG1vdmVUb1BhZ2VFbmQoKTogdm9pZCB7XG4gICAgY29uc3QgbGFzdExpbmUgPSB0aGlzLmxpbmVzLmxhc3RDaGlsZFxuICAgIGNvbnN0IGxhc3RMaW5lVGV4dCA9IGxhc3RMaW5lLmxhc3RDaGlsZFxuICAgIGlmIChsYXN0TGluZVRleHQubGFzdENoaWxkICE9PSB0aGlzLnJhd1N0cikge1xuICAgICAgbGFzdExpbmVUZXh0LmFwcGVuZENoaWxkKHRoaXMucmF3U3RyKVxuICAgICAgdGhpcy5kcmF3Q3Vyc29yKClcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vdmVUb0xpbmVTdGFydCgpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJUZXh0ID0gdGhpcy5yYXdTdHIucGFyZW50Tm9kZVxuICAgIGlmIChjdXJUZXh0LmZpcnN0Q2hpbGQgIT09IHRoaXMucmF3U3RyKSB7XG4gICAgICBjdXJUZXh0Lmluc2VydEJlZm9yZSh0aGlzLnJhd1N0ciwgY3VyVGV4dC5maXJzdENoaWxkKVxuICAgICAgdGhpcy5kcmF3Q3Vyc29yKClcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vdmVUb0xpbmVFbmQoKTogdm9pZCB7XG4gICAgY29uc3QgY3VyVGV4dCA9IHRoaXMucmF3U3RyLnBhcmVudE5vZGVcbiAgICBpZiAoY3VyVGV4dC5sYXN0Q2hpbGQgIT09IHRoaXMucmF3U3RyKSB7XG4gICAgICBjdXJUZXh0LmFwcGVuZENoaWxkKHRoaXMucmF3U3RyKVxuICAgICAgdGhpcy5kcmF3Q3Vyc29yKClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog54++5Zyo44GubGluZeOBrnRleHTpg6jjgavlhaXlipvjgYzmsbrlrprjgZfjgZ/mloflrZfliJfjgpIx5paH5a2X44Ga44Gk5YiG5Ymy44GX44Gfc3Bhbuimgee0oOOBq+OBl+OBpuWFpeOCjOOCi1xuICAgKi9cbiAgcHJpdmF0ZSBpbnNlcnRUZXh0VG9MaW5lKCk6IHZvaWQge1xuICAgIGNvbnN0IGNoYXJzID0gWy4uLnRoaXMuY3Vyc29yLmdldFZhbHVlRXhjbHVkZWRSZXR1cm5Db2RlcygpXVxuICAgIGNvbnN0IGxhc3RJbmRleCA9IGNoYXJzLmxlbmd0aCAtIDFcbiAgICBjb25zdCBjdXJyZW50VGV4dFBhcnQgPSB0aGlzLnJhd1N0ci5wYXJlbnRFbGVtZW50XG4gICAgY29uc3QgbmV4dENoYXIgPSB0aGlzLnJhd1N0ci5uZXh0U2libGluZ1xuICAgIGZvciAoY29uc3QgW2ksIGNoYXJdIG9mIGNoYXJzLmVudHJpZXMoKSkge1xuICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgc3Bhbi5jbGFzc05hbWUgPSAnY2hhcidcbiAgICAgIHNwYW4uaW5uZXJUZXh0ID0gY2hhclxuICAgICAgaWYgKG5leHRDaGFyKSB7XG4gICAgICAgIGN1cnJlbnRUZXh0UGFydC5pbnNlcnRCZWZvcmUoc3BhbiwgbmV4dENoYXIpXG4gICAgICAgIGlmIChpID09PSBsYXN0SW5kZXgpIHtcbiAgICAgICAgICBjdXJyZW50VGV4dFBhcnQuaW5zZXJ0QmVmb3JlKHRoaXMucmF3U3RyLCBuZXh0Q2hhcilcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudFRleHRQYXJ0LmFwcGVuZENoaWxkKHNwYW4pXG4gICAgICAgIGlmIChpID09PSBsYXN0SW5kZXgpIHtcbiAgICAgICAgICBjdXJyZW50VGV4dFBhcnQuYXBwZW5kQ2hpbGQodGhpcy5yYXdTdHIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogdGV4dGFyZWHjga7luYXjgajpq5jjgZXjgpLlhaXlipvjgZXjgozjgZ/mloflrZfliJfjgavlv5zjgZjjgablpInljJbjgZXjgZvjgosgKi9cbiAgcHJpdmF0ZSByZXNpemVJbnB1dCgpIHtcbiAgICB0aGlzLnJhd1N0ci5pbm5lclRleHQgPSB0aGlzLmN1cnNvci5nZXRWYWx1ZUV4Y2x1ZGVkUmV0dXJuQ29kZXMoKVxuICAgIHRoaXMuY3Vyc29yLmlucHV0LnN0eWxlLndpZHRoID0gdGhpcy5yYXdTdHIub2Zmc2V0V2lkdGggKyAncHgnXG4gIH1cblxuICAvKiog5paw44GX44GEbGluZeOCkuePvuWcqOOCq+ODvOOCveODq+OBjOOBguOCi+ihjOOBruasoeOBruimgee0oOOBqOOBl+OBpuaMv+WFpeOBl+OBpOOBpOOAgeOCq+ODvOOCveODq+OCiOOCiuW+jOOBq+OBguOCi3NwYW4uY2hhcuOCkuWFqOOBpuaWsOOBl+OBhOihjOOBq+aMv+WFpeOBmeOCiyAqL1xuICBwcml2YXRlIGluc2VydE5ld0xpbmUoKTogdm9pZCB7XG4gICAgY29uc3QgbmV3TGluZSA9IHRoaXMubWFrZU5ld0xpbmUoKVxuICAgIGNvbnN0IGN1cnJlbnRMaW5lID0gdGhpcy5yYXdTdHIucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XG4gICAgY29uc3QgdGV4dCA9IHRoaXMucmF3U3RyLnBhcmVudEVsZW1lbnRcbiAgICBjb25zdCBjaGFycyA9IFsuLi50ZXh0LmNoaWxkcmVuXVxuICAgIGNvbnN0IGluZGV4ID0gY2hhcnMuaW5kZXhPZih0aGlzLnJhd1N0cilcbiAgICBjb25zdCBuZXdDaGlsZHJlbiA9IGNoYXJzLnNsaWNlKGluZGV4KVxuICAgIGNvbnN0IG5ld1RleHQgPSBuZXdMaW5lLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RleHQnKVswXVxuICAgIGZvciAoY29uc3QgY2hpbGQgb2YgbmV3Q2hpbGRyZW4pIHtcbiAgICAgIG5ld1RleHQuYXBwZW5kQ2hpbGQoY2hpbGQpXG4gICAgfVxuICAgIHRoaXMubGluZXMuaW5zZXJ0QmVmb3JlKG5ld0xpbmUsIGN1cnJlbnRMaW5lLm5leHRTaWJsaW5nKVxuICAgIGNvbnN0IGluZGVudCA9IHRleHQucHJldmlvdXNTaWJsaW5nXG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBpbmRlbnQuY2hpbGROb2Rlcykge1xuICAgICAgdGhpcy5pbmRlbnQoKVxuICAgIH1cblxuICAgIHRoaXMuZHJhd0N1cnNvcigpXG4gIH1cblxuICBwcml2YXRlIG1ha2VOZXdMaW5lKCk6IEhUTUxEaXZFbGVtZW50IHtcbiAgICBjb25zdCBuZXdMaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBuZXdMaW5lLmNsYXNzTmFtZSA9ICdsaW5lJ1xuICAgIG5ld0xpbmUub25jbGljayA9IChlKSA9PiB0aGlzLm9uQ2xpY2soZSlcbiAgICAvLyBsaW5lLmlk44Gr6YeN6KSH44GM44Gq44GE44GL56K66KqN44GZ44KLXG4gICAgbGV0IGJvb2w6IGJvb2xlYW5cbiAgICBsZXQgdXVpZDogc3RyaW5nXG4gICAgZG8ge1xuICAgICAgYm9vbCA9IGZhbHNlXG4gICAgICB1dWlkID0gdjQoKVxuICAgICAgZm9yIChjb25zdCBsaW5lIG9mIHRoaXMubGluZXMuY2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKCBsaW5lLmlkID09PSB1dWlkICkge1xuICAgICAgICAgIGJvb2wgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IHdoaWxlIChib29sKVxuICAgIG5ld0xpbmUuc2V0QXR0cmlidXRlKCdpZCcsIHV1aWQpXG4gICAgLy8gbGluZeOBq2luZGVudOmDqOOBqHRleHTpg6jjgpLov73liqBcbiAgICBjb25zdCBpbmRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBpbmRlbnQuY2xhc3NOYW1lID0gJ2luZGVudCdcbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgdGV4dC5jbGFzc05hbWUgPSAndGV4dCdcbiAgICBuZXdMaW5lLmFwcGVuZENoaWxkKGluZGVudClcbiAgICBuZXdMaW5lLmFwcGVuZENoaWxkKHRleHQpXG4gICAgcmV0dXJuIG5ld0xpbmVcbiAgfVxuXG4gIC8qKiDjgq/jg6rjg4Pjgq/jgZXjgozjgZ/kvY3nva7jgatzcGFuLnJhd1N0cuOCkuaMv+WFpeOBl+OAgeOCq+ODvOOCveODq+OBruenu+WLleS9jee9ruOBjOaWh+Wtl+OBruS4iuOBq+mHjeOBquOCieOBquOBhOOCiOOBhuOBq+mFjee9ruOBmeOCiyAqL1xuICBwcml2YXRlIGluc2VydFJhd1N0cihlKTogdm9pZCB7XG4gICAgY29uc3QgY2xpY2tlZEVsZW0gPSB0aGlzLnNoYWRvdy5lbGVtZW50RnJvbVBvaW50KGUueCwgZS55KVxuICAgIGNvbnN0IG9iakw6IG51bWJlciA9IGNsaWNrZWRFbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnRcbiAgICBjb25zdCBvYmpSOiBudW1iZXIgPSBjbGlja2VkRWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5yaWdodFxuICAgIGlmIChjbGlja2VkRWxlbS5jbGFzc05hbWUgPT09ICdjaGFyJykge1xuICAgICAgY29uc3QgZGlmZkwgPSBlLnggLSBvYmpMXG4gICAgICBjb25zdCBkaWZmUiA9IG9ialIgLSBlLnhcbiAgICAgIGlmIChkaWZmUiA8PSBkaWZmTCkge1xuICAgICAgICBjbGlja2VkRWxlbS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLnJhd1N0ciwgY2xpY2tlZEVsZW0ubmV4dFNpYmxpbmcpIC8vIHJhd1N0cuOCkui/veWKoFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xpY2tlZEVsZW0ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5yYXdTdHIsIGNsaWNrZWRFbGVtKSAvLyByYXdTdHLjgpLov73liqBcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNsaWNrZWRFbGVtLmNsYXNzTmFtZSA9PT0gJ2luZGVudCcpIHtcbiAgICAgIGNvbnN0IHRleHQgPSBjbGlja2VkRWxlbS5uZXh0U2libGluZ1xuICAgICAgdGV4dC5pbnNlcnRCZWZvcmUodGhpcy5yYXdTdHIsIHRleHQuZmlyc3RDaGlsZClcbiAgICB9IGVsc2UgaWYgKGNsaWNrZWRFbGVtLmNsYXNzTmFtZSA9PT0gJ2xpbmUnKSB7XG4gICAgICBjb25zdCB0ZXh0ID0gY2xpY2tlZEVsZW0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndGV4dCcpWzBdXG4gICAgICB0ZXh0LmFwcGVuZENoaWxkKHRoaXMucmF3U3RyKSAvLyByYXdTdHLjgpLmjL/lhaVcbiAgICB9XG4gIH1cblxuICAvKiogc3Bhbi5yYXdTdHLjga7lj7Pnq6/jga7kvY3nva7jgatjdXJzb3LjgpLooajnpLrjgZnjgosgKi9cbiAgcHJpdmF0ZSBkcmF3Q3Vyc29yKCk6IHZvaWQge1xuICAgIGNvbnN0IHJhd1N0clJlY3QgPSB0aGlzLnJhd1N0ci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIHRoaXMuY3Vyc29yLnN0eWxlLmxlZnQgPSByYXdTdHJSZWN0LnJpZ2h0ICsgJ3B4J1xuICAgIHRoaXMuY3Vyc29yLnN0eWxlLnRvcCA9IHJhd1N0clJlY3QudG9wICsgJ3B4J1xuICAgIHRoaXMuY3Vyc29yLmlucHV0LmZvY3VzKClcbiAgfVxufVxuXG4vLyDnmbvpjLJcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbXktZWRpdG9yJywgRWRpdG9yKVxuIiwiaW1wb3J0IEVkaXRvciBmcm9tICdjb21wb25lbnRzL2VkaXRvci9lZGl0b3InXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2UgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHByaXZhdGUgc2hhZG93OiBTaGFkb3dSb290XG4gIHByaXZhdGUgZWRpdG9yOiBFZGl0b3JcbiAgcHJpdmF0ZSByb290OiBIVE1MRGl2RWxlbWVudFxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5zaGFkb3cgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KVxuICAgIHRoaXMuZWRpdG9yID0gbmV3IEVkaXRvcigpXG5cbiAgICAvLyDjg6vjg7zjg4jjgpLov73liqBcbiAgICB0aGlzLnNoYWRvdy5hcHBlbmRDaGlsZCh0aGlzLmVkaXRvcilcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ215LXBhZ2UnLCBQYWdlKVxuIiwiaW1wb3J0IFBhZ2UgZnJvbSAnLi9jb21wb25lbnRzL3BhZ2UvcGFnZSdcbmNvbnN0IGNzcyA9IHJlcXVpcmUoJy4vc3R5bGUuY3NzJykudG9TdHJpbmcoKVxuXG5mdW5jdGlvbiBtYWluKCkge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keVxuICBjb25zdCBwYWdlID0gbmV3IFBhZ2UoKVxuXG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBzdHlsZS50ZXh0Q29udGVudCA9IGNzc1xuICBib2R5LmFwcGVuZENoaWxkKHN0eWxlKVxuXG4gIGJvZHkuYXBwZW5kQ2hpbGQocGFnZSlcbn1cblxubWFpbigpXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcbiAgZm9udC1zaXplOiAxZW07XFxufVxcblxcbm15LXBhZ2Uge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogYXV0bztcXG4gIGhlaWdodDogYXV0bztcXG4gIHBhZGRpbmc6IDFlbTtcXG4gIGJveC1zaGFkb3c6IDAgM3B4IDVweCBkYXJrZ3JleTtcXG59XCIsIFwiXCJdKTtcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==