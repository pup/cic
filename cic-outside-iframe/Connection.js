let log = (msg) => {
  console && console.log && console.log('< parent: ' + msg);
};

let _cicId = 0;

class Connection {
  disconnectListeners = [];
  connectListeners = [];
  messageListeners = [];
  connecting = false;
  isDestroyed = false;
  connected = false;
  cicId = 'cic_id_' + ++_cicId; // 相当于一个链接标识符
  timeoutId = null;

  constructor(iframeWindow) {
    this.iframeWindow = iframeWindow;
    window.addEventListener('message', this._messageHandler, false);
    window.addEventListener('beforeunload', this._onBeforeUnload, false);
  }

  destroy() {
    if (this.connected) {
      this.onDisconnect(this._destroy);
      this.disconnectIframe();
    } else {
      this._destroy();
    }
  }

  _onBeforeUnload = () => {
    this.disconnectIframe();
  }

  _destroy = () => {
    this.disconnectListeners.length = 0;
    this.connectListeners.length = 0;
    this.messageListeners.length = 0;
    this.isDestroyed = true;
    clearTimeout(this.timeoutId);
    window.removeEventListener('message', this._messageHandler, false);
    window.removeEventListener('beforeunload', this._onBeforeUnload, false);
  }

  onDisconnect(fn) {
    if (this.isDestroyed) {
      throw new Error('当前Connection已销毁');
    } else {
      this.disconnectListeners.push(fn);
    }
  }

  offDisconnect(fn) {
    this.disconnectListeners = this.disconnectListeners.filter(function(f) {
      return f != fn;
    });
  }

  onConnect(fn) {
    if (this.isDestroyed) {
      throw new Error('当前Connection已销毁');
    } else {
      this.connectListeners.push(fn);
      if (this.connected) {
        fn(this);
      }
    }
  }

  offConnect(fn) {
    this.connectListeners = this.connectListeners.filter(function(f) {
      return f != fn;
    });
  }

  onMessage(fn) {
    if (this.isDestroyed) {
      throw new Error('当前Connection已销毁');
    } else {
      this.messageListeners.push(fn);
    }
  }

  offMessage(fn) {
    this.messageListeners = this.messageListeners.filter(function(f) {
      return f != fn;
    });
  }

  _disconnectHandler() {
    this.disconnectListeners.forEach((fn) => {
      fn(this);
    });
    clearTimeout(this.timeoutId);
    this.connected = false;
    this.connecting = false;
  }

  _messageHandler = (evt) => {
    if (!evt.data || !evt.data.cicId) {
      return;
    }

    let {
      cicId,
      msgType,
      data
    } = evt.data;

    if (cicId != this.cicId) {
      return;
    }

    if (msgType == 'pong' && this.connecting) {
      this.connecting = false;
      this.connected = true;
      clearTimeout(this.timeoutId);

      this.iframeWindow.postMessage({
          cicId,
          msgType: 'pong_confirm'
        },
        '*'
      );
    } else if (msgType == 'childReady' && this.connected) {
      this.connectListeners.forEach((fn) => {
        fn(this);
      });
    } else if (msgType == 'disconnectFromChild' && this.connected) {
      this.iframeWindow.postMessage({
          cicId,
          msgType: 'disconnectFromChildConfirm'
        },
        '*'
      );
      this._disconnectHandler();
    } else if (msgType == 'disconnectFromParentConfirm' && this.connected) {
      this._disconnectHandler();
    } else if (msgType == 'message' && this.connected) {
      this.messageListeners.forEach((fn) => {
        fn(data);
      });
    }
  }

  /**
   * 主动发起对iframe的连接
   * 每秒钟常识建立一次连接
   */
  connectIframe() {
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
      },
      '*'
    );

    this.timeoutId = setTimeout(() => {
      log('正在尝试建立连接');
      this.connecting = false;
      this.connectIframe();
    }, 1000);
  }

  disconnectIframe() {
    clearTimeout(this.timeoutId);
    if (this.connected) {
      this.connected = false;
      this.connecting = false;
      this.iframeWindow.postMessage({
          cicId: this.cicId,
          msgType: 'disconnectFromParent'
        },
        '*'
      );
    }
  }

  postMessageToIframe(data) {
    this.iframeWindow.postMessage({
        cicId: this.cicId,
        msgType: 'message',
        data
      },
      '*'
    );
  }
}

module.exports = Connection;