let log = function(msg) {
  console && console.log && console.log('< ' + msg);
};

function addMsgListener(msgType, callback) {
  if ( 'addEventListener' in document ) {
      window.addEventListener(msgType, callback, false);
  } else if ( 'attachEvent' in document ) {
      window.attachEvent(`on${msgType}`, callback);
  }
}

function removeMsgListener(msgType, callback) {
  if ( 'addEventListener' in document ) {
      window.removeEventListener(msgType, callback, false);
  } else if ( 'attachEvent' in document ) {
      window.dettachEvent(`on${msgType}`, callback);
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
  addMsgListener('beforeunload',this.__onBeforeUnload);
}

Connection.prototype._onMessage = function(evt) {
  if (!evt.data || !evt.data.cicId) {
    return;
  }

  let { origin, source, data: { cicId, msgType, data } } = evt;

  if (msgType == 'ping') {
    if (this._cicId || this._connecting || this.connected) {
      return;
    }

    this._cicId = cicId;
    this._connecting = true;
    this._source = source;
    this._origin = origin;

    source.postMessage({
      cicId,
      msgType: 'pong'
    }, '*');

  } else if (
    msgType == 'pong' &&
    this._connecting &&
    !this.connected &&
    this._cicId == cicId
  ) {
    clearTimeout(this._timeoutId);
    this._source = source;
    this._origin = origin;
    this.connected = true;
    this._connecting = false;

    source.postMessage({
        cicId,
        msgType: 'pong_confirm'
      },
      '*'
    );

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
    this._connecting = false;
    this.connected = true;

    setTimeout(() => {
      this._connectListeners.forEach(function(fn) {
        fn();
      });
    }, 0);
  } else if (
    msgType == 'disconnect' &&
    cicId == this._cicId
  ) {
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
    fn(this);
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
  this.disconnect();
};

Connection.prototype.disconnect = function() {
  clearTimeout(this._timeoutId);
  this.connected = false;
  this._connecting = false;

  this._source && this._source.postMessage({
      cicId: this._cicId,
      msgType: 'disconnect'
    },
    '*'
  );
};

Connection.prototype.destroy = function() {
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

Connection.prototype.connect = function(domWindow) {
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
    this._cicId = 'cic_' + Date.now();
    this._connecting = true;
    this._source.postMessage({
        cicId: this._cicId,
        msgType: 'ping'
      },
      '*'
    );
  } else {
    throw new Error('参数对象 domWindow 不可用，无法发送消息到该窗口对象。postMessage方法不存在');
  }

  this._timeoutId = setTimeout(() => {
    log('正在尝试建立连接');
    this._connecting = false;
    this.connect(domWindow);
  }, 1000);
};

Connection.prototype.sendMsg = function(data) {
  if (!this.connected) {
    throw new Error('连接尚未建立，请添加 onConnect 回调，确定建立连接后才可发送消息');
  }

  this._source.postMessage({
      cicId: this._cicId,
      msgType: 'message',
      data
    },
    '*'
  );
};

module.exports = Connection;
