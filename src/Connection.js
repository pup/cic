function isString(input) {
  return Object.prototype.toString.call(input) == '[object String]';
}

function log(msg, noneStr) {
  // console && console.log && console.log(noneStr + ' ::: ' + (isString(msg) ?
  //   msg :
  //   JSON.stringify(msg)));
}

function log2(msg, noneStr) {
  console && console.log && console.log(noneStr + ' ::: ' + (isString(msg) ?
    msg :
    JSON.stringify(msg)));
}

function addMsgListener(msgType, callback) {
  if ('addEventListener' in document) {
    window.addEventListener(msgType, callback, false);
  } else if ('attachEvent' in document) {
    window.attachEvent(`on${msgType}`, callback);
  }
}

function removeMsgListener(msgType, callback) {
  if ('removeEventListener' in document) {
    window.removeEventListener(msgType, callback, false);
  } else if ('detachEvent' in document) {
    window.detachEvent(`on${msgType}`, callback);
  }
}

function postMessage(target, msg) {
  target.postMessage(JSON.stringify(msg), '*');
}

function clear(timeoutId, noneStr) {
  log(`clear timeoutId = ${timeoutId}`, noneStr);
  window.clearTimeout(timeoutId);
}

let lastConnectTime = 0;

function Connection(noneStr) {
  this.connected = false;
  this.destroyed = false;

  this._noneStr = noneStr;
  this._disconnectListeners = [];
  this._connectListeners = [];
  this._messageListeners = [];
  this._connecting = false;
  this._cicId = null;
  this._source = null;
  this._timeoutId = null;

  this.__onMessage = this._onMessage.bind(this);
  this.__onBeforeUnload = this._onBeforeUnload.bind(this);

  addMsgListener('message', this.__onMessage);
  addMsgListener('beforeunload', this.__onBeforeUnload);
}

Connection.prototype._onMessage = function(evt) {
  if (!evt.data) {
    return;
  }

  let evtData = JSON.parse(evt.data);

  log(evtData, this._noneStr);

  if (!evtData.cicId) {
    return;
  }

  let { source } = evt;
  let { cicId, msgType, data } = evtData;

  if (msgType == 'ping') {
    if (this._cicId || this._connecting || this.connected) {
      return;
    }

    log('收到ping信号', this._noneStr);

    this._cicId = cicId;
    this._connecting = true;
    this._source = source;

    postMessage(source, {
      cicId,
      msgType: 'pong'
    });
  } else if (
    msgType == 'pong' &&
    this._connecting &&
    !this.connected &&
    this._cicId == cicId
  ) {
    this._connecting = false;
    this.connected = true;
    log('收到pong信号', this._noneStr);

    clear(this._timeoutId, this._noneStr);
    this._timeoutId = null;

    postMessage(this._source, {
      cicId,
      msgType: 'pong_confirm'
    });

    setTimeout(() => {
      this._connectListeners.forEach(function(fn) {
        fn();
      });
    }, 0);
  } else if (
    msgType == 'pong_confirm' &&
    this._connecting &&
    cicId == this._cicId
  ) {
    log('收到pong_confirm信号', this._noneStr);

    this.connected = true;
    this._connecting = false;

    setTimeout(() => {
      this._connectListeners.forEach(function(fn) {
        fn();
      });
    }, 0);
  } else if (
    msgType == 'disconnect' &&
    cicId == this._cicId
  ) {
    log('收到disconnect信号', this._noneStr);

    clear(this._timeoutId, this._noneStr);
    this.connected = false;
    this._connecting = false;

    this._disconnectListeners.forEach(function(fn) {
      fn();
    });
  } else if (
    msgType == 'message' &&
    this.connected &&
    cicId == this._cicId
  ) {
    log('收到message信号', this._noneStr);
    this._messageListeners.forEach(function(fn) {
      fn(data);
    });
  }
};

Connection.prototype.onConnect = function(fn) {
  if (this.destroyed) {
    throw new Error('当前Connection已销毁');
  }

  this._connectListeners.push(fn);

  if (this.connected) {
    fn();
  }
};

Connection.prototype.offConnect = function(fn) {
  this._connectListeners = this._connectListeners.filter(function(f) {
    return f != fn;
  });
};

Connection.prototype.onDisconnect = function(fn) {
  if (this.destroyed) {
    throw new Error('当前Connection已销毁');
  }

  this._disconnectListeners.push(fn);
};

Connection.prototype.offDisconnect = function(fn) {
  this._disconnectListeners = this._disconnectListeners.filter(function(f) {
    return f != fn;
  });
};

Connection.prototype.onMessage = function(fn) {
  if (this.destroyed) {
    throw new Error('当前Connection已销毁');
  }

  this._messageListeners.push(fn);
};

Connection.prototype.offMessage = function(fn) {
  this._messageListeners = this._messageListeners.filter(function(f) {
    return f != fn;
  });
};

Connection.prototype._onBeforeUnload = function() {
  log('beforeunload', this._noneStr);
  this.destroy();
};

Connection.prototype.disconnect = function() {
  clear(this._timeoutId, this._noneStr);
  this._timeoutId = null;

  if (this._source) {
    postMessage(this._source, {
      cicId: this._cicId,
      msgType: 'disconnect'
    });

    this.connected = false;
    this._connecting = false;
  }
};

Connection.prototype.destroy = function() {
  this.disconnect();

  this.destroyed = true;
  this._disconnectListeners.length = 0;
  this._connectListeners.length = 0;
  this._messageListeners.length = 0;
  this._cicId = null;
  this._source = null;
  this._timeoutId = null;

  removeMsgListener('message', this.__onMessage);
  removeMsgListener('beforeunload', this.__onBeforeUnload);
};

Connection.prototype.connect = function(domWindow) {
  log('----- duration = ' + (Date.now() - lastConnectTime), this._noneStr);

  if (!domWindow) {
    throw new Error('connect方法需要传入参数domWindow');
  }

  if (this.connected) {
    log2('---> 当前Connection对象已建立连接', this._noneStr);
    return;
  }

  if (this._connecting) {
    log2('---> 当前Connection对象正在建立连接中');
    return;
  }

  lastConnectTime = Date.now();

  if (domWindow.postMessage) {
    this._source = domWindow;
  } else if (domWindow.contentWindow.postMessage) {
    this._source = domWindow.contentWindow;
  }

  if (!this._source) {
    throw new Error('参数对象 domWindow 不可用，postMessage方法不存在');
  }

  this._cicId = 'cic_' + Date.now();
  this._connecting = true;

  log('发送ping命令', this._noneStr);

  // In IE, postmessage will block the process, so need setTimeout
  window.setTimeout(() => {
    postMessage(this._source, {
      cicId: this._cicId,
      msgType: 'ping'
    });
  }, 0)

  clear(this._timeoutId, this._noneStr);

  this._timeoutId = window.setTimeout(() => {
    log2('正在尝试建立连接, this._cicId = ', this._noneStr);
    this._connecting = false;
    this.connect(domWindow);
  }, 2000);

  log(`<<< created this._timeoutId = ${this._timeoutId}`, this._noneStr);
};

Connection.prototype.sendMsg = function(data) {
  if (!this.connected) {
    throw new Error('连接尚未建立，请添加 onConnect 回调，确定建立连接后才可发送消息');
  }

  postMessage(this._source, {
    cicId: this._cicId,
    msgType: 'message',
    data
  });
};

module.exports = Connection;