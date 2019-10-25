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

  start() {
    if (this.isDestroyed) {
      throw new Error('当前Listener已销毁');
    }
    window.removeEventListener('message', this.messageHandler, false);
    window.addEventListener('message', this.messageHandler, false);
  }

  destroy() {
    this.disconnectListeners.length = 0;
    this.connectListeners.length = 0;
    this.messageListeners.length = 0;
    this.isDestroyed = true;
    this.sourceWindow = null;
    this.sourceOrigin = null;
    window.removeEventListener('message', this.messageHandler, false);
  }

  messageHandler = (evt) => {
    let parentMsg = evt.data;
    if (parentMsg && parentMsg.cicId) {
      if (this.cicId) {
        if (this.cicId === parentMsg.cicId) {
          if (parentMsg.msgType === 'pong_confirm') {
            this.connecting = false;
            this.connected = true;
            this.connectListeners.forEach(function(fn) {
              fn(this);
            }, this);

            this.sourceWindow.postMessage({
                cicId: this.cicId,
                msgType: 'childReady',
              },
              this.sourceOrigin
            );
          }

          if (parentMsg.msgType === 'message') {
            this.messageListeners.forEach(function(fn) {
              fn(parentMsg.data);
            }, this);
          }

          if (parentMsg.msgType === 'disconnectFromParent' && this.connected) {
            this.sourceWindow.postMessage({
                cicId: this.cicId,
                msgType: 'disconnectFromParentConfirm',
              },
              this.sourceOrigin
            );
          }

          if ((parentMsg.msgType === 'disconnectFromChildConfirm' ||
              parentMsg.msgType === 'disconnectFromParent') && this.connected) {
            listeningCicIds = listeningCicIds.filter(function(cicId) {
              return cicId != this.cicId;
            });
            this.connected = false;
            this.sourceOrigin = null;
            this.sourceWindow = null;
            this.connecting = false;
            this.cicId = null;
            this.disconnectListeners.forEach(function(fn) {
              fn(this);
            }, this);
          }
        }
      } else {
        if (parentMsg.msgType === 'ping' && listeningCicIds.indexOf(
            parentMsg.cicId) === -1 && !this.connecting) {
          listeningCicIds.push(parentMsg.cicId);
          this.cicId = parentMsg.cicId;
          this.connecting = true;
          this.sourceWindow = evt.source;
          this.sourceOrigin = evt.origin;

          evt.source.postMessage({
              cicId: parentMsg.cicId,
              msgType: 'pong',
            },
            evt.origin
          );
        }
      }
    }
  }

  onDisconnect(fn) {
    if (this.isDestroyed) {
      throw new Error('当前Listener已销毁');
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
      throw new Error('当前Listener已销毁');
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
      throw new Error('当前Listener已销毁');
    } else {
      this.messageListeners.push(fn);
    }
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
          data: data,
        },
        this.sourceOrigin
      );
    } else {
      throw new Error('Listener同父窗口的连接尚未建立，确保连接建立后调用该方法，Listener.onConnect()');
    }
  }
}

module.exports = Listener;