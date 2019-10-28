(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CicInsideIframe"] = factory();
	else
		root["CicInsideIframe"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "y2jh");
/******/ })
/************************************************************************/
/******/ ({

/***/ "Nw9I":
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var listeningCicIds = [];

var Listener =
/*#__PURE__*/
function () {
  function Listener() {
    var _this = this;

    _classCallCheck(this, Listener);

    this.cicId = null;
    this.connected = false;
    this.disconnectListeners = [];
    this.connectListeners = [];
    this.messageListeners = [];
    this.connecting = false;
    this.isDestroyed = false;
    this.sourceWindow = null;
    this.sourceOrigin = null;

    this._destroy = function () {
      _this.isDestroyed = true;
      _this.disconnectListeners.length = 0;
      _this.connectListeners.length = 0;
      _this.messageListeners.length = 0;
      window.removeEventListener('message', _this._messageHandler, false);
    };

    this._messageHandler = function (evt) {
      if (!evt.data || !evt.data.cicId) {
        return;
      }

      var _evt$data = evt.data,
          cicId = _evt$data.cicId,
          msgType = _evt$data.msgType,
          data = _evt$data.data;

      if (_this.cicId) {
        if (_this.cicId !== cicId) {
          return;
        }

        if (msgType === 'pong_confirm') {
          _this.connecting = false;
          _this.connected = true;

          _this.connectListeners.forEach(function (fn) {
            fn(_this);
          });

          _this.sourceWindow.postMessage({
            cicId: cicId,
            msgType: 'childReady'
          }, _this.sourceOrigin);
        } else if (msgType === 'message') {
          _this.messageListeners.forEach(function (fn) {
            fn(data);
          });
        } else if (msgType === 'disconnectFromParent' && _this.connected) {
          _this.sourceWindow.postMessage({
            cicId: cicId,
            msgType: 'disconnectFromParentConfirm'
          }, _this.sourceOrigin);

          _this._disconnectHandler();
        } else if (msgType === 'disconnectFromChildConfirm' && _this.connected) {
          _this._disconnectHandler();
        }
      } else {
        if (msgType === 'ping' && listeningCicIds.indexOf(cicId) === -1 && !_this.connecting) {
          listeningCicIds.push(cicId);
          _this.cicId = cicId;
          _this.connecting = true;
          _this.sourceWindow = evt.source;
          _this.sourceOrigin = evt.origin;
          evt.source.postMessage({
            cicId: cicId,
            msgType: 'pong'
          }, evt.origin);
        }
      }
    };
  }

  _createClass(Listener, [{
    key: "start",
    value: function start() {
      if (this.isDestroyed) {
        throw new Error('当前Listener已销毁');
      }

      window.removeEventListener('message', this._messageHandler, false);
      window.addEventListener('message', this._messageHandler, false);
      window.addEventListener('beforeunload', this._onBeforeUnload, false);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.connected) {
        this.onDisconnect(this._destroy);
        this.disconnectParent();
      } else {
        this._destroy();
      }
    }
  }, {
    key: "_disconnectHandler",
    value: function _disconnectHandler() {
      var _this2 = this;

      this.disconnectListeners.forEach(function (fn) {
        fn(_this2);
      });
      listeningCicIds = listeningCicIds.filter(function (cicId) {
        return cicId != _this2.cicId;
      });
      this.connected = false;
      this.sourceOrigin = null;
      this.sourceWindow = null;
      this.connecting = false;
      this.cicId = null;
    }
  }, {
    key: "onDisconnect",
    value: function onDisconnect(fn) {
      if (this.isDestroyed) {
        throw new Error('当前Listener已销毁');
      }

      this.disconnectListeners.push(fn);
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
        throw new Error('当前Listener已销毁');
      }

      this.connectListeners.push(fn);

      if (this.connected) {
        fn(this);
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
        throw new Error('当前Listener已销毁');
      }

      this.messageListeners.push(fn);
    }
  }, {
    key: "offMessage",
    value: function offMessage(fn) {
      this.messageListeners = this.messageListeners.filter(function (f) {
        return f != fn;
      });
    }
  }, {
    key: "disconnectParent",
    value: function disconnectParent() {
      if (this.connected) {
        this.sourceWindow.postMessage({
          cicId: this.cicId,
          msgType: 'disconnectFromChild'
        }, this.sourceOrigin);
      }
    }
  }, {
    key: "postMessageToParent",
    value: function postMessageToParent(data) {
      if (this.connected) {
        this.sourceWindow.postMessage({
          cicId: this.cicId,
          msgType: 'message',
          data: data
        }, this.sourceOrigin);
      } else {
        throw new Error('Listener同父窗口的连接尚未建立，确保连接建立后调用该方法，listenerInstance.onConnect()');
      }
    }
  }]);

  return Listener;
}();

module.exports = Listener;

/***/ }),

/***/ "y2jh":
/***/ (function(module, exports, __webpack_require__) {

var Listener = __webpack_require__("Nw9I");

module.exports = {
  createListener: function createListener() {
    return new Listener();
  }
};

/***/ })

/******/ });
});