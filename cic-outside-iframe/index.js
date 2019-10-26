let Connection = require('./Connection.js');

module.exports = {
  createConnection(iframeWindow) {
    if (iframeWindow.postMessage) {
      return new Connection(iframeWindow);
    }

    if (iframeWindow.contentWindow.postMessage) {
      return new Connection(iframeWindow.contentWindow);
    }

    throw new Error('传入"CicOutsideIframe.createConnection(iframeWindow)"的"iframeWindow"对象不存在”postMessage“方法。');
  }
}
