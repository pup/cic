(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CicOutsideIframe"] = factory();
	else
		root["CicOutsideIframe"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "4meA");
/******/ })
/************************************************************************/
/******/ ({

/***/ "2GRw":
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var log = function log(msg) {
  console && console.log && console.log('< parent: ' + msg);
};

var _cicId = 0;

var Connection =
/*#__PURE__*/
function () {
  function Connection(iframeWindow) {
    var _this = this;

    _classCallCheck(this, Connection);

    this.disconnectListeners = [];
    this.connectListeners = [];
    this.messageListeners = [];
    this.connecting = false;
    this.isDestroyed = false;
    this.connected = false;
    this.cicId = 'cic_id_' + ++_cicId;
    this.timeoutId = null;

    this._onBeforeUnload = function () {
      _this.disconnectIframe();
    };

    this._destroy = function () {
      _this.disconnectListeners.length = 0;
      _this.connectListeners.length = 0;
      _this.messageListeners.length = 0;
      _this.isDestroyed = true;
      clearTimeout(_this.timeoutId);
      window.removeEventListener('message', _this._messageHandler, false);
      window.removeEventListener('beforeunload', _this._onBeforeUnload, false);
    };

    this._messageHandler = function (evt) {
      if (!evt.data || !evt.data.cicId) {
        return;
      }

      var _evt$data = evt.data,
          cicId = _evt$data.cicId,
          msgType = _evt$data.msgType,
          data = _evt$data.data;

      if (cicId != _this.cicId) {
        return;
      }

      if (msgType == 'pong' && _this.connecting) {
        _this.connecting = false;
        _this.connected = true;
        clearTimeout(_this.timeoutId);

        _this.iframeWindow.postMessage({
          cicId: cicId,
          msgType: 'pong_confirm'
        }, '*');
      } else if (msgType == 'childReady' && _this.connected) {
        _this.connectListeners.forEach(function (fn) {
          fn();
        });
      } else if (msgType == 'disconnectFromChild' && _this.connected) {
        _this.iframeWindow.postMessage({
          cicId: cicId,
          msgType: 'disconnectFromChildConfirm'
        }, '*');

        _this._disconnectHandler();
      } else if (msgType == 'disconnectFromParentConfirm' && _this.connected) {
        _this._disconnectHandler();
      } else if (msgType == 'message' && _this.connected) {
        _this.messageListeners.forEach(function (fn) {
          fn(data);
        });
      }
    };

    this.iframeWindow = iframeWindow;
    window.addEventListener('message', this._messageHandler, false);
    window.addEventListener('beforeunload', this._onBeforeUnload, false);
  }

  _createClass(Connection, [{
    key: "destroy",
    value: function destroy() {
      if (this.connected) {
        this.onDisconnect(this._destroy);
        this.disconnectIframe();
      } else {
        this._destroy();
      }
    }
  }, {
    key: "onDisconnect",
    value: function onDisconnect(fn) {
      if (this.isDestroyed) {
        throw new Error('当前Connection已销毁');
      } else {
        this.disconnectListeners.push(fn);
      }
    }
  }, {
    key: "offDisconnect",
    value: function offDisconnect(fn) {
      this.disconnectListeners = this.disconnectListeners.filter(function (f) {
        return f != fn;
      });
    }
  }, {
    key: "onConnect",
    value: function onConnect(fn) {
      if (this.isDestroyed) {
        throw new Error('当前Connection已销毁');
      } else {
        if (this.connected) {
          fn(this);
        } else {
          this.connectListeners.push(fn);
        }
      }
    }
  }, {
    key: "offConnect",
    value: function offConnect(fn) {
      this.connectListeners = this.connectListeners.filter(function (f) {
        return f != fn;
      });
    }
  }, {
    key: "onMessage",
    value: function onMessage(fn) {
      if (this.isDestroyed) {
        throw new Error('当前Connection已销毁');
      } else {
        this.messageListeners.push(fn);
      }
    }
  }, {
    key: "offMessage",
    value: function offMessage(fn) {
      this.messageListeners = this.messageListeners.filter(function (f) {
        return f != fn;
      });
    }
  }, {
    key: "_disconnectHandler",
    value: function _disconnectHandler() {
      var _this2 = this;

      this.disconnectListeners.forEach(function (fn) {
        fn(_this2);
      });
      clearTimeout(this.timeoutId);
      this.connected = false;
      this.connecting = false;
    }
  }, {
    key: "connectIframe",

    /**
     * 主动发起对iframe的连接
     * 每秒钟常识建立一次连接
     */
    value: function connectIframe() {
      var _this3 = this;

      if (this.isDestroyed) {
        throw new Error('当前Connection已销毁');
      }

      if (this.connected || this.connecting) {
        return;
      }

      clearTimeout(this.timeoutId);
      this.timeoutId = null;
      this.connecting = true;
      this.iframeWindow.postMessage({
        cicId: this.cicId,
        msgType: 'ping'
      }, '*');
      this.timeoutId = setTimeout(function () {
        log('正在尝试建立连接');
        _this3.connecting = false;

        _this3.connectIframe();
      }, 1000);
    }
  }, {
    key: "disconnectIframe",
    value: function disconnectIframe() {
      clearTimeout(this.timeoutId);

      if (this.connected) {
        this.connected = false;
        this.connecting = false;
        this.iframeWindow.postMessage({
          cicId: this.cicId,
          msgType: 'disconnectFromParent'
        }, '*');
      }
    }
  }, {
    key: "postMessageToIframe",
    value: function postMessageToIframe(data) {
      this.iframeWindow.postMessage({
        cicId: this.cicId,
        msgType: 'message',
        data: data
      }, '*');
    }
  }]);

  return Connection;
}();

module.exports = Connection;

/***/ }),

/***/ "4meA":
/***/ (function(module, exports, __webpack_require__) {

var Connection = __webpack_require__("2GRw");

module.exports = {
  createConnection: function createConnection(iframeWindow) {
    if (iframeWindow.postMessage) {
      return new Connection(iframeWindow);
    }

    if (iframeWindow.contentWindow.postMessage) {
      return new Connection(iframeWindow.contentWindow);
    }

    throw new Error('传入"CicOutsideIframe.createConnection(iframeWindow)"的"iframeWindow"对象不存在”postMessage“方法。');
  }
};

/***/ })

/******/ });
});