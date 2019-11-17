let listeningCicIds = [];

class Listener {
  cicId = null;
  connected = false;
  disconnectListeners = [];
  connectListeners = [];
  messageListeners = [];
  connecting = false;
  isDestroyed = false;
  sourceWindow = null;
  sourceOrigin = null;
  started = false;

  start() {
    if (this.isDestroyed) {
      throw new Error('当前Listener已销毁');
    }

    if (!this.started) {
      window.addEventListener('message', this._messageHandler, false);
      window.addEventListener('beforeunload', this._onBeforeUnload, false);
    }

    this.started = true;
  }

  destroy() {
    if (this.connected) {
      this.onDisconnect(this._destroy);
      this.disconnectParent();
    } else {
      this._destroy();
    }
  }

  _onBeforeUnload = () => {
    this.disconnectParent();
  }

  _destroy = () => {
    this.isDestroyed = true;
    this.started = false;
    this.disconnectListeners.length = 0;
    this.connectListeners.length = 0;
    this.messageListeners.length = 0;
    window.removeEventListener('message', this._messageHandler, false);
    window.removeEventListener('beforeunload', this._onBeforeUnload, false);
  }

  _disconnectHandler() {
    this.disconnectListeners.forEach((fn) => {
      fn(this);
    });
    listeningCicIds = listeningCicIds.filter((cicId) => {
      return cicId != this.cicId;
    });
    this.connected = false;
    this.sourceOrigin = null;
    this.sourceWindow = null;
    this.connecting = false;
    this.cicId = null;
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

    if (this.cicId) {
      if (this.cicId !== cicId) {
        return;
      }

      if (msgType === 'pong_confirm') {
        this.connecting = false;
        this.connected = true;
        this.sourceWindow.postMessage({
            cicId,
            msgType: 'childReady',
          },
          this.sourceOrigin
        );

        setTimeout(() => {
          this.connectListeners.forEach((fn) => {
            fn();
          });
        }, 0);
      } else if (msgType === 'message') {
        this.messageListeners.forEach((fn) => {
          fn(data);
        });
      } else if (msgType === 'disconnectFromParent' && this.connected) {
        this.sourceWindow.postMessage({
            cicId,
            msgType: 'disconnectFromParentConfirm',
          },
          this.sourceOrigin
        );
        this._disconnectHandler();
      } else if (msgType === 'disconnectFromChildConfirm' && this.connected) {
        this._disconnectHandler();
      }

    } else {
      if (msgType === 'ping' && listeningCicIds.indexOf(
          cicId) === -1 && !this.connecting) {
        listeningCicIds.push(cicId);
        this.cicId = cicId;
        this.connecting = true;
        this.sourceWindow = evt.source;
        this.sourceOrigin = evt.origin;

        evt.source.postMessage({
            cicId,
            msgType: 'pong'
          },
          evt.origin
        );
      }
    }
  }

  onDisconnect(fn) {
    if (this.isDestroyed) {
      throw new Error('当前Listener已销毁');
    }
    this.disconnectListeners.push(fn);
  }

  offDisconnect(fn) {
    this.disconnectListeners = this.disconnectListeners.filter(function(f) {
      return f != fn;
    });
  }

  onConnect(fn) {
    if (this.isDestroyed) {
      throw new Error('当前Listener已销毁');
    }
    this.connectListeners.push(fn);
    if (this.connected) {
      fn(this);
    }
  }

  offConnect(fn) {
    this.connectListeners = this.connectListeners.filter(function(f) {
      return f != fn;
    });
  }

  onMessage(fn) {
    if (this.isDestroyed) {
      throw new Error('当前Listener已销毁');
    }
    this.messageListeners.push(fn);
  }

  offMessage(fn) {
    this.messageListeners = this.messageListeners.filter(function(f) {
      return f != fn;
    });
  }

  disconnectParent() {
    if (this.connected) {
      this.sourceWindow.postMessage({
          cicId: this.cicId,
          msgType: 'disconnectFromChild',
        },
        this.sourceOrigin
      );
    }
  }

  postMessageToParent(data) {
    if (this.connected) {
      this.sourceWindow.postMessage({
          cicId: this.cicId,
          msgType: 'message',
          data
        },
        this.sourceOrigin
      );
    } else {
      throw new Error(
        'Listener同父窗口的连接尚未建立，确保连接建立后调用该方法，listenerInstance.onConnect()');
    }
  }
}

module.exports = Listener;